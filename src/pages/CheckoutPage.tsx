import { useState } from 'react'
import type { Stripe } from '@stripe/stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { purchaseTicket } from '../api/payments'
import { ApiError } from '../api/client'
import { Alert, Button, Card, Input } from '../components/ui'
import { formatCurrency } from '../lib/format'

interface PurchaseDetails {
  clientSecret: string
  amount: number
  currency: string
}

const stripePromiseCache = new Map<string, Promise<Stripe | null>>()

function getStripePromise(publishableKey: string) {
  let promise = stripePromiseCache.get(publishableKey)
  if (!promise) {
    promise = loadStripe(publishableKey)
    stripePromiseCache.set(publishableKey, promise)
  }
  return promise
}

function PaymentForm({ details }: { details: PurchaseDetails }) {
  const stripe = useStripe()
  const elements = useElements()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [succeeded, setSucceeded] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!stripe || !elements) return
    setSubmitting(true)
    setError(null)

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.href },
      redirect: 'if_required',
    })

    if (confirmError) {
      setError(confirmError.message ?? 'Payment failed. Please try again.')
      setSubmitting(false)
      return
    }

    setSucceeded(true)
    setSubmitting(false)
  }

  if (succeeded) {
    return <Alert kind="success">Payment successful! Check your email for confirmation.</Alert>
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <PaymentElement />
      {error && <Alert>{error}</Alert>}
      <Button type="submit" disabled={!stripe || submitting}>
        {submitting ? 'Processing…' : `Pay ${formatCurrency(details.amount, details.currency.toUpperCase())}`}
      </Button>
    </form>
  )
}

export default function CheckoutPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [buyerName, setBuyerName] = useState('')
  const [buyerEmail, setBuyerEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [details, setDetails] = useState<PurchaseDetails | null>(null)
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null)

  async function handleStartCheckout(e: React.FormEvent) {
    e.preventDefault()
    if (!id) return
    setSubmitting(true)
    setError(null)
    try {
      const res = await purchaseTicket(id, { buyerName, buyerEmail })
      if (!res.data) throw new Error('No payment details returned')
      setDetails({ clientSecret: res.data.clientSecret, amount: res.data.amount, currency: res.data.currency })
      setStripePromise(getStripePromise(res.data.publishableKey))
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Unable to start checkout')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <button type="button" onClick={() => navigate(-1)} className="text-sm text-slate-500 hover:text-slate-900">
        &larr; Back
      </button>

      <Card className="mt-4">
        <h1 className="text-xl font-semibold text-slate-900">Checkout</h1>

        {!details && (
          <form onSubmit={handleStartCheckout} className="mt-4 flex flex-col gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Your name</label>
              <Input value={buyerName} onChange={(e) => setBuyerName(e.target.value)} required maxLength={50} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Your email</label>
              <Input
                type="email"
                value={buyerEmail}
                onChange={(e) => setBuyerEmail(e.target.value)}
                required
                maxLength={254}
              />
            </div>
            {error && <Alert>{error}</Alert>}
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Preparing payment…' : 'Continue to payment'}
            </Button>
          </form>
        )}

        {details && stripePromise && (
          <div className="mt-4">
            <Elements stripe={stripePromise} options={{ clientSecret: details.clientSecret }}>
              <PaymentForm details={details} />
            </Elements>
          </div>
        )}
      </Card>

      <p className="mt-4 text-center text-xs text-slate-400">
        Having trouble? <Link to="/browse" className="underline">Back to browse</Link>
      </p>
    </div>
  )
}
