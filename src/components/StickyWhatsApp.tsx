"use client";

import React from "react";
import { MessageCircle, Calculator } from "lucide-react";
import {
  Locale,
  CityOption,
  SITE_COPY,
  isRtlLocale,
  buildWhatsAppLink,
} from "@/data/content";
import { trackWhatsAppClick } from "@/lib/analytics";

interface StickyWhatsAppProps {
  locale: Locale;
  selectedCity: CityOption;
  onOpenCalculator?: () => void;
}

const STICKY_CALC_COPY: Record<
  Locale,
  {
    title: string;
    sub: string;
  }
> = {
  en: {
    title: "Price Calculator",
    sub: "3-Month Price Lock",
  },
  de: {
    title: "Preisrechner",
    sub: "3-Monate-Festpreis",
  },
  ru: {
    title: "Калькулятор цен",
    sub: "Фиксация цены 3 мес.",
  },
  es: {
    title: "Calculadora de Precios",
    sub: "Precio Fijo 3 Meses",
  },
  ar: {
    title: "حاسبة الأسعار",
    sub: "ضمان السعر 3 أشهر",
  },
  fr: {
    title: "Calculateur de Prix",
    sub: "Prix Fixe 3 Mois",
  },
  it: {
    title: "Calcolatore Prezzi",
    sub: "Prezzo Fisso 3 Mesi",
  },
};

export default function StickyWhatsApp({
  locale,
  selectedCity,
  onOpenCalculator,
}: StickyWhatsAppProps) {
  const copy = SITE_COPY[locale];
  const calcCopy = STICKY_CALC_COPY[locale];
  const isRtl = isRtlLocale(locale);

  const handleCalculatorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onOpenCalculator) {
      e.preventDefault();
      onOpenCalculator();
      return;
    }

    if (typeof document !== "undefined") {
      const quizEl = document.getElementById("quiz-calculator");
      if (quizEl) {
        e.preventDefault();
        quizEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className={`fixed bottom-4 sm:bottom-5 z-50 flex flex-col gap-2.5 ${
        isRtl
          ? "left-4 sm:left-5 items-start"
          : "right-4 sm:right-5 items-end"
      }`}
    >
      {/* 1. Sticky "Price Calculator" Button (Positioned directly above Sticky WhatsApp without overlap) */}
      <a
        href="/#quiz-calculator"
        onClick={handleCalculatorClick}
        aria-label={calcCopy.title}
        className="flex items-center gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full bg-cosmeto-charcoal hover:bg-cosmeto-teal text-white font-bold shadow-xl transition transform hover:-translate-y-0.5 border-2 border-cosmeto-green"
      >
        <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-cosmeto-green text-white shrink-0">
          <Calculator className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <div className={isRtl ? "text-right pl-1" : "text-left pr-1"}>
          <span className="block text-xs sm:text-sm font-extrabold leading-tight">
            {calcCopy.title}
          </span>
          <span className="hidden sm:block text-[10px] font-semibold text-cosmeto-sand">
            {calcCopy.sub}
          </span>
        </div>
      </a>

      {/* 2. Sticky WhatsApp Consultation Button */}
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
        className="whatsapp-sticky-pulse flex items-center gap-2.5 sm:gap-3 px-4 py-2.5 sm:px-5 sm:py-3.5 rounded-full bg-[#25D366] hover:bg-cosmeto-green text-white font-bold shadow-2xl transition transform hover:-translate-y-0.5 border-2 border-white"
      >
        <div className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-[#25D366] shrink-0">
          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-cosmeto-green border-2 border-white" />
        </div>
        <div className={isRtl ? "text-right pl-1" : "text-left pr-1"}>
          <span className="block text-xs sm:text-sm font-bold leading-tight">
            {copy.stickyWhatsappText}
          </span>
          <span className="hidden sm:block text-[10px] font-medium text-white/95">
            {copy.stickyWhatsappSub}
          </span>
        </div>
      </a>
    </div>
  );
}
