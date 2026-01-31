'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, FormEvent } from 'react'
import Section from '@/components/Section'
import { BRAND } from '@/data/gallery'

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // In a real app, you would send this to a backend or email service
    console.log('Form submitted:', formState)
    setSubmitted(true)
    setTimeout(() => {
      setFormState({ name: '', email: '', subject: '', message: '' })
      setSubmitted(false)
    }, 3000)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <div className="pt-16 bg-black min-h-screen">
      {/* Header */}
      <section className="py-20 md:py-32 border-b border-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6">
              Get In Touch
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl">
              Have a project in mind? Let's collaborate and create something extraordinary together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <Section className="bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Contact Information */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 variants={itemVariants} className="text-3xl font-serif font-bold mb-8">
                Contact Information
              </motion.h2>

              <motion.div variants={itemVariants} className="space-y-8">
                {/* Phone */}
                <div>
                  <p className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                    Phone
                  </p>
                  <a
                    href={`tel:${BRAND.phone}`}
                    className="text-xl hover:text-gray-300 transition"
                  >
                    {BRAND.phone}
                  </a>
                </div>

                {/* Email */}
                <div>
                  <p className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                    Email
                  </p>
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="text-xl hover:text-gray-300 transition"
                  >
                    {BRAND.email}
                  </a>
                </div>

                {/* Instagram */}
                <div>
                  <p className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                    Instagram
                  </p>
                  <a
                    href={BRAND.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl hover:text-gray-300 transition"
                  >
                    @hopecreative_official
                  </a>
                </div>

                {/* Quick Links */}
                <div className="pt-8 border-t border-gray-900">
                  <p className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">
                    Quick Links
                  </p>
                  <div className="space-y-3">
                    <Link href="/works" className="block text-gray-400 hover:text-white transition">
                      View Works →
                    </Link>
                    <Link href="/about" className="block text-gray-400 hover:text-white transition">
                      Learn About Us →
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {submitted ? (
                <motion.div
                  variants={itemVariants}
                  className="flex items-center justify-center h-full"
                >
                  <div className="text-center">
                    <div className="text-5xl mb-4">✓</div>
                    <h3 className="text-2xl font-serif font-bold mb-2">Thank You!</h3>
                    <p className="text-gray-400">
                      We've received your message and will get back to you soon.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div variants={itemVariants}>
                    <label htmlFor="name" className="block text-sm font-semibold mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-900 border border-gray-800 px-4 py-3 text-white hover:border-gray-700 focus:border-white focus:outline-none transition"
                      placeholder="Your name"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label htmlFor="email" className="block text-sm font-semibold mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-900 border border-gray-800 px-4 py-3 text-white hover:border-gray-700 focus:border-white focus:outline-none transition"
                      placeholder="your.email@example.com"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label htmlFor="subject" className="block text-sm font-semibold mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-900 border border-gray-800 px-4 py-3 text-white hover:border-gray-700 focus:border-white focus:outline-none transition"
                      placeholder="What's this about?"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label htmlFor="message" className="block text-sm font-semibold mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full bg-gray-900 border border-gray-800 px-4 py-3 text-white hover:border-gray-700 focus:border-white focus:outline-none transition resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </motion.div>

                  <motion.button
                    variants={itemVariants}
                    type="submit"
                    className="w-full px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 font-semibold tracking-wide"
                  >
                    Send Message
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Closing CTA */}
      <section className="py-20 md:py-32 border-t border-gray-900">
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Looking for inspiration?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Explore our portfolio to see what we can do for your next project.
            </p>
            <Link
              href="/works"
              className="inline-block px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 font-semibold tracking-wide"
            >
              View Portfolio
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
