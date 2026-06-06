/**
 * Build Slides Skill Caller
 *
 * Invokes the build-slides skill to generate HTML presentations
 * from natural language prompts.
 */

const fs = require('fs');
const path = require('path');
const { createClient, getModel } = require('./config-loader');

/**
 * Call the build-slides skill to generate HTML presentation
 *
 * @param {string} prompt - The user prompt describing the presentation
 * @param {string} outputPath - Where to save the generated HTML
 * @returns {Promise<string>} - Path to generated HTML file
 */
async function generateSlidesHTML(prompt, outputPath) {
  console.log('  🎬 Calling build-slides skill...');

  // System prompt that invokes the build-slides skill
  const systemPrompt = `You are an expert presentation designer using the build-slides skill.

When given a prompt, you will:
1. Parse the prompt to understand the presentation needs
2. Choose an appropriate format (pitch, tutorial, report, etc.)
3. Choose a theme (Modern, Classic, or Bold)
4. Generate a complete, self-contained HTML presentation with:
   - Proper typography (following golden ratio: 1.618)
   - Consistent spacing (8px-based scale)
   - Navigation controls (prev/next buttons, slide counter)
   - Speaker notes support
   - Keyboard navigation (arrow keys, space, N for notes)
   - Professional styling and visual consistency
   - Chart.js for data visualization when appropriate

Output ONLY the complete HTML code, nothing else. The HTML should be fully functional and self-contained.`;

  try {
    const client = createClient();
    const model = getModel();

    const response = await client.messages.create({
      model,
      max_tokens: 8000,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    // Extract HTML from response
    let html = response.content[0].type === 'text' ? response.content[0].text : '';

    // Clean up if wrapped in markdown code blocks
    if (html.includes('```html')) {
      html = html.split('```html')[1].split('```')[0].trim();
    } else if (html.includes('```')) {
      html = html.split('```')[1].split('```')[0].trim();
    }

    // Validate it looks like HTML
    if (!html.includes('<html') && !html.includes('<!DOCTYPE')) {
      throw new Error('Generated content does not appear to be valid HTML');
    }

    // Save to file
    fs.writeFileSync(outputPath, html, 'utf-8');
    console.log(`  ✓ HTML generated: ${path.basename(outputPath)}`);

    return outputPath;
  } catch (error) {
    throw new Error(`Failed to generate slides: ${error.message}`);
  }
}

module.exports = {
  generateSlidesHTML,
};
