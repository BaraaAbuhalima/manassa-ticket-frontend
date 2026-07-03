import { useState } from 'react'
import type { PaymentMethod } from '../types/api'
import { postTicket } from '../api/tickets'
import { ApiError } from '../api/client'
import { Alert, Button, Field, Input, Select } from '../components/ui'

export default function SellPage() {
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
      setError('Please attach your ticket file')
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
      setError(err instanceof ApiError ? (err.errors[0] ?? err.message) : 'Failed to post ticket')
    } finally {
      setSubmitting(false)
    }
  }

  if (result) {
    return (
      <div className="mx-auto max-w-md">
        <Alert kind="success">
          Your ticket has been posted! Your reference PIN is <strong>{result.refPin}</strong>. Keep it safe — you can
          use it to look up your ticket status.
        </Alert>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-2xl font-semibold text-slate-900">Sell your ticket</h1>
      <p className="mt-1 text-sm text-slate-600">
        Upload your ticket file — we&apos;ll automatically read the travel details from it.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <Field label="Ticket file (PDF)">
          <Input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            required
          />
        </Field>

        <Field label="Your name">
          <Input value={sellerName} onChange={(e) => setSellerName(e.target.value)} required maxLength={100} />
        </Field>

        <Field label="Your email">
          <Input
            type="email"
            value={sellerEmail}
            onChange={(e) => setSellerEmail(e.target.value)}
            required
            maxLength={254}
          />
        </Field>

        <Field label="Your phone">
          <Input value={sellerPhone} onChange={(e) => setSellerPhone(e.target.value)} required maxLength={30} />
        </Field>

        <Field label="Asking price">
          <Input
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Field>

        <Field label="How should we pay you?">
          <Select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}>
            <option value="Iban">Bank transfer (IBAN)</option>
            <option value="Reflect">Reflect</option>
            <option value="Phone">Phone transfer</option>
          </Select>
        </Field>

        {paymentMethod === 'Iban' ? (
          <>
            <Field label="Account holder name">
              <Input value={accountHolderName} onChange={(e) => setAccountHolderName(e.target.value)} required maxLength={40} />
            </Field>
            <Field label="Bank name">
              <Input value={bankName} onChange={(e) => setBankName(e.target.value)} required maxLength={40} />
            </Field>
            <Field label="Country">
              <Input value={country} onChange={(e) => setCountry(e.target.value)} required maxLength={30} />
            </Field>
            <Field label="IBAN / account number">
              <Input value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} required maxLength={30} />
            </Field>
          </>
        ) : (
          <Field label={paymentMethod === 'Reflect' ? 'Reflect phone number' : 'Phone transfer number'}>
            <Input value={transferPhoneNumber} onChange={(e) => setTransferPhoneNumber(e.target.value)} required maxLength={20} />
          </Field>
        )}

        {error && <Alert>{error}</Alert>}

        <Button type="submit" disabled={submitting}>
          {submitting ? 'Posting…' : 'Post ticket for sale'}
        </Button>
      </form>
    </div>
  )
}
