import { Command } from 'commander';
import { getDatabase, getVectorExtensionStatus, hasVectorTable } from '../lib/database/connection';
import { listSessionFiles } from '../lib/file-operations';
import path from 'path';
import { getEmbeddingsConfig } from '../lib/embeddings/provider';
import { getMeta } from '../lib/database/meta';

export function createStatusCommand(): Command {
  const command = new Command('status')
    .description('Show index status')
    .action(async () => {
      try {
        const sessionsDir = path.join(process.cwd(), 'docs', 'sessions');
        const db = getDatabase();

        const files = await listSessionFiles(sessionsDir);
        const fileCount = files.length;

        const sessionCount = db.prepare(`SELECT COUNT(*) as count FROM sessions`)
          .get() as { count: number };
        const embeddedCount = db.prepare(`SELECT COUNT(DISTINCT slug) as count FROM sessions_chunks`)
          .get() as { count: number };

        const indexedAt = getMeta(db, 'indexed_at') || 'Never';
        const embeddedAt = getMeta(db, 'embedded_at') || 'Never';
        const metaProvider = getMeta(db, 'embed_provider');
        const metaModel = getMeta(db, 'embed_model');
        const metaDims = getMeta(db, 'embed_dims');
        const metaVersion = getMeta(db, 'embed_version');
        const config = getEmbeddingsConfig();
        const vectorStatus = getVectorExtensionStatus();
        const modelMismatch =
          Boolean(metaProvider && metaProvider !== config.provider) ||
          Boolean(metaModel && metaModel !== config.model);
        const staleEmbeddings = embeddedAt !== 'Never' && indexedAt !== 'Never' && indexedAt > embeddedAt;

        console.log(`Sessions directory: ${sessionsDir}`);
        console.log(`Files on disk: ${fileCount}`);
        console.log(`Sessions indexed: ${sessionCount.count}`);
        console.log(`Sessions embedded: ${embeddedCount.count}/${sessionCount.count}`);

        if (fileCount === sessionCount.count) {
          console.log('Status: All files indexed ✅');
        } else {
          const diff = fileCount - sessionCount.count;
          console.log(`Status: ${diff} files not indexed - run 'sift index' ⚠️`);
        }

        console.log(`Last indexed: ${indexedAt}`);
        console.log(`Last embedded: ${embeddedAt}`);
        console.log(`Database: ~/.sift/index.sqlite`);
        console.log(`Vector extension: ${vectorStatus.loaded ? 'loaded' : 'unavailable'}`);

        if (metaProvider && metaModel && metaDims) {
          console.log(`Active embeddings: ${metaProvider} / ${metaModel} (${metaDims} dims)`);
        } else {
          console.log(`Active embeddings: ${config.provider} / ${config.model} (not embedded yet)`);
        }

        if (metaVersion) {
          console.log(`Embed version: ${metaVersion}`);
        }

        if (!hasVectorTable(db)) {
          console.log("Semantic index: missing - run 'sift embed'");
        }

        if (staleEmbeddings) {
          console.log("Semantic index: stale - run 'sift embed' ⚠️");
        }

        if (modelMismatch) {
          console.log(`Model mismatch: config=${config.provider}/${config.model} indexed=${metaProvider}/${metaModel} ⚠️`);
        }

        if (!vectorStatus.loaded && vectorStatus.error) {
          console.log(`Vector warning: ${vectorStatus.error}`);
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
