import fs from 'fs';

async function uploadToCatbox(fileBlob, fileName) {
  const formData = new FormData();
  formData.append('reqtype', 'fileupload');
  formData.append('fileToUpload', fileBlob, fileName);
  
  const res = await fetch('https://catbox.moe/user/api.php', {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error(`Catbox upload failed HTTP ${res.status}`);
  const url = (await res.text()).trim();
  if (url.startsWith('https://')) return url;
  throw new Error(`Invalid response URL: ${url}`);
}

async function run() {
  const buffer = fs.readFileSync('./public/kondaveedu_1.jpeg');
  const blob = new Blob([buffer], { type: 'image/jpeg' });
  try {
    const url = await uploadToCatbox(blob, 'kondaveedu_1.jpeg');
    console.log('TEST_RESULT_SUCCESS_URL:', url);
  } catch (err) {
    console.error('TEST_RESULT_ERR:', err.message);
  }
}

run();
