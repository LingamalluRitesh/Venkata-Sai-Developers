import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  MapPin, 
  Landmark, 
  Car, 
  School, 
  Check, 
  Maximize2,
  Download,
  Building,
  Sparkles,
  Calendar,
  CheckCircle2,
  PhoneCall,
  MessageSquare
} from 'lucide-react';

export const KondaveeduVenture: React.FC = () => {
  const { 
    activeProject, 
    allProjects, 
    setActiveProject, 
    setIsInquiryModalOpen,
    setIsSiteVisitModalOpen,
    settings
  } = useApp();

  // Photo Gallery is FIRST tab, Connectivity is SECOND tab
  const [activeTabSub, setActiveTabSub] = useState<'GALLERY' | 'ADVANTAGES'>('GALLERY');
  const [activeGalleryImage, setActiveGalleryImage] = useState<string | null>(null);

  const callPhoneNum = '+91 90309 03364';
  const whatsappPhoneNum = '918978815621';
  const whatsappUrl = `https://wa.me/${whatsappPhoneNum}?text=Hi%20Venkata%20Sai%20Developers%2C%20I%20am%20interested%20in%20${encodeURIComponent(activeProject.title)}`;

  return (
    <div className="bg-white min-h-screen pb-24">
      
      {/* Top Banner Hero */}
      <div className="relative w-full min-h-[480px] sm:min-h-[540px] flex items-center justify-center overflow-hidden bg-slate-950 py-16">
        
        {/* Background Image */}
        <img
          src={activeProject.heroImage || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80"}
          alt={activeProject.title}
          className="absolute inset-0 w-full h-full object-cover object-center scale-105 filter brightness-90 saturate-120"
        />
        
        {/* Rich Glassmorphism Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/60 to-slate-950/90 backdrop-blur-[2px]" />

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          
          {/* Multi-Venture Selector (if more than 1 venture exists) */}
          {allProjects.length > 1 && (
            <div className="mb-4 flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
              <Building className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-xs text-slate-300 font-bold">Select Venture:</span>
              <select
                value={activeProject.id}
                onChange={(e) => {
                  const found = allProjects.find((p) => p.id === e.target.value);
                  if (found) setActiveProject(found);
                }}
                className="bg-transparent text-xs font-black text-white outline-none cursor-pointer"
              >
                {allProjects.map((p) => (
                  <option key={p.id} value={p.id} className="bg-slate-900 text-white">
                    {p.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/90 backdrop-blur-md text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider mb-4 shadow-lg border border-blue-400/40">
            <MapPin className="w-4 h-4 text-white" />
            200 Meters Away From Kondaveedu Ghat Road
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-lg">
            {activeProject.title}
          </h1>

          <p className="mt-3 text-base sm:text-lg text-slate-200 font-semibold max-w-3xl drop-shadow-md">
            {activeProject.tagline}
          </p>

          {/* Standardized Equal-Size Action CTAs Grid */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 w-full max-w-4xl mx-auto">
            
            <button
              onClick={() => setIsInquiryModalOpen(true)}
              className="h-13 px-5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 shrink-0" />
              <span className="truncate">Enquire & Reserve</span>
            </button>

            <button
              onClick={() => setIsSiteVisitModalOpen(true)}
              className="h-13 px-5 bg-white hover:bg-slate-50 text-slate-900 font-bold text-xs sm:text-sm rounded-xl shadow-lg border border-slate-200 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="truncate">Schedule Visit</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="h-13 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
            >
              <img src="/whatsapp_icon.png" alt="WhatsApp" className="w-5 h-5 object-contain shrink-0" />
              <span className="truncate">WhatsApp Chat</span>
            </a>

            <a
              href="tel:+919030903364"
              className="h-13 px-5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg border border-slate-700 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
            >
              <img src="/phone_icon.png" alt="Call Office" className="w-5 h-5 object-contain rounded shrink-0" />
              <span className="truncate">Call Office</span>
            </a>

          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 w-full max-w-3xl">
            <div className="bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-left shadow-lg">
              <span className="text-[11px] text-slate-300 font-bold block uppercase">Location</span>
              <span className="text-sm font-extrabold text-white mt-1 block">{activeProject.location}</span>
            </div>
            <div className="bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-left shadow-lg">
              <span className="text-[11px] text-slate-300 font-bold block uppercase">Distance</span>
              <span className="text-sm font-extrabold text-blue-400 mt-1 block">Just 200 Meters</span>
            </div>
            <div className="bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-left shadow-lg">
              <span className="text-[11px] text-slate-300 font-bold block uppercase">Price Range</span>
              <span className="text-sm font-extrabold text-white mt-1 block">{activeProject.priceRangeSqYd}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Sub Tabs Navigation: Photo Gallery FIRST, Connectivity SECOND */}
      <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto py-3 no-scrollbar">
            <button
              onClick={() => setActiveTabSub('GALLERY')}
              className={`px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap transition-all ${
                activeTabSub === 'GALLERY'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              1. Project Images & Photo Gallery ({activeProject.galleryImages.length})
            </button>
            <button
              onClick={() => setActiveTabSub('ADVANTAGES')}
              className={`px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap transition-all ${
                activeTabSub === 'ADVANTAGES'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              2. Connectivity & Historical Advantages
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">

        {/* TAB 1: PROJECT PHOTO GALLERY (FIRST TAB) */}
        {activeTabSub === 'GALLERY' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">
                {activeProject.title} Photo Gallery
              </h3>
              <span className="text-xs text-slate-500 font-medium">Click any image to expand view</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeProject.galleryImages.map((imgUrl, index) => (
                <div
                  key={index}
                  onClick={() => setActiveGalleryImage(imgUrl)}
                  className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all border border-slate-200"
                >
                  <img
                    src={imgUrl}
                    alt={`${activeProject.title} photo ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 bg-white/90 text-slate-900 font-bold text-xs rounded-full flex items-center gap-1.5 shadow-md">
                      <Maximize2 className="w-4 h-4 text-blue-600" /> View Larger
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Lightbox Modal */}
            {activeGalleryImage && (
              <div 
                className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
                onClick={() => setActiveGalleryImage(null)}
              >
                <div className="relative max-w-4xl w-full">
                  <img
                    src={activeGalleryImage}
                    alt="Enlarged View"
                    className="w-full h-auto max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/20"
                  />
                  <button
                    onClick={() => setActiveGalleryImage(null)}
                    className="absolute top-4 right-4 bg-white/80 hover:bg-white text-slate-900 font-bold px-4 py-2 rounded-full text-xs shadow-lg"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: ADVANTAGES & CONNECTIVITY (SECOND TAB) */}
        {activeTabSub === 'ADVANTAGES' && (
          <div className="space-y-12">
            
            <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white p-8 sm:p-10 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-bold uppercase mb-3">
                  <Landmark className="w-4 h-4 text-blue-400" />
                  Historical Heritage Advantage
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                  Located Just 200 Meters Away From Kondaveedu Ghat Road
                </h3>
                <p className="mt-3 text-slate-300 text-sm leading-relaxed">
                  Kondaveedu Ghat Road is a famous scenic road constructed along the historic Kondaveedu Fort hills. Staying just 200 meters away gives your property instant connectivity to major tourism developments, clean mountain air, and massive future appreciation.
                </p>
              </div>

              <div className="shrink-0 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 text-center min-w-[200px]">
                <span className="block text-4xl font-black text-blue-400">200m</span>
                <span className="text-xs font-bold text-slate-200 mt-1 block">Distance to Ghat Road</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200">
                <div className="w-12 h-12 bg-blue-100 text-blue-800 rounded-2xl flex items-center justify-center mb-4">
                  <Landmark className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Historical Tourist Attractions</h4>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-600" />
                    <span><strong>Kondaveedu Fort & View Point:</strong> 2.5 km</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-600" />
                    <span><strong>Ghat Road Eco Park & Museum:</strong> 500 meters</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200">
                <div className="w-12 h-12 bg-blue-100 text-blue-800 rounded-2xl flex items-center justify-center mb-4">
                  <Car className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Highway & City Connectivity</h4>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-600" />
                    <span><strong>NH-16 Chennai-Kolkata Highway:</strong> 10 mins</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-600" />
                    <span><strong>Guntur Railway Station:</strong> 25 mins</span>
                  </li>
                </ul>
              </div>

              {/* Updated KL University to 1 Hr & AIIMS to 40-50 mins */}
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200">
                <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center mb-4">
                  <School className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Educational & Healthcare Hubs</h4>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-600" />
                    <span><strong>KL University & Vignan University:</strong> 1 Hour</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-600" />
                    <span><strong>AIIMS Mangalagiri:</strong> 40-50 Minutes</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Key Features List */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-6">
                Project Amenities & Layout Developments
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {activeProject.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-xs font-semibold text-slate-800">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
