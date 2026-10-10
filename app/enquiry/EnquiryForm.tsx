'use client'

import { useState } from 'react'
import Dropdown from '../components/Dropdown'
import { whatsappLink } from '../../lib/site'

const TRAVELLERS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10+']
const TIERS = ['Standard', 'Premium', 'Not sure yet']
const MONTHS = ['Flexible', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const CONTACT = ['WhatsApp', 'Email', 'Phone call']
const SOURCES = ['Search engine', 'Social media', 'Friend or family', 'Travel agent', 'Other']

const input =
  'w-full bg-transparent border-0 border-b border-white/20 px-0 py-3 text-[16px] text-[var(--olyce-ink)] placeholder:text-[var(--olyce-muted)]/70 focus:outline-none focus:border-[var(--gsm-gold)] hover:border-white/50 transition-colors'
const label = 'block text-[11px] uppercase tracking-[0.08em] text-[var(--olyce-muted)] mb-1'

export default function EnquiryForm({ tours, defaultTour = '' }: { tours: string[]; defaultTour?: string }) {
  const [sent, setSent] = useState(false)
  const [v, setV] = useState({
    tour: defaultTour,
    travellers: '',
    tier: '',
    month: '',
    contact: 'WhatsApp',
    source: '',
  })
  const set = (k: keyof typeof v) => (value: string) => setV((s) => ({ ...s, [k]: value }))

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>
    const message = [
      'New enquiry from the Olyce website',
      `Name: ${d.name}`,
      `Email: ${d.email}`,
      `Phone: ${d.phone || '-'}`,
      `Tour: ${v.tour || 'Not sure yet'}`,
      `Travellers: ${v.travellers || '-'}`,
      `Tier: ${v.tier || '-'}`,
      `Travel month: ${v.month || '-'}`,
      `Preferred contact: ${v.contact}`,
      `Heard about us: ${v.source || '-'}`,
      `Message: ${d.message || '-'}`,
    ].join('\n')
    window.open(whatsappLink(message), '_blank', 'noopener,noreferrer')
    setSent(true)
  }

  return (
    <form
      onSubmit={onSubmit}
      className="border border-white/10 bg-[var(--olyce-surface)]/40 backdrop-blur p-6 sm:p-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7"
    >
      <div>
        <label htmlFor="name" className={label}>Full name *</label>
        <input id="name" name="name" required placeholder="Your name" className={input} autoComplete="name" />
      </div>
      <div>
        <label htmlFor="email" className={label}>Email *</label>
        <input id="email" name="email" type="email" required placeholder="you@example.com" className={input} autoComplete="email" />
      </div>
      <div>
        <label htmlFor="phone" className={label}>Phone / WhatsApp</label>
        <input id="phone" name="phone" type="tel" placeholder="+94 77 000 0000" className={input} autoComplete="tel" />
      </div>
      <Dropdown label="Preferred contact" name="contact" options={CONTACT} value={v.contact} onChange={set('contact')} />

      <div className="sm:col-span-2">
        <Dropdown
          label="Tour"
          name="tour"
          options={['Not sure yet', ...tours]}
          value={v.tour}
          onChange={set('tour')}
          placeholder="Choose a tour"
        />
      </div>
      <Dropdown label="Travellers" name="travellers" options={TRAVELLERS} value={v.travellers} onChange={set('travellers')} placeholder="How many?" />
      <Dropdown label="Stay tier" name="tier" options={TIERS} value={v.tier} onChange={set('tier')} placeholder="Standard or Premium" />
      <Dropdown label="Travel month" name="month" options={MONTHS} value={v.month} onChange={set('month')} placeholder="When?" />
      <Dropdown label="How did you hear about us?" name="source" options={SOURCES} value={v.source} onChange={set('source')} />

      <div className="sm:col-span-2">
        <label htmlFor="message" className={label}>Tell us about your trip</label>
        <textarea id="message" name="message" rows={4} placeholder="Interests, special occasions, must-see places..." className={`${input} resize-none`} />
      </div>

      <div className="sm:col-span-2 flex flex-wrap items-center gap-4 pt-2">
        <button type="submit" className="btn-gold">Send Enquiry <span aria-hidden>→</span></button>
        <p className="text-[12px] text-[var(--olyce-muted)]">Opens WhatsApp with your details filled in. Just press send.</p>
      </div>
      {sent ? (
        <p role="status" className="sm:col-span-2 text-[14px] text-[var(--gsm-gold)]">
          Thank you. If WhatsApp did not open, message us directly and we will reply shortly.
        </p>
      ) : null}
    </form>
  )
}
