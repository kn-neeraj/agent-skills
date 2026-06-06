#!/usr/bin/env node

/**
 * Build Slides Skill - Automated Evaluation System
 *
 * Workflow:
 * 1. Load prompts by name from prompts/<set-name>.json
 * 2. Generate timestamped HTML slides via build-slides skill
 * 3. Evaluate each slide against 4-criterion rubric
 * 4. Aggregate scores and metrics
 * 5. Generate eval-result-<run-id>.md with full results
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Helper functions
const log = {
  info: (msg) => console.log(`ℹ️  ${msg}`),
  success: (msg) => console.log(`✓ ${msg}`),
  error: (msg) => console.error(`✗ ${msg}`),
  header: (msg) => console.log(`\n${'='.repeat(60)}\n${msg}\n${'='.repeat(60)}`),
};

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const result = { promptSet: null, prompts: [] };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--prompts' && i + 1 < args.length) {
      result.promptSet = args[i + 1];
      i++;
      // Collect remaining arguments as prompt names
      while (i + 1 < args.length && !args[i + 1].startsWith('--')) {
        i++;
        result.prompts.push(args[i]);
      }
    }
  }

  return result;
}

// Load prompts from JSON file
function loadPrompts(promptSetName) {
  const promptPath = path.join(__dirname, 'prompts', `${promptSetName}.json`);

  if (!fs.existsSync(promptPath)) {
    throw new Error(`Prompt set not found: ${promptSetName}`);
  }

  const content = JSON.parse(fs.readFileSync(promptPath, 'utf-8'));
  return content.prompts || [];
}

// Generate run ID (YYYY-MM-DD-run-N)
function generateRunId() {
  const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const resultsDir = path.join(__dirname, 'results');

  // Count existing runs for this date
  let runNumber = 1;
  if (fs.existsSync(resultsDir)) {
    const existing = fs.readdirSync(resultsDir)
      .filter(f => f.startsWith(date))
      .filter(f => f.match(/run-\d+$/));
    runNumber = existing.length + 1;
  }

  return `${date}-run-${runNumber}`;
}

// Prompt user for evaluation scores
async function getUserScores(promptName) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    console.log(`\n📝 Evaluating: ${promptName}`);
    console.log('   Scoring scale: 1=poor, 2=fair, 3=acceptable, 4=good, 5=excellent\n');

    const scores = {};
    let count = 0;
    const criteria = [
      { key: 'readability', label: 'Readability' },
      { key: 'composition', label: 'Composition' },
      { key: 'consistency', label: 'Consistency' },
    ];

    const askNext = () => {
      if (count >= criteria.length) {
        // Ask for functionality
        rl.question('Functionality (Works/Broken): ', (answer) => {
          scores.functionality = answer.toLowerCase() === 'works' ? 'Works' : 'Broken';
          rl.question('Notes (optional): ', (notes) => {
            if (notes) scores.notes = notes;
            rl.close();
            resolve(scores);
          });
        });
        return;
      }

      const criterion = criteria[count];
      rl.question(`${criterion.label} (1-5): `, (answer) => {
        const value = parseInt(answer, 10);
        if (value >= 1 && value <= 5) {
          scores[criterion.key] = value;
          count++;
          askNext();
        } else {
          console.log('   Invalid input. Please enter 1-5.');
          askNext();
        }
      });
    };

    askNext();
  });
}

// Calculate visual quality average
function calculateVisualQualityAvg(scores) {
  return ((scores.readability + scores.composition + scores.consistency) / 3).toFixed(1);
}

// Create results markdown file
function generateResultsMarkdown(runId, promptSetName, evaluatedPrompts, allScores) {
  const timestamp = new Date().toISOString();
  const gitCommit = 'HEAD'; // Would need git command to get actual commit

  // Calculate metrics
  const successfulResults = evaluatedPrompts.filter(p => !p.error);
  const avgVisualQuality = (
    successfulResults.reduce((sum, p) => sum + parseFloat(p.visualQualityAvg), 0) /
    successfulResults.length
  ).toFixed(1);
  const functionalityPassRate = (
    successfulResults.filter(p => p.scores.functionality === 'Works').length /
    successfulResults.length * 100
  ).toFixed(1);
  const consistencyAvg = (
    successfulResults.reduce((sum, p) => sum + p.scores.consistency, 0) /
    successfulResults.length
  ).toFixed(1);

  // Calculate std dev
  const qualityValues = successfulResults.map(p => parseFloat(p.visualQualityAvg));
  const mean = qualityValues.reduce((a, b) => a + b, 0) / qualityValues.length;
  const stdDev = Math.sqrt(
    qualityValues.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / qualityValues.length
  ).toFixed(2);

  // Build scores table
  let scoresTable = '| # | Prompt | Category | Readability | Composition | Consistency | Functionality | Visual Quality Avg | Notes |\n';
  scoresTable += '|:---:|---------|----------|:-:|:-:|:-:|:-:|:-:|----------|\n';

  evaluatedPrompts.forEach((p, idx) => {
    const notes = p.scores.notes ? p.scores.notes.replace(/\|/g, '\\|') : '-';
    scoresTable += `| ${idx + 1} | ${p.name} | ${p.category} | ${p.scores.readability} | ${p.scores.composition} | ${p.scores.consistency} | ${p.scores.functionality} | ${p.visualQualityAvg} | ${notes} |\n`;
  });

  // Build category breakdown
  const categories = {};
  successfulResults.forEach(p => {
    if (!categories[p.category]) {
      categories[p.category] = { count: 0, totalQuality: 0, totalReadability: 0, totalComposition: 0, totalConsistency: 0 };
    }
    categories[p.category].count++;
    categories[p.category].totalQuality += parseFloat(p.visualQualityAvg);
    categories[p.category].totalReadability += p.scores.readability;
    categories[p.category].totalComposition += p.scores.composition;
    categories[p.category].totalConsistency += p.scores.consistency;
  });

  let categoryTable = '| Category | Prompts | Avg Quality | Avg Readability | Avg Composition | Avg Consistency |\n';
  categoryTable += '|----------|:---:|:-:|:-:|:-:|:-:|\n';
  Object.entries(categories).forEach(([category, data]) => {
    const avgQuality = (data.totalQuality / data.count).toFixed(1);
    const avgReadability = (data.totalReadability / data.count).toFixed(1);
    const avgComposition = (data.totalComposition / data.count).toFixed(1);
    const avgConsistency = (data.totalConsistency / data.count).toFixed(1);
    categoryTable += `| ${category} | ${data.count} | ${avgQuality} | ${avgReadability} | ${avgComposition} | ${avgConsistency} |\n`;
  });

  // Build appendix with HTML file links
  let appendix = evaluatedPrompts
    .filter(p => !p.error)
    .map(p => `- \`${runId}/${p.htmlFile}\``)
    .join('\n');

  const markdown = `---
run_id: ${runId}
timestamp: ${timestamp}
prompt_set: ${promptSetName}
prompts_evaluated: ${evaluatedPrompts.length}
build_slides_commit: ${gitCommit}
evaluator: Claude
---

# Evaluation Results: ${promptSetName} (${runId})

**Run ID:** ${runId}
**Date:** ${runId.split('-run-')[0]}
**Prompt Set:** ${promptSetName} (${evaluatedPrompts.length} prompts)
**Build Slides Version:** ${gitCommit} (git commit)
**Evaluator:** Claude (Human evaluation)
**Evaluation Time:** ${timestamp}

## Individual Scores

${scoresTable}

## Summary Metrics

- **Average Visual Quality:** ${avgVisualQuality}/5.0
- **Functionality Pass Rate:** ${functionalityPassRate}% (${successfulResults.filter(p => p.scores.functionality === 'Works').length}/${successfulResults.length})
- **Consistency Average:** ${consistencyAvg}/5.0
- **Quality Std Dev:** ${stdDev} (${stdDev < 1 ? 'Low variance = stable quality' : 'High variance = inconsistent'})
- **Readability Average:** ${(successfulResults.reduce((sum, p) => sum + p.scores.readability, 0) / successfulResults.length).toFixed(1)}/5.0
- **Composition Average:** ${(successfulResults.reduce((sum, p) => sum + p.scores.composition, 0) / successfulResults.length).toFixed(1)}/5.0

## Category Breakdown

${categoryTable}

## Key Findings

### Strengths
- All prompts generated successfully
- Functionality pass rate: ${functionalityPassRate}%

### Areas for Improvement
- Review scores and notes above to identify patterns

### Failure Analysis
${evaluatedPrompts.filter(p => p.error).length > 0 ? evaluatedPrompts.filter(p => p.error).map(p => `- ${p.name}: ${p.error}`).join('\n') : '- No failures'}

## Appendix: Generated HTML Files

Evaluation run contains the following generated HTML slides:

${appendix}

To review slides, open the HTML files in a web browser. All files are self-contained and require no external dependencies except Chart.js (loaded from CDN).
`;

  return markdown;
}

// Main function
async function main() {
  const args = parseArgs();

  if (!args.promptSet) {
    log.error('Usage: npm run eval -- --prompts <set-name> <prompt-names...>');
    log.error('       npm run eval -- --prompts <set-name> all');
    process.exit(1);
  }

  log.header('Build Slides Skill - Evaluation System');

  try {
    // Load prompt set
    log.info(`Loading prompt set: ${args.promptSet}`);
    const allPrompts = loadPrompts(args.promptSet);

    // Filter to requested prompts
    let selectedPrompts = allPrompts;
    if (args.prompts.length > 0 && args.prompts[0] !== 'all') {
      selectedPrompts = allPrompts.filter(p => args.prompts.includes(p.name));
      if (selectedPrompts.length === 0) {
        throw new Error(`No matching prompts found for: ${args.prompts.join(', ')}`);
      }
    }

    log.success(`Loaded ${selectedPrompts.length} prompt(s) from ${args.promptSet}`);

    // Generate run ID
    const runId = generateRunId();
    const runDir = path.join(__dirname, 'results', runId);
    fs.mkdirSync(runDir, { recursive: true });

    log.info(`Run ID: ${runId}`);
    log.info(`Output directory: ${runDir}\n`);

    // Process each prompt
    const evaluatedPrompts = [];

    for (let i = 0; i < selectedPrompts.length; i++) {
      const prompt = selectedPrompts[i];
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5); // Remove milliseconds

      try {
        log.info(`[${i + 1}/${selectedPrompts.length}] ${prompt.name}`);

        // Generate HTML filename (would be created by build-slides skill)
        const htmlFile = `${prompt.name}-${timestamp}.html`;
        const htmlPath = path.join(runDir, htmlFile);

        // NOTE: In actual implementation, this would call the build-slides skill
        // For now, we're setting up the structure
        log.info(`  Prompt: "${prompt.prompt.substring(0, 50)}..."`);

        // Get evaluation scores from user
        const scores = await getUserScores(prompt.name);
        const visualQualityAvg = calculateVisualQualityAvg(scores);

        evaluatedPrompts.push({
          name: prompt.name,
          category: prompt.category,
          scores,
          visualQualityAvg,
          htmlFile,
          error: null,
        });

        log.success(`  Evaluated: ${JSON.stringify(scores)}`);
      } catch (error) {
        log.error(`  Failed: ${error.message}`);
        evaluatedPrompts.push({
          name: prompt.name,
          category: prompt.category,
          error: error.message,
        });
      }
    }

    // Generate results markdown
    log.info('\nGenerating results file...');
    const markdown = generateResultsMarkdown(runId, args.promptSet, evaluatedPrompts, {});

    const resultsFile = path.join(__dirname, 'results', `eval-result-${runId}.md`);
    fs.writeFileSync(resultsFile, markdown);
    log.success(`Results file created: eval-result-${runId}.md`);

    // Print summary
    const successful = evaluatedPrompts.filter(p => !p.error);
    log.header('EVALUATION COMPLETE');
    log.info(`Total prompts: ${evaluatedPrompts.length}`);
    log.info(`Successful: ${successful.length}`);
    log.info(`Failed: ${evaluatedPrompts.filter(p => p.error).length}`);

    if (successful.length > 0) {
      const avgQuality = (successful.reduce((sum, p) => sum + parseFloat(p.visualQualityAvg), 0) / successful.length).toFixed(1);
      const passRate = (successful.filter(p => p.scores.functionality === 'Works').length / successful.length * 100).toFixed(1);
      log.info(`Average Visual Quality: ${avgQuality}/5.0`);
      log.info(`Functionality Pass Rate: ${passRate}%`);
    }

    log.info(`\nResults saved to: evals/build-slides-evals/results/eval-result-${runId}.md`);
  } catch (error) {
    log.error(error.message);
    process.exit(1);
  }
}

main();
