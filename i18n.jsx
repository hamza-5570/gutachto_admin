/* eslint-disable no-undef */
import i18n from "i18next";
import en from "./public/locales/en.json";
import tr from "./public/locales/du.json";

import { initReactI18next } from "react-i18next";
// prettier-ignore
i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources: {
      en: {
        translation: en,
      },
      tr: {
        translation: tr,
      },
     
    },
    lng: "tr",
    fallbackLng: "tr",
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
