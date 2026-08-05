import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Send, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const InquiryModal: React.FC = () => {
  const { isInquiryModalOpen, setIsInquiryModalOpen, addInquiry, kondaveeduProject, selectedPlotForModal } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isInquiryModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setIsSubmitting(true);
    await addInquiry({
      name,
      phone,
      email,
      projectName: kondaveeduProject.title,
      plotNumber: selectedPlotForModal?.plotNumber,
      message: message || `Inquiring about ${selectedPlotForModal ? `Plot ${selectedPlotForModal.plotNumber}` : 'Kondaveedu Villa Plots'}. Please send pricing brochure.`,
    });

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });

    setIsSubmitting(false);
    setIsInquiryModalOpen(false);

    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-3xl border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={() => setIsInquiryModalOpen(false)}
            className="absolute top-5 right-5 p-1 text-slate-300 hover:text-white bg-white/10 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
          
          <span className="text-xs text-emerald-400 font-bold uppercase block mb-1">
            {selectedPlotForModal ? `Selected Plot: ${selectedPlotForModal.plotNumber}` : 'General Inquiry'}
          </span>
          <h3 className="text-xl font-extrabold">Instant Property Inquiry</h3>
          <p className="text-xs text-slate-300 mt-1">
            Request price breakdown, layout clearance documents, and bank loan details.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Anand Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Mobile Phone Number *
            </label>
            <input
              type="tel"
              required
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Email Address (Optional)
            </label>
            <input
              type="email"
              placeholder="anand@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Message / Specific Requirements
            </label>
            <textarea
              rows={3}
              placeholder="Tell us facing preference or budget..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            {isSubmitting ? 'Sending Request...' : 'Submit Inquiry'}
          </button>
        </form>

      </div>
    </div>
  );
};
