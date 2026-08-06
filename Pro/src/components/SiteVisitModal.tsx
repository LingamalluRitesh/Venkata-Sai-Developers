import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Calendar, Clock, Car, CheckCircle, Sparkles, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';

export const SiteVisitModal: React.FC = () => {
  const { isSiteVisitModalOpen, setIsSiteVisitModalOpen, addSiteVisit, plots, selectedPlotForModal } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [visitDate, setVisitDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('10:00 AM - 12:00 PM');
  const [pickupRequested, setPickupRequested] = useState(false);
  const [pickupAddress, setPickupAddress] = useState('');
  const [preferredPlot, setPreferredPlot] = useState(selectedPlotForModal?.plotNumber || 'Any Villa Plot');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isSiteVisitModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    if (pickupRequested && !pickupAddress.trim()) {
      alert('Please enter your full pickup home address so our team can travel with you!');
      return;
    }

    setIsSubmitting(true);
    await addSiteVisit({
      name,
      phone,
      visitDate,
      timeSlot,
      pickupRequested,
      pickupAddress: pickupRequested ? pickupAddress : '',
      preferredPlotNumber: preferredPlot,
    });

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    setIsSubmitting(false);
    setIsSiteVisitModalOpen(false);

    setName('');
    setPhone('');
    setPickupAddress('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white max-w-lg w-full rounded-3xl border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white p-6 relative">
          <button
            onClick={() => setIsSiteVisitModalOpen(false)}
            className="absolute top-5 right-5 p-1 text-slate-300 hover:text-white bg-white/10 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-bold uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Free Site Transport & AC Cab Pickup
          </div>
          <h3 className="text-2xl font-extrabold">Schedule Kondaveedu Site Visit</h3>
          <p className="text-xs text-slate-300 mt-1">
            Experience the 150m proximity to Kondaveedu Ghat Road in person.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Your Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Ramesh Kumar"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              required
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Preferred Date *
              </label>
              <input
                type="date"
                required
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Time Slot
              </label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-blue-500"
              >
                <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                <option value="04:30 PM - 06:00 PM">04:30 PM - 06:00 PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Preferred Villa Plot
            </label>
            <select
              value={preferredPlot}
              onChange={(e) => setPreferredPlot(e.target.value)}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-blue-500"
            >
              <option value="Any Villa Plot">Any Villa Plot (General Tour)</option>
              {plots.map((p) => (
                <option key={p.id} value={p.plotNumber}>
                  Plot {p.plotNumber} ({p.sizeSqYd} Sq.Yd - {p.facing})
                </option>
              ))}
            </select>
          </div>

          {/* Pickup Request Toggle & Address Input */}
          <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
                <Car className="w-4 h-4 text-blue-600" />
                <span>Need Free Pickup & Drop AC Cab?</span>
              </div>
              <input
                type="checkbox"
                checked={pickupRequested}
                onChange={(e) => setPickupRequested(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
              />
            </div>

            {pickupRequested && (
              <div className="pt-2 border-t border-blue-200/60 animate-in fade-in duration-200">
                <label className="block text-xs font-extrabold text-blue-950 mb-1 flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-blue-600 animate-bounce" />
                  Enter Your Full Pickup Address / Landmark (Required for AC Cab Pickup) *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="e.g. House #12-4, Near Main Gate, Guntur / Vijayawada (Our team will drive to your home)"
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                  className="w-full p-3 bg-white border border-blue-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 shadow-xs"
                />
                <span className="text-[10px] text-blue-700 font-bold block mt-1">
                  🚗 Our executive cab will arrive at your home address at the scheduled time!
                </span>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            {isSubmitting ? 'Confirming Visit...' : 'Confirm Free Site Visit Booking'}
          </button>
        </form>

      </div>
    </div>
  );
};
