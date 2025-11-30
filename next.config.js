/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,
  reactStrictMode: false,
  devIndicators: {
    buildActivity: false,
  },
  // Empty turbopack config to silence the error
  turbopack: {},
  transpilePackages: ['firebase-admin'],
};

module.exports = nextConfig;