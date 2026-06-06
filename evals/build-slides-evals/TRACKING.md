# Quality Tracking & Trend Analysis

Guide for tracking quality improvements across evaluation runs.

## Overview

After running evaluations on the same prompts at different times, you can compare results to measure quality improvements from SKILL.md changes.

## Workflow

### 1. Create Baseline (Run 1)

```bash
npm run eval -- --prompts custom-evals all
```

Creates: `eval-result-2026-06-06-run-1.md`

Record the baseline metrics:
- Average Visual Quality: **4.0/5.0**
- Functionality Pass Rate: **100%**
- Consistency Average: **3.9/5.0**

### 2. Make Improvements

Edit `build-slides/SKILL.md`:
- Add golden ratio typography (1.618 formula)
- Add spacing scale (8px-based)
- Add shadow hierarchy
- Improve keyboard navigation
- etc.

Commit changes to git.

### 3. Re-evaluate (Run 2)

```bash
npm run eval -- --prompts custom-evals all
```

Creates: `eval-result-2026-06-15-run-2.md`

Record the new metrics:
- Average Visual Quality: **4.3/5.0**
- Functionality Pass Rate: **100%**
- Consistency Average: **4.1/5.0**

### 4. Analyze Trends

Compare metrics side-by-side to see what improved.

## Comparing Runs

### Method: Manual Comparison

Open two result files and compare metrics:

**eval-result-2026-06-06-run-1.md:**
```
## Summary Metrics
- **Average Visual Quality:** 4.0/5.0
- **Functionality Pass Rate:** 100% (12/12)
- **Consistency Average:** 3.9/5.0
```

**eval-result-2026-06-15-run-2.md:**
```
## Summary Metrics
- **Average Visual Quality:** 4.3/5.0
- **Functionality Pass Rate:** 100% (12/12)
- **Consistency Average:** 4.1/5.0
```

**Analysis:**
- Visual Quality improved by **+0.3** ✓
- Functionality stayed at **100%** ✓
- Consistency improved by **+0.2** ✓

### Method: Per-Prompt Comparison

Compare individual prompt scores:

| Prompt | Run 1 | Run 2 | Change | Status |
|--------|-------|-------|--------|--------|
| pitch-tech-startup | 4.0 | 4.5 | +0.5 | ✓ Improved |
| marketing-campaign | 4.0 | 4.3 | +0.3 | ✓ Improved |
| training-python | 3.3 | 3.8 | +0.5 | ✓ Improved |
| text-heavy | 2.3 | 3.1 | +0.8 | ✓ Improved |

### Method: Category Comparison

Compare performance by category:

| Category | Run 1 | Run 2 | Change |
|----------|-------|-------|--------|
| business_pitch | 4.5 | 4.8 | +0.3 |
| educational | 3.6 | 4.0 | +0.4 |
| technical | 3.0 | 3.5 | +0.5 |
| edge_case | 3.2 | 3.7 | +0.5 |

**Insight:** Edge cases improved the most (+0.5), suggesting typography/spacing changes helped difficult scenarios.

## Metrics to Track

### Primary Metrics

1. **Average Visual Quality** (1-5 scale)
   - Target: > 4.0
   - Trend: Should increase with improvements
   - Alert: Drops > 0.1 suggest regression

2. **Functionality Pass Rate** (0-100%)
   - Target: 100%
   - Trend: Should stay at 100%
   - Alert: Any drop indicates broken functionality

3. **Consistency Average** (1-5 scale)
   - Target: > 4.0
   - Trend: Should increase as quality systems (spacing, colors, fonts) are refined
   - Alert: Drops suggest visual system degradation

### Secondary Metrics

4. **Readability Average** (1-5)
   - Track if typography improvements work
   - Target: > 3.8

5. **Composition Average** (1-5)
   - Track if spacing system improvements work
   - Target: > 3.8

6. **Quality Std Dev** (0-5)
   - Low = stable across prompts
   - Target: < 1.0
   - Trend: Should decrease (more stable)

## Interpreting Results

### Positive Signals ✓

- **Average Visual Quality increases:** Changes are working
- **Consistency improves:** Quality systems (spacing, colors) are more consistent
- **Edge cases improve:** Difficult scenarios handled better
- **Functionality stays at 100%:** No regressions in core features
- **Pass rate increases in weak categories:** Improvements targeted the right areas

### Red Flags 🚩

- **Average Visual Quality decreases:** Changes made quality worse
- **Functionality Pass Rate drops below 100%:** Something broke (navigation, keyboard, etc.)
- **Consistency decreases:** Visual systems became less uniform
- **Quality Std Dev increases:** Quality became more inconsistent
- **Specific prompts regressed significantly:** Check if changes broke certain scenarios

## Common Scenarios

### Scenario 1: Typography Improvements

**Changes made:**
- Implement golden ratio font scaling
- Update font pairings
- Adjust line heights

**Expected:**
- Readability increases (+0.3 to +0.6)
- Consistency may increase (better hierarchy)
- Edge cases (text-heavy) should improve more

**Check:**
- Did Readability improve? If not, revert changes
- Did Composition improve? (Better sizing should help layout)

### Scenario 2: Spacing/Layout Improvements

**Changes made:**
- Implement 8px spacing scale
- Add consistent padding/margins
- Improve grid alignment

**Expected:**
- Composition increases (+0.2 to +0.4)
- Consistency increases (uniform spacing)
- Edge cases (cramped content) should improve

**Check:**
- Did Composition improve? If not, spacing scale may need adjustment
- Did text overflow issues resolve? (edge-case category)

### Scenario 3: Interactive/Functional Changes

**Changes made:**
- Add/fix navigation buttons
- Improve keyboard shortcuts
- Fix presenter view

**Expected:**
- Functionality Pass Rate stays at 100%
- Visual metrics stable or slightly up
- No regressions in existing categories

**Check:**
- Did Functionality stay at 100%? If drop, identify which prompt failed
- Did visual metrics regress? Unlikely, but check if changes had unintended side effects

## Trend Tracking Over Time

If you run evals regularly, track the trend:

```
Date        Visual Quality  Consistency  Readability  Category: Edge Case
2026-06-06  4.0            3.9          3.9          3.2
2026-06-15  4.3            4.1          4.0          3.7
2026-06-22  4.5            4.2          4.2          4.0
2026-06-30  4.6            4.3          4.3          4.1
```

**Observations:**
- Steady improvement each week (+0.2 to +0.3)
- Edge cases catching up to overall quality
- Trend is positive, keep shipping improvements

## Decision Framework

| Situation | Action |
|-----------|--------|
| Metrics improve +0.2 or more | Ship the changes |
| Metrics stable (±0.1) | Fine to ship, changes are neutral |
| Functionality drops below 100% | Revert, identify bug |
| Visual Quality drops > 0.2 | Revert, changes made quality worse |
| Edge cases regress significantly | Investigate, changes may have broken edge cases |
| Consistency drops significantly | Review color/spacing consistency |

## Notes

- Evaluation scores have human judgment variance (±0.5 possible between evaluators)
- Don't obsess over tiny changes (±0.1); focus on larger trends
- Context matters: Same prompt may score differently based on improvements elsewhere
- Keep notes in results files to document what changed and why
