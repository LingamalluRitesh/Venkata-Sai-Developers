async function testJsonbinUnauth() {
  try {
    const res = await fetch('https://api.jsonbin.io/v3/b', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Bin-Private': 'false',
        'X-Bin-Name': 'venkatasai_db'
      },
      body: JSON.stringify({
        projects: [{ id: 'test', title: 'Test', galleryImages: [] }],
        siteVisits: [],
        inquiries: []
      })
    });
    const json = await res.json();
    console.log('JSONBIN_RES:', json);
  } catch (err) {
    console.error('ERR:', err.message);
  }
}

testJsonbinUnauth();
