/**
 * Report Generation Module
 * Generates markdown report from evaluation results
 */

function generateReport(results, prompts) {
  const timestamp = new Date().toISOString().split('T')[0];
  const successfulResults = results.filter(r => !r.error);
  const failedResults = results.filter(r => r.error);

  // Calculate metrics
  const avgVisualQuality =
    successfulResults.length > 0
      ? (successfulResults.reduce((sum, r) => sum + (r.visualQualityScore || 0), 0) /
          successfulResults.length).toFixed(2)
      : 'N/A';

  const functionalityPassCount = successfulResults.filter(r => r.functionality === 'Works').length;
  const functionalityPassRate =
    successfulResults.length > 0
      ? ((functionalityPassCount / successfulResults.length) * 100).toFixed(1)
      : 'N/A';

  const avgConsistency =
    successfulResults.length > 0
      ? (successfulResults.reduce((sum, r) => sum + (r.consistency || 0), 0) /
          successfulResults.length).toFixed(2)
      : 'N/A';

  // Group by category
  const byCategory = {};
  successfulResults.forEach(r => {
    const cat = r.category;
    if (!byCategory[cat]) {
      byCategory[cat] = [];
    }
    byCategory[cat].push(r);
  });

  // Start report
  let report = `# HTML Slides Skill - Evaluation Report\n\n`;
  report += `**Date:** ${timestamp}\n`;
  report += `**Dataset Size:** ${prompts.length} prompts\n\n`;

  // Summary section
  report += `## Summary\n\n`;
  report += `| Metric | Value |\n`;
  report += `|--------|-------|\n`;
  report += `| Average Visual Quality | ${avgVisualQuality}/5.0 |\n`;
  report += `| Functionality Pass Rate | ${functionalityPassRate}% |\n`;
  report += `| Average Consistency | ${avgConsistency}/5.0 |\n`;
  report += `| Successful Evaluations | ${successfulResults.length}/${prompts.length} |\n`;
  report += `| Failed Evaluations | ${failedResults.length}/${prompts.length} |\n\n`;

  // Individual scores table
  report += `## Individual Scores\n\n`;
  report += `| Prompt ID | Category | Readability | Composition | Consistency | Functionality | Visual Avg | Notes |\n`;
  report += `|-----------|----------|-------------|-------------|-------------|----------------|-----------|---------|\n`;

  successfulResults.forEach(r => {
    const visualAvg = r.visualQualityScore || 'N/A';
    const func = r.functionality === 'Works' ? '✓ Works' : '✗ Broken';
    const notes = (r.notes || '').replace(/\|/g, '•');
    report += `| ${r.promptId} | ${r.category} | ${r.readability} | ${r.composition} | ${r.consistency} | ${func} | ${visualAvg} | ${notes} |\n`;
  });

  if (failedResults.length > 0) {
    report += `\n### Failed Evaluations\n\n`;
    failedResults.forEach(r => {
      report += `- **${r.promptId}**: ${r.error}\n`;
    });
  }

  // Category breakdown
  if (Object.keys(byCategory).length > 0) {
    report += `\n## Category Performance\n\n`;
    report += `| Category | Count | Avg Visual Quality | Avg Readability | Avg Composition | Avg Consistency |\n`;
    report += `|----------|-------|-------------------|-----------------|-----------------|------------------|\n`;

    Object.entries(byCategory).forEach(([cat, catResults]) => {
      const count = catResults.length;
      const avgVQ = (catResults.reduce((sum, r) => sum + (r.visualQualityScore || 0), 0) / count).toFixed(2);
      const avgRead = (catResults.reduce((sum, r) => sum + (r.readability || 0), 0) / count).toFixed(2);
      const avgComp = (catResults.reduce((sum, r) => sum + (r.composition || 0), 0) / count).toFixed(2);
      const avgCons = (catResults.reduce((sum, r) => sum + (r.consistency || 0), 0) / count).toFixed(2);

      report += `| ${cat} | ${count} | ${avgVQ} | ${avgRead} | ${avgComp} | ${avgCons} |\n`;
    });
  }

  // Analysis section
  report += `\n## Analysis\n\n`;

  // Top performers
  const topPerformers = successfulResults
    .filter(r => r.visualQualityScore >= 4.5)
    .sort((a, b) => b.visualQualityScore - a.visualQualityScore)
    .slice(0, 3);

  if (topPerformers.length > 0) {
    report += `### Strengths (Visual Quality ≥ 4.5)\n\n`;
    topPerformers.forEach(r => {
      report += `- **${r.promptId}** (${r.visualQualityScore}/5): ${r.notes}\n`;
    });
    report += `\n`;
  }

  // Bottom performers
  const bottomPerformers = successfulResults
    .filter(r => r.visualQualityScore < 3.5)
    .sort((a, b) => a.visualQualityScore - b.visualQualityScore)
    .slice(0, 3);

  if (bottomPerformers.length > 0) {
    report += `### Areas for Improvement (Visual Quality < 3.5)\n\n`;
    bottomPerformers.forEach(r => {
      report += `- **${r.promptId}** (${r.visualQualityScore}/5): ${r.notes}\n`;
    });
    report += `\n`;
  }

  // Functionality issues
  const functionalityIssues = successfulResults.filter(r => r.functionality === 'Broken');
  if (functionalityIssues.length > 0) {
    report += `### Functionality Issues\n\n`;
    functionalityIssues.forEach(r => {
      report += `- **${r.promptId}**: ${r.notes}\n`;
    });
    report += `\n`;
  }

  // Criteria insights
  if (successfulResults.length > 0) {
    report += `### Criteria Insights\n\n`;

    const avgReadability = (successfulResults.reduce((sum, r) => sum + (r.readability || 0), 0) / successfulResults.length).toFixed(2);
    const avgComposition = (successfulResults.reduce((sum, r) => sum + (r.composition || 0), 0) / successfulResults.length).toFixed(2);
    const avgCons = (successfulResults.reduce((sum, r) => sum + (r.consistency || 0), 0) / successfulResults.length).toFixed(2);

    report += `- **Readability:** ${avgReadability}/5 (${avgReadability >= 4 ? '✓ Strong' : '△ Needs work'})\n`;
    report += `- **Composition:** ${avgComposition}/5 (${avgComposition >= 4 ? '✓ Strong' : '△ Needs work'})\n`;
    report += `- **Consistency:** ${avgCons}/5 (${avgCons >= 4 ? '✓ Strong' : '△ Needs work'})\n`;
    report += `- **Functionality:** ${functionalityPassRate}% passing\n`;
  }

  report += `\n## Next Steps\n\n`;
  report += `1. Review failed evaluations and fix generation issues\n`;
  report += `2. Improve low-scoring criteria\n`;
  report += `3. Document patterns in successful outputs\n`;
  report += `4. Consider rerunning after improvements\n`;

  return report;
}

module.exports = {
  generateReport,
};
