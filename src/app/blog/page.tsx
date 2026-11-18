"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  ArrowRight,
  Stethoscope,
  ShieldCheck,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";
import { Locale, CityOption } from "@/data/content";
import {
  BLOG_POSTS,
  BLOG_UI_COPY,
  buildBlogWhatsAppLink,
} from "@/data/blogPosts";
import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import StickyWhatsApp from "@/components/StickyWhatsApp";

export default function BlogIndexPage() {
  const [locale, setLocale] = useState<Locale>("en");
  const [selectedCity, setSelectedCity] = useState<CityOption>("antalya");
  const ui = BLOG_UI_COPY[locale];

  return (
    <div className="min-h-screen flex flex-col bg-cosmeto-sandLight text-cosmeto-body">
      <Navbar
        locale={locale}
        onLocaleChange={setLocale}
        selectedCity={selectedCity}
      />

      {/* Hero Header */}
      <section className="bg-gradient-to-br from-cosmeto-charcoal via-[#1F3A3D] to-cosmeto-tealDark text-white py-14 sm:py-20 border-b border-cosmeto-cyan/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cosmeto-green/20 border border-cosmeto-green/40 text-cosmeto-sand text-xs font-bold uppercase tracking-wider">
            <Stethoscope className="w-4 h-4 text-cosmeto-green" />
            <span>{ui.blogHeaderBadge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold leading-tight max-w-4xl mx-auto">
            {ui.blogHeaderTitle}
          </h1>

          <p className="text-sm sm:text-lg text-cosmeto-ice max-w-3xl mx-auto leading-relaxed">
            {ui.blogHeaderSubtitle}
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="rounded-3xl bg-white border-2 border-cosmeto-green/50 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12"
            >
              <div className="lg:col-span-5 relative min-h-[260px]">
                <img
                  src={post.heroImage}
                  alt={post.h1CompleteTitle[locale]}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cosmeto-charcoal/90 text-white text-xs font-bold">
                  <BookOpen className="w-3.5 h-3.5 text-cosmeto-green" />
                  {post.categoryLabel[locale]}
                </span>
              </div>

              <div className="lg:col-span-7 p-6 sm:p-9 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-cosmeto-teal">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-cosmeto-green" />
                      {post.readingTime[locale]}
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-cosmeto-green" />
                      {post.medicalReviewer.name}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-cosmeto-charcoal leading-snug">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-cosmeto-green transition"
                    >
                      {post.h1CompleteTitle[locale]}
                    </Link>
                  </h2>

                  {/* Direct Answer Snippet Preview */}
                  <div className="p-4 rounded-2xl bg-cosmeto-sandLight border-l-4 border-cosmeto-green">
                    <p className="text-xs font-bold uppercase tracking-wider text-cosmeto-greenDark mb-1">
                      {ui.directAnswerBadge}
                    </p>
                    <p className="text-sm text-cosmeto-charcoal font-medium leading-relaxed">
                      {post.h1DirectAnswer[locale]}
                    </p>
                  </div>

                  {/* Preview of H2 Questions inside this Guide */}
                  <div className="space-y-1.5 pt-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-cosmeto-teal">
                      {ui.tableOfContents}:
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs font-semibold text-cosmeto-body">
                      {post.sections.slice(0, 4).map((sec) => (
                        <li key={sec.id} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cosmeto-green shrink-0 mt-0.5" />
                          <span className="line-clamp-1">
                            {sec.question[locale]}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
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
                      post.midArticleCta.whatsappTopic[locale],
                      selectedCity
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-cosmeto-sand hover:bg-cosmeto-sandBorder text-cosmeto-charcoal font-bold text-xs sm:text-sm transition"
                  >
                    <MessageCircle className="w-4 h-4 text-cosmeto-green" />
                    <span>{post.midArticleCta.buttonText[locale]}</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <ContactSection
        locale={locale}
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
      />

      <StickyWhatsApp locale={locale} selectedCity={selectedCity} />
    </div>
  );
}
