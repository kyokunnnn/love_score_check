import { Pool } from 'pg';

const url = process.env.DATABASE_URL || '';
const host = (() => { try { return new URL(url).hostname; } catch { return '(bad URL)'; } })();

console.log('[DB INIT]', { NODE_ENV: process.env.NODE_ENV, host, urlHasSSL: /\bsslmode=/.test(url) });

export const pool = new Pool({
  connectionString: url,
  ssl: host === 'localhost' || host === '127.0.0.1' ? undefined : { rejectUnauthorized: false },
});

console.log('[DB INIT] ssl set =', host === 'localhost' ? 'off(local)' : 'rejectUnauthorized:false');
