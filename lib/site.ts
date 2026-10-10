// Business contact details. Shown on /contact-us, the footer and the policy pages (required by PayHere).
// TODO: replace the placeholder address and email with the real ones before submitting to PayHere.
export const SITE = {
  name: 'Olyce Travel',
  phoneDisplay: '+94 77 151 4255',
  phoneTel: '+94771514255',
  whatsappNumber: '94771514255',
  email: 'info@olyce.com',
  address: 'Olyce Travel, [Street Address], [City], Sri Lanka',
} as const

export const whatsappLink = (message = 'Hello Olyce, I would like to enquire about a tour.') =>
  `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`
