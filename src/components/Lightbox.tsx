'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import OptimizedImage from './OptimizedImage'

interface LightboxProps {
  isOpen: boolean
  images: Array<{
    id: string | number
    src: string
    alt: string
  }>
  startIndex: number
  onClose: () => void
}

export default function Lightbox({
  isOpen,
  images,
  startIndex,
  onClose,
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(startIndex)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setCurrentIndex(startIndex)
  }, [startIndex, isOpen])

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleNext, handlePrev, isOpen, onClose])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX)
    handleSwipe()
  }

  const handleSwipe = () => {
    if (touchStart - touchEnd > 50) {
      handleNext()
    }
    if (touchEnd - touchStart > 50) {
      handlePrev()
    }
  }

  if (!isOpen || images.length === 0) return null

  const currentImage = images[currentIndex]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black"
          onClick={onClose}
        >
          <div
            ref={containerRef}
            className="w-full h-full flex flex-col"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-900">
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition text-2xl"
                aria-label="Close"
              >
                ✕
              </button>
              <span className="text-sm text-gray-500">
                {currentIndex + 1} / {images.length}
              </span>
              <div className="w-6" />
            </div>

            {/* Image Container */}
            <div
              className="flex-1 flex items-center justify-center px-4 md:px-8 py-8 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full max-w-5xl max-h-[calc(100vh-200px)]"
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

            {/* Footer Controls */}
            <div className="flex items-center justify-between p-4 md:p-6 border-t border-gray-900 gap-4">
              <button
                onClick={handlePrev}
                className="px-4 md:px-6 py-2 md:py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 text-sm md:text-base"
                aria-label="Previous image"
              >
                ← Prev
              </button>

              {/* Thumbnail Strip (hidden on very small screens) */}
              <div className="hidden sm:flex gap-2 overflow-x-auto flex-1 justify-center">
                {images.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 border transition-all ${
                      idx === currentIndex
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
                  </button>
                ))}
              </div>

              <button
                onClick={handleNext}
                className="px-4 md:px-6 py-2 md:py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 text-sm md:text-base"
                aria-label="Next image"
              >
                Next →
              </button>
            </div>

            {/* Keyboard Hint */}
            <div className="text-center pb-4 text-xs md:text-sm text-gray-600">
              Keyboard: ← → to navigate | Esc to close | Swipe on mobile
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
