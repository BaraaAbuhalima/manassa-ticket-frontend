import { apiDelete, apiGet, apiGetWithHeaders, apiPatchAuth, apiPostAuth, apiPostForm } from './client'
import type {
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

function appendPaymentInfo(form: FormData, values: PostTicketFormValues) {
  const prefix = 'PaymentInfoRequest'
  if (values.paymentInfo.bankDetails) {
    const bd = values.paymentInfo.bankDetails
    form.append(`${prefix}.BankDetails.AccountNumber`, bd.accountNumber)
    form.append(`${prefix}.BankDetails.BankName`, bd.bankName)
    form.append(`${prefix}.BankDetails.Country`, bd.country)
    form.append(`${prefix}.BankDetails.AccountHolderName`, bd.accountHolderName)
  }
  if (values.paymentInfo.phoneNumber) {
    form.append(`${prefix}.PhoneNumber`, values.paymentInfo.phoneNumber)
  }
}

export function postTicket(values: PostTicketFormValues) {
  const form = new FormData()
  form.append('File', values.file)
  form.append('SellerEmail', values.sellerEmail)
  form.append('SellerPhone', values.sellerPhone)
  form.append('SellerName', values.sellerName)
  form.append('Price', String(values.price))
  form.append('PaymentMethod', values.paymentMethod)
  appendPaymentInfo(form, values)
  return apiPostForm<PostTicketResponse>('/api/ticket', form)
}
