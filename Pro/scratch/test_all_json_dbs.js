async function testJsonBlob() {
  try {
    const res = await fetch('https://jsonblob.com/api/jsonBlob', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0'
      },
      body: JSON.stringify({
        projects: [
          {
            id: 'kondaveedu-ghat-road-plots',
            title: 'Kondaveedu Ghat Road Villa Plots',
            galleryImages: ['https://ucarecdn.com/test.jpg']
          }
        ]
      })
    });
    console.log('JSONBLOB_STATUS:', res.status);
    const loc = res.headers.get('Location') || res.headers.get('location');
    console.log('JSONBLOB_LOC:', loc);
    if (loc) {
      const getRes = await fetch(loc);
      console.log('JSONBLOB_GET_STATUS:', getRes.status);
      const json = await getRes.json();
      console.log('JSONBLOB_SUCCESS:', json.projects[0].title);
      return loc;
    }
  } catch (e) {
    console.log('JSONBLOB_ERR:', e.message);
  }
}

async function run() {
  await testJsonBlob();
}

run();
