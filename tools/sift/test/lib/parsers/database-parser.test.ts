import { parseSessionForDatabase, DatabaseSession } from '../../../src/lib/parsers/database-parser';

describe('database-parser', () => {
  describe('parseSessionForDatabase', () => {
    it('should parse valid frontmatter session', () => {
      const content = `---
date: 2026-06-13
title: Test Session
files_touched: ["src/cli/index.ts", "src/lib/parsers/*.ts"]
short_summary: This is a test summary
---
Session body content here`;

      const result = parseSessionForDatabase(content, 'test-session.md');

      expect(result).toBeDefined();
      expect(result!.slug).toBe('test-session');
      expect(result!.date).toBe('2026-06-13');
      expect(result!.title).toBe('Test Session');
      expect(JSON.parse(result!.files_touched)).toEqual(['src/cli/index.ts', 'src/lib/parsers/*.ts']);
      expect(result!.files_touched_fts).toBe('src/cli/index.ts src/lib/parsers/*.ts');
      expect(result!.short_summary).toBe('This is a test summary');
      expect(result!.body).toBe('Session body content here');
      expect(result!.hash).toHaveLength(64);
    });

    it('should handle missing optional fields', () => {
      const content = `---
title: Minimal Session
---
Body content`;

      const result = parseSessionForDatabase(content, 'minimal.md');

      expect(result).toBeDefined();
      expect(result!.date).toBeNull();
      expect(result!.title).toBe('Minimal Session');
      expect(result!.files_touched).toBe('[]');
      expect(result!.files_touched_fts).toBe('');
      expect(result!.short_summary).toBe('');
    });

    it('should handle invalid files_touched JSON', () => {
      const content = `---
title: Invalid Files
files_touched: not valid json
---
Body`;

      const result = parseSessionForDatabase(content, 'invalid-files.md');

      expect(result).toBeDefined();
      expect(result!.files_touched).toBe('not valid json');
      expect(result!.files_touched_fts).toBe('');
    });

    it('should handle empty files_touched array', () => {
      const content = `---
title: No Files
files_touched: []
---
Body`;

      const result = parseSessionForDatabase(content, 'no-files.md');

      expect(result).toBeDefined();
      expect(result!.files_touched).toBe('[]');
      expect(result!.files_touched_fts).toBe('');
    });

    it('should generate slug from filename', () => {
      const content = `---
title: Test
---
Body`;

      const result = parseSessionForDatabase(content, '2026-06-13-test-session.md');

      expect(result!.slug).toBe('2026-06-13-test-session');
    });

    it('should handle files_touched with single file', () => {
      const content = `---
title: Single File
files_touched: ["index.ts"]
---
Body`;

      const result = parseSessionForDatabase(content, 'single-file.md');

      expect(result!.files_touched_fts).toBe('index.ts');
    });

    it('should handle special characters in body', () => {
      const content = `---
title: Special Chars
---
Body with emojis: 🚀 and unicode: 你好`;

      const result = parseSessionForDatabase(content, 'special-chars.md');

      expect(result!.body).toContain('🚀');
      expect(result!.body).toContain('你好');
    });

    it('should handle large content', () => {
      const largeBody = 'x'.repeat(100000);
      const content = `---
title: Large Content
---
${largeBody}`;

      const result = parseSessionForDatabase(content, 'large.md');

      expect(result!.body).toHaveLength(100000);
    });

    it('should return null for malformed frontmatter', () => {
      const content = `---
invalid yaml structure
---
Body`;

      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
      const result = parseSessionForDatabase(content, 'malformed.md');

      expect(result).toBeNull();
      expect(consoleWarnSpy).toHaveBeenCalled();
      
      consoleWarnSpy.mockRestore();
    });

    it('should handle empty content', () => {
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
      const result = parseSessionForDatabase('', 'empty.md');

      expect(result).toBeNull();

      consoleWarnSpy.mockRestore();
    });

    it('should produce consistent hash for same content', () => {
      const content = `---
title: Test
---
Body`;

      const result1 = parseSessionForDatabase(content, 'test.md');
      const result2 = parseSessionForDatabase(content, 'test.md');

      expect(result1!.hash).toBe(result2!.hash);
    });

    it('should produce different hashes for different content', () => {
      const content1 = `---
title: Test 1
---
Body 1`;

      const content2 = `---
title: Test 2
---
Body 2`;

      const result1 = parseSessionForDatabase(content1, 'test1.md');
      const result2 = parseSessionForDatabase(content2, 'test2.md');

      expect(result1!.hash).not.toBe(result2!.hash);
    });
  });
});
