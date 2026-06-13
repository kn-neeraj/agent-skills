import { createSearchCommand } from '../../src/cli/search-command';
import { Command } from 'commander';

describe('search-command', () => {
  describe('createSearchCommand', () => {
    it('should create search command', () => {
      const command = createSearchCommand();
      expect(command).toBeInstanceOf(Command);
      expect(command.name()).toBe('search');
    });

    it('should have query argument', () => {
      const command = createSearchCommand();
      expect(command.registeredArguments.length).toBe(1);
    });

    it('should have --since option', () => {
      const command = createSearchCommand();
      const sinceOption = command.options.find((opt: any) => opt.long === '--since');
      expect(sinceOption).toBeDefined();
    });

    it('should have --limit option', () => {
      const command = createSearchCommand();
      const limitOption = command.options.find((opt: any) => opt.long === '--limit');
      expect(limitOption).toBeDefined();
    });

    it('should have default limit of 5', () => {
      const command = createSearchCommand();
      const limitOption = command.options.find((opt: any) => opt.long === '--limit');
      expect(limitOption!.defaultValue).toBe('5');
    });

    it('should have --debug option', () => {
      const command = createSearchCommand();
      const debugOption = command.options.find((opt: any) => opt.long === '--debug');
      expect(debugOption).toBeDefined();
    });
  });
});
