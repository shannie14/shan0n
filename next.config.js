/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // allow your S3 bucket domain for next/image
        domains: ['greattakes.s3.us-east-2.amazonaws.com'],

        // OR, if you want to be more specific:
        // remotePatterns: [
        //   {
        //     protocol: 'https',
        //     hostname: 'greattakes.s3.us-east-2.amazonaws.com',
        //     port: '',
        //     pathname: '/sk/**',
        //   },
        // ],
    },
};

module.exports = nextConfig;
