import { Link } from 'react-router-dom'
import type { TicketSummary } from '../types/api'
import { formatDateTime } from '../lib/format'
import { Card } from './ui'
import { PriceDisplay } from './PriceDisplay'
import { useLanguage } from '../i18n/LanguageContext'

export default function TicketCard({ ticket }: { ticket: TicketSummary }) {
  const { t, language } = useLanguage()

  return (
    <Link to={`/tickets/${ticket.id}`}>
      <Card className="flex items-center justify-between transition-shadow hover:shadow-md">
        <div>
          <p className="font-medium text-slate-900">{formatDateTime(ticket.ticketDateTime, language)}</p>
          <p className="text-sm text-slate-500">{t('common.bag', { count: ticket.numberOfBags })}</p>
        </div>
        <PriceDisplay jod={ticket.totalPriceJod} usd={ticket.totalPriceUsd} language={language} size="md" />
      </Card>
    </Link>
  )
}
