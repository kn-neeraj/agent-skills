# Build Slides Skill - Workflow Example
**Topic:** "When to Use MCP vs When to Use CLI Tools"
**Date:** June 7, 2026

This document illustrates the complete three-gate workflow using a real presentation.

---

## 🎬 The Request

**User:** "Create a presentation explaining when to use MCP vs when to use CLI tools."

---

## 🚪 Gate 1: Style Selection

### Agent's Proposal

> Agent: "For this topic about MCP vs CLI tools, I recommend **Modern style**.
>
> Here's why: This is a technical comparison for developers/engineers. Modern style is clean, minimal, and tech-forward - perfect for developer audiences. It has a blue primary color and contemporary feel that conveys innovation.
>
> The Modern style includes:
> - Clean, minimal aesthetic
> - Blue primary color (#2563eb) for headings
> - Gray secondary colors for body text
> - 6px corner radius (modern/sleek)
> - Golden ratio typography (47px H1, 29px H2)
> - System fonts only (no external dependencies)
>
> Does this work for you?"

### User's Response

> User: "Yes, Modern style sounds perfect. It matches the technical nature of the topic."

### Result

✅ **Design is LOCKED**
- PPT Style: Modern
- All colors, fonts, spacing now fixed
- No design customization allowed

---

## 📝 Gate 2: Content Development

### Agent's Proposal

> Agent: "Let me outline a presentation structure for your topic. I'm thinking 6 slides:
>
> **Slide 1: Title Slide**
> - Title: "MCP vs CLI Tools"
> - Subtitle: "When to use each approach"
> - Footer: "2026"
>
> **Slide 2: Architecture Overview** (comparison)
> - Title: "Architecture Overview"
> - Left Column: CLI
>   - Direct command-line interface
>   - User executes commands manually
>   - Synchronous request-response
>   - Direct system access
> - Right Column: MCP
>   - Protocol-based integration
>   - Automated tool invocation
>   - Bidirectional communication
>   - Structured, permission-controlled access
>
> **Slide 3: Use Cases** (comparison)
> - Title: "Use Cases"
> - Left Column: CLI Best For
>   - One-off commands
>   - Developer workflows
>   - Manual exploration
>   - Direct system control
>   - Quick scripting
> - Right Column: MCP Best For
>   - AI-powered automation
>   - Continuous integration
>   - Complex workflows
>   - Multi-tool coordination
>   - Enterprise systems
>
> **Slide 4: Adoption Trends** (data visualization)
> - Title: "Adoption Growth"
> - Bar Chart showing CLI vs MCP adoption 2023-2025
>   - 2023: CLI 75%, MCP 25%
>   - 2024: CLI 60%, MCP 40%
>   - 2025: CLI 50%, MCP 50%
> - Insight: CLI declining, MCP growing
>
> **Slide 5: Key Differences** (list)
> - Title: "Key Differences"
> - Interaction Model: CLI is manual; MCP is automated
> - Integration: CLI requires parsing output; MCP uses structured data
> - Scalability: CLI limited to user input; MCP handles continuous streams
> - Security: CLI direct access; MCP has permission controls
> - Use Case: CLI for humans; MCP for AI agents
>
> **Slide 6: Conclusion** (title slide)
> - Title: "Choose the Right Tool"
> - Subtitle: "Match your use case to your approach"
> - Footer: "MCP and CLI will coexist"
>
> Does this cover what you want to communicate?"

### User's Iteration

> User: "This looks good overall. Can we reorder slides 3 and 4? I want the adoption data before use cases. Also, should we add anything about implementation complexity?"
>
> Agent: "Good points. Let me revise:
>
> **New Order:**
> 1. Title Slide
> 2. Architecture Overview
> 3. Adoption Growth (chart) ← moved up
> 4. Use Cases ← moved down
> 5. Key Differences
> 6. Conclusion
>
> Regarding implementation complexity - yes, that's important. I can add it to Slide 5 (Key Differences) or make it a separate line item. Which fits better?"
>
> User: "Add it to slide 5 as an additional key difference."
>
> Agent: "Updated. Any other changes?"
>
> User: "No, this is ready to go!"

### Result

✅ **Content is LOCKED**
- 6 slides with finalized content
- Content order: Title → Architecture → Adoption → Use Cases → Key Differences → Conclusion
- All text, data points, comparisons approved
- No more content changes

---

## 🎨 Gate 3: Structure Confirmation

### Agent's Proposal

> Agent: "Based on your locked content, here's how I'll structure each slide:
>
> **Slide 1: Title Slide**
> - Components: Title + Subtitle + Footer
> - Layout: Centered, full-width, vertical spacing
> - Why: Perfect for opening slide
>
> **Slide 2: Two-Column Slide**
> - Components: Title (full width) + Left Column (Title + List) + Right Column (Title + List)
> - Layout: Title centered, two columns at 42.5% width each, 48px gap
> - Why: Architecture comparison needs side-by-side layout
>
> **Slide 3: Data Slide**
> - Components: Title + Chart (bar chart) + Body Text
> - Layout: Title centered, chart centered below, text below chart
> - Chart type: Bar chart (2 datasets: CLI vs MCP)
> - Why: Adoption trends are best shown visually
>
> **Slide 4: Two-Column Slide**
> - Components: Title (full width) + Left Column (Title + List) + Right Column (Title + List)
> - Layout: Same as Slide 2 (two columns, centered)
> - Why: Use cases comparison is parallel information
>
> **Slide 5: Information Slide**
> - Components: Title + Bulleted List (5 items)
> - Layout: Title centered, bullet list centered, max-width 85%
> - Why: Key differences work best as a list
>
> **Slide 6: Title Slide**
> - Components: Title + Subtitle + Footer
> - Layout: Centered, vertical spacing (same as Slide 1)
> - Why: Conclusion/closing slide
>
> Does this arrangement and structure work for you?"

### User's Confirmation

> User: "Perfect! This is exactly how I'd want it arranged. The flow makes sense and the structures match the content types."

### Result

✅ **Structure is LOCKED**
- Slide 1: Title Slide
- Slide 2: Two-Column Slide
- Slide 3: Data Slide (Chart)
- Slide 4: Two-Column Slide
- Slide 5: Information Slide (List)
- Slide 6: Title Slide

---

## ⚙️ Execution: HTML Generation

Agent now has all three things locked:
- ✅ Design: Modern style (colors, fonts, spacing)
- ✅ Content: 6 slides with finalized text/data
- ✅ Structure: Which slide structure for each slide

Agent generates HTML by:
1. Reading ppt-styles.md → Gets Modern style specifications
2. Reading components-catalog.md → Understands how to render each component
3. Reading slide-structures.md → Knows how to arrange components
4. For each locked slide:
   - Apply Modern style colors/fonts/spacing
   - Insert locked content
   - Use locked structure layout
   - Generate HTML
5. Add navigation controls, keyboard shortcuts
6. Add Chart.js for the bar chart on Slide 3
7. Output: `mcp-vs-cli-tools.html`

---

## ✅ Result

**Presentation Generated:** `mcp-vs-cli-tools.html`

### Characteristics:
- ✅ Self-contained (no external dependencies except Chart.js)
- ✅ Offline-capable (works with `file://` protocol)
- ✅ Professional design (Modern style applied throughout)
- ✅ Proper initialization (first slide visible on load)
- ✅ All text visible (proper contrast, readable fonts)
- ✅ Interactive (navigation buttons, keyboard shortcuts)
- ✅ Responsive (works on mobile and desktop)

### User's Validation

> User: "Let me open the HTML in my browser...
> [Opens file in browser]
> Perfect! The slides look professional, the colors are clean, the flow is logical, and I can definitely present this. The chart shows the trend clearly. This is exactly what I needed!"

---

## 🎯 Summary

**The Workflow in Action:**

| Phase | What Happens | Who Decides | Locked? |
|-------|--------------|------------|---------|
| **Gate 1** | Agent proposes style | User confirms | ✅ Design |
| **Gate 2** | Agent helps develop content | User refines/approves | ✅ Content |
| **Gate 3** | Agent proposes structure | User confirms | ✅ Structure |
| **Execute** | Agent generates HTML | Mechanical process | ✅ Output |

**Time Investment:**
- Gate 1: 2 minutes (style choice)
- Gate 2: 10 minutes (content development with user)
- Gate 3: 3 minutes (structure confirmation)
- Execute: < 1 minute (agent generates)

**Total: ~15 minutes from request to presentation-ready HTML**

---

## 💡 Key Points Illustrated

1. **Agent proposes, User validates** - At each gate, agent takes initiative but user has final say
2. **Locking prevents chaos** - Once something is locked, no accidental changes
3. **User focuses on content** - User doesn't worry about design or structure mechanics
4. **Agent handles catalogs** - Agent knows about ppt-styles, components, structures (user doesn't need to)
5. **Three gates = high quality** - By the time we generate, everything has been validated

---

## 📂 Output File

Generated file: `/build-slides/examples/mcp-vs-cli-tools.html`

This HTML file is:
- Complete and ready to present
- Works offline (no web server needed)
- Uses Modern style (blue, clean, tech-forward)
- Contains all locked content
- Has proper slide structures
- Includes navigation and keyboard support
- Includes bar chart for adoption data
