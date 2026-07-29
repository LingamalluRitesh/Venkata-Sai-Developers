import logoDefault from '../../logo.png'
import { useSiteContext } from '../context/SiteContext'

export default function Footer() {
  const { siteData, setIsAdminOpen } = useSiteContext()

  const logoSrc = siteData.logoUrl || logoDefault

  return (
    <footer className="bg-[#001428] text-white pt-16 pb-12 border-t border-cyan-900/50">
      <div className="w-full max-w-[95%] xl:max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-16 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden p-0.5 bg-gradient-to-tr from-cyan-400 to-blue-600">
                <div className="w-full h-full bg-white rounded-[9px] flex items-center justify-center p-1">
                  <img src={logoSrc} alt={siteData.companyName} className="w-full h-full object-contain" />
                </div>
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white">{siteData.companyName}</span>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Delivering clean, safe, and mineral-balanced drinking water across Andhra Pradesh with trusted service 24 hours a day, 7 days a week.
            </p>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>24/7 Helpline Active</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-cyan-400">Quick Links</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li><a href="#home" className="hover:text-cyan-300 transition">Home</a></li>
              <li><a href="#founder" className="hover:text-cyan-300 transition">Founder's Message</a></li>
              <li><a href="#services" className="hover:text-cyan-300 transition">Services & Previous Work</a></li>
              <li><a href="#why-us" className="hover:text-cyan-300 transition">Why Choose Us</a></li>
              <li><a href="#coverage" className="hover:text-cyan-300 transition">AP Service Coverage</a></li>
              <li><a href="#contact" className="hover:text-cyan-300 transition">24/7 Helpline Contact</a></li>
            </ul>
          </div>

          {/* Col 3: Operating Hours */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-cyan-400">Working Hours</h4>
            <div className="p-4 rounded-2xl bg-cyan-950/60 border border-cyan-800/50 text-xs sm:text-sm space-y-2 text-slate-200">
              <div className="font-extrabold text-emerald-400 flex items-center gap-1.5">
                <span>⚡ 24/7 OPEN — ALL DAYS</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Monday – Sunday: 24 Hours / 7 Days
                <br />
                (365 Days Emergency Technician Availability)
              </p>
            </div>
          </div>

          {/* Col 4: Contact Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-cyan-400">24/7 Support</h4>
            <div className="text-xs sm:text-sm text-slate-300 space-y-2">
              <p><strong className="text-white">Phone:</strong> <a href={`tel:${siteData.phoneNumber}`} className="hover:text-cyan-300">{siteData.phoneNumber}</a></p>
              <p><strong className="text-white">Email:</strong> <a href={`mailto:${siteData.email}`} className="hover:text-cyan-300">{siteData.email}</a></p>
              <p><strong className="text-white">HQ Address:</strong> {siteData.address}</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar & Admin Trigger */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-slate-400 gap-4">
          <div>
            © {new Date().getFullYear()} {siteData.companyName}. All Rights Reserved. Servicing Andhra Pradesh 24/7.
          </div>

          {/* Admin Portal Link */}
          <button
            onClick={() => setIsAdminOpen(true)}
            className="text-cyan-400 hover:text-cyan-300 font-bold transition flex items-center gap-1 opacity-80 hover:opacity-100"
          >
            <span>⚙️ Admin Portal</span>
          </button>
        </div>

      </div>
    </footer>
  )
}
