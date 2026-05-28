# Build Slides Skill

Generate professional presentation slides with structured formats, consistent themes, and data visualizations.

## Workflow

1. **Understand Requirements**
   - Parse user request for topic, slide count, format preferences
   - Identify target audience and presentation context
   - Determine if charts/visualizations are needed

2. **Select Format**
   - Choose from 12 predefined slide formats (see formats.md)
   - Match format to content type (pitch, tutorial, report, etc.)
   - Apply consistent structure across deck

3. **Apply Theme**
   - Select from 3 available themes (see styles.md)
   - Apply typography scale and color palette
   - Ensure visual hierarchy and readability

4. **Generate Content**
   - Create slide-by-slide content following format templates
   - Write clear, concise copy optimized for presentations
   - Include speaker notes where appropriate

5. **Add Visualizations**
   - Implement charts using Chart.js patterns (see assets/chart-patterns.md)
   - Choose appropriate chart type for data
   - Apply theme colors to visualizations

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

- [ ] All slides follow selected format template
- [ ] Theme is applied consistently across deck
- [ ] Typography scale is respected
- [ ] Charts render correctly with sample data
- [ ] Slide count matches user request
- [ ] No lorem ipsum or placeholder text
- [ ] Speaker notes included where needed
- [ ] Responsive layout works on mobile
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
