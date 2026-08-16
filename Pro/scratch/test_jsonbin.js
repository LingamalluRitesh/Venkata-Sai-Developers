async function testJsonbin() {
  try {
    const res = await fetch('https://api.jsonbin.io/v3/b', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Bin-Private': 'false'
      },
      body: JSON.stringify({
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
    console.log('JSONBIN_RESPONSE:', json);
    if (json.metadata?.id) {
      console.log('BIN_ID:', json.metadata.id);
    }
  } catch (err) {
    console.error('JSONBIN_ERR:', err.message);
  }
}

testJsonbin();
