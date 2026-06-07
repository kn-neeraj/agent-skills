---
name: summarise
description: End the current session by summarising it and saving a structured summary to docs/sessions/. Use when the user types /summarise or signals the end of a session with phrases like done, thats all, wrap it up, or goodbye.
---

# Summarise Skill

End any AI agent session by running `/summarise` to generate a structured summary and save it to `docs/sessions/`.

## Critical Requirements

These must be followed EXACTLY:

1. **Directory target**: Always write to `docs/sessions/` relative to current working directory
2. **Auto-create directory**: If it doesn't exist, create it automatically with no prompt
3. **File naming**: `session_summary_YYYY-MM-DD-[kebab-case-slug].md`
   - If a file for today with the same slug exists, overwrite it
   - If a file for today exists with a different slug, create a new one (different session)
4. **Short summary**: 3-5 lines max. Keyword-rich for search retrieval.

## Trigger Format

The skill is invoked via:

**Explicit:** User types `/summarise`

**Hook (auto-trigger):** Agent detects session-end signals such as:
- "done", "thats all", "wrap it up", "goodbye", "bye", "see you"
- "commit this", "lets stop here"
- "summarise", "summarize"

When in hook mode and the session appears to be ending, proactively run `/summarise`.

## Workflow

### Step 1 — Ensure `docs/sessions/` exists

Check if `./docs/sessions/` exists in the current working directory.

- If found → use it
- If NOT found → create it automatically with no user confirmation needed

### Step 2 — Determine filename

1. Infer a **title** from the session content (what was the main task? 3-8 words)
2. Convert title to **kebab-case slug**: lowercase, spaces/replaced with hyphens, remove special chars
3. Get today's date: `YYYY-MM-DD`
4. Construct filename: `session_summary_YYYY-MM-DD-[slug].md`

Example:
- Title: "JWT Authentication Refactor"
- Slug: `jwt-authentication-refactor`
- Filename: `session_summary_2024-06-07-jwt-authentication-refactor.md`

If a file with that exact name exists → overwrite it.
If a different file for today exists → create this new one (different session).

### Step 3 — Generate ID

Create a random 6-character alphanumeric ID (e.g., `a3f9c2`).
Use any standard random generation — the ID just needs to be unique enough for cross-referencing.

### Step 4 — Extract session metadata

Infer from the conversation and any files read during this session:

- **date**: YYYY-MM-DD
- **title**: Descriptive session name (3-8 words)
- **files_touched**: Comma-separated list of repos/files modified, or "none"
- **short_summary**: 3-5 lines capturing what was done and why. This is the primary search target — make it keyword-rich and specific (e.g., "Refactored JWT authentication to use RS256 signing with 15-minute expiry. Decided against refresh token rotation for now." instead of "Worked on authentication.").

### Step 5 — Write the summary

Use this exact format:

```markdown
---
date: YYYY-MM-DD
title: <descriptive session name>
files_touched: [<comma separated list of repos/files modified, or "none">]
short_summary: <3-5 lines — what was done, why, key outcomes. Primary search target.>
---

# Session Summary — <date>

## Detailed Summary
<Comprehensive session narrative. What was done, why, how.
Include the "why" behind decisions so future sessions understand context.
Be descriptive enough that a future agent can pick up with full context.
Cover the full arc of work — not just the final state.>

## Open Questions
- <unresolved items that future sessions need to address>
- <blockers, unknowns, todos that aren't actionable yet>
- <omitted if none — just leave the heading and write "None" if truly empty>

## Decisions Made
- <decision> — <reason/context>
- <what was chosen and why>
- <omitted if none — just leave the heading and write "None" if truly empty>
```

### Step 6 — Confirm

Tell the user exactly where the file was written (full path).
Example: "Session summary written to `./docs/sessions/session_summary_2024-06-07-jwt-auth-refactor.md`"

## Architecture Rules

- One summary per invocation — no appending to existing files
- Files are source of truth — no separate database or index
- Markdown is the only format — plain text, human-readable, future-proof
- Never prompt for directory creation — always auto-create `docs/sessions/`
- Never ask whether to overwrite — if same filename exists, overwrite
- Slug in filename is the identifier — no separate ID needed

## Search-Friendly Design

- `short_summary` is the primary search target — that's what agents and sift will surface first
- `title` + `files_touched` enable topic and file-based filtering
- `## Decisions Made` is retrievable for "what did we decide about X"
- `## Open Questions` is retrievable for "what's still unresolved"
- Slug in filename makes it human-browsable without opening files
- Frontmatter is parseable (YAML) for structured queries

## QA Checklist

Before confirming the write, verify:

- [ ] Directory `docs/sessions/` exists or was created
- [ ] Filename follows `session_summary_YYYY-MM-DD-[slug].md` format
- [ ] `date` is YYYY-MM-DD
- [ ] `title` is descriptive (3-8 words)
- [ ] `short_summary` is 3-5 lines and keyword-rich
- [ ] `## Detailed Summary` covers the full session arc
- [ ] `## Open Questions` exists (use "None" if empty)
- [ ] `## Decisions Made` exists (use "None" if empty)
- [ ] File was written successfully
- [ ] User is told the full file path
