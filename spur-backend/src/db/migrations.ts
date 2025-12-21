import { pool } from './client';

async function runMigrations() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS conversations (
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT NOW(),
      metadata JSONB
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id UUID PRIMARY KEY,
      conversation_id UUID REFERENCES conversations(id),
      sender VARCHAR(10) CHECK(sender IN ('user','ai')),
      text TEXT,
      timestamp TIMESTAMP DEFAULT NOW()
    );
  `);

  console.log('Migrations ran successfully');
  process.exit(0);
}

runMigrations().catch(console.error);
