import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cosmetocity | UK & Germany Trusted Medical Tourism in Turkey (cosmetocity.online)",
  description:
    "JCI-Accredited Hair Transplant, Dental Treatments & Medical Aesthetics in Istanbul for UK and German patients. 5-Star VIP All-Inclusive Packages.",
  metadataBase: new URL("https://cosmetocity.online"),
  openGraph: {
    title: "Cosmetocity | Hair, Dental & Medical Aesthetics in Istanbul",
    description:
      "Save up to 70% on JCI-accredited Hair Transplants, Hollywood Smile & Medical Aesthetics with VIP Hotel & Airport Transfers included.",
    url: "https://cosmetocity.online",
    siteName: "Cosmetocity",
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
