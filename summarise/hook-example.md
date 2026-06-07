# Hook / Auto-Trigger Setup

This skill can be configured to auto-trigger when a session appears to be ending. Here are examples for popular agent environments.

## Claude Code

Add this to your `CLAUDE.md` or system prompt:

```markdown
## Session End Detection

If the user signals they are ending the session with phrases like "done", "thats all", "wrap it up", "goodbye", "bye", "commit this", or "lets stop here" — run `/summarise` to generate a session summary before ending.
```

## Claude.ai (Web)

Upload the `summarise.skill` file to Claude.ai. Add this to the skill instructions or project instructions:

```markdown
When the user signals the end of a session (e.g., "done", "thats all", "wrap it up", "goodbye", "bye", "commit this", "lets stop here", "summarise", "summarize"), invoke the summarise skill automatically.
```

## Cursor

Add to your `.cursorrules` or AI rules:

```markdown
Session End Rule: If the user says "done", "thats all", "wrap it up", "goodbye", "bye", "commit this", "lets stop here", "summarise", or "summarize", generate a session summary before ending the session. Save it to `docs/sessions/session_summary_YYYY-MM-DD-[slug].md` following the summarise skill format.
```

## Generic Agent (Any Environment)

Add to your system prompt or instructions:

```markdown
## Auto-Summarise on Session End

Detect session-end signals from the user. When detected, automatically invoke the summarise functionality:

**Signals:** "done", "thats all", "wrap it up", "goodbye", "bye", "commit this", "lets stop here", "summarise", "summarize"

**Action:** Generate a structured session summary following this format:
- Directory: `docs/sessions/`
- Filename: `session_summary_YYYY-MM-DD-[kebab-case-title].md`
- Format: YAML frontmatter (id, date, title, files_touched, short_summary) + body (Detailed Summary, Open Questions, Decisions Made)

Do not ask for confirmation. Just create the summary and tell the user where it was saved.
```

## Why Hooks Matter

Without a hook, you have to remember to type `/summarise`. With a hook, the summary is generated automatically — giving you persistent session memory with zero friction.
