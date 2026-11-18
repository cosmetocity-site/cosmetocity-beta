import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
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
      <body className={quicksand.className}>{children}</body>
    </html>
  );
}
