import axios from 'axios';

const BASE = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/+$/, '');
export const http = axios.create({
  baseURL: BASE, // '' なら同一オリジン
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});
