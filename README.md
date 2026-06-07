# Agent Skills

A collection of reusable AI agent skills for Claude.ai, Claude Code, and Claude Cowork.

## Available Skills

| Skill | What it does | Claude.ai | Claude Code | Cowork |
|-------|-------------|-----------|-------------|--------|
| build-slides | Generate presentation slides with structured formats and themes | [Download .skill](./build-slides/build-slides.skill) | `/build-slides` | `@build-slides` |
| summarise | Summarise the current session and save to docs/sessions/ | N/A | `/summarise` | `@summarise` |
| read-sessions-summary | Read and browse session summaries from docs/sessions/ | N/A | `/read-sessions-summary` | `@read-sessions-summary` |

## Installation

### Claude.ai
1. Download the `.skill` file for the skill you want
2. Go to Claude.ai Settings > Skills
3. Click "Upload Skill" and select the downloaded file
4. The skill will now be available in your conversations

### Claude Code
1. Clone this repository or add it to your workspace
2. Claude Code will automatically detect the `CLAUDE.md` file
3. Skills will be registered automatically when you start a session
4. Use skills with `/skill-name` syntax

### Claude Cowork
1. Add this repository to your Cowork workspace
2. Reference skills with `@skill-name` syntax
3. Skills are shared across your team workspace

## Structure

Each skill follows a standard structure:

```
skill-name/
├── SKILL.md              # Agent workflow and instructions
├── README.md             # Human-readable documentation
├── skill-name.skill      # Claude.ai package
└── ...                   # Additional resources
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on adding new skills.

## License

MIT
