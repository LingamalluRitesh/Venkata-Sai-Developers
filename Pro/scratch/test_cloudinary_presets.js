import fs from 'fs';

const presets = [
  { cloud: 'demo', preset: 'docs_upload_example_us_preset' },
  { cloud: 'dxkuf4mcc', preset: 'ml_default' },
  { cloud: 'dkh9x7b6k', preset: 'ml_default' },
  { cloud: 'dqa8e2v7y', preset: 'unsigned_preset' },
];

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
      console.log(`CLOUDINARY_SUCCESS [${cloud} / ${preset}]:`, json.secure_url);
      return true;
    } else {
      console.log(`CLOUDINARY_FAIL [${cloud} / ${preset}]:`, json.error?.message);
    }
  } catch (err) {
    console.log(`CLOUDINARY_ERR [${cloud} / ${preset}]:`, err.message);
  }
  return false;
}

async function run() {
  for (const item of presets) {
    const ok = await testCloudinary(item.cloud, item.preset);
    if (ok) break;
  }
}

run();
