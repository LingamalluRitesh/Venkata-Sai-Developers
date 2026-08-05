import { useSiteContext } from '../context/SiteContext'

const apCities = [
  'Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati', 'Nellore',
  'Kurnool', 'Rajahmundry', 'Kakinada', 'Eluru', 'Ongole',
  'Srikakulam', 'Vizianagaram', 'Chittoor', 'Anantapur', 'Kadapa'
]

const tgCities = [
  'Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam',
  'Mahbubnagar', 'Nalgonda', 'Adilabad', 'Medak', 'Rangareddy',
  'Sangareddy', 'Siddipet', 'Suryapet', 'Jagtial', 'Mancherial'
]

export default function Coverage() {
  const { siteData } = useSiteContext()
  const cleanPhone = siteData.phoneNumber.replace(/[^0-9]/g, '')

  return (
    <section id="coverage" className="py-24 relative overflow-hidden bg-[#eef6fc] text-[#001e3c]">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-bold tracking-widest uppercase text-[#00b4d8]">
            SERVICE COVERAGE
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#001e3c] tracking-tight font-serif">
            We Serve Across Two States
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Our technicians are present across Andhra Pradesh and Telangana — never far from you.
          </p>
        </div>

        {/* 2 State Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Card 1: Andhra Pradesh */}
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-lg flex flex-col justify-between">
            {/* Header Banner */}
            <div className="bg-[#002b49] text-white p-6 sm:p-7 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-cyan-300 text-lg flex-shrink-0">
                📍
              </div>
              <div>
                <h3 className="font-extrabold text-xl text-white font-serif">Andhra Pradesh</h3>
                <div className="text-cyan-300 text-xs font-medium">15 cities covered</div>
              </div>
            </div>

            {/* City Pills */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap gap-2.5">
                {apCities.map((city) => (
                  <span
                    key={city}
                    className="px-4 py-2 rounded-full bg-[#eef6fc] border border-cyan-100 text-xs font-bold text-[#0056a8] hover:bg-[#0056a8] hover:text-white transition-all cursor-default"
                  >
                    {city}
                  </span>
                ))}
              </div>

              <p className="text-xs italic text-slate-400">
                + surrounding villages and towns. Call us to confirm availability in your area.
              </p>
            </div>
          </div>

          {/* Card 2: Telangana */}
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-lg flex flex-col justify-between">
            {/* Header Banner */}
            <div className="bg-[#008cae] text-white p-6 sm:p-7 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white text-lg flex-shrink-0">
                📍
              </div>
              <div>
                <h3 className="font-extrabold text-xl text-white font-serif">Telangana</h3>
                <div className="text-cyan-100 text-xs font-medium">15 cities covered</div>
              </div>
            </div>

            {/* City Pills */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap gap-2.5">
                {tgCities.map((city) => (
                  <span
                    key={city}
                    className="px-4 py-2 rounded-full bg-[#eef6fc] border border-cyan-100 text-xs font-bold text-[#008cae] hover:bg-[#008cae] hover:text-white transition-all cursor-default"
                  >
                    {city}
                  </span>
                ))}
              </div>

              <p className="text-xs italic text-slate-400">
                + surrounding villages and towns. Call us to confirm availability in your area.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Banner CTA */}
        <div className="rounded-3xl p-8 sm:p-10 bg-[#002b49] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-cyan-900/60 border border-cyan-400/30 flex items-center justify-center text-cyan-300 text-2xl flex-shrink-0">
              🌐
            </div>
            <div className="space-y-1 text-center md:text-left">
              <h3 className="text-white font-extrabold text-xl sm:text-2xl font-serif">Not sure if we cover your area?</h3>
              <p className="text-slate-300 text-xs sm:text-sm">
                Give us a call or send a WhatsApp message — we will confirm availability and dispatch a technician as quickly as possible.
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/${cleanPhone}?text=Hi%2C%20is%20water%20purifier%20service%20available%20in%20my%20area%3F`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-full font-bold text-xs sm:text-sm bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-lg flex-shrink-0 transition-all duration-200 hover:scale-105 whitespace-nowrap"
          >
            WhatsApp Us
          </a>
        </div>

      </div>
    </section>
  )
}

