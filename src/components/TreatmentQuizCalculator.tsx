"use client";

import React, { useState } from "react";
import {
  Sparkles,
  UserCheck,
  Smile,
  Stethoscope,
  ShieldCheck,
  MessageCircle,
  Camera,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Plane,
  Hotel,
  Calendar,
  BadgePercent,
} from "lucide-react";
import {
  Locale,
  CityOption,
  WHATSAPP_NUMBER,
  isRtlLocale,
} from "@/data/content";
import { trackWhatsAppClick } from "@/lib/analytics";

interface TreatmentQuizCalculatorProps {
  locale: Locale;
  selectedCity: CityOption;
  onCityChange?: (city: CityOption) => void;
}

type TreatmentCategoryKey =
  | "hair"
  | "dental"
  | "breast"
  | "rhinoplasty"
  | "other";

interface QuizOption {
  id: string;
  label: Record<Locale, string>;
  subLabel?: Record<Locale, string>;
}

const STEP1_TREATMENTS: {
  key: TreatmentCategoryKey;
  priceGBP: string;
  priceEUR: string;
  ukEuPrice: string;
  label: Record<Locale, string>;
  subLabel: Record<Locale, string>;
}[] = [
  {
    key: "hair",
    priceGBP: "£1,690",
    priceEUR: "€1,990",
    ukEuPrice: "£6,500 / €7,500",
    label: {
      en: "Hair Transplant (Sapphire FUE & DHI)",
      de: "Haartransplantation (Saphir FUE & DHI)",
      ru: "Пересадка волос (Сапфир FUE и DHI)",
      es: "Injerto Capilar (Zafiro FUE y DHI)",
      ar: "زراعة الشعر (تقنية السفير FUE و DHI)",
      fr: "Greffe de Cheveux (Saphir FUE & DHI)",
      it: "Trapianto di Capelli (Zaffiro FUE & DHI)",
    },
    subLabel: {
      en: "Maximum density up to 5,000+ grafts + PRP + 5★ Hotel",
      de: "Maximale Dichte bis 5.000+ Grafts + PRP + 5★ Hotel",
      ru: "Максимальная густота до 5 000+ графтов + PRP + Отель 5★",
      es: "Máxima densidad hasta 5.000+ folículos + PRP + Hotel 5★",
      ar: "أقصى كثافة حتى +5,000 بصيلة + جلسة PRP + فندق 5 نجوم",
      fr: "Densité maximale jusqu'à 5 000+ greffons + PRP + Hôtel 5★",
      it: "Massima densità fino a 5.000+ bulbi + PRP + Hotel 5★",
    },
  },
  {
    key: "dental",
    priceGBP: "£2,550",
    priceEUR: "€2,950",
    ukEuPrice: "£11,500 / €13,500",
    label: {
      en: "Dental Aesthetics (Hollywood Smile & Implants)",
      de: "Zahnästhetik (Hollywood Smile & Implantate)",
      ru: "Эстетическая стоматология (Голливудская улыбка)",
      es: "Estética Dental (Hollywood Smile e Implantes)",
      ar: "تجميل الأسنان (ابتسامة هوليوود وزراعة الأسنان)",
      fr: "Esthétique Dentaire (Hollywood Smile & Implants)",
      it: "Estetica Dentale (Hollywood Smile & Impianti)",
    },
    subLabel: {
      en: "Swiss Ivoclar E-Max Veneers, Zirconium Crowns & Straumann Implants",
      de: "Schweizer Ivoclar E-Max Veneers, Zirkonkronen & Straumann",
      ru: "Швейцарские виниры E-Max, цирконий и импланты Straumann",
      es: "Carillas Suizas E-Max, Circonio e Implantes Straumann",
      ar: "عدسات إيماكس السويسرية، تيجان الزيركون وزراعة شتراومان",
      fr: "Facettes Suisses E-Max, Zircone & Implants Straumann",
      it: "Faccette Svizzere E-Max, Zirconio e Impianti Straumann",
    },
  },
  {
    key: "breast",
    priceGBP: "£2,450",
    priceEUR: "€2,850",
    ukEuPrice: "£7,800 / €9,200",
    label: {
      en: "Breast Aesthetics (Augmentation / Lift)",
      de: "Brustästhetik (Vergrößerung / Straffung)",
      ru: "Пластика груди (Увеличение / Подтяжка)",
      es: "Estética Mamaria (Aumento / Elevación)",
      ar: "تجميل الصدر (تكبير / شد الصدر)",
      fr: "Esthétique Mammaire (Augmentation / Lifting)",
      it: "Chirurgia del Seno (Mastoplastica Additiva / Lifting)",
    },
    subLabel: {
      en: "FDA-Approved Motiva® & Mentor® Implants at OFM Hospital",
      de: "FDA-zertifizierte Motiva® & Mentor® Implantate im OFM Hospital",
      ru: "Сертифицированные FDA импланты Motiva® и Mentor® в госпитале OFM",
      es: "Implantes Motiva® y Mentor® aprobados por FDA en Hospital OFM",
      ar: "حشوات Motiva® و Mentor® المعتمدة من FDA في مستشفى OFM",
      fr: "Implants Motiva® & Mentor® certifiés FDA à l'Hôpital OFM",
      it: "Protesi Motiva® e Mentor® approvate FDA presso l'Ospedale OFM",
    },
  },
  {
    key: "rhinoplasty",
    priceGBP: "£2,150",
    priceEUR: "€2,490",
    ukEuPrice: "£7,200 / €8,500",
    label: {
      en: "Ultrasonic Piezo Rhinoplasty (Nose Reshaping)",
      de: "Ultraschall-Piezo-Rhinoplastik (Nasenkorrektur)",
      ru: "Ультразвуковая ринопластика Piezo (Пластика носа)",
      es: "Rinoplastia Ultrasónica Piezo (Cirugía Nasal)",
      ar: "تجميل الأنف بالموجات فوق الصوتية (Piezo)",
      fr: "Rhinoplastie Ultrasonique Piezo (Chirurgie du Nez)",
      it: "Rinoplastica Ultrasonica Piezo (Rimodellamento Naso)",
    },
    subLabel: {
      en: "Atraumatic soundwave bone sculpting with minimal bruising",
      de: "Gewebeschonende Ultraschall-Modellierung ohne Hammer & Meißel",
      ru: "Атравматичная ультразвуковая коррекция без синяков и тампонов",
      es: "Esculpido ultrasónico de alta precisión con mínima inflamación",
      ar: "نحت دقيق بالموجات فوق الصوتية بأقل قدر من الكدمات والتورم",
      fr: "Remodelage ultrasonique de haute précision sans ecchymoses",
      it: "Rimodellamento ultrasonico ad alta precisione con minimo gonfiore",
    },
  },
  {
    key: "other",
    priceGBP: "£1,950",
    priceEUR: "€2,290",
    ukEuPrice: "£6,900 / €8,000",
    label: {
      en: "Vaser Liposuction, Tummy Tuck or Facial Aesthetics",
      de: "Vaser-Liposuktion, Bauchdeckenstraffung oder Facelift",
      ru: "Липосакция Vaser, абдоминопластика или подтяжка лица",
      es: "Liposucción Vaser, Abdominoplastia o Lifting Facial",
      ar: "نحت الجسم بالفيزر، شد البطن أو تجميل الوجه",
      fr: "Liposuccion Vaser, Abdominoplastie ou Lifting Facial",
      it: "Liposuzione Vaser, Addominoplastica o Lifting Viso",
    },
    subLabel: {
      en: "Custom body contouring & facial rejuvenation in Antalya",
      de: "Individuelle Körperformung & Gesichtsverjüngung in Antalya",
      ru: "Индивидуальная коррекция фигуры и омоложение в Анталье",
      es: "Contorno corporal personalizado y rejuvenecimiento en Antalya",
      ar: "نحت الجسم المتقدم وتجديد شباب الوجه في أنطاليا",
      fr: "Remodelage corporel sur mesure & rajeunissement à Antalya",
      it: "Rimodellamento corporeo su misura e ringiovanimento ad Antalya",
    },
  },
];

const STEP2_CLINICAL_DETAILS: Record<TreatmentCategoryKey, QuizOption[]> = {
  hair: [
    {
      id: "frontal-hairline",
      label: {
        en: "Receding Hairline & Temples (2,000 – 3,000 Grafts)",
        de: "Geheimratsecken & Haarlinie (2.000 – 3.000 Grafts)",
        ru: "Линия лба и залысины (2 000 – 3 000 графтов)",
        es: "Entradas y Línea Frontal (2.000 – 3.000 Folículos)",
        ar: "تراجع خط الجبهة والجانبين (2,000 – 3,000 بصيلة)",
        fr: "Golfs & Ligne Frontale (2 000 – 3 000 Greffons)",
        it: "Stempiatura e Linea Frontale (2.000 – 3.000 Bulbi)",
      },
    },
    {
      id: "frontal-plus-crown",
      label: {
        en: "Front + Mid-Scalp & Crown (3,500 – 4,500 Grafts)",
        de: "Front + Oberkopf & Tonsur (3.500 – 4.500 Grafts)",
        ru: "Передняя зона + макушка (3 500 – 4 500 графтов)",
        es: "Frontal + Zona Media y Coronilla (3.500 – 4.500 Folículos)",
        ar: "المقدمة + وسط الرأس والتاج (3,500 – 4,500 بصيلة)",
        fr: "Front + Milieu & Vertex (3 500 – 4 500 Greffons)",
        it: "Frontale + Zona Centrale e Vertice (3.500 – 4.500 Bulbi)",
      },
    },
    {
      id: "max-coverage-unshaven-dhi",
      label: {
        en: "Maximum Coverage / Unshaven DHI (Up to 5,000+ Grafts)",
        de: "Maximale Abdeckung / DHI ohne Rasur (Bis 5.000+ Grafts)",
        ru: "Максимальное покрытие / DHI без бритья (До 5 000+ графтов)",
        es: "Cobertura Máxima / DHI sin rapar (Hasta 5.000+ Folículos)",
        ar: "تغطية كاملة قصوى / تقنية DHI بدون حلاقة (+5,000 بصيلة)",
        fr: "Couverture Maximale / DHI sans rasage (Jusqu'à 5 000+ Greffons)",
        it: "Copertura Massima / DHI senza rasatura (Fino a 5.000+ Bulbi)",
      },
    },
  ],
  dental: [
    {
      id: "hollywood-smile-20-emax",
      label: {
        en: "Full Hollywood Smile (16–20 Swiss Ivoclar E-Max Veneers)",
        de: "Komplettes Hollywood Smile (16–20 Schweizer E-Max Veneers)",
        ru: "Полная Голливудская улыбка (16–20 швейцарских виниров E-Max)",
        es: "Hollywood Smile Completo (16–20 Carillas Suizas E-Max)",
        ar: "ابتسامة هوليوود الكاملة (16–20 عدسة إيماكس سويسرية)",
        fr: "Hollywood Smile Complet (16–20 Facettes Suisses E-Max)",
        it: "Hollywood Smile Completo (16–20 Faccette Svizzere E-Max)",
      },
    },
    {
      id: "zirconium-crowns-bridge",
      label: {
        en: "German Zirconium Crowns & Aesthetic Smile Restoration",
        de: "Deutsche Zirkonkronen & Komplett-Restauration",
        ru: "Немецкие циркониевые коронки и эстетическая реставрация",
        es: "Coronas de Circonio Alemán y Restauración Dental",
        ar: "تيجان الزيركون الألماني وإعادة تأهيل الابتسامة",
        fr: "Couronnes en Zircone Allemande & Restauration Complète",
        it: "Corone in Zirconio Tedesco e Riabilitazione Estetica",
      },
    },
    {
      id: "dental-implants-all-on-4",
      label: {
        en: "Straumann® / Nobel® Dental Implants (Single or All-on-4 / 6)",
        de: "Straumann® / Nobel® Zahnimplantate (Einzeln oder All-on-4 / 6)",
        ru: "Импланты Straumann® / Nobel® (Одиночные или All-on-4 / 6)",
        es: "Implantes Straumann® / Nobel® (Unitarios o All-on-4 / 6)",
        ar: "زراعة الأسنان السويسرية Straumann® / Nobel® (فورية أو All-on-4)",
        fr: "Implants Dentaires Straumann® / Nobel® (Unitaire ou All-on-4 / 6)",
        it: "Impianti Dentali Straumann® / Nobel® (Singoli o All-on-4 / 6)",
      },
    },
  ],
  breast: [
    {
      id: "breast-augmentation-motiva",
      label: {
        en: "Breast Augmentation (Motiva® / Mentor® Silicone Implants)",
        de: "Brustvergrößerung (Motiva® / Mentor® Silikonimplantate)",
        ru: "Увеличение груди (Импланты Motiva® / Mentor®)",
        es: "Aumento de Pecho (Implantes Motiva® / Mentor®)",
        ar: "تكبير الصدر (حشوات سيليكون Motiva® / Mentor®)",
        fr: "Augmentation Mammaire (Prothèses Motiva® / Mentor®)",
        it: "Mastoplastica Additiva (Protesi Motiva® / Mentor®)",
      },
    },
    {
      id: "breast-lift-mastopexy",
      label: {
        en: "Breast Lift (Mastopexy — With or Without Implants)",
        de: "Bruststraffung (Mastopexie — mit oder ohne Implantat)",
        ru: "Подтяжка груди (Мастопексия — с имплантами или без)",
        es: "Elevación de Pecho (Mastopexia — con o sin implantes)",
        ar: "شد الصدر (مع حشوات سيليكون أو بدونها)",
        fr: "Lifting Mammaire (Mastopexie — avec ou sans prothèses)",
        it: "Mastopessi / Lifting del Seno (con o senza protesi)",
      },
    },
    {
      id: "breast-reduction",
      label: {
        en: "Breast Reduction & Symmetry Reshaping",
        de: "Brustverkleinerung & Symmetrie-Korrektur",
        ru: "Уменьшение груди и коррекция асимметрии",
        es: "Reducción Mamaria y Simetrización",
        ar: "تصغير الصدر وتصحيح التناسق",
        fr: "Réduction Mammaire & Correction de Symétrie",
        it: "Mastoplastica Riduttiva e Simmetrizzazione",
      },
    },
  ],
  rhinoplasty: [
    {
      id: "primary-ultrasonic-piezo",
      label: {
        en: "Primary Ultrasonic Piezo Rhinoplasty (Bridge & Tip Refinement)",
        de: "Primäre Ultraschall-Piezo-Rhinoplastik (Höcker & Nasenspitze)",
        ru: "Первичная ультразвуковая ринопластика Piezo (Спинка и кончик)",
        es: "Rinoplastia Primaria Ultrasónica Piezo (Dorso y Punta)",
        ar: "تجميل الأنف الأولي بالموجات فوق الصوتية Piezo (جسر وأرنبة الأنف)",
        fr: "Rhinoplastie Primaire Ultrasonique Piezo (Bosse & Pointe)",
        it: "Rinoplastica Primaria Ultrasonica Piezo (Dorso e Punta)",
      },
    },
    {
      id: "septorhinoplasty-breathing",
      label: {
        en: "Functional Septorhinoplasty (Aesthetic + Breathing Correction)",
        de: "Funktionelle Septorhinoplastik (Ästhetik + Nasenscheidewand)",
        ru: "Септоринопластика (Эстетика + исправление перегородки и дыхания)",
        es: "Septorrinoplastia Funcional (Estética + Mejora Respiratoria)",
        ar: "تجميل الأنف الوظيفي وتعديل انحراف الحاجز الأنفي للتنفس",
        fr: "Septorhinoplastie Fonctionnelle (Esthétique + Respiration)",
        it: "Settorinoplastica Funzionale (Estetica + Correzione Respiro)",
      },
    },
    {
      id: "revision-ethnic-rhinoplasty",
      label: {
        en: "Revision or Ethnic Rhinoplasty (Advanced Cartilage Sculpting)",
        de: "Revisions- oder Ethnische Rhinoplastik (Spezial-Knorpelaufbau)",
        ru: "Вторичная (ревизионная) или этническая ринопластика",
        es: "Rinoplastia Secundaria (Revisión) o Étnica",
        ar: "تجميل الأنف التصحيحي (إعادة) أو النحت الغضروفي المتقدم",
        fr: "Rhinoplastie Secondaire (Révision) ou Ethnique",
        it: "Rinoplastica Secondaria (di Revisione) o Etnica",
      },
    },
  ],
  other: [
    {
      id: "vaser-lipo-360",
      label: {
        en: "Vaser Hi-Def Liposuction 360° & Body Sculpting",
        de: "Vaser Hi-Def Liposuktion 360° & Körperformung",
        ru: "Липосакция Vaser 360° и скульптурирование тела",
        es: "Liposucción Vaser 360° de Alta Definición",
        ar: "نحت الجسم رباعي الأبعاد وشفط الدهون بالفيزر 360°",
        fr: "Liposuccion Vaser 360° Haute Définition",
        it: "Liposuzione Vaser 360° ad Alta Definizione",
      },
    },
    {
      id: "tummy-tuck-mommy-makeover",
      label: {
        en: "Tummy Tuck (Abdominoplasty) / Mommy Makeover",
        de: "Bauchdeckenstraffung (Abdominoplastik) / Mommy Makeover",
        ru: "Абдоминопластика (Пластика живота) / Mommy Makeover",
        es: "Abdominoplastia / Mommy Makeover Completo",
        ar: "شد البطن الجراحي أو التجميل الشامل بعد الولادة (Mommy Makeover)",
        fr: "Abdominoplastie / Mommy Makeover Complet",
        it: "Addominoplastica / Mommy Makeover Completo",
      },
    },
    {
      id: "facelift-blepharoplasty",
      label: {
        en: "Deep-Plane Facelift, Eyelid Surgery (Blepharoplasty) or Morpheus8",
        de: "Deep-Plane Facelift, Lidstraffung (Blepharoplastik) oder Morpheus8",
        ru: "Подтяжка лица (Фейслифтинг), блефаропластика или Morpheus8",
        es: "Lifting Facial, Blefaroplastia (Párpados) o Morpheus8",
        ar: "شد الوجه والرقبة، تجميل الجفون أو الإجراءات غير الجراحية",
        fr: "Lifting Cervico-Facial, Blépharoplastie ou Morpheus8",
        it: "Lifting Facciale, Blefaroplastica (Palpebre) o Morpheus8",
      },
    },
  ],
};

const STEP3_HOSPITALITY: QuizOption[] = [
  {
    id: "antalya-5star-lara-solo",
    label: {
      en: "🏖️ Antalya 5-Star Lara Beach Hotel + VIP Transfers (Solo Patient)",
      de: "🏖️ Antalya 5-Sterne-Strandhotel in Lara + VIP-Transfers (1 Person)",
      ru: "🏖️ Анталья: Отель 5★ на пляже Лара + VIP-трансфер (1 пациент)",
      es: "🏖️ Antalya: Hotel 5★ en Playa de Lara + Traslados VIP (Individual)",
      ar: "🏖️ أنطاليا: فندق 5 نجوم على شاطئ لارا + نقل VIP (مريض منفرد)",
      fr: "🏖️ Antalya : Hôtel 5★ Plage de Lara + Transferts VIP (Solo)",
      it: "🏖️ Antalya: Hotel 5★ Spiaggia di Lara + Transfer VIP (Singolo)",
    },
  },
  {
    id: "antalya-5star-lara-companion",
    label: {
      en: "🏖️ Antalya 5-Star Lara Hotel + Free Companion Stay Included",
      de: "🏖️ Antalya 5-Sterne-Hotel in Lara + Kostenlose Begleitperson im Zimmer",
      ru: "🏖️ Анталья: Отель 5★ в Ларе + Бесплатное проживание сопровождающего",
      es: "🏖️ Antalya: Hotel 5★ en Lara + Acompañante Gratis en la habitación",
      ar: "🏖️ أنطاليا: فندق 5 نجوم في لارا + إقامة مجانية لمرافق معك في الغرفة",
      fr: "🏖️ Antalya : Hôtel 5★ à Lara + Séjour Accompagnateur Gratuit inclus",
      it: "🏖️ Antalya: Hotel 5★ a Lara + Soggiorno Accompagnatore Gratuito",
    },
  },
  {
    id: "istanbul-vip-partner",
    label: {
      en: "🌉 Istanbul 5-Star Hotel + JCI Partner Hospital VIP Package",
      de: "🌉 Istanbul 5-Sterne-Hotel + JCI-Partnerklinik VIP-Paket",
      ru: "🌉 Стамбул: Отель 5★ + VIP-пакет в партнерском госпитале JCI",
      es: "🌉 Estambul: Hotel 5★ + Paquete VIP en Hospital Asociado JCI",
      ar: "🌉 إسطنبول: فندق 5 نجوم + باقة VIP في مستشفانا الشريك المعتمد",
      fr: "🌉 Istanbul : Hôtel 5★ + Forfait VIP Hôpital Partenaire JCI",
      it: "🌉 Istanbul: Hotel 5★ + Pacchetto VIP Ospedale Partner JCI",
    },
  },
];

const STEP4_TIMEFRAME: QuizOption[] = [
  {
    id: "within-1-month",
    label: {
      en: "Within the Next 30 Days (Fast-Track Priority Slot)",
      de: "Innerhalb der nächsten 30 Tage (Prioritäts-Termin)",
      ru: "В ближайшие 30 дней (Приоритетная запись)",
      es: "Dentro de los próximos 30 días (Cita Prioritaria)",
      ar: "خلال الـ 30 يوماً القادمة (حجز ذو أولوية سريعة)",
      fr: "Dans les 30 prochains jours (Créneau Prioritaire)",
      it: "Entro i prossimi 30 giorni (Appuntamento Prioritario)",
    },
  },
  {
    id: "within-1-to-3-months",
    label: {
      en: "In 1 to 3 Months (Locked with 3-Month Fixed Price Guarantee)",
      de: "In 1 bis 3 Monaten (Geschützt durch 3-Monate-Festpreisgarantie)",
      ru: "Через 1–3 месяца (С гарантией фиксированной цены на 3 месяца)",
      es: "En 1 a 3 meses (Protegido con Garantía de Precio Fijo de 3 Meses)",
      ar: "خلال 1 إلى 3 أشهر (محمي بضمان تثبيت السعر لمدة 3 أشهر)",
      fr: "Dans 1 à 3 mois (Protégé par la Garantie Prix Fixe 3 Mois)",
      it: "Tra 1 e 3 mesi (Protetto dalla Garanzia Prezzo Fisso 3 Mesi)",
    },
  },
  {
    id: "flexible-planning",
    label: {
      en: "Flexible / Researching Dates (Want to Lock Current Offer)",
      de: "Noch flexibel / In Planung (Aktuellen Paketpreis sichern)",
      ru: "Гибкие даты / Планирую отпуск (Хочу зафиксировать цену)",
      es: "Fechas flexibles / Planificando (Quiero bloquear la tarifa actual)",
      ar: "مواعيد مرنة / في مرحلة التخطيط (أرغب في تثبيت عرض السعر الحالي)",
      fr: "Dates flexibles / En réflexion (Je souhaite bloquer le tarif actuel)",
      it: "Date flessibili / In pianificazione (Voglio bloccare l'offerta attuale)",
    },
  },
];

interface QuizCopy {
  sectionTag: string;
  sectionTitle: string;
  sectionSubtitle: string;
  stepIndicator: (current: number, total: number) => string;
  stepTitles: [string, string, string, string, string];
  backBtn: string;
  restartBtn: string;
  estimatedPackageLabel: string;
  typicalHomePriceLabel: string;
  allInclusiveNote: string;
  fixedPriceBadge: string;
  fixedPriceSubtext: string;
  resultHeadline: string;
  resultPhotoPromptBeforeBold: string;
  resultPhotoPromptBold: string;
  resultPhotoPromptAfterBold: string;
  photoAnglesTitle: string;
  photoAngles: string[];
  whatsappCtaButton: string;
  whatsappCtaSubnote: string;
  summaryTreatmentLabel: string;
  summaryDetailLabel: string;
  summaryStayLabel: string;
  summaryTimingLabel: string;
  buildPreFilledWhatsAppMessage: (
    treatmentName: string,
    detailsSummary: string
  ) => string;
}

const QUIZ_COPY: Record<Locale, QuizCopy> = {
  en: {
    sectionTag: "INTERACTIVE TREATMENT & PRICE CALCULATOR (5-STEP QUIZ)",
    sectionTitle: "Calculate Your All-Inclusive Package & Lock Your Price",
    sectionSubtitle:
      "Answer 4 quick clinical questions in under 30 seconds to unlock your personalized Antalya (or Istanbul) treatment estimate with our 3-Month Fixed Price Guarantee.",
    stepIndicator: (c, t) => `Step ${c} of ${t}`,
    stepTitles: [
      "1. Which treatment are you interested in?",
      "2. Select your clinical goal or procedure scope:",
      "3. Choose your 5-star hotel & city preference:",
      "4. When are you planning your medical trip?",
      "5. Your Preliminary Assessment & 3-Month Price Lock",
    ],
    backBtn: "Previous Step",
    restartBtn: "Restart Calculator",
    estimatedPackageLabel: "Estimated All-Inclusive VIP Package",
    typicalHomePriceLabel: "Typical UK / EU Private Clinic:",
    allInclusiveNote:
      "Includes Accredited Hospital Procedure + 5-Star Hotel + VIP Airport Transfers + Native Translator + Aftercare Kit",
    fixedPriceBadge: "🔒 3-Month Fixed Price Guarantee",
    fixedPriceSubtext:
      "Lock in today's promotional package rate for the next 90 days—protected against seasonal hotel or flight surges.",
    resultHeadline: "Your Preliminary Assessment is Ready!",
    resultPhotoPromptBeforeBold:
      "Your preliminary assessment is ready! If you send us a few photos of your treatment area taken from different angles via WhatsApp, our medical team will review them and immediately share your personalized net quote with a ",
    resultPhotoPromptBold: "3-Month Fixed Price Guarantee",
    resultPhotoPromptAfterBold: ".",
    photoAnglesTitle: "Recommended Photos to Share on WhatsApp (100% Confidential):",
    photoAngles: [
      "Front & Side Profile View (or Front / Top / Back Donor for Hair)",
      "Clear Natural Lighting (No filters needed)",
      "Reviewed directly by our Chief Surgeon within 15 minutes",
    ],
    whatsappCtaButton:
      "Send Photos on WhatsApp & Claim 3-Month Fixed Price Guarantee",
    whatsappCtaSubnote:
      "Opens WhatsApp with your quiz summary pre-filled • Average reply < 5 mins",
    summaryTreatmentLabel: "Selected Treatment",
    summaryDetailLabel: "Clinical Scope",
    summaryStayLabel: "Hospitality & Hub",
    summaryTimingLabel: "Target Timeframe",
    buildPreFilledWhatsAppMessage: (treatmentName, detailsSummary) =>
      `Hello Cosmetocity, I completed the quiz on your website. The treatment I am interested in: ${treatmentName} (${detailsSummary}). I am sharing my photos from different angles for my quote with the 3-month fixed price guarantee.`,
  },
  de: {
    sectionTag: "INTERAKTIVER BEHANDLUNGS- & PREISRECHNER (5-SCHRITTE-QUIZ)",
    sectionTitle: "Berechnen Sie Ihr All-Inclusive-Paket & sichern Sie Ihren Festpreis",
    sectionSubtitle:
      "Beantworten Sie 4 kurze Fragen in 30 Sekunden, um Ihre individuelle Kostenschätzung für Antalya (oder Istanbul) inklusive 3-Monate-Festpreisgarantie zu erhalten.",
    stepIndicator: (c, t) => `Schritt ${c} von ${t}`,
    stepTitles: [
      "1. Für welche Behandlung interessieren Sie sich?",
      "2. Wählen Sie Ihren gewünschten Behandlungsumfang:",
      "3. Wählen Sie Ihr 5-Sterne-Hotel & Ihre Wunschstadt:",
      "4. Wann planen Sie Ihre Behandlungsreise?",
      "5. Ihre Vorab-Einschätzung & 3-Monate-Festpreisgarantie",
    ],
    backBtn: "Zurück",
    restartBtn: "Neu berechnen",
    estimatedPackageLabel: "Geschätztes All-Inclusive VIP-Paket",
    typicalHomePriceLabel: "Üblicher Klinikpreis in DE / AT / CH:",
    allInclusiveNote:
      "Inklusive Klinik-OP + 5-Sterne-Hotel + VIP-Flughafentransfer + Deutschsprachiger Betreuung + Nachsorge-Set",
    fixedPriceBadge: "🔒 3 Monate Festpreisgarantie",
    fixedPriceSubtext:
      "Sichern Sie sich den heutigen Paketpreis verbindlich für volle 90 Tage – ohne versteckte Aufpreise.",
    resultHeadline: "Ihre Vorab-Einschätzung ist fertig!",
    resultPhotoPromptBeforeBold:
      "Ihre Vorab-Einschätzung ist fertig! Wenn Sie uns über WhatsApp einige Fotos Ihres Behandlungsbereichs aus verschiedenen Blickwinkeln senden, prüft unser Ärzteteam diese umgehend und teilt Ihnen sofort Ihr persönliches Festpreis-Angebot mit ",
    resultPhotoPromptBold: "3 Monaten Festpreisgarantie",
    resultPhotoPromptAfterBold: " mit.",
    photoAnglesTitle: "Empfohlene Fotos für WhatsApp (100 % vertraulich & ärztlich):",
    photoAngles: [
      "Frontal- & Seitenprofil (bzw. Vorne / Oben / Hinterkopf bei Haaren)",
      "Bei normalem Tageslicht aufgenommen",
      "Direkte Auswertung durch unseren Chefarzt innerhalb von 15 Minuten",
    ],
    whatsappCtaButton:
      "Fotos per WhatsApp senden & 3-Monate-Festpreisgarantie sichern",
    whatsappCtaSubnote:
      "Öffnet WhatsApp mit Ihrer fertigen Quiz-Zusammenfassung • Antwort in < 5 Min.",
    summaryTreatmentLabel: "Gewählte Behandlung",
    summaryDetailLabel: "Behandlungsumfang",
    summaryStayLabel: "Hotel & Standort",
    summaryTimingLabel: "Geplanter Zeitraum",
    buildPreFilledWhatsAppMessage: (treatmentName, detailsSummary) =>
      `Hallo Cosmetocity, ich habe den Test auf Ihrer Website abgeschlossen. Meine gewünschte Behandlung: ${treatmentName} (${detailsSummary}). Ich sende Ihnen meine Fotos aus verschiedenen Blickwinkeln für mein individuelles Angebot mit 3 Monaten Festpreisgarantie.`,
  },
  ru: {
    sectionTag: "ИНТЕРАКТИВНЫЙ КАЛЬКУЛЯТОР ЛЕЧЕНИЯ И СТОИМОСТИ (КВИЗ ЗА 5 ШАГОВ)",
    sectionTitle: "Рассчитайте стоимость VIP-пакета и зафиксируйте цену",
    sectionSubtitle:
      "Ответьте на 4 быстрых вопроса за 30 секунд, чтобы получить предварительный расчет лечения в Анталье (или Стамбуле) с гарантией фиксированной цены на 3 месяца.",
    stepIndicator: (c, t) => `Шаг ${c} из ${t}`,
    stepTitles: [
      "1. Какая процедура вас интересует?",
      "2. Выберите желаемый объем процедуры:",
      "3. Выберите отель 5★ и город проведения:",
      "4. Когда вы планируете поездку на лечение?",
      "5. Ваша предварительная оценка и фиксация цены на 3 месяца",
    ],
    backBtn: "Назад",
    restartBtn: "Пройти заново",
    estimatedPackageLabel: "Предварительная стоимость VIP-пакета",
    typicalHomePriceLabel: "Обычная цена в частных клиниках Европы:",
    allInclusiveNote:
      "Включает операцию в госпитале + Отель 5★ + VIP-трансфер из аэропорта + Русскоязычного куратора + Медикаменты",
    fixedPriceBadge: "🔒 Гарантия фиксированной цены на 3 месяца",
    fixedPriceSubtext:
      "Зафиксируйте сегодняшнюю спеццену пакета на 90 дней без сезонных наценок.",
    resultHeadline: "Ваша предварительная оценка готова!",
    resultPhotoPromptBeforeBold:
      "Ваша предварительная оценка готова! Если вы отправите нам несколько фотографий зоны лечения с разных ракурсов через WhatsApp, наша медицинская команда изучит их и сразу же предоставит вам точное персональное предложение с ",
    resultPhotoPromptBold: "Гарантией фиксированной цены на 3 месяца",
    resultPhotoPromptAfterBold: ".",
    photoAnglesTitle: "Какие фото отправить в WhatsApp (100% конфиденциально):",
    photoAngles: [
      "Вид спереди и в профиль (или спереди / сверху / затылок для волос)",
      "При хорошем дневном освещении",
      "Оценка главным хирургом в течение 15 минут",
    ],
    whatsappCtaButton:
      "Отправить фото в WhatsApp и получить гарантию цены на 3 месяца",
    whatsappCtaSubnote:
      "Откроет WhatsApp с готовым текстом вашего теста • Ответ за < 5 минут",
    summaryTreatmentLabel: "Выбранная процедура",
    summaryDetailLabel: "Детали процедуры",
    summaryStayLabel: "Проживание и город",
    summaryTimingLabel: "Планируемые сроки",
    buildPreFilledWhatsAppMessage: (treatmentName, detailsSummary) =>
      `Здравствуйте, Cosmetocity! Я прошел(ла) тест на вашем сайте. Интересующая меня процедура: ${treatmentName} (${detailsSummary}). Отправляю свои фотографии с разных ракурсов для получения точного расчета с гарантией фиксированной цены на 3 месяца.`,
  },
  es: {
    sectionTag: "CALCULADORA INTERACTIVA DE TRATAMIENTO Y PRECIO (TEST EN 5 PASOS)",
    sectionTitle: "Calcule su Paquete VIP Todo Incluido y Bloquee su Precio",
    sectionSubtitle:
      "Responda 4 breves preguntas en 30 segundos para obtener su valoración preliminar en Antalya (o Estambul) con nuestra Garantía de Precio Fijo durante 3 Meses.",
    stepIndicator: (c, t) => `Paso ${c} de ${t}`,
    stepTitles: [
      "1. ¿En qué tratamiento está interesado(a)?",
      "2. Seleccione el alcance clínico o detalle del procedimiento:",
      "3. Elija su preferencia de hotel 5★ y ciudad:",
      "4. ¿Cuándo planea realizar su viaje médico?",
      "5. Su Evaluación Preliminar y Garantía de Precio Fijo",
    ],
    backBtn: "Paso Anterior",
    restartBtn: "Reiniciar Test",
    estimatedPackageLabel: "Paquete VIP Todo Incluido Estimado",
    typicalHomePriceLabel: "Precio habitual en clínicas de España / Europa:",
    allInclusiveNote:
      "Incluye Procedimiento en Hospital Acreditado + Hotel 5★ + Traslados VIP + Traductor en Español + Kit Postoperatorio",
    fixedPriceBadge: "🔒 Garantía de Precio Fijo por 3 Meses",
    fixedPriceSubtext:
      "Congele la tarifa promocional de hoy durante 90 días completos, sin cargos ocultos.",
    resultHeadline: "¡Su evaluación preliminar está lista!",
    resultPhotoPromptBeforeBold:
      "¡Su evaluación preliminar está lista! Si nos envía por WhatsApp algunas fotografías de su zona de tratamiento tomadas desde diferentes ángulos, nuestro equipo médico las examinará y compartirá de inmediato su presupuesto exacto personalizado con ",
    resultPhotoPromptBold: "Garantía de Precio Fijo por 3 Meses",
    resultPhotoPromptAfterBold: ".",
    photoAnglesTitle: "Fotos recomendadas para enviar por WhatsApp (100% Confidencial):",
    photoAngles: [
      "Vista frontal y perfil lateral (o frontal / superior / nuca para injerto capilar)",
      "Con buena luz natural",
      "Valoración directa por nuestro cirujano jefe en 15 minutos",
    ],
    whatsappCtaButton:
      "Enviar Fotos por WhatsApp y Activar Garantía de Precio Fijo 3 Meses",
    whatsappCtaSubnote:
      "Abre WhatsApp con el resumen de su test prellenado • Respuesta en < 5 min",
    summaryTreatmentLabel: "Tratamiento Seleccionado",
    summaryDetailLabel: "Detalle Clínico",
    summaryStayLabel: "Alojamiento y Ciudad",
    summaryTimingLabel: "Fecha Estimada",
    buildPreFilledWhatsAppMessage: (treatmentName, detailsSummary) =>
      `Hola Cosmetocity, he completado el test en su sitio web. El tratamiento que me interesa es: ${treatmentName} (${detailsSummary}). Comparto mis fotografías desde diferentes ángulos para recibir mi presupuesto con garantía de precio fijo por 3 meses.`,
  },
  ar: {
    sectionTag: "حاسبة العلاج والتكلفة التفاعلية (اختبار ذكي من 5 خطوات)",
    sectionTitle: "احسب تكلفة باقتك الشاملة وثبّت سعرك لمدة 3 أشهر",
    sectionSubtitle:
      "أجب عن 4 أسئلة سريعة في أقل من 30 ثانية للحصول على تقييمك المبدئي في أنطاليا (أو إسطنبول) مع ضمان تثبيت السعر لمدة 3 أشهر.",
    stepIndicator: (c, t) => `الخطوة ${c} من ${t}`,
    stepTitles: [
      "1. ما هو الإجراء الطبي أو التجميلي الذي تهتم به؟",
      "2. اختر التفاصيل الطبية أو نطاق الإجراء المطلوب:",
      "3. اختر تفضيلات الفندق (5 نجوم) والمدينة:",
      "4. متى تخطط للسفر لإجراء العلاج؟",
      "5. تقييمك المبدئي وضمان تثبيت السعر لمدة 3 أشهر",
    ],
    backBtn: "الخطوة السابقة",
    restartBtn: "إعادة الاختبار",
    estimatedPackageLabel: "التكلفة التقديرية لباقة VIP الشاملة",
    typicalHomePriceLabel: "التكلفة المعتادة في العيادات الخاصة بالخارج:",
    allInclusiveNote:
      "تشمل العملية في مستشفى معتمد + فندق 5 نجوم + استقبال ونقل VIP من المطار + مترجم مرافق بالعربية + حقيبة الأدوية والعناية",
    fixedPriceBadge: "🔒 ضمان تثبيت السعر لمدة 3 أشهر",
    fixedPriceSubtext:
      "احتفظ بسعر العرض الحالي لمدة 90 يوماً كاملة دون أي زيادة موسمية في أسعار الفنادق أو المستشفى.",
    resultHeadline: "تقييمك المبدئي جاهز الآن!",
    resultPhotoPromptBeforeBold:
      "تقييمك المبدئي جاهز! إذا أرسلت لنا بضع صور لمنطقة العلاج ملتقطة من زوايا مختلفة عبر تطبيق واتساب، فسيقوم فريقنا الطبي بفحصها ومشاركة عرض السعر النهائي المخصص لك فوراً مع ",
    resultPhotoPromptBold: "ضمان تثبيت السعر لمدة 3 أشهر",
    resultPhotoPromptAfterBold: ".",
    photoAnglesTitle: "الصور الموصى بإرسالها عبر واتساب (سرية تامة 100%):",
    photoAngles: [
      "صورة أمامية وجانبية واضحة (أو من الأمام والأعلى والمنطقة المانحة للشعر)",
      "في إضاءة طبيعية جيدة",
      "يتم تقييمها مباشرة من قِبل كبير الجراحين خلال 15 دقيقة",
    ],
    whatsappCtaButton:
      "أرسل الصور عبر واتساب واحصل على ضمان السعر الثابت لمدة 3 أشهر",
    whatsappCtaSubnote:
      "يفتح واتساب مع رسالة جاهزة تتضمن نتيجة اختبارك • الرد خلال أقل من 5 دقائق",
    summaryTreatmentLabel: "العلاج المختار",
    summaryDetailLabel: "التفاصيل الطبية",
    summaryStayLabel: "الإقامة والمدينة",
    summaryTimingLabel: "الموعد المخطط",
    buildPreFilledWhatsAppMessage: (treatmentName, detailsSummary) =>
      `مرحباً Cosmetocity، لقد أكملت الاختبار على موقعكم الإلكتروني. العلاج الذي أهتم به: ${treatmentName} (${detailsSummary}). أشارككم صوري من زوايا مختلفة للحصول على عرض السعر الخاص بي مع ضمان تثبيت السعر لمدة 3 أشهر.`,
  },
  fr: {
    sectionTag: "CALCULATEUR INTERACTIF DE SOINS & TARIFS (QUIZ EN 5 ÉTAPES)",
    sectionTitle: "Calculez votre Forfait VIP Tout Compris & Bloquez votre Tarif",
    sectionSubtitle:
      "Répondez à 4 questions rapides en 30 secondes pour obtenir votre estimation personnalisée à Antalya (ou Istanbul) avec notre Garantie Prix Fixe 3 Mois.",
    stepIndicator: (c, t) => `Étape ${c} sur ${t}`,
    stepTitles: [
      "1. Quel soin ou intervention vous intéresse ?",
      "2. Sélectionnez l'objectif clinique ou les détails du soin :",
      "3. Choisissez votre hôtel 5★ et votre ville :",
      "4. Quand envisagez-vous votre séjour médical ?",
      "5. Votre Pré-Évaluation & Garantie Prix Fixe 3 Mois",
    ],
    backBtn: "Étape Précédente",
    restartBtn: "Recommencer le quiz",
    estimatedPackageLabel: "Forfait VIP Tout Compris Estimé",
    typicalHomePriceLabel: "Tarif moyen en clinique privée France / Europe :",
    allInclusiveNote:
      "Inclut l'intervention en Hôpital Accrédité + Hôtel 5★ + Transferts VIP + Coordinateur Francophone + Kit de Soins Post-Op",
    fixedPriceBadge: "🔒 Garantie Prix Fixe 3 Mois",
    fixedPriceSubtext:
      "Bloquez le tarif promotionnel d'aujourd'hui pendant 90 jours complets, sans frais cachés.",
    resultHeadline: "Votre pré-évaluation est prête !",
    resultPhotoPromptBeforeBold:
      "Votre pré-évaluation est prête ! Si vous nous envoyez quelques photos de votre zone de traitement prises sous différents angles via WhatsApp, notre équipe médicale les examinera et vous transmettra immédiatement votre devis net personnalisé avec une ",
    resultPhotoPromptBold: "Garantie Prix Fixe de 3 Mois",
    resultPhotoPromptAfterBold: ".",
    photoAnglesTitle: "Photos recommandées à partager sur WhatsApp (100 % Confidentiel) :",
    photoAngles: [
      "Vue de face et de profil (ou face / dessus / zone donneuse pour les cheveux)",
      "Éclairage naturel clair",
      "Analyse directe par notre chirurgien-chef en 15 minutes",
    ],
    whatsappCtaButton:
      "Envoyer mes photos sur WhatsApp & Activer la Garantie Prix Fixe 3 Mois",
    whatsappCtaSubnote:
      "Ouvre WhatsApp avec le résumé de votre quiz pré-rempli • Réponse < 5 min",
    summaryTreatmentLabel: "Soin Sélectionné",
    summaryDetailLabel: "Détail Clinique",
    summaryStayLabel: "Hôtel & Destination",
    summaryTimingLabel: "Période Souhaitée",
    buildPreFilledWhatsAppMessage: (treatmentName, detailsSummary) =>
      `Bonjour Cosmetocity, j'ai complété le test sur votre site web. Le traitement qui m'intéresse : ${treatmentName} (${detailsSummary}). Je vous partage mes photos sous différents angles pour obtenir mon devis avec la garantie prix fixe de 3 mois.`,
  },
  it: {
    sectionTag: "CALCOLATORE INTERATTIVO TRATTAMENTO E PREZZO (QUIZ IN 5 PASSI)",
    sectionTitle: "Calcola il tuo Pacchetto VIP Tutto Incluso e Blocca il Prezzo",
    sectionSubtitle:
      "Rispondi a 4 brevi domande in 30 secondi per scoprire il tuo preventivo preliminare ad Antalya (o Istanbul) con la nostra Garanzia di Prezzo Fisso per 3 Mesi.",
    stepIndicator: (c, t) => `Passo ${c} di ${t}`,
    stepTitles: [
      "1. A quale trattamento sei interessato/a?",
      "2. Seleziona l'obiettivo clinico o i dettagli dell'intervento:",
      "3. Scegli la tua preferenza di hotel 5★ e città:",
      "4. Quando pianifichi il tuo viaggio medico?",
      "5. La tua Valutazione Preliminare e Garanzia Prezzo Fisso 3 Mesi",
    ],
    backBtn: "Passo Precedente",
    restartBtn: "Ricomincia il test",
    estimatedPackageLabel: "Pacchetto VIP Tutto Incluso Stimato",
    typicalHomePriceLabel: "Prezzo medio in clinica privata in Italia / UE:",
    allInclusiveNote:
      "Include Intervento in Ospedale Accreditato + Hotel 5★ + Transfer VIP + Interprete in Italiano + Kit Post-Operatorio",
    fixedPriceBadge: "🔒 Garanzia di Prezzo Fisso per 3 Mesi",
    fixedPriceSubtext:
      "Blocca la tariffa promozionale di oggi per 90 giorni interi, senza rincari stagionali.",
    resultHeadline: "La tua valutazione preliminare è pronta!",
    resultPhotoPromptBeforeBold:
      "La tua valutazione preliminare è pronta! Se ci invii tramite WhatsApp alcune foto della zona da trattare scattate da diverse angolazioni, il nostro team medico le esaminerà e condividerà subito il tuo preventivo netto personalizzato con ",
    resultPhotoPromptBold: "Garanzia di Prezzo Fisso per 3 Mesi",
    resultPhotoPromptAfterBold: ".",
    photoAnglesTitle: "Foto consigliate da inviare su WhatsApp (100% Riservato):",
    photoAngles: [
      "Vista frontale e profilo laterale (o fronte / vertice / nuca per i capelli)",
      "In buona luce naturale",
      "Valutazione diretta dal nostro chirurgo primario entro 15 minuti",
    ],
    whatsappCtaButton:
      "Invia Foto su WhatsApp e Ottieni la Garanzia Prezzo Fisso 3 Mesi",
    whatsappCtaSubnote:
      "Apre WhatsApp con il riepilogo del tuo test già compilato • Risposta < 5 min",
    summaryTreatmentLabel: "Trattamento Scelto",
    summaryDetailLabel: "Dettaglio Clinico",
    summaryStayLabel: "Hotel e Città",
    summaryTimingLabel: "Periodo Previsto",
    buildPreFilledWhatsAppMessage: (treatmentName, detailsSummary) =>
      `Salve Cosmetocity, ho completato il test sul vostro sito web. Il trattamento a cui sono interessato/a: ${treatmentName} (${detailsSummary}). Condivido le mie foto da diverse angolazioni per ricevere il mio preventivo con garanzia di prezzo fisso per 3 mesi.`,
  },
};

export default function TreatmentQuizCalculator({
  locale,
  selectedCity,
  onCityChange,
}: TreatmentQuizCalculatorProps) {
  const [step, setStep] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] =
    useState<TreatmentCategoryKey>("hair");
  const [selectedDetailId, setSelectedDetailId] = useState<string>(
    STEP2_CLINICAL_DETAILS.hair[1].id
  );
  const [selectedStayId, setSelectedStayId] = useState<string>(
    STEP3_HOSPITALITY[0].id
  );
  const [selectedTimeframeId, setSelectedTimeframeId] = useState<string>(
    STEP4_TIMEFRAME[1].id
  );

  const copy = QUIZ_COPY[locale];
  const isRtl = isRtlLocale(locale);

  const activeTreatment =
    STEP1_TREATMENTS.find((t) => t.key === selectedCategory) ||
    STEP1_TREATMENTS[0];

  const activeDetailOptions = STEP2_CLINICAL_DETAILS[selectedCategory];
  const activeDetail =
    activeDetailOptions.find((d) => d.id === selectedDetailId) ||
    activeDetailOptions[0];

  const activeStay =
    STEP3_HOSPITALITY.find((s) => s.id === selectedStayId) ||
    STEP3_HOSPITALITY[0];

  const activeTimeframe =
    STEP4_TIMEFRAME.find((tf) => tf.id === selectedTimeframeId) ||
    STEP4_TIMEFRAME[0];

  const handleSelectCategory = (key: TreatmentCategoryKey) => {
    setSelectedCategory(key);
    setSelectedDetailId(STEP2_CLINICAL_DETAILS[key][0].id);
    setStep(2);
  };

  const handleSelectDetail = (id: string) => {
    setSelectedDetailId(id);
    setStep(3);
  };

  const handleSelectStay = (id: string) => {
    setSelectedStayId(id);
    if (onCityChange) {
      if (id === "istanbul-vip-partner") {
        onCityChange("istanbul");
      } else {
        onCityChange("antalya");
      }
    }
    setStep(4);
  };

  const handleSelectTimeframe = (id: string) => {
    setSelectedTimeframeId(id);
    setStep(5);
  };

  const handleRestart = () => {
    setStep(1);
  };

  // Build smart pre-filled WhatsApp link for Step 5 Result Screen
  const treatmentLabel = activeTreatment.label[locale];
  const detailsSummary = `${activeDetail.label[locale]} • ${activeStay.label[
    locale
  ]
    .replace("🏖️ ", "")
    .replace("🌉 ", "")} • ${activeTimeframe.label[locale]}`;

  const preFilledMessage = copy.buildPreFilledWhatsAppMessage(
    treatmentLabel,
    detailsSummary
  );
  const smartWhatsAppUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    preFilledMessage
  )}`;

  const renderCategoryIcon = (key: TreatmentCategoryKey) => {
    switch (key) {
      case "hair":
        return <UserCheck className="w-5 h-5" />;
      case "dental":
        return <Smile className="w-5 h-5" />;
      case "breast":
      case "rhinoplasty":
      case "other":
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section
      id="quiz-calculator"
      dir={isRtl ? "rtl" : "ltr"}
      className="py-16 sm:py-24 bg-gradient-to-b from-white via-cosmeto-sandLight to-cosmeto-sand border-t border-cosmeto-sandBorder"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cosmeto-green/15 text-cosmeto-greenDark text-xs font-bold tracking-widest uppercase mb-3 border border-cosmeto-green/30">
            <BadgePercent className="w-4 h-4 text-cosmeto-green" />
            <span>{copy.sectionTag}</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-cosmeto-charcoal mb-3">
            {copy.sectionTitle}
          </h2>
          <div className="w-16 h-1 bg-cosmeto-green mx-auto mb-4 rounded-full" />
          <p className="text-cosmeto-body text-sm sm:text-base leading-relaxed">
            {copy.sectionSubtitle}
          </p>
        </div>

        {/* Main Quiz Card */}
        <div className="bg-white rounded-3xl border-2 border-cosmeto-green/60 shadow-2xl overflow-hidden">
          {/* Top Progress Bar & Step Counter */}
          <div className="bg-cosmeto-charcoal text-white px-6 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Stethoscope className="w-5 h-5 text-cosmeto-green shrink-0" />
              <span className="text-xs sm:text-sm font-bold tracking-wide">
                {copy.stepIndicator(step, 5)}
              </span>
            </div>

            {/* 5-Step Pills */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => {
                    if (num <= step) setStep(num);
                  }}
                  disabled={num > step}
                  aria-label={`Step ${num}`}
                  className={`h-2.5 rounded-full transition-all ${
                    num === step
                      ? "w-8 bg-cosmeto-green"
                      : num < step
                      ? "w-5 bg-cosmeto-cyan cursor-pointer"
                      : "w-4 bg-white/20 cursor-not-allowed"
                  }`}
                />
              ))}
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cosmeto-green/20 border border-cosmeto-green/50 text-cosmeto-sand text-[11px] font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-cosmeto-green" />
              <span>{copy.fixedPriceBadge}</span>
            </span>
          </div>

          {/* Step Body */}
          <div className="p-6 sm:p-9 lg:p-10">
            <h3 className="text-xl sm:text-2xl font-bold text-cosmeto-charcoal mb-6">
              {copy.stepTitles[step - 1]}
            </h3>

            {/* STEP 1: Treatment Category */}
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {STEP1_TREATMENTS.map((item) => {
                  const isSelected = selectedCategory === item.key;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => handleSelectCategory(item.key)}
                      className={`text-left p-5 rounded-2xl border-2 transition flex items-start gap-4 group ${
                        isSelected
                          ? "border-cosmeto-green bg-cosmeto-green/10 shadow-md"
                          : "border-cosmeto-sandBorder bg-cosmeto-sandLight/60 hover:border-cosmeto-green hover:bg-white"
                      }`}
                    >
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition ${
                          isSelected
                            ? "bg-cosmeto-green text-white"
                            : "bg-cosmeto-teal/15 text-cosmeto-teal group-hover:bg-cosmeto-green group-hover:text-white"
                        }`}
                      >
                        {renderCategoryIcon(item.key)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-sm sm:text-base text-cosmeto-charcoal block">
                            {item.label[locale]}
                          </span>
                          <span className="text-xs font-extrabold text-cosmeto-greenDark bg-white px-2.5 py-1 rounded-lg border border-cosmeto-sandBorder shrink-0">
                            {locale === "en" ? item.priceGBP : item.priceEUR}
                          </span>
                        </div>
                        <p className="text-xs text-cosmeto-body mt-1 leading-relaxed">
                          {item.subLabel[locale]}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* STEP 2: Clinical Scope / Procedure Details */}
            {step === 2 && (
              <div className="space-y-3.5">
                {activeDetailOptions.map((opt) => {
                  const isSelected = selectedDetailId === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectDetail(opt.id)}
                      className={`w-full text-left p-5 rounded-2xl border-2 transition flex items-center justify-between gap-4 ${
                        isSelected
                          ? "border-cosmeto-green bg-cosmeto-green/10 shadow-md"
                          : "border-cosmeto-sandBorder bg-cosmeto-sandLight/60 hover:border-cosmeto-green hover:bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <CheckCircle2
                          className={`w-5 h-5 shrink-0 ${
                            isSelected
                              ? "text-cosmeto-green"
                              : "text-cosmeto-taupe"
                          }`}
                        />
                        <span className="font-bold text-sm sm:text-base text-cosmeto-charcoal">
                          {opt.label[locale]}
                        </span>
                      </div>
                      <ArrowRight
                        className={`w-4 h-4 text-cosmeto-teal shrink-0 ${
                          isRtl ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            )}

            {/* STEP 3: 5-Star Hotel & City Preference */}
            {step === 3 && (
              <div className="space-y-3.5">
                {STEP3_HOSPITALITY.map((opt) => {
                  const isSelected = selectedStayId === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectStay(opt.id)}
                      className={`w-full text-left p-5 rounded-2xl border-2 transition flex items-center justify-between gap-4 ${
                        isSelected
                          ? "border-cosmeto-green bg-cosmeto-green/10 shadow-md"
                          : "border-cosmeto-sandBorder bg-cosmeto-sandLight/60 hover:border-cosmeto-green hover:bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <Hotel
                          className={`w-5 h-5 shrink-0 ${
                            isSelected
                              ? "text-cosmeto-green"
                              : "text-cosmeto-teal"
                          }`}
                        />
                        <span className="font-bold text-sm sm:text-base text-cosmeto-charcoal">
                          {opt.label[locale]}
                        </span>
                      </div>
                      <ArrowRight
                        className={`w-4 h-4 text-cosmeto-teal shrink-0 ${
                          isRtl ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            )}

            {/* STEP 4: Travel Timeframe */}
            {step === 4 && (
              <div className="space-y-3.5">
                {STEP4_TIMEFRAME.map((opt) => {
                  const isSelected = selectedTimeframeId === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectTimeframe(opt.id)}
                      className={`w-full text-left p-5 rounded-2xl border-2 transition flex items-center justify-between gap-4 ${
                        isSelected
                          ? "border-cosmeto-green bg-cosmeto-green/10 shadow-md"
                          : "border-cosmeto-sandBorder bg-cosmeto-sandLight/60 hover:border-cosmeto-green hover:bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <Calendar
                          className={`w-5 h-5 shrink-0 ${
                            isSelected
                              ? "text-cosmeto-green"
                              : "text-cosmeto-teal"
                          }`}
                        />
                        <span className="font-bold text-sm sm:text-base text-cosmeto-charcoal">
                          {opt.label[locale]}
                        </span>
                      </div>
                      <ArrowRight
                        className={`w-4 h-4 text-cosmeto-teal shrink-0 ${
                          isRtl ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            )}

            {/* STEP 5: RESULT SCREEN — Photo Request + 3-Month Fixed Price Guarantee + Smart Pre-filled WhatsApp CTA */}
            {step === 5 && (
              <div className="space-y-7">
                {/* Highlighted Value Proposition Box & 3-Month Fixed Price Guarantee Badge */}
                <div className="rounded-3xl bg-gradient-to-br from-cosmeto-sand via-white to-cosmeto-ice/40 border-2 border-cosmeto-green p-6 sm:p-8 shadow-lg space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cosmeto-green text-white text-xs sm:text-sm font-extrabold tracking-wide shadow-md">
                      <ShieldCheck className="w-4 h-4 shrink-0" />
                      <span>{copy.fixedPriceBadge}</span>
                    </span>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cosmeto-teal/15 text-cosmeto-teal text-xs font-bold">
                      <Plane className="w-3.5 h-3.5" />
                      <span>
                        {selectedStayId === "istanbul-vip-partner"
                          ? "Istanbul VIP Hub"
                          : "Antalya Main Hub (AYT)"}
                      </span>
                    </span>
                  </div>

                  {/* Persuasive Conversion Message with Bold 3-Month Fixed Price Guarantee */}
                  <div className="space-y-2">
                    <h4 className="text-2xl sm:text-3xl font-bold text-cosmeto-charcoal">
                      {copy.resultHeadline}
                    </h4>
                    <p className="text-base sm:text-lg text-cosmeto-charcoal leading-relaxed">
                      {copy.resultPhotoPromptBeforeBold}
                      <strong className="text-cosmeto-greenDark underline decoration-cosmeto-green decoration-2 underline-offset-4 font-extrabold">
                        {copy.resultPhotoPromptBold}
                      </strong>
                      {copy.resultPhotoPromptAfterBold}
                    </p>
                  </div>

                  {/* Highlighted 3-Month Fixed Price Guarantee Callout Box */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-cosmeto-charcoal text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-cosmeto-green/60">
                    <div className="space-y-1">
                      <span className="text-xs uppercase tracking-wider text-cosmeto-cyan font-bold block">
                        {copy.estimatedPackageLabel}
                      </span>
                      <div className="flex items-baseline gap-3 flex-wrap">
                        <span className="text-3xl sm:text-4xl font-extrabold text-cosmeto-green">
                          {locale === "en"
                            ? activeTreatment.priceGBP
                            : activeTreatment.priceEUR}
                        </span>
                        <span className="text-xs sm:text-sm text-white/70">
                          {copy.typicalHomePriceLabel}{" "}
                          <span className="line-through text-cosmeto-sand">
                            {activeTreatment.ukEuPrice}
                          </span>
                        </span>
                      </div>
                      <p className="text-xs text-cosmeto-ice pt-1">
                        {copy.allInclusiveNote}
                      </p>
                    </div>

                    <div className="sm:text-right shrink-0 bg-white/10 px-4 py-3 rounded-xl border border-cosmeto-green/40">
                      <span className="block text-xs font-extrabold text-cosmeto-sand uppercase">
                        {copy.fixedPriceBadge}
                      </span>
                      <span className="block text-[11px] text-white/85 max-w-[220px] mt-0.5">
                        {copy.fixedPriceSubtext}
                      </span>
                    </div>
                  </div>

                  {/* Quiz Selections Summary Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                    <div className="p-3.5 rounded-xl bg-white border border-cosmeto-sandBorder">
                      <span className="text-[11px] uppercase tracking-wider text-cosmeto-teal font-bold block">
                        {copy.summaryTreatmentLabel}
                      </span>
                      <span className="font-bold text-cosmeto-charcoal">
                        {activeTreatment.label[locale]}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-cosmeto-sandBorder">
                      <span className="text-[11px] uppercase tracking-wider text-cosmeto-teal font-bold block">
                        {copy.summaryDetailLabel}
                      </span>
                      <span className="font-bold text-cosmeto-charcoal">
                        {activeDetail.label[locale]}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-cosmeto-sandBorder">
                      <span className="text-[11px] uppercase tracking-wider text-cosmeto-teal font-bold block">
                        {copy.summaryStayLabel}
                      </span>
                      <span className="font-bold text-cosmeto-charcoal">
                        {activeStay.label[locale]}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-cosmeto-sandBorder">
                      <span className="text-[11px] uppercase tracking-wider text-cosmeto-teal font-bold block">
                        {copy.summaryTimingLabel}
                      </span>
                      <span className="font-bold text-cosmeto-charcoal">
                        {activeTimeframe.label[locale]}
                      </span>
                    </div>
                  </div>

                  {/* Photo Checklist Box */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white border border-cosmeto-green/40 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-cosmeto-teal">
                      <Camera className="w-4 h-4 text-cosmeto-green shrink-0" />
                      <span>{copy.photoAnglesTitle}</span>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-semibold text-cosmeto-charcoal">
                      {copy.photoAngles.map((angle, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 bg-cosmeto-sandLight p-2.5 rounded-xl"
                        >
                          <CheckCircle2 className="w-4 h-4 text-cosmeto-green shrink-0 mt-0.5" />
                          <span>{angle}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Primary Smart Pre-Filled WhatsApp Button */}
                  <div className="pt-2 space-y-2.5">
                    <a
                      href={smartWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackWhatsAppClick({
                          source: "quiz_step5_fixed_price_whatsapp_cta",
                          topic: `${treatmentLabel} (${activeDetail.label[locale]})`,
                          city:
                            selectedStayId === "istanbul-vip-partner"
                              ? "istanbul"
                              : selectedCity,
                          locale,
                        })
                      }
                      className="w-full py-4 sm:py-5 px-6 rounded-2xl bg-[#25D366] hover:bg-cosmeto-green text-white font-extrabold text-sm sm:text-base lg:text-lg shadow-xl hover:shadow-2xl transition transform hover:-translate-y-0.5 flex items-center justify-center gap-3 text-center"
                    >
                      <MessageCircle className="w-6 h-6 shrink-0" />
                      <span>{copy.whatsappCtaButton}</span>
                      <ArrowRight
                        className={`w-5 h-5 shrink-0 ${
                          isRtl ? "rotate-180" : ""
                        }`}
                      />
                    </a>
                    <p className="text-center text-xs font-semibold text-cosmeto-teal">
                      {copy.whatsappCtaSubnote}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Quiz Navigation Controls (Back / Restart) */}
            {step > 1 && (
              <div className="mt-6 pt-5 border-t border-cosmeto-sandBorder flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setStep((prev) => Math.max(1, prev - 1))}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cosmeto-sand hover:bg-cosmeto-sandBorder text-cosmeto-charcoal text-xs sm:text-sm font-bold transition"
                >
                  <ArrowLeft
                    className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`}
                  />
                  <span>{copy.backBtn}</span>
                </button>

                {step === 5 && (
                  <button
                    type="button"
                    onClick={handleRestart}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-cosmeto-sandLight border border-cosmeto-sandBorder text-cosmeto-teal text-xs sm:text-sm font-bold transition"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>{copy.restartBtn}</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
