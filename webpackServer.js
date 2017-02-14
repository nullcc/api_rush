const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./config/webpack/webpack.development');

const compiler = webpack(config);

new WebpackDevServer(compiler, {
  publicPath: '/assets',
  contentBase: __dirname,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true
  },
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
}).listen(7777, 'localhost', (err) => {
  if (err) {
    console.log(err);
  }
  console.log('webpack服务器已启动 端口号:7777');
});
