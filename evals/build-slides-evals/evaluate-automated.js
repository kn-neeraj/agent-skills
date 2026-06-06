#!/usr/bin/env node

/**
 * Build Slides Skill - Automated Evaluation Pipeline
 *
 * Complete workflow:
 * 1. Accept a prompt (or load from prompt set)
 * 2. Generate HTML slides using build-slides skill
 * 3. Automatically evaluate against the rubric
 * 4. Append results to master EVALUATIONS.md report
 *
 * Usage:
 *   npm run eval:auto -- --prompt "Your prompt text here"
 *   npm run eval:auto -- --prompts custom-evals mcp-connector-ecosystem
 */

const fs = require('fs');
const path = require('path');
const { generateSlidesHTML } = require('./lib/skill-caller');
const { autoEvaluate } = require('./lib/auto-evaluator');
const { initializeReport, addEvaluation, getNextEvaluationNumber, generateSummary } = require(
  './lib/consolidated-reporter'
);
const { getProvider, getModel } = require('./lib/config-loader');

const RESULTS_DIR = path.join(__dirname, 'results');
const EVALUATIONS_REPORT = path.join(RESULTS_DIR, 'EVALUATIONS.md');

// Helper functions
const log = {
  info: (msg) => console.log(`ℹ️  ${msg}`),
  success: (msg) => console.log(`✓ ${msg}`),
  error: (msg) => console.error(`✗ ${msg}`),
  header: (msg) => console.log(`\n${'='.repeat(70)}\n${msg}\n${'='.repeat(70)}\n`),
};

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const result = { prompt: null, promptSet: null, promptName: null };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--prompt' && i + 1 < args.length) {
      result.prompt = args[i + 1];
      i++;
    } else if (args[i] === '--prompts' && i + 2 < args.length) {
      result.promptSet = args[i + 1];
      result.promptName = args[i + 2];
      i += 2;
    }
  }

  return result;
}

// Load prompt from JSON file
function loadPromptFromSet(promptSet, promptName) {
  const promptPath = path.join(__dirname, 'prompts', `${promptSet}.json`);

  if (!fs.existsSync(promptPath)) {
    throw new Error(`Prompt set not found: ${promptSet}`);
  }

  const content = JSON.parse(fs.readFileSync(promptPath, 'utf-8'));
  const prompts = content.prompts || [];
  const prompt = prompts.find(p => p.name === promptName);

  if (!prompt) {
    throw new Error(`Prompt not found: ${promptName} in ${promptSet}`);
  }

  return prompt;
}

// Main function
async function main() {
  const args = parseArgs();

  log.header('Build Slides Skill - Automated Evaluation Pipeline');

  try {
    // Show configuration
    const provider = getProvider();
    const model = getModel();
    log.info(`Using ${provider} • Model: ${model}\n`);

    // Validate input
    if (!args.prompt && !args.promptSet) {
      log.error('Usage:');
      log.info('  npm run eval:auto -- --prompt "Your prompt text"');
      log.info('  npm run eval:auto -- --prompts <set-name> <prompt-name>');
      log.info('\nFirst time? Run: npm run eval:setup');
      process.exit(1);
    }

    // Get prompt data
    let promptText, promptName, promptData;

    if (args.prompt) {
      promptText = args.prompt;
      // Generate name from first 30 chars
      promptName = promptText.substring(0, 30).replace(/[^a-z0-9]/gi, '-').toLowerCase();
    } else {
      promptData = loadPromptFromSet(args.promptSet, args.promptName);
      promptText = promptData.prompt;
      promptName = promptData.name;
    }

    log.info(`Evaluating: "${promptText.substring(0, 60)}..."`);

    // Ensure results directory exists
    if (!fs.existsSync(RESULTS_DIR)) {
      fs.mkdirSync(RESULTS_DIR, { recursive: true });
    }

    // Initialize consolidated report
    initializeReport(RESULTS_DIR);

    // Generate unique filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const htmlFileName = `${promptName}-${timestamp}.html`;
    const htmlFilePath = path.join(RESULTS_DIR, htmlFileName);

    // Step 1: Generate slides
    log.info(`\n📝 Step 1: Generate Slides`);
    await generateSlidesHTML(promptText, htmlFilePath);

    // Step 2: Evaluate slides
    log.info(`\n🔍 Step 2: Evaluate Slides`);
    const scores = await autoEvaluate(htmlFilePath, promptText, promptName);

    // Step 3: Add to consolidated report
    log.info(`\n📊 Step 3: Update Consolidated Report`);
    const evalNumber = getNextEvaluationNumber(EVALUATIONS_REPORT);
    const relativeHtmlPath = `./${htmlFileName}`;

    addEvaluation(EVALUATIONS_REPORT, {
      number: evalNumber,
      promptName,
      promptText,
      htmlFile: relativeHtmlPath,
      readability: scores.readability,
      composition: scores.composition,
      consistency: scores.consistency,
      functionality: scores.functionality,
      timestamp: new Date().toISOString(),
      notes: scores.notes,
    });

    log.success(`Added to consolidated report as evaluation #${evalNumber}`);

    // Summary
    const summary = generateSummary(EVALUATIONS_REPORT);

    log.header('✅ EVALUATION COMPLETE');

    log.info(`Evaluation #: ${evalNumber}`);
    log.info(`Prompt: ${promptName}`);
    log.info(`\nScores:`);
    log.info(`  Readability: ${scores.readability}/5`);
    log.info(`  Composition: ${scores.composition}/5`);
    log.info(`  Consistency: ${scores.consistency}/5`);
    log.info(`  Functionality: ${scores.functionality}`);
    log.info(`  Visual Quality Avg: ${(
      (scores.readability + scores.composition + scores.consistency) /
      3
    ).toFixed(1)}/5`);

    if (scores.notes) {
      log.info(`\nNotes: ${scores.notes}`);
    }

    log.info(`\n📂 Files:`);
    log.info(`  Generated Slides: ${htmlFileName}`);
    log.info(`  Report: EVALUATIONS.md`);

    if (summary) {
      log.info(`\n📈 Consolidated Report Summary:`);
      log.info(`  Total Evaluations: ${summary.totalEvaluations}`);
      log.info(`  Avg Visual Quality: ${summary.averageVisualQuality}/5.0`);
      log.info(`  Avg Readability: ${summary.averageReadability}/5.0`);
      log.info(`  Avg Composition: ${summary.averageComposition}/5.0`);
      log.info(`  Avg Consistency: ${summary.averageConsistency}/5.0`);
      log.info(`  Functionality Pass Rate: ${summary.functionalityPassRate}%`);
    }

    log.info(`\n🔗 View Results:`);
    log.info(`  Open in browser: evals/build-slides-evals/results/${htmlFileName}`);
    log.info(`  Check report: evals/build-slides-evals/results/EVALUATIONS.md`);
  } catch (error) {
    log.error(error.message);
    process.exit(1);
  }
}

main();
