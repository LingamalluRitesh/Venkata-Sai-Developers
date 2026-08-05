const advantages = [
  {
    icon: '💎',
    title: 'Off-Market Exclusive Listings',
    desc: 'Access ultra-luxury estates and private penthouses before they reach public real estate portals.'
  },
  {
    icon: '📜',
    title: '100% Legal & Title Verified',
    desc: 'Our legal team verifies all encumbrance certificates, land titles, and municipal permits prior to listing.'
  },
  {
    icon: '🤝',
    title: 'Private Advisory & Discretion',
    desc: 'Bespoke confidential negotiations for high-net-worth buyers, investors, and celebrity clients.'
  },
  {
    icon: '📊',
    title: 'Data-Driven Valuation',
    desc: 'Real-time market insights and ROI projections for capital growth and rental yield maximization.'
  }
]

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-24 bg-slate-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10 space-y-16">
        
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
              THE HAVEN LUXE DIFFERENCE
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight font-serif">
              Unrivaled Excellence in Real Estate
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We redefine luxury property acquisition. From architectural appraisal to legal due diligence, our boutique team ensures an effortless journey.
            </p>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="text-3xl text-amber-400 font-serif">“</div>
              <p className="text-xs sm:text-sm text-slate-200 italic font-medium">
                Haven Luxe helped our family secure an off-market cliffside villa with complete legal assurance within 10 days.
              </p>
              <div className="text-xs text-amber-400 font-extrabold">— Dr. K. S. Rao, Founder, Apex Health Group</div>
            </div>
          </div>

          {/* Right Cards */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            {advantages.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-400/40 transition-all duration-300 space-y-3 group"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 text-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}
