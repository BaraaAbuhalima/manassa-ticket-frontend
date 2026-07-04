import { apiPostJson } from './client'
import type { ContactUsRequest } from '../types/api'

export function sendContactMessage(request: ContactUsRequest) {
  return apiPostJson<null>('/api/contact', request)
}
