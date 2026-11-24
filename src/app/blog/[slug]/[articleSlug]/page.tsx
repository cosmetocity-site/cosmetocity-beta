import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ALL_BLOG_LOCALES,
  BLOG_POSTS,
  OG_LOCALE_MAP,
  isValidBlogLocale,
  getBlogPostByLocaleAndSlug,
  getLocalizedText,
  getPostSlug,
  getPostUrl,
  getPostHreflangAlternates,
  generateFaqJsonLd,
} from "@/data/blogPosts";
import BlogArticleClient from "@/components/BlogArticleClient";

interface LocalizedBlogArticlePageProps {
  params: {
    slug: string; // Locale segment: en | de | ru | es | ar | fr | it
    articleSlug: string; // Localized SEO article slug
  };
}

export function generateStaticParams() {
  const params: { slug: string; articleSlug: string }[] = [];

  for (const post of BLOG_POSTS) {
    for (const locale of ALL_BLOG_LOCALES) {
      params.push({
        slug: locale,
        articleSlug: getPostSlug(post, locale),
      });
    }
  }

  return params;
}

export function generateMetadata({
  params,
}: LocalizedBlogArticlePageProps): Metadata {
  if (!isValidBlogLocale(params.slug)) {
    return {
      title: "Medical Article Not Found | CosmetoCity Antalya",
    };
  }

  const locale = params.slug;
  const post = getBlogPostByLocaleAndSlug(locale, params.articleSlug);

  if (!post) {
    return {
      title: "Medical Article Not Found | CosmetoCity Antalya",
    };
  }

  const canonicalUrl = `https://cosmetocity.online${getPostUrl(post, locale)}`;
  const title = getLocalizedText(post.metaTitle, locale, locale);
  const description = getLocalizedText(post.metaDescription, locale, locale);
  const imageAlt = getLocalizedText(post.h1CompleteTitle, locale, locale);

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

export default function LocalizedBlogArticlePage({
  params,
}: LocalizedBlogArticlePageProps) {
  if (!isValidBlogLocale(params.slug)) {
    notFound();
  }

  const locale = params.slug;
  const post = getBlogPostByLocaleAndSlug(locale, params.articleSlug);

  if (!post) {
    notFound();
  }

  const faqJsonLd = generateFaqJsonLd(post, locale);
  const canonicalUrl = `https://cosmetocity.online${getPostUrl(post, locale)}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    inLanguage: locale,
    headline: getLocalizedText(post.h1CompleteTitle, locale, locale),
    description: getLocalizedText(post.metaDescription, locale, locale),
    url: canonicalUrl,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: post.medicalReviewer.name,
      jobTitle: getLocalizedText(post.medicalReviewer.title, locale, locale),
    },
    publisher: {
      "@type": "MedicalOrganization",
      name: "CosmetoCity Antalya",
      url: "https://cosmetocity.online",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd),
        }}
      />
      <BlogArticleClient post={post} initialLocale={locale} />
    </>
  );
}
