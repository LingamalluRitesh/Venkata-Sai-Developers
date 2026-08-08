import { Project, SiteVisit, Inquiry } from '../types';
import { KONDAVEEDU_PROJECT } from '../data/initialData';

const CLOUD_DB_ENDPOINT = 'https://jsonblob.com/api/jsonBlob/019fdd35-6266-7c3f-9f73-a1ebf3d9dc9d';

export class CloudDbService {
  // Sync all projects and gallery image URLs to Live Cloud Database
  public static async syncProjectsToCloud(projects: Project[], siteVisits?: SiteVisit[], inquiries?: Inquiry[]): Promise<boolean> {
    try {
      const cleanedProjects = projects.map((p) => ({
        ...KONDAVEEDU_PROJECT,
        ...p,
        location: p.location || KONDAVEEDU_PROJECT.location,
        priceRangeSqYd: p.priceRangeSqYd || KONDAVEEDU_PROJECT.priceRangeSqYd,
        keyFeatures: (Array.isArray(p.keyFeatures) && p.keyFeatures.length > 0) ? p.keyFeatures : KONDAVEEDU_PROJECT.keyFeatures,
        galleryImages: (p.galleryImages || []).filter((img) => !img.startsWith('data:')),
      }));

      // Read existing data first if siteVisits/inquiries not passed
      let currentVisits = siteVisits;
      let currentInquiries = inquiries;

      if (!currentVisits || !currentInquiries) {
        const currentData = await this.fetchCloudData();
        if (currentData) {
          if (!currentVisits) currentVisits = currentData.siteVisits || [];
          if (!currentInquiries) currentInquiries = currentData.inquiries || [];
        }
      }

      const res = await fetch(CLOUD_DB_ENDPOINT, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          projects: cleanedProjects,
          siteVisits: currentVisits || [],
          inquiries: currentInquiries || []
        }),
      });

      return res.ok;
    } catch (err) {
      console.warn('Cloud DB sync failed:', err);
      return false;
    }
  }

  // Sync site visits to Live Cloud Database so Admin sees customer bookings from all devices
  public static async syncVisitsToCloud(siteVisits: SiteVisit[], inquiries?: Inquiry[]): Promise<boolean> {
    try {
      const cloudData = await this.fetchCloudData();
      const projects = cloudData?.projects || [KONDAVEEDU_PROJECT];
      const inqs = inquiries || cloudData?.inquiries || [];

      const res = await fetch(CLOUD_DB_ENDPOINT, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          projects,
          siteVisits,
          inquiries: inqs
        }),
      });
      return res.ok;
    } catch (err) {
      console.warn('Sync visits to cloud failed:', err);
      return false;
    }
  }

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

  // Helper for backward compatibility
  public static async fetchProjectsFromCloud(): Promise<Project[] | null> {
    const data = await this.fetchCloudData();
    return data ? data.projects : null;
  }
}
