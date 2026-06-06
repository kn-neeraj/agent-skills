/**
 * Screenshot Capture Module
 * Captures screenshots of generated HTML slides
 */

const fs = require('fs');
const path = require('path');
const playwright = require('playwright');

async function captureScreenshots(htmlPath, promptId, outputDir) {
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1280, height: 720 },
  });

  // Load HTML file with proper waits
  const htmlUrl = `file://${path.resolve(htmlPath)}`;
  await page.goto(htmlUrl, { waitUntil: 'networkidle' });

  // Wait for fonts to load and JavaScript to initialize
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000); // Extra time for JS initialization

  // Ensure first slide is visible and rendered
  await page.evaluate(() => {
    // Wait for fonts
    if (document.fonts && document.fonts.ready) {
      return document.fonts.ready;
    }
    return Promise.resolve();
  });

  const screenshotPaths = [];
  const screenshotDir = path.join(outputDir, 'screenshots', promptId);

  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  // Get total slide count by checking for slide elements
  const slideCount = await page.evaluate(() => {
    return document.querySelectorAll('.slide, [data-slide]').length;
  });

  const numSlides = slideCount > 0 ? slideCount : 1;

  // Capture ALL slides
  const slidesToCapture = Array.from({ length: numSlides }, (_, i) => i);

  for (const slideIndex of slidesToCapture) {
    try {
      // Navigate to slide
      await page.evaluate((idx) => {
        const slides = document.querySelectorAll('.slide, [data-slide]');
        if (slides[idx]) {
          slides[idx].scrollIntoView({ behavior: 'instant' });
        }
      }, slideIndex);

      await page.waitForTimeout(200);

      // Capture screenshot
      const filename = `slide-${slideIndex + 1}.png`;
      const filePath = path.join(screenshotDir, filename);
      await page.screenshot({ path: filePath, fullPage: true });
      screenshotPaths.push(filePath);
    } catch (error) {
      console.warn(`Failed to capture slide ${slideIndex + 1}: ${error.message}`);
    }
  }

  // If no screenshots captured, capture current view
  if (screenshotPaths.length === 0) {
    const filename = `slide-1.png`;
    const filePath = path.join(screenshotDir, filename);
    await page.screenshot({ path: filePath });
    screenshotPaths.push(filePath);
  }

  await page.close();
  await browser.close();

  return screenshotPaths;
}

module.exports = {
  captureScreenshots,
};
