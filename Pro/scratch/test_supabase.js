const SUPABASE_URL = 'https://igdrtqzmniigjrjnpsok.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlnZHJ0cXptbmlpZ2pyam5wc29rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY5MjExNTMsImV4cCI6MjEwMjQ5NzE1M30.kKwKaN76S1rBZs2_f1G2gUGmII8WRXzaIIUjDI9WNzE';

async function testSupabase() {
  try {
    // 1. Test GET root / schema
    const rootRes = await fetch(`${SUPABASE_URL}/rest/v1/`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    console.log('ROOT_STATUS:', rootRes.status);
    const schema = await rootRes.json();
    console.log('TABLES_FOUND:', Object.keys(schema.definitions || {}));

    // 2. Test KV table or app_data table
    const appDataRes = await fetch(`${SUPABASE_URL}/rest/v1/app_data?select=*`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    console.log('APP_DATA_STATUS:', appDataRes.status);
    const appData = await appDataRes.json();
    console.log('APP_DATA_RES:', appData);
  } catch (err) {
    console.error('ERR:', err.message);
  }
}

testSupabase();
