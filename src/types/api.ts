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

export type TicketSellStatus = 'Deleted' | 'ForSale' | 'Sold' | 'Processing' | 'Rejected'

export interface TicketSummary {
  id: string
  ticketDateTime: string
  numberOfBags: number
  // Already fee-inclusive — this is the actual amount a buyer pays at checkout, not just the
  // seller's listed price. The backend folds the buyer service fee into these totals itself
  // (see FeeCalculator / TicketReader.ToResponse), so there is no separate fee/amount field.
  totalPriceJod: number
  totalPriceUsd: number
}

// GET /api/ticket/by-pin returns the seller's own listing, so price here is the seller's raw
// asking price (no buyer service fee applied) — there is no USD equivalent for it.
export interface TicketWithStatus extends Omit<TicketSummary, 'ticketDateTime' | 'numberOfBags' | 'totalPriceJod' | 'totalPriceUsd'> {
  // Not yet extracted while the ticket is Processing (or when it was Rejected).
  ticketDateTime?: string | null
  numberOfBags?: number | null
  sellerAskedPriceJod: number
  status: TicketSellStatus
  soldAt?: string | null
  sellerEmail: string
  sellerPhone: string
  paymentMethod: PaymentMethod
  paymentInfo: PaymentInfo
}

export interface CreateUploadUrlResponse {
  fileKey: string
  uploadUrl: string
}

export interface TicketFileUrlResponse {
  downloadUrl: string
}

export interface PostTicketResponse {
  ticketId: string
  refPin: string
  status: TicketSellStatus
}

export interface PurchaseTicketResponse {
  ticketId: string
  clientSecret: string
  publishableKey: string
  // Already fee-inclusive — the actual amount charged, not just the listed ticket price. The
  // backend doesn't break this down into ticketPrice/fee in the response.
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
