'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Tours', href: '/tours' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
  { label: 'Enquiry', href: '/enquiry' },
  { label: 'Contact', href: '/contact-us' },
]

export default function Navbar({ forceSolid = false }: { forceSolid?: boolean }) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const isHome = pathname === '/'
  const solid = forceSolid || scrolled || !isHome

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const isActive = (href: string) => {
    if (href.startsWith('/#')) return false
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <>
      <header
        id="navbar"
        className={`z-50 fixed top-0 w-full transition-all duration-300 ${
          solid ? 'bg-[#0f1f1c]/85 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="relative flex justify-between items-center max-w-[1440px] mx-auto px-5 sm:px-8 h-[64px] sm:h-[72px]">
          <nav className="hidden lg:flex items-center gap-6 flex-1">
            {NAV_LINKS.map((l) => {
              const active = isActive(l.href)
              return (
                <Link
                  key={l.label}
                  href={l.href}
                  className={`text-[12px] transition-colors ${
                    active ? 'text-[var(--gsm-gold)]' : 'text-[#f2efe6] hover:text-[var(--gsm-gold)]'
                  }`}
                >
                  {l.label}
                </Link>
              )
            })}
          </nav>

          <Link
            href="/"
            aria-label="Olyce home"
            className="shrink-0 lg:absolute lg:left-1/2 lg:-translate-x-1/2"
          >
            <Image src="/logo/olyce-horizontal-dark.svg" alt="Olyce" width={1150} height={300} priority className="h-11 sm:h-12 w-auto" />
          </Link>

          <div className="hidden lg:flex flex-1 justify-end">
            <Link href="/enquiry" className="pill">
              Enquire Now
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="lg:hidden w-10 h-10 flex flex-col justify-center items-center gap-[5px] text-[#f2efe6]"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-5 h-px bg-current origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-5 h-px bg-current"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-5 h-px bg-current origin-center"
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#0f1f1c] pt-24 sm:pt-28 px-5 sm:px-8"
          >
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="serif-italic text-3xl text-[#f2efe6] py-3 border-b border-white/10"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
