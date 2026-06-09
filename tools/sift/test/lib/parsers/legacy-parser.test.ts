import { parseLegacySession } from '../../../src/lib/parsers/legacy-parser';
import * as fs from 'fs/promises';

jest.mock('fs/promises');

describe('legacy-parser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should parse standard legacy format', async () => {
    const content = '# Title: Test Session\nContent here';
    const stats = { mtime: new Date('2026-06-08') };
    
    (fs.readFile as jest.Mock).mockResolvedValue(content);
    (fs.stat as jest.Mock).mockResolvedValue(stats);

    const result = await parseLegacySession('/path/to/session.md');
    
    expect(result.date).toEqual(new Date('2026-06-08'));
    expect(result.title).toBe('Test Session');
    expect(result.filename).toBe('session.md');
  });

  it('should handle standard h1 title', async () => {
    const content = '# Test Session\nContent here';
    const stats = { mtime: new Date('2026-06-08') };
    
    (fs.readFile as jest.Mock).mockResolvedValue(content);
    (fs.stat as jest.Mock).mockResolvedValue(stats);

    const result = await parseLegacySession('/path/to/session.md');
    expect(result.title).toBe('Test Session');
  });

  it('should handle empty file', async () => {
    const content = '';
    const stats = { mtime: new Date('2026-06-08') };
    
    (fs.readFile as jest.Mock).mockResolvedValue(content);
    (fs.stat as jest.Mock).mockResolvedValue(stats);

    const result = await parseLegacySession('/path/to/session.md');
    expect(result.title).toBe('');
  });

  it('should extract filename from path', async () => {
    const content = '# Title: Test\nContent';
    const stats = { mtime: new Date('2026-06-08') };
    
    (fs.readFile as jest.Mock).mockResolvedValue(content);
    (fs.stat as jest.Mock).mockResolvedValue(stats);

    const result = await parseLegacySession('/path/to/complex/path/to/session.md');
    expect(result.filename).toBe('session.md');
  });
});