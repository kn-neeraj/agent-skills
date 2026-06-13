import { loadConfig } from '../config';
import { EmbedResult, EmbeddingsConfig } from '../../types/embedding';

export const EMBED_VERSION = '1';

export class EmbeddingProviderError extends Error {}

function trimTrailingSlash(url: string): string {
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

export function getEmbeddingsConfig(): EmbeddingsConfig {
  return loadConfig().embeddings;
}

export function validateEmbeddingsConfig(config: EmbeddingsConfig): string | null {
  if (config.provider !== 'ollama') {
    return `Embedding provider "${config.provider}" is not supported yet`;
  }

  if (!config.model) {
    return 'Embedding model is not configured';
  }

  if (!config.url) {
    return 'Embedding URL is not configured';
  }

  return null;
}

export async function embedTexts(
  inputs: string[],
  config: EmbeddingsConfig = getEmbeddingsConfig()
): Promise<EmbedResult> {
  const validationError = validateEmbeddingsConfig(config);
  if (validationError) {
    throw new EmbeddingProviderError(validationError);
  }

  const response = await fetch(`${trimTrailingSlash(config.url)}/api/embed`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: config.model,
      input: inputs,
      truncate: true,
    }),
  });

  if (!response.ok) {
    throw new EmbeddingProviderError(`Embedding request failed with status ${response.status}`);
  }

  const payload = await response.json() as { model?: string; embeddings?: number[][] };
  if (!payload.embeddings || !Array.isArray(payload.embeddings) || payload.embeddings.length === 0) {
    throw new EmbeddingProviderError('Embedding response did not include embeddings');
  }

  return {
    model: payload.model || config.model,
    embeddings: payload.embeddings,
  };
}
