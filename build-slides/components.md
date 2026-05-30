# Slide Structures & Widgets

Define slide content in markdown. Agent parses structure and generates HTML using quality systems from `styles.md`.

---

## 4 Core Slide Structures

### 1. Title Slide

**Markdown:**
```markdown
## title-slide
Title: Agent Development Lifecycle
Subtitle: Building Autonomous Systems
Description: May 2026 | AI Team
```

**HTML Structure:**
- H1: Title (center, primary color)
- H2: Subtitle (center, secondary color)
- P: Description (center, small text)

**Margins:** 60px top/bottom padding, centered vertically

---

### 2. Basic Structure

**Markdown:**
```markdown
## basic
Title: Overview: 5 Phases
- Design — Define behavior
- Implementation — Build logic
- Testing — Validate flows
- Deployment — Production setup
- Optimization — Improve performance
```

**HTML Structure:**
- H2: Title (center)
- Content area: Text or bullet list (center)

**Margins:** 40px top padding, content max-width 85%, 40px left/right padding

---

### 3. Two-Column Structure

**Markdown:**
```markdown
## two-column
Title: Design Phase Comparison

### Left: Iterative Design
Start with minimal, expand based on feedback
- Fast deployment
- Real-world validation

### Right: Comprehensive Design
Plan everything upfront
- Thorough planning
- Cleaner architecture
```

**HTML Structure:**
- H2: Title (center, full width)
- Two columns with H3 headers and content

**Margins:** 40px top, 30px between columns, each column max 42.5% width

---

### 4. Chart Layout

**Markdown:**
```markdown
## chart-layout
Title: Testing Coverage

[CHART: doughnut]
data: Unit Tests 45%, Integration 35%, E2E 20%

Left Text:
Strong coverage ensures reliability
[Additional explanation text]

Right Chart:
[Chart renders here]
```

**HTML Structure:**
- H2: Title (center)
- Chart container + text area (side-by-side or stacked)

**Margins:** 40px top, 20px around chart, 30px gap between chart and text

---

## Available Widgets

Use these within any slide structure:

| Widget | Usage | Example |
|--------|-------|---------|
| **Heading** | H1, H2, H3 | `## Slide Title` |
| **Text** | Paragraph | `Regular paragraph text` |
| **List** | Bullet points | `- Item 1` |
| **Chart** | Data visualization | `[CHART: doughnut]` with data |
| **Spacer** | Visual breathing room | Margins from spacing scale |

---

## Choosing a Structure

- **Title Slide**: Opening, section breaks, conclusions
- **Basic**: Informational, explanatory, mostly text
- **Two-Column**: Comparisons, pros/cons, parallel concepts
- **Chart Layout**: Data visualization, metrics, statistics

---

## Markdown Input Example

```markdown
# Agent Development Lifecycle

## title-slide
Subtitle: Building Autonomous Systems
Description: May 2026

## basic
Title: Overview
- Design phase
- Implementation phase
- Testing phase
- Deployment phase
- Optimization

## two-column
Title: Two Approaches
### Left: Iterative
Start small, expand based on feedback
### Right: Comprehensive
Plan everything upfront

## chart-layout
Title: Test Coverage
[CHART: doughnut]
Unit Tests: 45%, Integration: 35%, E2E: 20%
```

---

## Center Alignment

All text is **center-aligned by default** (see `styles.md`). Override only if customer requests otherwise.

---

## Notes

- Keep markdown lean and readable
- Customer iterates on markdown, agent generates HTML
- Structure markers (`## basic`, `## two-column`, etc.) tell agent which layout to use
- All quality systems (typography, spacing, colors) applied automatically
