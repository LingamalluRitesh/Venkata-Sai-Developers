import { neon } from '@neondatabase/serverless';
import { Inquiry, Project, SiteVisit } from '../types';

export class NeonService {
  // Reads connection URL strictly from environment variables (.env file or Render Environment Settings)
  private static getDbUrl(): string {
    return (
      (import.meta as any).env?.VITE_NEON_DATABASE_URL ||
      (import.meta as any).env?.VITE_DATABASE_URL ||
      ''
    ).trim();
  }

  public static isConfigured(): boolean {
    const url = this.getDbUrl();
    return !!url && url.startsWith('postgres');
  }

  public static async syncProjectToNeon(project: Project): Promise<boolean> {
    if (!this.isConfigured()) return false;
    try {
      const sql = neon(this.getDbUrl());
      const galleryJson = JSON.stringify(project.galleryImages || []);
      const featuresJson = JSON.stringify(project.keyFeatures || []);

      await sql`
        INSERT INTO projects (
          id, title, tagline, category, is_upcoming, location, distance_from_ghat_road_meters,
          price_range_sqyd, description, key_features, hero_image, gallery_images, brochure_url
        )
        VALUES (
          ${project.id}, ${project.title}, ${project.tagline || ''}, ${project.category},
          ${project.isUpcoming || false}, ${project.location}, ${project.distanceFromGhatRoadMeters || 200},
          ${project.priceRangeSqYd || ''}, ${project.description || ''}, ${featuresJson},
          ${project.heroImage || ''}, ${galleryJson}, ${project.brochureUrl || ''}
        )
        ON CONFLICT (id) DO UPDATE SET
          title = ${project.title},
          tagline = ${project.tagline || ''},
          hero_image = ${project.heroImage || ''},
          gallery_images = ${galleryJson},
          brochure_url = ${project.brochureUrl || ''},
          updated_at = CURRENT_TIMESTAMP;
      `;
      return true;
    } catch (err) {
      console.warn('Sync project/gallery to Neon failed:', err);
      return false;
    }
  }

  public static async fetchProjectsFromNeon(): Promise<Project[] | null> {
    if (!this.isConfigured()) return null;
    try {
      const sql = neon(this.getDbUrl());
      const rows = await sql`SELECT * FROM projects ORDER BY updated_at DESC;`;
      if (!rows || rows.length === 0) return null;

      return rows.map((r: any) => ({
        id: r.id,
        title: r.title,
        tagline: r.tagline || '',
        category: r.category || 'VILLA_PLOTS',
        isUpcoming: r.is_upcoming || false,
        location: r.location || '',
        distanceFromGhatRoadMeters: r.distance_from_ghat_road_meters || 200,
        priceRangeSqYd: r.price_range_sqyd || '',
        description: r.description || '',
        keyFeatures: Array.isArray(r.key_features) ? r.key_features : JSON.parse(r.key_features || '[]'),
        heroImage: r.hero_image || '',
        galleryImages: Array.isArray(r.gallery_images) ? r.gallery_images : JSON.parse(r.gallery_images || '[]'),
        brochureUrl: r.brochure_url || ''
      }));
    } catch (err) {
      console.warn('Fetch projects from Neon failed:', err);
      return null;
    }
  }

  public static async syncInquiryToNeon(inquiry: Inquiry): Promise<boolean> {
    if (!this.isConfigured()) return false;
    try {
      const sql = neon(this.getDbUrl());
      await sql`
        INSERT INTO inquiries (id, name, phone, email, project_name, plot_number, message, status)
        VALUES (${inquiry.id}, ${inquiry.name}, ${inquiry.phone}, ${inquiry.email || ''}, ${inquiry.projectName}, ${inquiry.plotNumber || ''}, ${inquiry.message}, ${inquiry.status})
        ON CONFLICT (id) DO UPDATE SET status = ${inquiry.status};
      `;
      return true;
    } catch (err) {
      console.warn('Sync inquiry to Neon failed:', err);
      return false;
    }
  }

  public static async syncSiteVisitToNeon(visit: SiteVisit): Promise<boolean> {
    if (!this.isConfigured()) return false;
    try {
      const sql = neon(this.getDbUrl());
      await sql`
        INSERT INTO site_visits (id, name, phone, visit_date, time_slot, pickup_requested, pickup_address, preferred_plot_number, status)
        VALUES (${visit.id}, ${visit.name}, ${visit.phone}, ${visit.visitDate}, ${visit.timeSlot}, ${visit.pickupRequested}, ${visit.pickupAddress || ''}, ${visit.preferredPlotNumber || ''}, ${visit.status})
        ON CONFLICT (id) DO UPDATE SET status = ${visit.status};
      `;
      return true;
    } catch (err) {
      console.warn('Sync site visit to Neon failed:', err);
      return false;
    }
  }
}
