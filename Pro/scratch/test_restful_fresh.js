async function testRestfulApiFresh() {
  const initialData = {
    name: "Venkata Sai Developers DB 2026",
    data: {
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
    }
  };

  try {
    const res = await fetch('https://api.restful-api.dev/objects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(initialData)
    });
    const json = await res.json();
    console.log('STATUS:', res.status);
    console.log('JSON:', json);
    if (json.id) {
      console.log('SUCCESS_OBJECT_ID:', json.id);
    }
  } catch (err) {
    console.error('ERR:', err.message);
  }
}

testRestfulApiFresh();
