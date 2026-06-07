# Agent Skills

A collection of reusable AI agent skills for code generation, session memory, and productivity.

## Available Skills and Commands

| Skill | What it does | How to install |
|-------|-------------|----------------|
| build-slides | Generate presentation slides with structured formats and themes | **Copy-paste this into your agent:** "Install the build-slides skill from https://github.com/kn-neeraj/agent-skills/blob/main/build-slides/SKILL.md" |
| /summarise | Summarise the current session and save to `docs/sessions/` | **Copy-paste this into your agent:** "Install the /summarise command from https://github.com/kn-neeraj/agent-skills/blob/main/summarise/SKILL.md" |
| /read-sessions-summary | Read and browse session summaries from `docs/sessions/` | **Copy-paste this into your agent:** "Install the /read-sessions-summary command from https://github.com/kn-neeraj/agent-skills/blob/main/read-sessions-summary/SKILL.md" |

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
