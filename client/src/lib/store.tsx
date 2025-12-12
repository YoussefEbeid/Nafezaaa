import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: number;
  name: string;
  role: string;
  taxId: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  
  // Actions
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (user, token) => {
        // 1. Save to State
        set({ user, token, isAuthenticated: true });
        // 2. Save to LocalStorage for Axios to pick up
        localStorage.setItem('nafeza_token', token);
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        localStorage.removeItem('nafeza_token');
      }
    }),
    {
      name: 'nafeza-storage', // Key in localStorage
    }
  )
);

// Language Store
export type Language = 'en' | 'ar';

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (lang) => {
        set({ language: lang });
        // Update HTML lang attribute and dir
        if (typeof document !== 'undefined') {
          document.documentElement.lang = lang;
          document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        }
      },
      toggleLanguage: () => {
        set((state) => {
          const newLang = state.language === 'en' ? 'ar' : 'en';
          // Update HTML lang attribute and dir
          if (typeof document !== 'undefined') {
            document.documentElement.lang = newLang;
            document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
          }
          return { language: newLang };
        });
      },
    }),
    {
      name: 'nafeza-language', // Key in localStorage
      onRehydrateStorage: () => (state) => {
        // Update HTML attributes on rehydration
        if (state && typeof document !== 'undefined') {
          document.documentElement.lang = state.language;
          document.documentElement.dir = state.language === 'ar' ? 'rtl' : 'ltr';
        }
      },
    }
  )
);