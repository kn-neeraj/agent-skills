import { computeHash } from '../../../src/lib/utils/hash';

describe('hash', () => {
  describe('computeHash', () => {
    it('should produce consistent hash for same content', () => {
      const content = 'test content';
      const hash1 = computeHash(content);
      const hash2 = computeHash(content);

      expect(hash1).toBe(hash2);
      expect(hash1).toHaveLength(64); // SHA256 produces 64 hex characters
    });

    it('should produce different hashes for different content', () => {
      const content1 = 'content 1';
      const content2 = 'content 2';
      const hash1 = computeHash(content1);
      const hash2 = computeHash(content2);

      expect(hash1).not.toBe(hash2);
    });

    it('should handle empty content', () => {
      const hash = computeHash('');
      expect(hash).toHaveLength(64);
    });

    it('should handle large content', () => {
      const content = 'x'.repeat(1000000); // 1MB
      const hash = computeHash(content);
      expect(hash).toHaveLength(64);
    });

    it('should handle special characters', () => {
      const content = '🚀 Test with emoji: 🎉 and unicode: 你好';
      const hash = computeHash(content);
      expect(hash).toHaveLength(64);
    });
  });
});