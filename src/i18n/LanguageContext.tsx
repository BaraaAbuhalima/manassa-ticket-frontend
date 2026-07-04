import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { translate, type Language } from './translations'

const STORAGE_KEY = 'jett-language'

interface LanguageContextValue {
  language: Language
  setLanguage: (language: Language) => void
  dir: 'ltr' | 'rtl'
  t: (key: string, params?: Record<string, string | number>) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function getInitialLanguage(): Language {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored === 'en' || stored === 'ar' ? stored : 'ar'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage)
  const dir: 'ltr' | 'rtl' = language === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = dir
  }, [language, dir])

  function setLanguage(next: Language) {
    localStorage.setItem(STORAGE_KEY, next)
    setLanguageState(next)
  }

  const t = useMemo(
    () => (key: string, params?: Record<string, string | number>) => translate(language, key, params),
    [language],
  )

  const value = useMemo(() => ({ language, setLanguage, dir, t }), [language, dir, t])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
