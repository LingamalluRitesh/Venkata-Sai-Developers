async function testJsonblobHeaders() {
  try {
    const res = await fetch('https://jsonblob.com/api/jsonBlob', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: "Venkata Sai Developers DB",
        data: {
          projects: [
            {
              id: 'kondaveedu-ghat-road-plots',
              title: 'Kondaveedu Ghat Road Villa Plots',
              galleryImages: ['https://ucarecdn.com/test1.jpg']
            }
          ],
          siteVisits: [],
          inquiries: []
        }
      })
    });
    console.log('JSONBLOB_STATUS:', res.status);
    const location = res.headers.get('location');
    console.log('LOCATION_HEADER:', location);
  } catch (err) {
    console.error('ERR:', err.message);
  }
}

testJsonblobHeaders();
