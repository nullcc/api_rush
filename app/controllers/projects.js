import {Project} from '../models';
import BaseController from './base';
import {params} from '../lib/utils';
// import { classWithPrivateMethods, privateMethod } from 'class-private-method-decorator';

// @classWithPrivateMethods
class ProjectController extends BaseController {

  constructor() {
    super();
    this.beforeAction(this.setProject, ["show", "destroy"]);
    this.beforeAction(this.projectParams, ["create"]);
  };

  // 项目列表
  async index(ctx) {
    const projects = await Project.find({}).exec();
    await ctx.render('project/index.njk', {projects});
  };

  // 新建项目页面
  async new(ctx) {
    await ctx.render('project/new.njk', {});
  };

  // 新建项目
  async create(ctx) {
    const projectParams = ctx._data.projectParams;
    const project = new Project(projectParams);
    await project.save();
    await ctx.redirect('/projects');
  };

  // 项目详情
  async show(ctx) {
    const project = ctx._data.project;
    const apis = await project.apis();
    await ctx.render('project/show.njk', {project});
  };

  // 编辑项目页面
  async edit(ctx) {

  };

  // 更新项目
  async update(ctx) {

  };

  // 删除项目
  async destroy(ctx) {
    const project = ctx._data.project;
    await project.remove();
    await ctx.redirect('/projects');
  };

  projectParams(ctx) {
    ctx._data.projectParams = params(ctx, ["name", "desc"]);
  }

  async setProject(ctx) {
    const projectId = ctx.params.projectId;
    const project = await Project.findById(projectId).exec();
    ctx._data.project = project;
  }
}

export default new ProjectController();
