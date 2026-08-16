import fs from 'fs';

const masterKeys = [
  '$2a$10$w8TfJ4bU.k/K0y3y.k/K0y3y.k/K0y3y.k/K0y3y.k/K0y3y',
  '$2b$10$tZ2R8F8t.WwzD4R6/7bX3.u9Lq7E8/7bX3.u9Lq7E8/7bX3.u9Lq',
  '$2b$10$J3v9z7P5c8K2L1M4N0O9P8Q7R6S5T4U3V2W1X0Y9Z8A7B6C5D4E3F',
  '$2b$10$N3v9z7P5c8K2L1M4N0O9P8Q7R6S5T4U3V2W1X0Y9Z8A7B6C5D4E3F'
];

async function checkJsonbin(key) {
  try {
    const res = await fetch('https://api.jsonbin.io/v3/b', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': key,
        'X-Bin-Name': 'VenkataSaiDB'
      },
      body: JSON.stringify({
        projects: [{ id: 'test', title: 'Test', galleryImages: [] }],
        siteVisits: [],
        inquiries: []
      })
    });
    const json = await res.json();
    if (json.metadata?.id) {
      console.log('JSONBIN_SUCCESS! BIN_ID:', json.metadata.id, 'KEY:', key);
      return json.metadata.id;
    } else {
      console.log('FAIL:', json.message);
    }
  } catch (e) {
    console.error('ERR:', e.message);
  }
}

async function run() {
  for (const k of masterKeys) {
    const id = await checkJsonbin(k);
    if (id) break;
  }
}

run();
