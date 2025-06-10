import React, { createContext, useState, useEffect } from 'react';
import i18n from 'i18next';

const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('lv');

  useEffect(() => {
    try {
      const storedLanguage = localStorage.getItem('preferredLanguage');
      if (storedLanguage) {
        setSelectedLanguage(storedLanguage);
      }
    } catch (error) {
      console.error('⚠️ Failed to read preferredLanguage from localStorage:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('preferredLanguage', selectedLanguage);
      document.documentElement.lang = selectedLanguage;
      i18n.changeLanguage(selectedLanguage);
    } catch (error) {
      console.error('Error setting language preference in localStorage:', error);
    }
  }, [selectedLanguage]);

  return (
    <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext, LanguageProvider };
export default LanguageProvider;
