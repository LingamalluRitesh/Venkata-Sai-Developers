import fs from 'fs';

async function testTmpFiles() {
  const formData = new FormData();
  const buffer = fs.readFileSync('./public/kondaveedu_1.jpeg');
  const blob = new Blob([buffer], { type: 'image/jpeg' });
  formData.append('file', blob, 'kondaveedu_1.jpeg');

  try {
    const res = await fetch('https://tmpfiles.org/api/v1/upload', {
      method: 'POST',
      body: formData,
    });
    const json = await res.json();
    if (json.status === 'success' && json.data?.url) {
      const directUrl = json.data.url.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
      console.log('1. TMPFILES_SUCCESS:', directUrl);
      return directUrl;
    }
  } catch (err) {
    console.error('1. TMPFILES_ERR:', err.message);
  }
}

async function testImgBBFree() {
  // Free public ImgBB upload endpoint
  const buffer = fs.readFileSync('./public/kondaveedu_1.jpeg');
  const base64 = buffer.toString('base64');
  const params = new URLSearchParams();
  params.append('key', '6d000714986472f5a647882203363168');
  params.append('image', base64);

  try {
    const res = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: params,
    });
    const json = await res.json();
    if (json.success && json.data?.url) {
      console.log('2. IMGBB_SUCCESS:', json.data.url);
      return json.data.url;
    } else {
      console.log('2. IMGBB_RESPONSE:', json);
    }
  } catch (err) {
    console.error('2. IMGBB_ERR:', err.message);
  }
}

async function testPixhost() {
  const formData = new FormData();
  formData.append('content_type', '0');
  const buffer = fs.readFileSync('./public/kondaveedu_1.jpeg');
  const blob = new Blob([buffer], { type: 'image/jpeg' });
  formData.append('img', blob, 'kondaveedu_1.jpeg');

  try {
    const res = await fetch('https://pixhost.to/remote/upload', {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: formData,
    });
    const json = await res.json();
    console.log('3. PIXHOST_RESPONSE:', json);
  } catch (err) {
    console.error('3. PIXHOST_ERR:', err.message);
  }
}

async function run() {
  await testTmpFiles();
  await testImgBBFree();
  await testPixhost();
}

run();
