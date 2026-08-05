import { useState } from 'react'
import { useRealEstate } from '../context/RealEstateContext'

export default function ScheduleTourModal() {
  const { tourModalProperty: p, setTourModalProperty, addTourBooking } = useRealEstate()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '10:00 AM',
    tourType: 'In-Person Tour' as 'In-Person Tour' | '3D Virtual Video Tour',
    message: ''
  })

  const [submitted, setSubmitted] = useState(false)

  if (!p) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addTourBooking({
      propertyId: p.id,
      propertyTitle: p.title,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: formData.date,
      time: formData.time,
      tourType: formData.tourType,
      message: formData.message
    })

    setSubmitted(true)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl text-white p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
              SCHEDULE A PRIVATE TOUR
            </div>
            <h3 className="text-xl font-bold font-serif text-white">{p.title}</h3>
          </div>
          <button
            onClick={() => {
              setTourModalProperty(null)
              setSubmitted(false)
            }}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center font-bold"
          >
            ✕
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl font-bold mx-auto border border-emerald-500/30">
              ✓
            </div>
            <h4 className="text-2xl font-bold text-white font-serif">Tour Scheduled Successfully!</h4>
            <p className="text-xs text-slate-300 max-w-xs mx-auto">
              Our agent <strong className="text-amber-400">{p.agent.name}</strong> will contact you at {formData.phone} to confirm your {formData.tourType} on {formData.date} at {formData.time}.
            </p>
            <button
              onClick={() => {
                setTourModalProperty(null)
                setSubmitted(false)
              }}
              className="px-6 py-2.5 rounded-full bg-amber-400 text-slate-950 font-bold text-xs"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Tour Type selector */}
            <div className="grid grid-cols-2 gap-3 p-1 rounded-xl bg-slate-950 border border-slate-800">
              {(['In-Person Tour', '3D Virtual Video Tour'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, tourType: type }))}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition ${
                    formData.tourType === type
                      ? 'bg-amber-400 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Inputs */}
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Your Full Name *</label>
              <input
                required
                type="text"
                placeholder="Ravi Kumar"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Phone Number *</label>
                <input
                  required
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Email Address *</label>
                <input
                  required
                  type="email"
                  placeholder="ravi@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Preferred Date *</label>
                <input
                  required
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Preferred Time *</label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                  <option value="06:00 PM">06:00 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Special Requirements / Notes</label>
              <textarea
                rows={3}
                placeholder="Any specific questions or features you'd like to inspect..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white focus:outline-none focus:border-amber-400 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-xs shadow-lg transition"
            >
              Confirm Tour Request →
            </button>

          </form>
        )}

      </div>
    </div>
  )
}
