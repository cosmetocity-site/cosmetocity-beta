export type Locale = "en" | "de" | "ru" | "es" | "ar" | "fr" | "it";
export type CityOption = "antalya" | "istanbul";

export interface LanguageOption {
  code: Locale;
  flag: string;
  shortLabel: string;
  nativeName: string;
  dir: "ltr" | "rtl";
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: "en", flag: "🇬🇧", shortLabel: "EN", nativeName: "English", dir: "ltr" },
  { code: "de", flag: "🇩🇪", shortLabel: "DE", nativeName: "Deutsch", dir: "ltr" },
  { code: "ru", flag: "🇷🇺", shortLabel: "RU", nativeName: "Русский", dir: "ltr" },
  { code: "es", flag: "🇪🇸", shortLabel: "ES", nativeName: "Español", dir: "ltr" },
  { code: "ar", flag: "🇸🇦", shortLabel: "AR", nativeName: "العربية", dir: "rtl" },
  { code: "fr", flag: "🇫🇷", shortLabel: "FR", nativeName: "Français", dir: "ltr" },
  { code: "it", flag: "🇮🇹", shortLabel: "IT", nativeName: "Italiano", dir: "ltr" },
];

export function isRtlLocale(locale: Locale): boolean {
  return locale === "ar";
}

export interface TreatmentItem {
  id: string;
  categoryKey: "hair" | "dental" | "aesthetic";
  badge: Record<Locale, string>;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  highlights: Record<Locale, string[]>;
  basePriceEur: number;
  baseComparisonEur: number;
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
    ru: `Здравствуйте, CosmetoCity! Я пишу с сайта cosmetocity.online и хочу получить бесплатную консультацию${
      topic ? ` по процедуре: ${topic}` : ""
    } в г. ${targetCity}.`,
    es: `¡Hola CosmetoCity! Visito cosmetocity.online y me gustaría recibir una consulta médica gratuita${
      topic ? ` sobre ${topic}` : ""
    } en ${targetCity}.`,
    ar: `مرحباً فريق CosmetoCity! أتواصل معكم عبر موقع cosmetocity.online وأرغب في الحصول على استشارة طبية مجانية${
      topic ? ` بخصوص ${topic}` : ""
    } في ${targetCity}.`,
    fr: `Bonjour CosmetoCity ! Je visite cosmetocity.online et je souhaiterais une consultation gratuite${
      topic ? ` pour ${topic}` : ""
    } à ${targetCity}.`,
    it: `Salve CosmetoCity! Sto visitando cosmetocity.online e desidero una consulenza medica gratuita${
      topic ? ` per ${topic}` : ""
    } ad ${targetCity}.`,
  };
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    messages[locale]
  )}`;
}

export interface SiteCopyItem {
  topBadge: string;
  topSub: string;
  navTreatments: string;
  navBeforeAfter: string;
  navReviews: string;
  navBlog: string;
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
  clinicalSpecLabel: string;
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

export const SITE_COPY: Record<Locale, SiteCopyItem> = {
  en: {
    topBadge:
      "Antalya Main Medical Hub (Lara / Muratpaşa) • Direct 4h Flights from Europe, UK & Middle East to Antalya (AYT)",
    topSub: "Istanbul Partner Clinic Option Available Upon Request",
    navTreatments: "Treatments",
    navBeforeAfter: "Before/After",
    navReviews: "Reviews",
    navBlog: "Blog & FAQ",
    navContact: "Contact",
    navCta: "Free Consultation",
    heroTrustPill: "TRUSTED BY 15,000+ INTERNATIONAL PATIENTS SINCE 2019",
    heroTitleLine1: "World-Class Treatment in Antalya,",
    heroTitleHighlight: "5-Star Mediterranean Recovery.",
    heroSubtitle:
      "Experience accredited Hair Transplants, Dental Aesthetics (Hollywood Smile), and Medical Aesthetics in sunny Antalya, Turkey. Save up to 70% compared to UK & European clinics with luxury Lara beachside hotel stays and VIP airport transfers included. (Istanbul partner clinics also available upon request.)",
    citySelectorTitle: "Select Your Preferred Destination:",
    cityAntalyaBadge: "🏖️ Antalya (Main Hub • Most Popular)",
    cityAntalyaDesc:
      "Direct flights to Antalya (AYT). 15-min VIP transfer to 5-star Lara hotels & OFM Antalya Hospital.",
    cityIstanbulBadge: "🌉 Istanbul (Partner Clinic Option)",
    cityIstanbulDesc:
      "Prefer to have your procedure in Istanbul? We gladly coordinate your surgery, 5-star hotel, and VIP transfers in Istanbul as well.",
    heroPrimaryCta: "WhatsApp Free Consultation",
    heroSecondaryCta: "Explore Treatments",
    heroStats: [
      { value: "4.9 / 5", label: "Trustpilot International Rating" },
      { value: "15,000+", label: "International Patients" },
      { value: "Up to 70%", label: "Savings vs. Europe & UK" },
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
      "Compare real clinical results from our international patients who travelled to Antalya for Hair Restoration, Hollywood Smile, and Aesthetic procedures.",
    beforeLabel: "BEFORE",
    afterLabel: "AFTER",
    sliderInstruction: "Drag slider left or right to compare Before & After",
    clinicalSpecLabel: "Clinical Specification",
    reviewsTag: "VERIFIED SOCIAL PROOF",
    reviewsTitle: "International Patient Reviews",
    reviewsSubtitle:
      "Read authentic experiences from patients who flew from across Europe and the UK to CosmetoCity Antalya.",
    contactTag: "DIRECT MEDICAL CONCIERGE",
    contactTitle: "Get Your Free Consultation & Treatment Plan",
    contactSubtitle:
      "Complete the form below or message us on WhatsApp to receive your personalized medical evaluation and all-inclusive Antalya package quote.",
    contactFormName: "Your Full Name",
    contactFormCountry: "Your Country",
    contactFormTreatment: "Select Treatment",
    contactFormCity: "Preferred City",
    contactFormSubmit: "Request Free Consultation",
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
      "Hauptzentrum Antalya (Lara / Muratpaşa) • Direktflüge aus Deutschland, Österreich & der Schweiz nach Antalya (AYT)",
    topSub: "Auf Wunsch auch Behandlung in unseren Partnerkliniken in Istanbul",
    navTreatments: "Behandlungen",
    navBeforeAfter: "Vorher/Nachher",
    navReviews: "Bewertungen",
    navBlog: "Ratgeber & FAQ",
    navContact: "Kontakt",
    navCta: "Kostenlose Beratung",
    heroTrustPill: "ÜBER 15.000 INTERNATIONALE PATIENTEN SEIT 2019",
    heroTitleLine1: "Erstklassige Behandlung in Antalya,",
    heroTitleHighlight: "5-Sterne-Erholung am Mittelmeer.",
    heroSubtitle:
      "Erleben Sie zertifizierte Haartransplantationen, Zahnästhetik (Hollywood Smile) und Medizinische Ästhetik im sonnigen Antalya. Sparen Sie bis zu 70 % gegenüber Kliniken in Deutschland & Europa – inklusive 5-Sterne-Hotel in Lara und VIP-Flughafentransfer.",
    citySelectorTitle: "Wählen Sie Ihren gewünschten Behandlungsort:",
    cityAntalyaBadge: "🏖️ Antalya (Hauptzentrum • Empfohlen)",
    cityAntalyaDesc:
      "Direktflüge nach Antalya (AYT). Nur 15 Min. VIP-Transfer zum 5-Sterne-Hotel in Lara & OFM Antalya Hospital.",
    cityIstanbulBadge: "🌉 Istanbul (Partnerklinik-Option)",
    cityIstanbulDesc:
      "Sie möchten lieber nach Istanbul? Wir organisieren gerne Ihr komplettes VIP-Behandlungspaket in unseren Partnerkliniken in Istanbul.",
    heroPrimaryCta: "Kostenlose WhatsApp Beratung",
    heroSecondaryCta: "Behandlungen ansehen",
    heroStats: [
      { value: "4.9 / 5", label: "Trustpilot Bewertung" },
      { value: "15.000+", label: "Internationale Patienten" },
      { value: "Bis 70%", label: "Ersparnis ggü. DE & EU" },
      { value: "15 Min.", label: "Flughafen Antalya (AYT) zur Klinik" },
    ],
    treatmentsTag: "UNSERE KERNKOMPETENZEN",
    treatmentsTitle: "Haartransplantation, Zahnästhetik & Medizinische Ästhetik",
    treatmentsSubtitle:
      "Durchgeführt von erfahrenen Fachärzten in führenden Privatkliniken in Antalya (z. B. OFM Antalya Hospital) mit FDA- & CE-zertifizierten Materialien.",
    priceFromLabel: "All-Inclusive VIP-Paket",
    inquireWhatsappBtn: "Angebot per WhatsApp",
    beforeAfterTag: "ECHTE PATIENTENERGEBNISSE",
    beforeAfterTitle: "Vorher / Nachher Ergebnis-Galerie",
    beforeAfterSubtitle:
      "Vergleichen Sie dokumentierte Ergebnisse unserer internationalen Patienten nach ihrer Behandlung in Antalya.",
    beforeLabel: "VORHER",
    afterLabel: "NACHHER",
    sliderInstruction: "Schieberegler bewegen für Vorher/Nachher-Vergleich",
    clinicalSpecLabel: "Klinische Spezifikation",
    reviewsTag: "GEPRÜFTE PATIENTENSTIMMEN",
    reviewsTitle: "Internationale Erfahrungsberichte",
    reviewsSubtitle:
      "Authentische Bewertungen von Patienten, die ihre Behandlung bei CosmetoCity in Antalya durchgeführt haben.",
    contactTag: "DIREKTE PATIENTENBETREUUNG",
    contactTitle: "Kostenlose Beratung & Behandlungsplan anfordern",
    contactSubtitle:
      "Füllen Sie das Formular aus, um Ihre individuelle ärztliche Einschätzung und ein unverbindliches All-Inclusive-Angebot per WhatsApp zu erhalten.",
    contactFormName: "Ihr Vor- und Nachname",
    contactFormCountry: "Ihr Land",
    contactFormTreatment: "Gewünschte Behandlung",
    contactFormCity: "Bevorzugte Stadt",
    contactFormSubmit: "Kostenlose Beratung anfordern",
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
  ru: {
    topBadge:
      "Главный медицинский центр в Анталье (Лара / Муратпаша) • Прямые рейсы в аэропорт Антальи (AYT)",
    topSub: "По запросу доступно лечение в партнерских клиниках Стамбула",
    navTreatments: "Процедуры",
    navBeforeAfter: "До / После",
    navReviews: "Отзывы",
    navBlog: "Блог и FAQ",
    navContact: "Контакты",
    navCta: "Бесплатная консультация",
    heroTrustPill: "БОЛЕЕ 15 000 МЕЖДУНАРОДНЫХ ПАЦИЕНТОВ С 2019 ГОДА",
    heroTitleLine1: "Лечение мирового уровня в Анталье,",
    heroTitleHighlight: "Восстановление 5★ на Средиземном море.",
    heroSubtitle:
      "Аккредитованная пересадка волос, эстетическая стоматология (Голливудская улыбка) и пластическая хирургия в солнечной Анталье, Турция. Экономия до 70% с проживанием в 5-звездочном отеле на побережье Лара и VIP-трансфером.",
    citySelectorTitle: "Выберите предпочитаемый город для лечения:",
    cityAntalyaBadge: "🏖️ Анталья (Главный центр • Популярный выбор)",
    cityAntalyaDesc:
      "Прямые рейсы в Анталью (AYT). 15 минут VIP-трансфера до 5-звездочных отелей в Ларе и госпиталя OFM Antalya.",
    cityIstanbulBadge: "🌉 Стамбул (Партнерские клиники)",
    cityIstanbulDesc:
      "Предпочитаете пройти процедуру в Стамбуле? Мы организуем операцию, отель 5★ и VIP-трансфер в Стамбуле.",
    heroPrimaryCta: "Бесплатная консультация в WhatsApp",
    heroSecondaryCta: "Смотреть процедуры",
    heroStats: [
      { value: "4.9 / 5", label: "Рейтинг на Trustpilot" },
      { value: "15 000+", label: "Иностранных пациентов" },
      { value: "До 70%", label: "Экономия на лечении" },
      { value: "15 мин.", label: "От аэропорта Антальи до клиники" },
    ],
    treatmentsTag: "НАШИ ОСНОВНЫЕ НАПРАВЛЕНИЯ",
    treatmentsTitle: "Пересадка волос, стоматология и эстетическая хирургия",
    treatmentsSubtitle:
      "Процедуры проводятся ведущими хирургами в аккредитованных госпиталях Антальи с использованием сертифицированных материалов (Швейцария, Германия, США).",
    priceFromLabel: "VIP-пакет «Все включено»",
    inquireWhatsappBtn: "Расчет стоимости в WhatsApp",
    beforeAfterTag: "РЕАЛЬНЫЕ РЕЗУЛЬТАТЫ ПАЦИЕНТОВ",
    beforeAfterTitle: "Галерея результатов До и После",
    beforeAfterSubtitle:
      "Сравните реальные клинические результаты наших пациентов после пересадки волос, установки виниров и пластических операций в Анталье.",
    beforeLabel: "ДО",
    afterLabel: "ПОСЛЕ",
    sliderInstruction: "Передвигайте ползунок влево или вправо для сравнения До и После",
    clinicalSpecLabel: "Клинические параметры",
    reviewsTag: "ПРОВЕРЕННЫЕ ОТЗЫВЫ",
    reviewsTitle: "Отзывы международных пациентов",
    reviewsSubtitle:
      "Реальные истории пациентов, прилетевших на лечение в CosmetoCity Анталья.",
    contactTag: "МЕДИЦИНСКИЙ КОНСЬЕРЖ-СЕРВИС",
    contactTitle: "Получите бесплатную консультацию и план лечения",
    contactSubtitle:
      "Заполните форму ниже, чтобы получить персональную оценку врача и расчет стоимости пакета «Все включено» в WhatsApp.",
    contactFormName: "Ваше Имя и Фамилия",
    contactFormCountry: "Ваша страна",
    contactFormTreatment: "Выберите процедуру",
    contactFormCity: "Предпочитаемый город",
    contactFormSubmit: "Запросить бесплатную консультацию",
    istanbulOptionNoteTitle: "Хотите пройти лечение в Стамбуле?",
    istanbulOptionNoteDesc:
      "Наш главный центр находится в Анталье, но по вашему желанию мы организуем лечение под ключ в аккредитованных JCI клиниках Стамбула.",
    stickyWhatsappText: "Консультация WhatsApp",
    stickyWhatsappSub: "Онлайн • Ответ за < 5 мин",
    footerAddress:
      "Çağlayan Mah. (Lara), Muratpaşa / Antalya, Turkey • Тел.: +90 552 602 2489 • info@cosmetocity.com",
    footerDisclaimer:
      "© 2026 CosmetoCity (Sayantalia Medical Tourism • cosmetocity.online). Все процедуры проводятся в аккредитованных Министерством здравоохранения клиниках Антальи и Стамбула.",
  },
  es: {
    topBadge:
      "Centro Médico Principal en Antalya (Lara / Muratpaşa) • Vuelos directos desde Europa al Aeropuerto de Antalya (AYT)",
    topSub: "Opción de clínicas asociadas en Estambul disponible bajo petición",
    navTreatments: "Tratamientos",
    navBeforeAfter: "Antes/Después",
    navReviews: "Opiniones",
    navBlog: "Blog y FAQ",
    navContact: "Contacto",
    navCta: "Consulta Gratuita",
    heroTrustPill: "MÁS DE 15.000 PACIENTES INTERNACIONALES DESDE 2019",
    heroTitleLine1: "Tratamiento de Clase Mundial en Antalya,",
    heroTitleHighlight: "Recuperación 5 Estrellas en el Mediterráneo.",
    heroSubtitle:
      "Experimente Injerto Capilar acreditado, Estética Dental (Hollywood Smile) y Cirugía Estética en la soleada Antalya, Turquía. Ahorre hasta un 70 % con estancia en hotel de 5 estrellas en la playa de Lara y traslados VIP incluidos.",
    citySelectorTitle: "Seleccione su destino preferido:",
    cityAntalyaBadge: "🏖️ Antalya (Sede Principal • Más Popular)",
    cityAntalyaDesc:
      "Vuelos directos a Antalya (AYT). Traslado VIP de 15 minutos a hoteles 5★ en Lara y al Hospital OFM Antalya.",
    cityIstanbulBadge: "🌉 Estambul (Opción Clínica Asociada)",
    cityIstanbulDesc:
      "¿Prefiere realizar su procedimiento en Estambul? Coordinamos su cirugía, hotel 5★ y traslados VIP también en Estambul.",
    heroPrimaryCta: "Consulta Gratuita por WhatsApp",
    heroSecondaryCta: "Ver Tratamientos",
    heroStats: [
      { value: "4.9 / 5", label: "Valoración en Trustpilot" },
      { value: "15.000+", label: "Pacientes Internacionales" },
      { value: "Hasta 70%", label: "Ahorro frente a Europa" },
      { value: "15 Min", label: "Aeropuerto Antalya (AYT) a Clínica" },
    ],
    treatmentsTag: "NUESTRAS ESPECIALIDADES MÉDICAS",
    treatmentsTitle: "Injerto Capilar, Estética Dental y Medicina Estética",
    treatmentsSubtitle:
      "Realizados por cirujanos certificados en los principales hospitales acreditados de Antalya con materiales suizos, alemanes y estadounidenses aprobados por la FDA y CE.",
    priceFromLabel: "Paquete VIP Todo Incluido",
    inquireWhatsappBtn: "Presupuesto por WhatsApp",
    beforeAfterTag: "TRANSFORMACIONES REALES",
    beforeAfterTitle: "Galería de Resultados Antes y Después",
    beforeAfterSubtitle:
      "Compare los resultados clínicos reales de nuestros pacientes internacionales tratados en Antalya.",
    beforeLabel: "ANTES",
    afterLabel: "DESPUÉS",
    sliderInstruction: "Deslice el control hacia la izquierda o derecha para comparar Antes y Después",
    clinicalSpecLabel: "Especificación Clínica",
    reviewsTag: "OPINIONES VERIFICADAS",
    reviewsTitle: "Testimonios de Pacientes Internacionales",
    reviewsSubtitle:
      "Conozca las experiencias reales de pacientes que viajaron a CosmetoCity Antalya.",
    contactTag: "COORDINACIÓN MÉDICA DIRECTA",
    contactTitle: "Obtenga su Consulta Gratuita y Plan de Tratamiento",
    contactSubtitle:
      "Complete el formulario para recibir su valoración médica personalizada y presupuesto Todo Incluido por WhatsApp.",
    contactFormName: "Nombre y Apellidos",
    contactFormCountry: "Su País",
    contactFormTreatment: "Tratamiento de Interés",
    contactFormCity: "Ciudad Preferida",
    contactFormSubmit: "Solicitar Consulta Gratuita",
    istanbulOptionNoteTitle: "¿Prefiere recibir su tratamiento en Estambul?",
    istanbulOptionNoteDesc:
      "Aunque Antalya es nuestra sede principal, también ofrecemos paquetes VIP completos en nuestros hospitales acreditados JCI en Estambul.",
    stickyWhatsappText: "Consulta WhatsApp",
    stickyWhatsappSub: "En línea • Respuesta < 5 min",
    footerAddress:
      "Çağlayan Mah. (Lara), Muratpaşa / Antalya, Turquía • Tel: +90 552 602 2489 • info@cosmetocity.com",
    footerDisclaimer:
      "© 2026 CosmetoCity (Sayantalia Medical Tourism • cosmetocity.online). Todos los tratamientos se realizan en hospitales acreditados por el Ministerio de Salud en Antalya y Estambul.",
  },
  ar: {
    topBadge:
      "المركز الطبي الرئيسي في أنطاليا (لارا / مراد باشا) • رحلات طيران مباشرة إلى مطار أنطاليا (AYT)",
    topSub: "يتوفر أيضاً خيار العلاج في مستشفياتنا الشريكة في إسطنبول عند الطلب",
    navTreatments: "العلاجات",
    navBeforeAfter: "قبل / بعد",
    navReviews: "آراء المرضى",
    navBlog: "المدونة والأسئلة",
    navContact: "اتصل بنا",
    navCta: "استشارة مجانية",
    heroTrustPill: "أكثر من 15,000 مريض دولي يثقون بنا منذ عام 2019",
    heroTitleLine1: "علاج طبي بمواصفات عالمية في أنطاليا،",
    heroTitleHighlight: "واستشفاء 5 نجوم على ساحل البحر المتوسط.",
    heroSubtitle:
      "احصل على أفضل عمليات زراعة الشعر، تجميل الأسنان (ابتسامة هوليوود)، والتجميل الطبي والجراحي في أنطاليا، تركيا. وفّر حتى 70% مع إقامة فندقية 5 نجوم على شاطئ لارا واستقبال VIP من المطار.",
    citySelectorTitle: "اختر وجهتك العلاجية المفضلة:",
    cityAntalyaBadge: "🏖️ أنطاليا (المركز الرئيسي • الأكثر طلباً)",
    cityAntalyaDesc:
      "رحلات مباشرة إلى مطار أنطاليا (AYT). نقل VIP خلال 15 دقيقة إلى فنادق لارا 5 نجوم ومستشفى OFM أنطاليا.",
    cityIstanbulBadge: "🌉 إسطنبول (خيار المستشفيات الشريكة)",
    cityIstanbulDesc:
      "تفضل إجراء عمليتك في إسطنبول؟ يسعدنا تنسيق الجراحة والإقامة الفندقية 5 نجوم وخدمة النقل VIP في إسطنبول أيضاً.",
    heroPrimaryCta: "استشارة مجانية عبر واتساب",
    heroSecondaryCta: "استكشف العلاجات",
    heroStats: [
      { value: "4.9 / 5", label: "تقييم المرضى على Trustpilot" },
      { value: "+15,000", label: "مريض دولي" },
      { value: "حتى 70%", label: "توفير في التكلفة" },
      { value: "15 دقيقة", label: "من مطار أنطاليا إلى المستشفى" },
    ],
    treatmentsTag: "خدماتنا الطبية الأساسية",
    treatmentsTitle: "زراعة الشعر، تجميل الأسنان والتجميل الطبي والجراحي",
    treatmentsSubtitle:
      "تُجرى العمليات على يد نخبة من الجراحين المعتمدين في أرقى مستشفيات أنطاليا المعتمدة باستخدام مواد سويسرية وألمانية وأمريكية معتمدة من FDA وCE.",
    priceFromLabel: "باقة VIP شاملة كلياً",
    inquireWhatsappBtn: "احصل على عرض سعر عبر واتساب",
    beforeAfterTag: "نتائج حقيقية لمرضانا",
    beforeAfterTitle: "معرض نتائج قبل وبعد",
    beforeAfterSubtitle:
      "قارن النتائج السريرية الحقيقية لمرضانا الدوليين الذين أجروا زراعة الشعر وابتسامة هوليوود وعمليات التجميل في أنطاليا.",
    beforeLabel: "قبل",
    afterLabel: "بعد",
    sliderInstruction: "اسحب المؤشر لليمين أو اليسار للمقارنة بين قبل وبعد",
    clinicalSpecLabel: "التفاصيل الطبية للحالة",
    reviewsTag: "تجارب موثقة",
    reviewsTitle: "تقييمات وآراء المرضى الدوليين",
    reviewsSubtitle:
      "اقرأ التجارب الحقيقية للمرضى الذين سافروا إلى CosmetoCity في أنطاليا.",
    contactTag: "التنسيق الطبي المباشر",
    contactTitle: "احصل على استشارتك الطبية المجانية وخطة العلاج",
    contactSubtitle:
      "املأ النموذج أدناه ليقوم المنسق الطبي بالتواصل معك عبر واتساب وتقديم تقييم الطبيب وعرض السعر الشامل.",
    contactFormName: "الاسم الكامل",
    contactFormCountry: "الدولة",
    contactFormTreatment: "العلاج المطلوب",
    contactFormCity: "المدينة المفضلة",
    contactFormSubmit: "إرسال طلب استشارة مجانية",
    istanbulOptionNoteTitle: "هل تفضل إجراء العلاج في إسطنبول؟",
    istanbulOptionNoteDesc:
      "على الرغم من أن أنطاليا هي مركزنا الرئيسي ووجهة الاستشفاء الأكثر شعبية، إلا أننا نوفر أيضاً باقات VIP متكاملة في مستشفياتنا المعتمدة في إسطنبول.",
    stickyWhatsappText: "استشارة عبر واتساب",
    stickyWhatsappSub: "متصل الآن • الرد خلال أقل من 5 دقائق",
    footerAddress:
      "Çağlayan Mah. (Lara), Muratpaşa / Antalya, Turkey • هاتف: +90 552 602 2489 • info@cosmetocity.com",
    footerDisclaimer:
      "© 2026 CosmetoCity (Sayantalia Medical Tourism • cosmetocity.online). تُجرى جميع العلاجات في مستشفيات معتمدة من وزارة الصحة التركية في أنطاليا وإسطنبول.",
  },
  fr: {
    topBadge:
      "Centre Médical Principal à Antalya (Lara / Muratpaşa) • Vols directs depuis l'Europe vers Antalya (AYT)",
    topSub: "Option cliniques partenaires à Istanbul disponible sur demande",
    navTreatments: "Soins",
    navBeforeAfter: "Avant/Après",
    navReviews: "Avis",
    navBlog: "Blog & FAQ",
    navContact: "Contact",
    navCta: "Consultation Gratuite",
    heroTrustPill: "PLUS DE 15 000 PATIENTS INTERNATIONAUX DEPUIS 2019",
    heroTitleLine1: "Soins de Classe Mondiale à Antalya,",
    heroTitleHighlight: "Convalescence 5 Étoiles en Méditerranée.",
    heroSubtitle:
      "Bénéficiez de greffes de cheveux accréditées, d'esthétique dentaire (Hollywood Smile) et de chirurgie esthétique sous le soleil d'Antalya. Économisez jusqu'à 70 % avec séjour en hôtel 5 étoiles à Lara et transferts VIP inclus.",
    citySelectorTitle: "Choisissez votre destination préférée :",
    cityAntalyaBadge: "🏖️ Antalya (Centre Principal • Le Plus Populaire)",
    cityAntalyaDesc:
      "Vols directs vers Antalya (AYT). Transfert VIP de 15 min vers les hôtels 5★ de Lara et l'Hôpital OFM Antalya.",
    cityIstanbulBadge: "🌉 Istanbul (Option Clinique Partenaire)",
    cityIstanbulDesc:
      "Vous préférez Istanbul ? Nous coordonnons également votre intervention, votre hôtel 5★ et vos transferts VIP à Istanbul.",
    heroPrimaryCta: "Consultation Gratuite sur WhatsApp",
    heroSecondaryCta: "Découvrir nos soins",
    heroStats: [
      { value: "4.9 / 5", label: "Note Trustpilot" },
      { value: "15 000+", label: "Patients Internationaux" },
      { value: "Jusqu'à 70%", label: "D'économies vs Europe" },
      { value: "15 Min", label: "Aéroport d'Antalya (AYT) → Clinique" },
    ],
    treatmentsTag: "NOS SPÉCIALITÉS MÉDICALES",
    treatmentsTitle: "Greffe de Cheveux, Esthétique Dentaire & Chirurgie Esthétique",
    treatmentsSubtitle:
      "Réalisées par des chirurgiens certifiés dans les meilleurs hôpitaux accrédités d'Antalya avec des matériaux suisses, allemands et américains approuvés FDA & CE.",
    priceFromLabel: "Forfait VIP Tout Compris",
    inquireWhatsappBtn: "Devis Gratuit WhatsApp",
    beforeAfterTag: "RÉSULTATS PATIENTS RÉELS",
    beforeAfterTitle: "Galerie de Résultats Avant & Après",
    beforeAfterSubtitle:
      "Comparez les résultats cliniques réels de nos patients internationaux traités à Antalya.",
    beforeLabel: "AVANT",
    afterLabel: "APRÈS",
    sliderInstruction: "Faites glisser le curseur à gauche ou à droite pour comparer Avant et Après",
    clinicalSpecLabel: "Spécification Clinique",
    reviewsTag: "TÉMOIGNAGES VÉRIFIÉS",
    reviewsTitle: "Avis de nos Patients Internationaux",
    reviewsSubtitle:
      "Découvrez les témoignages authentiques des patients venus se faire soigner chez CosmetoCity Antalya.",
    contactTag: "CONCIERGERIE MÉDICALE DIRECTE",
    contactTitle: "Obtenez votre Consultation Gratuite & Plan de Traitement",
    contactSubtitle:
      "Remplissez le formulaire ci-dessous pour recevoir votre évaluation médicale personnalisée et un devis Tout Compris via WhatsApp.",
    contactFormName: "Nom et Prénom",
    contactFormCountry: "Votre Pays",
    contactFormTreatment: "Soin Souhaité",
    contactFormCity: "Ville Préférée",
    contactFormSubmit: "Demander une Consultation Gratuite",
    istanbulOptionNoteTitle: "Vous préférez être soigné(e) à Istanbul ?",
    istanbulOptionNoteDesc:
      "Bien qu'Antalya soit notre siège principal, nous organisons également des forfaits VIP complets dans nos hôpitaux partenaires accrédités JCI à Istanbul.",
    stickyWhatsappText: "Consultation WhatsApp",
    stickyWhatsappSub: "En ligne • Réponse < 5 min",
    footerAddress:
      "Çağlayan Mah. (Lara), Muratpaşa / Antalya, Turquie • Tél : +90 552 602 2489 • info@cosmetocity.com",
    footerDisclaimer:
      "© 2026 CosmetoCity (Sayantalia Medical Tourism • cosmetocity.online). Toutes les interventions sont réalisées dans des hôpitaux partenaires accrédités à Antalya et Istanbul.",
  },
  it: {
    topBadge:
      "Polo Medico Principale ad Antalya (Lara / Muratpaşa) • Voli diretti dall'Europa all'Aeroporto di Antalya (AYT)",
    topSub: "Opzione cliniche partner a Istanbul disponibile su richiesta",
    navTreatments: "Trattamenti",
    navBeforeAfter: "Prima/Dopo",
    navReviews: "Recensioni",
    navBlog: "Blog & FAQ",
    navContact: "Contatti",
    navCta: "Consulenza Gratuita",
    heroTrustPill: "OLTRE 15.000 PAZIENTI INTERNAZIONALI DAL 2019",
    heroTitleLine1: "Trattamenti di Eccellenza ad Antalya,",
    heroTitleHighlight: "Convalescenza a 5 Stelle sul Mediterraneo.",
    heroSubtitle:
      "Scopri Trapianto di Capelli accreditato, Estetica Dentale (Hollywood Smile) e Chirurgia Estetica nella soleggiata Antalya, Turchia. Risparmia fino al 70% con soggiorno in hotel 5 stelle a Lara e trasferimenti VIP inclusi.",
    citySelectorTitle: "Seleziona la tua destinazione preferita:",
    cityAntalyaBadge: "🏖️ Antalya (Sede Principale • PiùScelta)",
    cityAntalyaDesc:
      "Voli diretti per Antalya (AYT). Trasferimento VIP di 15 minuti verso hotel 5★ a Lara e l'Ospedale OFM Antalya.",
    cityIstanbulBadge: "🌉 Istanbul (Opzione Clinica Partner)",
    cityIstanbulDesc:
      "Preferisci eseguire il trattamento a Istanbul? Coordiniamo con piacere intervento, hotel 5★ e trasferimenti VIP anche a Istanbul.",
    heroPrimaryCta: "Consulenza Gratuita su WhatsApp",
    heroSecondaryCta: "Esplora i Trattamenti",
    heroStats: [
      { value: "4.9 / 5", label: "Valutazione Trustpilot" },
      { value: "15.000+", label: "Pazienti Internazionali" },
      { value: "Fino al 70%", label: "Risparmio rispetto all'Europa" },
      { value: "15 Min", label: "Aeroporto Antalya (AYT) → Clinica" },
    ],
    treatmentsTag: "I NOSTRI SERVIZI MEDICI PRINCIPALI",
    treatmentsTitle: "Trapianto di Capelli, Estetica Dentale e Medicina Estetica",
    treatmentsSubtitle:
      "Eseguiti da chirurghi specialisti nei principali ospedali accreditati di Antalya utilizzando materiali svizzeri, tedeschi e americani approvati FDA e CE.",
    priceFromLabel: "Pacchetto VIP Tutto Incluso",
    inquireWhatsappBtn: "Preventivo su WhatsApp",
    beforeAfterTag: "TRASFORMAZIONI REALI DEI PAZIENTI",
    beforeAfterTitle: "Galleria Risultati Prima e Dopo",
    beforeAfterSubtitle:
      "Confronta i risultati clinici reali dei nostri pazienti internazionali trattati ad Antalya.",
    beforeLabel: "PRIMA",
    afterLabel: "DOPO",
    sliderInstruction: "Trascina il cursore a sinistra o a destra per confrontare Prima e Dopo",
    clinicalSpecLabel: "Specifica Clinica",
    reviewsTag: "RECENSIONI VERIFICATE",
    reviewsTitle: "Testimonianze dei Pazienti Internazionali",
    reviewsSubtitle:
      "Leggi le esperienze autentiche dei pazienti che hanno scelto CosmetoCity Antalya.",
    contactTag: "CONCIERGE MEDICO DIRETTO",
    contactTitle: "Richiedi la tua Consulenza Gratuita e Piano di Trattamento",
    contactSubtitle:
      "Compila il modulo sottostante per ricevere una valutazione medica personalizzata e un preventivo Tutto Incluso su WhatsApp.",
    contactFormName: "Nome e Cognome",
    contactFormCountry: "Il tuo Paese",
    contactFormTreatment: "Trattamento Richiesto",
    contactFormCity: "Città Preferita",
    contactFormSubmit: "Richiedi Consulenza Gratuita",
    istanbulOptionNoteTitle: "Preferisci essere trattato a Istanbul?",
    istanbulOptionNoteDesc:
      "Sebbene Antalya sia la nostra sede principale, organizziamo pacchetti VIP completi anche nei nostri ospedali partner accreditati JCI a Istanbul.",
    stickyWhatsappText: "Consulenza WhatsApp",
    stickyWhatsappSub: "Online • Risposta in < 5 min",
    footerAddress:
      "Çağlayan Mah. (Lara), Muratpaşa / Antalya, Turchia • Tel: +90 552 602 2489 • info@cosmetocity.com",
    footerDisclaimer:
      "© 2026 CosmetoCity (Sayantalia Medical Tourism • cosmetocity.online). Tutti i trattamenti sono eseguiti in ospedali accreditati dal Ministero della Salute ad Antalya e Istanbul.",
  },
};

export const TREATMENTS_DATA: TreatmentItem[] = [
  {
    id: "hair-transplant",
    categoryKey: "hair",
    badge: {
      en: "SAPPHIRE FUE & DHI • LIFETIME WARRANTY",
      de: "SAPHIR FUE & DHI • LEBENSLANGE GARANTIE",
      ru: "САПФИР FUE И DHI • ПОЖИЗНЕННАЯ ГАРАНТИЯ",
      es: "ZAFIRO FUE Y DHI • GARANTÍA DE POR VIDA",
      ar: "تقنية سفير FUE وأقلام DHI • ضمان مدى الحياة",
      fr: "SAPHIR FUE & DHI • GARANTIE À VIE",
      it: "ZAFFIRO FUE & DHI • GARANZIA A VITA",
    },
    title: {
      en: "Hair Transplant (Sapphire FUE & DHI)",
      de: "Haartransplantation (Saphir FUE & DHI)",
      ru: "Пересадка волос (Сапфир FUE и DHI)",
      es: "Injerto Capilar (Zafiro FUE y DHI)",
      ar: "زراعة الشعر (تقنية السفير FUE و DHI)",
      fr: "Greffe de Cheveux (Saphir FUE & DHI)",
      it: "Trapianto di Capelli (Zaffiro FUE & DHI)",
    },
    description: {
      en: "Maximum density hair restoration (up to 5,000+ grafts) in Antalya using ultra-fine Sapphire blades or Choi DHI pens, paired with a relaxing 5-star Lara hotel recovery.",
      de: "Maximale Haardichte (bis zu 5.000+ Grafts) in Antalya mit feinsten Saphirklingen oder DHI-Implanter-Stiften inklusive 5-Sterne-Erholung in Antalya-Lara.",
      ru: "Восстановление максимальной густоты волос (до 5 000+ графтов) в Анталье с использованием сапфировых микролезвий или ручек-имплантеров Choi DHI и отдыхом в отеле 5★.",
      es: "Restauración capilar de máxima densidad (hasta 5.000+ folículos) en Antalya con hojas de Zafiro o implantadores DHI, combinada con recuperación en hotel 5★ en Lara.",
      ar: "استعادة كثافة الشعر القصوى (حتى 5,000+ بصيلة) في أنطاليا باستخدام شفرات السفير الدقيقة أو أقلام تشوي DHI، مع إقامة استشفائية فاخرة في فندق 5 نجوم بشاطئ لارا.",
      fr: "Restauration capillaire haute densité (jusqu'à 5 000+ greffons) à Antalya avec lames Saphir ou stylos Choi DHI, associée à une récupération en hôtel 5★ à Lara.",
      it: "Ripristino capillare ad alta densità (fino a 5.000+ unità follicolari) ad Antalya con lame in Zaffiro o penne Choi DHI, abbinato a un soggiorno 5★ a Lara.",
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
      ru: [
        "До 5 000+ графтов и сеанс PRP-терапии включены",
        "15 мин. VIP-трансфер из аэропорта Антальи (AYT)",
        "3 ночи в отеле 5★ в Анталье и набор для ухода",
      ],
      es: [
        "Hasta 5.000+ folículos y sesión de PRP incluidos",
        "Traslado VIP de 15 min desde el Aeropuerto de Antalya",
        "3 noches en hotel 5★ en Antalya y kit postoperatorio",
      ],
      ar: [
        "أقصى عدد بصيلات (حتى +5,000) مع جلسة بلازما PRP",
        "نقل VIP خلال 15 دقيقة من مطار أنطاليا الدولي (AYT)",
        "إقامة 3 ليالٍ في فندق 5 نجوم بأنطاليا وحقيبة العناية",
      ],
      fr: [
        "Jusqu'à 5 000+ greffons & séance PRP inclus",
        "Transfert VIP de 15 min depuis l'aéroport d'Antalya",
        "3 nuits en hôtel 5★ à Antalya & kit de soins post-op",
      ],
      it: [
        "Fino a 5.000+ bulbi e seduta PRP inclusa",
        "Transfer VIP di 15 min dall'Aeroporto di Antalya",
        "3 notti in hotel 5★ ad Antalya e kit post-operatorio",
      ],
    },
    basePriceEur: 1990,
    baseComparisonEur: 7500,
    priceGBP: "£1,690",
    priceEUR: "€1,990",
    ukDePrice: "£6,500 / €7,500",
    stayDuration: {
      en: "3 Days in Sunny Antalya",
      de: "3 Tage im sonnigen Antalya",
      ru: "3 дня в солнечной Анталье",
      es: "3 días en la soleada Antalya",
      ar: "3 أيام في أنطاليا المشمسة",
      fr: "3 jours sous le soleil d'Antalya",
      it: "3 giorni nella soleggiata Antalya",
    },
    image: "/images/hair-transplant-antalya.svg",
  },
  {
    id: "dental-aesthetics",
    categoryKey: "dental",
    badge: {
      en: "SWISS E-MAX VENEERS & STRAUMANN IMPLANTS",
      de: "SCHWEIZER E-MAX & STRAUMANN IMPLANTATE",
      ru: "ШВЕЙЦАРСКИЕ ВИНИРЫ E-MAX И ИМПЛАНТЫ STRAUMANN",
      es: "CARILLAS SUIZAS E-MAX E IMPLANTES STRAUMANN",
      ar: "عدسات إيماكس السويسرية وزراعة الأسنان شتراومان",
      fr: "FACETTES SUISSES E-MAX & IMPLANTS STRAUMANN",
      it: "FACCETTE SVIZZERE E-MAX E IMPIANTI STRAUMANN",
    },
    title: {
      en: "Dental Aesthetics (Hollywood Smile)",
      de: "Zahnästhetik (Hollywood Smile & Implantate)",
      ru: "Эстетическая стоматология (Голливудская улыбка)",
      es: "Estética Dental (Sonrisa de Hollywood)",
      ar: "تجميل الأسنان (ابتسامة هوليوود وزراعة الأسنان)",
      fr: "Esthétique Dentaire (Hollywood Smile)",
      it: "Estetica Dentale (Hollywood Smile & Impianti)",
    },
    description: {
      en: "3D Digital Smile Design in Antalya using Swiss Ivoclar E-Max porcelain laminate veneers, German Zirconium crowns, and Straumann/Nobel All-on-4 dental implants.",
      de: "3D Digital Smile Design in Antalya mit Schweizer Ivoclar E-Max Veneers, deutschen Zirkonkronen und Straumann/Nobel Biocare Zahnimplantaten.",
      ru: "Цифровой 3D-дизайн улыбки в Анталье: швейцарские фарфоровые виниры Ivoclar E-Max, немецкие циркониевые коронки и имплантаты Straumann / Nobel All-on-4.",
      es: "Diseño Digital de Sonrisa 3D en Antalya con carillas de porcelana suiza Ivoclar E-Max, coronas de circonio alemán e implantes Straumann / Nobel All-on-4.",
      ar: "تصميم الابتسامة الرقمي ثلاثي الأبعاد 3D في أنطاليا باستخدام عدسات البورسلين السويسرية Ivoclar E-Max، تيجان الزيركون الألماني، وزراعة الأسنان الفورية Straumann.",
      fr: "Digital Smile Design 3D à Antalya avec facettes en porcelaine suisse Ivoclar E-Max, couronnes en zircone allemande et implants Straumann / Nobel All-on-4.",
      it: "Digital Smile Design 3D ad Antalya con faccette in ceramica svizzera Ivoclar E-Max, corone in zirconio tedesco e impianti Straumann / Nobel All-on-4.",
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
      ru: [
        "3D-примерка будущей улыбки до начала обточки",
        "Официальная гарантия на швейцарские E-Max и Straumann",
        "Отдых у моря в Анталье между 3 визитами в клинику",
      ],
      es: [
        "Vista previa digital 3D antes de iniciar el tratamiento",
        "Garantía oficial en materiales suizos E-Max y Straumann",
        "Disfrute de la playa de Antalya entre solo 3 citas",
      ],
      ar: [
        "معاينة رقمية ثلاثية الأبعاد للابتسامة قبل البدء",
        "ضمان دولي معتمد على عدسات E-Max السويسرية وشتراومان",
        "استمتع بشواطئ أنطاليا بين 3 زيارات فقط للعيادة",
      ],
      fr: [
        "Aperçu numérique 3D du sourire avant préparation",
        "Certificat d'authenticité suisse E-Max & Straumann",
        "Profitez de la côte d'Antalya entre seulement 3 séances",
      ],
      it: [
        "Anteprima digitale 3D del sorriso prima del trattamento",
        "Garanzia ufficiale su materiali svizzeri E-Max e Straumann",
        "Goditi la costa di Antalya tra soli 3 appuntamenti",
      ],
    },
    basePriceEur: 2950,
    baseComparisonEur: 13500,
    priceGBP: "£2,550",
    priceEUR: "€2,950",
    ukDePrice: "£11,500 / €13,500",
    stayDuration: {
      en: "5–6 Days in Antalya",
      de: "5–6 Tage in Antalya",
      ru: "5–6 дней в Анталье",
      es: "5–6 días en Antalya",
      ar: "5–6 أيام في أنطاليا",
      fr: "5–6 jours à Antalya",
      it: "5–6 giorni ad Antalya",
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
      ru: "ГОСПИТАЛЬ OFM ANTALYA И ОПЫТНЫЕ ХИРУРГИ",
      es: "HOSPITAL OFM ANTALYA Y CIRUJANOS CERTIFICADOS",
      ar: "مستشفى OFM أنطاليا المعتمد ونخبة جراحي التجميل",
      fr: "HÔPITAL OFM ANTALYA & CHIRURGIENS EXPERTS",
      it: "OSPEDALE OFM ANTALYA E CHIRURGHI SPECIALISTI",
    },
    title: {
      en: "Medical Aesthetics & Plastic Surgery",
      de: "Medizinische Ästhetik & Plastische Chirurgie",
      ru: "Пластическая хирургия и медицинская эстетика",
      es: "Cirugía Plástica y Medicina Estética",
      ar: "جراحات التجميل والتجميل الطبي غير الجراحي",
      fr: "Chirurgie Plastique & Médecine Esthétique",
      it: "Chirurgia Plastica e Medicina Estetica",
    },
    description: {
      en: "Ultrasonic Rhinoplasty, Breast Aesthetics, Vaser Liposuction, Eyelid Surgery, and Non-Surgical Facial Rejuvenation (Botox, Dermal Fillers, Morpheus8) in Antalya.",
      de: "Ultraschall-Rhinoplastik, Brustästhetik, Vaser-Liposuktion, Lidstraffung sowie nicht-chirurgische Gesichtsverjüngung (Botox, Hyaluron, Morpheus8) in Antalya.",
      ru: "Ультразвуковая ринопластика Piezo, пластика груди, липосакция Vaser, блефаропластика и безоперационное омоложение лица в аккредитованной клинике Антальи.",
      es: "Rinoplastia Ultrasónica Piezo, Estética Mamaria, Liposucción Vaser, Blefaroplastia y Rejuvenecimiento Facial sin cirugía en Antalya.",
      ar: "تجميل الأنف بالموجات فوق الصوتية (Piezo)، تجميل الصدر، نحت الجسم بالفيزر، شد الجفون، وإجراءات نضارة الوجه غير الجراحية في أنطاليا.",
      fr: "Rhinoplastie ultrasonique Piezo, esthétique mammaire, liposuccion Vaser, blépharoplastie et rajeunissement facial non chirurgical à Antalya.",
      it: "Rinoplastica Ultrasonica Piezo, Chirurgia del Seno, Liposuzione Vaser, Blefaroplastica e Ringiovanimento Viso non chirurgico ad Antalya.",
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
      ru: [
        "Аккредитованные частные госпитали Антальи (OFM и др.)",
        "Сертифицированные FDA и CE импланты (Motiva / Mentor)",
        "Ежедневный осмотр медсестрой в вашем отеле 5★",
      ],
      es: [
        "Hospitales privados acreditados en Antalya (OFM, etc.)",
        "Implantes y productos dérmicos certificados por FDA y CE",
        "Seguimiento de enfermería privada en su hotel 5★",
      ],
      ar: [
        "مستشفيات خاصة معتمدة بالكامل في أنطاليا (مثل OFM)",
        "حشوات ومواد تجميلية معتمدة من هيئة الغذاء والدواء FDA وCE",
        "متابعة يومية من ممرضة خاصة في فندقك 5 نجوم",
      ],
      fr: [
        "Hôpitaux privés accrédités à Antalya (OFM, etc.)",
        "Implants et produits dermiques certifiés FDA & CE",
        "Suivi infirmier privé quotidien à votre hôtel 5★",
      ],
      it: [
        "Ospedali privati accreditati ad Antalya (OFM, ecc.)",
        "Protesi e prodotti estetici certificati FDA e CE",
        "Controllo infermieristico privato nel tuo hotel 5★",
      ],
    },
    basePriceEur: 2290,
    baseComparisonEur: 8500,
    priceGBP: "£1,950",
    priceEUR: "€2,290",
    ukDePrice: "£7,200 / €8,500",
    stayDuration: {
      en: "4–7 Days in Antalya",
      de: "4–7 Tage in Antalya",
      ru: "4–7 дней в Анталье",
      es: "4–7 días en Antalya",
      ar: "4–7 أيام في أنطاليا",
      fr: "4–7 jours à Antalya",
      it: "4–7 giorni ad Antalya",
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
      ru: "Джеймс Т. (36) • Лондон, Великобритания 🇬🇧 → Анталья",
      es: "James T. (36) • Londres, Reino Unido 🇬🇧 → Tratado en Antalya",
      ar: "جيمس ت. (36 عاماً) • لندن، المملكة المتحدة 🇬🇧 ← عولج في أنطاليا",
      fr: "James T. (36 ans) • Londres, Royaume-Uni 🇬🇧 → Soigné à Antalya",
      it: "James T. (36) • Londra, Regno Unito 🇬🇧 → Trattato ad Antalya",
    },
    procedureName: {
      en: "Sapphire FUE Hair Transplant (4,400 Grafts)",
      de: "Saphir FUE Haartransplantation (4.400 Grafts)",
      ru: "Пересадка волос Сапфир FUE (4 400 графтов)",
      es: "Injerto Capilar Zafiro FUE (4.400 Folículos)",
      ar: "زراعة الشعر بتقنية سفير FUE (4,400 بصيلة)",
      fr: "Greffe de Cheveux Saphir FUE (4 400 Greffons)",
      it: "Trapianto Capelli Zaffiro FUE (4.400 Bulbi)",
    },
    timeframe: {
      en: "10 Months Post-Op Result",
      de: "Ergebnis nach 10 Monaten",
      ru: "Результат через 10 месяцев",
      es: "Resultado a los 10 meses",
      ar: "النتيجة بعد 10 أشهر من العملية",
      fr: "Résultat 10 mois après l'intervention",
      it: "Risultato a 10 mesi dall'intervento",
    },
    graftsOrDetails: {
      en: "4,400 Grafts • Natural Frontal Hairline & Crown Density",
      de: "4.400 Grafts • Natürliche Haarlinie & Tonsurverdichtung",
      ru: "4 400 графтов • Естественная линия роста волос и густота макушки",
      es: "4.400 folículos • Línea frontal natural y densidad en coronilla",
      ar: "4,400 بصيلة • خط جبهة طبيعي وتكثيف كامل لمنطقة التاج",
      fr: "4 400 greffons • Ligne frontale naturelle & densité du vertex",
      it: "4.400 bulbi • Attaccatura frontale naturale e densità del vertice",
    },
    beforeImage: "/images/hair-before-antalya.svg",
    afterImage: "/images/hair-after-antalya.svg",
    doctorNote: {
      en: "High graft survival achieved with Sapphire micro-channels and PRP therapy in Antalya.",
      de: "Maximale Anwuchsrate durch feine Saphir-Mikrokanäle und PRP-Therapie in Antalya.",
      ru: "Высокая приживаемость графтов благодаря сапфировым микроканалам и PRP-терапии в Анталье.",
      es: "Alta supervivencia folicular lograda mediante microcanales de zafiro y terapia PRP en Antalya.",
      ar: "نسبة نمو عالية للبصيلات بفضل القنوات الدقيقة بشفرات السفير وجلسة البلازما PRP في أنطاليا.",
      fr: "Taux de survie élevé des greffons grâce aux micro-canaux Saphir et à la thérapie PRP à Antalya.",
      it: "Elevato attecchimento dei bulbi grazie ai micro-canali in Zaffiro e alla terapia PRP ad Antalya.",
    },
  },
  {
    id: "ba-dental",
    category: "dental",
    patientInfo: {
      en: "Sabine K. (41) • Munich, Germany 🇩🇪 → Treated in Antalya",
      de: "Sabine K. (41) • München, Deutschland 🇩🇪 → Behandelt in Antalya",
      ru: "Сабина К. (41) • Мюнхен, Германия 🇩🇪 → Анталья",
      es: "Sabine K. (41) • Múnich, Alemania 🇩🇪 → Tratada en Antalya",
      ar: "سابين ك. (41 عاماً) • ميونخ، ألمانيا 🇩🇪 ← عولجت في أنطاليا",
      fr: "Sabine K. (41 ans) • Munich, Allemagne 🇩🇪 → Soignée à Antalya",
      it: "Sabine K. (41) • Monaco, Germania 🇩🇪 → Trattata ad Antalya",
    },
    procedureName: {
      en: "Hollywood Smile (20 Swiss E-Max Veneers)",
      de: "Hollywood Smile (20 Schweizer E-Max Veneers)",
      ru: "Голливудская улыбка (20 швейцарских виниров E-Max)",
      es: "Hollywood Smile (20 Carillas Suizas E-Max)",
      ar: "ابتسامة هوليوود (20 عدسة إيماكس سويسرية)",
      fr: "Hollywood Smile (20 Facettes Suisses E-Max)",
      it: "Hollywood Smile (20 Faccette Svizzere E-Max)",
    },
    timeframe: {
      en: "Completed in 5 Days in Lara, Antalya",
      de: "In 5 Tagen in Antalya-Lara fertiggestellt",
      ru: "Завершено за 5 дней в Ларе, Анталья",
      es: "Completado en 5 días en Lara, Antalya",
      ar: "أُنجزت خلال 5 أيام فقط في لارا، أنطاليا",
      fr: "Réalisé en 5 jours à Lara, Antalya",
      it: "Completato in 5 giorni a Lara, Antalya",
    },
    graftsOrDetails: {
      en: "Natural BL2 Shade • 3D Digital Design + 20 E-Max Veneers",
      de: "Natürlicher Farbton BL2 • 3D-Design + 20 E-Max Veneers",
      ru: "Естественный оттенок BL2 • 3D-дизайн + 20 виниров E-Max",
      es: "Tono natural BL2 • Diseño Digital 3D + 20 Carillas E-Max",
      ar: "درجة بياض طبيعية BL2 • تصميم رقمي 3D + 20 عدسة إيماكس",
      fr: "Teinte naturelle BL2 • Design 3D + 20 Facettes E-Max",
      it: "Tonalità naturale BL2 • Design 3D + 20 Faccette E-Max",
    },
    beforeImage:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=900&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=900&q=80",
    doctorNote: {
      en: "Completed with just 3 clinic visits, giving Sabine plenty of time to enjoy Antalya's coast.",
      de: "In nur 3 Klinikterminen abgeschlossen – mit viel Zeit zur Erholung am Strand von Lara.",
      ru: "Выполнено всего за 3 визита в клинику, что позволило совместить лечение с отдыхом у моря.",
      es: "Completado en solo 3 visitas a la clínica, disfrutando de la costa mediterránea de Antalya.",
      ar: "اكتملت الابتسامة في 3 زيارات فقط للعيادة مع الاستمتاع بإجازة مريحة على شاطئ لارا في أنطاليا.",
      fr: "Terminé en seulement 3 rendez-vous cliniques, tout en profitant du bord de mer à Antalya.",
      it: "Completato in soli 3 appuntamenti in clinica, godendosi il mare di Antalya-Lara.",
    },
  },
  {
    id: "ba-aesthetic",
    category: "aesthetic",
    patientInfo: {
      en: "Charlotte W. (32) • Manchester, UK 🇬🇧 → Treated in Antalya",
      de: "Charlotte W. (32) • Manchester, UK 🇬🇧 → Behandelt in Antalya",
      ru: "Шарлотта У. (32) • Манчестер, Великобритания 🇬🇧 → Анталья",
      es: "Charlotte W. (32) • Mánchester, Reino Unido 🇬🇧 → Tratada en Antalya",
      ar: "شارلوت و. (32 عاماً) • مانشستر، بريطانيا 🇬🇧 ← عولجت في أنطاليا",
      fr: "Charlotte W. (32 ans) • Manchester, Royaume-Uni 🇬🇧 → Soignée à Antalya",
      it: "Charlotte W. (32) • Manchester, Regno Unito 🇬🇧 → Trattata ad Antalya",
    },
    procedureName: {
      en: "Ultrasonic Rhinoplasty & Facial Aesthetics",
      de: "Ultraschall-Rhinoplastik & Gesichtsästhetik",
      ru: "Ультразвуковая ринопластика Piezo и эстетика лица",
      es: "Rinoplastia Ultrasónica Piezo y Estética Facial",
      ar: "تجميل الأنف بالموجات فوق الصوتية (Piezo) وتناسق الوجه",
      fr: "Rhinoplastie Ultrasonique Piezo & Esthétique du Visage",
      it: "Rinoplastica Ultrasonica Piezo ed Estetica del Viso",
    },
    timeframe: {
      en: "6 Months Post-Procedure",
      de: "Ergebnis nach 6 Monaten",
      ru: "Результат через 6 месяцев",
      es: "Resultado a los 6 meses",
      ar: "النتيجة بعد 6 أشهر من الإجراء",
      fr: "Résultat à 6 mois post-opératoire",
      it: "Risultato a 6 mesi dall'intervento",
    },
    graftsOrDetails: {
      en: "Piezo Ultrasonic Nasal Sculpting + Hyaluronic Contouring",
      de: "Piezo-Ultraschall-Nasenkorrektur + Konturharmonisierung",
      ru: "Ультразвуковая коррекция спинки носа Piezo + контурная пластика",
      es: "Esculpido nasal ultrasónico Piezo + Armonización facial",
      ar: "نحت عظام الأنف بالموجات فوق الصوتية Piezo بدون كسر تقليدي",
      fr: "Remodelage nasal ultrasonique Piezo + Harmonisation des contours",
      it: "Rimodellamento nasale ultrasonico Piezo + Armonizzazione facciale",
    },
    beforeImage:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80",
    doctorNote: {
      en: "Performed at our contracted hospital in Antalya with 5-star hotel nurse follow-up.",
      de: "Durchgeführt in unserer Partnerklinik in Antalya inklusive Hotel-Krankenschwester-Service.",
      ru: "Проведено в госпитале OFM Antalya с ежедневным наблюдением медсестры в 5-звездочном отеле.",
      es: "Realizado en nuestro hospital acreditado en Antalya con seguimiento de enfermería en el hotel 5★.",
      ar: "أُجريت العملية في مستشفانا المعتمد في أنطاليا مع متابعة يومية من ممرضة خاصة في الفندق.",
      fr: "Réalisé dans notre hôpital partenaire à Antalya avec suivi infirmier quotidien à l'hôtel 5★.",
      it: "Eseguito nel nostro ospedale accreditato ad Antalya con assistenza infermieristica in hotel 5★.",
    },
  },
];

export const TRUSTPILOT_PROFILE_URL =
  "https://www.trustpilot.com/review/cosmetocity.com";

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "tp-bob-gardner",
    name: "Bob Gardner",
    cityCountry: "United Kingdom • Verified Trustpilot Reviewer",
    flag: "🇬🇧",
    treatedIn: "Antalya Clinic Consultation",
    treatment: {
      en: "Clinic Consultation with Dr. Adem & Cihan",
      de: "Klinikberatung bei Dr. Adem & Cihan",
      ru: "Консультация в клинике (Д-р Адем и Джихан)",
      es: "Consulta en Clínica con Dr. Adem y Cihan",
      ar: "استشارة طبية في العيادة مع د. آدم وجيهان",
      fr: "Consultation Clinique avec Dr Adem & Cihan",
      it: "Consulenza in Clinica con Dr. Adem e Cihan",
    },
    rating: 5,
    date: "June 9, 2025",
    quote: {
      en: "I would like to thank both Dr Adam and Cihan along with other staff at CosmetoCity. For there helpful understanding and very professional approach to my needs, at my Consultation at there Clinic.",
      de: "Ich möchte sowohl Dr. Adam als auch Cihan sowie dem gesamten Team von CosmetoCity für ihr hilfreiches Verständnis und ihren äußerst professionellen Ansatz bei meiner Beratung in der Klinik danken. (Original Trustpilot Review: \"I would like to thank both Dr Adam and Cihan along with other staff at CosmetoCity...\")",
      ru: "Хочу поблагодарить доктора Адама, Джихана и весь персонал CosmetoCity за их чуткое понимание и исключительно профессиональный подход к моим потребностям во время консультации в клинике.",
      es: "Me gustaría agradecer tanto al Dr. Adam como a Cihan junto con el resto del personal de CosmetoCity por su comprensión, amabilidad y enfoque tan profesional hacia mis necesidades durante mi consulta en su clínica.",
      ar: "أود أن أشكر كلاً من الدكتور آدم وجيهان وجميع العاملين في CosmetoCity على تفهمهم الكبير ونهجهم الاحترافي للغاية لتلبية احتياجاتي خلال استشارتي في عيادتهم بأنطاليا.",
      fr: "Je tiens à remercier le Dr Adam et Cihan ainsi que toute l'équipe de CosmetoCity pour leur compréhension bienveillante et leur approche très professionnelle lors de ma consultation à leur clinique.",
      it: "Vorrei ringraziare sia il Dr. Adam che Cihan insieme a tutto lo staff di CosmetoCity per la loro disponibilità, comprensione e l'approccio estremamente professionale durante la mia consulenza presso la loro clinica.",
    },
    verifiedVia: "Trustpilot Verified • 5.0 ★",
  },
  {
    id: "tp-joanne-kennedy",
    name: "Joanne Kennedy",
    cityCountry: "United Kingdom • Verified Trustpilot Reviewer",
    flag: "🇬🇧",
    treatedIn: "Antalya (Airport VIP Transfer & Hospital)",
    treatment: {
      en: "VIP Medical Travel, Airport Transfer & Hospital Care",
      de: "VIP-Klinikreise, Flughafentransfer & Klinikbetreuung",
      ru: "VIP-трансфер из аэропорта и лечение в госпитале",
      es: "Viaje Médico VIP, Traslado Aeropuerto y Hospital",
      ar: "رحلة علاجية VIP واستقبال المطار والرعاية بالمستشفى",
      fr: "Séjour Médical VIP, Transfert Aéroport & Hôpital",
      it: "Viaggio Medico VIP, Transfer Aeroporto e Ospedale",
    },
    rating: 5,
    date: "November 15, 2022",
    quote: {
      en: "Well what can I say such a professional an friendly team at cosmeto city ! Absolutely gutted to leave but I've had such a amazing experience from the team from picking me up from airport to hospital visits and taking care of everything.",
      de: "Was soll ich sagen – ein so professionelles und freundliches Team bei CosmetoCity! Ich bin traurig abzureisen, hatte aber eine wunderbare Erfahrung mit dem gesamten Team, von der Abholung am Flughafen bis hin zu den Terminen im Krankenhaus.",
      ru: "Что я могу сказать — такая профессиональная и дружелюбная команда в CosmetoCity! Даже грустно уезжать, у меня остались потрясающие впечатления от команды: от встречи в аэропорту до сопровождения в госпитале.",
      es: "¡Qué puedo decir, un equipo tan profesional y amable en CosmetoCity! Me da mucha pena irme, he tenido una experiencia increíble con todo el equipo desde que me recogieron en el aeropuerto hasta las visitas al hospital.",
      ar: "ماذا عساي أن أقول، فريق محترف وودود للغاية في CosmetoCity! حزينة لمغادرتي ولكنني حظيت بتجربة رائعة جداً مع الفريق بدايةً من استقبالي في المطار وحتى زيارات المستشفى والاهتمام بكل التفاصيل.",
      fr: "Que dire, une équipe tellement professionnelle et chaleureuse chez CosmetoCity ! Vraiment triste de repartir, j'ai vécu une expérience incroyable avec l'équipe, de la prise en charge à l'aéroport jusqu'aux visites à l'hôpital.",
      it: "Che dire, un team davvero professionale e cordiale presso CosmetoCity! Mi dispiace tantissimo ripartire, ho vissuto un'esperienza straordinaria con il team, dall'accoglienza in aeroporto fino alle visite in ospedale.",
    },
    verifiedVia: "Trustpilot Verified • 5.0 ★",
  },
  {
    id: "tp-john-m",
    name: "John M.",
    cityCountry: "Europe / Germany • Verified Trustpilot Reviewer",
    flag: "🇩🇪",
    treatedIn: "Antalya (Surgery, Hotel & Nachsorge)",
    treatment: {
      en: "Surgical Care, Post-Op Nachsorge & Hotel Recovery",
      de: "Chirurgischer Eingriff, Post-OP Nachsorge & Hotel",
      ru: "Хирургическое лечение, послеоперационный уход и отель",
      es: "Cirugía, Cuidado Postoperatorio (Nachsorge) y Hotel",
      ar: "رعاية جراحية، متابعة ما بعد العملية وإقامة فندقية",
      fr: "Chirurgie, Suivi Post-Opératoire & Convalescence Hôtel",
      it: "Chirurgia, Assistenza Post-Operatoria e Hotel",
    },
    rating: 5,
    date: "June 27, 2021",
    quote: {
      en: "Great attention to detail. Fantastic post-surgical care (in German NACHSORGE), and how important this is! The team was always available with supplies and medical coordination, and being accommodated in the hotel did not impair my recovery in the least.",
      de: "Großartige Liebe zum Detail. Fantastische postoperative Betreuung (NACHSORGE) – und wie wichtig diese ist! Das Team war jederzeit mit Verbandsmaterial und ärztlicher Koordination erreichbar, und die Unterbringung im Hotel war absolut komfortabel.",
      ru: "Великолепное внимание к деталям. Фантастический послеоперационный уход (NACHSORGE), а ведь это самое важное! Команда всегда была на связи с медикаментами и врачами, а проживание в отеле было максимально комфортным.",
      es: "Gran atención al detalle. Fantástico cuidado postoperatorio (NACHSORGE), ¡y qué importante es esto! El equipo estuvo siempre disponible con suministros y coordinación médica, y el alojamiento en el hotel fue sumamente cómodo.",
      ar: "اهتمام رائع بأدق التفاصيل. رعاية مذهلة بعد الجراحة (NACHSORGE)، وكم هي مهمة هذه المرحلة! كان الفريق متواجداً دائماً لتوفير المستلزمات والتنسيق الطبي، وكانت الإقامة في الفندق مريحة للغاية.",
      fr: "Grande attention portée aux détails. Suivi post-opératoire fantastique (NACHSORGE), et c'est tellement important ! L'équipe était toujours disponible avec le matériel médical, et le séjour à l'hôtel s'est déroulé dans un confort total.",
      it: "Grande attenzione ai dettagli. Fantastica assistenza post-chirurgica (NACHSORGE), ed è fondamentale! Il team è stato sempre disponibile con forniture mediche e coordinamento, e il soggiorno in hotel è stato comodissimo.",
    },
    verifiedVia: "Trustpilot Verified • 5.0 ★",
  },
  {
    id: "tp-gulnar-fattakhova",
    name: "Gulnar Fattakhova",
    cityCountry: "International Patient • Verified Trustpilot Reviewer",
    flag: "🌍",
    treatedIn: "Antalya Dental Clinic",
    treatment: {
      en: "Aesthetic Dental Care & Laser Teeth Whitening",
      de: "Zahnästhetik & Professionelles Bleaching",
      ru: "Эстетическая стоматология и отбеливание зубов",
      es: "Estética Dental y Blanqueamiento Profesional",
      ar: "تجميل الأسنان وتبييض الأسنان الاحترافي",
      fr: "Esthétique Dentaire & Blanchiment Professionnel",
      it: "Estetica Dentale e Sbiancamento Professionale",
    },
    rating: 5,
    date: "July 8, 2021",
    quote: {
      en: "I had a teeth whitening procedure in Antalya arranged by CosmetoCity. The session was completely painless, Cihan and the clinic staff made me feel very comfortable, answered all my questions, and a week later I am getting so many compliments on my smile!",
      de: "Ich hatte eine Zahnaufhellung in Antalya über CosmetoCity. Die Behandlung war völlig schmerzfrei, Cihan und das Klinikteam haben sich hervorragend um mich gekümmert, alle Fragen beantwortet, und ich bekomme jetzt so viele Komplimente für mein Lächeln!",
      ru: "Я проходила процедуру эстетического отбеливания зубов в Анталье через CosmetoCity. Процедура прошла совершенно безболезненно, Джихан и персонал клиники окружили меня заботой, ответили на все вопросы — теперь я получаю массу комплиментов своей улыбке!",
      es: "Me realicé un tratamiento dental en Antalya organizado por CosmetoCity. La sesión fue totalmente indolora, Cihan y el personal de la clínica me hicieron sentir muy cómoda y una semana después recibo muchísimos cumplidos por mi sonrisa.",
      ar: "أجريت جلسة تجميل وتبييض الأسنان في أنطاليا بتنسيق من CosmetoCity. كانت الجلسة بدون أي ألم على الإطلاق، وجعلني جيهان وطاقم العيادة أشعر براحة تامة وأجابوا عن كل أسئلتي، والآن أتلقى الكثير من الإطراءات على ابتسامتي!",
      fr: "J'ai effectué un soin d'éclaircissement dentaire à Antalya organisé par CosmetoCity. La séance a été totalement indolore, Cihan et l'équipe m'ont mise très à l'aise et je reçois énormément de compliments sur mon sourire !",
      it: "Ho effettuato un trattamento di estetica e sbiancamento dentale ad Antalya organizzato da CosmetoCity. La seduta è stata completamente indolore, Cihan e lo staff mi hanno fatta sentire a mio agio e ora ricevo tantissimi complimenti per il mio sorriso!",
    },
    verifiedVia: "Trustpilot Verified • 5.0 ★",
  },
];
