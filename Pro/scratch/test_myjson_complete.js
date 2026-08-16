async function testMyJsonFlow() {
  try {
    // 1. Create collection
    const colRes = await fetch('https://api.myjson.online/v1/collections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'venkatasaidevelopers' })
    });
    const colJson = await colRes.json();
    console.log('COLLECTION_RES:', colJson);
    const collectionId = colJson.id || colJson.data?.id;

    if (collectionId) {
      // 2. Create record
      const recRes = await fetch('https://api.myjson.online/v1/records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          collectionId,
          jsonData: JSON.stringify({
            projects: [{ id: 'test', title: 'Test', galleryImages: [] }]
          })
        })
      });
      const recJson = await recRes.json();
      console.log('RECORD_RES:', recJson);
    }
  } catch (err) {
    console.error('ERR:', err.message);
  }
}

testMyJsonFlow();
