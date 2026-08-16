import fs from 'fs';

async function uploadToPixeldrain(fileBlob, fileName) {
  const formData = new FormData();
  formData.append('file', fileBlob, fileName);
  
  const res = await fetch('https://pixeldrain.com/api/file', {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error(`Pixeldrain upload failed HTTP ${res.status}`);
  const json = await res.json();
  if (json.id) return `https://pixeldrain.com/api/file/${json.id}`;
  throw new Error(`Invalid response`);
}

async function run() {
  const buffer = fs.readFileSync('./public/kondaveedu_1.jpeg');
  const blob = new Blob([buffer], { type: 'image/jpeg' });
  try {
    const url = await uploadToPixeldrain(blob, 'kondaveedu_1.jpeg');
    console.log('PIXELDRAIN_SUCCESS_URL:', url);
  } catch (err) {
    console.error('PIXELDRAIN_ERR:', err.message);
  }
}

run();
