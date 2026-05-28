import withPWA from '@ducanh2912/next-pwa'

const nextConfig = {
  reactStrictMode: true,
  turbopack: {},
}

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  cleanupOutdatedCaches: true,

  exclude: [
    /marker-icon\.d577052a\.png$/,
  ],

  fallbacks: {
    document: '/offline',
  },

  additionalManifestEntries: [
    { url: '/offline', revision: null },
  ],

  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'offlineCache',
        expiration: {
          maxEntries: 200,
        },
      },
    },
  ],
})(nextConfig)