export interface Session {
  date: Date | null;
  title: string;
  summary?: string;
  filename: string;
}

export type FormatType = 'frontmatter' | 'legacy' | 'unknown';

export interface FormatDetectionResult {
  type: FormatType;
  content: string;
  data?: any;
}