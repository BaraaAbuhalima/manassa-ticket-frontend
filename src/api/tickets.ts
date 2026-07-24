import { ApiError, apiDelete, apiGet, apiGetAuth, apiGetWithHeaders, apiPatchAuth, apiPostAuth, apiPostJson } from './client'
import type {
  CreateUploadUrlResponse,
  PostTicketFormValues,
  PostTicketResponse,
  TicketFileUrlResponse,
  TicketSummary,
  TicketWithStatus,
  UpdateTicketRequest,
} from '../types/api'

export function getTicketById(id: string) {
  return apiGet<TicketSummary>(`/api/ticket/${id}`)
}

// The backend matches on pin AND seller email (case-insensitive) — omitting email isn't just
// looser, it never matches any real ticket, since SellerEmail is never empty.
export async function getTicketByPin(pin: string, email: string) {
  const { body, headers } = await apiGetWithHeaders<TicketWithStatus>(`/api/ticket/by-pin/${pin}`, { email })
  return { ...body, deleteToken: headers.get('X-Delete-Token') }
}

export function getTicketsForDate(date: string, page = 1) {
  return apiGet<TicketSummary[]>('/api/ticket/date', { date, page })
}

export function getTicketsForDateRange(startDate: string, endDate: string, page = 1) {
  return apiGet<TicketSummary[]>('/api/ticket/range', { startDate, endDate, page })
}

export function deleteTicket(deleteToken: string) {
  return apiDelete<null>('/api/ticket', { Authorization: `Bearer ${deleteToken}` })
}

export function republishTicket(deleteToken: string) {
  return apiPostAuth<null>('/api/ticket/republish', deleteToken)
}

export function modifyTicket(deleteToken: string, request: UpdateTicketRequest) {
  return apiPatchAuth<null>('/api/ticket', deleteToken, request)
}

// The download URL is presigned and short-lived (15 minutes on the backend) — callers
// should fetch it right before using it, not cache it.
export function getTicketFileUrl(deleteToken: string) {
  return apiGetAuth<TicketFileUrlResponse>('/api/ticket/file-url', deleteToken)
}

// Posting is a three-step flow: get a presigned upload URL from the API, PUT the
// PDF directly to storage, then submit the listing referencing the uploaded file.
// The ticket comes back in Processing status and is verified asynchronously.
export async function postTicket(values: PostTicketFormValues) {
  const uploadUrlRes = await apiPostJson<CreateUploadUrlResponse>('/api/ticket/upload-url', {})
  if (!uploadUrlRes.data) {
    throw new ApiError('No upload URL returned', uploadUrlRes.statusCode, [])
  }
  const { fileKey, uploadUrl } = uploadUrlRes.data

  // The URL is presigned for Content-Type application/pdf; the header must match.
  const uploadRes = await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/pdf' },
    body: values.file,
  })
  if (!uploadRes.ok) {
    throw new Error(`Ticket file upload failed (${uploadRes.status})`)
  }

  return apiPostJson<PostTicketResponse>('/api/ticket', {
    fileKey,
    sellerEmail: values.sellerEmail,
    sellerPhone: values.sellerPhone,
    sellerName: values.sellerName,
    price: values.price,
    paymentMethod: values.paymentMethod,
    paymentInfoRequest: values.paymentInfo,
  })
}
