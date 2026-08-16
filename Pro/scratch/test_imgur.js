import fs from 'fs';

const imgurClientIds = [
  '54642c239e5b410',
  'c90060959fcfdfd',
  '93a62886f376f9d',
  'b36368c30089a81',
  'e632832049d581f'
];

async function testImgur(clientId) {
  const buffer = fs.readFileSync('./public/kondaveedu_1.jpeg');
  const base64 = buffer.toString('base64');
  const formData = new URLSearchParams();
  formData.append('image', base64);
  formData.append('type', 'base64');

  try {
    const res = await fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      headers: {
        'Authorization': `Client-ID ${clientId}`
      },
      body: formData,
    });
    const json = await res.json();
    if (json.success && json.data?.link) {
      console.log(`IMGUR_SUCCESS [${clientId}]:`, json.data.link);
      return true;
    } else {
      console.log(`IMGUR_FAILED [${clientId}]:`, json.status, json.data?.error);
    }
  } catch (err) {
    console.log(`IMGUR_ERR [${clientId}]:`, err.message);
  }
  return false;
}

async function run() {
  for (const cid of imgurClientIds) {
    const ok = await testImgur(cid);
    if (ok) break;
  }
}

run();
