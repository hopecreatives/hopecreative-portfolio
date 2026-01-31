import { NextResponse } from 'next/server'
import { getCloudinary } from '@/lib/cloudinary'
import { assertAdmin } from '@/lib/adminAuth'

export const runtime = 'nodejs'

function getPublicId(params: { publicId: string[] }) {
  return params.publicId.join('/')
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ publicId: string[] }> }
) {
  const { params } = await context
  const auth = assertAdmin(request)
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: 401 })
  }

  const publicId = getPublicId(params)
  if (!publicId) {
    return NextResponse.json({ error: 'Missing publicId' }, { status: 400 })
  }

  const payload = await request.json()
  const { title, featured } = payload || {}

  try {
    const cloudinary = getCloudinary()

    if (typeof title === 'string') {
      await cloudinary.uploader.add_context(`title=${title}`, publicId)
    }

    if (typeof featured === 'boolean') {
      if (featured) {
        await cloudinary.uploader.add_tag('featured', publicId)
      } else {
        await cloudinary.uploader.remove_tag('featured', publicId)
      }
    }

    const updated = await cloudinary.api.resource(publicId, {
      context: true,
    })

    return NextResponse.json({
      image: {
        id: updated.asset_id || updated.public_id,
        publicId: updated.public_id,
        src: updated.secure_url,
        alt: updated.context?.custom?.title || updated.filename || 'Portfolio Image',
        title: updated.context?.custom?.title || updated.filename || 'Portfolio Image',
        width: updated.width,
        height: updated.height,
        createdAt: updated.created_at,
        featured: Array.isArray(updated.tags) && updated.tags.includes('featured'),
      },
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to update image' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ publicId: string[] }> }
) {
  const { params } = await context
  const auth = assertAdmin(request)
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: 401 })
  }

  const publicId = getPublicId(params)
  if (!publicId) {
    return NextResponse.json({ error: 'Missing publicId' }, { status: 400 })
  }

  try {
    const cloudinary = getCloudinary()
    await cloudinary.uploader.destroy(publicId, { invalidate: true })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to delete image' },
      { status: 500 }
    )
  }
}
