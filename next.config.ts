import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "htoebmyqeqetfmce.public.blob.vercel-storage.com",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
