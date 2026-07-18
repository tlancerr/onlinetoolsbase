import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.cottagestore.pk",
      },
    ],
  },

  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["react", "react-dom"],
  },
};

export default nextConfig;
