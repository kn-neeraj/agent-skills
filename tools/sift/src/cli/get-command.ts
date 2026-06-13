import { Command } from 'commander';
import { getDatabase } from '../lib/database/connection';

export function createGetCommand(): Command {
  const command = new Command('get')
    .description('Get session by slug')
    .argument('<slug>', 'Session slug (filename without .md)')
    .action(async (slug) => {
      try {
        const db = getDatabase();

        const result = db.prepare(`
          SELECT slug, date, title, files_touched, short_summary, body, indexed_at
          FROM sessions
          WHERE slug = ?
        `).get(slug) as {
          slug: string;
          date: string | null;
          title: string;
          files_touched: string;
          short_summary: string;
          body: string;
          indexed_at: string;
        } | undefined;

        if (!result) {
          console.error(`Session not found: ${slug}`);
          process.exit(1);
        }

        console.log(`Slug: ${result.slug}`);
        console.log(`Date: ${result.date || 'Unknown Date'}`);
        console.log(`Title: ${result.title}`);
        console.log(`Indexed: ${result.indexed_at}`);
        console.log('');

        let filesTouched;
        try {
          filesTouched = JSON.parse(result.files_touched);
        } catch {
          filesTouched = [];
        }

        if (Array.isArray(filesTouched) && filesTouched.length > 0) {
          console.log('Files Touched:');
          filesTouched.forEach((file: string) => console.log(`- ${file}`));
          console.log('');
        }

        console.log('Summary:');
        console.log(result.short_summary);
        console.log('');

        console.log('Body:');
        console.log(result.body);

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