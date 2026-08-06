import pg from 'pg';
const { Client } = pg;

const renderDbUrl = "postgresql://venkata_sai_db_user:3n83Do8WceScv3ssTD1AN4JaB6HAc7F5@dpg-d9q4drflk1mc73eietk0-a.oregon-postgres.render.com/venkata_sai_db?ssl=true";

async function main() {
  console.log("=========================================");
  console.log("CONNECTING TO RENDER POSTGRESQL DATABASE...");
  console.log("=========================================");

  const client = new Client({
    connectionString: renderDbUrl,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log("✅ CONNECTED TO RENDER POSTGRESQL SUCCESSFULLY!");

    // Create projects table
    await client.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        tagline TEXT,
        category VARCHAR(100) DEFAULT 'VILLA_PLOTS',
        is_upcoming BOOLEAN DEFAULT FALSE,
        location TEXT,
        distance_from_ghat_road_meters INTEGER DEFAULT 150,
        price_range_sqyd TEXT,
        description TEXT,
        hero_image TEXT,
        gallery_images JSONB DEFAULT '[]'::jsonb,
        gov_development_images JSONB DEFAULT '[]'::jsonb,
        brochure_url TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Created 'projects' table.");

    // Create plots table
    await client.query(`
      CREATE TABLE IF NOT EXISTS plots (
        id VARCHAR(255) PRIMARY KEY,
        plot_number VARCHAR(100) NOT NULL,
        size_sq_yd NUMERIC NOT NULL,
        facing VARCHAR(50) NOT NULL,
        price_per_sq_yd NUMERIC NOT NULL,
        total_price NUMERIC NOT NULL,
        status VARCHAR(50) DEFAULT 'AVAILABLE',
        block VARCHAR(100),
        dimensions VARCHAR(100),
        is_corner BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Created 'plots' table.");

    // Create inquiries table
    await client.query(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(100) NOT NULL,
        email VARCHAR(255),
        project_name VARCHAR(255),
        plot_number VARCHAR(100),
        message TEXT,
        status VARCHAR(50) DEFAULT 'NEW',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Created 'inquiries' table.");

    // Create site_visits table
    await client.query(`
      CREATE TABLE IF NOT EXISTS site_visits (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(100) NOT NULL,
        visit_date VARCHAR(100) NOT NULL,
        time_slot VARCHAR(100) NOT NULL,
        pickup_requested BOOLEAN DEFAULT FALSE,
        pickup_address TEXT,
        preferred_plot_number VARCHAR(100),
        status VARCHAR(50) DEFAULT 'SCHEDULED',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Created 'site_visits' table.");

    // Populate default Kondaveedu project
    const defaultGallery = JSON.stringify([
      '/kondaveedu_2.png',
      '/kondaveedu_3.png',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    ]);

    await client.query(`
      INSERT INTO projects (
        id, title, tagline, category, is_upcoming, location, distance_from_ghat_road_meters,
        price_range_sqyd, description, hero_image, gallery_images
      )
      VALUES (
        'kondaveedu-villa-plots',
        'Kondaveedu Ghat Road Villa Plots',
        'Exclusive Villa Plot Venture Just 150 Meters From Historical Kondaveedu Ghat Road',
        'VILLA_PLOTS',
        FALSE,
        'Kondaveedu, Edlapadu Mandal, Palnadu District, AP, India',
        150,
        '₹10,000 per Sq.Yd (Negotiable)',
        'A magnificent master-planned gated villa plot layout strategically situated merely 150 meters from the famous Kondaveedu Ghat Road.',
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80',
        $1
      )
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        tagline = EXCLUDED.tagline,
        location = EXCLUDED.location,
        distance_from_ghat_road_meters = EXCLUDED.distance_from_ghat_road_meters,
        price_range_sqyd = EXCLUDED.price_range_sqyd,
        description = EXCLUDED.description,
        hero_image = EXCLUDED.hero_image,
        updated_at = CURRENT_TIMESTAMP;
    `, [defaultGallery]);

    console.log("✅ Populated 'kondaveedu-villa-plots' project in Render Postgres DB.");

    await client.end();
    console.log("=========================================");
    console.log("SUCCESS! RENDER POSTGRESQL DB IS READY!");
    console.log("=========================================");
  } catch (err) {
    console.error("❌ Render DB Setup Error:", err);
    try { await client.end(); } catch (e) {}
  }
}

main();
