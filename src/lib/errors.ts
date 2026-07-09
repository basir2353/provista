export function getErrorMessage(err: unknown): string {
  if (err instanceof Error && err.message) return err.message;
  if (typeof err === "string" && err.trim()) return err;
  return "Something went wrong. Please try again.";
}

export function parseApiErrorBody(text: string, status: number): string {
  if (!text) return `Request failed (${status})`;

  try {
    const json = JSON.parse(text) as { error?: string; message?: string };
    return json.error || json.message || `Request failed (${status})`;
  } catch {
    const stripped = text
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    if (/cannot (get|post|put|delete|patch)/i.test(stripped)) {
      return `API endpoint not found (${status}). Backend may need to be redeployed.`;
    }

    if (stripped.length > 180) return `Request failed (${status})`;
    return stripped || `Request failed (${status})`;
  }
}
