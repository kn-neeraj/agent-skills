import { filterByDate } from '../../../src/lib/filters/date-filter';
import { Session } from '../../../src/types/session';

describe('date-filter', () => {
  it('should filter sessions after given date', () => {
    const sessions: Session[] = [
      { date: new Date('2026-06-01'), title: 'Session 1', filename: '1.md' },
      { date: new Date('2026-06-08'), title: 'Session 2', filename: '2.md' },
      { date: new Date('2026-06-15'), title: 'Session 3', filename: '3.md' },
    ];
    
    const result = filterByDate(sessions, '2026-06-05');
    expect(result).toHaveLength(2);
    expect(result[0].title).toBe('Session 2');
    expect(result[1].title).toBe('Session 3');
  });

  it('should include sessions on exact date', () => {
    const sessions: Session[] = [
      { date: new Date('2026-06-08'), title: 'Session 1', filename: '1.md' },
      { date: new Date('2026-06-15'), title: 'Session 2', filename: '2.md' },
    ];
    
    const result = filterByDate(sessions, '2026-06-08');
    expect(result).toHaveLength(2);
  });

  it('should throw error for invalid date format', () => {
    const sessions: Session[] = [
      { date: new Date('2026-06-08'), title: 'Session 1', filename: '1.md' },
    ];
    
    expect(() => filterByDate(sessions, 'invalid-date')).toThrow(
      'Invalid date format'
    );
  });

  it('should handle sessions with null dates', () => {
    const sessions: Session[] = [
      { date: null, title: 'Session 1', filename: '1.md' },
      { date: new Date('2026-06-08'), title: 'Session 2', filename: '2.md' },
    ];
    
    const result = filterByDate(sessions, '2026-06-01');
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Session 2');
  });
});