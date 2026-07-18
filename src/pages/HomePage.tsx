import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Card, Input } from '../components/ui'
import { defaultTravelDate, toDateOnly } from '../lib/format'
import { useLanguage } from '../i18n/LanguageContext'

const featureCards = [
  {
    to: '/browse',
    titleKey: 'home.cards.browseTitle',
    descKey: 'home.cards.browseDesc',
    // Magnifying glass over a ticket — browse listings
    icon: (
      <path d="M10.5 3a7.5 7.5 0 0 1 5.9 12.13l4.24 4.24-1.42 1.42-4.24-4.24A7.5 7.5 0 1 1 10.5 3Zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Zm-3 5h6v2h-6v-2Z" />
    ),
  },
  {
    to: '/sell',
    titleKey: 'home.cards.sellTitle',
    descKey: 'home.cards.sellDesc',
    // Price tag — offer a ticket for sale
    icon: (
      <path d="M10.6 3H4a1 1 0 0 0-1 1v6.6a1 1 0 0 0 .3.7l9.4 9.4a1 1 0 0 0 1.4 0l6.6-6.6a1 1 0 0 0 0-1.4L11.3 3.3a1 1 0 0 0-.7-.3ZM7.5 9A1.5 1.5 0 1 1 9 7.5 1.5 1.5 0 0 1 7.5 9Z" />
    ),
  },
  {
    to: '/subscribe',
    titleKey: 'home.cards.alertsTitle',
    descKey: 'home.cards.alertsDesc',
    // Bell — get notified when a ticket is available
    icon: (
      <path d="M12 2a6 6 0 0 0-6 6v3.6l-1.7 3.4A1 1 0 0 0 5.2 16h13.6a1 1 0 0 0 .9-1.4L18 11.6V8a6 6 0 0 0-6-6Zm0 20a3 3 0 0 0 2.8-2H9.2A3 3 0 0 0 12 22Z" />
    ),
  },
] as const

const trustBadges = [
  {
    key: 'securePayments',
    icon: (
      <path d="M12 3 4.5 6v5.25c0 4.28 3.2 7.9 7.5 8.75 4.3-.85 7.5-4.47 7.5-8.75V6L12 3Zm-1 11-2.5-2.5 1.4-1.4 1.1 1.1 3.1-3.1 1.4 1.4L11 14Z" />
    ),
  },
  {
    key: 'verifiedTickets',
    icon: (
      <path d="m12 2 2.4 1.8 3 .1 1 2.8 2.4 1.7-.9 2.9.9 2.9-2.4 1.7-1 2.8-3 .1L12 22l-2.4-1.8-3-.1-1-2.8L3.2 15.6l.9-2.9-.9-2.9 2.4-1.7 1-2.8 3-.1L12 2Zm-1 13 5-5-1.4-1.4L11 12.2 9.4 10.6 8 12l3 3Z" />
    ),
  },
  {
    key: 'instantDelivery',
    icon: (
      <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm.4 2L12 12.7 20.6 7H3.4ZM20 8.9l-8 5.3-8-5.3V17h16V8.9Z" />
    ),
  },
  {
    key: 'support',
    icon: (
      <path d="M12 2a9 9 0 0 0-9 9v4a3 3 0 0 0 3 3h1v-8H5v-1a7 7 0 0 1 14 0v1h-2v8h1a1 1 0 0 1-1 1h-3v2h3a3 3 0 0 0 3-3v-3a9 9 0 0 0-9-9Z" />
    ),
  },
] as const

export default function HomePage() {
  const { t } = useLanguage()
  const today = toDateOnly(new Date())
  const [date, setDate] = useState(defaultTravelDate)
  const navigate = useNavigate()

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    navigate(`/find?date=${date}`)
  }

  return (
    <div className="flex flex-col gap-10">
      <section className="text-center">
        <img src="/favicon.svg" alt="Manassa Ticket Exchange" className="mx-auto mb-5 h-16 w-16" />
        <h1 className="text-4xl font-semibold text-slate-900">{t('home.title')}</h1>
        <p className="mx-auto mt-3 max-w-xl text-slate-600">{t('home.subtitle')}</p>
      </section>

      <Card className="mx-auto w-full max-w-md">
        <form onSubmit={handleSearch} className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">{t('common.travelDate')}</label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} min={today} required />
          </div>
          <Button type="submit">{t('home.searchButton')}</Button>
        </form>
      </Card>

      <section className="grid gap-4 sm:grid-cols-3">
        {featureCards.map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className="block h-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            <Card className="h-full transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-900">
                <svg className="h-6 w-6 fill-amber-500" viewBox="0 0 24 24" aria-hidden="true">
                  {card.icon}
                </svg>
              </span>
              <h2 className="mt-4 font-semibold text-slate-900">{t(card.titleKey)}</h2>
              <p className="mt-1 text-sm text-slate-600">{t(card.descKey)}</p>
            </Card>
          </Link>
        ))}
      </section>

      <section className="border-t border-slate-200 pt-10">
        <h2 className="text-center text-lg font-semibold text-slate-900">{t('home.trust.heading')}</h2>
        <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {trustBadges.map((badge) => (
            <div key={badge.key} className="flex flex-col items-center gap-3 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-900">
                <svg className="h-7 w-7 fill-amber-500" viewBox="0 0 24 24" aria-hidden="true">
                  {badge.icon}
                </svg>
              </span>
              <span className="text-sm font-medium text-slate-700">{t(`home.trust.${badge.key}`)}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
