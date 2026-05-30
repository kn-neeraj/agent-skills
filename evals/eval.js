#!/usr/bin/env node

/**
 * HTML Slides Skill - Automated Evaluation Runner
 *
 * Workflow:
 * 1. Load prompts from dataset.json
 * 2. Generate slides for each prompt via Claude API
 * 3. Capture screenshots
 * 4. Score using vision-based rubric
 * 5. Generate results report
 */

const fs = require('fs');
const path = require('path');
const { generateSlides } = require('./lib/generator');
const { captureScreenshots } = require('./lib/screenshotter');
const { scoreSlides } = require('./lib/scorer');
const { generateReport } = require('./lib/report-generator');

const DATASET_PATH = path.join(__dirname, 'dataset.json');
const RESULTS_DIR = path.join(__dirname, 'results');
const TIMESTAMP = new Date().toISOString().replace(/[:.]/g, '-');
const RUN_DIR = path.join(RESULTS_DIR, `run-${TIMESTAMP}`);

async function main() {
  console.log('🎬 HTML Slides Skill - Evaluation Runner');
  console.log(`📁 Results directory: ${RUN_DIR}\n`);

  // Load dataset
  const dataset = JSON.parse(fs.readFileSync(DATASET_PATH, 'utf-8'));
  const prompts = dataset.prompts;
  console.log(`📊 Dataset: ${prompts.length} prompts loaded\n`);

  // Create results directory
  if (!fs.existsSync(RUN_DIR)) {
    fs.mkdirSync(RUN_DIR, { recursive: true });
  }

  const results = [];

  for (let i = 0; i < prompts.length; i++) {
    const prompt = prompts[i];
    console.log(`[${i + 1}/${prompts.length}] ${prompt.id}...`);

    try {
      // Step 1: Generate slides
      console.log('  → Generating slides');
      const htmlPath = await generateSlides(prompt, RUN_DIR);

      // Step 2: Capture screenshots
      console.log('  → Capturing screenshots');
      const screenshotPaths = await captureScreenshots(htmlPath, prompt.id, RUN_DIR);

      // Step 3: Score using vision API
      console.log('  → Scoring with vision model');
      const scores = await scoreSlides(screenshotPaths, prompt);

      // Step 4: Compile result
      const result = {
        promptId: prompt.id,
        category: prompt.category,
        slideCount: prompt.length,
        htmlPath,
        screenshotPaths,
        ...scores,
        timestamp: new Date().toISOString(),
      };

      results.push(result);
      console.log(`  ✓ Complete\n`);
    } catch (error) {
      console.error(`  ✗ Error: ${error.message}\n`);
      results.push({
        promptId: prompt.id,
        error: error.message,
      });
    }
  }

  // Step 5: Generate report
  console.log('\n📈 Generating report...');
  const report = generateReport(results, prompts);

  const reportPath = path.join(RUN_DIR, 'RESULTS.md');
  fs.writeFileSync(reportPath, report);
  console.log(`✓ Report saved: ${reportPath}`);

  // Save raw results
  const rawPath = path.join(RUN_DIR, 'results.json');
  fs.writeFileSync(rawPath, JSON.stringify(results, null, 2));
  console.log(`✓ Raw results saved: ${rawPath}`);

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('EVALUATION COMPLETE');
  console.log('='.repeat(60));
  console.log(`Total prompts: ${prompts.length}`);
  console.log(`Successful: ${results.filter(r => !r.error).length}`);
  console.log(`Failed: ${results.filter(r => r.error).length}`);

  const successfulResults = results.filter(r => !r.error);
  if (successfulResults.length > 0) {
    const avgVisualQuality =
      successfulResults.reduce((sum, r) => sum + (r.visualQualityScore || 0), 0) /
      successfulResults.length;
    const functionalityPassRate =
      (successfulResults.filter(r => r.functionality === 'Works').length /
      successfulResults.length * 100).toFixed(1);

    console.log(`\nAverage Visual Quality: ${avgVisualQuality.toFixed(2)}/5.0`);
    console.log(`Functionality Pass Rate: ${functionalityPassRate}%`);
  }

  console.log(`\n📁 View results: ${reportPath}`);
}

main().catch(console.error);
