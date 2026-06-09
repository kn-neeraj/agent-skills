import { listSessionFiles, readFileContent, getDefaultSessionsDir } from '../../src/lib/file-operations';
import * as fs from 'fs/promises';
import * as path from 'path';

jest.mock('fs/promises');

describe('file-operations', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('listSessionFiles', () => {
    it('should return sorted markdown files', async () => {
      const mockFiles = ['session1.md', 'session2.md', 'other.txt'];
      (fs.readdir as jest.Mock).mockResolvedValue(mockFiles);
      
      (fs.stat as jest.Mock).mockImplementation(() => 
        Promise.resolve({ mtime: { getTime: () => Date.now() } })
      );

      const result = await listSessionFiles('/test/dir');
      expect(result).toEqual(['session1.md', 'session2.md']);
    });

    it('should return empty array for non-existent directory', async () => {
      const error = new Error('Directory not found') as NodeJS.ErrnoException;
      error.code = 'ENOENT';
      (fs.readdir as jest.Mock).mockRejectedValue(error);

      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
      const result = await listSessionFiles('/nonexistent');
      
      expect(result).toEqual([]);
      expect(consoleWarnSpy).toHaveBeenCalledWith('Sessions directory not found: /nonexistent');
      consoleWarnSpy.mockRestore();
    });

    it('should return empty array for directory with no markdown files', async () => {
      (fs.readdir as jest.Mock).mockResolvedValue(['file1.txt', 'file2.js']);
      const result = await listSessionFiles('/test/dir');
      expect(result).toEqual([]);
    });
  });

  describe('readFileContent', () => {
    it('should read file content successfully', async () => {
      const mockContent = '# Session Title\nContent here';
      (fs.readFile as jest.Mock).mockResolvedValue(mockContent);

      const result = await readFileContent('/test/file.md');
      expect(result).toBe(mockContent);
    });

    it('should return empty string on error', async () => {
      (fs.readFile as jest.Mock).mockRejectedValue(new Error('Read error'));
      
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
      const result = await readFileContent('/test/file.md');
      
      expect(result).toBe('');
      expect(consoleWarnSpy).toHaveBeenCalled();
      consoleWarnSpy.mockRestore();
    });
  });

  describe('getDefaultSessionsDir', () => {
    it('should return path to docs/sessions', () => {
      const result = getDefaultSessionsDir();
      expect(result).toContain('docs/sessions');
    });
  });
});