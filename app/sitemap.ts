import { MetadataRoute } from "next";
import { toolsData } from "../components/toolsData";

async function getBlogPosts() {
  const res = await fetch(
    "https://cms.onlinetoolsbase.com/wp-json/wp/v2/posts?per_page=100",
    {
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const domain = "https://onlinetoolsbase.com";
  const now = new Date().toISOString();

  // 1. FIXED: Programmatically extract unique categories directly from toolsData
  const uniqueCategories = Array.from(
    new Set(toolsData.map((t) => t.category))
  );

  const categoryPages = uniqueCategories.map((cat) => ({
    url: `${domain}/tools/category/${cat.toLowerCase().replace(/\s+/g, "-")}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // 2. FIXED: Removed raw dynamic folder tokens ([slug]) and removed interior .xml links
  const staticPages = [
    "",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms-of-service",
    "/blog",
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

  const posts = await getBlogPosts();

  const blogPages = posts.map((post: any) => ({
    url: `${domain}/blog/${post.slug}`,
    lastModified: post.modified || now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    ...staticPages,
    ...toolPages,
    ...categoryPages,
    ...blogPages,
  ];
}
