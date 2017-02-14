const config = module.exports = require('./webpack.main');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const postcssImport = require('postcss-import');

const TEE_QINIU_URL_STAGING = process.env.ASSET_HOST_STAGING || 'https://o6ncdehai.qnssl.com';

config.output['filename'] = '[name]_bundle-[chunkhash].js';
config.output['publicPath'] = TEE_QINIU_URL_STAGING + '/assets/';

config['debug'] = false;

config.plugins.push(
  new webpack.optimize.CommonsChunkPlugin('common', 'common_bundle-[chunkhash].js'),
  new webpack.optimize.UglifyJsPlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new ExtractTextPlugin('[name]_bundle-[chunkhash].css', {
    allChunks: true
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"'
  })
);

config.module.loaders.push(
  {
    test: /\.(woff|woff2|eot|ttf|otf)\??.*$/,
    loader: 'url-loader?limit=100&name=[name]-[hash]' + '.[ext]'
  },
  {
    test: /\.(jpe?g|png|gif|svg)\??.*$/,
    loader: 'url-loader?limit=100&name=[name]-[hash]' + '.[ext]'
  },
  {
    test: /\.css$/, loader: ExtractTextPlugin.extract('css!postcss')
  },
  {
    test: /\.scss$/, loader: ExtractTextPlugin.extract('css!postcss!sass')
  }
);
