import { Command } from 'commander';
import * as path from 'path';
import { listSessionFiles, readFileContent } from '../lib/file-operations';
import { detectFormat } from '../lib/format-detector';
import { parseFrontmatterSession } from '../lib/parsers/frontmatter-parser';
import { parseLegacySession } from '../lib/parsers/legacy-parser';
import { filterByDate } from '../lib/filters/date-filter';
import { formatConsoleOutput } from '../lib/formatters/console-formatter';
import { formatJsonOutput } from '../lib/formatters/json-formatter';

export function createListCommand(): Command {
  const command = new Command('list')
    .description('List session summaries')
    .option('--since <date>', 'Filter sessions from this date onwards (YYYY-MM-DD)')
    .option('--json', 'Output as JSON')
    .action(async (options) => {
      try {
        // Get sessions directory
        const sessionsDir = path.join(process.cwd(), 'docs', 'sessions');
        
        // List session files
        const files = await listSessionFiles(sessionsDir);
        
        if (files.length === 0) {
          console.log('No sessions found');
          return;
        }
        
        // Parse sessions
        const sessions = [];
        for (const file of files) {
          const filePath = path.join(sessionsDir, file);
          const content = await readFileContent(filePath);
          
          if (!content) continue;
          
          const detection = detectFormat(content);
          
          let session;
          if (detection.type === 'frontmatter') {
            session = parseFrontmatterSession(content, file);
          } else {
            session = await parseLegacySession(filePath);
          }
          
          sessions.push(session);
        }
        
        // Filter by date if requested
        let filteredSessions = sessions;
        if (options.since) {
          filteredSessions = filterByDate(sessions, options.since);
        }
        
        // Output
        if (options.json) {
          console.log(formatJsonOutput(filteredSessions));
        } else {
          console.log(formatConsoleOutput(filteredSessions));
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
          process.exit(1);
        }
        console.error('An unexpected error occurred');
        process.exit(1);
      }
    });
    
  return command;
}