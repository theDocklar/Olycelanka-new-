import HeroSection from './components/HeroSection'
import WelcomeSection from './components/WelcomeSection'
import DestinationsCarousel from './components/DestinationsCarousel'
import JourneysSection from './components/JourneysSection'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import { getPackages } from '../lib/data'

export default async function Page() {
  const packages = await getPackages()
  return (
    <div className="olyce-home">
      <main>
        <HeroSection />
        <WelcomeSection tourCount={packages.length} />
        <DestinationsCarousel destinations={packages} />
        <JourneysSection packages={packages} />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}
