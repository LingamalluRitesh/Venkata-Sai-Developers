import React, { createContext, useContext, useState, useEffect } from 'react'

export interface ServiceData {
  id: string
  category: 'residential' | 'commercial' | 'maintenance'
  title: string
  desc: string
  features: string[]
  badge?: string
  color: string
  imageUrl?: string
  cropMode?: 'cover' | 'contain'
}

export interface ServiceGalleryItem {
  id: string
  title: string
  desc: string
  imageUrl: string
  cropMode?: 'cover' | 'contain'
}

export interface InquiryData {
  id: string
  name: string
  phone: string
  city?: string
  serviceType?: string
  message?: string
  createdAt: string
  status: 'new' | 'contacted' | 'resolved'
  quoteAmount?: number | string
  paymentStatus?: 'unpaid' | 'deposit' | 'paid'
  paymentMethod?: 'UPI / GPay / PhonePe' | 'Cash on Delivery' | 'Bank Transfer'
  paymentNotes?: string
}

export interface SiteData {
  companyName: string
  companySubtitle: string
  phoneNumber: string
  email: string
  address: string
  workingHours: string
  tagline: string
  founderName: string
  founderRole: string
  founderBio: string
  founderQuote: string
  logoUrl: string
  heroImageUrl: string
  founderImgUrl: string
  adminUsername: string
  adminPass: string
  services: ServiceData[]
  galleryItems: ServiceGalleryItem[]
  cities: string[]
  inquiries?: InquiryData[]
}

const defaultSiteData: SiteData = {
  inquiries: [],
  companyName: "Sree Water Solutions",
  companySubtitle: "Purification & Services",
  phoneNumber: "+91 9666827570",
  email: "sreewatersolutions@gmail.com",
  address: "Andhra Pradesh, India — HQ",
  workingHours: "24/7 — Open All 7 Days (365 Days Working)",
  tagline: "#1 Water Purification Service in Andhra Pradesh • 24/7 Support",
  founderName: "PEDDI.ANIL KUMAR",
  founderRole: "Founder • Sree Water Solutions",
  founderBio: "Sree Water Solutions began with a simple belief: every family and enterprise deserves clean, safe, and mineral-balanced drinking water. Today, we bring that same commitment across Andhra Pradesh with 24/7 rapid technician support.",
  founderQuote: "We focus on durable systems, 24/7 emergency response, and long-term support, so your water remains pure—year after year.",
  logoUrl: "",
  heroImageUrl: "",
  founderImgUrl: "",
  adminUsername: "sreewater",
  adminPass: "9666827570",
  cities: [
    'Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati', 'Nellore',
    'Kurnool', 'Rajahmundry', 'Kakinada', 'Eluru', 'Ongole',
    'Srikakulam', 'Vizianagaram', 'Chittoor', 'Anantapur', 'Kadapa',
  ],
  services: [
    {
      id: 'house-purifier',
      category: 'residential',
      title: 'House Water Purifiers',
      desc: 'Advanced RO + UV + UF purification systems for homes, ensuring clean, safe, and mineral-balanced drinking water for your family every day.',
      features: ['RO + UV + TDS Controller', 'Wall-mount & Under-sink models', 'Free TDS testing & installation', 'Comprehensive warranty support'],
      badge: 'Most Popular',
      color: '#0056a8',
    },
    {
      id: 'commercial-ro',
      category: 'commercial',
      title: 'Commercial RO Plants',
      desc: 'High-capacity RO water treatment plants engineered for offices, factories, hospitals, hotels, schools, and large commercial facilities.',
      features: ['500 LPH to 10,000 LPH capacity', 'Custom industrial plant design', 'Mineral water standard compliance', 'Heavy-duty stainless steel build'],
      badge: 'High Capacity',
      color: '#00b4d8',
    },
    {
      id: 'repair-service',
      category: 'maintenance',
      title: '24/7 Service & Repair',
      desc: 'Round-the-clock technical service team for troubleshooting, urgent repairs, leakage fixes, and performance restoration across all water purifier brands.',
      features: ['24/7 Emergency Technician Visit', 'All brands & models serviced', '100% genuine replacement parts', 'Post-service warranty on labor'],
      badge: '24/7 Emergency',
      color: '#0056a8',
    },
    {
      id: 'amc-contract',
      category: 'maintenance',
      title: 'Annual Maintenance (AMC)',
      desc: 'Hassle-free Annual Maintenance Contracts (AMC) that keep your water purification system operating at peak efficiency year-round.',
      features: ['Scheduled periodic inspections', 'Free routine filter replacements', 'RO membrane deep cleaning', 'Priority emergency service calls'],
      badge: 'Best Value',
      color: '#00b4d8',
    },
    {
      id: 'regular-maintenance',
      category: 'maintenance',
      title: 'Regular Maintenance',
      desc: 'Preventative servicing including filter changes, UV tube sanitization, membrane descaling, and digital TDS calibration checks.',
      features: ['Sediment & carbon filter renewal', 'UV lamp & RO membrane check', 'TDS calibration & purity test', 'Whole-system chemical sanitization'],
      color: '#0056a8',
    },
    {
      id: 'spare-parts',
      category: 'residential',
      title: 'Spare Parts Supply',
      desc: 'High-grade OEM and certified compatible spare parts — membranes, sediment filters, booster pumps, solenoid valves, housings, and adapters.',
      features: ['OEM-certified & ISO tested', 'High-rejection RO membranes', 'Heavy-duty booster pumps', 'Expert installation included'],
      color: '#00b4d8',
    },
  ],
  galleryItems: [
    {
      id: 'gal-1',
      title: 'Residential RO System Installation',
      desc: 'Wall-mounted multi-stage RO purifier fitted in a modern kitchen.',
      imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4e?w=800&auto=format&fit=crop&q=80',
      cropMode: 'cover',
    },
    {
      id: 'gal-2',
      title: 'Commercial 1000 LPH RO Plant',
      desc: 'Heavy-duty industrial water purification unit installed for factory premises.',
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
      cropMode: 'cover',
    },
    {
      id: 'gal-3',
      title: 'Certified Technician Servicing',
      desc: '24/7 filter replacement and digital TDS calibration by Sree Water team.',
      imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80',
      cropMode: 'cover',
    },
    {
      id: 'gal-4',
      title: 'Genuine OEM Membranes & Spares',
      desc: 'High-rejection RO membranes and food-grade sediment filters in stock.',
      imageUrl: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=800&auto=format&fit=crop&q=80',
      cropMode: 'cover',
    },
    {
      id: 'gal-5',
      title: 'Water Purity & TDS Inspection',
      desc: 'On-site digital TDS testing guaranteeing safe output drinking water.',
      imageUrl: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=800&auto=format&fit=crop&q=80',
      cropMode: 'cover',
    },
    {
      id: 'gal-6',
      title: 'Commercial AMC Maintenance',
      desc: 'Scheduled hospital & hotel RO plant cleaning and cartridge replacement.',
      imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80',
      cropMode: 'cover',
    },
  ],
}

import { fetchRemoteSiteData, saveRemoteSiteData } from '../utils/cloudSync'

interface SiteContextType {
  siteData: SiteData
  updateSiteData: (newData: Partial<SiteData>) => Promise<boolean>
  resetToDefaults: () => void
  isAdminOpen: boolean
  setIsAdminOpen: (open: boolean) => void
  isAuthenticated: boolean
  setIsAuthenticated: (auth: boolean) => void
  isSyncing: boolean
  syncStatus: 'idle' | 'syncing' | 'synced' | 'error'
  lastSyncedAt: Date | null
  syncWithCloud: () => Promise<void>
  addInquiry: (inquiry: Omit<InquiryData, 'id' | 'createdAt' | 'status'>) => Promise<void>
}

const SiteContext = createContext<SiteContextType | undefined>(undefined)

const STORAGE_KEY = 'sree_water_site_data_v4'

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteData, setSiteData] = useState<SiteData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        return { ...defaultSiteData, ...parsed }
      }
    } catch (e) {
      console.error(e)
    }
    return defaultSiteData
  })

  const [isAdminOpen, setIsAdminOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('sree_admin_session') === 'true'
  })
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced' | 'error'>('idle')
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null)

  // Fetch live site data from Cloud REST DB on app mount
  const syncWithCloud = async () => {
    setIsSyncing(true)
    setSyncStatus('syncing')
    try {
      const remoteData = await fetchRemoteSiteData()
      if (remoteData && Object.keys(remoteData).length > 0) {
        setSiteData((prev) => {
          // Priority: defaultSiteData -> prev (local) -> remoteData (server overrides local cache)
          const merged = { ...defaultSiteData, ...prev, ...remoteData }
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
          } catch (err) {
            console.error(err)
          }
          return merged
        })
        setSyncStatus('synced')
        setLastSyncedAt(new Date())
      } else {
        setSyncStatus('idle')
      }
    } catch (err) {
      console.error('Failed to sync with cloud database:', err)
      setSyncStatus('error')
    } finally {
      setIsSyncing(false)
    }
  }


  useEffect(() => {
    syncWithCloud()
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(siteData))
      // Clean up legacy cache key if present
      localStorage.removeItem('sree_water_site_data')
    } catch (e) {
      console.error(e)
    }
  }, [siteData])

  useEffect(() => {
    if (isAuthenticated) {
      sessionStorage.setItem('sree_admin_session', 'true')
    } else {
      sessionStorage.removeItem('sree_admin_session')
    }
  }, [isAuthenticated])

  const updateSiteData = async (newData: Partial<SiteData>): Promise<boolean> => {
    const updated = { ...siteData, ...newData }
    setSiteData(updated)
    setIsSyncing(true)
    setSyncStatus('syncing')

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    } catch (e) {
      console.error(e)
    }

    const success = await saveRemoteSiteData(updated)
    if (success) {
      setSyncStatus('synced')
      setLastSyncedAt(new Date())
    } else {
      setSyncStatus('error')
    }
    setIsSyncing(false)
    return success
  }

  const addInquiry = async (inquiry: Omit<InquiryData, 'id' | 'createdAt' | 'status'>) => {
    const now = new Date()
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const dateFormatted = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()} • ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`

    const newInquiry: InquiryData = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      createdAt: dateFormatted,
      status: 'new',
      paymentStatus: inquiry.paymentStatus || 'unpaid',
      quoteAmount: inquiry.quoteAmount || 0,
      paymentMethod: inquiry.paymentMethod || 'UPI / GPay / PhonePe',
    }

    const updatedInquiries = [newInquiry, ...(siteData.inquiries || [])]
    await updateSiteData({ inquiries: updatedInquiries })
  }

  const resetToDefaults = () => {
    setSiteData(defaultSiteData)
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem('sree_water_site_data')
    setIsAuthenticated(false)
  }


  return (
    <SiteContext.Provider
      value={{
        siteData,
        updateSiteData,
        resetToDefaults,
        isAdminOpen,
        setIsAdminOpen,
        isAuthenticated,
        setIsAuthenticated,
        isSyncing,
        syncStatus,
        lastSyncedAt,
        syncWithCloud,
        addInquiry,
      }}
    >
      {children}
    </SiteContext.Provider>
  )
}

export const useSiteContext = () => {
  const context = useContext(SiteContext)
  if (!context) {
    return {
      siteData: defaultSiteData,
      updateSiteData: async () => false,
      resetToDefaults: () => {},
      isAdminOpen: false,
      setIsAdminOpen: () => {},
      isAuthenticated: false,
      setIsAuthenticated: () => {},
      isSyncing: false,
      syncStatus: 'idle' as const,
      lastSyncedAt: null,
      syncWithCloud: async () => {},
      addInquiry: async () => {},
    }
  }
  return context
}

