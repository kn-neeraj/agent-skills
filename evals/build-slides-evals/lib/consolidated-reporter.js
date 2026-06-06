/**
 * Consolidated Reporter
 *
 * Maintains and updates the master EVALUATIONS.md report
 * that accumulates all evaluations over time.
 */

const fs = require('fs');
const path = require('path');

/**
 * Initialize the EVALUATIONS.md master report if it doesn't exist
 *
 * @param {string} resultsDir - Path to results directory
 */
function initializeReport(resultsDir) {
  const reportPath = path.join(resultsDir, 'EVALUATIONS.md');

  if (!fs.existsSync(reportPath)) {
    const header = `# Build Slides Skill - Consolidated Evaluation Report

Master log of all slide evaluations. Each row represents one evaluation run.

**Columns:**
- **#** - Sequential evaluation number
- **Prompt Name** - ID of the prompt evaluated
- **Prompt Text** - Full prompt description
- **Generated Slides** - Link to view the generated HTML presentation
- **Readability** - Text clarity and hierarchy (1-5)
- **Composition** - Layout balance and spacing (1-5)
- **Consistency** - Visual uniformity across slides (1-5)
- **Functionality** - Navigation and features working (Works/Broken)
- **Visual Quality Avg** - Average of Readability, Composition, Consistency
- **Timestamp** - When this evaluation was performed
- **Notes** - Key observations and findings

---

| # | Prompt Name | Prompt Text | Generated Slides | Readability | Composition | Consistency | Functionality | Visual Quality Avg | Timestamp | Notes |
|---|-------------|-------------|------------------|:-:|:-:|:-:|:-:|:-:|-------------|-------|
`;

    fs.writeFileSync(reportPath, header, 'utf-8');
  }

  return reportPath;
}

/**
 * Add an evaluation to the consolidated report
 *
 * @param {string} reportPath - Path to EVALUATIONS.md
 * @param {Object} evaluation - Evaluation data
 * @param {number} evaluation.number - Sequential number
 * @param {string} evaluation.promptName - Prompt name/ID
 * @param {string} evaluation.promptText - Full prompt text
 * @param {string} evaluation.htmlFile - Relative path to HTML file
 * @param {number} evaluation.readability - Readability score (1-5)
 * @param {number} evaluation.composition - Composition score (1-5)
 * @param {number} evaluation.consistency - Consistency score (1-5)
 * @param {string} evaluation.functionality - Works or Broken
 * @param {string} evaluation.timestamp - ISO timestamp
 * @param {string} evaluation.notes - Evaluation notes
 */
function addEvaluation(reportPath, evaluation) {
  // Truncate prompt text if too long for table
  const promptPreview =
    evaluation.promptText.length > 50
      ? evaluation.promptText.substring(0, 47) + '...'
      : evaluation.promptText;

  // Calculate visual quality average
  const visualQualityAvg = (
    (evaluation.readability + evaluation.composition + evaluation.consistency) /
    3
  ).toFixed(1);

  // Format timestamp for display (remove milliseconds)
  const displayTimestamp = evaluation.timestamp.split('.')[0].replace('T', ' ');

  // Escape pipe characters in notes
  const safeNotes = evaluation.notes
    ? evaluation.notes.replace(/\|/g, '\\|').substring(0, 100)
    : '-';

  // Create table row
  const row = `| ${evaluation.number} | \`${evaluation.promptName}\` | ${promptPreview} | [View →](${evaluation.htmlFile}) | ${evaluation.readability} | ${evaluation.composition} | ${evaluation.consistency} | ${evaluation.functionality} | ${visualQualityAvg} | ${displayTimestamp} | ${safeNotes} |
`;

  // Append to report
  fs.appendFileSync(reportPath, row, 'utf-8');
}

/**
 * Get the next evaluation number
 *
 * @param {string} reportPath - Path to EVALUATIONS.md
 * @returns {number} - Next sequential number
 */
function getNextEvaluationNumber(reportPath) {
  if (!fs.existsSync(reportPath)) {
    return 1;
  }

  const content = fs.readFileSync(reportPath, 'utf-8');
  const lines = content.split('\n');

  // Count rows (skip header and separator)
  let maxNum = 0;
  lines.forEach(line => {
    const match = line.match(/^\|\s*(\d+)\s*\|/);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > maxNum) {
        maxNum = num;
      }
    }
  });

  return maxNum + 1;
}

/**
 * Generate summary statistics from report
 *
 * @param {string} reportPath - Path to EVALUATIONS.md
 * @returns {Object} - Summary statistics
 */
function generateSummary(reportPath) {
  if (!fs.existsSync(reportPath)) {
    return null;
  }

  const content = fs.readFileSync(reportPath, 'utf-8');
  const lines = content.split('\n');

  const evaluations = [];

  lines.forEach(line => {
    const match = line.match(
      /^\|\s*(\d+)\s*\|\s*`([^`]+)`\s*\|.*?\|\s*(\d)\s*\|\s*(\d)\s*\|\s*(\d)\s*\|\s*(Works|Broken)/
    );
    if (match) {
      const [, num, promptName, readability, composition, consistency, functionality] = match;
      evaluations.push({
        number: parseInt(num, 10),
        promptName,
        readability: parseInt(readability, 10),
        composition: parseInt(composition, 10),
        consistency: parseInt(consistency, 10),
        functionality,
      });
    }
  });

  if (evaluations.length === 0) {
    return null;
  }

  const avgReadability = (
    evaluations.reduce((sum, e) => sum + e.readability, 0) / evaluations.length
  ).toFixed(1);
  const avgComposition = (
    evaluations.reduce((sum, e) => sum + e.composition, 0) / evaluations.length
  ).toFixed(1);
  const avgConsistency = (
    evaluations.reduce((sum, e) => sum + e.consistency, 0) / evaluations.length
  ).toFixed(1);
  const avgVisualQuality = (
    (parseFloat(avgReadability) + parseFloat(avgComposition) + parseFloat(avgConsistency)) /
    3
  ).toFixed(1);
  const passRate = (
    (evaluations.filter(e => e.functionality === 'Works').length / evaluations.length) *
    100
  ).toFixed(1);

  return {
    totalEvaluations: evaluations.length,
    averageReadability: avgReadability,
    averageComposition: avgComposition,
    averageConsistency: avgConsistency,
    averageVisualQuality: avgVisualQuality,
    functionalityPassRate: passRate,
  };
}

module.exports = {
  initializeReport,
  addEvaluation,
  getNextEvaluationNumber,
  generateSummary,
};
