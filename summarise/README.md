# Summarise

End any AI agent session by running `/summarise` to generate a structured summary and save it to `docs/sessions/`.

## What It Does

Summarise creates a structured markdown summary of the current AI agent session: what was done, why decisions were made, what's unresolved, and what comes next. Each session gets its own file with a unique ID, making it searchable and linkable for future reference.

## Quick Start

```
/summarise
```

**Output:** `docs/sessions/session_summary_YYYY-MM-DD-[session-slug].md`

## How It Works

1. **Auto-creates** `docs/sessions/` directory if missing
2. **Infers a title** from your session content
3. **Generates** a structured markdown file with frontmatter
4. **Saves** it locally, ready for the future sift CLI to index and search

## File Format

```markdown
---
id: a3f9c2
date: 2024-06-07
title: JWT Authentication Refactor
files_touched: [src/auth.ts, src/middleware.ts]
short_summary: Refactored JWT auth to RS256 signing with 15-min expiry. Decided against refresh token rotation for now.
---

# Session Summary — 2024-06-07

## Detailed Summary
...

## Open Questions
...

## Decisions Made
...
```

## Invocation

### Explicit
Type `/summarise` at any point in a session.

### Hook / Auto-Trigger
Configure your agent to auto-trigger when it detects session-end signals:

- "done", "thats all", "wrap it up", "goodbye"
- "commit this", "lets stop here"
- "summarise" or "summarize"

See `hook-example.md` for setup instructions.

## Multiple Sessions Per Day

Each session gets its own file with a slug derived from the session title:

- `session_summary_2024-06-07-jwt-auth-refactor.md`
- `session_summary_2024-06-07-oauth-redirect-fix.md`

If you summarise the same session twice (same title, same day), it overwrites the previous file.

## File Location

All summaries live in `docs/sessions/` relative to your project root. This keeps session memory version-controlled alongside your code.
