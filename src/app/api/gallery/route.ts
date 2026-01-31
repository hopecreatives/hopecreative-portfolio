import { NextResponse } from 'next/server'
import { CLOUDINARY_FOLDER, getCloudinary, mapCloudinaryResource } from '@/lib/cloudinary'

export const runtime = 'nodejs'

export async function GET() {
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
    const featured = images.filter((image) => image.featured)

    return NextResponse.json({
      images,
      featured: featured.length > 0 ? featured : images.slice(0, 10),
      updatedAt: new Date().toISOString(),
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to load gallery' },
      { status: 500 }
    )
  }
}
