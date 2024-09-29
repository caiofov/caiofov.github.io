import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationsInEng from "../locales/en/translation.json";
import translationsInPortuguese from "../locales/pt/translation.json";

// the translations
const resources = {
  en: {
    translation: translationsInEng,
  },
  pt: {
    translation: translationsInPortuguese,
  },
};

export type LanguageCode = keyof typeof resources;

i18n.use(initReactI18next).init({
  resources,
  lng: "pt",
  debug: true,
  fallbackLng: "pt",
  interpolation: {
    escapeValue: false,
  },
  ns: "translation",
  defaultNS: "translation",
});

export default i18n;
