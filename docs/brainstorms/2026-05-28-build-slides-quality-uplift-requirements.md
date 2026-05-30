---
date: 2026-05-28
topic: build-slides-quality-uplift
---

# Build Slides Quality Uplift

## Problem Frame

The current build-slides skill generates functional HTML presentations, but lacks the professional polish that makes slides feel intentional and trustworthy. Users evaluating the skill can't see the difference between "good enough" and "genuinely professional." To drive adoption and prove quality, we need to bake in three interconnected systems: a rigorous typography foundation, interactive controls that make slides feel responsive, and visual consistency that makes every pixel feel deliberate.

This uplift positions build-slides as a quality-first tool that competes on presentation excellence, not just feature breadth.

## Requirements

### R1. Typography System

**R1.1** Implement formula-based typography scale for each theme
- Define scale ratios (e.g., golden ratio 1.618 or modular 1.25)
- Generate all font sizes, line heights, letter-spacing from the same root formula
- Ensure H1, H2, H3, body, captions, fine-print all derive from the scale
- Document the formula so it's repeatable and defensible

**R1.2** Curate premium font pairings per theme
- Modern theme: Sans-serif heading + sans-serif body with refined kerning
- Classic theme: Serif heading + sans-serif body, optimized for readability
- Bold theme: Impact-scale heading font + sans-serif body for contrast
- Include web font imports with fallback stacks
- Load fonts efficiently (limit to 2-3 weights per font)

**R1.3** Enforce hierarchy through type
- H1: largest, primary color, bold weight
- H2: secondary scale, secondary color, medium weight
- H3: tertiary scale, text color, medium weight
- Body: base scale, text color, regular weight
- Caption: reduced scale, text-light color, regular weight
- Fine print: smallest scale, text-light color, regular weight
- Line height: body text ≥ 1.5, headings ≥ 1.2

**R1.4** Optimize readability
- Character width per line: 45-75 characters
- Minimum contrast ratio: WCAG AA (4.5:1 for body, 3:1 for large text)
- Letter spacing: increase for all-caps text by 0.05em
- Word spacing: consistent across all themes

### R2. Visual Consistency System

**R2.1** Define spacing scale
- Base unit: 4px or 8px (consistent across all themes)
- Generate spacing scale: 4, 8, 16, 24, 32, 48, 64, 96px
- All padding, margins, gaps use values from this scale
- Document which spacing values apply where (card padding, gap between elements, etc.)

**R2.2** Implement shadow hierarchy
- No shadow: plain elements (text, simple backgrounds)
- Subtle shadow (0 1px 3px rgba(0,0,0,0.1)): cards, light elevation
- Medium shadow (0 4px 8px rgba(0,0,0,0.12)): floating content, modals
- Deep shadow (0 12px 24px rgba(0,0,0,0.15)): hero sections, overlays
- Apply consistently: charts get medium shadow, slide backgrounds use subtle or none

**R2.3** Standardize corner radius
- Establish unified radius (4px, 6px, or 8px per theme)
- Apply to: cards, buttons, input fields, images
- No mixing of radius values across a single deck

**R2.4** Lock down color usage
- Primary: headings, key actions, accents only
- Secondary: supporting text, secondary elements
- Background/surface: ensure sufficient contrast with text
- Accent: highlights, interactive states, data visualization emphasis
- Generate theme CSS with predefined color variables; forbid inline color overrides

**R2.5** Ensure element alignment
- Grid-based layout: slides use 12-column or flexbox with consistent gaps
- Images scale proportionally, respect padding boundaries
- Charts auto-fit to slide dimensions without overflow
- Text never breaks unexpectedly due to font size or spacing changes

### R3. Interactive Polish

**R3.1** Add navigation controls
- Previous/Next buttons (visible, keyboard + click accessible)
- Slide counter (e.g., "3 / 12")
- Progress bar showing position in deck
- All controls styled to match slide theme
- Hide controls in presentation/fullscreen mode

**R3.2** Implement presenter view
- Toggle speaker notes panel (shows notes for current slide)
- Show current slide + next slide preview
- Display elapsed time / timer
- Keyboard shortcut list (? or help button)
- Accessible via toggle button or keyboard shortcut

**R3.3** Provide presentation controls
- Fullscreen mode (press F or button)
- Print mode (optimized for PDF)
- Download slide deck (as .html file)
- Keyboard navigation: Arrow keys (prev/next), spacebar (next), B/W (black/white screen), ESC (exit fullscreen)

**R3.4** Add interactive states
- Hover: buttons and clickable elements show visual feedback (color change, shadow, slight scale)
- Focus: keyboard navigation shows clear focus ring (visible outline, color contrast)
- Active: pressed state for buttons
- Disabled: grayed out, no cursor change on hover

**R3.5** Animate transitions
- Slide fade or subtle slide transition when navigating (optional, toggleable in settings)
- Smooth hover animations (no abrupt changes)
- Page load: fade in slides smoothly
- No jarring animations; all transitions ≤ 300ms

### R4. Layout & Responsiveness

**R4.1** Guarantee mobile-friendly rendering
- Slides readable on 320px+ width (phone portrait)
- Text scaling: reduce by no more than 10% on mobile
- Controls remain accessible and clickable (44px+ minimum touch target)
- Charts reflow or simplify on mobile (e.g., legend moves below)

**R4.2** Support print output
- Print CSS: hide navigation controls, progress bar, presenter view toggle
- Force page breaks between slides
- Optimize colors for black & white printing (sufficient contrast)
- Ensure no content is clipped when printing to PDF

**R4.3** Enforce content boundaries
- Slides have max-width and auto-center on large screens
- No element overflows slide boundaries
- Images fit within allocated space without cropping
- Content respects theme padding on all screen sizes

## Success Criteria

- Generated slides look professionally designed across all 3 themes
- Typography is consistent, readable, and derives from a documented formula
- All interactive controls work via keyboard and mouse
- Slides are accessible (WCAG AA minimum contrast, keyboard-navigable)
- Visual consistency is so strong that users perceive the skill as "high quality"
- Examples showcase the improvements (e.g., side-by-side before/after)
- Adoption increases because quality is immediately visible

## Scope Boundaries

**In scope:**
- All three quality systems (typography, interactive, visual consistency)
- All three themes fully refined
- All 12 formats inherit quality improvements automatically
- Chart.js integration gets quality styling
- Mobile and print support

**Out of scope:**
- New presentation formats beyond the existing 12
- Video embeds (capability addition, not quality)
- Dark mode (separate theme, handled as future enhancement)
- Animation library or complex interactions (keep lightweight)
- Backend hosting or cloud save features
- Collaborative editing

## Key Decisions

**Decision: Self-contained HTML**
- Rationale: Portability and simplicity. No build step, no server required. Users can share .html files directly.
- Trade-off: Limited to HTML/CSS/JS; no heavy frameworks like React.

**Decision: Web fonts via CDN (Google Fonts or Bunny)**
- Rationale: Professional typography requires quality fonts. CDN ensures reliability and fast loading.
- Trade-off: Requires internet connectivity; adds ~30-50KB to file size (acceptable, gzipped).

**Decision: Accessibility-first approach**
- Rationale: WCAG AA compliance ensures slides work for all users and communicate professionalism.
- Trade-off: Some design choices constrained by contrast/readability requirements; worth the trade.

**Decision: Presenter view optional, not required**
- Rationale: Speakers don't always need it, but when they do, it's valuable. Include as toggle, not always-on.
- Trade-off: Adds ~2KB of JS code.

## Dependencies / Assumptions

- Chart.js (already in use): Will be enhanced with theme-aware styling
- Google Fonts or Bunny Fonts API: Will supply web fonts
- CSS Grid / Flexbox: Modern browsers support required for layout
- JavaScript ES6: Modern JS features needed for interactive controls
- Browser: Assumes modern browser (Chrome, Firefox, Safari, Edge from 2020+)

## Outstanding Questions

### Resolved

- **[Typography formula]** Golden ratio (1.618) ✓
- **[Font pairings]** Google Fonts — planning will research and propose ✓
- **[Presenter view scope]** Notes only (minimal, focused) ✓

### Deferred to Planning

- **[Implementation detail]** Exact CSS architecture for theme variables and inheritance
- **[Testing requirement]** How to validate visual consistency (screenshot comparisons, automated tests, manual QA)?
- **[Performance tuning]** Optimize web font loading for fast initial render
- **[Browser support]** Confirm minimum browser versions to test against

## Next Steps

→ `/ce:plan` for structured implementation planning.
