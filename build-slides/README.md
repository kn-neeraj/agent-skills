# Build Slides

Generate professional presentation slides with structured formats, consistent themes, and data visualizations.

## What It Does

Build Slides creates presentation decks optimized for clarity and visual impact. Choose from 12 predefined formats, 3 design themes, and built-in chart patterns. Output is self-contained HTML that works in any browser.

## Quick Start

```
/build-slides Create a 5-slide pitch deck about AI agents using the modern theme
```

**Output:** HTML file with 5 slides using pitch deck format, modern theme styling, and responsive layout.

## Formats

See [formats.md](./formats.md) for all 12 available slide formats:

- Pitch Deck (problem, solution, traction, team, ask)
- Tutorial (intro, steps, examples, practice, summary)
- Report (executive summary, findings, analysis, recommendations)
- Product Launch (teaser, features, demo, pricing, CTA)
- And 8 more...

## Themes

See [styles.md](./styles.md) for the 3 available themes:

- **Modern** - Clean sans-serif, blue/gray palette, generous whitespace
- **Classic** - Serif headlines, traditional colors, structured layouts
- **Bold** - High contrast, large type, striking accent colors

## Charts

Built-in Chart.js patterns for common visualizations:

- Bar charts (comparison, timeline, ranking)
- Line charts (trends, projections, growth)
- Doughnut charts (composition, distribution, shares)

See [assets/chart-patterns.md](./assets/chart-patterns.md) for code examples.

## Example Usage

**Basic:**
```
/build-slides Make 8 slides about climate change for high school students
```

**With format:**
```
/build-slides Create a tutorial deck teaching React hooks, 10 slides
```

**With theme:**
```
/build-slides Quarterly review slides, bold theme, include bar chart
```

## Output

Self-contained HTML file with:
- All styles inline
- Chart.js from CDN
- Print-optimized CSS
- Speaker notes in comments

Open in any browser, present in fullscreen, or print to PDF.

## Customization

After generation, you can:
- Edit slide content directly in HTML
- Update chart data in `<script>` blocks
- Modify colors in `<style>` section
- Add/remove slides by copying `<div class="slide">` blocks
