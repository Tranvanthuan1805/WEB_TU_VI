/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5258/api/:path*',
      },
      {
        source: '/contents/:path*',
        destination: 'http://localhost:5258/contents/:path*',
      },
    ];
  },
};

export default nextConfig;
