import { v2 as cloudinary } from 'cloudinary'

const cloudName = process.env.CLOUDINARY_CLOUD_NAME
const apiKey = process.env.CLOUDINARY_API_KEY
const apiSecret = process.env.CLOUDINARY_API_SECRET

if (!cloudName || !apiKey || !apiSecret) {
  throw new Error('Cloudinary environment variables are not configured')
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
})

export const CLOUDINARY_FOLDER = process.env.CLOUDINARY_FOLDER || 'portfolio'

export function getCloudinary() {
  return cloudinary
}

export function mapCloudinaryResource(resource: any) {
  const title = resource.context?.custom?.title || resource.filename || 'Portfolio Image'
  const featured = Array.isArray(resource.tags) && resource.tags.includes('featured')

  return {
    id: resource.asset_id || resource.public_id,
    publicId: resource.public_id,
    src: resource.secure_url,
    alt: title,
    title,
    width: resource.width,
    height: resource.height,
    createdAt: resource.created_at,
    featured,
  }
}
