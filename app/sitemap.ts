import { MetadataRoute } from "next";
import { toolsData } from "../components/toolsData";

// Safe date formatter that will NEVER fail or crash the compilation build
function safeDate(dateInput: any): string {
  try {
    if (!dateInput) return new Date().toISOString().split("T")[0];
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) {
      return new Date().toISOString().split("T")[0];
    }
    return d.toISOString().split("T")[0]; // Outputs clean "YYYY-MM-DD" standard for GSC
  } catch {
    return new Date().toISOString().split("T")[0];
  }
}

async function getBlogPosts() {
  try {
    const res = await fetch(
      "https://cms.onlinetoolsbase.com/wp-json/wp/v2/posts?per_page=100",
      {
        next: { revalidate: 3600 },
      }
    );

    // If the server returns an HTML error status instead of 200 OK, catch it immediately
    if (!res.ok) {
      return [];
    }

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return []; // Return empty array if WordPress serves an HTML maintenance block
    }

    return await res.json();
  } catch (error) {
    return []; // Return an empty array if the CMS server is offline or unreachable
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const domain = "https://onlinetoolsbase.com";
  const now = safeDate(new Date()); // Clean layout string matching Google requirements

  const uniqueCategories = Array.from(
    new Set(toolsData.map((t) => t.category))
  );

  const categoryPages = uniqueCategories.map((cat) => ({
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

  const blogPages = Array.isArray(posts) 
    ? posts.map((post: any) => ({
        url: `${domain}/blog/${post.slug}`,
        // Clean up the target string to prevent line 743 failures
        lastModified: safeDate(post.modified || post.date || new Date()),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }))
    : [];

  return [
    ...staticPages,
    ...toolPages,
    ...categoryPages,
    ...blogPages,
  ];
}
