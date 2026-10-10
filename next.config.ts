import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      {source: '/story', destination: '/about', permanent: true},
      {source: '/journeys', destination: '/tours', permanent: true},
      {source: '/journeys/:id', destination: '/tours', permanent: true},
      {source: '/packages/:slug', destination: '/tour/:slug', permanent: true},
      {source: '/contact', destination: '/contact-us', permanent: true},
      {source: '/privacy', destination: '/privacy-policy', permanent: true},
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
}

export default nextConfig
