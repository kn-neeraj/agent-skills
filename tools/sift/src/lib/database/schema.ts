import Database from 'better-sqlite3';
import path from 'path';
import os from 'os';

export function initializeDatabase(dbPath: string): Database.Database {
  const db = new Database(dbPath);

  db.pragma('foreign_keys = ON');

  db.exec(`
    CREATE TABLE IF NOT EXISTS sessions (
      slug TEXT PRIMARY KEY,
      date TEXT,
      title TEXT,
      files_touched TEXT,
      files_touched_fts TEXT,
      short_summary TEXT,
      body TEXT,
      hash TEXT,
      indexed_at TEXT
    )
  `);

  db.exec(`
    CREATE VIRTUAL TABLE IF NOT EXISTS sessions_fts USING fts5(
      title,
      short_summary,
      files_touched_fts,
      body,
      content=sessions,
      content_rowid=rowid
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS meta (
      key TEXT PRIMARY KEY,
      value TEXT
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS sessions_chunks (
      id TEXT PRIMARY KEY,
      slug TEXT NOT NULL,
      seq INTEGER NOT NULL,
      text TEXT NOT NULL,
      hash TEXT NOT NULL,
      FOREIGN KEY (slug) REFERENCES sessions(slug) ON DELETE CASCADE
    )
  `);

  return db;
}

export function getDatabasePath(): string {
  const dbDir = path.join(process.env.HOME || os.homedir(), '.sift');
  return path.join(dbDir, 'index.sqlite');
}

export function createVectorTable(db: Database.Database, dims: number): void {
  db.exec(`
    CREATE VIRTUAL TABLE IF NOT EXISTS sessions_vec USING vec0(
      chunk_id TEXT PRIMARY KEY,
      embedding FLOAT[${dims}] distance_metric=cosine
    )
  `);
}
