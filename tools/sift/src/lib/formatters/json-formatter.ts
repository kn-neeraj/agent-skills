import dayjs from 'dayjs';
import { Session } from '../../types/session';

export interface JsonSession {
  date: string | null;
  title: string;
  summary?: string;
  filename: string;
}

export function formatJsonOutput(sessions: Session[]): string {
  // Sort by date descending
  const sorted = [...sessions].sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return b.date.getTime() - a.date.getTime();
  });

  const jsonSessions: JsonSession[] = sorted.map(session => ({
    date: session.date ? dayjs(session.date).format('YYYY-MM-DD') : null,
    title: session.title,
    summary: session.summary,
    filename: session.filename
  }));

  return JSON.stringify(jsonSessions, null, 2);
}