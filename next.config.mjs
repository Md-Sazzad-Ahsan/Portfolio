/** @type {import('next').NextConfig} */
import withPWA from "@ducanh2912/next-pwa";

const nextConfig = {
  images: {
    domains: ['md-sazzad-ahsan.github.io', 'placehold.co', 'drive.google.com'],
  },
  pwa: {
    dest: "public",
    cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,
    swMinify: true,
    disable: false,
    workboxOptions: {
      disableDevLogs: true,
    },
  },
};

export default withPWA(nextConfig);
