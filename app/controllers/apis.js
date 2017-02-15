import {Api} from '../models';
import BaseService from '../services/base';
import BaseController from './base';
// import { classWithPrivateMethods, privateMethod } from 'class-private-method-decorator';

// @classWithPrivateMethods
class ApiController extends BaseController {
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
    const projectParams = this.apiParams(ctx);
    console.log(projectParams);
    const api = new Api(projectParams);
    await api.save();
    await ctx.redirect(`/projects/${projectId}/apis`);
  };

  // api详情
  async show(ctx) {
    const {projectId, apiId} = ctx.params;
    const api = await Api.findById(apiId).exec();
    await ctx.render('api/show.njk', {projectId, api});
  };

  // 请求api
  async run(ctx) {
    const {projectId, apiId} = ctx.params;
    const api = await Api.findById(apiId).exec();
    const baseService = new BaseService(ctx);
    const response = await baseService.request(api.http_method, api.url, null, {});
    await ctx.render('api/show.njk', {projectId, api, response});
  };

  // @privateMethod
  apiParams(ctx) {
    return this.params(ctx, ["name", "desc", "url", "http_method"]);
  }
}

export default new ApiController();
