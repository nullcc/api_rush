import {Api} from '../models';
import BaseService from '../services/base';
import BaseController from './base';
import {params} from '../lib/utils';
const _ = require('lodash');

class ApiController extends BaseController {

  constructor() {
    super();
    this.beforeAction(this.setApi, ["show", "update", "edit", "destroy"]);
    this.beforeAction(this.apiParams, ["create", "update"]);
  };

  // 项目api列表
  async index(ctx) {
    const projectId = ctx.params.projectId;
    const apis = await Api.find({}).exec();
    await ctx.render('api/index.njk', {projectId, apis});
  };

  // 新建api页面
  async new(ctx) {
    const projectId = ctx.params.projectId;



    await ctx.render('api/new.njk', {projectId});
  };

  // 新建api
  async create(ctx) {
    const projectId = ctx.params.projectId;
    const apiParams = ctx._data.apiParams;
    const api = new Api(apiParams);
    await api.save();
    await ctx.redirect(`/projects/${projectId}/apis`);
  };

  // api详情
  async show(ctx) {
    const {projectId} = ctx.params;
    const api = ctx._data.api;
    await ctx.render('api/show.njk', {projectId, api});
  };

  // 编辑api页面
  async edit(ctx) {
    const {projectId} = ctx.params;
    const api = ctx._data.api;
    await ctx.render('api/edit.njk', {projectId, api});
  };

  // 更新api
  async update(ctx) {
    const {projectId} = ctx.params;
    const api = ctx._data.api;
    const apiParams = ctx._data.apiParams;
    await api.update(apiParams);
    await ctx.redirect(`/projects/${projectId}/apis/${api._id}`);
  };

  // 删除项api
  async destroy(ctx) {
    const {projectId} = ctx.params;
    const api = ctx._data.api;
    await api.remove();
    await ctx.redirect(`/projects/${projectId}/apis`);
  };

  // 请求api
  async run(ctx) {
    const {projectId, apiId} = ctx.params;
    const api = await Api.findById(apiId).exec();
    const baseService = new BaseService(ctx);
    const response = await baseService.request(api.http_method, api.url, null, {});
    await ctx.render('api/show.njk', {projectId, api, response});
  };

  apiParams(ctx) {
    ctx._data.apiParams = params(ctx, ["name", "desc", "url", "http_method", "project"]);
  };

  async setApi(ctx) {
    const apiId = ctx.params.apiId;
    const api = await Api.findById(apiId).exec();
    ctx._data.api = api;
  };
}

export default new ApiController();
