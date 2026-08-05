import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Calendar, MapPin, Sparkles, Download, MessageSquare, PhoneCall } from 'lucide-react';

const TYPING_QUOTES = [
  "Investing in the land will make your future better.",
  "200 meters from historical Kondaveedu Ghat Road.",
  "High land appreciation in Guntur's tourism corridor.",
  "Secure your children's future with prime villa plots."
];

// High-Definition Aerial Drone Video Stream for Instant Render & Mobile Playback
const HERO_DRONE_VIDEO_URL = "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-winding-road-in-the-mountains-41484-large.mp4";

export const HeroVideoSection: React.FC = () => {
  const { setActiveTab, setIsSiteVisitModalOpen, activeProject, settings } = useApp();

  // Typing animation state
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentQuote = TYPING_QUOTES[textIndex];

    const typingSpeed = isDeleting ? 40 : 80;
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentQuote.length) {
          setCharIndex((prev) => prev + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 2500);
        }
      } else {
        if (charIndex > 0) {
          setCharIndex((prev) => prev - 1);
        } else {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % TYPING_QUOTES.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex]);

  const phoneNum = settings.contactPhone || '+919030903364';
  const whatsappUrl = `https://wa.me/918978815621?text=Hi%20Venkata%20Sai%20Developers%2C%20I%20am%20interested%20in%20Kondaveedu%20Venture%20Plots`;

  return (
    <div className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950">
      
      {/* Landing Page Video Background - Instant Playback on Render & Mobile */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover scale-105 filter brightness-90 saturate-110 transform transition-transform duration-10000 hover:scale-100"
        >
          <source src={HERO_DRONE_VIDEO_URL} type="video/mp4" />
          <source src="/landing_video.mp4" type="video/mp4" />
        </video>
        
        {/* Crisp Gradient Overlay for text contrast */}
        <div className="absolute inset-0 bg-slate-950/50" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center flex flex-col items-center">
        
        {/* Distance Highlight Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-400/40 text-blue-300 text-xs sm:text-sm font-bold tracking-wide uppercase mb-6 shadow-lg">
          <MapPin className="w-4 h-4 text-blue-400 animate-bounce" />
          <span>Just 200 Meters Away From Historical Kondaveedu Ghat Road</span>
        </div>

        {/* Dynamic Typing Animation Quote Header */}
        <div className="min-h-[140px] sm:min-h-[160px] md:min-h-[180px] flex items-center justify-center mb-6">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-blue-200">
              {TYPING_QUOTES[textIndex].substring(0, charIndex)}
            </span>
            <span className="typing-cursor font-light text-blue-400"></span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="max-w-3xl text-base sm:text-xl text-slate-200 font-normal leading-relaxed mb-10 drop-shadow-xs">
          Own a piece of paradise in Kondaveedu with Venkata Sai Developers. Premium villa plots featuring blacktop roads, underground utilities, and 24/7 security, surrounded by historic green hills with soaring future property values.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-2xl">
          <button
            onClick={() => setActiveTab('KONDAVEEDU_VENTURE')}
            className="w-full sm:w-auto px-7 py-4 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm rounded-2xl shadow-xl hover:shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 group"
          >
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span>Explore Kondaveedu Venture</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => setIsSiteVisitModalOpen(true)}
            className="w-full sm:w-auto px-6 py-4 bg-white/95 hover:bg-white text-slate-900 font-bold text-sm rounded-2xl shadow-lg border border-white transition-all flex items-center justify-center gap-2 hover:shadow-xl"
          >
            <Calendar className="w-5 h-5 text-blue-600" />
            <span>Schedule Free Visit</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-5 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp Us</span>
          </a>

          {activeProject.brochureUrl && (
            <a
              href={activeProject.brochureUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-5 py-4 bg-slate-900/90 hover:bg-slate-900 text-white font-bold text-sm rounded-2xl border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 text-blue-400" />
              <span>Brochure PDF</span>
            </a>
          )}
        </div>

        {/* Quick Highlights Bar */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl pt-8 border-t border-white/15">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-left">
            <span className="block text-2xl font-black text-white">200m</span>
            <span className="text-xs text-slate-300 font-medium">To Kondaveedu Ghat Road</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-left">
            <span className="block text-2xl font-black text-blue-400">CRDA</span>
            <span className="text-xs text-slate-300 font-medium">Approved Layout Blueprint</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-left">
            <span className="block text-2xl font-black text-amber-300">300%+</span>
            <span className="text-xs text-slate-300 font-medium">Est. 5-Yr Land Appreciation</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-left">
            <span className="block text-2xl font-black text-white">100%</span>
            <span className="text-xs text-slate-300 font-medium">Clear Title & Spot Registration</span>
          </div>
        </div>

      </div>

    </div>
  );
};
