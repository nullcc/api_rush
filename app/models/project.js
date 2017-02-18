// project schema

import db from '../lib/db.js';
const extend = require('mongoose-schema-extend');
import Base from './base';
import {Api, Record} from './index';

const ProjectSchema = Base.extend({
  name: {type: String, required: true},
  desc: {type: String},
  status: {type: Number, required: true, default: 1} // 1-正常 2-正在测试 3-禁用
}, {autoIndex: false});

// project的api列表
ProjectSchema.methods.apis = async function () {
  const projectId = this._id;
  const apis = await Api.find({project: projectId}).exec();
  return apis;
};

// project开始测试
ProjectSchema.methods.startTest = async function () {
  this.status = 2;
};

// project结束测试
ProjectSchema.methods.finishTest = async function () {
  this.status = 2;
};

// project api数量
ProjectSchema.methods.apiCount = async function () {
  return await Api.count({project: this._id}).exec();
};

// 删除project下的所有api
ProjectSchema.methods.removeApis = async function () {
  const projectId = this._id;
  await Api.remove({"project": projectId});
};

// 删除project的所有请求记录
ProjectSchema.methods.removeAllRecords = async function () {
  await Record.remove({project: this._id});
};

const Project = db.model('Project', ProjectSchema);

export default Project;
