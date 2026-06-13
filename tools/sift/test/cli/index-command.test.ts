import { createIndexCommand } from '../../src/cli/index-command';
import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import os from 'os';

describe('index-command', () => {
  let testDir: string;
  let sessionsDir: string;
  const originalHome = process.env.HOME;

  beforeEach(() => {
    testDir = path.join(os.tmpdir(), `sift-test-${Date.now()}`);
    sessionsDir = path.join(testDir, 'docs', 'sessions');
    fs.mkdirSync(sessionsDir, { recursive: true });
    process.env.HOME = testDir;
  });

  afterEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    process.env.HOME = originalHome;
  });

  describe('createIndexCommand', () => {
    it('should create index command', () => {
      const command = createIndexCommand();
      expect(command).toBeInstanceOf(Command);
      expect(command.name()).toBe('index');
    });

    it('should have correct description', () => {
      const command = createIndexCommand();
      expect(command.description()).toContain('Index session files');
    });

    it('should require no arguments', () => {
      const command = createIndexCommand();
      expect(command.args.length).toBe(0);
    });
  });

  describe('index command execution', () => {
    it('should index session files', async () => {
      const sessionContent = `---
date: 2026-06-13
title: Test Session
files_touched: ["test.ts"]
short_summary: Test summary
---
Body content`;

      fs.writeFileSync(path.join(sessionsDir, 'test-session.md'), sessionContent);

      const command = createIndexCommand();
      await command.parseAsync(['node', 'test', 'index']);

      const dbPath = path.join(testDir, '.sift', 'index.sqlite');
      expect(fs.existsSync(dbPath)).toBe(true);
    });

    it('should handle empty sessions directory', async () => {
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

      const command = createIndexCommand();
      await command.parseAsync(['node', 'test', 'index']);

      expect(consoleLogSpy).toHaveBeenCalledWith('No session files found');

      consoleLogSpy.mockRestore();
    });

    it('should handle non-existent sessions directory', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const processExitSpy = jest.spyOn(process, 'exit').mockImplementation();

      const wrongDir = path.join(testDir, 'wrong-path');
      process.chdir(wrongDir);

      const command = createIndexCommand();
      await command.parseAsync(['node', 'test', 'index']);

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('Sessions directory not found')
      );

      consoleErrorSpy.mockRestore();
      processExitSpy.mockRestore();
    });
  });
});