import { Command } from 'commander';
import path from 'path';
import * as fs from 'fs';
import { getDatabase } from '../lib/database/connection';
import { listSessionFiles, readFileContent } from '../lib/file-operations';
import { parseSessionForDatabase } from '../lib/parsers/database-parser';

export function createIndexCommand(): Command {
  const command = new Command('index')
    .description('Index session files in database')
    .action(async () => {
      try {
        const sessionsDir = path.join(process.cwd(), 'docs', 'sessions');

        if (!fs.existsSync(sessionsDir)) {
          console.error(`Sessions directory not found: ${sessionsDir}`);
          process.exit(1);
        }

        const files = await listSessionFiles(sessionsDir);

        if (files.length === 0) {
          console.log('No session files found');
          return;
        }

        const db = getDatabase();

        let indexed = 0;
        let updated = 0;
        let skipped = 0;

        const insertStmt = db.prepare(`
          INSERT INTO sessions
          (slug, date, title, files_touched, files_touched_fts, short_summary, body, hash, indexed_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        const updateStmt = db.prepare(`
          UPDATE sessions
          SET date = ?, title = ?, files_touched = ?, files_touched_fts = ?,
              short_summary = ?, body = ?, hash = ?, indexed_at = ?
          WHERE slug = ?
        `);

        const deleteFtsStmt = db.prepare(`DELETE FROM sessions_fts WHERE rowid = ?`);
        const insertFtsStmt = db.prepare(`
          INSERT INTO sessions_fts (rowid, title, short_summary, files_touched_fts, body)
          VALUES (?, ?, ?, ?, ?)
        `);

        const getRowidStmt = db.prepare(`SELECT rowid FROM sessions WHERE slug = ?`);
        const getHashStmt = db.prepare(`SELECT hash FROM sessions WHERE slug = ?`);

        for (const file of files) {
          const filePath = path.join(sessionsDir, file);
          const content = await readFileContent(filePath);

          if (!content) {
            console.warn(`Failed to read file: ${file}`);
            continue;
          }

          const session = parseSessionForDatabase(content, file);
          if (!session) {
            console.warn(`Failed to parse session: ${file}`);
            continue;
          }

          const slug = file.replace(/\.md$/, '');

          const existing = getHashStmt.get(slug) as { hash: string } | undefined;

          if (!existing) {
            const info = insertStmt.run(
              session.slug,
              session.date || null,
              session.title,
              session.files_touched,
              session.files_touched_fts,
              session.short_summary,
              session.body,
              session.hash,
              new Date().toISOString()
            );

            insertFtsStmt.run(
              info.lastInsertRowid,
              session.title,
              session.short_summary,
              session.files_touched_fts,
              session.body
            );

            indexed++;
          } else if (existing.hash !== session.hash) {
            updateStmt.run(
              session.date || null,
              session.title,
              session.files_touched,
              session.files_touched_fts,
              session.short_summary,
              session.body,
              session.hash,
              new Date().toISOString(),
              slug
            );

            const rowidResult = getRowidStmt.get(slug) as { rowid: number } | undefined;
            if (rowidResult) {
              deleteFtsStmt.run(rowidResult.rowid);
              insertFtsStmt.run(
                rowidResult.rowid,
                session.title,
                session.short_summary,
                session.files_touched_fts,
                session.body
              );
            }

            updated++;
          } else {
            skipped++;
          }
        }

        const updateMetaStmt = db.prepare(`
          INSERT INTO meta (key, value) VALUES ('indexed_at', ?)
          ON CONFLICT(key) DO UPDATE SET value = excluded.value
        `);
        updateMetaStmt.run(new Date().toISOString());

        console.log(`Indexed ${indexed} sessions`);
        console.log(`Updated ${updated} sessions`);
        console.log(`Skipped ${skipped} sessions`);
        console.log(`Last indexed: ${new Date().toISOString()}`);

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