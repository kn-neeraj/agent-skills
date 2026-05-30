# Build Slides Skill

Generate professional presentation slides with golden ratio typography, visual consistency, interactive features, and data visualizations.

## Skill Orchestration

**Agent workflow for generating slides:**

1. **Read Input Files** (in order)
   - `slide-content.md` — Customer-provided markdown in slide-by-slide format
   - `components.md` — Structure definitions (Title, Basic, Two-Column, Chart Layout)
   - `styles.md` — Quality systems to apply (typography, spacing, shadows, alignment, colors, themes)

2. **Parse slide-content.md**
   - Extract slides: look for `## Slide N: [structure-type]` headers
   - Extract content: bullets and details under each slide
   - Identify structure type for each slide (title-slide, basic, two-column, chart-layout)
   - Handle special syntax: `### Left:` / `### Right:` for two-column, `[CHART: type]` for charts

3. **Apply components.md structure to each slide**
   - Title Slide: Center layout with title, subtitle, description
   - Basic: Title + content area (85% max-width, center-aligned)
   - Two-Column: Title + two equal columns with 30px gap
   - Chart Layout: Title + chart container + text area

4. **Apply styles.md quality systems**
   - Typography: Use golden ratio (1.618) formula from selected theme
   - Text alignment: Center-align all text by default (unless override specified)
   - Spacing: Apply 8px scale margins and padding per structure
   - Colors: Use theme colors (primary, secondary, accent, text)
   - Shadows: Apply shadow hierarchy for interactive elements
   - Corner radius: Use theme-specific radius (Modern: 6px, Classic: 4px, Bold: 8px)

5. **Generate HTML**
   - Create self-contained HTML with inline CSS and JavaScript
   - Include navigation controls, keyboard support, speaker notes
   - Apply all quality systems from styles.md
   - Ensure responsive design (320px+) and print-friendly CSS

## Input Format

**Customer provides:** `slide-content.md` markdown file in slide-by-slide format

```markdown
# Presentation Title

---

## Slide 1: [Structure Type]
- Title: [Slide title]
- [Content details]

---

## Slide 2: [Structure Type]
- Title: [Slide title]
- [Content details]

---
```

**Format rules:**
- Each slide starts with `## Slide N: [Structure Type]`
- Structure types: title-slide, basic, two-column, chart-layout
- List content with bullets under each slide
- Separate slides with `---`
- For two-column: Use `### Left:` and `### Right:` headers
- For chart-layout: Use `[CHART: type]` followed by data
- Simple and readable — customer iterates, agent regenerates HTML

**Example:**
```markdown
# Ladder of AI Knowledge

---

## Slide 1: title-slide
- Title: Ladder of AI Knowledge
- Subtitle: From Applied AI to Hardware
- Description: Understanding the complete AI stack

---

## Slide 2: basic
- Title: The Four Rungs
- Content listed with bullets

---

## Slide 3: two-column
- Title: Comparison
- Left Column Header: Option A
  - Point 1
  - Point 2
- Right Column Header: Option B
  - Point 1
  - Point 2

---

## Slide 4: chart-layout
- Title: Performance Metrics
- [CHART: bar]
  - Label 1: value 1
  - Label 2: value 2
- Chart explanation text

---
```

**Workflow:**
- Customer edits markdown anytime
- Agent reads slide-content.md
- Agent regenerates HTML automatically
- All quality systems applied from styles.md

## Workflow

1. **Understand Requirements**
   - Parse user request for topic, slide count, theme preference
   - Identify target audience and context

2. **Select Theme**
   - Choose from 3 themes: Modern, Classic, Bold (see styles.md)
   - Applies typography, colors, spacing system throughout

3. **Read Instruction Files**
   - Read `slide-content.md` for content and structure markers
   - Read `components.md` for structure definitions
   - Read `styles.md` for quality systems to apply

4. **Generate HTML**
   - Parse slide-content.md structure markers
   - Apply components.md layout for each structure
   - Apply styles.md quality systems (typography, spacing, alignment, colors)
   - Include navigation, keyboard support, speaker notes

6. **Add Visualizations**
   - Implement charts using Chart.js patterns (see assets/chart-patterns.md)
   - Use chart color injection helper to automatically inherit theme colors
   - Choose appropriate chart type for data
   - Ensure charts fit within slide padding boundaries and respect margins from components.md

7. **Assemble Output**
   - Combine HTML structure, content, styles, and scripts
   - Verify all interactive features functional
   - Test navigation, keyboard shortcuts, notes toggle
   - Ensure mobile responsive (320px+) and print-friendly

## Architecture Rules

- One slide per output block
- Use HTML/CSS for slide structure
- Embed Chart.js for data visualizations
- Self-contained: no external dependencies
- Mobile-responsive layouts

## Output Format

Generate slides as HTML files:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Presentation Title</title>
  <style>/* Theme styles */</style>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
  <div class="slide"><!-- Slide 1 --></div>
  <div class="slide"><!-- Slide 2 --></div>
  <!-- ... -->
</body>
</html>
```

## QA Checklist

Before delivering slides, verify:

**Content & Format**
- [ ] All slides follow selected format template
- [ ] Slide count matches user request
- [ ] No lorem ipsum or placeholder text
- [ ] Speaker notes included where needed
- [ ] Each slide uses appropriate structure from components.md (Title, Basic, Two-Column, Chart Layout)
- [ ] Content is organized logically within chosen structures
- [ ] Margins and spacing match components.md guidelines (no random padding)

**Quality Systems**
- [ ] Golden ratio typography applied (H1 → H2 → H3 → body hierarchy from formula)
- [ ] Google Fonts loaded correctly via CDN
- [ ] Spacing uses 8px scale (no arbitrary pixel values)
- [ ] Shadow hierarchy visible (subtle on cards, medium on floating elements)
- [ ] Corner radius consistent across elements

**Features**
- [ ] Navigation controls visible (prev/next buttons, counter, progress bar)
- [ ] Keyboard shortcuts work (arrows, space, F, ESC, N)
- [ ] Notes panel toggles and displays current slide notes
- [ ] Button hover effects visible (lift + shadow)
- [ ] Focus indicators visible with keyboard navigation
- [ ] Slide transitions smooth (fade, ≤300ms)

**Data & Visualizations**
- [ ] Charts render correctly with theme colors auto-injected
- [ ] Charts responsive (fit within slide width, no overflow)
- [ ] Sample data is realistic or actual data provided

**Responsive & Accessibility**
- [ ] Mobile responsive (320px viewport readable, 44px touch targets)
- [ ] Print-friendly (controls hidden, page breaks between slides)
- [ ] No broken references or missing assets

## Error Handling

If requirements are unclear:
- Ask for clarification on topic or format
- Suggest format based on content type
- Default to clean, minimal theme

If chart data is needed but not provided:
- Use realistic sample data
- Note in speaker notes that data should be updated
- Provide instructions for data updates
