import { neon } from '@neondatabase/serverless';
import { Inquiry, SiteVisit } from '../types';

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
      console.warn('Sync inquiry to Neon failed (falling back to local storage):', err);
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
      console.warn('Sync site visit to Neon failed (falling back to local storage):', err);
      return false;
    }
  }
}
