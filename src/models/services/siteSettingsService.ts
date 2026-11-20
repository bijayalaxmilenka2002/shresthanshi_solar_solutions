import { companyConfig } from '@models/data/company';

export interface SiteSettings {
  announcement: {
    enabled: boolean;
    badge: string;
    text: string;
    linkText: string;
    linkUrl: string;
  };
  contact: {
    primaryPhoneDisplay?: string;
    primaryPhoneHref?: string;
    secondaryPhoneDisplay?: string;
    secondaryPhoneHref?: string;
    phoneDisplay: string;
    phoneHref: string;
    whatsappNumber: string;
    email: string;
    workingHours: string;
    address: string;
    proprietor: string;
  };
  social?: {
    facebook: string;
    instagram: string;
    youtube: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
  };
  sections: {
    heroCaption: boolean;
    achievementsSection?: boolean;
    applications: boolean;
    governmentProjects?: boolean;
    awardsSection?: boolean;
    licencesSection?: boolean;
    testimonialsSection?: boolean;
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
    primaryPhoneDisplay: companyConfig.contact.primaryPhoneDisplay,
    primaryPhoneHref: companyConfig.contact.primaryPhoneHref,
    secondaryPhoneDisplay: companyConfig.contact.secondaryPhoneDisplay,
    secondaryPhoneHref: companyConfig.contact.secondaryPhoneHref,
    phoneDisplay: companyConfig.contact.primaryPhoneDisplay,
    phoneHref: companyConfig.contact.primaryPhoneHref,
    whatsappNumber: '9937000624',
    email: companyConfig.contact.email,
    workingHours: companyConfig.contact.workingHours,
    address: companyConfig.contact.address.full,
    proprietor: 'Mr. Shubham Pratap Singh',
  },
  social: {
    facebook: companyConfig.social.facebook,
    instagram: companyConfig.social.instagram,
    youtube: companyConfig.social.youtube,
  },
  hero: {
    badge: 'Solar Energy & Solar Water Pumping • Kalahandi (HQ) & Bhubaneswar Sub-Branch',
    title: 'Powering Homes, Farms & Businesses with Pure Solar Energy.',
    subtitle:
      'Turnkey on-grid rooftop solar, agricultural solar pump panels, and street lighting engineered from our Head Office in Kalahandi, our sub-branch in Bhubaneswar, and across Odisha. Clear engineering, honest sizing, and zero inflated promises.',
  },
  sections: {
    heroCaption: true,
    achievementsSection: true,
    applications: true,
    governmentProjects: true,
    awardsSection: true,
    licencesSection: true,
    testimonialsSection: true,
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

export const saveSiteSettings = async (settings: SiteSettings): Promise<void> => {
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    window.dispatchEvent(new Event('site_settings_updated'));
  } catch (err) {
    console.error('Failed to save site settings', err);
  }

  // Push to MongoDB Atlas with timeout protection
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ settings }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
  } catch (err: any) {
    console.warn('MongoDB Atlas settings sync offline/pending:', err?.message);
  }
};

/**
 * Sync site settings from MongoDB Atlas database into client store
 */
export const syncSiteSettingsFromDatabase = async (): Promise<SiteSettings | null> => {
  try {
    const res = await fetch('/api/settings');
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.settings) {
        const merged: SiteSettings = {
          ...DEFAULT_SITE_SETTINGS,
          ...data.settings,
          announcement: {
            ...DEFAULT_SITE_SETTINGS.announcement,
            ...(data.settings.announcement || {}),
          },
          contact: {
            ...DEFAULT_SITE_SETTINGS.contact,
            ...(data.settings.contact || {}),
          },
          hero: {
            ...DEFAULT_SITE_SETTINGS.hero,
            ...(data.settings.hero || {}),
          },
          sections: {
            ...DEFAULT_SITE_SETTINGS.sections,
            ...(data.settings.sections || {}),
          },
        };
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(merged));
        window.dispatchEvent(new Event('site_settings_updated'));
        return merged;
      } else if (data.success && !data.settings) {
        // Cloud DB is connected but empty: seed current default settings to MongoDB Atlas
        const current = loadSiteSettings();
        fetch('/api/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ settings: current }),
        }).catch(() => {});
        return current;
      }
    }
  } catch (err) {
    console.warn('Failed to fetch settings from MongoDB Atlas:', err);
  }
  return null;
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

