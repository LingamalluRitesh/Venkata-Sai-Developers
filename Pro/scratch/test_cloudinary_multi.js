import fs from 'fs';

const cloudinaryConfigs = [
  { cloud: 'dffuzx82q', preset: 'ml_default' },
  { cloud: 'dtf5a77qu', preset: 'ml_default' },
  { cloud: 'de9111b2p', preset: 'preset_public' },
  { cloud: 'dny74ndm8', preset: 'ml_default' },
  { cloud: 'dqmly596u', preset: 'ml_default' },
  { cloud: 'demo', preset: 'unsigned_preset' }
];

async function testCloudinaryConfig(cloud, preset) {
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
      console.log(`FOUND_WORKING_CLOUDINARY: cloud="${cloud}", preset="${preset}" ->`, json.secure_url);
      return true;
    } else {
      console.log(`CLOUDINARY_FAIL [${cloud}/${preset}]:`, json.error?.message);
    }
  } catch (err) {
    console.log(`CLOUDINARY_ERR [${cloud}/${preset}]:`, err.message);
  }
  return false;
}

async function run() {
  for (const item of cloudinaryConfigs) {
    const ok = await testCloudinaryConfig(item.cloud, item.preset);
    if (ok) break;
  }
}

run();
