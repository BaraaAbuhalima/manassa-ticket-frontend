import { apiPostJson } from './client'
import type { PurchaseTicketRequest, PurchaseTicketResponse } from '../types/api'

export function purchaseTicket(ticketId: string, request: PurchaseTicketRequest) {
  return apiPostJson<PurchaseTicketResponse>(`/api/payment/ticket/${ticketId}`, request)
}
