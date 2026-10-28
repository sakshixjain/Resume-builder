import bcrypt from "bcryptjs";
import crypto from "crypto";
import { getDb, initializeDatabase } from "./mongodb";

export interface DbUser {
  id: string;
  name: string;
  email: string;
  password_hash: string | null;
  image: string | null;
  provider: string;
  created_at: Date;
  updated_at: Date;
  reset_token: string | null;
  reset_token_expiry: number | null;
}

export interface SanitizedUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  provider?: string;
}

/**
 * Hash password securely with bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Compare password with stored hash (supports bcrypt and sha256 fallback)
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  if (!hash) return false;

  // 1. Try bcrypt compare
  if (hash.startsWith("$2a$") || hash.startsWith("$2b$") || hash.startsWith("$2y$")) {
    return bcrypt.compare(password, hash);
  }

  // 2. Fallback check for SHA256 legacy hash
  const legacyHash = crypto.createHash("sha256").update(password + "quickcv_salt_2026").digest("hex");
  return legacyHash === hash;
}

/**
 * Find user by email in MongoDB NoSQL database
 */
export async function findUserByEmail(email: string): Promise<DbUser | null> {
  try {
    await initializeDatabase();
    const db = await getDb();
    const cleanEmail = email.trim().toLowerCase();
    
    // Case-insensitive regex query to guarantee match
    const user = await db.collection<DbUser>("users").findOne({
      email: { $regex: new RegExp(`^${cleanEmail.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}$`, "i") },
    });

    if (user) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        password_hash: user.password_hash,
        image: user.image,
        provider: user.provider || "credentials",
        created_at: user.created_at,
        updated_at: user.updated_at,
        reset_token: user.reset_token,
        reset_token_expiry: user.reset_token_expiry,
      };
    }
    return null;
  } catch (error) {
    console.error("Error finding user by email in MongoDB:", error);
    return null;
  }
}

/**
 * Find user by ID in MongoDB NoSQL database
 */
export async function findUserById(id: string): Promise<DbUser | null> {
  try {
    await initializeDatabase();
    const db = await getDb();
    const user = await db.collection<DbUser>("users").findOne({ id });

    if (user) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        password_hash: user.password_hash,
        image: user.image,
        provider: user.provider || "credentials",
        created_at: user.created_at,
        updated_at: user.updated_at,
        reset_token: user.reset_token,
        reset_token_expiry: user.reset_token_expiry,
      };
    }
    return null;
  } catch (error) {
    console.error("Error finding user by ID in MongoDB:", error);
    return null;
  }
}

/**
 * Verify user existence in MongoDB NoSQL database
 */
export async function verifyUserExists(email: string): Promise<boolean> {
  try {
    await initializeDatabase();
    const db = await getDb();
    const cleanEmail = email.trim().toLowerCase();
    const count = await db.collection("users").countDocuments({
      email: { $regex: new RegExp(`^${cleanEmail.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}$`, "i") },
    });
    return count > 0;
  } catch (error) {
    console.error("Error checking user existence in MongoDB:", error);
    return false;
  }
}

/**
 * Register a new user in MongoDB NoSQL database
 */
export async function registerUser(
  name: string,
  email: string,
  password: string
): Promise<{ success: boolean; error?: string; user?: SanitizedUser }> {
  try {
    await initializeDatabase();
    const db = await getDb();

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    if (!cleanEmail || !cleanEmail.includes("@")) {
      return { success: false, error: "Please enter a valid email address." };
    }

    if (!cleanName || cleanName.length < 2) {
      return { success: false, error: "Name must be at least 2 characters long." };
    }

    if (!password || password.length < 6) {
      return { success: false, error: "Password must be at least 6 characters long." };
    }

    // Check if user already exists in MongoDB
    const existing = await findUserByEmail(cleanEmail);
    if (existing) {
      return { success: false, error: "An account with this email already exists in the database." };
    }

    const userId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const hashedPassword = await hashPassword(password);
    const now = new Date();

    const newUserDoc: DbUser = {
      id: userId,
      name: cleanName,
      email: cleanEmail,
      password_hash: hashedPassword,
      image: null,
      provider: "credentials",
      created_at: now,
      updated_at: now,
      reset_token: null,
      reset_token_expiry: null,
    };

    await db.collection("users").insertOne(newUserDoc);

    return {
      success: true,
      user: {
        id: userId,
        name: cleanName,
        email: cleanEmail,
        provider: "credentials",
      },
    };
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Database registration failed.";
    console.error("MongoDB Registration Error:", error);
    return { success: false, error: errMessage };
  }
}

/**
 * Verify credentials against MongoDB NoSQL database
 */
export async function verifyCredentials(
  email: string,
  password: string
): Promise<SanitizedUser | null> {
  try {
    const cleanEmail = email.trim().toLowerCase();
    const user = await findUserByEmail(cleanEmail);

    if (!user || !user.password_hash) {
      return null;
    }

    const isValid = await comparePassword(password, user.password_hash);
    if (!isValid) {
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      provider: user.provider,
    };
  } catch (error) {
    console.error("MongoDB Verify Credentials Error:", error);
    return null;
  }
}

/**
 * Upsert Google OAuth user in MongoDB NoSQL database
 */
export async function upsertGoogleUser(user: {
  id?: string;
  name?: string | null;
  email: string;
  image?: string | null;
}): Promise<void> {
  try {
    await initializeDatabase();
    const db = await getDb();
    const cleanEmail = user.email.trim().toLowerCase();
    const now = new Date();

    const existing = await findUserByEmail(cleanEmail);
    if (!existing) {
      const userId = user.id || `usr_google_${Date.now()}`;
      await db.collection("users").insertOne({
        id: userId,
        name: user.name || "Google User",
        email: cleanEmail,
        password_hash: null,
        image: user.image || null,
        provider: "google",
        created_at: now,
        updated_at: now,
        reset_token: null,
        reset_token_expiry: null,
      });
      console.log(`✅ Synced Google user ${cleanEmail} to MongoDB`);
    } else if (user.image && !existing.image) {
      await db.collection("users").updateOne(
        { email: cleanEmail },
        { $set: { image: user.image, updated_at: now } }
      );
    }
  } catch (err) {
    console.error("MongoDB Google OAuth user sync error:", err);
  }
}

/**
 * Create a password reset token in MongoDB NoSQL database
 */
export async function createPasswordResetToken(
  email: string
): Promise<{ success: boolean; token?: string; error?: string }> {
  try {
    await initializeDatabase();
    const db = await getDb();
    const cleanEmail = email.trim().toLowerCase();
    const user = await findUserByEmail(cleanEmail);

    if (!user) {
      return { success: false, error: "No account found in database with this email address." };
    }

    const token = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = Date.now() + 15 * 60 * 1000; // 15 minutes

    await db.collection("users").updateOne(
      { email: cleanEmail },
      {
        $set: {
          reset_token: token,
          reset_token_expiry: expiry,
          updated_at: new Date(),
        },
      }
    );

    return { success: true, token };
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Failed to generate reset token.";
    console.error("MongoDB Password Reset Token Error:", error);
    return { success: false, error: errMessage };
  }
}

/**
 * Reset password in MongoDB NoSQL database using token
 */
export async function resetPasswordWithToken(
  email: string,
  token: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await initializeDatabase();
    const db = await getDb();
    const cleanEmail = email.trim().toLowerCase();
    const user = await findUserByEmail(cleanEmail);

    if (!user) {
      return { success: false, error: "No account found with this email address." };
    }

    if (!user.reset_token || user.reset_token !== token.trim()) {
      return { success: false, error: "Invalid verification code. Please check and try again." };
    }

    if (!user.reset_token_expiry || Date.now() > Number(user.reset_token_expiry)) {
      return { success: false, error: "Verification code has expired. Please request a new one." };
    }

    if (!newPassword || newPassword.length < 6) {
      return { success: false, error: "New password must be at least 6 characters long." };
    }

    const hashedPassword = await hashPassword(newPassword);

    await db.collection("users").updateOne(
      { email: cleanEmail },
      {
        $set: {
          password_hash: hashedPassword,
          reset_token: null,
          reset_token_expiry: null,
          updated_at: new Date(),
        },
      }
    );

    return { success: true };
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Failed to reset password.";
    console.error("MongoDB Reset Password Error:", error);
    return { success: false, error: errMessage };
  }
}

/**
 * Record a resume download log in MongoDB NoSQL database
 */
export async function logDownload(
  userId: string,
  userEmail: string,
  templateUsed?: string
): Promise<void> {
  try {
    await initializeDatabase();
    const db = await getDb();
    await db.collection("download_logs").insertOne({
      userId,
      userEmail,
      templateUsed: templateUsed || "standard",
      downloadedAt: new Date(),
    });
  } catch (error) {
    console.error("Failed to log download to MongoDB:", error);
  }
}

/**
 * Save user feedback in MongoDB NoSQL database
 */
export async function saveFeedback(data: {
  userId?: string | null;
  userEmail?: string;
  userName?: string;
  rating: number;
  tags?: string;
  feedbackText?: string;
  improvementSuggestions?: string;
}): Promise<void> {
  try {
    await initializeDatabase();
    const db = await getDb();
    await db.collection("user_feedbacks").insertOne({
      userId: data.userId || null,
      userEmail: data.userEmail || "anonymous@feedback.com",
      userName: data.userName || "User",
      rating: data.rating,
      tags: data.tags || "",
      feedbackText: data.feedbackText || "",
      improvementSuggestions: data.improvementSuggestions || "",
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("Failed to save feedback to MongoDB:", error);
  }
}
