"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import { Locale, isRtlLocale } from "@/data/content";
import {
  BlogPost,
  BLOG_POSTS,
  BLOG_UI_COPY,
  getLocalizedText,
  getPostUrl,
  getBlogIndexUrl,
} from "@/data/blogPosts";

interface RelatedArticlesProps {
  currentPost: BlogPost;
  locale: Locale;
}

const RELATED_HEADING: Record<
  Locale,
  { title: string; subtitle: string; viewAll: string }
> = {
  en: {
    title: "Related Articles",
    subtitle: "Continue exploring surgeon-reviewed medical guides in English",
    viewAll: "View all articles",
  },
  de: {
    title: "Ähnliche Artikel",
    subtitle: "Weitere ärztlich geprüfte Ratgeber auf Deutsch entdecken",
    viewAll: "Alle Artikel ansehen",
  },
  ru: {
    title: "Похожие статьи",
    subtitle: "Читайте другие медицинские руководства на русском языке",
    viewAll: "Все статьи блога",
  },
  es: {
    title: "Artículos Relacionados",
    subtitle: "Sigue explorando guías médicas verificadas en español",
    viewAll: "Ver todos los artículos",
  },
  ar: {
    title: "مقالات ذات صلة",
    subtitle: "تصفح المزيد من الأدلة الطبية المعتمدة باللغة العربية",
    viewAll: "عرض جميع المقالات",
  },
  fr: {
    title: "Articles Connexes",
    subtitle: "Découvrez d'autres guides médicaux vérifiés en français",
    viewAll: "Voir tous les articles",
  },
  it: {
    title: "Articoli Correlati",
    subtitle: "Scopri altre guide mediche approvate dai chirurghi in italiano",
    viewAll: "Vedi tutti gli articoli",
  },
};

export default function RelatedArticles({
  currentPost,
  locale,
}: RelatedArticlesProps) {
  const ui = BLOG_UI_COPY[locale];
  const heading = RELATED_HEADING[locale];
  const isRtl = isRtlLocale(locale);

  // Pick exactly 3 related posts in the same language, prioritizing same category first, then newest
  const relatedPosts = BLOG_POSTS.filter(
    (other) => other.slug !== currentPost.slug
  )
    .sort((a, b) => {
      const aSameCat = a.category === currentPost.category ? 1 : 0;
      const bSameCat = b.category === currentPost.category ? 1 : 0;
      if (aSameCat !== bSameCat) return bSameCat - aSameCat;
      return b.publishedAt.localeCompare(a.publishedAt);
    })
    .slice(0, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <section
      dir={isRtl ? "rtl" : "ltr"}
      aria-label={heading.title}
      className="mt-12 pt-10 border-t border-cosmeto-sandBorder space-y-6"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cosmeto-teal">
            <BookOpen className="w-3.5 h-3.5 text-cosmeto-green" />
            <span>{heading.title}</span>
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-cosmeto-charcoal">
            {heading.subtitle}
          </h2>
        </div>

        <Link
          href={getBlogIndexUrl(locale)}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-cosmeto-teal hover:text-cosmeto-green transition"
        >
          <span>{heading.viewAll}</span>
          <ArrowRight className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((related) => {
          const fallback = related.primaryLocale ?? "en";
          const title = getLocalizedText(
            related.h1CompleteTitle,
            locale,
            fallback
          );
          const excerpt = getLocalizedText(
            related.h1DirectAnswer,
            locale,
            fallback
          );

          return (
            <Link
              key={`${locale}-${related.slug}`}
              href={getPostUrl(related, locale)}
              className="group rounded-3xl bg-white border border-cosmeto-sandBorder hover:border-cosmeto-green shadow-sm hover:shadow-lg transition overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] w-full overflow-hidden bg-cosmeto-charcoal">
                  <img
                    src={related.heroImage}
                    alt={title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between gap-2 text-[11px] font-bold">
                    <span className="px-2.5 py-1 rounded-full bg-cosmeto-green/15 text-cosmeto-greenDark uppercase tracking-wider truncate">
                      {getLocalizedText(
                        related.categoryLabel,
                        locale,
                        fallback
                      )}
                    </span>
                    <span className="inline-flex items-center gap-1 text-cosmeto-teal shrink-0">
                      <Clock className="w-3 h-3" />
                      {getLocalizedText(related.readingTime, locale, fallback)}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-cosmeto-charcoal group-hover:text-cosmeto-green transition leading-snug line-clamp-2">
                    {title}
                  </h3>
                  <p className="text-xs text-cosmeto-body line-clamp-3 leading-relaxed">
                    {excerpt}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-cosmeto-teal group-hover:text-cosmeto-green transition">
                  <span>{ui.readArticleBtn}</span>
                  <ArrowRight
                    className={`w-3.5 h-3.5 ${isRtl ? "rotate-180" : ""}`}
                  />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
