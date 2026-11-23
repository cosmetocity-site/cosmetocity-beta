"use client";

import React, { useState, useEffect } from "react";
import { Locale, CityOption, isRtlLocale } from "@/data/content";
import {
  CurrencyConfig,
  DEFAULT_CURRENCY_CONFIG,
} from "@/lib/currency";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesGrid from "@/components/ServicesGrid";
import BariatricSurgerySection from "@/components/BariatricSurgerySection";
import TreatmentQuizCalculator from "@/components/TreatmentQuizCalculator";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import TestimonialsSection from "@/components/TestimonialsSection";
import HomeBlogPreviewSection from "@/components/HomeBlogPreviewSection";
import ContactSection from "@/components/ContactSection";
import StickyWhatsApp from "@/components/StickyWhatsApp";

export default function CosmetoCityHomePage() {
  const [locale, setLocale] = useState<Locale>("en");
  const [selectedCity, setSelectedCity] = useState<CityOption>("antalya");
  const [currencyConfig, setCurrencyConfig] = useState<CurrencyConfig>(
    DEFAULT_CURRENCY_CONFIG
  );
  const dir = isRtlLocale(locale) ? "rtl" : "ltr";

  // Fetch visitor country (`x-vercel-ip-country`) and 12h cached live exchange rates
  useEffect(() => {
    let active = true;
    fetch("/api/currency")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: CurrencyConfig | null) => {
        if (active && data && data.currency && data.rates) {
          setCurrencyConfig(data);
        }
      })
      .catch(() => {
        // Keep safe fallback rates (DEFAULT_CURRENCY_CONFIG)
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div
      dir={dir}
      className="min-h-screen flex flex-col bg-cosmeto-sandLight text-cosmeto-body"
    >
      {/* 1. Header & Navigation ("Treatments, Bariatric Surgery, Before/After, Reviews, Contact" + 7-Language Dropdown + "Free Consultation") */}
      <Navbar
        locale={locale}
        onLocaleChange={setLocale}
        selectedCity={selectedCity}
      />

      {/* 2. Hero Section ("World-Class Treatment in Antalya" + Medical Background & WhatsApp CTA) */}
      <main className="flex-1">
        <HeroSection
          locale={locale}
          selectedCity={selectedCity}
          onCityChange={setSelectedCity}
          currencyConfig={currencyConfig}
        />

        {/* 3. Tedavilerimiz (Services Grid: Hair Transplant, Dental Aesthetics, Medical Aesthetics, Bariatric Surgery) */}
        <ServicesGrid
          locale={locale}
          selectedCity={selectedCity}
          currencyConfig={currencyConfig}
        />

        {/* 4. Bariatrik Cerrahi (Obesity / Bariatric Surgery Details from cosmetocity.com: Gastric Sleeve, Bypass & Balloon) */}
        <BariatricSurgerySection
          locale={locale}
          selectedCity={selectedCity}
          currencyConfig={currencyConfig}
        />

        {/* 5. İnteraktif 5 Adımlı Tedavi ve Fiyat Hesaplayıcı (Quiz) + 3 Ay Sabit Fiyat Garantisi */}
        <TreatmentQuizCalculator
          locale={locale}
          selectedCity={selectedCity}
          onCityChange={setSelectedCity}
          currencyConfig={currencyConfig}
        />

        {/* 6. Güven ve Sosyal Kanıt: Before/After Gallery & Real Trustpilot Patient Reviews */}
        <BeforeAfterGallery locale={locale} selectedCity={selectedCity} />
        <TestimonialsSection locale={locale} />

        {/* 7. Soru-Odaklı SEO Blog & Medikal İyileşme Rehberleri Önizlemesi */}
        <HomeBlogPreviewSection locale={locale} selectedCity={selectedCity} />

        {/* Contact & Free Consultation Section */}
        <ContactSection
          locale={locale}
          selectedCity={selectedCity}
          onCityChange={setSelectedCity}
        />
      </main>

      {/* 8. Sticky Price Calculator + Sticky WhatsApp Buttons (Fixed Bottom-Right/Left Across All Views) */}
      <StickyWhatsApp locale={locale} selectedCity={selectedCity} />
    </div>
  );
}
