// project schema

import db from '../lib/db.js';
const extend = require('mongoose-schema-extend');
import Base from './base';
import {Api} from './index';

const ProjectSchema = Base.extend({
  name: {type: String, required: true},
  desc: {type: String},
  status: {type: Number, required: true, default: 1}
}, {autoIndex: false});

// project的api列表
ProjectSchema.methods.apis = async function () {
  const projectId = this._id;
  const apis = await Api.find({project_id: projectId}).exec();
  return apis;
};

// 设置project状态 0-锁定 1-可用
ProjectSchema.methods.lock = async function () {
  this.status = 0;
};

// // 删除project下的指定api
// ProjectSchema.methods.removeApi = async function (apiId) {
//   const projectId = this._id;
//   const api = Api.findById(apiId).exec();
//   console.log(api._id === apiId);
//   if (api._id === apiId) {
//
//   }
// };

const Project = db.model('Project', ProjectSchema);

export default Project;
