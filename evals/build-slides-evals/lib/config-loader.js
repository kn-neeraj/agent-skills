/**
 * Configuration Loader
 *
 * Loads API credentials from .evalrc.json and initializes the appropriate API client
 * Supports multiple providers: Anthropic, OpenRouter, etc.
 */

const fs = require('fs');
const path = require('path');

const CONFIG_FILE = path.join(__dirname, '..', '.evalrc.json');

/**
 * Load configuration from .evalrc.json
 * @returns {Object} Configuration object with provider, apiKey, model
 */
function loadConfig() {
  if (!fs.existsSync(CONFIG_FILE)) {
    throw new Error(
      `Configuration file not found: ${CONFIG_FILE}\n\nRun 'npm run eval:setup' to configure your API credentials.`
    );
  }

  try {
    const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));

    // Validate required fields
    if (!config.provider) {
      throw new Error('Missing "provider" in configuration');
    }
    if (!config.apiKey) {
      throw new Error('Missing "apiKey" in configuration');
    }
    if (!config.model) {
      throw new Error('Missing "model" in configuration');
    }

    return config;
  } catch (error) {
    throw new Error(`Failed to load configuration: ${error.message}`);
  }
}

/**
 * Create API client based on configured provider
 * @returns {Object} Initialized Anthropic API client
 */
function createClient() {
  const config = loadConfig();
  const Anthropic = require('@anthropic-ai/sdk');

  if (config.provider === 'anthropic') {
    return new Anthropic({
      apiKey: config.apiKey,
    });
  } else if (config.provider === 'openrouter') {
    return new Anthropic({
      apiKey: config.apiKey,
      baseURL: 'https://openrouter.ai/api/v1',
    });
  } else {
    throw new Error(`Unknown provider: ${config.provider}`);
  }
}

/**
 * Get the configured model name
 * @returns {string} Model name to use in API calls
 */
function getModel() {
  const config = loadConfig();
  return config.model;
}

/**
 * Get provider name for display
 * @returns {string} Provider name
 */
function getProvider() {
  const config = loadConfig();
  return config.provider;
}

module.exports = {
  loadConfig,
  createClient,
  getModel,
  getProvider,
  CONFIG_FILE,
};
