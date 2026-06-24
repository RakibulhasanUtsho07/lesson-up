/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/auth/:path*',
  //       destination: 'http://localhost:5000/api/auth/:path*', // আপনার ব্যাকএন্ড এন্ডপয়েন্ট
  //     },
  //   ];
  // },
 
};

export default nextConfig;

