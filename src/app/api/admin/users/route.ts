import bcrypt from "bcryptjs";
import { authenticate, requireAdmin } from "@/lib/admin/auth";
import { User } from "@/lib/admin/models/User";
import { errorJson, handleError, json } from "@/lib/admin/response";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function formatUser(user: {
  _id: unknown;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
}) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
    createdAt: user.createdAt,
  };
}

export async function GET(request: Request) {
  try {
    const auth = await authenticate(request);
    if (!auth.ok) return errorJson(auth.message, auth.status);
    const roleCheck = requireAdmin(auth.user);
    if (!roleCheck.ok) return errorJson(roleCheck.message, roleCheck.status);

    const users = await User.find({ role: "worker" }).sort({ createdAt: -1 });
    return json(users.map(formatUser));
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: Request) {
  try {
    const auth = await authenticate(request);
    if (!auth.ok) return errorJson(auth.message, auth.status);
    const roleCheck = requireAdmin(auth.user);
    if (!roleCheck.ok) return errorJson(roleCheck.message, roleCheck.status);

    const { name, email, password } = (await request.json()) as {
      name?: string;
      email?: string;
      password?: string;
    };

    if (!name?.trim() || !email?.trim() || !password) {
      return errorJson("Name, email, and password are required.", 400);
    }
    if (password.length < 6) {
      return errorJson("Password must be at least 6 characters.", 400);
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      passwordHash,
      role: "worker",
      isActive: true,
    });

    return json(formatUser(user), 201);
  } catch (error) {
    return handleError(error);
  }
}
