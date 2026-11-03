import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
}

const DEFAULT_TITLE = 'Shreshtanshi Construction & Suppliers | Solar Energy Solutions in Odisha';
const DEFAULT_DESC =
  'Engineered rooftop solar, agricultural solar water pumping, and rural infrastructure solutions across Kalahandi and Odisha. GSTIN: 21AVUPM9359D1Z6.';
const BASE_URL = 'https://shresthanshi.com';

export const SEO: React.FC<SEOProps> = ({
  title,
  description = DEFAULT_DESC,
  canonicalPath,
  ogImage = '/images/solar/residential-rooftop.jpg',
  ogType = 'website',
}) => {
  const location = useLocation();
  const currentPath = canonicalPath || location.pathname;
  const canonicalUrl = `${BASE_URL}${currentPath === '/' ? '' : currentPath}`;

  const fullTitle = title
    ? `${title} | Shreshtanshi Construction & Suppliers`
    : DEFAULT_TITLE;

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
        tag.setAttribute('rel', rel);
        document.head.appendChild(tag);
      }
      tag.setAttribute('href', href);
    };

    setMetaTag('name', 'description', description);
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:image', ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`);
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`);
    setLinkTag('canonical', canonicalUrl);
  }, [fullTitle, description, canonicalUrl, ogType, ogImage]);

  return null;
};

