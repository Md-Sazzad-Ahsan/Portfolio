/** @type {import('next').NextConfig} */
import withPWA from "@ducanh2912/next-pwa";

const nextConfig = {
  images: {
    domains: [
      "drive.google.com", 
      "res.cloudinary.com",
      "dlimkdohv.cloudinary.com" // Adding another variation of the domain
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
        pathname: "/uc*",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.cloudinary.com", // Wildcard to match any subdomain
        pathname: "/**",
      },
    ],
    unoptimized: true, // Fallback option if domain configuration doesn't work
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
