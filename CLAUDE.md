# Claude Code Configuration

This repository contains reusable agent skills. Claude Code should automatically load skills from subdirectories when this file is present.

## Auto-loading Skills

When Claude Code detects this `CLAUDE.md` file, it should:

1. Scan all subdirectories for `SKILL.md` files
2. Register each skill as a slash command using the folder name
3. Load the skill instructions when invoked
4. Make skills available via `/skill-name` syntax

## Available Skills

Skills are organized in subdirectories:

- `build-slides/` - Presentation slide generation
- `summarise/` - Session summary generation
- `read-sessions-summary/` - Read and browse session summaries

## Usage

To use a skill in Claude Code:

```
/build-slides Create a 5-slide pitch deck about AI agents
```

The skill's SKILL.md file will be loaded and Claude will follow those instructions.

## For Skill Authors

When adding a new skill:
1. Create a folder with your skill name (use kebab-case)
2. Add a `SKILL.md` file with agent instructions
3. The skill will automatically be available as `/your-skill-name`

See [CONTRIBUTING.md](./CONTRIBUTING.md) for full guidelines.
