---
id: 648kpi
date: 2026-06-07
title: Summarise skill creation and opencode installation
files_touched: [summarise/SKILL.md, summarise/README.md, summarise/hook-example.md, skills.json, CLAUDE.md, README.md, ~/.config/opencode/skills/summarise/SKILL.md, ~/.config/opencode/commands/summarise.md]
short_summary: Created the /summarise skill with YAML frontmatter, structured body, and search-friendly design. Installed it in opencode globally as a proper slash command (not a skill). Learend opencode distinguishes between skills (model context) and commands (slash commands). Updated repo structure and docs. Tested /summarise command by generating this summary.
---

# Session Summary — 2026-06-07

## Detailed Summary
Today we built and installed the `/summarise` agent skill, which generates structured session summaries and saves them to `docs/sessions/`. The session started with exploring the Notion project brief which contained detailed requirements for the sift tool, but the user pivoted to start with the `/summarise` skill component.

We refined the summary format through iteration: moving from an ontology-heavy frontmatter (with fields like outcome, status, one_liner) to a leaner format with just `id`, `date`, `title`, `files_touched`, and `short_summary` (3-5 lines). The body was streamlined to three sections: `## Detailed Summary`, `## Open Questions`, and `## Decisions Made`.

A key discovery was that opencode differentiates between "skills" (extra model instructions, loaded into context) and "commands" (actual slash commands like `/init`, `/undo`). Our initial attempt placed `/summarise` in `~/.config/opencode/skills/`, which failed because it wasn't accessible as a slash command. After investigation, we moved it to `~/.config/opencode/commands/summarise.md` where opencode discovers slash commands.

We also clarified that multiple sessions per day should get separate files with kebab-case slugs (e.g., `session_summary_2026-06-07-jwt-auth-refactor.md`) rather than overwriting a single daily file. This enables better searchability and avoids conflating unrelated sessions.

The session concluded with a live test of the `/summarise` command — verifying the skill could write to `docs/sessions/` and present the output correctly.

## Open Questions
- Whether to additionally ship a `.skill` file (Claude.ai package) for broader compatibility beyond opencode
- Whether to add `/summarise` as a project-level command (`.opencode/commands/summarise.md`) in the repo for portability
- How the sift CLI will auto-ingest these summaries — will it watch docs/sessions/ or require manual `sift save`?
- Whether the agent-generated short_summary is truly useful for retrieval, or if it needs a reranker

## Decisions Made
- Keep frontmatter minimal (id, date, title, files_touched, short_summary) — the user rejected more fields like outcome, status, one_liner as too rigid
- Use kebab-case slugs in filenames for multiple sessions per day — better searchability than single daily file
- Install in opencode as a command (`commands/`), not a skill — skills provide context, not slash command triggers
- Auto-create `docs/sessions/` without prompting — frictionless user experience
- Use 3-5 line short_summary as primary search target — specific, concrete, keyword-rich summaries for sift indexing
