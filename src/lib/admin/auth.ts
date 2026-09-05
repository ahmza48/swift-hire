import jwt from "jsonwebtoken";
import { connectAdminDB } from "./db";
import { User, type IUser } from "./models/User";
import { jwtSecret } from "./env";

export type AdminUser = Omit<IUser, "passwordHash">;
export type AuthResult =
  | { ok: true; user: AdminUser }
  | { ok: false; status: number; message: string };

export function signToken(userId: string, expiresIn: string): string {
  return jwt.sign(
    { id: userId },
    jwtSecret(),
    // Cast because jsonwebtoken's SignOptions insists on its own narrower type.
    { expiresIn } as jwt.SignOptions,
  );
}

/**
 * Verify the Authorization: Bearer header and load the user record.
 * Returns a discriminated union so the caller can turn a failure into the
 * appropriate NextResponse without another lookup.
 */
export async function authenticate(request: Request): Promise<AuthResult> {
  const authHeader = request.headers.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return { ok: false, status: 401, message: "Authentication required." };
  }

  const token = authHeader.slice("Bearer ".length);

  let decoded: { id: string };
  try {
    decoded = jwt.verify(token, jwtSecret()) as { id: string };
  } catch {
    return { ok: false, status: 401, message: "Invalid or expired token." };
  }

  await connectAdminDB();
  const user = await User.findById(decoded.id).select("-passwordHash");

  if (!user || !user.isActive) {
    return {
      ok: false,
      status: 401,
      message: "Invalid or inactive account.",
    };
  }

  return { ok: true, user: user as unknown as AdminUser };
}

export function requireAdmin(user: AdminUser): AuthResult {
  if (user.role !== "admin") {
    return { ok: false, status: 403, message: "Admin access required." };
  }
  return { ok: true, user };
}
