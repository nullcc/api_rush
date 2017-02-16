import Redis from 'redis';
import wrapper from 'co-redis';
import * as ConstValue from '../lib/consts';
import config from '../../config/config';
import BaseTask from './base';

const util = require('util');

function TokenTask() {
  BaseTask.call(this);
}
util.inherits(TokenTask, BaseTask);

TokenTask.prototype.init = function init() {

};

TokenTask.prototype.onSuccess = function onSuccess() {
  console.log('TokenTask on success.');
};

TokenTask.prototype.onError = function onError() {
  console.log('TokenTask on error.');
};

TokenTask.prototype.do = async function TokenTaskDo() {

};

TokenTask.prototype.onStart = function onStart() {
  this.do();
};

module.exports = TokenTask;
