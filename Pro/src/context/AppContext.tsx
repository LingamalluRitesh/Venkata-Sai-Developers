import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminSettings, Inquiry, Plot, PlotStatus, Project, SiteVisit, ActiveTab, FounderInfo } from '../types';
import { INITIAL_INQUIRIES, INITIAL_PLOTS, INITIAL_SETTINGS, INITIAL_SITE_VISITS, INITIAL_UPCOMING_PROJECTS, KONDAVEEDU_PROJECT, INITIAL_FOUNDER } from '../data/initialData';
import { NeonService } from '../lib/neonClient';

interface AppContextType {
  settings: AdminSettings;
  updateSettings: (newSettings: Partial<AdminSettings>) => void;
  founder: FounderInfo;
  updateFounder: (updated: Partial<FounderInfo>) => void;
  isAdminAuthenticated: boolean;
  loginAdmin: (email: string, pass: string) => boolean;
  logoutAdmin: () => void;
  kondaveeduProject: Project;
  updateKondaveeduProject: (updated: Partial<Project>) => void;
  allProjects: Project[];
  activeProject: Project;
  setActiveProject: (project: Project) => void;
  addProject: (newProj: Omit<Project, 'id'>) => void;
  updateProject: (id: string, updated: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  upcomingProjects: Project[];
  plots: Plot[];
  updatePlot: (id: string, updated: Partial<Plot>) => void;
  addPlot: (newPlot: Omit<Plot, 'id' | 'totalPrice'>) => void;
  inquiries: Inquiry[];
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => Promise<void>;
  updateInquiryStatus: (id: string, status: Inquiry['status']) => void;
  siteVisits: SiteVisit[];
  addSiteVisit: (visit: Omit<SiteVisit, 'id' | 'createdAt' | 'status'>) => Promise<void>;
  updateSiteVisitStatus: (id: string, status: SiteVisit['status']) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  
  // Modals
  isInquiryModalOpen: boolean;
  setIsInquiryModalOpen: (open: boolean) => void;
  isSiteVisitModalOpen: boolean;
  setIsSiteVisitModalOpen: (open: boolean) => void;
  selectedPlotForModal: Plot | null;
  setSelectedPlotForModal: (plot: Plot | null) => void;
  
  // Toast notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_SETTINGS = 'sree_realestate_settings_v1';
const LOCAL_STORAGE_KEY_FOUNDER = 'sree_realestate_founder_v1';
const LOCAL_STORAGE_KEY_PLOTS = 'sree_realestate_plots_v1';
const LOCAL_STORAGE_KEY_PROJECT = 'sree_realestate_project_v1';
const LOCAL_STORAGE_KEY_INQUIRIES = 'sree_realestate_inquiries_v1';
const LOCAL_STORAGE_KEY_VISITS = 'sree_realestate_visits_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AdminSettings>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_SETTINGS);
    if (saved) {
      const parsed = JSON.parse(saved);
      parsed.contactPhone = '+91 90309 03364';
      parsed.whatsappPhone = '+91 89788 15621';
      parsed.officeAddress = 'Annapurna Nagar 6/2, Door No. 130-6-185, Gorantla, Guntur, Andhra Pradesh – 522034';
      return parsed;
    }
    return INITIAL_SETTINGS;
  });

  const [founder, setFounder] = useState<FounderInfo>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_FOUNDER);
    return saved ? JSON.parse(saved) : INITIAL_FOUNDER;
  });

  const [allProjects, setAllProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('sree_all_projects_v1');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
    return [KONDAVEEDU_PROJECT];
  });

  const kondaveeduProject = allProjects[0] || KONDAVEEDU_PROJECT;

  const [activeProjectState, setActiveProjectState] = useState<Project>(kondaveeduProject);

  const activeProject = allProjects.find((p) => p.id === activeProjectState.id) || kondaveeduProject;

  useEffect(() => {
    localStorage.setItem('sree_all_projects_v1', JSON.stringify(allProjects));
  }, [allProjects]);

  const [upcomingProjects] = useState<Project[]>(INITIAL_UPCOMING_PROJECTS);

  const [plots, setPlots] = useState<Plot[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_PLOTS);
    return saved ? JSON.parse(saved) : INITIAL_PLOTS;
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_INQUIRIES);
    return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
  });

  const [siteVisits, setSiteVisits] = useState<SiteVisit[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_VISITS);
    return saved ? JSON.parse(saved) : INITIAL_SITE_VISITS;
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('USER_HOME');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('sree_admin_auth') === 'true';
  });

  // URL listener for #admin or /admin
  useEffect(() => {
    const checkUrlForAdmin = () => {
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      if (hash.includes('admin') || search.includes('admin') || path.includes('admin')) {
        setActiveTab('ADMIN_PORTAL');
      }
    };

    checkUrlForAdmin();
    window.addEventListener('hashchange', checkUrlForAdmin);
    window.addEventListener('popstate', checkUrlForAdmin);

    return () => {
      window.removeEventListener('hashchange', checkUrlForAdmin);
      window.removeEventListener('popstate', checkUrlForAdmin);
    };
  }, []);

  const loginAdmin = (email: string, pass: string): boolean => {
    // Dummy credential check
    if ((email.trim().toLowerCase() === 'admin@venkatasaidevelopers.com' || email.trim() === 'admin') && pass === 'admin123') {
      setIsAdminAuthenticated(true);
      localStorage.setItem('sree_admin_auth', 'true');
      showToast('Admin logged in successfully!');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('sree_admin_auth');
    setActiveTab('USER_HOME');
    window.location.hash = '';
    showToast('Admin logged out.');
  };

  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [isSiteVisitModalOpen, setIsSiteVisitModalOpen] = useState(false);
  const [selectedPlotForModal, setSelectedPlotForModal] = useState<Plot | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Sync to local storage & Neon DB
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_SETTINGS, JSON.stringify(settings));
    if (settings.neonDatabaseUrl) {
      NeonService.setDbUrl(settings.neonDatabaseUrl);
    }
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_FOUNDER, JSON.stringify(founder));
  }, [founder]);

  const updateFounder = (updated: Partial<FounderInfo>) => {
    setFounder((prev) => ({ ...prev, ...updated }));
    showToast('Founder profile details updated!');
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PROJECT, JSON.stringify(kondaveeduProject));
  }, [kondaveeduProject]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PLOTS, JSON.stringify(plots));
  }, [plots]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_INQUIRIES, JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_VISITS, JSON.stringify(siteVisits));
  }, [siteVisits]);

  const updateSettings = (newSettings: Partial<AdminSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      if (newSettings.neonDatabaseUrl) {
        NeonService.setDbUrl(newSettings.neonDatabaseUrl);
      }
      return updated;
    });
    showToast('Admin settings updated successfully!');
  };

  const updateKondaveeduProject = (updated: Partial<Project>) => {
    setAllProjects((prev) =>
      prev.map((p, idx) => (idx === 0 ? { ...p, ...updated } : p))
    );
    showToast('Venture details updated!');
  };

  const addProject = (newProjData: Omit<Project, 'id'>) => {
    const id = `project-${Date.now()}`;
    const newProj: Project = { ...newProjData, id };
    setAllProjects((prev) => [...prev, newProj]);
    setActiveProjectState(newProj);
    showToast(`New Venture "${newProj.title}" created successfully!`);
  };

  const updateProject = (id: string, updated: Partial<Project>) => {
    setAllProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
    showToast('Venture updated successfully!');
  };

  const deleteProject = (id: string) => {
    if (allProjects.length <= 1) {
      showToast('Cannot delete the last remaining venture.');
      return;
    }
    setAllProjects((prev) => prev.filter((p) => p.id !== id));
    if (activeProject.id === id) {
      const remaining = allProjects.filter((p) => p.id !== id);
      setActiveProjectState(remaining[0]);
    }
    showToast('Venture deleted.');
  };

  const updatePlot = (id: string, updated: Partial<Plot>) => {
    setPlots((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const newSize = updated.sizeSqYd ?? p.sizeSqYd;
          const newPrice = updated.pricePerSqYd ?? p.pricePerSqYd;
          const totalPrice = newSize * newPrice;
          return { ...p, ...updated, totalPrice };
        }
        return p;
      })
    );
    showToast('Plot details updated!');
  };

  const addPlot = (newPlotData: Omit<Plot, 'id' | 'totalPrice'>) => {
    const id = `p-${Date.now()}`;
    const totalPrice = newPlotData.sizeSqYd * newPlotData.pricePerSqYd;
    const newPlot: Plot = { ...newPlotData, id, totalPrice };
    setPlots((prev) => [newPlot, ...prev]);
    showToast(`Plot ${newPlot.plotNumber} added to inventory!`);
  };

  const addInquiry = async (inquiryData: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInquiry: Inquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };
    setInquiries((prev) => [newInquiry, ...prev]);
    await NeonService.syncInquiryToNeon(newInquiry);
    showToast('Inquiry submitted successfully! Our representative will contact you shortly.');
  };

  const updateInquiryStatus = async (id: string, status: Inquiry['status']) => {
    setInquiries((prev) =>
      prev.map((inq) => {
        if (inq.id === id) {
          const updated = { ...inq, status };
          NeonService.syncInquiryToNeon(updated);
          return updated;
        }
        return inq;
      })
    );
    showToast('Inquiry status updated.');
  };

  const addSiteVisit = async (visitData: Omit<SiteVisit, 'id' | 'createdAt' | 'status'>) => {
    const newVisit: SiteVisit = {
      ...visitData,
      id: `visit-${Date.now()}`,
      status: 'SCHEDULED',
      createdAt: new Date().toISOString(),
    };
    setSiteVisits((prev) => [newVisit, ...prev]);
    await NeonService.syncSiteVisitToNeon(newVisit);
    showToast(`Site visit scheduled for ${newVisit.visitDate}! Check booking details.`);
  };

  const updateSiteVisitStatus = async (id: string, status: SiteVisit['status']) => {
    setSiteVisits((prev) =>
      prev.map((v) => {
        if (v.id === id) {
          const updated = { ...v, status };
          NeonService.syncSiteVisitToNeon(updated);
          return updated;
        }
        return v;
      })
    );
    showToast('Site visit status updated.');
  };

  return (
    <AppContext.Provider
      value={{
        settings,
        updateSettings,
        founder,
        updateFounder,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        kondaveeduProject,
        updateKondaveeduProject,
        allProjects,
        activeProject,
        setActiveProject: setActiveProjectState,
        addProject,
        updateProject,
        deleteProject,
        upcomingProjects,
        plots,
        updatePlot,
        addPlot,
        inquiries,
        addInquiry,
        updateInquiryStatus,
        siteVisits,
        addSiteVisit,
        updateSiteVisitStatus,
        activeTab,
        setActiveTab,
        isInquiryModalOpen,
        setIsInquiryModalOpen,
        isSiteVisitModalOpen,
        setIsSiteVisitModalOpen,
        selectedPlotForModal,
        setSelectedPlotForModal,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
