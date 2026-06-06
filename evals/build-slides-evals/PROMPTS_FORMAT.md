# Prompt Storage Format

This document specifies how test prompts are stored and organized for evaluation.

## Overview

Prompts are stored in JSON format in the `prompts/` directory. Each file is a reusable prompt set containing one or more prompts that can be evaluated repeatedly as the skill improves.

## File Structure

```
evals/build-slides-evals/prompts/
├── INDEX.md (this file, lists all available prompt sets)
├── custom-evals.json (user-defined test cases)
├── baseline.json (baseline comparison set)
├── edge-cases.json (challenging edge cases)
└── ...
```

## Prompt Set Format

Each `.json` file in `prompts/` contains an array of prompt objects:

```json
{
  "name": "custom-evals",
  "description": "Custom evaluation suite for build-slides skill",
  "created": "2026-06-06",
  "prompts": [
    {
      "name": "pitch-tech-startup",
      "prompt": "Create a 5-slide pitch deck for an AI-powered customer support startup targeting venture capital investors. Include: problem statement, solution, market size, team, and funding ask.",
      "category": "business_pitch",
      "length": 5,
      "description": "VC pitch deck with business content"
    },
    {
      "name": "marketing-campaign",
      "prompt": "Design a 4-slide marketing overview for a new SaaS product launch. Include value proposition, key features, pricing tiers, and call to action.",
      "category": "marketing",
      "length": 4,
      "description": "Product launch marketing slides"
    }
  ]
}
```

## Field Definitions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Unique identifier for this prompt set (kebab-case, e.g., "custom-evals") |
| `description` | string | No | Human-readable description of the prompt set |
| `created` | string | No | ISO date when prompt set was created (YYYY-MM-DD) |
| `prompts` | array | Yes | Array of prompt objects |

### Prompt Object Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Unique identifier within the set (kebab-case, e.g., "pitch-tech-startup") |
| `prompt` | string | Yes | Full prompt text to pass to build-slides skill |
| `category` | string | Yes | Domain/category (business_pitch, marketing, educational, technical, financial, etc.) |
| `length` | number | Yes | Expected slide count (3-15) |
| `description` | string | No | Human-readable summary of what this prompt tests |

## Categories

Standardized categories for organizing prompts:

- **business_pitch** - VC pitches, sales presentations, investor decks
- **marketing** - Product launches, campaigns, promotional content
- **educational** - Training, tutorials, workshops, courses
- **technical** - Architecture, system design, technical specs
- **financial** - Reports, forecasts, quarterly reviews
- **product** - Roadmaps, demos, feature overviews
- **internal** - Company culture, HR, onboarding
- **event** - Conference talks, webinars, presentations
- **nonprofit** - Annual reports, fundraising, impact reporting
- **academic** - Research, papers, case studies
- **edge_case** - Challenging scenarios (long titles, text-heavy, minimal briefs, etc.)

## Usage

### Loading Prompts by Name

When running evaluations:

```bash
# Evaluate specific prompts from a set
npm run eval -- --prompts custom-evals pitch-tech-startup marketing-campaign

# Evaluate all prompts in a set
npm run eval -- --prompts custom-evals all

# Evaluate from different sets
npm run eval -- --prompts baseline all
```

### Adding New Prompt Sets

1. Create a new file: `prompts/my-eval-set.json`
2. Follow the format above
3. Add entry to `prompts/INDEX.md`
4. Commit to git with message: `docs: add my-eval-set prompt set`

### Re-evaluating Prompts

Prompt sets are version-controlled (committed to git). The same prompts can be evaluated multiple times:

- **Run 1:** `2026-06-06-run-1` → baseline scores
- **Improve SKILL.md** (typography, spacing, etc.)
- **Run 2:** `2026-06-15-run-2` → new scores from same prompts
- **Compare:** See before/after quality progression

## Versioning

Prompts are immutable once committed. If a prompt needs changes:

1. Create a new prompt set with the updated prompts
2. Keep old set for historical comparison
3. Update INDEX.md to note which sets are active

## Example: custom-evals.json

```json
{
  "name": "custom-evals",
  "description": "Custom evaluation suite testing diverse skill scenarios",
  "created": "2026-06-06",
  "prompts": [
    {
      "name": "pitch-tech-startup",
      "prompt": "Create a 5-slide pitch deck for an AI-powered customer support startup targeting venture capital investors. Include: problem statement, solution, market size, team, and funding ask.",
      "category": "business_pitch",
      "length": 5,
      "description": "Tests structured business narrative"
    },
    {
      "name": "marketing-campaign",
      "prompt": "Design a 4-slide marketing overview for a new SaaS product launch. Include value proposition, key features, pricing tiers, and call to action.",
      "category": "marketing",
      "length": 4,
      "description": "Tests marketing content and visual hierarchy"
    },
    {
      "name": "training-python",
      "prompt": "Build an 8-slide training presentation on Python basics. Cover: intro, variables, data types, operators, control flow, functions, and summary.",
      "category": "educational",
      "length": 8,
      "description": "Tests handling of technical educational content"
    }
  ]
}
```

See `INDEX.md` for all available prompt sets.
