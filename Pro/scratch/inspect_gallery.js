import fs from 'fs';

// Read initialData.ts
const content = fs.readFileSync('./src/data/initialData.ts', 'utf-8');
console.log('--- INITIAL DATA GALLERY IMAGES ---');
const match = content.match(/galleryImages:\s*\[([\s\S]*?)\]/);
if (match) {
  console.log(match[0]);
}
