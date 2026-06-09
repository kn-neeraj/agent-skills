# sift CLI Tool

A lightweight CLI tool for listing and filtering session summary files from `docs/sessions/`.

## ✅ Phase 1 Complete

- ✅ `sift list` command with date filtering and JSON output
- ✅ Support for both frontmatter and legacy formats
- ✅ Comprehensive test suite (77% coverage)
- ✅ Global CLI installation via npm link
- ✅ Graceful error handling

## Installation

```bash
cd tools/sift
npm install
npm run build
npm link
```

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
- **Error handling**: Graceful handling of missing fields, invalid dates, and file read errors
- **Comprehensive tests**: 36 tests with 77% coverage

## Error Handling

- Invalid dates: Clear error message with format example
- Missing fields: Warnings with default values
- File read errors: Logged and skipped
- Empty directory: Shows "No sessions found"

## Project Structure

```
tools/sift/
├── bin/sift              # Executable entry point
├── src/
│   ├── cli/              # CLI commands
│   │   ├── index.ts      # Main CLI entry
│   │   └── list-command.ts # List command implementation
│   ├── lib/              # Core functionality
│   │   ├── file-operations.ts  # File system operations
│   │   ├── format-detector.ts  # Format detection
│   │   ├── parsers/            # Session parsers
│   │   │   ├── frontmatter-parser.ts
│   │   │   └── legacy-parser.ts
│   │   ├── filters/            # Data filters
│   │   │   └── date-filter.ts
│   │   └── formatters/         # Output formatters
│   │       ├── console-formatter.ts
│   │       └── json-formatter.ts
│   └── types/            # TypeScript types
│       └── session.ts
├── test/                 # Test files
├── dist/                 # Compiled JavaScript
├── package.json
├── tsconfig.json
└── README.md
```

## Next Steps (Phase 2)

- SQLite database integration
- BM25 full-text search
- Additional filtering options
- Session inspection command

## License

MIT