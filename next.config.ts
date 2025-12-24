
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['embla-carousel-react'],
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https' as const,
        hostname: 'h7.cl',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https' as const,
        hostname: 'ik.imagekit.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https' as const,
        hostname: 'rb.gy',
        port: '',
        pathname: '/**',
      },
       {
        protocol: 'https' as const,
        hostname: 'rb.g',
        port: '',
        pathname: '/**',
      },
       {
        protocol: 'https' as const,
        hostname: 'drive.google.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
