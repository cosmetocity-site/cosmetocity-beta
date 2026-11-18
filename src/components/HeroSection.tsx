"use client";

import React from "react";
import {
  Sparkles,
  MessageCircle,
  ArrowRight,
  Plane,
  Building2,
  ShieldCheck,
  Award,
} from "lucide-react";
import { Locale, CityOption, SITE_COPY, buildWhatsAppLink } from "@/data/content";
import { trackWhatsAppClick } from "@/lib/analytics";

interface HeroSectionProps {
  locale: Locale;
  selectedCity: CityOption;
  onCityChange: (city: CityOption) => void;
}

export default function HeroSection({
  locale,
  selectedCity,
  onCityChange,
}: HeroSectionProps) {
  const copy = SITE_COPY[locale];

  return (
    <section className="relative overflow-hidden border-b border-cosmeto-sandBorder bg-cosmeto-sand">
      {/* Medical Background Visual Layer with Soft Warm Sandal Overlay (cosmetocity.com style) */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-cosmeto-sand/90 via-cosmeto-sandLight/95 to-white pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headline, City Switcher & Direct WhatsApp CTA */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cosmeto-green/15 border border-cosmeto-green/40 text-cosmeto-greenDark text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-cosmeto-green" />
              <span>{copy.heroTrustPill}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-bold leading-[1.14] text-cosmeto-charcoal">
              <span className="block">{copy.heroTitleLine1}</span>
              <span className="block text-cosmeto-green mt-1">
                {copy.heroTitleHighlight}
              </span>
            </h1>

            <p className="text-cosmeto-body text-base sm:text-lg leading-relaxed max-w-2xl">
              {copy.heroSubtitle}
            </p>

            {/* Antalya Main Hub vs. Istanbul Option Selector */}
            <div className="bg-white/95 rounded-2xl p-4 sm:p-5 border-2 border-cosmeto-green/40 shadow-sm space-y-3">
              <span className="block text-xs font-bold uppercase tracking-wider text-cosmeto-teal">
                {copy.citySelectorTitle}
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => onCityChange("antalya")}
                  className={`text-left p-3.5 rounded-xl border-2 transition ${
                    selectedCity === "antalya"
                      ? "border-cosmeto-green bg-cosmeto-green/10"
                      : "border-cosmeto-sandBorder bg-cosmeto-sandLight hover:border-cosmeto-green/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs sm:text-sm text-cosmeto-charcoal">
                      {copy.cityAntalyaBadge}
                    </span>
                    <Plane className="w-4 h-4 text-cosmeto-green shrink-0" />
                  </div>
                  <p className="text-xs text-cosmeto-body leading-snug">
                    {copy.cityAntalyaDesc}
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => onCityChange("istanbul")}
                  className={`text-left p-3.5 rounded-xl border-2 transition ${
                    selectedCity === "istanbul"
                      ? "border-cosmeto-teal bg-cosmeto-ice/40"
                      : "border-cosmeto-sandBorder bg-cosmeto-sandLight hover:border-cosmeto-teal/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs sm:text-sm text-cosmeto-charcoal">
                      {copy.cityIstanbulBadge}
                    </span>
                    <Building2 className="w-4 h-4 text-cosmeto-teal shrink-0" />
                  </div>
                  <p className="text-xs text-cosmeto-body leading-snug">
                    {copy.cityIstanbulDesc}
                  </p>
                </button>
              </div>
            </div>

            {/* Primary WhatsApp CTA & Secondary Scroll Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <a
                href={buildWhatsAppLink(
                  locale,
                  "World-Class Treatment Package",
                  selectedCity
                )}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackWhatsAppClick({
                    source: "hero_primary_cta",
                    topic: "World-Class Treatment Package",
                    city: selectedCity,
                    locale,
                  })
                }
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-cosmeto-green hover:bg-cosmeto-teal text-white font-bold text-sm sm:text-base transition shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{copy.heroPrimaryCta}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#treatments"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white hover:bg-cosmeto-sand border border-cosmeto-sandBorder text-cosmeto-charcoal font-bold text-sm sm:text-base transition"
              >
                <span>{copy.heroSecondaryCta}</span>
              </a>
            </div>

            {/* Key Trust Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5 border-t border-cosmeto-sandBorder">
              {copy.heroStats.map((stat, idx) => (
                <div key={idx}>
                  <span className="block text-2xl sm:text-3xl font-bold text-cosmeto-green">
                    {stat.value}
                  </span>
                  <span className="text-xs font-medium text-cosmeto-body">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Reassuring Medical & Resort Visual Card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-white border-2 border-cosmeto-green/60 p-6 sm:p-7 shadow-xl space-y-5">
              <div className="relative h-60 sm:h-64 rounded-2xl overflow-hidden bg-cosmeto-charcoal">
                <img
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80"
                  alt="CosmetoCity Accredited Hospital & Specialist Care in Antalya"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-cosmeto-green text-white text-xs font-bold shadow">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Lara / Muratpaşa, Antalya</span>
                </div>
                <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white">
                  <span className="text-xs font-bold bg-black/55 px-3 py-1 rounded-full backdrop-blur-sm">
                    OFM Antalya Hospital & VIP Suites
                  </span>
                  <span className="px-3 py-1 rounded-full bg-cosmeto-teal text-white text-xs font-bold">
                    🇬🇧 UK & 🇩🇪 DE Desk
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2.5 text-center">
                <div className="p-3 rounded-xl bg-cosmeto-sand/60 border border-cosmeto-sandBorder">
                  <span className="block text-xs font-semibold text-cosmeto-body">
                    Hair
                  </span>
                  <span className="font-bold text-sm text-cosmeto-greenDark">
                    {locale === "en" ? "£1,690" : "€1,990"}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-cosmeto-sand/60 border border-cosmeto-sandBorder">
                  <span className="block text-xs font-semibold text-cosmeto-body">
                    Dental
                  </span>
                  <span className="font-bold text-sm text-cosmeto-greenDark">
                    {locale === "en" ? "£2,550" : "€2,950"}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-cosmeto-sand/60 border border-cosmeto-sandBorder">
                  <span className="block text-xs font-semibold text-cosmeto-body">
                    Aesthetic
                  </span>
                  <span className="font-bold text-sm text-cosmeto-greenDark">
                    {locale === "en" ? "£1,950" : "€2,290"}
                  </span>
                </div>
              </div>

              <a
                href={buildWhatsAppLink(
                  locale,
                  "All-Inclusive Antalya VIP Package",
                  selectedCity
                )}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackWhatsAppClick({
                    source: "hero_card_cta",
                    topic: "All-Inclusive Antalya VIP Package",
                    city: selectedCity,
                    locale,
                  })
                }
                className="w-full py-3.5 rounded-xl bg-cosmeto-teal hover:bg-cosmeto-green text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition shadow"
              >
                <Award className="w-4 h-4" />
                <span>{copy.inquireWhatsappBtn}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
