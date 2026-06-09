import matter from 'gray-matter';
import dayjs from 'dayjs';
import { Session } from '../../types/session';

export function parseFrontmatterSession(
  content: string,
  filename: string
): Session {
  const parsed = matter(content);
  const data = parsed.data as any;
  
  let date: Date | null = null;
  if (data.date) {
    const parsedDate = dayjs(data.date);
    if (parsedDate.isValid()) {
      date = parsedDate.toDate();
    } else {
      console.warn(`Invalid date format in ${filename}: ${data.date}`);
    }
  } else {
    console.warn(`Missing date field in ${filename}`);
  }

  const title = data.title || '';
  if (!data.title) {
    console.warn(`Missing title field in ${filename}`);
  }

  const summary = data.short_summary || data.summary || undefined;

  return {
    date,
    title,
    summary,
    filename
  };
}