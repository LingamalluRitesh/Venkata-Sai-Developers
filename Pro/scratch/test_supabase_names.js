const SUPABASE_URL = 'https://igdrtqzmniigjrjnpsok.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlnZHJ0cXptbmlpZ2pyam5wc29rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY5MjExNTMsImV4cCI6MjEwMjQ5NzE1M30.kKwKaN76S1rBZs2_f1G2gUGmII8WRXzaIIUjDI9WNzE';

const possibleTables = [
  'projects',
  'leads',
  'site_visits',
  'inquiries',
  'kv_store',
  'kv',
  'data',
  'store',
  'items',
  'properties'
];

async function checkTable(name) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${name}?select=*`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    console.log(`TABLE [${name}]:`, res.status);
    if (res.ok) {
      const data = await res.json();
      console.log(`FOUND TABLE [${name}]:`, data);
      return name;
    }
  } catch (err) {
    console.error(`ERR [${name}]:`, err.message);
  }
}

async function run() {
  for (const t of possibleTables) {
    await checkTable(t);
  }
}

run();
