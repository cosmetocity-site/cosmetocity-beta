import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CosmetoCity Antalya | Hair, Dental & Medical Aesthetics in Antalya & Istanbul",
  description:
    "CosmetoCity (cosmetocity.online) — Trusted by UK & German patients for Hair Transplant, Hollywood Smile Dental Care & Aesthetic Surgery in sunny Antalya (and Istanbul upon request).",
  metadataBase: new URL("https://cosmetocity.online"),
  verification: {
    google: "d5SVjbR3yvpCWIihgzHkBqNWFxw9MVCkdftfIMO8ExY",
  },
  openGraph: {
    title: "CosmetoCity Antalya | Medical Tourism & Holiday Recovery in Turkey",
    description:
      "Combine world-class Dental, Hair & Aesthetic treatments with a 5-star Mediterranean recovery in Antalya, Turkey. Save up to 70%.",
    url: "https://cosmetocity.online",
    siteName: "CosmetoCity",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics (GA4) via next/script */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics-ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className={quicksand.className}>{children}</body>
    </html>
  );
}
