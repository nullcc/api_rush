const webpack = require('webpack');
const HappyPack = require('happypack');
const config = module.exports = require('./webpack.main');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

config['debug'] = true;
config['displayErrorDetails'] = true;
config['outputPathinfo'] = true;
config['devtool'] = 'eval-source-map';
// config.entry['common'].push('webpack/hot/only-dev-server', `webpack-dev-server/client?http://127.0.0.1:8000`)

config.plugins.push(
  new webpack.optimize.CommonsChunkPlugin({
    name: 'common',
    filename: 'common.js',
    minChunks: 5
  }),
  new ExtractTextPlugin('[name].css'),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"development"'
  }),
  new webpack.HotModuleReplacementPlugin(),
  new HappyPack({
    id: "css",
    threads: 8,
    threadPool: config.happyThreadPool,
    loaders: ['style!css!postcss']
  }),
  new HappyPack({
    id: "scss",
    threads: 8,
    threadPool: config.happyThreadPool,
    loaders: ['style!css!postcss!sass']
  })
);

config.module.loaders.push(
  {
    test: /\.(woff|woff2|eot|ttf|otf)\??.*$/,
    loader: 'url-loader?limit=8192&name=[name].[ext]'
  },
  {
    test: /\.(jpe?g|png|gif|svg)\??.*$/,
    loader: 'url-loader?limit=8192&name=[name].[ext]'
  },
  { test: /\.css$/, loaders: ["happypack/loader?id=css"] },
  {
    test: /\.scss$/, loaders: ["happypack/loader?id=scss"]
  }
);
module.exports = config;
