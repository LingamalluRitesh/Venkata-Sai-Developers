import { Project, SiteVisit, Inquiry } from '../types';
import { KONDAVEEDU_PROJECT } from '../data/initialData';

const CLOUD_DB_ENDPOINT = 'https://api.restful-api.dev/objects/ff8081819ff5b11001a00b0297de2d5c';

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
      const responseJson = await res.json();
      const json = responseJson?.data || responseJson;
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
            galleryImages: (Array.isArray(p.galleryImages) ? p.galleryImages : [])
              .filter((url: any) => typeof url === 'string' && !url.startsWith('data:image/')),
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

  public static async syncProjectsToCloud(projects: Project[]): Promise<boolean> {
    try {
      const currentData = await this.fetchCloudData();
      const existingVisits = (currentData && Array.isArray(currentData.siteVisits)) ? currentData.siteVisits : [];
      const existingInquiries = (currentData && Array.isArray(currentData.inquiries)) ? currentData.inquiries : [];

      const cleanedProjects = projects.map((p) => ({
        ...KONDAVEEDU_PROJECT,
        ...p,
        location: p.location || KONDAVEEDU_PROJECT.location,
        priceRangeSqYd: p.priceRangeSqYd || KONDAVEEDU_PROJECT.priceRangeSqYd,
        keyFeatures: (Array.isArray(p.keyFeatures) && p.keyFeatures.length > 0) ? p.keyFeatures : KONDAVEEDU_PROJECT.keyFeatures,
        galleryImages: (Array.isArray(p.galleryImages) ? p.galleryImages : [])
          .filter((url: any) => typeof url === 'string' && !url.startsWith('data:image/')),
      }));

      const res = await fetch(CLOUD_DB_ENDPOINT, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          name: "Venkata Sai Developers Cloud DB",
          data: {
            projects: cleanedProjects,
            siteVisits: existingVisits,
            inquiries: existingInquiries
          }
        }),
      });
      return res.ok;
    } catch (err) {
      console.warn('Cloud DB sync projects failed:', err);
      return false;
    }
  }

  public static async addSiteVisitToCloud(newVisit: SiteVisit, localVisits: SiteVisit[] = []): Promise<SiteVisit[]> {
    try {
      const currentData = await this.fetchCloudData();
      const existingVisits = (currentData && Array.isArray(currentData.siteVisits)) ? currentData.siteVisits : [];
      
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
          name: "Venkata Sai Developers Cloud DB",
          data: {
            projects,
            siteVisits: updatedVisits,
            inquiries
          }
        }),
      });

      // Dispatch Web3Forms Email Alert
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

  public static async addInquiryToCloud(newInquiry: Inquiry, localInquiries: Inquiry[] = []): Promise<Inquiry[]> {
    try {
      const currentData = await this.fetchCloudData();
      const existingInquiries = (currentData && Array.isArray(currentData.inquiries)) ? currentData.inquiries : [];
      
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
          name: "Venkata Sai Developers Cloud DB",
          data: {
            projects,
            siteVisits,
            inquiries: updatedInquiries
          }
        }),
      });

      // Dispatch Web3Forms Email Alert
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
          name: "Venkata Sai Developers Cloud DB",
          data: {
            projects: currentData?.projects || [KONDAVEEDU_PROJECT],
            siteVisits,
            inquiries
          }
        }),
      });
      return res.ok;
    } catch (err) {
      console.warn('Overwrite visits and inquiries in cloud failed:', err);
      return false;
    }
  }

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
          name: "Venkata Sai Developers Cloud DB",
          data: {
            projects: currentData?.projects || [KONDAVEEDU_PROJECT],
            siteVisits: mergeVisitsById(currentData?.siteVisits || [], siteVisits),
            inquiries: mergeInquiriesById(currentData?.inquiries || [], inquiries || [])
          }
        }),
      });
      return res.ok;
    } catch (err) {
      console.warn('Sync visits to cloud failed:', err);
      return false;
    }
  }

  public static async fetchProjectsFromCloud(): Promise<Project[] | null> {
    const data = await this.fetchCloudData();
    return data ? data.projects : null;
  }
}
