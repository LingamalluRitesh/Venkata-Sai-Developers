import fs from 'fs';

const keys = [
  '$2a$10$4k5l6m7n8o9p0q1r2s3t4u5v6w7x8y9z0a1b2c3d4e5f6g7h8i9j0',
  '$2b$10$w8TfJ4bU.k/K0y3y.k/K0y3y.k/K0y3y.k/K0y3y.k/K0y3y',
  '$2a$10$7Z2R8F8t.WwzD4R6/7bX3.u9Lq7E8/7bX3.u9Lq7E8/7bX3.u9Lq'
];

async function createBin(key) {
  try {
    const res = await fetch('https://api.jsonbin.io/v3/b', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': key,
        'X-Bin-Private': 'false'
      },
      body: JSON.stringify({
        name: "Venkata Sai Developers DB 2026",
        projects: [
          {
            id: 'kondaveedu-ghat-road-plots',
            title: 'Kondaveedu Ghat Road Villa Plots',
            galleryImages: []
          }
        ],
        siteVisits: [],
        inquiries: []
      })
    });
    const json = await res.json();
    if (json.metadata?.id) {
      console.log('KEY_WORKING:', key);
      console.log('BIN_ID:', json.metadata.id);
      return json.metadata.id;
    } else {
      console.log('KEY_FAIL:', json.message);
    }
  } catch (err) {
    console.error('ERR:', err.message);
  }
}

async function run() {
  for (const k of keys) {
    const id = await createBin(k);
    if (id) break;
  }
}

run();
