'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'

const COLLAGE = [
  { src: '/images/Ella-Rock-view.jpg', className: 'left-[6%] top-[22%] w-[26vw] max-w-[260px] aspect-[4/3]' },
  { src: '/images/mike-swigunski-zDDQZgZjFtM-unsplash.jpg', className: 'left-[34%] top-[30%] w-[32vw] max-w-[340px] aspect-[3/4] z-10' },
  { src: '/images/ishan-kahapola-arachchi-5wpeSsXZ93s-unsplash.jpg', className: 'right-[8%] top-[26%] w-[24vw] max-w-[240px] aspect-[4/3]' },
  { src: '/images/abdulla-faiz-7yPjauuz858-unsplash.jpg', className: 'right-[28%] bottom-[12%] w-[16vw] max-w-[160px] aspect-square' },
]

const KEY = 'olyce-preloaded'

export default function Preloader() {
  const [show, setShow] = useState(true)
  const instant = useRef(false)

  useEffect(() => {
    let seen = false
    try {
      seen = sessionStorage.getItem(KEY) === '1'
    } catch {}
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (seen || reduced) {
      instant.current = true
      setShow(false)
      return
    }
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => {
      try {
        sessionStorage.setItem(KEY, '1')
      } catch {}
      setShow(false)
    }, 2600)
    return () => {
      clearTimeout(t)
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    if (!show) document.body.style.overflow = ''
  }, [show])

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] bg-[#0a1614]"
          exit={{ opacity: 0, transition: { duration: instant.current ? 0 : 0.8, ease: 'easeInOut' } }}
          aria-hidden
        >
          {COLLAGE.map((c, i) => (
            <motion.div
              key={c.src}
              className={`absolute overflow-hidden ${c.className}`}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ delay: 0.25 + i * 0.3, duration: 0.8, ease: 'easeOut' }}
            >
              <Image src={c.src} alt="" fill priority className="object-cover" sizes="30vw" />
            </motion.div>
          ))}
          <motion.p
            className="serif-italic absolute bottom-8 left-1/2 -translate-x-1/2 text-[#f2efe6] text-[22px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            Olyce
          </motion.p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
