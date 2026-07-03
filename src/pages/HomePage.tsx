import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Input } from '../components/ui'
import { toDateOnly } from '../lib/format'

export default function HomePage() {
  const [date, setDate] = useState(toDateOnly(new Date()))
  const navigate = useNavigate()

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    navigate(`/browse?date=${date}`)
  }

  return (
    <div className="flex flex-col gap-10">
      <section className="text-center">
        <h1 className="text-4xl font-semibold text-slate-900">Buy and sell tickets, safely</h1>
        <p className="mx-auto mt-3 max-w-xl text-slate-600">
          Can&apos;t make your trip? Sell your ticket. Need one last minute? Find one for your travel date.
        </p>
      </section>

      <Card className="mx-auto w-full max-w-md">
        <form onSubmit={handleSearch} className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Travel date</label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
          <Button type="submit">Search tickets</Button>
        </form>
      </Card>

      <section className="grid gap-4 sm:grid-cols-3">
        <Card>
          <h2 className="font-semibold text-slate-900">Browse</h2>
          <p className="mt-1 text-sm text-slate-600">Find tickets for sale on your travel date.</p>
        </Card>
        <Card>
          <h2 className="font-semibold text-slate-900">Sell</h2>
          <p className="mt-1 text-sm text-slate-600">Upload your ticket and get paid when it sells.</p>
        </Card>
        <Card>
          <h2 className="font-semibold text-slate-900">Get alerts</h2>
          <p className="mt-1 text-sm text-slate-600">Subscribe to be notified when a ticket for your date appears.</p>
        </Card>
      </section>
    </div>
  )
}
