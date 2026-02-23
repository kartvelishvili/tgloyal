
import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../lib/customSupabaseClient';
import { translations as defaultTranslations } from '../lib/translations';

export const LanguageContext = createContext();

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

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'ka';
  });

  const [translations, setTranslations] = useState(defaultTranslations);

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

  useEffect(() => {
    let isMounted = true;
    const loadTranslations = async () => {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('translations')
          .eq('id', 1)
          .single();
        if (!error && data?.translations && isMounted) {
          setTranslations({
            ka: deepMerge(defaultTranslations.ka, data.translations.ka || {}),
            en: deepMerge(defaultTranslations.en, data.translations.en || {}),
          });
        }
      } catch {}
    };
    loadTranslations();
    return () => { isMounted = false; };
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
