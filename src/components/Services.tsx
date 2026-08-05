import { useSiteContext } from '../context/SiteContext'

const serviceIcons: Record<string, React.ReactNode> = {
  'house-purifier': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  'commercial-ro': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2" strokeWidth="2"/>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8M12 17v4"/>
    </svg>
  ),
  'repair-service': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
  'amc-contract': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
    </svg>
  ),
  'regular-maintenance': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.828a5 5 0 010-7.07 5 5 0 017.072 0m-4.242 1.414a1 1 0 11-1.414 1.414 1 1 0 011.414-1.414z"/>
    </svg>
  ),
  'spare-parts': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
    </svg>
  ),
}

export default function Services() {
  const { siteData } = useSiteContext()

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-[#eef6fc] text-[#001e3c]">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-bold uppercase tracking-widest text-[#00b4d8]">
            WHAT WE OFFER
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#001e3c] tracking-tight font-serif">
            Complete Water Solutions
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            From a single home purifier to large commercial plants — we handle installation, maintenance, and everything in between.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteData.services.map((s) => (
            <div
              key={s.id}
              className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md border border-slate-200/80 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-5">
                {/* Icon Badge */}
                <div className="w-12 h-12 rounded-2xl bg-[#eef6fc] text-[#00b4d8] flex items-center justify-center flex-shrink-0">
                  {serviceIcons[s.id] || serviceIcons['house-purifier']}
                </div>

                {/* Title & Desc */}
                <div className="space-y-2">
                  <h3 className="text-xl font-extrabold text-[#001e3c] font-serif">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                {/* Checklist */}
                <ul className="space-y-2.5 pt-2">
                  {s.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                      <svg className="w-4 h-4 text-[#00b4d8] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                      </svg>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
