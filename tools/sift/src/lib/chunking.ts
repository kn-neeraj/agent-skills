import { computeHash } from './utils/hash';
import { SessionChunk } from '../types/embedding';

const MAX_CHARS = 2000;
const MIN_SOFT_BREAK = 1200;

function normalizeText(text: string): string {
  return text
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function sectionize(body: string): string[] {
  const normalized = normalizeText(body);
  if (!normalized) {
    return [];
  }

  const parts = normalized.split(/(?=^##\s+)/m).map((part) => part.trim()).filter(Boolean);
  return parts.length > 0 ? parts : [normalized];
}

function paragraphize(section: string): string[] {
  return section.split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean);
}

function splitHard(text: string, maxChars = MAX_CHARS): string[] {
  const parts: string[] = [];
  let remaining = text.trim();

  while (remaining.length > maxChars) {
    const window = remaining.slice(0, maxChars);
    let splitAt = Math.max(window.lastIndexOf('\n'), window.lastIndexOf(' '));
    if (splitAt < MIN_SOFT_BREAK) {
      splitAt = maxChars;
    }

    parts.push(remaining.slice(0, splitAt).trim());
    remaining = remaining.slice(splitAt).trim();
  }

  if (remaining) {
    parts.push(remaining);
  }

  return parts;
}

function splitSection(section: string): string[] {
  if (section.length <= MAX_CHARS) {
    return [section];
  }

  const paragraphs = paragraphize(section);
  const chunks: string[] = [];
  let current = '';

  for (const paragraph of paragraphs) {
    if (paragraph.length > MAX_CHARS) {
      if (current) {
        chunks.push(current.trim());
        current = '';
      }
      chunks.push(...splitHard(paragraph));
      continue;
    }

    const candidate = current ? `${current}\n\n${paragraph}` : paragraph;
    if (candidate.length <= MAX_CHARS) {
      current = candidate;
    } else {
      if (current) {
        chunks.push(current.trim());
      }
      current = paragraph;
    }
  }

  if (current) {
    chunks.push(current.trim());
  }

  return chunks;
}

export function createSessionChunks(
  slug: string,
  title: string,
  shortSummary: string,
  body: string
): SessionChunk[] {
  const prefix = normalizeText([title, shortSummary].filter(Boolean).join('\n\n'));
  const sections = sectionize(body);
  const bodyChunks = sections.flatMap(splitSection);

  const emittedBodyChunks = bodyChunks.length > 0 ? bodyChunks : [''];

  return emittedBodyChunks.map((chunk, index) => {
    const text = normalizeText([prefix, chunk].filter(Boolean).join('\n\n'));
    return {
      id: `${slug}:${index}`,
      slug,
      seq: index,
      text,
      hash: computeHash(text),
    };
  });
}
