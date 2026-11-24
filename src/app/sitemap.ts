import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import {
  ALL_BLOG_LOCALES,
  BLOG_POSTS,
  getPostUrl,
  getBlogIndexUrl,
  getPostHreflangAlternates,
  getBlogIndexHreflangAlternates,
} from "@/data/blogPosts";

const BASE_URL = "https://cosmetocity.online";

/**
 * Generates multilingual sitemap entries for all 7 languages across
 * every blog index hub (`/blog/[locale]`) and every localized article
 * (`/blog/[locale]/[localized-slug]`), plus any standalone folders under `src/app/blog`.
 */
function getDynamicBlogEntries(): MetadataRoute.Sitemap {
  const seenUrls = new Set<string>();
  const blogEntries: MetadataRoute.Sitemap = [];
  const now = new Date();
  const indexAlternates = getBlogIndexHreflangAlternates(BASE_URL);

  // 1. Per-language blog hub pages (/blog/en, /blog/de, /blog/ru, /blog/es, /blog/ar, /blog/fr, /blog/it)
  for (const locale of ALL_BLOG_LOCALES) {
    const hubUrl = `${BASE_URL}${getBlogIndexUrl(locale)}`;
    seenUrls.add(hubUrl);
    blogEntries.push({
      url: hubUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
      alternates: {
        languages: indexAlternates,
      },
    });
  }

  // 2. Every blog post in all 7 target languages with localized slugs & hreflang alternates
  for (const post of BLOG_POSTS) {
    const parsedDate = post.updatedAt || post.publishedAt;
    const lastModified = parsedDate ? new Date(parsedDate) : now;
    const validDate = isNaN(lastModified.getTime()) ? now : lastModified;
    const postAlternates = getPostHreflangAlternates(post, BASE_URL);

    for (const locale of ALL_BLOG_LOCALES) {
      const articleUrl = `${BASE_URL}${getPostUrl(post, locale)}`;
      if (!seenUrls.has(articleUrl)) {
        seenUrls.add(articleUrl);
        blogEntries.push({
          url: articleUrl,
          lastModified: validDate,
          changeFrequency: "weekly",
          priority: 0.85,
          alternates: {
            languages: postAlternates,
          },
        });
      }
    }
  }

  // 3. Also scan `src/app/blog` for any additional standalone static article folders
  try {
    const appBlogDir = path.join(process.cwd(), "src", "app", "blog");
    if (fs.existsSync(appBlogDir)) {
      const entries = fs.readdirSync(appBlogDir, { withFileTypes: true });
      for (const entry of entries) {
        if (
          entry.isDirectory() &&
          !entry.name.startsWith("[") &&
          !entry.name.startsWith("_")
        ) {
          const standaloneUrl = `${BASE_URL}/blog/${entry.name}`;
          if (!seenUrls.has(standaloneUrl)) {
            seenUrls.add(standaloneUrl);
            blogEntries.push({
              url: standaloneUrl,
              lastModified: now,
              changeFrequency: "weekly",
              priority: 0.8,
            });
          }
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
