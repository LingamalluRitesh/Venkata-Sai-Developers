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
import { CheckCircle } from 'lucide-react';

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

      {/* Floating Quick Contact Buttons (WhatsApp & Direct Call) */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-2.5">
        <a
          href="https://wa.me/918978815621?text=Hi%20Venkata%20Sai%20Developers%2C%20I%20am%20interested%20in%20Kondaveedu%20Venture%20Plots"
          target="_blank"
          rel="noreferrer"
          className="w-12 h-12 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform border border-emerald-400/40"
          title="Chat on WhatsApp (+91 89788 15621)"
        >
          <span className="text-xl">💬</span>
        </a>
        <a
          href="tel:+919030903364"
          className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform border border-blue-400/40"
          title="Call Venkata Sai Developers (+91 90309 03364)"
        >
          <span className="text-xl">📞</span>
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
