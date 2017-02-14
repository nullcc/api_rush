import {Api} from '../models';

// 项目api列表
exports.index = async(ctx) => {
  const projectId = ctx.params.projectId;
  const apis = await Api.find({}).exec();
  await ctx.render('api/index.njk', {projectId, apis});
};

// 新建api页面
exports.new = async(ctx) => {
  const projectId = ctx.params.projectId;
  await ctx.render('api/new.njk', {projectId});
};

// 新建api
exports.create = async(ctx) => {
  const projectId = ctx.params.projectId;
  const {name, url, http_method, desc} = ctx.request.body;
  const api = new Api({name, url, http_method, desc});
  await api.save();
  await ctx.redirect(`/projects/${projectId}/apis`);
};
