"use client";

import React from "react";
import {
  UserCheck,
  Smile,
  Sparkles,
  Calendar,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import {
  Locale,
  CityOption,
  SITE_COPY,
  TREATMENTS_DATA,
  buildWhatsAppLink,
} from "@/data/content";
import { trackWhatsAppClick } from "@/lib/analytics";

interface ServicesGridProps {
  locale: Locale;
  selectedCity: CityOption;
}

export default function ServicesGrid({
  locale,
  selectedCity,
}: ServicesGridProps) {
  const copy = SITE_COPY[locale];

  const renderCategoryIcon = (categoryKey: "hair" | "dental" | "aesthetic") => {
    switch (categoryKey) {
      case "hair":
        return <UserCheck className="w-6 h-6 text-white" />;
      case "dental":
        return <Smile className="w-6 h-6 text-white" />;
      case "aesthetic":
        return <Sparkles className="w-6 h-6 text-white" />;
    }
  };

  return (
    <section
      id="treatments"
      className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <span className="inline-block px-4 py-1 rounded-full bg-cosmeto-green/15 text-cosmeto-greenDark text-xs font-bold tracking-widest uppercase mb-3">
          {copy.treatmentsTag}
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-cosmeto-charcoal mb-3 uppercase tracking-wide">
          {copy.treatmentsTitle}
        </h2>
        <div className="w-16 h-1 bg-cosmeto-green mx-auto mb-4 rounded-full" />
        <p className="text-cosmeto-body text-base">
          {copy.treatmentsSubtitle}
        </p>
      </div>

      {/* Services 3-Column Mobile-First Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TREATMENTS_DATA.map((item) => (
          <article
            key={item.id}
            className="bg-white rounded-3xl border-2 border-dashed border-cosmeto-green hover:border-solid hover:border-cosmeto-teal overflow-hidden shadow-sm hover:shadow-xl transition flex flex-col justify-between group"
          >
            <div>
              {/* Card Image Header + Floating Icon Badge */}
              <div className="relative h-56 overflow-hidden bg-cosmeto-charcoal">
                <img
                  src={item.image}
                  alt={item.title[locale]}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-cosmeto-green text-white text-[11px] font-bold tracking-wider uppercase shadow">
                  {item.badge[locale]}
                </span>

                {/* Icon Emblem */}
                <div className="absolute bottom-3 right-3.5 w-12 h-12 rounded-2xl bg-cosmeto-green group-hover:bg-cosmeto-teal transition flex items-center justify-center shadow-lg border-2 border-white">
                  {renderCategoryIcon(item.categoryKey)}
                </div>

                <div className="absolute bottom-3 left-3.5 flex items-center gap-1.5 text-white text-xs bg-black/60 px-3 py-1 rounded-lg backdrop-blur-sm">
                  <Calendar className="w-3.5 h-3.5 text-cosmeto-cyan" />
                  <span>{item.stayDuration[locale]}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7">
                <h3 className="text-xl font-bold text-cosmeto-charcoal mb-2.5">
                  {item.title[locale]}
                </h3>
                <p className="text-sm text-cosmeto-body leading-relaxed mb-5">
                  {item.description[locale]}
                </p>

                <ul className="space-y-2 mb-6">
                  {item.highlights[locale].map((point, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-xs sm:text-sm text-cosmeto-charcoal font-semibold"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cosmeto-green shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Card Footer: Price & Direct WhatsApp Inquiry */}
            <div className="p-6 pt-4 border-t border-cosmeto-sandBorder bg-cosmeto-sand/50 flex items-center justify-between gap-3">
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-cosmeto-teal font-bold">
                  {copy.priceFromLabel}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-cosmeto-greenDark">
                    {locale === "en" ? item.priceGBP : item.priceEUR}
                  </span>
                  <span className="text-xs text-cosmeto-taupe line-through">
                    {item.ukDePrice}
                  </span>
                </div>
              </div>

              <a
                href={buildWhatsAppLink(
                  locale,
                  item.title[locale],
                  selectedCity
                )}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackWhatsAppClick({
                    source: `services_grid_${item.id}`,
                    topic: item.title[locale],
                    city: selectedCity,
                    locale,
                  })
                }
                className="px-4 py-2.5 rounded-xl bg-cosmeto-green hover:bg-cosmeto-teal text-white text-xs font-bold transition flex items-center gap-1.5 shrink-0 shadow"
              >
                <span>{copy.inquireWhatsappBtn}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
