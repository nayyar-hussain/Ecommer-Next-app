import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images : {
    remotePatterns : [
      {
        protocol: 'https',
        hostname: 'img.daisyui.com',
    },
      {
        protocol: 'https',
        hostname: 'png.pngtree.com',
    },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
    },
    ]
  }
};

export default nextConfig;
