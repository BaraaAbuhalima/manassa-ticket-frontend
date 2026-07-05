export interface MetaData {
  timestamp: string
  page: number
  pageSize: number
  totalCount: number
}

export interface ApiResponse<T> {
  statusCode: number
  success: boolean
  message?: string | null
  data?: T | null
  errors?: string[] | null
  meta?: MetaData | null
  links?: Record<string, string> | null
}

export type PaymentMethod = 'Iban' | 'Reflect' | 'Phone'

export interface BankDetails {
  accountNumber: string
  bankName: string
  country: string
  accountHolderName: string
}

export type PaymentInfo =
  | { type: 'bankTransfer'; bankDetails: BankDetails }
  | { type: 'reflect'; phoneNumber: string }
  | { type: 'phoneTransfer'; phoneNumber: string }

export type TicketSellStatus = 'Deleted' | 'ForSale' | 'Sold'

export interface TicketSummary {
  id: string
  ticketDateTime: string
  numberOfBags: number
  totalPriceJod: number
  totalPriceUsd: number
}

export interface TicketWithStatus extends TicketSummary {
  status: TicketSellStatus
  soldAt?: string | null
  sellerEmail: string
  sellerPhone: string
  paymentMethod: PaymentMethod
  paymentInfo: PaymentInfo
}

export interface PostTicketResponse {
  ticketId: string
  refPin: string
}

export interface PurchaseTicketResponse {
  ticketId: string
  clientSecret: string
  publishableKey: string
  amount: number
  currency: string
}

export interface PurchaseTicketRequest {
  buyerName: string
  buyerEmail: string
}

export interface SubscribeRequest {
  email: string
  date: string
}

export interface ContactUsRequest {
  name: string
  email: string
  message: string
}

export interface PaymentInfoRequest {
  bankDetails?: BankDetails
  phoneNumber?: string
}

export interface PostTicketFormValues {
  file: File
  sellerEmail: string
  sellerPhone: string
  sellerName: string
  price: number
  paymentMethod: PaymentMethod
  paymentInfo: PaymentInfoRequest
}

export interface UpdateTicketRequest {
  payment?: {
    paymentMethod: PaymentMethod
    paymentInfoRequest: PaymentInfoRequest
  }
  price?: number
}
