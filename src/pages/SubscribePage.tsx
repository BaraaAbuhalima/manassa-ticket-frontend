import { useState } from 'react'
import { subscribeToDate } from '../api/subscriptions'
import { ApiError } from '../api/client'
import { Alert, Button, Card, Field, Input } from '../components/ui'
import { toDateOnly } from '../lib/format'

export default function SubscribePage() {
  const [email, setEmail] = useState('')
  const [date, setDate] = useState(toDateOnly(new Date()))
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await subscribeToDate({ email, date })
      setSuccess(true)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to subscribe')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-2xl font-semibold text-slate-900">Get notified</h1>
      <p className="mt-1 text-sm text-slate-600">
        Tell us your travel date and we&apos;ll email you as soon as a ticket for it becomes available.
      </p>

      <Card className="mt-6">
        {success ? (
          <Alert kind="success">You&apos;re subscribed! We&apos;ll email {email} when a ticket for {date} appears.</Alert>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Field label="Email">
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Field>
            <Field label="Travel date">
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </Field>
            {error && <Alert>{error}</Alert>}
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Subscribing…' : 'Notify me'}
            </Button>
          </form>
        )}
      </Card>
    </div>
  )
}
