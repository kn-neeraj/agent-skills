import * as fs from 'fs/promises';
import * as path from 'path';

export async function listSessionFiles(sessionsDir: string): Promise<string[]> {
  try {
    const files = await fs.readdir(sessionsDir);
    const mdFiles = files.filter(file => file.endsWith('.md'));
    
    // Sort by modification time (newest first)
    const filesWithStats = await Promise.all(
      mdFiles.map(async file => {
        const fullPath = path.join(sessionsDir, file);
        const stats = await fs.stat(fullPath);
        return { file, mtime: stats.mtime.getTime() };
      })
    );

    filesWithStats.sort((a, b) => b.mtime - a.mtime);

    return filesWithStats.map(f => f.file);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      console.warn(`Sessions directory not found: ${sessionsDir}`);
      return [];
    }
    throw error;
  }
}

export async function readFileContent(filePath: string): Promise<string> {
  try {
    return await fs.readFile(filePath, 'utf-8');
  } catch (error) {
    console.warn(`Failed to read file ${filePath}: ${error}`);
    return '';
  }
}

export function getDefaultSessionsDir(): string {
  // Assuming we're in the workspace root
  return path.join(process.cwd(), 'docs', 'sessions');
}