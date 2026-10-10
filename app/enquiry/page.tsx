import type { Metadata } from 'next'
import Footer from '../components/Footer'
import PageHero from '../components/PageHero'
import EnquiryForm from './EnquiryForm'
import { getPackages } from '../../lib/data'
import { SITE } from '../../lib/site'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Enquiry',
  description: 'Send an enquiry about a Sri Lanka tour to the Olyce team.',
}

export default async function EnquiryPage({ searchParams }: { searchParams: Promise<{ tour?: string }> }) {
  const { tour } = await searchParams
  const packages = await getPackages()
  const selected = packages.find((p) => p.slug === tour)?.name ?? ''
  return (
    <div className="olyce-home">
      <main className="grow bg-[var(--olyce-bg)] pb-16 sm:pb-24">
        <PageHero
          eyebrow="Enquiry Now"
          title="Plan Your Journey"
          subtitle="Tell us what you have in mind and we will get back to you."
          imageSrc="/images/ishan-kahapola-arachchi-5wpeSsXZ93s-unsplash.jpg"
          imageAlt="Tropical beach with palms and ocean in Sri Lanka"
        />
        <section className="w-full py-12 sm:py-20">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-16 items-start">
            <div className="lg:sticky lg:top-28">
              <h2 className="serif-italic !font-normal text-[var(--olyce-ink)] text-[40px] sm:text-[56px] leading-[1.05] mb-5">
                Let&apos;s design your Sri Lanka.
              </h2>
              <p className="text-[14px] leading-7 text-[var(--olyce-muted)] mb-8 max-w-[360px]">
                Share a few details and our team will come back with a tailored plan, usually within one working day.
              </p>
              <ul className="space-y-3 text-[14px]">
                <li><a href={`tel:${SITE.phoneTel}`} className="text-[var(--olyce-ink)] hover:text-[var(--gsm-gold)] transition-colors">{SITE.phoneDisplay}</a></li>
                <li><a href={`mailto:${SITE.email}`} className="text-[var(--olyce-ink)] hover:text-[var(--gsm-gold)] transition-colors">{SITE.email}</a></li>
              </ul>
            </div>
            <EnquiryForm tours={packages.map((p) => p.name)} defaultTour={selected} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
