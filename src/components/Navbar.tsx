"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sun, MapPin, PhoneCall, Menu, X } from "lucide-react";
import { Locale, CityOption, SITE_COPY, buildWhatsAppLink } from "@/data/content";
import { trackWhatsAppClick } from "@/lib/analytics";

interface NavbarProps {
  locale: Locale;
  onLocaleChange: (newLocale: Locale) => void;
  selectedCity: CityOption;
}

export default function Navbar({
  locale,
  onLocaleChange,
  selectedCity,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const copy = SITE_COPY[locale];

  return (
    <>
      {/* Top Clinical Utility Strip */}
      <div className="bg-cosmeto-teal text-white text-xs border-b border-cosmeto-cyan/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4 text-cosmeto-sand shrink-0" />
            <span className="font-semibold">{copy.topBadge}</span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-cosmeto-sand font-semibold">
              <span className="w-2 h-2 rounded-full bg-cosmeto-green animate-ping" />
              {copy.topSub}
            </span>
            <span className="text-white/30">|</span>
            <span className="inline-flex items-center gap-1 font-semibold">
              <MapPin className="w-3.5 h-3.5 text-cosmeto-sand" />
              Lara / Muratpaşa, Antalya
            </span>
          </div>
        </div>
      </div>

      {/* Main Sticky Header & Navigation */}
      <header className="sticky top-0 z-40 bg-cosmeto-sand/95 backdrop-blur-md border-b border-cosmeto-sandBorder text-cosmeto-charcoal shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3">
          {/* Clean Logo Area */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full bg-cosmeto-green group-hover:bg-cosmeto-teal transition flex items-center justify-center text-white font-bold text-2xl shadow-md border-2 border-white">
              C
            </div>
            <div>
              <span className="block text-xl sm:text-2xl font-bold tracking-wider text-cosmeto-charcoal">
                COSMETO<span className="text-cosmeto-green">CITY</span>
              </span>
              <span className="block text-[10px] uppercase tracking-[0.18em] text-cosmeto-teal font-bold">
                ANTALYA • ISTANBUL
              </span>
            </div>
          </Link>

          {/* Navigation Links: Treatments, Before/After, Reviews, Blog, Contact */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-bold uppercase tracking-wide text-cosmeto-charcoal">
            <a
              href="/#treatments"
              className="hover:text-cosmeto-green transition"
            >
              {copy.navTreatments}
            </a>
            <a
              href="/#before-after"
              className="hover:text-cosmeto-green transition"
            >
              {copy.navBeforeAfter}
            </a>
            <a href="/#reviews" className="hover:text-cosmeto-green transition">
              {copy.navReviews}
            </a>
            <Link
              href="/blog"
              className="hover:text-cosmeto-green transition inline-flex items-center gap-1.5 text-cosmeto-teal"
            >
              <span>Blog & FAQ</span>
              <span className="px-1.5 py-0.5 rounded-md bg-cosmeto-green/15 text-cosmeto-greenDark text-[10px] font-extrabold">
                NEW
              </span>
            </Link>
            <a href="/#contact" className="hover:text-cosmeto-green transition">
              {copy.navContact}
            </a>
          </nav>

          {/* Right Actions: Language Switcher + Prominent "Free Consultation" Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="inline-flex items-center rounded-xl bg-white p-1 border border-cosmeto-sandBorder shadow-sm">
              <button
                type="button"
                onClick={() => onLocaleChange("en")}
                className={`px-2 py-1 rounded-lg text-xs font-bold transition ${
                  locale === "en"
                    ? "bg-cosmeto-green text-white"
                    : "text-cosmeto-charcoal hover:text-cosmeto-green"
                }`}
              >
                🇬🇧 EN
              </button>
              <button
                type="button"
                onClick={() => onLocaleChange("de")}
                className={`px-2 py-1 rounded-lg text-xs font-bold transition ${
                  locale === "de"
                    ? "bg-cosmeto-green text-white"
                    : "text-cosmeto-charcoal hover:text-cosmeto-green"
                }`}
              >
                🇩🇪 DE
              </button>
              <button
                type="button"
                onClick={() => onLocaleChange("tr")}
                className={`px-2 py-1 rounded-lg text-xs font-bold transition ${
                  locale === "tr"
                    ? "bg-cosmeto-green text-white"
                    : "text-cosmeto-charcoal hover:text-cosmeto-green"
                }`}
              >
                🇹🇷 TR
              </button>
            </div>

            <a
              href={buildWhatsAppLink(locale, "Free Consultation", selectedCity)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackWhatsAppClick({
                  source: "navbar_desktop_cta",
                  topic: "Free Consultation",
                  city: selectedCity,
                  locale,
                })
              }
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cosmeto-green hover:bg-cosmeto-teal text-white font-bold text-xs sm:text-sm transition shadow-md"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{copy.navCta}</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white border border-cosmeto-sandBorder text-cosmeto-charcoal"
              aria-label="Toggle Mobile Navigation"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-cosmeto-sand border-t border-cosmeto-sandBorder px-4 py-5 space-y-3 text-sm font-bold">
            <a
              href="/#treatments"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-cosmeto-charcoal hover:text-cosmeto-green"
            >
              {copy.navTreatments}
            </a>
            <a
              href="/#before-after"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-cosmeto-charcoal hover:text-cosmeto-green"
            >
              {copy.navBeforeAfter}
            </a>
            <a
              href="/#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-cosmeto-charcoal hover:text-cosmeto-green"
            >
              {copy.navReviews}
            </a>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-cosmeto-teal hover:text-cosmeto-green"
            >
              Blog & FAQ (Recovery Guides)
            </Link>
            <a
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-cosmeto-charcoal hover:text-cosmeto-green"
            >
              {copy.navContact}
            </a>
            <a
              href={buildWhatsAppLink(locale, "Free Consultation", selectedCity)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackWhatsAppClick({
                  source: "navbar_mobile_cta",
                  topic: "Free Consultation",
                  city: selectedCity,
                  locale,
                })
              }
              className="block w-full text-center py-3 rounded-xl bg-cosmeto-green text-white font-bold shadow"
            >
              {copy.navCta}
            </a>
          </div>
        )}
      </header>
    </>
  );
}
