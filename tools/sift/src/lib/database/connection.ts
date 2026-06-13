import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import * as sqliteVec from 'sqlite-vec';
import { initializeDatabase, getDatabasePath } from './schema';

let db: Database.Database | null = null;
let vectorExtensionLoaded = false;
let vectorExtensionError: string | null = null;

export function getDatabase(): Database.Database {
  if (!db) {
    const dbPath = getDatabasePath();
    const dbDir = path.dirname(dbPath);

    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }

    db = initializeDatabase(dbPath);

    try {
      sqliteVec.load(db);
      vectorExtensionLoaded = true;
      vectorExtensionError = null;
    } catch (error) {
      vectorExtensionLoaded = false;
      vectorExtensionError = error instanceof Error ? error.message : 'unknown sqlite-vec load error';
    }
  }

  return db;
}

export function getVectorExtensionStatus(): { loaded: boolean; error: string | null } {
  return {
    loaded: vectorExtensionLoaded,
    error: vectorExtensionError,
  };
}

export function hasVectorTable(database: Database.Database): boolean {
  const result = database.prepare(
    "SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'sessions_vec'"
  ).get();
  return Boolean(result);
}

export function closeDatabase(): void {
  if (db) {
    db.close();
    db = null;
  }

  vectorExtensionLoaded = false;
  vectorExtensionError = null;
}
