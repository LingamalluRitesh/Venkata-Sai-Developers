import pg from 'pg';

const connectionString = "postgresql://neondb_owner:npg_xQLqDFIPid16@ep-weathered-math-aydrkoz6-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require";

async function testNeon() {
  const client = new pg.Client({ connectionString });
  try {
    await client.connect();
    console.log('NEON_CONNECTED_SUCCESS!');
    
    // Create table if not exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS site_store (
        id VARCHAR(50) PRIMARY KEY,
        data JSONB NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('TABLE_CREATED_SUCCESS!');

    const res = await client.query('SELECT * FROM site_store WHERE id = $1', ['app_data']);
    console.log('NEON_ROWS_FOUND:', res.rows.length);
    await client.end();
  } catch (err) {
    console.error('NEON_ERR:', err.message);
  }
}

testNeon();
