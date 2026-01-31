'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import OptimizedImage from '@/components/OptimizedImage'
import { getProjectBySlug } from '@/data/gallery'

interface ProjectDetailProps {
  params: { slug: string }
}

export default function ProjectDetail({ params }: ProjectDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const proj = getProjectBySlug(params.slug)
    setProject(proj || null)
    setLoading(false)
  }, [params.slug])

  if (loading) {
    return <div className="pt-32 text-center">Loading...</div>
  }

  if (!project) {
    return (
      <div className="pt-32 text-center text-gray-400">
        Project not found.
      </div>
    )
  }

  const images = project.images
  const currentImage = images[currentImageIndex]

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const goToPrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="pt-16 bg-black min-h-screen flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-gray-900 px-6 py-4 flex items-center justify-between"
      >
        <Link
          href="/works"
          className="text-gray-400 hover:text-white transition flex items-center gap-2"
        >
          ← Back to Works
        </Link>
        <span className="text-sm text-gray-500">
          {currentImageIndex + 1} / {images.length}
        </span>
      </motion.div>

      <div className="flex-1 flex items-center justify-center px-6 py-12 md:py-20">
        <div className="w-full max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="relative aspect-video md:aspect-[16/10] overflow-hidden"
            >
              <OptimizedImage
                src={currentImage.src}
                alt={currentImage.alt}
                fill
                className="object-contain"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="border-t border-gray-900 px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">
              {project.title}
            </h2>
            <p className="text-gray-400">
              Image {currentImageIndex + 1} of {images.length}
            </p>
          </motion.div>

          <div className="flex items-center justify-between gap-4">
            <button
              onClick={goToPrev}
              className="px-6 py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300"
              aria-label="Previous image"
            >
              ← Previous
            </button>

            <div className="hidden md:flex gap-2 overflow-x-auto hide-scrollbar">
              {images.map((img: any, idx: number) => (
                <motion.button
                  key={img.id}
                  onClick={() => setCurrentImageIndex(idx)}
                  whileHover={{ scale: 1.05 }}
                  className={`flex-shrink-0 w-12 h-12 border transition-all ${
                    idx === currentImageIndex
                      ? 'border-white'
                      : 'border-gray-700 hover:border-gray-400'
                  }`}
                >
                  <div className="relative w-full h-full">
                    <OptimizedImage
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                </motion.button>
              ))}
            </div>

            <button
              onClick={goToNext}
              className="px-6 py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300"
              aria-label="Next image"
            >
              Next →
            </button>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xs text-gray-600 text-center"
          >
            Use arrow buttons to navigate
          </motion.p>
        </div>
      </div>
    </div>
  )
}

