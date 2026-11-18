"use client";

import React from "react";
import { Star } from "lucide-react";
import { Locale, SITE_COPY, TESTIMONIALS_DATA } from "@/data/content";

interface TestimonialsSectionProps {
  locale: Locale;
}

export default function TestimonialsSection({
  locale,
}: TestimonialsSectionProps) {
  const copy = SITE_COPY[locale];

  return (
    <section
      id="reviews"
      className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <span className="inline-block px-4 py-1 rounded-full bg-cosmeto-green/15 text-cosmeto-greenDark text-xs font-bold tracking-widest uppercase mb-3">
          {copy.reviewsTag}
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-cosmeto-charcoal mb-3 uppercase">
          {copy.reviewsTitle}
        </h2>
        <div className="w-16 h-1 bg-cosmeto-green mx-auto mb-4 rounded-full" />
        <p className="text-cosmeto-body text-base">{copy.reviewsSubtitle}</p>
      </div>

      {/* 3 International Patient Testimonial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
        {TESTIMONIALS_DATA.map((rev) => (
          <div
            key={rev.id}
            className="bg-white rounded-3xl p-7 border-2 border-cosmeto-green/50 hover:border-cosmeto-green shadow-sm hover:shadow-lg transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] font-bold text-cosmeto-greenDark bg-cosmeto-green/10 px-2.5 py-1 rounded-full border border-cosmeto-green/30">
                  {rev.verifiedVia}
                </span>
              </div>

              <p className="text-cosmeto-body text-sm leading-relaxed italic mb-6">
                &ldquo;{rev.quote[locale]}&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-cosmeto-sandBorder flex items-center justify-between gap-2">
              <div>
                <h3 className="font-bold text-cosmeto-charcoal text-sm">
                  {rev.flag} {rev.name}
                </h3>
                <p className="text-xs text-cosmeto-body">
                  {rev.cityCountry} • {rev.treatedIn}
                </p>
              </div>
              <span className="text-[11px] font-bold text-cosmeto-teal bg-cosmeto-ice/50 px-2.5 py-1 rounded-lg max-w-[155px] truncate">
                {rev.treatment[locale]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
