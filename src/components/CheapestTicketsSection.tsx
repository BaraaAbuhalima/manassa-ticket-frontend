import { useEffect, useState } from 'react'
import { getCheapestTickets } from '../api/tickets'
import type { TicketSummary } from '../types/api'
import TicketCard from './TicketCard'
import { useLanguage } from '../i18n/LanguageContext'

// Best-effort homepage highlight — quietly hides itself on error or when nothing is for
// sale rather than drawing attention to a failure in supplementary content.
export default function CheapestTicketsSection() {
  const { t } = useLanguage()
  const [tickets, setTickets] = useState<TicketSummary[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    getCheapestTickets()
      .then((res) => {
        if (!cancelled) setTickets(res.data ?? [])
      })
      .catch(() => {
        if (!cancelled) setTickets([])
      })
      .finally(() => {
        if (!cancelled) setReady(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  if (!ready || tickets.length === 0) return null

  return (
    <section>
      <h2 className="text-lg font-semibold text-slate-900">{t('home.cheapest.heading')}</h2>
      <p className="mt-1 text-sm text-slate-500">{t('home.cheapest.subtitle')}</p>
      <div className="mt-4 flex flex-col gap-3">
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </section>
  )
}
