"use client";

import React, { useState } from "react";
import {
  Scale,
  Stethoscope,
  ShieldCheck,
  Hotel,
  Car,
  HeartPulse,
  CheckCircle2,
  MessageCircle,
  ChevronDown,
  Award,
  Clock,
  Utensils,
} from "lucide-react";
import {
  Locale,
  CityOption,
  isRtlLocale,
  buildWhatsAppLink,
} from "@/data/content";
import {
  CurrencyConfig,
  DEFAULT_CURRENCY_CONFIG,
  formatConvertedPrice,
} from "@/lib/currency";
import { trackWhatsAppClick } from "@/lib/analytics";

interface BariatricSurgerySectionProps {
  locale: Locale;
  selectedCity: CityOption;
  currencyConfig?: CurrencyConfig;
}

interface BariatricProcedure {
  id: string;
  basePriceEur: number;
  baseComparisonEur: number;
  bmiRequirement: string;
  weightLossTarget: Record<Locale, string>;
  hospitalNights: Record<Locale, string>;
  badge: Record<Locale, string>;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  highlights: Record<Locale, string[]>;
}

const BARIATRIC_PROCEDURES: BariatricProcedure[] = [
  {
    id: "gastric-sleeve",
    basePriceEur: 3100,
    baseComparisonEur: 11900,
    bmiRequirement: "BMI ≥ 30–35+",
    weightLossTarget: {
      en: "65–80% Excess Weight Loss",
      de: "65–80 % Übergewichtsverlust",
      ru: "Потеря 65–80% лишнего веса",
      es: "65–80% Pérdida de Exceso de Peso",
      ar: "فقدان 65–80% من الوزن الزائد",
      fr: "Perte de 65 à 80 % de l'excès de poids",
      it: "Perdita del 65–80% del peso in eccesso",
    },
    hospitalNights: {
      en: "3 Nights Hospital + 2–3 Nights 5★ Hotel",
      de: "3 Nächte Klinik + 2–3 Nächte 5★ Hotel",
      ru: "3 ночи в госпитале + 2–3 ночи в отеле 5★",
      es: "3 noches Hospital + 2–3 noches Hotel 5★",
      ar: "3 ليالٍ بالمستشفى + 2–3 ليالٍ فندق 5 نجوم",
      fr: "3 nuits Hôpital + 2–3 nuits Hôtel 5★",
      it: "3 notti Ospedale + 2–3 notti Hotel 5★",
    },
    badge: {
      en: "MOST POPULAR • LAPAROSCOPIC & SINGLE-PORT",
      de: "BELIEBTESTE OP • LAPAROSKOPISCH & SINGLE-PORT",
      ru: "САМАЯ ПОПУЛЯРНАЯ • ЛАПАРОСКОПИЯ И SINGLE-PORT",
      es: "MÁS POPULAR • LAPAROSCÓPICA Y PUERTO ÚNICO",
      ar: "الأكثر طلباً • بالمنظار الدقيق أو فتحـة واحدة",
      fr: "LE PLUS POPULAIRE • CŒLIOSCOPIE & SINGLE-PORT",
      it: "PIÙ RICHIESTA • LAPAROSCOPICA & SINGLE-PORT",
    },
    title: {
      en: "Gastric Sleeve (Sleeve Gastrectomy / Tube Stomach)",
      de: "Schlauchmagen-OP (Laparoskopische Sleeve-Gastrektomie)",
      ru: "Рукавная резекция желудка (Gastric Sleeve / Слив)",
      es: "Manga Gástrica Laparoscópica (Sleeve Gastrectomy)",
      ar: "عملية تكميم المعدة بالمنظار (Gastric Sleeve)",
      fr: "Sleeve Gastrectomie par Cœlioscopie",
      it: "Sleeve Gastrectomy Laparoscopica (Gastrectomia Verticale)",
    },
    description: {
      en: "Minimally invasive removal of ~80% of the stomach curvature using FDA-approved US Covidien™ / Ethicon™ tri-staplers. Dramatically reduces ghrelin (the hunger hormone) while preserving natural digestion.",
      de: "Minimalinvasive Verkleinerung des Magenvolumens um ca. 80 % mit original US Covidien™ / Ethicon™ Tri-Stapler-Klammernahtgeräten. Senkt das Hungerhormon Ghrelin dauerhaft bei Erhalt des natürlichen Verdauungswegs.",
      ru: "Малоинвазивное уменьшение объема желудка на ~80% с использованием оригинальных американских трехрядных степлеров Covidien™ / Ethicon™. Снижает уровень гормона голода грелина.",
      es: "Reducción mínimamente invasiva del ~80% del volumen estomacal mediante grapadoras americanas triples Covidien™ / Ethicon™. Reduce drásticamente la hormona del hambre (grelina).",
      ar: "تصغير حجم المعدة بنسبة 80% بالمنظار الجراحي الدقيق باستخدام الدباسات الثلاثية الأمريكية الأصلية (Covidien™ / Ethicon™)، مما يقلل هرمون الجوع (الجريلين) بشكل فوري وآمن.",
      fr: "Réduction mini-invasive d'environ 80 % du volume de l'estomac à l'aide d'agrafeuses américaines tri-rangées Covidien™ / Ethicon™. Réduit durablement l'hormone de la faim (ghréline).",
      it: "Riduzione mini-invasiva di circa l'80% del volume gastrico tramite suturatrici americane a tripla fila Covidien™ / Ethicon™. Riduce drasticamente l'ormone della fame (grelina).",
    },
    highlights: {
      en: [
        "Original US Covidien / Ethicon Tri-Stapler & Triple Leak Test",
        "Single-Port (Scarless Umbilical) & Revision Sleeve Options Available",
        "Walk Within 4 Hours Post-Op • 12-Month Bariatric Dietitian Follow-Up",
      ],
      de: [
        "Original US Covidien / Ethicon Tri-Stapler & 3-facher Dichtigkeitstest",
        "Auch als Single-Port (narbenfrei) oder Revisions-OP verfügbar",
        "Mobilisierung 4 Std. nach OP • 12 Monate Ernährungsberatung",
      ],
      ru: [
        "США степлеры Covidien / Ethicon и тройной тест на герметичность",
        "Доступна методика Single-Port (через один прокол) и ревизия",
        "Ходьба через 4 часа после операции • 12 месяцев с диетологом",
      ],
      es: [
        "Grapadoras EE.UU. Covidien / Ethicon y triple prueba de estanqueidad",
        "Opción de Puerto Único (Single-Port sin cicatriz visible) y Revisión",
        "Caminata a las 4 horas post-op • 12 meses de nutricionista bariátrico",
      ],
      ar: [
        "دباسات أمريكية أصلية Covidien / Ethicon مع 3 اختبارات أمان للتسريب",
        "متوفرة أيضاً بتقنية الفتحة الواحدة (Single-Port) أو عمليات التصحيح",
        "المشي بعد 4 ساعات فقط من العملية • متابعة أخصائي تغذية لمدة 12 شهراً",
      ],
      fr: [
        "Agrafeuses US Covidien / Ethicon & triple test d'étanchéité",
        "Options Single-Port (sans cicatrice visible) & Chirurgie de Révision",
        "Marche 4h après l'opération • 12 mois de suivi nutritionnel dédié",
      ],
      it: [
        "Suturatrici USA Covidien / Ethicon e triplo test di tenuta intra-op",
        "Disponibile anche Single-Port (senza cicatrici) e Revisione Bariatrica",
        "Camminata dopo 4 ore dall'intervento • 12 mesi di nutrizionista",
      ],
    },
  },
  {
    id: "gastric-bypass",
    basePriceEur: 3750,
    baseComparisonEur: 14200,
    bmiRequirement: "BMI ≥ 35–40+",
    weightLossTarget: {
      en: "75–85% Excess Weight Loss",
      de: "75–85 % Übergewichtsverlust",
      ru: "Потеря 75–85% лишнего веса",
      es: "75–85% Pérdida de Exceso de Peso",
      ar: "فقدان 75–85% من الوزن الزائد",
      fr: "Perte de 75 à 85 % de l'excès de poids",
      it: "Perdita del 75–85% del peso in eccesso",
    },
    hospitalNights: {
      en: "3–4 Nights Hospital + 2–3 Nights 5★ Hotel",
      de: "3–4 Nächte Klinik + 2–3 Nächte 5★ Hotel",
      ru: "3–4 ночи в госпитале + 2–3 ночи в отеле 5★",
      es: "3–4 noches Hospital + 2–3 noches Hotel 5★",
      ar: "3–4 ليالٍ بالمستشفى + 2–3 ليالٍ فندق 5 نجوم",
      fr: "3–4 nuits Hôpital + 2–3 nuits Hôtel 5★",
      it: "3–4 notti Ospedale + 2–3 notti Hotel 5★",
    },
    badge: {
      en: "ROUX-EN-Y & MINI BYPASS • DIABETES REMISSION",
      de: "ROUX-EN-Y & MINI-BYPASS • TYP-2-DIABETES",
      ru: "ROUX-EN-Y И МИНИ-ШУНТИРОВАНИЕ • ОТ ДИАБЕТА 2 ТИПА",
      es: "ROUX-EN-Y Y MINI BYPASS • REMISIÓN DE DIABETES",
      ar: "تحويل المسار الكلاسيكي والمصغر • علاج السكري",
      fr: "ROUX-EN-Y & MINI BYPASS • RÉMISSION DU DIABÈTE",
      it: "ROUX-EN-Y E MINI BYPASS • REMISSIONE DIABETE",
    },
    title: {
      en: "Gastric Bypass (Roux-en-Y & Mini Gastric Bypass)",
      de: "Magenbypass (Roux-en-Y & Mini-Gastric-Bypass)",
      ru: "Желудочное шунтирование (Roux-en-Y и Мини-шунтирование)",
      es: "Bypass Gástrico (Roux-en-Y y Mini Bypass Gástrico)",
      ar: "عملية تحويل مسار المعدة (الكلاسيكي والمصغر)",
      fr: "Bypass Gastrique (Roux-en-Y & Mini Bypass)",
      it: "Bypass Gastrico (Roux-en-Y e Mini Bypass Gastrico)",
    },
    description: {
      en: "Combines stomach pouch restriction with intestinal malabsorption to deliver powerful weight loss and up to 85%+ remission of Type-2 diabetes, acid reflux (GERD), and metabolic syndrome.",
      de: "Kombiniert eine kleine Magentasche mit einer Umleitung des Dünndarms für maximale Gewichtsabnahme sowie über 85 % Remissionsrate bei Typ-2-Diabetes und starkem Reflux (Sodbrennen).",
      ru: "Сочетает уменьшение объема желудка со снижением всасывания калорий. Обеспечивает максимальное снижение веса и ремиссию сахарного диабета 2 типа и рефлюкса.",
      es: "Combina la creación de un pequeño reservorio gástrico con menor absorción calórica, logrando resultados superiores y remisión de diabetes tipo 2 y reflujo gastroesofágico.",
      ar: "تجمع بين تصغير جيب المعدة وتقليل امتصاص السعرات والسكريات، وتُعد الحل الذهبي لمرضى السمنة المفرطة ومرضى السكري من النوع الثاني وارتجاع المريء.",
      fr: "Associe une réduction de la poche gastrique à un court-circuit intestinal pour une perte de poids maximale et une rémission élevée du diabète de type 2 et du reflux.",
      it: "Combina la riduzione della tasca gastrica con il malassorbimento calorico per la massima perdita di peso e la remissione del diabete di tipo 2 e del reflusso.",
    },
    highlights: {
      en: [
        "Gold Standard for Type-2 Diabetes, Reflux (GERD) & High BMI",
        "Complete Pre-Op Endocrine, Cardiology & Endoscopy Screening",
        "Revision Surgery from Previous Band/Sleeve to Bypass Available",
      ],
      de: [
        "Goldstandard bei Typ-2-Diabetes, Reflux (GERD) & hohem BMI",
        "Inkl. Endokrinologie-, Kardiologie- & Endoskopie-Check vorab",
        "Auch als Revisions-OP nach Magenband oder Schlauchmagen",
      ],
      ru: [
        "Золотой стандарт при диабете 2 типа, рефлюксе и высоком ИМТ",
        "Полный предоперационный скрининг: эндоскопия, кардиолог, анализы",
        "Доступна ревизионная операция (перевод слива/бандажа в шунт)",
      ],
      es: [
        "Estándar de oro para Diabetes Tipo 2, Reflujo (ERGE) y alto IMC",
        "Chequeo preoperatorio completo: endoscopia, cardiología y analítica",
        "Cirugía de revisión bariátrica disponible para casos previos",
      ],
      ar: [
        "الخيار الأمثل لمرضى السكري من النوع الثاني وارتجاع المريء",
        "شامل كافة الفحوصات الاستقلابية والقلبية ومنظار المعدة قبل العملية",
        "متوفر أيضاً كعملية تصحيحية بعد عمليات السمنة السابقة",
      ],
      fr: [
        "Référence pour le diabète de type 2, le reflux (RGO) et IMC élevé",
        "Bilan préopératoire complet : endoscopie, cardiologie et biologie",
        "Chirurgie de révision disponible après anneau ou sleeve",
      ],
      it: [
        "Standard d'elezione per Diabete Tipo 2, Reflusso e BMI elevato",
        "Check-up pre-operatorio completo: endoscopia, cardiologia ed esami",
        "Disponibile anche come chirurgia di revisione bariatrica",
      ],
    },
  },
  {
    id: "gastric-balloon",
    basePriceEur: 1850,
    baseComparisonEur: 5400,
    bmiRequirement: "BMI 27–35",
    weightLossTarget: {
      en: "15–25 kg Weight Loss (4–12 Months)",
      de: "15–25 kg Gewichtsverlust (4–12 Monate)",
      ru: "Снижение веса на 15–25 кг (за 4–12 мес.)",
      es: "15–25 kg de Pérdida de Peso (4–12 Meses)",
      ar: "إنقاص 15–25 كجم (خلال 4–12 شهراً)",
      fr: "Perte de 15 à 25 kg (en 4 à 12 mois)",
      it: "Perdita di 15–25 kg (in 4–12 mesi)",
    },
    hospitalNights: {
      en: "Outpatient (20 Mins) + 2–3 Nights 5★ Hotel",
      de: "Ambulant (20 Min.) + 2–3 Nächte 5★ Hotel",
      ru: "Амбулаторно (20 мин.) + 2–3 ночи в отеле 5★",
      es: "Ambulatorio (20 min) + 2–3 noches Hotel 5★",
      ar: "إجراء يومي (20 دقيقة) + 2–3 ليالٍ فندق 5 نجوم",
      fr: "Ambulatoire (20 min) + 2–3 nuits Hôtel 5★",
      it: "Ambulatoriale (20 min) + 2–3 notti Hotel 5★",
    },
    badge: {
      en: "NON-SURGICAL • ALLURION SWALLOWED & ENDOSCOPIC",
      de: "OHNE OP • ALLURION SCHLUCKBALLON & ENDOSKOPISCH",
      ru: "БЕЗ ОПЕРАЦИИ • КАПСУЛА ALLURION И ЭНДОСКОПИЧЕСКИЙ",
      es: "SIN CIRUGÍA • CÁPSULA ALLURION Y ENDOSCÓPICO",
      ar: "بدون جراحة • كبسولة ألوريون الذكية وبالمنظار",
      fr: "SANS CHIRURGIE • CAPSULE ALLURION & ENDOSCOPIQUE",
      it: "SENZA CHIRURGIA • CAPSULA ALLURION ED ENDOSCOPICO",
    },
    title: {
      en: "Gastric Balloon (Allurion™ Swallowed & 6/12-Month Endoscopic)",
      de: "Magenballon (Allurion™ Schluckballon & 6/12-Monats-Ballon)",
      ru: "Желудочный баллон (Проглатываемый Allurion™ и эндоскопический)",
      es: "Balón Gástrico (Cápsula Ingerible Allurion™ y Endoscópico)",
      ar: "بالون المعدة (كبسولة Allurion™ الذكية والبالون بالمنظار)",
      fr: "Ballon Gastrique (Capsule Allurion™ & Ballon Endoscopique)",
      it: "Palloncino Gastrico (Capsula Allurion™ e Palloncino Endoscopico)",
    },
    description: {
      en: "A 20-minute non-surgical weight-loss solution without incisions or general anesthesia. Creates natural satiety so you feel full faster while establishing healthy long-term habits with our dietitian.",
      de: "Die 20-minütige nicht-operative Lösung ohne Schnitte und ohne Vollnarkose. Sorgt für ein schnelles Sättigungsgefühl und hilft Ihnen, gemeinsam mit unseren Ernährungsberatern dauerhaft abzunehmen.",
      ru: "Безоперационное решение за 20 минут без разрезов и общего наркоза. Создает чувство сытости и помогает комфортно сбросить 15–25 кг под контролем нашего диетолога.",
      es: "Solución sin cirugía de 20 minutos, sin incisiones ni anestesia general. Genera saciedad temprana y le permite perder entre 15 y 25 kg con apoyo nutricional continuo.",
      ar: "حل غير جراحي يستغرق 20 دقيقة فقط بدون أي شق جراحي أو تخدير عام. يمنحك شعوراً سريعاً بالشبع لإنقاص 15 إلى 25 كجم بأمان تام مع متابعة التغذية.",
      fr: "Solution non chirurgicale en 20 minutes, sans incision ni anesthésie générale. Procure une satiété rapide pour perdre 15 à 25 kg avec accompagnement nutritionnel.",
      it: "Soluzione non chirurgica in 20 minuti, senza incisioni né anestesia generale. Induce sazietà precoce per perdere 15–25 kg con il supporto del nostro team nutrizionale.",
    },
    highlights: {
      en: [
        "Zero Incisions, Zero Scars • Return to Hotel the Same Afternoon",
        "Allurion™ Smart Capsule Excretes Naturally After ~16 Weeks",
        "Includes Connected Smart Scale, App & Dietitian Meal Plans",
      ],
      de: [
        "Keine Schnitte, keine Narben • Am selben Tag zurück ins 5★ Hotel",
        "Allurion™ Kapsel-Ballon löst sich nach ca. 16 Wochen von selbst auf",
        "Inkl. Smart-Waage, App-Tracking & individuellem Ernährungsplan",
      ],
      ru: [
        "Без разрезов и шрамов • Возвращение в отель 5★ в тот же день",
        "Капсула Allurion™ выводится естественным путем через ~16 недель",
        "Включает умные весы, приложение и персональный план питания",
      ],
      es: [
        "Sin incisiones ni cicatrices • Regreso al hotel 5★ el mismo día",
        "El balón Allurion™ se elimina naturalmente tras ~16 semanas",
        "Incluye báscula inteligente, app móvil y plan nutricional",
      ],
      ar: [
        "بدون جراحة أو ندوب • العودة إلى فندقك 5 نجوم في نفس اليوم",
        "كبسولة Allurion™ تتحلل وتخرج طبيعياً بعد حوالي 16 أسبوعاً",
        "شامل الميزان الذكي وتطبيق المتابعة وجداول التغذية المخصصة",
      ],
      fr: [
        "Aucune incision ni cicatrice • Retour à l'hôtel 5★ le jour même",
        "Le ballon Allurion™ s'élimine naturellement après ~16 semaines",
        "Inclut balance connectée, application mobile et suivi diététique",
      ],
      it: [
        "Zero incisioni e zero cicatrici • Rientro in hotel 5★ lo stesso giorno",
        "Il palloncino Allurion™ viene espulso naturalmente dopo ~16 settimane",
        "Include bilancia smart, app dedicata e piano nutrizionale",
      ],
    },
  },
];

interface BariatricCopy {
  tag: string;
  title: string;
  subtitle: string;
  surgeonsBannerTitle: string;
  surgeonsBannerDesc: string;
  packageIncludesTitle: string;
  packageInclusions: { title: string; desc: string }[];
  faqTitle: string;
  faqs: { q: string; a: string }[];
  priceLabel: string;
  euPriceLabel: string;
  whatsappBtn: string;
}

const BARIATRIC_SECTION_COPY: Record<Locale, BariatricCopy> = {
  en: {
    tag: "COSMETOCITY.COM BARIATRIC & METABOLIC SURGERY CENTER",
    title: "Bariatric Surgery in Antalya & Istanbul (Gastric Sleeve, Bypass & Balloon)",
    subtitle:
      "Integrated directly from cosmetocity.com: life-changing laparoscopic obesity surgery performed in ICU-equipped accredited hospitals with US Covidien/Ethicon materials, 5-star recovery, and 12 months of bariatric dietitian support.",
    surgeonsBannerTitle:
      "Performed by CosmetoCity's Board-Certified Bariatric Surgeons",
    surgeonsBannerDesc:
      "Prof. Dr. Burhan Mayir (Antalya • 20+ Years Laparoscopic Bariatric Experience), Dr. Direnç Yiğit (Antalya • Upper GI & Metabolic Surgery Specialist), and Op. Dr. Mehmet Altan Kaya (Istanbul • Bariatric & Metabolic Surgeon).",
    packageIncludesTitle:
      "What Is Included in Every CosmetoCity All-Inclusive Bariatric Package?",
    packageInclusions: [
      {
        title: "Comprehensive Pre-Op Check-Up",
        desc: "Blood panels, upper GI endoscopy, abdominal ultrasound, chest X-ray, ECG, cardiology, pulmonology & anesthesiology clearance.",
      },
      {
        title: "3 Nights Accredited Hospital Stay",
        desc: "Private VIP hospital room (free companion stay & meals included), 24/7 ICU back-up, FDA US tri-staplers & triple leak tests.",
      },
      {
        title: "5-Star Hotel & VIP Airport Transfers",
        desc: "2–3 post-discharge nights at a 5-star Lara hotel with daily private nurse visits and private Mercedes VIP airport/hospital transfers.",
      },
      {
        title: "1-Year Bariatric Dietitian & Aftercare Kit",
        desc: "Post-op medications, protein shakes, vitamins, corsets/stockings, Fit-to-Fly certificate & 12 months of multilingual nutritionist tracking.",
      },
    ],
    faqTitle: "Frequently Asked Bariatric Questions (From cosmetocity.com)",
    faqs: [
      {
        q: "Gastric Sleeve vs. Gastric Bypass: Which procedure is right for me?",
        a: "Gastric Sleeve removes ~80% of the stomach to curb appetite and is ideal for most patients with BMI 30–45. Gastric Bypass also reroutes a portion of the small intestine to limit calorie absorption and is often preferred for patients with severe Type-2 diabetes or chronic acid reflux (GERD).",
      },
      {
        q: "Can I walk safely right after Gastric Sleeve surgery, and when can I fly home?",
        a: "Yes! On cosmetocity.com we emphasize early mobilization: our nurses help you walk in your private hospital suite just 4 hours after laparoscopic surgery to boost circulation. You stay 3 nights in the hospital and 2–3 nights at your 5-star hotel, flying home safely on Day 5 or 6.",
      },
      {
        q: "Can carbonated / fizzy drinks stretch my stomach after Gastric Sleeve?",
        a: "During your recovery, our bariatric dietitians advise avoiding carbonated and sugary fizzy drinks because trapped gas creates uncomfortable pressure on your healing stomach pouch and can contribute to pouch dilation over time. We provide a complete 4-stage liquid-to-solid nutrition guide.",
      },
    ],
    priceLabel: "All-Inclusive VIP Package",
    euPriceLabel: "vs. UK / EU:",
    whatsappBtn: "Get Bariatric Assessment on WhatsApp",
  },
  de: {
    tag: "COSMETOCITY.COM ZENTRUM FÜR ADIPOSITAS- & METABOLISCHE CHIRURGIE",
    title: "Adipositaschirurgie in Antalya & Istanbul (Schlauchmagen, Bypass & Ballon)",
    subtitle:
      "Direkt von cosmetocity.com integriert: Minimalinvasive Magenverkleinerung in akkreditierten Spitzenkliniken mit US Covidien/Ethicon Klammernahtgeräten, 3 Nächten Klinik, 5-Sterne-Hotel und 12 Monaten Ernährungsberatung.",
    surgeonsBannerTitle:
      "Durchgeführt von CosmetoCitys erfahrenen Adipositas-Chefärzten",
    surgeonsBannerDesc:
      "Prof. Dr. Burhan Mayir (Antalya • über 20 Jahre Erfahrung in laparoskopischer Adipositaschirurgie), Dr. Direnç Yiğit (Antalya • Facharzt für Gastroenterologische & Metabolische Chirurgie) und Op. Dr. Mehmet Altan Kaya (Istanbul).",
    packageIncludesTitle:
      "Was ist in jedem CosmetoCity All-Inclusive Adipositas-Paket enthalten?",
    packageInclusions: [
      {
        title: "Kompletter Prä-OP Check-up",
        desc: "Großes Blutbild, Magenspiegelung (Endoskopie), Ultraschall, Röntgen, EKG sowie Kardiologie-, Pneumologie- & Anästhesie-Freigabe.",
      },
      {
        title: "3 Nächte Vollstationärer Klinikaufenthalt",
        desc: "Private VIP-Kliniksuite (kostenlose Übernachtung & Verpflegung für 1 Begleitperson), 24/7 Intensivstation & 3-facher Dichtigkeitstest.",
      },
      {
        title: "5-Sterne-Hotel & VIP Mercedes-Transfers",
        desc: "2–3 Nächte im 5-Sterne-Hotel in Antalya-Lara mit täglicher Krankenschwester-Visite sowie allen VIP-Transfers ab Flughafen (AYT).",
      },
      {
        title: "1 Jahr Ernährungsberatung & Medikamenten-Set",
        desc: "Post-OP Medikamente, Proteinshakes, Kompressionsstrümpfe, Fit-to-Fly-Zertifikat & 12 Monate Betreuung durch unsere Diätassistenten.",
      },
    ],
    faqTitle: "Häufige Patientenfragen zur Magen-OP (aus cosmetocity.com)",
    faqs: [
      {
        q: "Schlauchmagen (Gastric Sleeve) oder Magenbypass: Was passt zu mir?",
        a: "Beim Schlauchmagen werden ca. 80 % des Magens entfernt (ideal bei BMI 30–45). Der Magenbypass kombiniert eine kleine Magentasche mit einer Verkürzung der Nährstoffaufnahme im Darm und wird besonders bei schwerem Typ-2-Diabetes oder starkem Sodbrennen (Reflux) empfohlen.",
      },
      {
        q: "Kann ich nach der Schlauchmagen-OP sofort laufen und wann darf ich fliegen?",
        a: "Ja! Bereits 4 Stunden nach dem laparoskopischen Eingriff machen Sie mit unserem Pflegeteam die ersten Schritte im Zimmer. Nach 3 Nächten in der Klinik und 2–3 Nächten im 5-Sterne-Hotel fliegen Sie am 5. oder 6. Tag sicher nach Hause.",
      },
      {
        q: "Können kohlensäurehaltige Getränke den verkleinerten Magen wieder dehnen?",
        a: "Ja, unsere Ernährungsberater empfehlen den Verzicht auf stark kohlensäurehaltige Getränke, da das Gas Druck auf die frische Magennaht ausübt und langfristig zu einer Dehnung des Schlauchmagens beitragen kann.",
      },
    ],
    priceLabel: "All-Inclusive VIP-Paket",
    euPriceLabel: "ggü. DE / EU:",
    whatsappBtn: "Adipositas-Beratung per WhatsApp",
  },
  ru: {
    tag: "ЦЕНТР БАРИАТРИЧЕСКОЙ И МЕТАБОЛИЧЕСКОЙ ХИРУРГИИ COSMETOCITY.COM",
    title: "Бариатрическая хирургия в Анталье и Стамбуле (Слив, Шунтирование, Баллон)",
    subtitle:
      "Официальные программы cosmetocity.com: лапароскопическое лечение ожирения в аккредитованных госпиталях с американскими степлерами Covidien/Ethicon, 3 ночами стационара, отелем 5★ и поддержкой диетолога 12 месяцев.",
    surgeonsBannerTitle:
      "Операции проводят ведущие бариатрические хирурги CosmetoCity",
    surgeonsBannerDesc:
      "Проф. д-р Бурхан Майир (Анталья • более 20 лет опыта в лапароскопии), д-р Диренч Йигит (Анталья • гастроэнтерологическая и метаболическая хирургия) и оп. д-р Мехмет Алтан Кая (Стамбул).",
    packageIncludesTitle:
      "Что входит в каждый бариатрический VIP-пакет «Все включено»?",
    packageInclusions: [
      {
        title: "Полное предоперационное обследование",
        desc: "Развернутые анализы крови, гастроскопия, УЗИ брюшной полости, ЭКГ, рентген, консультации кардиолога, пульмонолога и анестезиолога.",
      },
      {
        title: "3 ночи в аккредитованном госпитале",
        desc: "Индивидуальная VIP-палата (бесплатное проживание и питание для 1 сопровождающего), степлеры США и тройной тест на герметичность.",
      },
      {
        title: "Отель 5★ и VIP-трансфер из аэропорта",
        desc: "2–3 ночи после выписки в 5-звездочном отеле в Ларе с ежедневным осмотром медсестры и всеми трансферами на VIP Mercedes.",
      },
      {
        title: "1 год поддержки диетолога и медикаменты",
        desc: "Послеоперационные препараты, протеиновые коктейли, компрессионное белье, сертификат Fit-to-Fly и 12 месяцев ведения диетологом.",
      },
    ],
    faqTitle: "Частые вопросы о бариатрической хирургии (cosmetocity.com)",
    faqs: [
      {
        q: "Рукавная резекция (Gastric Sleeve) или шунтирование (Gastric Bypass): что выбрать?",
        a: "Рукавная резекция уменьшает объем желудка на 80% и идеально подходит большинству пациентов с ИМТ 30–45. Желудочное шунтирование дополнительно снижает всасывание калорий и рекомендуется при тяжелом диабете 2 типа или выраженном рефлюксе.",
      },
      {
        q: "Когда можно вставать после операции и через сколько дней можно лететь домой?",
        a: "Уже через 4 часа после лапароскопической операции вы начинаете ходить по палате под контролем медсестры. После 3 ночей в госпитале и 2–3 ночей в отеле 5★ вы можете безопасно вылетать домой на 5–6 день.",
      },
      {
        q: "Могут ли газированные напитки растянуть уменьшенный желудок?",
        a: "Наши бариатрические диетологи рекомендуют исключить газированные напитки, так как углекислый газ создает избыточное давление на стенки нового желудка и со временем может привести к его растяжению.",
      },
    ],
    priceLabel: "VIP-пакет «Все включено»",
    euPriceLabel: "цена в ЕС:",
    whatsappBtn: "Консультация бариатра в WhatsApp",
  },
  es: {
    tag: "CENTRO DE CIRUGÍA BARIÁTRICA Y METABÓLICA COSMETOCITY.COM",
    title: "Cirugía Bariátrica en Antalya y Estambul (Manga Gástrica, Bypass y Balón)",
    subtitle:
      "Integrado directamente desde cosmetocity.com: cirugía laparoscópica de obesidad en hospitales acreditados con grapadoras estadounidenses Covidien/Ethicon, 3 noches de hospital, hotel 5★ y 1 año de seguimiento nutricional.",
    surgeonsBannerTitle:
      "Realizado por los Cirujanos Bariátricos Certificados de CosmetoCity",
    surgeonsBannerDesc:
      "Prof. Dr. Burhan Mayir (Antalya • +20 años de experiencia laparoscópica), Dr. Direnç Yiğit (Antalya • Cirugía Gastroenterológica y Metabólica) y Op. Dr. Mehmet Altan Kaya (Estambul).",
    packageIncludesTitle:
      "¿Qué Incluye Cada Paquete Bariátrico VIP Todo Incluido?",
    packageInclusions: [
      {
        title: "Chequeo Preoperatorio Completo",
        desc: "Analítica completa, endoscopia digestiva, ecografía abdominal, rayos X, ECG y valoración por cardiología, neumología y anestesia.",
      },
      {
        title: "3 Noches de Hospitalización VIP",
        desc: "Suite privada de hospital (estancia y comidas gratis para 1 acompañante), respaldo UCI 24/7, grapadoras EE.UU. y triple prueba de fuga.",
      },
      {
        title: "Hotel 5★ y Traslados VIP Aeropuerto",
        desc: "2–3 noches en hotel 5 estrellas en Lara con visita diaria de enfermería privada y todos los traslados en Mercedes VIP.",
      },
      {
        title: "1 Año de Nutricionista y Kit Postoperatorio",
        desc: "Medicamentos, batidos proteicos, medias de compresión, certificado Fit-to-Fly y 12 meses de seguimiento con nutricionista bariátrico.",
      },
    ],
    faqTitle: "Preguntas Frecuentes sobre Cirugía Bariátrica (cosmetocity.com)",
    faqs: [
      {
        q: "Manga Gástrica vs. Bypass Gástrico: ¿Cuál es la mejor opción para mí?",
        a: "La Manga Gástrica reduce el ~80% del estómago y disminuye la hormona del apetito (ideal para IMC 30–45). El Bypass Gástrico añade malabsorción calórica y es el tratamiento de elección en pacientes con diabetes tipo 2 severa o reflujo gastroesofágico.",
      },
      {
        q: "¿Es seguro caminar después de la cirugía y cuándo puedo volar a casa?",
        a: "¡Sí! Tan solo 4 horas después de la cirugía laparoscópica caminará en su habitación con ayuda de enfermería. Tras 3 noches en el hospital y 2–3 noches en su hotel 5★, podrá volar a casa con seguridad al 5.º o 6.º día.",
      },
      {
        q: "¿Pueden las bebidas con gas dilatar el estómago tras una Manga Gástrica?",
        a: "Sí; nuestros nutricionistas recomiendan evitar las bebidas carbonatadas porque el gas genera presión sobre el nuevo reservorio gástrico y puede favorecer su dilatación a largo plazo.",
      },
    ],
    priceLabel: "Paquete VIP Todo Incluido",
    euPriceLabel: "vs. Europa:",
    whatsappBtn: "Valoración Bariátrica por WhatsApp",
  },
  ar: {
    tag: "مركز جراحات السمنة والمناظير المعتمد • COSMETOCITY.COM",
    title: "جراحات السمنة في أنطاليا وإسطنبول (تكميم المعدة، تحويل المسار، البالون)",
    subtitle:
      "برامج معتمدة مباشرة من cosmetocity.com: جراحات السمنة بالمنظار الدقيق في مستشفيات متكاملة باستخدام الدباسات الأمريكية الأصلية (Covidien/Ethicon)، إقامة 3 ليالٍ بالمستشفى وفندق 5 نجوم، ومتابعة تغذية لمدة عام كامل.",
    surgeonsBannerTitle:
      "تُجرى العمليات على يد نخبة استشاريي جراحات السمنة في CosmetoCity",
    surgeonsBannerDesc:
      "البروفيسور د. برهان مايير (أنطاليا • خبرة أكثر من 20 عاماً في جراحات السمنة بالمنظار)، د. ديرينتش يغيت (أنطاليا • استشاري جراحة الجهاز الهضمي والسمنة)، والدكتور محمد ألتان كايا (إسطنبول).",
    packageIncludesTitle:
      "ماذا تشمل باقة جراحات السمنة الشاملة كلياً (VIP All-Inclusive)؟",
    packageInclusions: [
      {
        title: "فحوصات شاملة قبل العملية",
        desc: "تحاليل دم شاملة، منظار للمعدة، سونار للبطن، أشعة صدر، تخطيط قلب، واستشارات أطباء القلب والصدرية والتخدير.",
      },
      {
        title: "إقامة 3 ليالٍ في جناح خاص بالمستشفى",
        desc: "غرفة VIP خاصة بالمستشفى (شاملة إقامة ووجبات مجانية لمرافق واحد)، رعاية مركزة 24/7، دباسات أمريكية و3 اختبارات أمان للتسريب.",
      },
      {
        title: "فندق 5 نجوم وتنقلات VIP من المطار",
        desc: "إقامة 2–3 ليالٍ في فندق 5 نجوم بشاطئ لارا مع زيارة يومية من ممرضة خاصة وكافة التنقلات بسيارة مرسيدس VIP.",
      },
      {
        title: "متابعة تغذية لمدة عام وحقيبة الأدوية",
        desc: "الأدوية، مكملات البروتين، الجوارب الطبية، شهادة السفر بالطائرة (Fit-to-Fly)، ومتابعة مستمرة لمدة 12 شهراً مع أخصائي التغذية.",
      },
    ],
    faqTitle: "الأسئلة الأكثر شيوعاً حول جراحات السمنة (من cosmetocity.com)",
    faqs: [
      {
        q: "ما الفرق بين تكميم المعدة وتحويل مسار المعدة، وأيهما أنسب لي؟",
        a: "تكميم المعدة يزيل حوالي 80% من حجم المعدة لتقليل الشهية وهو مثالي لمعظم المرضى (كتلة الجسم 30–45). أما تحويل المسار فيقلل أيضاً امتصاص السعرات والسكريات ويُنصح به بشدة لمرضى السكري من النوع الثاني أو ارتجاع المريء المزمن.",
      },
      {
        q: "هل يمكنني المشي بعد العملية مباشرة ومتى يمكنني السفر بالطائرة؟",
        a: "نعم! بعد 4 ساعات فقط من العملية بالمنظار يساعدك الفريق التمريضي على المشي داخل غرفتك لتنشيط الدورة الدموية. وبعد 3 ليالٍ في المستشفى و2–3 ليالٍ في الفندق يمكنك السفر بأمان في اليوم الخامس أو السادس.",
      },
      {
        q: "هل المشروبات الغازية تؤدي إلى توسع المعدة بعد التكميم؟",
        a: "نعم، ينصح أخصائيو التغذية لدينا بتجنب المشروبات الغازية لأن الغازات تشكل ضغطاً على المعدة المكممة وقد تؤدي إلى تمددها بمرور الوقت.",
      },
    ],
    priceLabel: "باقة VIP شاملة كلياً",
    euPriceLabel: "مقارنة بالخارج:",
    whatsappBtn: "اطلب تقييم جراحة السمنة عبر واتساب",
  },
  fr: {
    tag: "CENTRE DE CHIRURGIE BARIATRIQUE & MÉTABOLIQUE COSMETOCITY.COM",
    title: "Chirurgie Bariatrique à Antalya & Istanbul (Sleeve, Bypass & Ballon)",
    subtitle:
      "Intégré directement depuis cosmetocity.com : chirurgie laparoscopique de l'obésité en hôpital accrédité avec agrafeuses américaines Covidien/Ethicon, 3 nuits d'hospitalisation, hôtel 5★ et 12 mois de suivi diététique.",
    surgeonsBannerTitle:
      "Réalisée par les Chirurgiens Bariatriques Certifiés de CosmetoCity",
    surgeonsBannerDesc:
      "Prof. Dr Burhan Mayir (Antalya • +20 ans d'expérience en cœlioscopie bariatrique), Dr Direnç Yiğit (Antalya • Chirurgie Gastro-intestinale & Métabolique) et Op. Dr Mehmet Altan Kaya (Istanbul).",
    packageIncludesTitle:
      "Qu'est-ce qui est inclus dans chaque Forfait Bariatrique VIP Tout Compris ?",
    packageInclusions: [
      {
        title: "Bilan Préopératoire Complet",
        desc: "Bilan sanguin complet, fibroscopie gastrique, échographie abdominale, radio pulmonaire, ECG et consultations cardiologie & anesthésie.",
      },
      {
        title: "3 Nuits d'Hospitalisation en Suite VIP",
        desc: "Chambre privée à l'hôpital (séjour et repas gratuits pour 1 accompagnateur), agrafeuses US Covidien/Ethicon & triple test d'étanchéité.",
      },
      {
        title: "Hôtel 5★ à Lara & Transferts VIP",
        desc: "2–3 nuits en hôtel 5 étoiles à Antalya-Lara avec visite quotidienne d'une infirmière privée et transferts aéroport en Mercedes VIP.",
      },
      {
        title: "Suivi Nutritionnel 1 An & Kit Post-Op",
        desc: "Médicaments post-op, shakers protéinés, bas de contention, certificat Fit-to-Fly et 12 mois de suivi par notre nutritionniste.",
      },
    ],
    faqTitle: "Questions Fréquentes sur la Chirurgie Bariatrique (cosmetocity.com)",
    faqs: [
      {
        q: "Sleeve Gastrectomie ou Bypass Gastrique : quelle intervention choisir ?",
        a: "La Sleeve réduit ~80 % du volume de l'estomac et diminue l'hormone de la faim (idéal pour IMC 30–45). Le Bypass ajoute une malabsorption calorique et est privilégié en cas de diabète de type 2 sévère ou de reflux gastro-œsophagien.",
      },
      {
        q: "Peut-on marcher après l'opération et quand peut-on reprendre l'avion ?",
        a: "Oui ! Dès 4 heures après l'intervention par cœlioscopie, vous marchez dans votre chambre avec l'équipe soignante. Après 3 nuits d'hôpital et 2–3 nuits à l'hôtel 5★, vous pouvez reprendre l'avion en toute sécurité au 5e ou 6e jour.",
      },
      {
        q: "Les boissons gazeuses peuvent-elles dilater l'estomac après une Sleeve ?",
        a: "Oui, nos diététiciens recommandent d'éviter les boissons gazeuses car le gaz exerce une pression sur la poche gastrique et peut favoriser sa dilatation à long terme.",
      },
    ],
    priceLabel: "Forfait VIP Tout Compris",
    euPriceLabel: "vs France / UE :",
    whatsappBtn: "Bilan Bariatrique Gratuit sur WhatsApp",
  },
  it: {
    tag: "CENTRO DI CHIRURGIA BARIATRICA E METABOLICA COSMETOCITY.COM",
    title: "Chirurgia Bariatrica ad Antalya e Istanbul (Sleeve, Bypass e Palloncino)",
    subtitle:
      "Integrato direttamente da cosmetocity.com: chirurgia laparoscopica dell'obesità in ospedali accreditati con suturatrici americane Covidien/Ethicon, 3 notti di degenza, hotel 5★ e 12 mesi di supporto nutrizionale.",
    surgeonsBannerTitle:
      "Eseguita dai Chirurghi Bariatrici Certificati di CosmetoCity",
    surgeonsBannerDesc:
      "Prof. Dr. Burhan Mayir (Antalya • +20 anni di esperienza laparoscopica), Dr. Direnç Yiğit (Antalya • Chirurgia Gastroenterologica e Metabolica) e Op. Dr. Mehmet Altan Kaya (Istanbul).",
    packageIncludesTitle:
      "Cosa Include Ogni Pacchetto Bariatrico VIP Tutto Incluso?",
    packageInclusions: [
      {
        title: "Check-Up Pre-Operatorio Completo",
        desc: "Esami del sangue completi, gastroscopia, ecografia addominale, RX torace, ECG e visite cardiologica, pneumologica e anestesiologica.",
      },
      {
        title: "3 Notti di Degenza in Suite Ospedaliera",
        desc: "Camera VIP privata (soggiorno e pasti gratuiti per 1 accompagnatore), terapia intensiva 24/7, suturatrici USA e triplo test di tenuta.",
      },
      {
        title: "Hotel 5★ a Lara e Transfer VIP",
        desc: "2–3 notti in hotel 5 stelle ad Antalya-Lara con controllo infermieristico giornaliero e trasferimenti aeroportuali in Mercedes VIP.",
      },
      {
        title: "1 Anno di Nutrizionista e Kit Post-Op",
        desc: "Farmaci post-operatori, integratori proteici, calze antitrombo, certificato Fit-to-Fly e 12 mesi di follow-up nutrizionale.",
      },
    ],
    faqTitle: "Domande Frequenti sulla Chirurgia Bariatrica (da cosmetocity.com)",
    faqs: [
      {
        q: "Sleeve Gastrectomy vs. Bypass Gastrico: quale intervento è adatto a me?",
        a: "La Sleeve Gastrectomy riduce circa l'80% dello stomaco abbassando l'ormone della fame (ideale per BMI 30–45). Il Bypass Gastrico riduce anche l'assorbimento calorico ed è indicato in presenza di diabete di tipo 2 o reflusso gastroesofageo severo.",
      },
      {
        q: "Posso camminare subito dopo l'intervento e quando posso prendere l'aereo?",
        a: "Sì! Già 4 ore dopo l'intervento laparoscopico camminerai in camera con l'assistenza infermieristica. Dopo 3 notti in ospedale e 2–3 notti in hotel 5★, potrai volare a casa in sicurezza al 5° o 6° giorno.",
      },
      {
        q: "Le bevande gassate possono dilatare lo stomaco dopo la Sleeve?",
        a: "Sì, i nostri nutrizionisti consigliano di evitare le bevande gassate poiché l'anidride carbonica crea pressione sulla tasca gastrica e nel tempo può favorirne la dilatazione.",
      },
    ],
    priceLabel: "Pacchetto VIP Tutto Incluso",
    euPriceLabel: "vs Italia / UE:",
    whatsappBtn: "Valutazione Bariatrica su WhatsApp",
  },
};

export default function BariatricSurgerySection({
  locale,
  selectedCity,
  currencyConfig = DEFAULT_CURRENCY_CONFIG,
}: BariatricSurgerySectionProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number>(0);
  const copy = BARIATRIC_SECTION_COPY[locale];
  const isRtl = isRtlLocale(locale);
  const { currency, rates } = currencyConfig;

  return (
    <section
      id="bariatric-surgery"
      dir={isRtl ? "rtl" : "ltr"}
      className="py-16 sm:py-24 bg-cosmeto-sand/70 border-t border-cosmeto-sandBorder"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cosmeto-teal/15 text-cosmeto-tealDark text-xs font-extrabold tracking-widest uppercase mb-3 border border-cosmeto-teal/30">
            <Scale className="w-4 h-4 text-cosmeto-green" />
            <span>{copy.tag}</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-cosmeto-charcoal mb-3">
            {copy.title}
          </h2>
          <div className="w-16 h-1 bg-cosmeto-green mx-auto mb-4 rounded-full" />
          <p className="text-cosmeto-body text-sm sm:text-base leading-relaxed">
            {copy.subtitle}
          </p>
        </div>

        {/* Hero Visual + Bariatric Surgeons Banner (Prof. Dr. Burhan Mayir, Dr. Direnç Yiğit, Op. Dr. Mehmet Altan Kaya) */}
        <div className="rounded-3xl bg-gradient-to-br from-cosmeto-charcoal via-[#1C363B] to-cosmeto-tealDark text-white p-6 sm:p-8 lg:p-10 border-2 border-cosmeto-green/60 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 rounded-2xl overflow-hidden border-2 border-white/20 bg-cosmeto-charcoal aspect-[16/11]">
            <img
              src="/images/bariatric-surgery-antalya.svg"
              alt={copy.title}
              loading="lazy"
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cosmeto-green/20 border border-cosmeto-green/40 text-cosmeto-sand text-xs font-bold uppercase tracking-wider">
              <Award className="w-4 h-4 text-cosmeto-green" />
              <span>cosmetocity.com Accredited Bariatric Board</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold leading-snug">
              {copy.surgeonsBannerTitle}
            </h3>

            <p className="text-sm sm:text-base text-cosmeto-ice leading-relaxed">
              {copy.surgeonsBannerDesc}
            </p>

            {/* 4 Key Package Inclusions Mini Grid */}
            <div className="pt-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-cosmeto-sand mb-3">
                {copy.packageIncludesTitle}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {copy.packageInclusions.map((inc, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm space-y-1"
                  >
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white">
                      {idx === 0 && (
                        <Stethoscope className="w-4 h-4 text-cosmeto-green shrink-0" />
                      )}
                      {idx === 1 && (
                        <HeartPulse className="w-4 h-4 text-cosmeto-green shrink-0" />
                      )}
                      {idx === 2 && (
                        <Hotel className="w-4 h-4 text-cosmeto-green shrink-0" />
                      )}
                      {idx === 3 && (
                        <Utensils className="w-4 h-4 text-cosmeto-green shrink-0" />
                      )}
                      <span>{inc.title}</span>
                    </div>
                    <p className="text-xs text-cosmeto-ice leading-relaxed">
                      {inc.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Bariatric Procedures Cards (Gastric Sleeve, Gastric Bypass, Gastric Balloon) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {BARIATRIC_PROCEDURES.map((proc) => (
            <article
              key={proc.id}
              className="bg-white rounded-3xl border-2 border-cosmeto-green/60 hover:border-cosmeto-teal shadow-md hover:shadow-xl transition flex flex-col justify-between overflow-hidden"
            >
              <div className="p-6 sm:p-7 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-cosmeto-green/15 text-cosmeto-greenDark text-[11px] font-extrabold uppercase tracking-wider">
                    {proc.badge[locale]}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-cosmeto-sand text-cosmeto-teal font-bold text-xs">
                    {proc.bmiRequirement}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-cosmeto-charcoal leading-snug">
                  {proc.title[locale]}
                </h3>

                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <div className="p-2.5 rounded-xl bg-cosmeto-sandLight border border-cosmeto-sandBorder text-cosmeto-greenDark flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5 text-cosmeto-green shrink-0" />
                    <span>{proc.weightLossTarget[locale]}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-cosmeto-sandLight border border-cosmeto-sandBorder text-cosmeto-teal flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cosmeto-teal shrink-0" />
                    <span>{proc.hospitalNights[locale]}</span>
                  </div>
                </div>

                <p className="text-sm text-cosmeto-body leading-relaxed">
                  {proc.description[locale]}
                </p>

                <ul className="space-y-2 pt-1">
                  {proc.highlights[locale].map((pt, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs sm:text-sm font-semibold text-cosmeto-charcoal"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cosmeto-green shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer with Live Currency Conversion & Direct WhatsApp Inquiry */}
              <div className="p-6 pt-4 border-t border-cosmeto-sandBorder bg-cosmeto-sand/60 space-y-3">
                <div className="flex items-baseline justify-between gap-2">
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-cosmeto-teal font-bold">
                      {copy.priceLabel}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-extrabold text-cosmeto-greenDark">
                        {formatConvertedPrice(
                          proc.basePriceEur,
                          currency,
                          rates
                        )}
                      </span>
                      <span className="text-xs text-cosmeto-body">
                        {copy.euPriceLabel}{" "}
                        <span className="line-through">
                          {formatConvertedPrice(
                            proc.baseComparisonEur,
                            currency,
                            rates
                          )}
                        </span>
                      </span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cosmeto-green/15 text-cosmeto-greenDark text-[11px] font-bold">
                    <Car className="w-3.5 h-3.5" />
                    VIP
                  </span>
                </div>

                <a
                  href={buildWhatsAppLink(
                    locale,
                    proc.title[locale],
                    selectedCity
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackWhatsAppClick({
                      source: `bariatric_section_${proc.id}`,
                      topic: proc.title[locale],
                      city: selectedCity,
                      locale,
                    })
                  }
                  className="w-full py-3.5 px-4 rounded-xl bg-cosmeto-green hover:bg-cosmeto-teal text-white font-bold text-xs sm:text-sm transition shadow flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>{copy.whatsappBtn}</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Bariatric FAQ Accordion (Sourced from cosmetocity.com educational guides) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border-2 border-cosmeto-sandBorder shadow-md space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cosmeto-green/15 text-cosmeto-green flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-cosmeto-charcoal">
              {copy.faqTitle}
            </h3>
          </div>

          <div className="space-y-3">
            {copy.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-cosmeto-sandBorder overflow-hidden bg-cosmeto-sandLight/60"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-cosmeto-charcoal hover:bg-cosmeto-sand/60 transition"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-cosmeto-teal shrink-0 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-cosmeto-body leading-relaxed border-t border-cosmeto-sandBorder bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
