import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['aiscend.co.uk'], // Add the domain here
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://16.171.30.20/api/:path*',
      },
    ];
  },
};

export default nextConfig;
