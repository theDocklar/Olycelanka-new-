import type { Metadata } from 'next'
import LegalPage from '../components/LegalPage'
import { SITE } from '../../lib/site'

export const metadata: Metadata = { title: 'Refund Policy' }

export default function RefundPolicyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Refund Policy" subtitle="How cancellations and refunds work at Olyce." updated="October 2026">
      <p>We want you to book with confidence. This policy explains how cancellations and refunds are handled.</p>
      <h2>Refund method</h2>
      <p><strong>All refunds are issued to the original payment method used to make the booking</strong> (the same card or payment medium that was used on our website).</p>
      <h2>Cancellation by you</h2>
      <ul>
        <li>30 days or more before departure: full refund.</li>
        <li>15 to 29 days before departure: 50% refund.</li>
        <li>Less than 15 days before departure: no refund.</li>
      </ul>
      <p>Cancellation requests must be sent by email or WhatsApp and are effective from the time we receive them.</p>
      <h2>Cancellation by us</h2>
      <p>If we cancel a tour, or cannot deliver it as booked, you may choose a comparable alternative or a full refund of the amount paid.</p>
      <h2>Processing time</h2>
      <p>Approved refunds are processed within 7 to 14 business days. Your bank may take additional time to show the credit.</p>
      <h2>Contact</h2>
      <p>{SITE.name}. Phone/WhatsApp: {SITE.phoneDisplay}. Email: {SITE.email}.</p>
    </LegalPage>
  )
}
