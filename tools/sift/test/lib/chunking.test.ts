import { createSessionChunks } from '../../src/lib/chunking';

describe('chunking', () => {
  it('should include title and summary in every chunk', () => {
    const chunks = createSessionChunks(
      'session-a',
      'Session Title',
      'Short summary',
      '## Detailed Summary\n\nBody paragraph'
    );

    expect(chunks).toHaveLength(1);
    expect(chunks[0].text).toContain('Session Title');
    expect(chunks[0].text).toContain('Short summary');
    expect(chunks[0].text).toContain('## Detailed Summary');
  });

  it('should split large sections deterministically', () => {
    const longParagraph = 'A'.repeat(2500);
    const body = `## Detailed Summary\n\n${longParagraph}\n\n## Decisions Made\n\nDone`;

    const first = createSessionChunks('session-b', 'Title', 'Summary', body);
    const second = createSessionChunks('session-b', 'Title', 'Summary', body);

    expect(first.length).toBeGreaterThan(1);
    expect(first.map((chunk) => chunk.id)).toEqual(second.map((chunk) => chunk.id));
    expect(first.map((chunk) => chunk.hash)).toEqual(second.map((chunk) => chunk.hash));
  });

  it('should emit at least one chunk for empty body', () => {
    const chunks = createSessionChunks('session-c', 'Title', 'Summary', '');

    expect(chunks).toHaveLength(1);
    expect(chunks[0].text).toContain('Title');
    expect(chunks[0].text).toContain('Summary');
  });
});
