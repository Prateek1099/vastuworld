import { sql as vercelSql } from "@vercel/postgres";
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

// Determine if we should use local SQLite or Vercel Postgres
const useLocalDb = !process.env.POSTGRES_URL;

let db: any = null;
if (useLocalDb) {
  const dbPath = path.join(process.cwd(), "local.db");
  db = new Database(dbPath);
  
  // Initialize tables if they don't exist
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS consultations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      property_type TEXT NOT NULL,
      question TEXT NOT NULL,
      image_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
    
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      category TEXT,
      message TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Safely add image_url column if database already existed without it
  try {
    db.exec("ALTER TABLE consultations ADD COLUMN image_url TEXT;");
  } catch (e) {
    // Column already exists, ignore
  }
}

export async function sql(strings: TemplateStringsArray, ...values: any[]) {
  if (!useLocalDb) {
    // If Vercel Postgres is configured, use it normally.
    return vercelSql(strings, ...values);
  }

  // Convert template literal to SQLite parameterized query format (using '?')
  const query = strings.reduce((acc, str, i) => acc + str + (i < values.length ? '?' : ''), '');
  
  try {
    const stmt = db.prepare(query);
    // If it's a SELECT or contains RETURNING, we want to get the rows back
    if (query.trim().toUpperCase().startsWith('SELECT') || query.toUpperCase().includes('RETURNING')) {
      const rows = stmt.all(...values);
      return { rows };
    } else {
      const info = stmt.run(...values);
      return { rowCount: info.changes, rows: [] };
    }
  } catch (error) {
    console.error("Local SQLite DB Error executing query:", query, error);
    throw error;
  }
}
