import i18n from './config';

export const changeLanguage = async (language: string): Promise<void> => {
  try {
    await i18n.changeLanguage(language);
  } catch (error) {
    console.error('Error changing language:', error);
  }
};

export const getCurrentLanguage = (): string => {
  return i18n.language;
};

export const getAvailableLanguages = () => {
  return [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'es', name: 'Spanish', nativeName: 'Español' },
  ];
};