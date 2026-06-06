# Evaluation System - Simple Setup

## 3 Steps to Evaluate Slides

### Step 1: Configure API (one-time)

```bash
npm run eval:setup
```

Choose:
- **Provider**: OpenRouter
- **API Key**: Get from https://openrouter.ai/keys
- **Model**: Use any vision-capable model like `openai/gpt-4-vision` or `anthropic/claude-3-5-sonnet`

### Step 2: Run Evaluation

```bash
npm run eval:auto -- --html-path /path/to/slides.html --prompt-name "my-slides"
```

### Step 3: View Results

Results saved to: `results/evaluations.json`

## How It Works

1. **Screenshot**: Takes screenshots of your slides using Playwright
2. **Evaluate**: Sends screenshots to your LLM with evaluation rubric
3. **Score**: Returns scores on:
   - Readability (1-5)
   - Composition (1-5)
   - Consistency (1-5)
   - Functionality (Works/Broken)

## Supported Models

Any vision-capable model on OpenRouter:
- `openai/gpt-4-vision`
- `anthropic/claude-3-5-sonnet`
- `openai/gpt-4o`
- See all: https://openrouter.ai/docs/models

## That's It!

No complex setup, no dataset files, no extra configuration. Just: setup → evaluate → results.
