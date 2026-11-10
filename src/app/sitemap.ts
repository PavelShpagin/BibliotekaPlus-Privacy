import type { MetadataRoute } from "next";

function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit;

  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;

  // Local dev fallback.
  return "http://localhost:3000";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl().replace(/\/$/, "");
  const lastModified = new Date("2026-01-04T00:00:00.000Z");

  return [
    { url: `${siteUrl}/privacy`, lastModified },
    { url: `${siteUrl}/delete-account`, lastModified },
    { url: `${siteUrl}/`, lastModified },
  ];
}

