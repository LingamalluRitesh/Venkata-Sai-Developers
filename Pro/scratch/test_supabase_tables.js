const SUPABASE_URL = 'https://igdrtqzmniigjrjnpsok.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlnZHJ0cXptbmlpZ2pyam5wc29rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY5MjExNTMsImV4cCI6MjEwMjQ5NzE1M30.kKwKaN76S1rBZs2_f1G2gUGmII8WRXzaIIUjDI9WNzE';

async function listTables() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/?apikey=${SUPABASE_ANON_KEY}`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    console.log('STATUS:', res.status);
    const json = await res.json();
    console.log('DEFINITIONS:', Object.keys(json.definitions || {}));
    console.log('PATHS:', Object.keys(json.paths || {}));
  } catch (err) {
    console.error('ERR:', err.message);
  }
}

listTables();
