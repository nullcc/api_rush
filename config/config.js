module.exports = {
  port: 7777
}

var _ = require('lodash');
var development = require('./development');
var staging = require('./staging');
var production = require('./production');

var env = process.env.NODE_ENV || 'development';
var configs = {
  development,
  staging,
  production
};

var defaultConfig = {
  env: env
};

var config = _.merge(defaultConfig, configs[env]);

var commonConfig = {
  
}

config = _.merge(config, commonConfig);

module.exports = config;
