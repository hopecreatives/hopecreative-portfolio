'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import OptimizedImage from './OptimizedImage'
import Lightbox from './Lightbox'

interface GalleryGridProps {
  images: Array<{
    id: string | number
    src: string
    alt: string
  }>
  columns?: number
}

export default function GalleryGrid({ images, columns = 3 }: GalleryGridProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleImageClick = (index: number) => {
    setSelectedIndex(index)
    setLightboxOpen(true)
  }

  // Create masonry pattern - alternating large and small images
  const getMasonryClass = (index: number): string => {
    // Every 5th image is extra large, every 4th is medium, others are standard
    if (index % 5 === 0) return 'md:col-span-2 md:row-span-2'
    if (index % 4 === 2) return 'md:col-span-2'
    return 'col-span-1'
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  }

  const columnClass = columns >= 4 ? 'md:grid-cols-4' : 'md:grid-cols-3'

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className={`grid grid-cols-1 ${columnClass} gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[350px]`}
      >
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            variants={itemVariants}
            className={`group relative overflow-hidden bg-gray-900 cursor-pointer ${getMasonryClass(index)}`}
            onClick={() => handleImageClick(index)}
          >
            <OptimizedImage
              src={image.src}
              alt={image.alt}
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />
            
            {/* Subtle info on hover */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent"
            >
              <p className="text-white text-sm font-light">Click to view</p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      <Lightbox
        isOpen={lightboxOpen}
        images={images}
        startIndex={selectedIndex}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  )
}
