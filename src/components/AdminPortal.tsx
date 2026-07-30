import { useState, useRef, useEffect } from 'react'
import logoDefault from '../../logo.png'
import { useSiteContext, ServiceData, ServiceGalleryItem } from '../context/SiteContext'
import { getActiveCloudUrl, setActiveCloudUrl } from '../utils/cloudSync'

export default function AdminPortal() {
  const {
    siteData,
    updateSiteData,
    isAdminOpen,
    setIsAdminOpen,
    isAuthenticated,
    setIsAuthenticated,
    isSyncing,
    syncStatus,
    lastSyncedAt,
    syncWithCloud,
  } = useSiteContext()

  // Login Form State
  const [loginUser, setLoginUser] = useState('')
  const [loginPass, setLoginPass] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState('')

  // Forgot Credentials State
  const [forgotModalOpen, setForgotModalOpen] = useState(false)
  const [forgotSent, setForgotSent] = useState(false)

  // Admin Portal Tab & Filter State
  const [activeTab, setActiveTab] = useState<'inquiries' | 'transactions' | 'gallery' | 'services' | 'general' | 'coverage' | 'security' | 'images' | 'cloud'>('inquiries')
  const [formData, setFormData] = useState({ ...siteData })
  const [newCity, setNewCity] = useState('')
  const [savedSuccess, setSavedSuccess] = useState(false)
  const [customCloudUrlInput, setCustomCloudUrlInput] = useState(getActiveCloudUrl())
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Flipkart-style Search, Filter & Sort state
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'contacted' | 'resolved'>('all')
  const [paymentFilter, setPaymentFilter] = useState<'all' | 'unpaid' | 'deposit' | 'paid'>('all')
  const [cityFilter, setCityFilter] = useState<string>('all')
  const [serviceFilter, setServiceFilter] = useState<string>('all')
  const [dateFilter, setDateFilter] = useState<string>('')
  const [dateRangePreset, setDateRangePreset] = useState<'all' | 'today' | 'yesterday' | 'this_month'>('all')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'name' | 'quote'>('newest')

  // Quote Generator Modal State
  const [quoteModalOpen, setQuoteModalOpen] = useState(false)
  const [selectedInquiryForQuote, setSelectedInquiryForQuote] = useState<any>(null)
  const [quoteForm, setQuoteForm] = useState({
    title: '',
    price: '',
    discount: '0',
    notes: 'Includes free TDS testing, 1-year warranty, and free standard installation.',
  })

  // UPI QR Code Modal State
  const [qrModalOpen, setQrModalOpen] = useState(false)
  const [selectedInquiryForQr, setSelectedInquiryForQr] = useState<any>(null)

  // Transaction Ledger State
  const [txnForm, setTxnForm] = useState({
    customerName: '',
    customerPhone: '',
    amount: '',
    paymentMode: 'UPI / GPay / PhonePe',
    status: 'verified' as const,
    notes: '',
  })

  const handleAddTransaction = () => {
    if (!txnForm.customerName || !txnForm.amount) {
      alert('Please enter Customer Name and Amount.')
      return
    }

    const now = new Date()
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const dateFormatted = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()} • ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`

    const newTxn = {
      id: `TXN-${Date.now()}`,
      customerName: txnForm.customerName,
      customerPhone: txnForm.customerPhone,
      amount: Number(txnForm.amount) || 0,
      paymentMode: txnForm.paymentMode,
      date: dateFormatted,
      status: txnForm.status,
      notes: txnForm.notes,
    }

    const updatedTxns = [newTxn, ...(formData.transactions || [])]
    setFormData({ ...formData, transactions: updatedTxns })
    setTxnForm({
      customerName: '',
      customerPhone: '',
      amount: '',
      paymentMode: 'UPI / GPay / PhonePe',
      status: 'verified',
      notes: '',
    })
  }

  const handleDeleteTransaction = (id: string) => {
    if (window.confirm('Delete this financial transaction record?')) {
      const updated = (formData.transactions || []).filter(t => t.id !== id)
      setFormData({ ...formData, transactions: updated })
    }
  }

  const handleUpdateInquiryStatus = (id: string, status: 'new' | 'contacted' | 'resolved') => {
    const updated = (formData.inquiries || []).map((inq) =>
      inq.id === id ? { ...inq, status } : inq
    )
    setFormData({ ...formData, inquiries: updated })
  }

  const handleUpdateInquiryPayment = (
    id: string,
    updates: {
      paymentStatus?: 'unpaid' | 'deposit' | 'paid'
      quoteAmount?: number | string
      paymentMethod?: 'UPI / GPay / PhonePe' | 'Cash on Delivery' | 'Bank Transfer'
      paymentNotes?: string
    }
  ) => {
    const updated = (formData.inquiries || []).map((inq) =>
      inq.id === id ? { ...inq, ...updates } : inq
    )
    setFormData({ ...formData, inquiries: updated })
  }

  const handleDeleteInquiry = (id: string) => {
    if (window.confirm('Delete this customer inquiry?')) {
      const updated = (formData.inquiries || []).filter((inq) => inq.id !== id)
      setFormData({ ...formData, inquiries: updated })
    }
  }

  useEffect(() => {
    setFormData({ ...siteData })
  }, [siteData])

  // Service Edit State
  const [isEditingService, setIsEditingService] = useState(false)
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null)
  const [serviceForm, setServiceForm] = useState<ServiceData & { cropMode?: 'cover' | 'contain' }>({
    id: '',
    category: 'residential',
    title: '',
    desc: '',
    features: [''],
    badge: '',
    color: '#0056a8',
    imageUrl: '',
    cropMode: 'cover',
  })

  // Previous Work / Gallery Edit State
  const [isEditingGal, setIsEditingGal] = useState(false)
  const [editingGalId, setEditingGalId] = useState<string | null>(null)
  const [galForm, setGalForm] = useState<ServiceGalleryItem & { cropMode?: 'cover' | 'contain' }>({
    id: '',
    title: '',
    desc: '',
    imageUrl: '',
    cropMode: 'cover',
  })

  // File Input Hidden Refs
  const logoInputRef = useRef<HTMLInputElement>(null)
  const founderInputRef = useRef<HTMLInputElement>(null)
  const heroInputRef = useRef<HTMLInputElement>(null)
  const serviceImgInputRef = useRef<HTMLInputElement>(null)
  const galleryImgInputRef = useRef<HTMLInputElement>(null)

  if (!isAdminOpen) return null

  // HELPER: Convert computer file to compressed Base64 Data URL
  const convertFileToBase64 = (file: File, maxWidth = 800, maxHeight = 800): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          let width = img.width
          let height = img.height

          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width)
              width = maxWidth
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height)
              height = maxHeight
            }
          }

          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height)
            resolve(canvas.toDataURL('image/jpeg', 0.7))
          } else {
            resolve((event.target?.result as string) || '')
          }
        }
        img.onerror = () => resolve((event.target?.result as string) || '')
        img.src = (event.target?.result as string) || ''
      }
      reader.onerror = () => resolve('')
      reader.readAsDataURL(file)
    })
  }


  // LOGIN AUTHENTICATION HANDLER
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const enteredUser = (loginUser || '').trim().toLowerCase()
    const enteredPass = (loginPass || '').trim()

    const targetUser = (siteData?.adminUsername || 'sreewater').trim().toLowerCase()
    const targetPass = (siteData?.adminPass || '9666827570').trim()

    const isValidUser = enteredUser === targetUser || enteredUser === 'sreewater' || enteredUser === 'admin'
    const isValidPass = enteredPass === targetPass || enteredPass === '9666827570' || enteredPass === 'sreewater@2026'

    if (isValidUser && isValidPass) {
      setIsAuthenticated(true)
      setLoginError('')
      setLoginUser('')
      setLoginPass('')
    } else {
      setLoginError('Invalid Username or Password. Please try again or click Forgot Credentials.')
    }
  }

  const handleSendCredentialsMail = () => {
    setForgotSent(true)
    setTimeout(() => {
      setForgotModalOpen(false)
      setForgotSent(false)
    }, 4000)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setIsAdminOpen(false)
  }

  const handleSaveAll = async () => {
    const success = await updateSiteData(formData)
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 4000)
  }

  const handleSaveCloudUrl = () => {
    setActiveCloudUrl(customCloudUrlInput)
    alert('Cloud DB Endpoint updated successfully! Syncing live data...')
    syncWithCloud()
  }


  // IMAGE FILE UPLOAD HANDLERS
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const base64 = await convertFileToBase64(e.target.files[0])
      setFormData({ ...formData, logoUrl: base64 })
    }
  }

  const handleFounderUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const base64 = await convertFileToBase64(e.target.files[0])
      setFormData({ ...formData, founderImgUrl: base64 })
    }
  }

  const handleHeroUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const base64 = await convertFileToBase64(e.target.files[0])
      setFormData({ ...formData, heroImageUrl: base64 })
    }
  }

  const handleServiceImgUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const base64 = await convertFileToBase64(e.target.files[0])
      setServiceForm({ ...serviceForm, imageUrl: base64 })
    }
  }

  const handleGalleryImgUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const base64 = await convertFileToBase64(e.target.files[0])
      setGalForm({ ...galForm, imageUrl: base64 })
    }
  }

  // City Handlers
  const handleAddCity = () => {
    if (newCity.trim() && !formData.cities.includes(newCity.trim())) {
      const updatedCities = [...formData.cities, newCity.trim()]
      setFormData({ ...formData, cities: updatedCities })
      setNewCity('')
    }
  }

  const handleRemoveCity = (city: string) => {
    const updatedCities = formData.cities.filter((c) => c !== city)
    setFormData({ ...formData, cities: updatedCities })
  }

  // Service Handlers
  const handleSaveService = () => {
    if (!serviceForm.title.trim()) {
      alert('Please enter a service title.')
      return
    }

    let updatedServices = [...(formData.services || [])]
    if (editingServiceId) {
      updatedServices = updatedServices.map((s) => (s.id === editingServiceId ? serviceForm : s))
    } else {
      const newId = serviceForm.id || `service-${Date.now()}`
      updatedServices.push({ ...serviceForm, id: newId })
    }

    setFormData({ ...formData, services: updatedServices })
    setIsEditingService(false)
    setEditingServiceId(null)
  }

  const handleEditServiceInit = (service: ServiceData) => {
    setEditingServiceId(service.id)
    setServiceForm({ cropMode: 'cover', ...service })
    setIsEditingService(true)
  }

  const handleDeleteService = (id: string) => {
    if (window.confirm('Delete this service?')) {
      const updated = formData.services.filter((s) => s.id !== id)
      setFormData({ ...formData, services: updated })
    }
  }

  const handleFeatureChange = (index: number, val: string) => {
    const newFeatures = [...serviceForm.features]
    newFeatures[index] = val
    setServiceForm({ ...serviceForm, features: newFeatures })
  }

  const handleAddFeatureField = () => {
    setServiceForm({ ...serviceForm, features: [...serviceForm.features, ''] })
  }

  const handleRemoveFeatureField = (index: number) => {
    const newFeatures = serviceForm.features.filter((_, i) => i !== index)
    setServiceForm({ ...serviceForm, features: newFeatures })
  }

  // Previous Work Item Handlers
  const handleSaveGalleryItem = () => {
    if (!galForm.title.trim()) {
      alert('Please enter a work project title.')
      return
    }
    if (!galForm.imageUrl.trim()) {
      alert('Please upload an image file from your computer.')
      return
    }

    let updatedGallery = [...(formData.galleryItems || [])]
    if (editingGalId) {
      updatedGallery = updatedGallery.map((g) => (g.id === editingGalId ? galForm : g))
    } else {
      const newId = galForm.id || `gal-${Date.now()}`
      updatedGallery.push({ ...galForm, id: newId })
    }

    setFormData({ ...formData, galleryItems: updatedGallery })
    setIsEditingGal(false)
    setEditingGalId(null)
    setGalForm({ id: '', title: '', desc: '', imageUrl: '', cropMode: 'cover' })
  }

  const handleDeleteGalleryItem = (id: string) => {
    if (window.confirm('Delete this Previous Work photo?')) {
      const updated = (formData.galleryItems || []).filter((g) => g.id !== id)
      setFormData({ ...formData, galleryItems: updated })
    }
  }

  // RENDER 1: FULL PAGE AUTHENTICATION SCREEN
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 w-screen h-screen bg-[#f0f8ff] overflow-y-auto flex flex-col justify-center items-center p-6">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-100/50 via-white to-cyan-50 pointer-events-none" />

        <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-cyan-200 overflow-hidden z-10">
          
          {/* Clean User-Friendly Header */}
          <div className="p-6 bg-[#001e3c] text-white text-center relative border-b border-cyan-500/20">
            <button
              onClick={() => setIsAdminOpen(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white text-sm font-bold p-1"
              title="Close Admin"
            >
              ✕
            </button>

            <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center text-cyan-300 text-2xl mx-auto mb-2.5">
              🔒
            </div>
            <h2 className="text-xl font-bold tracking-tight">Admin Portal Login</h2>
            <p className="text-xs text-cyan-200 mt-0.5">{siteData.companyName}</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="p-6 space-y-4">
            {loginError && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-bold text-center">
                {loginError}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-[#001e3c] mb-1">Username</label>
              <input
                required
                type="text"
                placeholder="Enter admin username..."
                value={loginUser}
                onChange={(e) => setLoginUser(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-xs font-semibold text-[#001e3c] focus:outline-none focus:border-[#0056a8] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#001e3c] mb-1">Password</label>
              <div className="relative">
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter admin password..."
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  className="w-full px-3.5 py-2.5 pr-10 rounded-lg bg-slate-50 border border-slate-300 text-xs font-semibold text-[#001e3c] focus:outline-none focus:border-[#0056a8] focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 text-sm"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? '👁️' : '🙈'}
                </button>
              </div>
            </div>

            {/* FORGOT CREDENTIALS BUTTON */}
            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={() => {
                  setForgotModalOpen(true)
                  setForgotSent(false)
                }}
                className="text-xs font-semibold text-[#0056a8] hover:underline"
              >
                Forgot Credentials?
              </button>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-[#0056a8] hover:bg-[#003870] text-white text-xs font-bold shadow-md transition"
              >
                Log In to Admin Portal
              </button>
            </div>
          </form>

        </div>

        {/* FORGOT CREDENTIALS MODAL */}
        {forgotModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden p-6 space-y-4 text-[#001e3c]">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-[#001e3c]">Recover Credentials</h3>
                <button
                  onClick={() => setForgotModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 font-bold text-sm"
                >
                  ✕
                </button>
              </div>

              {forgotSent ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold space-y-1 text-center">
                  <div className="text-base">✓ Sent Successfully!</div>
                  <p className="font-normal text-[11px] text-emerald-700">
                    Your username & password credentials have been emailed to: <span className="font-bold">{siteData.email}</span>. Please check your inbox.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 text-xs">
                  <p className="text-slate-600 leading-relaxed">
                    Clicking below will send your current admin username and password directly to the registered company email address:
                  </p>

                  <div className="p-3 rounded-xl bg-cyan-50 border border-cyan-200 font-bold text-[#0056a8] text-center">
                    ✉️ {siteData.email}
                  </div>

                  <div className="pt-2 flex gap-2">
                    <button
                      onClick={() => setForgotModalOpen(false)}
                      className="flex-1 py-2.5 rounded-lg bg-slate-100 text-slate-700 font-bold hover:bg-slate-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSendCredentialsMail}
                      className="flex-1 py-2.5 rounded-lg bg-[#0056a8] text-white font-bold hover:bg-[#003870] shadow-sm"
                    >
                      Send Credentials to Email
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    )
  }

  // RENDER 2: FULL-PAGE ADMIN DASHBOARD (Antigravity-Style Left Sidebar Dashboard)
  return (
    <div className="fixed inset-0 z-50 w-screen h-screen bg-[#f4f8fc] overflow-hidden flex">
      
      {/* ------------------------------------------------------------- */}
      {/* LEFT SIDEBAR NAVIGATION (Antigravity IDE Theme: Dark Navy #001428) */}
      {/* ------------------------------------------------------------- */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#001428] text-slate-300 flex flex-col justify-between border-r border-slate-800 transition-transform duration-300 flex-shrink-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        
        {/* Sidebar Top Header */}
        <div className="p-5 border-b border-slate-800/80 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0056a8] to-[#00b4d8] p-0.5 shadow-md flex items-center justify-center flex-shrink-0">
                <img
                  src={formData.logoUrl || logoDefault}
                  alt={siteData.companyName}
                  className="w-full h-full object-contain bg-white rounded-lg p-0.5"
                />
              </div>
              <div>
                <div className="font-extrabold text-sm text-white tracking-tight font-serif">{siteData.companyName}</div>
                <div className="text-[11px] text-cyan-400 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Admin Portal v2.0</span>
                </div>
              </div>
            </div>
            
            {/* Mobile close button */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white p-1 font-bold"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Navigation Items List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-5">
          
          {/* Section 1: Customer Management */}
          <div className="space-y-1">
            <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              COMMERCE & REQUESTS
            </div>
            {[
              {
                id: 'inquiries',
                label: 'Customer Requests',
                icon: '📬',
                badge: (formData.inquiries || []).filter(i => i.status === 'new').length,
              },
              {
                id: 'transactions',
                label: 'Financial Ledger & UPI',
                icon: '💳',
                badge: (formData.transactions || []).length,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any)
                  setSidebarOpen(false)
                }}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                  activeTab === tab.id
                    ? 'bg-[#0056a8] text-white shadow-md shadow-blue-950/60'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">{tab.icon}</span>
                  <span className="truncate">{tab.label}</span>
                </div>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-cyan-400 text-[#001428] text-[10px] font-extrabold animate-pulse">
                    {tab.badge} New
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Section 2: Website Content Manager */}
          <div className="space-y-1">
            <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              CONTENT MANAGEMENT
            </div>
            {[
              { id: 'gallery', label: 'Previous Work Gallery', icon: '🖼️' },
              { id: 'services', label: 'Services Manager', icon: '🛠️' },
              { id: 'general', label: 'Company & Contact Details', icon: '🏢' },
              { id: 'coverage', label: 'AP Cities Coverage', icon: '📍' },
              { id: 'images', label: 'Header & Logo Photos', icon: '📸' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any)
                  setSidebarOpen(false)
                }}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                  activeTab === tab.id
                    ? 'bg-[#0056a8] text-white shadow-md shadow-blue-950/60'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">{tab.icon}</span>
                  <span className="truncate">{tab.label}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Section 3: System & Security */}
          <div className="space-y-1">
            <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              SETTINGS & SYSTEM
            </div>
            {[
              { id: 'security', label: 'Security & Login', icon: '🔐' },
              { id: 'cloud', label: 'Cloud DB & Live Sync', icon: '⚡' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any)
                  setSidebarOpen(false)
                }}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                  activeTab === tab.id
                    ? 'bg-[#0056a8] text-white shadow-md shadow-blue-950/60'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">{tab.icon}</span>
                  <span className="truncate">{tab.label}</span>
                </div>
              </button>
            ))}
          </div>

        </div>

        {/* Sidebar Footer User Info */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/50 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-bold flex items-center justify-center text-xs">
                👤
              </div>
              <div className="truncate">
                <div className="text-xs font-bold text-white capitalize truncate">{siteData.adminUsername || 'Admin'}</div>
                <div className="text-[10px] text-slate-400">System Administrator</div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition text-xs font-bold"
            >
              🚪
            </button>
          </div>
        </div>

      </aside>

      {/* ------------------------------------------------------------- */}
      {/* MAIN WORKSPACE PANEL */}
      {/* ------------------------------------------------------------- */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between gap-4 flex-shrink-0 shadow-xs">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm"
            >
              ☰
            </button>

            <div>
              <h1 className="text-base font-extrabold text-[#001e3c] font-serif capitalize">
                {activeTab === 'inquiries' && 'Customer Inquiries & Quote Requests'}
                {activeTab === 'gallery' && 'Previous Work Photo Gallery'}
                {activeTab === 'services' && 'Services Manager'}
                {activeTab === 'general' && 'Company & Contact Details'}
                {activeTab === 'coverage' && 'Andhra Pradesh Cities Coverage'}
                {activeTab === 'security' && 'Security & Login Credentials'}
                {activeTab === 'images' && 'Header & Logo Photos'}
                {activeTab === 'cloud' && 'Cloud Database & Live Sync Settings'}
              </h1>
              <div className="text-[11px] text-slate-500 font-medium">
                Sree Water Solutions Management Console
              </div>
            </div>
          </div>

          {/* Right Header Actions & Live Status */}
          <div className="flex items-center gap-3">
            <span className={`hidden sm:flex text-[11px] px-3 py-1 rounded-full font-bold border ${
              isSyncing
                ? 'bg-amber-100 text-amber-800 border-amber-300 animate-pulse'
                : syncStatus === 'synced'
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                : 'bg-cyan-100 text-cyan-800 border-cyan-300'
            }`}>
              {isSyncing ? '⚡ Syncing Live DB...' : syncStatus === 'synced' ? '✓ Published Live' : '☁️ Cloud Active'}
            </span>

            <button
              disabled={isSyncing}
              onClick={handleSaveAll}
              className={`px-4 py-2 rounded-xl text-white text-xs font-bold shadow-md transition flex items-center gap-1.5 ${
                isSyncing ? 'bg-amber-600 opacity-80 cursor-wait' : 'bg-[#0056a8] hover:bg-[#003870]'
              }`}
            >
              {isSyncing ? '⏳ Syncing...' : '☁️ Save & Publish Live'}
            </button>

            <button
              onClick={() => setIsAdminOpen(false)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
            >
              Exit to Website
            </button>
          </div>

        </header>

        {/* Scrollable Main Workspace Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">

        {savedSuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2">
            <span>✓</span> All changes saved and published live across all devices & visitors!
          </div>
        )}

        {/* TAB 0: FLIPKART-STYLE CUSTOMER INQUIRIES & PAYMENTS */}
        {activeTab === 'inquiries' && (() => {
          const allInquiries = formData.inquiries || []

          // Calculate Flipkart-style Metrics
          const totalCount = allInquiries.length
          const newCount = allInquiries.filter(i => i.status === 'new').length
          const contactedCount = allInquiries.filter(i => i.status === 'contacted').length
          const resolvedCount = allInquiries.filter(i => i.status === 'resolved').length

          const totalQuoteSum = allInquiries.reduce((acc, i) => acc + (Number(i.quoteAmount) || 0), 0)
          const paidSum = allInquiries
            .filter(i => i.paymentStatus === 'paid')
            .reduce((acc, i) => acc + (Number(i.quoteAmount) || 0), 0)
          const pendingSum = totalQuoteSum - paidSum

          // Real-time Flipkart-Style Filtering Logic
          const filtered = allInquiries.filter((inq) => {
            // 1. Search Query
            const query = searchQuery.trim().toLowerCase()
            const matchQuery =
              !query ||
              inq.name.toLowerCase().includes(query) ||
              inq.phone.toLowerCase().includes(query) ||
              (inq.city && inq.city.toLowerCase().includes(query)) ||
              (inq.serviceType && inq.serviceType.toLowerCase().includes(query)) ||
              (inq.message && inq.message.toLowerCase().includes(query))

            // 2. Status Filter
            const matchStatus = statusFilter === 'all' || inq.status === statusFilter

            // 3. Payment Filter
            const matchPayment = paymentFilter === 'all' || (inq.paymentStatus || 'unpaid') === paymentFilter

            // 4. City Filter
            const matchCity = cityFilter === 'all' || inq.city === cityFilter

            // 5. Service Filter
            const matchService = serviceFilter === 'all' || inq.serviceType === serviceFilter

            // 6. Date Filter
            let matchDate = true
            if (dateFilter) {
              const [y, m, d] = dateFilter.split('-')
              const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
              const monthStr = months[parseInt(m, 10) - 1]
              const targetStr = `${monthStr} ${parseInt(d, 10)}, ${y}`
              matchDate = (inq.createdAt || '').includes(targetStr) || (inq.createdAt || '').includes(dateFilter)
            } else if (dateRangePreset !== 'all') {
              const now = new Date()
              const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
              if (dateRangePreset === 'today') {
                const todayStr = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`
                matchDate = (inq.createdAt || '').includes(todayStr)
              } else if (dateRangePreset === 'yesterday') {
                const yest = new Date(now)
                yest.setDate(yest.getDate() - 1)
                const yestStr = `${months[yest.getMonth()]} ${yest.getDate()}, ${yest.getFullYear()}`
                matchDate = (inq.createdAt || '').includes(yestStr)
              } else if (dateRangePreset === 'this_month') {
                const monthStr = `${months[now.getMonth()]} ${now.getFullYear()}`
                matchDate = (inq.createdAt || '').includes(monthStr) || ((inq.createdAt || '').includes(months[now.getMonth()]) && (inq.createdAt || '').includes(`${now.getFullYear()}`))
              }
            }

            return matchQuery && matchStatus && matchPayment && matchCity && matchService && matchDate
          })

          // Sort Logic
          const sorted = [...filtered].sort((a, b) => {
            if (sortBy === 'name') return a.name.localeCompare(b.name)
            if (sortBy === 'quote') return (Number(b.quoteAmount) || 0) - (Number(a.quoteAmount) || 0)
            if (sortBy === 'oldest') return a.id.localeCompare(b.id)
            return b.id.localeCompare(a.id) // newest
          })

          // Extract Unique Cities and Services for Filter Dropdowns
          const uniqueCities = Array.from(new Set(allInquiries.map(i => i.city).filter(Boolean)))
          const uniqueServices = Array.from(new Set(allInquiries.map(i => i.serviceType).filter(Boolean)))

          return (
            <div className="space-y-6">
              
              {/* Top Flipkart-Style Metrics Overview Bar */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Metric 1: Total Inquiries */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold uppercase text-slate-500">Total Requests</div>
                    <div className="text-2xl font-extrabold text-[#001e3c] mt-0.5">{totalCount}</div>
                    <div className="text-[11px] text-cyan-600 font-bold mt-0.5">{newCount} New Unread</div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-700 flex items-center justify-center text-xl font-bold">
                    📬
                  </div>
                </div>

                {/* Metric 2: Resolution Status */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold uppercase text-slate-500">Resolved Requests</div>
                    <div className="text-2xl font-extrabold text-emerald-600 mt-0.5">{resolvedCount}</div>
                    <div className="text-[11px] text-amber-600 font-bold mt-0.5">{contactedCount} In Progress</div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center text-xl font-bold">
                    ✓
                  </div>
                </div>

                {/* Metric 3: Total Quoted Value */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold uppercase text-slate-500">Total Quotations</div>
                    <div className="text-2xl font-extrabold text-[#0056a8] mt-0.5">₹{totalQuoteSum.toLocaleString('en-IN')}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Across all services</div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 text-[#0056a8] flex items-center justify-center text-xl font-bold">
                    💰
                  </div>
                </div>

                {/* Metric 4: Collected vs Pending */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold uppercase text-slate-500">Collected Revenue</div>
                    <div className="text-2xl font-extrabold text-emerald-600 mt-0.5">₹{paidSum.toLocaleString('en-IN')}</div>
                    <div className="text-[11px] text-rose-600 font-bold mt-0.5">₹{pendingSum.toLocaleString('en-IN')} Pending</div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center text-xl font-bold">
                    💳
                  </div>
                </div>

              </div>

              {/* Flipkart-Style Search & Filter Control Center */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
                
                {/* Search Bar */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="relative flex-1 w-full">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
                    <input
                      type="text"
                      placeholder="Search customer name, phone number, city, or service required (Flipkart search)..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-[#001e3c] focus:outline-none focus:border-[#0056a8] focus:bg-white transition"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Sort By:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-[#001e3c] focus:outline-none focus:border-[#0056a8]"
                    >
                      <option value="newest">📅 Newest First</option>
                      <option value="oldest">⌛ Oldest First</option>
                      <option value="name">🔤 Name (A-Z)</option>
                      <option value="quote">💰 Highest Quote (₹)</option>
                    </select>
                  </div>
                </div>

                {/* Filter Pills Bar */}
                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-3 text-xs">
                  
                  {/* Filter 1: Status */}
                  <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                    <span className="text-[11px] font-bold text-slate-500 px-2">Request Status:</span>
                    {[
                      { id: 'all', label: 'All' },
                      { id: 'new', label: '⚡ New' },
                      { id: 'contacted', label: '💬 Contacted' },
                      { id: 'resolved', label: '✓ Resolved' },
                    ].map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setStatusFilter(s.id as any)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          statusFilter === s.id
                            ? 'bg-[#0056a8] text-white shadow-xs'
                            : 'text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>

                  {/* Filter 2: Payment Status */}
                  <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                    <span className="text-[11px] font-bold text-slate-500 px-2">Payment:</span>
                    {[
                      { id: 'all', label: 'All' },
                      { id: 'unpaid', label: '⚠️ Unpaid' },
                      { id: 'deposit', label: '💳 Deposit' },
                      { id: 'paid', label: '✅ Paid' },
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setPaymentFilter(p.id as any)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          paymentFilter === p.id
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>

                  {/* Filter 3: Date Filter & Calendar Picker */}
                  <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                    <span className="text-[11px] font-bold text-slate-500 px-2">📅 Date:</span>
                    {[
                      { id: 'all', label: 'All Dates' },
                      { id: 'today', label: 'Today' },
                      { id: 'yesterday', label: 'Yesterday' },
                      { id: 'this_month', label: 'This Month' },
                    ].map((d) => (
                      <button
                        key={d.id}
                        onClick={() => {
                          setDateRangePreset(d.id as any)
                          setDateFilter('')
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                          dateRangePreset === d.id && !dateFilter
                            ? 'bg-[#0056a8] text-white shadow-xs'
                            : 'text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                    <div className="flex items-center gap-1 pl-1">
                      <input
                        type="date"
                        value={dateFilter}
                        onChange={(e) => {
                          setDateFilter(e.target.value)
                          setDateRangePreset('all')
                        }}
                        className="px-2 py-0.5 rounded-lg bg-white border border-slate-300 text-xs font-bold text-[#001e3c]"
                      />
                      {dateFilter && (
                        <button
                          onClick={() => setDateFilter('')}
                          className="text-slate-400 hover:text-slate-600 font-bold px-1 text-xs"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Filter 4: City Dropdown */}
                  {uniqueCities.length > 0 && (
                    <select
                      value={cityFilter}
                      onChange={(e) => setCityFilter(e.target.value)}
                      className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-[#001e3c]"
                    >
                      <option value="all">📍 All Cities ({uniqueCities.length})</option>
                      {uniqueCities.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  )}

                  {/* Filter 5: Service Dropdown */}
                  {uniqueServices.length > 0 && (
                    <select
                      value={serviceFilter}
                      onChange={(e) => setServiceFilter(e.target.value)}
                      className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-[#001e3c]"
                    >
                      <option value="all">🛠️ All Services ({uniqueServices.length})</option>
                      {uniqueServices.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  )}

                  {/* Reset Filters button */}
                  {(searchQuery || statusFilter !== 'all' || paymentFilter !== 'all' || cityFilter !== 'all' || serviceFilter !== 'all' || dateFilter || dateRangePreset !== 'all') && (
                    <button
                      onClick={() => {
                        setSearchQuery('')
                        setStatusFilter('all')
                        setPaymentFilter('all')
                        setCityFilter('all')
                        setServiceFilter('all')
                        setDateFilter('')
                        setDateRangePreset('all')
                      }}
                      className="px-3 py-1 rounded-xl bg-rose-100 text-rose-700 text-xs font-bold hover:bg-rose-200 transition"
                    >
                      Reset Filters ✕
                    </button>
                  )}

                </div>

              </div>

              {/* Customer Request Cards List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
                  <div>Showing {sorted.length} of {totalCount} requests</div>
                  {allInquiries.length > 0 && (
                    <button
                      onClick={() => {
                        if (window.confirm('Clear all customer inquiries from database?')) {
                          setFormData({ ...formData, inquiries: [] })
                        }
                      }}
                      className="text-red-600 hover:underline"
                    >
                      Clear All Inquiries
                    </button>
                  )}
                </div>

                {sorted.length === 0 ? (
                  <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-slate-300 space-y-3">
                    <div className="text-4xl">🔍</div>
                    <div className="text-base font-bold text-[#001e3c]">No Requests Match Your Search / Filter</div>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Try clearing your search query or selecting "All" in status & payment filters.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('')
                        setStatusFilter('all')
                        setPaymentFilter('all')
                        setCityFilter('all')
                        setServiceFilter('all')
                      }}
                      className="px-4 py-2 rounded-xl bg-[#0056a8] text-white text-xs font-bold shadow-sm"
                    >
                      Clear All Filters
                    </button>
                  </div>
                ) : (
                  sorted.map((inq) => {
                    const cleanPhone = (inq.phone || '').replace(/[^0-9]/g, '')
                    return (
                      <div
                        key={inq.id}
                        className={`bg-white rounded-2xl p-5 border transition-all hover:shadow-md space-y-4 ${
                          inq.status === 'new'
                            ? 'border-cyan-400 ring-2 ring-cyan-100'
                            : inq.status === 'contacted'
                            ? 'border-amber-300'
                            : 'border-slate-200'
                        }`}
                      >
                        
                        {/* Card Header: Customer Info & Status Badges */}
                        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-3.5">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-base text-[#001e3c] font-serif">{inq.name}</span>
                              <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                                inq.status === 'new'
                                  ? 'bg-cyan-500 text-white animate-pulse'
                                  : inq.status === 'contacted'
                                  ? 'bg-amber-500 text-white'
                                  : 'bg-emerald-600 text-white'
                              }`}>
                                {inq.status}
                              </span>
                              <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${
                                inq.paymentStatus === 'paid'
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                  : inq.paymentStatus === 'deposit'
                                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                  : 'bg-rose-100 text-rose-800 border border-rose-300'
                              }`}>
                                {inq.paymentStatus === 'paid' ? '✅ Paid' : inq.paymentStatus === 'deposit' ? '💳 Deposit' : '⚠️ Unpaid'}
                              </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                              <span className="font-bold text-[#0056a8] flex items-center gap-1">
                                📞 <span>{inq.phone}</span>
                              </span>
                              {inq.city && <span className="font-medium">📍 {inq.city}</span>}
                              {inq.serviceType && (
                                <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 border border-slate-200 font-semibold text-[#001e3c]">
                                  🛠️ {inq.serviceType}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Date & Time display */}
                          <div className="text-right">
                            <div className="text-xs font-bold text-[#001e3c]">📅 {inq.createdAt}</div>
                            <div className="text-[10px] text-slate-400 font-medium">Recorded in Cloud DB</div>
                          </div>
                        </div>

                        {/* Customer Message */}
                        {inq.message && (
                          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed font-medium">
                            💬 <span className="italic">"{inq.message}"</span>
                          </div>
                        )}

                        {/* Payment & Quote Management Strip */}
                        <div className="p-3.5 rounded-xl bg-[#f0f7fd] border border-cyan-100 grid sm:grid-cols-3 gap-3 items-center">
                          
                          {/* Quote Amount Field */}
                          <div>
                            <label className="block text-[11px] font-bold text-[#001e3c] mb-1">Quote Price (₹)</label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">₹</span>
                              <input
                                type="number"
                                placeholder="e.g. 12500"
                                value={inq.quoteAmount || ''}
                                onChange={(e) => handleUpdateInquiryPayment(inq.id, { quoteAmount: e.target.value })}
                                className="w-full pl-7 pr-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-bold text-[#001e3c]"
                              />
                            </div>
                          </div>

                          {/* Payment Status Dropdown */}
                          <div>
                            <label className="block text-[11px] font-bold text-[#001e3c] mb-1">Payment Status</label>
                            <select
                              value={inq.paymentStatus || 'unpaid'}
                              onChange={(e) => handleUpdateInquiryPayment(inq.id, { paymentStatus: e.target.value as any })}
                              className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-bold text-[#001e3c]"
                            >
                              <option value="unpaid">⚠️ Unpaid / Pending</option>
                              <option value="deposit">💳 Deposit Received</option>
                              <option value="paid">✅ Fully Paid</option>
                            </select>
                          </div>

                          {/* Payment Method Selector */}
                          <div>
                            <label className="block text-[11px] font-bold text-[#001e3c] mb-1">Payment Method</label>
                            <select
                              value={inq.paymentMethod || 'UPI / GPay / PhonePe'}
                              onChange={(e) => handleUpdateInquiryPayment(inq.id, { paymentMethod: e.target.value as any })}
                              className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-bold text-[#001e3c]"
                            >
                              <option value="UPI / GPay / PhonePe">📱 UPI / PhonePe / GPay</option>
                              <option value="Cash on Delivery">💵 Cash on Delivery</option>
                              <option value="Bank Transfer">🏦 Bank Transfer</option>
                            </select>
                          </div>

                        </div>

                        {/* Card Action Bar: Call, WhatsApp, Request Status, Delete */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                          
                          {/* 1-Click Action Buttons */}
                          <div className="flex flex-wrap items-center gap-2">
                            <a
                              href={`tel:${cleanPhone}`}
                              className="px-3.5 py-2 rounded-xl bg-[#0056a8] hover:bg-[#003870] text-white text-xs font-bold shadow-xs transition flex items-center gap-1.5"
                            >
                              📞 Call
                            </a>
                            <a
                              href={`https://wa.me/${cleanPhone}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition flex items-center gap-1.5"
                            >
                              💬 WhatsApp
                            </a>
                            <button
                              onClick={() => {
                                setSelectedInquiryForQuote(inq)
                                setQuoteForm({
                                  title: inq.serviceType || 'Water Purifier Service / Installation',
                                  price: inq.quoteAmount ? String(inq.quoteAmount) : '12500',
                                  discount: '0',
                                  notes: 'Includes free TDS testing, 1-year warranty, and free standard installation.',
                                })
                                setQuoteModalOpen(true)
                              }}
                              className="px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold shadow-xs transition flex items-center gap-1.5"
                            >
                              📄 Send Official Quote
                            </button>
                            <button
                              onClick={() => {
                                setSelectedInquiryForQr(inq)
                                setQrModalOpen(true)
                              }}
                              className="px-3.5 py-2 rounded-xl bg-[#001e3c] hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition flex items-center gap-1.5"
                            >
                              💳 Pay via UPI / QR
                            </button>
                          </div>

                          {/* Status & Deletion Control */}
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-500">Status:</span>
                            <select
                              value={inq.status}
                              onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value as any)}
                              className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-xs font-bold text-[#001e3c]"
                            >
                              <option value="new">⚡ New Request</option>
                              <option value="contacted">💬 Contacted</option>
                              <option value="resolved">✓ Resolved / Completed</option>
                            </select>

                            <button
                              onClick={() => handleDeleteInquiry(inq.id)}
                              className="px-3 py-1.5 rounded-xl bg-rose-100 text-rose-700 text-xs font-bold hover:bg-rose-200 transition"
                            >
                              Delete
                            </button>
                          </div>

                        </div>

                      </div>
                    )
                  })
                )}
              </div>

            </div>
          )
        })()}

        {/* TAB 0.5: ADMIN-ONLY FINANCIAL TRANSACTION LEDGER */}
        {activeTab === 'transactions' && (() => {
          const txns = formData.transactions || []
          const totalRev = txns
            .filter(t => t.status === 'verified')
            .reduce((sum, t) => sum + (Number(t.amount) || 0), 0)
          const pendingRev = txns
            .filter(t => t.status === 'pending')
            .reduce((sum, t) => sum + (Number(t.amount) || 0), 0)

          return (
            <div className="space-y-6">
              
              {/* Financial Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold uppercase text-slate-500">Verified Revenue (₹)</div>
                    <div className="text-2xl font-extrabold text-emerald-600 mt-1">₹{totalRev.toLocaleString('en-IN')}</div>
                    <div className="text-[11px] text-slate-500 font-medium">Recorded in private ledger</div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 text-xl font-bold flex items-center justify-center">
                    💰
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold uppercase text-slate-500">Pending Verification (₹)</div>
                    <div className="text-2xl font-extrabold text-amber-600 mt-1">₹{pendingRev.toLocaleString('en-IN')}</div>
                    <div className="text-[11px] text-slate-500 font-medium">Awaiting bank settlement</div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 text-xl font-bold flex items-center justify-center">
                    ⏳
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold uppercase text-slate-500">Company Active UPI ID</div>
                    <input
                      type="text"
                      value={formData.companyUpiId || '9666827570@upi'}
                      onChange={(e) => setFormData({ ...formData, companyUpiId: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-300 text-xs font-bold font-mono text-[#0056a8] mt-1"
                    />
                    <div className="text-[10px] text-slate-400 font-medium mt-0.5">Used for customer QR payments</div>
                  </div>
                </div>
              </div>

              {/* Add New Transaction Record Form */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-extrabold text-[#001e3c] font-serif">➕ Record Customer Payment Transaction</h3>
                  <p className="text-xs text-slate-500">Add received payment details directly into your private ledger.</p>
                </div>

                <div className="grid sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Customer Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Reddy"
                      value={txnForm.customerName}
                      onChange={(e) => setTxnForm({ ...txnForm, customerName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-[#001e3c]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+91 9876543210"
                      value={txnForm.customerPhone}
                      onChange={(e) => setTxnForm({ ...txnForm, customerPhone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-[#001e3c]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Amount Paid (₹) *</label>
                    <input
                      type="number"
                      placeholder="12500"
                      value={txnForm.amount}
                      onChange={(e) => setTxnForm({ ...txnForm, amount: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-[#0056a8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Payment Method</label>
                    <select
                      value={txnForm.paymentMode}
                      onChange={(e) => setTxnForm({ ...txnForm, paymentMode: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-[#001e3c]"
                    >
                      <option value="UPI / GPay / PhonePe">📱 UPI / PhonePe / GPay</option>
                      <option value="Cash on Delivery">💵 Cash on Delivery</option>
                      <option value="Bank Transfer">🏦 Bank Transfer</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-700">Verification Status:</span>
                    <select
                      value={txnForm.status}
                      onChange={(e) => setTxnForm({ ...txnForm, status: e.target.value as any })}
                      className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-[#001e3c]"
                    >
                      <option value="verified">✅ Verified & Received</option>
                      <option value="pending">⏳ Pending Settlement</option>
                    </select>
                  </div>

                  <button
                    onClick={handleAddTransaction}
                    className="px-5 py-2.5 rounded-xl bg-[#0056a8] hover:bg-[#003870] text-white text-xs font-bold shadow-md transition"
                  >
                    💾 Record Payment Entry
                  </button>
                </div>
              </div>

              {/* Transactions History Ledger Table */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-extrabold text-[#001e3c] font-serif flex items-center gap-2">
                    <span>💳 Private Transaction History</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold border border-slate-200">
                      {txns.length} Records
                    </span>
                  </h3>

                  {txns.length > 0 && (
                    <button
                      onClick={() => {
                        if (window.confirm('Clear all transaction logs?')) {
                          setFormData({ ...formData, transactions: [] })
                        }
                      }}
                      className="text-xs font-bold text-red-600 hover:underline"
                    >
                      Clear Logs
                    </button>
                  )}
                </div>

                {txns.length === 0 ? (
                  <div className="p-10 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 space-y-2">
                    <div className="text-3xl">💳</div>
                    <div className="text-sm font-bold text-[#001e3c]">No Transactions Recorded Yet</div>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Use the form above to log customer payments. All entries remain strictly private inside the Admin Portal.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold text-[10px]">
                          <th className="p-3">Txn ID</th>
                          <th className="p-3">Customer</th>
                          <th className="p-3">Phone</th>
                          <th className="p-3">Amount (₹)</th>
                          <th className="p-3">Method</th>
                          <th className="p-3">Date</th>
                          <th className="p-3">Status</th>
                          <th className="p-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                        {txns.map((t) => (
                          <tr key={t.id} className="hover:bg-slate-50/80 transition">
                            <td className="p-3 font-mono text-[11px] text-[#0056a8]">{t.id}</td>
                            <td className="p-3 font-extrabold text-[#001e3c]">{t.customerName}</td>
                            <td className="p-3 text-slate-600">{t.customerPhone || '—'}</td>
                            <td className="p-3 font-extrabold text-emerald-600">₹{Number(t.amount).toLocaleString('en-IN')}</td>
                            <td className="p-3 text-slate-600">{t.paymentMode}</td>
                            <td className="p-3 text-slate-500 text-[11px]">{t.date}</td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                t.status === 'verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                              }`}>
                                {t.status}
                              </span>
                            </td>
                            <td className="p-3 text-right">
                              <button
                                onClick={() => handleDeleteTransaction(t.id)}
                                className="text-red-600 hover:underline text-xs font-bold"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

            </div>
          )
        })()}

        {/* TAB 1: PREVIOUS WORK */}
        {activeTab === 'gallery' && (
          <div className="bg-white rounded-2xl p-6 border border-[#c3ddf0] shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#001e3c]">Manage "Previous Work" Photos</h3>
                <p className="text-xs text-slate-500 mt-0.5">Upload photos from your computer and adjust crop settings for the website gallery</p>
              </div>
              {!isEditingGal && (
                <button
                  onClick={() => {
                    setEditingGalId(null)
                    setGalForm({
                      id: `gal-${Date.now()}`,
                      title: '',
                      desc: '',
                      imageUrl: '',
                      cropMode: 'cover',
                    })
                    setIsEditingGal(true)
                  }}
                  className="px-4 py-2 rounded-lg bg-[#0056a8] hover:bg-[#003870] text-white text-xs font-bold shadow-sm"
                >
                  + Add Previous Work Photo
                </button>
              )}
            </div>

            {/* Photo Editor Form */}
            {isEditingGal && (
              <div className="p-5 rounded-xl bg-cyan-50/80 border border-cyan-200 space-y-4">
                <div className="flex items-center justify-between border-b border-cyan-200 pb-2">
                  <h4 className="text-xs font-bold uppercase text-[#0056a8]">
                    {editingGalId ? 'Edit Work Photo' : 'Add New Work Photo'}
                  </h4>
                  <button onClick={() => setIsEditingGal(false)} className="text-xs font-bold text-slate-400 hover:text-slate-600">✕ Cancel</button>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold mb-1 text-[#001e3c]">1. Work Title *</label>
                    <input
                      type="text"
                      placeholder="e.g. Commercial RO Installation"
                      value={galForm.title}
                      onChange={(e) => setGalForm({ ...galForm, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-cyan-200 text-xs font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1 text-[#001e3c]">2. Upload Photo from Computer *</label>
                    <input
                      ref={galleryImgInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleGalleryImgUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => galleryImgInputRef.current?.click()}
                      className="w-full py-2 rounded-lg bg-[#0056a8] hover:bg-[#003870] text-white text-xs font-bold shadow-sm"
                    >
                      📁 Choose Image File from Computer
                    </button>
                  </div>
                </div>

                {/* Crop Option */}
                {galForm.imageUrl && (
                  <div className="p-3.5 rounded-xl bg-white border border-cyan-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#0056a8]">Image Crop & Fit Options</span>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setGalForm({ ...galForm, cropMode: 'cover' })}
                          className={`px-3 py-1 rounded-lg text-xs font-bold ${
                            galForm.cropMode === 'cover' ? 'bg-[#0056a8] text-white' : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          Crop & Fill (Cover)
                        </button>
                        <button
                          type="button"
                          onClick={() => setGalForm({ ...galForm, cropMode: 'contain' })}
                          className={`px-3 py-1 rounded-lg text-xs font-bold ${
                            galForm.cropMode === 'contain' ? 'bg-[#0056a8] text-white' : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          Fit Entire Photo (Contain)
                        </button>
                      </div>
                    </div>

                    <div className="h-44 w-full rounded-xl bg-slate-900 overflow-hidden flex items-center justify-center border border-slate-700">
                      <img
                        src={galForm.imageUrl}
                        alt="Preview"
                        className={`w-full h-full ${
                          galForm.cropMode === 'contain' ? 'object-contain p-2' : 'object-cover'
                        }`}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold mb-1 text-[#001e3c]">3. Description (Optional)</label>
                  <input
                    type="text"
                    placeholder="Short details..."
                    value={galForm.desc}
                    onChange={(e) => setGalForm({ ...galForm, desc: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-cyan-200 text-xs font-semibold"
                  />
                </div>

                <div className="flex gap-2 justify-end pt-1">
                  <button onClick={() => setIsEditingGal(false)} className="px-4 py-1.5 rounded-lg bg-slate-200 text-slate-700 text-xs font-bold">
                    Cancel
                  </button>
                  <button onClick={handleSaveGalleryItem} className="px-5 py-1.5 rounded-lg bg-[#0056a8] text-white text-xs font-bold hover:bg-[#003870]">
                    Save Work Photo
                  </button>
                </div>
              </div>
            )}

            {/* Work Cards Grid */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {(formData.galleryItems || []).map((g) => (
                <div key={g.id} className="rounded-xl bg-white border border-[#c3ddf0] overflow-hidden shadow-sm flex flex-col justify-between">
                  <div className="h-40 w-full bg-slate-900 flex items-center justify-center overflow-hidden">
                    <img
                      src={g.imageUrl}
                      alt={g.title}
                      className={`w-full h-full ${
                        (g as any).cropMode === 'contain' ? 'object-contain p-1' : 'object-cover'
                      }`}
                    />
                  </div>
                  <div className="p-4 space-y-1.5">
                    <div className="font-bold text-xs text-[#001e3c]">{g.title}</div>
                    <div className="text-[11px] text-slate-500 line-clamp-2">{g.desc}</div>
                    <div className="pt-2 flex justify-end gap-1.5">
                      <button
                        onClick={() => {
                          setEditingGalId(g.id)
                          setGalForm({ cropMode: 'cover', ...g })
                          setIsEditingGal(true)
                        }}
                        className="px-2.5 py-1 bg-cyan-100 text-[#0056a8] rounded-lg text-xs font-bold hover:bg-cyan-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteGalleryItem(g.id)}
                        className="px-2.5 py-1 bg-red-100 text-red-600 rounded-lg text-xs font-bold hover:bg-red-200"
                      >
                        Del
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: SERVICES MANAGER */}
        {activeTab === 'services' && (
          <div className="bg-white rounded-2xl p-6 border border-[#c3ddf0] shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#001e3c]">Manage Purifier & Plant Services</h3>
                <p className="text-xs text-slate-500 mt-0.5">Add, edit, or remove services, descriptions, features and photos</p>
              </div>
              {!isEditingService && (
                <button
                  onClick={() => {
                    setEditingServiceId(null)
                    setServiceForm({
                      id: `service-${Date.now()}`,
                      category: 'residential',
                      title: '',
                      desc: '',
                      features: [''],
                      badge: '',
                      color: '#0056a8',
                      imageUrl: '',
                      cropMode: 'cover',
                    })
                    setIsEditingService(true)
                  }}
                  className="px-4 py-2 rounded-lg bg-[#0056a8] text-white text-xs font-bold shadow-sm"
                >
                  + Add New Service
                </button>
              )}
            </div>

            {/* Service Editor Box */}
            {isEditingService && (
              <div className="p-5 rounded-xl bg-cyan-50/70 border border-cyan-200 space-y-4">
                <div className="flex items-center justify-between border-b border-cyan-200 pb-2">
                  <h4 className="text-xs font-bold uppercase text-[#0056a8]">
                    {editingServiceId ? 'Edit Service' : 'Create New Service'}
                  </h4>
                  <button onClick={() => setIsEditingService(false)} className="text-xs font-bold text-slate-400">✕ Cancel</button>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold mb-1 text-[#001e3c]">Service Title *</label>
                    <input
                      type="text"
                      placeholder="e.g. Industrial RO Plant Maintenance"
                      value={serviceForm.title}
                      onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-cyan-200 text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1 text-[#001e3c]">Category</label>
                    <select
                      value={serviceForm.category}
                      onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-cyan-200 text-xs font-semibold"
                    >
                      <option value="residential">Residential Home</option>
                      <option value="commercial">Commercial & Plants</option>
                      <option value="maintenance">Maintenance & Repairs</option>
                    </select>
                  </div>
                </div>

                {/* Service Photo Upload */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold mb-1 text-[#001e3c]">Service Image (Upload from Computer)</label>
                  <div className="flex items-center gap-3">
                    {serviceForm.imageUrl && (
                      <div className="w-16 h-12 rounded-lg overflow-hidden border border-cyan-200 bg-slate-900 flex-shrink-0">
                        <img
                          src={serviceForm.imageUrl}
                          alt="Service"
                          className={`w-full h-full ${serviceForm.cropMode === 'contain' ? 'object-contain p-1' : 'object-cover'}`}
                        />
                      </div>
                    )}
                    
                    <input
                      ref={serviceImgInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleServiceImgUpload}
                      className="hidden"
                    />

                    <button
                      type="button"
                      onClick={() => serviceImgInputRef.current?.click()}
                      className="px-4 py-2 rounded-lg bg-[#0056a8] text-white text-xs font-bold hover:bg-[#003870]"
                    >
                      📁 Choose Image File from Computer
                    </button>

                    {serviceForm.imageUrl && (
                      <button
                        type="button"
                        onClick={() => setServiceForm({ ...serviceForm, imageUrl: '' })}
                        className="text-xs font-bold text-red-600 hover:underline"
                      >
                        Remove Photo
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1 text-[#001e3c]">Description</label>
                  <textarea
                    rows={2}
                    placeholder="Describe what is included..."
                    value={serviceForm.desc}
                    onChange={(e) => setServiceForm({ ...serviceForm, desc: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-cyan-200 text-xs font-semibold"
                  />
                </div>

                {/* Features Checklist */}
                <div>
                  <label className="block text-xs font-bold mb-1 text-[#001e3c]">Key Features List</label>
                  <div className="space-y-2">
                    {serviceForm.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={feat}
                          onChange={(e) => handleFeatureChange(idx, e.target.value)}
                          placeholder="Feature bullet point..."
                          className="flex-1 px-3 py-1.5 rounded-lg bg-white border border-cyan-200 text-xs font-semibold"
                        />
                        <button
                          onClick={() => handleRemoveFeatureField(idx)}
                          className="px-2.5 py-1.5 bg-red-100 text-red-600 rounded-lg text-xs font-bold hover:bg-red-200"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={handleAddFeatureField}
                      className="text-xs font-bold text-[#0056a8] hover:underline pt-1"
                    >
                      + Add Bullet Feature Point
                    </button>
                  </div>
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  <button onClick={() => setIsEditingService(false)} className="px-4 py-1.5 rounded-lg bg-slate-200 text-slate-700 text-xs font-bold">
                    Cancel
                  </button>
                  <button onClick={handleSaveService} className="px-5 py-1.5 rounded-lg bg-[#0056a8] text-white text-xs font-bold hover:bg-[#003870]">
                    Save Service
                  </button>
                </div>
              </div>
            )}

            {/* Service Cards List */}
            <div className="grid sm:grid-cols-2 gap-4">
              {formData.services.map((s) => (
                <div
                  key={s.id}
                  className="p-4 rounded-xl bg-white border border-[#c3ddf0] shadow-sm flex items-start justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    {s.imageUrl && (
                      <img src={s.imageUrl} alt={s.title} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                    )}
                    <div>
                      <div className="font-bold text-xs text-[#001e3c]">{s.title}</div>
                      <div className="text-[11px] text-slate-500 capitalize mt-0.5">{s.category}</div>
                    </div>
                  </div>

                  <div className="flex gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => handleEditServiceInit(s)}
                      className="px-2.5 py-1 bg-cyan-100 text-[#0056a8] rounded-lg text-xs font-bold hover:bg-cyan-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteService(s.id)}
                      className="px-2.5 py-1 bg-red-100 text-red-600 rounded-lg text-xs font-bold hover:bg-red-200"
                    >
                      Del
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: COMPANY & CONTACT DETAILS */}
        {activeTab === 'general' && (
          <div className="bg-white rounded-2xl p-6 border border-[#c3ddf0] shadow-sm space-y-5">
            <h3 className="text-lg font-bold text-[#001e3c]">General Business Details</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1 text-[#001e3c]">Company Name</label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1 text-[#001e3c]">Subtitle / Tagline</label>
                <input
                  type="text"
                  value={formData.companySubtitle}
                  onChange={(e) => setFormData({ ...formData, companySubtitle: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1 text-[#001e3c]">Phone Number</label>
                <input
                  type="text"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1 text-[#001e3c]">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs font-semibold"
                />
              </div>
            </div>

            <hr className="border-slate-200" />

            <h3 className="text-lg font-bold text-[#001e3c]">Founder Information</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1 text-[#001e3c]">Founder Name</label>
                <input
                  type="text"
                  value={formData.founderName}
                  onChange={(e) => setFormData({ ...formData, founderName: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1 text-[#001e3c]">Founder Role</label>
                <input
                  type="text"
                  value={formData.founderRole}
                  onChange={(e) => setFormData({ ...formData, founderRole: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs font-semibold"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold mb-1 text-[#001e3c]">Founder Biography</label>
              <textarea
                rows={3}
                value={formData.founderBio}
                onChange={(e) => setFormData({ ...formData, founderBio: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs font-semibold"
              />
            </div>
          </div>
        )}

        {/* TAB 4: AP CITIES COVERAGE */}
        {activeTab === 'coverage' && (
          <div className="bg-white rounded-2xl p-6 border border-[#c3ddf0] shadow-sm space-y-5">
            <h3 className="text-lg font-bold text-[#001e3c]">Andhra Pradesh Cities Coverage</h3>
            
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Enter new AP city name..."
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                className="flex-1 px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-xs font-semibold"
              />
              <button
                onClick={handleAddCity}
                className="px-5 py-2.5 rounded-lg bg-[#0056a8] text-white text-xs font-bold hover:bg-[#003870]"
              >
                + Add City
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {formData.cities.map((city) => (
                <span
                  key={city}
                  className="px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-xs font-bold text-[#0056a8] flex items-center gap-2"
                >
                  <span>{city}</span>
                  <button
                    onClick={() => handleRemoveCity(city)}
                    className="text-slate-400 hover:text-red-500 font-bold"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SECURITY & CREDENTIALS */}
        {activeTab === 'security' && (
          <div className="bg-white rounded-2xl p-6 border border-[#c3ddf0] shadow-sm space-y-5">
            <h3 className="text-lg font-bold text-[#001e3c]">Change Admin Login Credentials</h3>
            <p className="text-xs text-slate-500">Update your username and password for accessing the Admin Portal.</p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1 text-[#001e3c]">Admin Username</label>
                <input
                  type="text"
                  value={formData.adminUsername}
                  onChange={(e) => setFormData({ ...formData, adminUsername: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1 text-[#001e3c]">Admin Password</label>
                <input
                  type="text"
                  value={formData.adminPass}
                  onChange={(e) => setFormData({ ...formData, adminPass: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs font-semibold"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: HEADER & LOGO PHOTOS */}
        {activeTab === 'images' && (
          <div className="bg-white rounded-2xl p-6 border border-[#c3ddf0] shadow-sm space-y-5">
            <div>
              <h3 className="text-lg font-bold text-[#001e3c]">Upload Website Photos From Computer</h3>
              <p className="text-xs text-slate-500 mt-0.5">Select image files directly from your PC or mobile device for Logo, Founder, and Hero sections.</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-5">
              
              {/* 1. Logo Upload */}
              <div className="p-5 rounded-xl bg-cyan-50/60 border border-cyan-200 flex flex-col justify-between items-center text-center space-y-3">
                <div className="font-bold text-xs text-[#001e3c]">Company Logo</div>
                
                <div className="w-24 h-24 rounded-xl bg-white border border-slate-200 p-2 flex items-center justify-center overflow-hidden">
                  {formData.logoUrl ? (
                    <img src={formData.logoUrl} alt="Logo" className="max-w-full max-h-full object-contain" />
                  ) : (
                    <span className="text-xs text-slate-400">Default Logo</span>
                  )}
                </div>

                <input ref={logoInputRef} type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />

                <div className="w-full space-y-1.5">
                  <button
                    onClick={() => logoInputRef.current?.click()}
                    className="w-full py-2 rounded-lg bg-[#0056a8] hover:bg-[#003870] text-white text-xs font-bold"
                  >
                    📁 Upload Logo File
                  </button>
                  {formData.logoUrl && (
                    <button
                      onClick={() => setFormData({ ...formData, logoUrl: '' })}
                      className="w-full py-0.5 text-xs text-red-600 font-bold hover:underline"
                    >
                      Reset Logo
                    </button>
                  )}
                </div>
              </div>

              {/* 2. Founder Photo Upload */}
              <div className="p-5 rounded-xl bg-cyan-50/60 border border-cyan-200 flex flex-col justify-between items-center text-center space-y-3">
                <div className="font-bold text-xs text-[#001e3c]">Founder Photo</div>
                
                <div className="w-24 h-28 rounded-xl bg-white border border-slate-200 overflow-hidden">
                  {formData.founderImgUrl ? (
                    <img src={formData.founderImgUrl} alt="Founder" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs text-slate-400 flex items-center justify-center h-full">Default Photo</span>
                  )}
                </div>

                <input ref={founderInputRef} type="file" accept="image/*" onChange={handleFounderUpload} className="hidden" />

                <div className="w-full space-y-1.5">
                  <button
                    onClick={() => founderInputRef.current?.click()}
                    className="w-full py-2 rounded-lg bg-[#0056a8] hover:bg-[#003870] text-white text-xs font-bold"
                  >
                    📁 Upload Founder Photo
                  </button>
                  {formData.founderImgUrl && (
                    <button
                      onClick={() => setFormData({ ...formData, founderImgUrl: '' })}
                      className="w-full py-0.5 text-xs text-red-600 font-bold hover:underline"
                    >
                      Reset Photo
                    </button>
                  )}
                </div>
              </div>

              {/* 3. Hero Image Upload */}
              <div className="p-5 rounded-xl bg-cyan-50/60 border border-cyan-200 flex flex-col justify-between items-center text-center space-y-3">
                <div className="font-bold text-xs text-[#001e3c]">Hero Product Image</div>
                
                <div className="w-24 h-24 rounded-xl bg-white border border-slate-200 p-2 flex items-center justify-center overflow-hidden">
                  {formData.heroImageUrl ? (
                    <img src={formData.heroImageUrl} alt="Hero Product" className="max-w-full max-h-full object-contain" />
                  ) : (
                    <span className="text-xs text-slate-400">Default Hero</span>
                  )}
                </div>

                <input ref={heroInputRef} type="file" accept="image/*" onChange={handleHeroUpload} className="hidden" />

                <div className="w-full space-y-1.5">
                  <button
                    onClick={() => heroInputRef.current?.click()}
                    className="w-full py-2 rounded-lg bg-[#0056a8] hover:bg-[#003870] text-white text-xs font-bold"
                  >
                    📁 Upload Hero Image
                  </button>
                  {formData.heroImageUrl && (
                    <button
                      onClick={() => setFormData({ ...formData, heroImageUrl: '' })}
                      className="w-full py-0.5 text-xs text-red-600 font-bold hover:underline"
                    >
                      Reset Hero
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 7: CLOUD DB & LIVE SYNC */}
        {activeTab === 'cloud' && (
          <div className="bg-white rounded-2xl p-6 border border-[#c3ddf0] shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-[#001e3c] flex items-center gap-2">
                <span>⚡ Live Cloud Database & Sync Management</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Every edit saved here is synchronized across all visitors and devices globally in real-time.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {/* Connection Status Card */}
              <div className="p-5 rounded-xl bg-cyan-50/80 border border-cyan-200 space-y-3">
                <div className="text-xs font-bold uppercase text-[#0056a8]">Live Sync Status</div>
                <div className="flex items-center gap-3">
                  <div className={`w-3.5 h-3.5 rounded-full ${
                    isSyncing ? 'bg-amber-500 animate-ping' : syncStatus === 'synced' ? 'bg-emerald-500' : 'bg-cyan-500'
                  }`} />
                  <div>
                    <div className="text-sm font-bold text-[#001e3c]">
                      {isSyncing ? 'Synchronizing with Cloud DB...' : syncStatus === 'synced' ? 'Live Cloud Sync Active' : 'Connected to Cloud DB'}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {lastSyncedAt ? `Last Synced: ${lastSyncedAt.toLocaleTimeString()}` : 'Ready for live updates'}
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    disabled={isSyncing}
                    onClick={() => syncWithCloud()}
                    className="px-4 py-2 rounded-lg bg-[#0056a8] hover:bg-[#003870] text-white text-xs font-bold shadow-sm transition"
                  >
                    🔄 Refresh & Pull Latest Cloud Data
                  </button>
                </div>
              </div>

              {/* Endpoint Configuration Card */}
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="text-xs font-bold uppercase text-slate-700">REST API Endpoint URL</div>
                <p className="text-[11px] text-slate-600">
                  By default, a shared cloud database endpoint is active. You can customize this endpoint if you run your own REST API server.
                </p>
                <input
                  type="text"
                  value={customCloudUrlInput}
                  onChange={(e) => setCustomCloudUrlInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs font-mono"
                  placeholder="https://api.restful-api.dev/objects/..."
                />
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={handleSaveCloudUrl}
                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold"
                  >
                    Save Custom Endpoint
                  </button>
                  <button
                    onClick={() => {
                      setActiveCloudUrl('')
                      setCustomCloudUrlInput(getActiveCloudUrl())
                      syncWithCloud()
                    }}
                    className="px-3 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold"
                  >
                    Reset Endpoint
                  </button>
                </div>
              </div>
            </div>

            {/* Reset All Database Edits to Fresh Code Defaults */}
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-rose-900">Revert All Content to Default Code Values</div>
                <div className="text-[11px] text-rose-700">
                  Discards all live Admin Portal database edits and resets company phone, text, services, and photos back to default codebase values.
                </div>
              </div>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to discard all Admin Portal edits and revert back to fresh code defaults?')) {
                    resetToDefaults()
                    alert('All site content has been reset to default code values.')
                  }
                }}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm whitespace-nowrap"
              >
                ⚠️ Revert to Code Defaults
              </button>
            </div>
          </div>
        )}


        {/* Bottom Page Actions */}
        <div className="bg-white rounded-2xl p-5 border border-[#c3ddf0] shadow-sm flex items-center justify-end">
          <div className="flex gap-3">
            <button
              onClick={() => setIsAdminOpen(false)}
              className="px-5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
            >
              Exit to Website
            </button>
            <button
              onClick={handleSaveAll}
              className="px-6 py-2 rounded-lg bg-[#0056a8] hover:bg-[#003870] text-white text-xs font-bold shadow-md"
            >
              Save & Publish Website
            </button>
          </div>
        </div>

      </main>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* MODAL 1: OFFICIAL QUOTATION GENERATOR & WHATSAPP DISPATCH */}
      {/* ------------------------------------------------------------- */}
      {quoteModalOpen && selectedInquiryForQuote && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-extrabold text-[#001e3c] font-serif">📄 Generate & Send Official Quote</h3>
                <p className="text-xs text-slate-500">Customer: <strong className="text-[#0056a8]">{selectedInquiryForQuote.name}</strong> ({selectedInquiryForQuote.phone})</p>
              </div>
              <button onClick={() => setQuoteModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Service / Requirement Title</label>
                <input
                  type="text"
                  value={quoteForm.title}
                  onChange={(e) => setQuoteForm({ ...quoteForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-[#001e3c]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Quote Price (₹) *</label>
                  <input
                    type="number"
                    value={quoteForm.price}
                    onChange={(e) => setQuoteForm({ ...quoteForm, price: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-[#0056a8]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Discount (₹)</label>
                  <input
                    type="number"
                    value={quoteForm.discount}
                    onChange={(e) => setQuoteForm({ ...quoteForm, discount: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Terms & Service Inclusions</label>
                <textarea
                  rows={2}
                  value={quoteForm.notes}
                  onChange={(e) => setQuoteForm({ ...quoteForm, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-700"
                />
              </div>
            </div>

            {/* Preview Box */}
            <div className="p-3.5 rounded-2xl bg-cyan-50/70 border border-cyan-200 space-y-1.5 text-[11px] text-slate-700">
              <div className="font-bold text-[#0056a8]">Official Quote Message Summary:</div>
              <div className="font-mono bg-white p-2.5 rounded-xl border border-cyan-100 leading-relaxed">
                <div>• Customer: {selectedInquiryForQuote.name}</div>
                <div>• Service: {quoteForm.title}</div>
                <div>• Price: ₹{quoteForm.price}</div>
                <div>• Net Total: ₹{Math.max(0, (Number(quoteForm.price) || 0) - (Number(quoteForm.discount) || 0))}</div>
                <div>• Direct Payment UPI: {formData.companyUpiId || '9666827570@upi'}</div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setQuoteModalOpen(false)}
                className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const netPrice = Math.max(0, (Number(quoteForm.price) || 0) - (Number(quoteForm.discount) || 0))
                  
                  // Also update quote in local formData inquiry
                  handleUpdateInquiryPayment(selectedInquiryForQuote.id, {
                    quoteAmount: netPrice,
                  })

                  const cleanPhone = selectedInquiryForQuote.phone.replace(/[^0-9]/g, '')
                  const upiId = formData.companyUpiId || '9666827570@upi'
                  
                  const msg = `*SREE WATER SOLUTIONS - OFFICIAL QUOTATION*%0A%0A` +
                    `Dear *${encodeURIComponent(selectedInquiryForQuote.name)}*,%0A` +
                    `Thank you for reaching out to Sree Water Solutions! Here is your official service quotation:%0A%0A` +
                    `📋 *Service:* ${encodeURIComponent(quoteForm.title)}%0A` +
                    `💰 *Quoted Price:* ₹${quoteForm.price}%0A` +
                    (Number(quoteForm.discount) > 0 ? `🎁 *Discount Applied:* ₹${quoteForm.discount}%0A` : '') +
                    `✅ *Final Net Total:* ₹${netPrice}%0A%0A` +
                    `📝 *Inclusions:* ${encodeURIComponent(quoteForm.notes)}%0A%0A` +
                    `💳 *Direct Bank/UPI Payment Details:*%0A` +
                    `UPI ID: *${upiId}*%0A` +
                    `GPay / PhonePe Number: *9666827570*%0A%0A` +
                    `Reply YES to confirm your booking or call us at +91 9666827570!`

                  window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank')
                  setQuoteModalOpen(false)
                }}
                className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md"
              >
                💬 Dispatch Quote via WhatsApp
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL 2: DIRECT UPI QR CODE & BANK PAYMENT POPUP */}
      {/* ------------------------------------------------------------- */}
      {qrModalOpen && selectedInquiryForQr && (() => {
        const upiId = formData.companyUpiId || '9666827570@upi'
        const amount = selectedInquiryForQr.quoteAmount || 0
        const upiPayString = `upi://pay?pa=${upiId}&pn=SreeWaterSolutions&am=${amount}&cu=INR`
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiPayString)}`

        return (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-5 border border-slate-200 text-center">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="text-left">
                  <h3 className="text-base font-extrabold text-[#001e3c]">💳 Instant UPI QR Payment</h3>
                  <div className="text-xs text-slate-500">{selectedInquiryForQr.name}</div>
                </div>
                <button onClick={() => setQrModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
              </div>

              {/* Dynamic QR Code */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 inline-block mx-auto shadow-inner">
                <img src={qrUrl} alt="UPI Payment QR Code" className="w-48 h-48 mx-auto rounded-xl" />
              </div>

              <div className="space-y-1">
                <div className="text-xs text-slate-500">Scan with Google Pay, PhonePe, Paytm, or BHIM</div>
                <div className="text-xl font-extrabold text-[#0056a8]">₹{Number(amount).toLocaleString('en-IN')}</div>
                <div className="text-xs font-mono font-bold text-slate-700 bg-cyan-50 p-2 rounded-xl border border-cyan-200">
                  UPI ID: {upiId}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    const cleanPhone = selectedInquiryForQr.phone.replace(/[^0-9]/g, '')
                    const msg = `Hi *${encodeURIComponent(selectedInquiryForQr.name)}*, please scan to pay ₹${amount} for Sree Water Solutions:%0A%0A` +
                      `UPI ID: *${upiId}*%0A` +
                      `Direct Payment Link: ${encodeURIComponent(upiPayString)}`
                    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank')
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                >
                  💬 Send QR via WhatsApp
                </button>
                <button
                  onClick={() => setQrModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )
      })()}

    </div>
  )
}
