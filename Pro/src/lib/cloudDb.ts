import { Project } from '../types';

const CLOUD_DB_OBJECT_ID = 'ff8081819f7e10ae019fd6beda5101cf';
const CLOUD_DB_ENDPOINT = `https://api.restful-api.dev/objects/${CLOUD_DB_OBJECT_ID}`;

export class CloudDbService {
  // Sync all projects and gallery image URLs to Live Cloud Database
  public static async syncProjectsToCloud(projects: Project[]): Promise<boolean> {
    try {
      // Filter out heavy base64 strings if any, only sync clean image URLs
      const cleanedProjects = projects.map((p) => ({
        ...p,
        galleryImages: (p.galleryImages || []).filter((img) => !img.startsWith('data:')),
      }));

      const res = await fetch(CLOUD_DB_ENDPOINT, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'venkata_sai_projects',
          data: { projects: cleanedProjects },
        }),
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
      const res = await fetch(CLOUD_DB_ENDPOINT);
      if (!res.ok) return null;
      const json = await res.json();
      if (json && json.data && Array.isArray(json.data.projects) && json.data.projects.length > 0) {
        return json.data.projects;
      }
    } catch (err) {
      console.warn('Cloud DB fetch failed:', err);
    }
    return null;
  }
}
