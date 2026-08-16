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
      // tmpfiles returns https://tmpfiles.org/12345/filename.jpg
      // direct link is https://tmpfiles.org/dl/12345/filename.jpg
      const directUrl = json.data.url.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
      console.log('TMPFILES_SUCCESS:', directUrl);
      return directUrl;
    } else {
      console.log('TMPFILES_FAIL:', json);
    }
  } catch (err) {
    console.log('TMPFILES_ERR:', err.message);
  }
}

testTmpFiles();
