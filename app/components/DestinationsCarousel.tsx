'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion, type PanInfo } from 'framer-motion'

export interface Destination {
  _id: string
  name: string
  slug: string
  duration: string
  category?: string | null
  priceStandard: number
  pricePremium: number
  description?: string
  images: any[]
}

const getValidImageUrl = (image: any): string | null => {
  if (!image) return null
  if (typeof image === 'string' && image.length > 0) return image
  if (image.asset?.url) return image.asset.url
  if (image.url) return image.url
  return null
}

const pad = (n: number) => String(n).padStart(2, '0')

export default function DestinationsCarousel({
  destinations = [],
  showViewAll = true,
}: {
  destinations?: Destination[]
  showViewAll?: boolean
}) {
  const [index, setIndex] = useState(0)
  const count = destinations.length

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + count) % count),
    [count],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  if (count === 0) return null

  const current = destinations[index]
  const prev = destinations[(index - 1 + count) % count]
  const next = destinations[(index + 1) % count]
  const blurb =
    current.description?.trim() ||
    `A ${current.duration} ${current.category?.toLowerCase() ?? 'curated'} journey through Sri Lanka.`

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) go(1)
    else if (info.offset.x > 60) go(-1)
  }

  const side = (d: Destination, dir: 1 | -1) => {
    const url = getValidImageUrl(d.images?.[0])
    return (
      <button
        type="button"
        onClick={() => go(dir)}
        aria-label={`Show ${d.name}`}
        className="hidden md:block relative w-[16%] aspect-[3/4] opacity-45 hover:opacity-80 transition-opacity overflow-hidden bg-[var(--olyce-surface)] self-center"
      >
        {url ? <Image src={url} alt="" fill className="object-cover" sizes="15vw" /> : null}
      </button>
    )
  }

  const imgUrl = getValidImageUrl(current.images?.[0])

  return (
    <section id="featured" className="relative w-full overflow-hidden bg-[var(--olyce-bg)] py-16 sm:py-24">
      {/* Ghost watermark */}
      <p
        aria-hidden
        className="serif-italic pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-[24vw] leading-none text-white/[0.04] whitespace-nowrap select-none"
      >
        {current.category ?? 'Olyce'}
      </p>

      <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10 sm:mb-14">
          <h2 className="serif-italic !font-normal text-[var(--olyce-ink)] text-[40px] sm:text-[64px] leading-none">
            Our Tour Collection
          </h2>
          <div className="flex items-center gap-3">
            {showViewAll ? (
              <Link href="/tours" className="pill">
                View All Tours
              </Link>
            ) : null}
          </div>
        </div>

        <div className="relative flex items-center justify-center gap-4 md:gap-8">
          {side(prev, -1)}

          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={onDragEnd}
            className="relative w-full md:w-[30%] aspect-[3/4] max-w-[420px] cursor-grab active:cursor-grabbing"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current._id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0 overflow-hidden bg-[var(--olyce-surface)]"
              >
                {imgUrl ? (
                  <Image src={imgUrl} alt={current.name} fill priority className="object-cover pointer-events-none" sizes="(max-width: 768px) 90vw, 30vw" />
                ) : null}
              </motion.div>
            </AnimatePresence>
            <span className="hidden md:inline-flex absolute left-3 bottom-3 pill !bg-black/40 backdrop-blur pointer-events-none">Drag</span>
          </motion.div>

          <div className="hidden md:block w-[26%] self-center">
            <CardInfo d={current} blurb={blurb} />
          </div>

          {side(next, 1)}
        </div>

        <div className="md:hidden mt-6">
          <CardInfo d={current} blurb={blurb} />
        </div>

        <div className="mt-10 sm:mt-14 flex items-center gap-4 text-[11px] text-[var(--olyce-ink)]">
          <span>{pad(index + 1)}</span>
          <div className="relative h-px w-40 bg-white/20">
            <motion.span
              className="absolute left-0 top-0 h-px bg-[var(--gsm-gold)]"
              animate={{ width: `${((index + 1) / count) * 100}%` }}
              transition={{ duration: 0.35 }}
            />
          </div>
          <span>{pad(count)}</span>
          <div className="ml-auto flex gap-2">
            <button type="button" onClick={() => go(-1)} aria-label="Previous tour" className="pill">←</button>
            <button type="button" onClick={() => go(1)} aria-label="Next tour" className="pill">→</button>
          </div>
        </div>
      </div>
    </section>
  )
}

function CardInfo({ d, blurb }: { d: Destination; blurb: string }) {
  return (
    <div>
      <h3 className="serif-italic !font-normal text-[var(--olyce-ink)] text-[32px] sm:text-[40px] leading-tight mb-3">{d.name}</h3>
      <p className="text-[13px] leading-[1.6] text-[var(--olyce-muted)] mb-3 line-clamp-4">{blurb}</p>
      <p className="text-[12px] text-[var(--olyce-muted)] mb-2">
        {d.duration}
        {d.category ? ` · ${d.category}` : ''}
      </p>
      <div className="flex flex-wrap gap-3 mt-5">
        <Link href={`/enquiry?tour=${encodeURIComponent(d.slug)}`} className="btn-gold">
          Inquire Now
        </Link>
        <Link href={`/tour/${d.slug}`} className="btn-gold-sm">
          View tour <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  )
}
