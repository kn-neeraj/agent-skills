# HTML Slides Skill Evaluation

This directory contains the evaluation system for the `build-slides` skill.

## Contents

- **dataset.json** - Evaluation dataset with diverse prompts
- **rubric.md** - Visual scoring rubric (4 criteria)
- **metrics.md** - Metrics definitions and output structure
- **results/** - Evaluation results and screenshots

## Workflow

1. Run each prompt from `dataset.json` through the skill
2. Capture screenshots of generated slides
3. Score each using the criteria in `rubric.md`
4. Record results in the metrics table format
5. Track regressions and quality trends

## Running Evals

```bash
# Generate slides from all prompts
npm run eval:generate

# Score slides (manual or automated)
npm run eval:score

# Generate report
npm run eval:report
```

See rubric.md for scoring criteria.
