const testKeys = [
  '$2a$10$7Z2R8F8t.WwzD4R6/7bX3.u9Lq7E8/7bX3.u9Lq7E8/7bX3.u9Lq',
  '$2b$10$4k5l6m7n8o9p0q1r2s3t4u5v6w7x8y9z0a1b2c3d4e5f6g7h8i9j0',
  '$2b$10$a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z0a'
];

async function createJsonbin(key) {
  const initialData = {
    name: "Venkata Sai Developers DB",
    projects: [
      {
        id: 'kondaveedu-ghat-road-plots',
        title: 'Kondaveedu Ghat Road Villa Plots',
        tagline: 'Scenic Hillview Gated Community Plots | 150 Meters from Kondaveedu Ghat Road',
        category: 'PLOTS',
        location: '150m from Kondaveedu Ghat Road',
        priceRangeSqYd: '₹10,000 per Sq.Yd (Negotiable)',
        description: 'A magnificent master-planned gated villa plot layout strategically situated merely 150 meters from the famous Kondaveedu Ghat Road.',
        keyFeatures: [
          '150 Meters from Historical Kondaveedu Ghat Road',
          '100% Spot Registration & Clear Titles',
          '30ft Blacktop Internal Avenues',
          'Solar Electricity & Abundant Ground Water Resources Available',
          'Open Drainage System',
          'Grand Entrance Arch with 24/7 Security Gate',
          'Avenue Plantation'
        ],
        heroImage: '/kondaveedu_1.jpeg',
        galleryImages: [
          '/kondaveedu_1.jpeg',
          '/kondaveedu_2.jpeg',
          '/kondaveedu_3.jpeg',
          '/kondaveedu_4.jpeg',
          '/kondaveedu_5.jpeg',
          '/kondaveedu_6.jpeg',
          '/kondaveedu_7.jpeg'
        ],
        plotsCount: 26,
        availablePlotsCount: 22
      }
    ],
    siteVisits: [],
    inquiries: []
  };

  try {
    const res = await fetch('https://api.jsonbin.io/v3/b', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': key,
        'X-Bin-Private': 'false'
      },
      body: JSON.stringify(initialData)
    });
    const json = await res.json();
    if (json.metadata?.id) {
      console.log('JSONBIN_SUCCESS_ID:', json.metadata.id);
      return json.metadata.id;
    } else {
      console.log('JSONBIN_FAIL:', json.message);
    }
  } catch (err) {
    console.error('ERR:', err.message);
  }
}

async function run() {
  for (const k of testKeys) {
    await createJsonbin(k);
  }
}

run();
