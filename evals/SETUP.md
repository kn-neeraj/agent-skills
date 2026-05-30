# Evaluation System Setup

Automated evaluation for the HTML Slides skill with vision-based scoring and report generation.

## Quick Start

### 1. Install Dependencies

```bash
cd evals
npm install
```

### 2. Configure API Key

```bash
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY
```

### 3. Run Evaluation

```bash
npm run eval
```

This will:
1. Generate slides for all 18 prompts in dataset.json
2. Capture screenshots of each slide set
3. Score using Claude's vision API
4. Generate a markdown report with metrics

## Output

Results are saved in `results/run-[timestamp]/`:

```
results/run-2024-05-30T120000-000Z/
├── RESULTS.md              # Human-readable report
├── results.json            # Raw scores and data
└── screenshots/            # Generated screenshots
    ├── pitch_tech_startup/
    │   ├── slide-1.png
    │   ├── slide-2.png
    │   └── slide-3.png
    └── ... (other prompts)
```

## Report Format

The generated RESULTS.md includes:

- **Summary table** - Overall metrics and pass rates
- **Individual scores** - Readability, composition, consistency for each prompt
- **Category breakdown** - Performance by category (business, educational, edge cases)
- **Strengths** - Prompts scoring 4.5+ (visual quality)
- **Improvements** - Prompts scoring <3.5
- **Functionality issues** - Any broken navigation/interaction
- **Insights** - Per-criteria analysis

## Dataset

18 evaluation prompts covering:
- Business pitches (tech startup, sales deck)
- Educational content (Python, climate, workshops)
- Product/marketing (roadmap, demo, campaign)
- Edge cases (long titles, text-heavy, minimal briefs)

See `dataset.json` for all prompts.

## Rubric

Vision-based scoring on 4 criteria (1-5 scale each):

1. **Readability** - Text clarity, hierarchy, sizing, contrast
2. **Composition** - Layout balance, whitespace, positioning
3. **Consistency** - Visual uniformity across slides
4. **Functionality** - Navigation and keyboard controls working

See `rubric.md` for detailed scoring criteria.

## Metrics Tracked

- **Visual Quality Score** = (Readability + Composition + Consistency) / 3
- **Functionality Pass Rate** = % of prompts with working navigation
- **Average by Category** = Performance breakdown by content type
- **Failure Rate** = % of evaluations that errored

## Running Multiple Times

Each run creates a timestamped directory:
- `run-2024-05-30T120000-000Z/`
- `run-2024-05-30T130000-000Z/`
- etc.

Compare results across runs to detect regressions.

## Troubleshooting

### "Module not found: @anthropic-ai/sdk"
```bash
npm install
```

### "ANTHROPIC_API_KEY not set"
- Create `.env` file (copy from `.env.example`)
- Add your API key

### "Playwright installation failed"
```bash
npx playwright install
```

### "Invalid HTML generated"
- Check Claude API is responding correctly
- Verify build-slides SKILL.md is readable
- Check prompt format in dataset.json

## Development

Debug mode:
```bash
npm run eval:dev
```

## Customization

### Add new prompts
Edit `dataset.json` and add to the `prompts` array.

### Modify scoring criteria
Edit the rubric in `rubric.md` and update `SCORING_PROMPT` in `lib/scorer.js`.

### Change screenshot count
Edit `lib/screenshotter.js` - modify which slides are captured (first, middle, last).

### Add new metrics
Edit `lib/report-generator.js` to calculate and display additional metrics.
