import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';

import en from './locales/en.json';
import es from './locales/es.json';

const resources = {
  en: { translation: en },
  es: { translation: es },
};

const getDeviceLanguage = (): string => {
  const locales = getLocales();
  if (locales.length > 0) {
    const languageCode = locales[0].languageCode;
    // Check if we support this language
    if (languageCode && resources[languageCode as keyof typeof resources]) {
      return languageCode;
    }
  }
  return 'en'; // Default to English
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getDeviceLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    compatibilityJSON: 'v4' as any,
  });

export default i18n;