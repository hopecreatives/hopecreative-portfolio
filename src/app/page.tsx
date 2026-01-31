'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Section from '@/components/Section'
import GalleryGrid from '@/components/GalleryGrid'
import OptimizedImage from '@/components/OptimizedImage'
import { BRAND, getFeaturedGallery, getImagePath } from '@/data/gallery'

interface GalleryImage {
  id: string | number
  src: string
  alt: string
  title?: string
  featured?: boolean
}

export default function Home() {
  const [featuredImages, setFeaturedImages] = useState<GalleryImage[]>(getFeaturedGallery())
  const [heroImage, setHeroImage] = useState(getImagePath(1))

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const res = await fetch('/api/gallery')
        const data = await res.json()
        if (!res.ok) return
        if (Array.isArray(data.featured) && data.featured.length > 0) {
          setFeaturedImages(data.featured)
        }
        if (Array.isArray(data.images) && data.images.length > 0) {
          setHeroImage(data.images[0].src)
        }
      } catch {
        // keep fallback data
      }
    }

    loadGallery()
  }, [])

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.2,
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    }),
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] md:h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <OptimizedImage
            src={heroImage}
            alt="HopeCreative Hero"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.h1
              custom={0}
              variants={textVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-tight tracking-tight"
            >
              Visual{' '}
              <motion.span
                className="relative inline-block"
                whileHover={{ scale: 1.05 }}
              >
                Storytelling
              </motion.span>
            </motion.h1>

            <motion.p
              custom={1}
              variants={textVariants}
              className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
            >
              Cinematic photography and filmmaking that captures authentic moments with intention and emotional depth
            </motion.p>

            <motion.div
              custom={2}
              variants={textVariants}
              className="pt-8"
            >
              <Link
                href="/works"
                className="inline-block px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 font-semibold tracking-wide"
              >
                Explore Works
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center pt-2">
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-2 bg-white rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Featured Gallery Section */}
      <Section className="bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Selected Works</h2>
            <p className="text-gray-400 text-lg max-w-2xl">
              A curated collection of our most compelling visual narratives
            </p>
          </motion.div>

          <GalleryGrid images={featuredImages} columns={3} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 md:mt-16 text-center"
          >
            <Link
              href="/works"
              className="inline-block px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 font-semibold tracking-wide"
            >
              View All Works
            </Link>
          </motion.div>
        </div>
      </Section>

      {/* About Preview Section */}
      <Section className="bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                About {BRAND.name}
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                {BRAND.description}
              </p>
              <Link
                href="/about"
                className="inline-block text-white border-b border-white hover:border-gray-400 hover:text-gray-400 transition-colors font-semibold"
              >
                Learn More →
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative aspect-square overflow-hidden"
            >
              <OptimizedImage
                src={getImagePath(2)}
                alt={BRAND.founder}
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-black border-t border-gray-900">
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold mb-6"
          >
            Ready to tell your story?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto"
          >
            Get in touch to discuss your next project
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              href="/contact"
              className="inline-block px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 font-semibold tracking-wide"
            >
              Get In Touch
            </Link>
          </motion.div>
        </div>
      </Section>
    </div>
  )
}
