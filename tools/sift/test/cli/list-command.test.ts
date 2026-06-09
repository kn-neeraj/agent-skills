import { createListCommand } from '../../src/cli/list-command';
import { Command } from 'commander';

describe('list-command', () => {
  it('should create list command', () => {
    const command = createListCommand();
    expect(command).toBeInstanceOf(Command);
    expect(command.name()).toBe('list');
  });

  it('should have --since option', () => {
    const command = createListCommand();
    const options = command.options;
    const sinceOption = options.find(opt => opt.long === '--since');
    expect(sinceOption).toBeDefined();
  });

  it('should have --json option', () => {
    const command = createListCommand();
    const options = command.options;
    const jsonOption = options.find(opt => opt.long === '--json');
    expect(jsonOption).toBeDefined();
  });
});