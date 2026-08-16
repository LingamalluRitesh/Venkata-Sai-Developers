async function testMyJsonDetails() {
  try {
    const res = await fetch('https://api.myjson.online/v1/records', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        collection: 'venkatasaidevelopers',
        jsonData: { test: 1 }
      })
    });
    const json = await res.json();
    console.log('MYJSON_ISSUES:', JSON.stringify(json, null, 2));
  } catch (e) {
    console.error('ERR:', e.message);
  }
}

testMyJsonDetails();
