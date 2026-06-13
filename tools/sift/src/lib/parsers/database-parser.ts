import matter from 'gray-matter';
import { Session } from '../../types/session';
import { computeHash } from '../utils/hash';

export function parseSessionForDatabase(
  content: string,
  filename: string
): DatabaseSession | null {
  try {
    if (!content.trim()) {
      console.warn(`Failed to parse session ${filename}: file is empty`);
      return null;
    }

    const slug = filename.replace(/\.md$/, '');
    const hash = computeHash(content);
    const parsed = matter(content);
    const data = parsed.data as any;

    if (data && typeof data !== 'object') {
      console.warn(`Failed to parse session ${filename}: invalid frontmatter structure`);
      return null;
    }

    const date = data.date || null;
    const title = data.title || '';
    const filesTouchedValue = data.files_touched ?? [];
    const shortSummary = data.short_summary || '';
    const body = parsed.content || '';

    const filesTouched = Array.isArray(filesTouchedValue)
      ? JSON.stringify(filesTouchedValue)
      : String(filesTouchedValue);

    // Convert date to ISO string if it's a Date object
    let dateString: string | null = null;
    if (date) {
      dateString = date instanceof Date ? date.toISOString().split('T')[0] : String(date);
    }

    let filesTouchedFts = '';
    try {
      const filesArray = JSON.parse(filesTouched);
      filesTouchedFts = Array.isArray(filesArray) ? filesArray.join(' ') : '';
    } catch {
      filesTouchedFts = '';
    }

    return {
      slug,
      date: dateString,
      title: String(title),
      files_touched: String(filesTouched),
      files_touched_fts: String(filesTouchedFts),
      short_summary: String(shortSummary),
      body: String(body),
      hash: String(hash),
    };
  } catch (error) {
    console.warn(`Failed to parse session ${filename}: ${error}`);
    return null;
  }
}

export interface DatabaseSession {
  slug: string;
  date: string | null;
  title: string;
  files_touched: string;
  files_touched_fts: string;
  short_summary: string;
  body: string;
  hash: string;
  indexed_at?: string;
}
