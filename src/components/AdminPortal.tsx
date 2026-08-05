import { useState } from 'react'
import { useRealEstate, Property } from '../context/RealEstateContext'

export default function AdminPortal() {
  const { isAdminOpen, setIsAdminOpen, tourBookings, addProperty } = useRealEstate()
  const [activeTab, setActiveTab] = useState<'add-property' | 'tour-bookings'>('add-property')

  const [newProp, setNewProp] = useState({
    title: '',
    tagline: '',
    type: 'Villa' as Property['type'],
    status: 'For Sale' as Property['status'],
    price: 1500000,
    location: 'Jubilee Hills, Hyderabad',
    city: 'Hyderabad',
    address: 'Road No. 36',
    bedrooms: 4,
    bathrooms: 4,
    areaSqft: 4500,
    garages: 2,
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&auto=format&fit=crop&q=80',
    description: '',
    agentName: 'Rohan Verma',
    agentPhone: '+91 98765 43210'
  })

  const [submitted, setSubmitted] = useState(false)

  if (!isAdminOpen) return null

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const created: Property = {
      id: `prop-${Date.now()}`,
      title: newProp.title || 'New Luxury Villa',
      tagline: newProp.tagline || 'Modern luxury architectural design',
      type: newProp.type,
      status: newProp.status,
      price: Number(newProp.price),
      priceFormatted: `$${Number(newProp.price).toLocaleString()}`,
      location: newProp.location,
      city: newProp.city,
      address: newProp.address,
      bedrooms: Number(newProp.bedrooms),
      bathrooms: Number(newProp.bathrooms),
      areaSqft: Number(newProp.areaSqft),
      garages: Number(newProp.garages),
      yearBuilt: 2025,
      image: newProp.image,
      gallery: [newProp.image],
      description: newProp.description || 'Stunning contemporary property with luxury amenities.',
      amenities: ['Smart Home', 'Private Pool', 'Solar Backup', '24/7 Security'],
      agent: {
        name: newProp.agentName,
        role: 'Luxury Property Director',
        phone: newProp.agentPhone,
        email: 'agent@havenrealty.com',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80'
      },
      featured: true,
      rating: 4.9
    }

    addProperty(created)
    setSubmitted(true)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl text-white p-6 sm:p-8 space-y-6 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
              AGENT & ADMIN PORTAL
            </div>
            <h3 className="text-xl font-bold font-serif text-white">Manage Listings & Tour Requests</h3>
          </div>
          <button
            onClick={() => setIsAdminOpen(false)}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center font-bold"
          >
            ✕
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
          <button
            onClick={() => { setActiveTab('add-property'); setSubmitted(false) }}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition ${
              activeTab === 'add-property'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-300'
            }`}
          >
            + Add New Property Listing
          </button>

          <button
            onClick={() => setActiveTab('tour-bookings')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 ${
              activeTab === 'tour-bookings'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-300'
            }`}
          >
            <span>Tour Bookings</span>
            <span className="px-1.5 py-0.5 rounded-full bg-slate-950 text-amber-400 text-[10px]">
              {tourBookings.length}
            </span>
          </button>
        </div>

        {/* Tab 1: Add Property Form */}
        {activeTab === 'add-property' && (
          <div className="flex-1 overflow-y-auto pr-1">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center text-2xl font-bold mx-auto border border-amber-400/30">
                  ✓
                </div>
                <h4 className="text-2xl font-bold text-white font-serif">Property Listed Successfully!</h4>
                <p className="text-xs text-slate-300">
                  The property <strong className="text-white">{newProp.title}</strong> has been added live to the catalog.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-amber-400 text-slate-950 font-bold text-xs"
                >
                  Add Another Property
                </button>
              </div>
            ) : (
              <form onSubmit={handleAddSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Property Title *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Royal Emerald Villa"
                      value={newProp.title}
                      onChange={(e) => setNewProp({ ...newProp, title: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Tagline / Subtitle</label>
                    <input
                      type="text"
                      placeholder="e.g. Luxury estate with private pool"
                      value={newProp.tagline}
                      onChange={(e) => setNewProp({ ...newProp, tagline: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Property Type</label>
                    <select
                      value={newProp.type}
                      onChange={(e) => setNewProp({ ...newProp, type: e.target.value as any })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Villa">Villa</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Penthouse">Penthouse</option>
                      <option value="Townhouse">Townhouse</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Status</label>
                    <select
                      value={newProp.status}
                      onChange={(e) => setNewProp({ ...newProp, status: e.target.value as any })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="For Sale">For Sale</option>
                      <option value="For Rent">For Rent</option>
                      <option value="Hot Deal">Hot Deal</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Price ($) *</label>
                    <input
                      required
                      type="number"
                      value={newProp.price}
                      onChange={(e) => setNewProp({ ...newProp, price: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Bedrooms</label>
                    <input
                      type="number"
                      value={newProp.bedrooms}
                      onChange={(e) => setNewProp({ ...newProp, bedrooms: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Bathrooms</label>
                    <input
                      type="number"
                      value={newProp.bathrooms}
                      onChange={(e) => setNewProp({ ...newProp, bathrooms: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Area (Sqft)</label>
                    <input
                      type="number"
                      value={newProp.areaSqft}
                      onChange={(e) => setNewProp({ ...newProp, areaSqft: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Garages</label>
                    <input
                      type="number"
                      value={newProp.garages}
                      onChange={(e) => setNewProp({ ...newProp, garages: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">City / Region</label>
                    <input
                      type="text"
                      placeholder="e.g. Hyderabad"
                      value={newProp.city}
                      onChange={(e) => setNewProp({ ...newProp, city: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Location Area</label>
                    <input
                      type="text"
                      placeholder="e.g. Jubilee Hills"
                      value={newProp.location}
                      onChange={(e) => setNewProp({ ...newProp, location: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Main Image URL</label>
                  <input
                    type="text"
                    value={newProp.image}
                    onChange={(e) => setNewProp({ ...newProp, image: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Full Description</label>
                  <textarea
                    rows={3}
                    placeholder="Enter property details..."
                    value={newProp.description}
                    onChange={(e) => setNewProp({ ...newProp, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-xs shadow-lg transition"
                >
                  Publish New Property →
                </button>
              </form>
            )}
          </div>
        )}

        {/* Tab 2: Tour Bookings */}
        {activeTab === 'tour-bookings' && (
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {tourBookings.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                No tour bookings received yet.
              </div>
            ) : (
              tourBookings.map((b) => (
                <div key={b.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-amber-400">{b.propertyTitle}</span>
                    <span className="text-[10px] text-slate-500">{b.createdAt}</span>
                  </div>
                  <div className="text-white font-semibold">{b.name} — {b.phone} ({b.email})</div>
                  <div className="text-slate-300">
                    <span className="text-amber-400 font-bold">{b.tourType}</span> scheduled on <strong>{b.date}</strong> at <strong>{b.time}</strong>
                  </div>
                  {b.message && <div className="text-slate-400 italic">"{b.message}"</div>}
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  )
}
