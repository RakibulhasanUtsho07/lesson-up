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
//  matcher: [
   
//     '/((?!api|_next/static|_next/image|favicon.ico|public-lessons).*)',
//   ],
 
};

export default nextConfig;

