const util = require('util');
import config from '../../config/config';
import BaseTask from './base';
import {Project, Api, Record} from '../models';
import BaseService from '../services/base';

function ApiRunTask(projectId) {
  this.projectId = projectId;
  this.startTime = new Date().getTime();
  this.endTime = null;
  BaseTask.call(this);
}
util.inherits(ApiRunTask, BaseTask);

ApiRunTask.prototype.init = async function init() {
  console.log('ApiRunTask init.');
  const project = await Project.findById(this.projectId).exec();
  this.project = project;
  const apis = await Api.find({project: this.projectId}).exec();
  this.apis = apis;
  this.emit('start');
};

ApiRunTask.prototype.onSuccess = async function onSuccess() {
  console.log('ApiRunTask on success.');
  await this.project.endTest();
};

ApiRunTask.prototype.onError = async function onError() {
  console.log('ApiRunTask on error.');
  await this.project.endTest();
};

ApiRunTask.prototype.do = async function ApiRunTaskDo() {
  if (this.apis.length === 0) {
    return this.emit('success');
  }
  await this.project.startTest();
  const baseService = new BaseService();
  this.apis.forEach(async (api, index) => {
    const body = api.body ? JSON.parse(api.body) : null;
    const response = await baseService.request(api.http_method, api.url, body, {});
    const recordParams = {
      project: api.project,
      api: api._id,
      status_code: response.status.toString(),
      response: JSON.stringify(response.body)
    };
    const record = new Record(recordParams);
    await record.save();
    if (index === this.apis.length - 1) {
      return this.emit('success');
    }
  });
};

ApiRunTask.prototype.onStart = async function onStart() {
  await this.project.startTest();
  this.do();
};

module.exports = ApiRunTask;
