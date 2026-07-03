import { Link } from 'react-router-dom'
import type { Ticket } from '../types/api'
import { formatCurrency, formatDateTime } from '../lib/format'
import { Card } from './ui'

export default function TicketCard({ ticket }: { ticket: Ticket }) {
  return (
    <Link to={`/tickets/${ticket.id}`}>
      <Card className="flex items-center justify-between transition-shadow hover:shadow-md">
        <div>
          <p className="font-medium text-slate-900">{formatDateTime(ticket.ticketDateTime)}</p>
          <p className="text-sm text-slate-500">
            {ticket.numberOfBags} {ticket.numberOfBags === 1 ? 'bag' : 'bags'} included
          </p>
        </div>
        <p className="text-lg font-semibold text-slate-900">{formatCurrency(ticket.totalPrice)}</p>
      </Card>
    </Link>
  )
}
