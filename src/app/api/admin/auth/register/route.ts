import bcrypt from "bcryptjs";
import { connectAdminDB } from "@/lib/admin/db";
import { User } from "@/lib/admin/models/User";
import { signToken } from "@/lib/admin/auth";
import { jwtExpiresIn } from "@/lib/admin/env";
import { errorJson, handleError, json } from "@/lib/admin/response";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function formatUser(user: {
  _id: unknown;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
  };
}

export async function POST(request: Request) {
  try {
    const { name, email, password, role } = (await request.json()) as {
      name?: string;
      email?: string;
      password?: string;
      role?: string;
    };

    if (!name?.trim() || !email?.trim() || !password) {
      return errorJson("Name, email, and password are required.", 400);
    }

    if (password.length < 6) {
      return errorJson("Password must be at least 6 characters.", 400);
    }

    const requestedRole = role === "admin" ? "admin" : "worker";

    await connectAdminDB();

    if (requestedRole === "admin") {
      const existingAdmin = await User.exists({ role: "admin" });
      if (existingAdmin) {
        return errorJson(
          "An admin account already exists. Please register as a worker.",
          403,
        );
      }
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      passwordHash,
      role: requestedRole,
      isActive: true,
    });

    const token = signToken(String(user._id), jwtExpiresIn());
    return json({ token, user: formatUser(user) }, 201);
  } catch (error) {
    return handleError(error);
  }
}
