'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function HeroSection() {
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

      <div className="absolute z-20 bottom-8 left-1/2 -translate-x-1/2">
        <Link href="/tours" className="text-[12px] text-[#f2efe6] border-b border-[#f2efe6]/50 pb-1 hover:text-[#d6a95c] hover:border-[#d6a95c] transition-colors whitespace-nowrap">
          Start Your Journey
        </Link>
      </div>
      </div>
    </section>
  )
}
