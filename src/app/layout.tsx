import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import Script from "next/script";
import { GTM_ID } from "@/lib/analytics";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CosmetoCity Antalya | Hair, Dental, Bariatric & Medical Aesthetics in Antalya & Istanbul",
  description:
    "CosmetoCity (cosmetocity.online) — Trusted by international patients for Hair Transplant, Hollywood Smile Dental Care, Bariatric Surgery & Aesthetic Surgery in sunny Antalya (and Istanbul upon request).",
  metadataBase: new URL("https://cosmetocity.online"),
  verification: {
    google: "d5SVjbR3yvpCWIihgzHkBqNWFxw9MVCkdftfIMO8ExY",
  },
  openGraph: {
    title: "CosmetoCity Antalya | Medical Tourism & Holiday Recovery in Turkey",
    description:
      "Combine world-class Dental, Hair, Bariatric & Aesthetic treatments with a 5-star Mediterranean recovery in Antalya, Turkey. Save up to 70%.",
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
        {/* Google Tag Manager (GTM-M23VNDBC) via next/script */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      </head>
      <body className={quicksand.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
