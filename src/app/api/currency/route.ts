import { NextRequest, NextResponse } from "next/server";
import {
  ExchangeRates,
  FALLBACK_RATES,
  CURRENCY_SYMBOLS,
  resolveCurrencyFromCountry,
} from "@/lib/currency";

// Revalidate server-side exchange rates every 12 hours (43,200 seconds)
const REVALIDATE_SECONDS = 43200;

async function fetchLiveExchangeRates(): Promise<ExchangeRates> {
  try {
    const res = await fetch(
      "https://api.frankfurter.app/latest?from=EUR&to=GBP,USD",
      {
        next: { revalidate: REVALIDATE_SECONDS },
      }
    );

    if (res.ok) {
      const data = await res.json();
      const gbp = Number(data?.rates?.GBP);
      const usd = Number(data?.rates?.USD);

      if (gbp > 0 && usd > 0) {
        return {
          EUR: 1,
          GBP: gbp,
          USD: usd,
        };
      }
    }
  } catch {
    // Primary Frankfurter API failed; try secondary open.er-api.com below
  }

  try {
    const backupRes = await fetch("https://open.er-api.com/v6/latest/EUR", {
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (backupRes.ok) {
      const backupData = await backupRes.json();
      const gbp = Number(backupData?.rates?.GBP);
      const usd = Number(backupData?.rates?.USD);

      if (gbp > 0 && usd > 0) {
        return {
          EUR: 1,
          GBP: gbp,
          USD: usd,
        };
      }
    }
  } catch {
    // Fallback to safe defaults
  }

  return FALLBACK_RATES;
}

export async function GET(request: NextRequest) {
  const countryHeader =
    request.headers.get("x-vercel-ip-country") ||
    request.nextUrl.searchParams.get("country") ||
    "EU";

  const currency = resolveCurrencyFromCountry(countryHeader);
  const rates = await fetchLiveExchangeRates();

  return NextResponse.json({
    countryCode: countryHeader.toUpperCase(),
    currency,
    symbol: CURRENCY_SYMBOLS[currency],
    rateFromEur: rates[currency],
    rates,
    updatedAt: new Date().toISOString(),
  });
}
