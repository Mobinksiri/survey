process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'eemapsychology.ir',
      },
      {
        protocol: 'http',
        hostname: 'eemapsychology.ir',
      },
      {
        protocol: 'http',
        hostname: '192.168.5.31',
        port: '5000',
      },
    ],
  },
  webpack: (config, { webpack }) => {
    config.module.rules.push({
      test: /\.js$/,
      exclude: /node_modules(?!\/quill-image-drop-module|quill-image-resize-module)/,
      loader: 'babel-loader',
    });

    config.plugins.push(
      new webpack.ProvidePlugin({
        'window.Quill': 'quill',
      }),
    );

    return config;
  },
};

module.exports = nextConfig;
