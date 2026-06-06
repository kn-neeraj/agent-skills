/**
 * Slide Generation Module
 * Calls Claude API to generate HTML slides using the build-slides skill
 */

const fs = require('fs');
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Load the build-slides skill instructions
const SKILL_PATH = path.join(__dirname, '../../build-slides/SKILL.md');
const skillInstructions = fs.readFileSync(SKILL_PATH, 'utf-8');

async function generateSlides(prompt, outputDir) {
  const systemPrompt = skillInstructions;

  const userPrompt = `Generate slides with this request: "${prompt.prompt}"`;

  const message = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 8000,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: userPrompt,
      },
    ],
  });

  // Extract HTML from response
  let html = message.content[0].text;

  // If response contains markdown code block, extract it
  if (html.includes('```html')) {
    const match = html.match(/```html\n([\s\S]*?)\n```/);
    if (match) {
      html = match[1];
    }
  } else if (html.includes('```')) {
    const match = html.match(/```\n([\s\S]*?)\n```/);
    if (match) {
      html = match[1];
    }
  }

  // Ensure it's valid HTML
  if (!html.includes('<!DOCTYPE') && !html.includes('<html')) {
    throw new Error('Generated content is not valid HTML');
  }

  // Save HTML file
  const filename = `${prompt.id}.html`;
  const filePath = path.join(outputDir, filename);
  fs.writeFileSync(filePath, html);

  return filePath;
}

module.exports = {
  generateSlides,
};
