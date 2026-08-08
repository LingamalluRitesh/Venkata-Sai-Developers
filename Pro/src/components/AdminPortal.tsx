import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plot, PlotStatus, FacingDirection, Project } from '../types';
import { 
  Users, 
  Layers, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  ArrowLeft,
  Calendar,
  Building,
  FileText,
  FolderOpen,
  Loader2,
  CloudUpload,
  Settings as SettingsIcon
} from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const { 
    settings, 
    updateSettings, 
    founder,
    updateFounder,
    logoutAdmin,
    allProjects,
    setActiveProject,
    addProject,
    updateProject,
    deleteProject,
    kondaveeduProject, 
    plots, 
    updatePlot, 
    addPlot, 
    inquiries, 
    updateInquiryStatus, 
    deleteInquiry,
    siteVisits, 
    updateSiteVisitStatus, 
    deleteSiteVisit,
    setActiveTab,
    showToast
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'LEADS' | 'VENTURES' | 'PLOTS' | 'GALLERY' | 'SETTINGS'>('LEADS');

  // Selected Venture ID for Gallery editing
  const [selectedVentureIdForGallery, setSelectedVentureIdForGallery] = useState<string>(kondaveeduProject.id);

  // New Plot form state
  const [showAddPlotForm, setShowAddPlotForm] = useState(false);
  const [newPlotNumber, setNewPlotNumber] = useState('');
  const [newPlotSize, setNewPlotSize] = useState<number>(200);
  const [newPlotFacing, setNewPlotFacing] = useState<FacingDirection>('EAST');
  const [newPlotPrice, setNewPlotPrice] = useState<number>(16500);
  const [newPlotBlock, setNewPlotBlock] = useState('Block A');
  const [newPlotDimensions, setNewPlotDimensions] = useState("36' x 50'");
  const [newPlotIsCorner, setNewPlotIsCorner] = useState(false);

  // Create New Venture Form state
  const [showAddVentureForm, setShowAddVentureForm] = useState(false);
  const [newVentureTitle, setNewVentureTitle] = useState('');
  const [newVentureTagline, setNewVentureTagline] = useState('');
  const [newVentureCategory, setNewVentureCategory] = useState<Project['category']>('VILLA_PLOTS');
  const [newVentureLocation, setNewVentureLocation] = useState('Kondaveedu Ghat Road Sector');
  const [newVentureDistance, setNewVentureDistance] = useState<number>(200);
  const [newVenturePriceRange, setNewVenturePriceRange] = useState('₹14,500 - ₹18,500 per Sq.Yd');
  const [newVentureDescription, setNewVentureDescription] = useState('');
  const [newVentureHeroImage, setNewVentureHeroImage] = useState('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80');
  const [newVentureBrochureUrl, setNewVentureBrochureUrl] = useState('');

  // Gallery URL input state
  const [newGalleryUrl, setNewGalleryUrl] = useState('');

  const handleAddPlotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlotNumber) return;
    addPlot({
      plotNumber: newPlotNumber,
      sizeSqYd: newPlotSize,
      facing: newPlotFacing,
      pricePerSqYd: newPlotPrice,
      status: 'AVAILABLE',
      block: newPlotBlock,
      dimensions: newPlotDimensions,
      isCorner: newPlotIsCorner
    });
    setShowAddPlotForm(false);
    setNewPlotNumber('');
  };

  const handleCreateVentureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVentureTitle) return;
    addProject({
      title: newVentureTitle,
      tagline: newVentureTagline || 'Premium Layout Venture',
      category: newVentureCategory,
      isUpcoming: false,
      location: newVentureLocation,
      distanceFromGhatRoadMeters: newVentureDistance,
      priceRangeSqYd: newVenturePriceRange,
      description: newVentureDescription || 'Master-planned layout venture with prime connectivity.',
      keyFeatures: ['CRDA Approved Blueprint', 'Blacktop Internal Roads', 'Underground Utility Pipeline', '24/7 Security Entry Arch'],
      heroImage: newVentureHeroImage,
      galleryImages: [newVentureHeroImage],
      brochureUrl: newVentureBrochureUrl
    });
    setShowAddVentureForm(false);
    setNewVentureTitle('');
    setNewVentureTagline('');
    setNewVentureBrochureUrl('');
  };

  // Target venture for gallery editing
  const targetGalleryVenture = allProjects.find((p) => p.id === selectedVentureIdForGallery) || kondaveeduProject;

  const [isUploadingToCloud, setIsUploadingToCloud] = useState(false);

  // Converts & compresses image file into permanent Data URL (never expires, never auto-deletes)
  const processImageFile = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      if (!file || !file.type.startsWith('image/')) {
        resolve('');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (!event.target?.result) {
          resolve('');
          return;
        }
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 600;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', 0.70);
          resolve(compressed);
        };
        img.onerror = () => resolve('');
        img.src = event.target.result as string;
      };
      reader.onerror = () => resolve('');
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = (file: File, callback: (dataUrl: string) => void) => {
    processImageFile(file).then((url) => {
      if (url) callback(url);
    });
  };

  const MAX_GALLERY_PHOTOS = 20;

  const handleAddGalleryImage = () => {
    const currentImages = targetGalleryVenture.galleryImages || [];
    if (currentImages.length >= MAX_GALLERY_PHOTOS) {
      alert(`Maximum ${MAX_GALLERY_PHOTOS} photos allowed per venture. Please remove an existing photo before adding a new one.`);
      return;
    }
    if (!newGalleryUrl.trim()) {
      alert('Please enter an Image URL or use the Browse File button.');
      return;
    }
    const updatedGallery = [...currentImages, newGalleryUrl.trim()];
    updateProject(targetGalleryVenture.id, { galleryImages: updatedGallery });
    setNewGalleryUrl('');
    showToast('Photo added to gallery successfully!');
  };

  const handleRemoveGalleryImage = (indexToRemove: number) => {
    const currentImages = targetGalleryVenture.galleryImages || [];
    if (currentImages.length <= 1) {
      alert('Venture gallery must have at least one photo.');
      return;
    }
    const updatedGallery = currentImages.filter((_, idx) => idx !== indexToRemove);
    updateProject(targetGalleryVenture.id, { galleryImages: updatedGallery });
    showToast('Photo removed from gallery.');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      
      {/* Admin Top Header */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white py-10 border-b border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5 backdrop-blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-black text-[11px] rounded-full uppercase tracking-wider shadow-md">
                  Admin Control Portal
                </span>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-bold rounded-full">
                  ⚡ Live Cloud Database Synced (All Devices)
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black mt-2 tracking-tight text-white drop-shadow-md">
                Management Dashboard — {settings.ventureName}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium max-w-2xl">
                Manage customer leads, scheduled field visits with pickup addresses, venture layouts, plot pricing, photo galleries, and office details.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => {
                  setActiveTab('USER_HOME');
                  window.location.hash = '';
                }}
                className="btn-glossy btn-glossy-white px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-lg"
              >
                <ArrowLeft className="w-4 h-4 text-slate-900" />
                Website View
              </button>

              <button
                onClick={logoutAdmin}
                className="btn-glossy btn-glossy-amber px-4 py-2.5 rounded-xl text-xs font-extrabold shadow-lg"
              >
                Log Out
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/10">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <span className="block text-2xl font-black text-white">{inquiries.length}</span>
              <span className="text-xs text-slate-300 font-semibold">Total Customer Enquiries</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <span className="block text-2xl font-black text-emerald-400">{siteVisits.length}</span>
              <span className="text-xs text-slate-300 font-semibold">Scheduled Site Visits</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <span className="block text-2xl font-black text-amber-300">{allProjects.length}</span>
              <span className="text-xs text-slate-300 font-semibold">Active Ventures</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <span className="block text-2xl font-black text-blue-400">{plots.length}</span>
              <span className="text-xs text-slate-300 font-semibold">Plots in Inventory</span>
            </div>
          </div>

        </div>
      </div>

      {/* Admin Tabs Bar */}
      <div className="bg-white border-b border-slate-200 shadow-md sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5 overflow-x-auto py-3.5 no-scrollbar">
            
            <button
              onClick={() => setActiveAdminTab('LEADS')}
              className={`px-5 py-3 text-xs font-black rounded-2xl transition-all flex items-center gap-2 whitespace-nowrap ${
                activeAdminTab === 'LEADS'
                  ? 'btn-glossy btn-glossy-blue shadow-lg'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Users className="w-4 h-4" />
              Enquiries & Site Visits ({inquiries.length + siteVisits.length})
            </button>

            <button
              onClick={() => setActiveAdminTab('VENTURES')}
              className={`px-5 py-3 text-xs font-black rounded-2xl transition-all flex items-center gap-2 whitespace-nowrap ${
                activeAdminTab === 'VENTURES'
                  ? 'btn-glossy btn-glossy-blue shadow-lg'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Building className="w-4 h-4" />
              Ventures & Projects ({allProjects.length})
            </button>

            <button
              onClick={() => setActiveAdminTab('PLOTS')}
              className={`px-5 py-3 text-xs font-black rounded-2xl transition-all flex items-center gap-2 whitespace-nowrap ${
                activeAdminTab === 'PLOTS'
                  ? 'btn-glossy btn-glossy-blue shadow-lg'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Layers className="w-4 h-4" />
              Plot Inventory Management ({plots.length} Plots)
            </button>

            <button
              onClick={() => setActiveAdminTab('GALLERY')}
              className={`px-5 py-3 text-xs font-black rounded-2xl transition-all flex items-center gap-2 whitespace-nowrap ${
                activeAdminTab === 'GALLERY'
                  ? 'btn-glossy btn-glossy-blue shadow-lg'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              Photo Galleries (Up to 20 Photos)
            </button>

            <button
              onClick={() => setActiveAdminTab('SETTINGS')}
              className={`px-5 py-3 text-xs font-black rounded-2xl transition-all flex items-center gap-2 whitespace-nowrap ${
                activeAdminTab === 'SETTINGS'
                  ? 'btn-glossy btn-glossy-blue shadow-lg'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <SettingsIcon className="w-4 h-4" />
              Company & Office Settings
            </button>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

        {/* ADMIN TAB 1: ENQUIRIES & SITE VISITS LEADS */}
        {activeAdminTab === 'LEADS' && (
          <div className="space-y-8">
            
            {/* Customer Inquiries Table */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    Customer Property Enquiries ({inquiries.length})
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Direct leads generated from the public website layout & plot modals.
                  </p>
                </div>
              </div>

              {inquiries.length === 0 ? (
                <p className="text-sm text-slate-500 py-8 text-center">No customer enquiries received yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 uppercase border-b border-slate-200">
                        <th className="p-3">Date</th>
                        <th className="p-3">Customer Name</th>
                        <th className="p-3">Phone / Email</th>
                        <th className="p-3">Project / Plot</th>
                        <th className="p-3">Message</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                      {inquiries.map((inq) => (
                        <tr key={inq.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3 text-slate-500 whitespace-nowrap">
                            {new Date(inq.createdAt).toLocaleDateString()}
                          </td>
                          <td className="p-3 font-bold text-slate-900">{inq.name}</td>
                          <td className="p-3">
                            <a href={`tel:${inq.phone}`} className="text-blue-700 hover:underline font-bold block">
                              {inq.phone}
                            </a>
                            {inq.email && <span className="text-[11px] text-slate-400 block">{inq.email}</span>}
                          </td>
                          <td className="p-3">
                            <span className="font-bold text-slate-800">{inq.projectName}</span>
                            {inq.plotNumber && (
                              <span className="ml-2 bg-blue-100 text-blue-800 text-[10px] font-extrabold px-2 py-0.5 rounded">
                                Plot {inq.plotNumber}
                              </span>
                            )}
                          </td>
                          <td className="p-3 max-w-xs truncate text-slate-600">{inq.message}</td>
                          <td className="p-3">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                                inq.status === 'PENDING'
                                  ? 'bg-amber-100 text-amber-800'
                                  : inq.status === 'CONTACTED'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-emerald-100 text-emerald-800'
                              }`}
                            >
                              {inq.status}
                            </span>
                          </td>
                          <td className="p-3 text-right space-x-1 whitespace-nowrap">
                            {inq.status === 'PENDING' && (
                              <button
                                onClick={() => updateInquiryStatus(inq.id, 'CONTACTED')}
                                className="px-2.5 py-1 bg-blue-600 text-white text-[11px] font-bold rounded-lg hover:bg-blue-700 cursor-pointer"
                              >
                                Mark Contacted
                              </button>
                            )}
                            {inq.status !== 'RESOLVED' && (
                              <button
                                onClick={() => updateInquiryStatus(inq.id, 'RESOLVED')}
                                className="px-2.5 py-1 bg-emerald-600 text-white text-[11px] font-bold rounded-lg hover:bg-emerald-700 cursor-pointer"
                              >
                                Resolve
                              </button>
                            )}
                            <button
                              onClick={() => {
                                if (window.confirm(`Are you sure you want to delete inquiry from "${inq.name}"?`)) {
                                  deleteInquiry(inq.id);
                                }
                              }}
                              className="px-2 py-1 bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold rounded-lg transition-colors inline-flex items-center gap-1 cursor-pointer"
                              title="Delete Invalid Inquiry"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Site Visits Table with Customer Pickup Address */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    Scheduled Site Visits ({siteVisits.length})
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Booked customer field visits including home pickup location addresses.
                  </p>
                </div>
              </div>

              {siteVisits.length === 0 ? (
                <p className="text-sm text-slate-500 py-8 text-center">No site visits scheduled yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 uppercase border-b border-slate-200">
                        <th className="p-3">Visit Date</th>
                        <th className="p-3">Slot</th>
                        <th className="p-3">Customer Name</th>
                        <th className="p-3">Phone</th>
                        <th className="p-3">Plot Interest</th>
                        <th className="p-3">Cab Pickup & Home Address</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                      {siteVisits.map((visit) => (
                        <tr key={visit.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3 font-extrabold text-slate-900">{visit.visitDate}</td>
                          <td className="p-3 text-slate-600">{visit.timeSlot}</td>
                          <td className="p-3 font-bold text-slate-900">{visit.name}</td>
                          <td className="p-3 font-bold text-blue-700">{visit.phone}</td>
                          <td className="p-3 font-semibold">{visit.preferredPlotNumber || 'Any Plot'}</td>
                          <td className="p-3 max-w-xs">
                            {visit.pickupRequested ? (
                              <div className="space-y-1">
                                <span className="bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded text-[10px] inline-block">
                                  YES (AC Cab Requested)
                                </span>
                                {visit.pickupAddress && (
                                  <p className="text-[11px] font-semibold text-slate-700 bg-slate-50 p-1.5 rounded border border-slate-200">
                                    📍 <strong>Pickup Address:</strong> {visit.pickupAddress}
                                  </p>
                                )}
                              </div>
                            ) : (
                              <span className="text-slate-400">Self Transport</span>
                            )}
                          </td>
                          <td className="p-3">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                                visit.status === 'SCHEDULED'
                                  ? 'bg-amber-100 text-amber-800'
                                  : visit.status === 'COMPLETED'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {visit.status}
                            </span>
                          </td>
                          <td className="p-3 text-right space-x-1 whitespace-nowrap">
                            {visit.status === 'SCHEDULED' && (
                              <button
                                onClick={() => updateSiteVisitStatus(visit.id, 'COMPLETED')}
                                className="px-2.5 py-1 bg-emerald-600 text-white text-[11px] font-bold rounded-lg hover:bg-emerald-700 cursor-pointer"
                              >
                                Mark Completed
                              </button>
                            )}
                            <button
                              onClick={() => {
                                if (window.confirm(`Are you sure you want to delete scheduled visit for "${visit.name}"?`)) {
                                  deleteSiteVisit(visit.id);
                                }
                              }}
                              className="px-2 py-1 bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold rounded-lg transition-colors inline-flex items-center gap-1 cursor-pointer"
                              title="Delete Invalid Visit"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        )}

        {/* ADMIN TAB 2: VENTURES & PROJECTS */}
        {activeAdminTab === 'VENTURES' && (
          <div className="space-y-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Company Ventures & Projects</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Manage active ventures or create another new venture layout with separate photos, pricing & brochures.
                </p>
              </div>

              <button
                onClick={() => setShowAddVentureForm(!showAddVentureForm)}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create New Venture
              </button>
            </div>

            {/* Create New Venture Form */}
            {showAddVentureForm && (
              <form onSubmit={handleCreateVentureSubmit} className="bg-blue-50/70 p-6 rounded-3xl border border-blue-200 space-y-4">
                <h4 className="text-sm font-extrabold text-blue-900 uppercase flex items-center gap-2">
                  <Building className="w-4 h-4 text-blue-600" />
                  Add Another Venture to Website
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700">Venture Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kondaveedu Heights Sector 2"
                      value={newVentureTitle}
                      onChange={(e) => setNewVentureTitle(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700">Tagline</label>
                    <input
                      type="text"
                      placeholder="e.g. Luxury Gated Villa Plots Near Highway"
                      value={newVentureTagline}
                      onChange={(e) => setNewVentureTagline(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700">Category</label>
                    <select
                      value={newVentureCategory}
                      onChange={(e) => setNewVentureCategory(e.target.value as Project['category'])}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                    >
                      <option value="VILLA_PLOTS">Villa Plots</option>
                      <option value="HOUSES">Eco Houses</option>
                      <option value="APARTMENTS">Apartments</option>
                      <option value="COMMERCIAL">Commercial Plots</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700">Location</label>
                    <input
                      type="text"
                      value={newVentureLocation}
                      onChange={(e) => setNewVentureLocation(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700">Price Range Text</label>
                    <input
                      type="text"
                      value={newVenturePriceRange}
                      onChange={(e) => setNewVenturePriceRange(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700">PDF Brochure URL</label>
                    <input
                      type="text"
                      placeholder="https://.../brochure.pdf"
                      value={newVentureBrochureUrl}
                      onChange={(e) => setNewVentureBrochureUrl(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700">Description</label>
                  <textarea
                    rows={3}
                    placeholder="Describe the new venture..."
                    value={newVentureDescription}
                    onChange={(e) => setNewVentureDescription(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                  />
                </div>

                {/* Hero Photo Selection with Browse Button */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700">Hero Photo (URL or Browse File)</label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      placeholder="Paste Image URL or click Browse File ->"
                      value={newVentureHeroImage}
                      onChange={(e) => setNewVentureHeroImage(e.target.value)}
                      className="flex-1 p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                    />
                    <label className="px-4 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl cursor-pointer flex items-center justify-center gap-1.5 shadow-xs">
                      <FolderOpen className="w-4 h-4 text-blue-400" />
                      <span>Browse Image File</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            handleFileUpload(e.target.files[0], (dataUrl) => {
                              setNewVentureHeroImage(dataUrl);
                              showToast('Hero photo selected from device!');
                            });
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddVentureForm(false)}
                    className="px-4 py-2 bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs"
                  >
                    Save & Publish Venture
                  </button>
                </div>
              </form>
            )}

            {/* List of All Ventures */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allProjects.map((proj) => (
                <div key={proj.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[10px] bg-blue-100 text-blue-800 font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                        {proj.category}
                      </span>
                      <h4 className="text-xl font-extrabold text-slate-900 mt-1">{proj.title}</h4>
                      <p className="text-xs text-slate-500 font-medium">{proj.tagline}</p>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setActiveProject(proj);
                          setActiveTab('KONDAVEEDU_VENTURE');
                        }}
                        className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs rounded-lg"
                      >
                        View Page
                      </button>
                      {allProjects.length > 1 && (
                        <button
                          onClick={() => deleteProject(proj.id)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                          title="Delete Venture"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 space-y-1 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <p>📍 <strong>Location:</strong> {proj.location}</p>
                    <p>💰 <strong>Price Range:</strong> {proj.priceRangeSqYd}</p>
                    <p>🖼️ <strong>Gallery Photos:</strong> {(proj.galleryImages || []).length} Photos</p>
                    {proj.brochureUrl && (
                      <p>📄 <strong>Brochure:</strong> <a href={proj.brochureUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline font-bold">PDF Link Available</a></p>
                    )}
                  </div>

                  {/* Brochure Edit Box */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                    <input
                      type="text"
                      placeholder="Update PDF Brochure URL"
                      defaultValue={proj.brochureUrl || ''}
                      onBlur={(e) => updateProject(proj.id, { brochureUrl: e.target.value })}
                      className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                    />
                    <span className="text-[11px] text-slate-400 font-medium">Auto-saves</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ADMIN TAB 3: PLOT INVENTORY MANAGEMENT */}
        {activeAdminTab === 'PLOTS' && (
          <div className="space-y-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Villa Plot Inventory Control</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Update status (Available, Booked, Sold), adjust pricing, or add new plots.
                </p>
              </div>

              <button
                onClick={() => setShowAddPlotForm(!showAddPlotForm)}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add New Villa Plot
              </button>
            </div>

            {/* New Plot Form */}
            {showAddPlotForm && (
              <form onSubmit={handleAddPlotSubmit} className="bg-blue-50/60 p-6 rounded-3xl border border-blue-200 space-y-4">
                <h4 className="text-sm font-extrabold text-blue-900 uppercase">Add New Plot to Inventory</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700">Plot Number *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. A-109"
                      value={newPlotNumber}
                      onChange={(e) => setNewPlotNumber(e.target.value)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700">Size (Sq.Yd)</label>
                    <input
                      type="number"
                      value={newPlotSize}
                      onChange={(e) => setNewPlotSize(Number(e.target.value))}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700">Facing</label>
                    <select
                      value={newPlotFacing}
                      onChange={(e) => setNewPlotFacing(e.target.value as FacingDirection)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold"
                    >
                      <option value="EAST">EAST</option>
                      <option value="WEST">WEST</option>
                      <option value="NORTH">NORTH</option>
                      <option value="SOUTH">SOUTH</option>
                      <option value="NORTH-EAST">NORTH-EAST</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700">Price / Sq.Yd (₹)</label>
                    <input
                      type="number"
                      value={newPlotPrice}
                      onChange={(e) => setNewPlotPrice(Number(e.target.value))}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddPlotForm(false)}
                    className="px-4 py-2 bg-slate-200 text-slate-700 font-bold text-xs rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 text-white font-bold text-xs rounded-lg shadow-xs"
                  >
                    Save Plot
                  </button>
                </div>
              </form>
            )}

            {/* Plot Inventory Table */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 uppercase border-b border-slate-200">
                      <th className="p-3">Plot #</th>
                      <th className="p-3">Block</th>
                      <th className="p-3">Size (Sq.Yd)</th>
                      <th className="p-3">Facing</th>
                      <th className="p-3">Price / Sq.Yd</th>
                      <th className="p-3">Total Value</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Quick Update</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
                    {plots.map((plot) => (
                      <tr key={plot.id} className="hover:bg-slate-50">
                        <td className="p-3 font-extrabold text-slate-900 text-sm">
                          {plot.plotNumber} {plot.isCorner && <span className="text-[9px] bg-amber-200 text-amber-900 px-1 rounded">CORNER</span>}
                        </td>
                        <td className="p-3 text-slate-500">{plot.block || 'Block A'}</td>
                        <td className="p-3 font-bold">{plot.sizeSqYd} Sq.Yds</td>
                        <td className="p-3 text-blue-700 font-bold">{plot.facing}</td>
                        <td className="p-3">₹{plot.pricePerSqYd.toLocaleString()}</td>
                        <td className="p-3 font-extrabold text-slate-900">₹{plot.totalPrice.toLocaleString()}</td>
                        <td className="p-3">
                          <select
                            value={plot.status}
                            onChange={(e) => updatePlot(plot.id, { status: e.target.value as PlotStatus })}
                            className={`px-2 py-1 rounded-lg text-xs font-bold ${
                              plot.status === 'AVAILABLE'
                                ? 'bg-blue-100 text-blue-800 border border-blue-300'
                                : plot.status === 'BOOKED' || plot.status === 'RESERVED'
                                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                : 'bg-rose-100 text-rose-800 border border-rose-300'
                            }`}
                          >
                            <option value="AVAILABLE">AVAILABLE</option>
                            <option value="BOOKED">BOOKED</option>
                            <option value="RESERVED">RESERVED</option>
                            <option value="SOLD">SOLD</option>
                          </select>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => {
                              const newPrice = prompt(`Enter new price per Sq.Yd for Plot ${plot.plotNumber}:`, plot.pricePerSqYd.toString());
                              if (newPrice && !isNaN(Number(newPrice))) {
                                updatePlot(plot.id, { pricePerSqYd: Number(newPrice) });
                              }
                            }}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold rounded-lg border border-slate-200"
                          >
                            Edit Price
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ADMIN TAB 4: PHOTO GALLERIES WITH FILE BROWSE OPTION */}
        {activeAdminTab === 'GALLERY' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Manage Venture Photo Galleries & PDF Brochures</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Select a venture below to browse image files from your computer or paste image URLs.
                </p>
              </div>

              {/* Select Venture dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700">Target Venture:</span>
                <select
                  value={selectedVentureIdForGallery}
                  onChange={(e) => setSelectedVentureIdForGallery(e.target.value)}
                  className="px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                >
                  {allProjects.map((p) => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Add Image Section with BROWSE FILE button */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-800 uppercase block">
                Add Photo to {targetGalleryVenture.title}
              </span>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                {/* Method A: Paste URL */}
                <div className="md:col-span-7 flex gap-2">
                  <input
                    type="text"
                    placeholder="Paste Image URL (e.g. /kondaveedu_1.png or https://...)"
                    value={newGalleryUrl}
                    onChange={(e) => setNewGalleryUrl(e.target.value)}
                    className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                  />
                  <button
                    onClick={handleAddGalleryImage}
                    className="px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1 shrink-0"
                  >
                    <Plus className="w-4 h-4" /> Add URL
                  </button>
                </div>

                <div className="md:col-span-1 text-center font-bold text-xs text-slate-400">OR</div>

                {/* Method B: Native Browse File Input with Automatic Cloud Server Upload */}
                <div className="md:col-span-4">
                  <label className={`w-full py-3 px-4 ${isUploadingToCloud ? 'bg-blue-600 cursor-wait' : 'bg-slate-900 hover:bg-slate-800 cursor-pointer'} text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all`}>
                    {isUploadingToCloud ? (
                      <>
                        <Loader2 className="w-4 h-4 text-white animate-spin shrink-0" />
                        <span>Uploading to Cloud Server...</span>
                      </>
                    ) : (
                      <>
                        <CloudUpload className="w-4 h-4 text-blue-400 shrink-0" />
                        <span>Browse & Upload to Cloud</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      disabled={isUploadingToCloud}
                      className="hidden"
                      onChange={async (e) => {
                        const selectedFiles = Array.from(e.target.files || []);
                        if (selectedFiles.length === 0) return;

                        let currentGallery = [...(targetGalleryVenture?.galleryImages || [])];
                        if (currentGallery.length >= MAX_GALLERY_PHOTOS) {
                          alert(`Maximum ${MAX_GALLERY_PHOTOS} photos allowed per venture.`);
                          return;
                        }

                        setIsUploadingToCloud(true);
                        showToast('Uploading photo(s) to Cloud Server...');

                        const uploadedUrls: string[] = [];
                        for (const file of selectedFiles) {
                          if (currentGallery.length + uploadedUrls.length >= MAX_GALLERY_PHOTOS) break;
                          const compressedUrl = await processImageFile(file);
                          if (compressedUrl) {
                            uploadedUrls.push(compressedUrl);
                          }
                        }

                        setIsUploadingToCloud(false);
                        if (uploadedUrls.length > 0) {
                          const updatedGallery = [...currentGallery, ...uploadedUrls];
                          updateProject(targetGalleryVenture.id, { galleryImages: updatedGallery });
                          showToast(`✅ ${uploadedUrls.length} photo(s) uploaded to Cloud Server! Live for all devices.`);
                        } else {
                          showToast('Upload failed. Please try again or paste an Image URL.');
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* PDF Brochure Upload / Link */}
            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200 space-y-2">
              <span className="text-xs font-bold text-blue-900 uppercase block flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-600" />
                Venture PDF Brochure Link ({targetGalleryVenture.title})
              </span>
              <input
                type="text"
                placeholder="Paste PDF Brochure URL (e.g. https://.../brochure.pdf)"
                value={targetGalleryVenture.brochureUrl || ''}
                onChange={(e) => updateProject(targetGalleryVenture.id, { brochureUrl: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-blue-200 rounded-xl text-xs font-semibold"
              />
            </div>

            {/* Gallery Grid with Delete Option */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase block">
                  Current Photos ({(targetGalleryVenture.galleryImages || []).length} / {MAX_GALLERY_PHOTOS} Max Allowed) — Click red button to remove photo
                </span>
                {(targetGalleryVenture.galleryImages || []).length > 0 && (
                  <button
                    onClick={() => {
                      if (window.confirm(`Remove ALL ${(targetGalleryVenture.galleryImages || []).length} photos from the gallery? This cannot be undone.`)) {
                        updateProject(targetGalleryVenture.id, { galleryImages: [] });
                        try {
                          const stored = JSON.parse(localStorage.getItem('sree_all_projects_v1') || '[]');
                          const updated = stored.map((p: any) =>
                            p.id === targetGalleryVenture.id ? { ...p, galleryImages: [] } : p
                          );
                          localStorage.setItem('sree_all_projects_v1', JSON.stringify(updated));
                        } catch (e) {}
                        showToast('All gallery photos cleared from cache!');
                      }
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-[11px] transition-all shadow-sm"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Clear All Cache
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {(targetGalleryVenture.galleryImages || []).map((url, idx) => (
                  <div key={idx} className="relative group rounded-2xl overflow-hidden border border-slate-200 h-44 shadow-xs">
                    <img src={url} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                    
                    {/* Delete Photo Button */}
                    <button
                      onClick={() => handleRemoveGalleryImage(idx)}
                      className="absolute top-2 right-2 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold text-[11px] shadow-md flex items-center gap-1 transition-all"
                      title="Remove Photo from Gallery"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>

                    <div className="absolute bottom-2 left-2 text-[10px] bg-slate-900/80 text-white px-2 py-0.5 rounded font-mono">
                      Photo #{idx + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ADMIN TAB 5: COMPANY & OFFICE SETTINGS */}
        {activeAdminTab === 'SETTINGS' && (
          <div className="space-y-8 max-w-4xl">
            
            {/* Office Location & Contact Settings with Browse Logo Option */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Company & Office Location Details</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Venture / Company Name</label>
                  <input
                    type="text"
                    value={settings.ventureName}
                    onChange={(e) => updateSettings({ ventureName: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Company Logo (URL or Browse File)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={settings.logoUrl}
                      onChange={(e) => updateSettings({ logoUrl: e.target.value })}
                      className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold"
                    />
                    <label className="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl cursor-pointer flex items-center gap-1 shrink-0">
                      <FolderOpen className="w-3.5 h-3.5 text-blue-400" /> Browse
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            handleFileUpload(e.target.files[0], (dataUrl) => {
                              updateSettings({ logoUrl: dataUrl });
                              showToast('Logo file updated!');
                            });
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Contact Phone (Calls)</label>
                  <input
                    type="text"
                    value={settings.contactPhone}
                    onChange={(e) => updateSettings({ contactPhone: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">WhatsApp Phone Number</label>
                  <input
                    type="text"
                    value={settings.whatsappPhone || '+91 89788 15621'}
                    onChange={(e) => updateSettings({ whatsappPhone: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Contact Email</label>
                  <input
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => updateSettings({ contactEmail: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Office Location & Address (Editable)
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter full office address..."
                  value={settings.officeAddress}
                  onChange={(e) => updateSettings({ officeAddress: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-xs font-semibold"
                />
              </div>
            </div>

            {/* Founder Info Editor with Browse Founder Photo Option */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Founder & Leadership Profile Manager</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Founder Full Name</label>
                  <input
                    type="text"
                    value={founder.name}
                    onChange={(e) => updateFounder({ name: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Designation Title</label>
                  <input
                    type="text"
                    value={founder.title}
                    onChange={(e) => updateFounder({ title: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Founder Photo (URL or Browse File)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={founder.image}
                      onChange={(e) => updateFounder({ image: e.target.value })}
                      className="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-xs font-semibold"
                    />
                    <label className="px-4 py-3 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl cursor-pointer flex items-center gap-1.5 shrink-0">
                      <FolderOpen className="w-4 h-4 text-blue-400" /> Browse Photo File
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            handleFileUpload(e.target.files[0], (dataUrl) => {
                              updateFounder({ image: dataUrl });
                              showToast('Founder photo updated!');
                            });
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
