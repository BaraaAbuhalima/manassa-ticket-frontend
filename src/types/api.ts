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

export type TicketSellStatus = 'Deleted' | 'ForSale' | 'Sold'

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

export interface Ticket {
  id: string
  ticketId: string
  originalOwnerName: string
  originalOwnerPassportNumber: string
  ticketDateTime: string
  numberOfBags: number
  totalPrice: number
  sellerName: string
  sellerEmail: string
  sellerPhone: string
  createdAt: string
  paymentMethod: PaymentMethod
  paymentInfo: PaymentInfo
  pin: string
  status: TicketSellStatus
  ticketFilePath: string
  buyerName?: string | null
  buyerEmail?: string | null
  stripePaymentIntentId?: string | null
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
