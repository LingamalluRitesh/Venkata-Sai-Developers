import fs from 'fs';

async function testKraken() {
  const formData = new FormData();
  const buffer = fs.readFileSync('./public/kondaveedu_1.jpeg');
  const blob = new Blob([buffer], { type: 'image/jpeg' });
  formData.append('file', blob, 'kondaveedu_1.jpeg');

  try {
    const res = await fetch('https://file.io', {
      method: 'POST',
      body: formData,
    });
    const json = await res.json();
    console.log('FILE_IO_RESPONSE:', json);
  } catch (err) {
    console.error('FILE_IO_ERR:', err.message);
  }
}

testKraken();
