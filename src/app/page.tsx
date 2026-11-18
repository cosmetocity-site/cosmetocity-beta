"use client";

import React, { useState } from "react";
import { Locale, CityOption } from "@/data/content";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesGrid from "@/components/ServicesGrid";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import TestimonialsSection from "@/components/TestimonialsSection";
import HomeBlogPreviewSection from "@/components/HomeBlogPreviewSection";
import ContactSection from "@/components/ContactSection";
import StickyWhatsApp from "@/components/StickyWhatsApp";

export default function CosmetoCityHomePage() {
  const [locale, setLocale] = useState<Locale>("en");
  const [selectedCity, setSelectedCity] = useState<CityOption>("antalya");

  return (
    <div className="min-h-screen flex flex-col bg-cosmeto-sandLight text-cosmeto-body">
      {/* 1. Header & Navigation ("Treatments, Before/After, Reviews, Contact" + "Free Consultation") */}
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
        />

        {/* 3. Tedavilerimiz (Services Grid: Hair Transplant, Dental Aesthetics, Medical Aesthetics) */}
        <ServicesGrid locale={locale} selectedCity={selectedCity} />

        {/* 4. Güven ve Sosyal Kanıt: Before/After Gallery & 3 International Patient Testimonials */}
        <BeforeAfterGallery locale={locale} selectedCity={selectedCity} />
        <TestimonialsSection locale={locale} />

        {/* 5. Soru-Odaklı SEO Blog & Medikal İyileşme Rehberleri Önizlemesi */}
        <HomeBlogPreviewSection locale={locale} selectedCity={selectedCity} />

        {/* Contact & Free Consultation Section */}
        <ContactSection
          locale={locale}
          selectedCity={selectedCity}
          onCityChange={setSelectedCity}
        />
      </main>

      {/* 5. Sticky WhatsApp Button (Fixed Bottom-Right Across All Views) */}
      <StickyWhatsApp locale={locale} selectedCity={selectedCity} />
    </div>
  );
}
