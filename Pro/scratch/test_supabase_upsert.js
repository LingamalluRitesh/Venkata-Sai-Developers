const SUPABASE_URL = 'https://igdrtqzmniigjrjnpsok.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlnZHJ0cXptbmlpZ2pyam5wc29rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY5MjExNTMsImV4cCI6MjEwMjQ5NzE1M30.kKwKaN76S1rBZs2_f1G2gUGmII8WRXzaIIUjDI9WNzE';

async function testUpsert() {
  const payload = {
    id: 'vsd_main',
    data: {
      projects: [
        {
          id: 'kondaveedu-ghat-road-plots',
          title: 'Kondaveedu Ghat Road Villa Plots',
          galleryImages: ['/kondaveedu_1.jpeg']
        }
      ],
      siteVisits: [],
      inquiries: []
    },
    updated_at: new Date().toISOString()
  };

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/app_data`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify(payload)
    });
    console.log('UPSERT_STATUS:', res.status);
    const text = await res.text();
    console.log('UPSERT_RESPONSE:', text);
  } catch (err) {
    console.error('ERR:', err.message);
  }
}

testUpsert();
