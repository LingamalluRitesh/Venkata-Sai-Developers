import fs from 'fs';

async function testImgBB(key) {
  const buffer = fs.readFileSync('./public/kondaveedu_1.jpeg');
  const base64 = buffer.toString('base64');
  const params = new URLSearchParams();
  params.append('key', key);
  params.append('image', base64);

  try {
    const res = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: params,
    });
    const json = await res.json();
    if (json.success && json.data?.url) {
      console.log(`IMGBB_SUCCESS [${key}]:`, json.data.url);
      return json.data.url;
    }
  } catch (err) {}
}

async function testCloudinary(cloud, preset) {
  const formData = new FormData();
  const buffer = fs.readFileSync('./public/kondaveedu_1.jpeg');
  const blob = new Blob([buffer], { type: 'image/jpeg' });
  formData.append('file', blob, 'kondaveedu_1.jpeg');
  formData.append('upload_preset', preset);

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, {
      method: 'POST',
      body: formData,
    });
    const json = await res.json();
    if (json.secure_url) {
      console.log(`CLOUDINARY_SUCCESS [${cloud}/${preset}]:`, json.secure_url);
      return json.secure_url;
    }
  } catch (err) {}
}

async function testTelegraph() {
  const formData = new FormData();
  const buffer = fs.readFileSync('./public/kondaveedu_1.jpeg');
  const blob = new Blob([buffer], { type: 'image/jpeg' });
  formData.append('file', blob, 'kondaveedu_1.jpeg');

  try {
    const res = await fetch('https://telegra.ph/upload', {
      method: 'POST',
      body: formData,
    });
    const json = await res.json();
    if (Array.isArray(json) && json[0]?.src) {
      const url = `https://telegra.ph${json[0].src}`;
      console.log('TELEGRAPH_SUCCESS:', url);
      return url;
    }
  } catch (err) {}
}

async function testUploadCare(pubKey) {
  const formData = new FormData();
  formData.append('UPLOADCARE_PUB_KEY', pubKey);
  const buffer = fs.readFileSync('./public/kondaveedu_1.jpeg');
  const blob = new Blob([buffer], { type: 'image/jpeg' });
  formData.append('file', blob, 'kondaveedu_1.jpeg');

  try {
    const res = await fetch('https://upload.uploadcare.com/base/', {
      method: 'POST',
      body: formData,
    });
    const json = await res.json();
    if (json.file) {
      const url = `https://ucarecdn.com/${json.file}/kondaveedu_1.jpeg`;
      console.log(`UPLOADCARE_SUCCESS [${pubKey}]:`, url);
      return url;
    }
  } catch (err) {}
}

async function run() {
  console.log('--- TESTING STORAGE PROVIDERS ---');
  await testTelegraph();
  
  // Test Uploadcare keys
  const ucKeys = ['demopublickey', 'free_pub_key', '8976edb06f120e363ae9'];
  for (const k of ucKeys) {
    await testUploadCare(k);
  }

  // Test ImgBB keys
  const imgbbKeys = [
    '6d000714986472f5a647882203363168',
    '3e18cf411aa8df2f42a59e99a70081d5',
    'b0c79329873b4861828099933ab74844'
  ];
  for (const k of imgbbKeys) {
    await testImgBB(k);
  }
}

run();
