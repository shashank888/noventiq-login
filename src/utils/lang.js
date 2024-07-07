import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Importing translation files
import translationEN from "../locales/en.json";
import translationHI from "../locales/hi.json";
import translationBN from "../locales/bn.json";

const resources = {
  en: {
    translation: translationEN,
  },
  hi: {
    translation: translationHI,
  },
  bn: {
    translation: translationBN,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    debug: true,
    detection: {
      order: [
        "querystring",
        "cookie",
        "localStorage",
        "navigator",
        "htmlTag",
        "path",
        "subdomain",
      ],
      caches: [],
    },
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;
