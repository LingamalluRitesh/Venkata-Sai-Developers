import { useState, useEffect } from 'react'
import logoDefault from '../../logo.png'
import { useSiteContext } from '../context/SiteContext'

export default function WelcomeSplash() {
  const { siteData } = useSiteContext()
  const [loading, setLoading] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  const logoSrc = siteData.logoUrl || logoDefault

  useEffect(() => {
    // Show welcome animation for 2.2 seconds then fade out smoothly
    const timer = setTimeout(() => {
      setFadeOut(true)
      setTimeout(() => setLoading(false), 700)
    }, 2200)

    return () => clearTimeout(timer)
  }, [])

  if (!loading) return null

  return (
    <div
      className={`fixed inset-0 z-50 bg-white flex flex-col items-center justify-center p-6 transition-all duration-700 ${
        fadeOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100'
      }`}
    >
      <style>{`
        @keyframes ripplePulse {
          0% { transform: scale(0.8); opacity: 0.2; }
          50% { transform: scale(1.15); opacity: 0.6; }
          100% { transform: scale(0.8); opacity: 0.2; }
        }

        @keyframes dropFall {
          0% { transform: translateY(-40px); opacity: 0; }
          60% { transform: translateY(0px); opacity: 1; }
          80% { transform: translateY(-6px); }
          100% { transform: translateY(0px); }
        }

        .ripple-bg {
          animation: ripplePulse 3s ease-in-out infinite;
        }

        .drop-anim {
          animation: dropFall 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>

      {/* Soft Blue Ripple Rings */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-cyan-100/60 blur-2xl ripple-bg pointer-events-none" />

      {/* Logo & Welcome Box */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-5 max-w-md">
        
        {/* Logo Container with Water Drop Effect */}
        <div className="drop-anim w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white p-2 border border-cyan-200 shadow-xl flex items-center justify-center overflow-hidden">
          <img
            src={logoSrc}
            alt={siteData.companyName}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Welcome Text */}
        <div className="space-y-2 pt-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#001e3c] tracking-tight font-serif">
            Welcome to <span className="text-[#0056a8]">{siteData.companyName}</span>
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-cyan-600 tracking-wide">
            Pure Water, Healthy Life • 24/7 Service
          </p>
        </div>

        {/* Smooth Loading Indicator */}
        <div className="pt-4 flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#0056a8] animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>

      </div>
    </div>
  )
}
