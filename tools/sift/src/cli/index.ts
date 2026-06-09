#!/usr/bin/env node

import { Command } from 'commander';
import { createListCommand } from './list-command';

const program = new Command();

program
  .name('sift')
  .description('CLI tool for listing and filtering session summaries')
  .version('0.1.0');

program.addCommand(createListCommand());

program.parse(process.argv);