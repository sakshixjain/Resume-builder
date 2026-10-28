import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

// Load .env manually without external dependencies
try {
  if (process.loadEnvFile) {
    process.loadEnvFile();
  } else {
    const envPath = path.resolve(process.cwd(), ".env");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      for (const line of content.split("\n")) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
          const [key, ...vals] = trimmed.split("=");
          process.env[key.trim()] = vals.join("=").trim();
        }
      }
    }
  }
} catch {}

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/resume_builder";
const dbName = process.env.MONGODB_DB_NAME || "resume_builder";

console.log(`Connecting to MongoDB at: ${uri}`);
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db(dbName);

    console.log(`Creating indexes & collections in '${dbName}'...`);

    // 1. Users collection
    const users = db.collection("users");
    await users.createIndex({ email: 1 }, { unique: true });
    await users.createIndex({ id: 1 }, { unique: true });

    // 2. User resumes collection
    const resumes = db.collection("user_resumes");
    await resumes.createIndex({ userId: 1 });
    await resumes.createIndex({ id: 1 });

    // 3. Download logs collection
    const downloads = db.collection("download_logs");
    await downloads.createIndex({ userId: 1 });
    await downloads.createIndex({ downloadedAt: -1 });

    // 4. User feedbacks collection
    const feedbacks = db.collection("user_feedbacks");
    await feedbacks.createIndex({ userId: 1 });
    await feedbacks.createIndex({ createdAt: -1 });

    // 5. Seed default demo user if not present
    const existing = await users.findOne({ email: "demo@quickcv.com" });
    if (!existing) {
      const hash = await bcrypt.hash("password123", 10);
      await users.insertOne({
        id: "usr_demo_1",
        name: "Alex Morgan",
        email: "demo@quickcv.com",
        password_hash: hash,
        image: null,
        provider: "credentials",
        created_at: new Date(),
        updated_at: new Date(),
        reset_token: null,
        reset_token_expiry: null,
      });
      console.log("🌱 Default demo user created (demo@quickcv.com / password123)");
    } else {
      console.log("ℹ️ Demo user already exists.");
    }

    const collections = await db.listCollections().toArray();
    console.log("✅ Successfully initialized MongoDB collections:", collections.map((c) => c.name));
  } catch (err) {
    console.error("Initialization error:", err);
  } finally {
    await client.close();
  }
}

run();
