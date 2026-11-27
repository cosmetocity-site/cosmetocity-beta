import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ALL_BLOG_LOCALES,
  BLOG_POSTS,
  BLOG_UI_COPY,
  OG_LOCALE_MAP,
  isValidBlogLocale,
  findPostAndLocaleBySlug,
  getLocalizedText,
  getPostUrl,
  getBlogIndexUrl,
  getPostHreflangAlternates,
  getBlogIndexHreflangAlternates,
  generateArticleJsonLd,
  generateFaqJsonLd,
} from "@/data/blogPosts";
import BlogIndexClient from "@/components/BlogIndexClient";
import BlogArticleClient from "@/components/BlogArticleClient";

interface BlogSlugPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const localeParams = ALL_BLOG_LOCALES.map((loc) => ({ slug: loc }));
  const legacySlugParams = BLOG_POSTS.map((post) => ({ slug: post.slug }));
  return [...localeParams, ...legacySlugParams];
}

export function generateMetadata({ params }: BlogSlugPageProps): Metadata {
  // 1. Dedicated per-language blog hub: /blog/en, /blog/de, /blog/ru, /blog/es, /blog/ar, /blog/fr, /blog/it
  if (isValidBlogLocale(params.slug)) {
    const locale = params.slug;
    const ui = BLOG_UI_COPY[locale];
    const canonicalUrl = `https://cosmetocity.online${getBlogIndexUrl(locale)}`;
    const alternateOgLocales = ALL_BLOG_LOCALES.filter(
      (l) => l !== locale
    ).map((l) => OG_LOCALE_MAP[l]);

    return {
      title: ui.blogMetaTitle,
      description: ui.blogMetaDescription,
      alternates: {
        canonical: canonicalUrl,
        languages: getBlogIndexHreflangAlternates(),
      },
      openGraph: {
        title: ui.blogMetaTitle,
        description: ui.blogMetaDescription,
        url: canonicalUrl,
        siteName: "CosmetoCity",
        locale: OG_LOCALE_MAP[locale],
        alternateLocale: alternateOgLocales,
        type: "website",
      },
    };
  }

  // 2. Backwards-compatible legacy post route: /blog/[legacy-slug]
  const matched = findPostAndLocaleBySlug(params.slug);
  if (!matched) {
    return {
      title: "Medical Article Not Found | CosmetoCity Antalya",
    };
  }

  const { post, locale } = matched;
  const canonicalUrl = `https://cosmetocity.online${getPostUrl(post, locale)}`;
  const title = getLocalizedText(post.metaTitle, locale, locale);
  const description = getLocalizedText(post.metaDescription, locale, locale);
  const imageAlt = getLocalizedText(post.h1CompleteTitle, locale, locale);
  const alternateOgLocales = ALL_BLOG_LOCALES.filter((l) => l !== locale).map(
    (l) => OG_LOCALE_MAP[l]
  );

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: getPostHreflangAlternates(post),
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "CosmetoCity",
      locale: OG_LOCALE_MAP[locale],
      alternateLocale: alternateOgLocales,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      images: [
        {
          url: post.heroImage,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
  };
}

export default function BlogSlugPage({ params }: BlogSlugPageProps) {
  // 1. Dedicated language blog index (/blog/en, /blog/de, /blog/ru, /blog/es, /blog/ar, /blog/fr, /blog/it)
  if (isValidBlogLocale(params.slug)) {
    return <BlogIndexClient initialLocale={params.slug} />;
  }

  // 2. Backwards-compatible legacy post URL (/blog/[legacy-slug])
  const matched = findPostAndLocaleBySlug(params.slug);
  if (!matched) {
    notFound();
  }

  const { post, locale } = matched;
  const articleJsonLd = generateArticleJsonLd(post, locale);
  const faqJsonLd = generateFaqJsonLd(post, locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd),
        }}
      />
      {faqJsonLd.mainEntity.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd),
          }}
        />
      )}
      <BlogArticleClient post={post} initialLocale={locale} />
    </>
  );
}
