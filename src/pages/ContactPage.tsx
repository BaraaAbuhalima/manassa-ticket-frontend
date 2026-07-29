import { useState } from 'react'
import { sendContactMessage } from '../api/contact'
import { ApiError } from '../api/client'
import { Alert, Button, Card, Field, Input } from '../components/ui'
import { useLanguage } from '../i18n/LanguageContext'

export default function ContactPage() {
  const { t } = useLanguage()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await sendContactMessage({ name, email, message })
      setSuccess(true)
    } catch (err) {
      setError(err instanceof ApiError ? (err.errors[0] ?? err.message) : t('contact.genericError'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-2xl font-semibold text-slate-900">{t('contact.title')}</h1>
      <p className="mt-1 text-sm text-slate-600">{t('contact.subtitle')}</p>
      <p className="mt-1 text-sm text-slate-600">
        {t('contact.directEmailLabel')}{' '}
        <a href="mailto:support@manassaticket.com" className="font-medium text-slate-900 hover:underline">
          support@manassaticket.com
        </a>
      </p>

      <Card className="mt-6">
        {success ? (
          <Alert kind="success">{t('contact.successMessage')}</Alert>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Field label={t('contact.nameLabel')}>
              <Input value={name} onChange={(e) => setName(e.target.value)} required maxLength={100} />
            </Field>
            <Field label={t('contact.emailLabel')}>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                maxLength={254}
              />
            </Field>
            <Field label={t('contact.messageLabel')}>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                maxLength={2000}
                rows={5}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-500"
              />
            </Field>
            {error && <Alert>{error}</Alert>}
            <Button type="submit" disabled={submitting}>
              {submitting ? t('contact.sendingButton') : t('contact.sendButton')}
            </Button>
          </form>
        )}
      </Card>
    </div>
  )
}
