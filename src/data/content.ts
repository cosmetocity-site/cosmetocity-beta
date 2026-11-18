export type Locale = "en" | "de" | "tr";

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
  treatment: Record<Locale, string>;
  rating: number;
  date: string;
  quote: Record<Locale, string>;
  verifiedVia: string;
}

export const SITE_COPY: Record<
  Locale,
  {
    topBadge: string;
    topSub: string;
    navTreatments: string;
    navBeforeAfter: string;
    navReviews: string;
    navWhyUs: string;
    navCta: string;
    heroTrustPill: string;
    heroTitleLine1: string;
    heroTitleHighlight: string;
    heroSubtitle: string;
    heroPrimaryCta: string;
    heroSecondaryCta: string;
    heroStats: { value: string; label: string }[];
    treatmentsTag: string;
    treatmentsTitle: string;
    treatmentsSubtitle: string;
    priceFromLabel: string;
    ukDeComparisonLabel: string;
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
    vipPackageTag: string;
    vipPackageTitle: string;
    vipSteps: { title: string; desc: string }[];
    ctaBannerTitle: string;
    ctaBannerSub: string;
    stickyWhatsappText: string;
    stickyWhatsappSub: string;
    footerDisclaimer: string;
  }
> = {
  en: {
    topBadge: "JCI-Accredited Partner Clinics • Direct Flights from London, Manchester, Munich & Berlin",
    topSub: "UK & EU Patient Desk • 24/7 English & German Support",
    navTreatments: "Treatments",
    navBeforeAfter: "Before / After",
    navReviews: "UK & DE Reviews",
    navWhyUs: "VIP All-Inclusive",
    navCta: "Free Medical Assessment",
    heroTrustPill: "TRUSTED BY 15,000+ UK & GERMAN PATIENTS",
    heroTitleLine1: "European-Standard Medical Excellence,",
    heroTitleHighlight: "Up to 70% Savings in Istanbul.",
    heroSubtitle:
      "Cosmetocity connects patients from the United Kingdom and Germany with JCI-accredited hospitals for Hair Transplants, Hollywood Smile Dental Care, and Medical Aesthetics—complete with 5-star hotel stays, VIP Mercedes transfers, and dedicated native hosts.",
    heroPrimaryCta: "Get Free WhatsApp Quote",
    heroSecondaryCta: "View Before & After Results",
    heroStats: [
      { value: "4.9 / 5", label: "Verified UK & DE Patient Rating" },
      { value: "15,000+", label: "Successful Procedures" },
      { value: "100%", label: "Written Medical Warranty" },
      { value: "3–5 Days", label: "Average Stay in Istanbul" },
    ],
    treatmentsTag: "OUR CORE SPECIALTIES",
    treatmentsTitle: "Hair Transplant, Dental Treatments & Medical Aesthetics",
    treatmentsSubtitle:
      "Transparent all-inclusive packages tailored for patients travelling from the UK and Germany. Zero hidden hospital fees.",
    priceFromLabel: "All-Inclusive VIP Package",
    ukDeComparisonLabel: "Typical UK / DE Clinic:",
    inquireWhatsappBtn: "Ask Doctor on WhatsApp",
    beforeAfterTag: "PROVEN CLINICAL OUTCOMES",
    beforeAfterTitle: "Before & After Transformations",
    beforeAfterSubtitle:
      "Drag the interactive comparison slider or switch between verified hair, dental, and aesthetic cases from our London, Manchester, Munich, and Frankfurt patients.",
    beforeLabel: "BEFORE",
    afterLabel: "AFTER",
    sliderInstruction: "Use the slider to compare Before & After state",
    reviewsTag: "VERIFIED PATIENT STORIES",
    reviewsTitle: "What Our UK & German Patients Say",
    reviewsSubtitle:
      "Authentic reviews from patients who flew from London, Manchester, Berlin, and Munich to Cosmetocity Istanbul.",
    vipPackageTag: "WORRY-FREE MEDICAL TRAVEL",
    vipPackageTitle: "Every Cosmetocity Package Includes",
    vipSteps: [
      {
        title: "JCI Hospital & FDA/CE Materials",
        desc: "Pre-op blood diagnostics, chief specialist procedure, and certified Swiss/German materials.",
      },
      {
        title: "5-Star Luxury Hotel Stay",
        desc: "Central Istanbul 5-star partner accommodation with breakfast and recovery care.",
      },
      {
        title: "VIP Airport & Clinic Transfers",
        desc: "Private chauffeur pickup from Istanbul Airport (IST/SAW) in VIP Mercedes vans.",
      },
      {
        title: "12-Month UK & DE Aftercare",
        desc: "Personal English/German coordinator on-site plus 1 year of remote medical follow-up.",
      },
    ],
    ctaBannerTitle: "Ready for Your Free Online Surgeon Assessment?",
    ctaBannerSub:
      "Send your photos via WhatsApp and receive your personalized treatment plan and fixed package quote within 15 minutes.",
    stickyWhatsappText: "Get Info on WhatsApp",
    stickyWhatsappSub: "Online • Replies in < 5 mins",
    footerDisclaimer:
      "© 2026 Cosmetocity (cosmetocity.online). All procedures are performed at Turkish Ministry of Health & JCI-accredited partner medical institutions.",
  },
  de: {
    topBadge: "JCI-Akkreditierte Partnerkliniken • Direktflüge ab München, Berlin, Frankfurt & London",
    topSub: "Deutsche & Englische Patientenbetreuung 24/7",
    navTreatments: "Behandlungen",
    navBeforeAfter: "Vorher / Nachher",
    navReviews: "Erfahrungen (DE & UK)",
    navWhyUs: "VIP All-Inclusive",
    navCta: "Kostenlose Ersteinschätzung",
    heroTrustPill: "ÜBER 15.000 PATIENTEN AUS DEUTSCHLAND & UK",
    heroTitleLine1: "Medizinische Spitzenqualität,",
    heroTitleHighlight: "Bis zu 70% Ersparnis in Istanbul.",
    heroSubtitle:
      "Cosmetocity begleitet Patienten aus Deutschland, Österreich, der Schweiz und Großbritannien bei Haartransplantationen, Zahnästhetik und Medizinischer Ästhetik in JCI-zertifizierten Kliniken – inklusive 5-Sterne-Hotel, VIP-Transfer und deutscher Betreuung.",
    heroPrimaryCta: "Per WhatsApp Angebot erhalten",
    heroSecondaryCta: "Vorher / Nachher ansehen",
    heroStats: [
      { value: "4.9 / 5", label: "Geprüfte Patientenbewertung" },
      { value: "15.000+", label: "Erfolgreiche Behandlungen" },
      { value: "100%", label: "Schriftliches Garantiezertifikat" },
      { value: "3–5 Tage", label: "Durchschnittlicher Aufenthalt" },
    ],
    treatmentsTag: "UNSERE KERNKOMPETENZEN",
    treatmentsTitle: "Haartransplantation, Zahnbehandlungen & Medizinische Ästhetik",
    treatmentsSubtitle:
      "Transparente All-Inclusive-Festpreispakete für Patienten aus Deutschland und Großbritannien – ohne versteckte Kosten.",
    priceFromLabel: "All-Inclusive VIP-Paket",
    ukDeComparisonLabel: "Preis in DE / UK ca.:",
    inquireWhatsappBtn: "Per WhatsApp anfragen",
    beforeAfterTag: "DOKUMENTIERTE ERGEBNISSE",
    beforeAfterTitle: "Vorher / Nachher Ergebnisse",
    beforeAfterSubtitle:
      "Bewegen Sie den interaktiven Regler, um dokumentierte Ergebnisse unserer Patienten aus München, Berlin, Frankfurt und London zu vergleichen.",
    beforeLabel: "VORHER",
    afterLabel: "NACHHER",
    sliderInstruction: "Schieberegler bewegen für Vorher/Nachher-Vergleich",
    reviewsTag: "ECHTE PATIENTENERFAHRUNGEN",
    reviewsTitle: "Das sagen Patienten aus Deutschland & UK",
    reviewsSubtitle:
      "Verifizierte Erfahrungsberichte von Patienten, die sich für Cosmetocity Istanbul entschieden haben.",
    vipPackageTag: "RUNDUM-SORGLOS-PAKET",
    vipPackageTitle: "In jedem Cosmetocity VIP-Paket enthalten",
    vipSteps: [
      {
        title: "JCI-Klinik & CE/FDA-Materialien",
        desc: "Komplette Voruntersuchung, Chefarzt-Behandlung und geprüfte Schweizer/Deutsche Markenimplantate.",
      },
      {
        title: "5-Sterne Luxushotel",
        desc: "Übernachtung im zentralen 5-Sterne-Partnerhotel in Istanbul inklusive Frühstück.",
      },
      {
        title: "VIP Mercedes Flughafentransfer",
        desc: "Privater Chauffeurservice zwischen Flughafen, Hotel und Klinik.",
      },
      {
        title: "12 Monate Nachsorge & Deutschsprachiger Host",
        desc: "Persönlicher deutscher Dolmetscher vor Ort sowie 1 Jahr medizinische Nachbetreuung.",
      },
    ],
    ctaBannerTitle: "Bereit für Ihre kostenlose ärztliche Ersteinschätzung?",
    ctaBannerSub:
      "Senden Sie uns Ihre Fotos bequem per WhatsApp und erhalten Sie innerhalb von 15 Minuten Ihren Behandlungsplan zum Festpreis.",
    stickyWhatsappText: "WhatsApp Beratung",
    stickyWhatsappSub: "Online • Antwort in < 5 Min.",
    footerDisclaimer:
      "© 2026 Cosmetocity (cosmetocity.online). Alle Eingriffe erfolgen in JCI-akkreditierten Partnerkliniken.",
  },
  tr: {
    topBadge: "JCI Akrediteli Partner Hastaneler • İngiltere ve Almanya Hastalarına Özel VIP Hizmet",
    topSub: "7/24 İngilizce, Almanca ve Türkçe Hasta Koordinasyonu",
    navTreatments: "Tedavilerimiz",
    navBeforeAfter: "Öncesi / Sonrası",
    navReviews: "Hasta Yorumları",
    navWhyUs: "VIP Paket İçeriği",
    navCta: "Ücretsiz Doktor Analizi",
    heroTrustPill: "İNGİLTERE VE ALMANYA'DAN 15.000+ MUTLU HASTA",
    heroTitleLine1: "Avrupa Standartlarında Medikal Mükemmeliyet,",
    heroTitleHighlight: "İstanbul'da VIP Sağlık Turizmi.",
    heroSubtitle:
      "Cosmetocity; Saç Ekimi, Diş Tedavileri (Hollywood Smile) ve Medikal Estetik alanlarında İngiltere ve Almanya başta olmak üzere uluslararası hastalara 5 yıldızlı otel, VIP transfer ve JCI akrediteli hastane güvencesiyle hizmet sunar.",
    heroPrimaryCta: "WhatsApp'tan Bilgi Al",
    heroSecondaryCta: "Öncesi / Sonrası İncele",
    heroStats: [
      { value: "4.9 / 5", label: "Doğrulanmış Hasta Puanı" },
      { value: "15.000+", label: "Başarılı Operasyon" },
      { value: "%100", label: "Uluslararası Garanti Sertifikası" },
      { value: "3–5 Gün", label: "Ortalama İstanbul Konaklaması" },
    ],
    treatmentsTag: "TEDAVİ ALANLARIMIZ",
    treatmentsTitle: "Saç Ekimi, Diş Tedavileri ve Medikal Estetik",
    treatmentsSubtitle:
      "İngiltere ve Almanya'dan gelen hastalarımız için sürpriz maliyet içermeyen her şey dahil VIP paketler.",
    priceFromLabel: "Her Şey Dahil VIP Paket",
    ukDeComparisonLabel: "İngiltere / Almanya Fiyatı:",
    inquireWhatsappBtn: "WhatsApp'tan Bilgi Al",
    beforeAfterTag: "KLİNİK SONUÇLARIMIZ",
    beforeAfterTitle: "Öncesi / Sonrası (Before / After) Sonuçları",
    beforeAfterSubtitle:
      "Kaydırıcıyı hareket ettirerek saç ekimi, diş estetiği ve medikal estetik vakalarımızın değişimini inceleyin.",
    beforeLabel: "ÖNCESİ",
    afterLabel: "SONRASI",
    sliderInstruction: "Öncesi ve Sonrası karşılaştırması için çubuğu kaydırın",
    reviewsTag: "DOĞRULANMIŞ HASTA YORUMLARI",
    reviewsTitle: "İngiltere ve Almanya'dan Hastalarımız Ne Diyor?",
    reviewsSubtitle:
      "Londra, Manchester, Münih ve Berlin'den İstanbul'a gelen hastalarımızın gerçek deneyimleri.",
    vipPackageTag: "HER ŞEY DAHİL VIP KONFOR",
    vipPackageTitle: "Tüm Cosmetocity Paketlerine Dahil Hizmetler",
    vipSteps: [
      {
        title: "JCI Hastane & FDA/CE Materyaller",
        desc: "Ameliyat öncesi tüm tetkikler, uzman hekim operasyonu ve sertifikalı İsviçre/Alman materyaller.",
      },
      {
        title: "5 Yıldızlı Otel Konaklaması",
        desc: "İstanbul'un merkezinde 5 yıldızlı partner otellerde kahvaltı dahil konforlu konaklama.",
      },
      {
        title: "VIP Mercedes Havalimanı Transferi",
        desc: "Havalimanı, otel ve klinik arasında özel şoförlü VIP araçlarla ulaşım.",
      },
      {
        title: "12 Ay Takip & Ana Dilde Tercüman",
        desc: "İngilizce/Almanca bilen birebir hasta danışmanı ve 1 yıl boyunca uzaktan medikal takip.",
      },
    ],
    ctaBannerTitle: "Ücretsiz Online Doktor Değerlendirmesi İçin Hazır mısınız?",
    ctaBannerSub:
      "WhatsApp üzerinden fotoğraflarınızı gönderin, 15 dakika içinde size özel tedavi planı ve sabit fiyat teklifinizi alın.",
    stickyWhatsappText: "WhatsApp'tan Bilgi Al",
    stickyWhatsappSub: "Çevrimiçi • Hızlı Yanıt",
    footerDisclaimer:
      "© 2026 Cosmetocity (cosmetocity.online). Tüm işlemler JCI akreditasyonlu sağlık kuruluşlarında gerçekleştirilir.",
  },
};

export const TREATMENTS_DATA: TreatmentItem[] = [
  {
    id: "hair-transplant",
    categoryKey: "hair",
    badge: {
      en: "MAXIMUM GRAFTS • LIFETIME WARRANTY",
      de: "MAXIMALE GRAFTS • LEBENSLANGE GARANTIE",
      tr: "MAKSİMUM GREFT • ÖMÜR BOYU GARANTİ",
    },
    title: {
      en: "Sapphire FUE & DHI Hair Transplant",
      de: "Saphir FUE & DHI Haartransplantation",
      tr: "Safir FUE & DHI Saç Ekimi",
    },
    description: {
      en: "Natural hairline artistry with up to 5,000+ grafts using ultra-fine sapphire blades or Choi DHI implanter pens. Includes needle-free comfort anesthesia and PRP therapy.",
      de: "Natürliche Haarlinie mit bis zu 5.000+ Grafts durch feinste Saphirklingen oder DHI Choi-Implanter. Inklusive schmerzfreier Comfort-In-Anästhesie und PRP-Behandlung.",
      tr: "Gerçek safir uçlar ve DHI Choi kalem tekniği ile 5.000+ grefte kadar maksimum yoğunluk, doğal ön saç çizgisi tasarımı, ağrısız anestezi ve PRP desteği.",
    },
    highlights: {
      en: [
        "Up to 5,000+ Grafts & PRP Session Included",
        "Unshaven DHI Option Available",
        "Written Lifetime Graft Warranty Certificate",
      ],
      de: [
        "Bis zu 5.000+ Grafts & PRP-Sitzung inklusive",
        "DHI-Methode ohne Rasur verfügbar",
        "Schriftliches Garantiezertifikat auf Lebenszeit",
      ],
      tr: [
        "5.000+ Greft & PRP Seansı Dahil",
        "Tıraşsız DHI Ekim Seçeneği",
        "Yazılı Ömür Boyu Garanti Sertifikası",
      ],
    },
    priceGBP: "£1,790",
    priceEUR: "€2,100",
    ukDePrice: "£6,500 / €7,500",
    stayDuration: {
      en: "3 Days / 2 Nights in Istanbul",
      de: "3 Tage / 2 Nächte in Istanbul",
      tr: "İstanbul'da 3 Gün / 2 Gece",
    },
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "dental-treatments",
    categoryKey: "dental",
    badge: {
      en: "SWISS E-MAX & STRAUMANN IMPLANTS",
      de: "SCHWEIZER E-MAX & STRAUMANN IMPLANTATE",
      tr: "İSVİÇRE E-MAX & ALMAN ZİRKONYUM",
    },
    title: {
      en: "Hollywood Smile & Dental Implants",
      de: "Hollywood Smile & Zahnimplantate",
      tr: "Diş Tedavileri & Hollywood Smile",
    },
    description: {
      en: "3D Digital Smile Design using Swiss Ivoclar E-Max porcelain veneers, German multi-layer Zirconium crowns, and Straumann/Nobel Biocare All-on-4 dental implants.",
      de: "3D Digital Smile Design mit Schweizer Ivoclar E-Max Keramik-Veneers, deutschen Zirkonkronen und Straumann/Nobel Biocare All-on-4 Zahnimplantaten.",
      tr: "3D Dijital Gülüş Tasarımı, İsviçre Ivoclar E-Max yaprak porselenler, Alman zirkonyum kaplamalar ve Straumann/Nobel All-on-4 implant tedavileri.",
    },
    highlights: {
      en: [
        "3D Digital Smile Preview Before Preparation",
        "Original Swiss Ivoclar E-Max & Straumann",
        "Completed in 5 Days with In-House CAD/CAM Lab",
      ],
      de: [
        "Digitale 3D-Vorschau vor Behandlungsbeginn",
        "Original Schweizer Ivoclar E-Max & Straumann",
        "In 5 Tagen fertig dank eigenem CAD/CAM-Labor",
      ],
      tr: [
        "İşlem Öncesi 3D Dijital Gülüş Проvası",
        "Orijinal İsviçre E-Max & Alman Zirkonyum",
        "CAD/CAM Laboratuvarı ile 5 Günde Teslim",
      ],
    },
    priceGBP: "£2,650",
    priceEUR: "€3,100",
    ukDePrice: "£11,500 / €13,500",
    stayDuration: {
      en: "5–6 Days in Istanbul",
      de: "5–6 Tage in Istanbul",
      tr: "İstanbul'da 5–6 Gün",
    },
    image:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "medical-aesthetics",
    categoryKey: "aesthetic",
    badge: {
      en: "FDA & CE CERTIFIED PROCEDURES",
      de: "FDA & CE ZERTIFIZIERTE VERFAHREN",
      tr: "FDA & CE ONAYLI MEDİKAL ESTETİK",
    },
    title: {
      en: "Medical Aesthetics & Facial Contouring",
      de: "Medizinische Ästhetik & Gesichtsverjüngung",
      tr: "Medikal Estetik & Yüz Gençleştirme",
    },
    description: {
      en: "Non-surgical and minimally invasive aesthetic treatments including Ultrasonic Piezo Rhinoplasty, Morpheus8 RF Microneedling, Premium Dermal Fillers, Botox, and Liquid Facelift.",
      de: "Nicht-chirurgische und minimalinvasive Ästhetik: Ultraschall-Piezo-Rhinoplastik, Morpheus8 RF-Needling, Hyaluron-Filler, Botox und Fadenlifting durch Fachärzte.",
      tr: "Ameliyatsız yüz gençleştirme, dermal dolgu, botoks, Morpheus8 altın iğne, gençlik aşısı ve Ultrasonik Piezo Burun Estetiği uygulamaları.",
    },
    highlights: {
      en: [
        "Allergan, Juvederm & Teosyal FDA Products",
        "3D Facial Symmetry & Skin Analysis",
        "Minimal Downtime • Combine with Istanbul Stay",
      ],
      de: [
        "Original Allergan, Juvederm & Teosyal Präparate",
        "3D-Gesichtsanalyse durch Fachärzte",
        "Minimale Ausfallzeit • Sofort gesellschaftsfähig",
      ],
      tr: [
        "FDA Onaylı Allergan, Juvederm & Teosyal Ürünler",
        "Uzman Hekim Eşliğinde 3D Yüz Analizi",
        "Kısa İyileşme Süresi & Doğal Görünüm",
      ],
    },
    priceGBP: "£1,250",
    priceEUR: "€1,490",
    ukDePrice: "£4,200 / €4,900",
    stayDuration: {
      en: "2–5 Days in Istanbul",
      de: "2–5 Tage in Istanbul",
      tr: "İstanbul'da 2–5 Gün",
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
      en: "James T. (36) • London, United Kingdom 🇬🇧",
      de: "James T. (36) • London, Großbritannien 🇬🇧",
      tr: "James T. (36) • Londra, İngiltere 🇬🇧",
    },
    procedureName: {
      en: "Sapphire FUE Hair Transplant",
      de: "Saphir FUE Haartransplantation",
      tr: "Safir FUE Saç Ekimi",
    },
    timeframe: {
      en: "10 Months Post-Op Result",
      de: "Ergebnis nach 10 Monaten",
      tr: "10. Ay Kontrol Sonucu",
    },
    graftsOrDetails: {
      en: "4,350 Grafts • Frontal Hairline + Crown Reconstruction",
      de: "4.350 Grafts • Haarlinie + Tonsurbereich",
      tr: "4.350 Greft • Ön Saç Çizgisi + Tepe Bölgesi",
    },
    beforeImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
    doctorNote: {
      en: "Dense single-follicle transition zone crafted for an undetectable natural frontal hairline.",
      de: "Hohe Dichte im Frontbereich mit Einzelgrafts für einen absolut natürlichen Übergang.",
      tr: "Tekli köklerle oluşturulan sık ve tamamen doğal görünümlü ön saç çizgisi geçişi.",
    },
  },
  {
    id: "ba-dental",
    category: "dental",
    patientInfo: {
      en: "Sabine K. (41) • Munich, Germany 🇩🇪",
      de: "Sabine K. (41) • München, Deutschland 🇩🇪",
      tr: "Sabine K. (41) • Münih, Almanya 🇩🇪",
    },
    procedureName: {
      en: "Hollywood Smile (20 Swiss E-Max Veneers)",
      de: "Hollywood Smile (20 Schweizer E-Max Veneers)",
      tr: "Hollywood Smile (20 İsviçre E-Max Lamina)",
    },
    timeframe: {
      en: "Completed in 5 Days",
      de: "Fertiggestellt in 5 Tagen",
      tr: "5 Günde Tamamlandı",
    },
    graftsOrDetails: {
      en: "Natural BL2 Shade • Laser Gum Contouring + 20 Veneers",
      de: "Natürlicher Farbton BL2 • Zahnfleischkorrektur + 20 Veneers",
      tr: "Doğal BL2 Tonu • Pembe Estetik + 20 E-Max Veneer",
    },
    beforeImage:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=900&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=900&q=80",
    doctorNote: {
      en: "Corrected diastema and enamel wear while preserving natural tooth translucency.",
      de: "Korrektur von Zahnlücken und Verfärbungen bei maximalem Erhalt der Zahnsubstanz.",
      tr: "Diş minesi korunarak doğal ışık geçirgenliğine sahip simetrik gülüş tasarımı.",
    },
  },
  {
    id: "ba-aesthetic",
    category: "aesthetic",
    patientInfo: {
      en: "Charlotte W. (32) • Manchester, United Kingdom 🇬🇧",
      de: "Charlotte W. (32) • Manchester, Großbritannien 🇬🇧",
      tr: "Charlotte W. (32) • Manchester, İngiltere 🇬🇧",
    },
    procedureName: {
      en: "Ultrasonic Piezo Rhinoplasty & Jawline Contour",
      de: "Ultraschall Piezo-Rhinoplastik & Jawline-Kontur",
      tr: "Ultrasonik Piezo Rinoplasti & Jawline Medikal Estetik",
    },
    timeframe: {
      en: "6 Months Post-Procedure",
      de: "Ergebnis nach 6 Monaten",
      tr: "6. Ay Sonucu",
    },
    graftsOrDetails: {
      en: "Dorsal Hump Refinement + Hyaluronic Chin Harmonization",
      de: "Nasenrückenkorrektur + Harmonisierung der Kinnlinie",
      tr: "Burun Kemeri Düzeltme + Hyaluronik Çene Hattı Dengeleme",
    },
    beforeImage:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80",
    doctorNote: {
      en: "Balanced profile harmony achieved with zero visible external incisions.",
      de: "Harmonisches Seitenprofil durch schonende Ultraschalltechnik ohne sichtbare Narben.",
      tr: "Yüz altın oranına uygun, izsiz ve doğal profil harmonisi.",
    },
  },
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "rev-1",
    name: "Oliver Henderson",
    cityCountry: "London, United Kingdom",
    flag: "🇬🇧",
    treatment: {
      en: "Sapphire FUE Hair Transplant (4,500 Grafts)",
      de: "Saphir FUE Haartransplantation (4.500 Grafts)",
      tr: "Safir FUE Saç Ekimi (4.500 Greft)",
    },
    rating: 5,
    date: "2 weeks ago",
    quote: {
      en: "Harley Street clinics quoted me £7,800 for 3,000 grafts. With Cosmetocity I flew from Heathrow, was picked up in a Maybach-style Mercedes van, stayed at a 5-star hotel, and had 4,500 grafts in a JCI hospital that looked like a spaceship. Best decision I ever made.",
      de: "In London sollte ich 7.800 £ zahlen. Mit Cosmetocity wurde ich im VIP-Mercedes abgeholt, wohnte im 5-Sterne-Hotel und erhielt 4.500 Grafts in einer hochmodernen JCI-Klinik. Absolute Empfehlung!",
      tr: "Londra'da 3.000 greft için £7.800 fiyat verdiler. Cosmetocity ile Heathrow'dan uçtum, VIP Mercedes ile karşılandım, 5 yıldızlı otelde kaldım ve JCI akrediteli hastanede 4.500 greft ekim yapıldı.",
    },
    verifiedVia: "Trustpilot Verified • UK Patient",
  },
  {
    id: "rev-2",
    name: "Lukas & Anna Schneider",
    cityCountry: "Munich, Germany",
    flag: "🇩🇪",
    treatment: {
      en: "Hollywood Smile (20 E-Max Veneers)",
      de: "Hollywood Smile (20 E-Max Keramik-Veneers)",
      tr: "Hollywood Smile (20 E-Max Yaprak Porselen)",
    },
    rating: 5,
    date: "1 month ago",
    quote: {
      en: "Typical German precision! Our German-speaking coordinator accompanied us to every dental appointment. We saw the 3D digital simulation on day 1 and got our permanent Swiss E-Max veneers on day 5. Saved over €9,500 compared to Munich.",
      de: "Deutsche Präzision in Istanbul! Unser deutschsprachiger Betreuer war bei jedem Termin dabei. Am 1. Tag sahen wir die 3D-Simulation, am 5. Tag waren unsere Schweizer E-Max Veneers fertig. Über 9.500 € gegenüber München gespart!",
      tr: "Almanca konuşan koordinatörümüz her randevuda yanımızdaydı. 1. gün 3D dijital simülasyonu gördük, 5. gün orijinal İsviçre E-Max dişlerimiz takıldı. Münih fiyatlarına göre 9.500 € tasarruf ettik!",
    },
    verifiedVia: "Google & ProvenExpert Verified • DE Patient",
  },
  {
    id: "rev-3",
    name: "Emma Richardson",
    cityCountry: "Manchester, United Kingdom",
    flag: "🇬🇧",
    treatment: {
      en: "Medical Aesthetics & Ultrasonic Rhinoplasty",
      de: "Medizinische Ästhetik & Piezo-Rhinoplastik",
      tr: "Medikal Estetik & Ultrasonik Rinoplasti",
    },
    rating: 5,
    date: "3 weeks ago",
    quote: {
      en: "As a solo female traveller from Manchester I was nervous at first, but from the moment I landed in Istanbul I felt completely looked after. Zero bruising with the Piezo technique and weekly WhatsApp check-ins from my nurse even back in the UK.",
      de: "Als alleinreisende Frau aus Manchester war ich anfangs nervös, aber ab der Landung in Istanbul habe ich mich zu 100% sicher gefühlt. Kaum Schwellungen dank Piezo-Technik und tolle Nachsorge per WhatsApp.",
      tr: "Manchester'dan tek başına gelen bir kadın hasta olarak başta heyecanlıydım ama İstanbul'a indiğim andan itibaren kendimi çok güvende hissettim. İngiltere'ye döndükten sonra bile her hafta WhatsApp'tan kontrol ettiler.",
    },
    verifiedVia: "Trustpilot Verified • UK Patient",
  },
];
