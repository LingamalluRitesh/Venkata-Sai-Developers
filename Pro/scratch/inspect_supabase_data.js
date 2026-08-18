const SUPABASE_URL = 'https://igdrtqzmniigjrjnpsok.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlnZHJ0cXptbmlpZ2pyam5wc29rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY5MjExNTMsImV4cCI6MjEwMjQ5NzE1M30.kKwKaN76S1rBZs2_f1G2gUGmII8WRXzaIIUjDI9WNzE';

async function checkSupabase() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/app_data?id=eq.vsd_main&select=*`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    const json = await res.json();
    console.log('SUPABASE_ROWS:', JSON.stringify(json, null, 2));
    if (json[0]?.data?.projects) {
      console.log('GALLERY_IMAGES_COUNT:', json[0].data.projects[0].galleryImages?.length);
      console.log('GALLERY_IMAGES:', json[0].data.projects[0].galleryImages);
    }
  } catch (err) {
    console.error(err);
  }
}

checkSupabase();
