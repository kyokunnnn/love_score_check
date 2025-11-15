import { Pool } from 'pg';

const isProd = process.env.NODE_ENV === 'production';
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // 例: ローカル postgres://postgres:postgres@localhost:5432/love_score_check
  ssl: isProd ? { rejectUnauthorized: false } : undefined, // 本番のみ（RenderはDSNに ?sslmode=require でもOK）
});
export default pool;
