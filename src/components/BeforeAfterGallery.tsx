"use client";

import React, { useState } from "react";
import {
  SlidersHorizontal,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";
import {
  Locale,
  CityOption,
  SITE_COPY,
  BEFORE_AFTER_CASES,
  buildWhatsAppLink,
} from "@/data/content";
import { trackWhatsAppClick } from "@/lib/analytics";

interface BeforeAfterGalleryProps {
  locale: Locale;
  selectedCity: CityOption;
}

export default function BeforeAfterGallery({
  locale,
  selectedCity,
}: BeforeAfterGalleryProps) {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);

  const copy = SITE_COPY[locale];
  const currentCase = BEFORE_AFTER_CASES[activeCaseIndex];

  return (
    <section
      id="before-after"
      className="py-16 sm:py-24 bg-cosmeto-sand border-y border-cosmeto-sandBorder"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-bold tracking-widest uppercase text-cosmeto-teal block mb-2">
            {copy.beforeAfterTag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-cosmeto-charcoal mb-3 uppercase">
            {copy.beforeAfterTitle}
          </h2>
          <div className="w-16 h-1 bg-cosmeto-green mx-auto mb-4 rounded-full" />
          <p className="text-cosmeto-body text-sm sm:text-base">
            {copy.beforeAfterSubtitle}
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {BEFORE_AFTER_CASES.map((c, idx) => (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                setActiveCaseIndex(idx);
                setSliderPosition(50);
              }}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition border ${
                activeCaseIndex === idx
                  ? "bg-cosmeto-green text-white border-cosmeto-green shadow-md"
                  : "bg-white text-cosmeto-charcoal border-cosmeto-sandBorder hover:border-cosmeto-green"
              }`}
            >
              {c.procedureName[locale]}
            </button>
          ))}
        </div>

        {/* Interactive Split Comparison Viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-8 border-2 border-cosmeto-green/50 shadow-lg mb-10">
          <div className="lg:col-span-7">
            <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden select-none border border-cosmeto-sandBorder">
              {/* AFTER Image */}
              <img
                src={currentCase.afterImage}
                alt="After Treatment"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* BEFORE Image Clipped */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={currentCase.beforeImage}
                  alt="Before Treatment"
                  loading="lazy"
                  className="w-full h-full object-cover max-w-none"
                  style={{ width: "100%" }}
                />
              </div>

              {/* Slider Handle */}
              <div
                className="absolute inset-y-0 w-1 bg-cosmeto-green shadow-xl pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-cosmeto-green text-white font-bold flex items-center justify-center shadow-lg border-2 border-white">
                  <SlidersHorizontal className="w-4 h-4" />
                </div>
              </div>

              <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-lg bg-cosmeto-charcoal/85 text-white text-xs font-bold tracking-wider">
                {copy.beforeLabel}
              </span>
              <span className="absolute top-3.5 right-3.5 px-3 py-1 rounded-lg bg-cosmeto-green text-white text-xs font-bold tracking-wider">
                {copy.afterLabel}
              </span>
            </div>

            <div className="mt-4 px-2">
              <input
                type="range"
                min={5}
                max={95}
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                aria-label="Before and after comparison slider"
                className="w-full accent-[#36B729] cursor-pointer"
              />
              <p className="text-center text-xs text-cosmeto-body font-medium mt-1">
                {copy.sliderInstruction} ({sliderPosition}%)
              </p>
            </div>
          </div>

          {/* Case Details Panel */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cosmeto-green/15 text-cosmeto-greenDark text-xs font-bold border border-cosmeto-green/30">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{currentCase.timeframe[locale]}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-cosmeto-charcoal">
              {currentCase.procedureName[locale]}
            </h3>

            <p className="text-sm font-bold text-cosmeto-teal">
              {currentCase.patientInfo[locale]}
            </p>

            <div className="p-4 rounded-2xl bg-cosmeto-sand/60 border border-cosmeto-sandBorder space-y-1.5">
              <span className="text-xs uppercase tracking-wider text-cosmeto-teal font-bold block">
                Clinical Specification
              </span>
              <p className="text-sm font-bold text-cosmeto-charcoal">
                {currentCase.graftsOrDetails[locale]}
              </p>
            </div>

            <p className="text-sm text-cosmeto-body leading-relaxed italic">
              &ldquo;{currentCase.doctorNote[locale]}&rdquo;
            </p>

            <a
              href={buildWhatsAppLink(
                locale,
                currentCase.procedureName[locale],
                selectedCity
              )}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackWhatsAppClick({
                  source: `before_after_${currentCase.id}`,
                  topic: currentCase.procedureName[locale],
                  city: selectedCity,
                  locale,
                })
              }
              className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-cosmeto-green hover:bg-cosmeto-teal text-white font-bold text-sm transition shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{copy.inquireWhatsappBtn}</span>
            </a>
          </div>
        </div>

        {/* Quick 3-Card Thumbnail Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {BEFORE_AFTER_CASES.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setActiveCaseIndex(idx);
                setSliderPosition(50);
              }}
              className={`text-left rounded-2xl p-4 bg-white border-2 transition ${
                activeCaseIndex === idx
                  ? "border-cosmeto-green shadow-md"
                  : "border-cosmeto-sandBorder hover:border-cosmeto-green/50"
              }`}
            >
              <div className="grid grid-cols-2 gap-2 h-28 rounded-xl overflow-hidden mb-3">
                <div className="relative">
                  <img
                    src={item.beforeImage}
                    alt="Before thumbnail"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/70 text-white text-[10px] font-bold">
                    {copy.beforeLabel}
                  </span>
                </div>
                <div className="relative">
                  <img
                    src={item.afterImage}
                    alt="After thumbnail"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-cosmeto-green text-white text-[10px] font-bold">
                    {copy.afterLabel}
                  </span>
                </div>
              </div>
              <p className="font-bold text-xs sm:text-sm text-cosmeto-charcoal truncate">
                {item.procedureName[locale]}
              </p>
              <p className="text-[11px] text-cosmeto-teal font-semibold truncate">
                {item.patientInfo[locale]}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
