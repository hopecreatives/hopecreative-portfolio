'use client'

import Link from 'next/link'
import { BRAND } from '@/data/gallery'
import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black border-t border-gray-900 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12"
        >
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold font-serif mb-4">{BRAND.name}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium photography & filmmaking studio. Visual storytelling with intention and emotion.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">Navigation</h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', href: '/' },
                { label: 'Works', href: '/works' },
                { label: 'About', href: '/about' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 text-sm hover:text-white transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a href={`tel:${BRAND.phone}`} className="text-gray-400 text-sm hover:text-white transition">
                  {BRAND.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${BRAND.email}`} className="text-gray-400 text-sm hover:text-white transition">
                  {BRAND.email}
                </a>
              </li>
              <li>
                <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 text-sm hover:text-white transition">
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">Follow</h4>
            <div className="flex gap-4">
              <a
                href={BRAND.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:border-white transition text-sm"
              >
                IG
              </a>
            </div>
          </div>
        </motion.div>

        {/* Bottom */}
        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm">
            © {currentYear} {BRAND.name}. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-4 md:mt-0">
            Crafted by {BRAND.founder}
          </p>
        </div>
      </div>
    </footer>
  )
}
