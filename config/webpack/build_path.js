const path = require('path');
const CURRENT_PATH = path.resolve(__dirname);
const ROOT_PATH = path.join(__dirname, '../../');
const MODULES_PATH = path.join(ROOT_PATH, './node_modules'); // node包目录
const FRONTEND_PATH = path.join(ROOT_PATH, './app/frontend'); // 前端资源
const HTML_OUTPUT_PATH = path.join(ROOT_PATH, './app/views'); // html
const ENTRY_PATH = path.join(ROOT_PATH, './app/frontend/build_entry'); // webpack entry path
const ASSET_PATH = path.join(ROOT_PATH, './public/assets'); // 最后输出放置公共资源的目录

module.exports = {
  ROOT_PATH: ROOT_PATH,
  ASSET_PATH: ASSET_PATH,
  CURRENT_PATH: CURRENT_PATH,
  ENTRY_PATH: ENTRY_PATH,
  FRONTEND_PATH: FRONTEND_PATH,
  MODULES_PATH: MODULES_PATH,
  HTML_OUTPUT_PATH: HTML_OUTPUT_PATH
};
