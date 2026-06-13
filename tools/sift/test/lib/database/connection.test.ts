import { getDatabase, closeDatabase } from '../../../src/lib/database/connection';
import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import os from 'os';

describe('database connection', () => {
  const originalHome = process.env.HOME;
  let testDir: string;

  beforeEach(() => {
    closeDatabase(); // Reset singleton
    testDir = path.join(os.tmpdir(), `sift-test-${Date.now()}`);
    fs.mkdirSync(testDir, { recursive: true });
    process.env.HOME = testDir;
  });

  afterEach(() => {
    closeDatabase();
    process.env.HOME = originalHome;
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  describe('getDatabase', () => {
    it('should create database directory and file', () => {
      const db = getDatabase();
      const dbPath = path.join(process.env.HOME!, '.sift', 'index.sqlite');
      
      expect(fs.existsSync(dbPath)).toBe(true);
      expect(db.open).toBe(true);
      
      db.close();
    });

    it('should return same database instance on multiple calls', () => {
      const db1 = getDatabase();
      const db2 = getDatabase();
      
      expect(db1).toBe(db2);
      
      db1.close();
    });

    it('should create all required tables', () => {
      const db = getDatabase();
      
      const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all() as any[];
      const tableNames = tables.map((t: any) => t.name);
      
      expect(tableNames).toContain('sessions');
      expect(tableNames).toContain('sessions_fts');
      expect(tableNames).toContain('meta');
      
      db.close();
    });

    it('should enable foreign keys', () => {
      const db = getDatabase();
      const result = db.pragma('foreign_keys', { simple: true });
      
      expect(result).toBe(1);
      
      db.close();
    });

    it('should create database in user home directory', () => {
      const db = getDatabase();
      const dbPath = path.join(process.env.HOME!, '.sift', 'index.sqlite');
      
      expect(dbPath).toContain(testDir);
      expect(fs.existsSync(dbPath)).toBe(true);
      
      db.close();
    });
  });

  describe('closeDatabase', () => {
    it('should close database connection', () => {
      const db = getDatabase();
      const isOpenBefore = db.open;
      
      closeDatabase();
      
      expect(isOpenBefore).toBe(true);
    });

    it('should allow reopening database after close', () => {
      const db1 = getDatabase();
      closeDatabase();
      
      const db2 = getDatabase();
      
      expect(db1).not.toBe(db2);
      expect(db2.open).toBe(true);
      
      db2.close();
    });

    it('should handle closing database that was never opened', () => {
      expect(() => {
        closeDatabase();
        closeDatabase(); // Close again
      }).not.toThrow();
    });
  });
});
