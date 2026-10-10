import type { Metadata } from 'next'
import Footer from '../components/Footer'
import PageHero from '../components/PageHero'
import DestinationsCarousel from '../components/DestinationsCarousel'
import { getPackages } from '../../lib/data'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Tours',
  description: 'Browse Olyce Sri Lanka tour packages with durations and Standard and Premium pricing.',
}

export default async function ToursPage() {
  const packages = await getPackages()
  return (
    <div className="olyce-home">
      <main className="grow bg-[var(--olyce-bg)] pb-16 sm:pb-24">
        <PageHero
          eyebrow="Olyce Travel"
          title="Our Tours"
          subtitle="Structured Sri Lanka packages with clear inclusions and honest pricing."
          imageSrc="/images/ishan-kahapola-arachchi-5wpeSsXZ93s-unsplash.jpg"
          imageAlt="Tropical beach with palms and ocean in Sri Lanka"
        />
        <DestinationsCarousel destinations={packages} showViewAll={false} />
      </main>
      <Footer />
    </div>
  )
}
