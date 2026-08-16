async function testMyJson() {
  try {
    const res = await fetch('https://api.myjson.online/v1/records', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonData: {
          projects: [{ id: 'test', title: 'Test Project', galleryImages: [] }],
          siteVisits: [],
          inquiries: []
        }
      })
    });
    const json = await res.json();
    console.log('MYJSON_RESPONSE:', json);
  } catch (e) {
    console.log('MYJSON_ERR:', e.message);
  }
}

async function testJsonStorage() {
  try {
    const res = await fetch('https://api.jsonstorage.net/v1/json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        projects: [{ id: 'test', title: 'Test Project', galleryImages: [] }],
        siteVisits: [],
        inquiries: []
      })
    });
    const json = await res.json();
    console.log('JSONSTORAGE_RESPONSE:', json);
  } catch (e) {
    console.log('JSONSTORAGE_ERR:', e.message);
  }
}

async function run() {
  await testMyJson();
  await testJsonStorage();
}

run();
