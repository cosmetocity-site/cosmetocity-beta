import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { BLOG_POSTS } from "@/data/blogPosts";

const BASE_URL = "https://cosmetocity.online";

/**
 * Discovers any additional static blog post folders or markdown/json files
 * added by the autonomous blog agent under `src/app/blog` or `content/blog`,
 * and merges them with `BLOG_POSTS` from `src/data/blogPosts.ts`.
 */
function getDynamicBlogEntries(): MetadataRoute.Sitemap {
  const seenSlugs = new Set<string>();
  const blogEntries: MetadataRoute.Sitemap = [];

  for (const post of BLOG_POSTS) {
    seenSlugs.add(post.slug);
    const parsedDate = post.updatedAt || post.publishedAt;
    const lastModified = parsedDate ? new Date(parsedDate) : new Date();

    blogEntries.push({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: isNaN(lastModified.getTime()) ? new Date() : lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  // Also scan `src/app/blog` directory for any standalone article folders
  try {
    const appBlogDir = path.join(process.cwd(), "src", "app", "blog");
    if (fs.existsSync(appBlogDir)) {
      const entries = fs.readdirSync(appBlogDir, { withFileTypes: true });
      for (const entry of entries) {
        if (
          entry.isDirectory() &&
          !entry.name.startsWith("[") &&
          !entry.name.startsWith("_") &&
          !seenSlugs.has(entry.name)
        ) {
          seenSlugs.add(entry.name);
          blogEntries.push({
            url: `${BASE_URL}/blog/${entry.name}`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
          });
        }
      }
    }
  } catch {
    // Fallback gracefully if filesystem scan is unavailable in edge environments
  }

  return blogEntries;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const blogEntries = getDynamicBlogEntries();

  return [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...blogEntries,
  ];
}
