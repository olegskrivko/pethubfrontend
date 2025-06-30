import React, { createContext, useEffect, useState } from 'react';

import i18n from 'i18next';

const LanguageContext = createContext();

/**
 * Language Provider Component
 * Manages application language state and provides language switching functionality
 */
const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('lv');

  // Load saved language preference on component mount
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

  // Update language preference and apply changes when language changes
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
