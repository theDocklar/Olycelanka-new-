import type { Metadata } from 'next'
import LegalPage from '../components/LegalPage'
import { SITE } from '../../lib/site'

export const metadata: Metadata = { title: 'Privacy Policy' }

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Privacy Policy" subtitle="How Olyce collects and uses your information." updated="October 2026">
      <p>{SITE.name} respects your privacy. This policy explains what we collect when you use our website or book a tour, and how we use it.</p>
      <h2>Information we collect</h2>
      <ul>
        <li>Details you provide: name, email, phone number, travel dates, number of travellers and special requests.</li>
        <li>Payment information, which is handled by our payment provider. We do not store full card numbers.</li>
        <li>Basic usage data such as pages visited and device type, used to improve the site.</li>
      </ul>
      <h2>How we use it</h2>
      <ul>
        <li>To process bookings, take payment and arrange your tour.</li>
        <li>To contact you about your booking or respond to enquiries.</li>
        <li>To improve our website and services.</li>
      </ul>
      <h2>Sharing</h2>
      <p>We share information only with the suppliers needed to deliver your tour (hotels, drivers, guides), our payment provider, and where required by law. We do not sell your personal data.</p>
      <h2>Security and retention</h2>
      <p>We use reasonable measures to protect your data and keep it only as long as needed for the purposes above or to meet legal obligations.</p>
      <h2>Your rights</h2>
      <p>You may ask us to access, correct or delete your personal data by contacting us.</p>
      <h2>Contact</h2>
      <p>{SITE.name}, {SITE.address}. Phone: {SITE.phoneDisplay}. Email: {SITE.email}.</p>
    </LegalPage>
  )
}
