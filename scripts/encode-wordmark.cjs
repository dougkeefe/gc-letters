/**
 * Re-encode Canada wordmark PNG to be jsPDF compatible
 * This script loads the PNG, draws it to a canvas, and exports as base64
 */

const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

async function encodeWordmark() {
  try {
    // Load the original PNG
    const imagePath = path.join(__dirname, '../test-app/public/Canada_wordmark.png');
    console.log('Loading image from:', imagePath);

    const image = await loadImage(imagePath);
    console.log('Image loaded:', image.width, 'x', image.height);

    // Create canvas with same dimensions
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');

    // Draw image to canvas
    ctx.drawImage(image, 0, 0);

    // Export as PNG base64 (re-encoded by canvas, should be compatible)
    const base64 = canvas.toDataURL('image/png');
    console.log('Generated base64 length:', base64.length);

    // Create the TypeScript file content
    const tsContent = `/**
 * Canada Wordmark - Embedded as base64 data URL
 *
 * This image is required for FIP (Federal Identity Program) compliance
 * and is included in the package so users don't need to provide their own.
 *
 * Source: Government of Canada official Canada wordmark
 * Format: PNG, 144x34 pixels
 * Re-encoded for jsPDF compatibility
 */

export const CANADA_WORDMARK_BASE64 = '${base64}';
`;

    // Write to file
    const outputPath = path.join(__dirname, '../src/assets/canadaWordmark.ts');
    fs.writeFileSync(outputPath, tsContent);
    console.log('✅ Successfully wrote to:', outputPath);

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

encodeWordmark();
