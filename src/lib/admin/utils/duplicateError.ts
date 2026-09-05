/**
 * Convert MongoDB duplicate key errors (code 11000) into user-friendly messages.
 */
type MongoDupError = {
  code?: number;
  message?: string;
  keyPattern?: Record<string, unknown>;
};

export function getDuplicateKeyMessage(error: unknown): string | null {
  const err = error as MongoDupError;
  if (err?.code !== 11000) return null;

  const message = err.message || "";
  const field = Object.keys(err.keyPattern || {})[0] || "field";

  if (field === "linkedinUrl" || message.includes("linkedinUrl")) {
    if (message.includes("companies")) {
      return "This company LinkedIn URL has already been added.";
    }
    if (message.includes("people")) {
      return "This person LinkedIn URL has already been added.";
    }
    return "A record with this LinkedIn URL already exists.";
  }

  if (field === "companyName" || message.includes("companyName")) {
    return "A company with this name has already been added.";
  }

  if (field === "email") {
    return "A user with this email already exists.";
  }

  return "This record already exists.";
}
