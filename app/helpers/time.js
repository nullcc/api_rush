// time helpers

const moment = require('moment');

// 格式化时间 => 16-11-21 11:51
exports.formatTime = (timeStr) => {
  const time = moment(timeStr);
  return time.format('YYYY-MM-DD HH:mm');
};

// 格式化日期 => 2017.01.25
exports.formatDate = (timeStr) => {
  const time = moment(timeStr);
  return time.format('YYYY.MM.DD');
};
