---
name: read-sessions-summary
description: Read and search session summaries from docs/sessions/ to restore context from previous sessions. Scan all summaries, show a browsable index with titles and short summaries, and let the user select which sessions to load in full.
---

# Read Sessions Summary

Restore context from previous sessions by reading structured summaries stored in `docs/sessions/`.

## When to Use

Use this skill when:
- Starting a new session on an existing project
- The user refers to past work, previous decisions, or prior discussions
- The user asks "where were we?", "what did we do last time?", or "what did we decide about X?"
- You need to catch up on multi-session project history

## Workflow

### Step 1 — Find docs/sessions

Search for a folder named `docs/sessions` in:
1. The current working directory (`./docs/sessions/`)
2. All sub-directories of the current working directory (recursively)

Use the Glob tool with pattern `**/docs/sessions/` to discover all matches.

- If one is found → use it
- If multiple are found → use all of them; read each at a high level and combine the context
- If none are found → ask: "No docs/sessions/ folder found here or in any sub-directory. Would you like me to initialise it for /summarise?" and wait for their answer

### Step 2 — Discover all summary files

Use the Glob tool to find all `.md` files recursively inside `docs/sessions/` (including any subfolders).

Sort them by filename (chronological order, since filenames contain dates in `session_summary_YYYY-MM-DD-[slug].md` format).

If no files are found → tell the user "docs/sessions/ is empty — no previous session summaries found. Run /summarise to create one."

### Step 3 — Read frontmatter (quick scan)

For each file found, read only the first 15 lines to extract frontmatter.

If the file starts with `---`, parse:
- `date`: session date
- `title`: descriptive session name
- `files_touched`: repos/files modified
- `short_summary`: 3-5 line summary

If no frontmatter found → read the first 20 lines and extract a short snippet (1-2 sentences) to use as the summary.

Build a browsable index and present it to the user:

```
## Session Index — docs/sessions/

| Date | Title | Files Touched | Short Summary |
|------|-------|---------------|---------------|
| 2024-06-07 | JWT Authentication Refactor | src/auth.ts | Refactored JWT auth to RS256 with 15-min expiry |
| 2024-06-05 | OAuth Redirect Fix | src/oauth.ts | Fixed broken redirect after Google login |
```

Then ask: "Which sessions should I load in full? Say 'all', 'latest', a date range, or pick specific ones."

Wait for the user's response before continuing.

### Step 4 — Read selected files in full

Read only the files the user selected (or the most recent one if they say "just the latest").

### Step 5 — Synthesize and present context

Produce a consolidated briefing:

```
# Context Restored from docs/sessions/

## Sessions Loaded
- <list each file read, with its date and title>

## Project Overview
<Synthesized from selected summaries: what the project is, key concepts>

## Cumulative Work Done
<Merged list of all significant tasks/features completed across selected sessions>

## Key Decisions
- <decision> — <reason>

## Current Status (most recent loaded session)
<What was done, what's in progress, what's blocked>

## Next Steps
<Ordered list of concrete next actions from the most recent loaded session>

## Important Values / Constraints
<All critical numbers, thresholds, role names, file paths, or rules>
```

### Step 6 — Confirm and continue

Tell the user:
- How many files were loaded and the date range covered
- "I'm up to speed. What would you like to work on?"

## Architecture Rules

- Read only what the user asks for — never load all sessions by default
- Frontmatter parsing is best-effort; gracefully handle missing or malformed YAML
- Sorting is always by filename (chronological) — latest sessions last
- Combine across multiple docs/sessions/ directories if found
- Respect the user's selection — don't read files they didn't ask for

## QA Checklist

- [ ] `docs/sessions/` directory was found
- [ ] Session files were sorted chronologically
- [ ] Frontmatter was parsed correctly (date, title, files_touched, short_summary)
- [ ] Index table was presented to the user before reading anything in full
- [ ] User selected which sessions to load
- [ ] Only selected files were read in full
- [ ] Synthesized briefing covers all loaded sessions
- [ ] Most recent session drives Current Status and Next Steps
