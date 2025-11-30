/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,
  reactStrictMode: false,
  devIndicators: {
    buildActivity: false,
  },
  transpilePackages: ['firebase-admin'],
};

module.exports = nextConfig;