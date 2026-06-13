import { Command } from 'commander';
import { getDatabase, getVectorExtensionStatus } from '../lib/database/connection';
import { createVectorTable } from '../lib/database/schema';
import { setMeta } from '../lib/database/meta';
import { createSessionChunks } from '../lib/chunking';
import { embedTexts, EMBED_VERSION, getEmbeddingsConfig, validateEmbeddingsConfig } from '../lib/embeddings/provider';
import { ChunkRow } from '../types/embedding';

type IndexedSession = {
  slug: string;
  title: string;
  short_summary: string;
  body: string;
};

export function createEmbedCommand(): Command {
  const command = new Command('embed')
    .description('Build semantic embeddings for indexed sessions')
    .option('--force', 'Rebuild all embeddings from scratch')
    .action(async (options) => {
      try {
        const db = getDatabase();
        const vectorStatus = getVectorExtensionStatus();
        const config = getEmbeddingsConfig();

        const validationError = validateEmbeddingsConfig(config);
        if (validationError) {
          console.error(validationError);
          process.exit(1);
        }

        if (!vectorStatus.loaded) {
          console.error(`Failed to load sqlite-vec: ${vectorStatus.error || 'unknown error'}`);
          process.exit(1);
        }

        const sessions = db.prepare(`
          SELECT slug, title, short_summary, body
          FROM sessions
          ORDER BY date ASC, slug ASC
        `).all() as IndexedSession[];

        if (sessions.length === 0) {
          console.log("No indexed sessions found. Run 'sift index' first.");
          return;
        }

        const existingProvider = db.prepare(`SELECT value FROM meta WHERE key = 'embed_provider'`).get() as { value: string } | undefined;
        const existingModel = db.prepare(`SELECT value FROM meta WHERE key = 'embed_model'`).get() as { value: string } | undefined;
        const existingVersion = db.prepare(`SELECT value FROM meta WHERE key = 'embed_version'`).get() as { value: string } | undefined;
        const existingDims = db.prepare(`SELECT value FROM meta WHERE key = 'embed_dims'`).get() as { value: string } | undefined;

        if (
          !options.force &&
          ((existingProvider && existingProvider.value !== config.provider) ||
            (existingModel && existingModel.value !== config.model) ||
            (existingVersion && existingVersion.value !== EMBED_VERSION))
        ) {
          console.error('Embedding configuration changed. Run "sift embed --force" to rebuild the vector index.');
          process.exit(1);
        }

        if (options.force) {
          db.exec('DROP TABLE IF EXISTS sessions_vec');
          db.exec('DELETE FROM sessions_chunks');
        }

        let embedded = 0;
        let skipped = 0;
        let dims: number | null = existingDims ? parseInt(existingDims.value, 10) : null;

        const getExistingChunksStmt = db.prepare(`
          SELECT id, slug, seq, text, hash
          FROM sessions_chunks
          WHERE slug = ?
        `);
        const deleteChunkStmt = db.prepare('DELETE FROM sessions_chunks WHERE id = ?');
        const upsertChunkStmt = db.prepare(`
          INSERT INTO sessions_chunks (id, slug, seq, text, hash)
          VALUES (?, ?, ?, ?, ?)
          ON CONFLICT(id) DO UPDATE SET
            slug = excluded.slug,
            seq = excluded.seq,
            text = excluded.text,
            hash = excluded.hash
        `);
        const insertVecStmt = (dbWithVecDims: number) => db.prepare(`
          INSERT INTO sessions_vec (chunk_id, embedding)
          VALUES (?, ?)
        `);
        const deleteVectorChunk = (chunkId: string) => {
          const hasTable = db.prepare(
            "SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'sessions_vec'"
          ).get();
          if (hasTable) {
            db.prepare('DELETE FROM sessions_vec WHERE chunk_id = ?').run(chunkId);
          }
        };

        for (const session of sessions) {
          const chunks = createSessionChunks(
            session.slug,
            session.title,
            session.short_summary,
            session.body
          );

          const existingChunks = new Map<string, ChunkRow>(
            (getExistingChunksStmt.all(session.slug) as ChunkRow[]).map((row) => [row.id, row])
          );
          const currentIds = new Set<string>();
          const pendingEmbeds: typeof chunks = [];

          for (const chunk of chunks) {
            currentIds.add(chunk.id);
            const existing = existingChunks.get(chunk.id);

            if (existing && existing.hash === chunk.hash) {
              skipped++;
            } else {
              pendingEmbeds.push(chunk);
            }
          }

          if (pendingEmbeds.length > 0) {
            const result = await embedTexts(pendingEmbeds.map((chunk) => chunk.text), config);
            const responseDims = result.embeddings[0]?.length ?? null;
            dims = dims ?? responseDims;

            if (!dims) {
              throw new Error('Embedding dimensions could not be determined');
            }

            if (responseDims !== dims) {
              throw new Error('Embedding dimensions changed. Run "sift embed --force" to rebuild the vector index.');
            }

            createVectorTable(db, dims);
            const vectorInsertStmt = insertVecStmt(dims);

            pendingEmbeds.forEach((chunk, index) => {
              const embedding = result.embeddings[index];
              if (!embedding) {
                throw new Error(`Missing embedding for chunk ${chunk.id}`);
              }

              deleteVectorChunk(chunk.id);
              upsertChunkStmt.run(chunk.id, chunk.slug, chunk.seq, chunk.text, chunk.hash);
              vectorInsertStmt.run(chunk.id, new Float32Array(embedding));
              embedded++;
            });
          }

          for (const staleChunkId of existingChunks.keys()) {
            if (!currentIds.has(staleChunkId)) {
              deleteVectorChunk(staleChunkId);
              deleteChunkStmt.run(staleChunkId);
            }
          }
        }

        if (dims === null) {
          console.log(`Embedded ${embedded} chunks`);
          console.log(`Skipped ${skipped} chunks`);
          return;
        }

        const now = new Date().toISOString();
        setMeta(db, 'embed_provider', config.provider);
        setMeta(db, 'embed_model', config.model);
        setMeta(db, 'embed_dims', String(dims));
        setMeta(db, 'embed_version', EMBED_VERSION);
        setMeta(db, 'embedded_at', now);

        if (options.force) {
          console.log(`${embedded} embedded (forced)`);
        } else {
          console.log(`${embedded} embedded, ${skipped} skipped`);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
          process.exit(1);
        }
        console.error('An unexpected error occurred');
        process.exit(1);
      }
    });

  return command;
}
