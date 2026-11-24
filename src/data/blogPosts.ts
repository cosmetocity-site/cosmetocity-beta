import { Locale } from "./content";
import { ALL_BLOG_LOCALES, BlogPost } from "./blog/types";
import { breastAugmentationPost } from "./blog/breastAugmentation";
import { hairTransplantPost } from "./blog/hairTransplant";
import { dentalVeneersPost } from "./blog/dentalVeneers";
import { rhinoplastyPost } from "./blog/rhinoplasty";
import { tummyTuckPost } from "./blog/tummyTuck";

export * from "./blog/types";

export const BLOG_POSTS: BlogPost[] = [
  tummyTuckPost,
  breastAugmentationPost,
  hairTransplantPost,
  dentalVeneersPost,
  rhinoplastyPost,
];

export function getBlogPostByLocaleAndSlug(
  locale: Locale,
  articleSlug: string
): BlogPost | undefined {
  return BLOG_POSTS.find(
    (post) => post.slugs[locale] === articleSlug || post.slug === articleSlug
  );
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(
    (post) =>
      post.slug === slug ||
      ALL_BLOG_LOCALES.some((loc) => post.slugs[loc] === slug)
  );
}

export function findPostAndLocaleBySlug(
  slug: string
): { post: BlogPost; locale: Locale } | undefined {
  for (const post of BLOG_POSTS) {
    for (const loc of ALL_BLOG_LOCALES) {
      if (post.slugs[loc] === slug) {
        return { post, locale: loc };
      }
    }
    if (post.slug === slug) {
      return { post, locale: post.primaryLocale ?? "en" };
    }
  }
  return undefined;
}
