/**
 * Evaluation Report Generator
 *
 * Generates a consolidated markdown report from evaluations.json
 */

const fs = require('fs');
const path = require('path');

function generateReport(evaluationsFile) {
  if (!fs.existsSync(evaluationsFile)) {
    return '';
  }

  const evaluations = JSON.parse(fs.readFileSync(evaluationsFile, 'utf-8'));

  if (!evaluations || evaluations.length === 0) {
    return '';
  }

  // Calculate statistics
  const stats = calculateStats(evaluations);

  // Build report
  let report = `# Slide Evaluation Report\n\n`;
  report += `Generated: ${new Date().toISOString()}\n\n`;

  // Summary
  report += `## Summary\n\n`;
  report += `- **Total Evaluations**: ${evaluations.length}\n`;
  report += `- **Avg Readability**: ${stats.avgReadability.toFixed(1)}/5\n`;
  report += `- **Avg Composition**: ${stats.avgComposition.toFixed(1)}/5\n`;
  report += `- **Avg Consistency**: ${stats.avgConsistency.toFixed(1)}/5\n`;
  report += `- **Avg Visual Quality**: ${stats.avgVisualQuality.toFixed(1)}/5\n`;
  report += `- **Functionality Pass Rate**: ${stats.functionalityPassRate}%\n\n`;

  // Evaluation table
  report += `## All Evaluations\n\n`;
  report += `| # | Prompt | Readability | Composition | Consistency | Functionality | Visual Avg | Timestamp |\n`;
  report += `|---|--------|-------------|-------------|-------------|---------------|-----------|----------|\n`;

  evaluations.forEach((eval) => {
    const visualAvg = ((eval.scores.readability + eval.scores.composition + eval.scores.consistency) / 3).toFixed(1);
    const promptDisplay = eval.promptName.substring(0, 20);
    const timestamp = new Date(eval.timestamp).toLocaleString();
    report += `| ${eval.id} | ${promptDisplay} | ${eval.scores.readability}/5 | ${eval.scores.composition}/5 | ${eval.scores.consistency}/5 | ${eval.scores.functionality} | ${visualAvg}/5 | ${timestamp} |\n`;
  });

  report += `\n`;

  // Detailed evaluations
  report += `## Detailed Evaluations\n\n`;
  evaluations.forEach((eval) => {
    report += `### Evaluation #${eval.id}: ${eval.promptName}\n\n`;
    report += `**Timestamp**: ${new Date(eval.timestamp).toLocaleString()}\n\n`;
    if (eval.promptText) {
      report += `**Prompt**: ${eval.promptText}\n\n`;
    }
    report += `**Scores**:\n`;
    report += `- Readability: ${eval.scores.readability}/5\n`;
    report += `- Composition: ${eval.scores.composition}/5\n`;
    report += `- Consistency: ${eval.scores.consistency}/5\n`;
    report += `- Functionality: ${eval.scores.functionality}\n`;
    report += `- Visual Quality Avg: ${((eval.scores.readability + eval.scores.composition + eval.scores.consistency) / 3).toFixed(1)}/5\n\n`;
    if (eval.scores.notes) {
      report += `**Notes**: ${eval.scores.notes}\n\n`;
    }
    report += `---\n\n`;
  });

  return report;
}

function calculateStats(evaluations) {
  const readabilityScores = evaluations.map(e => e.scores.readability);
  const compositionScores = evaluations.map(e => e.scores.composition);
  const consistencyScores = evaluations.map(e => e.scores.consistency);
  const functionalityScores = evaluations.filter(e => e.scores.functionality === 'Works').length;

  return {
    avgReadability: readabilityScores.reduce((a, b) => a + b, 0) / readabilityScores.length,
    avgComposition: compositionScores.reduce((a, b) => a + b, 0) / compositionScores.length,
    avgConsistency: consistencyScores.reduce((a, b) => a + b, 0) / consistencyScores.length,
    avgVisualQuality:
      (readabilityScores.reduce((a, b) => a + b, 0) +
        compositionScores.reduce((a, b) => a + b, 0) +
        consistencyScores.reduce((a, b) => a + b, 0)) /
      (readabilityScores.length * 3),
    functionalityPassRate: Math.round((functionalityScores / evaluations.length) * 100),
  };
}

module.exports = { generateReport };
