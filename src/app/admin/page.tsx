'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Section from '@/components/Section'
import OptimizedImage from '@/components/OptimizedImage'

interface AdminImage {
  id: string
  publicId: string
  src: string
  alt: string
  title: string
  width?: number
  height?: number
  createdAt?: string
  featured?: boolean
}

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState('')
  const [isAuthed, setIsAuthed] = useState(false)
  const [images, setImages] = useState<AdminImage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [uploadTitle, setUploadTitle] = useState('')
  const [uploadFeatured, setUploadFeatured] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    const stored = window.localStorage.getItem('adminKey')
    if (stored) {
      setAdminKey(stored)
      setIsAuthed(true)
    }
  }, [])

  useEffect(() => {
    if (isAuthed) {
      fetchImages()
    }
  }, [isAuthed])

  const headers = useMemo(() => ({
    'x-admin-key': adminKey,
    'content-type': 'application/json',
  }), [adminKey])

  const fetchImages = async () => {
    if (!adminKey) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/images', {
        headers: { 'x-admin-key': adminKey },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to load images')
      setImages(data.images || [])
    } catch (err: any) {
      setError(err.message || 'Failed to load images')
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = () => {
    if (!adminKey) return
    window.localStorage.setItem('adminKey', adminKey)
    setIsAuthed(true)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('adminKey')
    setAdminKey('')
    setIsAuthed(false)
    setImages([])
  }

  const updateImage = async (publicId: string, payload: Partial<Pick<AdminImage, 'title' | 'featured'>>) => {
    try {
      const res = await fetch(`/api/admin/images/${encodeURI(publicId)}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to update image')

      setImages((prev) => prev.map((img) => (img.publicId === publicId ? data.image : img)))
    } catch (err: any) {
      setError(err.message || 'Failed to update image')
    }
  }

  const deleteImage = async (publicId: string) => {
    if (!confirm('Delete this image?')) return
    try {
      const res = await fetch(`/api/admin/images/${encodeURI(publicId)}`, {
        method: 'DELETE',
        headers: { 'x-admin-key': adminKey },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to delete image')
      setImages((prev) => prev.filter((img) => img.publicId !== publicId))
    } catch (err: any) {
      setError(err.message || 'Failed to delete image')
    }
  }

  const uploadImage = async () => {
    if (!uploadFile || !adminKey) return
    setUploading(true)
    setError('')

    try {
      const signatureRes = await fetch('/api/admin/signature', {
        method: 'POST',
        headers,
        body: JSON.stringify({ title: uploadTitle, featured: uploadFeatured }),
      })
      const signatureData = await signatureRes.json()
      if (!signatureRes.ok) throw new Error(signatureData.error || 'Failed to sign upload')

      const formData = new FormData()
      formData.append('file', uploadFile)
      formData.append('api_key', signatureData.apiKey)
      formData.append('timestamp', String(signatureData.timestamp))
      formData.append('signature', signatureData.signature)
      formData.append('folder', signatureData.folder)

      if (signatureData.context) {
        formData.append('context', signatureData.context)
      }
      if (signatureData.tags) {
        formData.append('tags', signatureData.tags)
      }

      const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${signatureData.cloudName}/upload`, {
        method: 'POST',
        body: formData,
      })
      const uploadData = await uploadRes.json()
      if (!uploadRes.ok) throw new Error(uploadData.error?.message || 'Upload failed')

      setUploadFile(null)
      setUploadTitle('')
      setUploadFeatured(false)
      await fetchImages()
    } catch (err: any) {
      setError(err.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  if (!isAuthed) {
    return (
      <div className="pt-20 bg-black min-h-screen">
        <Section className="bg-black">
          <div className="max-w-lg mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-950 border border-gray-900 p-8"
            >
              <h1 className="text-3xl font-serif font-bold mb-6">Admin Login</h1>
              <label className="block text-sm text-gray-400 mb-2">Admin Password</label>
              <input
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                className="w-full bg-black border border-gray-800 p-3 text-white"
              />
              <button
                onClick={handleLogin}
                className="mt-6 w-full px-6 py-3 border border-white text-white hover:bg-white hover:text-black transition-all"
              >
                Login
              </button>
            </motion.div>
          </div>
        </Section>
      </div>
    )
  }

  return (
    <div className="pt-16 bg-black min-h-screen">
      <Section className="bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <h1 className="text-4xl md:text-5xl font-serif font-bold">Admin Panel</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-gray-700 text-gray-300 hover:bg-white hover:text-black transition"
            >
              Logout
            </button>
          </div>

          <div className="bg-gray-950 border border-gray-900 p-6 mb-10">
            <h2 className="text-2xl font-serif font-bold mb-4">Upload New Image</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">File</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                  className="w-full bg-black border border-gray-800 p-3 text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Title</label>
                <input
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="w-full bg-black border border-gray-800 p-3 text-white"
                  placeholder="Image title"
                />
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2 text-gray-300">
                  <input
                    type="checkbox"
                    checked={uploadFeatured}
                    onChange={(e) => setUploadFeatured(e.target.checked)}
                  />
                  Featured
                </label>
              </div>
            </div>
            <button
              onClick={uploadImage}
              disabled={!uploadFile || uploading}
              className="mt-4 px-6 py-3 border border-white text-white hover:bg-white hover:text-black transition-all disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>

          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-serif font-bold">Gallery Images</h2>
            <button
              onClick={fetchImages}
              className="px-4 py-2 border border-gray-700 text-gray-300 hover:bg-white hover:text-black transition"
            >
              Refresh
            </button>
          </div>

          {error && (
            <div className="mb-4 text-red-400">{error}</div>
          )}

          {loading ? (
            <div className="text-gray-400">Loading images...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {images.map((image) => (
                <div key={image.publicId} className="border border-gray-900 bg-gray-950 p-4">
                  <div className="relative aspect-video bg-black mb-4">
                    <OptimizedImage
                      src={image.src}
                      alt={image.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <label className="block text-sm text-gray-400 mb-2">Title</label>
                  <input
                    value={image.title}
                    onChange={(e) =>
                      setImages((prev) =>
                        prev.map((img) => (img.publicId === image.publicId ? { ...img, title: e.target.value } : img))
                      )
                    }
                    onBlur={() => updateImage(image.publicId, { title: image.title })}
                    className="w-full bg-black border border-gray-800 p-2 text-white"
                  />
                  <div className="flex items-center justify-between mt-3">
                    <label className="flex items-center gap-2 text-gray-300">
                      <input
                        type="checkbox"
                        checked={!!image.featured}
                        onChange={(e) => updateImage(image.publicId, { featured: e.target.checked })}
                      />
                      Featured
                    </label>
                    <button
                      onClick={() => deleteImage(image.publicId)}
                      className="text-red-400 hover:text-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Section>
    </div>
  )
}
