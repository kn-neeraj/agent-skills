/**
 * Auto Evaluator
 *
 * Automatically evaluates generated HTML slides against the rubric
 * using Claude's assessment of the presentation quality.
 * Uses the existing eval judge (scorer.js) and rubric.md
 */

const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');

const client = new Anthropic();

// Load the existing rubric
const RUBRIC_PATH = path.join(__dirname, '../rubric.md');
const rubric = fs.readFileSync(RUBRIC_PATH, 'utf-8');

/**
 * Automatically evaluate HTML slides using the existing eval judge
 *
 * @param {string} htmlPath - Path to the generated HTML file
 * @param {string} promptText - Original prompt that was used
 * @param {string} promptName - Name/ID of the prompt
 * @returns {Promise<Object>} - Scores object { readability, composition, consistency, functionality, notes }
 */
async function autoEvaluate(htmlPath, promptText, promptName) {
  console.log('  🔍 Evaluating slides using eval judge...');

  try {
    // Read the HTML content
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    // Create evaluation prompt using the existing rubric
    const evaluationPrompt = `You are evaluating an HTML slide presentation against this visual rubric:

${rubric}

PRESENTATION CONTEXT:
- Prompt: "${promptText}"
- Prompt ID: ${promptName}

HTML CONTENT (first 2000 chars):
\`\`\`html
${htmlContent.substring(0, 2000)}...
\`\`\`

Analyze the generated HTML presentation and score it on the 4 criteria from the rubric.

Respond ONLY with valid JSON (no markdown, no explanation):
{
  "readability": <1-5>,
  "composition": <1-5>,
  "consistency": <1-5>,
  "functionality": "<Works|Broken>",
  "notes": "<brief assessment>"
}`;

    const response = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: evaluationPrompt,
        },
      ],
    });

    // Parse the JSON response
    const responseText = response.content[0].type === 'text' ? response.content[0].text : '';

    // Extract JSON from response
    let jsonStr = responseText;
    if (responseText.includes('```json')) {
      const match = responseText.match(/```json\n([\s\S]*?)\n```/);
      if (match) {
        jsonStr = match[1];
      }
    } else if (responseText.includes('```')) {
      const match = responseText.match(/```\n([\s\S]*?)\n```/);
      if (match) {
        jsonStr = match[1];
      }
    } else if (responseText.includes('{')) {
      jsonStr = responseText.substring(
        responseText.indexOf('{'),
        responseText.lastIndexOf('}') + 1
      );
    }

    const scores = JSON.parse(jsonStr);

    // Validate scores
    if (
      !Number.isInteger(scores.readability) ||
      !Number.isInteger(scores.composition) ||
      !Number.isInteger(scores.consistency) ||
      ![1, 2, 3, 4, 5].includes(scores.readability) ||
      ![1, 2, 3, 4, 5].includes(scores.composition) ||
      ![1, 2, 3, 4, 5].includes(scores.consistency) ||
      !['Works', 'Broken'].includes(scores.functionality)
    ) {
      throw new Error(
        `Invalid score values in response: ${JSON.stringify(scores)}`
      );
    }

    console.log(
      `  ✓ Evaluated - Readability:${scores.readability} Composition:${scores.composition} Consistency:${scores.consistency} Functionality:${scores.functionality}`
    );

    return scores;
  } catch (error) {
    throw new Error(`Failed to evaluate slides: ${error.message}`);
  }
}

module.exports = {
  autoEvaluate,
};
