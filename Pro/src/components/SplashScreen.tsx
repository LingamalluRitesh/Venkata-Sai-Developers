import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { settings } = useApp();
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // 1.4 seconds display, 0.4 seconds fade out -> total 1.8s
    const timer1 = setTimeout(() => {
      setIsFadingOut(true);
    }, 1400);

    const timer2 = setTimeout(() => {
      onComplete();
    }, 1800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center p-4 transition-opacity duration-500 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Subtle Gradient Glow */}
      <div className="absolute w-[350px] h-[350px] bg-blue-600/25 rounded-full blur-3xl animate-pulse" />

      {/* Opening Logo Container with Scale & Glow */}
      <div className="relative z-10 flex flex-col items-center text-center animate-in zoom-in-90 duration-700">
        <div className="relative p-3 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl mb-6">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shadow-inner border border-white/30 bg-white flex items-center justify-center p-1">
            <img
              src={settings.logoUrl || '/logo.jpg'}
              alt={settings.ventureName}
              className="w-full h-full object-contain transform transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-none mb-2">
          {settings.ventureName || 'Venkata Sai Developers'}
        </h1>

        <p className="text-xs sm:text-sm font-semibold text-blue-400 uppercase tracking-widest">
          {settings.tagline || 'Fulfill Your Dreams — Premium Villa Plots'}
        </p>

        {/* Loading Progress Line */}
        <div className="mt-8 w-44 h-1 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 via-blue-400 to-emerald-400 animate-progress" />
        </div>
      </div>
    </div>
  );
};
