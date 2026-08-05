import { useState } from 'react'
import { useRealEstate } from '../context/RealEstateContext'

interface NavbarProps {
  scrolled: boolean
}

export default function Navbar({ scrolled }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { favorites, setIsAdminOpen, filters, setFilters } = useRealEstate()

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 w-full">
      <div
        className={`w-full transition-all duration-300 px-4 sm:px-8 lg:px-12 py-3.5 ${
          scrolled
            ? 'bg-[#0f172a]/95 backdrop-blur-xl border-b border-slate-800 shadow-2xl py-3'
            : 'bg-gradient-to-b from-[#0f172a]/90 via-[#0f172a]/60 to-transparent backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center font-extrabold text-xl shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
              🏰
            </div>
            <div>
              <div className="font-extrabold text-xl text-white tracking-tight flex items-center gap-1.5 font-serif">
                <span>HAVEN</span>
                <span className="text-amber-400 font-sans text-xs tracking-widest uppercase px-1.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/20 font-bold">LUXE</span>
              </div>
              <div className="text-[10px] text-slate-400 font-medium tracking-wider uppercase -mt-0.5">
                REAL ESTATE & ESTATES
              </div>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 border border-slate-800/80 rounded-full px-4 py-1.5 backdrop-blur-md shadow-inner">
            {[
              { label: 'Properties', href: '#properties' },
              { label: 'Neighborhoods', href: '#neighborhoods' },
              { label: 'Mortgage Estimator', href: '#mortgage' },
              { label: 'Why Us', href: '#why-us' },
              { label: 'Contact', href: '#contact' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-semibold px-3.5 py-1.5 rounded-full text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Favorites Badge Button */}
            <a
              href="#properties"
              onClick={() => setFilters(prev => ({ ...prev, category: 'all' }))}
              className="relative p-2.5 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-amber-400 hover:border-amber-500/40 transition-all flex items-center justify-center group"
              title="Saved Favorites"
            >
              <svg className="w-4 h-4 fill-current text-rose-500" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-extrabold text-[10px] flex items-center justify-center animate-pulse">
                  {favorites.length}
                </span>
              )}
            </a>

            {/* Admin Add Property Button */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="px-4 py-2 rounded-full text-xs font-bold text-slate-300 hover:text-white bg-slate-900 border border-slate-700/80 hover:border-slate-500 transition-all flex items-center gap-1.5"
            >
              <span>+ Add Property</span>
            </button>

            {/* List Property / Schedule Call CTA */}
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-full text-xs font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/20 hover:scale-105 transition-all duration-200 whitespace-nowrap"
            >
              Schedule Tour
            </a>

          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="p-2 text-xs font-bold text-amber-400 bg-amber-400/10 rounded-lg border border-amber-400/20"
            >
              + Add
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white"
              aria-label="Toggle Navigation"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 bg-slate-900/95 border border-slate-800 rounded-2xl flex flex-col gap-2.5 shadow-2xl backdrop-blur-xl">
            {[
              { label: 'Properties', href: '#properties' },
              { label: 'Neighborhoods', href: '#neighborhoods' },
              { label: 'Mortgage Estimator', href: '#mortgage' },
              { label: 'Why Choose Us', href: '#why-us' },
              { label: 'Contact Us', href: '#contact' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-200 hover:text-white font-medium text-sm py-2 px-3 rounded-lg hover:bg-slate-800/80 transition"
              >
                {link.label}
              </a>
            ))}

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-xl text-xs font-extrabold text-slate-950 bg-amber-400 shadow-md mt-1"
            >
              Schedule Property Tour
            </a>
          </div>
        )}

      </div>
    </header>
  )
}
