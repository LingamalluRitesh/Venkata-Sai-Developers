const jsonbinKeys = [
  '$2a$10$tZ2R8F8t.WwzD4R6/7bX3.u9Lq7E8/7bX3.u9Lq7E8/7bX3.u9Lq',
  '$2b$10$w8TfJ4bU.k/K0y3y.k/K0y3y.k/K0y3y.k/K0y3y.k/K0y3y',
  '$2a$10$P.4H28R5M6d8V7c3b9N.u8'
];

async function testJsonbinKeys(key) {
  try {
    const res = await fetch('https://api.jsonbin.io/v3/b', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': key
      },
      body: JSON.stringify({
        name: "Venkata Sai Developers DB",
        projects: [],
        siteVisits: [],
        inquiries: []
      })
    });
    const json = await res.json();
    if (json.metadata?.id) {
      console.log('JSONBIN_KEY_WORKING:', key, 'BIN_ID:', json.metadata.id);
      return json.metadata.id;
    } else {
      console.log('JSONBIN_KEY_FAIL:', json.message);
    }
  } catch (e) {
    console.log('JSONBIN_KEY_ERR:', e.message);
  }
}

async function run() {
  for (const k of jsonbinKeys) {
    await testJsonbinKeys(k);
  }
}

run();
