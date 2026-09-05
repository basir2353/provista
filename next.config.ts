import type { NextConfig } from "next";

const DEFAULT_BACKEND_URL = "https://backend-provista-production-9ba0.up.railway.app";

function normalizeBackendUrl(raw: string | undefined): string {
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
    return parsed.origin;
  } catch {
    return DEFAULT_BACKEND_URL;
  }
}

const backendUrl = normalizeBackendUrl(process.env.NEXT_PUBLIC_API_URL);

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  compress: true,
  outputFileTracingExcludes: {
    "*": ["./backend-provista/**"],
  },
  experimental: {
    // Avoid Windows race conditions that corrupt .next during production builds.
    webpackBuildWorker: false,
    cpus: 1,
  },
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: `${backendUrl}/uploads/:path*`,
      },
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
