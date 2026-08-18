const SUPABASE_URL = 'https://igdrtqzmniigjrjnpsok.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlnZHJ0cXptbmlpZ2pyam5wc29rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY5MjExNTMsImV4cCI6MjEwMjQ5NzE1M30.kKwKaN76S1rBZs2_f1G2gUGmII8WRXzaIIUjDI9WNzE';

async function testSupabaseStorage() {
  try {
    // 1. List buckets
    const listRes = await fetch(`${SUPABASE_URL}/storage/v1/bucket`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    console.log('LIST_BUCKETS_STATUS:', listRes.status);
    const buckets = await listRes.json();
    console.log('BUCKETS:', buckets);

    // 2. Create public bucket 'photos' if not exists
    const createRes = await fetch(`${SUPABASE_URL}/storage/v1/bucket`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: 'photos',
        name: 'photos',
        public: true,
        file_size_limit: 10485760, // 10MB
        allowed_mime_types: ['image/png', 'image/jpeg', 'image/webp', 'image/jpg']
      })
    });
    console.log('CREATE_BUCKET_STATUS:', createRes.status);
    const createJson = await createRes.json();
    console.log('CREATE_BUCKET_RES:', createJson);
  } catch (err) {
    console.error(err);
  }
}

testSupabaseStorage();
