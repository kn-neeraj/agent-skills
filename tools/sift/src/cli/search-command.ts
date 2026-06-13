import { Command } from 'commander';
import { getDatabase } from '../lib/database/connection';
import { runHybridSearch } from '../lib/search/hybrid-search';

function formatMode(mode: 'hybrid' | 'keyword-only'): string {
  return mode === 'hybrid' ? 'hybrid (BM25 + vector)' : 'keyword-only (BM25 only)';
}

export function createSearchCommand(): Command {
  const command = new Command('search')
    .description('Search sessions using full-text search')
    .argument('<query>', 'Search query')
    .option('--since <date>', 'Filter sessions from this date onwards (YYYY-MM-DD)')
    .option('--limit <n>', 'Maximum number of results', '5')
    .option('--debug', 'Show search diagnostics and contribution data')
    .action(async (query, options) => {
      try {
        if (!query || query.trim() === '') {
          console.error('Search query cannot be empty');
          process.exit(1);
        }

        const limit = parseInt(options.limit, 10);

        if (isNaN(limit) || limit < 1) {
          console.error('Limit must be a positive integer');
          process.exit(1);
        }

        const db = getDatabase();
        const { results, warning, metadata } = await runHybridSearch(db, query, options.since, limit);

        console.log(`Query: ${query}`);
        console.log(`Mode: ${formatMode(metadata.mode)}`);
        console.log('');

        if (results.length === 0) {
          if (warning) {
            console.warn(warning);
          }

          if (options.debug) {
            console.log(`Debug: bm25_candidates=${metadata.debug.bm25CandidateCount} vector_candidates=${metadata.debug.vectorCandidateCount}`);
            if (metadata.debug.fallbackReason) {
              console.log(`Debug: fallback_reason=${metadata.debug.fallbackReason}`);
            }
          }

          console.log('No results found');
          return;
        }

        if (warning) {
          console.warn(warning);
        }

        for (const result of results) {
          const date = result.date || 'Unknown Date';
          console.log(`rank: ${result.rank}  ${date}  ${result.title}`);
          console.log(`  ${result.short_summary}`);
          console.log('');
        }

        if (options.debug) {
          console.log(`Debug: bm25_candidates=${metadata.debug.bm25CandidateCount} vector_candidates=${metadata.debug.vectorCandidateCount}`);
          if (metadata.debug.fallbackReason) {
            console.log(`Debug: fallback_reason=${metadata.debug.fallbackReason}`);
          }
          console.log('Debug contributions:');
          for (const contribution of metadata.debug.contributions.slice(0, results.length)) {
            console.log(
              `  ${contribution.slug}  bm25_rank=${contribution.bm25Rank ?? '-'}  vector_rank=${contribution.vectorRank ?? '-'}  rrf_score=${contribution.rrfScore.toFixed(6)}`
            );
            if (contribution.bestChunkId) {
              console.log(`    best_chunk=${contribution.bestChunkId}  vector_distance=${contribution.vectorDistance?.toFixed(6) ?? '-'}`);
            }
            if (contribution.bestChunkPreview) {
              console.log(`    chunk_preview=${contribution.bestChunkPreview}`);
            }
          }
          console.log('');
        }

        console.log(`${results.length} result${results.length !== 1 ? 's' : ''}`);

      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
          process.exit(1);
        }
        console.error('An unexpected error occurred');
        process.exit(1);
      }
    });

  return command;
}
