# Build-Slides Examples

Example presentations generated from markdown source files using the build-slides skill.

## Workflow

1. **Customer provides markdown** (`slide-content.md`) — Defines slides with structure markers and content
2. **Agent uses skill** — Reads markdown, generates HTML with quality systems applied
3. **Output** — Self-contained HTML presentation with navigation, keyboard support, responsive design

## How It Works

- Customer iterates on `slide-content.md` (text dump → markdown organization)
- Structure markers (`## basic`, `## two-column`, etc.) tell agent which layout to use
- All typography, spacing, colors applied automatically from `styles.md`
- Agent generates final HTML slides

## What Agents Will Receive

When you use the build-slides skill, you'll get self-contained HTML presentations that include:

### Quality Systems

**Typography**
- Golden ratio (1.618) formula applied to all font sizes
- Professional Google Fonts loaded via CDN with fallback stacks
- Harmonious hierarchy: H1 → H2 → H3 → body → captions all derived from the same mathematical scale
- Readable line heights (≥1.5 for body text)

**Visual Consistency**
- 8px-based spacing scale (4, 8, 16, 24, 32, 48, 64, 96px) applied uniformly
- Shadow depth hierarchy (subtle, medium, deep) for visual layering
- Consistent corner radius per theme (Modern: 6px, Classic: 4px, Bold: 8px)
- Color variables for primary, secondary, accent, and text colors

**Interactive Polish**
- Smooth transitions (≤300ms) for all state changes
- Button hover effects (lift + shadow increase)
- Focus rings visible with keyboard navigation
- Responsive feedback on user interactions

### Features

**Navigation & Controls**
- Previous/Next buttons for slide navigation
- Slide counter (e.g., "3 / 12")
- Progress bar showing position in deck
- All controls visible, keyboard + click accessible

**Presenter View**
- Toggle button to show/hide speaker notes
- Notes display for current slide updates on navigation
- Minimal, focused implementation (notes only)

**Keyboard Navigation**
- Arrow keys (← / →) to navigate slides
- Space to advance to next slide
- F to enter fullscreen presentation mode
- ESC to exit fullscreen
- N to toggle notes panel

**Responsive & Accessible**
- Mobile-friendly rendering (320px+ width)
- 44px+ minimum touch targets for buttons
- Print-friendly CSS (hides controls, optimized for PDF)
- Works across modern browsers (Chrome, Firefox, Safari, Edge)

### Data Visualization

- Chart.js integration with automatic theme color injection
- Charts inherit primary, secondary, and accent colors from the slide theme
- Responsive charts that scale to fit slide boundaries

---

## Examples

### Agent Development Lifecycle

**File:** `agent-development-lifecycle.html`

A 7-slide presentation demonstrating all quality systems and features:

1. **Title Slide** - Showcases golden ratio typography at scale (H1: 76px)
2. **Overview** - 5-stage lifecycle with navigation controls and progress bar visible
3. **Design Phase** - Interactive cards with hover effects and spacing scale demonstration
4. **Implementation Phase** - Grid layout showing consistent alignment and spacing
5. **Testing Phase** - Chart.js doughnut chart with theme color auto-injection
6. **Deployment Phase** - Full-bleed layout with typography hierarchy
7. **Summary** - Call to action and key takeaways

**Open in browser:** Drag the HTML file into your browser, or right-click and select "Open with" → your browser.

**Test keyboard shortcuts:**
- Press `→` to go next
- Press `←` to go previous
- Press `F` to enter fullscreen
- Press `N` to toggle notes (shows speaker notes)
- Press `ESC` to exit fullscreen

**Inspect the code:** View the HTML source (right-click → View Page Source) to see:
- CSS variables for typography, spacing, shadows, colors
- Golden ratio formula applied to font sizes
- Navigation and notes panel implementation
- Keyboard event handlers
- Chart.js configuration with theme color injection

---

## How to Use These Examples

**For Agents Integrating This Skill:**
- Review these examples to understand what quality agents should target
- Reference the CSS variable patterns when generating new presentations
- Use the same HTML structure for navigation, notes, and keyboard handling
- Apply the typography formula and spacing scale consistently

**For Designers Reviewing Output:**
- Open the examples in a browser to see interactive behavior
- Test keyboard navigation and responsive behavior
- Evaluate typography hierarchy and visual consistency
- Use as a benchmark for slide quality

**For Implementers Extending the Skill:**
- Study how quality systems translate to code
- See how Chart.js integrates with theme colors
- Understand responsive and print-friendly CSS patterns
- Reference keyboard handler and navigation logic

---

## Quality Standards Reference

These examples follow the documented quality systems in `../styles.md`:

| System | Modern Theme | Classic Theme | Bold Theme |
|--------|--------------|---------------|-----------|
| Base Font Size | 18px | 18px | 20px |
| H1 Size | 47px | 42px | 53px |
| H2 Size | 29px | 28px | 32px |
| Spacing Base | 8px | 8px | 8px |
| Corner Radius | 6px | 4px | 8px |
| Font Pairing | Bricolage + Inter | Playfair + Montserrat | Space Grotesk + Inter |

See `../styles.md` for complete typography scales, color definitions, and layout specifications.

---

## Next Steps

- **Share these examples** with teams adopting the build-slides skill
- **Use as reference** when evaluating generated presentations
- **Extend examples** to showcase additional formats or themes
- **Test responsiveness** on mobile devices and tablets
