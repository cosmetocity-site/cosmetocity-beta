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

export const SITE_COPY: Record<
  Locale,
  {
    topBadge: string;
    topSub: string;
    navTreatments: string;
    navBeforeAfter: string;
    navAntalya: string;
    navReviews: string;
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
    ukDeComparisonLabel: string;
    inquireWhatsappBtn: string;
    beforeAfterTag: string;
    beforeAfterTitle: string;
    beforeAfterSubtitle: string;
    beforeLabel: string;
    afterLabel: string;
    sliderInstruction: string;
    antalyaSectionTag: string;
    antalyaSectionTitle: string;
    antalyaSectionSub: string;
    antalyaPerks: { title: string; desc: string }[];
    istanbulOptionNoteTitle: string;
    istanbulOptionNoteDesc: string;
    istanbulOptionCta: string;
    reviewsTag: string;
    reviewsTitle: string;
    reviewsSubtitle: string;
    ctaBannerTitle: string;
    ctaBannerSub: string;
    stickyWhatsappText: string;
    stickyWhatsappSub: string;
    footerAddress: string;
    footerDisclaimer: string;
  }
> = {
  en: {
    topBadge: "Antalya Main Medical Hub (Lara / Muratpaşa) • Direct Flights from UK & Germany to Antalya (AYT)",
    topSub: "Also Coordinating Partner Clinics in Istanbul Upon Request",
    navTreatments: "Treatments",
    navBeforeAfter: "Before / After",
    navAntalya: "Why Antalya?",
    navReviews: "UK & DE Reviews",
    navCta: "Free Medical Quote",
    heroTrustPill: "ANTALYA'S PREMIER MEDICAL TOURISM AGENCY SINCE 2019",
    heroTitleLine1: "World-Class Treatment & Mediterranean Recovery",
    heroTitleHighlight: "in Sunny Antalya, Turkey.",
    heroSubtitle:
      "CosmetoCity welcomes patients from the United Kingdom and Germany to our primary medical center in Antalya—combining accredited hospital surgery (Hair Transplant, Dental Hollywood Smile & Aesthetic Surgery) with 5-star Lara beachside hotel recovery. Prefer Istanbul? We coordinate procedures at our Istanbul partner clinics too.",
    citySelectorTitle: "Choose Your Preferred Treatment Destination:",
    cityAntalyaBadge: "🏖️ Antalya (Main Hub • Most Popular)",
    cityAntalyaDesc:
      "Direct 4h flights from London, Manchester, Munich, Berlin & Frankfurt to Antalya (AYT). Recover by the Mediterranean Sea in 5-star Lara hotels with 300+ sunny days.",
    cityIstanbulBadge: "🌉 Istanbul (Partner Network Option)",
    cityIstanbulDesc:
      "Want to have your procedure in Istanbul instead? We gladly arrange your treatment, hotel, and VIP transfers at our contracted JCI hospitals in Istanbul.",
    heroPrimaryCta: "Get Free Antalya Quote on WhatsApp",
    heroSecondaryCta: "See Before & After Cases",
    heroStats: [
      { value: "4.9 / 5", label: "Trustpilot UK & DE Rating" },
      { value: "300+ Days", label: "Mediterranean Sunshine in Antalya" },
      { value: "Up to 70%", label: "Savings vs. UK & Germany" },
      { value: "Antalya + IST", label: "Dual-City Medical Network" },
    ],
    treatmentsTag: "OUR CORE SPECIALTIES IN ANTALYA",
    treatmentsTitle: "Hair Transplant, Dental Treatments & Aesthetic Surgery",
    treatmentsSubtitle:
      "Performed at top accredited private hospitals in Antalya (such as OFM Antalya Hospital & specialized dental/hair clinics) with all-inclusive VIP resort packages.",
    priceFromLabel: "All-Inclusive Antalya VIP Package",
    ukDeComparisonLabel: "Typical UK / DE Price:",
    inquireWhatsappBtn: "Ask on WhatsApp",
    beforeAfterTag: "PROVEN CLINICAL RESULTS",
    beforeAfterTitle: "Before & After Transformations",
    beforeAfterSubtitle:
      "Use the interactive slider to inspect real Hair Transplant, Hollywood Smile Dental, and Medical Aesthetic transformations from our UK and German patients.",
    beforeLabel: "BEFORE",
    afterLabel: "AFTER",
    sliderInstruction: "Slide left or right to compare Before & After",
    antalyaSectionTag: "TREATMENT + HOLIDAY IN ONE TRIP",
    antalyaSectionTitle: "Why UK & German Patients Prefer Antalya",
    antalyaSectionSub:
      "Skip crowded mega-city traffic. Land at Antalya Airport (AYT) and reach your clinic and 5-star Lara beach hotel in just 15 minutes.",
    antalyaPerks: [
      {
        title: "15 Mins from Antalya Airport (AYT)",
        desc: "No stress or long traffic jams—our VIP chauffeur takes you from Antalya Airport to Lara & our partner hospitals in 15 minutes.",
      },
      {
        title: "Accredited Antalya Hospitals & Surgeons",
        desc: "Partnered with leading hospitals (including OFM Antalya Hospital) and experienced plastic, dental, and hair specialists.",
      },
      {
        title: "5-Star Mediterranean Recovery",
        desc: "Heal comfortably with sea breeze, warm sunshine, and luxury hospitality in Antalya's renowned Lara district.",
      },
      {
        title: "Native English & German Host 24/7",
        desc: "Personal 1-on-1 coordinator from your arrival in Antalya until 12 months of post-op follow-up back home.",
      },
    ],
    istanbulOptionNoteTitle: "Prefer to Be Treated in Istanbul?",
    istanbulOptionNoteDesc:
      "While our headquarters and main surgical teams are based in Antalya, we never say no to patients who prefer Istanbul! We offer full VIP package coordination at our partner clinics in Istanbul upon request.",
    istanbulOptionCta: "Inquire About Istanbul Option",
    reviewsTag: "VERIFIED UK & GERMANY PATIENT STORIES",
    reviewsTitle: "What Our Patients Say About CosmetoCity Antalya",
    reviewsSubtitle:
      "Real reviews from British and German patients who combined their medical treatment with a relaxing stay in Antalya.",
    ctaBannerTitle: "Ready for Your Free Antalya Treatment Plan?",
    ctaBannerSub:
      "Send your photos on WhatsApp (+90 552 602 2489) and get a personalized surgeon evaluation and all-inclusive Antalya (or Istanbul) package quote in 15 minutes.",
    stickyWhatsappText: "Get Info on WhatsApp",
    stickyWhatsappSub: "Antalya & Istanbul Desk • Online",
    footerAddress: "Çağlayan Mah. (Lara), Muratpaşa / Antalya, Turkey • Tel: +90 552 602 2489 • info@cosmetocity.com",
    footerDisclaimer:
      "© 2026 CosmetoCity (Sayantalia Medical Tourism • cosmetocity.online). All procedures are performed in Ministry of Health accredited partner hospitals in Antalya & Istanbul.",
  },
  de: {
    topBadge: "Hauptsitz Antalya (Lara / Muratpaşa) • Direktflüge ab Deutschland, Österreich & Schweiz nach Antalya (AYT)",
    topSub: "Auf Wunsch auch Behandlung in unseren Partnerkliniken in Istanbul möglich",
    navTreatments: "Behandlungen",
    navBeforeAfter: "Vorher / Nachher",
    navAntalya: "Warum Antalya?",
    navReviews: "Erfahrungen (DE & UK)",
    navCta: "Kostenloses Angebot",
    heroTrustPill: "ANTALYAS FÜHRENDE AGENTUR FÜR MEDIZINTOURISMUS SEIT 2019",
    heroTitleLine1: "Spitzenmedizin & Erholung am Mittelmeer",
    heroTitleHighlight: "im sonnigen Antalya, Türkei.",
    heroSubtitle:
      "CosmetoCity empfängt Patienten aus Deutschland und Großbritannien in unserem Hauptzentrum in Antalya – verbinden Sie Haartransplantation, Hollywood Smile Zahnbehandlung oder Ästhetische Chirurgie mit 5-Sterne-Erholung in Antalya-Lara. Sie möchten lieber nach Istanbul? Auch dort betreuen wir Sie gerne!",
    citySelectorTitle: "Wählen Sie Ihren gewünschten Behandlungsort:",
    cityAntalyaBadge: "🏖️ Antalya (Hauptzentrum • Empfohlen)",
    cityAntalyaDesc:
      "Direktflüge ab München, Berlin, Frankfurt, Düsseldorf & Wien nach Antalya (AYT). Erholen Sie sich nach der Behandlung im 5-Sterne-Hotel am Meer bei über 300 Sonnentagen.",
    cityIstanbulBadge: "🌉 Istanbul (Partnerklinik-Option)",
    cityIstanbulDesc:
      "Sie möchten Ihre Behandlung lieber in Istanbul durchführen lassen? Wir organisieren gerne Ihr komplettes VIP-Paket in unseren Partnerkliniken in Istanbul.",
    heroPrimaryCta: "Antalya-Angebot per WhatsApp",
    heroSecondaryCta: "Vorher / Nachher ansehen",
    heroStats: [
      { value: "4.9 / 5", label: "Trustpilot Patientenbewertung" },
      { value: "300+ Tage", label: "Sonnenschein in Antalya" },
      { value: "Bis 70%", label: "Ersparnis ggü. DE & UK" },
      { value: "Antalya + IST", label: "Kliniken in beiden Städten" },
    ],
    treatmentsTag: "UNSERE SCHWERPUNKTE IN ANTALYA",
    treatmentsTitle: "Haartransplantation, Zahnbehandlungen & Ästhetische Chirurgie",
    treatmentsSubtitle:
      "Durchgeführt in erstklassigen Privatkliniken in Antalya (wie dem OFM Antalya Hospital & spezialisierten Fachzentren) inklusive VIP-Hotelpaket.",
    priceFromLabel: "All-Inclusive Antalya VIP-Paket",
    ukDeComparisonLabel: "Preis in DE / UK ca.:",
    inquireWhatsappBtn: "Per WhatsApp anfragen",
    beforeAfterTag: "DOKUMENTIERTE ERGEBNISSE",
    beforeAfterTitle: "Vorher / Nachher Transformationen",
    beforeAfterSubtitle:
      "Nutzen Sie den Schieberegler, um echte Ergebnisse unserer Patienten aus Deutschland und Großbritannien für Haare, Zähne und Ästhetik zu sehen.",
    beforeLabel: "VORHER",
    afterLabel: "NACHHER",
    sliderInstruction: "Regler verschieben für Vorher/Nachher-Vergleich",
    antalyaSectionTag: "BEHANDLUNG & URLAUB KOMBINIEREN",
    antalyaSectionTitle: "Warum deutsche Patienten Antalya bevorzugen",
    antalyaSectionSub:
      "Kein Großstadtstress: Vom Flughafen Antalya (AYT) erreichen Sie Ihr 5-Sterne-Hotel in Lara und unsere Klinik in nur 15 Minuten.",
    antalyaPerks: [
      {
        title: "Nur 15 Min. vom Flughafen Antalya (AYT)",
        desc: "Kurze Transferzeiten im VIP-Shuttle direkt vom Flughafen Antalya zu Ihrem Hotel in Lara und in die Klinik.",
      },
      {
        title: "Renommierte Kliniken & Fachärzte in Antalya",
        desc: "Zusammenarbeit mit führenden Privatkliniken (z. B. OFM Antalya Hospital) und erfahrenen Chefärzten.",
      },
      {
        title: "5-Sterne-Genesung am Mittelmeer",
        desc: "Entspannte Heilungsphase bei Meeresluft, Sonne und erstklassigem Komfort in Antalya-Lara.",
      },
      {
        title: "Deutschsprachige 1-zu-1 Betreuung",
        desc: "Persönlicher deutscher Ansprechpartner vor Ort in Antalya sowie 12 Monate Nachsorge.",
      },
    ],
    istanbulOptionNoteTitle: "Sie möchten lieber in Istanbul behandelt werden?",
    istanbulOptionNoteDesc:
      "Obwohl unser Hauptsitz und unsere Hauptkliniken in Antalya liegen, sagen wir niemals Nein zu Patienten, die Istanbul bevorzugen! Auf Wunsch organisieren wir Ihre Behandlung komplett in Istanbul.",
    istanbulOptionCta: "Istanbul-Option anfragen",
    reviewsTag: "GEPRÜFTE ERFAHRUNGSBERICHTE",
    reviewsTitle: "Das sagen Patienten aus Deutschland & UK über Antalya",
    reviewsSubtitle:
      "Echte Bewertungen von Patienten, die ihre Behandlung bei CosmetoCity mit einem entspannten Aufenthalt in Antalya verbunden haben.",
    ctaBannerTitle: "Bereit für Ihren kostenlosen Behandlungsplan in Antalya?",
    ctaBannerSub:
      "Senden Sie Ihre Fotos per WhatsApp (+90 552 602 2489) und erhalten Sie in 15 Minuten Ihre ärztliche Einschätzung & Ihr All-Inclusive-Paket für Antalya (oder Istanbul).",
    stickyWhatsappText: "WhatsApp Beratung",
    stickyWhatsappSub: "Antalya & Istanbul • Online",
    footerAddress: "Çağlayan Mah. (Lara), Muratpaşa / Antalya, Türkei • Tel: +90 552 602 2489 • info@cosmetocity.com",
    footerDisclaimer:
      "© 2026 CosmetoCity (Sayantalia Medical Tourism • cosmetocity.online). Alle Eingriffe erfolgen in akkreditierten Partnerkliniken in Antalya & Istanbul.",
  },
  tr: {
    topBadge: "Ana Merkez: Antalya (Lara / Muratpaşa) • İngiltere ve Almanya'dan Antalya'ya (AYT) Direkt Uçuş",
    topSub: "Talep Eden Hastalarımız İçin İstanbul Partner Klinik Organizasyonu",
    navTreatments: "Tedavilerimiz",
    navBeforeAfter: "Öncesi / Sonrası",
    navAntalya: "Neden Antalya?",
    navReviews: "Hasta Yorumları",
    navCta: "Ücretsiz Teklif Al",
    heroTrustPill: "2019'DAN BERİ ANTALYA MERKEZLİ ULUSLARARASI SAĞLIK TURİZMİ",
    heroTitleLine1: "Antalya'da Dünya Standartlarında Tedavi,",
    heroTitleHighlight: "Akdeniz Güneşiyle 5 Yıldızlı İyileşme.",
    heroSubtitle:
      "CosmetoCity olarak ana merkezimiz Antalya'da İngiltere ve Almanya başta olmak üzere yurt dışından gelen hastalarımıza Saç Ekimi, Diş Tedavileri (Hollywood Smile) ve Medikal/Plastik Estetik hizmeti sunuyoruz. Üstelik İstanbul'da tedavi olmak isteyen hastalarımıza da partner hastanelerimizle tam destek sağlıyoruz.",
    citySelectorTitle: "Tedavi Olmak İstediğiniz Şehri Seçin:",
    cityAntalyaBadge: "🏖️ Antalya (Ana Merkezimiz • En Çok Tercih Edilen)",
    cityAntalyaDesc:
      "Londra, Manchester, Münih, Berlin ve Frankfurt'tan Antalya Havalimanı'na (AYT) direkt uçuş. Lara'daki 5 yıldızlı otellerde ve akredite hastanelerde trafik stresi olmadan konforlu tedavi.",
    cityIstanbulBadge: "🌉 İstanbul (Partner Klinik Opsiyonu)",
    cityIstanbulDesc:
      "Tedavisini İstanbul'da yaptırmak isteyen hastalarımıza da hayır demiyoruz! İstanbul'daki anlaşmalı JCI hastanelerimizde VIP paket organizasyonu sağlıyoruz.",
    heroPrimaryCta: "WhatsApp'tan Bilgi Al (Antalya)",
    heroSecondaryCta: "Öncesi / Sonrası İncele",
    heroStats: [
      { value: "4.9 / 5", label: "Trustpilot UK & DE Hasta Puanı" },
      { value: "300+ Gün", label: "Antalya'da Güneşli İyileşme İklimi" },
      { value: "%70'e Varan", label: "İngiltere & Almanya'ya Göre Avantaj" },
      { value: "Antalya + İST", label: "Çift Şehir Klinik Ağı" },
    ],
    treatmentsTag: "ANTALYA'DAKİ UZMANLIK ALANLARIMIZ",
    treatmentsTitle: "Saç Ekimi, Diş Tedavileri ve Medikal Estetik",
    treatmentsSubtitle:
      "Antalya'daki anlaşmalı tam teşekküllü özel hastanelerimizde (OFM Antalya Hastanesi vb.) ve uzman kliniklerimizde her şey dahil VIP paketler.",
    priceFromLabel: "Her Şey Dahil Antalya VIP Paket",
    ukDeComparisonLabel: "İngiltere / Almanya Fiyatı:",
    inquireWhatsappBtn: "WhatsApp'tan Bilgi Al",
    beforeAfterTag: "GERÇEK KLİNİK SONUÇLAR",
    beforeAfterTitle: "Öncesi / Sonrası (Before / After) Sonuçları",
    beforeAfterSubtitle:
      "Kaydırıcıyı hareket ettirerek İngiltere ve Almanya'dan Antalya'ya gelen hastalarımızın saç, diş ve estetik değişimlerini inceleyin.",
    beforeLabel: "ÖNCESİ",
    afterLabel: "SONRASI",
    sliderInstruction: "Öncesi ve Sonrası karşılaştırması için çubuğu kaydırın",
    antalyaSectionTag: "TEDAVİ VE TATİL BİR ARADA",
    antalyaSectionTitle: "İngiltere ve Almanya Hastaları Neden Antalya'yı Seçiyor?",
    antalyaSectionSub:
      "Büyükşehir trafiğinde saatler harcamayın: Antalya Havalimanı'ndan (AYT) Lara'daki 5 yıldızlı otelinize ve kliniğimize sadece 15 dakikada ulaşın.",
    antalyaPerks: [
      {
        title: "Antalya Havalimanı'na (AYT) 15 Dakika",
        desc: "Uçaktan indikten sadece 15 dakika sonra VIP aracımızla Lara'daki otelinize ve hastanemize ulaşırsınız.",
      },
      {
        title: "Antalya'nın Seçkin Hastane ve Cerrahları",
        desc: "OFM Antalya Hastanesi başta olmak üzere tam donanımlı hastaneler ve alanında uzman estetik, diş ve saç ekimi hekimleri.",
      },
      {
        title: "Akdeniz Kıyısında 5 Yıldızlı İyileşme",
        desc: "Operasyon sonrasında deniz havası ve güneş eşliğinde tatil konforunda hızlı ve huzurlu iyileşme süreci.",
      },
      {
        title: "7/24 İngilizce & Almanca Hasta Koordinatörü",
        desc: "Antalya'ya inişinizden itibaren birebir tercüman desteği ve ülkenize döndükten sonra 12 ay medikal takip.",
      },
    ],
    istanbulOptionNoteTitle: "İstanbul'da Tedavi Olmak İsteyen Hastalarımız İçin:",
    istanbulOptionNoteDesc:
      "Ana merkezimiz Antalya'da yer almakla birlikte, uçuş veya kişisel tercihi nedeniyle İstanbul'da tedavi olmak isteyen hastalarımızı da geri çevirmiyoruz. İstanbul'daki partner hastanelerimizde de aynı CosmetoCity kalitesiyle hizmet veriyoruz.",
    istanbulOptionCta: "İstanbul Opsiyonu İçin Bilgi Al",
    reviewsTag: "DOĞRULANMIŞ HASTA YORUMLARI",
    reviewsTitle: "Antalya'da Tedavi Olan İngiltere ve Almanya Hastalarımız",
    reviewsSubtitle:
      "Hem tatil yapıp hem de tedavilerini Antalya'da CosmetoCity güvencesiyle tamamlayan hastalarımızın yorumları.",
    ctaBannerTitle: "Antalya'da Ücretsiz Doktor Değerlendirmesi İçin Hazır mısınız?",
    ctaBannerSub:
      "WhatsApp hattımıza (+90 552 602 2489) fotoğraflarınızı gönderin, 15 dakika içinde Antalya (veya İstanbul) her şey dahil paket teklifinizi alın.",
    stickyWhatsappText: "WhatsApp'tan Bilgi Al",
    stickyWhatsappSub: "Antalya & İstanbul Hattı • Çevrimiçi",
    footerAddress: "Çağlayan Mah. (Lara), Muratpaşa / Antalya • Tel: +90 552 602 2489 • info@cosmetocity.com",
    footerDisclaimer:
      "© 2026 CosmetoCity (Sayantalia Medical Tourism • cosmetocity.online). Tüm tedaviler Antalya ve İstanbul'daki yetkili partner sağlık kuruluşlarında uygulanır.",
  },
};

export const TREATMENTS_DATA: TreatmentItem[] = [
  {
    id: "hair-transplant",
    categoryKey: "hair",
    badge: {
      en: "ANTALYA VIP PACKAGE • LIFETIME WARRANTY",
      de: "ANTALYA VIP-PAKET • LEBENSLANGE GARANTIE",
      tr: "ANTALYA VIP PAKET • ÖMÜR BOYU GARANTİ",
    },
    title: {
      en: "Sapphire FUE & DHI Hair Transplant",
      de: "Saphir FUE & DHI Haartransplantation",
      tr: "Safir FUE & DHI Saç Ekimi",
    },
    description: {
      en: "Maximum density hair restoration (up to 5,000+ grafts) in Antalya using real Sapphire blades or DHI Choi pens, paired with a relaxing recovery in a 5-star Lara hotel.",
      de: "Maximale Haardichte (bis zu 5.000+ Grafts) in Antalya mit Saphirklingen oder DHI Choi-Stiften – kombiniert mit entspannter Heilung im 5-Sterne-Hotel in Lara.",
      tr: "Antalya'daki modern merkezimizde Safir FUE ve DHI Choi kalem tekniği ile 5.000+ grefte kadar doğal saç ekimi ve Lara'da 5 yıldızlı otel konforunda iyileşme.",
    },
    highlights: {
      en: [
        "Up to 5,000+ Grafts + PRP Therapy Included",
        "15-Min VIP Transfer from Antalya Airport (AYT)",
        "3 Nights 5-Star Antalya Hotel & Aftercare Kit",
      ],
      de: [
        "Bis zu 5.000+ Grafts + PRP-Behandlung inklusive",
        "15 Min. VIP-Transfer ab Flughafen Antalya (AYT)",
        "3 Nächte 5-Sterne-Hotel in Antalya & Pflegeset",
      ],
      tr: [
        "5.000+ Greft + PRP Tedavisi Dahil",
        "Antalya Havalimanı'ndan (AYT) 15 Dk VIP Transfer",
        "3 Gece 5 Yıldızlı Antalya Otel Konaklaması",
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
    id: "dental-treatments",
    categoryKey: "dental",
    badge: {
      en: "DENTAL HOLIDAY IN ANTALYA • SWISS E-MAX",
      de: "ZAHNBEHANDLUNG & URLAUB IN ANTALYA",
      tr: "ANTALYA'DA DİŞ ESTETİĞİ & TATİL",
    },
    title: {
      en: "Hollywood Smile, Veneers & Dental Implants",
      de: "Hollywood Smile, Veneers & Zahnimplantate",
      tr: "Diş Tedavileri, İmplant & Hollywood Smile",
    },
    description: {
      en: "Transform your smile in Antalya with 3D Digital Smile Design, Swiss Ivoclar E-Max porcelain veneers, German Zirconium crowns, and Straumann/Nobel dental implants.",
      de: "Ihr neues Lächeln in Antalya mit 3D Digital Smile Design, Schweizer Ivoclar E-Max Veneers, deutschen Zirkonkronen und Straumann/Nobel Zahnimplantaten.",
      tr: "Antalya'da tatil yaparken 3D Dijital Gülüş Tasarımı, İsviçre E-Max yaprak porselen, Alman zirkonyum kaplama ve Straumann/Nobel implantlarla gülüşünüzü yenileyin.",
    },
    highlights: {
      en: [
        "Swiss E-Max Veneers & German Zirconium Crowns",
        "Straumann & Nobel Biocare Implants with Warranty",
        "Enjoy Antalya's Coast Between Brief Clinic Visits",
      ],
      de: [
        "Schweizer E-Max Veneers & Deutsche Zirkonkronen",
        "Straumann & Nobel Biocare Implantate mit Garantie",
        "Genießen Sie Antalyas Küste zwischen den Terminen",
      ],
      tr: [
        "Orijinal İsviçre E-Max & Alman Zirkonyum",
        "Garantili Straumann & Nobel Biocare İmplantlar",
        "Klinik Randevuları Arasında Antalya Keyfi",
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
      en: "Plastic Surgery & Medical Aesthetics",
      de: "Plastische Chirurgie & Medizinische Ästhetik",
      tr: "Medikal Estetik & Plastik Cerrahi",
    },
    description: {
      en: "Rhinoplasty, Breast Aesthetics, Vaser Liposuction, Tummy Tuck, Eyelid Surgery, and Non-Surgical Facial Rejuvenation (Botox, Fillers) performed by Antalya's leading surgeons.",
      de: "Nasenkorrektur (Rhinoplastik), Brustästhetik, Vaser-Liposuktion, Bauchdeckenstraffung, Lidstraffung sowie Botox & Hyaluron-Filler durch erfahrene Fachärzte in Antalya.",
      tr: "Antalya'daki anlaşmalı hastanelerimizde Burun Estetiği (Rinoplasti), Meme Estetiği, Vaser Liposuction, Göz Kapağı Estetiği ve Ameliyatsız Medikal Estetik işlemleri.",
    },
    highlights: {
      en: [
        "Contracted Private Hospitals in Antalya (OFM etc.)",
        "FDA & CE Approved Implants and Dermal Products",
        "Private Nurse Check-Ups at Your Antalya Hotel",
      ],
      de: [
        "Akkreditierte Privatkliniken in Antalya (OFM u.a.)",
        "FDA- & CE-geprüfte Implantate und Markenpräparate",
        "Persönliche Visite & Betreuung in Ihrem Hotel",
      ],
      tr: [
        "Antalya'nın Tam Donanımlı Özel Hastanelerinde İşlem",
        "FDA & CE Onaylı İmplant ve Medikal Ürünler",
        "Otelinizde Özel Hemşire ve Doktor Kontrolü",
      ],
    },
    priceGBP: "£1,950",
    priceEUR: "€2,290",
    ukDePrice: "£7,200 / €8,500",
    stayDuration: {
      en: "5–7 Days in Antalya",
      de: "5–7 Tage in Antalya",
      tr: "Antalya'da 5–7 Gün",
    },
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80",
  },
];

export const BEFORE_AFTER_CASES: BeforeAfterCase[] = [
  {
    id: "ba-dental",
    category: "dental",
    patientInfo: {
      en: "Sabine K. (41) • Flew from Munich 🇩🇪 to Antalya",
      de: "Sabine K. (41) • Direktflug München 🇩🇪 → Antalya",
      tr: "Sabine K. (41) • Münih'ten 🇩🇪 Antalya'ya Geldi",
    },
    procedureName: {
      en: "Hollywood Smile in Antalya (20 E-Max Veneers)",
      de: "Hollywood Smile in Antalya (20 E-Max Veneers)",
      tr: "Antalya Hollywood Smile (20 E-Max Yaprak Porselen)",
    },
    timeframe: {
      en: "Completed in 5 Sunny Days in Lara, Antalya",
      de: "In 5 sonnigen Tagen in Antalya-Lara fertiggestellt",
      tr: "Antalya Lara'da 5 Günde Tamamlandı",
    },
    graftsOrDetails: {
      en: "Natural BL2 Shade • 3D Digital Design + 20 Swiss Veneers",
      de: "Natürlicher Farbton BL2 • 3D-Design + 20 Schweizer Veneers",
      tr: "Doğal BL2 Tonu • 3D Gülüş Tasarımı + 20 İsviçre Veneer",
    },
    beforeImage:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=900&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=900&q=80",
    doctorNote: {
      en: "Completed with just 3 clinic appointments, leaving plenty of time to relax by the Lara coast.",
      de: "In nur 3 Klinikterminen abgeschlossen – mit viel Zeit zur Erholung am Strand von Lara.",
      tr: "Sadece 3 klinik randevusuyla tamamlandı; hastamız kalan süresini Lara sahilinde dinlenerek geçirdi.",
    },
  },
  {
    id: "ba-hair",
    category: "hair",
    patientInfo: {
      en: "James T. (36) • Flew from London Gatwick 🇬🇧 to Antalya",
      de: "James T. (36) • Direktflug London 🇬🇧 → Antalya",
      tr: "James T. (36) • Londra'dan 🇬🇧 Antalya'ya Geldi",
    },
    procedureName: {
      en: "Sapphire FUE Hair Transplant in Antalya",
      de: "Saphir FUE Haartransplantation in Antalya",
      tr: "Antalya Safir FUE Saç Ekimi",
    },
    timeframe: {
      en: "10 Months Post-Op Result",
      de: "Ergebnis 10 Monate nach der OP",
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
      de: "Höchste Anwuchsrate durch feine Saphir-Mikrokanäle und PRP-Therapie in Antalya.",
      tr: "Safir mikro kanallar ve PRP tedavisi ile maksimum tutunma oranı sağlandı.",
    },
  },
  {
    id: "ba-aesthetic",
    category: "aesthetic",
    patientInfo: {
      en: "Charlotte W. (32) • Flew from Manchester 🇬🇧 to Antalya",
      de: "Charlotte W. (32) • Direktflug Manchester 🇬🇧 → Antalya",
      tr: "Charlotte W. (32) • Manchester'dan 🇬🇧 Antalya'ya Geldi",
    },
    procedureName: {
      en: "Rhinoplasty & Facial Aesthetics in Antalya",
      de: "Rhinoplastik & Gesichtsästhetik in Antalya",
      tr: "Antalya Rinoplasti & Medikal Yüz Estetiği",
    },
    timeframe: {
      en: "6 Months Post-Procedure",
      de: "Ergebnis nach 6 Monaten",
      tr: "6. Ay Sonucu",
    },
    graftsOrDetails: {
      en: "Ultrasonic Piezo Rhinoplasty + Lip & Contour Harmonization",
      de: "Ultraschall-Piezo-Rhinoplastik + Konturharmonisierung",
      tr: "Ultrasonik Piezo Burun Estetiği + Yüz Kontür Dengeleme",
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
      en: "Hollywood Smile & Implants in Antalya",
      de: "Hollywood Smile & Implantate in Antalya",
      tr: "Antalya'da Hollywood Smile & İmplant",
    },
    rating: 5,
    date: "2 weeks ago",
    quote: {
      en: "Flying directly from London Gatwick to Antalya was a game changer. Instead of sitting in city traffic, I was at my 5-star beach hotel in Lara within 15 minutes. Saved £8,500 compared to UK dental quotes and had a sunny Mediterranean holiday at the same time!",
      de: "Der Direktflug von London nach Antalya war perfekt. Statt im Großstadtverkehr zu stecken, war ich in 15 Minuten im 5-Sterne-Strandhotel in Lara. Über 8.500 £ gespart und gleichzeitig Urlaub am Meer gemacht!",
      tr: "Londra'dan Antalya'ya direkt uçmak harika bir karardı. Trafikte vakit kaybetmeden 15 dakikada Lara'daki 5 yıldızlı sahil otelime ulaştım. İngiltere fiyatlarına göre £8.500 tasarruf ederken Akdeniz güneşi altında tatil yaptım!",
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
      en: "We love Antalya for summer holidays, so choosing CosmetoCity in Antalya for my hair transplant felt super familiar and safe. German-speaking coordinator, spotless hospital, and calm seaside recovery.",
      de: "Wir kennen Antalya schon vom Sommerurlaub – deshalb war CosmetoCity in Antalya für meine Haartransplantation die beste Wahl. Deutschsprachige Betreuung, hochmoderne Klinik und totale Ruhe am Meer.",
      tr: "Antalya'yı tatillerimizden zaten çok seviyorduk, saç ekimi için de Antalya'da CosmetoCity'yi seçmek bize büyük güven verdi. Almanca bilen danışmanımız, tertemiz hastane ve deniz kenarında huzurlu iyileşme!",
    },
    verifiedVia: "ProvenExpert & Trustpilot • DE Patient",
  },
  {
    id: "rev-3",
    name: "Hannah Davies",
    cityCountry: "Manchester, United Kingdom",
    flag: "🇬🇧",
    treatedIn: "Antalya / Istanbul Network",
    treatment: {
      en: "Rhinoplasty & Medical Aesthetics",
      de: "Rhinoplastik & Medizinische Ästhetik",
      tr: "Rinoplasti & Medikal Estetik",
    },
    rating: 5,
    date: "1 month ago",
    quote: {
      en: "From my first WhatsApp message to CosmetoCity, everything was transparent. My surgeon in Antalya was incredible, the OFM hospital rooms were spotless, and my coordinator checked on me every single day.",
      de: "Vom ersten WhatsApp-Kontakt mit CosmetoCity an war alles transparent. Mein Chirurg in Antalya war erstklassig, das OFM-Krankenhaus makellos und die Nachsorge vorbildlich.",
      tr: "CosmetoCity ile ilk WhatsApp mesajımdan itibaren her şey çok şeffaftı. Antalya'daki cerrahım harikaydı, OFM hastanesi odaları tertemizdi ve koordinatörüm her gün benimle ilgilendi.",
    },
    verifiedVia: "Trustpilot Verified • UK Patient",
  },
];
