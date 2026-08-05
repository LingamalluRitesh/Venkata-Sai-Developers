import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroVideoSection } from './components/HeroVideoSection';
import { KondaveeduVenture } from './components/KondaveeduVenture';
import { LandValueCalculator } from './components/LandValueCalculator';
import { UpcomingProjects } from './components/UpcomingProjects';
import { FounderPage } from './components/FounderPage';
import { AdminPortal } from './components/AdminPortal';
import { AdminLogin } from './components/AdminLogin';
import { Footer } from './components/Footer';
import { SiteVisitModal } from './components/SiteVisitModal';
import { InquiryModal } from './components/InquiryModal';
import { SplashScreen } from './components/SplashScreen';
import { CheckCircle, MessageCircle, PhoneCall } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab, toastMessage, isAdminAuthenticated } = useApp();
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Opening Animation with Company Logo */}
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300">
          <CheckCircle className="w-5 h-5 text-blue-400 shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {activeTab !== 'ADMIN_PORTAL' || isAdminAuthenticated ? <Navbar /> : null}

      <main className="flex-1">
        {activeTab === 'USER_HOME' && (
          <>
            <HeroVideoSection />
            <KondaveeduVenture />
            <LandValueCalculator />
            <UpcomingProjects />
          </>
        )}

        {activeTab === 'KONDAVEEDU_VENTURE' && <KondaveeduVenture />}

        {activeTab === 'FOUNDER_PAGE' && <FounderPage />}

        {activeTab === 'LAND_CALCULATOR' && <LandValueCalculator />}

        {activeTab === 'UPCOMING_PROJECTS' && <UpcomingProjects />}

        {activeTab === 'ADMIN_PORTAL' && (
          isAdminAuthenticated ? <AdminPortal /> : <AdminLogin />
        )}
      </main>

      {activeTab !== 'ADMIN_PORTAL' || isAdminAuthenticated ? <Footer /> : null}

      {/* Floating Quick Contact Buttons (Official WhatsApp & Phone Call Icons) */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
        <a
          href="https://wa.me/918978815621?text=Hi%20Venkata%20Sai%20Developers%2C%20I%20am%20interested%20in%20Kondaveedu%20Venture%20Plots"
          target="_blank"
          rel="noreferrer"
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform group"
          title="Chat on WhatsApp (+91 89788 15621)"
        >
          <img src="/whatsapp_icon.png" alt="WhatsApp Chat" className="w-full h-full object-contain drop-shadow-lg" />
        </a>
        <a
          href="tel:+919030903364"
          className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform group overflow-hidden"
          title="Call Venkata Sai Developers (+91 90309 03364)"
        >
          <img src="/phone_icon.png" alt="Call Office" className="w-full h-full object-contain drop-shadow-lg rounded-2xl" />
        </a>
      </div>

      {/* Global Modals */}
      <SiteVisitModal />
      <InquiryModal />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
