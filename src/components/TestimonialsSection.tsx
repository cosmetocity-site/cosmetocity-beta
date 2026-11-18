"use client";

import React from "react";
import { Star, ExternalLink, ShieldCheck, Calendar } from "lucide-react";
import {
  Locale,
  SITE_COPY,
  TESTIMONIALS_DATA,
  TRUSTPILOT_PROFILE_URL,
  isRtlLocale,
} from "@/data/content";

interface TestimonialsSectionProps {
  locale: Locale;
}

const TRUSTPILOT_UI: Record<
  Locale,
  {
    trustScoreLabel: string;
    readAllBtn: string;
    verifiedSourceNote: string;
    experienceDateLabel: string;
  }
> = {
  en: {
    trustScoreLabel: "Trustpilot Verified Profile • cosmetocity.com",
    readAllBtn: "Read all reviews on Trustpilot",
    verifiedSourceNote:
      "Authentic patient reviews published directly on Trustpilot for CosmetoCity Antalya.",
    experienceDateLabel: "Date of experience:",
  },
  de: {
    trustScoreLabel: "Verifiziertes Trustpilot-Profil • cosmetocity.com",
    readAllBtn: "Read all reviews on Trustpilot (Alle Bewertungen auf Trustpilot lesen)",
    verifiedSourceNote:
      "Echte Patientenbewertungen, die direkt auf Trustpilot für CosmetoCity Antalya veröffentlicht wurden.",
    experienceDateLabel: "Datum der Erfahrung:",
  },
  ru: {
    trustScoreLabel: "Проверенный профиль Trustpilot • cosmetocity.com",
    readAllBtn: "Read all reviews on Trustpilot (Читать все отзывы на Trustpilot)",
    verifiedSourceNote:
      "Подлинные отзывы пациентов, опубликованные на независимой платформе Trustpilot.",
    experienceDateLabel: "Дата отзыва:",
  },
  es: {
    trustScoreLabel: "Perfil Verificado en Trustpilot • cosmetocity.com",
    readAllBtn: "Read all reviews on Trustpilot (Leer todas las opiniones en Trustpilot)",
    verifiedSourceNote:
      "Opiniones reales de pacientes publicadas directamente en Trustpilot para CosmetoCity Antalya.",
    experienceDateLabel: "Fecha de la experiencia:",
  },
  ar: {
    trustScoreLabel: "ملف موثق على منصة Trustpilot • cosmetocity.com",
    readAllBtn: "Read all reviews on Trustpilot (اقرأ جميع التقييمات على Trustpilot)",
    verifiedSourceNote:
      "تقييمات حقيقية لمرضانا منشورة مباشرة على منصة Trustpilot العالمية لعيادات CosmetoCity أنطاليا.",
    experienceDateLabel: "تاريخ التجربة:",
  },
  fr: {
    trustScoreLabel: "Profil Vérifié Trustpilot • cosmetocity.com",
    readAllBtn: "Read all reviews on Trustpilot (Lire tous les avis sur Trustpilot)",
    verifiedSourceNote:
      "Avis authentiques de patients publiés directement sur Trustpilot pour CosmetoCity Antalya.",
    experienceDateLabel: "Date de l'expérience :",
  },
  it: {
    trustScoreLabel: "Profilo Verificato Trustpilot • cosmetocity.com",
    readAllBtn: "Read all reviews on Trustpilot (Leggi tutte le recensioni su Trustpilot)",
    verifiedSourceNote:
      "Recensioni autentiche dei pazienti pubblicate direttamente su Trustpilot per CosmetoCity Antalya.",
    experienceDateLabel: "Data dell'esperienza:",
  },
};

export default function TestimonialsSection({
  locale,
}: TestimonialsSectionProps) {
  const copy = SITE_COPY[locale];
  const tpUi = TRUSTPILOT_UI[locale];
  const isRtl = isRtlLocale(locale);

  return (
    <section
      id="reviews"
      dir={isRtl ? "rtl" : "ltr"}
      className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
        <a
          href={TRUSTPILOT_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00B67A]/15 hover:bg-[#00B67A]/25 text-[#008559] border border-[#00B67A]/40 text-xs font-extrabold tracking-wider uppercase mb-3 transition"
        >
          <Star className="w-3.5 h-3.5 fill-[#00B67A] text-[#00B67A]" />
          <span>{tpUi.trustScoreLabel}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        <h2 className="text-3xl sm:text-4xl font-bold text-cosmeto-charcoal mb-3 uppercase">
          {copy.reviewsTitle}
        </h2>
        <div className="w-16 h-1 bg-[#00B67A] mx-auto mb-4 rounded-full" />
        <p className="text-cosmeto-body text-sm sm:text-base">
          {tpUi.verifiedSourceNote}
        </p>
      </div>

      {/* Real Trustpilot Patient Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {TESTIMONIALS_DATA.map((rev) => (
          <article
            key={rev.id}
            className="bg-white rounded-3xl p-7 border-2 border-[#00B67A]/40 hover:border-[#00B67A] shadow-sm hover:shadow-lg transition flex flex-col justify-between"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(rev.rating)].map((_, idx) => (
                    <span
                      key={idx}
                      className="w-6 h-6 rounded bg-[#00B67A] flex items-center justify-center text-white"
                    >
                      <Star className="w-3.5 h-3.5 fill-white text-white" />
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#008559] bg-[#00B67A]/10 px-3 py-1 rounded-full border border-[#00B67A]/30">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00B67A]" />
                  <span>{rev.verifiedVia}</span>
                </span>
              </div>

              <p className="text-cosmeto-charcoal text-sm sm:text-base leading-relaxed italic mb-5">
                &ldquo;{rev.quote[locale]}&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-cosmeto-sandBorder flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-cosmeto-charcoal text-sm sm:text-base">
                  {rev.flag} {rev.name}
                </h3>
                <p className="text-xs text-cosmeto-body flex items-center gap-1.5 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-cosmeto-teal shrink-0" />
                  <span>
                    {tpUi.experienceDateLabel} <strong>{rev.date}</strong>
                  </span>
                </p>
              </div>
              <span className="text-[11px] font-bold text-cosmeto-teal bg-cosmeto-ice/50 px-3 py-1.5 rounded-xl max-w-[220px] truncate">
                {rev.treatment[locale]}
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Direct CTA Button to https://www.trustpilot.com/review/cosmetocity.com */}
      <div className="mt-10 sm:mt-12 text-center">
        <a
          href={TRUSTPILOT_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-[#00B67A] hover:bg-[#009966] text-white font-extrabold text-sm sm:text-base shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5"
        >
          <Star className="w-5 h-5 fill-white text-white shrink-0" />
          <span>{tpUi.readAllBtn}</span>
          <ExternalLink className="w-4 h-4 shrink-0" />
        </a>
      </div>
    </section>
  );
}
