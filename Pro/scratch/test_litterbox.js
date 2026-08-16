import fs from 'fs';

async function testLitterbox() {
  const formData = new FormData();
  formData.append('reqtype', 'fileupload');
  formData.append('time', '72h');
  const buffer = fs.readFileSync('./public/kondaveedu_1.jpeg');
  const blob = new Blob([buffer], { type: 'image/jpeg' });
  formData.append('fileToUpload', blob, 'kondaveedu_1.jpeg');

  try {
    const res = await fetch('https://litterbox.catbox.moe/resources/internals/api.php', {
      method: 'POST',
      body: formData,
    });
    const text = await res.text();
    console.log('LITTERBOX_CORS:', res.headers.get('access-control-allow-origin'));
    console.log('LITTERBOX_URL:', text);
  } catch (err) {
    console.error('LITTERBOX_ERR:', err);
  }
}

testLitterbox();
