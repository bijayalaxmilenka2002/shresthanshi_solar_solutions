import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noIndex?: boolean;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const DEFAULT_TITLE = 'Shreshtanshi Solar Solutions | Bhubaneswar, Kalahandi & Odisha';
const DEFAULT_DESC =
  'Engineered turnkey rooftop solar, agricultural solar water pumping, PM Surya Ghar subsidy assistance, and solar street lighting prioritized in Bhubaneswar with existing operational department in Kalahandi, Odisha. GSTIN: 21AVUPM9359D1Z6.';
const FALLBACK_PRODUCTION_URL = 'https://shresthanshisolarsolutions.vercel.app';

export const SEO: React.FC<SEOProps> = ({
  title,
  description = DEFAULT_DESC,
  canonicalPath,
  ogImage = '/images/solar/residential-rooftop.jpg',
  ogType = 'website',
  noIndex = false,
  schema,
}) => {
  const location = useLocation();
  const currentPath = canonicalPath || location.pathname;

  // Resolve base URL dynamically to match live production or custom domain
  const baseUrl =
    typeof window !== 'undefined' && window.location.origin && !window.location.origin.includes('localhost')
      ? window.location.origin
      : FALLBACK_PRODUCTION_URL;

  const canonicalUrl = `${baseUrl}${currentPath === '/' ? '' : currentPath}`;

  const fullTitle = title
    ? `${title} | Shreshtanshi Solar Solutions`
    : DEFAULT_TITLE;

  const resolvedOgImage = ogImage.startsWith('http')
    ? ogImage
    : `${baseUrl}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Helper to update or create meta tags
    const setMetaTag = (attrName: string, attrVal: string, content: string) => {
      let tag = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attrName, attrVal);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // Helper to update or create link rel
    const setLinkTag = (rel: string, href: string) => {
      let tag = document.querySelector(`link[rel="${rel}"]`);
      if (!tag) {
        tag = document.createElement('link');
        tag.setAttribute(rel, rel);
        document.head.appendChild(tag);
      }
      tag.setAttribute('href', href);
    };

    // Robots: Noindex for protected routes (e.g. /owner-portal)
    if (noIndex) {
      setMetaTag('name', 'robots', 'noindex, nofollow, noarchive');
    } else {
      setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    }

    setMetaTag('name', 'description', description);
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:site_name', 'Shresthanshi Solar Solutions');
    setMetaTag('property', 'og:image', resolvedOgImage);
    setMetaTag('property', 'og:image:alt', fullTitle);

    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', resolvedOgImage);

    setLinkTag('canonical', canonicalUrl);

    // Optional Page-Specific JSON-LD Schema
    const schemaScriptId = 'page-json-ld-schema';
    const existingSchema = document.getElementById(schemaScriptId);
    if (existingSchema) {
      existingSchema.remove();
    }

    if (schema) {
      const script = document.createElement('script');
      script.id = schemaScriptId;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    return () => {
      const schemaEl = document.getElementById(schemaScriptId);
      if (schemaEl) {
        schemaEl.remove();
      }
    };
  }, [fullTitle, description, canonicalUrl, ogType, resolvedOgImage, noIndex, schema]);

  return null;
};

