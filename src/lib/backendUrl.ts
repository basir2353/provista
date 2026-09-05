export const DEFAULT_BACKEND_URL =
  "https://backend-provista-production-9ba0.up.railway.app";

const DEAD_BACKEND_HOSTS = new Set([
  "backend-provista-production.up.railway.app",
]);

export function normalizeBackendUrl(raw: string | undefined): string {
  const trimmed = (raw ?? "").trim().replace(/^['"]|['"]$/g, "");
  if (!trimmed) return DEFAULT_BACKEND_URL;

  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  try {
    const parsed = new URL(withProtocol.replace(/\/+$/, ""));
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return DEFAULT_BACKEND_URL;
    }
    if (DEAD_BACKEND_HOSTS.has(parsed.hostname)) {
      return DEFAULT_BACKEND_URL;
    }
    return parsed.origin;
  } catch {
    return DEFAULT_BACKEND_URL;
  }
}

export function getBackendUrl(): string {
  return normalizeBackendUrl(process.env.NEXT_PUBLIC_API_URL);
}
