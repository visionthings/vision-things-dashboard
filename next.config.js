/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                pathname: '/images/profile_pics/**',
            },
        ],
    },
}

module.exports = nextConfig
