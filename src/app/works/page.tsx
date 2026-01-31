'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Section from '@/components/Section'
import OptimizedImage from '@/components/OptimizedImage'
import Lightbox from '@/components/Lightbox'
import { getProjectWorks } from '@/data/gallery'

interface GalleryImage {
  id: string | number
  src: string
  alt: string
}

interface GalleryWork {
  id: number
  title: string
  images: GalleryImage[]
}

export default function Works() {
  const [works, setWorks] = useState<GalleryWork[]>(getProjectWorks())
  const displayedWorks = works
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  useEffect(() => {
    const loadWorks = async () => {
      try {
        const res = await fetch('/api/gallery')
        const data = await res.json()
        if (!res.ok || !Array.isArray(data.images)) return

        const images: GalleryImage[] = data.images
        const galleries = splitIntoGalleries(images, 2)
        setWorks(galleries)
      } catch {
        // keep fallback data
      }
    }

    loadWorks()
  }, [])

  const handleImageClick = (projectIndex: number, imageIndex: number) => {
    setSelectedProjectIndex(projectIndex)
    setSelectedImageIndex(imageIndex)
    setLightboxOpen(true)
  }

  return (
    <div className="pt-16 bg-black">
      {/* Header */}
      <section className="py-20 md:py-32 border-b border-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6">
              Portfolio
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl">
              A comprehensive collection of visual stories captured through the lens of intention, emotion, and cinematic craftsmanship.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Works Grid */}
      <Section className="bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-24">
            {displayedWorks.map((work, index) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: '-100px' }}
                className="group"
              >
                {/* Main Image */}
                <div
                  className="relative h-96 md:h-[500px] overflow-hidden mb-8 bg-gray-900 cursor-pointer"
                  onClick={() => handleImageClick(index, 0)}
                >
                  <OptimizedImage
                    src={work.images[0].src}
                    alt={work.title}
                    fill
                    className="object-contain group-hover:scale-102 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                </div>

                {/* Project Info */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">
                      {work.title}
                    </h2>
                    <p className="text-gray-400 text-lg max-w-xl">
                      A compelling visual narrative exploring the intersection of light, emotion, and authenticity.
                    </p>
                  </div>
                </div>

                {/* Thumbnail Gallery */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4">
                  {work.images.map((image, imgIndex) => (
                    <motion.div
                      key={image.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: imgIndex * 0.05, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="relative h-32 md:h-40 bg-gray-900 overflow-hidden group/thumb cursor-pointer"
                      onClick={() => handleImageClick(index, imgIndex)}
                    >
                      <OptimizedImage
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-contain group-hover/thumb:scale-105 transition-transform duration-500"
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Divider */}
                {displayedWorks.indexOf(work) < displayedWorks.length - 1 && (
                  <div className="mt-24 border-t border-gray-900" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          isOpen={lightboxOpen}
          images={works[selectedProjectIndex]?.images || []}
          startIndex={selectedImageIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  )
}

function splitIntoGalleries(images: GalleryImage[], count: number): GalleryWork[] {
  if (count <= 1) {
    return [{ id: 1, title: 'Gallery 1', images }]
  }

  const perGallery = Math.ceil(images.length / count)
  const galleries: GalleryWork[] = []

  for (let i = 0; i < count; i += 1) {
    const start = i * perGallery
    const end = start + perGallery
    const chunk = images.slice(start, end)
    if (chunk.length > 0) {
      galleries.push({
        id: i + 1,
        title: `Gallery ${i + 1}`,
        images: chunk,
      })
    }
  }

  return galleries
}
