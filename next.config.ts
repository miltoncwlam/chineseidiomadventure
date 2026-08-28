import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/Homepage', destination: '/', permanent: true },
      { source: '/Homepage/:path*', destination: '/', permanent: true },
      { source: '/index.html', destination: '/', permanent: true }
    ];
  },
  async rewrites() {
    return [
      { source: '/landscape', destination: '/landscape.html' },
      { source: '/__clerk', destination: '/api/clerk' },
      { source: '/__clerk/:path*', destination: '/api/clerk/:path*' }
    ];
  }
};

export default nextConfig;
