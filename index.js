const register = require('babel-core/register');

register({
  presets: ['react', 'es2015', 'stage-0'],
  plugins: [
    ['babel-plugin-transform-require-ignore', {
      extensions: ['.scss', '.css']
    }],
    ["transform-decorators-legacy"]
  ]
});
if (process.env.NODE_ENV === 'development') {
  require('asset-require-hook')({
    extensions: ['jpg', 'png'],
    name: '/assets/[name].[ext]',
    limit: 2048
  });
} else {
  require('asset-require-hook')({
    extensions: ['jpg', 'png', 'svg', 'gif'],
    name: `${process.env.ASSET_HOST_STAGING}/[[name]-[hash].[ext]`,
    limit: 2048
  });
}

require('babel-polyfill');
require('./app/index');
