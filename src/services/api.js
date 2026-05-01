import { getToken } from './auth'

const API_URL = 'http://localhost:3000'

export async function api(path, options = {}) {
  const token = getToken()

  const response = await fetch(API_URL + path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    }
  })

  return response
}