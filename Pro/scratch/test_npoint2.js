async function testNpointDirect() {
  try {
    const res = await fetch('https://api.npoint.io', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        projects: [
          {
            id: 'kondaveedu-ghat-road-plots',
            title: 'Kondaveedu Ghat Road Villa Plots',
            galleryImages: ['https://ucarecdn.com/test.jpg']
          }
        ],
        siteVisits: [],
        inquiries: []
      })
    });
    console.log('STATUS:', res.status);
    const json = await res.json();
    console.log('NPOINT_JSON:', json);
  } catch (err) {
    console.error('ERR:', err.message);
  }
}

testNpointDirect();
