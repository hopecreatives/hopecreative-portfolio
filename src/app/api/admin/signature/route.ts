import { NextResponse } from 'next/server'
import { getCloudinary, CLOUDINARY_FOLDER } from '@/lib/cloudinary'
import { assertAdmin } from '@/lib/adminAuth'
import type { NextRequest } from 'next/server'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  const auth = assertAdmin(request)
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: 401 })
  }

  try {
    const { title, featured } = await request.json()
    const cloudinary = getCloudinary()
    const timestamp = Math.round(Date.now() / 1000)

    const paramsToSign: Record<string, string | number> = {
      timestamp,
      folder: CLOUDINARY_FOLDER,
    }

    if (title) {
      paramsToSign.context = `title=${title}`
    }

    if (featured) {
      paramsToSign.tags = 'featured'
    }

    const signature = cloudinary.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET as string)

    return NextResponse.json({
      timestamp,
      signature,
      folder: CLOUDINARY_FOLDER,
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      context: paramsToSign.context,
      tags: paramsToSign.tags,
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to create signature' },
      { status: 500 }
    )
  }
}
