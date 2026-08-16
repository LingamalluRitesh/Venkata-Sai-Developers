async function testMockApi() {
  try {
    const res = await fetch('https://65f1a5f4da8ba609ea189fb7.mockapi.io/api/v1/projects');
    console.log('MOCKAPI_STATUS:', res.status);
    if (res.ok) {
      const json = await res.json();
      console.log('MOCKAPI_DATA:', json);
    }
  } catch (err) {
    console.error('MOCKAPI_ERR:', err.message);
  }
}

testMockApi();
