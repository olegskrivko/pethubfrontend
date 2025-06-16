import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import namespaces
import enCommon from './locales/en/common.json';
import enNavbar from './locales/en/navbar.json';
import enFooter from './locales/en/footer.json';
import enAboutPage from './locales/en/aboutPage.json';
import enSelectOptions from './locales/en/selectOptions.json';
import enChatbot from './locales/en/chatbot.json';

import lvCommon from './locales/lv/common.json';
import lvNavbar from './locales/lv/navbar.json';
import lvFooter from './locales/lv/footer.json';
import lvAboutPage from './locales/lv/aboutPage.json';
import lvSelectOptions from './locales/lv/selectOptions.json';
import lvChatbot from './locales/lv/chatbot.json';

import ruCommon from './locales/ru/common.json';
import ruNavbar from './locales/ru/navbar.json';
import ruFooter from './locales/ru/footer.json';
import ruAboutPage from './locales/ru/aboutPage.json';
import ruSelectOptions from './locales/ru/selectOptions.json';
import ruChatbot from './locales/ru/chatbot.json';

i18n
  .use(LanguageDetector) // Detects user language
  .use(initReactI18next) // Initializes i18next with React
  .init({
    fallbackLng: 'lv', // Default language if detection fails
    debug: false, // Enable debug mode
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    resources: {
      en: {
        common: enCommon,
        navbar: enNavbar,
        footer: enFooter,
        aboutPage: enAboutPage,
        selectOptions: enSelectOptions,
        chatbot: enChatbot,
      },
      lv: {
        common: lvCommon,
        navbar: lvNavbar,
        footer: lvFooter,
        aboutPage: lvAboutPage,
        selectOptions: lvSelectOptions,
        chatbot: lvChatbot,
      },
      ru: {
        common: ruCommon,
        navbar: ruNavbar,
        footer: ruFooter,
        aboutPage: ruAboutPage,
        selectOptions: ruSelectOptions,
        chatbot: ruChatbot,
      },
    },
    detection: {
      order: ['queryString', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage', 'cookie'],
    },
    ns: ['common', 'navbar', 'footer', 'aboutPage', 'selectOptions', 'chatbot'], // Namespaces to use
    defaultNS: 'common', // Default namespace
  });

export default i18n;
