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
 matcher: [
    // এই রাউটগুলো ছাড়া বাকি সব ড্যাশবোর্ড রাউট মিডলওয়্যার ট্র্যাক করবে
    '/((?!api|_next/static|_next/image|favicon.ico|public-lessons).*)',
  ],
 
};

export default nextConfig;

