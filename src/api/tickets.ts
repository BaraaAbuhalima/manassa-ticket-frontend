import { ApiError, apiDelete, apiGet, apiGetWithHeaders, apiPatchAuth, apiPostAuth, apiPostJson } from './client'
import type {
  CreateUploadUrlResponse,
  PostTicketFormValues,
  PostTicketResponse,
  TicketSummary,
  TicketWithStatus,
  UpdateTicketRequest,
} from '../types/api'

export function getTicketById(id: string) {
  return apiGet<TicketSummary>(`/api/ticket/${id}`)
}

export async function getTicketByPin(pin: string) {
  const { body, headers } = await apiGetWithHeaders<TicketWithStatus>(`/api/ticket/by-pin/${pin}`)
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
