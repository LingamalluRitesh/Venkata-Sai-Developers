async function testUcareJson() {
  const syncData = {
    projects: [
      {
        id: 'kondaveedu-ghat-road-plots',
        title: 'Kondaveedu Ghat Road Villa Plots',
        galleryImages: [
          'https://ucarecdn.com/d5ca890e-8295-424c-9266-c27747b71459/kondaveedu_1.jpeg'
        ]
      }
    ],
    siteVisits: [],
    inquiries: [],
    updatedAt: new Date().toISOString()
  };

  const jsonBlob = new Blob([JSON.stringify(syncData, null, 2)], { type: 'application/json' });
  const formData = new FormData();
  formData.append('UPLOADCARE_PUB_KEY', 'demopublickey');
  formData.append('UPLOADCARE_STORE', '1');
  formData.append('file', jsonBlob, 'data.json');

  try {
    const uploadRes = await fetch('https://upload.uploadcare.com/base/', {
      method: 'POST',
      body: formData
    });
    const uploadJson = await uploadRes.json();
    console.log('UPLOADCARE_RESPONSE:', uploadJson);

    if (uploadJson.file) {
      const cdnUrl = `https://ucarecdn.com/${uploadJson.file}/`;
      console.log('CDN_URL:', cdnUrl);

      const getRes = await fetch(cdnUrl);
      console.log('GET_STATUS:', getRes.status);
      const text = await getRes.text();
      console.log('RAW_TEXT:', text);
      const readJson = JSON.parse(text);
      console.log('SUCCESS_PARSED_JSON:', readJson.projects[0].title);
    }
  } catch (err) {
    console.error('ERR:', err.message);
  }
}

testUcareJson();
