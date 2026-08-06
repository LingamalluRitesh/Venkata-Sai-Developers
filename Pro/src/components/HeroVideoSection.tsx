import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Calendar, MapPin, Sparkles, Download, MessageSquare, PhoneCall } from 'lucide-react';
import { WhatsAppIcon, PhoneCallIcon } from './Icons';

const TYPING_QUOTES = [
  "Investing in the land will make your future better.",
  "200 meters from historical Kondaveedu Ghat Road.",
  "High land appreciation in Guntur's tourism corridor.",
  "Secure your children's future with prime villa plots."
];

// Reliable HD Aerial Drone MP4 Video Streams
const VIDEO_SOURCES = [
  "https://cdn.coverr.co/videos/coverr-drone-shot-of-a-landscape-5384/1080p.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-winding-road-in-the-mountains-41484-large.mp4",
  "/landing_video.mp4"
];

export const HeroVideoSection: React.FC = () => {
  const { setActiveTab, setIsSiteVisitModalOpen, activeProject, settings } = useApp();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Typing animation state
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, []);

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
    <div className="relative w-full min-h-[88vh] flex items-center justify-center overflow-hidden bg-slate-950 py-16">
      
      {/* Landing Page Video Background */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover scale-105 filter brightness-90 saturate-110"
        >
          {VIDEO_SOURCES.map((src, index) => (
            <source key={index} src={src} type="video/mp4" />
          ))}
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80" 
            alt="Kondaveedu Hills Landscape"
            className="w-full h-full object-cover"
          />
        </video>
        
        {/* Crisp Gradient Overlay */}
        <div className="absolute inset-0 bg-slate-950/60" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Distance Highlight Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/30 backdrop-blur-md border border-blue-400/40 text-blue-300 text-xs sm:text-sm font-bold tracking-wide uppercase mb-6 shadow-lg">
          <MapPin className="w-4 h-4 text-blue-400 animate-bounce" />
          <span>Just 200 Meters Away From Historical Kondaveedu Ghat Road</span>
        </div>

        {/* Dynamic Typing Animation Quote Header */}
        <div className="min-h-[120px] sm:min-h-[140px] flex items-center justify-center mb-4">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-blue-200">
              {TYPING_QUOTES[textIndex].substring(0, charIndex)}
            </span>
            <span className="typing-cursor font-light text-blue-400"></span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="max-w-3xl text-sm sm:text-base md:text-lg text-slate-200 font-normal leading-relaxed mb-10 drop-shadow-xs">
          Own a piece of paradise in Kondaveedu with Venkata Sai Developers. Premium villa plots featuring blacktop roads, underground utilities, and 24/7 security, surrounded by historic green hills.
        </p>

        {/* Standardized Equal-Size Action Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 w-full max-w-4xl mx-auto">
          
          <button
            onClick={() => setActiveTab('KONDAVEEDU_VENTURE')}
            className="h-13 px-5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
          >
            <Sparkles className="w-4 h-4 shrink-0" />
            <span className="truncate">Explore Venture</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>

          <button
            onClick={() => setIsSiteVisitModalOpen(true)}
            className="h-13 px-5 bg-white hover:bg-slate-50 text-slate-900 font-bold text-xs sm:text-sm rounded-xl shadow-lg border border-slate-200 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
          >
            <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="truncate">Schedule Free Visit</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="h-13 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
          >
            <WhatsAppIcon className="w-5 h-5 shrink-0" />
            <span className="truncate">WhatsApp Chat</span>
          </a>

          <a
            href="tel:+919030903364"
            className="h-13 px-5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg border border-slate-700 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
          >
            <PhoneCallIcon className="w-5 h-5 shrink-0 rounded" />
            <span className="truncate">Call Office</span>
          </a>

        </div>

        {/* Quick Highlights Bar */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl pt-8 border-t border-white/15">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-left">
            <span className="block text-2xl font-black text-white">200m</span>
            <span className="text-xs text-slate-300 font-medium">To Kondaveedu Ghat Road</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-left">
            <span className="block text-2xl font-black text-blue-400">100%</span>
            <span className="text-xs text-slate-300 font-medium">Spot Registration & Clear Title</span>
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
