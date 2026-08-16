import fs from 'fs';

const testKeys = [
  '4b27b322a36bcfd30a08e64c483d47a4',
  '9f41be29ef31835940e4f4b1625902fa',
  '3e18cf411aa8df2f42a59e99a70081d5',
  '01d4a0a75f10672e811c750b33a75537',
  '2d733e8b09f4567201df1c750b33a755',
  'c627a92ad1ab4861828099933ab74844',
  'b0c79329873b4861828099933ab74844',
  '3b50c18408107936a7bf5d09874a49c6'
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
