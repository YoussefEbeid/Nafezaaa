'use client';

import { useEffect } from 'react';
import { useLanguageStore } from '@/lib/store';

/**
 * Language Provider Component
 * Handles initialization of language and RTL/LTR direction
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useLanguageStore((state) => state.language);

  useEffect(() => {
    // Set initial language and direction
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    }
  }, [language]);

  return <>{children}</>;
}
