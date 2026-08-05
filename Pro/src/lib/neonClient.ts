import { neon } from '@neondatabase/serverless';
import { Inquiry, Plot, Project, SiteVisit, AdminSettings } from '../types';

export const NEON_SCHEMA_SQL = `-- Neon Serverless Database Schema for Real Estate App
CREATE TABLE IF NOT EXISTS admin_settings (
  id INT PRIMARY KEY DEFAULT 1,
  venture_name TEXT NOT NULL,
  tagline TEXT,
  logo_url TEXT,
  contact_phone TEXT,
  contact_email TEXT,
  office_address TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  tagline TEXT,
  category TEXT NOT NULL,
  is_upcoming BOOLEAN DEFAULT FALSE,
  location TEXT NOT NULL,
  distance_from_ghat_road_meters INT,
  price_range_sqyd TEXT,
  description TEXT,
  key_features JSONB,
  hero_image TEXT,
  gallery_images JSONB,
  brochure_url TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS plots (
  id TEXT PRIMARY KEY,
  plot_number TEXT NOT NULL,
  size_sqyd INT NOT NULL,
  facing TEXT NOT NULL,
  price_per_sqyd INT NOT NULL,
  total_price INT NOT NULL,
  status TEXT NOT NULL,
  dimensions TEXT,
  is_corner BOOLEAN DEFAULT FALSE,
  block TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS inquiries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  project_name TEXT NOT NULL,
  plot_number TEXT,
  message TEXT,
  status TEXT DEFAULT 'PENDING',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS site_visits (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  visit_date TEXT NOT NULL,
  time_slot TEXT NOT NULL,
  pickup_requested BOOLEAN DEFAULT FALSE,
  pickup_address TEXT,
  preferred_plot_number TEXT,
  status TEXT DEFAULT 'SCHEDULED',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

export class NeonService {
  private static dbUrl: string | null = import.meta.env.VITE_NEON_DATABASE_URL || null;

  public static setDbUrl(url: string) {
    this.dbUrl = url.trim();
  }

  public static getDbUrl(): string | null {
    return this.dbUrl;
  }

  public static isConfigured(): boolean {
    return !!this.dbUrl && this.dbUrl.startsWith('postgres');
  }

  public static async testConnection(connectionString?: string): Promise<{ success: boolean; message: string }> {
    const connStr = connectionString || this.dbUrl;
    if (!connStr) {
      return { success: false, message: 'No Neon Postgres Database URL provided. Using browser storage.' };
    }
    try {
      const sql = neon(connStr);
      const result = await sql`SELECT NOW() as current_time;`;
      if (result && result.length > 0) {
        return { success: true, message: `Successfully connected to Neon DB! Server time: ${result[0].current_time}` };
      }
      return { success: false, message: 'Connected, but received empty response.' };
    } catch (err: any) {
      console.error('Neon DB Connection error:', err);
      return { success: false, message: `Connection failed: ${err.message || err}` };
    }
  }

  public static async initTables(connectionString?: string): Promise<{ success: boolean; message: string }> {
    const connStr = connectionString || this.dbUrl;
    if (!connStr) {
      return { success: false, message: 'Please enter a valid Neon DATABASE_URL.' };
    }
    try {
      const sql = neon(connStr);
      // Execute schema creation
      await sql`
        CREATE TABLE IF NOT EXISTS inquiries (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          phone TEXT NOT NULL,
          email TEXT,
          project_name TEXT NOT NULL,
          plot_number TEXT,
          message TEXT,
          status TEXT DEFAULT 'PENDING',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS site_visits (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          phone TEXT NOT NULL,
          visit_date TEXT NOT NULL,
          time_slot TEXT NOT NULL,
          pickup_requested BOOLEAN DEFAULT FALSE,
          preferred_plot_number TEXT,
          status TEXT DEFAULT 'SCHEDULED',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;
      return { success: true, message: 'Tables initialized successfully in Neon Postgres database!' };
    } catch (err: any) {
      return { success: false, message: `Schema execution error: ${err.message || err}` };
    }
  }

  public static async syncInquiryToNeon(inquiry: Inquiry): Promise<boolean> {
    if (!this.isConfigured()) return false;
    try {
      const sql = neon(this.dbUrl!);
      await sql`
        INSERT INTO inquiries (id, name, phone, email, project_name, plot_number, message, status)
        VALUES (${inquiry.id}, ${inquiry.name}, ${inquiry.phone}, ${inquiry.email || ''}, ${inquiry.projectName}, ${inquiry.plotNumber || ''}, ${inquiry.message}, ${inquiry.status})
        ON CONFLICT (id) DO UPDATE SET status = ${inquiry.status};
      `;
      return true;
    } catch (err) {
      console.warn('Sync to Neon failed (falling back to local):', err);
      return false;
    }
  }

  public static async syncSiteVisitToNeon(visit: SiteVisit): Promise<boolean> {
    if (!this.isConfigured()) return false;
    try {
      const sql = neon(this.dbUrl!);
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
