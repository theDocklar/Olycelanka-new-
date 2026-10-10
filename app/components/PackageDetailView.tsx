'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Dynamically import InteractiveMap to avoid SSR issues with Leaflet
const InteractiveMap = dynamic(() => import('./InteractiveMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-video bg-surface-container rounded-lg flex items-center justify-center border border-outline-variant/30">
      <span className="font-label-sm text-on-surface/40 italic">Loading map...</span>
    </div>
  ),
});

// Helper function to validate and extract image URLs
const getValidImageUrl = (image: any): string | null => {
  if (!image) return null;
  if (typeof image === 'string' && image.length > 0) return image;
  if (image.asset?.url) return image.asset.url;
  if (image.url) return image.url;
  return null;
};

interface ItineraryDay {
  day: string;
  description: string;
  image?: any;
  location?: {
    lat: number;
    lng: number;
    name?: string;
  };
}

interface Hotel {
  name: string;
  category: string;
  description: string;
  image?: any;
}

interface PackageData {
  _id: string;
  name: string;
  slug: string;
  duration: string;
  category?: string;
  priceStandard: number;
  pricePremium: number;
  description?: string;
  images?: any[];
  itinerary?: ItineraryDay[];
  included?: string[];
  notIncluded?: string[];
  standardHotel?: Hotel;
  premiumHotel?: Hotel;
  mapImage?: any;
  ratings?: Partial<Record<'pace' | 'comfort' | 'culture' | 'wildlife' | 'adventure', number>>;
}

export default function PackageDetailView({ packageData }: { packageData: PackageData }) {
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<'Itinerary' | 'Inclusions' | 'Hotels' | 'Map'>('Itinerary');

  const gallery = (packageData.images || []).map(getValidImageUrl).filter((u): u is string => Boolean(u));
  const RATING_LABELS: [keyof NonNullable<PackageData['ratings']>, string][] = [
    ['pace', 'Pace'],
    ['comfort', 'Comfort'],
    ['culture', 'Culture'],
    ['wildlife', 'Wildlife'],
    ['adventure', 'Adventure'],
  ];
  const ratingRows = RATING_LABELS.flatMap(([key, label]) => {
    const v = packageData.ratings?.[key];
    return typeof v === 'number' ? [[label, Math.max(0, Math.min(5, Math.round(v)))] as [string, number]] : [];
  });

  const enquiryHref = `/enquiry?tour=${encodeURIComponent(packageData.slug)}`;

  return (
    <div className="relative w-full">
      
      {/* Split hero: gallery left, details right */}
      <div className="w-full max-w-[1440px] mx-auto px-margin-mobile md:px-gutter pt-6 sm:pt-10">
        <Link href="/tours" className="inline-flex items-center gap-2 text-on-surface/70 hover:text-on-surface transition-colors text-xs mb-6">
          <span aria-hidden>←</span> Back to Catalog
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <div>
            <div className="relative w-full aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] overflow-hidden bg-surface-container">
              {gallery[activeImage] ? (
                <Image
                  key={gallery[activeImage]}
                  src={gallery[activeImage]}
                  alt={packageData.name}
                  fill
                  priority
                  className="object-cover animate-[fadeInUp_0.5s_ease-out]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-on-surface/40 italic">{packageData.name}</span>
                </div>
              )}
            </div>
            {gallery.length > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {gallery.slice(0, 8).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Show image ${i + 1}`}
                    onClick={() => setActiveImage(i)}
                    className={`h-1.5 rounded-full transition-all ${i === activeImage ? 'w-6 bg-primary' : 'w-1.5 bg-on-surface/30'}`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="lg:pt-6">
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="pill">{packageData.duration}</span>
              {packageData.category && <span className="pill">{packageData.category}</span>}
            </div>
            <h1 className="serif-italic text-on-surface text-[44px] sm:text-[64px] leading-[1.02] mb-4">{packageData.name}</h1>
            {packageData.description && (
              <p className="text-[14px] leading-7 text-on-surface/75 mb-8 max-w-[560px]">{packageData.description}</p>
            )}

            {ratingRows.length > 0 && (
              <div className="mb-8 max-w-[440px]">
                <h3 className="text-sm text-on-surface mb-3">Characteristics</h3>
                <ul className="divide-y divide-white/10 border-y border-white/10">
                  {ratingRows.map(([label, value], i) => (
                    <li key={label} className="flex items-center justify-between py-2.5 text-[12px] text-on-surface/80">
                      <span>{i + 1}. {label}</span>
                      <span className="flex gap-1" aria-label={`${value} out of 5`}>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <span key={n} className={`h-1.5 w-1.5 rounded-full ${n <= value ? 'bg-primary' : 'bg-white/20'}`} />
                        ))}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Link
              href={enquiryHref}
              className="inline-flex px-8 py-4 bg-primary text-[#0f1f1c] rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Inquire Now
            </Link>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative w-full max-w-container-max mx-auto px-margin-mobile md:px-gutter py-10 sm:py-16 md:py-20">
        <div className="flex flex-col lg:flex-row gap-10 sm:gap-12 lg:gap-20 items-start">
        
        {/* Left Content Area */}
        <div className="flex-1 w-full lg:w-2/3 order-2 lg:order-1">
          
          {/* Header Info */}
          <div className="mb-8 sm:mb-12">
            {packageData.description && (
              <p className="font-body-lg text-body-lg text-on-surface/80 max-w-3xl mb-6 sm:mb-8 leading-relaxed text-[15px] sm:text-base">
                {packageData.description}
              </p>
            )}
          </div>

          {/* Tabs */}
          <div className="border-b border-outline-variant/30 flex gap-5 sm:gap-8 mb-6 sm:mb-8 overflow-x-auto no-scrollbar scrollbar-hide">
            {['Itinerary', 'Inclusions', 'Hotels', 'Map'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`pb-4 font-label-sm text-sm tracking-wide transition-colors whitespace-nowrap ${
                  activeTab === tab 
                    ? 'text-on-surface border-b-2 border-on-surface font-bold' 
                    : 'text-on-surface/60 hover:text-on-surface'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content Areas */}
          <div className="min-h-[280px] sm:min-h-[400px]">
            {activeTab === 'Itinerary' && (
              <div className="relative">
                {/* Vertical Timeline Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-on-surface/20 via-on-surface/40 to-on-surface/20 hidden md:block"></div>
                
                <div className="flex flex-col gap-10 sm:gap-16 md:gap-20">
                  {packageData.itinerary?.length ? (
                    packageData.itinerary.map((day, idx) => {
                      const isEven = idx % 2 === 0;
                      const hasImage = getValidImageUrl(day.image);
                      
                      return (
                        <div 
                          key={idx} 
                          className="relative group"
                        >
                          {/* Timeline Node — desktop only */}
                          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block">
                            <div className="relative">
                              <div className="w-12 h-12 rounded-full bg-surface border-2 border-on-surface/30 flex items-center justify-center transition-all duration-500 group-hover:border-on-surface group-hover:scale-110 group-hover:shadow-lg">
                                <span className="font-label-sm text-xs font-bold text-on-surface">{idx + 1}</span>
                              </div>
                              <div className="absolute inset-0 rounded-full bg-on-surface/20 opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
                            </div>
                          </div>

                          {/* Content Container */}
                          <div className={`flex flex-col md:flex-row gap-5 sm:gap-6 md:gap-12 items-stretch md:items-center ${!isEven ? 'md:flex-row-reverse' : ''}`}>
                            {/* Image Side */}
                            {hasImage && (
                              <div className={`w-full md:w-[calc(50%-3rem)] ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                                <div className="relative aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl transition-all duration-700 group-hover:shadow-2xl group-hover:scale-[1.02]">
                                  <Image
                                    src={getValidImageUrl(day.image)!}
                                    alt={day.day}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, 45vw"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                  
                                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-surface/95 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg">
                                    <span className="font-label-sm text-xs uppercase tracking-wider text-on-surface">Day {idx + 1}</span>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {/* Text Side */}
                            <div className={`w-full md:w-[calc(50%-3rem)] ${!hasImage ? 'md:w-full' : ''}`}>
                              <div className={`bg-surface-container/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-outline-variant/20 transition-all duration-500 group-hover:bg-surface-container group-hover:border-outline-variant/40 group-hover:shadow-lg ${isEven ? 'md:ml-auto' : 'md:mr-auto'}`}>
                                {!hasImage && (
                                  <span className="inline-block mb-3 text-[11px] uppercase tracking-widest font-semibold text-on-surface/50 md:hidden">
                                    Day {idx + 1}
                                  </span>
                                )}
                                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-on-surface/40 mt-2"></div>
                                  <h4 className="font-headline-md text-lg sm:text-xl md:text-2xl text-on-surface font-semibold leading-tight">
                                    {day.day}
                                  </h4>
                                </div>
                                
                                {day.description && (
                                  <p className="font-body-md text-[15px] sm:text-base text-on-surface/75 leading-relaxed ml-5 sm:ml-6">
                                    {day.description}
                                  </p>
                                )}
                                
                                <div className={`mt-5 sm:mt-6 flex ${isEven ? 'justify-start' : 'md:justify-end justify-start'}`}>
                                  <div className="h-1 w-16 bg-gradient-to-r from-on-surface/20 to-transparent rounded-full"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-8 sm:p-12 text-center font-label-sm text-on-surface/50 italic border border-outline-variant/30 rounded-2xl bg-surface-container/30">
                      Itinerary details coming soon.
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'Inclusions' && (
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <h4 className="font-label-sm uppercase tracking-widest text-on-surface mb-4 pb-2 border-b border-outline-variant/30">Included ✓</h4>
                  <ul className="flex flex-col gap-4 mt-6">
                    {packageData.included?.length ? packageData.included.map((item, i) => (
                      <li key={i} className="font-body-md text-on-surface/90 pb-4 border-b border-outline-variant/10">{item}</li>
                    )) : <li className="text-on-surface/50 italic">No items listed.</li>}
                  </ul>
                </div>
                <div className="flex-1">
                  <h4 className="font-label-sm uppercase tracking-widest text-on-surface mb-4 pb-2 border-b border-outline-variant/30">Not Included ✕</h4>
                  <ul className="flex flex-col gap-4 mt-6">
                    {packageData.notIncluded?.length ? packageData.notIncluded.map((item, i) => (
                      <li key={i} className="font-body-md text-on-surface/70 pb-4 border-b border-outline-variant/10">{item}</li>
                    )) : <li className="text-on-surface/50 italic">No items listed.</li>}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'Hotels' && (
              <div className="flex flex-col md:flex-row gap-6">
                {/* Standard Hotel Card */}
                <div className="flex-1 border border-outline-variant/30 rounded-lg overflow-hidden bg-surface flex flex-col">
                  <div className="h-48 bg-surface-container flex items-center justify-center relative">
                     {getValidImageUrl(packageData.standardHotel?.image) ? (
                        <Image src={getValidImageUrl(packageData.standardHotel?.image)!} alt="Standard Hotel" fill className="object-cover"/>
                     ) : (
                        <span className="font-label-sm text-on-surface/30 italic text-xs">Standard Hotel Image Placeholder</span>
                     )}
                  </div>
                  <div className="p-6">
                    <h4 className="font-headline-sm text-on-surface font-bold mb-1">{packageData.standardHotel?.name || 'Standard Accommodation'}</h4>
                    <span className="font-label-sm text-xs text-on-surface/50 block mb-4">★★★ {packageData.standardHotel?.category || '3-star category'}</span>
                    <p className="font-body-sm text-on-surface/80">{packageData.standardHotel?.description || 'Comfortable, well-located property with breakfast included.'}</p>
                  </div>
                </div>

                {/* Premium Hotel Card */}
                <div className="flex-1 border border-outline-variant/30 rounded-lg overflow-hidden bg-surface flex flex-col">
                  <div className="h-48 bg-surface-container flex items-center justify-center relative">
                     {getValidImageUrl(packageData.premiumHotel?.image) ? (
                        <Image src={getValidImageUrl(packageData.premiumHotel?.image)!} alt="Premium Hotel" fill className="object-cover"/>
                     ) : (
                        <span className="font-label-sm text-on-surface/30 italic text-xs">Premium Hotel Image Placeholder</span>
                     )}
                  </div>
                  <div className="p-6">
                    <h4 className="font-headline-sm text-on-surface font-bold mb-1">{packageData.premiumHotel?.name || 'Premium Accommodation'}</h4>
                    <span className="font-label-sm text-xs text-on-surface/50 block mb-4">★★★★★ {packageData.premiumHotel?.category || '5-star category'}</span>
                    <p className="font-body-sm text-on-surface/80">{packageData.premiumHotel?.description || 'Boutique luxury with pool, spa, and curated dining experience.'}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Map' && (
              <InteractiveMap itinerary={packageData.itinerary} packageName={packageData.name} />
            )}
          </div>
        </div>

        {/* Right Sticky Booking Sidebar — first on mobile for quicker booking */}
        <div className="w-full lg:w-1/3 lg:sticky lg:top-32 space-y-5 sm:space-y-6 order-1 lg:order-2">
          <div className="bg-surface-container/30 border border-outline-variant/30 rounded-xl p-5 sm:p-8 backdrop-blur-sm shadow-sm">
            <h3 className="font-headline-md text-xl sm:text-2xl text-on-surface mb-3 font-semibold">Interested in this journey?</h3>
            <p className="text-[14px] leading-6 text-on-surface/75 mb-6">
              Tell us your dates and group size and we will put together a tailored plan.
            </p>
            <ul className="space-y-3 mb-8 text-[14px] text-on-surface/80">
              <li>{packageData.duration}</li>
              {packageData.category && <li>{packageData.category}</li>}
            </ul>
            <Link
              href={enquiryHref}
              className="w-full py-4 bg-primary text-[#0f1f1c] rounded-full text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center"
            >
              Inquire Now
            </Link>
          </div>

          {/* Need help card */}
          <div className="bg-surface-container/20 border border-outline-variant/20 rounded-xl p-6 text-center">
            <span className="material-symbols-outlined text-on-surface/30 text-3xl mb-2">support_agent</span>
            <h4 className="font-headline-sm text-on-surface font-bold mb-2">Need a tailored touch?</h4>
            <p className="font-body-sm text-on-surface/70 mb-4">Connect with our luxury travel concierge to customize this itinerary.</p>
            <Link href="/contact-us" className="font-label-sm text-xs uppercase tracking-widest text-on-surface hover:text-primary transition-colors underline underline-offset-4">
              Contact Concierge
            </Link>
          </div>
        </div>

        </div>
      </div>

    </div>
  );
}
