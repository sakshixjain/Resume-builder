import mysql from "mysql2/promise";

// Database configuration with environment variables and sensible defaults
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "resume_builder",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

let pool: mysql.Pool | null = null;
let isInitialized = false;

/**
 * Get or create MySQL Connection Pool
 */
export function getDbPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool(dbConfig);
  }
  return pool;
}

/**
 * Initialize database and required tables (users, resumes) automatically
 */
export async function initializeDatabase(): Promise<void> {
  if (isInitialized) return;

  try {
    // 1. Create connection without database first to ensure database exists
    const setupConn = await mysql.createConnection({
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password,
    });

    await setupConn.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    await setupConn.end();

    // 2. Now connect to the database and create tables
    const db = getDbPool();

    // Users table
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NULL,
        image VARCHAR(512) NULL,
        provider VARCHAR(32) DEFAULT 'credentials',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        reset_token VARCHAR(32) NULL,
        reset_token_expiry BIGINT NULL,
        INDEX idx_email (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Resumes table (for user saved resumes)
    await db.query(`
      CREATE TABLE IF NOT EXISTS user_resumes (
        id VARCHAR(64) PRIMARY KEY,
        user_id VARCHAR(64) NOT NULL,
        title VARCHAR(255) NOT NULL DEFAULT 'Untitled Resume',
        resume_data LONGTEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_user (user_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Download logs table
    await db.query(`
      CREATE TABLE IF NOT EXISTS download_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id VARCHAR(64) NOT NULL,
        user_email VARCHAR(255) NOT NULL,
        template_used VARCHAR(64) NULL,
        downloaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_user_download (user_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Seed default demo user if table is empty
    const [existingUsers]: any = await db.query("SELECT COUNT(*) as cnt FROM users");
    const count = existingUsers?.[0]?.cnt || 0;
    if (count === 0) {
      const bcrypt = await import("bcryptjs");
      const demoHashedPassword = await bcrypt.default.hash("password123", 10);
      await db.query(
        "INSERT INTO users (id, name, email, password_hash, provider) VALUES (?, ?, ?, ?, ?)",
        ["usr_demo_1", "Alex Morgan", "demo@quickcv.com", demoHashedPassword, "credentials"]
      );
      console.log("🌱 Default demo user seeded in MySQL database (demo@quickcv.com / password123)");
    }

    isInitialized = true;
    console.log("✅ MySQL Database & Tables initialized successfully.");
  } catch (err) {
    console.error("❌ MySQL initialization warning/error:", err);
    // Don't crash immediately so fallback/error handling can report informative messages
  }
}

/**
 * Execute a SQL query with parameter binding
 */
export async function query<T = any>(sql: string, params?: any[]): Promise<T> {
  await initializeDatabase();
  const db = getDbPool();
  const [results] = await db.execute(sql, params);
  return results as T;
}
