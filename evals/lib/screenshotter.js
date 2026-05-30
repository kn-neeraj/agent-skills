/**
 * Screenshot Capture Module
 * Captures screenshots of generated HTML slides
 */

const fs = require('fs');
const path = require('path');
const playwright = require('playwright');

async function captureScreenshots(htmlPath, promptId, outputDir) {
  const browser = await playwright.chromium.launch();
  const context = await browser.createContext({
    viewport: { width: 1280, height: 720 },
  });
  const page = await context.newPage();

  // Load HTML file
  const htmlUrl = `file://${path.resolve(htmlPath)}`;
  await page.goto(htmlUrl, { waitUntil: 'networkidle' });

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

  // Capture first, middle, and last slides
  const slidesToCapture = [0];
  if (numSlides > 2) {
    slidesToCapture.push(Math.floor(numSlides / 2));
  }
  if (numSlides > 1) {
    slidesToCapture.push(numSlides - 1);
  }

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

  await context.close();
  await browser.close();

  return screenshotPaths;
}

module.exports = {
  captureScreenshots,
};
