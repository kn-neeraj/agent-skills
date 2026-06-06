# Metrics Definitions

Metrics emitted by the evaluation rubric.

## Individual Slide Metrics

| Metric | Type | Scale | Definition |
|--------|------|-------|------------|
| **Readability** | Numeric | 1-5 | Text clarity, hierarchy, sizing, contrast quality |
| **Composition** | Numeric | 1-5 | Layout balance, whitespace, element positioning |
| **Consistency** | Numeric | 1-5 | Visual uniformity across all slides |
| **Functionality** | Categorical | Works/Broken | Navigation and interaction responsiveness |

## Aggregated Metrics

### Per-Evaluation Metrics
| Metric | Calculation | Interpretation |
|--------|-------------|-----------------|
| **Visual Quality Score** | (Readability + Composition + Consistency) / 3 | Overall visual polish (1-5 scale) |
| **Functionality Status** | Pass if all features work, Fail if any broken | Interaction quality |
| **Overall Quality** | Visual Quality if Functionality passes, penalize if broken | Combined quality signal |

### Dataset-Level Metrics
| Metric | Definition | Target |
|--------|-----------|--------|
| **Average Visual Quality** | Mean of all Visual Quality Scores | > 4.0 |
| **Functionality Pass Rate** | % of evals with Works status | 100% |
| **Consistency Score** | Mean consistency across all evals | > 4.0 |
| **Quality Distribution** | Spread of scores (std dev) | Low variance = stable quality |

## Evaluation Report Template

```
HTML Slides Skill Evaluation Report
====================================

Dataset: [date] | N=[count] prompts evaluated

SUMMARY METRICS
- Average Visual Quality: [score/5]
- Functionality Pass Rate: [%]
- Consistency Score: [avg/5]
- Quality Distribution (σ): [std dev]

CATEGORY BREAKDOWN
- Business Pitches: [avg visual quality]
- Educational: [avg visual quality]
- Edge Cases: [avg visual quality]

FAILURE ANALYSIS
- [Any broken functionality]
- [Readability issues]
- [Composition problems]

STRENGTHS
- [Top performing criteria]

IMPROVEMENTS NEEDED
- [Bottom performing criteria]
```

## Regression Tracking

Track these metrics across evaluations to detect regressions:
- Visual Quality Score trend
- Functionality Pass Rate (should stay at 100%)
- Consistency Score trend
- Any new failure patterns

File results with timestamp to track changes over time.
