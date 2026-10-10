'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    let raf = requestAnimationFrame(function tick(time) {
      lenis.raf(time)
      raf = requestAnimationFrame(tick)
    })
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])
  return null
}
