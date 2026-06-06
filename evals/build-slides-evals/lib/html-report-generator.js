/**
 * HTML Report Generator
 *
 * Generates a beautiful consolidated HTML report from evaluations.json
 */

const fs = require('fs');

function generateHTMLReport(evaluationsFile) {
  if (!fs.existsSync(evaluationsFile)) {
    return '';
  }

  const evaluations = JSON.parse(fs.readFileSync(evaluationsFile, 'utf-8'));

  if (!evaluations || evaluations.length === 0) {
    return '';
  }

  const stats = calculateStats(evaluations);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Slide Evaluation Report</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 40px 20px;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
      border-radius: 10px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      overflow: hidden;
    }

    header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 40px;
      text-align: center;
    }

    header h1 {
      font-size: 2.5em;
      margin-bottom: 10px;
    }

    header p {
      font-size: 1.1em;
      opacity: 0.9;
    }

    .content {
      padding: 40px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }

    .stat-card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
    }

    .stat-card h3 {
      font-size: 0.9em;
      font-weight: 600;
      opacity: 0.9;
      margin-bottom: 10px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .stat-card .value {
      font-size: 2.2em;
      font-weight: bold;
    }

    .charts-section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 30px;
      margin-bottom: 40px;
    }

    .chart-container {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
    }

    .chart-container h3 {
      margin-bottom: 15px;
      color: #333;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 40px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      overflow: hidden;
    }

    table thead {
      background: #f8f9fa;
      border-bottom: 2px solid #e0e0e0;
    }

    table th {
      padding: 15px;
      text-align: left;
      font-weight: 600;
      color: #333;
    }

    table td {
      padding: 15px;
      border-bottom: 1px solid #e0e0e0;
    }

    table tr:hover {
      background: #f8f9fa;
    }

    .score {
      font-weight: 600;
      padding: 4px 8px;
      border-radius: 4px;
      display: inline-block;
      min-width: 60px;
      text-align: center;
    }

    .score.excellent {
      background: #d4edda;
      color: #155724;
    }

    .score.good {
      background: #cfe2ff;
      color: #084298;
    }

    .score.fair {
      background: #fff3cd;
      color: #664d03;
    }

    .score.poor {
      background: #f8d7da;
      color: #842029;
    }

    .functionality {
      font-weight: 600;
      padding: 4px 8px;
      border-radius: 4px;
      display: inline-block;
    }

    .functionality.works {
      background: #d4edda;
      color: #155724;
    }

    .functionality.broken {
      background: #f8d7da;
      color: #842029;
    }

    .evaluation-detail {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
      border-left: 4px solid #667eea;
    }

    .evaluation-detail h3 {
      color: #667eea;
      margin-bottom: 10px;
    }

    .evaluation-detail .meta {
      font-size: 0.9em;
      color: #666;
      margin-bottom: 15px;
    }

    .evaluation-detail .scores {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 10px;
      margin-bottom: 15px;
    }

    .evaluation-detail .score-item {
      padding: 10px;
      background: white;
      border-radius: 4px;
      border: 1px solid #e0e0e0;
    }

    .evaluation-detail .score-item label {
      display: block;
      font-size: 0.85em;
      color: #666;
      margin-bottom: 5px;
    }

    .evaluation-detail .score-item .value {
      font-size: 1.3em;
      font-weight: bold;
      color: #667eea;
    }

    .evaluation-detail .notes {
      background: white;
      padding: 10px;
      border-radius: 4px;
      border-left: 3px solid #667eea;
      margin-top: 10px;
      font-style: italic;
      color: #555;
    }

    footer {
      background: #f8f9fa;
      padding: 20px;
      text-align: center;
      color: #666;
      font-size: 0.9em;
      border-top: 1px solid #e0e0e0;
    }

    h2 {
      color: #333;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid #667eea;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>📊 Slide Evaluation Report</h1>
      <p>Consolidated evaluation results for all presentations</p>
    </header>

    <div class="content">
      <!-- Summary Stats -->
      <div class="stats-grid">
        <div class="stat-card">
          <h3>Total Evaluations</h3>
          <div class="value">${evaluations.length}</div>
        </div>
        <div class="stat-card">
          <h3>Avg Readability</h3>
          <div class="value">${stats.avgReadability.toFixed(1)}/5</div>
        </div>
        <div class="stat-card">
          <h3>Avg Composition</h3>
          <div class="value">${stats.avgComposition.toFixed(1)}/5</div>
        </div>
        <div class="stat-card">
          <h3>Avg Consistency</h3>
          <div class="value">${stats.avgConsistency.toFixed(1)}/5</div>
        </div>
        <div class="stat-card">
          <h3>Visual Quality Avg</h3>
          <div class="value">${stats.avgVisualQuality.toFixed(1)}/5</div>
        </div>
        <div class="stat-card">
          <h3>Functionality Pass Rate</h3>
          <div class="value">${stats.functionalityPassRate}%</div>
        </div>
      </div>

      <!-- Charts -->
      <div class="charts-section">
        <div class="chart-container">
          <h3>Score Distribution</h3>
          <canvas id="scoresChart"></canvas>
        </div>
        <div class="chart-container">
          <h3>Evaluation Trend</h3>
          <canvas id="trendChart"></canvas>
        </div>
      </div>

      <!-- Summary Table -->
      <h2>All Evaluations</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Prompt</th>
            <th>Readability</th>
            <th>Composition</th>
            <th>Consistency</th>
            <th>Functionality</th>
            <th>Visual Avg</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          ${evaluations.map(eval => {
            const visualAvg = ((eval.scores.readability + eval.scores.composition + eval.scores.consistency) / 3).toFixed(1);
            const date = new Date(eval.timestamp).toLocaleDateString() + ' ' + new Date(eval.timestamp).toLocaleTimeString();
            return `
              <tr>
                <td>${eval.id}</td>
                <td>${eval.promptName}</td>
                <td><span class="score ${getScoreClass(eval.scores.readability)}">${eval.scores.readability}/5</span></td>
                <td><span class="score ${getScoreClass(eval.scores.composition)}">${eval.scores.composition}/5</span></td>
                <td><span class="score ${getScoreClass(eval.scores.consistency)}">${eval.scores.consistency}/5</span></td>
                <td><span class="functionality ${eval.scores.functionality === 'Works' ? 'works' : 'broken'}">${eval.scores.functionality}</span></td>
                <td><span class="score ${getScoreClass(parseFloat(visualAvg))}">${visualAvg}/5</span></td>
                <td>${date}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>

      <!-- Detailed Evaluations -->
      <h2>Detailed Results</h2>
      ${evaluations.map(eval => {
        const visualAvg = ((eval.scores.readability + eval.scores.composition + eval.scores.consistency) / 3).toFixed(1);
        return `
          <div class="evaluation-detail">
            <h3>Evaluation #${eval.id}: ${eval.promptName}</h3>
            <div class="meta">
              Evaluated: ${new Date(eval.timestamp).toLocaleString()}
            </div>
            <div class="scores">
              <div class="score-item">
                <label>Readability</label>
                <div class="value">${eval.scores.readability}/5</div>
              </div>
              <div class="score-item">
                <label>Composition</label>
                <div class="value">${eval.scores.composition}/5</div>
              </div>
              <div class="score-item">
                <label>Consistency</label>
                <div class="value">${eval.scores.consistency}/5</div>
              </div>
              <div class="score-item">
                <label>Functionality</label>
                <div class="value">${eval.scores.functionality}</div>
              </div>
              <div class="score-item">
                <label>Visual Quality Avg</label>
                <div class="value">${visualAvg}/5</div>
              </div>
            </div>
            ${eval.scores.notes ? `<div class="notes"><strong>Notes:</strong> ${eval.scores.notes}</div>` : ''}
          </div>
        `;
      }).join('')}
    </div>

    <footer>
      <p>Generated on ${new Date().toLocaleString()}</p>
      <p>Build Slides Skill - Screenshot-based Evaluation System</p>
    </footer>
  </div>

  <script>
    // Scores Chart
    const ctx1 = document.getElementById('scoresChart').getContext('2d');
    new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: ['Readability', 'Composition', 'Consistency'],
        datasets: [{
          label: 'Average Scores',
          data: [${stats.avgReadability.toFixed(1)}, ${stats.avgComposition.toFixed(1)}, ${stats.avgConsistency.toFixed(1)}],
          backgroundColor: ['#667eea', '#764ba2', '#9966ff'],
          borderRadius: 5
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 5,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });

    // Trend Chart
    const ctx2 = document.getElementById('trendChart').getContext('2d');
    new Chart(ctx2, {
      type: 'line',
      data: {
        labels: ${JSON.stringify(evaluations.map((_, i) => `Eval ${i + 1}`))},
        datasets: [
          {
            label: 'Visual Quality Avg',
            data: ${JSON.stringify(evaluations.map(e => ((e.scores.readability + e.scores.composition + e.scores.consistency) / 3).toFixed(1)))},
            borderColor: '#667eea',
            backgroundColor: 'rgba(102, 126, 234, 0.1)',
            tension: 0.4,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 5
          }
        }
      }
    });
  </script>
</body>
</html>`;

  return html;
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

function getScoreClass(score) {
  if (score >= 4) return 'excellent';
  if (score >= 3) return 'good';
  if (score >= 2) return 'fair';
  return 'poor';
}

module.exports = { generateHTMLReport };
