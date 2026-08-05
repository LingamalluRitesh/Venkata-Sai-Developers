export type PlotStatus = 'AVAILABLE' | 'BOOKED' | 'RESERVED' | 'SOLD';
export type FacingDirection = 'EAST' | 'WEST' | 'NORTH' | 'SOUTH' | 'NORTH-EAST' | 'SOUTH-EAST';

export interface Plot {
  id: string;
  plotNumber: string;
  sizeSqYd: number;
  facing: FacingDirection;
  pricePerSqYd: number;
  totalPrice: number;
  status: PlotStatus;
  dimensions?: string; // e.g. "30' x 45'"
  isCorner?: boolean;
  block?: string; // e.g. "Block A"
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'VILLA_PLOTS' | 'HOUSES' | 'APARTMENTS' | 'COMMERCIAL';
  isUpcoming: boolean;
  location: string;
  distanceFromGhatRoadMeters?: number;
  priceRangeSqYd: string;
  description: string;
  keyFeatures: string[];
  heroImage: string;
  galleryImages: string[];
  brochureUrl?: string;
  plotsCount?: number;
  availablePlotsCount?: number;
}

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  projectName: string;
  plotNumber?: string;
  message: string;
  status: 'PENDING' | 'CONTACTED' | 'RESOLVED';
  createdAt: string;
}

export interface SiteVisit {
  id: string;
  name: string;
  phone: string;
  visitDate: string;
  timeSlot: string;
  pickupRequested: boolean;
  pickupAddress?: string;
  preferredPlotNumber?: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
}

export interface LandAppreciationPoint {
  year: number;
  estimatedPriceSqYd: number;
  roiPercentage: number;
  developmentMilestone: string;
}

export interface AdminSettings {
  ventureName: string;
  tagline: string;
  logoUrl: string;
  contactPhone: string;
  whatsappPhone?: string;
  contactEmail: string;
  officeAddress: string;
  neonDatabaseUrl?: string;
  isNeonConnected?: boolean;
}

export interface FounderInfo {
  name: string;
  title: string;
  image: string;
  experienceYears: number;
  projectsDelivered: number;
  happyFamilies: number;
  bio: string;
  visionMessage: string;
  coreValues: string[];
}

export type ActiveTab = 'USER_HOME' | 'KONDAVEEDU_VENTURE' | 'LAND_CALCULATOR' | 'UPCOMING_PROJECTS' | 'FOUNDER_PAGE' | 'ADMIN_PORTAL';

