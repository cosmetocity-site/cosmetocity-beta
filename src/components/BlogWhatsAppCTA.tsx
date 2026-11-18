"use client";

import React from "react";
import { MessageCircle, ShieldCheck, Clock, Sparkles } from "lucide-react";
import { Locale, CityOption } from "@/data/content";
import { BlogCtaConfig, BLOG_UI_COPY, buildBlogWhatsAppLink } from "@/data/blogPosts";
import { trackWhatsAppClick } from "@/lib/analytics";

interface BlogWhatsAppCTAProps {
  cta: BlogCtaConfig;
  locale: Locale;
  selectedCity?: CityOption;
  variant?: "mid" | "bottom";
}

export default function BlogWhatsAppCTA({
  cta,
  locale,
  selectedCity = "antalya",
  variant = "mid",
}: BlogWhatsAppCTAProps) {
  const uiCopy = BLOG_UI_COPY[locale];
  const whatsappUrl = buildBlogWhatsAppLink(
    locale,
    cta.whatsappTopic[locale],
    selectedCity
  );

  const isBottom = variant === "bottom";

  return (
    <aside
      aria-label="WhatsApp Medical Consultation Call to Action"
      className={`my-10 rounded-3xl p-6 sm:p-8 lg:p-9 border-2 transition shadow-xl ${
        isBottom
          ? "bg-gradient-to-br from-cosmeto-charcoal via-[#1F3A3D] to-cosmeto-tealDark text-white border-cosmeto-green"
          : "bg-gradient-to-br from-cosmeto-sand via-white to-cosmeto-ice/40 text-cosmeto-charcoal border-cosmeto-green/70"
      }`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-cosmeto-green/15 text-cosmeto-green border border-cosmeto-green/30">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>{cta.badge[locale]}</span>
          </div>

          <h3
            className={`text-xl sm:text-2xl font-bold leading-snug ${
              isBottom ? "text-white" : "text-cosmeto-charcoal"
            }`}
          >
            {cta.title[locale]}
          </h3>

          <p
            className={`text-sm sm:text-base leading-relaxed ${
              isBottom ? "text-cosmeto-ice" : "text-cosmeto-body"
            }`}
          >
            {cta.description[locale]}
          </p>

          <div
            className={`pt-1 flex flex-wrap items-center gap-4 text-xs font-semibold ${
              isBottom ? "text-cosmeto-sand" : "text-cosmeto-teal"
            }`}
          >
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cosmeto-green" />
              {uiCopy.replyTimeNote}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-cosmeto-green" />
              OFM Antalya Hospital & 5-Star Lara Recovery
            </span>
          </div>
        </div>

        <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackWhatsAppClick({
                source: `blog_article_${variant}_cta`,
                topic: cta.whatsappTopic[locale],
                city: selectedCity,
                locale,
              })
            }
            className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-[#25D366] hover:bg-cosmeto-green text-white font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 border-2 border-white/90"
          >
            <MessageCircle className="w-5 h-5 shrink-0" />
            <span>{cta.buttonText[locale]}</span>
          </a>
          <span
            className={`text-[11px] text-center font-semibold ${
              isBottom ? "text-white/80" : "text-cosmeto-body"
            }`}
          >
            🇬🇧 English • 🇩🇪 Deutsch • 🇹🇷 Türkçe (+90 552 602 2489)
          </span>
        </div>
      </div>
    </aside>
  );
}
