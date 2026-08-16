const testFirebaseEndpoints = [
  'https://venkatasaidevelopers-default-rtdb.firebaseio.com/app_data.json',
  'https://realestate-portal-db-default-rtdb.firebaseio.com/app_data.json',
  'https://sree-developers-default-rtdb.firebaseio.com/app_data.json',
  'https://antigravity-public-db-default-rtdb.firebaseio.com/app_data.json',
  'https://public-kv-store-default-rtdb.firebaseio.com/app_data.json'
];

async function testFirebase(url) {
  const initialData = {
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
    const putRes = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(initialData)
    });
    console.log(`PUT_STATUS [${url}]:`, putRes.status);
    if (putRes.ok) {
      const getRes = await fetch(url);
      console.log(`GET_STATUS [${url}]:`, getRes.status);
      const json = await getRes.json();
      if (json?.projects) {
        console.log('SUCCESS_FIREBASE_ENDPOINT:', url);
        return url;
      }
    }
  } catch (err) {
    console.log(`FIREBASE_ERR [${url}]:`, err.message);
  }
}

async function run() {
  for (const u of testFirebaseEndpoints) {
    const ok = await testFirebase(u);
    if (ok) break;
  }
}

run();
