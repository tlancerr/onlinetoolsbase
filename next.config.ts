import type { NextConfig } from "next";

const nextConfig: NextConfig = {
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "cms.onlinetoolsbase.com",
    },
  ],
},
  
  /* config options here */
  reactStrictMode: true,
  
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["react", "react-dom"],
  },
};
module.exports = nextConfig;
//export default nextConfig;
