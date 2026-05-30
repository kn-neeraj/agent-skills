# Build Slides Skill

Generate professional presentation slides with golden ratio typography, visual consistency, interactive features, and data visualizations.

## Workflow

1. **Understand Requirements**
   - Parse user request for topic, slide count, format preferences
   - Identify target audience and presentation context
   - Determine if charts/visualizations are needed
   - Confirm if speaker notes will be included

2. **Select Format & Theme**
   - Choose from 12 predefined slide formats (see formats.md)
   - Match format to content type (pitch, tutorial, report, etc.)
   - Select from 3 themes: Modern (clean/tech), Classic (formal/business), Bold (striking/creative)

3. **Build HTML Structure with Quality Systems**
   - Generate base HTML with all quality systems baked in:
     - **Typography:** Apply golden ratio formula (1.618) for font sizes; load Google Fonts via CDN per theme
     - **Spacing:** Use 8px-based scale for all padding/margin/gap (4, 8, 16, 24, 32, 48, 64, 96px)
     - **Visual Depth:** Apply shadow hierarchy (subtle for cards, medium for floating, deep for emphasis)
     - **Navigation:** Include prev/next buttons, slide counter (X/Y), progress bar
     - **Notes Panel:** Include hidden notes panel with toggle button
     - **Keyboard Support:** Inject keyboard handler for arrow keys, space, F, ESC, N
     - **Interactive States:** Apply CSS for button hover (lift effect), focus rings, transitions (300ms)
   - See styles.md for complete system specifications

4. **Generate Content**
   - Create slide-by-slide content following format templates
   - Write clear, concise copy optimized for presentations
   - Include speaker notes for presenter view
   - Maintain consistent spacing and hierarchy from typography formula

5. **Add Visualizations**
   - Implement charts using Chart.js patterns (see assets/chart-patterns.md)
   - Use chart color injection helper to automatically inherit theme colors
   - Choose appropriate chart type for data
   - Ensure charts fit within slide padding boundaries

6. **Assemble Output**
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
