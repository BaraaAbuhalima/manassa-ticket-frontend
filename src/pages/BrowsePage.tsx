import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getTicketsForDate, getTicketsForDateRange } from '../api/tickets'
import { ApiError } from '../api/client'
import type { MetaData, TicketSummary } from '../types/api'
import { Alert, Button, Input } from '../components/ui'
import TicketCard from '../components/TicketCard'
import { toDateOnly } from '../lib/format'
import { useLanguage } from '../i18n/LanguageContext'

export default function BrowsePage() {
  const { t } = useLanguage()
  const today = toDateOnly(new Date())
  const [searchParams, setSearchParams] = useSearchParams()
  const date = searchParams.get('date') ?? today
  const endDate = searchParams.get('endDate') ?? ''
  const page = Number(searchParams.get('page') ?? '1')

  const [pendingDate, setPendingDate] = useState(date)
  const [pendingEndDate, setPendingEndDate] = useState(endDate)

  const [tickets, setTickets] = useState<TicketSummary[]>([])
  const [meta, setMeta] = useState<MetaData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    const request = endDate ? getTicketsForDateRange(date, endDate, page) : getTicketsForDate(date, page)

    request
      .then((res) => {
        if (cancelled) return
        setTickets(res.data ?? [])
        setMeta(res.meta ?? null)
      })
      .catch((err: unknown) => {
        if (cancelled) return
        setError(err instanceof ApiError ? err.message : t('common.failedToLoadTickets'))
        setTickets([])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [date, endDate, page, t])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const next = new URLSearchParams(searchParams)
    if (pendingDate) next.set('date', pendingDate)
    else next.delete('date')
    if (pendingEndDate) next.set('endDate', pendingEndDate)
    else next.delete('endDate')
    next.delete('page')
    setSearchParams(next)
  }

  function goToPage(nextPage: number) {
    const next = new URLSearchParams(searchParams)
    next.set('page', String(nextPage))
    setSearchParams(next)
  }

  const totalPages = meta ? Math.max(1, Math.ceil(meta.totalCount / meta.pageSize)) : 1

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-slate-900">{t('browse.title')}</h1>

      <form onSubmit={handleSearch} className="flex flex-wrap items-end gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t('common.fromDate')}</label>
          <Input type="date" value={pendingDate} onChange={(e) => setPendingDate(e.target.value)} min={today} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t('common.toDateOptional')}</label>
          <Input
            type="date"
            value={pendingEndDate}
            onChange={(e) => setPendingEndDate(e.target.value)}
            min={pendingDate || today}
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? t('browse.searchingButton') : t('browse.searchButton')}
        </Button>
      </form>

      {loading && <p className="text-slate-500">{t('common.loadingTickets')}</p>}
      {error && <Alert>{error}</Alert>}

      {!loading && !error && tickets.length === 0 && (
        <div className="flex flex-col items-start gap-3">
          <p className="text-slate-500">{t('common.noTicketsFound')}</p>
          <Link
            to={`/subscribe?date=${date}`}
            className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
          >
            {t('common.registerAlertButton')}
          </Link>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>

      {meta && totalPages > 1 && (
        <div className="flex items-center justify-center gap-3">
          <Button type="button" disabled={loading || page <= 1} onClick={() => goToPage(page - 1)}>
            {t('common.previous')}
          </Button>
          <span className="text-sm text-slate-600">{t('common.pageOf', { page, total: totalPages })}</span>
          <Button type="button" disabled={loading || page >= totalPages} onClick={() => goToPage(page + 1)}>
            {t('common.next')}
          </Button>
        </div>
      )}
    </div>
  )
}
