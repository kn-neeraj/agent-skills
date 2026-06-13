import fs from 'fs';
import os from 'os';
import path from 'path';
import { parse } from 'yaml';
import { SiftConfig } from '../types/embedding';

const DEFAULT_CONFIG: SiftConfig = {
  embeddings: {
    provider: 'ollama',
    model: 'embeddinggemma:latest',
    url: 'http://localhost:11434',
  },
};

function ensureString(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.trim() !== '' ? value.trim() : fallback;
}

export function getSiftHome(): string {
  return path.join(process.env.HOME || os.homedir(), '.sift');
}

export function getConfigPath(): string {
  return path.join(getSiftHome(), 'config.yml');
}

export function getDefaultConfig(): SiftConfig {
  return {
    embeddings: { ...DEFAULT_CONFIG.embeddings },
  };
}

export function loadConfig(): SiftConfig {
  const configPath = getConfigPath();
  const defaults = getDefaultConfig();

  if (!fs.existsSync(configPath)) {
    return defaults;
  }

  try {
    const raw = fs.readFileSync(configPath, 'utf8');
    const parsed = parse(raw) as Record<string, unknown> | null;
    const embeddings = (parsed?.embeddings ?? {}) as Record<string, unknown>;

    return {
      embeddings: {
        provider: ensureString(embeddings.provider, defaults.embeddings.provider),
        model: ensureString(embeddings.model, defaults.embeddings.model),
        url: ensureString(embeddings.url, defaults.embeddings.url),
        apiKey: typeof embeddings.apiKey === 'string' ? embeddings.apiKey : undefined,
      },
    };
  } catch {
    return defaults;
  }
}
