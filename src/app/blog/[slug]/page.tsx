import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Locale } from "@/data/content";
import {
  BLOG_POSTS,
  getBlogPostBySlug,
  getLocalizedText,
  getPostAvailableLocales,
  generateFaqJsonLd,
} from "@/data/blogPosts";
import BlogArticleClient from "@/components/BlogArticleClient";

interface BlogSlugPageProps {
  params: {
    slug: string;
  };
}

const OG_LOCALE_MAP: Record<Locale, string> = {
  en: "en_US",
  de: "de_DE",
  ru: "ru_RU",
  es: "es_ES",
  ar: "ar_AR",
  fr: "fr_FR",
  it: "it_IT",
};

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: BlogSlugPageProps): Metadata {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Medical Article Not Found | CosmetoCity Antalya",
    };
  }

  const primaryLocale: Locale = post.primaryLocale ?? "en";
  const canonicalUrl = `https://cosmetocity.online/blog/${post.slug}`;
  const title = getLocalizedText(post.metaTitle, primaryLocale, primaryLocale);
  const description = getLocalizedText(
    post.metaDescription,
    primaryLocale,
    primaryLocale
  );
  const imageAlt = getLocalizedText(
    post.h1CompleteTitle,
    primaryLocale,
    primaryLocale
  );

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "CosmetoCity",
      locale: OG_LOCALE_MAP[primaryLocale],
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
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const primaryLocale: Locale = post.primaryLocale ?? "en";
  const availableLocales = getPostAvailableLocales(post);

  // Server-rendered FAQPage JSON-LD schema for every language authored in this post
  const faqSchemas = availableLocales.map((loc) => ({
    locale: loc,
    schema: generateFaqJsonLd(post, loc),
  }));

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    inLanguage: primaryLocale,
    headline: getLocalizedText(
      post.h1CompleteTitle,
      primaryLocale,
      primaryLocale
    ),
    description: getLocalizedText(
      post.metaDescription,
      primaryLocale,
      primaryLocale
    ),
    url: `https://cosmetocity.online/blog/${post.slug}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: post.medicalReviewer.name,
      jobTitle: getLocalizedText(
        post.medicalReviewer.title,
        primaryLocale,
        primaryLocale
      ),
    },
    publisher: {
      "@type": "MedicalOrganization",
      name: "CosmetoCity Antalya",
      url: "https://cosmetocity.online",
    },
  };

  return (
    <>
      {/* Automatic FAQPage JSON-LD Schema injected into page HTML for Google */}
      {faqSchemas.map(({ locale, schema }) => (
        <script
          key={`faq-jsonld-${locale}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd),
        }}
      />
      <BlogArticleClient post={post} initialLocale={primaryLocale} />
    </>
  );
}
