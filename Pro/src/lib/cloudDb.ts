import { Project, SiteVisit, Inquiry } from '../types';
import { KONDAVEEDU_PROJECT } from '../data/initialData';

const CLOUD_DB_ENDPOINT = 'https://jsonblob.com/api/jsonBlob/019fdd35-6266-7c3f-9f73-a1ebf3d9dc9d';

// Safe lead merging utilities — NEVER re-add leads that were explicitly deleted by Admin
export const mergeVisitsById = (existing: SiteVisit[], incoming: SiteVisit[], deletedIds: string[] = []): SiteVisit[] => {
  const deletedSet = new Set(deletedIds);
  const map = new Map<string, SiteVisit>();
  (existing || []).forEach((v) => { if (v && v.id && !deletedSet.has(v.id)) map.set(v.id, v); });
  (incoming || []).forEach((v) => { if (v && v.id && !deletedSet.has(v.id)) map.set(v.id, v); });
  return Array.from(map.values()).sort((a, b) => 
    new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
  );
};

export const mergeInquiriesById = (existing: Inquiry[], incoming: Inquiry[], deletedIds: string[] = []): Inquiry[] => {
  const deletedSet = new Set(deletedIds);
  const map = new Map<string, Inquiry>();
  (existing || []).forEach((i) => { if (i && i.id && !deletedSet.has(i.id)) map.set(i.id, i); });
  (incoming || []).forEach((i) => { if (i && i.id && !deletedSet.has(i.id)) map.set(i.id, i); });
  return Array.from(map.values()).sort((a, b) => 
    new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
  );
};

export class CloudDbService {
  // Fetch full cloud database object { projects, siteVisits, inquiries }
  public static async fetchCloudData(): Promise<{ projects: Project[]; siteVisits: SiteVisit[]; inquiries: Inquiry[] } | null> {
    try {
      const res = await fetch(CLOUD_DB_ENDPOINT, {
        headers: { 'Accept': 'application/json' }
      });
      if (!res.ok) return null;
      const json = await res.json();
      if (json) {
        let projects: Project[] = [KONDAVEEDU_PROJECT];
        if (Array.isArray(json.projects) && json.projects.length > 0) {
          projects = json.projects.map((p: any) => ({
            ...KONDAVEEDU_PROJECT,
            ...p,
            location: p.location || KONDAVEEDU_PROJECT.location,
            priceRangeSqYd: p.priceRangeSqYd || KONDAVEEDU_PROJECT.priceRangeSqYd,
            keyFeatures: (Array.isArray(p.keyFeatures) && p.keyFeatures.length > 0)
              ? p.keyFeatures
              : KONDAVEEDU_PROJECT.keyFeatures,
            galleryImages: (Array.isArray(p.galleryImages) && p.galleryImages.length > 0)
              ? p.galleryImages
              : KONDAVEEDU_PROJECT.galleryImages,
          }));
        }

        return {
          projects,
          siteVisits: Array.isArray(json.siteVisits) ? json.siteVisits : [],
          inquiries: Array.isArray(json.inquiries) ? json.inquiries : [],
        };
      }
    } catch (err) {
      console.warn('Cloud DB fetch failed:', err);
    }
    return null;
  }

  // Sync projects SAFELY — NEVER overwrite siteVisits or inquiries if cloud fetch fails
  public static async syncProjectsToCloud(projects: Project[]): Promise<boolean> {
    try {
      const currentData = await this.fetchCloudData();
      
      // CRITICAL GUARD: If current cloud data failed to fetch, do not overwrite to prevent wiping siteVisits/inquiries
      if (!currentData || !Array.isArray(currentData.siteVisits)) {
        console.warn('Skipping projects cloud sync to preserve existing siteVisits.');
        return false;
      }

      const cleanedProjects = projects.map((p) => ({
        ...KONDAVEEDU_PROJECT,
        ...p,
        location: p.location || KONDAVEEDU_PROJECT.location,
        priceRangeSqYd: p.priceRangeSqYd || KONDAVEEDU_PROJECT.priceRangeSqYd,
        keyFeatures: (Array.isArray(p.keyFeatures) && p.keyFeatures.length > 0) ? p.keyFeatures : KONDAVEEDU_PROJECT.keyFeatures,
        galleryImages: (Array.isArray(p.galleryImages) && p.galleryImages.length > 0) ? p.galleryImages : KONDAVEEDU_PROJECT.galleryImages,
      }));

      const res = await fetch(CLOUD_DB_ENDPOINT, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          projects: cleanedProjects,
          siteVisits: currentData.siteVisits,
          inquiries: currentData.inquiries || []
        }),
      });

      return res.ok;
    } catch (err) {
      console.warn('Cloud DB sync projects failed:', err);
      return false;
    }
  }

  // Add a new Site Visit directly to Cloud DB (merging safely with zero data loss)
  public static async addSiteVisitToCloud(newVisit: SiteVisit, localVisits: SiteVisit[] = []): Promise<SiteVisit[]> {
    try {
      const currentData = await this.fetchCloudData();
      const existingVisits = (currentData && Array.isArray(currentData.siteVisits)) ? currentData.siteVisits : [];
      
      // MERGE ALL VISITS (Cloud + Local + New Visit) by unique ID — NEVER DELETE PREVIOUS VISITS
      const updatedVisits = mergeVisitsById(mergeVisitsById(existingVisits, localVisits), [newVisit]);

      const projects = (currentData && Array.isArray(currentData.projects) && currentData.projects.length > 0) 
        ? currentData.projects 
        : [KONDAVEEDU_PROJECT];

      const inquiries = (currentData && Array.isArray(currentData.inquiries)) 
        ? currentData.inquiries 
        : [];

      await fetch(CLOUD_DB_ENDPOINT, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          projects,
          siteVisits: updatedVisits,
          inquiries
        }),
      });

      // Dispatch Web3Forms Email Alert to venkatasaidevelopersinfo@gmail.com
      try {
        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: 'b0c79329-873b-4861-8280-99933ab74844',
            subject: `🚗 NEW SITE VISIT: ${newVisit.name} (${newVisit.visitDate})`,
            from_name: 'Venkata Sai Developers Web Portal',
            email: 'venkatasaidevelopersinfo@gmail.com',
            message: `CUSTOMER SITE VISIT BOOKED:\n\nName: ${newVisit.name}\nPhone: ${newVisit.phone}\nDate: ${newVisit.visitDate}\nTime: ${newVisit.timeSlot}\nPlot: ${newVisit.preferredPlotNumber || 'General'}\nPickup: ${newVisit.pickupRequested ? 'YES' : 'NO'}\nAddress: ${newVisit.pickupAddress || 'N/A'}`
          })
        }).catch(() => {});
      } catch (e) {}

      return updatedVisits;
    } catch (err) {
      console.warn('Add site visit to cloud failed:', err);
      return mergeVisitsById(localVisits, [newVisit]);
    }
  }

  // Add a new Inquiry directly to Cloud DB (merging safely with zero data loss)
  public static async addInquiryToCloud(newInquiry: Inquiry, localInquiries: Inquiry[] = []): Promise<Inquiry[]> {
    try {
      const currentData = await this.fetchCloudData();
      const existingInquiries = (currentData && Array.isArray(currentData.inquiries)) ? currentData.inquiries : [];
      
      // MERGE ALL INQUIRIES (Cloud + Local + New Inquiry) by unique ID — NEVER DELETE PREVIOUS INQUIRIES
      const updatedInquiries = mergeInquiriesById(mergeInquiriesById(existingInquiries, localInquiries), [newInquiry]);

      const projects = (currentData && Array.isArray(currentData.projects) && currentData.projects.length > 0) 
        ? currentData.projects 
        : [KONDAVEEDU_PROJECT];

      const siteVisits = (currentData && Array.isArray(currentData.siteVisits)) 
        ? currentData.siteVisits 
        : [];

      await fetch(CLOUD_DB_ENDPOINT, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          projects,
          siteVisits,
          inquiries: updatedInquiries
        }),
      });

      // Dispatch Web3Forms Email Alert to venkatasaidevelopersinfo@gmail.com
      try {
        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: 'b0c79329-873b-4861-8280-99933ab74844',
            subject: `📩 NEW PROPERTY ENQUIRY: ${newInquiry.name}`,
            from_name: 'Venkata Sai Developers Web Portal',
            email: 'venkatasaidevelopersinfo@gmail.com',
            message: `NEW PROPERTY ENQUIRY RECEIVED:\n\nName: ${newInquiry.name}\nPhone: ${newInquiry.phone}\nEmail: ${newInquiry.email || 'N/A'}\nProject: ${newInquiry.projectName}\nPlot: ${newInquiry.plotNumber || 'General'}\nMessage: ${newInquiry.message}`
          })
        }).catch(() => {});
      } catch (e) {}

      return updatedInquiries;
    } catch (err) {
      console.warn('Add inquiry to cloud failed:', err);
      return mergeInquiriesById(localInquiries, [newInquiry]);
    }
  }

  // Explicitly overwrite siteVisits and inquiries in Cloud DB (used when Admin deletes an invalid lead)
  public static async overwriteVisitsAndInquiriesInCloud(siteVisits: SiteVisit[], inquiries: Inquiry[]): Promise<boolean> {
    try {
      const currentData = await this.fetchCloudData();
      const res = await fetch(CLOUD_DB_ENDPOINT, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          projects: currentData?.projects || [KONDAVEEDU_PROJECT],
          siteVisits,
          inquiries
        }),
      });
      return res.ok;
    } catch (err) {
      console.warn('Overwrite visits and inquiries in cloud failed:', err);
      return false;
    }
  }

  // Sync site visits or inquiries status updates to Cloud DB
  public static async syncVisitsToCloud(siteVisits: SiteVisit[], inquiries?: Inquiry[]): Promise<boolean> {
    try {
      const currentData = await this.fetchCloudData();
      const res = await fetch(CLOUD_DB_ENDPOINT, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          projects: currentData?.projects || [KONDAVEEDU_PROJECT],
          siteVisits: mergeVisitsById(currentData?.siteVisits || [], siteVisits),
          inquiries: mergeInquiriesById(currentData?.inquiries || [], inquiries || [])
        }),
      });
      return res.ok;
    } catch (err) {
      console.warn('Sync visits to cloud failed:', err);
      return false;
    }
  }

  // Helper for backward compatibility
  public static async fetchProjectsFromCloud(): Promise<Project[] | null> {
    const data = await this.fetchCloudData();
    return data ? data.projects : null;
  }
}
