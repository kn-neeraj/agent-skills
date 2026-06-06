/**
 * Screenshot-based Slide Evaluator
 *
 * 1. Takes screenshots of slides
 * 2. Sends to OpenRouter LLM with evaluation prompt
 * 3. Returns visual quality scores
 */

const fs = require('fs');
const path = require('path');
const { captureScreenshots } = require('./screenshotter');

const RUBRIC = `# Visual Scoring Rubric

## Readability (1-5)
Text hierarchy, font sizing, contrast, content density, visible content
- 5: Clear hierarchy, excellent contrast, appropriate sizing, all content visible
- 4: Good hierarchy, mostly clear, minor issues, mostly visible
- 3: Readable but hierarchy unclear or text sizing off
- 2: Hard to read, poor contrast, some content missing/blank
- 1: Illegible, terrible contrast, mostly blank/missing content

## Composition (1-5)
Layout balance, whitespace, element positioning, content fit
- 5: Well-balanced, excellent whitespace, all properly positioned, no blanks
- 4: Good layout, appropriate spacing, minor alignment issues
- 3: Acceptable but uneven spacing or some blank areas
- 2: Poor balance, awkward spacing, missing content
- 1: Chaotic, overlapping, content overflow, or mostly blank

## Visual Consistency (1-5)
Font, color palette, spacing consistency across slides
- 5: Perfectly consistent across all visible slides
- 4: Mostly consistent with minor variations
- 3: Generally consistent but some drift
- 2: Inconsistent, noticeable variations, blank slides
- 1: Chaotic, every slide looks different, mostly blank

## Functionality (Works/Broken)
Navigation controls, keyboard navigation, presenter view
- Works: Navigation arrows respond, keyboard navigation works, all slides present
- Broken: Navigation fails, missing slides, or control failures`;

async function evaluateSlides(htmlPath, promptText, promptName, config) {
  console.log('  📸 Step 1: Capturing screenshots...');

  const screenshotPaths = await captureScreenshots(htmlPath, promptName, path.dirname(htmlPath));

  if (!screenshotPaths || screenshotPaths.length === 0) {
    throw new Error('No screenshots captured');
  }

  console.log(`  ✓ Captured ${screenshotPaths.length} screenshot(s)\n`);

  console.log('  🤖 Step 2: Sending to LLM for evaluation...');

  // Read screenshots as base64
  const imageData = screenshotPaths.map(screenshotPath => {
    const data = fs.readFileSync(screenshotPath);
    return data.toString('base64');
  });

  // Create evaluation prompt
  const evaluationPrompt = `You are evaluating HTML slide presentation screenshots against a visual rubric.

${RUBRIC}

CONTEXT:
- Prompt: "${promptText}"
- Prompt ID: ${promptName}
- Total screenshots: ${screenshotPaths.length}

IMPORTANT CHECKS:
- Are all slides visible with actual content?
- Are any slides blank, black, or missing content?
- Rate based on what's ACTUALLY visible, not what should be there
- Penalize severely for blank/missing slides

Analyze the slide screenshots and score them on the 4 criteria above.

Respond with ONLY valid JSON (no markdown, no explanation):
{
  "readability": <1-5>,
  "composition": <1-5>,
  "consistency": <1-5>,
  "functionality": "<Works|Broken>",
  "notes": "<brief assessment including any blank slides>"
}`;

  // Send to OpenRouter
  const response = await callOpenRouter(
    config.apiKey,
    config.model,
    evaluationPrompt,
    imageData
  );

  console.log(`  ✓ Received evaluation response\n`);

  // Parse response
  const scores = parseResponse(response);

  return scores;
}

async function callOpenRouter(apiKey, model, prompt, imageDataList) {
  // Build message with images
  const content = [
    {
      type: 'text',
      text: prompt,
    },
    ...imageDataList.map(imageData => ({
      type: 'image',
      source: {
        type: 'base64',
        media_type: 'image/png',
        data: imageData,
      },
    })),
  ];

  const response = await fetch('https://openrouter.ai/api/v1/messages', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://github.com/anthropics/claude-code',
      'X-Title': 'Claude Code Build Slides Evaluator',
    },
    body: JSON.stringify({
      model,
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content,
        },
      ],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API error ${response.status}: ${text.substring(0, 200)}`);
  }

  const data = await response.json();
  return data.content[0]?.text || '';
}

function parseResponse(responseText) {
  // Extract JSON from response
  let jsonStr = null;

  // Strategy 1: Look for markdown JSON blocks
  if (responseText.includes('```json')) {
    const match = responseText.match(/```json\n([\s\S]*?)\n```/);
    if (match) jsonStr = match[1];
  }

  // Strategy 2: Look for any markdown code blocks
  if (!jsonStr && responseText.includes('```')) {
    const match = responseText.match(/```\n?([\s\S]*?)\n?```/);
    if (match) jsonStr = match[1];
  }

  // Strategy 3: Extract JSON object
  if (!jsonStr && responseText.includes('{')) {
    const start = responseText.indexOf('{');
    const end = responseText.lastIndexOf('}');
    if (end > start) {
      jsonStr = responseText.substring(start, end + 1);
    }
  }

  if (!jsonStr) {
    throw new Error('Could not find JSON in response');
  }

  const scores = JSON.parse(jsonStr);

  // Validate
  if (
    ![1, 2, 3, 4, 5].includes(scores.readability) ||
    ![1, 2, 3, 4, 5].includes(scores.composition) ||
    ![1, 2, 3, 4, 5].includes(scores.consistency) ||
    !['Works', 'Broken'].includes(scores.functionality)
  ) {
    throw new Error(`Invalid scores: ${JSON.stringify(scores)}`);
  }

  return scores;
}

module.exports = { evaluateSlides };
