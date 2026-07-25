import type { NextConfig } from "next";

const backendUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://backend-provista-production.up.railway.app";

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
    // Only proxy uploads — API calls use BACKEND_URL directly so Next
    // route handlers like /api/revalidate are not shadowed.
    return [
      {
        source: "/uploads/:path*",
        destination: `${backendUrl}/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;
