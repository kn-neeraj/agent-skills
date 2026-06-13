import { initializeDatabase, getDatabasePath } from '../../../src/lib/database/schema';
import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import os from 'os';

describe('database schema', () => {
  let testDbPath: string;
  let db: Database.Database;

  beforeEach(() => {
    const testDir = path.join(os.tmpdir(), 'sift-test');
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
    testDbPath = path.join(testDir, `test-${Date.now()}.sqlite`);
    db = initializeDatabase(testDbPath);
  });

  afterEach(() => {
    if (db) {
      db.close();
    }
    if (fs.existsSync(testDbPath)) {
      fs.unlinkSync(testDbPath);
    }
  });

  describe('initializeDatabase', () => {
    it('should create database file', () => {
      expect(fs.existsSync(testDbPath)).toBe(true);
    });

    it('should create sessions table', () => {
      const result = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='sessions'").get();
      expect(result).toBeDefined();
    });

    it('should create sessions_fts table', () => {
      const result = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='sessions_fts'").get();
      expect(result).toBeDefined();
    });

    it('should create meta table', () => {
      const result = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='meta'").get();
      expect(result).toBeDefined();
    });

    it('should enable foreign keys', () => {
      const result = db.pragma('foreign_keys', { simple: true });
      expect(result).toBe(1);
    });
  });

  describe('getDatabasePath', () => {
    it('should return path in user home directory', () => {
      const dbPath = getDatabasePath();
      expect(dbPath).toContain('.sift');
      expect(dbPath).toContain('index.sqlite');
    });

    it('should use OS home directory', () => {
      const dbPath = getDatabasePath();
      expect(dbPath).toContain(os.homedir());
    });
  });

  describe('sessions table schema', () => {
    it('should accept row insert with all fields', () => {
      const insertStmt = db.prepare(`
        INSERT INTO sessions
        (slug, date, title, files_touched, files_touched_fts, short_summary, body, hash, indexed_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const result = insertStmt.run(
        'test-session',
        '2026-06-13',
        'Test Session',
        '["file1.ts", "file2.ts"]',
        'file1.ts file2.ts',
        'Test summary',
        'Test body content',
        'abc123',
        new Date().toISOString()
      );

      expect(result.changes).toBe(1);

      const row = db.prepare('SELECT * FROM sessions WHERE slug = ?').get('test-session') as any;
      expect(row.slug).toBe('test-session');
      expect(row.date).toBe('2026-06-13');
      expect(row.title).toBe('Test Session');
    });

    it('should enforce slug as primary key', () => {
      const insertStmt = db.prepare(`
        INSERT INTO sessions
        (slug, date, title, files_touched, files_touched_fts, short_summary, body, hash, indexed_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      insertStmt.run('duplicate', '2026-06-13', 'Test', '[]', '', 'Summary', 'Body', 'hash', new Date().toISOString());

      expect(() => {
        insertStmt.run('duplicate', '2026-06-14', 'Test 2', '[]', '', 'Summary', 'Body', 'hash2', new Date().toISOString());
      }).toThrow();
    });
  });

  describe('sessions_fts table schema', () => {
    it('should accept full-text search insert', () => {
      const insertSessionStmt = db.prepare(`
        INSERT INTO sessions
        (slug, date, title, files_touched, files_touched_fts, short_summary, body, hash, indexed_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const sessionResult = insertSessionStmt.run(
        'test-fts',
        '2026-06-13',
        'FTS Test Session',
        '["file.ts"]',
        'file.ts',
        'Searchable summary text',
        'Searchable body content',
        'hash',
        new Date().toISOString()
      );

      const insertFtsStmt = db.prepare(`
        INSERT INTO sessions_fts (rowid, title, short_summary, files_touched_fts, body)
        VALUES (?, ?, ?, ?, ?)
      `);

      insertFtsStmt.run(
        sessionResult.lastInsertRowid,
        'FTS Test Session',
        'Searchable summary text',
        'file.ts',
        'Searchable body content'
      );

      const searchResult = db.prepare(`
        SELECT * FROM sessions_fts WHERE sessions_fts MATCH 'searchable'
      `).all() as any[];

      expect(searchResult).toHaveLength(1);
      expect(searchResult[0].title).toBe('FTS Test Session');
    });
  });
});