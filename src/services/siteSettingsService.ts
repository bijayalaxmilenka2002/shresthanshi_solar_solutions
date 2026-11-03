import { companyConfig } from '../data/company';

export interface SiteSettings {
  announcement: {
    enabled: boolean;
    badge: string;
    text: string;
    linkText: string;
    linkUrl: string;
  };
  contact: {
    phoneDisplay: string;
    phoneHref: string;
    whatsappNumber: string;
    email: string;
    workingHours: string;
    address: string;
    proprietor: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
  };
  sections: {
    heroCaption: boolean;
    applications: boolean;
    coreServices: boolean;
    processTimeline: boolean;
    fieldHighlights: boolean;
    faqSection: boolean;
    trustBanner: boolean;
  };
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  announcement: {
    enabled: true,
    badge: 'PM Surya Ghar Subsidy Alert',
    text: 'Government assistance up to ₹78,000 for residential rooftop solar & PM-KUSUM for solar pumps in Odisha.',
    linkText: 'Check Eligibility',
    linkUrl: '/resources/subsidy-scheme-guidance',
  },
  contact: {
    phoneDisplay: companyConfig.contact.phoneDisplay,
    phoneHref: companyConfig.contact.phoneHref,
    whatsappNumber: '9438080874',
    email: companyConfig.contact.email,
    workingHours: companyConfig.contact.workingHours,
    address: companyConfig.contact.address.full,
    proprietor: 'Mr. Shubham Pratap Singh',
  },
  hero: {
    badge: 'Solar Energy & Solar Water Pumping • Kalahandi, Odisha',
    title: 'Powering Homes, Farms & Businesses with Pure Solar Energy.',
    subtitle:
      'Turnkey on-grid rooftop solar, agricultural solar pump panels, and street lighting engineered for Kalahandi and western Odisha. Clear engineering, honest sizing, and zero inflated promises.',
  },
  sections: {
    heroCaption: true,
    applications: true,
    coreServices: true,
    processTimeline: true,
    fieldHighlights: true,
    faqSection: true,
    trustBanner: true,
  },
};

const SETTINGS_STORAGE_KEY = 'shreshtanshi_site_settings_v1';

export const loadSiteSettings = (): SiteSettings => {
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_SITE_SETTINGS,
        ...parsed,
        announcement: { ...DEFAULT_SITE_SETTINGS.announcement, ...parsed.announcement },
        contact: { ...DEFAULT_SITE_SETTINGS.contact, ...parsed.contact },
        hero: { ...DEFAULT_SITE_SETTINGS.hero, ...parsed.hero },
        sections: { ...DEFAULT_SITE_SETTINGS.sections, ...parsed.sections },
      };
    }
  } catch {
    // Return default on parse failure
  }
  return DEFAULT_SITE_SETTINGS;
};

export const saveSiteSettings = (settings: SiteSettings): void => {
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    window.dispatchEvent(new Event('site_settings_updated'));
  } catch (err) {
    console.error('Failed to save site settings', err);
  }
};

export const resetSiteSettings = (): SiteSettings => {
  try {
    localStorage.removeItem(SETTINGS_STORAGE_KEY);
    window.dispatchEvent(new Event('site_settings_updated'));
  } catch {
    // Ignore error
  }
  return DEFAULT_SITE_SETTINGS;
};

