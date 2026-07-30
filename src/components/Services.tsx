import { useState, useRef } from 'react'
import { useSiteContext } from '../context/SiteContext'

const categoryIcons: Record<string, React.ReactNode> = {
  residential: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z"/>
      <circle cx="12" cy="9" r="2.5"/>
    </svg>
  ),
  commercial: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="2" y="3" width="20" height="14" rx="2" strokeWidth="1.8"/>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 21h8M12 17v4M7 8h2M15 8h2M11 8h2"/>
    </svg>
  ),
  maintenance: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
}

export default function Services() {
  const { siteData } = useSiteContext()
  const [activeTab, setActiveTab] = useState<'all' | 'residential' | 'commercial' | 'maintenance'>('all')
  const scrollRef = useRef<HTMLDivElement>(null)

  const filteredServices = activeTab === 'all'
    ? siteData.services
    : siteData.services.filter(s => s.category === activeTab)

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -340, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 340, behavior: 'smooth' })
    }
  }

  const galleryItems = siteData.galleryItems || []

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-[#f0f8ff] text-[#001e3c]">
      <div className="w-full max-w-[95%] xl:max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-100 border border-cyan-300 text-[#0056a8] text-xs font-bold tracking-widest uppercase">
            <span>What We Offer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#001e3c] tracking-tight font-serif">
            Complete Water Purification Solutions
          </h2>
          <p className="text-base sm:text-lg text-[#4a6d8c]">
            From single home purifiers to large commercial plants — we handle installation, maintenance, and everything in between 24/7.
          </p>
        </div>

        {/* 1. PREVIOUS WORK SCROLLING SLIDER */}
        {galleryItems.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-extrabold text-[#001e3c] tracking-tight">Previous Work</h3>
                <p className="text-xs text-[#4a6d8c] mt-0.5">Explore our real-world purifier installations and maintenance projects across Andhra Pradesh</p>
              </div>

              {/* Slider Navigation Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={scrollLeft}
                  className="w-10 h-10 rounded-full bg-white border border-[#c3ddf0] text-[#0056a8] hover:bg-[#0056a8] hover:text-white shadow-sm flex items-center justify-center transition"
                  aria-label="Scroll Left"
                >
                  ◀
                </button>
                <button
                  onClick={scrollRight}
                  className="w-10 h-10 rounded-full bg-white border border-[#c3ddf0] text-[#0056a8] hover:bg-[#0056a8] hover:text-white shadow-sm flex items-center justify-center transition"
                  aria-label="Scroll Right"
                >
                  ▶
                </button>
              </div>
            </div>

            {/* Horizontal Scroll Container */}
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 w-72 sm:w-80 lg:w-96 rounded-3xl bg-white border border-[#e0eef8] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group snap-start flex flex-col justify-between"
                >
                  {/* Photo */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-900 flex items-center justify-center">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className={`w-full h-full group-hover:scale-105 transition-transform duration-500 ${
                        (item as any).cropMode === 'contain' ? 'object-contain p-2' : 'object-cover'
                      }`}
                    />
                  </div>

                  {/* Text details */}
                  <div className="p-6 space-y-2">
                    <h4 className="text-base font-extrabold text-[#001e3c] group-hover:text-[#0056a8] transition-colors">
                      {item.title}
                    </h4>
                    {item.desc && (
                      <p className="text-xs text-[#4a6d8c] leading-relaxed line-clamp-2">
                        {item.desc}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. CATEGORY TABS */}
        <div className="space-y-8">
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'residential', label: 'Residential Home' },
              { id: 'commercial', label: 'Commercial & Plants' },
              { id: 'maintenance', label: 'Maintenance & Repairs' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 rounded-full text-xs font-extrabold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-[#0056a8] text-white shadow-md shadow-blue-500/20 scale-105'
                    : 'bg-white hover:bg-cyan-50 text-[#001e3c] border border-[#c3ddf0]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 3. SERVICES GRID */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {filteredServices.map((s) => (
              <div
                key={s.id}
                className="group rounded-3xl bg-white border border-[#e0eef8] hover:border-[#c3ddf0] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="p-7">
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className="w-13 h-13 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm text-[#0056a8] p-3"
                        style={{ background: `${s.color || '#0056a8'}15`, color: s.color || '#0056a8' }}
                      >
                        {categoryIcons[s.category] || categoryIcons.residential}
                      </div>
                      {s.badge && (
                        <span className="px-3.5 py-1 rounded-full text-[10px] font-extrabold tracking-wide uppercase bg-cyan-100 text-[#0056a8] border border-cyan-300">
                          {s.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-extrabold text-[#001e3c] mb-2 group-hover:text-[#0056a8] transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-[#4a6d8c] text-xs sm:text-sm leading-relaxed mb-6">
                      {s.desc}
                    </p>

                    <ul className="space-y-2.5 mb-6">
                      {s.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#2d5a84]">
                          <span className="w-4 h-4 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0 text-[#0056a8] text-[10px] font-bold">
                            ✓
                          </span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>


                <div className="p-7 pt-0">
                  <a
                    href={`https://wa.me/${siteData.phoneNumber.replace(/[^0-9]/g, '')}?text=Hi%2C%20I%20am%20interested%20in%20${encodeURIComponent(s.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-xl bg-cyan-50 hover:bg-[#0056a8] border border-cyan-200 hover:border-[#0056a8] text-xs font-bold text-[#0056a8] hover:text-white transition-all flex items-center justify-center gap-2 group-hover:shadow-md"
                  >
                    <span>Book Service via WhatsApp</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
