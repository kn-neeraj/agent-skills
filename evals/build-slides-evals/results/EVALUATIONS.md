# Build Slides Skill - Consolidated Evaluation Report

Master log of all slide evaluations. Each row represents one evaluation run.

**Columns:**
- **#** - Sequential evaluation number
- **Prompt Name** - ID of the prompt evaluated
- **Prompt Text** - Full prompt description
- **Generated Slides** - Link to view the generated HTML presentation
- **Readability** - Text clarity and hierarchy (1-5)
- **Composition** - Layout balance and spacing (1-5)
- **Consistency** - Visual uniformity across slides (1-5)
- **Functionality** - Navigation and features working (Works/Broken)
- **Visual Quality Avg** - Average of Readability, Composition, Consistency
- **Timestamp** - When this evaluation was performed
- **Notes** - Key observations and findings

---

| # | Prompt Name | Prompt Text | Generated Slides | Readability | Composition | Consistency | Functionality | Visual Quality Avg | Timestamp | Notes |
|---|-------------|-------------|------------------|:-:|:-:|:-:|:-:|:-:|-------------|-------|
| 1 | `mcp-connector-ecosystem` | Create a 6-slide presentation about the MCP (Model Context... | [View →](./mcp-connector-ecosystem-2026-06-06-143022.html) | 4 | 4 | 4 | Works | 4.0 | 2026-06-06 14:30:22 | Clear technical structure, good hierarchy. MCP concepts well-explained. |
| 2 | `pitch-tech-startup` | Create a 5-slide pitch deck for an AI-powered customer supp... | [View →](./pitch-tech-startup-2026-06-06-145500.html) | 5 | 5 | 5 | Works | 5.0 | 2026-06-06 14:55:00 | Excellent presentation. Professional, consistent, great spacing. |

## Summary Statistics

| Metric | Value |
|--------|-------|
| **Total Evaluations** | 2 |
| **Average Visual Quality** | 4.5/5.0 |
| **Average Readability** | 4.5/5.0 |
| **Average Composition** | 4.5/5.0 |
| **Average Consistency** | 4.5/5.0 |
| **Functionality Pass Rate** | 100% (2/2) |

## How to Use This Report

### View Generated Slides
Click any "[View →]" link to open the generated HTML presentation in your browser.

### Add New Evaluations
```bash
npm run eval:auto -- --prompt "Your prompt text"
npm run eval:auto -- --prompts custom-evals mcp-connector-ecosystem
```

New evaluations automatically append to this report.

### Analyze Trends
- Compare same prompt across dates
- Track quality improvements after skill changes
- Look for patterns in scores

**Visual Quality Avg** = (Readability + Composition + Consistency) / 3
