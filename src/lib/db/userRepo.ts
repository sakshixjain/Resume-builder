import bcrypt from "bcryptjs";
import crypto from "crypto";
import { query, initializeDatabase } from "./mysql";

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
 * Find user by email in MySQL
 */
export async function findUserByEmail(email: string): Promise<DbUser | null> {
  try {
    const cleanEmail = email.trim().toLowerCase();
    const rows = await query<DbUser[]>(
      "SELECT * FROM users WHERE LOWER(email) = ? LIMIT 1",
      [cleanEmail]
    );

    if (rows && rows.length > 0) {
      return rows[0];
    }
    return null;
  } catch (error) {
    console.error("Error finding user by email in MySQL:", error);
    return null;
  }
}

/**
 * Find user by ID in MySQL
 */
export async function findUserById(id: string): Promise<DbUser | null> {
  try {
    const rows = await query<DbUser[]>(
      "SELECT * FROM users WHERE id = ? LIMIT 1",
      [id]
    );

    if (rows && rows.length > 0) {
      return rows[0];
    }
    return null;
  } catch (error) {
    console.error("Error finding user by ID in MySQL:", error);
    return null;
  }
}

/**
 * Verify user existence in MySQL Database (used by download guard API)
 */
export async function verifyUserExists(email: string): Promise<boolean> {
  try {
    const cleanEmail = email.trim().toLowerCase();
    const rows = await query<any[]>(
      "SELECT id FROM users WHERE LOWER(email) = ? LIMIT 1",
      [cleanEmail]
    );
    return Boolean(rows && rows.length > 0);
  } catch (error) {
    console.error("Error checking user existence in MySQL:", error);
    return false;
  }
}

/**
 * Register a new user in MySQL
 */
export async function registerUser(
  name: string,
  email: string,
  password: string
): Promise<{ success: boolean; error?: string; user?: SanitizedUser }> {
  try {
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

    // Check if user already exists in DB
    const existing = await findUserByEmail(cleanEmail);
    if (existing) {
      return { success: false, error: "An account with this email already exists in the database." };
    }

    const userId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const hashedPassword = await hashPassword(password);

    await query(
      "INSERT INTO users (id, name, email, password_hash, provider) VALUES (?, ?, ?, ?, ?)",
      [userId, cleanName, cleanEmail, hashedPassword, "credentials"]
    );

    return {
      success: true,
      user: {
        id: userId,
        name: cleanName,
        email: cleanEmail,
        provider: "credentials",
      },
    };
  } catch (error: any) {
    console.error("MySQL Registration Error:", error);
    return { success: false, error: error?.message || "Database registration failed." };
  }
}

/**
 * Verify credentials against MySQL Database
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
    console.error("MySQL Verify Credentials Error:", error);
    return null;
  }
}

/**
 * Create a password reset token in MySQL
 */
export async function createPasswordResetToken(
  email: string
): Promise<{ success: boolean; token?: string; error?: string }> {
  try {
    const cleanEmail = email.trim().toLowerCase();
    const user = await findUserByEmail(cleanEmail);

    if (!user) {
      return { success: false, error: "No account found in database with this email address." };
    }

    const token = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = Date.now() + 15 * 60 * 1000; // 15 minutes

    await query(
      "UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE LOWER(email) = ?",
      [token, expiry, cleanEmail]
    );

    return { success: true, token };
  } catch (error: any) {
    console.error("MySQL Password Reset Token Error:", error);
    return { success: false, error: error?.message || "Failed to generate reset token." };
  }
}

/**
 * Reset password in MySQL using token
 */
export async function resetPasswordWithToken(
  email: string,
  token: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  try {
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

    await query(
      "UPDATE users SET password_hash = ?, reset_token = NULL, reset_token_expiry = NULL WHERE LOWER(email) = ?",
      [hashedPassword, cleanEmail]
    );

    return { success: true };
  } catch (error: any) {
    console.error("MySQL Reset Password Error:", error);
    return { success: false, error: error?.message || "Failed to reset password." };
  }
}

/**
 * Record a resume download log in MySQL
 */
export async function logDownload(
  userId: string,
  userEmail: string,
  templateUsed?: string
): Promise<void> {
  try {
    await query(
      "INSERT INTO download_logs (user_id, user_email, template_used) VALUES (?, ?, ?)",
      [userId, userEmail, templateUsed || "standard"]
    );
  } catch (error) {
    console.error("Failed to log download to MySQL:", error);
  }
}
