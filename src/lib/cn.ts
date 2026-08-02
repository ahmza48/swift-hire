type ClassValue = string | false | null | undefined;

/** Minimal class joiner. No conflict resolution — compose classes deliberately. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
