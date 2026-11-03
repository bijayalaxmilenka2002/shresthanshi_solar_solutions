import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import {
  SiteSettings,
  DEFAULT_SITE_SETTINGS,
  loadSiteSettings,
  saveSiteSettings,
  resetSiteSettings as resetSiteSettingsStorage,
} from '../services/siteSettingsService';

interface ModalContextValue {
  isGuideModalOpen: boolean;
  defaultMessage: string;
  openGuideModal: (prefillMessage?: string) => void;
  closeGuideModal: () => void;

  isQuoteModalOpen: boolean;
  quotePrefillType: string;
  openQuoteModal: (prefillType?: string) => void;
  closeQuoteModal: () => void;

  settings: SiteSettings;
  updateSettings: (newSettings: SiteSettings) => void;
  resetSettings: () => void;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [defaultMessage, setDefaultMessage] = useState('');

  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quotePrefillType, setQuotePrefillType] = useState('Residential Rooftop Solar');

  const [settings, setSettings] = useState<SiteSettings>(loadSiteSettings);

  useEffect(() => {
    const handleSettingsUpdate = () => {
      setSettings(loadSiteSettings());
    };
    window.addEventListener('site_settings_updated', handleSettingsUpdate);
    window.addEventListener('storage', handleSettingsUpdate);
    return () => {
      window.removeEventListener('site_settings_updated', handleSettingsUpdate);
      window.removeEventListener('storage', handleSettingsUpdate);
    };
  }, []);

  const openGuideModal = useCallback((prefillMessage = '') => {
    setDefaultMessage(prefillMessage);
    setIsGuideModalOpen(true);
  }, []);

  const closeGuideModal = useCallback(() => {
    setIsGuideModalOpen(false);
  }, []);

  const openQuoteModal = useCallback((prefillType = 'Residential Rooftop Solar') => {
    setQuotePrefillType(prefillType);
    setIsQuoteModalOpen(true);
  }, []);

  const closeQuoteModal = useCallback(() => {
    setIsQuoteModalOpen(false);
  }, []);

  const updateSettings = useCallback((newSettings: SiteSettings) => {
    saveSiteSettings(newSettings);
    setSettings(newSettings);
  }, []);

  const resetSettings = useCallback(() => {
    const defaulted = resetSiteSettingsStorage();
    setSettings(defaulted);
  }, []);

  return (
    <ModalContext.Provider
      value={{
        isGuideModalOpen,
        defaultMessage,
        openGuideModal,
        closeGuideModal,
        isQuoteModalOpen,
        quotePrefillType,
        openQuoteModal,
        closeQuoteModal,
        settings,
        updateSettings,
        resetSettings,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useSiteSettings = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useSiteSettings must be used within AppProviders');
  }
  return {
    settings: context.settings,
    updateSettings: context.updateSettings,
    resetSettings: context.resetSettings,
  };
};

export const useSolarGuideModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useSolarGuideModal must be used within AppProviders');
  }
  return {
    isGuideModalOpen: context.isGuideModalOpen,
    defaultMessage: context.defaultMessage,
    openGuideModal: context.openGuideModal,
    closeGuideModal: context.closeGuideModal,
  };
};

export const useQuoteModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useQuoteModal must be used within AppProviders');
  }
  return {
    isQuoteModalOpen: context.isQuoteModalOpen,
    quotePrefillType: context.quotePrefillType,
    openQuoteModal: context.openQuoteModal,
    closeQuoteModal: context.closeQuoteModal,
  };
};

