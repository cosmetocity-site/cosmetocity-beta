import React from "react";
import type { Metadata } from "next";
import {
  BLOG_UI_COPY,
  getBlogIndexHreflangAlternates,
} from "@/data/blogPosts";
import BlogIndexClient from "@/components/BlogIndexClient";

export const metadata: Metadata = {
  title: BLOG_UI_COPY.en.blogMetaTitle,
  description: BLOG_UI_COPY.en.blogMetaDescription,
  alternates: {
    canonical: "https://cosmetocity.online/blog/en",
    languages: getBlogIndexHreflangAlternates(),
  },
};

export default function BlogIndexPage() {
  return <BlogIndexClient initialLocale="en" />;
}
