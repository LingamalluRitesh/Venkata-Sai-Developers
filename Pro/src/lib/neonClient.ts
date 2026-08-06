import { Inquiry, Project, SiteVisit } from '../types';

// NOTE: Standard PostgreSQL databases (Render, CockroachDB, Supabase direct URLs)
// cannot be accessed directly from a browser because browsers block raw TCP socket
// connections on port 5432 due to CORS/security restrictions.
// The @neondatabase/serverless library only works with Neon's HTTP proxy endpoints (ep-xxx.neon.tech).
// For this website, all data is safely stored in browser localStorage and React state.
// Leads and site visits are stored client-side and can be viewed in the Admin Portal.

export class NeonService {
  // Database sync is disabled in browser environment to prevent white page crashes.
  // All data (gallery images, plots, inquiries, site visits) is stored in localStorage.
  public static isConfigured(): boolean {
    return false;
  }

  public static async syncProjectToNeon(_project: Project): Promise<boolean> {
    return false;
  }

  public static async fetchProjectsFromNeon(): Promise<Project[] | null> {
    return null;
  }

  public static async syncInquiryToNeon(_inquiry: Inquiry): Promise<boolean> {
    return false;
  }

  public static async syncSiteVisitToNeon(_visit: SiteVisit): Promise<boolean> {
    return false;
  }
}
