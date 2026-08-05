import { useRealEstate } from '../context/RealEstateContext'

export default function Footer() {
  const { setIsAdminOpen } = useRealEstate()

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center font-extrabold text-xl shadow-lg">
                🏰
              </div>
              <div>
                <div className="font-extrabold text-xl text-white tracking-tight flex items-center gap-1.5 font-serif">
                  <span>HAVEN</span>
                  <span className="text-amber-400 text-xs font-sans tracking-widest uppercase">LUXE</span>
                </div>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              India's premier luxury real estate advisory specializing in bespoke villas, penthouses, and private estates.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-serif">Quick Navigation</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#properties" className="hover:text-amber-400 transition">Featured Properties</a></li>
              <li><a href="#neighborhoods" className="hover:text-amber-400 transition">Prime Locations</a></li>
              <li><a href="#mortgage" className="hover:text-amber-400 transition">Mortgage Estimator</a></li>
              <li><a href="#why-us" className="hover:text-amber-400 transition">Why Choose Us</a></li>
              <li><a href="#contact" className="hover:text-amber-400 transition">Contact Advisory Desk</a></li>
            </ul>
          </div>

          {/* Col 3: Property Types */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-serif">Property Portfolio</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#properties" className="hover:text-amber-400 transition">Luxury Villas & Estates</a></li>
              <li><a href="#properties" className="hover:text-amber-400 transition">Duplex Penthouses</a></li>
              <li><a href="#properties" className="hover:text-amber-400 transition">Waterfront Residences</a></li>
              <li><a href="#properties" className="hover:text-amber-400 transition">Corporate Commercial Suites</a></li>
              <li><a href="#properties" className="hover:text-amber-400 transition">Off-Market Private Sales</a></li>
            </ul>
          </div>

          {/* Col 4: Contact & Admin */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-serif">Private Desk</h4>
            <div className="text-xs text-slate-400 space-y-2">
              <p><strong className="text-white">Hotline:</strong> +91 98765 43210</p>
              <p><strong className="text-white">Email:</strong> vip@havenrealty.com</p>
              <p><strong className="text-white">HQ:</strong> Jubilee Hills, Hyderabad</p>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} Haven Luxe Real Estate. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400 text-xs">Verified Luxury Listings</span>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-amber-400 hover:text-amber-300 font-bold transition text-[11px]"
            >
              ⚙️ Agent Admin Portal
            </button>
          </div>
        </div>

      </div>
    </footer>
  )
}
