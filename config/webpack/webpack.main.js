const webpack = require("webpack");
const path = require("path");
const fs = require('fs');
const PATH = require("./build_path");
const HappyPack = require('happypack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');
const postcssImport = require('postcss-import');
const cssnext = require('postcss-cssnext');
const postcssReporter = require("postcss-reporter");
const happyThreadPool = HappyPack.ThreadPool({size: 4});

const entryFiles = fs.readdirSync(PATH.ENTRY_PATH);
const entries = {};
entryFiles
  .filter(file =>
    file.split('.')[0] && file.split('.').slice(-1)[0] === 'js'
  )
  .forEach(file => {
    const filename = file.split('.')[0];
    const filepath = path.join(PATH.ENTRY_PATH, file)
    entries[filename] = [filepath];
});

const config = module.exports = {
  context: PATH.ROOT_PATH,
  entry: entries,
  externals: {
    "jquery": "jQuery"
  },
  cache: true,
  output: {
    filename: '[name].js',
    path: PATH.ASSET_PATH,
    publicPath: '/assets/',
  }
};
config.happyThreadPool = happyThreadPool;
config.resolve = {
  extensions: ['', '.js', '.jsx', '.coffee', '.json', '.css', 'scss'],
  root: path.resolve(__dirname),
  moduledirectories: ['node_modules'],
  resolve: {
    fallback: PATH.MODULES_PATH
  },
  resolveLoader: {
    fallback: PATH.MODULES_PATH
  },
  alias: {
    "underscore": path.resolve(PATH.MODULES_PATH, "underscore/underscore-min.js"),
    "blazy": path.resolve(PATH.MODULES_PATH, "blazy/blazy.js"),
    "react$": path.resolve(PATH.MODULES_PATH, "react/dist/react.min.js"),
    "react-dom": path.resolve(PATH.MODULES_PATH, "react-dom"),
    "react-redux": path.resolve(PATH.MODULES_PATH, "react-redux"),
    "redux": path.resolve(PATH.MODULES_PATH, "redux"),
    "moment": path.resolve(PATH.MODULES_PATH, "moment/min/moment-with-locales.min.js"),
    "tipso/src/tipso.css": path.resolve(PATH.MODULES_PATH, "tipso/src/tipso.min.css"),
    "tipso/src/tipso.js": path.resolve(PATH.MODULES_PATH, "tipso/src/tipso.min.js"),
    "object-assign": path.resolve(PATH.MODULES_PATH, "object-assign/index.js"),
    "es6-promise": path.resolve(PATH.MODULES_PATH, "es6-promise/dist/es6-promise.min.js"),
    "classnames": path.resolve(PATH.MODULES_PATH, "classnames"),
    "redux-thunk": path.resolve(PATH.MODULES_PATH, "redux-thunk"),
    "arale-qrcode": path.resolve(PATH.MODULES_PATH, "arale-qrcode/lib/index.js"),
    "pickadate": path.resolve(PATH.MODULES_PATH, "pickadate"),
    "picker": path.resolve(PATH.MODULES_PATH, 'pickadate/lib/picker'),
    "babel-polyfill": path.resolve(PATH.MODULES_PATH, "babel-polyfill"),
    "semantic-ui/dist/components/popup.js": path.resolve(PATH.MODULES_PATH, "semantic-ui/dist/components/popup.min.js"),
    "semantic-ui/dist/components/transition.js": path.resolve(PATH.MODULES_PATH, "semantic-ui/dist/components/transition.min.js")
  }
};

config.plugins = [
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery'
  }),
  new webpack.optimize.DedupePlugin(),
  new ManifestPlugin({
    fileName: 'webpack_manifest.json'
  }),
  new HappyPack({
    id: "babelJs",
    threads: 4,
    threadPool: happyThreadPool,
    loaders: ['babel-loader?presets[]=es2015,presets[]=stage-0,presets[]=react,cacheDirectory=true']
  })
];

config.module = {
  preLoaders: [],
  loaders: [
    {
      test: /\.jsx?$/,
      loaders: ["happypack/loader?id=babelJs"],
      exclude: [/node_modules\/(?!tee_core_frontend)/]
    }
  ],
  noParse: [/react\.min\.js/, /moment-with-locales\.min\.js/]
};

config.postcss = function(webpack) {
  return [
    postcssImport({
      addDependencyTo: webpack
    }),
    cssnext({
      autoprefixer: {
        browsers: "ie >= 9, ..."
      }
    }),
    postcssReporter({
      clearMessages: true
    })
  ]
};
