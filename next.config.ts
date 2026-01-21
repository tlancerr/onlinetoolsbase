import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["react", "react-dom"],
  },
};
module.exports = nextConfig;
//export default nextConfig;
