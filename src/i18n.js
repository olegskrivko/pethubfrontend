import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enAboutPage from './locales/en/aboutPage.json';
import enChatbot from './locales/en/chatbot.json';
// Import namespaces
import enCommon from './locales/en/common.json';
import enContact from './locales/en/contact.json';
import enFaq from './locales/en/faq.json';
import enFooter from './locales/en/footer.json';
import enHomePage from './locales/en/homePage.json';
import enNavbar from './locales/en/navbar.json';
import enPetDetails from './locales/en/petDetails.json';
import enPetTraining from './locales/en/petTraining.json';
import enPets from './locales/en/pets.json';
import enSelectOptions from './locales/en/selectOptions.json';
import enSupport from './locales/en/support.json';
import lvAboutPage from './locales/lv/aboutPage.json';
import lvChatbot from './locales/lv/chatbot.json';
import lvCommon from './locales/lv/common.json';
import lvContact from './locales/lv/contact.json';
import lvFaq from './locales/lv/faq.json';
import lvFooter from './locales/lv/footer.json';
import lvHomePage from './locales/lv/homePage.json';
import lvNavbar from './locales/lv/navbar.json';
import lvPetDetails from './locales/lv/petDetails.json';
import lvPetTraining from './locales/lv/petTraining.json';
import lvPets from './locales/lv/pets.json';
import lvSelectOptions from './locales/lv/selectOptions.json';
import lvSupport from './locales/lv/support.json';
import ruAboutPage from './locales/ru/aboutPage.json';
import ruChatbot from './locales/ru/chatbot.json';
import ruCommon from './locales/ru/common.json';
import ruContact from './locales/ru/contact.json';
import ruFaq from './locales/ru/faq.json';
import ruFooter from './locales/ru/footer.json';
import ruHomePage from './locales/ru/homePage.json';
import ruNavbar from './locales/ru/navbar.json';
import ruPetDetails from './locales/ru/petDetails.json';
import ruPetTraining from './locales/ru/petTraining.json';
import ruPets from './locales/ru/pets.json';
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
        homePage: enHomePage,
        selectOptions: enSelectOptions,
        chatbot: enChatbot,
        contact: enContact,
        support: enSupport,
        faq: enFaq,
        pets: enPets,
        petTraining: enPetTraining,
        petDetails: enPetDetails,
      },
      lv: {
        common: lvCommon,
        navbar: lvNavbar,
        footer: lvFooter,
        aboutPage: lvAboutPage,
        homePage: lvHomePage,
        selectOptions: lvSelectOptions,
        chatbot: lvChatbot,
        contact: lvContact,
        support: lvSupport,
        faq: lvFaq,
        pets: lvPets,
        petTraining: lvPetTraining,
        petDetails: lvPetDetails,
      },
      ru: {
        common: ruCommon,
        navbar: ruNavbar,
        footer: ruFooter,
        aboutPage: ruAboutPage,
        homePage: ruHomePage,
        selectOptions: ruSelectOptions,
        chatbot: ruChatbot,
        contact: ruContact,
        support: ruSupport,
        faq: ruFaq,
        pets: ruPets,
        petTraining: ruPetTraining,
        petDetails: ruPetDetails,
      },
    },
    detection: {
      order: ['queryString', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage', 'cookie'],
    },
    ns: [
      'common',
      'navbar',
      'footer',
      'aboutPage',
      'homePage',
      'selectOptions',
      'chatbot',
      'contact',
      'support',
      'faq',
      'pets',
      'petTraining',
      'petDetails',
    ],
    defaultNS: 'common', // Default namespace
  });

export default i18n;
