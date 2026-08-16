import fs from 'fs';

async function testCatbox() {
  const formData = new FormData();
  formData.append('reqtype', 'fileupload');
  const buffer = fs.readFileSync('./public/kondaveedu_1.jpeg');
  const blob = new Blob([buffer], { type: 'image/jpeg' });
  formData.append('fileToUpload', blob, 'kondaveedu_1.jpeg');

  try {
    const res = await fetch('https://catbox.moe/user/api.php', {
      method: 'POST',
      body: formData,
    });
    const url = await res.text();
    console.log('CATBOX_RESPONSE_URL:', url);
  } catch (err) {
    console.error('CATBOX_ERR:', err);
  }
}

testCatbox();
