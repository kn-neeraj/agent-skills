import { formatJsonOutput } from '../../../src/lib/formatters/json-formatter';
import { Session } from '../../../src/types/session';

describe('json-formatter', () => {
  it('should format single session as JSON', () => {
    const sessions: Session[] = [
      { date: new Date('2026-06-08'), title: 'Test Session', filename: 'test.md', summary: 'Test summary' },
    ];
    
    const result = formatJsonOutput(sessions);
    const parsed = JSON.parse(result);
    
    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].date).toBe('2026-06-08');
    expect(parsed[0].title).toBe('Test Session');
    expect(parsed[0].summary).toBe('Test summary');
    expect(parsed[0].filename).toBe('test.md');
  });

  it('should format multiple sessions as JSON array', () => {
    const sessions: Session[] = [
      { date: new Date('2026-06-08'), title: 'Session 1', filename: '1.md' },
      { date: new Date('2026-06-09'), title: 'Session 2', filename: '2.md' },
    ];
    
    const result = formatJsonOutput(sessions);
    const parsed = JSON.parse(result);
    
    expect(parsed).toHaveLength(2);
    expect(parsed[0].title).toBe('Session 2'); // Sorted descending
    expect(parsed[1].title).toBe('Session 1');
  });

  it('should handle empty session list', () => {
    const result = formatJsonOutput([]);
    const parsed = JSON.parse(result);
    
    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed).toHaveLength(0);
  });

  it('should handle sessions with null dates', () => {
    const sessions: Session[] = [
      { date: null, title: 'Test Session', filename: 'test.md' },
    ];
    
    const result = formatJsonOutput(sessions);
    const parsed = JSON.parse(result);
    
    expect(parsed[0].date).toBeNull();
  });

  it('should produce valid JSON', () => {
    const sessions: Session[] = [
      { date: new Date('2026-06-08'), title: 'Test "Session"', filename: 'test.md' },
    ];
    
    const result = formatJsonOutput(sessions);
    expect(() => JSON.parse(result)).not.toThrow();
  });
});