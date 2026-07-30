import { useState } from 'react'
import { useSiteContext } from '../context/SiteContext'

export default function Contact() {
  const { siteData } = useSiteContext()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    serviceType: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const cleanPhone = siteData.phoneNumber.replace(/[^0-9]/g, '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)

    // Build formatted message text for company WhatsApp
    const whatsappMsg = `*New Service Enquiry - Sree Water Solutions*%0A%0A` +
      `*Name:* ${encodeURIComponent(formData.name)}%0A` +
      `*Phone:* ${encodeURIComponent(formData.phone)}%0A` +
      `*City:* ${encodeURIComponent(formData.city || 'Andhra Pradesh')}%0A` +
      `*Service Required:* ${encodeURIComponent(formData.serviceType || 'General Purifier Inquiry')}%0A` +
      `*Message:* ${encodeURIComponent(formData.message || 'I need water purifier service / quote.')}`

    // Automatically open WhatsApp to company number (+91 9666827570)
    window.open(`https://wa.me/${cleanPhone}?text=${whatsappMsg}`, '_blank')
  }

  return (
    <section id="contact" className="py-20 relative overflow-hidden bg-[#e8f4fd] text-[#001e3c]">
      <div className="w-full max-w-[95%] xl:max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="text-xs font-bold uppercase tracking-widest text-[#00a8cc]">
            GET IN TOUCH
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#001e3c] tracking-tight font-serif">
            Contact Us Today
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Reach out via call, WhatsApp, or email — we respond fast 24/7.
          </p>
        </div>

        {/* Top 3 Info Cards with Official SVG Icons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Call Us */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-cyan-100 flex items-center gap-4 hover:shadow-lg transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#0056a8] to-[#00b4d8] text-white flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27c1.21.49 2.53.76 3.88.76a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.27 1.11l-2.37 2.4z"/>
              </svg>
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">Call Us</div>
              <a href={`tel:${siteData.phoneNumber}`} className="text-xs font-bold text-[#0056a8] hover:underline block mt-0.5">
                {siteData.phoneNumber}
              </a>
              <div className="text-[11px] text-emerald-600 font-bold mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>24/7 Open — All Days</span>
              </div>
            </div>
          </div>

          {/* Card 2: Official WhatsApp Logo SVG */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-cyan-100 flex items-center gap-4 hover:shadow-lg transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform">
              <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">WhatsApp</div>
              <a
                href={`https://wa.me/${cleanPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-emerald-600 hover:underline block mt-0.5"
              >
                {siteData.phoneNumber}
              </a>
              <div className="text-[11px] text-gray-500 mt-0.5">Quick replies, 24/7 active</div>
            </div>
          </div>

          {/* Card 3: Email Envelope SVG */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-cyan-100 flex items-center gap-4 hover:shadow-lg transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#0056a8] to-[#00b4d8] text-white flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform">
              <svg className="w-6 h-6 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">Email Us</div>
              <a href={`mailto:${siteData.email}`} className="text-xs font-bold text-[#0056a8] hover:underline block mt-0.5">
                {siteData.email}
              </a>
              <div className="text-[11px] text-gray-500 mt-0.5">24/7 Email response</div>
            </div>
          </div>

        </div>

        {/* Main Enquiry Form Container */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-cyan-100 flex flex-col lg:flex-row">
          
          {/* Left Dark Blue Panel */}
          <div className="w-full lg:w-1/3 bg-[#002b49] text-white p-8 sm:p-10 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold font-serif">Send an Enquiry</h3>
              <p className="text-xs text-cyan-100/90 leading-relaxed">
                Tell us about your water purification needs and we will get back to you with the best solution and pricing.
              </p>

              {/* Info Items */}
              <div className="space-y-4 pt-2 text-xs">
                
                {/* Pin Location */}
                <div className="flex items-center gap-3">
                  <span className="text-rose-400 text-base">📍</span>
                  <span className="font-medium text-slate-200">Andhra Pradesh, India — HQ</span>
                </div>

                {/* Working Hours */}
                <div className="flex items-center gap-3">
                  <span className="text-amber-400 text-base">⏰</span>
                  <span className="font-semibold text-emerald-300">24/7 — Open All 7 Days (365 Days Working)</span>
                </div>

                {/* Service Visits */}
                <div className="flex items-center gap-3">
                  <span className="text-cyan-400 text-base">🚚</span>
                  <span className="font-medium text-slate-200">On-site visits available 24/7</span>
                </div>

              </div>
            </div>

            {/* Bottom Preview Box */}
            <div className="rounded-2xl overflow-hidden border border-cyan-500/20 bg-slate-900/40 h-36">
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&auto=format&fit=crop&q=80"
                alt="Support Team"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          </div>

          {/* Right White Form Panel */}
          <div className="w-full lg:w-2/3 p-8 sm:p-10 bg-white">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl font-bold mx-auto">
                  ✓
                </div>
                <h4 className="text-2xl font-bold text-[#001e3c]">Enquiry Sent to WhatsApp & Company Support!</h4>
                <p className="text-xs text-gray-600 max-w-sm mx-auto">
                  Your enquiry has been dispatched directly to <span className="font-bold text-[#001e3c]">{siteData.phoneNumber}</span>. Our 24/7 team will respond immediately!
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 rounded-xl bg-[#00a8cc] text-white text-xs font-bold hover:bg-[#008cae]"
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Your Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="Ravi Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#f4f9fd] border border-cyan-100 text-xs font-medium focus:outline-none focus:border-[#00a8cc] focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Phone / WhatsApp *</label>
                    <input
                      required
                      type="tel"
                      placeholder="+91 xxxxxxxxxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#f4f9fd] border border-cyan-100 text-xs font-semibold focus:outline-none focus:border-[#00a8cc] focus:bg-white transition"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      placeholder="Vijayawada"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#f4f9fd] border border-cyan-100 text-xs font-medium focus:outline-none focus:border-[#00a8cc] focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Service Required</label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#f4f9fd] border border-cyan-100 text-xs font-medium focus:outline-none focus:border-[#00a8cc] focus:bg-white transition"
                    >
                      <option value="">Select service...</option>
                      <option value="House Water Purifier">House Water Purifier</option>
                      <option value="Commercial RO Plant">Commercial RO Plant</option>
                      <option value="Same-Day Service & Repair">24/7 Service & Repair</option>
                      <option value="AMC Contract">Annual Maintenance (AMC)</option>
                      <option value="Spare Parts">Spare Parts & Filters</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us more about your requirement..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#f4f9fd] border border-cyan-100 text-xs font-medium focus:outline-none focus:border-[#00a8cc] focus:bg-white transition"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#00a8cc] hover:bg-[#008cae] text-white text-sm font-bold shadow-md transition hover:scale-[1.005]"
                  >
                    Send Enquiry →
                  </button>
                </div>

              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  )
}
