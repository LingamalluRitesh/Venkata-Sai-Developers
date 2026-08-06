import { AdminSettings, LandAppreciationPoint, Plot, Project, Inquiry, SiteVisit } from '../types';

export const INITIAL_SETTINGS: AdminSettings = {
  ventureName: 'Venkata Sai Developers',
  tagline: 'Fulfill Your Dreams — Crafting Premium Villa Plots & Eco Living Spaces',
  logoUrl: '/logo.jpg',
  contactPhone: '+91 90309 03364',
  whatsappPhone: '+91 89788 15621',
  contactEmail: 'sales@venkatasaidevelopers.com',
  officeAddress: 'Annapurna Nagar 6/2, Door No. 130-6-185, Gorantla, Guntur, Andhra Pradesh – 522034',
  neonDatabaseUrl: '',
  isNeonConnected: false,
};

export const INITIAL_FOUNDER = {
  name: 'Ratnala Venkata Punnarao',
  title: 'Founder & Managing Director',
  image: '/founder.jpg',
  experienceYears: 10,
  projectsDelivered: 6,
  happyFamilies: 500,
  bio: 'Ratnala Venkata Punnarao is a visionary real estate developer and leader with over 10 years of pioneering excellence in Andhra Pradesh real estate. Under his dynamic leadership, Venkata Sai Developers has transformed land investments into wealth-generating landmarks for over 500 families.',
  visionMessage: 'At Venkata Sai Developers, our motto "Fulfill Your Dreams" is not just a slogan — it is our core commitment. Every plot layout we design near iconic locations like Kondaveedu Ghat Road is crafted with 100% legal clearance, spot registration, and world-class infrastructure so your investment yields high returns for generations.',
  coreValues: [
    'Uncompromising Integrity & 100% Legal Title Transparency',
    'Prime Strategic Locations with Rapid Land Value Appreciation',
    '100% Spot Registration & Clear Titles',
    'Customer-Centric Relations & Lifelong Support'
  ]
};

export const KONDAVEEDU_PROJECT: Project = {
  id: 'kondaveedu-villa-plots',
  title: 'Kondaveedu Ghat Road Villa Plots',
  tagline: 'Exclusive Villa Plot Venture Just 150 Meters From Historical Kondaveedu Ghat Road',
  category: 'VILLA_PLOTS',
  isUpcoming: false,
  location: 'Kondaveedu Ghat Road, Edlapadu Mandal, Palnadu District, AP, India',
  distanceFromGhatRoadMeters: 150,
  priceRangeSqYd: '₹10,000 per Sq.Yd (Negotiable)',
  description: 'A magnificent master-planned gated villa plot layout strategically situated merely 150 meters from the famous Kondaveedu Ghat Road. Surrounded by scenic hill vistas, rich historical heritage of Kondaveedu Fort, and rapid upcoming tourism & highway infrastructure.',
  keyFeatures: [
    '150 Meters from Historical Kondaveedu Ghat Road',
    '100% Spot Registration & Clear Titles',
    '30ft Blacktop Internal Avenues',
    'Solar Electricity & Abundant Ground Water Resources Available',
    'Open Drainage System',
    'Grand Entrance Arch with 24/7 Security Gate',
    'Avenue Plantation',
    'Outer Ring Road Just 8 km from the Layout',
    'ISKCON Golden Temple — 8 km from the Layout',
    'Reddy Rajulu Museum — 4 km from the Layout',
    'High Land Value Appreciation Zone'
  ],
  heroImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80',
  galleryImages: [
    '/kondaveedu_2.png',
    '/kondaveedu_3.png',
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
  ],
  plotsCount: 48,
  availablePlotsCount: 22,
};

export const INITIAL_UPCOMING_PROJECTS: Project[] = [
  {
    id: 'kondaveedu-luxury-villas',
    title: 'Kondaveedu Hillview Houses',
    tagline: 'Modern 3 & 4 BHK Duplex Eco Villas with Private Gardens',
    category: 'HOUSES',
    isUpcoming: true,
    location: 'Kondaveedu Foothills Sector 2',
    priceRangeSqYd: 'Starting Soon',
    description: 'Bespoke architect-designed duplex villas blending contemporary elegance with lush green landscapes.',
    keyFeatures: ['Solar Powered', 'Private Infinity Terrace', 'Clubhouse Access', 'Smart Home Security'],
    heroImage: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
    galleryImages: []
  },
  {
    id: 'kondaveedu-panorama-apartments',
    title: 'Kondaveedu Panorama Heights',
    tagline: 'Luxury High-Rise Apartments Facing Kondaveedu Fort Valley',
    category: 'APARTMENTS',
    isUpcoming: true,
    location: 'Near Highway Junction, Kondaveedu',
    priceRangeSqYd: 'Starting Soon',
    description: 'High-rise residential tower featuring 2, 3 & 4 BHK luxury residences with panoramic views of Kondaveedu Ghat Road.',
    keyFeatures: ['Sky Lounge', 'Olympic Size Pool', 'Gym & Spa', 'Basement Parking'],
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    galleryImages: []
  },
  {
    id: 'kondaveedu-commercial-hub',
    title: 'Ghat Road Commercial Hub',
    tagline: 'Prime Commercial Plots for Resorts, Restaurants & Malls',
    category: 'COMMERCIAL',
    isUpcoming: true,
    location: 'Directly on Kondaveedu Ghat Road Highway',
    priceRangeSqYd: 'Starting Soon',
    description: 'Strategic commercial plots with maximum frontage on the bustling tourism corridor near Kondaveedu Fort.',
    keyFeatures: ['60 Feet Main Highway Frontage', 'Approved for Resorts & Hospitality', 'Heavy Footfall Area'],
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    galleryImages: []
  }
];

export const INITIAL_PLOTS: Plot[] = [
  { id: 'p-101', plotNumber: 'A-101', sizeSqYd: 200, facing: 'EAST', pricePerSqYd: 16500, totalPrice: 3300000, status: 'AVAILABLE', dimensions: "36' x 50'", isCorner: true, block: 'Block A' },
  { id: 'p-102', plotNumber: 'A-102', sizeSqYd: 200, facing: 'EAST', pricePerSqYd: 15500, totalPrice: 3100000, status: 'AVAILABLE', dimensions: "36' x 50'", block: 'Block A' },
  { id: 'p-103', plotNumber: 'A-103', sizeSqYd: 180, facing: 'NORTH', pricePerSqYd: 16000, totalPrice: 2880000, status: 'BOOKED', dimensions: "30' x 54'", block: 'Block A' },
  { id: 'p-104', plotNumber: 'A-104', sizeSqYd: 180, facing: 'NORTH', pricePerSqYd: 16000, totalPrice: 2880000, status: 'AVAILABLE', dimensions: "30' x 54'", block: 'Block A' },
  { id: 'p-105', plotNumber: 'A-105', sizeSqYd: 250, facing: 'EAST', pricePerSqYd: 17500, totalPrice: 4375000, status: 'SOLD', dimensions: "40' x 56.25'", isCorner: true, block: 'Block A' },
  { id: 'p-106', plotNumber: 'A-106', sizeSqYd: 300, facing: 'NORTH-EAST', pricePerSqYd: 18500, totalPrice: 5550000, status: 'AVAILABLE', dimensions: "45' x 60'", isCorner: true, block: 'Block A' },
  { id: 'p-107', plotNumber: 'A-107', sizeSqYd: 150, facing: 'WEST', pricePerSqYd: 14500, totalPrice: 2175000, status: 'AVAILABLE', dimensions: "30' x 45'", block: 'Block A' },
  { id: 'p-108', plotNumber: 'A-108', sizeSqYd: 150, facing: 'WEST', pricePerSqYd: 14500, totalPrice: 2175000, status: 'AVAILABLE', dimensions: "30' x 45'", block: 'Block A' },
  
  { id: 'p-201', plotNumber: 'B-201', sizeSqYd: 200, facing: 'NORTH', pricePerSqYd: 16000, totalPrice: 3200000, status: 'AVAILABLE', dimensions: "36' x 50'", block: 'Block B' },
  { id: 'p-202', plotNumber: 'B-202', sizeSqYd: 200, facing: 'NORTH', pricePerSqYd: 16000, totalPrice: 3200000, status: 'RESERVED', dimensions: "36' x 50'", block: 'Block B' },
  { id: 'p-203', plotNumber: 'B-203', sizeSqYd: 267, facing: 'EAST', pricePerSqYd: 17000, totalPrice: 4539000, status: 'AVAILABLE', dimensions: "40' x 60'", isCorner: true, block: 'Block B' },
  { id: 'p-204', plotNumber: 'B-204', sizeSqYd: 267, facing: 'EAST', pricePerSqYd: 17000, totalPrice: 4539000, status: 'AVAILABLE', dimensions: "40' x 60'", block: 'Block B' },
  { id: 'p-205', plotNumber: 'B-205', sizeSqYd: 500, facing: 'EAST', pricePerSqYd: 18000, totalPrice: 9000000, status: 'AVAILABLE', dimensions: "60' x 75'", isCorner: true, block: 'Block B' },
  { id: 'p-206', plotNumber: 'B-206', sizeSqYd: 300, facing: 'SOUTH', pricePerSqYd: 15000, totalPrice: 4500000, status: 'SOLD', dimensions: "45' x 60'", block: 'Block B' },
  { id: 'p-207', plotNumber: 'B-207', sizeSqYd: 150, facing: 'SOUTH', pricePerSqYd: 15000, totalPrice: 2250000, status: 'AVAILABLE', dimensions: "30' x 45'", block: 'Block B' },
  { id: 'p-208', plotNumber: 'B-208', sizeSqYd: 150, facing: 'SOUTH', pricePerSqYd: 15000, totalPrice: 2250000, status: 'AVAILABLE', dimensions: "30' x 45'", block: 'Block B' }
];

export const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-1',
    name: 'Rajesh Sharma',
    phone: '+91 98490 12345',
    email: 'rajesh.sharma@example.com',
    projectName: 'Kondaveedu Ghat Road Villa Plots',
    plotNumber: 'A-101',
    message: 'Interested in East facing Corner Plot A-101. Please call me back with bank loan assistance details.',
    status: 'PENDING',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    id: 'inq-2',
    name: 'Priyanka Reddy',
    phone: '+91 94401 98765',
    email: 'priyanka.r@example.com',
    projectName: 'Kondaveedu Ghat Road Villa Plots',
    plotNumber: 'A-106',
    message: 'Looking for 300 Sq.Yd plot near entrance. Want to schedule a site visit next Sunday.',
    status: 'CONTACTED',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
  }
];

export const INITIAL_SITE_VISITS: SiteVisit[] = [
  {
    id: 'visit-1',
    name: 'Venkat Rao',
    phone: '+91 99887 66554',
    visitDate: '2026-08-08',
    timeSlot: '10:30 AM - 12:00 PM',
    pickupRequested: true,
    preferredPlotNumber: 'A-101',
    status: 'SCHEDULED',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
  }
];

export const LAND_APPRECIATION_FORECAST: LandAppreciationPoint[] = [
  { year: 2024, estimatedPriceSqYd: 10500, roiPercentage: 0, developmentMilestone: 'Ghat Road Infrastructure Approval & Initial Survey' },
  { year: 2025, estimatedPriceSqYd: 13200, roiPercentage: 25.7, developmentMilestone: 'Kondaveedu Fort Eco-Tourism Corridor Launch' },
  { year: 2026, estimatedPriceSqYd: 16500, roiPercentage: 57.1, developmentMilestone: 'Current Price: Layout Blacktop Roads & Underground Cabling' },
  { year: 2027, estimatedPriceSqYd: 21800, roiPercentage: 107.6, developmentMilestone: 'Proposed 4-Lane Highway Link & Heritage Park Completion' },
  { year: 2028, estimatedPriceSqYd: 28500, roiPercentage: 171.4, developmentMilestone: 'Nearby Villa Township Occupancy & Commercial Hub Launch' },
  { year: 2030, estimatedPriceSqYd: 42000, roiPercentage: 300.0, developmentMilestone: 'Full Regional Tourism Expansion & High Density Suburban Hub' }
];
