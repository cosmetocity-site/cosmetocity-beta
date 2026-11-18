"use client";

import React, { useState } from "react";
import {
  MessageCircle,
  MapPin,
  Phone,
  Mail,
  Building2,
  ShieldCheck,
  Loader2,
  CheckCircle2,
  Send,
  AlertCircle,
} from "lucide-react";
import {
  Locale,
  CityOption,
  SITE_COPY,
  buildWhatsAppLink,
} from "@/data/content";
import { trackWhatsAppClick } from "@/lib/analytics";

interface ContactSectionProps {
  locale: Locale;
  selectedCity: CityOption;
  onCityChange: (city: CityOption) => void;
}

interface LeadTreatmentOption {
  value: string;
  label: Record<Locale, string>;
}

const LEAD_TREATMENT_OPTIONS: LeadTreatmentOption[] = [
  {
    value: "Saç Ekimi",
    label: {
      en: "Hair Transplant (Saç Ekimi)",
      de: "Haartransplantation (Saç Ekimi)",
      tr: "Saç Ekimi",
    },
  },
  {
    value: "Diş Estetiği",
    label: {
      en: "Dental Aesthetics (Diş Estetiği)",
      de: "Zahnästhetik (Diş Estetiği)",
      tr: "Diş Estetiği",
    },
  },
  {
    value: "Meme Estetiği",
    label: {
      en: "Breast Aesthetics (Meme Estetiği)",
      de: "Brustästhetik (Meme Estetiği)",
      tr: "Meme Estetiği",
    },
  },
  {
    value: "Rinoplasti",
    label: {
      en: "Rhinoplasty (Rinoplasti)",
      de: "Nasenkorrektur / Rhinoplastik (Rinoplasti)",
      tr: "Rinoplasti",
    },
  },
  {
    value: "Diğer",
    label: {
      en: "Other Medical Aesthetics (Diğer)",
      de: "Andere Behandlung (Diğer)",
      tr: "Diğer",
    },
  },
];

const FORM_UI: Record<
  Locale,
  {
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    treatmentLabel: string;
    cityLabel: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitBtn: string;
    submittingBtn: string;
    successTitle: string;
    successMessage: string;
    newRequestBtn: string;
    instantWhatsappBtn: string;
    errorMessage: string;
  }
> = {
  en: {
    nameLabel: "Full Name (Ad Soyad)",
    namePlaceholder: "Oliver Henderson",
    phoneLabel: "WhatsApp / Phone Number (with Country Code)",
    phonePlaceholder: "+44 7700 900077 / +49 151 23456789",
    treatmentLabel: "Interested Treatment",
    cityLabel: "Preferred Destination",
    messageLabel: "Short Message (Optional)",
    messagePlaceholder:
      "Tell us about your preferred dates, questions, or treatment goals...",
    submitBtn: "Request Free Consultation",
    submittingBtn: "Sending Your Request...",
    successTitle: "Free Consultation Request Received!",
    successMessage:
      "Talebiniz alındı, tıbbi koordinatörümüz en kısa sürede WhatsApp üzerinden size ulaşacaktır. (Your request has been received; our medical coordinator will reach out to you via WhatsApp shortly.)",
    newRequestBtn: "Submit Another Request",
    instantWhatsappBtn: "Or Message Us Directly on WhatsApp Now",
    errorMessage:
      "An error occurred while sending your form. Please try again or reach us directly via WhatsApp.",
  },
  de: {
    nameLabel: "Vor- und Nachname (Ad Soyad)",
    namePlaceholder: "Markus Weber",
    phoneLabel: "WhatsApp / Telefonnummer (mit Ländervorwahl)",
    phonePlaceholder: "+49 151 23456789 / +43 664 1234567",
    treatmentLabel: "Gewünschte Behandlung",
    cityLabel: "Bevorzugte Stadt",
    messageLabel: "Kurze Nachricht (Optional)",
    messagePlaceholder:
      "Teilen Sie uns Ihren Wunschtermin oder Ihre Fragen zur Behandlung mit...",
    submitBtn: "Kostenlose Beratung anfordern",
    submittingBtn: "Anfrage wird gesendet...",
    successTitle: "Ihre Anfrage wurde erfolgreich empfangen!",
    successMessage:
      "Talebiniz alındı, tıbbi koordinatörümüz en kısa sürede WhatsApp üzerinden size ulaşacaktır. (Ihre Anfrage ist eingegangen – unser medizinischer Koordinator meldet sich in Kürze per WhatsApp bei Ihnen.)",
    newRequestBtn: "Neue Anfrage senden",
    instantWhatsappBtn: "Oder direkt per WhatsApp schreiben",
    errorMessage:
      "Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt per WhatsApp.",
  },
  tr: {
    nameLabel: "Ad Soyad",
    namePlaceholder: "Adınız ve Soyadınız",
    phoneLabel: "WhatsApp / Telefon Numarası (Ülke Kodu İle)",
    phonePlaceholder: "+90 555 123 4567 / +44 7700 900077 / +49 151...",
    treatmentLabel: "İlgilenilen Tedavi",
    cityLabel: "Tercih Edilen Şehir",
    messageLabel: "Kısa Mesaj",
    messagePlaceholder:
      "Planladığınız tarih veya tedavinizle ilgili merak ettiklerinizi kısaca yazabilirsiniz...",
    submitBtn: "Ücretsiz Danışmanlık Talebi Gönder",
    submittingBtn: "Talebiniz Gönderiliyor...",
    successTitle: "Ücretsiz Danışmanlık Talebiniz Alındı",
    successMessage:
      "Talebiniz alındı, tıbbi koordinatörümüz en kısa sürede WhatsApp üzerinden size ulaşacaktır",
    newRequestBtn: "Yeni Talep Oluştur",
    instantWhatsappBtn: "Beklemeden WhatsApp'tan Sohbet Başlat",
    errorMessage:
      "Talebiniz gönderilirken bir hata oluştu. Lütfen tekrar deneyin veya WhatsApp butonundan bize ulaşın.",
  },
};

export default function ContactSection({
  locale,
  selectedCity,
  onCityChange,
}: ContactSectionProps) {
  const copy = SITE_COPY[locale];
  const ui = FORM_UI[locale];

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [treatment, setTreatment] = useState<string>(
    LEAD_TREATMENT_OPTIONS[0].value
  );
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    const cityLabel = selectedCity === "antalya" ? "Antalya" : "Istanbul";
    const pagePath =
      typeof window !== "undefined" ? window.location.pathname : "/";
    const sourceLabel = `cosmetocity.online (${pagePath} • ${cityLabel} • ${locale.toUpperCase()})`;

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          treatment,
          message: message.trim()
            ? `[${cityLabel}] ${message.trim()}`
            : `[${cityLabel}] Free Consultation Request`,
          source: sourceLabel,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Lead API error");
      }

      trackWhatsAppClick({
        source: "crm_lead_form_submit",
        topic: treatment,
        city: selectedCity,
        locale,
      });

      setIsSubmitted(true);
    } catch (err) {
      console.error("Lead form submit error:", err);
      setErrorMsg(ui.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setName("");
    setPhone("");
    setTreatment(LEAD_TREATMENT_OPTIONS[0].value);
    setMessage("");
    setErrorMsg(null);
    setIsSubmitted(false);
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

            {/* Right Interactive Free Consultation Form (Connected to /api/lead -> Google Sheets CRM) */}
            <div className="lg:col-span-7">
              {isSubmitted ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-cosmeto-green shadow-xl text-center space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-cosmeto-green/15 text-cosmeto-green flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl sm:text-3xl font-bold text-cosmeto-charcoal">
                      {ui.successTitle}
                    </h3>
                    <p className="text-base sm:text-lg font-semibold text-cosmeto-greenDark bg-cosmeto-sandLight p-5 rounded-2xl border border-cosmeto-green/40 leading-relaxed">
                      Talebiniz alındı, tıbbi koordinatörümüz en kısa sürede
                      WhatsApp üzerinden size ulaşacaktır
                    </p>
                    {locale !== "tr" && (
                      <p className="text-xs sm:text-sm text-cosmeto-body">
                        {locale === "en"
                          ? "Your request has been saved to our medical CRM. Our coordinator will contact you via WhatsApp shortly."
                          : "Ihre Anfrage wurde in unserem medizinischen System gespeichert. Unser Koordinator kontaktiert Sie in Kürze per WhatsApp."}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <a
                      href={buildWhatsAppLink(locale, treatment, selectedCity)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackWhatsAppClick({
                          source: "crm_form_success_whatsapp_cta",
                          topic: treatment,
                          city: selectedCity,
                          locale,
                        })
                      }
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-cosmeto-green text-white font-bold text-sm transition shadow-md"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{ui.instantWhatsappBtn}</span>
                    </a>

                    <button
                      type="button"
                      onClick={resetForm}
                      className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-cosmeto-sand hover:bg-cosmeto-sandBorder text-cosmeto-charcoal font-bold text-xs sm:text-sm transition"
                    >
                      {ui.newRequestBtn}
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleLeadSubmit}
                  className="bg-white rounded-3xl p-7 sm:p-9 border-2 border-cosmeto-green/60 shadow-xl space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="lead-name"
                        className="block text-xs font-bold uppercase tracking-wider text-cosmeto-teal mb-1.5"
                      >
                        {ui.nameLabel} *
                      </label>
                      <input
                        id="lead-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={ui.namePlaceholder}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl bg-cosmeto-sandLight border border-cosmeto-sandBorder text-cosmeto-charcoal text-sm focus:outline-none focus:border-cosmeto-green disabled:opacity-60"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="lead-phone"
                        className="block text-xs font-bold uppercase tracking-wider text-cosmeto-teal mb-1.5"
                      >
                        {ui.phoneLabel} *
                      </label>
                      <input
                        id="lead-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={ui.phonePlaceholder}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl bg-cosmeto-sandLight border border-cosmeto-sandBorder text-cosmeto-charcoal text-sm focus:outline-none focus:border-cosmeto-green disabled:opacity-60"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="lead-treatment"
                        className="block text-xs font-bold uppercase tracking-wider text-cosmeto-teal mb-1.5"
                      >
                        {ui.treatmentLabel} *
                      </label>
                      <select
                        id="lead-treatment"
                        value={treatment}
                        onChange={(e) => setTreatment(e.target.value)}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl bg-cosmeto-sandLight border border-cosmeto-sandBorder text-cosmeto-charcoal text-sm font-semibold focus:outline-none focus:border-cosmeto-green disabled:opacity-60"
                      >
                        {LEAD_TREATMENT_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label[locale]}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="lead-city"
                        className="block text-xs font-bold uppercase tracking-wider text-cosmeto-teal mb-1.5"
                      >
                        {ui.cityLabel}
                      </label>
                      <select
                        id="lead-city"
                        value={selectedCity}
                        onChange={(e) =>
                          onCityChange(e.target.value as CityOption)
                        }
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl bg-cosmeto-sandLight border border-cosmeto-sandBorder text-cosmeto-charcoal text-sm font-semibold focus:outline-none focus:border-cosmeto-green disabled:opacity-60"
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

                  <div>
                    <label
                      htmlFor="lead-message"
                      className="block text-xs font-bold uppercase tracking-wider text-cosmeto-teal mb-1.5"
                    >
                      {ui.messageLabel}
                    </label>
                    <textarea
                      id="lead-message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={ui.messagePlaceholder}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-xl bg-cosmeto-sandLight border border-cosmeto-sandBorder text-cosmeto-charcoal text-sm focus:outline-none focus:border-cosmeto-green disabled:opacity-60 resize-none"
                    />
                  </div>

                  {errorMsg && (
                    <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-semibold">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-cosmeto-green hover:bg-cosmeto-teal disabled:bg-cosmeto-green/70 text-white font-bold text-sm sm:text-base transition shadow-lg flex items-center justify-center gap-2.5 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>{ui.submittingBtn}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>{ui.submitBtn}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
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
