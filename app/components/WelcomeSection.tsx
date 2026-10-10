import Link from 'next/link'

export default function WelcomeSection({ tourCount = 0 }: { tourCount?: number }) {
  const stats = [
    ...(tourCount ? [{ value: String(tourCount), label: 'Tours to choose from' }] : []),
    { value: '2', label: 'Tiers: Standard & Premium' },
    { value: '1', label: 'Island, many routes' },
  ]

  return (
    <section id="story" className="w-full bg-[var(--olyce-bg)] pt-20 sm:pt-32">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8">
        <div className="flex justify-end">
          <Link href="/about" className="text-[12px] text-[var(--olyce-ink)] hover:text-[var(--gsm-gold)] transition-colors">
            About Us
          </Link>
        </div>
        <h2 className="serif-italic !font-normal text-[var(--olyce-ink)] text-[40px] sm:text-[72px] md:text-[96px] leading-[1.02] max-w-[1100px] -mt-2 sm:-mt-4">
          Thoughtful journeys for travellers who explore, wander, and unwind.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-8 mt-16 sm:mt-24 pb-16 sm:pb-24 border-b border-white/10">
          {stats.map(({ value, label }) => (
            <div key={label}>
              <p className="text-[var(--gsm-gold)] text-[56px] sm:text-[80px] leading-none tracking-[-0.05em] font-medium">{value}</p>
              <p className="mt-2 text-[14px] text-[var(--olyce-muted)]">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
