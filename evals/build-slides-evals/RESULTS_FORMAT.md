# Results File Format

This document specifies the structure and content of evaluation result files.

## Overview

Evaluation results are stored as markdown files in `results/` directory. Each evaluation run generates:
- A unique run directory: `results/<run-id>/` (contains generated HTML slides)
- A results file: `results/eval-result-<run-id>.md` (contains scores and metrics)

Run IDs follow the pattern: `YYYY-MM-DD-run-N` (e.g., `2026-06-06-run-1`, `2026-06-15-run-2`)

## Directory Structure

```
evals/build-slides-evals/results/
├── 2026-06-06-run-1/
│   ├── pitch-tech-startup-2026-06-06-143022.html
│   ├── marketing-campaign-2026-06-06-143045.html
│   └── ...
├── eval-result-2026-06-06-run-1.md
├── 2026-06-15-run-2/
│   ├── pitch-tech-startup-2026-06-15-091500.html
│   ├── marketing-campaign-2026-06-15-091523.html
│   └── ...
└── eval-result-2026-06-15-run-2.md
```

## Results File Format

File: `eval-result-<run-id>.md`

### Header Section

```markdown
---
run_id: 2026-06-06-run-1
timestamp: 2026-06-06T14:30:22Z
prompt_set: custom-evals
prompts_evaluated: 12
build_slides_commit: abc1234
evaluator: Claude
---

# Evaluation Results: custom-evals (Run 1)

**Run ID:** 2026-06-06-run-1
**Date:** 2026-06-06
**Prompt Set:** custom-evals (12 prompts)
**Build Slides Version:** abc1234 (git commit hash)
**Evaluator:** Claude (Human evaluation)
**Evaluation Time:** 2026-06-06 14:30:22 UTC
```

### Individual Scores Section

```markdown
## Individual Scores

| # | Prompt Name | Category | Readability | Composition | Consistency | Functionality | Visual Quality Avg | Notes |
|----|-------------|----------|:-----------:|:-----------:|:-----------:|:-:|:--:|-------|
| 1 | pitch-tech-startup | business_pitch | 4 | 4 | 4 | Works | 4.0 | Clear hierarchy, professional layout |
| 2 | marketing-campaign | marketing | 4 | 4 | 4 | Works | 4.0 | Good spacing, minor consistency issues |
| 3 | training-python | educational | 3 | 3 | 4 | Works | 3.3 | Text hierarchy could be clearer |
| ... | ... | ... | ... | ... | ... | ... | ... | ... |
```

### Summary Metrics Section

```markdown
## Summary Metrics

- **Average Visual Quality:** 4.0/5.0
- **Functionality Pass Rate:** 100% (12/12)
- **Consistency Average:** 4.1/5.0
- **Quality Std Dev:** 0.68 (Low variance = stable quality)
- **Readability Average:** 3.9/5.0
- **Composition Average:** 4.0/5.0
```

### Category Breakdown Section

```markdown
## Category Breakdown

Performance by prompt category:

| Category | Prompts | Avg Quality | Avg Readability | Avg Composition | Avg Consistency |
|----------|---------|:-:|:-:|:-:|:-:|
| business_pitch | 2 | 4.5 | 4.5 | 4.5 | 4.5 |
| marketing | 1 | 4.0 | 4.0 | 4.0 | 4.0 |
| educational | 2 | 3.6 | 3.5 | 3.5 | 3.8 |
| edge_case | 3 | 3.2 | 3.0 | 3.2 | 3.3 |
| ... | ... | ... | ... | ... | ... |
```

### Key Findings Section

```markdown
## Key Findings

### Strengths
- Typography and readability excellent on well-structured content
- Visual consistency maintained across all slide sets
- 100% functionality pass rate (navigation, keyboard shortcuts, presenter view all work)

### Areas for Improvement
- Edge cases struggle with long titles and text-heavy content
- Technical/academic slides need better visualization support
- Content density handling could be improved for multi-bullet slides

### Failure Analysis
- All prompts passed functionality checks (no broken navigation or keyboard issues)
- Readability issues mainly in text-heavy and edge-case scenarios
```

### Appendix Section

```markdown
## Appendix: Generated HTML Files

Evaluation run contains the following generated HTML files:

- `2026-06-06-run-1/pitch-tech-startup-2026-06-06-143022.html`
- `2026-06-06-run-1/marketing-campaign-2026-06-06-143045.html`
- `2026-06-06-run-1/training-python-2026-06-06-143108.html`
- ... (12 total)

To review slides, open the HTML files in a web browser. All files are self-contained and require no external dependencies except Chart.js (loaded from CDN).
```

## Scoring Criteria

### Readability (1-5 scale)
- **5:** Clear hierarchy, excellent contrast, appropriately sized text, no cramped content
- **4:** Good hierarchy and sizing, mostly clear, minor contrast issues
- **3:** Readable but hierarchy unclear or text slightly small/large
- **2:** Hard to read, poor hierarchy, contrast issues
- **1:** Illegible, terrible contrast, unreadable

### Composition (1-5 scale)
- **5:** Well-balanced, excellent whitespace, all elements properly positioned, nothing cut off
- **4:** Good layout, appropriate spacing, minor alignment issues
- **3:** Acceptable layout but uneven spacing or crowded in places
- **2:** Poor balance, awkward spacing, some elements poorly positioned
- **1:** Chaotic layout, overlapping elements, content overflow

### Consistency (1-5 scale)
- **5:** Perfectly consistent fonts, colors, spacing across all slides
- **4:** Mostly consistent with minor variations
- **3:** Generally consistent but some drift in styles
- **2:** Inconsistent, noticeable style variations
- **1:** Chaotic, every slide looks different

### Functionality (Works/Broken)
- **Works:** Navigation arrows respond, space/arrow keys advance slides, presenter view displays, no broken functionality
- **Broken:** Any of the above fail (nav doesn't work, keyboard unresponsive, presenter view broken)

## Metrics Definitions

| Metric | Calculation | Scale | Meaning |
|--------|-----------|-------|---------|
| Visual Quality Avg | (Readability + Composition + Consistency) / 3 | 1-5 | Overall visual polish per prompt |
| Average Visual Quality | Mean of all Visual Quality Avgs | 1-5 | Overall skill quality across run |
| Functionality Pass Rate | % of prompts with "Works" status | 0-100% | Interaction reliability |
| Consistency Average | Mean of all Consistency scores | 1-5 | Visual uniformity across prompts |
| Quality Std Dev | Standard deviation of Visual Quality Avgs | 0-5 | Quality variance (low = stable) |

## Example: eval-result-2026-06-06-run-1.md

See `SAMPLE_RESULTS.md` for a complete example with all sections populated.

## Notes

- Visual Quality Avg values are rounded to 1 decimal place
- Percentages are calculated from counts (e.g., 12/12 = 100%)
- Appendix lists all HTML files in the run directory
- Use same format for all evaluation runs to enable easy comparison
