/** @type {import('next').NextConfig} */
// const nextConfig = {
// }

// module.exports = nextConfig
module.exports = {
    reactStrictMode: true,
    webpack5: true,
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback.fs = false;
        }
        return config;
    },
};
