import fs from 'fs';
import os from 'os';
import path from 'path';
import { getConfigPath, getDefaultConfig, loadConfig } from '../../src/lib/config';

describe('config', () => {
  const originalHome = process.env.HOME;
  let testDir: string;

  beforeEach(() => {
    testDir = path.join(os.tmpdir(), `sift-config-${Date.now()}`);
    fs.mkdirSync(testDir, { recursive: true });
    process.env.HOME = testDir;
  });

  afterEach(() => {
    process.env.HOME = originalHome;
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  it('should return default config when config file is missing', () => {
    expect(loadConfig()).toEqual(getDefaultConfig());
  });

  it('should parse config file overrides', () => {
    const siftDir = path.join(testDir, '.sift');
    fs.mkdirSync(siftDir, { recursive: true });
    fs.writeFileSync(getConfigPath(), [
      'embeddings:',
      '  provider: ollama',
      '  model: custom-embed:latest',
      '  url: http://localhost:1234',
      '',
    ].join('\n'));

    expect(loadConfig()).toEqual({
      embeddings: {
        provider: 'ollama',
        model: 'custom-embed:latest',
        url: 'http://localhost:1234',
        apiKey: undefined,
      },
    });
  });
});
