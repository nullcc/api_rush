var TEE_QINIU_URL = process.env.ASSET_HOST_PRO || 'https://o86bsrpha.qnssl.com';

var config = module.exports = require('./webpack.staging.js');
config.output['publicPath'] = TEE_QINIU_URL + '/assets/';
