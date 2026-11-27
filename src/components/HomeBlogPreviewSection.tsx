"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  ArrowRight,
  Clock,
  ShieldCheck,
  Calendar,
} from "lucide-react";
import {
  Locale,
  CityOption,
  SUPPORTED_LANGUAGES,
  isRtlLocale,
} from "@/data/content";
import {
  BLOG_POSTS,
  BLOG_UI_COPY,
  getLocalizedText,
  getPostUrl,
  getBlogIndexUrl,
} from "@/data/blogPosts";

interface HomeBlogPreviewSectionProps {
  locale: Locale;
  selectedCity?: CityOption;
}

const LATEST_BLOG_HEADINGS: Record<
  Locale,
  { badge: string; title: string; subtitle: string; viewAll: string }
> = {
  en: {
    badge: "LATEST FROM OUR BLOG",
    title: "Latest from Our Blog",
    subtitle:
      "Surgeon-reviewed recovery guides, clinical timelines, and answers for international patients.",
    viewAll: "View All Medical Guides",
  },
  de: {
    badge: "NEUESTES AUS UNSEREM BLOG",
    title: "Neuestes aus unserem Medizin-Blog",
    subtitle:
      "Ärztlich geprüfte Heilungsratgeber, Abläufe und Antworten für internationale Patienten.",
    viewAll: "Alle Ratgeber ansehen",
  },
  ru: {
    badge: "НОВОЕ В НАШЕМ БЛОГЕ",
    title: "Последние статьи медицинского блога",
    subtitle:
      "Проверенные хирургами руководства по восстановлению, срокам и подготовке к лечению.",
    viewAll: "Все медицинские статьи",
  },
  es: {
    badge: "LO ÚLTIMO EN NUESTRO BLOG",
    title: "Últimos Artículos de Nuestro Blog",
    subtitle:
      "Guías médicas de recuperación verificadas por cirujanos para pacientes internacionales.",
    viewAll: "Ver todas las guías médicas",
  },
  ar: {
    badge: "أحدث مقالات المدونة الطبية",
    title: "أحدث مقالات مدونتنا الطبية",
    subtitle:
      "أدلة تعافٍ وإجابات طبية دقيقة يراجعها نخبة جراحينا لمرضانا الدوليين.",
    viewAll: "تصفح جميع الأدلة الطبية",
  },
  fr: {
    badge: "DERNIERS ARTICLES DU BLOG",
    title: "Derniers Articles de Notre Blog",
    subtitle:
      "Guides de convalescence validés par nos chirurgiens pour les patients internationaux.",
    viewAll: "Voir tous les guides médicaux",
  },
  it: {
    badge: "ULTIMI ARTICOLI DAL BLOG",
    title: "Ultimi Articoli dal Nostro Blog",
    subtitle:
      "Guide cliniche al recupero approvate dai chirurghi per i pazienti internazionali.",
    viewAll: "Vedi tutte le guide mediche",
  },
};

export default function HomeBlogPreviewSection({
  locale,
}: HomeBlogPreviewSectionProps) {
  const ui = BLOG_UI_COPY[locale];
  const heading = LATEST_BLOG_HEADINGS[locale];
  const isRtl = isRtlLocale(locale);

  // Latest 3 blog articles sorted by publishedAt descending
  const latestPosts = [...BLOG_POSTS]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 3);

  return (
    <section
      id="blog"
      dir={isRtl ? "rtl" : "ltr"}
      className="py-16 sm:py-20 bg-white border-t border-cosmeto-sandBorder"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Clean Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2.5 max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cosmeto-green/15 text-cosmeto-greenDark text-xs font-bold tracking-widest uppercase">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{heading.badge}</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-cosmeto-charcoal">
              {heading.title}
            </h2>
            <p className="text-sm sm:text-base text-cosmeto-body">
              {heading.subtitle}
            </p>
          </div>

          <Link
            href={getBlogIndexUrl(locale)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cosmeto-sand hover:bg-cosmeto-sandBorder text-cosmeto-charcoal font-bold text-xs sm:text-sm transition shrink-0"
          >
            <span>{heading.viewAll}</span>
            <ArrowRight
              className={`w-4 h-4 text-cosmeto-green ${
                isRtl ? "rotate-180" : ""
              }`}
            />
          </Link>
        </div>

        {/* Clean 3-Card Grid of Latest Articles in Selected Language */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {latestPosts.map((post) => {
            const articleHref = getPostUrl(post, locale);
            const titleText = getLocalizedText(post.h1CompleteTitle, locale);
            const directAnswer = getLocalizedText(post.h1DirectAnswer, locale);

            return (
              <article
                key={`${locale}-${post.slug}`}
                lang={locale}
                dir={isRtl ? "rtl" : "ltr"}
                className="group rounded-3xl bg-cosmeto-sandLight border border-cosmeto-sandBorder hover:border-cosmeto-green shadow-sm hover:shadow-xl transition overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <Link
                    href={articleHref}
                    className="block aspect-[16/10] w-full overflow-hidden bg-cosmeto-charcoal"
                  >
                    <img
                      src={post.heroImage}
                      alt={titleText}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
                    />
                  </Link>

                  <div className="p-6 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-bold">
                      <span className="px-2.5 py-1 rounded-full bg-cosmeto-green/15 text-cosmeto-greenDark uppercase tracking-wider">
                        {getLocalizedText(post.categoryLabel, locale)}
                      </span>
                      <span className="inline-flex items-center gap-1 text-cosmeto-teal">
                        <Clock className="w-3.5 h-3.5 text-cosmeto-green" />
                        {getLocalizedText(post.readingTime, locale)}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-cosmeto-charcoal group-hover:text-cosmeto-green transition leading-snug line-clamp-2">
                      <Link href={articleHref}>{titleText}</Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-cosmeto-body leading-relaxed line-clamp-3">
                      {directAnswer}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-cosmeto-sandBorder/70 flex items-center justify-between gap-2 text-xs">
                  <span className="inline-flex items-center gap-1 text-cosmeto-body font-medium">
                    <Calendar className="w-3.5 h-3.5 text-cosmeto-teal" />
                    {post.publishedAt}
                  </span>

                  <Link
                    href={articleHref}
                    className="inline-flex items-center gap-1.5 font-bold text-cosmeto-teal group-hover:text-cosmeto-green transition"
                  >
                    <span>{ui.readArticleBtn}</span>
                    <ArrowRight
                      className={`w-3.5 h-3.5 ${isRtl ? "rotate-180" : ""}`}
                    />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Direct Multilingual Blog Hub Links (Ensures Googlebot crawls & passes authority to all 7 language blog hubs) */}
        <div className="pt-4 border-t border-cosmeto-sandBorder flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="inline-flex items-center gap-1.5 font-bold text-cosmeto-teal">
            <ShieldCheck className="w-4 h-4 text-cosmeto-green" />
            <span>{ui.blogNavLabel}:</span>
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <Link
                key={lang.code}
                href={getBlogIndexUrl(lang.code)}
                className={`px-3 py-1 rounded-full font-bold border transition ${
                  lang.code === locale
                    ? "bg-cosmeto-green text-white border-cosmeto-green"
                    : "bg-cosmeto-sandLight text-cosmeto-charcoal border-cosmeto-sandBorder hover:border-cosmeto-green"
                }`}
              >
                {lang.flag} {lang.nativeName}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
