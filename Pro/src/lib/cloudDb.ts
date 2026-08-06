import { Project } from '../types';
import { KONDAVEEDU_PROJECT } from '../data/initialData';

const CLOUD_DB_ENDPOINT = 'https://jsonblob.com/api/jsonBlob/019fd6d6-d429-7a16-be15-ade1053b9fe1';

export class CloudDbService {
  // Sync all projects and gallery image URLs to Live Cloud Database
  public static async syncProjectsToCloud(projects: Project[]): Promise<boolean> {
    try {
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
        body: JSON.stringify({ projects: cleanedProjects }),
      });

      return res.ok;
    } catch (err) {
      console.warn('Cloud DB sync failed:', err);
      return false;
    }
  }

  // Fetch live projects and gallery images from Live Cloud Database for all visitors on all devices
  public static async fetchProjectsFromCloud(): Promise<Project[] | null> {
    try {
      const res = await fetch(CLOUD_DB_ENDPOINT, {
        headers: { 'Accept': 'application/json' }
      });
      if (!res.ok) return null;
      const json = await res.json();
      if (json && Array.isArray(json.projects) && json.projects.length > 0) {
        return json.projects.map((p: any) => ({
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
    } catch (err) {
      console.warn('Cloud DB fetch failed:', err);
    }
    return null;
  }
}
