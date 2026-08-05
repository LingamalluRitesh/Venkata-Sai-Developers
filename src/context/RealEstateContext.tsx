import React, { createContext, useContext, useState, useEffect } from 'react'

export interface Property {
  id: string
  title: string
  tagline: string
  type: 'Villa' | 'Apartment' | 'Penthouse' | 'Townhouse' | 'Commercial'
  status: 'For Sale' | 'For Rent' | 'Hot Deal' | 'Newly Built'
  price: number
  priceFormatted: string
  period?: 'month' | 'year'
  location: string
  city: string
  address: string
  bedrooms: number
  bathrooms: number
  areaSqft: number
  garages: number
  yearBuilt: number
  image: string
  gallery: string[]
  description: string
  amenities: string[]
  agent: {
    name: string
    role: string
    phone: string
    email: string
    avatar: string
  }
  featured?: boolean
  rating: number
}

export interface TourBooking {
  id: string
  propertyId: string
  propertyTitle: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  tourType: 'In-Person Tour' | '3D Virtual Video Tour'
  message?: string
  createdAt: string
}

export interface FilterState {
  searchQuery: string
  category: 'all' | 'For Sale' | 'For Rent'
  propertyType: string
  city: string
  priceRange: [number, number]
  bedrooms: string
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'sqft-desc'
}

interface RealEstateContextType {
  properties: Property[]
  favorites: string[]
  toggleFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
  selectedProperty: Property | null
  setSelectedProperty: (property: Property | null) => void
  tourModalProperty: Property | null
  setTourModalProperty: (property: Property | null) => void
  filters: FilterState
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>
  resetFilters: () => void
  tourBookings: TourBooking[]
  addTourBooking: (booking: Omit<TourBooking, 'id' | 'createdAt'>) => void
  isAdminOpen: boolean
  setIsAdminOpen: (open: boolean) => void
  addProperty: (property: Property) => void
}

const defaultProperties: Property[] = [
  {
    id: 'prop-1',
    title: 'The Glass Pavilion Horizon Villa',
    tagline: 'Ultra-luxury modern minimalist estate with panoramic infinity pool',
    type: 'Villa',
    status: 'For Sale',
    price: 4850000,
    priceFormatted: '$4,850,000',
    location: 'Jubilee Hills, Hyderabad',
    city: 'Hyderabad',
    address: 'Road No. 36, Jubilee Hills, Hyderabad',
    bedrooms: 5,
    bathrooms: 6,
    areaSqft: 7200,
    garages: 4,
    yearBuilt: 2025,
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop&q=80'
    ],
    description: 'An architectural masterpiece situated atop Jubilee Hills, featuring floor-to-ceiling double-glazed glass walls, a private heated infinity pool, smart home automation, temperature-controlled wine cellar, and lush landscaped Italian gardens.',
    amenities: ['Infinity Pool', 'Smart Home Automation', 'Home Cinema', 'Private Gym', 'Italian Marble Flooring', 'Solar Power Backup', '24/7 Gated Security', 'Wine Cellar'],
    agent: {
      name: 'Rohan Verma',
      role: 'Senior Luxury Director',
      phone: '+91 98765 43210',
      email: 'rohan.v@havenrealty.com',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80'
    },
    featured: true,
    rating: 4.95
  },
  {
    id: 'prop-2',
    title: 'Skyline Crown Penthouse',
    tagline: 'Duplex penthouse with 360-degree ocean & city skyline views',
    type: 'Penthouse',
    status: 'For Sale',
    price: 3200000,
    priceFormatted: '$3,200,000',
    location: 'Beach Road, Visakhapatnam',
    city: 'Visakhapatnam',
    address: 'Bayview Towers, Beach Road, Visakhapatnam',
    bedrooms: 4,
    bathrooms: 5,
    areaSqft: 5400,
    garages: 3,
    yearBuilt: 2024,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&auto=format&fit=crop&q=80'
    ],
    description: 'Perched on the 32nd floor offering uninterrupted views of the ocean waves and city lights. Features a private rooftop lounge, glass jacuzzi, imported German kitchen fitments, and private elevator access.',
    amenities: ['Private Rooftop Jacuzzi', 'Direct Ocean View', 'Private Elevator', 'German Modular Kitchen', 'Concierge Service', 'EV Charging Station', 'Valet Parking'],
    agent: {
      name: 'Ananya Sharma',
      role: 'Penthouse Specialist',
      phone: '+91 98765 88990',
      email: 'ananya.s@havenrealty.com',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80'
    },
    featured: true,
    rating: 4.98
  },
  {
    id: 'prop-3',
    title: 'The Sunlit Eco Sanctuary Villa',
    tagline: 'Contemporary net-zero luxury home surrounded by nature',
    type: 'Villa',
    status: 'Hot Deal',
    price: 2150000,
    priceFormatted: '$2,150,000',
    location: 'Financial District, Gachibowli',
    city: 'Hyderabad',
    address: 'Ecoluxe Enclave, Financial District, Hyderabad',
    bedrooms: 4,
    bathrooms: 4.5,
    areaSqft: 4800,
    garages: 2,
    yearBuilt: 2025,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&auto=format&fit=crop&q=80'
    ],
    description: 'Designed for sustainable luxury living with 100% solar energy grid, rainwater harvesting, indoor courtyard with tropical garden, air purification filtration, and floor-to-ceiling teakwood sliding doors.',
    amenities: ['Net-Zero Solar Grid', 'Indoor Tropical Courtyard', 'Air Purification System', 'Heated Lap Pool', 'Smart Lighting', 'Organic Herb Garden'],
    agent: {
      name: 'Rohan Verma',
      role: 'Senior Luxury Director',
      phone: '+91 98765 43210',
      email: 'rohan.v@havenrealty.com',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80'
    },
    featured: true,
    rating: 4.92
  },
  {
    id: 'prop-4',
    title: 'Azure Bayfront Modern Residences',
    tagline: 'High-end waterfront apartment with private marina access',
    type: 'Apartment',
    status: 'For Rent',
    price: 4500,
    priceFormatted: '$4,500',
    period: 'month',
    location: 'Rushikonda, Visakhapatnam',
    city: 'Visakhapatnam',
    address: 'Coastal Heights, Rushikonda, Visakhapatnam',
    bedrooms: 3,
    bathrooms: 3,
    areaSqft: 2800,
    garages: 2,
    yearBuilt: 2024,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80'
    ],
    description: 'Fully furnished luxury beachfront 3-bedroom apartment with custom Italian furniture, expansive balcony overlooking the bay, infinity pool access, and 24/7 clubhouse amenities.',
    amenities: ['Sea View Balcony', 'Fully Furnished', 'Infinity Pool', 'Clubhouse Access', '24/7 Security', 'High-Speed Internet'],
    agent: {
      name: 'Ananya Sharma',
      role: 'Penthouse Specialist',
      phone: '+91 98765 88990',
      email: 'ananya.s@havenrealty.com',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80'
    },
    featured: false,
    rating: 4.88
  },
  {
    id: 'prop-5',
    title: 'The Royal Heritage Mansion',
    tagline: 'Palatial estate with private tennis court & lush botanical park',
    type: 'Villa',
    status: 'For Sale',
    price: 6500000,
    priceFormatted: '$6,500,000',
    location: 'Banjara Hills, Hyderabad',
    city: 'Hyderabad',
    address: 'Heritage Drive, Road No. 1, Banjara Hills',
    bedrooms: 6,
    bathrooms: 8,
    areaSqft: 10500,
    garages: 6,
    yearBuilt: 2023,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&auto=format&fit=crop&q=80'
    ],
    description: 'Spanning over 1.5 acres of private prime land in Banjara Hills. Features custom marble fountains, grand double staircase, Olympic-style swimming pool, private tennis court, and quarters for staff.',
    amenities: ['Private Tennis Court', '1.5 Acre Botanical Park', 'Olympic Lap Pool', 'Staff Quarters', 'Granite Fountains', 'Gated Perimeter'],
    agent: {
      name: 'Rohan Verma',
      role: 'Senior Luxury Director',
      phone: '+91 98765 43210',
      email: 'rohan.v@havenrealty.com',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80'
    },
    featured: true,
    rating: 4.99
  },
  {
    id: 'prop-6',
    title: 'Urban Apex Corporate Tower Suite',
    tagline: 'Grade-A commercial office space with smart automation',
    type: 'Commercial',
    status: 'For Rent',
    price: 8500,
    priceFormatted: '$8,500',
    period: 'month',
    location: 'HITEC City, Hyderabad',
    city: 'Hyderabad',
    address: 'Cyber Towers Boulevard, HITEC City, Hyderabad',
    bedrooms: 0,
    bathrooms: 4,
    areaSqft: 6200,
    garages: 5,
    yearBuilt: 2025,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80'
    ],
    description: 'Premium corporate workspace setup ready for tech companies or financial firms. Features boardrooms, ergonomic workstations, central HVAC, bio-metric security, and fiber optic connectivity.',
    amenities: ['Central HVAC', 'Fiber Connectivity', 'Biometric Access', 'Executive Boardroom', 'Cafeteria', 'Underground Parking'],
    agent: {
      name: 'Vikram Mehta',
      role: 'Commercial Real Estate Lead',
      phone: '+91 99887 76655',
      email: 'vikram.m@havenrealty.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80'
    },
    featured: false,
    rating: 4.90
  }
]

const RealEstateContext = createContext<RealEstateContextType | undefined>(undefined)

export const RealEstateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>(() => {
    const saved = localStorage.getItem('haven_properties_v1')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) {}
    }
    return defaultProperties
  })

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('haven_favorites_v1')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) {}
    }
    return ['prop-1', 'prop-2']
  })

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [tourModalProperty, setTourModalProperty] = useState<Property | null>(null)

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    category: 'all',
    propertyType: 'All',
    city: 'All',
    priceRange: [0, 10000000],
    bedrooms: 'All',
    sortBy: 'featured'
  })

  const [tourBookings, setTourBookings] = useState<TourBooking[]>(() => {
    const saved = localStorage.getItem('haven_tour_bookings_v1')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) {}
    }
    return []
  })

  const [isAdminOpen, setIsAdminOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('haven_properties_v1', JSON.stringify(properties))
  }, [properties])

  useEffect(() => {
    localStorage.setItem('haven_favorites_v1', JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem('haven_tour_bookings_v1', JSON.stringify(tourBookings))
  }, [tourBookings])

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const isFavorite = (id: string) => favorites.includes(id)

  const resetFilters = () => {
    setFilters({
      searchQuery: '',
      category: 'all',
      propertyType: 'All',
      city: 'All',
      priceRange: [0, 10000000],
      bedrooms: 'All',
      sortBy: 'featured'
    })
  }

  const addTourBooking = (booking: Omit<TourBooking, 'id' | 'createdAt'>) => {
    const newBooking: TourBooking = {
      ...booking,
      id: `booking-${Date.now()}`,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }
    setTourBookings(prev => [newBooking, ...prev])
  }

  const addProperty = (newProp: Property) => {
    setProperties(prev => [newProp, ...prev])
  }

  return (
    <RealEstateContext.Provider
      value={{
        properties,
        favorites,
        toggleFavorite,
        isFavorite,
        selectedProperty,
        setSelectedProperty,
        tourModalProperty,
        setTourModalProperty,
        filters,
        setFilters,
        resetFilters,
        tourBookings,
        addTourBooking,
        isAdminOpen,
        setIsAdminOpen,
        addProperty
      }}
    >
      {children}
    </RealEstateContext.Provider>
  )
}

export const useRealEstate = () => {
  const context = useContext(RealEstateContext)
  if (!context) {
    throw new Error('useRealEstate must be used within RealEstateProvider')
  }
  return context
}
