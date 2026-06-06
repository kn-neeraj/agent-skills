# Evaluation Quick Reference

Use this guide when scoring slides. For full definitions, see `rubric.md`.

## Scoring Scale

| Score | Meaning |
|-------|---------|
| **5** | Excellent - Best in class, no issues |
| **4** | Good - Minor issues, overall solid |
| **3** | Acceptable - Readable/usable but has problems |
| **2** | Fair - Significant issues, hard to use |
| **1** | Poor - Broken, illegible, unusable |

---

## Readability (Text Clarity & Hierarchy)

### What to look for:
- Can you read all text comfortably?
- Is there clear hierarchy (headers larger than body)?
- Is contrast sufficient (dark text on light, light on dark)?
- Is text sized appropriately (not too small/large)?
- Is content not cramped or overlapping?

### Scoring Examples:

**5:** Clear hierarchy, excellent contrast (white text on dark blue), varied font sizes, comfortable reading distance
**4:** Good hierarchy, mostly excellent contrast, minor size issues
**3:** Readable but hierarchy unclear, contrast borderline on one slide, text slightly small in places
**2:** Poor hierarchy, low contrast (hard to read), inconsistent sizing makes it confusing
**1:** Illegible, terrible contrast (light gray on white), all same size, unreadable

**Quick questions:**
- Can I read everything easily at arm's length? → **Yes** = 4+, **No** = 1-2
- Is the heading clearly larger than body text? → **Yes** = 4+, **No** = 1-2

---

## Composition (Layout & Balance)

### What to look for:
- Is the layout balanced (elements evenly distributed)?
- Is there adequate whitespace/breathing room?
- Are elements properly positioned (not cut off)?
- Do images fit without overflow?
- Does content respect slide boundaries?

### Scoring Examples:

**5:** Excellent whitespace, balanced, all elements fit perfectly, professional spacing
**4:** Good layout, appropriate spacing, minor alignment quirks
**3:** Acceptable but uneven spacing, crowded in places, some elements feel cramped
**2:** Poor balance, awkward gaps, elements poorly positioned, some content cut off
**1:** Chaotic, overlapping elements, content overflow, slides feel broken

**Quick questions:**
- Is there good "breathing room" around content? → **Yes** = 4+, **No** = 1-2
- Are all elements completely visible (nothing cut off)? → **Yes** = 4+, **No** = 1-2
- Does the layout feel balanced or cramped? → **Balanced** = 4+, **Cramped** = 1-2

---

## Consistency (Visual Uniformity)

### What to look for:
- Do all slides use the same fonts?
- Are colors consistent across slides?
- Is spacing/padding uniform?
- Do slide layouts follow the same pattern?
- Does the deck feel cohesive or does each slide look different?

### Scoring Examples:

**5:** Perfect consistency—same fonts, colors, spacing throughout all slides
**4:** Mostly consistent with 1-2 minor variations
**3:** Generally consistent but some drift (e.g., one slide uses different spacing)
**2:** Inconsistent—noticeable style variations between slides
**1:** Chaotic—every slide looks completely different

**Quick questions:**
- Do all slides look like they belong to the same presentation? → **Yes** = 4+, **No** = 1-2
- Are fonts and colors the same across slides? → **Yes** = 4+, **No** = 1-2

---

## Functionality (Works/Broken)

### What to test:
- **Navigation:** Do prev/next buttons respond?
- **Keyboard:** Do arrow keys advance slides? Does space bar work?
- **Presenter View:** Does notes toggle on/off?
- **Visual:** Do all slides render without errors?

### Scoring:
- **Works** = All of the above function properly
- **Broken** = Any of the above fails

**Quick questions:**
- Can I navigate with arrow keys? → **Yes** = Works, **No** = Broken
- Can I press space to advance? → **Yes** = Works, **No** = Broken
- Does the layout render without visual glitches? → **Yes** = Works, **No** = Broken

---

## Common Issues to Watch For

| Issue | Category | Severity |
|-------|----------|----------|
| Text too small | Readability | -1 point |
| Low contrast (dark gray on black) | Readability | -2 points |
| Uneven spacing/padding | Composition | -1 point |
| Elements cut off | Composition | -2 points |
| Font size inconsistency | Consistency | -1 point |
| Color palette shift | Consistency | -1 point |
| Navigation button broken | Functionality | Broken |
| Text overflow | Composition | -2 points |
| Unclear visual hierarchy | Readability | -1 point |

---

## Visual Quality Average Calculation

**Visual Quality Avg = (Readability + Composition + Consistency) / 3**

Examples:
- (5 + 5 + 5) / 3 = **5.0** (Excellent)
- (4 + 4 + 4) / 3 = **4.0** (Good)
- (4 + 3 + 4) / 3 = **3.7** (Acceptable)
- (3 + 3 + 3) / 3 = **3.0** (Fair)

---

## Notes Field

Add brief observations that help future reviewers understand:
- **What worked well:** "Excellent typography", "Great spacing", "Perfect hierarchy"
- **What didn't:** "Text too dense", "Low contrast on title", "Inconsistent button colors"
- **Context:** "Edge case with long title", "Technical content with code", "Many bullet points"

Examples:
- `"Clear hierarchy, good spacing, minor contrast issue on subtitle"`
- `"Text-heavy content handled well, good readability despite 5 bullet points"`
- `"Navigation responsive, keyboard shortcuts work perfectly"`

---

## Comparison Across Runs

### Tracking Improvement

When you evaluate the same prompts across two runs:

| Delta | Interpretation |
|-------|-----------------|
| **+0.5 or more** | Significant improvement |
| **+0.2 to +0.4** | Meaningful improvement |
| **0 to +0.1** | No meaningful change |
| **-0.1 to -0.3** | Possible regression (investigate) |
| **-0.5 or less** | Significant regression (revert change) |

### Example Before/After

```
Prompt: pitch-tech-startup

Run 1 (2026-06-06):
  Readability: 3 | Composition: 3 | Consistency: 3 | Avg: 3.0

Run 2 (2026-06-15):
  Readability: 4 | Composition: 4 | Consistency: 4 | Avg: 4.0

Result: +1.0 improvement ✓ (changes to typography + spacing were successful)
```

---

## Tips for Consistent Scoring

1. **Take your time** - Open the HTML in a browser and review for 1-2 minutes
2. **Use the same environment** - Same screen, lighting, distance for consistency
3. **Reference examples** - Keep examples from `rubric.md` in mind
4. **Note what you're seeing** - Jot down observations for the Notes field
5. **Be consistent** - If slide A gets 4 for readability, similar-quality slides should also get 4
6. **Don't over-think** - Your first instinct is usually right

---

For full definitions and examples, see `rubric.md`.
