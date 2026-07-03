import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getTicketsForDate, getTicketsForDateRange } from '../api/tickets'
import { ApiError } from '../api/client'
import type { MetaData, Ticket } from '../types/api'
import { Alert, Button, Input } from '../components/ui'
import TicketCard from '../components/TicketCard'
import { toDateOnly } from '../lib/format'

export default function BrowsePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const date = searchParams.get('date') ?? toDateOnly(new Date())
  const endDate = searchParams.get('endDate') ?? ''
  const page = Number(searchParams.get('page') ?? '1')

  const [tickets, setTickets] = useState<Ticket[]>([])
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
        setError(err instanceof ApiError ? err.message : 'Failed to load tickets')
        setTickets([])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [date, endDate, page])

  function updateParam(key: string, value: string) {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
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
      <h1 className="text-2xl font-semibold text-slate-900">Browse tickets</h1>

      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">From date</label>
          <Input type="date" value={date} onChange={(e) => updateParam('date', e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">To date (optional)</label>
          <Input type="date" value={endDate} onChange={(e) => updateParam('endDate', e.target.value)} />
        </div>
      </div>

      {loading && <p className="text-slate-500">Loading tickets&hellip;</p>}
      {error && <Alert>{error}</Alert>}

      {!loading && !error && tickets.length === 0 && (
        <p className="text-slate-500">No tickets found for this date. Try another date or set up an alert.</p>
      )}

      <div className="flex flex-col gap-3">
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>

      {meta && totalPages > 1 && (
        <div className="flex items-center justify-center gap-3">
          <Button type="button" disabled={page <= 1} onClick={() => goToPage(page - 1)}>
            Previous
          </Button>
          <span className="text-sm text-slate-600">
            Page {page} of {totalPages}
          </span>
          <Button type="button" disabled={page >= totalPages} onClick={() => goToPage(page + 1)}>
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
