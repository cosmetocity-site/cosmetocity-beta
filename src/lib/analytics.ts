export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-XXXXXXXXXX";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export interface WhatsAppClickParams {
  source?: string;
  topic?: string;
  city?: string;
  locale?: string;
}

/**
 * Fires a custom GA4 `whatsapp_click` event whenever a user clicks on the
 * sticky WhatsApp button or any in-page WhatsApp CTA button / form.
 */
export function trackWhatsAppClick(params: WhatsAppClickParams = {}): void {
  if (typeof window === "undefined") return;

  const eventPayload = {
    event_category: "engagement",
    event_label: params.source || "whatsapp_cta",
    button_location: params.source || "whatsapp_cta",
    treatment_topic: params.topic || "General Consultation",
    preferred_city: params.city || "antalya",
    locale: params.locale || "en",
  };

  if (typeof window.gtag === "function") {
    window.gtag("event", "whatsapp_click", eventPayload);
  } else if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: "whatsapp_click",
      ...eventPayload,
    });
  }
}
