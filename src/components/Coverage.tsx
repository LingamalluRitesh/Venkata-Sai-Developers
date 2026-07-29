import { useState } from 'react'
import { useSiteContext } from '../context/SiteContext'

export default function Coverage() {
  const { siteData } = useSiteContext()
  const [search, setSearch] = useState('')

  const cityList = siteData.cities || []

  const filteredCities = cityList.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase())
  )

  const cleanPhone = siteData.phoneNumber.replace(/[^0-9]/g, '')

  return (
    <section id="coverage" className="py-24 relative overflow-hidden bg-[#f0f8ff] text-[#001e3c]">
      <div className="w-full max-w-[95%] xl:max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-bold tracking-widest uppercase text-[#00b4d8]">
            SERVICE COVERAGE NETWORK
          </div>
          <h2
            className="text-4xl sm:text-5xl font-extrabold text-[#001e3c] tracking-tight"
            style={{ fontFamily: 'Lora, serif' }}
          >
            We Serve Across Andhra Pradesh
          </h2>
          <p className="text-base sm:text-lg text-[#4a6d8c]">
            Our 24/7 technicians are present across Andhra Pradesh — never far from you.
          </p>
        </div>

        {/* Search Bar & Stats Card Container */}
        <div className="w-full rounded-3xl overflow-hidden bg-white border border-[#c3ddf0] shadow-xl space-y-0">
          
          {/* State Header Banner */}
          <div className="px-8 sm:px-12 py-6 bg-gradient-to-r from-[#0056a8] via-[#003870] to-[#001e3c] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-cyan-300 text-xl">
                📍
              </div>
              <div>
                <h3 className="font-extrabold text-xl sm:text-2xl text-white">Andhra Pradesh State Coverage</h3>
                <div className="text-cyan-200 text-xs font-bold mt-0.5">
                  {cityList.length} Major Cities & Surrounding Districts Covered 24/7
                </div>
              </div>
            </div>

            {/* City Search Bar */}
            <div className="w-full sm:w-80 relative">
              <input
                type="text"
                placeholder="Search your city..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/25 text-xs text-white placeholder-cyan-200/60 focus:outline-none focus:bg-white focus:text-[#001e3c] transition shadow-inner"
              />
            </div>
          </div>

          {/* Cities Tags Grid - Expanded to use full screen width */}
          <div className="p-8 sm:p-12 space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
              {filteredCities.map((city) => (
                <div
                  key={city}
                  className="px-4 py-3 rounded-2xl bg-[#e8f4fd] border border-[#c3ddf0] text-xs font-extrabold text-[#0056a8] hover:bg-[#0056a8] hover:text-white transition-all duration-200 text-center flex items-center justify-center gap-2 group shadow-sm hover:scale-105"
                >
                  <span className="text-cyan-600 group-hover:text-white transition-colors">📍</span>
                  <span>{city}</span>
                </div>
              ))}
            </div>

            <p className="text-xs italic text-[#8badc8] text-center pt-2">
              + surrounding villages and rural industrial zones. Call our 24/7 hotline to confirm technician arrival time in your area.
            </p>
          </div>

        </div>

        {/* Map Callout Banner (Matching original styling, expanded full-width) */}
        <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-[#001e3c] via-[#003870] to-[#0056a8] border border-cyan-400/30 text-white flex flex-col md:flex-row items-center gap-8 text-center md:text-left shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-cyan-400/15 border border-cyan-400/30 flex items-center justify-center text-cyan-300 text-3xl flex-shrink-0 mx-auto md:mx-0">
            🌐
          </div>
          <div className="flex-1 space-y-1">
            <h3 className="text-white font-extrabold text-xl sm:text-2xl font-serif">Not sure if we cover your area?</h3>
            <p className="text-cyan-100/80 text-xs sm:text-sm leading-relaxed">
              Give us a call or send a WhatsApp message — we will confirm availability and dispatch a technician to your doorstep 24/7.
            </p>
          </div>
          <a
            href={`https://wa.me/${cleanPhone}?text=Hi%2C%20is%20water%20purifier%20service%20available%20in%20my%20area%3F`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-full font-extrabold text-xs sm:text-sm bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-lg flex-shrink-0 transition-all duration-200 hover:scale-105 whitespace-nowrap flex items-center gap-2"
          >
            <span>WhatsApp Us 24/7</span>
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
          </a>
        </div>

      </div>
    </section>
  )
}
