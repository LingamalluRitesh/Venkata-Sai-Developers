import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { settings } = useApp();
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // 1.5 seconds display, 0.5 seconds fade out -> total 2.0s
    const timer1 = setTimeout(() => {
      setIsFadingOut(true);
    }, 1500);

    const timer2 = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center p-6 transition-opacity duration-500 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Grand Background Radial Glow */}
      <div className="absolute w-[500px] h-[500px] sm:w-[650px] sm:h-[650px] bg-blue-600/30 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute w-[300px] h-[300px] bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

      {/* Opening Logo Container with Large Scale & Glow */}
      <div className="relative z-10 flex flex-col items-center text-center animate-in zoom-in-95 duration-700">
        
        {/* Large Prominent Logo Box */}
        <div className="relative p-4 sm:p-5 bg-white/10 backdrop-blur-2xl rounded-[32px] border border-white/30 shadow-2xl mb-8 group ring-4 ring-blue-500/20">
          <div className="w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/40 bg-white flex items-center justify-center p-2">
            <img
              src={settings.logoUrl || '/logo.jpg'}
              alt={settings.ventureName}
              className="w-full h-full object-contain transform transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>

        {/* Company Title */}
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-none mb-3 drop-shadow-lg">
          {settings.ventureName || 'Venkata Sai Developers'}
        </h1>

        {/* Tagline */}
        <p className="text-xs sm:text-base font-bold text-blue-300 uppercase tracking-widest max-w-lg drop-shadow-md">
          {settings.tagline || 'Fulfill Your Dreams — Premium Villa Plots'}
        </p>

        {/* Dynamic Loading Progress Line */}
        <div className="mt-10 w-52 sm:w-64 h-1.5 bg-slate-800/80 rounded-full overflow-hidden border border-white/10 shadow-inner">
          <div className="h-full bg-gradient-to-r from-blue-500 via-indigo-400 to-emerald-400 animate-progress" />
        </div>

      </div>
    </div>
  );
};
