# Contributing to Agent Skills

Thank you for contributing! This guide explains how to add new skills to this repository.

## Skill Structure Requirements

Every skill must include **3 minimum files**:

1. **SKILL.md** - Agent instructions
   - Workflow and task execution steps
   - Architecture rules and constraints
   - QA checklist and validation criteria
   - This is what Claude reads to execute the skill

2. **README.md** - Human documentation
   - What the skill does (2-3 sentences)
   - Quick start example
   - Configuration options
   - Expected outputs

3. **skill-name.skill** - Claude.ai package
   - JSON file with skill metadata and content
   - Allows drag-and-drop installation in Claude.ai
   - Must match the format in existing skills

## Adding a New Skill

### 1. Create the folder structure

```bash
mkdir -p your-skill-name
cd your-skill-name
```

### 2. Create required files

Create `SKILL.md`, `README.md`, and `your-skill-name.skill` following the templates in existing skills.

### 3. Update skills.json

Add your skill to the root `skills.json` file:

```json
{
  "name": "your-skill-name",
  "description": "Brief description of what it does",
  "trigger": "Keywords that should activate this skill",
  "path": "./your-skill-name",
  "tags": ["category", "type", "domain"],
  "runtimes": {
    "claude_ai": true,
    "claude_code": true,
    "cowork": true
  }
}
```

### 4. Update README.md table

Add a row to the skill table in the root `README.md`:

```markdown
| your-skill-name | What it does | [Download .skill](./your-skill-name/your-skill-name.skill) | `/your-skill-name` | `@your-skill-name` |
```

### 5. Test your skill

Before submitting:
- Test in Claude.ai by uploading the .skill file
- Test in Claude Code using the `/` command
- Verify all links and references work
- Check that SKILL.md has clear, actionable instructions

### 6. Submit a pull request

- Commit with message: `feat: add your-skill-name skill`
- Open a PR with description of what the skill does
- Include example output if applicable

## Skill Design Guidelines

### SKILL.md Best Practices

- Write in imperative mood ("Generate slides", not "This generates slides")
- Include concrete examples for complex workflows
- Add QA checklist with specific validation steps
- Define clear success/failure criteria
- Specify any required tools or dependencies

### README.md Best Practices

- Start with 1-2 sentence elevator pitch
- Include quick start example showing input → output
- Document all configuration options
- Add troubleshooting section if needed
- Keep it scannable with headers and lists

### .skill File Format

```json
{
  "name": "skill-name",
  "version": "1.0.0",
  "description": "Brief description",
  "instructions": "Content from SKILL.md",
  "metadata": {
    "author": "Your Name",
    "tags": ["tag1", "tag2"],
    "runtime": ["claude.ai", "claude-code", "cowork"]
  }
}
```

## Questions?

Open an issue or start a discussion in the repository.
