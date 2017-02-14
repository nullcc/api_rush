const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const crypto = require('crypto');

function getPath(dir, ext, exclude, paths) {
  let files = null;
  let excludeFiles = [];
  let filePaths = paths;
  if (!filePaths) {
    filePaths = [];
  }

  if (_.isString(exclude)) {
    excludeFiles.push(exclude);
  } else if (_.isArray(exclude)) {
    excludeFiles = exclude;
  }

  files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fName = dir + path.sep + file;
    const stat = fs.lstatSync(fName);
    if (stat.isDirectory() === true) { // 判断是否问文件夹,为文件夹则递归处理
      getPath(fName, ext, exclude, paths);
    } else if ((ext === '*' || file.indexOf(`.${ext}`) > -1) && _.indexOf(excludeFiles, file) === -1) {
        filePaths.push(fName);
    }
  });

  return filePaths;
}

function getRandomStr(len) {
  const alaphbet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const alaphbetLen = alaphbet.length;
  let res = "";
  for (let i = 0; i < alaphbetLen; i += 1) {
    res += Math.floor(Math.random() * len);
  }
  return res;
}

function md5(str) {
  return crypto.createHash('md5').update(str).digest('hex');
}

module.exports = {
  getPath,
  getRandomStr,
  md5
};
