# Build Slides Skill
**Generate professional presentations with locked design, validated content, and structured slides.**

This skill is designed for LLM agents to create high-quality PPTs by guiding users through a three-gate workflow: Style Selection → Content Development → Structure Confirmation → HTML Generation.

---

## 🏗️ Three-Layer Architecture

This skill uses three external catalogs:

### Layer 1: PPT Styles (`ppt-styles.md`)
Define complete design systems - locked colors, fonts, spacing, everything.

**Available styles:**
- Modern: Blue, clean, tech-forward (47px H1, 6px radius)
- Classic: Navy, professional, trustworthy (42px H1, 4px radius)
- Bold: Red, striking, high-impact (53px H1, 8px radius)

**Agent's role:** Choose the style that best fits the topic/audience.

---

### Layer 2: Components Catalog (`components-catalog.md`)
Define reusable building blocks: text, lists, charts, tables, code, flows.

**Available components:**
- Text: Title, Subtitle, Body, Footer
- Lists: Bullet, Numbered, Nested
- Data: Chart, Table, Cards
- Code: Code Snippet
- Flow: Steps, Timeline

**Agent's role:** Reference this catalog when mapping content to slide structures.

---

### Layer 3: Slide Structures (`slide-structures.md`)
Define slide templates that combine components.

**Available structures:**
- Title Slide (title + subtitle + footer)
- Information Slide (title + text + list)
- Two-Column Slide (title + left/right columns)
- Data Slide (title + chart + text)
- Table Slide (title + table + text)
- Process Slide (title + steps)
- Timeline Slide (title + timeline)

**Agent's role:** Map locked content to these structures.

---

## 🚪 Three-Gate Workflow

### Gate 1: Style Selection
**What happens:** Agent proposes a PPT style. User validates.

**Agent's task:**
1. Read user's request (topic, tone, audience)
2. Review `ppt-styles.md`
3. Propose a style: "I recommend PPT Style: Modern because [reason]"
4. Explain why this style fits: "This style works well for [topic] because [reason]"

**User's task:**
- Review the proposed style
- Confirm or request a different style
- Once confirmed → **Design is LOCKED** ✅

**Outcome:** All design decisions are now fixed (colors, fonts, spacing, corner radius, shadows).

**Example:**
```
Agent: "For a technical comparison like MCP vs CLI, I recommend Modern style -
        it's clean and tech-forward."
User: "Yes, that works for me."
→ Design LOCKED. Modern colors, fonts, spacing now fixed.
```

---

### Gate 2: Content Development
**What happens:** Agent works WITH user to develop and validate content.

**Agent's task:**
1. Ask user: "What should each slide say?"
2. Help user think through the message:
   - "Does this cover what you want to communicate?"
   - "Should we add/remove/clarify anything?"
   - "Is this order logical?"
3. Work iteratively until user is satisfied

**User's task:**
- Provide content ideas/information
- Review proposed content
- Refine until ready
- Confirm: "Content is ready"
- Once confirmed → **Content is LOCKED** ✅

**Outcome:** All slide content is finalized. No more changes to what will be said.

**Example:**
```
Agent: "For your MCP vs CLI presentation, I suggest:
        - Slide 1: Title slide
        - Slide 2: Architecture comparison
        - Slide 3: Use cases
        - Slide 4: Adoption trends (with chart)
        - Slide 5: Key differences
        - Slide 6: Conclusion

        Does this cover what you want to say?"
User: "Yes, but can we swap slides 3 and 4?"
Agent: "Sure, updated. Anything else?"
User: "No, this is ready."
→ Content LOCKED. No more content changes.
```

---

### Gate 3: Structure Confirmation
**What happens:** Agent proposes slide structure. User confirms arrangement.

**Agent's task:**
1. Read `components-catalog.md` and `slide-structures.md`
2. For each locked content item, choose:
   - Which slide structure best fits (title, info, two-column, data, etc.)
   - Which components from catalog to use
3. Propose: "I'll arrange your content like this:
   - Slide 1: Title Slide (Title + Subtitle + Footer)
   - Slide 2: Two-Column Slide (Title + Left Column + Right Column)
   - etc."
4. Explain reasoning: "This structure works because [reason]"

**User's task:**
- Review the proposed slide structure
- Confirm or suggest changes:
  - "Should slide 2 come before slide 3?"
  - "Should I use a chart instead of a table here?"
- Agent adjusts and confirms again
- Once satisfied → **Structure is LOCKED** ✅

**Outcome:** Slide arrangement is finalized. Agent now knows exactly which structure each slide uses.

**Example:**
```
Agent: "Based on your locked content, here's my slide structure:
        - Slide 1: Title Slide
        - Slide 2: Two-Column Slide (CLI vs MCP)
        - Slide 3: Two-Column Slide (Use cases)
        - Slide 4: Data Slide (Chart showing adoption)
        - Slide 5: Information Slide (Key differences as list)
        - Slide 6: Title Slide (Conclusion)

        Does this arrangement work?"
User: "Looks good!"
→ Structure LOCKED. Agent now knows exact slide types and components.
```

---

### Execution: HTML Generation
**What happens:** Agent generates presentation HTML using all three locked things.

**Everything is now locked:**
- ✅ Design (from Gate 1: colors, fonts, spacing)
- ✅ Content (from Gate 2: what will be said)
- ✅ Structure (from Gate 3: how slides are arranged)

**Agent's task:**
1. For each slide with locked content and locked structure:
   - Apply locked style (colors, fonts, spacing from ppt-styles.md)
   - Insert locked content (what user approved)
   - Use locked structure (components from slide-structures.md)
   - Generate HTML
2. Add navigation, keyboard shortcuts
3. Add Chart.js for visualizations
4. Output: `presentation.html`

**Result:** High-quality, consistent, presentation-ready HTML file.

**User's task:**
- View the generated HTML
- Confirm: "Does this look good to present?"
- ✅ Done! Ready to use.

---

## 📋 Agent Workflow Summary

```
1. UNDERSTAND REQUEST
   ↓ User says: "Create a PPT about MCP vs CLI"

2. GATE 1: STYLE
   ├─ Agent: "I recommend Modern style"
   ├─ User: "Yes"
   └─ Design LOCKED ✅

3. GATE 2: CONTENT
   ├─ Agent: "For your topic, I suggest this content..."
   ├─ User: Refines/approves content
   └─ Content LOCKED ✅

4. GATE 3: STRUCTURE
   ├─ Agent: "I'll arrange it like this..."
   ├─ User: Confirms arrangement
   └─ Structure LOCKED ✅

5. EXECUTE: GENERATION
   ├─ Agent: Applies all three locked things
   ├─ Agent: Generates presentation.html
   └─ User: "Ready to present!"
```

---

## 🎯 Key Principles

### Design Decisions are Locked
Once a style is chosen:
- ❌ Cannot change colors
- ❌ Cannot change fonts
- ❌ Cannot change spacing
- ❌ Cannot change typography sizes
- ✅ Everything is consistent and professional

### Content is Locked
Once content is approved:
- ❌ Cannot change what will be said
- ✅ Only structure can change (slide arrangement)

### Structure is Locked
Once structure is confirmed:
- ❌ Cannot change slide types
- ❌ Cannot change component arrangements
- ✅ Generation is purely mechanical

### Generation is Deterministic
Once everything is locked:
- Input: Locked style + locked content + locked structure
- Process: Apply specifications to content
- Output: Always high-quality, consistent HTML

---

## 📚 How to Use the Three Catalogs

### `ppt-styles.md` - Use at Gate 1
```
Agent reads ppt-styles.md
    ↓
Agent selects one: Modern | Classic | Bold
    ↓
Agent proposes to user
    ↓
User confirms
    ↓
Style LOCKED
```

### `components-catalog.md` - Reference at Gate 3
```
Agent reads components-catalog.md
    ↓
Agent understands: "Which components are available?"
    ↓
Agent uses components when mapping content to structures
    ↓
Agent generates HTML that uses components correctly
```

### `slide-structures.md` - Use at Gate 3
```
Agent reads slide-structures.md
    ↓
Agent decides: "For this content, which structure fits best?"
    ↓
Agent proposes structure to user
    ↓
User confirms
    ↓
Structure LOCKED
    ↓
Agent generates HTML using locked structure
```

---

## ✨ Self-Contained HTML Requirements

**All generated HTML must be:**

1. **Self-contained** - NO external dependencies
   - ❌ No external fonts (no Google Fonts CDN)
   - ❌ No external stylesheets
   - ❌ All CSS inlined
   - ❌ All JavaScript inlined
   - ✅ Exception: Chart.js from CDN only (essential for charts)

2. **Offline-capable** - Works with `file://` protocol
   - ❌ No external resources
   - ✅ Can open directly in browser without web server
   - ✅ All fonts are system fonts (Arial, Helvetica, Georgia, Verdana, monospace)

3. **Proper initialization**
   - ✅ ONLY first slide has `class="slide active"`
   - ✅ All other slides have `class="slide"` only
   - ✅ JavaScript runs immediately and shows first slide
   - ✅ No timing issues, no disappearing text

4. **Text visibility**
   - ✅ All text is visible on page load
   - ✅ Proper color contrast (from locked style)
   - ✅ Readable font sizes (from locked style)
   - ✅ Appropriate line-height and spacing

5. **Responsive design**
   - ✅ Works on mobile (320px+)
   - ✅ Works on desktop (1920px+)
   - ✅ Touch-friendly button sizes (44px+)

---

## 🎨 Example Workflow

**User Request:** "Create a 5-slide PPT about MCP vs CLI"

### Gate 1: Style
```
Agent: "For a technical comparison, I recommend Modern style -
        it's clean, professional, and tech-forward."
User: "Sounds good!"
→ Design LOCKED: Blue primary, clean layout, 47px headings
```

### Gate 2: Content
```
Agent: "Let's outline your slides:
        1. Title slide - MCP vs CLI
        2. Architecture comparison - CLI vs MCP
        3. Use cases - when to use each
        4. Adoption trends - chart showing growth
        5. Key differences - as a list

        Does this cover what you want to say?"
User: "Yes, let's add more on security in slide 5"
Agent: "Updated. Anything else?"
User: "No, ready!"
→ Content LOCKED: All 5 slides have finalized content
```

### Gate 3: Structure
```
Agent: "I'll structure your slides like this:
        1. Title Slide (Title + Subtitle + Footer)
        2. Two-Column Slide (CLI vs MCP comparison)
        3. Two-Column Slide (CLI use cases vs MCP use cases)
        4. Data Slide (Bar chart of adoption 2023-2025)
        5. Information Slide (List of key differences)

        Does this arrangement work?"
User: "Perfect!"
→ Structure LOCKED: Agent knows exact structure for each slide
```

### Execution: Generation
```
Agent generates HTML:
├─ Applies Modern style (blue colors, 47px titles, etc.)
├─ Inserts locked content (what user approved)
├─ Uses locked structures (components from catalog)
├─ Adds navigation, keyboard shortcuts
├─ Includes Chart.js for slide 4's bar chart
└─ Output: presentation.html

User opens file in browser:
"This looks great! I can present this."
```

---

## ✅ QA Checklist - Before Delivering HTML

**Content & Structure**
- [ ] All slides follow their assigned structure
- [ ] Each component has required fields filled
- [ ] Content matches what user approved
- [ ] Data in charts/tables is accurate
- [ ] All slides are present and ordered correctly

**Style & Design**
- [ ] Colors match selected PPT style
- [ ] Font families are system fonts only (Arial, Helvetica, Georgia, Verdana)
- [ ] Font sizes match golden ratio from style
- [ ] Spacing follows 8px scale from style
- [ ] Corner radius matches style (6px, 4px, or 8px)
- [ ] Text alignment is center (locked default)

**HTML Structure**
- [ ] ONLY first slide has `class="slide active"`
- [ ] All other slides have `class="slide"` only
- [ ] All CSS is inlined (no external stylesheets)
- [ ] All JavaScript is inlined (no external scripts)
- [ ] Chart.js is only external resource (if used)

**Features & Functionality**
- [ ] Navigation buttons work (Previous/Next)
- [ ] Keyboard shortcuts work (arrow keys, space)
- [ ] Progress bar updates correctly
- [ ] Slide counter shows correct numbers
- [ ] Charts render correctly with locked style colors
- [ ] All text is visible on page load

**Offline & Compatibility**
- [ ] Works when opened with `file://` protocol (no web server needed)
- [ ] Works in modern browsers (Chrome, Firefox, Safari, Edge)
- [ ] No console errors
- [ ] Responsive on mobile (320px+) and desktop (1920px+)

---

## 🚀 When to Use This Skill

✅ **Use this skill when:**
- Creating presentations from scratch
- Need consistent, professional-looking slides
- Want design decisions locked in
- User wants to focus on content, not styling
- Need self-contained HTML (no external dependencies)

❌ **Don't use this skill when:**
- Editing existing presentations (use design tools instead)
- Need custom fonts or colors beyond the three styles
- Need complex animations or effects
- Generating documents (not presentations)

---

## 📞 How Users Experience This

**User perspective:**
1. "Create a PPT about [topic]"
2. Agent suggests a style → I confirm
3. Agent helps me write/refine content → I approve
4. Agent shows me how slides will be arranged → I confirm
5. Agent generates HTML → I open and present

**User doesn't need to know about:**
- ❌ Component catalog (agent handles it)
- ❌ Slide structures (agent handles it)
- ❌ Style specifications (locked once chosen)
- ❌ HTML generation details (agent does it)

**User only cares about:**
- ✅ Content (is this what I want to say?)
- ✅ Final look (does this look good to present?)

---

## 🎓 Key Takeaway

**This skill guides agents through a three-gate process:**

1. **Gate 1: Style** - Lock design (choose from 3 complete styles)
2. **Gate 2: Content** - Lock content (work with user to develop it)
3. **Gate 3: Structure** - Lock structure (map content to slide types)
4. **Execute** - Generate HTML using all three locked things

**Result:** High-quality, consistent, presentation-ready slides every time.

---

## 📂 Related Files

- `ppt-styles.md` - Complete design systems (colors, fonts, spacing)
- `components-catalog.md` - Reusable building blocks (15+ components)
- `slide-structures.md` - Slide templates (7 core structures)
- `assets/chart-patterns.md` - Chart.js code patterns
- `examples/mcp-vs-cli.html` - Working example presentation
