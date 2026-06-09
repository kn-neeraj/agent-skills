import { formatConsoleOutput } from '../../../src/lib/formatters/console-formatter';
import { Session } from '../../../src/types/session';

describe('console-formatter', () => {
  it('should format single session', () => {
    const sessions: Session[] = [
      { date: new Date('2026-06-08'), title: 'Test Session', filename: 'test.md' },
    ];
    
    const result = formatConsoleOutput(sessions);
    expect(result).toContain('  2026-06-08  Test Session');
    expect(result).toContain('1 session');
  });

  it('should format multiple sessions', () => {
    const sessions: Session[] = [
      { date: new Date('2026-06-08'), title: 'Session 1', filename: '1.md' },
      { date: new Date('2026-06-09'), title: 'Session 2', filename: '2.md' },
    ];
    
    const result = formatConsoleOutput(sessions);
    expect(result).toContain('  2026-06-08  Session 1');
    expect(result).toContain('  2026-06-09  Session 2');
    expect(result).toContain('2 sessions');
  });

  it('should handle empty session list', () => {
    const result = formatConsoleOutput([]);
    expect(result).toBe('No sessions found');
  });

  it('should handle sessions with null dates', () => {
    const sessions: Session[] = [
      { date: null, title: 'Test Session', filename: 'test.md' },
    ];
    
    const result = formatConsoleOutput(sessions);
    expect(result).toContain('Unknown Date');
  });

  it('should sort sessions by date descending', () => {
    const sessions: Session[] = [
      { date: new Date('2026-06-01'), title: 'Old Session', filename: 'old.md' },
      { date: new Date('2026-06-08'), title: 'New Session', filename: 'new.md' },
    ];
    
    const result = formatConsoleOutput(sessions);
    const lines = result.split('\n');
    expect(lines[0]).toContain('New Session');
    expect(lines[1]).toContain('Old Session');
  });
});