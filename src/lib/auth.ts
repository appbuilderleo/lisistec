import crypto from "crypto";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

const SESSION_COOKIE_NAME = "lisis_crm_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds
const AUTH_SECRET = process.env.CRM_AUTH_SECRET || "lisis-technologies-crm-secure-key-2026-production";

/**
 * Hash password using PBKDF2 with SHA-512 and random salt
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

/**
 * Verify password against stored PBKDF2 hash
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, originalHash] = storedHash.split(":");
    if (!salt || !originalHash) return false;
    const testHash = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
    return crypto.timingSafeEqual(Buffer.from(testHash, "hex"), Buffer.from(originalHash, "hex"));
  } catch {
    return false;
  }
}

interface SessionPayload {
  userId: string;
  email: string;
  role: string;
  exp: number;
}

/**
 * Create a signed session token
 */
export function signSessionToken(payload: Omit<SessionPayload, "exp">): string {
  const data: SessionPayload = {
    ...payload,
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE,
  };
  const encoded = Buffer.from(JSON.stringify(data)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(encoded)
    .digest("base64url");
  return `${encoded}.${signature}`;
}

/**
 * Verify and decode a session token
 */
export function verifySessionToken(token: string): SessionPayload | null {
  try {
    const [encoded, signature] = token.split(".");
    if (!encoded || !signature) return null;

    const expectedSignature = crypto
      .createHmac("sha256", AUTH_SECRET)
      .update(encoded)
      .digest("base64url");

    if (
      !crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expectedSignature)
      )
    ) {
      return null;
    }

    const payload: SessionPayload = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf8")
    );

    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null; // Expired
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Get current authenticated admin user from cookies
 */
export async function getCurrentAdmin() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return null;

    const payload = verifySessionToken(token);
    if (!payload) return null;

    const user = await prisma.adminUser.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        createdAt: true,
        lastLoginAt: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Error getting current admin:", error);
    return null;
  }
}

/**
 * Cookie options for setting/deleting session
 */
export function getSessionCookieOptions() {
  const isProd = process.env.NODE_ENV === "production";
  return {
    name: SESSION_COOKIE_NAME,
    httpOnly: true,
    secure: isProd,
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE,
  };
}

/**
 * Automatically ensure at least one default administrator exists
 * Default: admin@lisis.co.mz / Admin@Lisis2026!
 */
export async function ensureDefaultAdmin() {
  try {
    const count = await prisma.adminUser.count();
    if (count === 0) {
      const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD || "Admin@Lisis2026!";
      const defaultEmail = process.env.DEFAULT_ADMIN_EMAIL || "admin@lisis.co.mz";
      const defaultName = "Administrador Lisis";

      const user = await prisma.adminUser.create({
        data: {
          name: defaultName,
          email: defaultEmail.toLowerCase().trim(),
          passwordHash: hashPassword(defaultPassword),
          role: "ADMIN",
        },
      });
      console.log(`Default CRM Admin created: ${user.email}`);
      return user;
    }
    return null;
  } catch (error) {
    console.error("Error ensuring default admin:", error);
    return null;
  }
}
