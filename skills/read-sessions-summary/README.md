# Read Sessions Summary

Read and browse session summaries from `docs/sessions/` to restore context from previous sessions.

## What It Does

Scans `docs/sessions/` for structured session summaries, presents a browsable index, and lets you pick which sessions to load in full. Perfect for picking up multi-session projects without re-explaining context.

## Quick Start

```
/read-sessions-summary
```

**Output:** Browsable index of all session summaries → user selects → full context restored

## How It Works

1. **Scans** `docs/sessions/` recursively (supports multiple directories)
2. **Reads** frontmatter from each file (date, title, files_touched, short_summary)
3. **Presents** a sorted index table:

   | Date | Title | Files Touched | Short Summary |
   |------|-------|---------------|---------------|
   | 2024-06-07 | JWT Auth Refactor | src/auth.ts | Refactored JWT auth to RS256 |

4. **Lets you pick** which sessions to load (all, latest, specific dates, or by title)
5. **Synthesizes** a consolidated briefing with project overview, decisions, current status, and next steps

## File Format Expected

Uses the same format as the `/summarise` skill:

```markdown
---
date: YYYY-MM-DD
title: Descriptive Session Name
files_touched: [src/auth.ts, src/middleware.ts]
short_summary: 3-5 lines of what was done and why
---

# Session Summary — YYYY-MM-DD

## Detailed Summary
...

## Open Questions
...

## Decisions Made
...
```

## Invocation

### Explicit
Type `/read-sessions-summary` at any point.

### Auto-trigger
If the user says:
- "where were we?", "catch me up", "what did we do last time?"
- "what did we decide about X?", "remind me where we left off"
- "summarise our past work", "show me previous sessions"

...then proactively run this skill before continuing.

## Workflow

1. Find `docs/sessions/` directories
2. List all `.md` files sorted by date
3. Parse frontmatter for quick index
4. Present index → user selects
5. Read selected files in full
6. Synthesize consolidated briefing

## Multiple Directories

If multiple `docs/sessions/` folders are found (e.g., in monorepos), sessions from all directories are combined in the index.

## Empty Directory

If `docs/sessions/` is empty, the skill will suggest running `/summarise` to create the first session summary.
