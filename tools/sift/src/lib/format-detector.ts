import matter from 'gray-matter';
import { FormatDetectionResult, FormatType } from '../types/session';

export function detectFormat(content: string): FormatDetectionResult {
  try {
    const parsed = matter(content);
    
    if (parsed.data && Object.keys(parsed.data).length > 0) {
      // Check if we have meaningful frontmatter data (not just empty keys)
      const hasValidFields = Object.keys(parsed.data).some(key => {
        const value = parsed.data[key];
        return value !== null && value !== undefined && value !== '';
      });
      
      if (hasValidFields) {
        return {
          type: 'frontmatter',
          content: parsed.content,
          data: parsed.data
        };
      }
    }
    
    return {
      type: 'legacy',
      content: content
    };
  } catch (error) {
    console.warn('Invalid frontmatter detected, treating as legacy format');
    return {
      type: 'legacy',
      content: content
    };
  }
}