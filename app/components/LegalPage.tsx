import Footer from './Footer'
import PageHero from './PageHero'

type LegalPageProps = {
  eyebrow: string
  title: string
  subtitle: string
  updated: string
  children: React.ReactNode
}

export default function LegalPage({ eyebrow, title, subtitle, updated, children }: LegalPageProps) {
  return (
    <div className="olyce-home">
      <main className="grow bg-[var(--olyce-bg)] pb-16 sm:pb-24">
        <PageHero
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          imageSrc="/images/mike-swigunski-zDDQZgZjFtM-unsplash.jpg"
          imageAlt="Aerial view of Sigiriya rock fortress in Sri Lanka"
        />
        <section className="w-full py-12 sm:py-16">
          <div className="max-w-[860px] mx-auto px-5 sm:px-8 space-y-4 text-[15px] sm:text-[16px] leading-7 font-light text-[var(--gsm-body)] [&_h2]:font-heading [&_h2]:text-[22px] [&_h2]:font-semibold [&_h2]:text-[var(--olyce-ink)] [&_h2]:pt-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_a]:underline">
            <p className="text-[13px] opacity-70">Last updated: {updated}</p>
            {children}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
