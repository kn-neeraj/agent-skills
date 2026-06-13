# sift CLI Tool

A CLI tool for indexing, browsing, keyword-searching, and semantically searching session summary files from `docs/sessions/`.

## ✅ Phase 3 Complete

- ✅ `sift list` for chronological browsing and JSON output
- ✅ `sift index` for SQLite/FTS indexing
- ✅ `sift embed` for local Ollama-based semantic embeddings
- ✅ `sift search` hybrid retrieval via BM25 + vector search + RRF
- ✅ `sift get` and `sift status` for inspection and health checks
- ✅ Support for both frontmatter and legacy formats
- ✅ Graceful fallback to keyword-only search when embeddings are unavailable

## Installation

```bash
cd tools/sift
npm install
npm run build
npm link
```

## Requirements

- Node.js
- Ollama running locally for semantic search
- `embeddinggemma:latest` pulled in Ollama, or a compatible model configured in `~/.sift/config.yml`

## Usage

### List all sessions
```bash
sift list
```

Output:
```
  2026-06-08  Build Slides Skill Redesign & Implementation
  2026-06-07  Summarise skill creation and opencode installation

  2 sessions
```

### Filter sessions by date
```bash
sift list --since 2026-06-01
```

### Output as JSON
```bash
sift list --json
```

Output:
```json
[
  {
    "date": "2026-06-08",
    "title": "Build Slides Skill Redesign & Implementation",
    "summary": "Complete skill architecture redesign...",
    "filename": "2026-06-06-build-slides-skill-redesign.md"
  }
]
```

### Combine filters
```bash
sift list --since 2026-06-01 --json
```

### Index sessions into SQLite
```bash
sift index
```

### Build or refresh embeddings
```bash
sift embed
```

### Force a full embedding rebuild
```bash
sift embed --force
```

### Hybrid search
```bash
sift search "opencode slash command"
```

### Inspect index and embedding health
```bash
sift status
```

## Development

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Watch mode
npm run dev
```

## Session Formats

### Frontmatter Format (New)
```markdown
---
date: 2026-06-08
title: Session Title
short_summary: Session summary
---
Session content goes here...
```

### Legacy Format (Old)
```markdown
# Title: Session Title

Session content goes here...
```

## Features

- **Dual format support**: Handles both YAML frontmatter and legacy title-line formats
- **Date filtering**: Filter sessions by date using `--since` flag
- **JSON output**: Machine-readable output for automation
- **SQLite indexing**: Stores session metadata and bodies in `~/.sift/index.sqlite`
- **Keyword search**: Uses SQLite FTS5 with BM25 ranking
- **Semantic search**: Uses Ollama embeddings + `sqlite-vec` chunk retrieval
- **Hybrid ranking**: Fuses BM25 and vector candidates with Reciprocal Rank Fusion
- **Deterministic chunking**: Splits session bodies by headings/paragraphs with stable chunk IDs
- **Error handling**: Graceful handling of missing fields, invalid dates, and file read errors
- **Graceful fallback**: If embeddings are unavailable or stale, search falls back to keyword-only mode with a warning

## Error Handling

- Invalid dates: Clear error message with format example
- Missing fields: Warnings with default values
- File read errors: Logged and skipped
- Empty directory: Shows "No sessions found"
- Embedding provider unavailable: warns and uses keyword search only
- Model/config mismatch: warns and uses keyword search only until `sift embed --force`

## Project Structure

```
tools/sift/
├── bin/sift              # Executable entry point
├── src/
│   ├── cli/              # CLI commands
│   │   ├── index.ts      # Main CLI entry
│   │   ├── list-command.ts
│   │   ├── index-command.ts
│   │   ├── embed-command.ts
│   │   ├── search-command.ts
│   │   ├── get-command.ts
│   │   └── status-command.ts
│   ├── lib/              # Core functionality
│   │   ├── chunking.ts
│   │   ├── config.ts
│   │   ├── file-operations.ts
│   │   ├── format-detector.ts
│   │   ├── database/
│   │   ├── embeddings/
│   │   ├── parsers/
│   │   ├── filters/
│   │   ├── formatters/
│   │   └── search/
│   └── types/            # TypeScript types
│       ├── session.ts
│       └── embedding.ts
├── test/                 # Test files
├── dist/                 # Compiled JavaScript
├── package.json
├── tsconfig.json
└── README.md
```

## Semantic Search Config

`sift` reads embeddings config from `~/.sift/config.yml`. If the file is missing, it uses defaults:

```yaml
embeddings:
  provider: ollama
  model: embeddinggemma:latest
  url: http://localhost:11434
```

## Current Limitations

- Legacy-format sessions still produce weaker semantic metadata than frontmatter sessions
- Phase 3 only implements and tests Ollama, though the config shape leaves room for future providers
- `sift index` and `sift embed` are still separate commands; automatic `/summarise` integration is a later step

## License

MIT
