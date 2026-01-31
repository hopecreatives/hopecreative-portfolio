import { NextResponse } from 'next/server'
import { CLOUDINARY_FOLDER, getCloudinary, mapCloudinaryResource } from '@/lib/cloudinary'
import { assertAdmin } from '@/lib/adminAuth'
import type { NextRequest } from 'next/server'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  const auth = assertAdmin(request)
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: 401 })
  }

  try {
    const cloudinary = getCloudinary()
    const result = await cloudinary.search
      .expression(`folder:${CLOUDINARY_FOLDER}`)
      .sort_by('created_at', 'desc')
      .max_results(200)
      .with_field('context')
      .with_field('tags')
      .execute()

    const images = (result.resources || []).map(mapCloudinaryResource)
    return NextResponse.json({ images })
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to load images' },
      { status: 500 }
    )
  }
}
