import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { PaymentMethod } from '../types/api'
import { postTicket } from '../api/tickets'
import { ApiError } from '../api/client'
import { Alert, Button, Field, Input, Select } from '../components/ui'
import { useLanguage } from '../i18n/LanguageContext'

export default function SellPage() {
  const { t } = useLanguage()
  const [file, setFile] = useState<File | null>(null)
  const [sellerName, setSellerName] = useState('')
  const [sellerEmail, setSellerEmail] = useState('')
  const [sellerPhone, setSellerPhone] = useState('')
  const [price, setPrice] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Iban')
  const [accountNumber, setAccountNumber] = useState('')
  const [bankName, setBankName] = useState('')
  const [country, setCountry] = useState('')
  const [accountHolderName, setAccountHolderName] = useState('')
  const [transferPhoneNumber, setTransferPhoneNumber] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<{ refPin: string } | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!file) {
      setError(t('sell.attachFileError'))
      return
    }
    setSubmitting(true)
    setError(null)
    try {
      const res = await postTicket({
        file,
        sellerName,
        sellerEmail,
        sellerPhone,
        price: Number(price),
        paymentMethod,
        paymentInfo:
          paymentMethod === 'Iban'
            ? { bankDetails: { accountNumber, bankName, country, accountHolderName } }
            : { phoneNumber: transferPhoneNumber },
      })
      if (!res.data) throw new Error('No response from server')
      setResult({ refPin: res.data.refPin })
    } catch (err) {
      setError(err instanceof ApiError ? (err.errors[0] ?? err.message) : t('sell.genericError'))
    } finally {
      setSubmitting(false)
    }
  }

  if (result) {
    const [before, after] = t('sell.successMessage', { pin: result.refPin }).split(result.refPin)
    return (
      <div className="mx-auto max-w-md">
        <Alert kind="success">
          {before}
          <strong>{result.refPin}</strong>
          {after}
        </Alert>
        <Link
          to={`/manage-ticket?pin=${result.refPin}`}
          className="mt-4 inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
        >
          {t('nav.manageTicket')}
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-2xl font-semibold text-slate-900">{t('sell.title')}</h1>
      <p className="mt-1 text-sm text-slate-600">{t('sell.subtitle')}</p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <Field label={t('sell.fileLabel')}>
          <Input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            required
          />
        </Field>

        <Field label={t('sell.nameLabel')}>
          <Input value={sellerName} onChange={(e) => setSellerName(e.target.value)} required maxLength={100} />
        </Field>

        <Field label={t('sell.emailLabel')}>
          <Input
            type="email"
            value={sellerEmail}
            onChange={(e) => setSellerEmail(e.target.value)}
            required
            maxLength={254}
          />
        </Field>

        <Field label={t('sell.phoneLabel')}>
          <Input value={sellerPhone} onChange={(e) => setSellerPhone(e.target.value)} required maxLength={30} />
        </Field>

        <Field label={t('sell.priceLabel')}>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-slate-500">
              JD
            </span>
            <Input
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="pl-9"
            />
          </div>
          <p className="mt-1 text-xs text-slate-500">{t('sell.priceLimitNote')}</p>
        </Field>

        <Field label={t('sell.paymentMethodLabel')}>
          <Select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}>
            <option value="Iban">{t('sell.paymentOptions.iban')}</option>
            <option value="Reflect">{t('sell.paymentOptions.reflect')}</option>
            <option value="Phone">{t('sell.paymentOptions.phone')}</option>
          </Select>
        </Field>

        {paymentMethod === 'Iban' ? (
          <>
            <Field label={t('sell.accountHolderLabel')}>
              <Input value={accountHolderName} onChange={(e) => setAccountHolderName(e.target.value)} required maxLength={40} />
            </Field>
            <Field label={t('sell.bankNameLabel')}>
              <Input value={bankName} onChange={(e) => setBankName(e.target.value)} required maxLength={40} />
            </Field>
            <Field label={t('sell.countryLabel')}>
              <Input value={country} onChange={(e) => setCountry(e.target.value)} required maxLength={30} />
            </Field>
            <Field label={t('sell.ibanLabel')}>
              <Input value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} required maxLength={30} />
            </Field>
          </>
        ) : (
          <Field label={paymentMethod === 'Reflect' ? t('sell.reflectPhoneLabel') : t('sell.phoneTransferLabel')}>
            <Input value={transferPhoneNumber} onChange={(e) => setTransferPhoneNumber(e.target.value)} required maxLength={30} />
          </Field>
        )}

        {error && <Alert>{error}</Alert>}

        <p className="text-xs leading-relaxed text-slate-500">{t('sell.notice')}</p>

        <Button type="submit" disabled={submitting}>
          {submitting ? t('sell.postingButton') : t('sell.postButton')}
        </Button>
      </form>
    </div>
  )
}
