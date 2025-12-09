const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // alias 설정
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname, 'app');
    config.resolve.alias['@features'] = path.resolve(__dirname, 'features');
    return config;
  },
  // Turbopack 비활성화
  turbopack: {},
};

module.exports = nextConfig;
