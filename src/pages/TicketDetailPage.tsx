import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getTicketById } from '../api/tickets'
import { ApiError } from '../api/client'
import type { TicketSummary } from '../types/api'
import { Alert, Button, Card } from '../components/ui'
import { formatCurrency, formatDateTime } from '../lib/format'
import { useLanguage } from '../i18n/LanguageContext'

export default function TicketDetailPage() {
  const { t, language } = useLanguage()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [ticket, setTicket] = useState<TicketSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    let cancelled = false
    setLoading(true)
    getTicketById(id)
      .then((res) => {
        if (!cancelled) setTicket(res.data ?? null)
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof ApiError ? err.message : t('common.failedToLoadTicket'))
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [id, t])

  if (loading) return <p className="text-slate-500">{t('common.loadingTicket')}</p>
  if (error) return <Alert>{error}</Alert>
  if (!ticket) return <Alert>{t('common.ticketNotFound')}</Alert>

  return (
    <div className="mx-auto max-w-lg">
      <Link to="/browse" className="text-sm text-slate-500 hover:text-slate-900">
        {t('common.backToBrowse')}
      </Link>

      <Card className="mt-4">
        <h1 className="text-xl font-semibold text-slate-900">{formatDateTime(ticket.ticketDateTime, language)}</h1>
        <p className="mt-1 text-sm text-slate-500">{t('common.bag', { count: ticket.numberOfBags })}</p>

        <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4">
          <span className="text-sm text-slate-500">{t('common.price')}</span>
          <span className="text-2xl font-semibold text-slate-900">{formatCurrency(ticket.totalPrice, language)}</span>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-slate-500">{t('ticketDetail.reviewNote')}</p>

        <Button className="mt-6 w-full" onClick={() => navigate(`/checkout/${ticket.id}`)}>
          {t('ticketDetail.buyButton')}
        </Button>
      </Card>
    </div>
  )
}
