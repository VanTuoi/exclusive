/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: []
    },
    i18n: {
        defaultLocale: "en",
        locales: ["en", "vi"]
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ["@svgr/webpack"]
        });

        return config;
    }
};

export default nextConfig;
