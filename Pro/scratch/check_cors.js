import fs from 'fs';

async function checkCors() {
  const formData = new FormData();
  const buffer = fs.readFileSync('./public/kondaveedu_1.jpeg');
  const blob = new Blob([buffer], { type: 'image/jpeg' });
  formData.append('file', blob, 'kondaveedu_1.jpeg');

  try {
    const res = await fetch('https://tmpfiles.org/api/v1/upload', {
      method: 'POST',
      body: formData,
    });
    console.log('TMPFILES_CORS_HEADER:', res.headers.get('access-control-allow-origin'));
    console.log('TMPFILES_STATUS:', res.status);
  } catch (e) {
    console.log('TMPFILES_ERR:', e.message);
  }
}

checkCors();
