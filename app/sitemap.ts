import { MetadataRoute } from "next";
import toolsData from "../components/toolsData";

export default function sitemap(): MetadataRoute.Sitemap {
  const domain = "https://onlinetoolsbase.com";
  const now = new Date().toISOString();

  const categoryPages = [
    "Text Tools",
    "Image Tools",
    "Finance Tools",
    "Time and Age Tools",
    "Social Media Tools",
    "PDF Tools",
    "SEO Tools",
    "Converter Tools",
    "Math Tools",
    "Health and Fitness Tools",
    "Security Tools",
  ].map((cat) => ({
    url: `${domain}/tools/category/${cat.toLowerCase().replace(/\s+/g, "-")}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const staticPages = [
    "",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms-of-service",
    "/tools-sitemap.xml",
    "/tools-pages-sitemap.xml",
  ].map((path) => ({
    url: `${domain}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const toolPages = toolsData.map((tool) => ({
    url: `${domain}/tools/${tool.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...toolPages, ...categoryPages];
}
