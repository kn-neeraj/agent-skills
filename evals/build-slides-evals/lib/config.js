/**
 * Configuration Loader
 *
 * Loads API credentials from .evalrc.json
 * Supports: Anthropic, OpenRouter
 */

const fs = require('fs');
const path = require('path');

const CONFIG_FILE = path.join(__dirname, '..', '.evalrc.json');

function getConfig() {
  if (!fs.existsSync(CONFIG_FILE)) {
    throw new Error(
      `Configuration not found.\n\nRun: npm run eval:setup`
    );
  }

  try {
    const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));

    if (!config.provider || !config.apiKey || !config.model) {
      throw new Error('Configuration incomplete. Missing provider, apiKey, or model.');
    }

    return config;
  } catch (error) {
    throw new Error(`Failed to load configuration: ${error.message}`);
  }
}

module.exports = { getConfig };
