# Build Slides Skill - Structure Improvement Plan
**Date:** June 7, 2026
**Branch:** slide-components
**Status:** Planning

---

## 🎯 Vision

Transform `/build-slides` from a loose instructional skill into a **complete, packaged system** that guides agents to consistently create high-quality PPTs.

Instead of agents discovering components, styles, and structures on their own, we provide a **comprehensive package** with everything they need upfront.

---

## 🏗️ Three-Layer Architecture

### Layer 1: PPT Style (Design System - Locked)
**File:** `ppt-styles.md`

Defines visual design once, applies everywhere:
- Background (light/dark)
- Text colors (locked)
- Chart/graph color palette (locked)
- Font family (locked)
- Spacing rules (locked)

**Examples:**
- `light-1`: Light background, blue primary, gray secondary
- `dark-1`: Dark background, light text, accent colors
- `professional-1`: Serif fonts, neutral palette, conservative spacing

**Why locked?** Ensures visual consistency across entire presentation.

---

### Layer 2: Components Catalog (Building Blocks)
**File:** `components-catalog.md`

Reusable content components agents can use:
- **Text Components**
  - Title text
  - Subtitle text
  - Body text
  - Footer text

- **List Components**
  - Bullet list (unordered)
  - Numbered list
  - Nested list

- **Data Components**
  - Table (rows/columns)
  - Chart (bar, line, doughnut, etc.)
  - Cards list (title + description)

- **Code Components**
  - Code snippet (with syntax highlighting)
  - Code with explanation

- **Flow Components**
  - Step-by-step (numbered steps with descriptions)
  - Timeline
  - Decision tree

Each component definition includes:
- Component name
- Required fields
- Optional fields
- Example markdown syntax
- Rendering rules

---

### Layer 3: Slide Structures (Compositions)
**File:** `slide-structures.md`

Predefined slide templates that combine components:
- **Title Slide** = [Title] + [Subtitle] + [Footer]
- **Information Slide** = [Title] + [List] + [Footer]
- **Data Slide** = [Title] + [Chart/Table] + [Footer]
- **Code Slide** = [Title] + [Code Snippet] + [Footer]
- **Two-Column Slide** = [Title] + [Left Column] + [Right Column]
- **Step-by-Step Slide** = [Title] + [Flow Component] + [Footer]
- **Hero Slide** = [Large Title] + [Subtitle] + [Background Image]

Each structure specifies:
- Component layout
- Spacing rules
- Component sizing
- Optional/required components

---

## 📊 Agent Workflow - Gated Approach with User Validation

### Gate 1: Style Selection
```
Agent reads SKILL.md instructions
     ↓
Agent understands user request (topic, tone, audience)
     ↓
[GATE 1 - GENERATE & VALIDATE]
Agent proposes: "I recommend PPT Style: [Modern|Classic|Bold]"
     ↓
Agent guides user: "This style works well for [topic] because [reason]"
     ↓
User reviews and decides: "Yes, this works" OR "Let me try another"
     ↓
User confirms choice
     ↓
[LOCK] DESIGN LOCKED ✅
       All design now fixed (colors, fonts, spacing, etc.)
```

### Gate 2: Content Development
```
Agent works WITH user on content
     ↓
[GATE 2 - GENERATE & VALIDATE]
Agent proposes: "For your topic, I suggest these content points:"
  ├─ Slide 1: [content]
  ├─ Slide 2: [content]
  └─ Slide 3: [content]
     ↓
Agent guides user: "Does this cover what you want to say?"
                   "Should we add/remove/clarify anything?"
                   "Is this order logical?"
     ↓
User reviews and refines content
     ↓
Agent: "Any other changes needed?"
     ↓
User confirms: "Content is ready"
     ↓
[LOCK] CONTENT LOCKED ✅
       All content now fixed (no more changes)
```

### Gate 3: Structure & Layout
```
Agent plans slide arrangement based on LOCKED content
     ↓
[GATE 3 - GENERATE & VALIDATE]
Agent proposes: "I'll arrange your content like this:"
  ├─ Slide 1: title-slide
  │  ├─ Title component
  │  └─ Subtitle component
  ├─ Slide 2: info-slide
  │  ├─ Title component
  │  └─ Bullet list component
  └─ Slide 3: data-slide
     ├─ Title component
     └─ Chart component
     ↓
Agent guides user: "Does this slide arrangement make sense?"
                   "Should any slides be reordered?"
                   "Does the flow work?"
     ↓
User reviews arrangement
     ↓
Agent: "Any changes to the structure?"
     ↓
User confirms: "Structure is good"
     ↓
[LOCK] STRUCTURE LOCKED ✅
       All structure now fixed (slide types, layouts, arrangement)
```

### Execution: HTML Generation (Deterministic)
```
[EXECUTION PHASE]
Everything is now LOCKED:
  ✅ Design (from Gate 1)
  ✅ Content (from Gate 2)
  ✅ Structure (from Gate 3)

Agent generates HTML by mechanically applying all three locked specifications:
  ├─ For each slide:
  │  ├─ Apply locked structure (which components)
  │  ├─ Insert locked content (what was approved)
  │  ├─ Apply locked style (colors, fonts, spacing)
  │  └─ Generate HTML
  ├─ Add navigation, keyboard support
  ├─ Add Chart.js for visualizations
  └─ Output: production-ready HTML file

Result: High-quality, presentation-ready slides ✅
     ↓
User views final HTML: "Does this look good to present?"
     ↓
Done! Ready to use.
```

---

## 📦 Skill Package Structure

```
/build-slides/
├── SKILL.md
│   └── "How to use this package"
│       - Step 1: Read the layers
│       - Step 2: Plan PPT with styles & structures
│       - Step 3: Write markdown file
│       - Step 4: Generate HTML from references
│       - QA checklist
│
├── ppt-styles.md
│   └── Available design systems
│       - light-1 (light background, blue/gray)
│       - dark-1 (dark background, light text)
│       - professional-1 (serif, conservative)
│       - bold-1 (high contrast, striking)
│
├── components-catalog.md
│   └── All reusable components
│       - Text components (title, subtitle, body, footer)
│       - List components (bullet, numbered, nested)
│       - Data components (table, chart, cards)
│       - Code components (snippet, with explanation)
│       - Flow components (steps, timeline, tree)
│
├── slide-structures.md
│   └── Predefined slide templates
│       - title-slide
│       - info-slide
│       - data-slide
│       - code-slide
│       - two-column-slide
│       - step-by-step-slide
│       - hero-slide
│
├── examples/
│   ├── mcp-vs-cli.html ........... Working example
│   └── slide-content.md .......... Example markdown (input)
│
└── assets/
    └── chart-patterns.md ........ Chart.js code patterns
```

---

## ✅ Benefits of This Structure

| Aspect | Before | After |
|--------|--------|-------|
| **Agent Clarity** | Discovers components on own | Has complete catalog |
| **Consistency** | Varies by agent interpretation | Locked by PPT style |
| **Speed** | Agent figures out slide types | Knows available structures |
| **Quality** | Inconsistent results | Standardized results |
| **Maintenance** | Hard to change rules | Central locations for updates |
| **Discoverability** | Agent must ask "what's possible?" | Everything documented |

---

## 🚀 Implementation Plan

### Step 1: Document Current System
- [ ] Read existing SKILL.md, components.md, styles.md
- [ ] Extract reusable patterns
- [ ] Identify missing components

### Step 2: Create PPT Styles Document
- [ ] Define light-1, dark-1, professional-1, bold-1
- [ ] Lock colors, fonts, spacing
- [ ] Create style examples

### Step 3: Create Components Catalog
- [ ] List all available components
- [ ] Define required/optional fields
- [ ] Create markdown syntax examples
- [ ] Document rendering rules

### Step 4: Create Slide Structures Document
- [ ] Define all slide templates
- [ ] Specify component combinations
- [ ] Show layout diagrams
- [ ] Provide examples

### Step 5: Refactor SKILL.md
- [ ] Add three-layer architecture explanation
- [ ] Update agent workflow steps
- [ ] Reference new documents
- [ ] Add comprehensive examples

### Step 6: Update Examples
- [ ] Create multiple example presentations
- [ ] Show markdown input + HTML output
- [ ] Demonstrate different styles

### Step 7: Testing
- [ ] Test agent workflow end-to-end
- [ ] Verify consistency across styles
- [ ] Validate component rendering
- [ ] Check chart integration

---

## 📝 Key Principles

1. **Single Source of Truth** - Each concept defined once
2. **Agent-Friendly** - Everything discoverable upfront
3. **Locked Design** - Style prevents inconsistency
4. **Composable** - Components + Structures = Flexibility
5. **Clear Contracts** - Each component has defined inputs/outputs

### The Core Insight: Gates → Lock → Execute

**Without gates (unstructured approach):**
- Agent makes decisions throughout process
- Design can change at any time
- Content structure unclear until generation
- Generation is complex and error-prone
- Quality varies based on agent's choices

**With gates (our approach):**
1. **Gate 1** → Lock design (no more design decisions)
2. **Gate 2** → Lock structure (no more layout decisions)
3. **Gate 3** → Lock content (no more content changes)
4. **Execute** → Generation is mechanical/formulaic
   - Input: Locked content + locked style + locked structure
   - Output: Guaranteed high-quality HTML
   - Process: Just apply the specifications

**Result:** Generation becomes **deterministic** - same input always produces same quality output

---

## 🎓 What Agents Will See

When an agent uses this skill:

```
"I have three catalogs available to me:
 - ppt-styles.md: 3 PPT styles (Modern, Classic, Bold)
 - components-catalog.md: 15+ reusable components
 - slide-structures.md: Predefined slide template combinations

My workflow with the user:

GATE 1 (Style):
  └─ I propose a style → User validates → Design LOCKED

GATE 2 (Content):
  └─ I work with user on content → User approves → Content LOCKED

GATE 3 (Structure):
  └─ I propose slide arrangement → User confirms → Structure LOCKED

EXECUTE (Generation):
  └─ I apply all three locked things and generate HTML

The user only cares about:
  ✅ Content (did we capture what needs to be said?)
  ✅ Final look (does it look good to present?)

I handle:
  ✅ Choosing which style fits the topic
  ✅ Reading and using the component catalog
  ✅ Reading and using slide structures
  ✅ Guiding the user at each gate
  ✅ Generating the HTML
```

---

## 📎 References

- Current SKILL.md (to be refactored)
- Current components.md (to be expanded)
- Current styles.md (to become ppt-styles.md)
- Current mcp-vs-cli.html (example of end product)

---

## 💡 Notes

- This approach treats the skill as a **complete, self-contained system**
- Agents don't need to discover; everything is packaged
- Easy to add new styles or components without breaking existing ones
- Creates consistency without sacrificing flexibility
- Makes the skill reusable across any PPT type

---

**Next Steps:** Proceed with Step 1 (Document Current System)
