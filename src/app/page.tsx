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
  MessageCircle,
  Sun,
  Plane,
  Building2,
} from "lucide-react";
import {
  Locale,
  CityOption,
  SITE_COPY,
  TREATMENTS_DATA,
  BEFORE_AFTER_CASES,
  TESTIMONIALS_DATA,
} from "@/data/content";

// Real CosmetoCity Antalya WhatsApp Line
const WHATSAPP_NUMBER = "905526022489";

export default function CosmetoCityAntalyaPage() {
  const [locale, setLocale] = useState<Locale>("en");
  const [selectedCity, setSelectedCity] = useState<CityOption>("antalya");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);

  const copy = SITE_COPY[locale];
  const currentCase = BEFORE_AFTER_CASES[activeCaseIndex];

  const getWhatsAppUrl = (customTopic?: string, cityOverride?: CityOption) => {
    const targetCity =
      (cityOverride || selectedCity) === "antalya" ? "Antalya" : "Istanbul";

    const messages: Record<Locale, string> = {
      en: `Hello CosmetoCity! I am visiting cosmetocity.online and would like a free medical quote for ${
        customTopic || "a treatment"
      } in ${targetCity}.`,
      de: `Hallo CosmetoCity-Team! Ich besuche cosmetocity.online und möchte gerne ein kostenloses Angebot für ${
        customTopic || "eine Behandlung"
      } in ${targetCity}.`,
      tr: `Merhaba CosmetoCity! cosmetocity.online üzerinden ulaşıyorum. ${targetCity} merkezli ${
        customTopic || "tedavi paketleriniz"
      } hakkında ücretsiz bilgi almak istiyorum.`,
    };
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      messages[locale]
    )}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-cosmeto-sandLight text-cosmeto-body">
      {/* TOP BAR (Sky Cyan & Deep Teal from cosmetocity.com palette) */}
      <div className="bg-cosmeto-teal text-white text-xs border-b border-cosmeto-cyan/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-2">
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

      {/* STICKY HEADER (Signature #F0EBD8 Sandal Cream & #36B729 CosmetoCity Green) */}
      <header className="sticky top-0 z-40 bg-cosmeto-sand/95 backdrop-blur-md border-b border-cosmeto-sandBorder text-cosmeto-charcoal shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3">
          {/* CosmetoCity Logo */}
          <a href="#" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-cosmeto-green flex items-center justify-center text-white font-bold text-2xl shadow-md border-2 border-white">
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
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-bold uppercase tracking-wide text-cosmeto-charcoal">
            <a
              href="#treatments"
              className="hover:text-cosmeto-green transition"
            >
              {copy.navTreatments}
            </a>
            <a
              href="#before-after"
              className="hover:text-cosmeto-green transition"
            >
              {copy.navBeforeAfter}
            </a>
            <a
              href="#why-antalya"
              className="hover:text-cosmeto-green transition"
            >
              {copy.navAntalya}
            </a>
            <a href="#reviews" className="hover:text-cosmeto-green transition">
              {copy.navReviews}
            </a>
          </nav>

          {/* Language Switcher (UK / DE / TR) + Primary Green CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="inline-flex items-center rounded-xl bg-white p-1 border border-cosmeto-sandBorder shadow-sm">
              <button
                type="button"
                onClick={() => setLocale("en")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                  locale === "en"
                    ? "bg-cosmeto-green text-white"
                    : "text-cosmeto-charcoal hover:text-cosmeto-green"
                }`}
              >
                🇬🇧 EN
              </button>
              <button
                type="button"
                onClick={() => setLocale("de")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                  locale === "de"
                    ? "bg-cosmeto-green text-white"
                    : "text-cosmeto-charcoal hover:text-cosmeto-green"
                }`}
              >
                🇩🇪 DE
              </button>
              <button
                type="button"
                onClick={() => setLocale("tr")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                  locale === "tr"
                    ? "bg-cosmeto-green text-white"
                    : "text-cosmeto-charcoal hover:text-cosmeto-green"
                }`}
              >
                🇹🇷 TR
              </button>
            </div>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cosmeto-green hover:bg-cosmeto-teal text-white font-bold text-xs sm:text-sm transition shadow-md"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{copy.navCta}</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white border border-cosmeto-sandBorder text-cosmeto-charcoal"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-cosmeto-sand border-t border-cosmeto-sandBorder px-4 py-5 space-y-3 text-sm font-bold">
            <a
              href="#treatments"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-cosmeto-charcoal hover:text-cosmeto-green"
            >
              {copy.navTreatments}
            </a>
            <a
              href="#before-after"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-cosmeto-charcoal hover:text-cosmeto-green"
            >
              {copy.navBeforeAfter}
            </a>
            <a
              href="#why-antalya"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-cosmeto-charcoal hover:text-cosmeto-green"
            >
              {copy.navAntalya}
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-cosmeto-charcoal hover:text-cosmeto-green"
            >
              {copy.navReviews}
            </a>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-3 rounded-xl bg-cosmeto-green text-white font-bold"
            >
              {copy.navCta}
            </a>
          </div>
        )}
      </header>

      {/* 1. HERO SECTION (Antalya Primary Hub + Istanbul Option & CosmetoCity Palette) */}
      <section className="relative bg-gradient-to-b from-cosmeto-sand via-cosmeto-sandLight to-white py-12 sm:py-16 lg:py-20 border-b border-cosmeto-sandBorder overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cosmeto-green/15 border border-cosmeto-green/40 text-cosmeto-greenDark text-xs font-bold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-cosmeto-green" />
                <span>{copy.heroTrustPill}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-bold leading-[1.15] text-cosmeto-charcoal">
                <span className="block">{copy.heroTitleLine1}</span>
                <span className="block text-cosmeto-green mt-1">
                  {copy.heroTitleHighlight}
                </span>
              </h1>

              <p className="text-cosmeto-body text-base sm:text-lg leading-relaxed max-w-2xl">
                {copy.heroSubtitle}
              </p>

              {/* INTERACTIVE DESTINATION SELECTOR: ANTALYA (MAIN) vs ISTANBUL (OPTION) */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-cosmeto-green/40 shadow-sm space-y-3">
                <span className="block text-xs font-bold uppercase tracking-wider text-cosmeto-teal">
                  {copy.citySelectorTitle}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedCity("antalya")}
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
                    onClick={() => setSelectedCity("istanbul")}
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

              {/* Hero CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-cosmeto-green hover:bg-cosmeto-teal text-white font-bold text-sm sm:text-base transition shadow-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{copy.heroPrimaryCta}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#before-after"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white hover:bg-cosmeto-sand border border-cosmeto-sandBorder text-cosmeto-charcoal font-bold text-sm sm:text-base transition"
                >
                  <SlidersHorizontal className="w-4 h-4 text-cosmeto-teal" />
                  <span>{copy.heroSecondaryCta}</span>
                </a>
              </div>

              {/* Trust Metrics */}
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

            {/* Right Column: Antalya Clinic & Resort Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-white border-2 border-cosmeto-green/60 p-6 sm:p-7 shadow-xl space-y-5">
                <div className="relative h-60 sm:h-64 rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80"
                    alt="CosmetoCity Antalya Medical & Resort Care"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-3 py-1 rounded-full bg-cosmeto-green text-white text-xs font-bold shadow">
                      🏖️ Lara / Muratpaşa, Antalya
                    </span>
                  </div>
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white">
                    <span className="text-xs font-bold bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                      OFM Antalya Hospital & VIP Clinics
                    </span>
                    <span className="px-3 py-1 rounded-full bg-cosmeto-teal text-white text-xs font-bold">
                      🇬🇧 UK & 🇩🇪 DE
                    </span>
                  </div>
                </div>

                {/* Package Starting Prices */}
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
                  href={getWhatsAppUrl("Antalya All-Inclusive Package")}
                  target="_blank"
                  rel="noopener noreferrer"
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

      {/* 2. TEDAVİLERİMİZ (TREATMENTS: HAIR, DENTAL, AESTHETICS with cosmetocity.com dashed/solid green styling) */}
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TREATMENTS_DATA.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-3xl border-2 border-dashed border-cosmeto-green hover:border-solid hover:border-cosmeto-teal overflow-hidden shadow-sm hover:shadow-xl transition flex flex-col justify-between"
            >
              <div>
                <div className="relative h-56 overflow-hidden bg-cosmeto-charcoal">
                  <img
                    src={item.image}
                    alt={item.title[locale]}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-cosmeto-green text-white text-[11px] font-bold tracking-wider uppercase shadow">
                    {item.badge[locale]}
                  </span>
                  <div className="absolute bottom-3 left-3.5 flex items-center gap-1.5 text-white text-xs bg-black/60 px-3 py-1 rounded-lg backdrop-blur-sm">
                    <Calendar className="w-3.5 h-3.5 text-cosmeto-cyan" />
                    <span>{item.stayDuration[locale]}</span>
                  </div>
                </div>

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
                  href={getWhatsAppUrl(item.title[locale])}
                  target="_blank"
                  rel="noopener noreferrer"
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

      {/* 3. ÖNCESİ / SONRASI (BEFORE / AFTER INTERACTIVE SLIDER) */}
      <section
        id="before-after"
        className="py-16 sm:py-24 bg-cosmeto-sand border-y border-cosmeto-sandBorder"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span className="text-xs font-bold tracking-widest uppercase text-cosmeto-teal block mb-2">
              {copy.beforeAfterTag}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-cosmeto-charcoal mb-3 uppercase">
              {copy.beforeAfterTitle}
            </h2>
            <div className="w-16 h-1 bg-cosmeto-green mx-auto mb-4 rounded-full" />
            <p className="text-cosmeto-body text-sm sm:text-base">
              {copy.beforeAfterSubtitle}
            </p>
          </div>

          {/* Case Tabs */}
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
                    ? "bg-cosmeto-green text-white border-cosmeto-green shadow-md"
                    : "bg-white text-cosmeto-charcoal border-cosmeto-sandBorder hover:border-cosmeto-green"
                }`}
              >
                {c.procedureName[locale]}
              </button>
            ))}
          </div>

          {/* Interactive Split Comparison Box */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-8 border-2 border-cosmeto-green/50 shadow-lg">
            {/* Before / After Slider */}
            <div className="lg:col-span-7">
              <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden select-none border border-cosmeto-sandBorder">
                {/* AFTER Image */}
                <img
                  src={currentCase.afterImage}
                  alt="After Procedure"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* BEFORE Image (Clipped) */}
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

                {/* Divider Line */}
                <div
                  className="absolute inset-y-0 w-1 bg-cosmeto-green shadow-xl pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-cosmeto-green text-white font-bold flex items-center justify-center shadow-lg border-2 border-white">
                    <SlidersHorizontal className="w-4 h-4" />
                  </div>
                </div>

                {/* Badges */}
                <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-lg bg-cosmeto-charcoal/85 text-white text-xs font-bold tracking-wider">
                  {copy.beforeLabel}
                </span>
                <span className="absolute top-3.5 right-3.5 px-3 py-1 rounded-lg bg-cosmeto-green text-white text-xs font-bold tracking-wider">
                  {copy.afterLabel}
                </span>
              </div>

              <div className="mt-4 px-2">
                <input
                  type="range"
                  min={5}
                  max={95}
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  aria-label="Before and after comparison slider"
                  className="w-full accent-[#36B729] cursor-pointer"
                />
                <p className="text-center text-xs text-cosmeto-body font-medium mt-1">
                  {copy.sliderInstruction} ({sliderPosition}%)
                </p>
              </div>
            </div>

            {/* Case Details */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cosmeto-green/15 text-cosmeto-greenDark text-xs font-bold border border-cosmeto-green/30">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{currentCase.timeframe[locale]}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-cosmeto-charcoal">
                {currentCase.procedureName[locale]}
              </h3>

              <p className="text-sm font-bold text-cosmeto-teal">
                {currentCase.patientInfo[locale]}
              </p>

              <div className="p-4 rounded-2xl bg-cosmeto-sand/60 border border-cosmeto-sandBorder space-y-1.5">
                <span className="text-xs uppercase tracking-wider text-cosmeto-teal font-bold block">
                  Clinical Details
                </span>
                <p className="text-sm font-bold text-cosmeto-charcoal">
                  {currentCase.graftsOrDetails[locale]}
                </p>
              </div>

              <p className="text-sm text-cosmeto-body leading-relaxed italic">
                &ldquo;{currentCase.doctorNote[locale]}&rdquo;
              </p>

              <a
                href={getWhatsAppUrl(currentCase.procedureName[locale])}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-cosmeto-green hover:bg-cosmeto-teal text-white font-bold text-sm transition shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{copy.inquireWhatsappBtn}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WHY ANTALYA + OPTIONAL ISTANBUL COORDINATION SECTION */}
      <section
        id="why-antalya"
        className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-cosmeto-green block mb-2">
            {copy.antalyaSectionTag}
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-cosmeto-charcoal uppercase mb-3">
            {copy.antalyaSectionTitle}
          </h2>
          <div className="w-16 h-1 bg-cosmeto-green mx-auto mb-4 rounded-full" />
          <p className="text-cosmeto-body text-sm sm:text-base">
            {copy.antalyaSectionSub}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {copy.antalyaPerks.map((perk, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-cosmeto-sandBorder hover:border-cosmeto-green transition shadow-sm"
            >
              <span className="w-10 h-10 rounded-xl bg-cosmeto-green text-white font-bold flex items-center justify-center mb-4 text-sm shadow">
                0{i + 1}
              </span>
              <h3 className="font-bold text-cosmeto-charcoal text-base mb-2">
                {perk.title}
              </h3>
              <p className="text-xs sm:text-sm text-cosmeto-body leading-relaxed">
                {perk.desc}
              </p>
            </div>
          ))}
        </div>

        {/* ISTANBUL PARTNER OPTION CALLOUT BANNER */}
        <div className="rounded-3xl bg-gradient-to-r from-cosmeto-teal to-cosmeto-tealDark text-white p-7 sm:p-9 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cosmeto-sand">
              <Building2 className="w-4 h-4" />
              <span>Antalya Headquarters + Istanbul Partner Network</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">
              {copy.istanbulOptionNoteTitle}
            </h3>
            <p className="text-xs sm:text-sm text-cosmeto-ice leading-relaxed">
              {copy.istanbulOptionNoteDesc}
            </p>
          </div>

          <a
            href={getWhatsAppUrl("Istanbul Partner Clinic Package", "istanbul")}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-4 rounded-xl bg-cosmeto-sand hover:bg-white text-cosmeto-charcoal font-bold text-xs sm:text-sm shrink-0 transition flex items-center gap-2 shadow"
          >
            <MessageCircle className="w-4 h-4 text-cosmeto-green" />
            <span>{copy.istanbulOptionCta}</span>
          </a>
        </div>
      </section>

      {/* 4. HASTA YORUMLARI (UK & GERMANY PATIENT TESTIMONIALS FOR ANTALYA) */}
      <section
        id="reviews"
        className="py-16 sm:py-24 bg-cosmeto-sand/60 border-t border-cosmeto-sandBorder"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-cosmeto-green/15 text-cosmeto-greenDark text-xs font-bold tracking-widest uppercase mb-3">
              {copy.reviewsTag}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-cosmeto-charcoal mb-3 uppercase">
              {copy.reviewsTitle}
            </h2>
            <div className="w-16 h-1 bg-cosmeto-green mx-auto mb-4 rounded-full" />
            <p className="text-cosmeto-body text-base">
              {copy.reviewsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {TESTIMONIALS_DATA.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-3xl p-7 border border-cosmeto-green/50 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(rev.rating)].map((_, idx) => (
                        <Star key={idx} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-cosmeto-greenDark bg-cosmeto-green/10 px-2.5 py-1 rounded-full border border-cosmeto-green/30">
                      {rev.verifiedVia}
                    </span>
                  </div>

                  <p className="text-cosmeto-body text-sm leading-relaxed italic mb-6">
                    &ldquo;{rev.quote[locale]}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-cosmeto-sandBorder flex items-center justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-cosmeto-charcoal text-sm">
                      {rev.flag} {rev.name}
                    </h4>
                    <p className="text-xs text-cosmeto-body">
                      {rev.cityCountry} • {rev.treatedIn}
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-cosmeto-teal bg-cosmeto-ice/50 px-2.5 py-1 rounded-lg max-w-[155px] truncate">
                    {rev.treatment[locale]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="py-16 bg-cosmeto-green text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <h2 className="text-2xl sm:text-4xl font-bold uppercase tracking-wide">
            {copy.ctaBannerTitle}
          </h2>
          <p className="text-white/90 text-sm sm:text-base max-w-2xl mx-auto">
            {copy.ctaBannerSub}
          </p>
          <div className="pt-2">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white hover:bg-cosmeto-sand text-cosmeto-charcoal font-bold text-base shadow-xl transition"
            >
              <MessageCircle className="w-5 h-5 text-cosmeto-green" />
              <span>{copy.stickyWhatsappText}</span>
              <ArrowRight className="w-4 h-4 text-cosmeto-green" />
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER (Sandal Cream #F0EBD8 & Sky Cyan #89CDDF copyright bar matching cosmetocity.com) */}
      <footer className="bg-cosmeto-sand text-cosmeto-charcoal border-t border-cosmeto-sandBorder text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-cosmeto-green text-white font-bold flex items-center justify-center">
              C
            </div>
            <div>
              <span className="font-bold text-cosmeto-charcoal tracking-wider block">
                COSMETOCITY ANTALYA
              </span>
              <span className="text-[11px] text-cosmeto-body">
                {copy.footerAddress}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-cosmeto-teal">
            <ShieldCheck className="w-4 h-4 text-cosmeto-green" />
            <span>Antalya Main Hub & Istanbul Partner Clinics</span>
          </div>
        </div>

        <div className="bg-cosmeto-cyan text-white py-3.5 px-4 text-center font-semibold">
          <p>{copy.footerDisclaimer}</p>
        </div>
      </footer>

      {/* 5. STICKY "WHATSAPP'TAN BİLGİ AL" BUTTON (Signature CosmetoCity Green #36B729 / #25D366) */}
      <a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp'tan Bilgi Al"
        className="whatsapp-sticky-pulse fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-cosmeto-green hover:bg-cosmeto-teal text-white font-bold shadow-2xl transition transform hover:-translate-y-0.5 border-2 border-white"
      >
        <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-white text-cosmeto-green">
          <MessageCircle className="w-5 h-5" />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-cosmeto-green border-2 border-white" />
        </div>
        <div className="text-left pr-1">
          <span className="block text-xs sm:text-sm font-bold leading-tight">
            {copy.stickyWhatsappText}
          </span>
          <span className="hidden sm:block text-[10px] font-medium text-white/90">
            {copy.stickyWhatsappSub}
          </span>
        </div>
      </a>
    </div>
  );
}
