# Setup Guide

## Quick Start

The evaluation system uses a **one-time setup** to configure your API credentials. No need to manage environment variables!

### Step 1: Configure Your API

```bash
npm run eval:setup
```

This will prompt you to:
1. **Choose your API provider**
   - Anthropic (claude.anthropic.com)
   - OpenRouter (openrouter.ai)
2. **Enter your API key**
3. **Select a model** (or use defaults)

Your configuration is saved to `.evalrc.json` (automatically ignored by git).

### Step 2: Run Evaluations

```bash
npm run eval:auto -- --prompts custom-evals mcp-connector-ecosystem
```

That's it! The system will:
- Load your stored configuration
- Generate slides using the build-slides skill
- Automatically evaluate them
- Store results in a consolidated report

---

## Supported Providers

### Anthropic

- **Get API key:** https://console.anthropic.com/account/keys
- **Default model:** `claude-opus-4-6`
- **Alternative models:** `claude-3-5-sonnet-20241022`, etc.

### OpenRouter

- **Get API key:** https://openrouter.ai/keys
- **Model format:** `openrouter/anthropic/claude-opus-4-6` or `anthropic/claude-3.5-sonnet`
- **Benefits:**
  - Load balancing across multiple providers
  - Fallback models if primary is unavailable
  - Unified API for testing multiple models
  - See all available models: https://openrouter.ai/docs/models

---

## Commands

```bash
# Configure your API (one-time setup)
npm run eval:setup

# Run evaluation with inline prompt
npm run eval:auto -- --prompt "Create a pitch deck about AI"

# Run evaluation from prompt set
npm run eval:auto -- --prompts custom-evals mcp-connector-ecosystem

# View debug output
npm run eval:dev -- --prompts custom-evals mcp-connector-ecosystem
```

---

## Configuration File

Your configuration is stored in `.evalrc.json` (git-ignored):

```json
{
  "provider": "openrouter",
  "apiKey": "sk_or_xxxxxxxxxxxxx",
  "model": "openrouter/anthropic/claude-opus-4-6",
  "createdAt": "2026-06-06T14:30:22.000Z"
}
```

To reconfigure later, run `npm run eval:setup` again.

---

## Troubleshooting

### "Configuration file not found"

Run `npm run eval:setup` to create your configuration.

### "Invalid API key"

Make sure your API key is correct. Get a new one from:
- Anthropic: https://console.anthropic.com/account/keys
- OpenRouter: https://openrouter.ai/keys

### "Model not found"

For OpenRouter, verify the model name at: https://openrouter.ai/docs/models

For Anthropic, use: `claude-opus-4-6`, `claude-3-5-sonnet-20241022`, etc.

---

## For Customers

This setup is designed for customer ease of use:

1. **One-time configuration** — Set it once, forget about it
2. **Secure storage** — Credentials stored locally, not in scripts or environment
3. **Flexible providers** — Choose Anthropic or OpenRouter based on your needs
4. **CI/CD ready** — Still supports environment variables for automation
5. **No manual key management** — No `export` commands needed

---

## Results

After running an evaluation, check:

- **Master Report:** `results/EVALUATIONS.md`
- **Generated HTML:** `results/<prompt-name>-<timestamp>.html`

View the HTML files in your browser to see the generated slides. Check EVALUATIONS.md for the consolidated evaluation history with all scores and timestamps.
