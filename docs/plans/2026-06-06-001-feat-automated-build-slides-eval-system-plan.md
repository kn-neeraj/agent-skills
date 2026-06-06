---
title: Automated Build Slides Evaluation System
type: feat
status: active
date: 2026-06-06
origin: docs/brainstorms/2026-05-28-build-slides-quality-uplift-requirements.md
---

# Automated Build Slides Evaluation System

## Overview

Build a timestamped evaluation workflow that lets you measure build-slides skill quality improvements over time. The system will:
- Store test prompts in `evals/build-slides-evals/prompts/` (persistent, reusable)
- On demand: generate slides with timestamps, evaluate against the rubric, store results with run ID
- Enable before/after comparison: re-run the same prompts after skill improvements, compare scores
- Generate manual comparison reports showing quality progression

**Workflow:** Define prompts once → Run eval (baseline) → Improve skill → Run eval again (same prompts) → Compare before/after scores

## Problem Frame

The build-slides evaluation framework exists (rubric, metrics), but there's no workflow for timestamped, repeatable evaluation. Currently you cannot:
- Store test prompts persistently and re-evaluate them later
- Generate timestamped slides to compare versions
- Track quality changes (before/after) when you improve SKILL.md
- Build a historical record of quality progression

The quality uplift plan (typography formula, spacing scale, interactions) needs measurement to validate that changes actually improve output. You need a system where: define prompts once → baseline eval → improve skill → re-eval same prompts → show before/after impact.

## Requirements Trace

- **R1:** Store test prompts persistently in `evals/build-slides-evals/prompts/` (JSON/markdown format with name, prompt text, category, length)
- **R2:** On demand: generate slides with timestamps, evaluate against 4-criterion rubric, store results with run ID
- **R3:** Generate slides in `evals/build-slides-evals/results/<run-id>/` with naming: `<prompt-name>-<YYYY-MM-DD-HHmmss>.html`
- **R4:** Evaluate generated HTML against the 4-criterion rubric (Readability 1-5, Composition 1-5, Consistency 1-5, Functionality Works/Broken)
- **R5:** Store evaluation results in `evals/build-slides-evals/results/eval-result-<run-id>.md` (includes prompts used, scores per prompt, metrics, links to HTML)
- **R6:** Support re-evaluation: run evals again on same prompts (stored by name), generate new run with new timestamp
- **R7:** Support manual comparison reports: show side-by-side scores from multiple runs, highlighting improvements/regressions

## Scope Boundaries

- **In scope:**
  - Prompt storage (persistent JSON/markdown in `evals/build-slides-evals/prompts/`)
  - Evaluation orchestration (generate timestamped slides → evaluate → store results per run)
  - Results file format with per-run IDs and timestamp metadata
  - Re-evaluation workflow (same prompts, new timestamps, new run ID)
  - Manual comparison report generation (user-triggered, not automatic)
  - Integration with existing rubric and skill generator

- **Out of scope:**
  - GitHub Actions CI/CD integration (future; design should accommodate)
  - Automated regression detection (future)
  - Web UI for browsing results (plain .md files sufficient)
  - Parallel evaluation runs (sequential execution)

## Context & Research

### Relevant Code and Patterns

- **build-slides/SKILL.md** — Skill workflow that generates HTML; outputs self-contained presentation with inline CSS, navigation, speaker notes, keyboard navigation
- **evals/build-slides-evals/rubric.md** — 4-criterion scoring rubric (Readability 1-5, Composition 1-5, Consistency 1-5, Functionality Works/Broken)
- **evals/build-slides-evals/metrics.md** — Aggregated metrics (Visual Quality Average, Pass Rate, Consistency, Std Dev)
- **evals/build-slides-evals/prompts/** — Store custom prompt sets (JSON/markdown) with name, text, category, length
- **evals/build-slides-evals/lib/generator.js** — Generates prompt → calls skill → saves HTML with timestamp
- **evals/build-slides-evals/lib/scorer.js** — Scores HTML against rubric criteria
- **evals/build-slides-evals/lib/report-generator.js** — Aggregates scores, generates eval-result .md files
- **evals/build-slides-evals/results/** — Stores eval-result-<run-id>.md files and timestamped HTML slides

### Institutional Learnings

- Quality systems (typography formula, spacing scale, shadows) are documented in `build-slides/styles.md`; evals validate if they're actually applied
- The skill is deterministic (same prompt → same structure), but model responses vary; evals measure consistency of output structure, not prompt-response randomness
- Edge cases (text-heavy, long titles, minimal briefs) historically score lower; tracking them helps prioritize improvements

### External References

- SAMPLE_RESULTS.md shows baseline: 4.0/5.0 average visual quality, 100% functionality
- Evaluation dataset covers 11 categories (business pitch, marketing, financial, educational, etc.)

## Key Technical Decisions

1. **Prompts stored persistently in JSON/markdown** — `evals/build-slides-evals/prompts/<set-name>.json` contains reusable test cases. Can be version-controlled and re-evaluated anytime.

2. **Timestamped slides and run IDs** — Slides named `<prompt-name>-<YYYY-MM-DD-HHmmss>.html`, results stored as `eval-result-<run-id>.md`. Enables before/after comparison across multiple runs.

3. **One results file per evaluation run** — Each run gets a unique ID (e.g., `2026-06-06-run-1`, `2026-06-15-run-2`). Keeps history clear, prevents collisions.

4. **Evaluation triggered on demand by name** — User says "Evaluate: pitch-tech-startup, marketing-campaign" → System loads stored prompts by name, generates slides, evaluates, stores results. Simple, reproducible.

5. **Results stored in evals/ (separate from skill)** — `evals/build-slides-evals/results/` keeps evaluation artifacts separate from skill implementation. Scales to support multiple skills' evaluations.

6. **Manual comparison reports** — No automatic before/after. User asks "Compare run-1 and run-2 for pitch-tech-startup" → generate comparison section. Puts control in user's hands.

7. **Rubric scoring is manual (Claude evaluates visually)** — Human judgment + structured rubric gives reliable quality signal. Avoids automated scoring fragility.

## Open Questions

### Resolved During Planning

- **Should evaluation require existing dataset or custom prompts?** Answer: Both. Support dataset.json for consistent baselines, and custom prompts for targeted testing of improvements.
- **Who runs evaluations?** Answer: Developers (you) whenever making SKILL.md changes or quality improvements. Can be extended to CI later.

### Deferred to Implementation

- **Exact UX for triggering eval** — Will determine during implementation whether to use CLI script, Node.js runner, or manual prompts. Design should support all three.
- **Automated regression detection** — Deferred to future phase. This plan establishes baseline; regression detection can consume these results afterward.
- **GitHub Actions workflow** — Design for it (assume scripts are self-contained) but don't implement yet. Can be added once .md results prove stable.

## High-Level Technical Design

> *This illustrates the intended workflow and is directional guidance for review, not implementation specification. The implementing agent should treat it as context, not code to reproduce.*

```
BASELINE PHASE (Week 1):
  User provides test prompts
    ↓
  Stored in: evals/build-slides-evals/prompts/custom-evals.json
    ├─ { name: "pitch-tech-startup", prompt: "...", category: "business_pitch", length: 5 }
    ├─ { name: "marketing-campaign", prompt: "...", ... }
    └─ ...
    ↓
  User asks: "Evaluate: pitch-tech-startup, marketing-campaign"
    ↓
  Orchestrator (Run 1: 2026-06-06)
    ├─ Load prompts by name from prompts/custom-evals.json
    ├─ For each prompt:
    │   ├─ Call build-slides skill
    │   ├─ Save HTML to: evals/build-slides-evals/results/2026-06-06-run-1/
    │   │   ├─ pitch-tech-startup-2026-06-06-143022.html
    │   │   ├─ marketing-campaign-2026-06-06-143045.html
    │   │   └─ ...
    │   └─ Evaluate (Readability, Composition, Consistency, Functionality)
    ├─ Aggregate: Visual Quality Avg, Pass Rate, etc.
    └─ Generate: evals/build-slides-evals/results/eval-result-2026-06-06-run-1.md
        ├─ Prompts used, timestamp, run ID
        ├─ Individual scores table (prompt, readability, composition, consistency, functionality)
        ├─ Summary metrics
        └─ Links to HTML files in 2026-06-06-run-1/

IMPROVEMENT PHASE (Week 2):
  Developer improves SKILL.md (adds golden ratio typography, spacing scale, etc.)

VALIDATION PHASE (Week 2):
  User asks: "Evaluate: pitch-tech-startup, marketing-campaign" (same prompts)
    ↓
  Orchestrator (Run 2: 2026-06-15)
    ├─ Load prompts by name (same as before)
    ├─ For each prompt:
    │   ├─ Call IMPROVED build-slides skill
    │   ├─ Save HTML to: evals/build-slides-evals/results/2026-06-15-run-2/
    │   │   ├─ pitch-tech-startup-2026-06-15-091500.html
    │   │   ├─ marketing-campaign-2026-06-15-091523.html
    │   │   └─ ...
    │   └─ Evaluate (same rubric)
    ├─ Aggregate: Calculate new metrics
    └─ Generate: evals/build-slides-evals/results/eval-result-2026-06-15-run-2.md
        ├─ Prompts used, timestamp, run ID
        ├─ Individual scores table
        ├─ Summary metrics
        └─ Links to HTML files in 2026-06-15-run-2/

COMPARISON PHASE (Week 2):
  User asks: "Compare pitch-tech-startup between run-1 and run-2"
    ↓
  Claude generates comparison section showing:
    ├─ Run-1 scores (2026-06-06): Readability 3.8, Composition 4.0, Consistency 3.9, Functionality Works
    ├─ Run-2 scores (2026-06-15): Readability 4.4, Composition 4.5, Consistency 4.3, Functionality Works
    └─ Improvement: +0.6 readability ✓, +0.5 composition ✓, +0.4 consistency ✓

  Added to: evals/build-slides-evals/results/COMPARISON-run1-vs-run2.md (manual, on-demand)
```

## Implementation Units

- [ ] **Unit 1: Define Prompt Storage Format**

**Goal:** Create a persistent, reusable prompt storage system so prompts can be stored once and re-evaluated later.

**Requirements:** R1

**Dependencies:** None (design-only)

**Files:**
- Create: `evals/build-slides-evals/PROMPTS_FORMAT.md` (specification for prompt storage)
- Create: `evals/build-slides-evals/prompts/example-custom-evals.json` (example prompt set)

**Approach:**
- Prompts stored in JSON format: `evals/build-slides-evals/prompts/<set-name>.json`
- Each prompt object contains:
  - `name`: Unique identifier (e.g., "pitch-tech-startup")
  - `prompt`: Full prompt text
  - `category`: Domain (business_pitch, marketing, educational, technical, etc.)
  - `length`: Expected slide count
  - `description`: (optional) Human-readable description for context
- Support multiple prompt sets (can have custom-evals.json, dataset.json, baseline.json, etc.)
- Metadata file: `evals/build-slides-evals/prompts/INDEX.md` listing available prompt sets
- Prompts are version-controlled (committed to git) for reproducibility
- When evaluating, prompts are loaded by name, ensuring same content across runs

**Patterns to follow:**
- JSON structure for machine readability (compatible with CLI parsing)
- Consistent field naming (name, prompt, category, length)

**Test scenarios:**
- **Happy path:** Load custom-evals.json → read 3 prompts by name → all fields present
- **Edge case:** Prompt text with special characters (newlines, quotes, unicode) → loads correctly
- **Reproducibility:** Same prompt set loaded twice → identical content

**Verification:**
- JSON files are valid (no syntax errors)
- Prompt sets can be loaded by name for evaluation
- INDEX.md accurately lists available prompt sets
- Prompts are committed to git for version control

---

- [ ] **Unit 2: Design Results File Format**

**Goal:** Define the structure of `eval-result-<run-id>.md` to store evaluation context with timestamps and run IDs for before/after comparison.

**Requirements:** R3, R5

**Dependencies:** Unit 1

**Files:**
- Create: `evals/build-slides-evals/RESULTS_FORMAT.md` (specification)
- Reference: `evals/build-slides-evals/SAMPLE_RESULTS.md` (existing example for reference)

**Approach:**
- Results file format: `eval-result-<run-id>.md` where run-id is `YYYY-MM-DD-run-N` (e.g., `eval-result-2026-06-06-run-1.md`)
- File content includes:
  - **Header:** Run ID, timestamp (ISO format), prompts evaluated (which prompt set), build-slides version (git commit), evaluator
  - **Individual Scores:** Table with columns: Prompt Name | Category | Readability | Composition | Consistency | Functionality | Visual Quality Avg | Notes
  - **Summary Metrics:** Average Visual Quality, Functionality Pass Rate, Consistency Avg, Quality Std Dev
  - **Category Breakdown:** By category, show average quality and count
  - **Appendix:** List of generated HTML files with paths (e.g., `2026-06-06-run-1/pitch-tech-startup-2026-06-06-143022.html`)
- Use markdown tables for machine-readability
- Include run-id in all references for easy linking

**Patterns to follow:**
- SAMPLE_RESULTS.md structure and table format
- rubric.md scoring definitions (preserve criterion names and scale)
- metrics.md aggregation formulas

**Test scenarios:**
- Result file is valid markdown and renders on GitHub
- All scoring tables have consistent column counts
- Run-id is consistent throughout document
- Summary metrics match manual calculation from individual scores
- Timestamps are ISO format for sorting

**Verification:**
- Result file can be committed to git and viewed without special tools
- Run-id allows quick identification of which evaluation run this is
- Two result files can be compared side-by-side for before/after analysis

---

- [ ] **Unit 3: Create Evaluation Orchestrator Script**

**Goal:** Build a script that loads prompts by name, generates timestamped slides, evaluates them, and stores results per run.

**Requirements:** R2, R3, R4, R6

**Dependencies:** Unit 1, Unit 2

**Files:**
- Create: `evals/build-slides-evals/evaluate.js` (main orchestrator)
- Create: `evals/build-slides-evals/lib/evaluator.js` (evaluation logic)
- Create: `evals/build-slides-evals/lib/runner.js` (run orchestration and results aggregation)
- Modify: `evals/build-slides-evals/package.json` (add npm scripts)
- Create: `evals/build-slides-evals/USAGE.md` (user guide)

**Approach:**
- Orchestrator (`evaluate.js`) accepts:
  - Prompt set name (e.g., "custom-evals")
  - Prompt names to evaluate (e.g., "pitch-tech-startup marketing-campaign")
  - Optional: run ID (defaults to YYYY-MM-DD-run-N)
- Workflow:
  1. Load specified prompts from `prompts/<set-name>.json` by name
  2. Create run directory: `results/<run-id>/`
  3. For each prompt:
     - Call build-slides skill via Claude
     - Save HTML: `results/<run-id>/<prompt-name>-<YYYY-MM-DD-HHmmss>.html`
     - Evaluate (Readability, Composition, Consistency, Functionality)
     - Record scores
  4. Aggregate metrics (Visual Quality Avg, Pass Rate, Consistency, Std Dev)
  5. Generate result file: `results/eval-result-<run-id>.md` (using format from Unit 2)
  6. Log completion with summary
- Evaluator interface: Accept HTML, return scores object `{ readability, composition, consistency, functionality, notes }`
- Support human evaluation (you read HTML and provide scores via prompt)

**Patterns to follow:**
- Existing lib/generator.js for skill calling (reuse or adapt)
- Existing lib/scorer.js for rubric application
- Existing lib/report-generator.js for metrics aggregation

**Test scenarios:**
- **Happy path:** Prompt set exists, 2 prompts provided → generates 2 HTML files with timestamps → creates eval-result-<run-id>.md
- **Run directory:** Results are organized in timestamped run folder (results/2026-06-06-run-1/)
- **Timestamp precision:** Generated HTML files have unique timestamps (no collisions even if run quickly)
- **Reproducibility:** Same prompts run twice (different run-id) → HTML content is identical (structure), only timestamps differ
- **Error path:** Prompt not found in set → graceful error message

**Verification:**
- HTML files created in `results/<run-id>/` with correct naming
- Result file generated at `results/eval-result-<run-id>.md`
- All sections of result file populated correctly
- Metrics match manual calculation

---

- [ ] **Unit 4: Integrate Skill Invocation (Build Slides Generation)**

**Goal:** Connect orchestrator to build-slides skill so prompts generate slides automatically within run directories.

**Requirements:** R2, R3

**Dependencies:** Unit 3

**Files:**
- Create or modify: `evals/build-slides-evals/lib/skill-caller.js` (calls build-slides skill)
- Modify: `evals/build-slides-evals/evaluate.js` (integrate skill calls)
- Reference: `build-slides/SKILL.md` (skill workflow)

**Approach:**
- `skill-caller.js` module:
  - Takes prompt object `{ name, prompt, category, length }`
  - Calls build-slides SKILL.md via Claude API with full prompt
  - Returns generated HTML content
  - Handles errors gracefully (model failures, timeouts)
- Integration in orchestrator:
  - For each prompt: call skill-caller → save HTML with naming pattern `<run-id>/<prompt-name>-<YYYY-MM-DD-HHmmss>.html`
  - Track generation success/failure
- Timestamp generation:
  - Use millisecond precision to prevent collisions within same run
  - Store timestamp with evaluation scores (link HTML to scores)
- HTML validation:
  - Check generated HTML is well-formed
  - Verify it contains expected slide structure elements

**Patterns to follow:**
- SKILL.md workflow (input prompt → generate HTML with navigation, speaker notes, themes)
- Existing lib/generator.js patterns if available
- Error handling for model API failures

**Test scenarios:**
- **Happy path:** Valid prompt → skill generates HTML → saved to results/<run-id>/ with timestamp
- **Edge case:** Very long title or text → skill handles gracefully, HTML generated without overflow errors
- **Error path:** Skill call fails → error logged, evaluation continues with remaining prompts
- **Reproducibility:** Same prompt, different runs → different timestamps, but HTML structure identical

**Verification:**
- HTML files created in correct run directory with proper naming
- HTML is valid (tags, structure)
- Can open in browser and interact (navigation, keyboard shortcuts work)

---

- [ ] **Unit 5: Manual Evaluation Interface & Scoring**

**Goal:** Define how you (the evaluator) score generated HTML against the rubric and provide scores to the orchestrator.

**Requirements:** R4

**Dependencies:** Unit 3, Unit 4

**Files:**
- Reference: `evals/build-slides-evals/rubric.md` (scoring criteria — read-only)
- Create: `evals/build-slides-evals/EVALUATION_GUIDE.md` (quick reference for evaluators)
- Modify: `evals/build-slides-evals/evaluate.js` (integrate evaluation prompt/input)

**Approach:**
- Evaluation workflow:
  1. After generating slides in results/<run-id>/, orchestrator opens each HTML in browser (or provides preview)
  2. You read the HTML and evaluate against 4 criteria from rubric.md:
     - Readability (1-5): Text clarity, hierarchy, contrast
     - Composition (1-5): Layout balance, whitespace
     - Consistency (1-5): Uniform fonts, colors, spacing
     - Functionality: Works or Broken (navigation, keyboard, presenter view)
  3. You provide scores (via prompt interaction or JSON file)
  4. Orchestrator records scores and calculates Visual Quality Avg = (Readability + Composition + Consistency) / 3
  5. Scores stored in results file (Unit 2 format)
- Evaluation guide:
  - Quick reference card (not duplicate of rubric)
  - Score examples (what 5 looks like vs 3 vs 1)
  - Common issues (low contrast, cramped text, overflow)
  - Field: notes (optional context like "Text too dense", "Good spacing")

**Patterns to follow:**
- rubric.md definitions and scaling
- SAMPLE_RESULTS.md scoring examples

**Test scenarios:**
- **Happy path:** View HTML → evaluate all 4 criteria → provide scores → scores recorded
- **Consistency:** Same HTML evaluated twice → scores within ±1 on 1-5 scale
- **Notes:** Evaluator can add context ("Text hierarchy unclear") → appears in results

**Verification:**
- Scores in valid range (1-5 for visual, Works/Broken for functionality)
- All 4 criteria scored (no missing scores)
- Notes captured and appear in results file

---

- [ ] **Unit 6: Results File Generation & Storage**

**Goal:** Aggregate evaluated prompts and generate result file following format from Unit 2, stored in results/ with run ID.

**Requirements:** R5

**Dependencies:** Unit 2, Unit 5

**Files:**
- Create or modify: `evals/build-slides-evals/lib/report-generator.js` (generates .md result files)
- Directory: `evals/build-slides-evals/results/` (created by Unit 3)

**Approach:**
- Report generator:
  - Input: run ID, list of evaluated prompts with scores `[{ name, category, readability, composition, consistency, functionality, notes, html_file }]`
  - Calculate aggregates:
    - Visual Quality Avg = (Readability + Composition + Consistency) / 3 per prompt
    - Average Visual Quality = mean of all Visual Quality Avgs
    - Functionality Pass Rate = % prompts with "Works" status
    - Consistency Score = mean of all Consistency scores
    - Quality Std Dev = standard deviation of Visual Quality Avgs
  - Group by category, calculate category averages
  - Generate markdown file: `results/eval-result-<run-id>.md` (using format from Unit 2)
- File content:
  - Header: run ID, timestamp, prompt set name, build-slides git commit, evaluator
  - Individual scores table (Prompt | Category | Readability | Composition | Consistency | Functionality | Visual Quality Avg | Notes)
  - Summary metrics block
  - Category breakdown table
  - Appendix: links to generated HTML files (e.g., `2026-06-06-run-1/prompt-name-2026-06-06-143022.html`)
- Storage:
  - Files version-controlled (committed to git for history)
  - Run directories in `results/` contain HTML slides and corresponding .md result file

**Patterns to follow:**
- SAMPLE_RESULTS.md structure and table format
- metrics.md aggregation formulas
- Unit 2 result file format specification

**Test scenarios:**
- **Happy path:** 4 evaluated prompts → generate report → file valid markdown → metrics calculated correctly
- **Edge case:** Single prompt → report valid, averages computed correctly
- **Edge case:** All functionality broken → Pass Rate 0%, report highlights
- **Correctness:** Average Visual Quality matches manual calculation from individual scores

**Verification:**
- Result file created at `results/eval-result-<run-id>.md`
- File is valid markdown
- All aggregated metrics match manual calculation
- Can be committed and viewed on GitHub

---

- [ ] **Unit 7: CLI & Documentation**

**Goal:** Make evaluation easy to trigger via command line, document the workflow, provide clear guidance.

**Requirements:** R2, R6

**Dependencies:** Units 1-6

**Files:**
- Modify: `evals/build-slides-evals/package.json` (add npm scripts)
- Create: `evals/build-slides-evals/USAGE.md` (user guide for triggering evals)
- Create: `evals/build-slides-evals/EVALUATION_GUIDE.md` (quick reference for scoring)
- Modify: `build-slides/README.md` (link to eval system)

**Approach:**
- npm scripts in `package.json`:
  - `npm run eval -- --prompts custom-evals pitch-tech-startup marketing-campaign` — Evaluate specified prompts
  - `npm run eval -- --prompts custom-evals all` — Evaluate all prompts in set
  - Auto-generates run ID: `YYYY-MM-DD-run-N` (checks for existing runs on that date)
- USAGE.md:
  - Quick start: Copy-paste commands to run evaluation
  - What happens: Step-by-step process (generate slides, evaluate, save results)
  - Where results go: `evals/build-slides-evals/results/eval-result-<run-id>.md`
  - How to re-evaluate: Same command, new run ID auto-generated
  - How to interpret results: Explanation of metrics and what improvements mean
  - Prompt storage: How to add/modify prompt sets in `prompts/`
- EVALUATION_GUIDE.md:
  - One-page scoring reference (concise, not full rubric)
  - Each criterion in 2-3 sentences
  - Score examples (5 = "clear hierarchy"; 3 = "readable but unclear")
  - Common pitfalls (low contrast, text overflow, cramped spacing)
- README.md link:
  - Point to evals system
  - Mention "run evals after SKILL.md changes to validate improvements"

**Patterns to follow:**
- Existing npm scripts in package.json
- rubric.md definitions (reference only, don't duplicate)
- High-level, non-technical language

**Test scenarios:**
- **CLI:** Run `npm run eval -- --prompts custom-evals pitch-tech-startup` from evals/build-slides-evals/ → completes without errors
- **Documentation:** README and USAGE.md clear enough for someone to run evaluation independently
- **Run ID:** Run twice same day → generates run-1, run-2 automatically

**Verification:**
- npm scripts work as documented
- Eval completes with clear summary
- Results at documented path
- USAGE.md instructions accurate

---

- [ ] **Unit 8: Manual Comparison Reports & Tracking Guide**

**Goal:** Enable on-demand before/after comparison reports and document how to interpret quality trends.

**Requirements:** R7

**Dependencies:** Unit 7 (must have at least 2 eval runs to compare)

**Files:**
- Create: `evals/build-slides-evals/COMPARISON.md` (guide for generating comparison reports)
- Create: `evals/build-slides-evals/TRACKING.md` (how to interpret trends and metrics)
- Modify: `build-slides/SKILL.md` (link to eval workflow)

**Approach:**
- Comparison report generation (manual, on-demand):
  - User asks: "Compare pitch-tech-startup between run-1 and run-2"
  - Generate section showing:
    - Run-1 scores (date, readability, composition, consistency, functionality)
    - Run-2 scores (date, readability, composition, consistency, functionality)
    - Difference (what improved, what regressed, by how much)
    - Visual Quality Avg before/after
  - Add to results file or separate COMPARISON file
  - Format: markdown table or prose + table
- Tracking guide (TRACKING.md):
  - How to manually compare eval-result files
  - What metrics matter: Visual Quality Avg, Pass Rate, Consistency
  - Interpreting improvements: "+0.5 readability" means better text clarity
  - Interpreting regressions: If scores drop after a change, revert or investigate
  - Category breakdown: Which domains improved/regressed (business vs educational)
  - Examples: "After typography changes, readability should improve in all categories"
- SKILL.md update:
  - Link to eval system
  - Note that improvements should be validated via evals before shipping

**Patterns to follow:**
- SAMPLE_RESULTS.md table format for side-by-side comparison
- metrics.md metric definitions

**Test scenarios:**
- **Manual comparison:** Two eval results exist (run-1, run-2) → user asks for comparison → before/after scores shown clearly
- **Regression detection:** Metric drops from run-1 to run-2 → highlighted as potential regression
- **Improvement validation:** Metric improves → clear signal that change was beneficial

**Verification:**
- Comparison can be generated from any two eval-result files
- Metrics are accurate (differences match manual calculation)
- TRACKING.md explains how to interpret improvements/regressions
- SKILL.md mentions eval workflow

---

## System-Wide Impact

- **Folder structure:** `evals/build-slides-evals/` is separate from skill implementation, allowing future skill-specific eval folders (`evals/<skill>-evals/`)
- **Prompts persistence:** Prompts stored in `evals/build-slides-evals/prompts/` are version-controlled and reusable across eval runs
- **Results accumulation:** `evals/build-slides-evals/results/` becomes historical record with timestamped run folders and eval-result .md files
- **HTML artifact storage:** Generated slides live in `results/<run-id>/` alongside eval results, enabling easy review and comparison
- **Execution model:** Human-triggered evaluation (no CI automation yet), design accommodates future GitHub Actions integration
- **SKILL.md validation:** Quality improvements now have quantified before/after measurement. Developers can see impact of typography, spacing, interaction changes
- **Integration with quality uplift:** Evals provide measurement system for typography formula (golden ratio), spacing scale, shadows, and interactive polish improvements

## Risks & Dependencies

| Risk | Mitigation |
|------|------------|
| Scoring inconsistency (manual evaluation varies) | Use rubric.md as source of truth, document EVALUATION_GUIDE.md with examples, keep notes field for context |
| Prompt drift (prompts edited between runs) | Store prompts in version control (git), can diff to verify consistency |
| Result files accumulate (git repo bloat) | Monitor results/ folder; document when to archive (e.g., keep recent 30 days in repo) |
| HTML file size growth | Store in run-specific folders (results/<run-id>/) to organize; compress or archive old runs if needed |
| Re-evaluation mistakes (wrong run ID) | Auto-generate run IDs (YYYY-MM-DD-run-N) based on existing runs; make them immutable once created |
| CI/CD integration later is complex | Design evaluation as standalone script (no CI-specific assumptions); GitHub Actions wrapper can be added as future phase |

## Deferred Questions

- **Automated regression detection:** Script that compares eval results and alerts on quality drops. Deferred to phase 2.
- **GitHub Actions CI workflow:** Trigger evals on SKILL.md changes. Deferred to phase 2; design accommodates it.
- **Scorer training:** Automated quality scoring instead of manual. Deferred to phase 2; focus on manual evaluation now.

## Files to Create/Modify

**Create:**
- `evals/build-slides-evals/PROMPTS_FORMAT.md` (spec for prompt storage)
- `evals/build-slides-evals/prompts/example-custom-evals.json` (example prompt set)
- `evals/build-slides-evals/prompts/INDEX.md` (list of available prompt sets)
- `evals/build-slides-evals/RESULTS_FORMAT.md` (spec for result files)
- `evals/build-slides-evals/evaluate.js` (main orchestrator script)
- `evals/build-slides-evals/lib/evaluator.js` (evaluation interface)
- `evals/build-slides-evals/lib/runner.js` (run orchestration and metrics aggregation)
- `evals/build-slides-evals/lib/skill-caller.js` (calls build-slides skill)
- `evals/build-slides-evals/USAGE.md` (how to trigger evaluations)
- `evals/build-slides-evals/EVALUATION_GUIDE.md` (quick scoring reference)
- `evals/build-slides-evals/COMPARISON.md` (how to generate comparison reports)
- `evals/build-slides-evals/TRACKING.md` (how to interpret trends)
- `evals/build-slides-evals/results/` (directory for eval runs — created by script)

**Modify:**
- `evals/build-slides-evals/package.json` (add npm scripts)
- `evals/build-slides-evals/lib/report-generator.js` (refactor for result file generation)
- `build-slides/README.md` (link to eval system)
- `build-slides/SKILL.md` (mention quality validation via evals)

## Next Steps

1. Review plan and approve approach
2. **Unit 1:** Define prompt storage format (PROMPTS_FORMAT.md, example JSON)
3. **Unit 2:** Define results file format (RESULTS_FORMAT.md with run IDs, timestamped structure)
4. **Unit 3:** Build evaluation orchestrator (evaluate.js, runner.js for run management)
5. **Unit 4:** Integrate build-slides skill (skill-caller.js for prompt → HTML generation)
6. **Unit 5:** Define evaluation interface (how you provide scores, EVALUATION_GUIDE.md)
7. **Unit 6:** Generate results files (report-generator.js aggregates scores to .md)
8. **Unit 7:** Add CLI and documentation (npm scripts, USAGE.md)
9. **Unit 8:** Manual comparison reports (COMPARISON.md, TRACKING.md for before/after analysis)

**Future (Phase 2):**
- GitHub Actions workflow to trigger evals on SKILL.md changes
- Automated regression detection (alert if scores drop)
- Trained scorer to replace manual evaluation

