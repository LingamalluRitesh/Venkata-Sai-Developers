import fs from 'fs';

async function testUpload() {
  const apiKey = '6d000714986472f5a647882203363168';
  const buffer = fs.readFileSync('./public/kondaveedu_1.jpeg');
  const base64 = buffer.toString('base64');

  const formData = new URLSearchParams();
  formData.append('image', base64);

  try {
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: formData,
    });
    const json = await res.json();
    console.log('JSON_RESPONSE:', JSON.stringify(json, null, 2));
  } catch (err) {
    console.error('UPLOAD_ERR:', err);
  }
}

testUpload();
