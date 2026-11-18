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
  isRtlLocale,
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
      en: "Hair Transplant (Sapphire FUE & DHI)",
      de: "Haartransplantation (Saphir FUE & DHI)",
      ru: "Пересадка волос (Сапфир FUE и DHI)",
      es: "Injerto Capilar (Zafiro FUE y DHI)",
      ar: "زراعة الشعر (تقنية السفير FUE و DHI)",
      fr: "Greffe de Cheveux (Saphir FUE & DHI)",
      it: "Trapianto di Capelli (Zaffiro FUE & DHI)",
    },
  },
  {
    value: "Diş Estetiği",
    label: {
      en: "Dental Aesthetics (Hollywood Smile & Implants)",
      de: "Zahnästhetik (Hollywood Smile & Implantate)",
      ru: "Эстетическая стоматология (Голливудская улыбка)",
      es: "Estética Dental (Sonrisa de Hollywood e Implantes)",
      ar: "تجميل الأسنان (ابتسامة هوليوود وزراعة الأسنان)",
      fr: "Esthétique Dentaire (Hollywood Smile & Implants)",
      it: "Estetica Dentale (Hollywood Smile & Impianti)",
    },
  },
  {
    value: "Meme Estetiği",
    label: {
      en: "Breast Aesthetics (Augmentation / Lift)",
      de: "Brustästhetik (Vergrößerung / Straffung)",
      ru: "Пластика груди (Маммопластика)",
      es: "Estética Mamaria (Aumento / Elevación)",
      ar: "تجميل الصدر (تكبير / شد الصدر)",
      fr: "Esthétique Mammaire (Augmentation / Lifting)",
      it: "Chirurgia del Seno (Mastoplastica)",
    },
  },
  {
    value: "Rinoplasti",
    label: {
      en: "Rhinoplasty (Ultrasonic Piezo Nose Reshaping)",
      de: "Nasenkorrektur / Rhinoplastik (Ultraschall-Piezo)",
      ru: "Ринопластика (Ультразвуковая коррекция носа Piezo)",
      es: "Rinoplastia (Cirugía Nasal Ultrasónica Piezo)",
      ar: "تجميل الأنف (بالموجات فوق الصوتية Piezo)",
      fr: "Rhinoplastie (Chirurgie du Nez Ultrasonique Piezo)",
      it: "Rinoplastica (Chirurgia Nasale Ultrasonica Piezo)",
    },
  },
  {
    value: "Diğer",
    label: {
      en: "Other Medical Aesthetics & Plastic Surgery",
      de: "Andere Behandlung (Liposuktion, Facelift, Botox)",
      ru: "Другая эстетическая процедура (Липосакция, Лифтинг)",
      es: "Otro Tratamiento Estético (Liposucción, Lifting)",
      ar: "إجراءات تجميلية أخرى (نحت الجسم، شد الوجه)",
      fr: "Autre Soin Esthétique (Liposuccion, Lifting)",
      it: "Altro Trattamento Estetico (Liposuzione, Lifting)",
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
    cityAntalyaOption: string;
    cityIstanbulOption: string;
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
    nameLabel: "Full Name",
    namePlaceholder: "Oliver Henderson",
    phoneLabel: "WhatsApp / Phone Number (with Country Code)",
    phonePlaceholder: "+44 7700 900077",
    treatmentLabel: "Interested Treatment",
    cityLabel: "Preferred Destination",
    cityAntalyaOption: "🏖️ Antalya (Main Hub • Recommended)",
    cityIstanbulOption: "🌉 Istanbul (Partner Clinic Option)",
    messageLabel: "Short Message (Optional)",
    messagePlaceholder:
      "Tell us about your preferred travel dates, questions, or treatment goals...",
    submitBtn: "Request Free Consultation",
    submittingBtn: "Sending Your Request...",
    successTitle: "Free Consultation Request Received!",
    successMessage:
      "Your request has been received. Our medical coordinator will reach out to you via WhatsApp shortly.",
    newRequestBtn: "Submit Another Request",
    instantWhatsappBtn: "Message Us Directly on WhatsApp Now",
    errorMessage:
      "An error occurred while sending your form. Please try again or reach us directly via WhatsApp.",
  },
  de: {
    nameLabel: "Vor- und Nachname",
    namePlaceholder: "Markus Weber",
    phoneLabel: "WhatsApp / Telefonnummer (mit Ländervorwahl)",
    phonePlaceholder: "+49 151 23456789",
    treatmentLabel: "Gewünschte Behandlung",
    cityLabel: "Bevorzugte Stadt",
    cityAntalyaOption: "🏖️ Antalya (Hauptzentrum • Empfohlen)",
    cityIstanbulOption: "🌉 Istanbul (Partnerklinik-Option)",
    messageLabel: "Kurze Nachricht (Optional)",
    messagePlaceholder:
      "Teilen Sie uns Ihren Wunschtermin oder Ihre Fragen zur Behandlung mit...",
    submitBtn: "Kostenlose Beratung anfordern",
    submittingBtn: "Anfrage wird gesendet...",
    successTitle: "Ihre Anfrage wurde erfolgreich empfangen!",
    successMessage:
      "Ihre Anfrage ist eingegangen – unser medizinischer Koordinator wird Sie in Kürze über WhatsApp kontaktieren.",
    newRequestBtn: "Neue Anfrage senden",
    instantWhatsappBtn: "Direkt per WhatsApp schreiben",
    errorMessage:
      "Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt per WhatsApp.",
  },
  ru: {
    nameLabel: "Имя и Фамилия",
    namePlaceholder: "Александр Иванов",
    phoneLabel: "Номер WhatsApp / Телефона (с кодом страны)",
    phonePlaceholder: "+7 999 123 45 67",
    treatmentLabel: "Интересующая процедура",
    cityLabel: "Предпочитаемый город",
    cityAntalyaOption: "🏖️ Анталья (Главный центр • Рекомендуется)",
    cityIstanbulOption: "🌉 Стамбул (Партнерская клиника)",
    messageLabel: "Краткое сообщение (необязательно)",
    messagePlaceholder:
      "Укажите желаемые даты поездки или ваши вопросы врачу...",
    submitBtn: "Запросить бесплатную консультацию",
    submittingBtn: "Отправка заявки...",
    successTitle: "Ваша заявка успешно принята!",
    successMessage:
      "Ваша заявка получена, наш медицинский координатор свяжется с вами в WhatsApp в ближайшее время.",
    newRequestBtn: "Отправить новую заявку",
    instantWhatsappBtn: "Написать нам в WhatsApp прямо сейчас",
    errorMessage:
      "Произошла ошибка при отправке. Пожалуйста, попробуйте снова или напишите нам напрямую в WhatsApp.",
  },
  es: {
    nameLabel: "Nombre y Apellidos",
    namePlaceholder: "Carlos Rodríguez",
    phoneLabel: "Número de WhatsApp / Teléfono (con código de país)",
    phonePlaceholder: "+34 600 123 456",
    treatmentLabel: "Tratamiento de Interés",
    cityLabel: "Ciudad Preferida",
    cityAntalyaOption: "🏖️ Antalya (Sede Principal • Recomendado)",
    cityIstanbulOption: "🌉 Estambul (Clínica Asociada)",
    messageLabel: "Mensaje Breve (Opcional)",
    messagePlaceholder:
      "Indíquenos sus fechas aproximadas de viaje o sus dudas médicas...",
    submitBtn: "Solicitar Consulta Gratuita",
    submittingBtn: "Enviando su solicitud...",
    successTitle: "¡Solicitud de Consulta Recibida!",
    successMessage:
      "Su solicitud ha sido recibida; nuestro coordinador médico se pondrá en contacto con usted por WhatsApp a la mayor brevedad.",
    newRequestBtn: "Enviar otra solicitud",
    instantWhatsappBtn: "Escribir directamente por WhatsApp ahora",
    errorMessage:
      "Ocurrió un error al enviar el formulario. Por favor, inténtelo de nuevo o contáctenos directamente por WhatsApp.",
  },
  ar: {
    nameLabel: "الاسم الكامل",
    namePlaceholder: "أحمد المنصور",
    phoneLabel: "رقم الواتساب / الهاتف (مع مفتاح الدولة)",
    phonePlaceholder: "+966 50 123 4567 / +971 50 123 4567",
    treatmentLabel: "العلاج المطلوب",
    cityLabel: "المدينة المفضلة",
    cityAntalyaOption: "🏖️ أنطاليا (المركز الرئيسي • موصى به)",
    cityIstanbulOption: "🌉 إسطنبول (خيار المستشفى الشريك)",
    messageLabel: "رسالة قصيرة (اختياري)",
    messagePlaceholder:
      "اكتب استفسارك الطبي أو الموعد المفضل للسفر...",
    submitBtn: "إرسال طلب استشارة مجانية",
    submittingBtn: "جاري إرسال طلبك...",
    successTitle: "تم استلام طلب الاستشارة المجانية بنجاح!",
    successMessage:
      "تم استلام طلبك بنجاح، سيتواصل معك المنسق الطبي عبر تطبيق واتساب في أقرب وقت ممكن.",
    newRequestBtn: "إرسال طلب جديد",
    instantWhatsappBtn: "تحدث معنا مباشرة عبر واتساب الآن",
    errorMessage:
      "حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة عبر واتساب.",
  },
  fr: {
    nameLabel: "Nom et Prénom",
    namePlaceholder: "Thomas Laurent",
    phoneLabel: "Numéro WhatsApp / Téléphone (avec indicatif pays)",
    phonePlaceholder: "+33 6 12 34 56 78",
    treatmentLabel: "Soin Souhaité",
    cityLabel: "Destination Préférée",
    cityAntalyaOption: "🏖️ Antalya (Centre Principal • Recommandé)",
    cityIstanbulOption: "🌉 Istanbul (Option Clinique Partenaire)",
    messageLabel: "Court Message (Optionnel)",
    messagePlaceholder:
      "Indiquez vos dates souhaitées ou vos questions médicales...",
    submitBtn: "Demander une Consultation Gratuite",
    submittingBtn: "Envoi de votre demande...",
    successTitle: "Demande de Consultation Reçue !",
    successMessage:
      "Votre demande a bien été reçue. Notre coordinateur médical vous contactera très prochainement sur WhatsApp.",
    newRequestBtn: "Envoyer une autre demande",
    instantWhatsappBtn: "Nous écrire directement sur WhatsApp",
    errorMessage:
      "Une erreur est survenue lors de l'envoi. Veuillez réessayer ou nous contacter directement sur WhatsApp.",
  },
  it: {
    nameLabel: "Nome e Cognome",
    namePlaceholder: "Marco Rossi",
    phoneLabel: "Numero WhatsApp / Telefono (con prefisso internazionale)",
    phonePlaceholder: "+39 333 123 4567",
    treatmentLabel: "Trattamento Richiesto",
    cityLabel: "Destinazione Preferita",
    cityAntalyaOption: "🏖️ Antalya (Sede Principale • Consigliata)",
    cityIstanbulOption: "🌉 Istanbul (Opzione Clinica Partner)",
    messageLabel: "Breve Messaggio (Opzionale)",
    messagePlaceholder:
      "Indicaci le date preferite o le tue domande per il chirurgo...",
    submitBtn: "Richiedi Consulenza Gratuita",
    submittingBtn: "Invio della richiesta in corso...",
    successTitle: "Richiesta di Consulenza Ricevuta!",
    successMessage:
      "La tua richiesta è stata ricevuta; il nostro coordinatore medico ti contatterà al più presto su WhatsApp.",
    newRequestBtn: "Invia un'altra richiesta",
    instantWhatsappBtn: "Scrivici direttamente su WhatsApp ora",
    errorMessage:
      "Si è verificato un errore durante l'invio. Riprova o contattaci direttamente su WhatsApp.",
  },
};

export default function ContactSection({
  locale,
  selectedCity,
  onCityChange,
}: ContactSectionProps) {
  const copy = SITE_COPY[locale];
  const ui = FORM_UI[locale];
  const isRtl = isRtlLocale(locale);

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
    // Requirement 4: Include active language tag in `source` (e.g. `cosmetocity.online (DE)` or `cosmetocity.online (AR)`)
    const sourceLabel = `cosmetocity.online (${locale.toUpperCase()})`;

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
            ? `[${cityLabel} • ${locale.toUpperCase()}] ${message.trim()}`
            : `[${cityLabel} • ${locale.toUpperCase()}] Free Consultation Request`,
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
        dir={isRtl ? "rtl" : "ltr"}
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
                  <span dir="ltr">+90 552 602 2489</span>
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
                      {ui.successMessage}
                    </p>
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
                        dir="ltr"
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
                        <option value="antalya">{ui.cityAntalyaOption}</option>
                        <option value="istanbul">{ui.cityIstanbulOption}</option>
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
      <footer
        dir={isRtl ? "rtl" : "ltr"}
        className="bg-cosmeto-sand text-cosmeto-charcoal border-t border-cosmeto-sandBorder text-xs"
      >
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
