export interface EmbeddingsConfig {
  provider: string;
  model: string;
  url: string;
  apiKey?: string;
}

export interface SiftConfig {
  embeddings: EmbeddingsConfig;
}

export interface EmbedResult {
  model: string;
  embeddings: number[][];
}

export interface SessionChunk {
  id: string;
  slug: string;
  seq: number;
  text: string;
  hash: string;
}

export interface ChunkRow {
  id: string;
  slug: string;
  seq: number;
  text: string;
  hash: string;
}

export interface SearchRow {
  slug: string;
  date: string | null;
  title: string;
  short_summary: string;
}

export interface RankedSearchRow extends SearchRow {
  rank: number;
}

export interface SearchContribution {
  slug: string;
  bm25Rank?: number;
  vectorRank?: number;
  rrfScore: number;
  bestChunkId?: string;
  vectorDistance?: number;
  bestChunkPreview?: string;
}

export interface SearchDebugMetadata {
  bm25CandidateCount: number;
  vectorCandidateCount: number;
  fallbackReason?: string;
  contributions: SearchContribution[];
}

export interface SearchExecutionMetadata {
  mode: 'hybrid' | 'keyword-only';
  debug: SearchDebugMetadata;
}

export interface Bm25Candidate extends SearchRow {
  score: number;
}

export interface VectorCandidate extends SearchRow {
  chunk_id: string;
  distance: number;
  text: string;
}
