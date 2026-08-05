const neighborhoods = [
  {
    name: 'Jubilee & Banjara Hills',
    city: 'Hyderabad',
    propertiesCount: '42 Luxury Mansions',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format&fit=crop&q=80',
    tag: 'Ultra-Luxury Enclave'
  },
  {
    name: 'Beach Road & Rushikonda',
    city: 'Visakhapatnam',
    propertiesCount: '28 Coastal Villas',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80',
    tag: 'Waterfront Living'
  },
  {
    name: 'HITEC City & Gachibowli',
    city: 'Hyderabad',
    propertiesCount: '65 Executive Towers',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
    tag: 'Tech Hub & Penthouses'
  },
  {
    name: 'Vijayawada Riverfront',
    city: 'Vijayawada',
    propertiesCount: '19 River Residences',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
    tag: 'Scenic & Gated'
  }
]

export default function Neighborhoods() {
  return (
    <section id="neighborhoods" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
            PRIME LOCATIONS & HOTSPOTS
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-serif">
            Explore Prime Neighborhoods
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Discover premier gated communities, waterfront belts, and commercial hubs.
          </p>
        </div>

        {/* Neighborhood Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {neighborhoods.map((n, i) => (
            <div
              key={i}
              className="group relative h-80 rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl cursor-pointer hover:-translate-y-1.5 transition-all duration-300"
            >
              <img
                src={n.image}
                alt={n.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30 backdrop-blur-md">
                  {n.tag}
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 space-y-1 text-white">
                <h3 className="text-xl font-bold font-serif group-hover:text-amber-400 transition-colors">
                  {n.name}
                </h3>
                <div className="text-xs text-slate-300">{n.city}</div>
                <div className="text-[11px] text-amber-400 font-extrabold pt-1">
                  {n.propertiesCount} Available →
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
