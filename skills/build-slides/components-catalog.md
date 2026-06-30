# Components Catalog
**Purpose:** Define all reusable content components agents can combine to build slides

Each component has a **clear contract**: required fields, optional fields, rendering rules, and constraints.

---

## 📋 Component Categories

1. **Text Components** - Headings, body text, descriptions
2. **List Components** - Bullet points, numbered lists, nested lists
3. **Data Components** - Charts, tables, card collections
4. **Code Components** - Code snippets with syntax highlighting
5. **Flow Components** - Step-by-step flows, timelines, decision trees

---

## 🔤 Text Components

### Component: Slide Title
**When to use:** Main heading on a slide (appears once per slide)

**HTML:** `<h1>` or `<h2>` depending on slide type

**Required Fields:**
- `title` (string) - Main heading text

**Optional Fields:**
- `subtitle` (string) - Secondary heading (usually only for title slides)
- `accent` (boolean) - Emphasize this title (default: false)

**Markdown Syntax:**
```markdown
- Title: "Main heading here"
```

**Rendering Rules:**
- Uses primary color from selected PPT style
- Uses golden ratio font size (H1 or H2) from style
- Always center-aligned
- Apply font-weight from style (700 or 600)
- Add proper line-height for readability

**Example Output:**
```html
<h1 style="color: #2563eb; font-size: 47px; font-weight: 700;">
  Main heading here
</h1>
```

**Constraints:**
- ❌ Cannot change color (locked to style)
- ❌ Cannot change alignment (always centered)
- ❌ Cannot change font size (locked to style)
- ✅ Can use bold/italic in text: "**Important** word"

---

### Component: Subtitle
**When to use:** Secondary heading below title (usually title slides only)

**HTML:** `<h2>`

**Required Fields:**
- `subtitle` (string) - Subtitle text

**Optional Fields:**
- None

**Markdown Syntax:**
```markdown
- Subtitle: "Secondary heading here"
```

**Rendering Rules:**
- Uses secondary color from selected PPT style
- Uses smaller golden ratio font size than H1
- Center-aligned
- Lighter font-weight than title (600)

**Example Output:**
```html
<h2 style="color: #64748b; font-size: 29px; font-weight: 600;">
  Secondary heading here
</h2>
```

**Constraints:**
- ❌ Cannot change color
- ❌ Cannot change alignment
- ❌ Cannot change font size
- ✅ Can use formatting: "Two **approaches** to integration"

---

### Component: Body Text
**When to use:** Main content text, descriptions, explanations

**HTML:** `<p>`

**Required Fields:**
- `text` (string) - Content text

**Optional Fields:**
- `emphasis` (boolean) - Make text slightly larger/bolder (default: false)
- `light` (boolean) - Use lighter text color for secondary information (default: false)

**Markdown Syntax:**
```markdown
- Text: "This is body text describing the concept."
```

**Rendering Rules:**
- Uses text color from selected PPT style
- Uses base font size from style (18px or 20px depending on style)
- Center-aligned
- Line-height: 1.6 for readability
- Max-width: 85% of slide

**Example Output:**
```html
<p style="color: #1e293b; font-size: 18px; line-height: 1.6; max-width: 85%;">
  This is body text describing the concept.
</p>
```

**Constraints:**
- ❌ Cannot change color (use `light: true` for secondary text)
- ❌ Cannot change alignment
- ❌ Cannot change line-height
- ✅ Can use formatting: "This is **important** text"

---

### Component: Footer Text
**When to use:** Credits, dates, small disclaimers at bottom of slide

**HTML:** `<p class="footer">`

**Required Fields:**
- `text` (string) - Footer text

**Optional Fields:**
- None

**Markdown Syntax:**
```markdown
- Footer: "2026 | Confidential"
```

**Rendering Rules:**
- Uses text-light color from selected PPT style
- Smaller font size (14px or 16px depending on style)
- Center-aligned
- Reduced opacity or lighter color for subtlety

**Example Output:**
```html
<p class="footer" style="color: #64748b; font-size: 14px;">
  2026 | Confidential
</p>
```

**Constraints:**
- ❌ Cannot change color
- ❌ Cannot change alignment
- ❌ Cannot change font size
- ✅ Keep brief (one line recommended)

---

## 📝 List Components

### Component: Bullet List
**When to use:** Unordered list of points, features, benefits

**HTML:** `<ul><li>`

**Required Fields:**
- `items` (array of strings) - List items
  - Minimum: 1 item
  - Maximum: 5 items (recommended)

**Optional Fields:**
- `nested` (boolean) - Allow nested lists (default: false)

**Markdown Syntax:**
```markdown
- List:
  - Point one
  - Point two
  - Point three
```

**Rendering Rules:**
- Each item on its own line with bullet point
- Uses text color from style
- Uses base font size from style
- Center-aligned
- Spacing between items: 16px (2 base units)
- Margins: 24px (3 base units) above/below list

**Example Output:**
```html
<ul style="max-width: 85%; margin: 24px auto; text-align: center;">
  <li style="color: #1e293b; font-size: 18px; margin: 16px 0;">
    Point one
  </li>
  <li style="color: #1e293b; font-size: 18px; margin: 16px 0;">
    Point two
  </li>
</ul>
```

**Constraints:**
- ❌ Cannot change bullet style
- ❌ Cannot exceed 5 items (suggests using multiple lists or a table instead)
- ✅ Can use formatting in items: "**Bold** point"
- ✅ Can use numbered variant (see below)

---

### Component: Numbered List
**When to use:** Ordered steps, sequence, priority order

**HTML:** `<ol><li>`

**Required Fields:**
- `items` (array of strings) - List items in order
  - Minimum: 1 item
  - Maximum: 5 items (recommended)

**Optional Fields:**
- `nested` (boolean) - Allow nested lists (default: false)

**Markdown Syntax:**
```markdown
- List: (numbered)
  - Step one
  - Step two
  - Step three
```

**Rendering Rules:**
- Each item numbered sequentially (1, 2, 3, etc.)
- Uses text color from style
- Uses base font size from style
- Center-aligned
- Spacing between items: 16px (2 base units)
- Margins: 24px (3 base units) above/below list

**Constraints:**
- ❌ Cannot exceed 5 items
- ❌ Cannot reorder items (order is meaningful)
- ✅ Can use formatting in items

---

### Component: Nested List
**When to use:** Hierarchical information, subcategories, detailed breakdowns

**HTML:** `<ul><li><ul><li>`

**Required Fields:**
- `items` (array of objects) - Parent items with children
  - Each parent can have 2-3 child items
  - Maximum 3 parent items

**Optional Fields:**
- None

**Markdown Syntax:**
```markdown
- List: (nested)
  - Parent item one
    - Child one
    - Child two
  - Parent item two
    - Child one
```

**Rendering Rules:**
- Parent items bold/emphasized
- Child items indented and in lighter color
- Center-aligned structure (unusual but follows style)
- Parent spacing: 16px
- Child spacing: 8px

**Constraints:**
- ❌ Cannot exceed 3 levels of nesting
- ❌ Cannot exceed 3 parent items
- ❌ Cannot exceed 3 children per parent
- ✅ Use for clear hierarchies only

---

## 📊 Data Components

### Component: Chart
**When to use:** Visualize data, compare values, show trends, display relationships

**HTML:** `<canvas>` with Chart.js

**Required Fields:**
- `type` (enum) - Chart type: "bar" | "line" | "doughnut" | "pie" | "area"
- `title` (string) - Chart title
- `labels` (array of strings) - Category labels
- `datasets` (array of objects) - Data series
  - Each dataset has: `label`, `data` (array of numbers)

**Optional Fields:**
- `showLegend` (boolean) - Display legend (default: true)
- `height` (string) - Chart height (default: "350px")

**Markdown Syntax:**
```markdown
- Chart: bar
  - Title: "Quarterly Revenue"
  - Labels: [Q1, Q2, Q3, Q4]
  - Datasets:
    - Label: "2025"
      Data: [12, 19, 15, 22]
    - Label: "2024"
      Data: [10, 15, 14, 18]
```

**Rendering Rules:**
- Uses primary and accent colors from selected PPT style
- Auto-colors multiple datasets with style palette
- Responsive sizing (fits within slide)
- Maximum width: 600px
- Center-aligned
- Uses Chart.js from CDN
- Font sizes match style (axes, legend, title)

**Supported Chart Types:**
- **Bar:** Comparison across categories
- **Line:** Trends over time
- **Doughnut:** Proportions/percentages
- **Pie:** Percentages of whole
- **Area:** Stacked values over time

**Constraints:**
- ❌ Cannot customize colors (use style palette)
- ❌ Cannot exceed 4 datasets (too crowded)
- ❌ Cannot use more than 12 data points per dataset
- ✅ Can use multiple data series
- ✅ Can show/hide legend

---

### Component: Table
**When to use:** Structured data, comparisons, detailed information in rows/columns

**HTML:** `<table>`

**Required Fields:**
- `headers` (array of strings) - Column headers
  - Minimum: 2 columns
  - Maximum: 5 columns
- `rows` (array of arrays) - Table data
  - Minimum: 1 row
  - Maximum: 8 rows

**Optional Fields:**
- `highlight` (array of numbers) - Highlight specific rows (default: none)

**Markdown Syntax:**
```markdown
- Table:
  - Headers: [Feature, CLI, MCP]
  - Rows:
    - [Automation, Manual, Automatic]
    - [Integration, Parsing, Structured]
    - [Security, Direct, Permission-controlled]
```

**Rendering Rules:**
- Headers: Bold, primary color, background color from style
- Data cells: Text color from style
- Border: Subtle borders using style border color
- Padding: 12px per cell (1.5 base units)
- Center-aligned cells
- Striped rows (alternating background) for readability
- Max-width: 90% of slide

**Constraints:**
- ❌ Cannot exceed 5 columns
- ❌ Cannot exceed 8 rows
- ❌ Cannot merge cells
- ✅ Can highlight rows for emphasis
- ✅ Can use formatting in cells: "**Bold** text"

---

### Component: Cards List
**When to use:** Feature showcases, team members, product highlights, distinct items

**HTML:** `<div class="card">` collection

**Required Fields:**
- `cards` (array of objects) - Card data
  - Each card has: `title`, `description`
  - Minimum: 2 cards
  - Maximum: 4 cards

**Optional Fields:**
- `icon` (string) - Icon name (optional, text fallback)

**Markdown Syntax:**
```markdown
- Cards:
  - Title: "Feature One"
    Description: "Description of the feature"
  - Title: "Feature Two"
    Description: "Description of the feature"
```

**Rendering Rules:**
- Card layout: Grid (2-4 cards per row depending on count)
- Card styling: Background from `surface` color, border with shadow
- Card padding: 24px (3 base units)
- Card gap: 24px between cards
- Title in card: Secondary color, larger font
- Description: Text color, body font size
- Cards responsive (stack on small screens)

**Constraints:**
- ❌ Cannot exceed 4 cards (layout breaks)
- ❌ Cannot have blank title or description
- ❌ Cannot use custom styling on cards
- ✅ Can use formatting in descriptions
- ✅ Can use icons (if supported)

---

## 💻 Code Components

### Component: Code Snippet
**When to use:** Display source code, configuration, technical examples

**HTML:** `<pre><code>`

**Required Fields:**
- `code` (string) - Source code text
- `language` (enum) - Programming language for syntax highlighting
  - Supported: javascript, python, html, css, json, yaml, sql, bash, ruby, go, rust, typescript

**Optional Fields:**
- `showLineNumbers` (boolean) - Display line numbers (default: false)
- `highlightLines` (array of numbers) - Highlight specific lines

**Markdown Syntax:**
```markdown
- CodeSnippet: javascript
  - Code: |
      function greet(name) {
        console.log(`Hello, ${name}!`);
      }
```

**Rendering Rules:**
- Uses monospace font (system: monospace)
- Background: Slightly darker than surface color
- Text: High contrast with background
- Padding: 16px (2 base units)
- Border-radius: From style (6px, 4px, or 8px)
- Max-width: 85% of slide
- Font size: Smaller (14px) to fit more code
- Syntax highlighting: Uses language-specific colors

**Constraints:**
- ❌ Cannot exceed 20 lines (suggest reducing)
- ❌ Cannot use custom theme colors
- ❌ Cannot add extra styling
- ✅ Can highlight specific lines
- ✅ Can show/hide line numbers
- ✅ Can use multiple code snippets on one slide

---

## 🔄 Flow Components

### Component: Step-by-Step Flow
**When to use:** Process steps, workflows, sequences, instructions

**HTML:** `<div class="steps">` with numbered items

**Required Fields:**
- `steps` (array of objects) - Flow steps
  - Each step has: `number`, `title`, `description`
  - Minimum: 2 steps
  - Maximum: 5 steps

**Optional Fields:**
- `orientation` (enum) - "vertical" or "horizontal" (default: "vertical")

**Markdown Syntax:**
```markdown
- Steps:
  - Step 1: "Planning"
    Description: "Define requirements and goals"
  - Step 2: "Design"
    Description: "Create structure and layouts"
  - Step 3: "Implementation"
    Description: "Build the actual slides"
  - Step 4: "Review"
    Description: "Quality check and refinement"
```

**Rendering Rules:**
- Step number: Large, primary color, in circle
- Step title: Bold, text color
- Step description: Text-light color, smaller font
- Vertical: Numbered list format with connecting lines
- Horizontal: Left-to-right with arrows
- Spacing: 24px (3 base units) between steps
- Max-width: 90% of slide

**Constraints:**
- ❌ Cannot exceed 5 steps
- ❌ Cannot skip step numbers
- ❌ Cannot use custom colors
- ✅ Can choose vertical or horizontal layout
- ✅ Can use formatting in descriptions

---

### Component: Timeline
**When to use:** Historical progression, milestones, project timeline

**HTML:** `<div class="timeline">`

**Required Fields:**
- `events` (array of objects) - Timeline events
  - Each event has: `date`, `title`, `description`
  - Minimum: 2 events
  - Maximum: 6 events

**Optional Fields:**
- `format` (enum) - "year-only" or "full-date" (default: "year-only")

**Markdown Syntax:**
```markdown
- Timeline:
  - Date: "2023"
    Title: "Launch Phase"
    Description: "Initial product release"
  - Date: "2024"
    Title: "Growth Phase"
    Description: "Customer expansion and scaling"
  - Date: "2025"
    Title: "Enterprise Phase"
    Description: "Enterprise features and integrations"
```

**Rendering Rules:**
- Vertical line down the middle
- Events alternate left/right of timeline
- Date: Bold, primary color
- Title: Secondary color, emphasis
- Description: Text color, body font
- Vertical layout (top to bottom)
- Spacing: 32px (4 base units) between events
- Max-width: 85% of slide

**Constraints:**
- ❌ Cannot exceed 6 events
- ❌ Cannot use custom styling
- ✅ Can use year or full date format
- ✅ Can use formatting in descriptions

---

## ✅ Component Requirements Summary

**All components must have:**
- ✅ Clear, descriptive required fields
- ✅ Optional fields documented
- ✅ Rendering rules from selected PPT style
- ✅ Markdown syntax examples
- ✅ Clear constraints about what can't be changed

**All components inherit from PPT style:**
- ✅ Colors (cannot override)
- ✅ Font families (cannot override)
- ✅ Font sizes (locked to golden ratio)
- ✅ Spacing scale (locked to 8px base)
- ✅ Corner radius (locked per style)
- ✅ Text alignment (default: center)

**No component can:**
- ❌ Change colors from selected style
- ❌ Use external fonts or CDN
- ❌ Override alignment (always center unless specified)
- ❌ Use custom CSS or styling
- ❌ Break the responsive design

---

## 🎯 How Agents Use This Catalog

**During Gate 2 (Structure Planning):**
- Agent reads this catalog
- Agent decides which components to use on each slide
- Agent checks requirements for each component
- Agent documents in markdown

**During Gate 3 (Content Validation):**
- Agent ensures each component has all required fields filled
- Agent validates data format (arrays for lists, objects for cards, etc.)
- Agent checks constraints (no exceeding max items, proper data types)

**During Execution (Generation):**
- Agent maps each markdown component to HTML
- Agent applies locked style values
- Agent validates output matches component specification

---

## 📎 Component Organization

| Category | Components | When to Use |
|----------|-----------|------------|
| **Text** | Title, Subtitle, Body, Footer | Essential for all slides |
| **Lists** | Bullet, Numbered, Nested | Information and comparisons |
| **Data** | Chart, Table, Cards | Data visualization and structure |
| **Code** | Code Snippet | Technical/developer content |
| **Flow** | Steps, Timeline | Processes and progression |

**Note:** Most slides use 2-3 text components + 1 list or data component.
