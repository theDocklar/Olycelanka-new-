import type { Metadata } from 'next'
import LegalPage from '../components/LegalPage'
import { SITE } from '../../lib/site'

export const metadata: Metadata = { title: 'Terms & Conditions' }

export default function TermsPage() {
  return (
    <LegalPage eyebrow="Legal" title="Terms & Conditions" subtitle="The terms that apply when you book with Olyce." updated="October 2026">
      <p>These terms apply to all bookings and use of this website operated by {SITE.name} ("Olyce", "we", "us"). By booking a tour you agree to them.</p>
      <h2>1. Services</h2>
      <p>Olyce offers tour packages in Sri Lanka, including accommodation, transport, guides and activities as listed on each package page. Standard and Premium tiers differ in inclusions and comfort level as described.</p>
      <h2>2. Pricing and payment</h2>
      <ul>
        <li>All prices are shown on the relevant package page and are quoted per person unless stated otherwise.</li>
        <li>Payments are made online by card through our secure payment provider. We do not store your card details.</li>
        <li>A booking is confirmed once payment is received and you receive a confirmation.</li>
      </ul>
      <h2>3. Changes by you</h2>
      <p>Please contact us as early as possible to change travel dates or details. Changes are subject to availability and may incur additional costs.</p>
      <h2>4. Cancellations and refunds</h2>
      <p>Cancellations and refunds are governed by our <a href="/refund-policy">Refund Policy</a>.</p>
      <h2>5. Changes by us</h2>
      <p>We may adjust an itinerary because of weather, safety, road or venue closures or other circumstances beyond our control. We will offer a comparable alternative or a refund of the affected portion.</p>
      <h2>6. Traveller responsibilities</h2>
      <p>You are responsible for valid travel documents, visas, insurance and following the guidance of our guides and drivers.</p>
      <h2>7. Liability</h2>
      <p>We take reasonable care in arranging services. We are not liable for loss or damage caused by events outside our reasonable control, or by third-party suppliers beyond what the law requires.</p>
      <h2>8. Privacy</h2>
      <p>How we handle your data is described in our <a href="/privacy-policy">Privacy Policy</a>.</p>
      <h2>9. Contact</h2>
      <p>{SITE.name}, {SITE.address}. Phone: {SITE.phoneDisplay}. Email: {SITE.email}.</p>
    </LegalPage>
  )
}
