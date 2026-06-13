import { Command } from 'commander';
import { getDatabase } from '../lib/database/connection';
import { listSessionFiles } from '../lib/file-operations';
import path from 'path';

export function createStatusCommand(): Command {
  const command = new Command('status')
    .description('Show index status')
    .action(async () => {
      try {
        const sessionsDir = path.join(process.cwd(), 'docs', 'sessions');
        const db = getDatabase();

        const files = await listSessionFiles(sessionsDir);
        const fileCount = files.length;

        const sessionCount = db.prepare(`SELECT COUNT(*) as count FROM sessions`)
          .get() as { count: number };

        const metaResult = db.prepare(`SELECT value FROM meta WHERE key = 'indexed_at'`)
          .get() as { value: string } | undefined;

        const indexedAt = metaResult ? metaResult.value : 'Never';

        console.log(`Sessions directory: ${sessionsDir}`);
        console.log(`Files on disk: ${fileCount}`);
        console.log(`Sessions indexed: ${sessionCount.count}`);

        if (fileCount === sessionCount.count) {
          console.log('Status: All files indexed ✅');
        } else {
          const diff = fileCount - sessionCount.count;
          console.log(`Status: ${diff} files not indexed - run 'sift index' ⚠️`);
        }

        console.log(`Last indexed: ${indexedAt}`);
        console.log(`Database: ~/.sift/index.sqlite`);

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