import React from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Phone, Mail, Sparkles, Building2, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, setActiveTab, setIsSiteVisitModalOpen } = useApp();

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              {settings.logoUrl ? (
                <img src={settings.logoUrl} alt="Logo" className="w-10 h-10 object-contain rounded-xl bg-white p-1" />
              ) : (
                <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center font-bold text-lg text-white">
                  SV
                </div>
              )}
              <span className="text-lg font-extrabold tracking-tight">{settings.ventureName}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {settings.tagline}
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold">
              <MapPin className="w-3 h-3 text-emerald-400" />
              200m From Kondaveedu Ghat Road
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li>
                <button onClick={() => setActiveTab('USER_HOME')} className="hover:text-emerald-400 transition-colors">
                  Home Landing Page
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('KONDAVEEDU_VENTURE')} className="hover:text-emerald-400 transition-colors">
                  Kondaveedu Villa Plots (200m Ghat Road)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('LAND_CALCULATOR')} className="hover:text-emerald-400 transition-colors">
                  Estimated Land ROI Calculator
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('UPCOMING_PROJECTS')} className="hover:text-emerald-400 transition-colors">
                  Upcoming Projects (Houses & Apartments)
                </button>
              </li>
            </ul>
          </div>

          {/* Project Types */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Ventures Scope</h4>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Kondaveedu Villa Plots (Active Now)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Modern Eco Houses (Starting Soon)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Hillview Apartments (Starting Soon)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Ghat Road Commercial Hub (Starting Soon)</span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Office & Contact</h4>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{settings.officeAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="tel:+919030903364" className="hover:text-white font-bold">Call: +91 90309 03364</a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">💬</span>
                <a href="https://wa.me/918978815621" target="_blank" rel="noreferrer" className="hover:text-emerald-400 font-bold text-emerald-400">WhatsApp: +91 89788 15621</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`mailto:${settings.contactEmail}`} className="hover:text-white">{settings.contactEmail}</a>
              </div>
            </div>

            <button
              onClick={() => setIsSiteVisitModalOpen(true)}
              className="mt-2 w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" /> Schedule Free Visit
            </button>
          </div>

        </div>

        {/* Bottom copyright & admin quick switch */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} {settings.ventureName}. All rights reserved.</p>
          <button
            onClick={() => setActiveTab('ADMIN_PORTAL')}
            className="flex items-center gap-1 text-slate-400 hover:text-emerald-400 font-semibold"
          >
            <ShieldCheck className="w-4 h-4" /> Admin Management Access
          </button>
        </div>
      </div>
    </footer>
  );
};
