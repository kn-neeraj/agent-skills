# Evaluation System Usage Guide

## Quick Start

### Run an evaluation

```bash
cd evals/build-slides-evals

# Evaluate specific prompts from a set
npm run eval -- --prompts custom-evals pitch-tech-startup marketing-campaign

# Evaluate all prompts in a set
npm run eval -- --prompts custom-evals all
```

### Review results

Results are saved to `evals/build-slides-evals/results/`:

```
results/
├── eval-result-2026-06-06-run-1.md (results file)
├── 2026-06-06-run-1/ (contains generated HTML slides)
│   ├── pitch-tech-startup-2026-06-06-143022.html
│   ├── marketing-campaign-2026-06-06-143045.html
│   └── ...
├── eval-result-2026-06-15-run-2.md (second eval run)
└── 2026-06-15-run-2/
    ├── pitch-tech-startup-2026-06-15-091500.html
    └── ...
```

Open the `.md` files in GitHub or your editor to see scores and metrics. Open the `.html` files in a web browser to view the generated slides.

## Workflow: Before and After

### Baseline Evaluation (Run 1)

1. Define test prompts in `prompts/custom-evals.json`
2. Run evaluation: `npm run eval -- --prompts custom-evals all`
3. Review results in `eval-result-2026-06-06-run-1.md`
4. Record baseline metrics: Average Visual Quality, Pass Rate, Consistency

### Make Improvements

1. Update `build-slides/SKILL.md` with quality improvements (typography, spacing, interactions, etc.)
2. Test changes locally
3. Commit improvements to git

### Re-evaluation (Run 2)

1. Run same evaluation with same prompts: `npm run eval -- --prompts custom-evals all`
2. System auto-generates new run ID: `2026-06-15-run-2`
3. Review new results in `eval-result-2026-06-15-run-2.md`
4. Compare metrics: Did they improve?

### Compare Results

Open both result files side-by-side:

```
Run 1 (2026-06-06):
- Average Visual Quality: 4.0/5.0
- Functionality Pass Rate: 100%

Run 2 (2026-06-15):
- Average Visual Quality: 4.3/5.0 ✓ IMPROVED
- Functionality Pass Rate: 100%
```

## Evaluation Scoring

When you run an evaluation, the system will prompt you for scores for each prompt:

### Criteria (1-5 scale)

**Readability:** How clear and easy to read is the text?
- 5 = Clear hierarchy, excellent contrast, appropriately sized text
- 4 = Good hierarchy, mostly clear, minor issues
- 3 = Readable but some hierarchy issues
- 2 = Hard to read, poor contrast
- 1 = Illegible, terrible contrast

**Composition:** Is the layout well-balanced?
- 5 = Well-balanced, excellent whitespace, all elements positioned properly
- 4 = Good layout, appropriate spacing, minor issues
- 3 = Acceptable but uneven spacing
- 2 = Poor balance, awkward spacing
- 1 = Chaotic, overlapping elements

**Consistency:** Do all slides feel cohesive?
- 5 = Perfectly consistent fonts, colors, spacing
- 4 = Mostly consistent with minor variations
- 3 = Generally consistent but some drift
- 2 = Inconsistent, noticeable variations
- 1 = Chaotic, every slide looks different

**Functionality:** Does it work?
- **Works** = Navigation buttons respond, keyboard shortcuts work, presenter view functional
- **Broken** = Any of the above don't work

**Notes:** Optional observations (e.g., "Text too dense", "Excellent typography", "Navigation sluggish")

### Example Evaluation Session

```
ℹ️  [1/3] pitch-tech-startup

📝 Evaluating: pitch-tech-startup
   Scoring scale: 1=poor, 2=fair, 3=acceptable, 4=good, 5=excellent

Readability (1-5): 4
Composition (1-5): 4
Consistency (1-5): 4
Functionality (Works/Broken): Works
Notes (optional): Good hierarchy, minor spacing inconsistencies

✓ Evaluated: {"readability":4,"composition":4,"consistency":4,"functionality":"Works","notes":"Good hierarchy, minor spacing inconsistencies"}
```

## Prompt Sets

### Listing Available Sets

See `prompts/INDEX.md` for all available prompt sets.

### Creating New Prompt Set

1. Create `prompts/my-new-set.json` following `PROMPTS_FORMAT.md`
2. Add entry to `prompts/INDEX.md`
3. Commit: `git add prompts/my-new-set.json prompts/INDEX.md`

Example:

```json
{
  "name": "my-new-set",
  "description": "Testing specific scenarios",
  "created": "2026-06-06",
  "prompts": [
    {
      "name": "test-scenario-1",
      "prompt": "Your prompt text here...",
      "category": "business_pitch",
      "length": 5
    }
  ]
}
```

## Understanding Results

### Metrics Explained

| Metric | What It Means | Target |
|--------|---------------|--------|
| **Average Visual Quality** | Overall visual polish across all prompts | > 4.0 |
| **Functionality Pass Rate** | % of prompts where slides work correctly | 100% |
| **Consistency Average** | How uniform are fonts, colors, spacing? | > 4.0 |
| **Quality Std Dev** | How much do scores vary? Low = stable | < 1.0 |
| **Readability Average** | Text clarity and hierarchy quality | > 3.8 |
| **Composition Average** | Layout balance and spacing quality | > 3.8 |

### Interpreting Improvements

When you re-run evals after improvements:

- **+0.3 or more in any metric** = Meaningful improvement
- **-0.1 or more** = Possible regression (investigate)
- **Functionality Pass Rate drops below 100%** = Check what broke
- **Consistency drops** = Quality systems may need refinement

## Troubleshooting

### "Prompt set not found"

Make sure the file exists and name matches exactly:
- File: `prompts/custom-evals.json`
- Command: `npm run eval -- --prompts custom-evals all`

### "No matching prompts found"

Check that prompt names exist in the set:

```bash
# View all prompts in custom-evals.json
cat prompts/custom-evals.json | grep '"name"'
```

### Results not generated

Check that you completed all scoring prompts and didn't interrupt the script.

Results should appear in: `evals/build-slides-evals/results/eval-result-YYYY-MM-DD-run-N.md`

## Next Steps

See `TRACKING.md` for how to compare results across multiple eval runs and track quality trends over time.
