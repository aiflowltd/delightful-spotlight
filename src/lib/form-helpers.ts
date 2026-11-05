// Shared helpers for the site's forms (demo request, waitlist).

/** Stricter than the browser's type="email": requires a dot in the domain (name@company.com). */
export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

export const EMAIL_HINT = "Please enter a valid email, like name@company.com.";

/**
 * Turn a thrown server error into a sentence a visitor can act on.
 * Validation errors arrive as JSON (e.g. `[{"path":["email"],...}]`); never show those raw.
 */
export function friendlyError(err: unknown): string {
  const message = err instanceof Error ? err.message.trim() : "";
  if (message.startsWith("[") || message.startsWith("{")) {
    return message.includes('"email"') ? EMAIL_HINT : "Please check the form and try again.";
  }
  if (message && message.length < 160 && !message.includes("<")) return message;
  return "Something went wrong. Please try again.";
}
