
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { translations as defaultTranslations } from '../lib/translations';

export const LanguageContext = createContext();

const TRANSLATIONS_STORAGE_KEY = 'tglegal_translations_override';

function deepMerge(target, source) {
  const output = { ...target };
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      output[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      output[key] = source[key];
    }
  }
  return output;
}

function loadTranslations() {
  try {
    const saved = localStorage.getItem(TRANSLATIONS_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ka: deepMerge(defaultTranslations.ka, parsed.ka || {}),
        en: deepMerge(defaultTranslations.en, parsed.en || {}),
      };
    }
  } catch {
    // ignore
  }
  return defaultTranslations;
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'ka';
  });

  const [translations, setTranslations] = useState(loadTranslations);

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  // Listen for admin panel translation updates
  useEffect(() => {
    const handleUpdate = (e) => {
      if (e.detail) {
        setTranslations({
          ka: deepMerge(defaultTranslations.ka, e.detail.ka || {}),
          en: deepMerge(defaultTranslations.en, e.detail.en || {}),
        });
      }
    };
    window.addEventListener('translations-updated', handleUpdate);
    return () => window.removeEventListener('translations-updated', handleUpdate);
  }, []);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'ka' ? 'en' : 'ka'));
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
