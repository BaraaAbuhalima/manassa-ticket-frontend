import { Link } from 'react-router-dom'
import type { TicketSummary } from '../types/api'
import { formatCurrency, formatDateTime } from '../lib/format'
import { Card } from './ui'
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
        <p className="text-lg font-semibold text-slate-900">{formatCurrency(ticket.totalPrice, language)}</p>
      </Card>
    </Link>
  )
}
