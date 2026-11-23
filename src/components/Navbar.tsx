"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Sun,
  MapPin,
  PhoneCall,
  Menu,
  X,
  Globe,
  ChevronDown,
  Check,
} from "lucide-react";
import {
  Locale,
  CityOption,
  SITE_COPY,
  SUPPORTED_LANGUAGES,
  isRtlLocale,
  buildWhatsAppLink,
} from "@/data/content";
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
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const copy = SITE_COPY[locale];
  const isRtl = isRtlLocale(locale);
  const activeLanguage =
    SUPPORTED_LANGUAGES.find((l) => l.code === locale) ||
    SUPPORTED_LANGUAGES[0];

  // Synchronize document<html> lang and dir attributes whenever locale changes
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
      document.documentElement.dir = isRtl ? "rtl" : "ltr";
    }
  }, [locale, isRtl]);

  // Close language dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setLangDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectLanguage = (newLocale: Locale) => {
    onLocaleChange(newLocale);
    setLangDropdownOpen(false);
  };

  return (
    <>
      {/* Top Clinical Utility Strip */}
      <div
        dir={isRtl ? "rtl" : "ltr"}
        className="bg-cosmeto-teal text-white text-xs border-b border-cosmeto-cyan/30"
      >
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
      <header
        dir={isRtl ? "rtl" : "ltr"}
        className="sticky top-0 z-40 bg-cosmeto-sand/95 backdrop-blur-md border-b border-cosmeto-sandBorder text-cosmeto-charcoal shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3">
          {/* Clean Logo Area */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
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

          {/* Navigation Links: Treatments, Bariatric Surgery, Before/After, Reviews, Blog, Contact */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-bold uppercase tracking-wide text-cosmeto-charcoal">
            <a
              href="/#treatments"
              className="hover:text-cosmeto-green transition whitespace-nowrap"
            >
              {copy.navTreatments}
            </a>
            <a
              href="/#bariatric-surgery"
              className="hover:text-cosmeto-green transition whitespace-nowrap text-cosmeto-teal"
            >
              {copy.navBariatric}
            </a>
            <a
              href="/#before-after"
              className="hover:text-cosmeto-green transition whitespace-nowrap"
            >
              {copy.navBeforeAfter}
            </a>
            <a
              href="/#reviews"
              className="hover:text-cosmeto-green transition whitespace-nowrap"
            >
              {copy.navReviews}
            </a>
            <Link
              href="/blog"
              className="hover:text-cosmeto-green transition inline-flex items-center gap-1.5 text-cosmeto-teal whitespace-nowrap"
            >
              <span>{copy.navBlog}</span>
              <span className="px-1.5 py-0.5 rounded-md bg-cosmeto-green/15 text-cosmeto-greenDark text-[10px] font-extrabold">
                NEW
              </span>
            </Link>
            <a
              href="/#contact"
              className="hover:text-cosmeto-green transition whitespace-nowrap"
            >
              {copy.navContact}
            </a>
          </nav>

          {/* Right Actions: 7-Language Dropdown Switcher + Prominent "Free Consultation" Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* 7-Language Dropdown (Desktop & Mobile Header) */}
            <div ref={dropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setLangDropdownOpen((prev) => !prev)}
                aria-expanded={langDropdownOpen}
                aria-haspopup="listbox"
                aria-label="Select Language"
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 rounded-xl bg-white hover:bg-cosmeto-sandLight border border-cosmeto-sandBorder shadow-sm text-xs sm:text-sm font-bold text-cosmeto-charcoal transition"
              >
                <Globe className="w-4 h-4 text-cosmeto-teal shrink-0" />
                <span>
                  {activeLanguage.flag} {activeLanguage.shortLabel}
                </span>
                <span className="hidden md:inline text-xs font-semibold text-cosmeto-body">
                  ({activeLanguage.nativeName})
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-cosmeto-teal transition-transform duration-200 ${
                    langDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {langDropdownOpen && (
                <div
                  role="listbox"
                  aria-label="Supported Languages"
                  className={`absolute mt-2 w-52 rounded-2xl bg-white border-2 border-cosmeto-green/50 shadow-2xl py-2 z-50 ${
                    isRtl ? "left-0" : "right-0"
                  }`}
                >
                  {SUPPORTED_LANGUAGES.map((lang) => {
                    const isSelected = lang.code === locale;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => handleSelectLanguage(lang.code)}
                        className={`w-full px-3.5 py-2.5 text-xs sm:text-sm flex items-center justify-between gap-2 transition ${
                          isSelected
                            ? "bg-cosmeto-green/15 text-cosmeto-greenDark font-bold"
                            : "text-cosmeto-charcoal hover:bg-cosmeto-sandLight font-semibold"
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="text-base leading-none">
                            {lang.flag}
                          </span>
                          <span>{lang.nativeName}</span>
                          <span className="text-[11px] uppercase px-1.5 py-0.5 rounded bg-cosmeto-sand text-cosmeto-teal font-bold">
                            {lang.shortLabel}
                          </span>
                        </span>
                        {isSelected && (
                          <Check className="w-4 h-4 text-cosmeto-green shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
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
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cosmeto-green hover:bg-cosmeto-teal text-white font-bold text-xs sm:text-sm transition shadow-md whitespace-nowrap"
            >
              <PhoneCall className="w-4 h-4 shrink-0" />
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
              href="/#bariatric-surgery"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-cosmeto-teal hover:text-cosmeto-green"
            >
              {copy.navBariatric}
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
              {copy.navBlog}
            </Link>
            <a
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-cosmeto-charcoal hover:text-cosmeto-green"
            >
              {copy.navContact}
            </a>

            {/* Mobile Language Grid inside Drawer for instant 1-tap switching */}
            <div className="pt-2 border-t border-cosmeto-sandBorder">
              <span className="block text-[11px] uppercase tracking-wider text-cosmeto-teal mb-2">
                Language / اللغة / Язык
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      handleSelectLanguage(lang.code);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition ${
                      locale === lang.code
                        ? "bg-cosmeto-green text-white border-cosmeto-green shadow-sm"
                        : "bg-white text-cosmeto-charcoal border-cosmeto-sandBorder hover:border-cosmeto-green"
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span className="truncate">{lang.nativeName}</span>
                  </button>
                ))}
              </div>
            </div>

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
              className="block w-full text-center py-3.5 rounded-xl bg-cosmeto-green text-white font-bold shadow mt-2"
            >
              {copy.navCta}
            </a>
          </div>
        )}
      </header>
    </>
  );
}
