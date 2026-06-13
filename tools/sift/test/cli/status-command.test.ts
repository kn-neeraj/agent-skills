import { createStatusCommand } from '../../src/cli/status-command';
import { Command } from 'commander';

describe('status-command', () => {
  describe('createStatusCommand', () => {
    it('should create status command', () => {
      const command = createStatusCommand();
      expect(command).toBeInstanceOf(Command);
      expect(command.name()).toBe('status');
    });

    it('should have correct description', () => {
      const command = createStatusCommand();
      expect(command.description()).toContain('Show index status');
    });

    it('should require no arguments', () => {
      const command = createStatusCommand();
      expect(command.args.length).toBe(0);
    });
  });
});