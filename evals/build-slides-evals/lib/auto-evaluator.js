/**
 * Auto Evaluator
 *
 * Automatically evaluates generated HTML slides against the rubric
 * using Claude's assessment of the presentation quality.
 */

const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');

const client = new Anthropic();

/**
 * Automatically evaluate HTML slides
 *
 * @param {string} htmlPath - Path to the generated HTML file
 * @param {string} promptText - Original prompt that was used
 * @param {string} promptName - Name/ID of the prompt
 * @returns {Promise<Object>} - Scores object { readability, composition, consistency, functionality, notes }
 */
async function autoEvaluate(htmlPath, promptText, promptName) {
  console.log('  🔍 Evaluating slides...');

  try {
    // Read the HTML content
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    // Create evaluation prompt for Claude
    const evaluationPrompt = `You are a presentation design expert evaluating an automatically-generated HTML presentation.

PRESENTATION CONTEXT:
- Prompt: "${promptText}"
- Prompt ID: ${promptName}

HTML CONTENT TO EVALUATE:
\`\`\`html
${htmlContent.substring(0, 3000)}...
\`\`\`

SCORING RUBRIC (1-5 scale):

**Readability** - Text clarity, hierarchy, contrast, sizing
- 5: Clear hierarchy, excellent contrast, appropriately sized text, no cramped content
- 4: Good hierarchy, mostly clear, minor contrast issues
- 3: Readable but hierarchy unclear or text slightly small/large
- 2: Hard to read, poor hierarchy, contrast issues
- 1: Illegible, terrible contrast, unreadable

**Composition** - Layout balance, whitespace, element positioning
- 5: Well-balanced, excellent whitespace, all elements properly positioned, nothing cut off
- 4: Good layout, appropriate spacing, minor alignment issues
- 3: Acceptable layout but uneven spacing or crowded in places
- 2: Poor balance, awkward spacing, some elements poorly positioned
- 1: Chaotic layout, overlapping elements, content overflow

**Consistency** - Visual uniformity (fonts, colors, spacing) across slides
- 5: Perfectly consistent fonts, colors, spacing across all slides
- 4: Mostly consistent with minor variations
- 3: Generally consistent but some drift in styles
- 2: Inconsistent, noticeable style variations
- 1: Chaotic, every slide looks different

**Functionality** - Works/Broken
- Works: Navigation buttons responsive, keyboard shortcuts functional, no visual glitches
- Broken: Any functionality fails (nav broken, keyboard unresponsive, visual glitches)

EVALUATION TASK:
Carefully analyze the generated HTML and provide scores for each criterion.
Focus on what was actually generated, not what could be improved.

Respond in this exact JSON format only:
{
  "readability": <1-5>,
  "composition": <1-5>,
  "consistency": <1-5>,
  "functionality": "<Works or Broken>",
  "notes": "<brief assessment of key observations>"
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
    if (responseText.includes('{')) {
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
      ![1, 2, 3, 4, 5].includes(scores.consistency)
    ) {
      throw new Error('Invalid score values in response');
    }

    console.log(
      `  ✓ Evaluated - R:${scores.readability} C:${scores.composition} Co:${scores.consistency} F:${scores.functionality}`
    );

    return scores;
  } catch (error) {
    throw new Error(`Failed to evaluate slides: ${error.message}`);
  }
}

module.exports = {
  autoEvaluate,
};
