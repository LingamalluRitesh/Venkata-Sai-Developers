async function testTmpFilesJsonSync() {
  const syncData = {
    projects: [
      {
        id: 'kondaveedu-ghat-road-plots',
        title: 'Kondaveedu Ghat Road Villa Plots',
        galleryImages: [
          'https://ucarecdn.com/d5ca890e-8295-424c-9266-c27747b71459/kondaveedu_1.jpeg',
          'https://ucarecdn.com/d5ca890e-8295-424c-9266-c27747b71459/kondaveedu_2.jpeg'
        ]
      }
    ],
    siteVisits: [],
    inquiries: [],
    updatedAt: new Date().toISOString()
  };

  const jsonBlob = new Blob([JSON.stringify(syncData, null, 2)], { type: 'application/json' });
  const formData = new FormData();
  formData.append('file', jsonBlob, 'db_sync.json');

  try {
    const uploadRes = await fetch('https://tmpfiles.org/api/v1/upload', {
      method: 'POST',
      body: formData
    });
    const uploadJson = await uploadRes.json();
    console.log('UPLOAD_RES:', uploadJson);

    if (uploadJson.data?.url) {
      const cdnUrl = uploadJson.data.url.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
      console.log('CDN_JSON_URL:', cdnUrl);

      // Read back
      const readRes = await fetch(cdnUrl);
      const readJson = await readRes.json();
      console.log('READ_PROJECT_TITLE:', readJson.projects[0].title);
      console.log('READ_GALLERY_COUNT:', readJson.projects[0].galleryImages.length);
    }
  } catch (err) {
    console.error('ERR:', err.message);
  }
}

testTmpFilesJsonSync();
