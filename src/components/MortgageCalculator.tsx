import { useState } from 'react'

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState(2500000)
  const [downPaymentPercent, setDownPaymentPercent] = useState(20)
  const [interestRate, setInterestRate] = useState(6.5)
  const [loanTermYears, setLoanTermYears] = useState(30)

  // Calculations
  const downPayment = (homePrice * downPaymentPercent) / 100
  const loanAmount = homePrice - downPayment
  const monthlyInterestRate = interestRate / 100 / 12
  const numberOfPayments = loanTermYears * 12

  const monthlyPrincipalAndInterest =
    monthlyInterestRate > 0
      ? (loanAmount *
          (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)
      : loanAmount / numberOfPayments

  const estimatedTax = (homePrice * 0.012) / 12
  const estimatedInsurance = (homePrice * 0.004) / 12
  const totalMonthlyPayment = monthlyPrincipalAndInterest + estimatedTax + estimatedInsurance

  return (
    <section id="mortgage" className="py-24 bg-slate-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
            FINANCIAL PLANNING TOOLS
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-serif">
            Interactive Mortgage Estimator
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Calculate your estimated monthly payment, principal, interest, taxes, and down payment.
          </p>
        </div>

        {/* Main Calculator Box */}
        <div className="grid lg:grid-cols-12 gap-8 items-center bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          
          {/* Sliders Left Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Home Price Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-300 uppercase">Home Purchase Price</span>
                <span className="font-extrabold text-amber-400 text-base font-serif">${homePrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={200000}
                max={10000000}
                step={50000}
                value={homePrice}
                onChange={(e) => setHomePrice(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer bg-slate-950"
              />
            </div>

            {/* 2. Down Payment Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-300 uppercase">Down Payment ({downPaymentPercent}%)</span>
                <span className="font-extrabold text-amber-400 text-base font-serif">${downPayment.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={5}
                max={50}
                step={5}
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer bg-slate-950"
              />
            </div>

            {/* 3. Interest Rate Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-300 uppercase">Interest Rate</span>
                <span className="font-extrabold text-amber-400 text-base font-serif">{interestRate}%</span>
              </div>
              <input
                type="range"
                min={3.0}
                max={12.0}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer bg-slate-950"
              />
            </div>

            {/* 4. Loan Term */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-300 uppercase">Loan Term (Years)</div>
              <div className="grid grid-cols-3 gap-3">
                {[15, 20, 30].map((years) => (
                  <button
                    key={years}
                    type="button"
                    onClick={() => setLoanTermYears(years)}
                    className={`py-2.5 rounded-xl font-bold text-xs transition ${
                      loanTermYears === years
                        ? 'bg-amber-400 text-slate-950 shadow-md'
                        : 'bg-slate-950 text-slate-300 border border-slate-800'
                    }`}
                  >
                    {years} Years
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Result Card Right Column */}
          <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-2 text-center sm:text-left">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
                ESTIMATED MONTHLY PAYMENT
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold text-amber-400 font-serif">
                ${Math.round(totalMonthlyPayment).toLocaleString()}
                <span className="text-xs text-slate-400 font-sans font-normal">/mo</span>
              </div>
            </div>

            {/* Breakdown Bars */}
            <div className="space-y-3 pt-4 border-t border-slate-800/80 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-300 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span>Principal & Interest</span>
                </span>
                <span className="font-extrabold text-white">${Math.round(monthlyPrincipalAndInterest).toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-300 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  <span>Property Taxes (Est.)</span>
                </span>
                <span className="font-extrabold text-white">${Math.round(estimatedTax).toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-300 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span>Homeowner Insurance</span>
                </span>
                <span className="font-extrabold text-white">${Math.round(estimatedInsurance).toLocaleString()}</span>
              </div>
            </div>

            {/* Total Loan Details */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1.5 text-slate-400">
              <div className="flex justify-between">
                <span>Total Loan Amount:</span>
                <strong className="text-white">${loanAmount.toLocaleString()}</strong>
              </div>
              <div className="flex justify-between">
                <span>Down Payment Amount:</span>
                <strong className="text-white">${downPayment.toLocaleString()}</strong>
              </div>
            </div>

            <a
              href="#contact"
              className="w-full text-center py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-xs shadow-lg transition"
            >
              Get Pre-Approved Now →
            </a>

          </div>

        </div>

      </div>
    </section>
  )
}
