import Redis from 'redis';
import wrapper from 'co-redis';
import AuthService from '../services/auth';
import * as ConstValue from '../lib/consts';
import config from '../../config/config';
import BaseTask from './base';

const util = require('util');

// tee_node刷新自身token
function TokenTask() {
  this.timer = null;
  this.timeoutlNormal = ConstValue.TIME.SECONDS_PER_HOUR * 1000; // 正常请求延时为1小时
  this.timeoutAbnormal = 10 * 1000; // 刷新token失败的情况下，每隔10秒请求一次
  this.redisAvailable = false;
  this.redisClient = null;
  this.prefix = '';
  BaseTask.call(this);
}
util.inherits(TokenTask, BaseTask);

TokenTask.prototype.init = function init() {
  const options = {
    url: config.redisTokenUrl
  };
  this.prefix = 'tee_node_auth:';
  this.redisClient = wrapper(
    Redis.createClient(options.url, {})
  );

  this.redisClient.on('error', (error) => {
    console.error('redis error: ', error);
    this.redisAvailable = false;
  });

  this.redisClient.on('end', () => {
    console.log('redis disconnected');
    this.redisAvailable = false;
  });

  this.redisClient.on('connect', () => {
    this.redisAvailable = true;
    this.emit('start');
  });
};

TokenTask.prototype.onSuccess = function onSuccess() {
  console.log('on get tee_node token success');
  clearTimeout(this.timer);
  this.timer = setTimeout(this.do.bind(this), this.timeoutlNormal);
};

TokenTask.prototype.onError = function onError() {
  console.log('on get tee_node token error');
  clearTimeout(this.timer);
  this.timer = setTimeout(this.do.bind(this), this.timeoutAbnormal);
};

TokenTask.prototype.do = async function TokenTaskDo() {
  if (!this.redisAvailable) {
    return this.emit('error');
  }
  const authService = new AuthService(null);
  const auth = await authService.oauthForTeeNode();
  console.log(`*** Got tee_node oauth info at [${new Date()}] ***`);
  console.log(auth);
  if (auth) {
    const key = `${this.prefix}node`;
    await this.redisClient.set(key, JSON.stringify(auth));
    return this.emit('success');
  }
  return this.emit('error');
};

TokenTask.prototype.onStart = function onStart() {
  this.do();
};

// 立即刷新一次token
TokenTask.prototype.refreshTokenImmediately = async function refreshTokenImmediately() {
  await this.do();
};

module.exports = TokenTask;
