import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { subscribeToDate } from '../api/subscriptions'
import { ApiError } from '../api/client'
import { Alert, Button, Card, Field, Input } from '../components/ui'
import { toDateOnly } from '../lib/format'
import { useLanguage } from '../i18n/LanguageContext'

export default function SubscribePage() {
  const { t } = useLanguage()
  const today = toDateOnly(new Date())
  const [searchParams] = useSearchParams()
  const [email, setEmail] = useState('')
  const [date, setDate] = useState(searchParams.get('date') ?? today)
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
      setError(err instanceof ApiError ? err.message : t('subscribe.genericError'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-2xl font-semibold text-slate-900">{t('subscribe.title')}</h1>
      <p className="mt-1 text-sm text-slate-600">{t('subscribe.subtitle')}</p>

      <Card className="mt-6">
        {success ? (
          <Alert kind="success">{t('subscribe.successMessage', { email, date })}</Alert>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Field label={t('subscribe.emailLabel')}>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Field>
            <Field label={t('subscribe.dateLabel')}>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} min={today} required />
            </Field>
            {error && <Alert>{error}</Alert>}
            <Button type="submit" disabled={submitting}>
              {submitting ? t('subscribe.subscribingButton') : t('subscribe.notifyButton')}
            </Button>
            <p className="text-xs leading-relaxed text-slate-500">{t('subscribe.privacyNote')}</p>
          </form>
        )}
      </Card>
    </div>
  )
}
