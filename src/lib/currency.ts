export type SupportedCurrency = "EUR" | "GBP" | "USD";

export interface ExchangeRates {
  EUR: number;
  GBP: number;
  USD: number;
}

export interface CurrencyConfig {
  countryCode: string;
  currency: SupportedCurrency;
  symbol: string;
  rateFromEur: number;
  rates: ExchangeRates;
  updatedAt: string;
}

// Safe fallback rates if external exchange rate API is temporarily unreachable
export const FALLBACK_RATES: ExchangeRates = {
  EUR: 1,
  GBP: 0.85,
  USD: 1.08,
};

export const CURRENCY_SYMBOLS: Record<SupportedCurrency, string> = {
  EUR: "€",
  GBP: "£",
  USD: "$",
};

/**
 * Maps visitor country code from Vercel's `x-vercel-ip-country` header to target currency:
 * - `GB` -> `GBP` (£)
 * - `US` -> `USD` ($)
 * - All other countries (or local dev) -> `EUR` (€)
 */
export function resolveCurrencyFromCountry(
  countryHeader?: string | null
): SupportedCurrency {
  const code = (countryHeader || "").trim().toUpperCase();
  if (code === "GB" || code === "UK") return "GBP";
  if (code === "US") return "USD";
  return "EUR";
}

/**
 * Converts a base EUR amount to the target currency, rounds to the nearest 10,
 * and formats it cleanly (e.g. `€1,990`, `£1,690`, `$2,150`).
 */
export function formatConvertedPrice(
  amountEur: number,
  currency: SupportedCurrency = "EUR",
  rates: ExchangeRates = FALLBACK_RATES
): string {
  const rate = rates[currency] ?? FALLBACK_RATES[currency] ?? 1;
  const rawConverted = amountEur * rate;
  const roundedToTen = Math.round(rawConverted / 10) * 10;
  const symbol = CURRENCY_SYMBOLS[currency] || "€";
  return `${symbol}${roundedToTen.toLocaleString("en-US")}`;
}

export const DEFAULT_CURRENCY_CONFIG: CurrencyConfig = {
  countryCode: "EU",
  currency: "EUR",
  symbol: "€",
  rateFromEur: 1,
  rates: FALLBACK_RATES,
  updatedAt: new Date().toISOString(),
};
