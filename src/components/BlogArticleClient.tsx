"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  ShieldCheck,
  Stethoscope,
  Calendar,
  BookOpen,
  Lightbulb,
  ArrowLeft,
  ChevronRight,
  FileCode2,
  ArrowRight,
} from "lucide-react";
import { Locale, CityOption, isRtlLocale } from "@/data/content";
import {
  BlogPost,
  BLOG_POSTS,
  BLOG_UI_COPY,
  generateFaqJsonLd,
  getLocalizedText,
  getLocalizedList,
} from "@/data/blogPosts";
import Navbar from "@/components/Navbar";
import StickyWhatsApp from "@/components/StickyWhatsApp";
import BlogWhatsAppCTA from "@/components/BlogWhatsAppCTA";
import ContactSection from "@/components/ContactSection";

interface BlogArticleClientProps {
  post: BlogPost;
}

export default function BlogArticleClient({ post }: BlogArticleClientProps) {
  const [locale, setLocale] = useState<Locale>("en");
  const [selectedCity, setSelectedCity] = useState<CityOption>("antalya");
  const ui = BLOG_UI_COPY[locale];
  const dir = isRtlLocale(locale) ? "rtl" : "ltr";

  // Calculate midpoint index so the mid-article WhatsApp CTA sits cleanly in the middle of the questions
  const midSectionIndex = Math.max(0, Math.floor(post.sections.length / 2) - 1);

  // Dynamic FAQPage JSON-LD matching current active locale (in addition to SSR default English JSON-LD)
  const localizedFaqSchema = generateFaqJsonLd(post, locale);

  return (
    <div
      dir={dir}
      className="min-h-screen flex flex-col bg-cosmeto-sandLight text-cosmeto-body"
    >
      {/* Dynamic FAQPage Schema for active language */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localizedFaqSchema),
        }}
      />

      <Navbar
        locale={locale}
        onLocaleChange={setLocale}
        selectedCity={selectedCity}
      />

      {/* Breadcrumb & Medical Verification Bar */}
      <div className="bg-cosmeto-sand border-b border-cosmeto-sandBorder">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs font-semibold text-cosmeto-charcoal">
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href="/"
              className="text-cosmeto-teal hover:text-cosmeto-green transition"
            >
              {ui.backToHome}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-cosmeto-taupe" />
            <Link
              href="/blog"
              className="text-cosmeto-teal hover:text-cosmeto-green transition"
            >
              {ui.blogNavLabel}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-cosmeto-taupe" />
            <span className="text-cosmeto-charcoal font-bold truncate max-w-xs sm:max-w-md">
              {getLocalizedText(post.h1Question, locale)}
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-cosmeto-sandBorder text-[11px] font-bold text-cosmeto-teal">
            <FileCode2 className="w-3.5 h-3.5 text-cosmeto-green" />
            <span>{ui.faqSchemaBadge}</span>
          </div>
        </div>
      </div>

      <main className="flex-1 py-10 sm:py-14">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Back Link & Category Pill */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-cosmeto-teal hover:text-cosmeto-green transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{ui.backToBlog}</span>
            </Link>

            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cosmeto-green/15 text-cosmeto-greenDark text-xs font-bold uppercase tracking-wider">
              <Stethoscope className="w-3.5 h-3.5" />
              {getLocalizedText(post.categoryLabel, locale)}
            </span>
          </div>

          {/* H1 Question Heading */}
          <header className="space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cosmeto-charcoal leading-tight">
              {getLocalizedText(post.h1CompleteTitle, locale)}
            </h1>

            {/* Medical Reviewer & Metadata Strip */}
            <div className="flex flex-wrap items-center gap-4 p-4 rounded-2xl bg-white border border-cosmeto-sandBorder shadow-sm text-xs sm:text-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cosmeto-teal text-white font-bold flex items-center justify-center shrink-0">
                  MD
                </div>
                <div>
                  <span className="text-cosmeto-body text-xs block">
                    {ui.medicallyReviewedBy}{" "}
                    <strong className="text-cosmeto-charcoal">
                      {post.medicalReviewer.name}
                    </strong>
                  </span>
                  <span className="text-[11px] text-cosmeto-teal font-semibold block">
                    {getLocalizedText(post.medicalReviewer.title, locale)} •{" "}
                    {post.medicalReviewer.hospital}
                  </span>
                </div>
              </div>

              <div className="sm:ml-auto flex items-center gap-4 text-xs text-cosmeto-body font-semibold">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-cosmeto-green" />
                  {ui.lastUpdated}: {post.updatedAt}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-cosmeto-green" />
                  {getLocalizedText(post.readingTime, locale)}
                </span>
              </div>
            </div>

            {/* Immediate 2-3 Sentence Featured Snippet Answer right below H1 */}
            <div className="rounded-3xl bg-white border-2 border-cosmeto-green p-6 sm:p-8 shadow-md space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cosmeto-green/15 text-cosmeto-greenDark text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-cosmeto-green" />
                <span>{ui.directAnswerBadge}</span>
              </div>
              <p className="text-base sm:text-lg font-semibold text-cosmeto-charcoal leading-relaxed">
                {getLocalizedText(post.h1DirectAnswer, locale)}
              </p>
            </div>

            {/* Hero Clinical Image & Key Takeaways */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-5 rounded-3xl overflow-hidden border border-cosmeto-sandBorder shadow-sm min-h-[240px]">
                <img
                  src={post.heroImage}
                  alt={getLocalizedText(post.h1CompleteTitle, locale)}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="lg:col-span-7 rounded-3xl bg-cosmeto-sand p-6 border border-cosmeto-sandBorder flex flex-col justify-center space-y-3.5">
                <h2 className="text-base sm:text-lg font-bold text-cosmeto-charcoal flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-cosmeto-teal shrink-0" />
                  <span>{ui.keyTakeawaysTitle}</span>
                </h2>
                <ul className="space-y-2.5 text-xs sm:text-sm text-cosmeto-charcoal">
                  {getLocalizedList(post.keyTakeaways, locale).map(
                    (item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-cosmeto-green shrink-0 mt-0.5" />
                        <span className="leading-relaxed font-medium">
                          {item}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            {/* Quick Jump Table of Contents (All Question H2s) */}
            <nav
              aria-label={ui.tableOfContents}
              className="rounded-2xl bg-white p-5 sm:p-6 border border-cosmeto-sandBorder shadow-sm"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-cosmeto-teal mb-3">
                {ui.tableOfContents}
              </p>
              <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm font-semibold text-cosmeto-charcoal">
                {post.sections.map((sec, index) => (
                  <li key={sec.id}>
                    <a
                      href={`#${sec.id}`}
                      className="flex items-start gap-2 p-2 rounded-xl hover:bg-cosmeto-sandLight hover:text-cosmeto-green transition"
                    >
                      <span className="w-5 h-5 rounded-full bg-cosmeto-teal/15 text-cosmeto-teal text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span>{getLocalizedText(sec.question, locale)}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </header>

          {/* Optional Day-by-Day Recovery Comparison Table */}
          {post.recoveryTimeline && post.recoveryTimeline.length > 0 && (
            <section className="my-10 rounded-3xl bg-white border border-cosmeto-sandBorder shadow-sm overflow-hidden">
              <div className="bg-cosmeto-teal text-white px-6 py-4">
                <h2 className="text-lg sm:text-xl font-bold">
                  {ui.timelineTitle}
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-cosmeto-sand text-cosmeto-charcoal border-b border-cosmeto-sandBorder">
                      <th className="py-3.5 px-4 sm:px-6 font-bold">
                        {ui.timelineColPeriod}
                      </th>
                      <th className="py-3.5 px-4 sm:px-6 font-bold">
                        {ui.timelineColPain}
                      </th>
                      <th className="py-3.5 px-4 sm:px-6 font-bold">
                        {ui.timelineColMilestone}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cosmeto-sandBorder">
                    {post.recoveryTimeline.map((row, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-cosmeto-sandLight/70 transition"
                      >
                        <td className="py-3.5 px-4 sm:px-6 font-bold text-cosmeto-charcoal whitespace-nowrap">
                          {getLocalizedText(row.period, locale)}
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 font-semibold text-cosmeto-teal">
                          {getLocalizedText(row.painLevel, locale)}
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-cosmeto-body">
                          {getLocalizedText(row.milestone, locale)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* H2 Question Sections + Snippet Direct Answers + Mid-Article CTA */}
          <div className="mt-10 space-y-12">
            {post.sections.map((section, idx) => (
              <React.Fragment key={section.id}>
                <section
                  id={section.id}
                  className="scroll-mt-24 rounded-3xl bg-white p-6 sm:p-8 border border-cosmeto-sandBorder shadow-sm space-y-5"
                >
                  <h2 className="text-2xl sm:text-3xl font-bold text-cosmeto-charcoal leading-snug">
                    {getLocalizedText(section.question, locale)}
                  </h2>

                  <div className="p-5 rounded-2xl bg-cosmeto-sandLight border-l-4 border-cosmeto-green">
                    <p className="text-sm sm:text-base font-bold text-cosmeto-charcoal leading-relaxed">
                      {getLocalizedText(section.directAnswer, locale)}
                    </p>
                  </div>

                  <div className="space-y-4 text-sm sm:text-base text-cosmeto-body leading-relaxed">
                    {getLocalizedList(section.details, locale).map(
                      (paragraph, pIdx) => (
                        <p key={pIdx}>{paragraph}</p>
                      )
                    )}
                  </div>

                  {section.subSections && section.subSections.length > 0 && (
                    <div className="space-y-4 pt-1">
                      {section.subSections.map((sub, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-4 sm:p-5 rounded-2xl bg-cosmeto-sandLight/70 border border-cosmeto-sandBorder space-y-2"
                        >
                          <h3 className="text-base sm:text-lg font-bold text-cosmeto-charcoal leading-snug">
                            {getLocalizedText(sub.heading, locale)}
                          </h3>
                          <p className="text-xs sm:text-sm text-cosmeto-body leading-relaxed">
                            {getLocalizedText(sub.text, locale)}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.bulletPoints && (
                    <ul className="grid grid-cols-1 gap-2.5 pt-2">
                      {getLocalizedList(section.bulletPoints, locale).map(
                        (bullet, bIdx) => (
                          <li
                            key={bIdx}
                            className="flex items-start gap-2.5 p-3 rounded-xl bg-cosmeto-sand/60 text-xs sm:text-sm font-semibold text-cosmeto-charcoal"
                          >
                            <CheckCircle2 className="w-4 h-4 text-cosmeto-green shrink-0 mt-0.5" />
                            <span>{bullet}</span>
                          </li>
                        )
                      )}
                    </ul>
                  )}

                  {section.tipBox && (
                    <div className="p-5 rounded-2xl bg-cosmeto-teal/10 border border-cosmeto-teal/30 flex items-start gap-3.5">
                      <Lightbulb className="w-6 h-6 text-cosmeto-teal shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <h3 className="text-sm font-bold text-cosmeto-charcoal">
                          {getLocalizedText(section.tipBox.title, locale)}
                        </h3>
                        <p className="text-xs sm:text-sm text-cosmeto-body leading-relaxed">
                          {getLocalizedText(section.tipBox.text, locale)}
                        </p>
                      </div>
                    </div>
                  )}
                </section>

                {idx === midSectionIndex && (
                  <BlogWhatsAppCTA
                    cta={post.midArticleCta}
                    locale={locale}
                    selectedCity={selectedCity}
                    variant="mid"
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          <BlogWhatsAppCTA
            cta={post.bottomArticleCta}
            locale={locale}
            selectedCity={selectedCity}
            variant="bottom"
          />

          {/* Bottom Medical Trust & Clinical Review Verification Box */}
          <div className="my-8 rounded-2xl bg-white border border-cosmeto-green/40 p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cosmeto-green/15 text-cosmeto-green flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <p className="text-sm sm:text-base font-bold text-cosmeto-charcoal">
                {ui.medicalTeamReviewedTitle}
              </p>
              <p className="text-xs sm:text-sm text-cosmeto-body leading-relaxed">
                {ui.medicalTeamReviewedNote}
              </p>
              <p className="text-xs font-semibold text-cosmeto-teal pt-0.5">
                {post.medicalReviewer.name} • {post.medicalReviewer.hospital} •{" "}
                {ui.lastUpdated}: {post.updatedAt}
              </p>
            </div>
          </div>

          {/* Related High-Intent Patient Guides (Internal SEO Linking) */}
          <section className="mt-12 pt-10 border-t border-cosmeto-sandBorder space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-cosmeto-charcoal">
              {ui.relatedQuestionsTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BLOG_POSTS.filter((other) => other.slug !== post.slug).map(
                (related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group rounded-3xl bg-white p-6 border border-cosmeto-sandBorder hover:border-cosmeto-green shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2.5">
                      <span className="inline-block px-3 py-1 rounded-full bg-cosmeto-green/15 text-cosmeto-greenDark text-[11px] font-bold uppercase tracking-wider">
                        {getLocalizedText(related.categoryLabel, locale)}
                      </span>
                      <h3 className="text-lg font-bold text-cosmeto-charcoal group-hover:text-cosmeto-green transition leading-snug">
                        {getLocalizedText(related.h1CompleteTitle, locale)}
                      </h3>
                      <p className="text-xs sm:text-sm text-cosmeto-body line-clamp-3 leading-relaxed">
                        {getLocalizedText(related.h1DirectAnswer, locale)}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-cosmeto-teal group-hover:text-cosmeto-green transition">
                      <span>{ui.readArticleBtn}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                )
              )}
            </div>
          </section>
        </article>
      </main>

      {/* Contact & Footer Section */}
      <ContactSection
        locale={locale}
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
      />

      <StickyWhatsApp locale={locale} selectedCity={selectedCity} />
    </div>
  );
}
