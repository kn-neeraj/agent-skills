#!/usr/bin/env node

/**
 * Setup Wizard
 *
 * Interactive setup to configure API credentials for the evaluation system.
 * Creates a .evalrc.json file with stored configuration.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const CONFIG_FILE = path.join(__dirname, '..', '.evalrc.json');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function main() {
  console.log('\n🔧 Evaluation System Setup Wizard\n');
  console.log('This will configure your API credentials for the evaluation system.\n');

  // Check if config already exists
  if (fs.existsSync(CONFIG_FILE)) {
    console.log(`Found existing configuration at ${CONFIG_FILE}`);
    const overwrite = await question('Do you want to reconfigure? (yes/no): ');
    if (overwrite.toLowerCase() !== 'yes' && overwrite.toLowerCase() !== 'y') {
      console.log('Setup cancelled. Using existing configuration.\n');
      rl.close();
      return;
    }
  }

  // Select provider
  console.log('\nSelect API Provider:');
  console.log('  1. Anthropic (claude.anthropic.com)');
  console.log('  2. OpenRouter (openrouter.ai)\n');

  let provider;
  let providerChoice = await question('Choose provider (1 or 2): ');

  if (providerChoice === '1') {
    provider = 'anthropic';
    console.log('\n→ You selected Anthropic');
    console.log('  Get your API key at: https://console.anthropic.com/account/keys\n');
  } else if (providerChoice === '2') {
    provider = 'openrouter';
    console.log('\n→ You selected OpenRouter');
    console.log('  Get your API key at: https://openrouter.ai/keys\n');
  } else {
    console.error('Invalid choice. Please run setup again.');
    rl.close();
    process.exit(1);
  }

  // Get API key
  const apiKey = await question('Enter your API key: ');
  if (!apiKey) {
    console.error('API key cannot be empty.');
    rl.close();
    process.exit(1);
  }

  // Get model
  let modelPrompt = 'Enter model name: ';
  if (provider === 'anthropic') {
    modelPrompt =
      'Enter model name (default: claude-opus-4-6, or claude-3-5-sonnet-20241022): ';
  } else if (provider === 'openrouter') {
    modelPrompt =
      'Enter model (e.g., openrouter/anthropic/claude-opus-4-6 or anthropic/claude-3.5-sonnet): ';
  }

  let model = await question(modelPrompt);

  // Set defaults
  if (!model) {
    if (provider === 'anthropic') {
      model = 'claude-opus-4-6';
    } else if (provider === 'openrouter') {
      model = 'openrouter/anthropic/claude-opus-4-6';
    }
  }

  // Create config object
  const config = {
    provider,
    apiKey,
    model,
    createdAt: new Date().toISOString(),
  };

  // Save config
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8');
    console.log(`\n✓ Configuration saved to ${CONFIG_FILE}`);
    console.log(`\nSetup complete!`);
    console.log(`  Provider: ${provider}`);
    console.log(`  Model: ${model}\n`);
    console.log('You can now run evaluations:');
    console.log('  npm run eval:auto -- --prompts custom-evals mcp-connector-ecosystem\n');
  } catch (error) {
    console.error(`Failed to save configuration: ${error.message}`);
    rl.close();
    process.exit(1);
  }

  rl.close();
}

main().catch((error) => {
  console.error('Setup failed:', error.message);
  process.exit(1);
});
