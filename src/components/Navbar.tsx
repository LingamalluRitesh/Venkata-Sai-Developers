import { useState } from 'react'
import logoDefault from '../../logo.png'
import { useSiteContext } from '../context/SiteContext'

interface NavbarProps {
  scrolled: boolean
}

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Founder', href: '#founder' },
  { label: 'Services', href: '#services' },
  { label: 'Why Choose Us', href: '#why-us' },
  { label: 'Coverage', href: '#coverage' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ scrolled }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { siteData } = useSiteContext()

  const logoSrc = siteData.logoUrl || logoDefault

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 w-full">
      <div
        className={`w-full transition-all duration-300 px-6 sm:px-10 lg:px-16 ${
          scrolled
            ? 'bg-[#001e3c]/95 backdrop-blur-xl border-b border-cyan-500/30 shadow-xl py-3'
            : 'bg-[#001e3c]/90 backdrop-blur-md border-b border-cyan-500/20 py-4'
        }`}
      >
        <div className="w-full flex items-center justify-between gap-6">
          
          {/* Logo & Full Company Name */}
          <a href="#home" className="flex items-center gap-3.5 group flex-shrink-0">
            <div className="relative flex-shrink-0 w-12 h-12 rounded-xl overflow-hidden p-0.5 bg-gradient-to-tr from-cyan-400 via-blue-600 to-cyan-300 shadow-md group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center overflow-hidden p-1">
                <img
                  src={logoSrc}
                  alt={siteData.companyName}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* FULL COMPANY NAME */}
            <div className="whitespace-nowrap">
              <div className="text-white font-extrabold text-lg sm:text-xl lg:text-2xl tracking-tight group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                <span>{siteData.companyName}</span>
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse flex-shrink-0" />
              </div>
              <div className="text-cyan-400 font-bold text-[10px] sm:text-xs tracking-[0.18em] uppercase flex items-center gap-1.5">
                <span>{siteData.companySubtitle}</span>
                <span className="text-white/40">•</span>
                <span className="text-emerald-400 font-extrabold">24/7 OPEN</span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-6 py-2 backdrop-blur-md">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full text-slate-100 hover:text-white hover:bg-cyan-500/25 transition-all duration-200 whitespace-nowrap"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
            {/* 24/7 Availability Pill */}
            <div className="hidden xl:flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-extrabold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span>24/7 Service Available</span>
            </div>

            {/* CALL NOW BUTTON */}
            <a
              href={`tel:${siteData.phoneNumber}`}
              className="flex items-center gap-2 text-xs sm:text-sm font-bold text-cyan-300 hover:text-white bg-cyan-950/80 border border-cyan-400/40 px-5 py-2.5 rounded-full transition-all duration-200 hover:border-cyan-300 shadow-sm"
            >
              <svg className="w-4 h-4 fill-cyan-400" viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.18 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.54A16 16 0 0 0 14 14.54l.91-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>Call Now</span>
            </a>

            <a
              href="#contact"
              className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-md hover:scale-105 transition-all duration-200 whitespace-nowrap"
            >
              Get Free Quote
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              className="text-white p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 flex flex-col gap-1.5">
                <span className={`h-0.5 bg-cyan-400 rounded-full transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`h-0.5 bg-white rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`h-0.5 bg-cyan-400 rounded-full transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>

        </div>

        {/* Mobile menu dropdown */}
        {menuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-white/15 flex flex-col gap-2 pb-2">
            <div className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>⚡ 24/7 Open — All 7 Days Working</span>
            </div>

            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-slate-100 hover:text-cyan-300 text-sm font-semibold py-2.5 px-4 rounded-xl hover:bg-white/10 transition"
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2.5">
              <a
                href={`tel:${siteData.phoneNumber}`}
                className="w-full text-center py-3 rounded-xl text-xs font-bold text-cyan-300 bg-cyan-950 border border-cyan-400/30"
              >
                📞 Call Now (24/7 Helpline)
              </a>
              <a
                href="#contact"
                className="w-full text-center py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg"
                onClick={() => setMenuOpen(false)}
              >
                Get Free Quote
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
