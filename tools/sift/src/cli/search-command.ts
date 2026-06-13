import { Command } from 'commander';
import { getDatabase } from '../lib/database/connection';

export function createSearchCommand(): Command {
  const command = new Command('search')
    .description('Search sessions using full-text search')
    .argument('<query>', 'Search query')
    .option('--since <date>', 'Filter sessions from this date onwards (YYYY-MM-DD)')
    .option('--limit <n>', 'Maximum number of results', '5')
    .action(async (query, options) => {
      try {
        if (!query || query.trim() === '') {
          console.error('Search query cannot be empty');
          process.exit(1);
        }

        const db = getDatabase();
        const limit = parseInt(options.limit, 10);

        if (isNaN(limit) || limit < 1) {
          console.error('Limit must be a positive integer');
          process.exit(1);
        }

        let sql = `
          SELECT s.slug, s.date, s.title, s.short_summary, bm25(sessions_fts, 3.0, 2.0, 1.5, 1.0) as score
          FROM sessions_fts
          JOIN sessions s ON s.rowid = sessions_fts.rowid
          WHERE sessions_fts MATCH ?
        `;

        const params: any[] = [query];

        if (options.since) {
          sql += ` AND s.date >= ?`;
          params.push(options.since);
        }

        sql += ` ORDER BY score ASC LIMIT ?`;
        params.push(limit);

        const results = db.prepare(sql).all(...params) as Array<{
          slug: string;
          date: string | null;
          title: string;
          short_summary: string;
          score: number;
        }>;

        if (results.length === 0) {
          console.log('No results found');
          return;
        }

        for (const result of results) {
          const score = result.score.toFixed(3);
          const date = result.date || 'Unknown Date';
          console.log(`score: ${score}  ${date}  ${result.title}`);
          console.log(`  ${result.short_summary}`);
          console.log('');
        }

        console.log(`${results.length} result${results.length !== 1 ? 's' : ''}`);

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