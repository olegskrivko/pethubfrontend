import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enAboutPage from './locales/en/aboutPage.json';
import enChatbot from './locales/en/chatbot.json';
// Import namespaces
import enCommon from './locales/en/common.json';
import enContact from './locales/en/contact.json';
import enFooter from './locales/en/footer.json';
import enNavbar from './locales/en/navbar.json';
import enSelectOptions from './locales/en/selectOptions.json';
import enSupport from './locales/en/support.json';
import lvAboutPage from './locales/lv/aboutPage.json';
import lvChatbot from './locales/lv/chatbot.json';
import lvCommon from './locales/lv/common.json';
import lvContact from './locales/lv/contact.json';
import lvFooter from './locales/lv/footer.json';
import lvNavbar from './locales/lv/navbar.json';
import lvSelectOptions from './locales/lv/selectOptions.json';
import lvSupport from './locales/lv/support.json';
import ruAboutPage from './locales/ru/aboutPage.json';
import ruChatbot from './locales/ru/chatbot.json';
import ruCommon from './locales/ru/common.json';
import ruContact from './locales/ru/contact.json';
import ruFooter from './locales/ru/footer.json';
import ruNavbar from './locales/ru/navbar.json';
import ruSelectOptions from './locales/ru/selectOptions.json';
import ruSupport from './locales/ru/support.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'lv',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        common: enCommon,
        navbar: enNavbar,
        footer: enFooter,
        aboutPage: enAboutPage,
        selectOptions: enSelectOptions,
        chatbot: enChatbot,
        contact: enContact,
        support: enSupport,
      },
      lv: {
        common: lvCommon,
        navbar: lvNavbar,
        footer: lvFooter,
        aboutPage: lvAboutPage,
        selectOptions: lvSelectOptions,
        chatbot: lvChatbot,
        contact: lvContact,
        support: lvSupport,
      },
      ru: {
        common: ruCommon,
        navbar: ruNavbar,
        footer: ruFooter,
        aboutPage: ruAboutPage,
        selectOptions: ruSelectOptions,
        chatbot: ruChatbot,
        contact: ruContact,
        support: ruSupport,
      },
    },
    detection: {
      order: ['queryString', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage', 'cookie'],
    },
    ns: ['common', 'navbar', 'footer', 'aboutPage', 'selectOptions', 'chatbot', 'contact', 'support'],
    defaultNS: 'common', // Default namespace
  });

export default i18n;
