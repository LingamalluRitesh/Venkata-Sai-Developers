async function testKeyval() {
  try {
    const res = await fetch('https://keyval.org/api/v1/venkatasaidevelopers_db', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        projects: [{ id: 'test', title: 'Test', galleryImages: [] }]
      })
    });
    console.log('STATUS:', res.status);
    const text = await res.text();
    console.log('TEXT:', text);
  } catch (e) {
    console.error('ERR:', e.message);
  }
}

testKeyval();
