import { Locale, CityOption, WHATSAPP_NUMBER } from "./content";

export interface BlogQuestionSection {
  id: string;
  question: Record<Locale, string>; // H2 question
  directAnswer: Record<Locale, string>; // 2-3 sentence direct snippet answer
  details: Record<Locale, string[]>; // Detailed clinical paragraphs
  bulletPoints?: Record<Locale, string[]>; // Optional actionable clinical bullet points
  tipBox?: {
    title: Record<Locale, string>;
    text: Record<Locale, string>;
  };
}

export interface RecoveryTimelineDay {
  period: Record<Locale, string>;
  painLevel: Record<Locale, string>;
  milestone: Record<Locale, string>;
}

export interface BlogCtaConfig {
  badge: Record<Locale, string>;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  buttonText: Record<Locale, string>;
  whatsappTopic: Record<Locale, string>;
}

export interface BlogPost {
  slug: string;
  category: "aesthetic" | "hair" | "dental";
  categoryLabel: Record<Locale, string>;
  publishedAt: string;
  updatedAt: string;
  readingTime: Record<Locale, string>;
  medicalReviewer: {
    name: string;
    title: Record<Locale, string>;
    hospital: string;
  };
  heroImage: string;
  metaTitle: Record<Locale, string>;
  metaDescription: Record<Locale, string>;
  // H1 Question + Subtitle
  h1Question: Record<Locale, string>;
  h1CompleteTitle: Record<Locale, string>;
  // 2-3 Sentence Featured Snippet Direct Answer right under H1
  h1DirectAnswer: Record<Locale, string>;
  keyTakeaways: Record<Locale, string[]>;
  recoveryTimeline?: RecoveryTimelineDay[];
  sections: BlogQuestionSection[];
  midArticleCta: BlogCtaConfig;
  bottomArticleCta: BlogCtaConfig;
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
    tr: `Merhaba CosmetoCity Medikal Koordinatörü! cosmetocity.online üzerindeki rehberinizi okudum ve ${targetCity} için ${customTopic} hakkında bilgi almak istiyorum.`,
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
  }
> = {
  en: {
    blogNavLabel: "Medical Blog & FAQ",
    blogHeaderBadge: "EVIDENCE-BASED PATIENT GUIDES • UK & GERMANY DESK",
    blogHeaderTitle: "Most Asked Medical Tourism Questions, Answered by Surgeons",
    blogHeaderSubtitle:
      "Clear, empathetic, and medically accurate recovery guides for Hair Transplants, Breast Aesthetics, and Hollywood Smile procedures in sunny Antalya (and Istanbul).",
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
    replyTimeNote: "Direct WhatsApp line • Average response under 5 minutes • English & German Coordinators",
  },
  de: {
    blogNavLabel: "Medizinischer Ratgeber",
    blogHeaderBadge: "ÄRZTLICH GEPRÜFTE RATGEBER • PATIENTEN AUS DEUTSCHLAND & UK",
    blogHeaderTitle: "Die häufigsten Patientenfragen – direkt von Fachärzten beantwortet",
    blogHeaderSubtitle:
      "Transparente, einfühlsame und medizinisch fundierte Heilungsleitfäden für Brustästhetik, Haartransplantation und Hollywood Smile im sonnigen Antalya (und Istanbul).",
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
    replyTimeNote: "Direkter WhatsApp-Kontakt • Antwort in unter 5 Minuten • Deutsch- & Englischsprachige Koordinatoren",
  },
  tr: {
    blogNavLabel: "Medikal Blog & SSS",
    blogHeaderBadge: "CERRAH ONAYLI HASTA REHBERLERİ • UK & ALMANYA MASASI",
    blogHeaderTitle: "Uluslararası Hastaların En Çok Arattığı Sorular ve Net Tıbbi Cevaplar",
    blogHeaderSubtitle:
      "Antalya (ve İstanbul) merkezlerimizde Meme Estetiği, Saç Ekimi ve Diş Estetiği süreçleri hakkında doğrudan, empatik ve bilimsel iyileşme rehberleri.",
    readArticleBtn: "İyileşme Rehberinin Tamamını Oku",
    backToBlog: "← Tüm Medikal Rehberler",
    backToHome: "CosmetoCity Ana Sayfa",
    directAnswerBadge: "DOĞRUDAN TIBBİ ÖZET (HIZLI CEVAP)",
    medicallyReviewedBy: "Tıbbi Onay:",
    lastUpdated: "Güncelleme",
    tableOfContents: "Bu Rehberde Cevaplanan Hasta Soruları",
    timelineTitle: "Gün Gün Ağrı ve İyileşme Takvimi",
    timelineColPeriod: "İyileşme Evresi",
    timelineColPain: "Beklenen His / Ağrı Düzeyi",
    timelineColMilestone: "Klinik Süreç ve Günlük Aktivite",
    keyTakeawaysTitle: "Özetle: Hastalarımızın Bilmesi Gereken Temel Noktalar",
    faqSchemaBadge: "Google FAQPage Yapısal Veri Uyumlu",
    relatedQuestionsTitle: "Diğer Merak Edilen Medikal Rehberler",
    replyTimeNote: "Doğrudan WhatsApp Hattı • 5 dakikadan kısa sürede yanıt • İngilizce, Almanca ve Türkçe Koordinatörler",
  },
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "is-breast-augmentation-painful-complete-recovery-guide",
    category: "aesthetic",
    categoryLabel: {
      en: "Breast Aesthetics & Recovery",
      de: "Brustästhetik & Heilungsverlauf",
      tr: "Meme Estetiği & İyileşme Rehberi",
    },
    publishedAt: "2026-11-18",
    updatedAt: "2026-11-18",
    readingTime: {
      en: "7 min read",
      de: "7 Min. Lesezeit",
      tr: "7 dk okuma",
    },
    medicalReviewer: {
      name: "Op. Dr. Emre Karahan, MD, EBOPRAS",
      title: {
        en: "Senior Board-Certified Plastic, Reconstructive & Aesthetic Surgeon",
        de: "Facharzt für Plastische, Rekonstruktive und Ästhetische Chirurgie",
        tr: "Plastik, Rekonstrüktif ve Estetik Cerrahi Uzmanı",
      },
      hospital: "OFM Antalya Accredited Hospital (Lara / Muratpaşa)",
    },
    heroImage:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=85",
    metaTitle: {
      en: "Is Breast Augmentation Painful? Complete Recovery Guide | CosmetoCity Antalya",
      de: "Ist eine Brustvergrößerung schmerzhaft? Kompletter Heilungsratgeber | CosmetoCity",
      tr: "Meme Büyütme Ameliyatı Ağrılı mıdır? Tam İyileşme Rehberi | CosmetoCity Antalya",
    },
    metaDescription: {
      en: "Is breast augmentation painful? Discover what recovery really feels like day-by-day, how intercostal nerve blocks eliminate acute pain, and when you can fly home from Antalya.",
      de: "Ist eine Brustvergrößerung schmerzhaft? Erfahren Sie Tag für Tag, wie sich die Heilung anfühlt, wie moderne Schmerzblockaden helfen und wann Sie aus Antalya zurückfliegen können.",
      tr: "Meme büyütme ameliyatı ağrılı mıdır? Gün gün iyileşme takvimi, ağrısız interkostal sinir blokajı protokolümüz ve Antalya'da 5 yıldızlı iyileşme süreci.",
    },
    h1Question: {
      en: "Is Breast Augmentation Painful?",
      de: "Ist eine Brustvergrößerung schmerzhaft?",
      tr: "Meme Büyütme Ameliyatı Ağrılı mıdır?",
    },
    h1CompleteTitle: {
      en: "Is Breast Augmentation Painful? Complete Recovery Guide",
      de: "Ist eine Brustvergrößerung schmerzhaft? Kompletter Heilungsratgeber (Ist Brust-OP schmerzhaft?)",
      tr: "Is Breast Augmentation Painful? Complete Recovery Guide (Meme Büyütme Ağrılı mıdır?)",
    },
    h1DirectAnswer: {
      en: "Breast augmentation is generally not described as sharply painful, but rather feels like moderate chest muscle tightness and pressure—very similar to an intense chest workout at the gym—for the first 48 to 72 hours. Thanks to our targeted long-acting nerve blocks and multimodal pain relief protocol in Antalya, most patients rate their discomfort at just 3 to 4 out of 10 and transition to simple oral painkillers by Day 3.",
      de: "Eine Brustvergrößerung wird von den meisten Patientinnen nicht als stechender Schmerz empfunden, sondern ähnelt in den ersten 48 bis 72 Stunden eher einem starken Muskelkater oder Druckgefühl im Brustbereich nach einem intensiven Fitnesstraining. Dank moderner Langzeit-Nervenblockaden und schonender Dual-Plane-Technik in unserer Klinik in Antalya bewerten die meisten Patientinnen das Ziehen mit nur 3 bis 4 von 10 Punkten und benötigen ab dem 3. Tag kaum noch Schmerzmittel.",
      tr: "Meme büyütme ameliyatı genellikle keskin bir ağrıdan ziyade, ilk 48 ila 72 saat boyunca spor salonunda yapılan yoğun bir göğüs antrenmanı sonrasındaki kas gerginliği ve dolgunluk hissi gibi yaşanır. Antalya'daki anlaşmalı hastanemizde uygulanan uzun etkili bölgesel sinir blokajı (interkostal blok) ve atravmatik cerrahi teknik sayesinde hastalarımız bu süreci 10 üzerinden yalnızca 3-4 düzeyinde hafif bir baskı olarak tanımlamakta ve 3. günden itibaren basit ağrı kesicilerle rahatça geçirmektedir.",
    },
    keyTakeaways: {
      en: [
        "Sensation vs. Pain: Expect muscle tightness and fullness rather than sharp surgical pain, peaking in the first 48 hours.",
        "Painless Anesthesia Protocol: Long-acting local bupivacaine nerve blocks keep your chest comfortable during the critical first 24 hours.",
        "Rapid Mobility: You will walk inside your hospital suite within 4 hours after surgery and relax at your 5-star Lara hotel on Day 2.",
        "Safe Flight Home: UK & German patients can comfortably take a 4-hour direct flight home from Antalya (AYT) 5 to 7 days post-op.",
      ],
      de: [
        "Druckgefühl statt stechender Schmerz: Eher wie starker Muskelkater in den ersten 48 Stunden, kein scharfer Wundschmerz.",
        "Schmerzfreies Anästhesie-Protokoll: Lokale Langzeit-Nervenblockaden schützen Sie in den ersten 24 Stunden nach der OP.",
        "Schnelle Mobilität: Bereits 4 Stunden nach dem Eingriff stehen Sie auf und erholen sich ab Tag 2 im 5-Sterne-Hotel in Lara.",
        "Sicherer Rückflug: Nach 5 bis 7 Tagen in Antalya können Sie entspannt Ihren Direktflug nach Deutschland oder UK antreten.",
      ],
      tr: [
        "Keskin Ağrı Değil Kas Gerginliği: İlk 48 saatte keskin yara ağrısı değil, göğüs kaslarında spor sonrası hamlık ve baskı hissedilir.",
        "Ağrısız Anestezi Protokolü: Uzun etkili lokal sinir blokajı sayesinde ameliyat sonrası ilk 24 saat son derece konforlu geçer.",
        "Hızlı Mobilizasyon: Operasyondan 4 saat sonra odanızda yürüyebilir, 2. günde Lara'daki 5 yıldızlı otelinizde dinlenmeye geçebilirsiniz.",
        "Güvenli Uçuş: 5 ila 7 günlük Antalya kontrol sürecinin ardından İngiltere veya Almanya'ya direkt uçuşla güvenle dönebilirsiniz.",
      ],
    },
    recoveryTimeline: [
      {
        period: {
          en: "Days 1–3 (Hospital & Hotel Rest)",
          de: "Tag 1–3 (Klinik & Hotelruhe)",
          tr: "1–3. Günler (Hastane & Otel İstirahati)",
        },
        painLevel: {
          en: "3–4 / 10 (Tightness & pectoral pressure)",
          de: "3–4 / 10 (Spannungsgefühl wie Muskelkater)",
          tr: "3–4 / 10 (Göğüs kasında gerginlik ve baskı)",
        },
        milestone: {
          en: "1 night at OFM Hospital, then 5-star hotel rest with daily private nurse check-ups.",
          de: "1 Nacht in der OFM-Klinik, danach 5-Sterne-Hotel in Lara mit täglicher Schwester-Visite.",
          tr: "1 gece OFM Hastanesi konaklaması, ardından 5 yıldızlı otelde günlük özel hemşire kontrolü.",
        },
      },
      {
        period: {
          en: "Days 4–7 (Fit-to-Fly Clearance)",
          de: "Tag 4–7 (Flugfreigabe / Fit-to-Fly)",
          tr: "4–7. Günler (Uçuş Onayı & Kontrol)",
        },
        painLevel: {
          en: "1–2 / 10 (Mild soreness on deep movement)",
          de: "1–2 / 10 (Leichtes Ziehen bei Armbewegung)",
          tr: "1–2 / 10 (Sadece kol hareketlerinde hafif hassasiyet)",
        },
        milestone: {
          en: "Gentle coastal walks in Lara, final surgeon check-up, and VIP transfer to Antalya Airport.",
          de: "Leichte Strandspaziergänge in Lara, Abschlusskontrolle beim Chirurgen & VIP-Rücktransfer.",
          tr: "Lara sahilinde hafif yürüyüşler, cerrah son kontrolü ve Antalya Havalimanı'na VIP transfer.",
        },
      },
      {
        period: {
          en: "Weeks 2–3 (Return to Desk Work)",
          de: "Woche 2–3 (Büroalltag)",
          tr: "2–3. Haftalar (Masa Başı İşe Dönüş)",
        },
        painLevel: {
          en: "0–1 / 10 (Pain-free at rest)",
          de: "0–1 / 10 (In Ruhe komplett schmerzfrei)",
          tr: "0–1 / 10 (İstirahatte tamamen ağrısız)",
        },
        milestone: {
          en: "Swelling subsides by 60%; comfortable driving and returning to office or remote work.",
          de: "Schwellung geht um 60 % zurück; Büroarbeit und Autofahren problemlos möglich.",
          tr: "Ödem %60 oranında iner; masa başı işe dönüş ve araç kullanımı rahatlıkla yapılabilir.",
        },
      },
      {
        period: {
          en: "Weeks 6–12 ('Drop and Fluff' Result)",
          de: "Woche 6–12 (Endgültige natürliche Form)",
          tr: "6–12. Haftalar (Doğal Formun Oturması)",
        },
        painLevel: {
          en: "0 / 10 (Natural soft feel)",
          de: "0 / 10 (Natürliches, weiches Brustgefühl)",
          tr: "0 / 10 (Tamamen doğal ve yumuşak doku hissi)",
        },
        milestone: {
          en: "Implants settle into their natural teardrop contour; full gym and swimming resumed.",
          de: "Implantate senken sich natürlich ab ('Drop & Fluff'); voller Sport und Schwimmen erlaubt.",
          tr: "İmplantlar doğal anatomik yuvasına yerleşir; yüzme ve tüm spor aktivitelerine dönülür.",
        },
      },
    ],
    sections: [
      {
        id: "what-does-breast-augmentation-pain-feel-like",
        question: {
          en: "What Does Breast Augmentation Pain Actually Feel Like in the First 72 Hours?",
          de: "Wie fühlt sich der Schmerz in den ersten 72 Stunden nach einer Brustvergrößerung genau an?",
          tr: "Meme Büyütme Sonrası İlk 72 Saatte Ağrı Tam Olarak Nasıl Hissedilir?",
        },
        directAnswer: {
          en: "During the first 72 hours, you will experience a sensation of deep chest pressure, muscle stiffness, and skin tightness rather than sharp incision pain. Over 85% of our UK and German patients compare this feeling to doing heavy bench presses at the gym or the fullness felt when milk comes in after childbirth.",
          de: "In den ersten 72 Stunden spüren Sie vor allem ein tiefes Druckgefühl, Muskelspannung und ein Spannen der Haut – jedoch keinen scharfen Schnittschmerz. Über 85 % unserer Patientinnen aus Deutschland und Großbritannien vergleichen dieses Gefühl mit einem starken Muskelkater nach dem Brusttraining oder dem Spannungsgefühl beim Milcheinschuss.",
          tr: "İlk 72 saat boyunca kesi yerinde keskin bir acıdan ziyade göğüs kafesinde dolgunluk, kas sertliği ve cilt gerginliği hissedilir. İngiltere ve Almanya'dan gelen hastalarımızın %85'inden fazlası bu hissi spor salonunda yapılan yoğun bir göğüs antrenmanı sonrasındaki kas hamlığına veya emzirme dönemindeki göğüs dolgunluğuna benzetmektedir.",
        },
        details: {
          en: [
            "Because the breast tissue and pectoral muscle fibers are gently stretched to accommodate your new FDA-approved Motiva® or Mentor® silicone implants, your body naturally responds with mild localized swelling. This creates a sensation of weight on your chest when lying flat, which improves dramatically when resting at a 30-to-45-degree incline.",
            "The surgical incision itself—typically a tiny 3.5 cm crease hidden neatly in the inframammary fold underneath the breast—is numbed during surgery with long-acting local anesthetics, meaning you rarely feel surface stinging.",
          ],
          de: [
            "Da das Brustgewebe und die Brustmuskelfasern sanft gedehnt werden, um Platz für Ihre neuen FDA-zertifizierten Motiva®- oder Mentor®-Silikonimplantate zu schaffen, reagiert der Körper mit einer leichten Schwellung. Dies erzeugt im Liegen ein Gewichtgefühl auf der Brust, das deutlich nachlässt, sobald Sie mit leicht erhöhtem Oberkörper (30–45 Grad) ruhen.",
            "Der eigentliche Hautschnitt – meist nur 3,5 cm klein und unsichtbar in der Unterbrustfalte versteckt – wird während der OP mit einem Langzeit-Lokalanästhetikum betäubt, sodass oberflächliches Brennen kaum auftritt.",
          ],
          tr: [
            "Meme dokusu ve göğüs kası lifleri, FDA onaylı yeni nesil Motiva® veya Mentor® silikon implantlara yer açmak için nazikçe esnetildiğinden vücut doğal olarak hafif bir ödemle yanıt verir. Bu durum sırtüstü düz yatarken göğüs üzerinde ağırlık hissi oluşturabilir; ancak 30-45 derecelik eğimli yastıkla dinlenildiğinde anında hafifler.",
            "Meme altı kıvrımına gizlenen yaklaşık 3,5 cm'lik mikro kesi hattı ise operasyon sırasında uzun etkili lokal anesteziklerle uyuşturulduğu için yüzeysel batma veya yanma neredeyse hiç hissedilmez.",
          ],
        },
        bulletPoints: {
          en: [
            "Hours 1–24: Long-acting nerve block is active; you feel heavy fullness but minimal soreness.",
            "Hours 24–48: Peak muscle tightness when rising from bed; anti-inflammatory medication keeps you comfortable.",
            "Hours 48–72: Swelling stabilizes, breathing feels completely effortless, and arm mobility increases rapidly.",
          ],
          de: [
            "Stunde 1–24: Die Langzeit-Nervenblockade wirkt; Sie spüren Fülle, aber kaum Wundschmerz.",
            "Stunde 24–48: Höchstpunkt der Muskelspannung beim Aufstehen; Muskelrelaxantien sorgen für Entspannung.",
            "Stunde 48–72: Die Schwellung stabilisiert sich, die Armbeweglichkeit kehrt schnell zurück.",
          ],
          tr: [
            "1–24. Saatler: Uzun etkili sinir blokajı aktiftir; dolgunluk hissedilir ancak ağrı minimumdur.",
            "24–48. Saatler: Yataktan kalkarken kas gerginliği belirginleşir; kas gevşetici ve anti-enflamatuar protokol devreye girer.",
            "48–72. Saatler: Ödem dengelenir, kol hareketleri hızla rahatlar ve yürüyüş konforu artar.",
          ],
        },
      },
      {
        id: "is-under-the-muscle-more-painful-than-over-the-muscle",
        question: {
          en: "Is Under-the-Muscle (Dual Plane) More Painful Than Over-the-Muscle Placement?",
          de: "Ist die Platzierung unter dem Brustmuskel (Dual Plane) schmerzhafter als über dem Muskel?",
          tr: "Kas Altı (Dual Plane) Meme Büyütme Kas Üstüne Göre Daha mı Ağrılıdır?",
        },
        directAnswer: {
          en: "Yes, placing the implant partially under the pectoral muscle (Dual Plane technique) causes slightly more muscle tightness during the first 3 to 4 days compared to over-the-muscle (subglandular) placement. However, modern atraumatic Keller Funnel insertion and targeted muscle relaxants reduce this difference to just a couple of days of mild pectoral stiffness while delivering a far more natural upper-pole slope and lower risk of capsular contracture.",
          de: "Ja, die Platzierung teilweise unter dem Brustmuskel (Dual-Plane-Technik) verursacht in den ersten 3 bis 4 Tagen etwas mehr Muskelspannung als die Platzierung über dem Muskel (subglandulär). Durch den gewebeschonenden Einsatz des Keller-Funnels (kontaktlose Einführung) und gezielte Muskelrelaxantien beschränkt sich dieser Unterschied jedoch auf wenige Tage, während Sie langfristig von einem viel natürlicheren Dekolleté profitieren.",
          tr: "Evet, implantın kısmen göğüs kasının altına yerleştirildiği Dual Plane tekniği, kas üstü (subglandüler) yerleşime kıyasla ilk 3-4 gün biraz daha fazla kas gerginliği yaratır. Ancak dokuya temas etmeden implant yerleştir sağlayan Keller Funnel teknolojisi ve özel kas gevşetici protokolümüz sayesinde bu fark yalnızca birkaç günlük hafif bir hamlık hissine iner; karşılığında çok daha doğal bir dekolte geçişi ve düşük kapsül kontraktürü riski elde edilir.",
        },
        details: {
          en: [
            "In our Antalya hospital, our surgeons use electrocautery precision dissection rather than blunt surgical pulling. Because there is virtually no bleeding or muscle trauma during pocket creation, post-operative inflammation—the #1 cause of muscle spasms after Dual Plane breast augmentation—is reduced by up to 60%.",
            "If you have sufficient natural breast tissue and choose subglandular or subfascial placement, recovery is even faster, with most patients feeling only mild skin stretching for 48 hours.",
          ],
          de: [
            "In unserer Klinik in Antalya präparieren unsere Fachärzte die Implantattasche millimetergenau und blutungsarm mit feinster Elektrokauter-Technik statt durch stumpfes Dehnen. Da das Muskelgewebe kaum traumatisiert wird, sinkt die postoperative Entzündungsreaktion – die Hauptursache für Muskelkrämpfe – um bis zu 60 %.",
            "Wenn Sie über ausreichend eigenes Brustgewebe verfügen und eine subfasziale Platzierung gewählt wird, verläuft die Heilung noch schneller: Meist spüren Sie nur für 48 Stunden ein leichtes Hautspannen.",
          ],
          tr: [
            "Antalya'daki hastanemizde cerrahlarımız implant cebini künt zorlama yerine milimetrik elektrokoter diseksiyonla hazırlar. Kas dokusunda kanama ve travma oluşmadığı için, Dual Plane meme büyütme sonrası kas spazmlarının bir numaralı nedeni olan doku enflamasyonu %60'a varan oranda azalır.",
            "Yeterli doğal meme dokusuna sahip hastalarda tercih edilen zar altı (subfasyal) veya kas üstü yerleşimde ise kas lifleri hiç etkilenmediğinden iyileşme çok daha hızlıdır.",
          ],
        },
      },
      {
        id: "how- long-does-breast-augmentation-recovery-take",
        question: {
          en: "How Long Does Breast Augmentation Recovery Take Day-by-Day?",
          de: "Wie lange dauert die Heilung nach einer Brustvergrößerung Tag für Tag?",
          tr: "Meme Büyütme İyileşme Süreci Gün Gün Ne Kadar Sürer?",
        },
        directAnswer: {
          en: "Initial recovery takes just 5 to 7 days, which is why international patients can comfortably enjoy a recuperative stay in Antalya and fly home within one week. Most women return to desk work in 7 to 10 days, resume light lower-body cardio at 3 weeks, and achieve full implant settling ('drop and fluff') between 6 and 12 weeks.",
          de: "Die erste Erholungsphase dauert nur 5 bis 7 Tage – ideal für internationale Patientinnen, um sich im sonnigen Antalya zu erholen und nach einer Woche entspannt nach Hause zu fliegen. Nach 7 bis 10 Tagen sind Sie wieder fit für Büroarbeiten, nach 3 Wochen für leichtes Ausdauertraining und nach 6 bis 12 Wochen ist das endgültige Ergebnis erreicht.",
          tr: "İlk klinik iyileşme evresi yalnızca 5 ila 7 gün sürer; bu sayede yurt dışından gelen hastalarımız Antalya'da 5 yıldızlı otellerinde dinlenip 1 hafta içinde güvenle ülkelerine uçabilirler. Hastaların büyük çoğunluğu 7-10 gün içinde masa başı işine döner, 3. haftada hafif yürüyüş ve alt vücut egzersizlerine başlar, 6 ila 12 hafta arasında ise implantların tam doğal formuna kavuştuğu nihai sonucu görür.",
        },
        details: {
          en: [
            "Day 1 (Surgery Day): Your procedure takes 60 to 90 minutes under general anesthesia. You wake up wearing a soft medical compression bra with your nerve block fully active, and you stay overnight in a private suite at OFM Antalya Hospital.",
            "Days 2–4 (5-Star Lara Hotel Recovery): After your surgeon's morning check-up, our VIP chauffeur transfers you to your 5-star hotel in Lara. Our multilingual private nurse visits your hotel room daily to check your incisions and assist with medication.",
            "Days 5–7 (Final Check & Flight Home): Your surgeon performs a final ultrasound and incision check, applies waterproof medical tape, hands you your official warranty cards and Fit-to-Fly certificate, and you take your direct flight home.",
          ],
          de: [
            "Tag 1 (OP-Tag): Der Eingriff dauert 60 bis 90 Minuten in Vollnarkose. Sie wachen schmerzarm mit einem weichen medizinischen Stütz-BH auf und verbringen eine Nacht in Ihrer Privatsuite im OFM Antalya Hospital.",
            "Tag 2–4 (5-Sterne-Hotel in Lara): Nach der morgendlichen Chefarzt-Visite bringt Sie unser VIP-Fahrer in Ihr 5-Sterne-Hotel in Lara. Unsere Krankenschwester besucht Sie täglich im Hotelzimmer zur Wundkontrolle.",
            "Tag 5–7 (Abschlusskontrolle & Rückflug): Ihr Chirurg führt die Endkontrolle durch, übergibt Ihnen den Implantatpass sowie das Fit-to-Fly-Zertifikat, und Sie treten Ihren Direktflug nach Deutschland oder UK an.",
          ],
          tr: [
            "1. Gün (Operasyon Günü): İşlem genel anestezi altında 60-90 dakika sürer. Özel medikal destek sütyeniniz giydirilmiş ve sinir blokajınız aktif halde uyanır, geceyi OFM Antalya Hastanesi'ndeki özel süitinizde geçirirsiniz.",
            "2–4. Günler (5 Yıldızlı Lara Otelinde Dinlenme): Sabah cerrah vizitinden sonra VIP aracımızla Lara'daki 5 yıldızlı otelinize geçersiniz. Özel hemşiremiz her gün otel odanızda pansuman ve ilaç takibinizi yapar.",
            "5–7. Günler (Son Kontrol ve Eve Uçuş): Cerrahınız son kontrolü yapar, su geçirmez medikal bantlarınızı uygular, uluslararası implant garanti sertifikanızı ve 'Uçuşa Uygunluk (Fit-to-Fly)' belgenizi teslim eder.",
          ],
        },
        tipBox: {
          title: {
            en: "Surgeon's Recovery Tip: Why Mediterranean Sunshine Helps",
            de: "Tipp vom Facharzt: Warum die Erholung am Mittelmeer schneller gelingt",
            tr: "Cerrahın İyileşme İpucu: Akdeniz İkliminde Dinlenmenin Avantajı",
          },
          text: {
            en: "Gentle 15-minute walks on level ground by Day 3 boost healthy blood circulation and reduce swelling faster than staying in bed all day. Our Lara beachside hotels offer flat, palm-lined promenades just 15 minutes from Antalya Airport.",
            de: "Leichte 15-minütige Spaziergänge auf ebenem Boden ab Tag 3 fördern die Durchblutung und lassen Schwellungen schneller abklingen als reine Bettruhe. Unsere 5-Sterne-Hotels in Antalya-Lara bieten dafür flache, ruhige Strandpromenaden.",
            tr: "3. günden itibaren düz zeminde yapılacak 15 dakikalık hafif yürüyüşler kan dolaşımını hızlandırarak ödemin yatakta sürekli yatmaya kıyasla çok daha hızlı dağılmasını sağlar. Lara sahil otellerimiz bu yürüyüşler için idealdir.",
          },
        },
      },
      {
        id: "how-do-we-make-breast-augmentation-recovery-painless-in-antalya",
        question: {
          en: "How Do Our Surgeons Make Breast Augmentation Recovery Painless in Antalya?",
          de: "Wie sorgen unsere Chirurgen in Antalya für eine nahezu schmerzfreie Heilung?",
          tr: "Antalya'daki Cerrahlarımız Meme Büyütme İyileşmesini Nasıl Ağrısız Hale Getiriyor?",
        },
        directAnswer: {
          en: "We combine three advanced medical protocols: ultrasound-guided intercostal nerve blocks that numb the chest for 24+ hours, the no-touch Keller Funnel implant delivery system that requires a 30% smaller incision, and a tailored 5-day pack of muscle relaxants and anti-inflammatories. Together, these prevent pain before your nervous system ever registers it.",
          de: "Wir kombinieren drei moderne klinische Verfahren: gezielte Interkostal-Nervenblockaden für über 24 Stunden Schmerzfreiheit, die kontaktlose Keller-Funnel-Technik für 30 % kleinere Schnitte sowie ein abgestimmtes 5-Tage-Medikamentenpaket mit Muskelrelaxantien. Dadurch wird Schmerz blockiert, bevor das Nervensystem ihn überhaupt wahrnimmt.",
          tr: "Antalya'daki merkezimizde üç ileri protokolü birleştiriyoruz: göğüs bölgesini 24 saatten uzun süre uyuşturan interkostal sinir blokajı, kesiyi %30 küçülten temassız Keller Funnel yerleştirme sistemi ve kas spazmını önleyen 5 günlük özel medikal paket. Böylece ağrı sinyalleri henüz sinir sistemine ulaşmadan engellenir.",
        },
        details: {
          en: [
            "Traditional clinics often rely on heavy post-op opioids after you wake up in pain, which can cause nausea and grogginess. At CosmetoCity's partner hospital in Antalya, we practice pre-emptive analgesia: while you are asleep, your surgeon injects long-acting bupivacaine directly around the sensory nerves of the breast pocket.",
            "In addition, our private hotel nursing team visits you at your 5-star hotel in Lara so you never have to travel back and forth in traffic for routine dressing checks.",
          ],
          de: [
            "Klassische Kliniken verabreichen oft erst starke Opioide, wenn der Schmerz nach dem Aufwachen bereits da ist – was häufig zu Übelkeit führt. In unserer Partnerklinik in Antalya setzen wir auf präventive Analgesie: Noch während Sie schlafen, betäubt der Chirurg gezielt die sensiblen Nervenbahnen der Brusttasche.",
            "Zudem besucht Sie unser Pflegeteam direkt in Ihrem 5-Sterne-Hotel in Lara, sodass Sie für Routinekontrollen keinen stressigen Straßenverkehr auf sich nehmen müssen.",
          ],
          tr: [
            "Klasik yaklaşımda hastalar uyandıktan sonra ağrı başladığında ağır opioid ağrı kesiciler verilir ve bu durum bulantı yaratabilir. CosmetoCity'nin Antalya partner hastanesinde ise 'önleyici analjezi' uygulanır: siz henüz uyurken cerrahımız meme cebinin duyusal sinir çevresine uzun etkili bupivakain uygular.",
            "Ayrıca özel otel hemşiresi ekibimiz Lara'daki 5 yıldızlı otelinize gelerek kontrollerinizi odanızda gerçekleştirir; böylece trafikte kliniğe gidip gelme yorgunluğu yaşamazsınız.",
          ],
        },
      },
      {
        id: "when-can-i-fly-home-after-breast-augmentation-in-turkey",
        question: {
          en: "When Is It Safe to Fly Home After Breast Augmentation in Turkey?",
          de: "Ab wann kann man nach einer Brustvergrößerung in der Türkei sicher zurückfliegen?",
          tr: "Türkiye'de Meme Büyütme Ameliyatından Kaç Gün Sonra Uçağa Binilebilir?",
        },
        directAnswer: {
          en: "It is completely safe to fly home 5 to 7 days after breast augmentation in Turkey, once your surgeon confirms normal healing and issues your Fit-to-Fly certificate. Cabin pressure in commercial aircraft does not affect FDA/CE-certified silicone gel breast implants in any way.",
          de: "Ein Rückflug nach Deutschland, Österreich, in die Schweiz oder nach UK ist 5 bis 7 Tage nach einer Brustvergrößerung in der Türkei absolut sicher, sobald Ihr Chirurg die Wundheilung bestätigt und das Fit-to-Fly-Zertifikat ausstellt. Der Kabinendruck im Flugzeug hat keinerlei Einfluss auf moderne, FDA/CE-zertifizierte Silikongel-Implantate.",
          tr: "Meme büyütme ameliyatından 5 ila 7 gün sonra, cerrahınızın son muayenesini yapıp 'Uçuşa Uygunluk (Fit-to-Fly)' belgenizi vermesiyle birlikte uçağa binmek tamamen güvenlidir. Yolcu uçaklarındaki kabin basıncı, FDA ve CE onaylı yeni nesil koheziv silikon jel implantları hiçbir şekilde etkilemez.",
        },
        details: {
          en: [
            "A common myth online is that breast implants react to altitude or cabin pressure—this is scientifically false. Cohesive silicone gel implants are stable at any altitude. The only precaution during your flight from Antalya Airport (AYT) is avoiding lifting heavy cabin luggage overhead.",
            "Our VIP driver escorts you directly to the terminal entrance and helps with all your bags, and we advise booking airline assistance or traveling with a companion(whose 5-star hotel stay is included at no extra room charge in our packages) so you never lift anything heavier than 3 kg.",
          ],
          de: [
            "Ein weit verbreiteter Mythos im Internet besagt, dass Brustimplantate auf Kabinendruck reagieren – das ist medizinisch falsch. Kohäsive Silikongel-Implantate bleiben in jeder Flughöhe völlig stabil. Die einzige Regel für Ihren Rückflug ab Antalya (AYT) lautet: Heben Sie kein schweres Handgepäck in das Gepäckfach über dem Sitz.",
            "Unser VIP-Chauffeur bringt Sie bis zum Terminal-Eingang und übernimmt Ihr Gepäck. Zudem darf eine Begleitperson ohne Aufpreis in Ihrem 5-Sterne-Hotelzimmer übernachten, um Sie auf der Rückreise zu unterstützen.",
          ],
          tr: [
            "İnternette sıkça karşılaşılan 'uçak kabin basıncının silikon implantlara zarar verdiği' iddiası tıbben tamamen yanlıştır. Koheziv jel implantlar her irtifada stabildir. Antalya Havalimanı'ndan (AYT) dönüş uçuşunuzdaki tek kural, baş üstü dolabına ağır kabin bagajı kaldırmamaktır.",
            "VIP şoförümüz valizlerinizi terminal girişine kadar taşır; ayrıca paketlerimizde 1 refakatçinizin 5 yıldızlı otel konaklaması ücretsiz olduğu için dönüş yolculuğunda eşyalarınızı hiç zorlanmadan taşıyabilirsiniz.",
          ],
        },
      },
    ],
    midArticleCta: {
      badge: {
        en: "PAINLESS RECOVERY PROTOCOL • FREE SURGEON ASSESSMENT",
        de: "SCHMERZARMES HEILUNGSPROTOKOLL • KOSTENLOSE ARZTBERATUNG",
        tr: "AĞRISIZ İYİLEŞME PROTOKOLÜMÜZ • ÜCRETSİZ CERRAH DEĞERLENDİRMESİ",
      },
      title: {
        en: "Speak with Our Medical Coordinator on WhatsApp About a Painless Recovery",
        de: "Sprechen Sie per WhatsApp mit unserem medizinischen Koordinator über eine schmerzarme Heilung",
        tr: "Ağrısız İyileşme Süreci Hakkında Tıbbi Koordinatörümüzle WhatsApp'tan Konuşun",
      },
      description: {
        en: "Have questions about Motiva® / Mentor® implant sizes, nerve-block pain relief, or our 5-star Antalya recovery packages? Chat directly with our English & German speaking medical desk—no obligation, instant answers.",
        de: "Haben Sie Fragen zu Motiva®- / Mentor®-Implantatgrößen, unserem Schmerzblockade-Protokoll oder dem 5-Sterne-Aufenthalt in Antalya? Schreiben Sie direkt unserem deutschsprachigen Koordinator – unverbindlich & diskret.",
        tr: "Motiva® / Mentor® implant seçimi, sinir blokajı ile ağrısız ameliyat protokolümüz veya Antalya 5 yıldızlı otel paketlerimiz hakkında merak ettiklerinizi tıbbi koordinatörümüze doğrudan WhatsApp'tan sorun.",
      },
      buttonText: {
        en: "Chat with Medical Coordinator on WhatsApp",
        de: "Jetzt per WhatsApp mit Koordinator sprechen",
        tr: "Tıbbi Koordinatörümüzle WhatsApp'tan Konuşun",
      },
      whatsappTopic: {
        en: "Breast Augmentation & Painless Recovery Guide",
        de: "Brustvergrößerung & Schmerzarmer Heilungsverlauf",
        tr: "Meme Büyütme ve Ağrısız İyileşme Süreci",
      },
    },
    bottomArticleCta: {
      badge: {
        en: "PERSONALIZED 3D TREATMENT PLAN • ANTALYA & ISTANBUL",
        de: "INDIVIDUELLER BEHANDLUNGSPLAN • ANTALYA & ISTANBUL",
        tr: "KİŞİYE ÖZEL TEDAVİ PLANI • ANTALYA & İSTANBUL",
      },
      title: {
        en: "Ready for Your Personalized Breast Augmentation Assessment & All-Inclusive Quote?",
        de: "Bereit für Ihre persönliche Brust-Analyse & Ihr All-Inclusive-Angebot in Antalya?",
        tr: "Kişiye Özel Meme Estetiği Değerlendirmeniz ve Her Şey Dahil Teklifiniz İçin Hazır mısınız?",
      },
      description: {
        en: "Get a free surgeon evaluation, transparent package pricing (including OFM Antalya Hospital, FDA-approved implants, 5-star Lara hotel & VIP transfers), and your day-by-day recovery plan on WhatsApp within minutes.",
        de: "Erhalten Sie innerhalb weniger Minuten per WhatsApp eine kostenlose Facharzt-Einschätzung, Ihren transparenten Komplettpreis (inkl. OFM-Klinik, FDA-Implantaten, 5-Sterne-Hotel in Lara & VIP-Transfers) sowie Ihren Heilungsplan.",
        tr: "Ücretsiz cerrah değerlendirmesi, şeffaf her şey dahil VIP paket fiyatı (OFM Antalya Hastanesi, FDA onaylı implantlar, 5 yıldızlı Lara oteli ve VIP transferler dahil) için WhatsApp hattımızdan hemen bilgi alın.",
      },
      buttonText: {
        en: "Get Free Surgeon Evaluation on WhatsApp",
        de: "Kostenlose Facharzt-Einschätzung per WhatsApp",
        tr: "WhatsApp'tan Ücretsiz Cerrah Değerlendirmesi Alın",
      },
      whatsappTopic: {
        en: "Breast Augmentation Free Surgeon Assessment & Package Quote",
        de: "Brustvergrößerung Kostenlose Facharzt-Einschätzung & Paketpreis",
        tr: "Meme Büyütme Ücretsiz Doktor Değerlendirmesi ve Paket Fiyatı",
      },
    },
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function generateFaqJsonLd(post: BlogPost, locale: Locale = "en") {
  const mainEntity = [
    {
      "@type": "Question",
      name: post.h1Question[locale],
      acceptedAnswer: {
        "@type": "Answer",
        text: post.h1DirectAnswer[locale],
      },
    },
    ...post.sections.map((section) => ({
      "@type": "Question",
      name: section.question[locale],
      acceptedAnswer: {
        "@type": "Answer",
        text: section.directAnswer[locale],
      },
    })),
  ];

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
  };
}
