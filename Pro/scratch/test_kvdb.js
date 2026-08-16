async function testKvdb() {
  try {
    const params = new URLSearchParams();
    params.append('email', 'venkatasaidevelopersinfo@gmail.com');
    const createRes = await fetch('https://kvdb.io', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    });
    const bucket = (await createRes.text()).trim();
    console.log('KVDB_BUCKET_CREATED:', bucket);

    const testData = {
      projects: [
        {
          id: 'kondaveedu-ghat-road-plots',
          title: 'Kondaveedu Ghat Road Villa Plots',
          galleryImages: ['https://ucarecdn.com/test1.jpg', 'https://ucarecdn.com/test2.jpg']
        }
      ],
      siteVisits: [],
      inquiries: []
    };

    const writeRes = await fetch(`https://kvdb.io/${bucket}/site_data`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });
    console.log('WRITE_STATUS:', writeRes.status);

    const readRes = await fetch(`https://kvdb.io/${bucket}/site_data`);
    console.log('READ_STATUS:', readRes.status);
    const readJson = await readRes.json();
    console.log('READ_DATA_SUCCESS:', readJson.projects[0].title);
    console.log('READ_DATA_GALLERY_COUNT:', readJson.projects[0].galleryImages.length);
  } catch (err) {
    console.error('KVDB_ERR:', err.message);
  }
}

testKvdb();
