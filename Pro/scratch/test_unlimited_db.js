async function testNpoint() {
  try {
    const res = await fetch('https://api.npoint.io', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        projects: [],
        siteVisits: [],
        inquiries: []
      })
    });
    const json = await res.json();
    console.log('NPOINT_RESPONSE:', json);
    if (json.id) {
      console.log('NPOINT_URL:', `https://api.npoint.io/${json.id}`);
      return `https://api.npoint.io/${json.id}`;
    }
  } catch (err) {
    console.error('NPOINT_ERR:', err.message);
  }
}

async function testJsonblob() {
  try {
    const res = await fetch('https://jsonblob.com/api/jsonBlob', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        projects: [],
        siteVisits: [],
        inquiries: []
      })
    });
    const location = res.headers.get('location');
    console.log('JSONBLOB_STATUS:', res.status);
    console.log('JSONBLOB_LOCATION:', location);
  } catch (err) {
    console.error('JSONBLOB_ERR:', err.message);
  }
}

async function run() {
  await testNpoint();
  await testJsonblob();
}

run();
