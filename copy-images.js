import fs from 'fs-extra';

async function copyImages() {
  try {
    await fs.copy('images', 'dist/images');
    console.log('Images copied successfully.');
  } catch (err) {
    console.error('Error copying images:', err);
  }
}

copyImages();