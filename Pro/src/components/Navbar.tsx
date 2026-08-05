import React from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { settings, activeTab, setActiveTab, setIsSiteVisitModalOpen } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Company Name */}
          <div 
            className="flex items-center gap-3 cursor-pointer group shrink-0"
            onClick={() => setActiveTab('USER_HOME')}
          >
            {settings.logoUrl ? (
              <img 
                src={settings.logoUrl} 
                alt="Venkata Sai Developers Logo" 
                className="w-12 h-12 object-contain rounded-xl bg-white border border-slate-100 p-0.5 group-hover:scale-105 transition-transform"
              />
            ) : (
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-extrabold text-xl shadow-xs">
                VS
              </div>
            )}

            <div>
              <span className="text-xl font-extrabold text-slate-900 tracking-tight block leading-tight group-hover:text-blue-600 transition-colors">
                {settings.ventureName}
              </span>
              <span className="text-xs text-slate-500 font-medium block mt-0.5">
                {settings.tagline.split('—')[0] || 'Fulfill Your Dreams'}
              </span>
            </div>
          </div>

          {/* Desktop Navigation - Clean Unified Translucent Pill Container (Reference Image 1) */}
          <nav className="hidden lg:flex items-center gap-6 bg-slate-200/70 backdrop-blur-md px-7 py-2.5 rounded-full border border-slate-300/50 shadow-inner">
            <button
              onClick={() => setActiveTab('USER_HOME')}
              className={`text-sm font-bold transition-all px-3 py-1 rounded-full ${
                activeTab === 'USER_HOME'
                  ? 'text-blue-700 bg-white shadow-xs'
                  : 'text-slate-800 hover:text-blue-700'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => setActiveTab('KONDAVEEDU_VENTURE')}
              className={`text-sm font-bold transition-all px-3 py-1 rounded-full ${
                activeTab === 'KONDAVEEDU_VENTURE'
                  ? 'text-blue-700 bg-white shadow-xs'
                  : 'text-slate-800 hover:text-blue-700'
              }`}
            >
              Kondaveedu Venture
            </button>

            <button
              onClick={() => setActiveTab('FOUNDER_PAGE')}
              className={`text-sm font-bold transition-all px-3 py-1 rounded-full ${
                activeTab === 'FOUNDER_PAGE'
                  ? 'text-blue-700 bg-white shadow-xs'
                  : 'text-slate-800 hover:text-blue-700'
              }`}
            >
              Founder & Vision
            </button>

            <button
              onClick={() => setActiveTab('LAND_CALCULATOR')}
              className={`text-sm font-bold transition-all px-3 py-1 rounded-full ${
                activeTab === 'LAND_CALCULATOR'
                  ? 'text-blue-700 bg-white shadow-xs'
                  : 'text-slate-800 hover:text-blue-700'
              }`}
            >
              Future Land ROI
            </button>

            <button
              onClick={() => setActiveTab('UPCOMING_PROJECTS')}
              className={`text-sm font-bold transition-all px-3 py-1 rounded-full ${
                activeTab === 'UPCOMING_PROJECTS'
                  ? 'text-blue-700 bg-white shadow-xs'
                  : 'text-slate-800 hover:text-blue-700'
              }`}
            >
              Upcoming
            </button>
          </nav>

          {/* Right CTA Button - Schedule Free Visit */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsSiteVisitModalOpen(true)}
              className="h-10 px-5 text-xs font-extrabold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-colors flex items-center justify-center shadow-xs"
            >
              <Calendar className="w-4 h-4 text-blue-600 mr-2" />
              <span>Schedule Free Visit</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-slate-700 hover:bg-slate-100 rounded-xl"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-2 shadow-lg">
          <button
            onClick={() => { setActiveTab('USER_HOME'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-3 text-xs font-extrabold rounded-xl ${
              activeTab === 'USER_HOME' ? 'bg-blue-600 text-white' : 'text-slate-800 hover:bg-slate-50'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => { setActiveTab('KONDAVEEDU_VENTURE'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-3 text-xs font-extrabold rounded-xl ${
              activeTab === 'KONDAVEEDU_VENTURE' ? 'bg-blue-600 text-white' : 'text-slate-800 hover:bg-slate-50'
            }`}
          >
            Kondaveedu Venture
          </button>

          <button
            onClick={() => { setActiveTab('FOUNDER_PAGE'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-3 text-xs font-extrabold rounded-xl ${
              activeTab === 'FOUNDER_PAGE' ? 'bg-blue-600 text-white' : 'text-slate-800 hover:bg-slate-50'
            }`}
          >
            Founder & Vision (Ratnala Venkata Punnarao)
          </button>

          <button
            onClick={() => { setActiveTab('LAND_CALCULATOR'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-3 text-xs font-extrabold rounded-xl ${
              activeTab === 'LAND_CALCULATOR' ? 'bg-blue-600 text-white' : 'text-slate-800 hover:bg-slate-50'
            }`}
          >
            Future Land ROI
          </button>

          <button
            onClick={() => { setActiveTab('UPCOMING_PROJECTS'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-3 text-xs font-extrabold rounded-xl ${
              activeTab === 'UPCOMING_PROJECTS' ? 'bg-blue-600 text-white' : 'text-slate-800 hover:bg-slate-50'
            }`}
          >
            Upcoming Projects
          </button>

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => { setIsSiteVisitModalOpen(true); setMobileMenuOpen(false); }}
              className="w-full py-3 text-center text-xs font-extrabold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200"
            >
              Schedule Free Visit
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
