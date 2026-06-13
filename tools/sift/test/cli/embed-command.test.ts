import { createEmbedCommand } from '../../src/cli/embed-command';
import { Command } from 'commander';

describe('embed-command', () => {
  describe('createEmbedCommand', () => {
    it('should create embed command', () => {
      const command = createEmbedCommand();
      expect(command).toBeInstanceOf(Command);
      expect(command.name()).toBe('embed');
    });

    it('should have correct description', () => {
      const command = createEmbedCommand();
      expect(command.description()).toContain('semantic embeddings');
    });

    it('should expose --force option', () => {
      const command = createEmbedCommand();
      const forceOption = command.options.find((opt: any) => opt.long === '--force');
      expect(forceOption).toBeDefined();
    });
  });
});
