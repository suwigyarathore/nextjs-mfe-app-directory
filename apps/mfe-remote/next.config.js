/** @type {import('next').NextConfig} */
const NextFederationPlugin = require('@module-federation/nextjs-mf');

const remotes = isServer => {
  const location = isServer ? 'ssr' : 'chunks';
  return {
    'mfe-remote': `mfe-remote@http://localhost:3001/_next/static/${location}/remoteEntry.js`,
  };
};

const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'mfe-remote',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './sub-app-page': './src/app/sub-app/page.js'
        },
        remotes: remotes(options.isServer),
        shared: {},
        extraOptions:{
          automaticAsyncBoundary: true
        }
      }),
    );

    return config;
  },
}

module.exports = nextConfig
