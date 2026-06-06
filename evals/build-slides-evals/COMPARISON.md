# Generating Comparison Reports

Guide for creating before/after comparison reports between evaluation runs.

## Overview

After running evaluations in two separate runs, you can generate a manual comparison report to show quality improvements.

## Comparison Workflow

### 1. Have Two Evaluation Runs

You need at least two eval result files:
- `eval-result-2026-06-06-run-1.md` (baseline)
- `eval-result-2026-06-15-run-2.md` (after improvements)

Both should use the same prompt set (e.g., custom-evals).

### 2. Extract Scores

From each result file, copy the Individual Scores table for the prompts you want to compare.

**From eval-result-2026-06-06-run-1.md:**
```
| Prompt | Category | Readability | Composition | Consistency | Functionality | Visual Quality Avg |
|--------|----------|:-:|:-:|:-:|:-:|:-:|
| pitch-tech-startup | business_pitch | 4 | 4 | 4 | Works | 4.0 |
| marketing-campaign | marketing | 4 | 4 | 4 | Works | 4.0 |
| training-python | educational | 3 | 3 | 4 | Works | 3.3 |
```

**From eval-result-2026-06-15-run-2.md:**
```
| Prompt | Category | Readability | Composition | Consistency | Functionality | Visual Quality Avg |
|--------|----------|:-:|:-:|:-:|:-:|:-:|
| pitch-tech-startup | business_pitch | 5 | 4 | 4 | Works | 4.3 |
| marketing-campaign | marketing | 4 | 4 | 4 | Works | 4.0 |
| training-python | educational | 4 | 4 | 4 | Works | 4.0 |
```

### 3. Build Comparison Table

Create a side-by-side comparison:

```markdown
## Comparison: Run 1 vs Run 2

### Prompt: pitch-tech-startup

| Metric | Run 1 | Run 2 | Change |
|--------|-------|-------|--------|
| Readability | 4 | 5 | +1 ✓ |
| Composition | 4 | 4 | 0 |
| Consistency | 4 | 4 | 0 |
| Functionality | Works | Works | ✓ |
| Visual Quality Avg | 4.0 | 4.3 | +0.3 ✓ |

**Analysis:** Readability improved significantly (+1), likely due to typography improvements. Overall visual quality up +0.3.

---

### Prompt: marketing-campaign

| Metric | Run 1 | Run 2 | Change |
|--------|-------|-------|--------|
| Readability | 4 | 4 | 0 |
| Composition | 4 | 4 | 0 |
| Consistency | 4 | 4 | 0 |
| Functionality | Works | Works | ✓ |
| Visual Quality Avg | 4.0 | 4.0 | 0 |

**Analysis:** No change. Already high quality in Run 1, maintained in Run 2.

---

### Prompt: training-python

| Metric | Run 1 | Run 2 | Change |
|--------|-------|-------|--------|
| Readability | 3 | 4 | +1 ✓ |
| Composition | 3 | 4 | +1 ✓ |
| Consistency | 4 | 4 | 0 |
| Functionality | Works | Works | ✓ |
| Visual Quality Avg | 3.3 | 4.0 | +0.7 ✓ |

**Analysis:** Large improvement across the board (+0.7 overall). Readability and Composition both improved by 1 point. Suggests improvements helped with text-heavy technical content.
```

## Comparison Report Template

Create a new markdown file: `evals/build-slides-evals/results/COMPARISON-run1-vs-run2.md`

```markdown
---
comparison: true
run_1_id: 2026-06-06-run-1
run_2_id: 2026-06-15-run-2
prompt_set: custom-evals
comparison_date: 2026-06-15
---

# Comparison Report: Run 1 → Run 2

**Baseline Run:** 2026-06-06-run-1
**Current Run:** 2026-06-15-run-2
**Prompt Set:** custom-evals
**Time Between Runs:** 9 days
**Changes Made:** Typography improvements (golden ratio), spacing scale (8px), enhanced keyboard navigation

## Summary Metrics

| Metric | Run 1 | Run 2 | Change | Status |
|--------|-------|-------|--------|--------|
| **Average Visual Quality** | 4.0 | 4.3 | +0.3 | ✓ Improved |
| **Functionality Pass Rate** | 100% | 100% | 0% | ✓ Maintained |
| **Consistency Average** | 3.9 | 4.1 | +0.2 | ✓ Improved |
| **Readability Average** | 3.9 | 4.2 | +0.3 | ✓ Improved |
| **Composition Average** | 4.0 | 4.1 | +0.1 | ✓ Improved |

**Overall Assessment:** ✓ **Positive improvement across all metrics.**

## Detailed Comparisons

### By Prompt

[Include comparison tables for each prompt or category as shown above]

### By Category

| Category | Run 1 | Run 2 | Change |
|----------|-------|-------|--------|
| business_pitch | 4.5 | 4.8 | +0.3 ✓ |
| marketing | 4.0 | 4.0 | 0 |
| educational | 3.6 | 4.0 | +0.4 ✓ |
| technical | 3.0 | 3.5 | +0.5 ✓ |
| edge_case | 3.2 | 3.7 | +0.5 ✓ |

**Key Finding:** Edge cases and technical content improved the most (+0.5), suggesting typography and spacing improvements were especially helpful for complex scenarios.

## Analysis

### What Improved

1. **Readability (+0.3):** Typography formula working. Text hierarchy is clearer.
2. **Composition (+0.1):** Spacing scale helping with layout balance.
3. **Consistency (+0.2):** Quality systems reducing visual variance.
4. **Technical/Edge Cases:** +0.5 improvement suggests improvements especially helped difficult scenarios.

### What Stayed Stable

- **Functionality:** 100% pass rate maintained. No regressions in navigation, keyboard, or presenter view.
- **Marketing Category:** Already polished, stayed the same.
- **Overall Consistency:** All improvements were positive, no regressions.

### Regression Analysis

None detected. All metrics equal or improved.

## Recommendations

### Ship Changes ✓
All improvements are positive. No functionality regressions. Safe to merge SKILL.md changes.

### Next Steps
1. Document the improvements in SKILL.md or git commit message
2. Consider running evals again after next set of improvements
3. Continue tracking edge cases—good progress but room for improvement (still < 4.0)

## Artifacts

- Run 1 results: `eval-result-2026-06-06-run-1.md`
- Run 2 results: `eval-result-2026-06-15-run-2.md`
- HTML slides available in `2026-06-06-run-1/` and `2026-06-15-run-2/` directories
```

## Creating Comparison Manually

If you prefer to create a comparison without a formal report:

### Quick Comparison Script

You can manually compare metrics:

```bash
# Extract metrics from both result files
grep "Average Visual Quality" eval-result-2026-06-06-run-1.md
grep "Average Visual Quality" eval-result-2026-06-15-run-2.md

# Extract per-prompt scores
grep "pitch-tech-startup" eval-result-2026-06-06-run-1.md
grep "pitch-tech-startup" eval-result-2026-06-15-run-2.md
```

### Side-by-Side View

Open both `.md` files in your editor and compare sections:
- Summary Metrics
- Category Breakdown
- Individual Scores table

## Comparison Checklist

When creating a comparison, include:

- [ ] Run IDs and dates
- [ ] Prompt set name (verify same set used both times)
- [ ] What changes were made to SKILL.md
- [ ] Summary metrics comparison (table format)
- [ ] Category breakdown comparison
- [ ] Per-prompt comparisons for key prompts
- [ ] Analysis section explaining what improved and why
- [ ] Regression analysis (anything go down?)
- [ ] Recommendation (ship or revert?)
- [ ] Links to original result files and HTML artifacts

## Tips

1. **Compare on Same Criteria:** Use same rubric (1-5 scales) for both runs
2. **Note the Context:** Document what changed between runs (git commits, features, etc.)
3. **Look for Patterns:** Did certain categories improve more than others?
4. **Check Edge Cases:** Did improvements help or hurt difficult scenarios?
5. **Maintain Perspective:** Small changes (±0.1) are noise; focus on trends (±0.3+)
6. **Celebrate Wins:** Document positive improvements for team morale

## Example Results

See previous evaluation runs in `results/` directory for examples of comparison tables and analysis.
