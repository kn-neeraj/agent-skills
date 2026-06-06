#!/usr/bin/env node

/**
 * Build Slides Skill - Screenshot-based Evaluation
 *
 * Simple workflow:
 * 1. Take screenshots of generated slides
 * 2. Send to OpenRouter LLM with evaluation prompt
 * 3. Get visual quality scores (readability, composition, consistency, functionality)
 * 4. Store results
 *
 * Usage:
 *   npm run eval:setup                    # Configure API key once
 *   npm run eval:auto -- --html-path path/to/slides.html --prompt-name "name"
 */

const fs = require('fs');
const path = require('path');
const { evaluateSlides } = require('./lib/screenshot-evaluator');
const { getConfig } = require('./lib/config');
const { generateReport } = require('./lib/report-generator');
const { generateHTMLReport } = require('./lib/html-report-generator');

const RESULTS_DIR = path.join(__dirname, 'results');
const EVALUATIONS_FILE = path.join(RESULTS_DIR, 'evaluations.json');
const REPORT_FILE = path.join(RESULTS_DIR, 'EVALUATIONS.md');
const HTML_REPORT_FILE = path.join(RESULTS_DIR, 'EVALUATIONS.html');

// Parse CLI arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const result = { htmlPath: null, promptName: null, promptText: null };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--html-path' && i + 1 < args.length) {
      result.htmlPath = args[i + 1];
      i++;
    } else if (args[i] === '--prompt-name' && i + 1 < args.length) {
      result.promptName = args[i + 1];
      i++;
    } else if (args[i] === '--prompt-text' && i + 1 < args.length) {
      result.promptText = args[i + 1];
      i++;
    }
  }
  return result;
}

async function main() {
  const args = parseArgs();

  console.log('\n' + '='.repeat(70));
  console.log('Build Slides Skill - Screenshot Evaluation');
  console.log('='.repeat(70) + '\n');

  try {
    // Validate input
    if (!args.htmlPath) {
      console.log('Usage:');
      console.log('  npm run eval:auto -- --html-path path/to/slides.html --prompt-name "name"\n');
      console.log('First time? Run: npm run eval:setup\n');
      process.exit(1);
    }

    // Verify file exists
    const htmlPath = path.resolve(args.htmlPath);
    if (!fs.existsSync(htmlPath)) {
      throw new Error(`HTML file not found: ${htmlPath}`);
    }

    // Load config
    const config = getConfig();
    console.log(`📝 Using ${config.provider} • Model: ${config.model}\n`);

    // Derive name from filename if not provided
    const promptName = args.promptName || path.basename(htmlPath, '.html');
    const promptText = args.promptText || '';

    console.log(`📊 Evaluating: ${promptName}`);
    if (promptText) {
      console.log(`💬 Prompt: "${promptText.substring(0, 60)}${promptText.length > 60 ? '...' : ''}"\n`);
    }

    // Create results directory
    if (!fs.existsSync(RESULTS_DIR)) {
      fs.mkdirSync(RESULTS_DIR, { recursive: true });
    }

    // Evaluate slides
    console.log('🎬 Capturing screenshots and evaluating...\n');
    const scores = await evaluateSlides(htmlPath, promptText, promptName, config);

    // Save results
    let evaluations = [];
    if (fs.existsSync(EVALUATIONS_FILE)) {
      evaluations = JSON.parse(fs.readFileSync(EVALUATIONS_FILE, 'utf-8'));
    }

    evaluations.push({
      id: evaluations.length + 1,
      promptName,
      promptText,
      htmlFile: htmlPath,
      scores,
      timestamp: new Date().toISOString(),
    });

    fs.writeFileSync(EVALUATIONS_FILE, JSON.stringify(evaluations, null, 2));

    // Generate consolidated reports
    const report = generateReport(EVALUATIONS_FILE);
    fs.writeFileSync(REPORT_FILE, report);

    const htmlReport = generateHTMLReport(EVALUATIONS_FILE);
    fs.writeFileSync(HTML_REPORT_FILE, htmlReport);

    // Display results
    console.log('✅ EVALUATION COMPLETE\n');
    console.log(`📈 Scores for: ${promptName}`);
    console.log(`   Readability:  ${scores.readability}/5`);
    console.log(`   Composition:  ${scores.composition}/5`);
    console.log(`   Consistency:  ${scores.consistency}/5`);
    console.log(`   Functionality: ${scores.functionality}`);
    const visualAvg = ((scores.readability + scores.composition + scores.consistency) / 3).toFixed(1);
    console.log(`   Visual Quality Avg: ${visualAvg}/5\n`);

    if (scores.notes) {
      console.log(`📝 Notes: ${scores.notes}\n`);
    }

    console.log(`📂 Results saved to:`);
    console.log(`   JSON: ${EVALUATIONS_FILE}`);
    console.log(`   Markdown: ${REPORT_FILE}`);
    console.log(`   HTML: ${HTML_REPORT_FILE}\n`);
    console.log(`🌐 View HTML report in browser:`);
    console.log(`   open ${HTML_REPORT_FILE}\n`);
  } catch (error) {
    console.error(`\n❌ Error: ${error.message}\n`);
    process.exit(1);
  }
}

main().catch(console.error);
