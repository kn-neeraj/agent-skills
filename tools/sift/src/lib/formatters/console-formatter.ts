import dayjs from 'dayjs';
import { Session } from '../../types/session';

export function formatConsoleOutput(sessions: Session[]): string {
  if (sessions.length === 0) {
    return 'No sessions found';
  }

  // Sort by date descending
  const sorted = [...sessions].sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return b.date.getTime() - a.date.getTime();
  });

  const lines = sorted.map(session => {
    const dateStr = session.date ? dayjs(session.date).format('YYYY-MM-DD') : 'Unknown Date';
    return `  ${dateStr}  ${session.title}`;
  });

  lines.push(`\n${sessions.length} session${sessions.length !== 1 ? 's' : ''}`);

  return lines.join('\n');
}