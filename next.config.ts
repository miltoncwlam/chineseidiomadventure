import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: '/landscape', destination: '/landscape.html' }];
  }
};

export default nextConfig;
