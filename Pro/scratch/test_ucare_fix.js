import fs from 'fs';

async function testUcareFix() {
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

  // Write sync data to temp file
  fs.writeFileSync('./scratch/temp_sync.json', JSON.stringify(syncData, null, 2));

  const buffer = fs.readFileSync('./scratch/temp_sync.json');
  const blob = new Blob([buffer], { type: 'application/json' });
  const formData = new FormData();
  formData.append('UPLOADCARE_PUB_KEY', 'demopublickey');
  formData.append('UPLOADCARE_STORE', '1');
  formData.append('file', blob, 'sync.json');

  try {
    const uploadRes = await fetch('https://upload.uploadcare.com/base/', {
      method: 'POST',
      body: formData
    });
    const json = await uploadRes.json();
    console.log('UPLOADCARE_JSON_RESPONSE:', json);

    if (json.file) {
      const cdnUrl = `https://ucarecdn.com/${json.file}/sync.json`;
      console.log('CDN_URL:', cdnUrl);

      const getRes = await fetch(cdnUrl);
      console.log('GET_STATUS:', getRes.status);
      const readData = await getRes.json();
      console.log('SUCCESSFULLY_PARSED_JSON:', readData.projects[0].title);
      console.log('SUCCESSFULLY_PARSED_GALLERY:', readData.projects[0].galleryImages);
    }
  } catch (err) {
    console.error('ERR:', err.message);
  }
}

testUcareFix();
