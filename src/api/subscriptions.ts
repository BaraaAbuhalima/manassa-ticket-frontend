import { apiPostJson } from './client'
import type { SubscribeRequest } from '../types/api'

export function subscribeToDate(request: SubscribeRequest) {
  return apiPostJson<null>('/api/subscriptions', request)
}
