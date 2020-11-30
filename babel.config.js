module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    sourceMaps: true,
    plugins: [
      [
        'rewrite-require',
        {
          aliases: {
            crypto: 'react-native-crypto',
            constants: 'constants-browserify',
            dns: 'node-libs-browser/mock/dns',
            domain: 'domain-browser',
            fs: 'node-libs-browser/mock/empty',
            http: 'stream-http',
            https: 'https-browserify',
            net: 'node-libs-browser/mock/net',
            os: 'os-browserify/browser',
            path: 'path-browserify',
            pbkdf2: 'react-native-pbkdf2-shim',
            querystring: 'querystring-es3',
            stream: 'stream-browserify',
            _stream_duplex: 'readable-stream/duplex',
            _stream_passthrough: 'readable-stream/passthrough',
            _stream_readable: 'readable-stream/readable',
            _stream_transform: 'readable-stream/transform',
            _stream_writable: 'readable-stream/writable',
            sys: 'util',
            timers: 'timers-browserify',
            tls: 'node-libs-browser/mock/tls',
            tty: 'tty-browserify',
            vm: 'vm-browserify',
            zlib: 'browserify-zlib',
          },
          throwForNonStringLiteral: true,
        },
      ],
    ],
  };
};
