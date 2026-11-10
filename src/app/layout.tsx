import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

function getSiteUrl(): string | undefined {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;

  return undefined;
}

const siteUrl = getSiteUrl();

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BibliotekaPlus — Privacy Policy",
  description:
    "Privacy Policy for BibliotekaPlus (Бібліотека+) mobile application.",
  applicationName: "BibliotekaPlus",
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "BibliotekaPlus — Privacy Policy",
    description:
      "Privacy Policy for BibliotekaPlus (Бібліотека+) mobile application.",
    type: "website",
    siteName: "BibliotekaPlus",
    url: siteUrl ? `${siteUrl}/privacy` : undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
