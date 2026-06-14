---
title: Global Session Memory Instruction Rollout
type: feat
status: proposed
date: 2026-06-14
origin: conversation
---

# Global Session Memory Instruction Rollout

## Summary

Create a repo-tracked plan document that defines the global instruction rollout for Codex and Claude, then execute that rollout by updating the machine-level instruction files:

- Codex: `~/.codex/AGENTS.md`
- Claude: `~/.claude/CLAUDE.md`

The goal is to make session-memory tooling discoverable and mandatory across projects: agents should know `/summarise`, `/read-sessions-summary`, and `sift` exist; they should automatically summarize on session end; and `/summarise` should treat `sift index && sift embed` as required post-processing.

## Key Changes

### 1. Create a repo plan file

Add a new plan under `docs/plans/` describing:

- target global files
- intended instruction text
- rollout order
- validation steps

This plan file becomes the source of truth before making the machine-level edits.

### 2. Global Codex instructions

Extend `~/.codex/AGENTS.md` with a session-memory block that:

- tells the agent persistent session memory exists in `docs/sessions/`
- advertises `/summarise`, `/read-sessions-summary`, `sift search`, `sift get`, and `sift status`
- instructs the agent to use session-memory tools when resuming prior work or answering “what did we do / decide”
- instructs the agent to run `/summarise` automatically when the user clearly ends a session
- states that post-summary indexing/embedding is mandatory

### 3. Global Claude instructions

Create `~/.claude/CLAUDE.md` with the same semantic guidance as Codex, adapted to Claude wording.

Keep it aligned with the Codex instruction block so both environments behave consistently.

### 4. Instruction content to standardize

#### Discovery

- session summaries live in `docs/sessions/`
- `/summarise` creates them
- `/read-sessions-summary` restores broad prior context
- `sift` provides targeted retrieval and health checks

#### Read workflow

- prefer `/read-sessions-summary` for broad context restore
- use `sift search` and `sift get` for targeted lookup/debugging
- use `sift status` when checking whether indexing/embedding is healthy

#### Session-end workflow

- if the user signals the end of a session, run `/summarise`
- after the summary is written, run `sift index && sift embed`
- treat the indexing/embedding step as part of the required workflow, not an optional extra

#### Failure behavior

- if `/summarise` succeeds but `sift` fails, surface that clearly as incomplete session-memory processing
- do not silently skip the post-summary indexing/embedding step

## Public Interfaces / Important Additions

### New repo artifact

- a plan doc in `docs/plans/` for global session-memory instruction rollout

### New or updated global instruction files

- `~/.codex/AGENTS.md`
- `~/.claude/CLAUDE.md`

### Required workflow statement to encode in those files

- `/summarise` -> `sift index && sift embed`

## Test Plan

### Instruction file validation

- Confirm `~/.codex/AGENTS.md` contains the new session-memory block without clobbering existing global instructions
- Confirm `~/.claude/CLAUDE.md` exists and contains the matching guidance

### Behavioral validation

- In a fresh Codex session, verify the agent can reference `/summarise`, `/read-sessions-summary`, and `sift` without repo-local prompting
- In a fresh Claude session, verify the same discovery behavior from `~/.claude/CLAUDE.md`

### Workflow validation

- Simulate a session-end request and verify the documented expected chain is:
  1. `/summarise`
  2. `sift index`
  3. `sift embed`

### Consistency validation

- Compare Codex and Claude instruction text to ensure they do not diverge on:
  - when to summarize
  - when to use `/read-sessions-summary`
  - whether `sift index && sift embed` is mandatory

## Assumptions

- `~/.codex/AGENTS.md` is the correct global Codex instruction surface on this machine.
- `~/.claude/CLAUDE.md` is the desired new global Claude instruction surface, even though it does not exist yet.
- The global instruction files should focus on session-memory workflow and discovery, not full installation/bootstrap commands.
- For prior-context restoration, the default recommendation will be:
  - broad restore -> `/read-sessions-summary`
  - targeted lookup -> `sift search` + `sift get`
- `/summarise` post-processing is intentionally mandatory, not best-effort.
