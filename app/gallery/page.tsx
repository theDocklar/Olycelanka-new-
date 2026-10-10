import type { Metadata } from 'next'
import Image from 'next/image'
import Footer from '../components/Footer'
import PageHero from '../components/PageHero'
import { getPackages } from '../../lib/data'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Photos from Olyce tours across Sri Lanka.',
}

const LOCAL_IMAGES = [
  { src: '/images/mike-swigunski-zDDQZgZjFtM-unsplash.jpg', alt: 'Sigiriya rock fortress' },
  { src: '/images/ishan-kahapola-arachchi-5wpeSsXZ93s-unsplash.jpg', alt: 'Tropical beach with palms' },
  { src: '/images/Ella-Rock-view.jpg', alt: 'View from Ella Rock' },
  { src: '/images/abdulla-faiz-7yPjauuz858-unsplash.jpg', alt: 'Sri Lanka landscape' },
  { src: '/images/chathura-anuradha-subasinghe-40uQmE9Zq8g-unsplash.jpg', alt: 'Sri Lanka landscape' },
  { src: '/images/etienne-boulanger-J7LiHL7jAgU-unsplash.jpg', alt: 'Sri Lanka landscape' },
  { src: '/images/hendrik-cornelissen-jpTT_SAU034-unsplash.jpg', alt: 'Sri Lanka landscape' },
  { src: '/images/shashank-hudkar-KYBc1eq0dJo-unsplash.jpg', alt: 'Sri Lanka landscape' },
]

export default async function GalleryPage() {
  const packages = await getPackages()
  const tourImages = packages.flatMap((pkg) =>
    pkg.images
      .map((img) => img.asset?.url)
      .filter((url): url is string => Boolean(url) && !url.includes('unsplash.com/photo-1586500036706'))
      .map((src) => ({ src, alt: pkg.name })),
  )
  const images = [...LOCAL_IMAGES, ...tourImages]

  return (
    <div className="olyce-home">
      <main className="grow bg-[var(--olyce-bg)] pb-16 sm:pb-24">
        <PageHero
          eyebrow="Gallery"
          title="Sri Lanka Through Our Lens"
          subtitle="Moments from the journeys we design."
          imageSrc="/images/Ella-Rock-view.jpg"
          imageAlt="View from Ella Rock in Sri Lanka"
        />
        <section className="w-full py-12 sm:py-16">
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {images.map(({ src, alt }, i) => (
              <div key={`${src}-${i}`} className="relative aspect-square overflow-hidden rounded-[4px] bg-[var(--olyce-surface)]">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
