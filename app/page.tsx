import HeroSection from './components/HeroSection'
import WelcomeSection from './components/WelcomeSection'
import DestinationsCarousel from './components/DestinationsCarousel'
import JourneysSection from './components/JourneysSection'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import { getPackages } from '../lib/data'

export default async function Page() {
  const packages = await getPackages()
  const first = packages.find((p) => p.featured) ?? packages[0]
  const featured = first
    ? {
        name: first.name,
        slug: first.slug,
        duration: first.duration,
        category: first.category,
        description: first.description,
        image: first.images?.[0]?.asset?.url ?? null,
      }
    : undefined

  return (
    <div className="olyce-home">
      <main>
        <HeroSection featured={featured} />
        <WelcomeSection tourCount={packages.length} />
        <DestinationsCarousel destinations={packages} />
        <JourneysSection packages={packages} />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}
