import React, { useState } from 'react';
import { 
  TrendingUp, 
  Calculator, 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle, 
  Cpu, 
  ShieldCheck, 
  Sliders, 
  BarChart3, 
  Zap,
  Info,
  Compass
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AiValuationEngine, AiValuationInput } from '../lib/aiValuationEngine';

export const LandValueCalculator: React.FC = () => {
  const { setIsSiteVisitModalOpen } = useApp();

  // Interactive AI Input States
  const [selectedSqYd, setSelectedSqYd] = useState<number>(200);
  const [currentPricePerSqYd, setCurrentPricePerSqYd] = useState<number>(10000);
  const [plotType, setPlotType] = useState<AiValuationInput['plotType']>('CORNER');
  const [holdingYears, setHoldingYears] = useState<number>(5);
  const [scenario, setScenario] = useState<AiValuationInput['scenario']>('BALANCED');
  const [activeTab, setActiveTab] = useState<'FORECAST' | 'DRIVERS' | 'SUMMARY'>('FORECAST');

  // Compute AI Valuation Model in real time
  const aiResult = AiValuationEngine.computeValuation({
    sqYds: selectedSqYd,
    currentPricePerSqYd,
    plotType,
    holdingYears,
    scenario,
  });

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden border-y border-slate-800">
      
      {/* Background AI Grid glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-600/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Badge */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-bold tracking-wide uppercase mb-4 shadow-lg">
            <Cpu className="w-4 h-4 text-blue-400 animate-pulse" />
            <span>AI / ML Powered Land Valuation Engine v3.4</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping ml-1" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight drop-shadow-md">
            AI Land ROI & Appreciation Predictor
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Powered by machine learning models trained on Andhra Pradesh land market transactions, regional infrastructure growth data, and 150m Kondaveedu Ghat Road tourism corridor appreciation analytics.
          </p>
        </div>

        {/* AI Calculator Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: AI Control Panel */}
          <div className="lg:col-span-5 bg-slate-950/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl relative">
            
            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">AI Valuation Parameters</h3>
                  <p className="text-xs text-slate-400">Adjust layout variables to simulate ROI</p>
                </div>
              </div>

              <div className="px-2.5 py-1 bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 font-extrabold text-[11px] rounded-full">
                {aiResult.aiConfidenceScore}% Accuracy
              </div>
            </div>

            <div className="mt-6 space-y-6">
              
              {/* 1. Plot Size Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex justify-between">
                  <span>1. Select Plot Size (Sq. Yards):</span>
                  <span className="text-blue-400 font-black">{selectedSqYd} Sq.Yds</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[150, 200, 300, 500].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSqYd(size)}
                      className={`py-2.5 text-xs font-bold rounded-xl border transition-all ${
                        selectedSqYd === size
                          ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30 ring-2 ring-blue-400/30'
                          : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      {size} Sq.Yd
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Price Per Sq. Yard Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    2. Sq.Yard Base Rate:
                  </label>
                  <span className="text-sm font-black text-amber-300 bg-amber-400/10 px-2.5 py-0.5 rounded-lg border border-amber-400/20">
                    ₹{currentPricePerSqYd.toLocaleString()} / Sq.Yd
                  </span>
                </div>
                <input
                  type="range"
                  min="8000"
                  max="20000"
                  step="500"
                  value={currentPricePerSqYd}
                  onChange={(e) => setCurrentPricePerSqYd(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-semibold">
                  <span>₹8,000</span>
                  <span>₹10,000 (Current Launch Price)</span>
                  <span>₹20,000</span>
                </div>
              </div>

              {/* 3. Plot Facing & Position Type */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  3. Plot Facing & Advantage:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'CORNER', label: 'Corner Plot (+5% Premium)', icon: '📐' },
                    { id: 'EAST_FACING', label: 'East Facing (+3% Premium)', icon: '🌅' },
                    { id: 'NORTH_FACING', label: 'North Facing (+2.5% Premium)', icon: '🧭' },
                    { id: 'STANDARD', label: 'Standard Plot (Base)', icon: '📍' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setPlotType(t.id as any)}
                      className={`p-2.5 text-left text-xs font-bold rounded-xl border transition-all flex items-center gap-2 ${
                        plotType === t.id
                          ? 'bg-blue-600/30 text-white border-blue-500 ring-1 ring-blue-400/40'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <span className="text-sm">{t.icon}</span>
                      <span className="truncate">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Holding Period Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    4. Investment Time Horizon:
                  </label>
                  <span className="text-xs font-extrabold text-blue-300 bg-blue-500/20 px-2.5 py-0.5 rounded-lg border border-blue-400/30">
                    {holdingYears} Years ({aiResult.targetYear})
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={holdingYears}
                  onChange={(e) => setHoldingYears(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-semibold">
                  <span>1 Yr (Short)</span>
                  <span>5 Yrs (Medium)</span>
                  <span>10 Yrs (Long Term)</span>
                </div>
              </div>

              {/* 5. AI Growth Scenario Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  5. AI Appreciation Growth Model:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'CONSERVATIVE', label: 'Conservative (16.5% CAGR)' },
                    { id: 'BALANCED', label: 'Balanced (21.5% CAGR)' },
                    { id: 'HIGH_GROWTH', label: 'High Growth (27.8% CAGR)' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setScenario(s.id as any)}
                      className={`py-2 px-2 text-[11px] font-bold rounded-xl border text-center transition-all ${
                        scenario === s.id
                          ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/30'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Instant Action CTA */}
              <button
                onClick={() => setIsSiteVisitModalOpen(true)}
                className="w-full py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 border border-blue-400/30 group cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
                Book Plot At Current Launch Rate (₹{currentPricePerSqYd.toLocaleString()}/Sq.Yd)
              </button>

            </div>
          </div>

          {/* RIGHT: AI Output & Predictive Visualizer */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top AI Result Highlight Card */}
            <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/10 blur-2xl rounded-full pointer-events-none" />
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
                <div>
                  <span className="text-[11px] font-extrabold text-blue-400 uppercase tracking-widest block">
                    AI ML MODEL VALUATION PROJECTION ({holdingYears} YEARS — {aiResult.targetYear})
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                    ₹{aiResult.projectedTotalValuation.toLocaleString()}
                  </h3>
                </div>

                <div className="p-3 bg-emerald-500/15 rounded-2xl border border-emerald-400/30 text-right shrink-0">
                  <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider block">Estimated Profit</span>
                  <span className="text-xl font-black text-emerald-400">
                    +₹{aiResult.netProfit.toLocaleString()}
                  </span>
                  <span className="text-xs font-bold text-emerald-300 block">
                    (+{aiResult.roiPercentage}% ROI)
                  </span>
                </div>
              </div>

              {/* 3 Metrics Row */}
              <div className="grid grid-cols-3 gap-3 pt-6 text-center">
                <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Current Investment</span>
                  <span className="text-base font-black text-white mt-1 block">
                    ₹{aiResult.currentValuation.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold block">({selectedSqYd} Sq.Yds)</span>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Est. Rate ({aiResult.targetYear})</span>
                  <span className="text-base font-black text-amber-300 mt-1 block">
                    ₹{aiResult.projectedPriceSqYd.toLocaleString()}/Sq.Yd
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold block">({aiResult.annualCagrPct}% CAGR)</span>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">AI Model Accuracy</span>
                  <span className="text-base font-black text-emerald-400 mt-1 block">
                    {aiResult.aiConfidenceScore}%
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold block">High Confidence</span>
                </div>
              </div>

              {/* AI Executive Summary Text */}
              <div className="mt-6 p-4 bg-blue-950/40 rounded-2xl border border-blue-500/20 text-xs text-slate-300 leading-relaxed flex items-start gap-2.5">
                <Cpu className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <span>{aiResult.aiAnalysisSummary}</span>
              </div>
            </div>

            {/* Tab Selector for Visual Breakdown */}
            <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs font-bold">
              <button
                onClick={() => setActiveTab('FORECAST')}
                className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'FORECAST' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                <BarChart3 className="w-4 h-4" /> Year-by-Year Forecast
              </button>

              <button
                onClick={() => setActiveTab('DRIVERS')}
                className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'DRIVERS' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Zap className="w-4 h-4 text-amber-300" /> AI Growth Catalysts
              </button>

              <button
                onClick={() => setActiveTab('SUMMARY')}
                className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'SUMMARY' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Security Guarantee
              </button>
            </div>

            {/* TAB 1: Year-by-Year Predictive Chart */}
            {activeTab === 'FORECAST' && (
              <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-3">
                <h4 className="text-sm font-extrabold text-slate-300 uppercase tracking-wider mb-4 flex items-center justify-between">
                  <span>Yearly Sq.Yard Valuation & Infrastructure Milestones</span>
                  <span className="text-xs text-blue-400 font-bold">2026 ➔ {aiResult.targetYear}</span>
                </h4>

                <div className="space-y-3">
                  {aiResult.yearlyForecasts.slice(0, holdingYears + 1).map((forecast) => (
                    <div 
                      key={forecast.year}
                      className={`p-4 rounded-2xl border transition-all ${
                        forecast.year === aiResult.targetYear
                          ? 'bg-blue-900/40 border-blue-500/60 ring-2 ring-blue-500/20'
                          : forecast.year === 2026
                          ? 'bg-emerald-950/40 border-emerald-500/40'
                          : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${
                            forecast.year === aiResult.targetYear ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-200'
                          }`}>
                            {forecast.year}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-white text-base">
                                ₹{forecast.estimatedPriceSqYd.toLocaleString()} / Sq.Yd
                              </span>
                              {forecast.roiPercentage > 0 && (
                                <span className="text-[11px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full">
                                  +{forecast.roiPercentage}%
                                </span>
                              )}
                              {forecast.year === 2026 && (
                                <span className="text-[10px] font-black bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                                  CURRENT LAUNCH
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-slate-400 block mt-0.5 font-medium">
                              Total Val: ₹{forecast.totalValuation.toLocaleString()} (+₹{forecast.netProfit.toLocaleString()} Profit)
                            </span>
                          </div>
                        </div>

                        <div className="text-left sm:text-right max-w-xs">
                          <span className="text-[11px] text-blue-300/90 font-medium block">
                            📌 {forecast.milestone}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: AI Growth Catalysts Breakdown */}
            {activeTab === 'DRIVERS' && (
              <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
                <h4 className="text-sm font-extrabold text-slate-300 uppercase tracking-wider mb-2">
                  AI Multipliers & Infrastructure Growth Factors
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {aiResult.growthDrivers.map((driver, idx) => (
                    <div key={idx} className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xl">{driver.icon}</span>
                        <span className="px-2.5 py-0.5 bg-blue-500/20 text-blue-300 border border-blue-400/30 font-black text-xs rounded-full">
                          +{driver.impactPct}% Weight
                        </span>
                      </div>
                      <h5 className="font-extrabold text-white text-sm">{driver.name}</h5>
                      <p className="text-xs text-slate-400 font-normal leading-relaxed">
                        {driver.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: Legal & Security Guarantee */}
            {activeTab === 'SUMMARY' && (
              <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs text-slate-300 leading-relaxed">
                <h4 className="text-sm font-extrabold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  100% Risk-Free Legal Transparency Guarantee
                </h4>

                <ul className="space-y-3">
                  <li className="flex items-start gap-2.5 p-3 bg-slate-900 rounded-2xl border border-slate-800">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>100% Spot Registration:</strong> Instant title deed registration executed directly in your name at the sub-registrar office.</span>
                  </li>
                  <li className="flex items-start gap-2.5 p-3 bg-slate-900 rounded-2xl border border-slate-800">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Clear Title Verification:</strong> Thorough legal encumbrance search certification ensuring zero litigation or encumbrances.</span>
                  </li>
                  <li className="flex items-start gap-2.5 p-3 bg-slate-900 rounded-2xl border border-slate-800">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>30ft Roads & Solar Electricity:</strong> Fully developed 30ft blacktop avenues, open drainage system, entrance security gate, and solar grid access.</span>
                  </li>
                </ul>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
