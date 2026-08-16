import fs from 'fs';

const testKeys = [
  '700a08e1e7e4971c26ec588e7b952c42',
  '01d4a0a75f10672e811c750b33a75537',
  '71a82f3b89083377ed687c4f42049e0c',
  'd540dfc221e7d8000f28325a7eb8e308',
  '6d000714986472f5a647882203363168',
  'a32608465c40026e476fb8f50438cf38',
  'c3e660144f809d4eb447b9736c5df53b',
  '702434b971a1c3d18ff02a96a40b90bc'
];

async function testKey(key) {
  const buffer = fs.readFileSync('./public/kondaveedu_1.jpeg');
  const base64 = buffer.toString('base64');
  const formData = new URLSearchParams();
  formData.append('image', base64);

  try {
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
      method: 'POST',
      body: formData,
    });
    const json = await res.json();
    if (json.success && json.data?.url) {
      console.log(`KEY_WORKING [${key}]:`, json.data.url);
      return true;
    } else {
      console.log(`KEY_FAILED [${key}]:`, json.error?.message);
    }
  } catch (err) {
    console.log(`KEY_ERR [${key}]:`, err.message);
  }
  return false;
}

async function run() {
  for (const k of testKeys) {
    const ok = await testKey(k);
    if (ok) break;
  }
}

run();
