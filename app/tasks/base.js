const EventEmitter = require('events').EventEmitter;
const util = require('util');

function BaseTask() {
  EventEmitter.call(this);
  this.on('success', this.onSuccess);
  this.on('error', this.onError);
  this.on('start', this.onStart);
}
util.inherits(BaseTask, EventEmitter);

BaseTask.prototype.init = function init() {
  // init task...
};

BaseTask.prototype.onSuccess = function onSuccess() {
  // will be invoked on task success...
};

BaseTask.prototype.onError = function onError() {
  // will be invoked on task failed...
};

BaseTask.prototype.onStart = function onStart() {
  // will be invoked on task start...
};

export default BaseTask;
