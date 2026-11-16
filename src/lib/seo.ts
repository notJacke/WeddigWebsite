import type { Metadata } from 'expo-router/server';
import { coupleNames, wedding } from '@/content/wedding';

const siteUrl = (process.env.EXPO_PUBLIC_SITE_URL ?? 'https://example.com').replace(/\/$/, '');

export function pageMetadata(page: string | null, description: string, path: string): Metadata {
  const site = `${coupleNames()} | Our Wedding`;
  const title = page ? `${page} | ${coupleNames()}` : site;
  const url = `${siteUrl}${path}`;
  const image = { url: `${siteUrl}/og-image.jpg`, width: 1200, height: 630, alt: `${coupleNames()}, Karlstad, Sweden` };
  return {
    title,
    description,
    robots: wedding.site.allowSearchEngines ? undefined : { index: false, follow: false },
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: site, type: 'website', images: [image] },
    twitter: { card: 'summary_large_image', title, description, images: [image.url] },
  };
}
