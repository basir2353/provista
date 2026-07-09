import type { NextConfig } from "next";

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
};

export default nextConfig;
