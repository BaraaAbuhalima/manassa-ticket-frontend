import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getTicketById } from '../api/tickets'
import { ApiError } from '../api/client'
import type { Ticket } from '../types/api'
import { Alert, Button, Card } from '../components/ui'
import { formatCurrency, formatDateTime } from '../lib/format'

export default function TicketDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [ticket, setTicket] = useState<Ticket | null>(null)
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
        if (!cancelled) setError(err instanceof ApiError ? err.message : 'Failed to load ticket')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [id])

  if (loading) return <p className="text-slate-500">Loading ticket&hellip;</p>
  if (error) return <Alert>{error}</Alert>
  if (!ticket) return <Alert>Ticket not found</Alert>

  const isAvailable = ticket.status === 'ForSale'

  return (
    <div className="mx-auto max-w-lg">
      <Link to="/browse" className="text-sm text-slate-500 hover:text-slate-900">
        &larr; Back to browse
      </Link>

      <Card className="mt-4">
        <h1 className="text-xl font-semibold text-slate-900">{formatDateTime(ticket.ticketDateTime)}</h1>
        <p className="mt-1 text-sm text-slate-500">
          {ticket.numberOfBags} {ticket.numberOfBags === 1 ? 'bag' : 'bags'} included
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4">
          <span className="text-sm text-slate-500">Price</span>
          <span className="text-2xl font-semibold text-slate-900">{formatCurrency(ticket.totalPrice)}</span>
        </div>

        {!isAvailable && (
          <div className="mt-4">
            <Alert>This ticket is no longer available.</Alert>
          </div>
        )}

        <Button className="mt-6 w-full" disabled={!isAvailable} onClick={() => navigate(`/checkout/${ticket.id}`)}>
          {isAvailable ? 'Buy this ticket' : 'Sold'}
        </Button>
      </Card>
    </div>
  )
}
