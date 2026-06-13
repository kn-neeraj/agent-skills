import { createGetCommand } from '../../src/cli/get-command';
import { Command } from 'commander';

describe('get-command', () => {
  describe('createGetCommand', () => {
    it('should create get command', () => {
      const command = createGetCommand();
      expect(command).toBeInstanceOf(Command);
      expect(command.name()).toBe('get');
    });

    it('should have slug argument', () => {
      const command = createGetCommand();
      expect(command.registeredArguments.length).toBe(1);
    });

    it('should have correct description', () => {
      const command = createGetCommand();
      expect(command.description()).toContain('Get session by slug');
    });
  });
});
