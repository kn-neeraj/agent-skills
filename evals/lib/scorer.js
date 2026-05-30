/**
 * Vision-Based Scoring Module
 * Uses Claude's vision API to score slides against the rubric
 */

const fs = require('fs');
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Load the rubric
const RUBRIC_PATH = path.join(__dirname, '../rubric.md');
const rubric = fs.readFileSync(RUBRIC_PATH, 'utf-8');

const SCORING_PROMPT = `You are evaluating HTML slide presentations based on a visual rubric.

${rubric}

Analyze the provided screenshots and score them on these 4 criteria:
1. Readability (1-5): Text clarity, hierarchy, sizing, contrast
2. Composition (1-5): Layout balance, whitespace, element positioning
3. Consistency (1-5): Visual uniformity across slides
4. Functionality (Works/Broken): Navigation and interaction working

Respond ONLY with valid JSON (no markdown, no explanation):
{
  "readability": <1-5>,
  "composition": <1-5>,
  "consistency": <1-5>,
  "functionality": "<Works|Broken>",
  "notes": "<brief observations>"
}`;

async function scoreSlides(screenshotPaths, prompt) {
  const imageContent = [];

  // Load all screenshots
  for (const screenshotPath of screenshotPaths) {
    const imageBuffer = fs.readFileSync(screenshotPath);
    const base64Image = imageBuffer.toString('base64');

    imageContent.push({
      type: 'image',
      source: {
        type: 'base64',
        media_type: 'image/png',
        data: base64Image,
      },
    });
  }

  // Add text prompt
  imageContent.push({
    type: 'text',
    text: SCORING_PROMPT,
  });

  // Call Claude vision API
  const message = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 1000,
    messages: [
      {
        role: 'user',
        content: imageContent,
      },
    ],
  });

  // Parse response
  let responseText = message.content[0].text;

  // Remove markdown code blocks if present
  if (responseText.includes('```json')) {
    const match = responseText.match(/```json\n([\s\S]*?)\n```/);
    if (match) {
      responseText = match[1];
    }
  } else if (responseText.includes('```')) {
    const match = responseText.match(/```\n([\s\S]*?)\n```/);
    if (match) {
      responseText = match[1];
    }
  }

  const scores = JSON.parse(responseText);

  // Calculate aggregate scores
  const visualQualityScore = (scores.readability + scores.composition + scores.consistency) / 3;

  return {
    readability: scores.readability,
    composition: scores.composition,
    consistency: scores.consistency,
    functionality: scores.functionality,
    visualQualityScore: parseFloat(visualQualityScore.toFixed(2)),
    notes: scores.notes,
  };
}

module.exports = {
  scoreSlides,
};
