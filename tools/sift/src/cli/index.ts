#!/usr/bin/env node

import { Command } from 'commander';
import { createListCommand } from './list-command';
import { createIndexCommand } from './index-command';
import { createSearchCommand } from './search-command';
import { createGetCommand } from './get-command';
import { createStatusCommand } from './status-command';

const program = new Command();

program
  .name('sift')
  .description('CLI tool for searching session summaries')
  .version('0.2.0');

program.addCommand(createListCommand());
program.addCommand(createIndexCommand());
program.addCommand(createSearchCommand());
program.addCommand(createGetCommand());
program.addCommand(createStatusCommand());

program.parse(process.argv);