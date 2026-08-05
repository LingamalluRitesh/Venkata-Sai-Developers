import { useState } from 'react'
import { useRealEstate } from '../context/RealEstateContext'

export default function Hero() {
  const { filters, setFilters, properties } = useRealEstate()
  const [activeTab, setActiveTab] = useState<'all' | 'For Sale' | 'For Rent'>('all')

  const cities = Array.from(new Set(properties.map(p => p.city)))
  const propertyTypes = Array.from(new Set(properties.map(p => p.type)))

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setFilters(prev => ({
      ...prev,
      category: activeTab
    }))
    const element = document.getElementById('properties')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="relative min-h-[92vh] lg:min-h-screen w-full bg-slate-950 text-white flex flex-col justify-between pt-28 pb-16 overflow-hidden">
      
      {/* Background Image Overlay with Vignette */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1800&auto=format&fit=crop&q=80"
          alt="Luxury Mansion Background"
          className="w-full h-full object-cover object-center scale-105 filter brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-slate-950/40 to-slate-950" />
      </div>

      {/* Main Hero Body */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex-1 flex flex-col justify-center py-10 lg:py-16 space-y-10">
        
        {/* Top Text Content */}
        <div className="max-w-3xl space-y-6 text-center md:text-left">
          
          {/* Tagline Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-widest uppercase backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>EXCLUSIVELY CURATED LUXURY REAL ESTATE</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] font-serif">
            <span>Discover Exceptional </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
              Homes & Luxury Estates
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
            Explore India's finest architectural marvels, waterfront villas, penthouses, and private estates curated for refined living.
          </p>
        </div>

        {/* Multi-Tab Property Search Box */}
        <div className="w-full max-w-5xl rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl p-4 sm:p-6 space-y-4">
          
          {/* Buy / Rent Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            {[
              { id: 'all', label: 'All Listings' },
              { id: 'For Sale', label: 'Buy Property' },
              { id: 'For Rent', label: 'Rent Property' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any)
                  setFilters(prev => ({ ...prev, category: tab.id as any }))
                }}
                className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
                    : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Controls Inputs */}
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
            
            {/* Search Input */}
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold tracking-widest uppercase text-slate-400 pl-1">
                LOCATION / KEYWORD
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Jubilee Hills, Ocean View..."
                  value={filters.searchQuery}
                  onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition"
                />
              </div>
            </div>

            {/* Property Type Dropdown */}
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold tracking-widest uppercase text-slate-400 pl-1">
                PROPERTY TYPE
              </label>
              <select
                value={filters.propertyType}
                onChange={(e) => setFilters(prev => ({ ...prev, propertyType: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white focus:outline-none focus:border-amber-400 transition"
              >
                <option value="All">All Types (Villa, Penthouse...)</option>
                {propertyTypes.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* City Dropdown */}
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold tracking-widest uppercase text-slate-400 pl-1">
                CITY / REGION
              </label>
              <select
                value={filters.city}
                onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white focus:outline-none focus:border-amber-400 transition"
              >
                <option value="All">All Cities</option>
                {cities.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div className="space-y-1 flex flex-col justify-end">
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-xs shadow-xl shadow-amber-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35"/>
                </svg>
                <span>Search Properties</span>
              </button>
            </div>

          </form>

        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 border-t border-slate-800/80 max-w-4xl">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-serif">$2.4B+</div>
            <div className="text-xs text-slate-400 font-medium">Real Estate Sold</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-serif">12,500+</div>
            <div className="text-xs text-slate-400 font-medium">Happy Families</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-serif">100%</div>
            <div className="text-xs text-slate-400 font-medium">Verified Clean Titles</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-serif">15+</div>
            <div className="text-xs text-slate-400 font-medium">Architectural Awards</div>
          </div>
        </div>

      </div>

    </section>
  )
}