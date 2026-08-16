import fs from 'fs';

async function testCloudinary() {
  const formData = new FormData();
  const buffer = fs.readFileSync('./public/kondaveedu_1.jpeg');
  const blob = new Blob([buffer], { type: 'image/jpeg' });
  formData.append('file', blob, 'kondaveedu_1.jpeg');
  formData.append('upload_preset', 'docs_upload_example_us_preset');

  try {
    const res = await fetch('https://api.cloudinary.com/v1_1/demo/image/upload', {
      method: 'POST',
      body: formData,
    });
    const json = await res.json();
    console.log('CLOUDINARY_RESPONSE:', JSON.stringify(json, null, 2));
  } catch (err) {
    console.error('CLOUDINARY_ERR:', err);
  }
}

testCloudinary();
