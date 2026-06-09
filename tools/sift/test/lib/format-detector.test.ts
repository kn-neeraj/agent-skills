import { detectFormat } from '../../src/lib/format-detector';

describe('format-detector', () => {
  describe('detectFormat', () => {
    it('should detect frontmatter format', () => {
      const content = `---
date: 2026-06-08
title: Test Session
summary: Test summary
---
Content here`;
      
      const result = detectFormat(content);
      expect(result.type).toBe('frontmatter');
      expect(result.data).toHaveProperty('date');
      expect(result.data).toHaveProperty('title');
    });

    it('should detect legacy format', () => {
      const content = `# Title: Test Session
Content here`;
      
      const result = detectFormat(content);
      expect(result.type).toBe('legacy');
    });

    it('should handle empty content', () => {
      const result = detectFormat('');
      expect(result.type).toBe('legacy');
    });
  });
});