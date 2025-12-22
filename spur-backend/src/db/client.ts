import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

export const pool = new Pool({
  connectionString: process.env.PG_CONNECTION_STRING,
  // SSL handled via ?sslmode=require in connection string
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
