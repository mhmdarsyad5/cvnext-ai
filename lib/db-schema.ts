"use server";

import { getDbConnection } from "./db";

let isInitialized = false;

export async function initializeSchema() {
  if (isInitialized) return;

  const sql = await getDbConnection();

  try {
    // Create users table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create cv_reviews table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS cv_reviews (
        id SERIAL PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        file_name TEXT,
        owner_name TEXT,
        analysis_text TEXT NOT NULL,
        score INTEGER NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    isInitialized = true;
    console.log("✅ Database schema initialized successfully");
  } catch (error: any) {
    console.error("❌ Error initializing database schema:", error);

    // Add specific error handling for common database issues
    if (error.code === "28P01") {
      throw new Error("Database connection failed: Invalid credentials");
    } else if (error.code === "3D000") {
      throw new Error("Database connection failed: Database does not exist");
    } else if (error.code === "ECONNREFUSED") {
      throw new Error(
        "Database connection failed: Could not connect to database server"
      );
    }

    throw error;
  }
}
