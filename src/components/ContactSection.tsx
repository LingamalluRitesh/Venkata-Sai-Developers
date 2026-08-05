import { useState } from 'react'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interest: 'Buying Luxury Villa',
    budget: '$2M - $5M',
    message: ''
  })

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
            CONNECT WITH OUR PRIVATE AGENTS
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-serif">
            Schedule a Confidential Consultation
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Speak directly with our senior luxury directors for personalized property matching.
          </p>
        </div>

        {/* Main Box */}
        <div className="bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden grid lg:grid-cols-12">
          
          {/* Left Info Panel */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8 sm:p-12 space-y-8 border-b lg:border-b-0 lg:border-r border-slate-800">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold font-serif text-white">Private Client Office</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Our private client advisors are available 7 days a week for in-person viewings or virtual walkthroughs.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center gap-3">
                <span className="text-amber-400 text-lg">📍</span>
                <div>
                  <div className="font-bold text-white">Flagship Office</div>
                  <div className="text-slate-400">Road No. 36, Jubilee Hills, Hyderabad</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-amber-400 text-lg">📞</span>
                <div>
                  <div className="font-bold text-white">VIP Direct Hotline</div>
                  <a href="tel:+919876543210" className="text-amber-400 font-bold hover:underline">+91 98765 43210</a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-amber-400 text-lg">✉️</span>
                <div>
                  <div className="font-bold text-white">Private Desk Email</div>
                  <a href="mailto:vip@havenrealty.com" className="text-amber-400 font-bold hover:underline">vip@havenrealty.com</a>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
              <div className="font-bold text-amber-400">⚡ Fast Response Guarantee</div>
              <p className="text-[11px] text-slate-400">All client inquiries receive a response from a senior director within 30 minutes.</p>
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="lg:col-span-7 p-8 sm:p-12 bg-slate-900">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center text-3xl font-bold mx-auto border border-amber-400/30">
                  ✓
                </div>
                <h4 className="text-2xl font-bold text-white font-serif">Consultation Request Received!</h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  Thank you, <strong className="text-white">{formData.name}</strong>. Our senior director will call you at <strong className="text-amber-400">{formData.phone}</strong> shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-amber-400 text-slate-950 font-bold text-xs"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Full Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="Ravi Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Phone / WhatsApp *</label>
                    <input
                      required
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Email Address *</label>
                    <input
                      required
                      type="email"
                      placeholder="ravi@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Primary Interest</label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Buying Luxury Villa">Buying Luxury Villa</option>
                      <option value="Penthouse & Duplex">Penthouse & Duplex</option>
                      <option value="Commercial Investment">Commercial Investment</option>
                      <option value="Rental & Leasing">Rental & Leasing</option>
                      <option value="Selling My Property">Selling My Property</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Your Message / Specific Location</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us more about your ideal property requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-xs shadow-xl shadow-amber-500/20 transition"
                >
                  Submit Consultation Request →
                </button>

              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  )
}
