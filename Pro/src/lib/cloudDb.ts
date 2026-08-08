import { Project, SiteVisit, Inquiry } from '../types';
import { KONDAVEEDU_PROJECT } from '../data/initialData';

const CLOUD_DB_ENDPOINT = 'https://jsonblob.com/api/jsonBlob/019fdd35-6266-7c3f-9f73-a1ebf3d9dc9d';

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

  // Sync projects without overwriting siteVisits or inquiries
  public static async syncProjectsToCloud(projects: Project[]): Promise<boolean> {
    try {
      const currentData = await this.fetchCloudData();
      const cleanedProjects = projects.map((p) => ({
        ...KONDAVEEDU_PROJECT,
        ...p,
        location: p.location || KONDAVEEDU_PROJECT.location,
        priceRangeSqYd: p.priceRangeSqYd || KONDAVEEDU_PROJECT.priceRangeSqYd,
        keyFeatures: (Array.isArray(p.keyFeatures) && p.keyFeatures.length > 0) ? p.keyFeatures : KONDAVEEDU_PROJECT.keyFeatures,
        galleryImages: (p.galleryImages || []).filter((img) => !img.startsWith('data:')),
      }));

      const res = await fetch(CLOUD_DB_ENDPOINT, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          projects: cleanedProjects,
          siteVisits: currentData?.siteVisits || [],
          inquiries: currentData?.inquiries || []
        }),
      });

      return res.ok;
    } catch (err) {
      console.warn('Cloud DB sync projects failed:', err);
      return false;
    }
  }

  // Add a new Site Visit directly to Cloud DB (merging safely)
  public static async addSiteVisitToCloud(newVisit: SiteVisit): Promise<SiteVisit[]> {
    try {
      const currentData = await this.fetchCloudData();
      const existingVisits = currentData?.siteVisits || [];
      const updatedVisits = [newVisit, ...existingVisits.filter((v) => v.id !== newVisit.id)];

      await fetch(CLOUD_DB_ENDPOINT, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          projects: currentData?.projects || [KONDAVEEDU_PROJECT],
          siteVisits: updatedVisits,
          inquiries: currentData?.inquiries || []
        }),
      });
      return updatedVisits;
    } catch (err) {
      console.warn('Add site visit to cloud failed:', err);
      return [newVisit];
    }
  }

  // Update site visits array in Cloud DB
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
          siteVisits,
          inquiries: inquiries || currentData?.inquiries || []
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
