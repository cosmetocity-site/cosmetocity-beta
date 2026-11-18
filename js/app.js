// Cosmetocity - Main Application Controller
(function () {
  const WHATSAPP_NUMBER = "905000000000"; // Replaceable clinic WhatsApp number
  let currentLang = localStorage.getItem('cosmetocity_lang') || 'en';
  let activeCategory = 'all';
  let selectedCalcProcedureId = 'sapphire-fue';

  // Ensure valid language code
  if (!window.COSMETOCITY_TRANSLATIONS[currentLang]) {
    currentLang = 'en';
  }

  function getLangMeta(code) {
    return window.COSMETOCITY_LANGUAGES.find(l => l.code === code) || window.COSMETOCITY_LANGUAGES[0];
  }

  function t(key) {
    const dict = window.COSMETOCITY_TRANSLATIONS[currentLang] || window.COSMETOCITY_TRANSLATIONS.en;
    return dict[key] || window.COSMETOCITY_TRANSLATIONS.en[key] || key;
  }

  // Format Euro Currency
  function formatEuro(amount) {
    return '€' + Number(amount).toLocaleString('en-US');
  }

  // Render Language Switcher Dropdowns (Desktop & Mobile)
  function renderLanguageSwitchers() {
    const meta = getLangMeta(currentLang);
    const currentBtnContent = document.getElementById('current-lang-display');
    if (currentBtnContent) {
      currentBtnContent.innerHTML = `<span class="text-base">${meta.flag}</span> <span class="font-semibold">${meta.short}</span> <span class="hidden sm:inline text-xs text-slate-300">(${meta.label})</span>`;
    }

    const listContainer = document.getElementById('lang-dropdown-list');
    if (listContainer) {
      listContainer.innerHTML = window.COSMETOCITY_LANGUAGES.map(lang => {
        const isActive = lang.code === currentLang;
        return `
          <button type="button" data-lang-select="${lang.code}"
            class="w-full flex items-center justify-between px-3.5 py-2.5 text-sm rounded-lg transition ${
              isActive
                ? 'bg-[#C8A46E]/20 text-[#E5CFA8] font-semibold border border-[#C8A46E]/40'
                : 'text-slate-200 hover:bg-white/10'
            }">
            <span class="flex items-center gap-2.5">
              <span class="text-base">${lang.flag}</span>
              <span>${lang.label}</span>
            </span>
            <span class="text-xs uppercase opacity-75">${lang.short}</span>
          </button>
        `;
      }).join('');

      listContainer.querySelectorAll('[data-lang-select]').forEach(btn => {
        btn.addEventListener('click', () => {
          const code = btn.getAttribute('data-lang-select');
          setLanguage(code);
          const dropdown = document.getElementById('lang-dropdown-menu');
          if (dropdown) dropdown.classList.add('hidden');
        });
      });
    }
  }

  // Update all [data-i18n] elements
  function applyStaticTranslations() {
    const meta = getLangMeta(currentLang);
    document.documentElement.lang = meta.code;
    document.documentElement.dir = meta.dir;
    document.title = t('metaTitle');

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = t(key);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.setAttribute('placeholder', t(key));
    });
  }

  // Populate Quick Finder Procedure Select
  function populateQuickFinderProcedures(categoryFilter) {
    const procSelect = document.getElementById('quick-procedure-select');
    if (!procSelect) return;

    const filtered = window.COSMETOCITY_PROCEDURES.filter(p =>
      !categoryFilter || categoryFilter === 'all' || p.category === categoryFilter
    );

    procSelect.innerHTML = filtered.map(p => {
      const title = p.title[currentLang] || p.title.en;
      return `<option value="${p.id}" class="bg-[#0B2534] text-white">${title} (${formatEuro(p.priceCosmeto)})</option>`;
    }).join('');
  }

  // Render Treatment Category Tabs & Cards
  function renderTreatmentSection() {
    const categories = [
      { id: 'all', label: currentLang === 'ar' ? 'جميع العلاجات (12)' : 'All Signature Procedures (12)', icon: 'fa-layer-group' },
      { id: 'hair', label: t('catHair'), icon: 'fa-user-check' },
      { id: 'dental', label: t('catDental'), icon: 'fa-tooth' },
      { id: 'plastic', label: t('catPlastic'), icon: 'fa-wand-magic-sparkles' },
      { id: 'bariatric', label: t('catBariatric'), icon: 'fa-weight-scale' }
    ];

    const tabsContainer = document.getElementById('treatment-tabs');
    if (tabsContainer) {
      tabsContainer.innerHTML = categories.map(cat => `
        <button type="button" data-cat-tab="${cat.id}"
          class="tab-btn px-5 py-3 rounded-xl border text-sm font-semibold transition flex items-center gap-2.5 ${
            activeCategory === cat.id
              ? 'active'
              : 'bg-white text-slate-700 border-slate-200 hover:border-[#C8A46E]'
          }">
          <i class="fa-solid ${cat.icon} text-[#C8A46E]"></i>
          <span>${cat.label}</span>
        </button>
      `).join('');

      tabsContainer.querySelectorAll('[data-cat-tab]').forEach(btn => {
        btn.addEventListener('click', () => {
          activeCategory = btn.getAttribute('data-cat-tab');
          renderTreatmentSection();
        });
      });
    }

    const grid = document.getElementById('treatments-grid');
    if (!grid) return;

    const list = window.COSMETOCITY_PROCEDURES.filter(p =>
      activeCategory === 'all' || p.category === activeCategory
    );

    grid.innerHTML = list.map(proc => {
      const title = proc.title[currentLang] || proc.title.en;
      const desc = proc.desc[currentLang] || proc.desc.en;
      const savingsPct = Math.round(((proc.priceEu - proc.priceCosmeto) / proc.priceEu) * 100);

      return `
        <article class="treatment-card bg-white rounded-2xl border border-slate-200/90 overflow-hidden flex flex-col justify-between shadow-sm">
          <div>
            <div class="relative h-52 overflow-hidden bg-slate-900">
              <img src="${proc.image}" alt="${title}" loading="lazy"
                class="w-full h-full object-cover object-center transition duration-500 hover:scale-105 opacity-90" />
              <div class="absolute inset-0 bg-gradient-to-t from-[#071923]/90 via-[#071923]/25 to-transparent"></div>
              <span class="absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#071923]/85 text-[#E5CFA8] border border-[#C8A46E]/40 backdrop-blur-md">
                ${proc.badge}
              </span>
              <span class="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-600/90 text-white backdrop-blur-md">
                -${savingsPct}% vs EU/UK
              </span>
              <div class="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs">
                <span class="flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-md backdrop-blur-sm">
                  <i class="fa-regular fa-calendar text-[#C8A46E]"></i>
                  <span>${t('cardDuration')}: <strong>${proc.stayDays}</strong></span>
                </span>
                <span class="flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-md backdrop-blur-sm">
                  <i class="fa-solid fa-heart-pulse text-[#C8A46E]"></i>
                  <span>${proc.recovery}</span>
                </span>
              </div>
            </div>

            <div class="p-6">
              <h3 class="text-xl font-bold text-slate-900 mb-2 leading-snug">${title}</h3>
              <p class="text-slate-600 text-sm leading-relaxed mb-5">${desc}</p>
            </div>
          </div>

          <div class="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between gap-4 bg-slate-50/60">
            <div>
              <span class="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold">${t('cardAllInclusive')}</span>
              <div class="flex items-baseline gap-2">
                <span class="text-2xl font-extrabold text-[#0B2534]">${formatEuro(proc.priceCosmeto)}</span>
                <span class="text-xs line-through text-slate-400">${formatEuro(proc.priceEu)}</span>
              </div>
            </div>
            <button type="button" data-select-procedure="${proc.id}"
              class="px-4 py-2.5 rounded-xl bg-[#0B2534] hover:bg-[#13384E] text-[#E5CFA8] text-xs font-bold tracking-wide transition flex items-center gap-2 shrink-0">
              <span>${t('cardInquireBtn')}</span>
              <i class="fa-solid fa-arrow-right rtl-flip text-[11px]"></i>
            </button>
          </div>
        </article>
      `;
    }).join('');

    grid.querySelectorAll('[data-select-procedure]').forEach(btn => {
      btn.addEventListener('click', () => {
        const procId = btn.getAttribute('data-select-procedure');
        selectProcedureForConsultation(procId);
      });
    });
  }

  // Interactive Price & Savings Calculator
  function renderPriceCalculator() {
    const selectEl = document.getElementById('calc-procedure-select');
    if (!selectEl) return;

    selectEl.innerHTML = window.COSMETOCITY_PROCEDURES.map(p => {
      const title = p.title[currentLang] || p.title.en;
      const selected = p.id === selectedCalcProcedureId ? 'selected' : '';
      return `<option value="${p.id}" ${selected} class="bg-[#0B2534] text-white">${title}</option>`;
    }).join('');

    updateCalculatorDisplay();
  }

  function updateCalculatorDisplay() {
    const proc = window.COSMETOCITY_PROCEDURES.find(p => p.id === selectedCalcProcedureId) || window.COSMETOCITY_PROCEDURES[0];
    const savings = proc.priceEu - proc.priceCosmeto;
    const pct = Math.round((savings / proc.priceEu) * 100);

    const euEl = document.getElementById('calc-eu-price');
    const cosmetoEl = document.getElementById('calc-cosmeto-price');
    const savingsEl = document.getElementById('calc-savings-amount');
    const pctEl = document.getElementById('calc-savings-pct');

    if (euEl) euEl.textContent = formatEuro(proc.priceEu);
    if (cosmetoEl) cosmetoEl.textContent = formatEuro(proc.priceCosmeto);
    if (savingsEl) savingsEl.textContent = formatEuro(savings);
    if (pctEl) pctEl.textContent = `-${pct}%`;
  }

  // Render Verified Patient Reviews
  function renderReviews() {
    const container = document.getElementById('reviews-grid');
    if (!container) return;

    container.innerHTML = window.COSMETOCITY_REVIEWS.map(rev => {
      const procName = rev.procedure[currentLang] || rev.procedure.en;
      const text = rev.text[currentLang] || rev.text.en;

      return `
        <div class="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-1 text-amber-400 text-sm">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <span class="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <i class="fa-solid fa-circle-check mr-1"></i> Verified Patient
              </span>
            </div>
            <p class="text-slate-700 text-sm leading-relaxed italic mb-6">${text}</p>
          </div>
          <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div>
              <h4 class="font-bold text-slate-900 text-sm">${rev.name}</h4>
              <p class="text-xs text-slate-500">${rev.country}</p>
            </div>
            <span class="text-[11px] font-semibold text-[#0B2534] bg-slate-100 px-3 py-1 rounded-lg max-w-[180px] truncate">
              ${procName}
            </span>
          </div>
        </div>
      `;
    }).join('');
  }

  // Render Multilingual FAQ Accordion
  function renderFaqs() {
    const container = document.getElementById('faq-accordion');
    if (!container) return;

    container.innerHTML = window.COSMETOCITY_FAQS.map((item, idx) => {
      const q = item.q[currentLang] || item.q.en;
      const a = item.a[currentLang] || item.a.en;
      const isOpen = idx === 0;

      return `
        <div class="border border-slate-200 rounded-2xl bg-white overflow-hidden">
          <button type="button" data-faq-toggle="${idx}"
            class="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50/80 transition">
            <span class="font-bold text-slate-900 text-base">${q}</span>
            <span id="faq-icon-${idx}" class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[#0B2534] shrink-0 transition-transform ${isOpen ? 'rotate-180 bg-[#C8A46E]/20' : ''}">
              <i class="fa-solid fa-chevron-down text-xs"></i>
            </span>
          </button>
          <div id="faq-body-${idx}" class="${isOpen ? 'block' : 'hidden'} px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
            ${a}
          </div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('[data-faq-toggle]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = btn.getAttribute('data-faq-toggle');
        const body = document.getElementById(`faq-body-${idx}`);
        const icon = document.getElementById(`faq-icon-${idx}`);
        if (body) {
          const isHidden = body.classList.contains('hidden');
          body.classList.toggle('hidden', !isHidden);
          if (icon) icon.classList.toggle('rotate-180', isHidden);
        }
      });
    });
  }

  // Populate Consultation Form Treatment Select
  function populateFormTreatmentOptions() {
    const formCategorySelect = document.getElementById('form-treatment-select');
    if (!formCategorySelect) return;

    formCategorySelect.innerHTML = window.COSMETOCITY_PROCEDURES.map(p => {
      const title = p.title[currentLang] || p.title.en;
      return `<option value="${p.id}">${title} — VIP (${formatEuro(p.priceCosmeto)})</option>`;
    }).join('');

    const formLangSelect = document.getElementById('form-language-select');
    if (formLangSelect) {
      formLangSelect.innerHTML = window.COSMETOCITY_LANGUAGES.map(l => {
        const selected = l.code === currentLang ? 'selected' : '';
        return `<option value="${l.label}" ${selected}>${l.flag} ${l.label}</option>`;
      }).join('');
    }
  }

  // Scroll to Consultation Form & Pre-select Procedure
  function selectProcedureForConsultation(procId) {
    const formSelect = document.getElementById('form-treatment-select');
    if (formSelect) {
      formSelect.value = procId;
    }
    const section = document.getElementById('consultation');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Switch Active Language
  function setLanguage(code) {
    if (!window.COSMETOCITY_TRANSLATIONS[code]) return;
    currentLang = code;
    localStorage.setItem('cosmetocity_lang', code);

    renderLanguageSwitchers();
    applyStaticTranslations();
    const quickCat = document.getElementById('quick-category-select');
    populateQuickFinderProcedures(quickCat ? quickCat.value : 'all');
    renderTreatmentSection();
    renderPriceCalculator();
    renderReviews();
    renderFaqs();
    populateFormTreatmentOptions();
  }

  // Initialize Event Listeners on DOM Ready
  document.addEventListener('DOMContentLoaded', () => {
    // Language dropdown toggle
    const langBtn = document.getElementById('lang-dropdown-btn');
    const langMenu = document.getElementById('lang-dropdown-menu');
    if (langBtn && langMenu) {
      langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langMenu.classList.toggle('hidden');
      });
      document.addEventListener('click', () => {
        langMenu.classList.add('hidden');
      });
    }

    // Mobile Menu toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu-panel');
    if (mobileBtn && mobileMenu) {
      mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
      });
    }

    // Quick Finder Category Change
    const quickCatSelect = document.getElementById('quick-category-select');
    if (quickCatSelect) {
      quickCatSelect.addEventListener('change', () => {
        populateQuickFinderProcedures(quickCatSelect.value);
      });
    }

    // Quick Finder Form Submit
    const quickForm = document.getElementById('quick-finder-form');
    if (quickForm) {
      quickForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const procSelect = document.getElementById('quick-procedure-select');
        const phoneInput = document.getElementById('quick-phone-input');
        const procId = procSelect ? procSelect.value : 'sapphire-fue';
        const phoneVal = phoneInput ? phoneInput.value : '';

        const mainPhone = document.getElementById('form-phone');
        if (mainPhone && phoneVal) mainPhone.value = phoneVal;
        selectProcedureForConsultation(procId);
      });
    }

    // Calculator Procedure Change
    const calcSelect = document.getElementById('calc-procedure-select');
    if (calcSelect) {
      calcSelect.addEventListener('change', () => {
        selectedCalcProcedureId = calcSelect.value;
        updateCalculatorDisplay();
      });
    }

    const calcLockBtn = document.getElementById('calc-lock-btn');
    if (calcLockBtn) {
      calcLockBtn.addEventListener('click', () => {
        selectProcedureForConsultation(selectedCalcProcedureId);
      });
    }

    // Main Consultation Form Submission
    const consultForm = document.getElementById('main-consultation-form');
    if (consultForm) {
      consultForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('form-name')?.value || '';
        const country = document.getElementById('form-country')?.value || '';
        const phone = document.getElementById('form-phone')?.value || '';
        const procId = document.getElementById('form-treatment-select')?.value || 'sapphire-fue';
        const langPref = document.getElementById('form-language-select')?.value || 'English';
        const notes = document.getElementById('form-notes')?.value || '';

        const procObj = window.COSMETOCITY_PROCEDURES.find(p => p.id === procId);
        const procTitle = procObj ? (procObj.title[currentLang] || procObj.title.en) : procId;

        const successBanner = document.getElementById('form-success-banner');
        if (successBanner) {
          successBanner.classList.remove('hidden');
          successBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // Prepare dynamic WhatsApp link
        const waText = encodeURIComponent(
          `Hello Cosmetocity Medical Team,\n` +
          `Name: ${name}\n` +
          `Country: ${country}\n` +
          `Phone: ${phone}\n` +
          `Procedure: ${procTitle}\n` +
          `Preferred Language: ${langPref}\n` +
          `Notes: ${notes}`
        );
        const waLink = document.getElementById('form-whatsapp-direct');
        if (waLink) {
          waLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`;
        }
      });
    }

    // Direct WhatsApp Button in Form
    const waDirectBtn = document.getElementById('form-whatsapp-direct');
    if (waDirectBtn) {
      waDirectBtn.addEventListener('click', () => {
        const name = document.getElementById('form-name')?.value || '';
        const procId = document.getElementById('form-treatment-select')?.value || 'sapphire-fue';
        const procObj = window.COSMETOCITY_PROCEDURES.find(p => p.id === procId);
        const procTitle = procObj ? (procObj.title[currentLang] || procObj.title.en) : procId;
        const msg = encodeURIComponent(`Hello Cosmetocity! My name is ${name || 'a patient'}. I would like a free consultation for: ${procTitle}.`);
        waDirectBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
      });
    }

    // Initialize full UI with current language
    setLanguage(currentLang);
  });
})();
