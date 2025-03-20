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
    ]
  }
};

export default nextConfig;
