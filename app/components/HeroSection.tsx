'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

type HeroTour = {
  name: string
  slug: string
  duration: string
  category?: string | null
  description?: string
  image?: string | null
}

export default function HeroSection({ featured }: { featured?: HeroTour }) {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => setVideoLoaded(true)
    const handleError = () => {
      setVideoError(true)
      setVideoLoaded(true)
    }

    video.addEventListener('canplaythrough', handleCanPlay)
    video.addEventListener('error', handleError)
    if (video.readyState >= 3) setVideoLoaded(true)

    return () => {
      video.removeEventListener('canplaythrough', handleCanPlay)
      video.removeEventListener('error', handleError)
    }
  }, [])

  return (
    <section className="relative w-full h-[100svh] min-h-[600px] bg-[var(--olyce-bg)] p-3 sm:p-4">
      <div className="relative h-full w-full overflow-hidden rounded-[24px] sm:rounded-[32px] bg-[#0a1614]">
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${videoLoaded && !videoError ? 'opacity-0' : 'opacity-100'}`}
      >
        <Image
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070"
          alt="Sri Lanka landscape"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {!videoError && (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/video/289235_medium.mp4" type="video/mp4" />
        </video>
      )}

      {/* Cinematic vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,22,20,0)_30%,rgba(10,22,20,0.65)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0a1614]/85 to-transparent" />

      <div className="relative z-10 h-full max-w-[1440px] mx-auto px-5 sm:px-8 flex items-center justify-start">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: 'easeOut' }}
          className="serif-italic !font-normal text-[#f2efe6] text-[52px] sm:text-[88px] md:text-[112px] leading-[0.95] tracking-[-0.02em] max-w-[900px] -mt-24 sm:-mt-10"
        >
          Sri Lanka.
          <br />
          Curated.
          <br />
          Unhurried.
        </motion.h1>
      </div>

      {featured ? (
        <Link
          href={`/tour/${featured.slug}`}
          className="absolute z-20 left-4 sm:left-8 bottom-24 sm:bottom-8 w-[230px] sm:w-[270px] rounded-2xl bg-[#0f1f1c]/90 backdrop-blur border border-white/10 p-3 hover:border-[#d6a95c] transition-colors"
        >
          <p className="text-[10px] uppercase tracking-[0.08em] text-[#d6a95c] leading-tight">Tour of the month</p>
          <p className="text-[15px] text-[#f2efe6] mt-1 mb-2 leading-snug">{featured.name}</p>
          {featured.image ? (
            <div className="relative aspect-[16/10] w-full mb-2 overflow-hidden rounded-xl">
              <Image src={featured.image} alt={featured.name} fill className="object-cover" sizes="270px" />
            </div>
          ) : null}
          {featured.description ? (
            <p className="text-[11px] leading-[1.5] text-[#b9b6aa] line-clamp-2 mb-2">{featured.description}</p>
          ) : null}
          <p className="flex items-center justify-between text-[11px] text-[#f2efe6]">
            <span>
              {featured.duration}
              {featured.category ? ` · ${featured.category}` : ''}
            </span>
            <span aria-hidden>→</span>
          </p>
        </Link>
      ) : null}

      <div className="absolute z-20 bottom-8 left-1/2 -translate-x-1/2">
        <Link href="/tours" className="text-[12px] text-[#f2efe6] border-b border-[#f2efe6]/50 pb-1 hover:text-[#d6a95c] hover:border-[#d6a95c] transition-colors whitespace-nowrap">
          Start Your Journey
        </Link>
      </div>
      </div>
    </section>
  )
}
