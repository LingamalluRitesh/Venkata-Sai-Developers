async function testJsonStorage() {
  try {
    const res = await fetch('https://api.jsonstorage.net/v1/json?apiKey=free', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        projects: [{ id: 'test', title: 'Test', galleryImages: [] }],
        siteVisits: [],
        inquiries: []
      })
    });
    const json = await res.json();
    console.log('JSONSTORAGE_RES:', json);
  } catch (err) {
    console.error('ERR:', err.message);
  }
}

testJsonStorage();
