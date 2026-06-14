---
date: 2026-06-14
title: Sift Phase 3 and session memory workflow
files_touched: [tools/sift/*, summarise/SKILL.md, summarise/README.md, summarise/hook-example.md, docs/plans/2026-06-14-001-global-session-memory-instruction-rollout.md, ~/.codex/AGENTS.md, ~/.sift/config.yml]
short_summary: Implemented Phase 3 for sift with Ollama embeddings, sqlite-vec storage, hybrid BM25 plus vector search, deterministic chunking, and debug metadata including query, mode, ranks, best chunk, and chunk preview. Installed and aligned the local embedding config to embeddinggemma:latest at the default Ollama endpoint, then verified index, embed, status, and hybrid search flows. Added a global Codex session-memory instruction block and documented that /summarise must run sift index && sift embed as mandatory post-processing. Created a repo plan for rolling the same instruction model out to global Codex and Claude instruction files.
---

# Session Summary — 2026-06-14

## Detailed Summary
This session focused on turning the session-memory system into an end-to-end workflow rather than a loose collection of skills and docs. The first part of the work was on `sift` itself: the existing Phase 2 SQLite and BM25 implementation was extended to Phase 3 with local Ollama embeddings, chunk-based vector retrieval, and hybrid search fused with Reciprocal Rank Fusion. The implementation added config loading from `~/.sift/config.yml`, sqlite-vec integration, deterministic heading-first chunking with a stable character-budget heuristic, a new `sift embed` command, hybrid search fallback behavior, and richer `sift status` reporting. The search output was then improved again to show query and search mode by default, with `--debug` exposing BM25 and vector candidate counts, per-result contribution ranks, best matching chunk ids, vector distances, and chunk previews so an agent can understand why a session surfaced.

The session also covered environment alignment and verification. The active local embedding config was corrected to use the installed Ollama model `embeddinggemma:latest` at `http://localhost:11434`, and the actual CLI behavior was verified with `sift index`, `sift embed`, `sift status`, and multiple `sift search` runs. This confirmed that the vector extension loads, embeddings are stored for all four existing summaries, and hybrid retrieval works with semantic evidence exposed in debug output. A stale global `npm link` artifact was also refreshed so the plain `sift` command picked up the new CLI behavior instead of only the local `dist` entrypoint.

The second part of the session moved from retrieval implementation to agent discovery and workflow automation. We read the existing skills, session summaries, and plan documents, then discussed the installation and discovery problem structurally: agents need to know the commands exist, they need a deterministic end-of-session hook, and they need clear guidance for when to use broad context restore versus targeted retrieval. A repo plan was created in `docs/plans/2026-06-14-001-global-session-memory-instruction-rollout.md` to track rollout of global instruction files. The global Codex instruction file `~/.codex/AGENTS.md` was then extended with a concise session-memory block telling Codex about `/summarise`, `/read-sessions-summary`, `sift search`, `sift get`, `sift list`, and `sift status`, and making `/summarise` followed by `sift index && sift embed` mandatory at session end.

Finally, the `/summarise` skill itself was updated at the repo level so the documented command behavior now includes mandatory post-processing with `sift index && sift embed`. The skill definition, README, and hook examples were updated to say that if summary writing succeeds but indexing or embedding fails, the agent must report that session-memory processing is incomplete. This tightened the system from “write a markdown file and maybe remember to index later” into “write, index, embed, and surface failures explicitly.” The only rollout work intentionally left incomplete was creating the matching global Claude instruction file and deciding whether repo-local `AGENTS.md` or `CLAUDE.md` files should later be added on top of the global machine-level instructions.

## Open Questions
- Create and validate the matching global Claude instruction file at `~/.claude/CLAUDE.md` using the same concise session-memory block as Codex.
- Decide whether any repo-local `AGENTS.md` or `CLAUDE.md` files are still needed once the global instruction files are in place.
- Decide whether `sift index` should remain separate from `sift embed`, or whether a later phase should combine them operationally for even simpler onboarding.

## Decisions Made
- Use local Ollama with `embeddinggemma:latest` as the Phase 3 embedding model and set `~/.sift/config.yml` to the default local endpoint — this matched the actual installed model and removed config mismatch noise.
- Keep `sift search` output compact by default, but expose contribution details under `--debug` — this preserves usability while giving enough observability to inspect hybrid ranking behavior.
- Make end-of-session session-memory post-processing mandatory: `/summarise` must be followed by `sift index && sift embed` — this avoids summaries being written but never entering the searchable memory system.
- Start global instruction rollout with Codex first by extending `~/.codex/AGENTS.md` — Codex already had a verified global instruction file, making it the safest first integration point.
- Use concise operational wording in the global instruction block instead of long documentation-style prose — global instruction files should act like a runbook, not a README.
