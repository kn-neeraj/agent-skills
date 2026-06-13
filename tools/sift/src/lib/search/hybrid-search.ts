import Database from 'better-sqlite3';
import { getEmbeddingsConfig, embedTexts, EMBED_VERSION, validateEmbeddingsConfig } from '../embeddings/provider';
import { getMeta } from '../database/meta';
import { getVectorExtensionStatus, hasVectorTable } from '../database/connection';
import {
  Bm25Candidate,
  RankedSearchRow,
  SearchContribution,
  SearchExecutionMetadata,
  SearchRow,
  VectorCandidate
} from '../../types/embedding';

const BM25_WEIGHTS = [3.0, 2.0, 1.5, 1.0] as const;
const BM25_CANDIDATE_LIMIT = 50;
const VECTOR_CANDIDATE_LIMIT = 50;
const RRF_K = 60;

function toPreview(text: string, maxLength = 180): string {
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength - 3).trimEnd()}...`;
}

export function getBm25Candidates(
  db: Database.Database,
  query: string,
  since?: string,
  limit = BM25_CANDIDATE_LIMIT
): Bm25Candidate[] {
  let sql = `
    SELECT s.slug, s.date, s.title, s.short_summary,
           bm25(sessions_fts, ${BM25_WEIGHTS.join(', ')}) as score
    FROM sessions_fts
    JOIN sessions s ON s.rowid = sessions_fts.rowid
    WHERE sessions_fts MATCH ?
  `;

  const params: Array<string | number> = [query];

  if (since) {
    sql += ' AND s.date >= ?';
    params.push(since);
  }

  sql += ' ORDER BY score ASC LIMIT ?';
  params.push(limit);

  return db.prepare(sql).all(...params) as Bm25Candidate[];
}

function getVectorCandidatesFromRows(rows: VectorCandidate[]): VectorCandidate[] {
  const bySlug = new Map<string, VectorCandidate>();

  for (const row of rows) {
    if (!bySlug.has(row.slug)) {
      bySlug.set(row.slug, row);
    }
  }

  return Array.from(bySlug.values());
}

async function getVectorCandidates(
  db: Database.Database,
  query: string,
  since?: string
): Promise<VectorCandidate[]> {
  const config = getEmbeddingsConfig();
  const validationError = validateEmbeddingsConfig(config);
  if (validationError) {
    throw new Error(validationError);
  }

  const metaProvider = getMeta(db, 'embed_provider');
  const metaModel = getMeta(db, 'embed_model');
  const metaDims = getMeta(db, 'embed_dims');
  const metaVersion = getMeta(db, 'embed_version');
  const indexedAt = getMeta(db, 'indexed_at');
  const embeddedAt = getMeta(db, 'embedded_at');

  if (!metaProvider || !metaModel || !metaDims || !metaVersion) {
    throw new Error('Embeddings have not been built yet');
  }

  if (indexedAt && embeddedAt && indexedAt > embeddedAt) {
    throw new Error('Embeddings are out of date. Run "sift embed"');
  }

  if (metaProvider !== config.provider || metaModel !== config.model || metaVersion !== EMBED_VERSION) {
    throw new Error('Embedding configuration does not match indexed vectors. Run "sift embed --force"');
  }

  const { embeddings } = await embedTexts([query], config);
  const queryEmbedding = embeddings[0];

  if (!queryEmbedding) {
    throw new Error('Query embedding could not be generated');
  }

  if (String(queryEmbedding.length) !== metaDims) {
    throw new Error('Embedding dimensions do not match indexed vectors. Run "sift embed --force"');
  }

  let sql = `
    WITH knn AS (
      SELECT chunk_id, distance
      FROM sessions_vec
      WHERE embedding MATCH ?
        AND k = ?
    )
    SELECT sc.id AS chunk_id, sc.slug, s.date, s.title, s.short_summary, sc.text, knn.distance
    FROM knn
    JOIN sessions_chunks sc ON sc.id = knn.chunk_id
    JOIN sessions s ON s.slug = sc.slug
  `;

  const params: Array<Float32Array | string | number> = [new Float32Array(queryEmbedding), VECTOR_CANDIDATE_LIMIT];

  if (since) {
    sql += ' WHERE s.date >= ?';
    params.push(since);
  }

  sql += ' ORDER BY knn.distance ASC';

  const rows = db.prepare(sql).all(...params) as VectorCandidate[];
  return getVectorCandidatesFromRows(rows);
}

function fuseCandidates(
  bm25: SearchRow[],
  vector: VectorCandidate[],
  limit: number
): { results: RankedSearchRow[]; contributions: SearchContribution[] } {
  const fused = new Map<string, {
    row: SearchRow;
    score: number;
    bm25Rank?: number;
    vectorRank?: number;
    bestChunkId?: string;
    vectorDistance?: number;
    bestChunkPreview?: string;
  }>();

  bm25.forEach((row, index) => {
    const entry = fused.get(row.slug) ?? { row, score: 0 };
    entry.score += 1 / (RRF_K + index + 1);
    entry.row = entry.row || row;
    entry.bm25Rank = index + 1;
    fused.set(row.slug, entry);
  });

  vector.forEach((row, index) => {
    const entry = fused.get(row.slug) ?? { row, score: 0 };
    entry.score += 1 / (RRF_K + index + 1);
    if (!entry.row) {
      entry.row = row;
    }
    entry.vectorRank = index + 1;
    entry.bestChunkId = row.chunk_id;
    entry.vectorDistance = row.distance;
    entry.bestChunkPreview = toPreview(row.text);
    fused.set(row.slug, entry);
  });

  const ranked = Array.from(fused.values()).sort((a, b) => b.score - a.score);
  const contributions = ranked.map((entry) => ({
    slug: entry.row.slug,
    bm25Rank: entry.bm25Rank,
    vectorRank: entry.vectorRank,
    rrfScore: entry.score,
    bestChunkId: entry.bestChunkId,
    vectorDistance: entry.vectorDistance,
    bestChunkPreview: entry.bestChunkPreview,
  }));

  return {
    results: ranked.slice(0, limit).map((entry, index) => ({
      ...entry.row,
      rank: index + 1,
    })),
    contributions,
  };
}

export async function runHybridSearch(
  db: Database.Database,
  query: string,
  since: string | undefined,
  limit: number
): Promise<{ results: RankedSearchRow[]; warning?: string; metadata: SearchExecutionMetadata }> {
  const bm25Rows = getBm25Candidates(db, query, since);
  const bm25 = bm25Rows.map((row) => ({
    slug: row.slug,
    date: row.date,
    title: row.title,
    short_summary: row.short_summary,
  }));

  const vectorStatus = getVectorExtensionStatus();
  if (!vectorStatus.loaded) {
    const results = bm25.slice(0, limit).map((row, index) => ({ ...row, rank: index + 1 }));
    return {
      results,
      warning: `Semantic search is unavailable: ${vectorStatus.error || 'sqlite-vec could not be loaded'}. Keyword search only will be used.`,
      metadata: {
        mode: 'keyword-only',
        debug: {
          bm25CandidateCount: bm25Rows.length,
          vectorCandidateCount: 0,
          fallbackReason: vectorStatus.error || 'sqlite-vec could not be loaded',
          contributions: results.map((row) => ({
            slug: row.slug,
            bm25Rank: row.rank,
            rrfScore: 1 / (RRF_K + row.rank),
          })),
        },
      },
    };
  }

  if (!hasVectorTable(db)) {
    const results = bm25.slice(0, limit).map((row, index) => ({ ...row, rank: index + 1 }));
    return {
      results,
      warning: 'Semantic search is unavailable: no vector index exists yet. Keyword search only will be used.',
      metadata: {
        mode: 'keyword-only',
        debug: {
          bm25CandidateCount: bm25Rows.length,
          vectorCandidateCount: 0,
          fallbackReason: 'no vector index exists yet',
          contributions: results.map((row) => ({
            slug: row.slug,
            bm25Rank: row.rank,
            rrfScore: 1 / (RRF_K + row.rank),
          })),
        },
      },
    };
  }

  try {
    const vector = await getVectorCandidates(db, query, since);
    const fused = fuseCandidates(bm25, vector, limit);
    return {
      results: fused.results,
      metadata: {
        mode: 'hybrid',
        debug: {
          bm25CandidateCount: bm25Rows.length,
          vectorCandidateCount: vector.length,
          contributions: fused.contributions,
        },
      },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'semantic search failed';
    const results = bm25.slice(0, limit).map((row, index) => ({ ...row, rank: index + 1 }));
    return {
      results,
      warning: `Semantic search is unavailable: ${message}. Keyword search only will be used.`,
      metadata: {
        mode: 'keyword-only',
        debug: {
          bm25CandidateCount: bm25Rows.length,
          vectorCandidateCount: 0,
          fallbackReason: message,
          contributions: results.map((row) => ({
            slug: row.slug,
            bm25Rank: row.rank,
            rrfScore: 1 / (RRF_K + row.rank),
          })),
        },
      },
    };
  }
}
