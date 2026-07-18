import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { translate, type Language } from './translations'

const STORAGE_KEY = 'manassa-language'

interface LanguageContextValue {
  language: Language
  setLanguage: (language: Language) => void
  dir: 'ltr' | 'rtl'
  t: (key: string, params?: Record<string, string | number>) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function normalizeLanguage(value: string | null | undefined): Language | null {
  return value === 'en' || value === 'ar' ? value : null
}

function getInitialLanguage(): Language {
  // A ?lang=en / ?lang=ar query parameter takes priority so links can force a language,
  // and we persist it so the override is remembered on later visits without the param.
  const fromUrl = normalizeLanguage(new URLSearchParams(window.location.search).get('lang'))
  if (fromUrl) {
    localStorage.setItem(STORAGE_KEY, fromUrl)
    return fromUrl
  }

  const stored = normalizeLanguage(localStorage.getItem(STORAGE_KEY))
  return stored ?? 'ar'
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
