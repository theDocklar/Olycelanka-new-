'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Destination } from './DestinationsCarousel'

const imageUrl = (img: any): string | null =>
  typeof img === 'string' ? img : img?.asset?.url ?? img?.url ?? null

export default function JourneysSection({ packages = [] }: { packages?: Destination[] }) {
  const categories = useMemo(
    () => ['All', ...new Set(packages.map((p) => p.category).filter((c): c is string => Boolean(c)))],
    [packages],
  )
  const [active, setActive] = useState('All')

  if (packages.length === 0) return null
  const visible = active === 'All' ? packages : packages.filter((p) => p.category === active)

  return (
    <section id="journeys" className="w-full bg-[var(--olyce-bg)] py-16 sm:py-24 border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10 sm:mb-14">
          <h2 className="serif-italic !font-normal text-[var(--olyce-ink)] text-[40px] sm:text-[64px] leading-none">
            Find Your Journey
          </h2>
          <div role="tablist" aria-label="Select a tour type" className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={active === c}
                onClick={() => setActive(c)}
                className={`pill ${active === c ? 'pill-active' : ''}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {visible.map((p) => {
            const url = imageUrl(p.images?.[0])
            return (
              <article key={p._id} className="flex flex-col">
                <Link href={`/tour/${p.slug}`} className="relative block aspect-[4/5] overflow-hidden rounded-3xl bg-[var(--olyce-surface)] mb-5 group">
                  {url ? (
                    <Image
                      src={url}
                      alt={p.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : null}
                  <span className="pill !bg-black/40 backdrop-blur absolute left-3 top-3">{p.duration}</span>
                </Link>
                <p className="text-[11px] text-[var(--olyce-muted)] mb-1">{p.category}</p>
                <h3 className="serif-italic !font-normal text-[var(--olyce-ink)] text-[30px] leading-tight mb-2">
                  <Link href={`/tour/${p.slug}`} className="hover:text-[var(--gsm-gold)] transition-colors">{p.name}</Link>
                </h3>
                <p className="text-[13px] leading-[1.6] text-[var(--olyce-muted)] line-clamp-3 mb-5 flex-1">
                  {p.description?.trim() || `A ${p.duration} journey through Sri Lanka.`}
                </p>
                <div className="flex gap-3">
                  <Link href={`/enquiry?tour=${encodeURIComponent(p.slug)}`} className="btn-gold">Inquire Now</Link>
                  <Link href={`/tour/${p.slug}`} className="btn-gold-sm">Details</Link>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
