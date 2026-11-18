"use client";

import React, { useState } from "react";
import {
  MessageCircle,
  MapPin,
  Phone,
  Mail,
  Building2,
  ShieldCheck,
} from "lucide-react";
import {
  Locale,
  CityOption,
  SITE_COPY,
  TREATMENTS_DATA,
  WHATSAPP_NUMBER,
  buildWhatsAppLink,
} from "@/data/content";
import { trackWhatsAppClick } from "@/lib/analytics";

interface ContactSectionProps {
  locale: Locale;
  selectedCity: CityOption;
  onCityChange: (city: CityOption) => void;
}

export default function ContactSection({
  locale,
  selectedCity,
  onCityChange,
}: ContactSectionProps) {
  const copy = SITE_COPY[locale];
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [selectedTreatment, setSelectedTreatment] = useState(
    TREATMENTS_DATA[0].id
  );

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = TREATMENTS_DATA.find((t) => t.id === selectedTreatment);
    const treatmentTitle = found ? found.title[locale] : "Medical Treatment";
    const cityLabel = selectedCity === "antalya" ? "Antalya" : "Istanbul";

    trackWhatsAppClick({
      source: "contact_form_submit",
      topic: treatmentTitle,
      city: selectedCity,
      locale,
    });

    const text = `Hello CosmetoCity! My name is ${
      name || "a patient"
    } from ${country || "abroad"}. I would like a Free Consultation for ${treatmentTitle} in ${cityLabel}.`;

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <>
      <section
        id="contact"
        className="py-16 sm:py-24 bg-cosmeto-sand border-t border-cosmeto-sandBorder"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Info & Istanbul Option Callout */}
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-block px-3.5 py-1 rounded-full bg-cosmeto-green/15 text-cosmeto-greenDark text-xs font-bold tracking-widest uppercase">
                {copy.contactTag}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-cosmeto-charcoal leading-tight">
                {copy.contactTitle}
              </h2>
              <p className="text-sm sm:text-base text-cosmeto-body leading-relaxed">
                {copy.contactSubtitle}
              </p>

              <div className="space-y-3 text-sm text-cosmeto-charcoal font-semibold">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cosmeto-green text-white flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span>Çağlayan Mah. (Lara), Muratpaşa / Antalya, Turkey</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cosmeto-teal text-white flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>+90 552 602 2489 (24/7 UK & DE Patient Desk)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cosmeto-teal text-white flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>info@cosmetocity.com</span>
                </div>
              </div>

              {/* Optional Istanbul Note */}
              <div className="p-5 rounded-2xl bg-cosmeto-teal text-white space-y-2 shadow">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cosmeto-sand">
                  <Building2 className="w-4 h-4" />
                  <span>Antalya Main Hub + Istanbul Partner Network</span>
                </div>
                <h3 className="font-bold text-base">
                  {copy.istanbulOptionNoteTitle}
                </h3>
                <p className="text-xs text-cosmeto-ice leading-relaxed">
                  {copy.istanbulOptionNoteDesc}
                </p>
              </div>
            </div>

            {/* Right Interactive Free Consultation Form */}
            <div className="lg:col-span-7">
              <form
                onSubmit={handleWhatsAppSubmit}
                className="bg-white rounded-3xl p-7 sm:p-9 border-2 border-cosmeto-green/60 shadow-xl space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-cosmeto-teal mb-1.5">
                      {copy.contactFormName}
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Oliver Henderson"
                      className="w-full px-4 py-3 rounded-xl bg-cosmeto-sandLight border border-cosmeto-sandBorder text-cosmeto-charcoal text-sm focus:outline-none focus:border-cosmeto-green"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-cosmeto-teal mb-1.5">
                      {copy.contactFormCountry}
                    </label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="United Kingdom / Germany"
                      className="w-full px-4 py-3 rounded-xl bg-cosmeto-sandLight border border-cosmeto-sandBorder text-cosmeto-charcoal text-sm focus:outline-none focus:border-cosmeto-green"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-cosmeto-teal mb-1.5">
                      {copy.contactFormTreatment}
                    </label>
                    <select
                      value={selectedTreatment}
                      onChange={(e) => setSelectedTreatment(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-cosmeto-sandLight border border-cosmeto-sandBorder text-cosmeto-charcoal text-sm font-semibold focus:outline-none focus:border-cosmeto-green"
                    >
                      {TREATMENTS_DATA.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.title[locale]} (
                          {locale === "en" ? t.priceGBP : t.priceEUR})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-cosmeto-teal mb-1.5">
                      {copy.contactFormCity}
                    </label>
                    <select
                      value={selectedCity}
                      onChange={(e) =>
                        onCityChange(e.target.value as CityOption)
                      }
                      className="w-full px-4 py-3 rounded-xl bg-cosmeto-sandLight border border-cosmeto-sandBorder text-cosmeto-charcoal text-sm font-semibold focus:outline-none focus:border-cosmeto-green"
                    >
                      <option value="antalya">
                        🏖️ Antalya (Main Hub • Recommended)
                      </option>
                      <option value="istanbul">
                        🌉 Istanbul (Partner Clinic Option)
                      </option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-cosmeto-green hover:bg-cosmeto-teal text-white font-bold text-sm sm:text-base transition shadow-lg flex items-center justify-center gap-2.5"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{copy.contactFormSubmit}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer matching cosmetocity.com (#F0EBD8 & #89CDDF copyright strip) */}
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
            <a
              href={buildWhatsAppLink(locale, "General Inquiry", selectedCity)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackWhatsAppClick({
                  source: "footer_whatsapp_link",
                  topic: "General Inquiry",
                  city: selectedCity,
                  locale,
                })
              }
              className="hover:underline"
            >
              Antalya Main Hub & Istanbul Partner Clinics
            </a>
          </div>
        </div>

        <div className="bg-cosmeto-cyan text-white py-3.5 px-4 text-center font-semibold">
          <p>{copy.footerDisclaimer}</p>
        </div>
      </footer>
    </>
  );
}
