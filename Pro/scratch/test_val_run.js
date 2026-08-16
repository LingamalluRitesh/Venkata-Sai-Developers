async function testValRunKv() {
  const testData = {
    projects: [
      {
        id: 'kondaveedu-ghat-road-plots',
        title: 'Kondaveedu Ghat Road Villa Plots',
        galleryImages: ['https://ucarecdn.com/test1.jpg']
      }
    ],
    siteVisits: [],
    inquiries: []
  };

  try {
    const postRes = await fetch('https://kv.val.run/venkatasaidevelopers_db', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });
    console.log('POST_STATUS:', postRes.status);
    const postText = await postRes.text();
    console.log('POST_TEXT:', postText);

    const getRes = await fetch('https://kv.val.run/venkatasaidevelopers_db');
    console.log('GET_STATUS:', getRes.status);
    const getText = await getRes.text();
    console.log('GET_TEXT:', getText);
  } catch (err) {
    console.error('ERR:', err.message);
  }
}

testValRunKv();
