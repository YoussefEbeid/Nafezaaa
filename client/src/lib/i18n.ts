import { useLanguageStore } from './store';
import enTranslations from './translations/en.json';
import arTranslations from './translations/ar.json';

type TranslationKey = string;
type Translations = typeof enTranslations;

const translations = {
  en: enTranslations,
  ar: arTranslations,
} as const;

/**
 * Get nested translation value by key path
 * Example: getNestedValue(translations.en, 'nav.currencyRates') => 'Currency Rates'
 */
function getNestedValue(obj: any, path: string): string {
  return path.split('.').reduce((current, key) => current?.[key], obj) || path;
}

/**
 * Translation hook for components
 * Usage: const t = useTranslation(); t('nav.currencyRates')
 */
export function useTranslation() {
  const language = useLanguageStore((state) => state.language);
  
  const t = (key: TranslationKey): string => {
    const translation = translations[language];
    return getNestedValue(translation, key);
  };

  return { t, language };
}

/**
 * Get translation directly (for use outside React components)
 */
export function getTranslation(key: TranslationKey, lang?: 'en' | 'ar'): string {
  const language = lang || useLanguageStore.getState().language;
  const translation = translations[language];
  return getNestedValue(translation, key);
}
