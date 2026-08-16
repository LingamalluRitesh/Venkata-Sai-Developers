async function testMyJsonApi() {
  try {
    const res = await fetch('https://api.myjson.online/v1/records/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonData: JSON.stringify({
          projects: [{ id: 'test', title: 'Test', galleryImages: [] }]
        })
      })
    });
    console.log('STATUS:', res.status);
    const json = await res.json();
    console.log('JSON:', json);
  } catch (err) {
    console.error('ERR:', err.message);
  }
}

testMyJsonApi();
