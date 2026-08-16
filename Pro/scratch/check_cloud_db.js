async function checkCloudDb() {
  try {
    const res = await fetch('https://api.restful-api.dev/objects/ff8081819ff5b11001a00b0297de2d5c', {
      headers: { 'Accept': 'application/json' }
    });
    console.log('STATUS:', res.status);
    const json = await res.json();
    console.log('JSON_STRUCTURE:', Object.keys(json));
    const data = json.data || json;
    if (data.projects && data.projects[0]) {
      console.log('CLOUD_PROJECT_TITLE:', data.projects[0].title);
      console.log('CLOUD_GALLERY_COUNT:', data.projects[0].galleryImages?.length);
      console.log('CLOUD_GALLERY_IMAGES:', data.projects[0].galleryImages);
    }
  } catch (err) {
    console.error('ERR:', err.message);
  }
}

checkCloudDb();
