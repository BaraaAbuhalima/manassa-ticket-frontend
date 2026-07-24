import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getTicketByPin, deleteTicket, republishTicket, modifyTicket, getTicketFileUrl } from '../api/tickets'
import { ApiError } from '../api/client'
import type { PaymentMethod, TicketWithStatus } from '../types/api'
import { Alert, Button, Card, Field, Input, Select } from '../components/ui'
import { PriceDisplay } from '../components/PriceDisplay'
import { formatDateTime } from '../lib/format'
import { useLanguage } from '../i18n/LanguageContext'

const statusKey = {
  ForSale: 'statusForSale',
  Sold: 'statusSold',
  Deleted: 'statusDeleted',
  Processing: 'statusProcessing',
  Rejected: 'statusRejected',
} as const

const paymentMethodKey = {
  Iban: 'iban',
  Reflect: 'reflect',
  Phone: 'phone',
} as const

export default function ManageTicketPage() {
  const { t, language } = useLanguage()
  const [searchParams] = useSearchParams()
  const [pin, setPin] = useState(searchParams.get('pin') ?? '')
  const [email, setEmail] = useState(searchParams.get('email') ?? '')

  const [ticket, setTicket] = useState<TicketWithStatus | null>(null)
  const [deleteToken, setDeleteToken] = useState<string | null>(null)
  // Rejection reason travels in the response's top-level `message`, not on the ticket data
  // itself — the backend doesn't return a rejectionReason field.
  const [rejectionReason, setRejectionReason] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [lookupError, setLookupError] = useState<string | null>(null)

  const [confirmingDelete, setConfirmingDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const [republishing, setRepublishing] = useState(false)
  const [republishError, setRepublishError] = useState<string | null>(null)

  const [downloading, setDownloading] = useState(false)
  const [downloadError, setDownloadError] = useState<string | null>(null)

  const [modifyOpen, setModifyOpen] = useState(false)
  const [savingModify, setSavingModify] = useState(false)
  const [modifyError, setModifyError] = useState<string | null>(null)
  const [price, setPrice] = useState('')
  const [modifyPaymentMethod, setModifyPaymentMethod] = useState<PaymentMethod>('Iban')
  const [accountNumber, setAccountNumber] = useState('')
  const [bankName, setBankName] = useState('')
  const [country, setCountry] = useState('')
  const [accountHolderName, setAccountHolderName] = useState('')
  const [transferPhoneNumber, setTransferPhoneNumber] = useState('')

  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null)

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setLookupError(null)
    setTicket(null)
    setDeleteToken(null)
    setRejectionReason(null)
    setActionSuccessMessage(null)
    setConfirmingDelete(false)
    setDeleteError(null)
    setRepublishError(null)
    setModifyOpen(false)
    setModifyError(null)
    try {
      const res = await getTicketByPin(pin.trim(), email.trim())
      if (!res.data) throw new Error('No ticket data returned')
      setTicket(res.data)
      setDeleteToken(res.deleteToken)
      setRejectionReason(res.data.status === 'Rejected' ? (res.message ?? null) : null)
    } catch (err) {
      setLookupError(err instanceof ApiError ? (err.errors[0] ?? err.message) : t('manageTicket.lookupError'))
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (!deleteToken) {
      setDeleteError(t('manageTicket.deleteError'))
      return
    }
    setDeleting(true)
    setDeleteError(null)
    try {
      await deleteTicket(deleteToken)
      setActionSuccessMessage(t('manageTicket.deleteSuccessMessage'))
      setTicket(null)
      setDeleteToken(null)
      setConfirmingDelete(false)
    } catch (err) {
      setDeleteError(err instanceof ApiError ? (err.errors[0] ?? err.message) : t('manageTicket.deleteError'))
    } finally {
      setDeleting(false)
    }
  }

  async function handleRepublish() {
    if (!deleteToken) {
      setRepublishError(t('manageTicket.republishError'))
      return
    }
    setRepublishing(true)
    setRepublishError(null)
    try {
      await republishTicket(deleteToken)
      setActionSuccessMessage(t('manageTicket.republishSuccessMessage'))
      setTicket(null)
      setDeleteToken(null)
    } catch (err) {
      setRepublishError(err instanceof ApiError ? (err.errors[0] ?? err.message) : t('manageTicket.republishError'))
    } finally {
      setRepublishing(false)
    }
  }

  async function handleDownloadFile() {
    if (!deleteToken) {
      setDownloadError(t('manageTicket.downloadError'))
      return
    }
    setDownloading(true)
    setDownloadError(null)
    try {
      const res = await getTicketFileUrl(deleteToken)
      if (!res.data) throw new Error('No download URL returned')
      // Presigned and short-lived (15 min) — open immediately rather than storing it.
      window.open(res.data.downloadUrl, '_blank', 'noopener,noreferrer')
    } catch (err) {
      setDownloadError(err instanceof ApiError ? (err.errors[0] ?? err.message) : t('manageTicket.downloadError'))
    } finally {
      setDownloading(false)
    }
  }

  function openModify() {
    if (!ticket) return
    setPrice(String(ticket.sellerAskedPriceJod))
    setModifyPaymentMethod(ticket.paymentMethod)
    if (ticket.paymentInfo.type === 'bankTransfer') {
      setAccountNumber(ticket.paymentInfo.bankDetails.accountNumber)
      setBankName(ticket.paymentInfo.bankDetails.bankName)
      setCountry(ticket.paymentInfo.bankDetails.country)
      setAccountHolderName(ticket.paymentInfo.bankDetails.accountHolderName)
      setTransferPhoneNumber('')
    } else {
      setAccountNumber('')
      setBankName('')
      setCountry('')
      setAccountHolderName('')
      setTransferPhoneNumber(ticket.paymentInfo.phoneNumber)
    }
    setModifyError(null)
    setModifyOpen(true)
  }

  async function handleModifySubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!deleteToken) {
      setModifyError(t('manageTicket.modifyError'))
      return
    }
    setSavingModify(true)
    setModifyError(null)
    try {
      await modifyTicket(deleteToken, {
        price: Number(price),
        payment: {
          paymentMethod: modifyPaymentMethod,
          paymentInfoRequest:
            modifyPaymentMethod === 'Iban'
              ? { bankDetails: { accountNumber, bankName, country, accountHolderName } }
              : { phoneNumber: transferPhoneNumber },
        },
      })
      const res = await getTicketByPin(pin.trim(), email.trim())
      if (res.data) {
        setTicket(res.data)
        setDeleteToken(res.deleteToken)
        setRejectionReason(res.data.status === 'Rejected' ? (res.message ?? null) : null)
      }
      setActionSuccessMessage(t('manageTicket.modifySuccessMessage'))
      setModifyOpen(false)
    } catch (err) {
      setModifyError(err instanceof ApiError ? (err.errors[0] ?? err.message) : t('manageTicket.modifyError'))
    } finally {
      setSavingModify(false)
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-2xl font-semibold text-slate-900">{t('manageTicket.title')}</h1>
      <p className="mt-1 text-sm text-slate-600">{t('manageTicket.subtitle')}</p>

      <Card className="mt-6">
        <form onSubmit={handleLookup} className="flex flex-col gap-4">
          <Field label={t('manageTicket.emailLabel')}>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              maxLength={254}
            />
          </Field>
          <Field label={t('manageTicket.pinLabel')}>
            <Input value={pin} onChange={(e) => setPin(e.target.value)} required maxLength={20} />
          </Field>
          {lookupError && <Alert>{lookupError}</Alert>}
          <Button type="submit" disabled={loading}>
            {loading ? t('manageTicket.lookingUpButton') : t('manageTicket.lookupButton')}
          </Button>
        </form>
      </Card>

      {actionSuccessMessage && (
        <div className="mt-6">
          <Alert kind="success">{actionSuccessMessage}</Alert>
        </div>
      )}

      {ticket && (
        <Card className="mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">
              {ticket.ticketDateTime
                ? formatDateTime(ticket.ticketDateTime, language)
                : t('manageTicket.pendingVerification')}
            </h2>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
              {t(`manageTicket.${statusKey[ticket.status]}`)}
            </span>
          </div>
          {ticket.numberOfBags != null && (
            <p className="mt-1 text-sm text-slate-500">{t('common.bag', { count: ticket.numberOfBags })}</p>
          )}

          <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4">
            <span className="text-sm text-slate-500">{t('common.price')}</span>
            {/* This is the seller's own asking price (no buyer service fee), so there's no
                fee-inclusive USD figure to show alongside it here. */}
            <PriceDisplay jod={ticket.sellerAskedPriceJod} language={language} />
          </div>

          <div className="mt-4 border-t border-slate-200 pt-4">
            <h3 className="text-sm font-semibold text-slate-900">{t('manageTicket.sellerInfoTitle')}</h3>
            <dl className="mt-2 flex flex-col gap-1 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-slate-500">{t('manageTicket.sellerEmailLabel')}</dt>
                <dd className="text-slate-900">{ticket.sellerEmail}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-slate-500">{t('manageTicket.sellerPhoneLabel')}</dt>
                <dd className="text-slate-900">{ticket.sellerPhone}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-slate-500">{t('manageTicket.currentPaymentMethodLabel')}</dt>
                <dd className="text-slate-900">{t(`sell.paymentOptions.${paymentMethodKey[ticket.paymentMethod]}`)}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <Button variant="secondary" disabled={!deleteToken || downloading} onClick={handleDownloadFile}>
              {downloading ? t('manageTicket.downloadingButton') : t('manageTicket.downloadButton')}
            </Button>
            {downloadError && <Alert>{downloadError}</Alert>}
          </div>

          {ticket.status === 'Processing' && (
            <p className="mt-4 text-xs leading-relaxed text-slate-500">{t('manageTicket.processingNotice')}</p>
          )}

          {ticket.status === 'Rejected' && (
            <div className="mt-4 flex flex-col gap-3">
              <Alert>
                {t('manageTicket.rejectedNotice')}
                {rejectionReason && (
                  <>
                    {' '}
                    {t('manageTicket.rejectionReasonLabel')}: {rejectionReason}
                  </>
                )}
              </Alert>
              <Link
                to="/sell"
                className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
              >
                {t('nav.sell')}
              </Link>
            </div>
          )}

          {ticket.status === 'Sold' && (
            <div className="mt-4 flex flex-col gap-1">
              {ticket.soldAt && (
                <p className="text-xs text-slate-500">
                  {t('manageTicket.soldAtMessage', { date: formatDateTime(ticket.soldAt, language) })}
                </p>
              )}
              <p className="text-xs leading-relaxed text-slate-500">{t('manageTicket.soldNotice')}</p>
            </div>
          )}

          {ticket.status === 'ForSale' && !confirmingDelete && !modifyOpen && (
            <div className="mt-6 flex flex-col gap-3">
              <Button variant="secondary" disabled={!deleteToken} onClick={openModify}>
                {t('manageTicket.modifyButton')}
              </Button>
              <Button variant="danger" disabled={!deleteToken} onClick={() => setConfirmingDelete(true)}>
                {t('manageTicket.deleteButton')}
              </Button>
            </div>
          )}

          {ticket.status === 'ForSale' && confirmingDelete && (
            <div className="mt-6 flex flex-col gap-3">
              <Alert>{t('manageTicket.deleteConfirmMessage')}</Alert>
              {deleteError && <Alert>{deleteError}</Alert>}
              <div className="flex gap-3">
                <Button variant="danger" className="flex-1" disabled={deleting} onClick={handleDelete}>
                  {deleting ? t('manageTicket.deletingButton') : t('manageTicket.confirmDeleteButton')}
                </Button>
                <Button
                  variant="secondary"
                  className="flex-1"
                  disabled={deleting}
                  onClick={() => setConfirmingDelete(false)}
                >
                  {t('manageTicket.cancelButton')}
                </Button>
              </div>
            </div>
          )}

          {ticket.status === 'ForSale' && modifyOpen && (
            <form onSubmit={handleModifySubmit} className="mt-6 flex flex-col gap-4">
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
                <p className="mt-1 text-xs text-slate-500">{t('manageTicket.priceLimitNote')}</p>
              </Field>

              <Field label={t('sell.paymentMethodLabel')}>
                <Select
                  value={modifyPaymentMethod}
                  onChange={(e) => setModifyPaymentMethod(e.target.value as PaymentMethod)}
                >
                  <option value="Iban">{t('sell.paymentOptions.iban')}</option>
                  <option value="Reflect">{t('sell.paymentOptions.reflect')}</option>
                  <option value="Phone">{t('sell.paymentOptions.phone')}</option>
                </Select>
              </Field>

              {modifyPaymentMethod === 'Iban' ? (
                <>
                  <Field label={t('sell.accountHolderLabel')}>
                    <Input
                      value={accountHolderName}
                      onChange={(e) => setAccountHolderName(e.target.value)}
                      required
                      maxLength={40}
                    />
                  </Field>
                  <Field label={t('sell.bankNameLabel')}>
                    <Input value={bankName} onChange={(e) => setBankName(e.target.value)} required maxLength={40} />
                  </Field>
                  <Field label={t('sell.countryLabel')}>
                    <Input value={country} onChange={(e) => setCountry(e.target.value)} required maxLength={30} />
                  </Field>
                  <Field label={t('sell.ibanLabel')}>
                    <Input
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      required
                      maxLength={30}
                    />
                  </Field>
                </>
              ) : (
                <Field
                  label={modifyPaymentMethod === 'Reflect' ? t('sell.reflectPhoneLabel') : t('sell.phoneTransferLabel')}
                >
                  <Input
                    value={transferPhoneNumber}
                    onChange={(e) => setTransferPhoneNumber(e.target.value)}
                    required
                    maxLength={30}
                  />
                </Field>
              )}

              {modifyError && <Alert>{modifyError}</Alert>}

              <div className="flex gap-3">
                <Button type="submit" className="flex-1" disabled={savingModify}>
                  {savingModify ? t('manageTicket.modifyingButton') : t('manageTicket.saveButton')}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1"
                  disabled={savingModify}
                  onClick={() => setModifyOpen(false)}
                >
                  {t('manageTicket.cancelButton')}
                </Button>
              </div>
            </form>
          )}

          {ticket.status === 'Deleted' && (
            <div className="mt-6 flex flex-col gap-3">
              {republishError && <Alert>{republishError}</Alert>}
              <Button disabled={!deleteToken || republishing} onClick={handleRepublish}>
                {republishing ? t('manageTicket.republishingButton') : t('manageTicket.republishButton')}
              </Button>
            </div>
          )}
        </Card>
      )}
    </div>
  )
}
