# Setup Guide

## Quick Start

### Step 1: Configure Your API (One-time)

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

### Step 2: Create Slides with /build-slides Skill

```
/build-slides Create a 5-slide pitch deck about AI agents
```

The `/build-slides` skill will generate an HTML file and save it (usually to your downloads or a specified output directory).

### Step 3: Evaluate the Generated Slides

```bash
npm run eval:auto -- --html-path /path/to/generated-slides.html
```

That's it! The system will:
- Load your stored configuration
- Automatically evaluate the HTML slides using your rubric
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

# Evaluate generated slides (minimal)
npm run eval:auto -- --html-path /path/to/slides.html

# Evaluate with prompt name and text (for better reporting)
npm run eval:auto -- --html-path /path/to/slides.html --prompt-name "my-pitch" --prompt-text "Create a pitch deck"

# View debug output
npm run eval:dev -- --html-path /path/to/slides.html
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

## Workflow

1. **Create slides** — Use the `/build-slides` skill to generate HTML presentations
2. **Evaluate** — Run `npm run eval:auto -- --html-path <path>` to evaluate
3. **Review** — Check `EVALUATIONS.md` for scores and history

This ensures you're evaluating actual skill output, not a programmatic approximation.

## For Customers

This setup is designed for customer ease of use:

1. **Evaluate real skill output** — Test actual `/build-slides` skill quality
2. **One-time configuration** — Set it once, forget about it
3. **Secure storage** — Credentials stored locally, not in scripts or environment
4. **Flexible providers** — Choose Anthropic or OpenRouter based on your needs
5. **No manual key management** — No `export` commands needed

---

## Results

After running an evaluation, check:

- **Master Report:** `results/EVALUATIONS.md`
- **Generated HTML:** `results/<prompt-name>-<timestamp>.html`

View the HTML files in your browser to see the generated slides. Check EVALUATIONS.md for the consolidated evaluation history with all scores and timestamps.
