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
      console.log('PROVIDER_TMPFILES_SUCCESS:', directUrl);
      return directUrl;
    }
  } catch (err) {
    console.error('PROVIDER_TMPFILES_ERR:', err.message);
  }
}

async function testCatboxProxy() {
  const formData = new FormData();
  formData.append('reqtype', 'fileupload');
  const buffer = fs.readFileSync('./public/kondaveedu_1.jpeg');
  const blob = new Blob([buffer], { type: 'image/jpeg' });
  formData.append('fileToUpload', blob, 'kondaveedu_1.jpeg');

  try {
    const res = await fetch('https://corsproxy.io/?https://catbox.moe/user/api.php', {
      method: 'POST',
      body: formData,
    });
    if (res.ok) {
      const url = (await res.text()).trim();
      if (url.startsWith('https://')) {
        console.log('PROVIDER_CATBOX_PROXY_SUCCESS:', url);
        return url;
      }
    }
  } catch (err) {
    console.error('PROVIDER_CATBOX_PROXY_ERR:', err.message);
  }
}

async function run() {
  await testTmpFiles();
  await testCatboxProxy();
}

run();
