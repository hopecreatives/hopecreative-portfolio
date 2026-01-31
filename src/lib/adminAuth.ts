import { NextRequest } from 'next/server'

export function assertAdmin(request: NextRequest) {
  const adminKey = request.headers.get('x-admin-key')
  const expected = process.env.ADMIN_PASSWORD

  if (!expected) {
    return { ok: false, error: 'Admin password is not configured' }
  }

  if (!adminKey || adminKey !== expected) {
    return { ok: false, error: 'Unauthorized' }
  }

  return { ok: true }
}
