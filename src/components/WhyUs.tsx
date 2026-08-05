const whyUsFeatures = [
  {
    number: '01',
    title: 'Certified Technicians',
    desc: 'Our team of factory-trained and certified engineers ensures every installation and service meets the highest technical standards.',
  },
  {
    number: '02',
    title: 'Genuine Spare Parts',
    desc: 'We use only OEM-approved and ISO-certified components — no compromises on quality when it comes to your drinking water.',
  },
  {
    number: '03',
    title: 'Fast Response Time',
    desc: 'Service calls attended within 24 hours across all our coverage areas. We know you can\'t wait when water quality is at stake.',
  },
  {
    number: '04',
    title: 'Transparent Pricing',
    desc: 'No hidden charges, no surprise bills. We provide clear quotes upfront so you know exactly what you are paying for.',
  },
]

export default function WhyUs() {
  return (
    <section id="why-us" className="py-24 relative overflow-hidden bg-[#002b49] text-white">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column Text & Customer Rating Card */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="space-y-4">
              <div className="text-xs font-bold tracking-widest uppercase text-[#00b4d8]">
                WHY CHOOSE US
              </div>

              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight font-serif">
                <span>Trusted by Homes & </span>
                <span className="text-[#00b4d8] block">Businesses Alike</span>
              </h2>

              <p className="text-slate-300 text-base leading-relaxed">
                With years of experience serving both residential and commercial clients across Andhra Pradesh and Telangana, Sree Water Solutions is the name families and enterprises rely on.
              </p>
            </div>

            {/* Translucent Rating Card */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-md flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-cyan-400 flex-shrink-0 bg-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&auto=format&fit=crop&q=80"
                  alt="Happy Customers"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-0.5">
                <div className="font-extrabold text-white text-base">500+ Happy Customers</div>
                <div className="text-xs text-slate-300">Across AP & Telangana since our founding</div>
                <div className="text-amber-400 text-xs font-bold flex items-center gap-1.5 pt-0.5">
                  <span>★★★★★</span>
                  <span className="text-white font-semibold">4.9/5 rating</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: 4 Vertical Numbered Cards */}
          <div className="lg:col-span-7 space-y-4">
            {whyUsFeatures.map((f) => (
              <div
                key={f.number}
                className="p-6 sm:p-7 rounded-2xl bg-[#001e38]/80 border border-cyan-900/60 hover:border-cyan-400/50 transition-all duration-300 flex items-start gap-6 group hover:translate-x-1"
              >
                {/* Large Cyan Number */}
                <div className="text-3xl sm:text-4xl font-extrabold text-[#00b4d8] font-serif flex-shrink-0 leading-none pt-1">
                  {f.number}
                </div>

                {/* Content */}
                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}

