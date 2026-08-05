import { useRealEstate, Property } from '../context/RealEstateContext'

export default function PropertiesGrid() {
  const {
    properties,
    filters,
    setFilters,
    resetFilters,
    isFavorite,
    toggleFavorite,
    setSelectedProperty,
    setTourModalProperty
  } = useRealEstate()

  // Apply filters
  const filteredProperties = properties.filter((p) => {
    // 1. Search Query
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase()
      const matchTitle = p.title.toLowerCase().includes(q)
      const matchLoc = p.location.toLowerCase().includes(q)
      const matchCity = p.city.toLowerCase().includes(q)
      const matchDesc = p.description.toLowerCase().includes(q)
      if (!matchTitle && !matchLoc && !matchCity && !matchDesc) return false
    }

    // 2. Category (Buy/Rent)
    if (filters.category !== 'all') {
      if (p.status !== filters.category && (filters.category === 'For Rent' ? p.status !== 'For Rent' : p.status === 'For Rent')) {
        return false
      }
    }

    // 3. Property Type
    if (filters.propertyType !== 'All' && p.type !== filters.propertyType) {
      return false
    }

    // 4. City
    if (filters.city !== 'All' && p.city !== filters.city) {
      return false
    }

    // 5. Bedrooms
    if (filters.bedrooms !== 'All') {
      const minBeds = parseInt(filters.bedrooms)
      if (p.bedrooms < minBeds) return false
    }

    return true
  }).sort((a, b) => {
    if (filters.sortBy === 'price-asc') return a.price - b.price
    if (filters.sortBy === 'price-desc') return b.price - a.price
    if (filters.sortBy === 'sqft-desc') return b.areaSqft - a.areaSqft
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
  })

  return (
    <section id="properties" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
              EXPLORE OUR PORTFOLIO
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-serif">
              Featured Luxury Properties
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Hand-picked architectural estates, penthouses, and luxury villas verified by our team.
            </p>
          </div>

          {/* Sort Control Dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-400">Sort by:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
              className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-white focus:outline-none focus:border-amber-400 transition"
            >
              <option value="featured">Featured First</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="sqft-desc">Area: Largest First</option>
            </select>
          </div>
        </div>

        {/* Filter Bar Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
          
          <div className="flex flex-wrap items-center gap-2">
            {['All', 'Villa', 'Penthouse', 'Apartment', 'Commercial'].map((type) => (
              <button
                key={type}
                onClick={() => setFilters(prev => ({ ...prev, propertyType: type }))}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  filters.propertyType === type
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">
              Showing <strong className="text-amber-400">{filteredProperties.length}</strong> Properties
            </span>
            {(filters.searchQuery || filters.propertyType !== 'All' || filters.city !== 'All') && (
              <button
                onClick={resetFilters}
                className="text-xs font-bold text-rose-400 hover:underline"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Properties Grid Cards */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-20 bg-slate-950 rounded-3xl border border-slate-800 space-y-4">
            <div className="text-4xl">🔍</div>
            <h3 className="text-xl font-bold text-white">No properties matched your criteria</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Try adjusting your search location, price range, or property type filters.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 rounded-full bg-amber-400 text-slate-950 text-xs font-bold"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((p) => (
              <PropertyCard
                key={p.id}
                property={p}
                isFav={isFavorite(p.id)}
                onFavoriteToggle={() => toggleFavorite(p.id)}
                onViewDetails={() => setSelectedProperty(p)}
                onBookTour={() => setTourModalProperty(p)}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  )
}

function PropertyCard({
  property: p,
  isFav,
  onFavoriteToggle,
  onViewDetails,
  onBookTour
}: {
  property: Property
  isFav: boolean
  onFavoriteToggle: () => void
  onViewDetails: () => void
  onBookTour: () => void
}) {
  return (
    <div className="group rounded-3xl bg-slate-950 border border-slate-800/90 overflow-hidden shadow-xl hover:shadow-2xl hover:border-amber-500/30 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5">
      
      {/* Top Image Box */}
      <div className="relative h-64 w-full overflow-hidden bg-slate-900">
        <img
          src={p.image}
          alt={p.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Overlay Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

        {/* Badges top left */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-amber-400 text-slate-950 shadow-md">
            {p.type}
          </span>
          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-slate-900/80 text-white border border-white/20 backdrop-blur-md">
            {p.status}
          </span>
        </div>

        {/* Favorite Like Button top right */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onFavoriteToggle()
          }}
          className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition ${
            isFav
              ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
              : 'bg-slate-900/60 text-slate-300 hover:text-white border border-white/20'
          }`}
          aria-label="Toggle Favorite"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>

        {/* Price tag bottom left inside image */}
        <div className="absolute bottom-4 left-4 text-white">
          <div className="text-2xl font-extrabold font-serif text-amber-300">
            {p.priceFormatted}
            {p.period && <span className="text-xs text-slate-300 font-sans font-normal">/{p.period}</span>}
          </div>
          <div className="text-[11px] text-slate-300 flex items-center gap-1 mt-0.5">
            <span>📍</span>
            <span>{p.location}</span>
          </div>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-6 space-y-4">
        
        <div>
          <h3
            onClick={onViewDetails}
            className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors cursor-pointer line-clamp-1 font-serif"
          >
            {p.title}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-2 mt-1 font-normal leading-relaxed">
            {p.tagline}
          </p>
        </div>

        {/* Specs Grid (Beds, Baths, Sqft) */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-800/80 text-center text-xs">
          <div>
            <div className="font-extrabold text-white">{p.bedrooms} Beds</div>
            <div className="text-[10px] text-slate-500">Bedrooms</div>
          </div>
          <div>
            <div className="font-extrabold text-white">{p.bathrooms} Baths</div>
            <div className="text-[10px] text-slate-500">Bathrooms</div>
          </div>
          <div>
            <div className="font-extrabold text-white">{p.areaSqft.toLocaleString()}</div>
            <div className="text-[10px] text-slate-500">Sq. Ft.</div>
          </div>
        </div>

        {/* Agent Info & Action Buttons */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2.5">
            <img
              src={p.agent.avatar}
              alt={p.agent.name}
              className="w-8 h-8 rounded-full object-cover border border-amber-400/40"
            />
            <div>
              <div className="text-xs font-bold text-white">{p.agent.name}</div>
              <div className="text-[10px] text-slate-400">Verified Agent</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onViewDetails}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition"
            >
              Details
            </button>
            <button
              onClick={onBookTour}
              className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-extrabold transition shadow-md shadow-amber-500/20"
            >
              Tour
            </button>
          </div>
        </div>

      </div>

    </div>
  )
}
