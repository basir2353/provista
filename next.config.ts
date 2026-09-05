import type { NextConfig } from "next";
import { getBackendUrl } from "./src/lib/backendUrl";

const backendUrl = getBackendUrl();

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
    // beforeFiles so App Router /api/revalidate does not 404 other /api/* routes.
    return {
      beforeFiles: [
        {
          source: "/uploads/:path*",
          destination: `${backendUrl}/uploads/:path*`,
        },
        {
          source: "/api/:path((?!revalidate$).*)",
          destination: `${backendUrl}/api/:path`,
        },
      ],
    };
  },
};

export default nextConfig;
