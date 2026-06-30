# Slide Structures
**Purpose:** Define slide templates that combine components from components-catalog.md

Each slide structure specifies:
- Which components it uses (required and optional)
- How components are arranged
- When to use this structure
- Markdown syntax for agents

---

## 📐 Slide Structure Categories

1. **Opening/Closing Structures** - Title slides, section breaks
2. **Content Structures** - Information, lists, comparisons
3. **Data Structures** - Charts, tables, visualizations
4. **Technical Structures** - Code, workflows, processes

---

## 🎬 Opening/Closing Structures

### Structure 1: Title Slide
**Purpose:** Opening slide, major section breaks, conclusions

**Best For:** First slide of presentation, section dividers, end slides

**Components Used:**
- Title (required) - Main heading
- Subtitle (required) - Secondary heading
- Footer (optional) - Date, author, attribution

**Layout:**
```
┌─────────────────────────────────┐
│                                 │
│        [TITLE COMPONENT]        │
│                                 │
│     [SUBTITLE COMPONENT]        │
│                                 │
│      [FOOTER COMPONENT]         │
│                                 │
└─────────────────────────────────┘
```

**Spacing:**
- Vertical centering of all components
- 24px spacing between title and subtitle
- 48px spacing between subtitle and footer
- 80px slide padding (locked to style)

**Markdown Syntax:**
```markdown
## Slide 1: title-slide
- Title: "Main Title Here"
- Subtitle: "Subtitle or tagline"
- Footer: "2026"
```

**Example:**
```markdown
## Slide 1: title-slide
- Title: "MCP vs CLI"
- Subtitle: "Two approaches to AI tool integration"
- Footer: "June 2026"
```

**When to Use:**
- ✅ Opening slide of presentation
- ✅ Section breaks/dividers
- ✅ Closing/conclusion slide
- ✅ Title card for new topic
- ❌ Not for regular content slides

---

## 📄 Content Structures

### Structure 2: Information Slide (Basic)
**Purpose:** Present information, explanations, lists of points

**Best For:** Educational content, process explanations, key points, bullet lists

**Components Used:**
- Title (required) - Slide heading
- Body Text (optional) - Introductory text
- Bullet List (optional) - Main content points
- Numbered List (optional) - Ordered steps
- Footer (optional) - Credits or notes

**Layout:**
```
┌─────────────────────────────────┐
│      [TITLE COMPONENT]          │
│                                 │
│     [BODY TEXT COMPONENT]       │
│                                 │
│   [LIST COMPONENT - BULLETS     │
│    OR NUMBERED ITEMS]           │
│                                 │
│      [FOOTER COMPONENT]         │
└─────────────────────────────────┘
```

**Spacing:**
- Title: top padding
- Content area: centered, max-width 85%
- Between title and content: 32px (4 units)
- Between list items: 16px (2 units)
- Content to footer: 48px (6 units)

**Markdown Syntax:**
```markdown
## Slide N: information-slide
- Title: "Slide Title"
- Body: "Optional introductory text"
- List:
  - Point one
  - Point two
  - Point three
- Footer: "Optional footer"
```

**Example:**
```markdown
## Slide 2: information-slide
- Title: "Architecture Overview"
- List:
  - Direct command-line interface
  - User executes commands manually
  - Synchronous request-response
  - Direct system access
```

**When to Use:**
- ✅ Explaining concepts
- ✅ Listing features or points
- ✅ Process steps
- ✅ Key takeaways
- ✅ Most common slide type
- ❌ Not for data visualization
- ❌ Not for comparisons (use two-column instead)

---

### Structure 3: Two-Column Slide
**Purpose:** Compare two concepts, show alternatives, parallel information

**Best For:** Comparisons, pros/cons, before/after, left/right contrasts

**Components Used:**
- Title (required) - Slide heading (spans full width)
- Left Column Title (required) - Left section heading
- Left Column Content (required) - List, text, or other content
- Right Column Title (required) - Right section heading
- Right Column Content (required) - List, text, or other content
- Footer (optional) - Credits or notes

**Layout:**
```
┌─────────────────────────────────┐
│      [TITLE - FULL WIDTH]       │
├──────────────────┬──────────────┤
│ [LEFT TITLE]     │ [RIGHT TITLE]│
│                  │              │
│ [LEFT CONTENT]   │ [RIGHT       │
│ - Bullet one     │  CONTENT]    │
│ - Bullet two     │ - Bullet one │
│ - Bullet three   │ - Bullet two │
│                  │ - Bullet three
│                  │              │
└──────────────────┴──────────────┘
```

**Spacing:**
- Title: full width, centered
- Between title and columns: 32px (4 units)
- Between columns: 48px (6 units)
- Each column: 42.5% width
- Column content: centered within column
- Bottom padding: 48px (6 units)

**Markdown Syntax:**
```markdown
## Slide N: two-column-slide
- Title: "Comparison Title"
- Left:
  - Title: "Left Side Title"
  - Content:
    - Point one
    - Point two
    - Point three
- Right:
  - Title: "Right Side Title"
  - Content:
    - Point one
    - Point two
    - Point three
```

**Example:**
```markdown
## Slide 2: two-column-slide
- Title: "Architecture Overview"
- Left:
  - Title: "CLI"
  - Content:
    - Direct command-line interface
    - User executes commands manually
    - Synchronous request-response
- Right:
  - Title: "MCP"
  - Content:
    - Protocol-based integration
    - Automated tool invocation
    - Bidirectional communication
```

**When to Use:**
- ✅ Comparing two concepts
- ✅ Showing alternatives
- ✅ Before/after comparison
- ✅ Pros/cons lists
- ✅ Option A vs Option B
- ❌ Not for 3+ items (use separate slides)
- ❌ Not for data (use chart slide instead)

---

## 📊 Data Structures

### Structure 4: Data Slide (Chart)
**Purpose:** Visualize data using charts

**Best For:** Trends, comparisons, percentages, distributions

**Components Used:**
- Title (required) - Slide heading
- Chart (required) - Chart component (bar, line, doughnut, etc.)
- Body Text (optional) - Explanation or insights
- Footer (optional) - Data source

**Layout:**
```
┌─────────────────────────────────┐
│      [TITLE - FULL WIDTH]       │
│                                 │
│        [CHART COMPONENT]        │
│      (centered, max 600px)      │
│                                 │
│     [BODY TEXT - OPTIONAL]      │
│      (explanation/insights)     │
│                                 │
│      [FOOTER - OPTIONAL]        │
└─────────────────────────────────┘
```

**Spacing:**
- Title: top padding
- Chart: centered, max-width 600px
- Between title and chart: 32px (4 units)
- Between chart and text: 32px (4 units)
- Text to footer: 32px (4 units)

**Markdown Syntax:**
```markdown
## Slide N: data-slide
- Title: "Chart Title"
- Chart: [chart-type]
  - Chart data (labels, values)
- Body: "Optional explanation of the data"
- Footer: "Optional data source"
```

**Example:**
```markdown
## Slide 3: data-slide
- Title: "Adoption Growth"
- Chart: bar
  - Labels: [2023, 2024, 2025]
  - Datasets:
    - Label: "CLI"
      Data: [75, 60, 50]
    - Label: "MCP"
      Data: [25, 40, 50]
- Body: "CLI usage declining as MCP adoption grows"
```

**When to Use:**
- ✅ Showing trends over time
- ✅ Comparing values across categories
- ✅ Showing proportions/percentages
- ✅ Visualizing distributions
- ❌ Not for text-heavy content (use information slide)
- ❌ Not for simple comparisons (could use two-column instead)

---

### Structure 5: Table Slide
**Purpose:** Display structured data in rows and columns

**Best For:** Feature comparisons, specifications, detailed data

**Components Used:**
- Title (required) - Slide heading
- Table (required) - Table component
- Body Text (optional) - Explanation
- Footer (optional) - Data source

**Layout:**
```
┌─────────────────────────────────┐
│      [TITLE - FULL WIDTH]       │
│                                 │
│  [TABLE COMPONENT - centered]   │
│  ┌───────────────────────────┐  │
│  │ Header │ Header │ Header  │  │
│  ├───────────────────────────┤  │
│  │ Data   │ Data   │ Data    │  │
│  │ Data   │ Data   │ Data    │  │
│  └───────────────────────────┘  │
│                                 │
│     [BODY TEXT - OPTIONAL]      │
│      [FOOTER - OPTIONAL]        │
└─────────────────────────────────┘
```

**Spacing:**
- Title: top padding
- Table: centered, max-width 90%
- Between title and table: 32px (4 units)
- Between table and text: 32px (4 units)

**Markdown Syntax:**
```markdown
## Slide N: table-slide
- Title: "Table Title"
- Table:
  - Headers: [Column 1, Column 2, Column 3]
  - Rows:
    - [Data, Data, Data]
    - [Data, Data, Data]
- Body: "Optional explanation"
```

**Example:**
```markdown
## Slide 4: table-slide
- Title: "Feature Comparison"
- Table:
  - Headers: [Feature, CLI, MCP]
  - Rows:
    - [Interaction, Manual, Automated]
    - [Integration, Parsing, Structured Data]
    - [Security, Direct Access, Permission-controlled]
```

**When to Use:**
- ✅ Detailed comparisons
- ✅ Feature lists with attributes
- ✅ Structured data
- ✅ Side-by-side specifications
- ❌ Not for simple lists (use information slide)
- ❌ Not for visualizations (use chart)

---

## 🔄 Flow Structures

### Structure 6: Process Slide (Steps)
**Purpose:** Show sequential process or workflow

**Best For:** Procedures, workflows, step-by-step processes

**Components Used:**
- Title (required) - Slide heading
- Step-by-Step Flow (required) - Sequential steps
- Footer (optional) - Duration or notes

**Layout:**
```
┌─────────────────────────────────┐
│      [TITLE - FULL WIDTH]       │
│                                 │
│   [STEP 1] → [STEP 2]           │
│             ↓                   │
│         [STEP 3] → [STEP 4]     │
│                                 │
│      [FOOTER - OPTIONAL]        │
└─────────────────────────────────┘
```

**Spacing:**
- Title: top padding
- Steps: centered, max-width 90%
- Between title and steps: 32px (4 units)
- Between steps: 24px (3 units)

**Markdown Syntax:**
```markdown
## Slide N: process-slide
- Title: "Process Title"
- Steps:
  - Step 1: "Title"
    Description: "Description"
  - Step 2: "Title"
    Description: "Description"
```

**Example:**
```markdown
## Slide 5: process-slide
- Title: "PPT Generation Workflow"
- Steps:
  - Step 1: "Choose Style"
    Description: "Select Modern, Classic, or Bold design"
  - Step 2: "Write Content"
    Description: "Create content for each slide"
  - Step 3: "Structure Slides"
    Description: "Arrange content into slide layouts"
  - Step 4: "Generate HTML"
    Description: "Create presentation file"
```

**When to Use:**
- ✅ Step-by-step processes
- ✅ Workflows
- ✅ Sequential procedures
- ✅ Decision flows
- ❌ Not for static lists (use information slide)

---

### Structure 7: Timeline Slide
**Purpose:** Show progression or history over time

**Best For:** Company history, project milestones, evolution of ideas

**Components Used:**
- Title (required) - Slide heading
- Timeline (required) - Timeline events
- Footer (optional) - Notes

**Layout:**
```
┌─────────────────────────────────┐
│      [TITLE - FULL WIDTH]       │
│                                 │
│  2020  ●                        │
│        │  Event description     │
│        │                        │
│  2022  ●                        │
│        │  Event description     │
│        │                        │
│  2024  ●                        │
│           Event description     │
│                                 │
└─────────────────────────────────┘
```

**Spacing:**
- Title: top padding
- Timeline: centered, max-width 85%
- Between events: 32px (4 units)
- Between title and timeline: 32px (4 units)

**Markdown Syntax:**
```markdown
## Slide N: timeline-slide
- Title: "Timeline Title"
- Timeline:
  - Date: "2020"
    Title: "Event Title"
    Description: "Event description"
```

**Example:**
```markdown
## Slide 6: timeline-slide
- Title: "MCP Evolution"
- Timeline:
  - Date: "2023"
    Title: "Launch Phase"
    Description: "Initial protocol release"
  - Date: "2024"
    Title: "Growth Phase"
    Description: "Adoption increases"
  - Date: "2025"
    Title: "Enterprise Phase"
    Description: "Enterprise integrations"
```

**When to Use:**
- ✅ Company/product history
- ✅ Project milestones
- ✅ Evolution over time
- ✅ Historical progression
- ❌ Not for current state (use information slide)

---

## 💡 How Agents Use This Document

**During Gate 3 (Structure Planning):**

1. Agent reads this document
2. For each piece of LOCKED content, agent chooses which structure fits best
3. Agent maps content to components within that structure
4. Agent proposes: "Slide 1: title-slide, Slide 2: information-slide, Slide 3: data-slide"
5. User confirms the structure
6. Agent generates HTML using the locked structure + locked content + locked style

---

## 📋 Structure Selection Guide

| Content Type | Best Structure | Why |
|--------------|----------------|-----|
| Opening/Closing | Title Slide | Built for it |
| Key points/bullets | Information Slide | Natural list format |
| Comparing 2 things | Two-Column Slide | Side-by-side layout |
| Data visualization | Data Slide (Chart) | Built for charts |
| Detailed comparison | Table Slide | Structured grid |
| Sequential process | Process Slide | Flow layout |
| Historical progression | Timeline Slide | Time-based layout |

---

## 🎯 Key Principles

1. **Each structure has specific components** - Don't mix components across structures
2. **Structures are templates** - Follow the component combination for consistency
3. **One structure per slide** - A slide uses exactly one structure type
4. **Content determines structure** - Choose structure based on what you're saying
5. **Layout is locked** - Component arrangement can't be changed

---

## ✅ Structure Requirements

Every slide structure:
- ✅ Has clear required components
- ✅ Has clear optional components
- ✅ Specifies spacing and layout
- ✅ Provides markdown syntax
- ✅ Works with all PPT styles
- ✅ Is responsive and readable
- ❌ Cannot be customized (layout is locked)

---

## 📐 All Structures at a Glance

| # | Structure | Components | Best For |
|---|-----------|-----------|----------|
| 1 | Title Slide | Title, Subtitle, Footer | Opening, closings, breaks |
| 2 | Information Slide | Title, Text, List, Footer | Content, explanations, points |
| 3 | Two-Column Slide | Title, 2 × (Title, Content) | Comparisons, alternatives |
| 4 | Data Slide (Chart) | Title, Chart, Text, Footer | Trends, visualizations |
| 5 | Table Slide | Title, Table, Text, Footer | Detailed comparisons |
| 6 | Process Slide | Title, Steps, Footer | Workflows, procedures |
| 7 | Timeline Slide | Title, Timeline, Footer | History, milestones |

**Total available:** 7 core slide structures covering all common presentation needs
