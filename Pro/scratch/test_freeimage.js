import fs from 'fs';

async function testFreeImageHost() {
  const apiKey = '6d000714986472f5a647882203363168';
  const buffer = fs.readFileSync('./public/kondaveedu_1.jpeg');
  const base64 = buffer.toString('base64');

  const formData = new URLSearchParams();
  formData.append('key', apiKey);
  formData.append('action', 'upload');
  formData.append('source', base64);
  formData.append('format', 'json');

  try {
    const res = await fetch('https://freeimage.host/api/1/upload', {
      method: 'POST',
      body: formData,
    });
    const json = await res.json();
    console.log('FREEIMAGE_RESPONSE:', JSON.stringify(json, null, 2));
  } catch (err) {
    console.error('FREEIMAGE_ERR:', err);
  }
}

testFreeImageHost();
