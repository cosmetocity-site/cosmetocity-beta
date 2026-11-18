"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { Locale, CityOption, SITE_COPY, buildWhatsAppLink } from "@/data/content";
import { trackWhatsAppClick } from "@/lib/analytics";

interface StickyWhatsAppProps {
  locale: Locale;
  selectedCity: CityOption;
}

export default function StickyWhatsApp({
  locale,
  selectedCity,
}: StickyWhatsAppProps) {
  const copy = SITE_COPY[locale];

  return (
    <a
      href={buildWhatsAppLink(locale, "Free Consultation", selectedCity)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp Free Consultation"
      onClick={() =>
        trackWhatsAppClick({
          source: "sticky_whatsapp_button",
          topic: "Free Consultation",
          city: selectedCity,
          locale,
        })
      }
      className="whatsapp-sticky-pulse fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-[#25D366] hover:bg-cosmeto-green text-white font-bold shadow-2xl transition transform hover:-translate-y-0.5 border-2 border-white"
    >
      <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-white text-[#25D366]">
        <MessageCircle className="w-5 h-5" />
        <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-cosmeto-green border-2 border-white" />
      </div>
      <div className="text-left pr-1">
        <span className="block text-xs sm:text-sm font-bold leading-tight">
          {copy.stickyWhatsappText}
        </span>
        <span className="hidden sm:block text-[10px] font-medium text-white/95">
          {copy.stickyWhatsappSub}
        </span>
      </div>
    </a>
  );
}
