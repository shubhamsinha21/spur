"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./client");
async function runMigrations() {
    await client_1.pool.query(`
    CREATE TABLE IF NOT EXISTS conversations (
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT NOW(),
      metadata JSONB
    );
  `);
    await client_1.pool.query(`
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
