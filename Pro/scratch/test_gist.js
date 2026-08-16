async function testGist() {
  const initialData = {
    projects: [
      {
        id: 'kondaveedu-ghat-road-plots',
        title: 'Kondaveedu Ghat Road Villa Plots',
        galleryImages: []
      }
    ],
    siteVisits: [],
    inquiries: []
  };

  try {
    const res = await fetch('https://api.github.com/gists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'VenkataSaiDev'
      },
      body: JSON.stringify({
        description: "Venkata Sai Developers Cloud DB",
        public: true,
        files: {
          "db.json": {
            content: JSON.stringify(initialData, null, 2)
          }
        }
      })
    });
    const json = await res.json();
    console.log('GIST_STATUS:', res.status);
    console.log('GIST_ID:', json.id);
    console.log('GIST_RAW_URL:', json.files?.["db.json"]?.raw_url);
  } catch (err) {
    console.error('GIST_ERR:', err.message);
  }
}

testGist();
