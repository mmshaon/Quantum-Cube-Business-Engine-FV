
const NEON_GATEWAY = 'https://postgres.neon.tech/sql';
const CONNECTION_STRING = 'postgresql://neondb_owner:npg_r0JMzI8BETpS@ep-holy-lab-a1ns7s7m-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

export interface DBResponse {
  rows: any[];
  command: string;
  rowCount: number;
}

class NeonService {
  private static instance: NeonService;

  private constructor() {}

  public static getInstance(): NeonService {
    if (!NeonService.instance) {
      NeonService.instance = new NeonService();
    }
    return NeonService.instance;
  }

  public async query(sql: string, params: any[] = []): Promise<any[]> {
    try {
      const response = await fetch(NEON_GATEWAY, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          connectionString: CONNECTION_STRING,
          query: sql,
          params: params,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Neon Gateway Error: ${response.status} - ${errorBody}`);
      }

      const result = await response.json();
      return result.rows || result;
    } catch (err) {
      console.warn('Database Query Failed:', err);
      throw err;
    }
  }

  public async bootstrapDatabase() {
    console.log('Synchronizing Extended Schema...');
    const schema = `
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        name TEXT,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'guest',
        is_approved BOOLEAN DEFAULT FALSE,
        status TEXT DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS submissions (
        id SERIAL PRIMARY KEY,
        user_id TEXT NOT NULL,
        type TEXT NOT NULL, -- task_report, demand, expense
        content JSONB NOT NULL, -- multiple items
        media_data TEXT, -- base64 image/proof
        status TEXT DEFAULT 'pending', -- pending, approved, rejected
        admin_feedback TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS notifications (
        id SERIAL PRIMARY KEY,
        user_id TEXT NOT NULL,
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS audit_logs (
        id SERIAL PRIMARY KEY,
        actor_id TEXT,
        action TEXT,
        metadata JSONB,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    return this.query(schema);
  }

  public async checkConnection(): Promise<boolean> {
    try {
      const result = await this.query('SELECT 1 as connected');
      return result && result.length > 0;
    } catch (e) {
      return false;
    }
  }
}

export const db = NeonService.getInstance();
