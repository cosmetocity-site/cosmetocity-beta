import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  BLOG_POSTS,
  getBlogPostBySlug,
  generateFaqJsonLd,
} from "@/data/blogPosts";
import BlogArticleClient from "@/components/BlogArticleClient";

interface BlogSlugPageProps {
  params: {
    slug: string;
  };
}

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

  const canonicalUrl = `https://cosmetocity.online/blog/${post.slug}`;

  return {
    title: post.metaTitle.en,
    description: post.metaDescription.en,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.metaTitle.en,
      description: post.metaDescription.en,
      url: canonicalUrl,
      siteName: "CosmetoCity",
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      images: [
        {
          url: post.heroImage,
          width: 1200,
          height: 630,
          alt: post.h1CompleteTitle.en,
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

  // Server-rendered FAQPage JSON-LD schema for Googlebot & Rich Results
  const faqJsonLdEn = generateFaqJsonLd(post, "en");
  const faqJsonLdDe = generateFaqJsonLd(post, "de");

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    headline: post.h1CompleteTitle.en,
    description: post.metaDescription.en,
    url: `https://cosmetocity.online/blog/${post.slug}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: post.medicalReviewer.name,
      jobTitle: post.medicalReviewer.title.en,
    },
    publisher: {
      "@type": "MedicalOrganization",
      name: "CosmetoCity Antalya",
      url: "https://cosmetocity.online",
    },
  };

  return (
    <>
      {/* Rule 3: Automatic FAQPage JSON-LD Schema injected into page HTML for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLdEn),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLdDe),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd),
        }}
      />
      <BlogArticleClient post={post} />
    </>
  );
}
