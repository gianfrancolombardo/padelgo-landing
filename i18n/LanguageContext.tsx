import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';

export type Language = 'es' | 'en';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'es';
    
    // Check localStorage
    const saved = localStorage.getItem('voleabox-lang');
    if (saved === 'es' || saved === 'en') return saved;

    // Check browser language
    const browserLang = navigator.language;
    if (browserLang && browserLang.startsWith('en')) {
      return 'en';
    }
    return 'es'; // Default
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('voleabox-lang', lang);
      document.documentElement.lang = lang;
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  // Nested key resolver
  const t = (path: string): string => {
    const keys = path.split('.');
    let value: any = translations[language];
    for (const key of keys) {
      if (value && typeof value === 'object') {
        value = value[key];
      } else {
        return path;
      }
    }
    return typeof value === 'string' ? value : path;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
