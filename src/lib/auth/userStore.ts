import crypto from "crypto";

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  passwordHash?: string;
  image?: string;
  provider: "credentials" | "google";
  createdAt: string;
  resetToken?: string;
  resetTokenExpiry?: number;
}

// In-memory store initialized with a default demo user
const globalForUsers = globalThis as unknown as {
  __quickcv_users__?: Map<string, UserRecord>;
};

const usersStore: Map<string, UserRecord> =
  globalForUsers.__quickcv_users__ ||
  new Map<string, UserRecord>();

if (process.env.NODE_ENV !== "production") {
  globalForUsers.__quickcv_users__ = usersStore;
}

// Helper to hash password using SHA-256 + salt
export const hashPassword = (password: string): string => {
  return crypto.createHash("sha256").update(password + "quickcv_salt_2026").digest("hex");
};

// Seed demo user if store is empty
if (usersStore.size === 0) {
  const demoEmail = "demo@quickcv.com";
  usersStore.set(demoEmail, {
    id: "user-demo-1",
    name: "Alex Morgan",
    email: demoEmail,
    passwordHash: hashPassword("password123"),
    provider: "credentials",
    createdAt: new Date().toISOString(),
  });
}

/**
 * Find user by email (case-insensitive)
 */
export const findUserByEmail = (email: string): UserRecord | undefined => {
  const cleanEmail = email.trim().toLowerCase();
  return usersStore.get(cleanEmail);
};

/**
 * Register a new user with credentials
 */
export const registerUser = (
  name: string,
  email: string,
  password: string
): { success: boolean; error?: string; user?: UserRecord } => {
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

  if (usersStore.has(cleanEmail)) {
    return { success: false, error: "An account with this email already exists." };
  }

  const newUser: UserRecord = {
    id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    name: cleanName,
    email: cleanEmail,
    passwordHash: hashPassword(password),
    provider: "credentials",
    createdAt: new Date().toISOString(),
  };

  usersStore.set(cleanEmail, newUser);
  return { success: true, user: newUser };
};

/**
 * Verify credentials
 */
export const verifyCredentials = (
  email: string,
  password: string
): UserRecord | null => {
  const cleanEmail = email.trim().toLowerCase();
  const user = usersStore.get(cleanEmail);

  if (!user || !user.passwordHash) return null;

  const inputHash = hashPassword(password);
  if (user.passwordHash === inputHash) {
    return user;
  }

  return null;
};

/**
 * Create a password reset token (6-digit OTP / token)
 */
export const createPasswordResetToken = (
  email: string
): { success: boolean; token?: string; error?: string } => {
  const cleanEmail = email.trim().toLowerCase();
  const user = usersStore.get(cleanEmail);

  if (!user) {
    return { success: false, error: "No account found with this email address." };
  }

  // Generate 6-digit reset code
  const token = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = Date.now() + 15 * 60 * 1000; // 15 minutes validity

  user.resetToken = token;
  user.resetTokenExpiry = expiry;
  usersStore.set(cleanEmail, user);

  return { success: true, token };
};

/**
 * Reset password using the verification token
 */
export const resetPasswordWithToken = (
  email: string,
  token: string,
  newPassword: string
): { success: boolean; error?: string } => {
  const cleanEmail = email.trim().toLowerCase();
  const user = usersStore.get(cleanEmail);

  if (!user) {
    return { success: false, error: "No account found with this email address." };
  }

  if (!user.resetToken || user.resetToken !== token.trim()) {
    return { success: false, error: "Invalid verification code. Please check and try again." };
  }

  if (!user.resetTokenExpiry || Date.now() > user.resetTokenExpiry) {
    return { success: false, error: "Verification code has expired. Please request a new one." };
  }

  if (!newPassword || newPassword.length < 6) {
    return { success: false, error: "New password must be at least 6 characters long." };
  }

  user.passwordHash = hashPassword(newPassword);
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  usersStore.set(cleanEmail, user);

  return { success: true };
};
