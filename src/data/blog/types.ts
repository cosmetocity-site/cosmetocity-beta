import { Locale, CityOption, WHATSAPP_NUMBER } from "../content";

/**
 * MULTILINGUAL BLOG ARCHITECTURE RULE (CosmetoCity):
 * Every blog article MUST be authored in ALL 7 target languages:
 *   en (English), de (German), ru (Russian), es (Spanish),
 *   ar (Arabic - RTL), fr (French), it (Italian).
 *
 * Each language version gets its own localized slug, dedicated static URL
 * (`/blog/[locale]/[localized-slug]`), native SEO metadata, hreflang alternates,
 * language-specific FAQPage & MedicalWebPage JSON-LD, WhatsApp CTAs, and
 * medical review trust badge.
 */

export const ALL_BLOG_LOCALES: Locale[] = [
  "en",
  "de",
  "ru",
  "es",
  "ar",
  "fr",
  "it",
];

export const OG_LOCALE_MAP: Record<Locale, string> = {
  en: "en_US",
  de: "de_DE",
  ru: "ru_RU",
  es: "es_ES",
  ar: "ar_AR",
  fr: "fr_FR",
  it: "it_IT",
};

export function isValidBlogLocale(value: string): value is Locale {
  return (ALL_BLOG_LOCALES as string[]).includes(value);
}

export type LocalizedText = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export function getLocalizedText(
  obj: Partial<Record<Locale, string>>,
  locale: Locale,
  fallbackLocale: Locale = "en"
): string {
  const direct = obj[locale];
  if (direct !== undefined) return direct;
  const fallback = obj[fallbackLocale];
  if (fallback !== undefined) return fallback;
  if (obj.en !== undefined) return obj.en;
  const firstAvailable = Object.values(obj).find(
    (value): value is string => typeof value === "string"
  );
  return firstAvailable ?? "";
}

export function getLocalizedList(
  obj: Partial<Record<Locale, string[]>>,
  locale: Locale,
  fallbackLocale: Locale = "en"
): string[] {
  const direct = obj[locale];
  if (direct !== undefined) return direct;
  const fallback = obj[fallbackLocale];
  if (fallback !== undefined) return fallback;
  if (obj.en !== undefined) return obj.en;
  const firstAvailable = Object.values(obj).find((value): value is string[] =>
    Array.isArray(value)
  );
  return firstAvailable ?? [];
}

export interface BlogSubSection {
  heading: LocalizedText; // H3 subheading
  text: LocalizedText;
}

export interface BlogQuestionSection {
  id: string;
  question: LocalizedText; // H2 question
  directAnswer: LocalizedText; // 2-3 sentence direct snippet answer
  details: LocalizedList; // Detailed clinical paragraphs
  subSections?: BlogSubSection[]; // Optional H3 clinical breakdown subheadings
  bulletPoints?: LocalizedList; // Optional actionable clinical bullet points
  tipBox?: {
    title: LocalizedText;
    text: LocalizedText;
  };
}

export interface RecoveryTimelineDay {
  period: LocalizedText;
  painLevel: LocalizedText;
  milestone: LocalizedText;
}

export interface BlogCtaConfig {
  badge: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  buttonText: LocalizedText;
  whatsappTopic: LocalizedText;
}

export interface BlogPost {
  /** Legacy / default slug (kept for backwards compatibility with /blog/[slug]) */
  slug: string;
  /** Localized SEO URL slug for every language -> /blog/[locale]/[slugs[locale]] */
  slugs: Record<Locale, string>;
  primaryLocale?: Locale;
  category: "aesthetic" | "hair" | "dental" | "bariatric";
  categoryLabel: LocalizedText;
  publishedAt: string;
  updatedAt: string;
  readingTime: LocalizedText;
  medicalReviewer: {
    name: string;
    title: LocalizedText;
    hospital: string;
  };
  heroImage: string;
  metaTitle: LocalizedText;
  metaDescription: LocalizedText;
  // H1 Question + Complete H1 Title
  h1Question: LocalizedText;
  h1CompleteTitle: LocalizedText;
  // 2-3 Sentence Featured Snippet Direct Answer right under H1
  h1DirectAnswer: LocalizedText;
  keyTakeaways: LocalizedList;
  recoveryTimeline?: RecoveryTimelineDay[];
  sections: BlogQuestionSection[];
  midArticleCta: BlogCtaConfig;
  bottomArticleCta: BlogCtaConfig;
}

export function getPostAvailableLocales(post: BlogPost): Locale[] {
  return ALL_BLOG_LOCALES.filter((loc) => Boolean(post.h1Question[loc]));
}

export function getPostSlug(post: BlogPost, locale: Locale): string {
  return post.slugs[locale] || post.slug;
}

export function getPostUrl(post: BlogPost, locale: Locale): string {
  return `/blog/${locale}/${getPostSlug(post, locale)}`;
}

export function getBlogIndexUrl(locale: Locale): string {
  return `/blog/${locale}`;
}

export function getPostHreflangAlternates(
  post: BlogPost,
  baseUrl = "https://cosmetocity.online"
): Record<string, string> {
  const alternates: Record<string, string> = {};
  for (const loc of ALL_BLOG_LOCALES) {
    alternates[loc] = `${baseUrl}${getPostUrl(post, loc)}`;
  }
  alternates["x-default"] = `${baseUrl}${getPostUrl(post, "en")}`;
  return alternates;
}

export function getBlogIndexHreflangAlternates(
  baseUrl = "https://cosmetocity.online"
): Record<string, string> {
  const alternates: Record<string, string> = {};
  for (const loc of ALL_BLOG_LOCALES) {
    alternates[loc] = `${baseUrl}${getBlogIndexUrl(loc)}`;
  }
  alternates["x-default"] = `${baseUrl}/blog/en`;
  return alternates;
}

export function buildBlogWhatsAppLink(
  locale: Locale,
  customTopic: string,
  city: CityOption = "antalya"
): string {
  const targetCity = city === "antalya" ? "Antalya" : "Istanbul";
  const messages: Record<Locale, string> = {
    en: `Hello CosmetoCity Medical Coordinator! I just read your medical guide on cosmetocity.online and would like to ask about ${customTopic} in ${targetCity}.`,
    de: `Hallo CosmetoCity Medizinischer Koordinator! Ich habe gerade Ihren Ratgeber auf cosmetocity.online gelesen und habe eine Frage zu ${customTopic} in ${targetCity}.`,
    ru: `Здравствуйте, медицинский координатор CosmetoCity! Я прочитал(а) ваше руководство на cosmetocity.online и хочу узнать о процедуре «${customTopic}» в г. ${targetCity}.`,
    es: `¡Hola Coordinador Médico de CosmetoCity! Acabo de leer su guía médica en cosmetocity.online y me gustaría consultar sobre ${customTopic} en ${targetCity}.`,
    ar: `مرحباً المنسق الطبي في CosmetoCity! لقد قرأت دليلكم الطبي على cosmetocity.online وأود الاستفسار عن ${customTopic} في ${targetCity}.`,
    fr: `Bonjour Coordinateur Médical CosmetoCity ! Je viens de lire votre guide médical sur cosmetocity.online et je souhaiterais me renseigner sur ${customTopic} à ${targetCity}.`,
    it: `Salve Coordinatore Medico CosmetoCity! Ho appena letto la vostra guida medica su cosmetocity.online e vorrei informazioni su ${customTopic} ad ${targetCity}.`,
  };
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    messages[locale]
  )}`;
}

export const BLOG_UI_COPY: Record<
  Locale,
  {
    blogNavLabel: string;
    blogHeaderBadge: string;
    blogHeaderTitle: string;
    blogHeaderSubtitle: string;
    blogMetaTitle: string;
    blogMetaDescription: string;
    readArticleBtn: string;
    backToBlog: string;
    backToHome: string;
    directAnswerBadge: string;
    medicallyReviewedBy: string;
    lastUpdated: string;
    tableOfContents: string;
    timelineTitle: string;
    timelineColPeriod: string;
    timelineColPain: string;
    timelineColMilestone: string;
    keyTakeawaysTitle: string;
    faqSchemaBadge: string;
    relatedQuestionsTitle: string;
    replyTimeNote: string;
    ctaHospitalBadge: string;
    medicalTeamReviewedTitle: string;
    medicalTeamReviewedNote: string;
  }
> = {
  en: {
    blogNavLabel: "Medical Blog & FAQ",
    blogHeaderBadge: "EVIDENCE-BASED PATIENT GUIDES • INTERNATIONAL DESK",
    blogHeaderTitle: "Most Asked Medical Tourism Questions, Answered by Surgeons",
    blogHeaderSubtitle:
      "Clear, empathetic, and medically accurate recovery guides for Hair Transplants, Rhinoplasty, Breast Aesthetics, Tummy Tuck, and Hollywood Smile procedures in sunny Antalya (and Istanbul).",
    blogMetaTitle: "Medical Tourism Blog & Surgeon Recovery Guides | CosmetoCity Antalya",
    blogMetaDescription:
      "Evidence-based patient guides by Antalya surgeons: Hair Transplant, Rhinoplasty, Breast Augmentation, Tummy Tuck, and Swiss E-Max Veneers recovery timelines & FAQ.",
    readArticleBtn: "Read Complete Recovery Guide",
    backToBlog: "← All Medical Guides",
    backToHome: "CosmetoCity Home",
    directAnswerBadge: "QUICK MEDICAL SUMMARY (SNIPPET ANSWER)",
    medicallyReviewedBy: "Medically Reviewed by",
    lastUpdated: "Updated",
    tableOfContents: "Questions Answered in This Guide",
    timelineTitle: "Day-by-Day Pain & Recovery Timeline",
    timelineColPeriod: "Recovery Stage",
    timelineColPain: "Expected Sensation / Pain",
    timelineColMilestone: "Activity & Clinical Milestone",
    keyTakeawaysTitle: "At a Glance: What International Patients Need to Know",
    faqSchemaBadge: "Google FAQPage Verified Structure",
    relatedQuestionsTitle: "More High-Intent Patient Guides",
    replyTimeNote:
      "Direct WhatsApp line • Average response under 5 minutes • Multilingual Coordinators",
    ctaHospitalBadge: "OFM Antalya Hospital & 5-Star Lara Recovery",
    medicalTeamReviewedTitle: "Reviewed by the Cosmetocity Medical Team",
    medicalTeamReviewedNote:
      "Clinical accuracy verified against current international health tourism & surgical safety standards in Antalya.",
  },
  de: {
    blogNavLabel: "Medizinischer Ratgeber",
    blogHeaderBadge: "ÄRZTLICH GEPRÜFTE RATGEBER • INTERNATIONALE PATIENTEN",
    blogHeaderTitle:
      "Die häufigsten Patientenfragen – direkt von Fachärzten beantwortet",
    blogHeaderSubtitle:
      "Transparente, einfühlsame und medizinisch fundierte Heilungsleitfäden für Nasenkorrektur, Brustästhetik, Bauchdeckenstraffung, Haartransplantation und Hollywood Smile im sonnigen Antalya.",
    blogMetaTitle: "Medizinischer Ratgeber & Heilungsleitfäden | CosmetoCity Antalya",
    blogMetaDescription:
      "Ärztlich geprüfte Ratgeber aus Antalya: Haartransplantation, Nasenkorrektur, Brustvergrößerung, Bauchdeckenstraffung & Schweizer E-Max Veneers.",
    readArticleBtn: "Kompletten Heilungsratgeber lesen",
    backToBlog: "← Alle Medizinischen Ratgeber",
    backToHome: "CosmetoCity Startseite",
    directAnswerBadge: "MEDIZINISCHE KURZANTWORT (DIREKT-FAZIT)",
    medicallyReviewedBy: "Ärztlich geprüft von",
    lastUpdated: "Aktualisiert",
    tableOfContents: "Beantwortete Patientenfragen in diesem Leitfaden",
    timelineTitle: "Schmerz- & Heilungsverlauf Tag für Tag",
    timelineColPeriod: "Heilungsphase",
    timelineColPain: "Schmerzempfinden",
    timelineColMilestone: "Alltag & Medizinischer Meilenstein",
    keyTakeawaysTitle: "Auf einen Blick: Das Wichtigste für Ihre Reise",
    faqSchemaBadge: "Strukturierte FAQ-Daten",
    relatedQuestionsTitle: "Weitere häufige Patientenfragen",
    replyTimeNote:
      "Direkter WhatsApp-Kontakt • Antwort in unter 5 Minuten • Deutschsprachige Koordinatoren",
    ctaHospitalBadge: "OFM Antalya Hospital & 5-Sterne-Erholung in Lara",
    medicalTeamReviewedTitle: "Geprüft vom Cosmetocity Ärzteteam",
    medicalTeamReviewedNote:
      "Medizinische Inhalte nach aktuellen klinischen Sicherheitsstandards in Antalya fachärztlich geprüft.",
  },
  ru: {
    blogNavLabel: "Медицинский блог и FAQ",
    blogHeaderBadge: "РУКОВОДСТВА ДЛЯ ПАЦИЕНТОВ • ОДОБРЕНО ХИРУРГАМИ",
    blogHeaderTitle:
      "Ответы ведущих хирургов на главные вопросы медицинского туризма",
    blogHeaderSubtitle:
      "Подробные и научно обоснованные руководства по восстановлению после пересадки волос, ринопластики, пластики груди, абдоминопластики и стоматологии в Анталье и Стамбуле.",
    blogMetaTitle: "Медицинский блог и руководства хирургов | CosmetoCity Анталья",
    blogMetaDescription:
      "Проверенные хирургами руководства по восстановлению в Анталье: пересадка волос, ринопластика, пластика груди, абдоминопластика и швейцарские виниры E-Max.",
    readArticleBtn: "Читать полное руководство",
    backToBlog: "← Все медицинские статьи",
    backToHome: "Главная CosmetoCity",
    directAnswerBadge: "КРАТКОЕ МЕДИЦИНСКОЕ РЕЗЮМЕ",
    medicallyReviewedBy: "Проверено врачом:",
    lastUpdated: "Обновлено",
    tableOfContents: "Вопросы, разобранные в этом руководстве",
    timelineTitle: "График восстановления по дням",
    timelineColPeriod: "Этап восстановления",
    timelineColPain: "Ощущения / Уровень дискомфорта",
    timelineColMilestone: "Клинический этап и активность",
    keyTakeawaysTitle: "Главное, что нужно знать пациенту",
    faqSchemaBadge: "Проверенная структура FAQPage",
    relatedQuestionsTitle: "Другие полезные руководства",
    replyTimeNote:
      "Прямая линия WhatsApp • Ответ менее чем за 5 минут • Русскоязычные координаторы",
    ctaHospitalBadge: "Госпиталь OFM Анталья и отель 5★ в Ларе",
    medicalTeamReviewedTitle: "Проверено медицинской командой Cosmetocity",
    medicalTeamReviewedNote:
      "Клиническая точность подтверждена в соответствии с международными стандартами безопасности хирургии в Анталье.",
  },
  es: {
    blogNavLabel: "Blog Médico y FAQ",
    blogHeaderBadge: "GUÍAS MÉDICAS VERIFICADAS POR CIRUJANOS",
    blogHeaderTitle:
      "Las preguntas más frecuentes del turismo médico respondidas por especialistas",
    blogHeaderSubtitle:
      "Guías de recuperación claras, empáticas y médicamente precisas sobre Injerto Capilar, Rinoplastia, Estética Mamaria, Abdominoplastia y Hollywood Smile en Antalya y Estambul.",
    blogMetaTitle: "Blog Médico y Guías de Recuperación | CosmetoCity Antalya",
    blogMetaDescription:
      "Guías clínicas verificadas por cirujanos en Antalya: injerto capilar, rinoplastia, aumento de pecho, abdominoplastia y carillas suizas E-Max.",
    readArticleBtn: "Leer guía completa de recuperación",
    backToBlog: "← Todas las guías médicas",
    backToHome: "Inicio CosmetoCity",
    directAnswerBadge: "RESUMEN MÉDICO DIRECTO",
    medicallyReviewedBy: "Revisado médicamente por",
    lastUpdated: "Actualizado",
    tableOfContents: "Preguntas respondidas en esta guía",
    timelineTitle: "Cronograma de recuperación día a día",
    timelineColPeriod: "Etapa de recuperación",
    timelineColPain: "Sensación esperada / Dolor",
    timelineColMilestone: "Hito clínico y actividad",
    keyTakeawaysTitle:
      "En resumen: Lo que todo paciente internacional debe saber",
    faqSchemaBadge: "Estructura verificada Google FAQPage",
    relatedQuestionsTitle: "Más guías médicas para pacientes",
    replyTimeNote:
      "Línea directa de WhatsApp • Respuesta en menos de 5 minutos • Coordinadores en Español",
    ctaHospitalBadge: "Hospital OFM Antalya y recuperación 5★ en Lara",
    medicalTeamReviewedTitle: "Revisado por el Equipo Médico de Cosmetocity",
    medicalTeamReviewedNote:
      "Precisión clínica verificada según los estándares internacionales de seguridad quirúrgica en Antalya.",
  },
  ar: {
    blogNavLabel: "المدونة الطبية والأسئلة الشائعة",
    blogHeaderBadge: "أدلة طبية معتمدة من الجراحين • مكتب المرضى الدوليين",
    blogHeaderTitle: "أكثر الأسئلة الطبية شيوعاً يجيب عنها نخبة الجراحين",
    blogHeaderSubtitle:
      "أدلة تعافٍ واضحة ودقيقة طبياً لعمليات زراعة الشعر، تجميل الأنف، تجميل الصدر، شد البطن، وابتسامة هوليوود في أنطاليا وإسطنبول.",
    blogMetaTitle: "المدونة الطبية وأدلة التعافي الجراحي | CosmetoCity أنطاليا",
    blogMetaDescription:
      "أدلة طبية معتمدة من الجراحين في أنطاليا: زراعة الشعر، تجميل الأنف، تكبير الصدر، شد البطن وعدسات إيماكس السويسرية.",
    readArticleBtn: "اقرأ دليل التعافي الكامل",
    backToBlog: "← جميع الأدلة الطبية",
    backToHome: "الرئيسية CosmetoCity",
    directAnswerBadge: "ملخص طبي سريع (إجابة مباشرة)",
    medicallyReviewedBy: "تمت المراجعة الطبية بواسطة",
    lastUpdated: "آخر تحديث",
    tableOfContents: "الأسئلة التي يجيب عنها هذا الدليل",
    timelineTitle: "الجدول الزمني للتعافي يوماً بيوم",
    timelineColPeriod: "مرحلة التعافي",
    timelineColPain: "الإحساس المتوقع / مستوى الألم",
    timelineColMilestone: "النشاط والتطور الطبي",
    keyTakeawaysTitle: "باختصار: أهم ما يجب أن يعرفه المريض الدولي",
    faqSchemaBadge: "بيانات FAQPage الطبية المهيكلة",
    relatedQuestionsTitle: "أدلة طبية أخرى ذات صلة",
    replyTimeNote:
      "خط واتساب مباشر • الرد خلال أقل من 5 دقائق • منسقون يتحدثون العربية",
    ctaHospitalBadge: "مستشفى OFM أنطاليا وإقامة 5 نجوم في لارا",
    medicalTeamReviewedTitle: "تمت المراجعة من قبل الفريق الطبي في Cosmetocity",
    medicalTeamReviewedNote:
      "تم التحقق من الدقة السريرية وفقاً لأحدث معايير السلامة الجراحية والسياحة العلاجية الدولية في أنطاليا.",
  },
  fr: {
    blogNavLabel: "Blog Médical & FAQ",
    blogHeaderBadge: "GUIDES PATIENTS VALIDÉS PAR NOS CHIRURGIENS",
    blogHeaderTitle:
      "Les questions les plus fréquentes du tourisme médical, expliquées par nos chirurgiens",
    blogHeaderSubtitle:
      "Des guides de convalescence clairs et médicalement précis pour la greffe de cheveux, la rhinoplastie, l'esthétique mammaire, l'abdominoplastie et le Hollywood Smile à Antalya.",
    blogMetaTitle: "Blog Médical & Guides de Convalescence | CosmetoCity Antalya",
    blogMetaDescription:
      "Guides médicaux validés par nos chirurgiens à Antalya : greffe de cheveux, rhinoplastie, augmentation mammaire, abdominoplastie et facettes suisses E-Max.",
    readArticleBtn: "Lire le guide complet de convalescence",
    backToBlog: "← Tous les guides médicaux",
    backToHome: "Accueil CosmetoCity",
    directAnswerBadge: "RÉSUMÉ MÉDICAL RAPIDE (RÉPONSE DIRECTE)",
    medicallyReviewedBy: "Validé médicalement par",
    lastUpdated: "Mis à jour",
    tableOfContents: "Questions traitées dans ce guide",
    timelineTitle: "Calendrier de guérison jour après jour",
    timelineColPeriod: "Étape de guérison",
    timelineColPain: "Sensation attendue / Douleur",
    timelineColMilestone: "Activité & étape clinique",
    keyTakeawaysTitle:
      "En bref : Ce que les patients internationaux doivent savoir",
    faqSchemaBadge: "Structure Google FAQPage vérifiée",
    relatedQuestionsTitle: "Autres guides médicaux",
    replyTimeNote:
      "Ligne WhatsApp directe • Réponse en moins de 5 minutes • Coordinateurs francophones",
    ctaHospitalBadge: "Hôpital OFM Antalya & séjour 5★ à Lara",
    medicalTeamReviewedTitle: "Vérifié par l'équipe médicale Cosmetocity",
    medicalTeamReviewedNote:
      "Exactitude clinique vérifiée selon les normes internationales de sécurité chirurgicale à Antalya.",
  },
  it: {
    blogNavLabel: "Blog Medico & FAQ",
    blogHeaderBadge: "GUIDE PER I PAZIENTI APPROVATE DAI CHIRURGHI",
    blogHeaderTitle:
      "Le domande più frequenti sul turismo medico, con le risposte dei nostri chirurghi",
    blogHeaderSubtitle:
      "Guide di recupero chiare, empatiche e clinicamente accurate per Trapianto di Capelli, Rinoplastica, Chirurgia del Seno, Addominoplastica e Hollywood Smile ad Antalya.",
    blogMetaTitle: "Blog Medico e Guide al Recupero | CosmetoCity Antalya",
    blogMetaDescription:
      "Guide cliniche approvate dai chirurghi di Antalya: trapianto di capelli, rinoplastica, mastoplastica additiva, addominoplastica e faccette svizzere E-Max.",
    readArticleBtn: "Leggi la guida completa al recupero",
    backToBlog: "← Tutte le guide mediche",
    backToHome: "Home CosmetoCity",
    directAnswerBadge: "SINTESI MEDICA RAPIDA (RISPOSTA DIRETTA)",
    medicallyReviewedBy: "Revisione medica a cura di",
    lastUpdated: "Aggiornato",
    tableOfContents: "Domande a cui risponde questa guida",
    timelineTitle: "Cronologia del recupero giorno per giorno",
    timelineColPeriod: "Fase di recupero",
    timelineColPain: "Sensazione prevista / Dolore",
    timelineColMilestone: "Attività e traguardo clinico",
    keyTakeawaysTitle:
      "In sintesi: Cosa devono sapere i pazienti internazionali",
    faqSchemaBadge: "Struttura Google FAQPage verificata",
    relatedQuestionsTitle: "Altre guide mediche per i pazienti",
    replyTimeNote:
      "Linea diretta WhatsApp • Risposta in meno di 5 minuti • Coordinatori in Italiano",
    ctaHospitalBadge: "Ospedale OFM Antalya e recupero 5★ a Lara",
    medicalTeamReviewedTitle: "Revisionato dal Team Medico Cosmetocity",
    medicalTeamReviewedNote:
      "Accuratezza clinica verificata secondo gli standard internazionali di sicurezza chirurgica ad Antalya.",
  },
};

export function generateArticleJsonLd(
  post: BlogPost,
  locale: Locale = "en",
  baseUrl = "https://cosmetocity.online"
) {
  const canonicalUrl = `${baseUrl}${getPostUrl(post, locale)}`;
  const imageUrl = post.heroImage.startsWith("http")
    ? post.heroImage
    : `${baseUrl}${post.heroImage}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    inLanguage: locale,
    headline: getLocalizedText(post.h1CompleteTitle, locale, locale),
    description: getLocalizedText(post.metaDescription, locale, locale),
    image: [imageUrl],
    articleSection: getLocalizedText(post.categoryLabel, locale, locale),
    url: canonicalUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: post.medicalReviewer.name,
      jobTitle: getLocalizedText(post.medicalReviewer.title, locale, locale),
    },
    publisher: {
      "@type": "Organization",
      name: "CosmetoCity Antalya",
      url: baseUrl,
    },
  };
}

export function generateFaqJsonLd(post: BlogPost, locale: Locale = "en") {
  const mainEntity = [
    {
      "@type": "Question",
      name: getLocalizedText(post.h1Question, locale, locale),
      acceptedAnswer: {
        "@type": "Answer",
        text: getLocalizedText(post.h1DirectAnswer, locale, locale),
      },
    },
    ...post.sections.map((section) => ({
      "@type": "Question",
      name: getLocalizedText(section.question, locale, locale),
      acceptedAnswer: {
        "@type": "Answer",
        text: getLocalizedText(section.directAnswer, locale, locale),
      },
    })),
  ];

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity,
  };
}
