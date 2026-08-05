import React from 'react';
import { useApp } from '../context/AppContext';
import { Building2, Home, Store, Clock, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';

export const UpcomingProjects: React.FC = () => {
  const { upcomingProjects, setIsInquiryModalOpen } = useApp();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-4">
            <Clock className="w-4 h-4 text-amber-600 animate-pulse" />
            Launching Soon Phase II
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Upcoming Ventures & Living Spaces
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Expand your real estate portfolio with our upcoming eco-villas, panoramic apartments, and high-footfall commercial plots in the Kondaveedu Ghat Road Sector.
          </p>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {upcomingProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Hero Image & Starting Soon Badge */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-amber-500 text-slate-950 font-black text-xs px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                    Starting Soon
                  </div>
                  <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white font-bold text-xs px-3 py-1 rounded-full">
                    {project.category.replace('_', ' ')}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold mt-1">
                    📍 {project.location}
                  </p>
                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <span className="text-[11px] font-bold uppercase text-slate-400 block mb-2">Key Highlights</span>
                    <ul className="space-y-1.5">
                      {project.keyFeatures.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Bottom Register CTA */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => setIsInquiryModalOpen(true)}
                  className="w-full py-3 bg-slate-900 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Register Priority Early Access</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
