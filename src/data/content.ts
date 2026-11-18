export type Locale = "en" | "de" | "tr";
export type CityOption = "antalya" | "istanbul";

export interface TreatmentItem {
  id: string;
  categoryKey: "hair" | "dental" | "aesthetic";
  badge: Record<Locale, string>;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  highlights: Record<Locale, string[]>;
  priceGBP: string;
  priceEUR: string;
  ukDePrice: string;
  stayDuration: Record<Locale, string>;
  image: string;
}

export interface BeforeAfterCase {
  id: string;
  category: "hair" | "dental" | "aesthetic";
  patientInfo: Record<Locale, string>;
  procedureName: Record<Locale, string>;
  timeframe: Record<Locale, string>;
  graftsOrDetails: Record<Locale, string>;
  beforeImage: string;
  afterImage: string;
  doctorNote: Record<Locale, string>;
}

export interface TestimonialItem {
  id: string;
  name: string;
  cityCountry: string;
  flag: string;
  treatedIn: string;
  treatment: Record<Locale, string>;
  rating: number;
  date: string;
  quote: Record<Locale, string>;
  verifiedVia: string;
}

export const WHATSAPP_NUMBER = "905526022489";

export function buildWhatsAppLink(
  locale: Locale,
  topic?: string,
  city: CityOption = "antalya"
): string {
  const targetCity = city === "antalya" ? "Antalya" : "Istanbul";
  const messages: Record<Locale, string> = {
    en: `Hello CosmetoCity! I am visiting cosmetocity.online and would like a Free Consultation${
      topic ? ` for ${topic}` : ""
    } in ${targetCity}.`,
    de: `Hallo CosmetoCity-Team! Ich besuche cosmetocity.online und möchte eine kostenlose Beratung${
      topic ? ` zu ${topic}` : ""
    } in ${targetCity}.`,
    tr: `Merhaba CosmetoCity! cosmetocity.online üzerinden ulaşıyorum. ${targetCity} için${
      topic ? ` ${topic} hakkında` : ""
    } ücretsiz danışmanlık almak istiyorum.`,
  };
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    messages[locale]
  )}`;
}

export const SITE_COPY: Record<
  Locale,
  {
    topBadge: string;
    topSub: string;
    navTreatments: string;
    navBeforeAfter: string;
    navReviews: string;
    navContact: string;
    navCta: string;
    heroTrustPill: string;
    heroTitleLine1: string;
    heroTitleHighlight: string;
    heroSubtitle: string;
    citySelectorTitle: string;
    cityAntalyaBadge: string;
    cityAntalyaDesc: string;
    cityIstanbulBadge: string;
    cityIstanbulDesc: string;
    heroPrimaryCta: string;
    heroSecondaryCta: string;
    heroStats: { value: string; label: string }[];
    treatmentsTag: string;
    treatmentsTitle: string;
    treatmentsSubtitle: string;
    priceFromLabel: string;
    inquireWhatsappBtn: string;
    beforeAfterTag: string;
    beforeAfterTitle: string;
    beforeAfterSubtitle: string;
    beforeLabel: string;
    afterLabel: string;
    sliderInstruction: string;
    reviewsTag: string;
    reviewsTitle: string;
    reviewsSubtitle: string;
    contactTag: string;
    contactTitle: string;
    contactSubtitle: string;
    contactFormName: string;
    contactFormCountry: string;
    contactFormTreatment: string;
    contactFormCity: string;
    contactFormSubmit: string;
    istanbulOptionNoteTitle: string;
    istanbulOptionNoteDesc: string;
    stickyWhatsappText: string;
    stickyWhatsappSub: string;
    footerAddress: string;
    footerDisclaimer: string;
  }
> = {
  en: {
    topBadge:
      "Antalya Main Medical Hub (Lara / Muratpaşa) • Direct 4h Flights from UK & Germany to Antalya (AYT)",
    topSub: "Istanbul Partner Clinic Option Available Upon Request",
    navTreatments: "Treatments",
    navBeforeAfter: "Before/After",
    navReviews: "Reviews",
    navContact: "Contact",
    navCta: "Free Consultation",
    heroTrustPill: "TRUSTED BY 15,000+ UK & GERMAN PATIENTS SINCE 2019",
    heroTitleLine1: "World-Class Treatment in Antalya,",
    heroTitleHighlight: "5-Star Mediterranean Recovery.",
    heroSubtitle:
      "Experience accredited Hair Transplants, Dental Aesthetics (Hollywood Smile), and Medical Aesthetics in sunny Antalya, Turkey. Save up to 70% compared to UK & German clinics with luxury Lara beachside hotel stays and VIP airport transfers included. (Istanbul partner clinics also available upon request.)",
    citySelectorTitle: "Select Your Preferred Destination:",
    cityAntalyaBadge: "🏖️ Antalya (Main Hub • Most Popular)",
    cityAntalyaDesc:
      "Direct flights from London, Manchester, Munich, Berlin & Frankfurt to Antalya (AYT). 15-min VIP transfer to 5-star Lara hotels & OFM Antalya Hospital.",
    cityIstanbulBadge: "🌉 Istanbul (Partner Clinic Option)",
    cityIstanbulDesc:
      "Prefer to have your procedure in Istanbul? We gladly coordinate your surgery, 5-star hotel, and VIP transfers in Istanbul as well.",
    heroPrimaryCta: "WhatsApp Free Consultation",
    heroSecondaryCta: "Explore Treatments",
    heroStats: [
      { value: "4.9 / 5", label: "Trustpilot UK & DE Rating" },
      { value: "15,000+", label: "International Patients" },
      { value: "Up to 70%", label: "Savings vs. UK & Germany" },
      { value: "15 Mins", label: "Antalya Airport (AYT) to Clinic" },
    ],
    treatmentsTag: "OUR CORE MEDICAL SERVICES",
    treatmentsTitle: "Hair Transplant, Dental Aesthetics & Medical Aesthetics",
    treatmentsSubtitle:
      "Performed by board-certified specialists in Antalya's leading accredited hospitals using FDA & CE approved Swiss, German, and US materials.",
    priceFromLabel: "All-Inclusive VIP Package",
    inquireWhatsappBtn: "Free WhatsApp Quote",
    beforeAfterTag: "REAL PATIENT TRANSFORMATIONS",
    beforeAfterTitle: "Before & After Results Gallery",
    beforeAfterSubtitle:
      "Compare real clinical results from our UK and German patients who travelled to Antalya for Hair Restoration, Hollywood Smile, and Aesthetic procedures.",
    beforeLabel: "BEFORE",
    afterLabel: "AFTER",
    sliderInstruction: "Drag slider left or right to compare Before & After",
    reviewsTag: "VERIFIED SOCIAL PROOF",
    reviewsTitle: "International Patient Reviews (UK & Germany)",
    reviewsSubtitle:
      "Read authentic experiences from patients who flew from London, Manchester, and Munich to CosmetoCity Antalya.",
    contactTag: "DIRECT MEDICAL CONCIERGE",
    contactTitle: "Get Your Free Consultation & Treatment Plan",
    contactSubtitle:
      "Select your treatment below to start an instant WhatsApp consultation with our English & German speaking medical coordinators in Antalya.",
    contactFormName: "Your Full Name",
    contactFormCountry: "Your Country (e.g. United Kingdom, Germany)",
    contactFormTreatment: "Select Treatment",
    contactFormCity: "Preferred City",
    contactFormSubmit: "Start Free WhatsApp Consultation",
    istanbulOptionNoteTitle: "Want to Be Treated in Istanbul Instead?",
    istanbulOptionNoteDesc:
      "While Antalya is our headquarters and most popular recovery destination, we never say no to patients who prefer Istanbul. Ask our team for Istanbul JCI hospital packages!",
    stickyWhatsappText: "WhatsApp Consultation",
    stickyWhatsappSub: "Online • Replies in < 5 mins",
    footerAddress:
      "Çağlayan Mah. (Lara), Muratpaşa / Antalya, Turkey • Tel: +90 552 602 2489 • info@cosmetocity.com",
    footerDisclaimer:
      "© 2026 CosmetoCity (Sayantalia Medical Tourism • cosmetocity.online). All treatments are performed in Ministry of Health accredited partner hospitals in Antalya & Istanbul.",
  },
  de: {
    topBadge:
      "Hauptzentrum Antalya (Lara / Muratpaşa) • Direktflüge aus Deutschland & UK nach Antalya (AYT)",
    topSub: "Auf Wunsch auch Behandlung in unseren Partnerkliniken in Istanbul",
    navTreatments: "Treatments",
    navBeforeAfter: "Before/After",
    navReviews: "Reviews",
    navContact: "Contact",
    navCta: "Free Consultation",
    heroTrustPill: "ÜBER 15.000 PATIENTEN AUS DEUTSCHLAND & UK SEIT 2019",
    heroTitleLine1: "World-Class Treatment in Antalya,",
    heroTitleHighlight: "5-Sterne-Erholung am Mittelmeer.",
    heroSubtitle:
      "Erleben Sie erstklassige Haartransplantationen, Zahnästhetik (Hollywood Smile) und Medizinische Ästhetik im sonnigen Antalya. Sparen Sie bis zu 70% gegenüber Kliniken in Deutschland & UK – inklusive 5-Sterne-Hotel in Lara und VIP-Flughafentransfer.",
    citySelectorTitle: "Wählen Sie Ihren gewünschten Behandlungsort:",
    cityAntalyaBadge: "🏖️ Antalya (Hauptzentrum • Empfohlen)",
    cityAntalyaDesc:
      "Direktflüge ab München, Berlin, Frankfurt & Düsseldorf nach Antalya (AYT). Nur 15 Min. VIP-Transfer zum 5-Sterne-Hotel in Lara.",
    cityIstanbulBadge: "🌉 Istanbul (Partnerklinik-Option)",
    cityIstanbulDesc:
      "Sie möchten lieber nach Istanbul? Wir organisieren gerne Ihr komplettes VIP-Behandlungspaket in unseren Partnerkliniken in Istanbul.",
    heroPrimaryCta: "Kostenlose WhatsApp Beratung",
    heroSecondaryCta: "Behandlungen ansehen",
    heroStats: [
      { value: "4.9 / 5", label: "Trustpilot Bewertung" },
      { value: "15.000+", label: "Internationale Patienten" },
      { value: "Bis 70%", label: "Ersparnis ggü. DE & UK" },
      { value: "15 Min.", label: "Flughafen Antalya (AYT) zur Klinik" },
    ],
    treatmentsTag: "UNSERE KERNKOMPETENZEN",
    treatmentsTitle: "Haartransplantation, Zahnästhetik & Medizinische Ästhetik",
    treatmentsSubtitle:
      "Durchgeführt von erfahrenen Chefärzten in führenden Privatkliniken in Antalya (z. B. OFM Antalya Hospital) mit FDA- & CE-zertifizierten Materialien.",
    priceFromLabel: "All-Inclusive VIP-Paket",
    inquireWhatsappBtn: "Angebot per WhatsApp",
    beforeAfterTag: "ECHTE PATIENTENERGEBNISSE",
    beforeAfterTitle: "Vorher / Nachher Ergebnis-Galerie",
    beforeAfterSubtitle:
      "Vergleichen Sie dokumentierte Ergebnisse unserer Patienten aus Deutschland und Großbritannien in Antalya.",
    beforeLabel: "VORHER",
    afterLabel: "NACHHER",
    sliderInstruction: "Schieberegler bewegen für Vorher/Nachher-Vergleich",
    reviewsTag: "GEPRÜFTE PATIENTENSTIMMEN",
    reviewsTitle: "Erfahrungsberichte (Deutschland & UK)",
    reviewsSubtitle:
      "Authentische Bewertungen von Patienten, die ihre Behandlung bei CosmetoCity in Antalya durchgeführt haben.",
    contactTag: "DIREKTE PATIENTENBETREUUNG",
    contactTitle: "Kostenlose Beratung & Behandlungsplan anfordern",
    contactSubtitle:
      "Wählen Sie Ihre Wunschbehandlung und starten Sie direkt Ihre kostenlose WhatsApp-Beratung auf Deutsch oder Englisch.",
    contactFormName: "Ihr Vor- und Nachname",
    contactFormCountry: "Ihr Land (z. B. Deutschland, Österreich, Schweiz, UK)",
    contactFormTreatment: "Gewünschte Behandlung",
    contactFormCity: "Bevorzugte Stadt",
    contactFormSubmit: "Kostenlose WhatsApp-Beratung starten",
    istanbulOptionNoteTitle: "Sie möchten lieber in Istanbul behandelt werden?",
    istanbulOptionNoteDesc:
      "Unser Hauptsitz ist in Antalya, aber auf Wunsch organisieren wir Ihre Behandlung auch komplett in unseren JCI-Partnerkliniken in Istanbul.",
    stickyWhatsappText: "WhatsApp Beratung",
    stickyWhatsappSub: "Online • Antwort in < 5 Min.",
    footerAddress:
      "Çağlayan Mah. (Lara), Muratpaşa / Antalya, Türkei • Tel: +90 552 602 2489 • info@cosmetocity.com",
    footerDisclaimer:
      "© 2026 CosmetoCity (Sayantalia Medical Tourism • cosmetocity.online). Alle Behandlungen erfolgen in akkreditierten Partnerkliniken in Antalya & Istanbul.",
  },
  tr: {
    topBadge:
      "Ana Merkez: Antalya (Lara / Muratpaşa) • İngiltere ve Almanya'dan Antalya'ya (AYT) Direkt Uçuş",
    topSub: "Talep Eden Hastalarımız İçin İstanbul Partner Klinik Opsiyonu",
    navTreatments: "Treatments",
    navBeforeAfter: "Before/After",
    navReviews: "Reviews",
    navContact: "Contact",
    navCta: "Free Consultation",
    heroTrustPill: "İNGİLTERE VE ALMANYA'DAN 15.000+ MUTLU HASTA",
    heroTitleLine1: "World-Class Treatment in Antalya,",
    heroTitleHighlight: "Akdeniz Güneşiyle 5 Yıldızlı İyileşme.",
    heroSubtitle:
      "Antalya'daki ana merkezimizde İngiltere ve Almanya başta olmak üzere uluslararası hastalara Saç Ekimi, Diş Estetiği (Hollywood Smile) ve Medikal Estetik hizmeti sunuyoruz. Lara'da 5 yıldızlı otel konaklaması ve VIP havalimanı transferi dahil. (İsteyen hastalarımız için İstanbul partner hastanelerimizde de hizmet veriyoruz.)",
    citySelectorTitle: "Tedavi Olmak İstediğiniz Şehri Seçin:",
    cityAntalyaBadge: "🏖️ Antalya (Ana Merkezimiz • En Çok Tercih Edilen)",
    cityAntalyaDesc:
      "Londra, Manchester, Münih ve Berlin'den Antalya Havalimanı'na (AYT) direkt uçuş. 15 dakikada Lara'daki 5 yıldızlı otelinize ve hastanemize VIP transfer.",
    cityIstanbulBadge: "🌉 İstanbul (Partner Klinik Opsiyonu)",
    cityIstanbulDesc:
      "İstanbul'a gidip tedavi olmak isteyen hastalarımıza da hayır demiyoruz! İstanbul'daki anlaşmalı hastanelerimizde VIP paket organizasyonu sağlıyoruz.",
    heroPrimaryCta: "WhatsApp Ücretsiz Danışmanlık",
    heroSecondaryCta: "Tedavileri İncele",
    heroStats: [
      { value: "4.9 / 5", label: "Trustpilot UK & DE Puanı" },
      { value: "15.000+", label: "Uluslararası Hasta" },
      { value: "%70'e Varan", label: "UK & Almanya'ya Göre Avantaj" },
      { value: "15 Dk", label: "Antalya Havalimanı'ndan Kliniğe" },
    ],
    treatmentsTag: "TEDAVİ ALANLARIMIZ (SERVICES GRID)",
    treatmentsTitle: "Saç Ekimi, Diş Estetiği ve Medikal Estetik",
    treatmentsSubtitle:
      "Antalya'nın seçkin özel hastanelerinde (OFM Antalya Hastanesi vb.) FDA ve CE onaylı materyallerle uygulanan her şey dahil VIP tedavi paketleri.",
    priceFromLabel: "Her Şey Dahil VIP Paket",
    inquireWhatsappBtn: "WhatsApp'tan Teklif Al",
    beforeAfterTag: "GÜVEN VE SOSYAL KANIT",
    beforeAfterTitle: "Öncesi / Sonrası (Before / After) Galerisi",
    beforeAfterSubtitle:
      "İngiltere ve Almanya'dan Antalya'ya gelen hastalarımızın saç ekimi, diş estetiği ve medikal estetik değişimlerini karşılaştırın.",
    beforeLabel: "ÖNCESİ",
    afterLabel: "SONRASI",
    sliderInstruction: "Öncesi ve Sonrası karşılaştırması için kaydırıcıyı hareket ettirin",
    reviewsTag: "ULUSLARARASI HASTA YORUMLARI",
    reviewsTitle: "İngiltere ve Almanya'dan Hasta Yorumları",
    reviewsSubtitle:
      "Tedavilerini Antalya'da CosmetoCity güvencesiyle tamamlayan uluslararası hastalarımızın gerçek deneyimleri.",
    contactTag: "ÜCRETSİZ DANIŞMANLIK HATTI",
    contactTitle: "Ücretsiz Doktor Değerlendirmesi ve Fiyat Teklifi Alın",
    contactSubtitle:
      "Tedavinizi seçerek Antalya (veya İstanbul) ekibimizle doğrudan WhatsApp üzerinden ücretsiz danışmanlık başlatın.",
    contactFormName: "Adınız Soyadınız",
    contactFormCountry: "Ülkeniz (Örn. İngiltere, Almanya)",
    contactFormTreatment: "İlgilendiğiniz Tedavi",
    contactFormCity: "Tercih Ettiğiniz Şehir",
    contactFormSubmit: "WhatsApp'tan Ücretsiz Danışmanlık Başlat",
    istanbulOptionNoteTitle: "İstanbul'da Tedavi Olmak İsteyen Hastalarımız İçin:",
    istanbulOptionNoteDesc:
      "Ana merkezimiz Antalya'da yer almakla birlikte, İstanbul'da tedavi olmak isteyen hastalarımıza da partner hastanelerimizle tam VIP hizmet sunuyoruz.",
    stickyWhatsappText: "WhatsApp'tan Bilgi Al",
    stickyWhatsappSub: "Çevrimiçi • < 5 dk Yanıt",
    footerAddress:
      "Çağlayan Mah. (Lara), Muratpaşa / Antalya • Tel: +90 552 602 2489 • info@cosmetocity.com",
    footerDisclaimer:
      "© 2026 CosmetoCity (Sayantalia Medical Tourism • cosmetocity.online). Tüm işlemler Antalya ve İstanbul'daki yetkili partner hastanelerde uygulanır.",
  },
};

export const TREATMENTS_DATA: TreatmentItem[] = [
  {
    id: "hair-transplant",
    categoryKey: "hair",
    badge: {
      en: "SAPPHIRE FUE & DHI • LIFETIME WARRANTY",
      de: "SAPHIR FUE & DHI • LEBENSLANGE GARANTIE",
      tr: "SAFİR FUE & DHI • ÖMÜR BOYU GARANTİ",
    },
    title: {
      en: "Hair Transplant (Saç Ekimi)",
      de: "Haartransplantation (Sapphire FUE & DHI)",
      tr: "Saç Ekimi (Hair Transplant)",
    },
    description: {
      en: "Maximum density hair restoration (up to 5,000+ grafts) in Antalya using ultra-fine Sapphire blades or Choi DHI pens, paired with a relaxing 5-star Lara hotel recovery.",
      de: "Maximale Haardichte (bis zu 5.000+ Grafts) in Antalya mit feinsten Saphirklingen oder DHI-Implanter-Stiften inklusive 5-Sterne-Erholung in Antalya-Lara.",
      tr: "Antalya'da Safir FUE ve DHI Choi kalem tekniği ile 5.000+ grefte kadar doğal saç çizgisi tasarımı, PRP tedavisi ve Lara'da 5 yıldızlı otel konaklaması.",
    },
    highlights: {
      en: [
        "Up to 5,000+ Grafts & PRP Session Included",
        "15-Min VIP Transfer from Antalya Airport (AYT)",
        "3 Nights 5-Star Antalya Hotel & Aftercare Kit",
      ],
      de: [
        "Bis zu 5.000+ Grafts & PRP-Sitzung inklusive",
        "15 Min. VIP-Transfer ab Flughafen Antalya (AYT)",
        "3 Nächte 5-Sterne-Hotel in Antalya & Pflegeset",
      ],
      tr: [
        "5.000+ Greft & PRP Seansı Dahil",
        "Antalya Havalimanı'ndan (AYT) 15 Dk VIP Transfer",
        "3 Gece 5 Yıldızlı Antalya Otel & Bakım Seti",
      ],
    },
    priceGBP: "£1,690",
    priceEUR: "€1,990",
    ukDePrice: "£6,500 / €7,500",
    stayDuration: {
      en: "3 Days in Sunny Antalya",
      de: "3 Tage im sonnigen Antalya",
      tr: "Antalya'da 3 Gün / 2 Gece",
    },
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "dental-aesthetics",
    categoryKey: "dental",
    badge: {
      en: "SWISS E-MAX VENEERS & STRAUMANN IMPLANTS",
      de: "SCHWEIZER E-MAX & STRAUMANN IMPLANTATE",
      tr: "İSVİÇRE E-MAX & ALMAN ZİRKONYUM",
    },
    title: {
      en: "Dental Aesthetics (Hollywood Smile)",
      de: "Zahnästhetik (Hollywood Smile & Implantate)",
      tr: "Diş Estetiği (Dental Aesthetics)",
    },
    description: {
      en: "3D Digital Smile Design in Antalya using Swiss Ivoclar E-Max porcelain laminate veneers, German Zirconium crowns, and Straumann/Nobel All-on-4 dental implants.",
      de: "3D Digital Smile Design in Antalya mit Schweizer Ivoclar E-Max Veneers, deutschen Zirkonkronen und Straumann/Nobel Biocare Zahnimplantaten.",
      tr: "Antalya'da tatil konforunda 3D Dijital Gülüş Tasarımı, İsviçre Ivoclar E-Max yaprak porselen, Alman zirkonyum ve Straumann/Nobel implant tedavileri.",
    },
    highlights: {
      en: [
        "3D Digital Smile Preview Before Preparation",
        "Original Swiss Ivoclar E-Max & Straumann Warranty",
        "Enjoy Antalya's Coast Between 3 Clinic Visits",
      ],
      de: [
        "Digitale 3D-Vorschau vor Behandlungsbeginn",
        "Original Schweizer E-Max & Straumann mit Garantie",
        "Erholung am Meer zwischen nur 3 Klinikterminen",
      ],
      tr: [
        "İşlem Öncesi 3D Dijital Gülüş Provası",
        "Sertifikalı İsviçre E-Max & Straumann Garantisi",
        "Sadece 3 Randevu Arasında Antalya Tatili",
      ],
    },
    priceGBP: "£2,550",
    priceEUR: "€2,950",
    ukDePrice: "£11,500 / €13,500",
    stayDuration: {
      en: "5–6 Days in Antalya",
      de: "5–6 Tage in Antalya",
      tr: "Antalya'da 5–6 Gün",
    },
    image:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "medical-aesthetics",
    categoryKey: "aesthetic",
    badge: {
      en: "OFM ANTALYA HOSPITAL & EXPERT SURGEONS",
      de: "OFM ANTALYA HOSPITAL & FACHÄRZTE",
      tr: "ANTALYA UZMAN CERRAHLAR & MEDİKAL ESTETİK",
    },
    title: {
      en: "Medical Aesthetics & Plastic Surgery",
      de: "Medizinische Ästhetik & Plastische Chirurgie",
      tr: "Medikal Estetik & Plastik Cerrahi",
    },
    description: {
      en: "Ultrasonic Rhinoplasty, Breast Aesthetics, Vaser Liposuction, Eyelid Surgery, and Non-Surgical Facial Rejuvenation (Botox, Dermal Fillers, Morpheus8) in Antalya.",
      de: "Ultraschall-Rhinoplastik, Brustästhetik, Vaser-Liposuktion, Lidstraffung sowie nicht-chirurgische Gesichtsverjüngung (Botox, Hyaluron, Morpheus8) in Antalya.",
      tr: "Antalya'daki anlaşmalı hastanelerimizde Ultrasonik Rinoplasti, Meme Estetiği, Vaser Liposuction, Göz Kapağı Estetiği ve Ameliyatsız Yüz Gençleştirme.",
    },
    highlights: {
      en: [
        "Accredited Antalya Private Hospitals (OFM etc.)",
        "FDA & CE Certified Implants and Dermal Products",
        "Private Nurse Follow-Up at Your 5-Star Hotel",
      ],
      de: [
        "Akkreditierte Privatkliniken in Antalya (OFM u.a.)",
        "FDA- & CE-zertifizierte Implantate und Filler",
        "Persönliche Krankenschwester-Visite im 5-Sterne-Hotel",
      ],
      tr: [
        "Antalya'nın Tam Donanımlı Özel Hastanelerinde İşlem",
        "FDA & CE Onaylı İmplant ve Dermal Ürünler",
        "5 Yıldızlı Otelinizde Özel Hemşire Kontrolü",
      ],
    },
    priceGBP: "£1,950",
    priceEUR: "€2,290",
    ukDePrice: "£7,200 / €8,500",
    stayDuration: {
      en: "4–7 Days in Antalya",
      de: "4–7 Tage in Antalya",
      tr: "Antalya'da 4–7 Gün",
    },
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80",
  },
];

export const BEFORE_AFTER_CASES: BeforeAfterCase[] = [
  {
    id: "ba-hair",
    category: "hair",
    patientInfo: {
      en: "James T. (36) • London, UK 🇬🇧 → Treated in Antalya",
      de: "James T. (36) • London, UK 🇬🇧 → Behandelt in Antalya",
      tr: "James T. (36) • Londra, İngiltere 🇬🇧 → Antalya'da Tedavi Oldu",
    },
    procedureName: {
      en: "Sapphire FUE Hair Transplant (4,400 Grafts)",
      de: "Saphir FUE Haartransplantation (4.400 Grafts)",
      tr: "Safir FUE Saç Ekimi (4.400 Greft)",
    },
    timeframe: {
      en: "10 Months Post-Op Result",
      de: "Ergebnis nach 10 Monaten",
      tr: "10. Ay Kontrol Sonucu",
    },
    graftsOrDetails: {
      en: "4,400 Grafts • Natural Frontal Hairline & Crown Density",
      de: "4.400 Grafts • Natürliche Haarlinie & Tonsurverdichtung",
      tr: "4.400 Greft • Doğal Ön Saç Çizgisi ve Tepe Yoğunluğu",
    },
    beforeImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
    doctorNote: {
      en: "High graft survival achieved with Sapphire micro-channels and PRP therapy in Antalya.",
      de: "Maximale Anwuchsrate durch feine Saphir-Mikrokanäle und PRP-Therapie in Antalya.",
      tr: "Safir mikro kanallar ve PRP desteği ile yüksek greft tutunma oranı sağlandı.",
    },
  },
  {
    id: "ba-dental",
    category: "dental",
    patientInfo: {
      en: "Sabine K. (41) • Munich, Germany 🇩🇪 → Treated in Antalya",
      de: "Sabine K. (41) • München, Deutschland 🇩🇪 → Behandelt in Antalya",
      tr: "Sabine K. (41) • Münih, Almanya 🇩🇪 → Antalya'da Tedavi Oldu",
    },
    procedureName: {
      en: "Hollywood Smile (20 Swiss E-Max Veneers)",
      de: "Hollywood Smile (20 Schweizer E-Max Veneers)",
      tr: "Hollywood Smile (20 İsviçre E-Max Yaprak Porselen)",
    },
    timeframe: {
      en: "Completed in 5 Days in Lara, Antalya",
      de: "In 5 Tagen in Antalya-Lara fertiggestellt",
      tr: "Antalya Lara'da 5 Günde Tamamlandı",
    },
    graftsOrDetails: {
      en: "Natural BL2 Shade • 3D Digital Design + 20 E-Max Veneers",
      de: "Natürlicher Farbton BL2 • 3D-Design + 20 E-Max Veneers",
      tr: "Doğal BL2 Tonu • 3D Gülüş Tasarımı + 20 E-Max Veneer",
    },
    beforeImage:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=900&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=900&q=80",
    doctorNote: {
      en: "Completed with just 3 clinic visits, giving Sabine plenty of time to enjoy Antalya's coast.",
      de: "In nur 3 Klinikterminen abgeschlossen – mit viel Zeit zur Erholung am Strand von Lara.",
      tr: "Sadece 3 klinik randevusuyla tamamlandı; hastamız kalan süresini Lara sahilinde geçirdi.",
    },
  },
  {
    id: "ba-aesthetic",
    category: "aesthetic",
    patientInfo: {
      en: "Charlotte W. (32) • Manchester, UK 🇬🇧 → Treated in Antalya",
      de: "Charlotte W. (32) • Manchester, UK 🇬🇧 → Behandelt in Antalya",
      tr: "Charlotte W. (32) • Manchester, İngiltere 🇬🇧 → Antalya'da Tedavi Oldu",
    },
    procedureName: {
      en: "Ultrasonic Rhinoplasty & Facial Aesthetics",
      de: "Ultraschall-Rhinoplastik & Gesichtsästhetik",
      tr: "Ultrasonik Rinoplasti & Medikal Yüz Estetiği",
    },
    timeframe: {
      en: "6 Months Post-Procedure",
      de: "Ergebnis nach 6 Monaten",
      tr: "6. Ay Kontrol Sonucu",
    },
    graftsOrDetails: {
      en: "Piezo Ultrasonic Nasal Sculpting + Hyaluronic Contouring",
      de: "Piezo-Ultraschall-Nasenkorrektur + Konturharmonisierung",
      tr: "Piezo Ultrasonik Burun Şekillendirme + Kontür Dengeleme",
    },
    beforeImage:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80",
    doctorNote: {
      en: "Performed at our contracted hospital in Antalya with 5-star hotel nurse follow-up.",
      de: "Durchgeführt in unserer Partnerklinik in Antalya inklusive Hotel-Krankenschwester-Service.",
      tr: "Antalya'daki anlaşmalı hastanemizde gerçekleştirildi, otelde hemşire takibi yapıldı.",
    },
  },
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "rev-1",
    name: "Oliver Henderson",
    cityCountry: "London, United Kingdom",
    flag: "🇬🇧",
    treatedIn: "Antalya (Lara)",
    treatment: {
      en: "Hollywood Smile & Implants",
      de: "Hollywood Smile & Implantate",
      tr: "Hollywood Smile & İmplant",
    },
    rating: 5,
    date: "2 weeks ago",
    quote: {
      en: "Flying directly from London Gatwick to Antalya was effortless. Within 15 minutes of landing, CosmetoCity's VIP driver dropped me at my 5-star Lara beach hotel. I saved over £8,500 compared to London dental clinics and enjoyed sunny beach walks between appointments!",
      de: "Der Direktflug von London nach Antalya war perfekt. Nach nur 15 Minuten Fahrt war ich im 5-Sterne-Strandhotel in Lara. Ich habe über 8.500 £ gegenüber London gespart und gleichzeitig Sonne am Meer genossen!",
      tr: "Londra Gatwick'ten Antalya'ya direkt uçmak çok rahattı. İndikten 15 dakika sonra VIP araçla Lara'daki 5 yıldızlı sahil otelime ulaştım. Londra fiyatlarına göre £8.500 tasarruf ederken randevular arasında deniz kenarında tatil yaptım!",
    },
    verifiedVia: "Trustpilot Verified • UK Patient",
  },
  {
    id: "rev-2",
    name: "Markus & Julia Weber",
    cityCountry: "Munich, Germany",
    flag: "🇩🇪",
    treatedIn: "Antalya (Muratpaşa)",
    treatment: {
      en: "Sapphire FUE Hair Transplant (4,500 Grafts)",
      de: "Saphir FUE Haartransplantation (4.500 Grafts)",
      tr: "Safir FUE Saç Ekimi (4.500 Greft)",
    },
    rating: 5,
    date: "3 weeks ago",
    quote: {
      en: "We already loved Antalya from our summer holidays, so having my hair transplant with CosmetoCity in Antalya felt completely stress-free. German-speaking host, ultra-modern medical suite, and peaceful Mediterranean recovery.",
      de: "Wir kannten Antalya schon vom Urlaub – meine Haartransplantation bei CosmetoCity in Antalya war absolut stressfrei. Deutschsprachige Betreuung vor Ort, hochmoderne Klinik und entspannte Erholung am Mittelmeer.",
      tr: "Antalya'yı tatillerimizden zaten çok seviyorduk; saç ekimimi Antalya'da CosmetoCity ile yaptırmak sıfır stresle geçti. Almanca bilen tercümanımız, modern klinik ve Akdeniz kıyısında huzurlu iyileşme süreci harikaydı.",
    },
    verifiedVia: "ProvenExpert & Trustpilot • DE Patient",
  },
  {
    id: "rev-3",
    name: "Hannah Davies",
    cityCountry: "Manchester, United Kingdom",
    flag: "🇬🇧",
    treatedIn: "Antalya (OFM Hospital)",
    treatment: {
      en: "Medical Aesthetics & Ultrasonic Rhinoplasty",
      de: "Medizinische Ästhetik & Piezo-Rhinoplastik",
      tr: "Medikal Estetik & Ultrasonik Rinoplasti",
    },
    rating: 5,
    date: "1 month ago",
    quote: {
      en: "From my very first WhatsApp Free Consultation to flying home to Manchester, CosmetoCity took care of every detail. The OFM Hospital in Antalya was spotless, my surgeon spoke great English, and the nurse visited me at my hotel every day.",
      de: "Von der ersten kostenlosen WhatsApp-Beratung bis zum Rückflug nach Manchester hat CosmetoCity jedes Detail perfekt organisiert. Das OFM-Krankenhaus in Antalya war makellos und die Krankenschwester kam täglich ins Hotel.",
      tr: "İlk ücretsiz WhatsApp danışmanlığımdan Manchester'a dönüşüme kadar CosmetoCity her detayla ilgilendi. Antalya'daki OFM Hastanesi tertemizdi, cerrahım çok ilgiliydi ve hemşire her gün otelime kontrole geldi.",
    },
    verifiedVia: "Trustpilot Verified • UK Patient",
  },
];
