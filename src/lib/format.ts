import type { Language } from '../i18n/translations'

const locales: Record<Language, string> = {
  en: 'en-US-u-nu-latn',
  ar: 'ar-JO-u-nu-latn',
}

export function formatCurrency(amount: number, language: Language, currency = 'JOD') {
  return new Intl.NumberFormat(locales[language], { style: 'currency', currency }).format(amount)
}

export function formatDateTime(iso: string, language: Language) {
  return new Date(iso).toLocaleString(locales[language], {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function toDateOnly(date: Date) {
  return date.toISOString().slice(0, 10)
}

/** Default travel date shown in search forms: one week from today. */
export function defaultTravelDate() {
  const date = new Date()
  date.setDate(date.getDate() + 7)
  return toDateOnly(date)
}
