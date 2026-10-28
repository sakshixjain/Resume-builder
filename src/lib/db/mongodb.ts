import { MongoClient, Db } from "mongodb";

function getMongoUri(): string {
  const uri =
    process.env.MONGODB_URI ||
    process.env.MONGODB_URL ||
    process.env.DATABASE_URL ||
    process.env.MONGO_URI;

  if (uri && uri.trim() !== "") {
    return uri.trim();
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "MONGODB_URI environment variable is not set in Vercel. Please check Vercel > Settings > Environment Variables."
    );
  }

  return "mongodb://127.0.0.1:27017/resume_builder";
}

const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 8000,
  connectTimeoutMS: 10000,
};

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export function getClientPromise(): Promise<MongoClient> {
  const uri = getMongoUri();
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  return global._mongoClientPromise;
}

/**
 * Get MongoDB Database instance
 */
export async function getDb(): Promise<Db> {
  const connectedClient = await getClientPromise();
  const dbName = process.env.MONGODB_DB_NAME || "resume_builder";
  return connectedClient.db(dbName);
}

let isInitialized = false;

/**
 * Initialize MongoDB collections, create unique indexes, and seed demo user
 */
export async function initializeDatabase(): Promise<void> {
  if (isInitialized) return;

  try {
    const db = await getDb();

    // 1. Users collection: create unique index on email
    const usersCollection = db.collection("users");
    await usersCollection.createIndex({ email: 1 }, { unique: true });
    await usersCollection.createIndex({ id: 1 }, { unique: true });

    // 2. User resumes collection: index on userId
    const resumesCollection = db.collection("user_resumes");
    await resumesCollection.createIndex({ userId: 1 });
    await resumesCollection.createIndex({ id: 1 });

    // 3. Download logs collection: index on userId and date
    const downloadLogsCollection = db.collection("download_logs");
    await downloadLogsCollection.createIndex({ userId: 1 });
    await downloadLogsCollection.createIndex({ downloadedAt: -1 });

    // 4. User feedbacks collection: index on userId and date
    const feedbacksCollection = db.collection("user_feedbacks");
    await feedbacksCollection.createIndex({ userId: 1 });
    await feedbacksCollection.createIndex({ createdAt: -1 });

    // 5. Seed default demo user if users collection is empty
    const userCount = await usersCollection.countDocuments();
    if (userCount === 0) {
      const bcrypt = await import("bcryptjs");
      const demoHashedPassword = await bcrypt.default.hash("password123", 10);
      await usersCollection.insertOne({
        id: "usr_demo_1",
        name: "Alex Morgan",
        email: "demo@quickcv.com",
        password_hash: demoHashedPassword,
        image: null,
        provider: "credentials",
        created_at: new Date(),
        updated_at: new Date(),
        reset_token: null,
        reset_token_expiry: null,
      });
      console.log("🌱 Default demo user seeded in MongoDB (demo@quickcv.com / password123)");
    }

    isInitialized = true;
    console.log("✅ MongoDB Database & Collections initialized successfully.");
  } catch (err) {
    console.warn("⚠️ MongoDB initialization warning/notice:", err);
    // Continue execution to let individual operations handle fallbacks if offline
  }
}

export default getClientPromise;
