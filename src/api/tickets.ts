import { apiDelete, apiGet, apiPostForm } from './client'
import type { PostTicketFormValues, PostTicketResponse, Ticket } from '../types/api'

export function getTicketById(id: string) {
  return apiGet<Ticket>(`/api/ticket/${id}`)
}

export function getTicketByPin(pin: string) {
  return apiGet<Ticket>(`/api/ticket/by-pin/${pin}`)
}

export function getTicketsForDate(date: string, page = 1) {
  return apiGet<Ticket[]>('/api/ticket/date', { date, page })
}

export function getTicketsForDateRange(startDate: string, endDate: string, page = 1) {
  return apiGet<Ticket[]>('/api/ticket/range', { startDate, endDate, page })
}

export function deleteTicketByToken(token: string) {
  return apiDelete<null>(`/api/ticket/${token}`)
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
