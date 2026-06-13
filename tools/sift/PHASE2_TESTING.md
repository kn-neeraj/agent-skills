# Phase 2 Testing Guide

## ✅ Implementation Status

Phase 2 is **fully implemented and manually tested**. All acceptance criteria pass:

1. ✅ Fresh directory indexing: `sift index` → 3 sessions indexed
2. ✅ Idempotent reindexing: `sift index` → 0 indexed, 0 updated, 3 skipped
3. ✅ Change detection: Hash comparison working
4. ✅ Search relevance: `sift search "opencode slash command"` ranks correctly
5. ✅ Search filtering: `--since` and `--limit` working
6. ✅ Database reconstruction: Delete and rebuild works

## 🧪 Manual Testing Commands

### 1. Indexing Tests
```bash
# Fresh index
rm -f ~/.sift/index.sqlite
sift index
# Expected: "Indexed N sessions, Updated 0 sessions, Skipped 0 sessions"

# Idempotent reindex
sift index
# Expected: "Indexed 0 sessions, Updated 0 sessions, Skipped N sessions"

# Status check
sift status
# Expected: Shows file count, session count, and "All files indexed ✅"
```

### 2. Search Tests
```bash
# Basic search
sift search "opencode"
# Expected: Results with BM25 scores

# Search with date filtering
sift search "opencode" --since 2026-06-08
# Expected: Only sessions on/after 2026-06-08

# Search with limit
sift search "opencode" --limit 2
# Expected: Max 2 results

# Combined filtering
sift search "JWT" --since 2026-06-01 --limit 3
# Expected: Max 3 results with date >= 2026-06-01
```

### 3. Retrieve Tests
```bash
# Get specific session
sift get session_summary_2026-06-07-summarise-skill-and-opencode-installation
# Expected: Full session record with all fields
```

### 4. Database Tests
```bash
# Check database exists
ls -lh ~/.sift/index.sqlite

# Reconstruct database
rm -f ~/.sift/index.sqlite
sift index
# Expected: Identical state to before deletion

# Test with no sessions
mv docs/sessions docs/sessions.backup
sift status
# Expected: Shows 0 files, "3 files not indexed"
mv docs/sessions.backup docs/sessions
sift index
# Expected: Reindexes all sessions
```

## 🧪 Automated Tests

```bash
# Run all tests
cd tools/sift
npm test

# Run specific test file
npm test hash.test.ts

# Run with coverage
npm test -- --coverage

# Run in watch mode
npm test -- --watch
```

### Test Coverage
- ✅ Hash utility (SHA256)
- ✅ Database schema initialization
- ✅ Database connection management  
- ✅ Database parser (session parsing)
- ✅ All CLI commands (index, search, get, status, list)

## 🎯 Acceptance Criteria Verification

### Test 1: Fresh Directory Indexing
```bash
rm -f ~/.sift/index.sqlite
sift index
sift status
```
**Expected**: Files on disk = Sessions indexed = 3, Status: All files indexed ✅

### Test 2: Idempotent Reindexing  
```bash
sift index
```
**Expected**: 0 indexed, 0 updated, 3 skipped

### Test 3: Change Detection
```bash
# Edit a session file
echo "# Modified" >> docs/sessions/session_summary_2026-06-09-sift-cli-phase1-implementation.md
sift index
# Expected: 0 indexed, 1 updated, 2 skipped
sift get session_summary_2026-06-09-sift-cli-phase1-implementation
# Expected: Shows modified content
```

### Test 4: Search Relevance
```bash
sift search "opencode slash command"
```
**Expected**: "Summarise skill creation and opencode installation" ranked first (lowest score)

### Test 5: Search Filtering
```bash
sift search "JWT" --since 2026-06-01 --limit 3
```
**Expected**: Max 3 results, all with date >= 2026-06-01

### Test 6: Database Reconstruction
```bash
rm -f ~/.sift/index.sqlite
sift index
sift status
```
**Expected**: Same state as before deletion (3 files, 3 sessions indexed)

## 🔍 Debugging Tips

### Check Database Content
```bash
# Open database with sqlite3
sqlite3 ~/.sift/index.sqlite

# View all sessions
SELECT slug, date, title FROM sessions;

# View search index
SELECT title, short_summary FROM sessions_fts LIMIT 5;

# Search manually
SELECT title, bm25(sessions_fts, 3.0, 2.0, 1.5, 1.0) as score
FROM sessions_fts
WHERE sessions_fts MATCH 'opencode'
ORDER BY score ASC;

.exit
```

### Check Hash Values
```bash
# View hashes in database
sqlite3 ~/.sift/index.sqlite "SELECT slug, hash FROM sessions LIMIT 3;"
```

### Verify FTS5 Index
```bash
sqlite3 ~/.sift/index.sqlite "SELECT COUNT(*) FROM sessions_fts;"
# Should match sessions count
```

## 📊 Performance Testing

```bash
# Index performance (should be < 2s for 3 files)
time sift index

# Search performance (should be < 500ms)
time sift search "opencode"

# Database size check
du -h ~/.sift/index.sqlite
```

## 🚨 Common Issues

### Issue: "SQLite3 can only bind numbers, strings..."
**Solution**: Ensure all database values are properly typed (strings, numbers, null)

### Issue: "Sessions directory not found"
**Solution**: Run from workspace root where `docs/sessions/` exists

### Issue: Search returns no results
**Solution**: 
1. Check if `sift index` has been run
2. Verify FTS5 table has content: `sqlite3 ~/.sift/index.sqlite "SELECT COUNT(*) FROM sessions_fts;"`

### Issue: Database doesn't create
**Solution**: Check `~/.sift/` directory permissions

## 📈 Success Metrics

- ✅ All 4 commands functional
- ✅ Search < 500ms for 3 sessions
- ✅ Indexing < 2s for 3 sessions  
- ✅ Database size < 1MB for 3 sessions
- ✅ All acceptance criteria pass
- ✅ BM25 ranking produces relevant results

## 🎉 Phase 2 Complete!

The sift CLI now supports full-text search with:
- SQLite FTS5 + BM25 ranking
- Incremental indexing via SHA252 hashes
- Date filtering and result limiting
- Automatic database initialization
- Comprehensive session retrieval

Ready for production use! 🚀