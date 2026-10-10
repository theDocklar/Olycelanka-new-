import type { Metadata } from 'next'
import Footer from '../components/Footer'
import PageHero from '../components/PageHero'
import { SITE, whatsappLink } from '../../lib/site'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: `Contact ${SITE.name}: phone, WhatsApp, email and business address.`,
}

export default function ContactPage() {
  const items = [
    { label: 'Phone', value: SITE.phoneDisplay, href: `tel:${SITE.phoneTel}` },
    { label: 'WhatsApp', value: SITE.phoneDisplay, href: whatsappLink() },
    { label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
    { label: 'Business Address', value: SITE.address },
  ]
  return (
    <div className="olyce-home">
      <main className="grow bg-[var(--olyce-bg)] pb-16 sm:pb-24">
        <PageHero
          eyebrow="Get in touch"
          title="Contact Us"
          subtitle="Questions about a journey? Our team is happy to help."
          imageSrc="/images/mike-swigunski-zDDQZgZjFtM-unsplash.jpg"
          imageAlt="Aerial view of Sigiriya rock fortress in Sri Lanka"
        />
        <section className="w-full py-12 sm:py-16">
          <div className="max-w-[860px] mx-auto px-5 sm:px-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {items.map(({ label, value, href }) => (
              <div key={label} className="border border-white/10 p-6">
                <h2 className="font-heading text-[18px] font-semibold text-[var(--gsm-gold)] mb-2">{label}</h2>
                {href ? (
                  <a
                    href={href}
                    {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="text-[16px] text-[var(--gsm-body)] hover:text-[var(--gsm-gold)] transition-colors"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="text-[16px] text-[var(--gsm-body)]">{value}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
