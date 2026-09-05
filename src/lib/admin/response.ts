import { NextResponse } from "next/server";
import { getDuplicateKeyMessage } from "./utils/duplicateError";

/**
 * Shared JSON response helpers so every admin route handler produces the same
 * error shape the dashboard client already understands ({ message: string }).
 */

export function json<T>(body: T, status = 200): NextResponse {
  return NextResponse.json(body, { status });
}

export function errorJson(message: string, status = 400): NextResponse {
  return NextResponse.json({ message }, { status });
}

type ValidationError = {
  name?: string;
  errors?: Record<string, { message: string }>;
};

/**
 * Turn any thrown error from a controller into the same status+JSON shape the
 * original Express errorHandler produced. Route handlers just call this from
 * their catch block; no try/catch boilerplate has to know about Mongoose.
 */
export function handleError(error: unknown): NextResponse {
  const duplicateMessage = getDuplicateKeyMessage(error);
  if (duplicateMessage) {
    return errorJson(duplicateMessage, 409);
  }

  const err = error as ValidationError & { message?: string };
  if (err?.name === "ValidationError" && err.errors) {
    const messages = Object.values(err.errors).map((e) => e.message);
    return errorJson(messages.join(", "), 400);
  }

  console.error("[admin API]", error);
  return errorJson(err?.message || "Internal server error.", 500);
}
