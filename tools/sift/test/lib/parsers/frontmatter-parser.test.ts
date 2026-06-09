import { parseFrontmatterSession } from '../../../src/lib/parsers/frontmatter-parser';

describe('frontmatter-parser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should parse valid frontmatter session', () => {
    const content = `---
date: 2026-06-08
title: Test Session
short_summary: Test summary
---
Content here`;
    
    const result = parseFrontmatterSession(content, 'session.md');
    
    expect(result.date).toBeInstanceOf(Date);
    expect(result.title).toBe('Test Session');
    expect(result.summary).toBe('Test summary');
    expect(result.filename).toBe('session.md');
  });

  it('should handle missing date field', () => {
    const content = `---
title: Test Session
---
Content here`;
    
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const result = parseFrontmatterSession(content, 'session.md');
    
    expect(result.date).toBeNull();
    expect(consoleWarnSpy).toHaveBeenCalledWith('Missing date field in session.md');
    consoleWarnSpy.mockRestore();
  });

  it('should handle invalid date format', () => {
    const content = `---
date: invalid-date
title: Test Session
---
Content here`;
    
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const result = parseFrontmatterSession(content, 'session.md');
    
    expect(result.date).toBeNull();
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Invalid date format')
    );
    consoleWarnSpy.mockRestore();
  });

  it('should handle missing title field', () => {
    const content = `---
date: 2026-06-08
---
Content here`;
    
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const result = parseFrontmatterSession(content, 'session.md');
    
    expect(result.title).toBe('');
    expect(consoleWarnSpy).toHaveBeenCalledWith('Missing title field in session.md');
    consoleWarnSpy.mockRestore();
  });

  it('should handle missing summary field', () => {
    const content = `---
date: 2026-06-08
title: Test Session
---
Content here`;
    
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const result = parseFrontmatterSession(content, 'session.md');
    
    expect(result.summary).toBeUndefined();
    consoleWarnSpy.mockRestore();
  });

  it('should handle summary field instead of short_summary', () => {
    const content = `---
date: 2026-06-08
title: Test Session
summary: Alternative summary field
---
Content here`;
    
    const result = parseFrontmatterSession(content, 'session.md');
    expect(result.summary).toBe('Alternative summary field');
  });
});