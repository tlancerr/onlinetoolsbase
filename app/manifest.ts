import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "OnlineToolsBase",
    short_name: "OTB",
    description: "Fast, privacy-first online tools for PDFs, images and more.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#64c1ff",
    icons: [
      {
        src: "/otb-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/otb-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
