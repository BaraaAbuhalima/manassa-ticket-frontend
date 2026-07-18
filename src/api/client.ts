import type { ApiResponse } from '../types/api'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string

export class ApiError extends Error {
  statusCode: number
  errors: string[]

  constructor(message: string, statusCode: number, errors: string[]) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
    this.errors = errors
  }
}

async function parseResponse<T>(res: Response): Promise<ApiResponse<T>> {
  const body = (await res.json().catch(() => null)) as ApiResponse<T> | null
  if (!body) {
    throw new ApiError('Unexpected server response', res.status, ['Unexpected server response'])
  }
  if (!body.success) {
    throw new ApiError(body.message ?? 'Request failed', body.statusCode, body.errors ?? [])
  }
  return body
}

export async function apiGet<T>(path: string, params?: Record<string, string | number | undefined>): Promise<ApiResponse<T>> {
  const url = new URL(API_BASE_URL + path, window.location.origin)
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) url.searchParams.set(key, String(value))
    }
  }
  const res = await fetch(url, { method: 'GET' })
  return parseResponse<T>(res)
}

export async function apiGetWithHeaders<T>(
  path: string,
  params?: Record<string, string | number | undefined>,
): Promise<{ body: ApiResponse<T>; headers: Headers }> {
  const url = new URL(API_BASE_URL + path, window.location.origin)
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) url.searchParams.set(key, String(value))
    }
  }
  const res = await fetch(url, { method: 'GET' })
  const body = await parseResponse<T>(res)
  return { body, headers: res.headers }
}

export async function apiPostJson<T>(path: string, body: unknown): Promise<ApiResponse<T>> {
  const res = await fetch(API_BASE_URL + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return parseResponse<T>(res)
}

export async function apiDelete<T>(path: string, headers?: HeadersInit): Promise<ApiResponse<T>> {
  const res = await fetch(API_BASE_URL + path, { method: 'DELETE', headers })
  return parseResponse<T>(res)
}

export async function apiPostAuth<T>(path: string, bearerToken: string): Promise<ApiResponse<T>> {
  const res = await fetch(API_BASE_URL + path, {
    method: 'POST',
    headers: { Authorization: `Bearer ${bearerToken}` },
  })
  return parseResponse<T>(res)
}

export async function apiPatchAuth<T>(path: string, bearerToken: string, body: unknown): Promise<ApiResponse<T>> {
  const res = await fetch(API_BASE_URL + path, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${bearerToken}` },
    body: JSON.stringify(body),
  })
  return parseResponse<T>(res)
}
