# Build Slides Skill - Current System Analysis
**Date:** June 7, 2026
**Purpose:** Document existing system as foundation for three-layer architecture

---

## 📊 What Exists Today

### 1. PPT Styles (Already Defined)
**File:** `styles.md`

**3 Complete Themes:**

#### Theme 1: Modern
- **Philosophy:** Clean, minimal, tech-forward
- **Typography:** Golden ratio, base 18px
  - H1: 47px
  - H2: 29px
  - H3: 18px
  - Body: 18px
- **Colors:**
  - Primary: #2563eb (blue)
  - Secondary: #64748b (gray)
  - Accent: #0ea5e9 (light blue)
  - Background: #ffffff (white)
  - Surface: #f8fafc (off-white)
  - Text: #1e293b (dark gray)
  - Text-light: #64748b (medium gray)
- **Corner Radius:** 6px
- **Fonts:** Bricolage Grotesque (heading) + Inter (body)

#### Theme 2: Classic
- **Philosophy:** Traditional, trustworthy, professional
- **Typography:** Golden ratio, base 18px (same as Modern)
- **Colors:**
  - Primary: #1e40af (navy)
  - Secondary: #475569 (gray)
  - Accent: #d97706 (orange)
  - Background: #ffffff (white)
  - Surface: #f1f5f9 (light gray)
  - Text: #0f172a (near black)
  - Text-light: #64748b (medium gray)
- **Corner Radius:** 4px
- **Fonts:** Playfair Display (heading) + Montserrat (body)

#### Theme 3: Bold
- **Philosophy:** High contrast, striking, for impact
- **Typography:** Golden ratio, base 20px
  - H1: 53px
  - H2: 32px
  - Body: 20px
- **Colors:**
  - Primary: #dc2626 (red)
  - Secondary: #171717 (near black)
  - Accent: #f59e0b (amber)
  - Background: #fafafa (off-white)
  - Surface: #262626 (dark)
  - Text: #171717 (near black)
  - Text-light: #737373 (medium gray)
  - Text-inverse: #fafafa (white on dark)
- **Corner Radius:** 8px
- **Fonts:** Space Grotesk (heading) + Inter (body)

**Quality Systems (Applied to All Themes):**
- **Spacing Scale:** 8px base → 4, 8, 16, 24, 32, 48, 64, 96px
- **Shadow Hierarchy:**
  - Subtle: `0 1px 3px rgba(0,0,0,0.1)`
  - Medium: `0 4px 8px rgba(0,0,0,0.12)`
  - Deep: `0 12px 24px rgba(0,0,0,0.15)`
- **Text Alignment:** Center-aligned by default
- **Corner Radius:** Theme-specific (Modern: 6px, Classic: 4px, Bold: 8px)

---

### 2. Slide Structures (Already Defined)
**File:** `components.md`

#### Structure 1: Title Slide
**Components:**
- Title text (H1, primary color, 47px)
- Subtitle text (H2, secondary color, 29px)
- Description/Footer text (P, text-light, 18px)

**Layout:**
- Center aligned
- Vertical centering
- 60px padding (top/bottom)
- Full width

**Markdown Syntax:**
```markdown
## Slide 1: title-slide
- Title: Ladder of AI Knowledge
- Subtitle: From Applied AI to Hardware
- Description: May 2026
```

---

#### Structure 2: Basic (Information Slide)
**Components:**
- Title text (H2, secondary color, 29px)
- Content area:
  - Body text (P, 18px)
  - Bullet lists (UL/LI, 18px)

**Layout:**
- Title centered
- Content max-width 85%
- Center aligned
- 40px top padding
- Vertical centering

**Markdown Syntax:**
```markdown
## Slide 2: basic
- Title: The Four Rungs
- Design — Define behavior
- Implementation — Build logic
- Testing — Validate flows
- Deployment — Production setup
```

---

#### Structure 3: Two-Column
**Components:**
- Title text (H2, centered, full width)
- Left column:
  - Column title (H3)
  - Body text or list (UL/LI)
- Right column:
  - Column title (H3)
  - Body text or list (UL/LI)

**Layout:**
- Title centered, full width
- Two equal columns (42.5% width each)
- 30px gap between columns
- 40px top padding
- Vertical centering

**Markdown Syntax:**
```markdown
## Slide 3: two-column
- Title: Design Phase Comparison
- ### Left: Iterative Design
  - Fast deployment
  - Real-world validation
- ### Right: Comprehensive Design
  - Thorough planning
  - Cleaner architecture
```

---

#### Structure 4: Chart Layout
**Components:**
- Title text (H2, centered)
- Chart container:
  - Canvas element
  - Chart.js code
- Text area:
  - Body text (P)
  - Optional explanation

**Layout:**
- Title centered
- Chart container with canvas
- 20px around chart
- Optional text area next to chart (30px gap)
- Can be side-by-side or stacked

**Markdown Syntax:**
```markdown
## Slide 4: chart-layout
- Title: Testing Coverage
- [CHART: doughnut]
  - Unit Tests: 45%
  - Integration: 35%
  - E2E: 20%
- Strong coverage ensures reliability
```

---

### 3. Components (Implicitly Used)
**Components in Use (Extracted from Current Structures):**

#### Text Components
| Component | HTML | Size | Color | Usage |
|-----------|------|------|-------|-------|
| Slide Title | H1 | 47px | primary | Title slide heading |
| Section Title | H2 | 29px | secondary | Slide heading |
| Column Title | H3 | 18px | primary | Sub-section heading |
| Body Text | P | 18px | text/text-light | Main content |
| Description | P | small | text-light | Subtitle, footer |

#### List Components
| Component | HTML | Format | Spacing | Usage |
|-----------|------|--------|---------|-------|
| Bullet List | UL/LI | Unordered bullets | 16px between items | Information slides |
| List Item | LI | Text with spacing | 18px font | Info content |

#### Chart Components
| Component | Tool | Types | Usage |
|-----------|------|-------|-------|
| Chart | Chart.js | Bar, Line, Doughnut, Area, Pie | Data visualization |
| Chart Canvas | HTML5 | Canvas element | Render area |

#### Container Components
| Component | Purpose | Width | Alignment |
|-----------|---------|-------|-----------|
| Full Slide | Outer container | 100% | Center |
| Content Area | Text wrapper | 85% max | Center |
| Column | Side-by-side layout | 42.5% × 2 | Flex |
| Chart Container | Chart wrapper | Responsive | Center |

---

## 🔄 Current Workflow

**Step 1: Agent Reads Input Files**
```
SKILL.md → Understand task
slide-content.md → Content to display
components.md → Layout options
styles.md → Design system
```

**Step 2: Agent Parses Markdown**
```
## Slide 1: title-slide
    ↓
Identify structure type: "title-slide"
Extract content: Title, Subtitle, Description
```

**Step 3: Agent Applies Structure**
```
title-slide structure says:
- Use H1 for title (47px, primary color)
- Use H2 for subtitle (29px, secondary color)
- Use P for description (small, text-light)
- Center align everything
- Apply 60px padding
```

**Step 4: Agent Applies Style**
```
Select theme: "Modern"
    ↓
Apply colors from Modern theme
Apply typography from Modern theme
Apply spacing scale (8px base)
Apply shadow hierarchy
```

**Step 5: Agent Generates HTML**
```
<div class="slide">
  <h1 style="color: #2563eb; font-size: 47px;">Title</h1>
  <h2 style="color: #64748b; font-size: 29px;">Subtitle</h2>
  <p style="color: #64748b; font-size: 18px;">Description</p>
</div>
```

---

## 📋 What's Missing/Incomplete

### 1. Component Catalog
❌ Not explicitly documented as a reusable catalog
- Components are embedded in slide structures
- No clear "here are all available components" reference
- No component variants documented

### 2. PPT Style Documentation
⚠️ Partially complete
- 3 themes defined
- But not labeled as "PPT Style 1, 2, 3"
- No summary of what's locked (colors, fonts, spacing)
- Design system is clear but scattered

### 3. Slide Structure Organization
⚠️ Partially complete
- 4 structures defined
- But not clearly positioned as "structure templates"
- No visual diagrams
- No structure variants

### 4. Component Variants
❌ Not documented
- Lists could have: bullets, numbered, nested
- Text could have: left-aligned, right-aligned, justified
- No clarity on these options

### 5. New Components Not Yet Used
❌ Missing components mentioned in plan but not implemented:
- Table component
- Code snippet component
- Step-by-step/Flow component
- Cards list component

---

## 🎯 Mapping Current System to Three-Layer Model

### Layer 1: PPT Style → READY
✅ File: `styles.md`
✅ Contains: 3 complete themes with locked colors, fonts, spacing
✅ Action needed: Rename sections to "PPT Style 1: Modern", "PPT Style 2: Classic", "PPT Style 3: Bold"

### Layer 2: Components → PARTIALLY READY
⚠️ File: Currently embedded in `components.md`
⚠️ Current: Components listed within slide structures
✅ Action needed: Extract components into standalone catalog
✅ Add: Component variants, usage examples, rendering rules

### Layer 3: Slide Structures → READY
✅ File: `components.md`
✅ Contains: 4 clear slide structures (title-slide, basic, two-column, chart-layout)
✅ Action needed: Rename file to `slide-structures.md` for clarity

---

## 📦 Refactoring Plan

### Current Files → New Structure

**Before:**
```
build-slides/
├── SKILL.md
├── components.md (slides + components mixed)
├── styles.md (3 themes)
└── formats.md (legacy)
```

**After:**
```
build-slides/
├── SKILL.md (refactored with three-layer explanation)
├── ppt-styles.md (extract from styles.md, rename themes)
├── components-catalog.md (extract components, add variants)
├── slide-structures.md (extract from components.md)
└── assets/
    └── chart-patterns.md (existing)
```

---

## ✅ Reusable Patterns Extracted

### Spacing Rules
- **Base unit:** 8px
- **Slide padding:** 40-80px (depends on style)
- **Between elements:** 16-24px (2-3 base units)
- **Column gap:** 30px
- **Content max-width:** 85%
- **Column width:** 42.5% (two columns)

### Color Conventions
- **Primary:** Used for headings, CTAs, emphasis
- **Secondary:** Used for body text, secondary headings
- **Accent:** Used for highlights, hover states
- **Background:** Main slide background
- **Surface:** Card/panel backgrounds
- **Text:** Primary text color
- **Text-light:** Secondary text color, descriptions

### Typography Conventions
- **H1 (Title):** Largest, primary color, heading font
- **H2 (Section):** Secondary size, secondary color, heading font
- **H3 (Column):** Small heading, primary color, heading font
- **P (Body):** Base size, text color, body font
- **Small (Description):** Reduced size, text-light color

### Layout Conventions
- **Center alignment:** Default for all content
- **Full width:** Slide containers, titles
- **Max-width containers:** Content areas (85%)
- **Equal columns:** Two-column slides (42.5% each)
- **Flex layout:** For columns and spacing
- **Vertical centering:** Using flex justify-content: center

---

## 🎓 Key Insights

1. **Styles.md is complete** - It already defines 3 full PPT styles
2. **Components are implicit** - They exist but aren't cataloged separately
3. **Slide structures are clear** - 4 well-defined structures
4. **Workflow is sound** - Agent reads files, applies structure, applies style
5. **Spacing is consistent** - Uses 8px scale throughout
6. **Colors are locked** - Themes define all colors, no improvisation

---

## 🚀 Next Steps

1. ✅ **Step 1 Complete:** Current system documented
2. **Step 2:** Extract and reorganize into three-layer files
3. **Step 3:** Create PPT Styles document (from styles.md)
4. **Step 4:** Create Components Catalog (new + extracted)
5. **Step 5:** Create Slide Structures document (from components.md)
6. **Step 6:** Refactor SKILL.md to reference three layers
7. **Step 7:** Update examples

---

## 📎 Files Analyzed
- `/build-slides/SKILL.md` - Main instructions
- `/build-slides/styles.md` - Quality systems & themes
- `/build-slides/components.md` - Slide structures
- `/build-slides/assets/chart-patterns.md` - Chart patterns
- `/build-slides/examples/mcp-vs-cli.html` - Working example
