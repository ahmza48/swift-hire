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
    const { email, password } = (await request.json()) as {
      email?: string;
      password?: string;
    };

    if (!email || !password) {
      return errorJson("Email and password are required.", 400);
    }

    await connectAdminDB();
    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    }).select("+passwordHash");

    if (!user || !user.isActive) {
      return errorJson("Invalid email or password.", 401);
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return errorJson("Invalid email or password.", 401);
    }

    const token = signToken(String(user._id), jwtExpiresIn());
    return json({ token, user: formatUser(user) });
  } catch (error) {
    return handleError(error);
  }
}
