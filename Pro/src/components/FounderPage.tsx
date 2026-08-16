import React from 'react';
import { useApp } from '../context/AppContext';
import { Award, Users, Building, ShieldCheck, Quote, CheckCircle, Sparkles, Calendar, ArrowRight, User } from 'lucide-react';

export const FounderPage: React.FC = () => {
  const { founder, setIsSiteVisitModalOpen, setActiveTab } = useApp();

  return (
    <div className="bg-white min-h-screen pb-24">
      
      {/* Top Banner */}
      <div className="bg-slate-900 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/50 to-slate-900 z-0 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Award className="w-4 h-4 text-blue-400" />
            Leadership & Visionary Founder
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Meet Our Founder
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Guiding Venkata Sai Developers with unwavering commitment, transparency, and a passion for creating high-value real estate investments.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        
        {/* Founder Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Founder Photo & Quick Badge */}
            <div className="lg:col-span-5 relative flex flex-col items-center">
              <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 group">
                {founder.image ? (
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 flex flex-col items-center justify-center p-6 text-white text-center">
                    <div className="w-20 h-20 rounded-full bg-blue-600/30 border-2 border-blue-400/50 flex items-center justify-center mb-4">
                      <User className="w-10 h-10 text-blue-300" />
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs text-blue-400 font-bold uppercase tracking-wider block">Founder & Managing Director</span>
                  <h3 className="text-2xl font-black text-white mt-0.5">{founder.name}</h3>
                </div>
              </div>

              {/* Stats Bar below photo */}
              <div className="grid grid-cols-3 gap-3 w-full max-w-md mt-6">
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 text-center">
                  <span className="block text-2xl font-black text-slate-900">{founder.experienceYears}+</span>
                  <span className="text-[11px] text-slate-500 font-semibold block mt-0.5">Years Exp.</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 text-center">
                  <span className="block text-2xl font-black text-blue-700">{founder.projectsDelivered}+</span>
                  <span className="text-[11px] text-slate-500 font-semibold block mt-0.5">Ventures</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 text-center">
                  <span className="block text-2xl font-black text-amber-600">{founder.happyFamilies}+</span>
                  <span className="text-[11px] text-slate-500 font-semibold block mt-0.5">Happy Buyers</span>
                </div>
              </div>
            </div>

            {/* Founder Message & Bio Column */}
            <div className="lg:col-span-7 space-y-6">
              
              <div>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">Managing Director's Note</span>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                  {founder.name}
                </h2>
                <p className="text-sm font-semibold text-slate-500 mt-0.5">{founder.title}, Venkata Sai Developers</p>
              </div>

              {/* Vision Quote Card */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/60 p-6 sm:p-8 rounded-3xl border border-blue-200 relative">
                <Quote className="w-10 h-10 text-blue-600/30 absolute top-4 right-4" />
                <p className="text-base sm:text-lg font-medium text-slate-800 italic leading-relaxed relative z-10">
                  "{founder.visionMessage}"
                </p>
                <div className="mt-4 pt-4 border-t border-blue-200/60 flex items-center justify-between">
                  <span className="text-xs font-extrabold text-blue-900 uppercase">
                    — {founder.name}
                  </span>
                  <span className="text-[11px] bg-blue-600 text-white font-bold px-3 py-1 rounded-full">
                    Fulfill Your Dreams
                  </span>
                </div>
              </div>

              {/* Bio Details */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Leadership Journey</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {founder.bio}
                </p>
              </div>

              {/* Core Values */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">Our Core Principles</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {founder.coreValues.map((val, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs font-semibold text-slate-800">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => setIsSiteVisitModalOpen(true)}
                  className="w-full sm:w-auto px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Site Visit With Management Team</span>
                </button>

                <button
                  onClick={() => setActiveTab('KONDAVEEDU_VENTURE')}
                  className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-2xl transition-all flex items-center justify-center gap-2"
                >
                  <span>Explore Kondaveedu Plots</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
