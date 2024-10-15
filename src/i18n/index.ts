import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationsInEng from "../locales/en/translation.json";
import translationsInPortuguese from "../locales/pt/translation.json";

const resources = {
  en: { translation: translationsInEng },
  pt: { translation: translationsInPortuguese },
};

export type LanguageCode = keyof typeof resources;

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("language") || navigator.language.split("-")[0],
    // debug: true,
    fallbackLng: "pt",
    interpolation: {
      escapeValue: false,
    },
    ns: "translation",
    defaultNS: "translation",
  })
  .then(() => {
    const originalChangeLanguage = i18n.changeLanguage.bind(i18n);

    i18n.changeLanguage = function (lng: LanguageCode) {
      localStorage.setItem("language", lng);
      return originalChangeLanguage(lng);
    };
  });

export default i18n;
