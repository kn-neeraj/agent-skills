# Prompt Sets Index

Available prompt sets for evaluating build-slides skill.

## Active Prompt Sets

### custom-evals.json
- **Created:** 2026-06-06
- **Prompts:** 12
- **Categories:** business_pitch, marketing, educational, financial, product, internal, technical, event, edge_case
- **Description:** Diverse evaluation suite testing business, educational, technical, and edge case scenarios
- **Usage:** `npm run eval -- --prompts custom-evals all`
- **File:** `prompts/custom-evals.json`

## Archived/Reference Sets

None yet. As new prompt sets are created, they will be listed here with dates and notes.

## Adding New Prompt Sets

To add a new prompt set:

1. Create `prompts/my-new-set.json` following the format in `PROMPTS_FORMAT.md`
2. Update this INDEX.md with the new entry
3. Commit both files: `git add prompts/my-new-set.json prompts/INDEX.md`
4. Commit message: `docs: add my-new-set prompt set with N prompts`

## Prompt Categories

Categories used across all prompt sets:

- **business_pitch** - VC pitches, sales decks, investor presentations
- **marketing** - Product launches, campaigns, promotional slides
- **educational** - Training, tutorials, workshops, courses
- **technical** - Architecture, system design, specifications
- **financial** - Reports, forecasts, quarterly reviews
- **product** - Roadmaps, demos, feature overviews
- **internal** - Company culture, HR, onboarding
- **event** - Conference talks, webinars, presentations
- **nonprofit** - Annual reports, fundraising, impact
- **academic** - Research, papers, case studies
- **edge_case** - Challenging scenarios (vague briefs, text-heavy, long titles, etc.)

## Notes

- Prompt sets are **immutable once committed** to git
- Same prompts can be evaluated multiple times to measure improvement
- To modify prompts, create a new set (e.g., `custom-evals-v2.json`)
- Keep old sets for historical comparison
