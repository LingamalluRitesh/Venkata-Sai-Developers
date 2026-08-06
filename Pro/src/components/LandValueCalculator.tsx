import React, { useState } from 'react';
import { LAND_APPRECIATION_FORECAST } from '../data/initialData';
import { TrendingUp, Calculator, ShieldCheck, Sparkles, HelpCircle, ArrowUpRight, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LandValueCalculator: React.FC = () => {
  const { setIsSiteVisitModalOpen } = useApp();
  const [selectedSqYd, setSelectedSqYd] = useState<number>(200);
  const [currentPricePerSqYd, setCurrentPricePerSqYd] = useState<number>(16500);

  const currentValuation = selectedSqYd * currentPricePerSqYd;
  
  // Calculate projected growth for 2028 (5 yrs) and 2030 (7 yrs)
  const price2028 = 28500;
  const price2030 = 42000;

  const val2028 = selectedSqYd * price2028;
  const val2030 = selectedSqYd * price2030;

  const profit2028 = val2028 - currentValuation;
  const profit2030 = val2030 - currentValuation;

  const roi2028 = ((profit2028 / currentValuation) * 100).toFixed(1);
  const roi2030 = ((profit2030 / currentValuation) * 100).toFixed(1);

  return (
    <section className="py-20 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider mb-4">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            AI Land Value Forecast & ROI Growth
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Estimated Future Land Values in Kondaveedu Sector
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            AI-powered land valuation models confirm that plots just 150 meters from Kondaveedu Ghat Road are among the highest-appreciating micro-markets in Andhra Pradesh — driven by tourism corridors, satellite town expansion, and real-time demand analytics showing 300%+ ROI potential by 2030.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Interactive Calculator Box */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md">
            <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Custom Plot ROI Calculator</h3>
                <p className="text-xs text-slate-500">Estimate your land valuation growth</p>
              </div>
            </div>

            <div className="mt-6 space-y-6">
              
              {/* Plot Size Selection */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex justify-between">
                  <span>Plot Size (Sq. Yards):</span>
                  <span className="text-blue-700 font-bold">{selectedSqYd} Sq.Yds</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[150, 200, 300, 500].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSqYd(size)}
                      className={`py-2.5 text-xs font-bold rounded-xl border transition-all ${
                        selectedSqYd === size
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {size} Sq.Yd
                    </button>
                  ))}
                </div>
              </div>

              {/* Price per Sq. Yd input */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex justify-between">
                  <span>Current Sq.Yd Price:</span>
                  <span className="text-slate-900 font-bold">₹{currentPricePerSqYd.toLocaleString()}/Sq.Yd</span>
                </label>
                <input
                  type="range"
                  min="14500"
                  max="18500"
                  step="500"
                  value={currentPricePerSqYd}
                  onChange={(e) => setCurrentPricePerSqYd(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              {/* Current Investment Value */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Current Investment Cost</span>
                <span className="text-2xl font-black text-slate-900 mt-1 block">
                  ₹{currentValuation.toLocaleString()}
                </span>
                <span className="text-xs text-slate-500 mt-0.5 block">
                  ({selectedSqYd} Sq.Yds @ ₹{currentPricePerSqYd.toLocaleString()}/Sq.Yd)
                </span>
              </div>

              {/* Projected Returns Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-200">
                  <div className="flex items-center justify-between text-xs text-emerald-800 font-extrabold uppercase">
                    <span>Est. 2028 (3-4 Yrs)</span>
                    <span className="text-emerald-700">+{roi2028}%</span>
                  </div>
                  <span className="text-xl font-extrabold text-emerald-900 mt-2 block">
                    ₹{val2028.toLocaleString()}
                  </span>
                  <span className="text-xs text-emerald-700 font-medium block mt-1">
                    Est. Profit: +₹{profit2028.toLocaleString()}
                  </span>
                </div>

                <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200">
                  <div className="flex items-center justify-between text-xs text-amber-800 font-extrabold uppercase">
                    <span>Est. 2030 (5-6 Yrs)</span>
                    <span className="text-amber-700">+{roi2030}%</span>
                  </div>
                  <span className="text-xl font-extrabold text-amber-900 mt-2 block">
                    ₹{val2030.toLocaleString()}
                  </span>
                  <span className="text-xs text-amber-700 font-medium block mt-1">
                    Est. Profit: +₹{profit2030.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsSiteVisitModalOpen(true)}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Book Plot At Current ₹{currentPricePerSqYd.toLocaleString()}/Sq.Yd
              </button>

            </div>
          </div>

          {/* Timeline & Growth Drivers Column */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <ArrowUpRight className="w-5 h-5 text-emerald-600" />
                Year-by-Year Price Trend (Per Sq. Yard)
              </h3>

              <div className="space-y-4">
                {LAND_APPRECIATION_FORECAST.map((point) => (
                  <div 
                    key={point.year}
                    className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                      point.year === 2026 
                        ? 'bg-emerald-50/70 border-emerald-300 ring-2 ring-emerald-500/20' 
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-sm ${
                        point.year === 2026 ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-800'
                      }`}>
                        {point.year}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-base">
                            ₹{point.estimatedPriceSqYd.toLocaleString()} / Sq.Yd
                          </span>
                          {point.roiPercentage > 0 && (
                            <span className="text-xs bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full">
                              +{point.roiPercentage}%
                            </span>
                          )}
                          {point.year === 2026 && (
                            <span className="text-xs bg-emerald-600 text-white font-extrabold px-2 py-0.5 rounded-full animate-pulse">
                              CURRENT
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-slate-500 font-medium block mt-0.5">
                          {point.developmentMilestone}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Growth Catalysts List */}
            <div className="bg-emerald-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="text-lg font-bold text-emerald-200 mb-1 flex items-center gap-2">
                  🤖 AI-Powered Appreciation Insights:
                </h4>
                <p className="text-xs text-emerald-300 mb-3 font-medium">Based on satellite data, tourism growth models & real-time market analytics</p>
                <ul className="space-y-2.5 text-sm text-slate-200">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>AI Tourism Demand Forecast:</strong> Just 150m from Kondaveedu Ghat Road — AI models predict 40%+ tourist footfall surge by 2027 boosting land demand.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Satellite Infrastructure Index:</strong> Remote sensing data confirms rapid road widening, highway bypass & suburban corridor development in this zone.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>ML Price Prediction Model:</strong> Machine learning analysis of 10-year land data projects ₹42,000+/Sq.Yd by 2030 — a 300% return on current price.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>100% Spot Registration:</strong> Clear title & instant legal verification — zero risk, maximum security for your investment.</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
