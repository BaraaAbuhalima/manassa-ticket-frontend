import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Card, Input } from '../components/ui'
import { toDateOnly } from '../lib/format'
import { useLanguage } from '../i18n/LanguageContext'

export default function HomePage() {
  const { t } = useLanguage()
  const today = toDateOnly(new Date())
  const [date, setDate] = useState(today)
  const navigate = useNavigate()

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    navigate(`/find?date=${date}`)
  }

  return (
    <div className="flex flex-col gap-10">
      <section className="text-center">
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
        <Link to="/browse" className="block h-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400">
          <Card className="h-full transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
            <h2 className="font-semibold text-slate-900">{t('home.cards.browseTitle')}</h2>
            <p className="mt-1 text-sm text-slate-600">{t('home.cards.browseDesc')}</p>
          </Card>
        </Link>
        <Link to="/sell" className="block h-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400">
          <Card className="h-full transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
            <h2 className="font-semibold text-slate-900">{t('home.cards.sellTitle')}</h2>
            <p className="mt-1 text-sm text-slate-600">{t('home.cards.sellDesc')}</p>
          </Card>
        </Link>
        <Link
          to="/subscribe"
          className="block h-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
        >
          <Card className="h-full transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
            <h2 className="font-semibold text-slate-900">{t('home.cards.alertsTitle')}</h2>
            <p className="mt-1 text-sm text-slate-600">{t('home.cards.alertsDesc')}</p>
          </Card>
        </Link>
      </section>
    </div>
  )
}
