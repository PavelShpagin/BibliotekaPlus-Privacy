import type { MetadataRoute } from "next";

function getSiteUrl(): string | undefined {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit;

  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;

  return undefined;
}

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: siteUrl ? `${siteUrl}/sitemap.xml` : undefined,
  };
}

