'use client'

import { motion } from 'framer-motion'
import Section from '@/components/Section'
import OptimizedImage from '@/components/OptimizedImage'
import { BRAND, getImagePath } from '@/data/gallery'

export default function About() {
  const paragraphs = BRAND.description.split('. ')

  return (
    <div className="pt-16 bg-black">
      {/* Header */}
      <section className="py-20 md:py-32 border-b border-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold"
          >
            About {BRAND.name}
          </motion.h1>
        </div>
      </section>

      {/* Main Content */}
      <Section className="bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 md:gap-20">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="space-y-8">
                {paragraphs.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-lg md:text-xl text-gray-300 leading-relaxed"
                  >
                    {paragraph.trim()}.
                  </motion.p>
                ))}
              </div>

              {/* Details Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                viewport={{ once: true }}
                className="mt-16 grid grid-cols-2 gap-8 pt-16 border-t border-gray-900"
              >
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                    Founder
                  </h3>
                  <p className="text-xl font-serif">{BRAND.founder}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                    Based In
                  </h3>
                  <p className="text-xl font-serif">Rwanda</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                    Specialization
                  </h3>
                  <p className="text-xl font-serif">Photography & Filmmaking</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                    Approach
                  </h3>
                  <p className="text-xl font-serif">Cinematic & Emotional</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="sticky top-32 aspect-square overflow-hidden">
                <OptimizedImage
                  src={getImagePath(3)}
                  alt={BRAND.founder}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Services Section */}
      <Section className="bg-gray-950 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold mb-12"
          >
            Services
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: 'Photography',
                description: 'Professional photography services capturing authentic moments with cinematic precision and emotional depth.',
              },
              {
                title: 'Filmmaking',
                description: 'High-end video production and filmmaking for weddings, commercials, and creative projects.',
              },
              {
                title: 'Editing & Post-Production',
                description: 'Color grading, video editing, and post-production to bring your vision to life.',
              },
              {
                title: 'Creative Direction',
                description: 'Strategic visual planning and creative direction for cohesive brand storytelling.',
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                className="group"
              >
                <h3 className="text-2xl font-serif font-bold mb-3 group-hover:text-gray-300 transition">
                  {service.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  )
}
