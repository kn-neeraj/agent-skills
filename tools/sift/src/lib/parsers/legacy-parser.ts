import * as fs from 'fs/promises';
import { Session } from '../../types/session';

export async function parseLegacySession(
  filePath: string
): Promise<Session> {
  const filename = filePath.split('/').pop() || filePath;
  
  // Get file modification time as date
  const stats = await fs.stat(filePath);
  const date = stats.mtime;
  
  // Read file content to extract title
  const content = await fs.readFile(filePath, 'utf-8');
  const lines = content.split('\n');
  
  let title = '';
  const titlePattern1 = /^# Title:\s*(.+)$/i;
  const titlePattern2 = /^#\s*(.+)$/i;
  
  for (const line of lines) {
    let match = line.match(titlePattern1);
    if (match) {
      title = match[1].trim();
      break;
    }
    
    match = line.match(titlePattern2);
    if (match) {
      // Only use this if it's the first line and doesn't contain other markdown patterns
      if (line.trim().startsWith('#')) {
        const potentialTitle = match[1].trim();
        // Avoid matching things like "# Summary" or other common headers
        if (!potentialTitle.toLowerCase().includes('summary') && 
            !potentialTitle.toLowerCase().includes('summary:') &&
            !potentialTitle.toLowerCase().includes('session:') &&
            !potentialTitle.toLowerCase().includes('topic:') &&
            !potentialTitle.toLowerCase().includes('status:')) {
          title = potentialTitle;
          break;
        }
      }
    }
  }
  
  return {
    date,
    title,
    filename
  };
}