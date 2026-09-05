import bcrypt from "bcryptjs";
import { authenticate, requireAdmin } from "@/lib/admin/auth";
import { User } from "@/lib/admin/models/User";
import { errorJson, handleError, json } from "@/lib/admin/response";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

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

export async function PUT(request: Request, { params }: Ctx) {
  try {
    const auth = await authenticate(request);
    if (!auth.ok) return errorJson(auth.message, auth.status);
    const roleCheck = requireAdmin(auth.user);
    if (!roleCheck.ok) return errorJson(roleCheck.message, roleCheck.status);

    const { id } = await params;
    const { name, isActive, password } = (await request.json()) as {
      name?: string;
      isActive?: boolean;
      password?: string;
    };

    const user = await User.findById(id);
    if (!user || user.role !== "worker") {
      return errorJson("Worker not found.", 404);
    }

    if (name !== undefined) user.name = name.trim();
    if (isActive !== undefined) user.isActive = isActive;

    if (password) {
      if (password.length < 6) {
        return errorJson("Password must be at least 6 characters.", 400);
      }
      user.passwordHash = await bcrypt.hash(password, 10);
    }

    await user.save();
    return json(formatUser(user));
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(request: Request, { params }: Ctx) {
  try {
    const auth = await authenticate(request);
    if (!auth.ok) return errorJson(auth.message, auth.status);
    const roleCheck = requireAdmin(auth.user);
    if (!roleCheck.ok) return errorJson(roleCheck.message, roleCheck.status);

    const { id } = await params;
    const user = await User.findById(id);
    if (!user || user.role !== "worker") {
      return errorJson("Worker not found.", 404);
    }

    await user.deleteOne();
    return json({ message: "Worker deleted." });
  } catch (error) {
    return handleError(error);
  }
}
