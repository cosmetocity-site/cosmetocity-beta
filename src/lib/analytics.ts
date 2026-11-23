export const GTM_ID = "GTM-KMDVG52G";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
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
 * Pushes a custom `whatsapp_click` event into Google Tag Manager `window.dataLayer`
 * whenever a user clicks on the sticky WhatsApp button or any in-page WhatsApp CTA.
 */
export function trackWhatsAppClick(params: WhatsAppClickParams = {}): void {
  if (typeof window === "undefined") return;

  const eventPayload = {
    event: "whatsapp_click",
    event_category: "engagement",
    event_label: params.source || "whatsapp_cta",
    button_location: params.source || "whatsapp_cta",
    treatment_topic: params.topic || "General Consultation",
    preferred_city: params.city || "antalya",
    locale: params.locale || "en",
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventPayload);

  if (typeof window.gtag === "function") {
    window.gtag("event", "whatsapp_click", eventPayload);
  }
}
