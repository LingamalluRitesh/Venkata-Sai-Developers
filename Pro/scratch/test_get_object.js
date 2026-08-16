async function testGetObject() {
  try {
    const res = await fetch('https://api.restful-api.dev/objects/ff8081819ff5b11001a00b0297de2d5c');
    console.log('GET_STATUS:', res.status);
    const json = await res.json();
    console.log('GET_JSON_KEYS:', Object.keys(json));
    const data = json.data || json;
    if (data.projects) {
      console.log('PROJECTS_COUNT:', data.projects.length);
      console.log('PROJECT_0_GALLERY_COUNT:', data.projects[0].galleryImages?.length);
      console.log('PROJECT_0_GALLERY:', data.projects[0].galleryImages);
    }
  } catch (err) {
    console.error('ERR:', err.message);
  }
}

testGetObject();
