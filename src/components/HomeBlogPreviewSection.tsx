"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { Locale, CityOption, isRtlLocale } from "@/data/content";
import {
  BLOG_POSTS,
  BLOG_UI_COPY,
  buildBlogWhatsAppLink,
  getLocalizedText,
} from "@/data/blogPosts";
import { trackWhatsAppClick } from "@/lib/analytics";

interface HomeBlogPreviewSectionProps {
  locale: Locale;
  selectedCity: CityOption;
}

export default function HomeBlogPreviewSection({
  locale,
  selectedCity,
}: HomeBlogPreviewSectionProps) {
  const ui = BLOG_UI_COPY[locale];
  const isRtl = isRtlLocale(locale);

  return (
    <section
      id="blog"
      dir={isRtl ? "rtl" : "ltr"}
      className="py-16 sm:py-20 bg-white border-t border-cosmeto-sandBorder"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-3 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cosmeto-green/15 text-cosmeto-greenDark text-xs font-bold tracking-widest uppercase">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{ui.blogHeaderBadge}</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-cosmeto-charcoal">
              {ui.blogHeaderTitle}
            </h2>
            <p className="text-sm sm:text-base text-cosmeto-body">
              {ui.blogHeaderSubtitle}
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cosmeto-sand hover:bg-cosmeto-sandBorder text-cosmeto-charcoal font-bold text-xs sm:text-sm transition shrink-0"
          >
            <span>{ui.blogNavLabel}</span>
            <ArrowRight className="w-4 h-4 text-cosmeto-green" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {BLOG_POSTS.map((post) => {
            const titleText = getLocalizedText(post.h1CompleteTitle, locale);
            const topicText = getLocalizedText(
              post.midArticleCta.whatsappTopic,
              locale
            );

            return (
              <div
                key={post.slug}
                className="rounded-3xl bg-cosmeto-sandLight border-2 border-cosmeto-green/50 p-6 sm:p-8 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
              >
                <div className="lg:col-span-4 rounded-2xl overflow-hidden border border-cosmeto-sandBorder h-60 lg:h-full">
                  <img
                    src={post.heroImage}
                    alt={titleText}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="lg:col-span-8 space-y-4">
                  <div className="flex flex-wrap items-center gap-2.5 text-xs font-bold text-cosmeto-teal">
                    <span className="px-3 py-1 rounded-full bg-cosmeto-green/15 text-cosmeto-greenDark">
                      {getLocalizedText(post.categoryLabel, locale)}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-cosmeto-green" />
                      {post.medicalReviewer.name}
                    </span>
                    <span>•</span>
                    <span>{getLocalizedText(post.readingTime, locale)}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-cosmeto-charcoal leading-snug">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-cosmeto-green transition"
                    >
                      {titleText}
                    </Link>
                  </h3>

                  <p className="text-sm sm:text-base text-cosmeto-charcoal font-medium bg-white p-4 rounded-2xl border-l-4 border-cosmeto-green">
                    {getLocalizedText(post.h1DirectAnswer, locale)}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-cosmeto-body pt-1">
                    {post.sections.slice(0, 4).map((sec) => (
                      <div key={sec.id} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cosmeto-green shrink-0" />
                        <span className="truncate">
                          {getLocalizedText(sec.question, locale)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cosmeto-green hover:bg-cosmeto-teal text-white font-bold text-sm transition shadow-md"
                    >
                      <span>{ui.readArticleBtn}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <a
                      href={buildBlogWhatsAppLink(
                        locale,
                        topicText,
                        selectedCity
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackWhatsAppClick({
                          source: `home_blog_preview_${post.slug}`,
                          topic: topicText,
                          city: selectedCity,
                          locale,
                        })
                      }
                      className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-cosmeto-sand border border-cosmeto-sandBorder text-cosmeto-charcoal font-bold text-xs sm:text-sm transition"
                    >
                      <MessageCircle className="w-4 h-4 text-cosmeto-green" />
                      <span>
                        {getLocalizedText(post.midArticleCta.buttonText, locale)}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
