const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname, 'app');
    config.resolve.alias['@features'] = path.resolve(__dirname, 'features');
    return config;
  }
}

module.exports = nextConfig;
