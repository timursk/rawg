/* eslint-disable */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: {
      ssr: true,
      displayName: true,
    },
  },
  images: {
    domains: ['media.rawg.io'],
  },
};

module.exports = nextConfig;
