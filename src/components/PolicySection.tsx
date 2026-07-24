import { Card } from './ui'
import { useLanguage } from '../i18n/LanguageContext'

// Material "check_circle" glyph, used for the affirmative policy points.
const checkCircleIcon = (
  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z" />
)

// Material "block" glyph, used for the one prohibitive policy point (no scalping).
const noEntryIcon = (
  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 18c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.41-3.59 8-8 8ZM5.69 16.9C4.63 15.55 4 13.85 4 12c0-4.41 3.59-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9Z" />
)

const policyPoints = [
  { key: 'verification', icon: checkCircleIcon },
  { key: 'noScalping', icon: noEntryIcon },
  { key: 'purpose', icon: checkCircleIcon },
  { key: 'priceLimit', icon: checkCircleIcon },
  { key: 'serviceFee', icon: checkCircleIcon },
] as const

// Shared between the home page's condensed section and the standalone /policy page,
// so the two never drift out of sync.
export default function PolicySection() {
  const { t } = useLanguage()

  return (
    <section>
      <h2 className="text-center text-lg font-semibold text-slate-900">{t('home.policy.heading')}</h2>
      <p className="mx-auto mt-2 max-w-xl text-center text-sm text-slate-500">{t('home.policy.subtitle')}</p>
      <div className="mx-auto mt-6 grid max-w-3xl gap-4 sm:grid-cols-2">
        {policyPoints.map((point) => (
          <Card key={point.key} className="flex items-start gap-4">
            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-slate-100 text-slate-900">
              <svg className="h-5 w-5 fill-amber-500" viewBox="0 0 24 24" aria-hidden="true">
                {point.icon}
              </svg>
            </span>
            <div>
              <h3 className="font-semibold text-slate-900">{t(`home.policy.${point.key}Title`)}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{t(`home.policy.${point.key}Desc`)}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
