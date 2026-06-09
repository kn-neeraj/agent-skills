import dayjs from 'dayjs';
import { Session } from '../../types/session';

export function filterByDate(sessions: Session[], sinceDate: string): Session[] {
  const since = dayjs(sinceDate);
  
  if (!since.isValid()) {
    throw new Error(
      `Invalid date format: ${sinceDate}. Use YYYY-MM-DD format.`
    );
  }
  
  return sessions.filter(session => {
    if (!session.date) {
      return false;
    }
    const sessionDate = dayjs(session.date);
    return sessionDate.isSame(since) || sessionDate.isAfter(since);
  });
}