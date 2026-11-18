"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Star,
  PhoneCall,
  Calendar,
  MapPin,
  ArrowRight,
  SlidersHorizontal,
  Award,
  Menu,
  X,
  Globe,
  MessageCircle,
} from "lucide-react";
import {
  Locale,
  SITE_COPY,
  TREATMENTS_DATA,
  BEFORE_AFTER_CASES,
  TESTIMONIALS_DATA,
} from "@/data/content";

const WHATSAPP_NUMBER = "905000000000";

export default function CosmetocityLandingPage() {
  const [locale, setLocale] = useState<Locale>("en");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);

  const copy = SITE_COPY[locale];
  const currentCase = BEFORE_AFTER_CASES[activeCaseIndex];

  const getWhatsAppUrl = (customTopic?: string) => {
    const messages: Record<Locale, string> = {
      en: `Hello Cosmetocity Team! I am visiting cosmetocity.online from the UK/Europe and would like free medical information${
        customTopic ? ` about ${customTopic}` : ""
      }.`,
      de: `Hallo Cosmetocity-Team! Ich besuche cosmetocity.online und möchte gerne kostenlose Informationen${
        customTopic ? ` zu: ${customTopic}` : ""
      }.`,
      tr: `Merhaba Cosmetocity! cosmetocity.online üzerinden ulaşıyorum${
        customTopic ? `, ${customTopic} hakkında` : ""
      } ücretsiz bilgi ve fiyat teklifi almak istiyorum.`,
    };
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      messages[locale]
    )}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* TOP TRUST BAR */}
      <div className="bg-brand-dark text-slate-300 text-xs border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0" />
            <span className="font-medium">{copy.topBadge}</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-slate-300">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              {copy.topSub}
            </span>
            <span className="text-white/20">|</span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-brand-gold" />
              Istanbul, Turkey
            </span>
          </div>
        </div>
      </div>

      {/* STICKY HEADER */}
      <header className="sticky top-0 z-40 bg-brand-dark/95 backdrop-blur-md border-b border-white/10 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-gold to-amber-700 flex items-center justify-center text-brand-dark font-black text-xl shadow-md">
              C
            </div>
            <div>
              <span className="block text-lg sm:text-xl font-extrabold tracking-wider text-white">
                COSMETOCITY
              </span>
              <span className="block text-[10px] uppercase tracking-[0.2em] text-brand-gold">
                cosmetocity.online
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-200">
            <a href="#treatments" className="hover:text-brand-goldLight transition">
              {copy.navTreatments}
            </a>
            <a href="#before-after" className="hover:text-brand-goldLight transition">
              {copy.navBeforeAfter}
            </a>
            <a href="#why-us" className="hover:text-brand-goldLight transition">
              {copy.navWhyUs}
            </a>
            <a href="#reviews" className="hover:text-brand-goldLight transition">
              {copy.navReviews}
            </a>
          </nav>

          {/* Language Switcher (UK / DE / TR) + Header CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="inline-flex items-center rounded-xl bg-white/10 p-1 border border-white/15">
              <button
                type="button"
                onClick={() => setLocale("en")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                  locale === "en"
                    ? "bg-brand-gold text-brand-dark"
                    : "text-slate-200 hover:text-white"
                }`}
              >
                🇬🇧 EN
              </button>
              <button
                type="button"
                onClick={() => setLocale("de")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                  locale === "de"
                    ? "bg-brand-gold text-brand-dark"
                    : "text-slate-200 hover:text-white"
                }`}
              >
                🇩🇪 DE
              </button>
              <button
                type="button"
                onClick={() => setLocale("tr")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                  locale === "tr"
                    ? "bg-brand-gold text-brand-dark"
                    : "text-slate-200 hover:text-white"
                }`}
              >
                🇹🇷 TR
              </button>
            </div>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-gold hover:bg-brand-goldLight text-brand-dark font-bold text-xs sm:text-sm transition shadow-md"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{copy.navCta}</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/10 text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-brand-dark border-t border-white/10 px-4 py-5 space-y-3 text-sm">
            <a
              href="#treatments"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-200 hover:text-brand-gold"
            >
              {copy.navTreatments}
            </a>
            <a
              href="#before-after"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-200 hover:text-brand-gold"
            >
              {copy.navBeforeAfter}
            </a>
            <a
              href="#why-us"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-200 hover:text-brand-gold"
            >
              {copy.navWhyUs}
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-200 hover:text-brand-gold"
            >
              {copy.navReviews}
            </a>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-3 rounded-xl bg-brand-gold text-brand-dark font-bold"
            >
              {copy.navCta}
            </a>
          </div>
        )}
      </header>

      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-br from-brand-dark via-brand-navy to-slate-900 text-white py-14 sm:py-20 lg:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Hero Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-brand-gold/40 text-brand-goldLight text-xs font-bold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                <span>{copy.heroTrustPill}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.12] tracking-tight">
                <span className="block">{copy.heroTitleLine1}</span>
                <span className="block text-brand-gold mt-1">
                  {copy.heroTitleHighlight}
                </span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                {copy.heroSubtitle}
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm sm:text-base transition shadow-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{copy.heroPrimaryCta}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#before-after"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm sm:text-base transition"
                >
                  <SlidersHorizontal className="w-4 h-4 text-brand-gold" />
                  <span>{copy.heroSecondaryCta}</span>
                </a>
              </div>

              {/* Hero Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
                {copy.heroStats.map((stat, idx) => (
                  <div key={idx}>
                    <span className="block text-2xl sm:text-3xl font-extrabold text-brand-goldLight">
                      {stat.value}
                    </span>
                    <span className="text-xs text-slate-300">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Right Visual Trust Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-white/5 backdrop-blur-md border border-white/15 p-6 sm:p-7 shadow-2xl space-y-5">
                <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80"
                    alt="Cosmetocity JCI Hospital Suite Istanbul"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent" />
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-brand-dark/85 text-brand-goldLight text-xs font-bold border border-brand-gold/40">
                      JCI & ISO 9001 Certified
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/90 text-slate-950 text-xs font-extrabold">
                      🇬🇧 UK & 🇩🇪 DE Desk
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2.5 text-center">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="block text-xs text-slate-400">Hair</span>
                    <span className="font-extrabold text-sm text-white">
                      {locale === "en" ? "£1,790" : "€2,100"}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="block text-xs text-slate-400">Dental</span>
                    <span className="font-extrabold text-sm text-white">
                      {locale === "en" ? "£2,650" : "€3,100"}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="block text-xs text-slate-400">Aesthetic</span>
                    <span className="font-extrabold text-sm text-white">
                      {locale === "en" ? "£1,250" : "€1,490"}
                    </span>
                  </div>
                </div>

                <a
                  href={getWhatsAppUrl("VIP All-Inclusive Package")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-brand-gold hover:bg-brand-goldLight text-brand-dark font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition"
                >
                  <Award className="w-4 h-4" />
                  <span>{copy.inquireWhatsappBtn}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TEDAVİLERİMİZ (TREATMENTS: HAIR, DENTAL, MEDICAL AESTHETICS) */}
      <section id="treatments" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full bg-brand-navy/10 text-brand-navy text-xs font-extrabold tracking-widest uppercase mb-3">
            {copy.treatmentsTag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            {copy.treatmentsTitle}
          </h2>
          <p className="text-slate-600 text-base">{copy.treatmentsSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TREATMENTS_DATA.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl transition flex flex-col justify-between"
            >
              <div>
                <div className="relative h-56 overflow-hidden bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.title[locale]}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-brand-dark/90 text-brand-goldLight text-[11px] font-bold tracking-wider uppercase border border-brand-gold/30">
                    {item.badge[locale]}
                  </span>
                  <div className="absolute bottom-3 left-3.5 flex items-center gap-1.5 text-white text-xs bg-black/50 px-2.5 py-1 rounded-lg backdrop-blur-sm">
                    <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                    <span>{item.stayDuration[locale]}</span>
                  </div>
                </div>

                <div className="p-6 sm:p-7">
                  <h3 className="text-xl font-extrabold text-slate-900 mb-2.5">
                    {item.title[locale]}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-5">
                    {item.description[locale]}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {item.highlights[locale].map((point, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 font-medium"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-6 pt-4 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between gap-3">
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                    {copy.priceFromLabel}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-brand-navy">
                      {locale === "en" ? item.priceGBP : item.priceEUR}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      {item.ukDePrice}
                    </span>
                  </div>
                </div>

                <a
                  href={getWhatsAppUrl(item.title[locale])}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-dark text-brand-goldLight text-xs font-bold transition flex items-center gap-1.5 shrink-0"
                >
                  <span>{copy.inquireWhatsappBtn}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. ÖNCESİ / SONRASI (INTERACTIVE BEFORE / AFTER SECTION) */}
      <section
        id="before-after"
        className="py-16 sm:py-24 bg-brand-dark text-white border-y border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span className="text-xs font-extrabold tracking-widest uppercase text-brand-gold block mb-2">
              {copy.beforeAfterTag}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">
              {copy.beforeAfterTitle}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              {copy.beforeAfterSubtitle}
            </p>
          </div>

          {/* Case Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {BEFORE_AFTER_CASES.map((c, idx) => (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setActiveCaseIndex(idx);
                  setSliderPosition(50);
                }}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition border ${
                  activeCaseIndex === idx
                    ? "bg-brand-gold text-brand-dark border-brand-gold shadow-lg"
                    : "bg-white/5 text-slate-200 border-white/15 hover:bg-white/10"
                }`}
              >
                {c.procedureName[locale]}
              </button>
            ))}
          </div>

          {/* Interactive Comparison Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/5 rounded-3xl p-6 sm:p-8 border border-white/15">
            {/* Before/After Visual Split Slider */}
            <div className="lg:col-span-7">
              <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden select-none border border-white/20">
                {/* AFTER Image (Full layer) */}
                <img
                  src={currentCase.afterImage}
                  alt="After Procedure"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* BEFORE Image (Clipped by sliderPosition) */}
                <div
                  className="absolute inset-y-0 left-0 overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img
                    src={currentCase.beforeImage}
                    alt="Before Procedure"
                    className="w-full h-full object-cover max-w-none"
                    style={{ width: "100%" }}
                  />
                </div>

                {/* Vertical Divider Handle */}
                <div
                  className="absolute inset-y-0 w-1 bg-brand-gold shadow-xl pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-brand-gold text-brand-dark font-black flex items-center justify-center shadow-lg">
                    <SlidersHorizontal className="w-4 h-4" />
                  </div>
                </div>

                {/* Labels */}
                <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-lg bg-black/70 text-white text-xs font-extrabold tracking-wider">
                  {copy.beforeLabel}
                </span>
                <span className="absolute top-3.5 right-3.5 px-3 py-1 rounded-lg bg-emerald-600/90 text-white text-xs font-extrabold tracking-wider">
                  {copy.afterLabel}
                </span>
              </div>

              {/* Range Control for Mobile & Desktop */}
              <div className="mt-4 px-2">
                <input
                  type="range"
                  min={5}
                  max={95}
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  aria-label="Before and after comparison slider"
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <p className="text-center text-xs text-slate-400 mt-1">
                  {copy.sliderInstruction} ({sliderPosition}%)
                </p>
              </div>
            </div>

            {/* Case Medical Summary */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{currentCase.timeframe[locale]}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {currentCase.procedureName[locale]}
              </h3>

              <p className="text-sm font-semibold text-brand-goldLight">
                {currentCase.patientInfo[locale]}
              </p>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-xs uppercase tracking-wider text-slate-400 block">
                  Clinical Specification
                </span>
                <p className="text-sm font-bold text-white">
                  {currentCase.graftsOrDetails[locale]}
                </p>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed italic">
                &ldquo;{currentCase.doctorNote[locale]}&rdquo;
              </p>

              <a
                href={getWhatsAppUrl(currentCase.procedureName[locale])}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-brand-gold hover:bg-brand-goldLight text-brand-dark font-extrabold text-sm transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{copy.inquireWhatsappBtn}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* VIP ALL-INCLUSIVE FEATURES */}
      <section id="why-us" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold tracking-widest uppercase text-brand-teal block mb-2">
            {copy.vipPackageTag}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            {copy.vipPackageTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {copy.vipSteps.map((step, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm"
            >
              <span className="w-10 h-10 rounded-xl bg-brand-navy text-brand-goldLight font-extrabold flex items-center justify-center mb-4 text-sm">
                0{i + 1}
              </span>
              <h3 className="font-bold text-slate-900 text-base mb-2">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. HASTA YORUMLARI (UK & GERMANY PATIENT TESTIMONIALS) */}
      <section
        id="reviews"
        className="py-16 sm:py-24 bg-slate-100/80 border-t border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="inline-block px-3.5 py-1 rounded-full bg-brand-navy/10 text-brand-navy text-xs font-extrabold tracking-widest uppercase mb-3">
              {copy.reviewsTag}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
              {copy.reviewsTitle}
            </h2>
            <p className="text-slate-600 text-base">{copy.reviewsSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {TESTIMONIALS_DATA.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(rev.rating)].map((_, idx) => (
                        <Star key={idx} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      {rev.verifiedVia}
                    </span>
                  </div>

                  <p className="text-slate-700 text-sm leading-relaxed italic mb-6">
                    &ldquo;{rev.quote[locale]}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      {rev.flag} {rev.name}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {rev.cityCountry} • {rev.date}
                    </p>
                  </div>
                  <span className="text-[11px] font-semibold text-brand-navy bg-slate-100 px-2.5 py-1 rounded-lg max-w-[160px] truncate">
                    {rev.treatment[locale]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CONVERSION BANNER */}
      <section className="py-16 bg-gradient-to-r from-brand-dark via-brand-navy to-brand-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold">
            {copy.ctaBannerTitle}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            {copy.ctaBannerSub}
          </p>
          <div className="pt-2">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-base shadow-xl transition"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{copy.stickyWhatsappText}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-10 border-t border-white/10 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-brand-gold text-brand-dark font-black flex items-center justify-center">
              C
            </div>
            <span className="font-bold text-white tracking-wider">
              COSMETOCITY.ONLINE
            </span>
          </div>
          <p className="text-center sm:text-right">{copy.footerDisclaimer}</p>
        </div>
      </footer>

      {/* 5. STICKY "WHATSAPP'TAN BİLGİ AL" BUTTON (FIXED CORNER) */}
      <a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp'tan Bilgi Al"
        className="whatsapp-sticky-pulse fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold shadow-2xl transition transform hover:-translate-y-0.5"
      >
        <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-slate-950 text-emerald-400">
          <MessageCircle className="w-5 h-5" />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-300 border-2 border-slate-950" />
        </div>
        <div className="text-left pr-1">
          <span className="block text-xs sm:text-sm font-extrabold leading-tight">
            {copy.stickyWhatsappText}
          </span>
          <span className="hidden sm:block text-[10px] font-semibold text-slate-900/80">
            {copy.stickyWhatsappSub}
          </span>
        </div>
      </a>
    </div>
  );
}
