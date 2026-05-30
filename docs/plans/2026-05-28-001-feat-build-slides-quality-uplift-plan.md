---
title: Build Slides Skill Enhancement - Quality & Features
type: feat
status: active
date: 2026-05-28
origin: docs/brainstorms/2026-05-28-build-slides-quality-uplift-requirements.md
---

# Build Slides Skill Enhancement

## Perspective

This is a **Skill Enhancement** — we're improving the build-slides skill so that any agent using it gets professional, polished, interactive slide decks with typography excellence, visual consistency, and user-friendly features.

**When an agent calls this skill:**
- Input: "Create a 5-slide pitch deck about AI agents"
- Output: Self-contained HTML with golden ratio typography, navigation controls, keyboard support, presenter notes, interactive polish
- Quality: Looks professionally designed, feels intentional, works on mobile and print

## What the Skill Will Generate

### Features
1. **Navigation Controls** - Prev/next buttons, slide counter (3/10), progress bar (30%)
2. **Keyboard Navigation** - Arrow keys (prev/next), Space (advance), F (fullscreen), ESC (exit), N (toggle notes)
3. **Presenter View** - Toggle button to show speaker notes panel
4. **Interactive Feedback** - Button hover effects (lift), focus rings, smooth slide transitions

### Quality Standards
1. **Typography** - Golden ratio (1.618) formula; professional Google Fonts; readable hierarchy
2. **Visual Consistency** - 8px spacing grid; shadow depth levels; unified corner radius
3. **Interactive Polish** - Smooth transitions (≤300ms), hover effects, visible focus states

## Implementation Plan

### Phase 1: Define Quality Systems (Update Documentation)

**U1: Typography System Definition**
- Update `build-slides/styles.md`: Document golden ratio formula (1.618)
- Define base sizes per theme and derived scales (H1, H2, H3, body, caption, fine-print)
- Specify Google Fonts pairings:
  - Modern: Bricolage Grotesque (heading) + Inter (body)
  - Classic: Playfair Display (heading) + Montserrat (body)
  - Bold: Space Grotesk (heading) + Inter (body)
- Update `SKILL.md`: Add instruction "Apply golden ratio typography formula when generating CSS"

**U2: Visual Consistency Systems**
- Update `build-slides/styles.md`: Define spacing scale (8px base: 4, 8, 16, 24, 32, 48, 64, 96px)
- Define shadow hierarchy (subtle: 0 1px 3px rgba(0,0,0,0.1); medium: 0 4px 8px; deep: 0 12px 24px)
- Define corner radius per theme (Modern: 6px, Classic: 4px, Bold: 8px)
- Update `SKILL.md`: Add instruction "Use spacing scale for all padding/margin/gap values"

**U3: Feature System Architecture**
- Update `SKILL.md`: Define HTML structure for navigation bar, notes panel, interactive elements
- Document when to include each feature (navigation always on, notes optional, keyboard always enabled)
- Specify CSS class names and structure for consistency

### Phase 2: Create Helper Functions & Utilities

**U4: Chart Theme Color Helper**
- Create `build-slides/assets/chart-colors.js` - Function to extract theme colors from CSS and inject into Chart.js
- Update `build-slides/assets/chart-patterns.md` - Show how to use helper function in each pattern
- Result: Charts automatically inherit theme colors without hardcoding

**U5: Keyboard Navigation Handler**
- Create `build-slides/assets/keyboard.js` - Event listener for arrow keys, space, F, ESC, N
- Handle fullscreen API, notes toggle, slide navigation
- Result: Agents don't need to implement keyboard logic; it's built in

**U6: Interactive States CSS**
- Create interactive state definitions in `build-slides/styles.md`:
  - Button hover: transform lift (-2px), shadow increase, color shift
  - Focus visible: 3px outline in primary color
  - Active: pressed state
  - Disabled: opacity 0.5, pointer-events none
- Add slide transition CSS: fade (opacity 0→1, 300ms)
- Result: All interactive feedback consistent across themes

### Phase 3: Update Skill Execution Instructions

**U7: Update SKILL.md Workflow**
- Step 1: Parse user request (topic, slide count, format, theme)
- Step 2: Select format template (12 options: pitch, tutorial, report, etc.)
- Step 3: Apply chosen theme (Modern, Classic, Bold)
- Step 4: **NEW** - Build HTML with quality systems:
  - Use golden ratio typography formula for font sizes
  - Load Google Fonts via CDN
  - Apply spacing scale to all padding/margin/gap
  - Apply shadow hierarchy to elements
  - Include navigation bar (prev/next, counter, progress)
  - Include notes panel toggle
  - Include keyboard handler script
  - Include interactive state CSS (hover, focus, transitions)
- Step 5: Generate content for each slide following format
- Step 6: Add Chart.js visualizations with theme color injection
- Step 7: Add speaker notes (if provided)
- Step 8: QA checklist (contrast, mobile responsive, navigation works, notes functional)

**U8: Create HTML Template**
- Create template showing complete structure agents should follow
- Include: head (fonts, CSS), navigation bar, slides container, notes panel, scripts (keyboard, chart-colors)
- Document where content goes, where to inject scripts, where to customize

### Phase 4: Generate Examples Showcase

**U9: Create Examples Folder**
- Create `build-slides/examples/` directory
- Create `build-slides/examples/agent-development-lifecycle.html` - Full slide deck demonstrating:
  - **Slide 1 (Title)**: Showcase title slide with golden ratio typography
  - **Slide 2 (Overview)**: Show navigation controls, progress bar, notes panel
  - **Slide 3 (Typography)**: Demonstrate H1, H2, H3, body hierarchy from formula
  - **Slide 4 (Spacing)**: Show consistent grid-based spacing
  - **Slide 5 (Charts)**: Include Chart.js visualization with theme colors
  - **Slide 6 (Interactivity)**: Document keyboard shortcuts (arrows, space, F, N)
  - **Slide 7 (Quality)**: Before/after comparison of old vs new builds
  - **Slide 8 (Summary)**: Call to action for agents to use this skill
- Create `build-slides/examples/README.md`:
  - What agents can expect when using build-slides skill
  - Feature overview (navigation, keyboard, presenter view)
  - Quality standards (typography, spacing, shadows)
  - How to view and interact with examples
  - Links to open examples in browser

**U10: Documentation & Reference**
- Create `build-slides/keyboard-shortcuts.md` - User reference for all keyboard shortcuts
- Update `SKILL.md` - Complete workflow with quality systems integrated
- Create `build-slides/IMPLEMENTATION_GUIDE.md` - How agents should call this skill, what to expect

### Phase 5: Quality Assurance & Testing

**U11: Validation Checklist**
- Verify golden ratio formula applied consistently across all themes
- Verify Google Fonts load correctly via CDN
- Verify spacing scale used for all layout (no hardcoded pixel values)
- Verify shadow hierarchy visible and appropriate
- Verify navigation buttons work (prev/next, counter updates, progress bar moves)
- Verify keyboard shortcuts work (arrows, space, F, ESC, N)
- Verify notes panel toggles and shows correct notes
- Verify interactive feedback works (button hover lifts, focus ring visible, transitions smooth)
- Verify mobile responsive (320px viewport, 44px touch targets)
- Verify all three themes work with all features

**U12: Agent-Ready Sign-Off**
- Skill produces consistent, professional output
- Agents can use skill without worrying about typography, spacing, interactivity
- Examples demonstrate what agents will receive

## Skill Output Standard

When an agent uses build-slides skill, they will get HTML that includes:

```
✓ Golden ratio typography (H1→H3→body derived from 1.618 formula)
✓ Professional Google Fonts loaded via CDN
✓ 8px-based spacing grid throughout
✓ Shadow depth system (subtle/medium/deep)
✓ Navigation bar (prev/next buttons, slide counter, progress bar)
✓ Speaker notes toggle (show/hide current slide notes)
✓ Keyboard navigation (arrows, space, F, ESC, N)
✓ Interactive feedback (button hover lift, focus rings, slide transitions)
✓ Responsive mobile layout (320px+, 44px touch targets)
✓ Print-friendly CSS (hides controls, adds page breaks)
✓ Works across all three themes (Modern, Classic, Bold)
```

## Success Criteria

- ✓ Skill generates slides with golden ratio typography applied consistently
- ✓ Navigation controls visible and functional
- ✓ Keyboard shortcuts work (arrows, space, F, ESC, N)
- ✓ Presenter notes toggle functional
- ✓ Interactive feedback (hover effects, transitions) smooth and visible
- ✓ Spacing, shadows, corner radius applied consistently
- ✓ Examples folder contains "Agent Development Lifecycle" deck showcasing all features
- ✓ Documentation clear for agents on what to expect from skill output

## Files to Modify/Create

**Modify:**
- `build-slides/SKILL.md` - Enhanced workflow with quality systems
- `build-slides/styles.md` - Add typography formula, spacing scale, shadows, corner radius
- `build-slides/assets/chart-patterns.md` - Update with theme color injection

**Create:**
- `build-slides/assets/chart-colors.js` - Color extraction and injection utility
- `build-slides/assets/keyboard.js` - Keyboard navigation handler
- `build-slides/assets/navigation-bar.js` - Navigation control logic (optional, may use CSS)
- `build-slides/examples/agent-development-lifecycle.html` - Full example deck
- `build-slides/examples/README.md` - Gallery and overview
- `build-slides/keyboard-shortcuts.md` - User reference
- `build-slides/IMPLEMENTATION_GUIDE.md` - Guidance for agents using skill

## Next Steps

After approval, will execute in this order:
1. **Define Systems** (U1-U3): Documentation and specifications
2. **Build Utilities** (U4-U6): Helper functions and CSS
3. **Update Skill** (U7-U8): SKILL.md instructions and templates
4. **Create Examples** (U9-U10): Example deck and documentation
5. **Validate** (U11-U12): QA and sign-off
