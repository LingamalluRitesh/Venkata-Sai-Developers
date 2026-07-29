const features = [
  {
    title: 'Multi-Stage RO + UV + UF Tech',
    desc: 'Eliminates 99.9% of dissolved impurities, heavy metals, bacteria, and viruses while retaining essential natural minerals.',
    icon: '💧',
  },
  {
    title: 'Certified OEM Grade Components',
    desc: 'High-rejection membranes and heavy-duty booster pumps tested for long lifespan and zero leakage performance.',
    icon: '🛡️',
  },
  {
    title: '24/7 Technician Service Support',
    desc: 'Our certified engineers provide round-the-clock emergency support, routine filter changes, and same-day visits across AP.',
    icon: '⚡',
  },
  {
    title: 'Free On-Site Water TDS Testing',
    desc: 'We test your raw water TDS and hardness before recommendation to ensure you get the exact purification setup needed.',
    icon: '🧪',
  },
  {
    title: 'Hassle-Free AMC Contracts',
    desc: 'Comprehensive Annual Maintenance Contracts with priority service calls and scheduled filter replacements.',
    icon: '📋',
  },
  {
    title: 'Transparent Pricing & Warranty',
    desc: 'No hidden fees or unexpected costs. Honest pricing with full warranty coverage on purifiers and industrial RO plants.',
    icon: '🏷️',
  },
]

export default function WhyUs() {
  return (
    <section id="why-us" className="py-24 relative overflow-hidden bg-white text-[#001e3c]">
      <div className="w-full max-w-[95%] xl:max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-100 border border-cyan-300 text-[#0056a8] text-xs font-bold tracking-widest uppercase">
            <span>The Sree Water Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#001e3c] tracking-tight font-serif">
            Why Choose Sree Water Solutions?
          </h2>
          <p className="text-base sm:text-lg text-[#4a6d8c]">
            We combine high-grade purification technology, honest pricing, and 24/7 technician support across Andhra Pradesh.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="group p-8 rounded-3xl bg-[#f0f8ff] border border-[#c3ddf0] hover:border-[#0056a8] transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-xl space-y-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-white border border-[#c3ddf0] text-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                {f.icon}
              </div>

              <h3 className="text-xl font-extrabold text-[#001e3c] group-hover:text-[#0056a8] transition-colors">
                {f.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#4a6d8c] leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
