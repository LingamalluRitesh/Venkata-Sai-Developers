import { useState } from 'react'
import { useRealEstate } from '../context/RealEstateContext'

export default function PropertyModal() {
  const { selectedProperty: p, setSelectedProperty, setTourModalProperty, isFavorite, toggleFavorite } = useRealEstate()
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  if (!p) return null

  const isFav = isFavorite(p.id)
  const cleanPhone = p.agent.phone.replace(/[^0-9]/g, '')

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-10 animate-fade-in">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl text-white max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-6 sm:px-8 border-b border-slate-800 flex items-center justify-between gap-4 bg-slate-950/60">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-amber-400 text-slate-950">
                {p.type}
              </span>
              <span className="text-xs text-slate-400">{p.location}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white font-serif">{p.title}</h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleFavorite(p.id)}
              className={`p-2.5 rounded-full border transition ${
                isFav ? 'bg-rose-500 text-white border-rose-500' : 'bg-slate-800 text-slate-300 border-slate-700'
              }`}
              title="Save to Favorites"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>

            <button
              onClick={() => setSelectedProperty(null)}
              className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center text-lg font-bold transition"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Gallery View */}
          <div className="space-y-4">
            <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-950">
              <img
                src={p.gallery[activeImageIndex] || p.image}
                alt={p.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Row */}
            {p.gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {p.gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition ${
                      activeImageIndex === idx ? 'border-amber-400 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt="Gallery" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Price & Key Metrics Bar */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Listing Price</div>
              <div className="text-3xl font-extrabold text-amber-400 font-serif">
                {p.priceFormatted}
                {p.period && <span className="text-xs font-sans text-slate-300">/{p.period}</span>}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 text-center border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6">
              <div>
                <div className="text-lg font-bold text-white">{p.bedrooms}</div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Beds</div>
              </div>
              <div>
                <div className="text-lg font-bold text-white">{p.bathrooms}</div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Baths</div>
              </div>
              <div>
                <div className="text-lg font-bold text-white">{p.areaSqft.toLocaleString()}</div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Sq Ft</div>
              </div>
              <div>
                <div className="text-lg font-bold text-white">{p.garages}</div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Garages</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h4 className="text-lg font-bold text-white font-serif">About This Property</h4>
            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              {p.description}
            </p>
          </div>

          {/* Amenities Grid */}
          <div className="space-y-3">
            <h4 className="text-lg font-bold text-white font-serif">Features & Amenities</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {p.amenities.map((amenity, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-200 flex items-center gap-2">
                  <span className="text-amber-400">✓</span>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Agent Contact Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={p.agent.avatar}
                alt={p.agent.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-amber-400 shadow-md"
              />
              <div>
                <div className="text-base font-bold text-white">{p.agent.name}</div>
                <div className="text-xs text-amber-400 font-semibold">{p.agent.role}</div>
                <div className="text-xs text-slate-400 mt-0.5">{p.agent.email}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={`https://wa.me/${cleanPhone}?text=Hi%20${encodeURIComponent(p.agent.name)}%2C%20I%20am%20interested%20in%20${encodeURIComponent(p.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg transition flex items-center justify-center gap-2"
              >
                <span>WhatsApp Agent</span>
              </a>

              <button
                onClick={() => {
                  setSelectedProperty(null)
                  setTourModalProperty(p)
                }}
                className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-lg transition"
              >
                Book Tour
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}
