# Agent Skills

A collection of reusable AI agent skills for code generation, session memory, and productivity.

## Available Skills and Commands

| Skill | What it does | How to install |
|-------|-------------|----------------|
| build-slides | Generate presentation slides with structured formats and themes | Write the prompt in your agent to install it as a skill |
| /summarise | Summarise the current session and save to `docs/sessions/` | Write the prompt in your agent to install it as a command |
| /read-sessions-summary | Read and browse session summaries from `docs/sessions/` | Write the prompt in your agent to install it as a command |

## Repository Structure

```
agent-skills/
├── build-slides/
│   ├── SKILL.md              # Agent workflow and instructions
│   ├── README.md             # Human-readable documentation
│   └── build-slides.skill    # Claude.ai package file
├── summarise/
│   ├── SKILL.md              # Agent workflow and instructions
│   └── README.md             # Human-readable documentation
├── read-sessions-summary/
│   ├── SKILL.md              # Agent workflow and instructions
│   └── README.md             # Human-readable documentation
├── docs/sessions/            # Example session summaries output
├── skills.json               # Skills registry
└── README.md                 # This file
```

## License

MIT
