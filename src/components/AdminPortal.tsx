import { useState, useRef } from 'react'
import logoDefault from '../../logo.png'
import { useSiteContext, ServiceData, ServiceGalleryItem } from '../context/SiteContext'

export default function AdminPortal() {
  const {
    siteData,
    updateSiteData,
    isAdminOpen,
    setIsAdminOpen,
    isAuthenticated,
    setIsAuthenticated,
  } = useSiteContext()

  // Login Form State
  const [loginUser, setLoginUser] = useState('')
  const [loginPass, setLoginPass] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState('')

  // Forgot Credentials State
  const [forgotModalOpen, setForgotModalOpen] = useState(false)
  const [forgotSent, setForgotSent] = useState(false)

  // Admin Portal Tab State (Default: 'gallery' which is "Previous Work")
  const [activeTab, setActiveTab] = useState<'gallery' | 'services' | 'general' | 'coverage' | 'security' | 'images'>('gallery')
  const [formData, setFormData] = useState({ ...siteData })
  const [newCity, setNewCity] = useState('')
  const [savedSuccess, setSavedSuccess] = useState(false)

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

  // HELPER: Convert computer file to Base64 Data URL
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
      reader.readAsDataURL(file)
    })
  }

  // LOGIN AUTHENTICATION HANDLER
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const enteredUser = (loginUser || '').trim().toLowerCase()
    const enteredPass = (loginPass || '').trim()

    const targetUser = (siteData?.adminUsername || 'admin').trim().toLowerCase()
    const targetPass = (siteData?.adminPass || 'sreewater@2026').trim()

    if (enteredUser === targetUser && enteredPass === targetPass) {
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

  const handleSaveAll = () => {
    updateSiteData(formData)
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 3000)
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

  // RENDER 2: FULL-PAGE ADMIN DASHBOARD (Clean, Human-Designed User-Friendly UI)
  return (
    <div className="fixed inset-0 z-50 w-screen h-screen bg-[#f0f8ff] overflow-y-auto flex flex-col">
      
      {/* User-Friendly Header Bar */}
      <header className="sticky top-0 z-40 bg-[#001e3c] text-white px-6 py-3.5 border-b border-cyan-500/20 shadow-md flex items-center justify-between flex-shrink-0">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg overflow-hidden p-0.5 bg-white flex items-center justify-center flex-shrink-0">
              <img
                src={formData.logoUrl || logoDefault}
                alt={siteData.companyName}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="text-white font-bold text-base tracking-tight">
                {siteData.companyName} <span className="text-cyan-400 text-xs font-semibold">• Admin Dashboard</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSaveAll}
              className="px-4 py-2 rounded-lg bg-[#0056a8] hover:bg-[#003870] text-white text-xs font-bold shadow-sm transition"
            >
              Save & Publish Website
            </button>
            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-lg bg-red-600/80 hover:bg-red-600 text-white text-xs font-bold transition"
            >
              Logout
            </button>
            <button
              onClick={() => setIsAdminOpen(false)}
              className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition"
            >
              Exit to Website
            </button>
          </div>

        </div>
      </header>

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-6 space-y-6">
        
        {/* Navigation Tabs Bar */}
        <div className="bg-white rounded-xl p-1.5 border border-[#c3ddf0] shadow-sm flex gap-1.5 overflow-x-auto">
          {[
            { id: 'gallery', label: 'Previous Work' },
            { id: 'services', label: 'Services Manager' },
            { id: 'general', label: 'Company & Contact Details' },
            { id: 'coverage', label: 'AP Cities Coverage' },
            { id: 'security', label: 'Security & Login' },
            { id: 'images', label: 'Header & Logo Photos' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#0056a8] text-white shadow-sm'
                  : 'text-[#001e3c] hover:bg-cyan-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {savedSuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2">
            <span>✓</span> All changes saved and published to the website successfully!
          </div>
        )}

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
  )
}
