import {Project} from '../models';
import BaseController from './base';
import {params} from '../lib/utils';
import ApiRunTask from '../tasks/apiRun';

class ProjectController extends BaseController {

  constructor() {
    super();
    this.beforeAction(this.setProject, ["show", "update", "edit", "destroy", "deleteAllRecord", "run"]);
    this.beforeAction(this.projectParams, ["create", "update"]);
  };

  // 项目列表
  async index(ctx) {
    const projects = await Project.find({}).exec();
    const message = {
      // notice: "创建成功!"
    }
    await ctx.render('project/index.njk', {projects, message});
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
    project.apiCount = await project.apiCount();
    await ctx.render('project/show.njk', {project});
  };

  // 编辑项目页面
  async edit(ctx) {
    const project = ctx._data.project;
    await ctx.render('project/edit.njk', {project});
  };

  // 更新项目
  async update(ctx) {
    const project = ctx._data.project;
    const projectParams = ctx._data.projectParams;
    await project.update(projectParams);
    await ctx.redirect(`/projects/${project._id}`);
  };

  // 删除项目
  async destroy(ctx) {
    const project = ctx._data.project;
    await project.removeApis();
    await project.remove();
    await ctx.redirect('/projects');
  };

  // 请求项目所有api
  async run(ctx) {
    const projectId = ctx.params.projectId;
    const project = ctx._data.project;
    await project.removeAllRecords();
    const apiRunTask = new ApiRunTask(projectId);
    apiRunTask.init();
    await ctx.redirect(`/projects/${projectId}`);
  };

  // 删除所有请求记录
  async deleteAllRecord(ctx) {
    const projectId = ctx.params.projectId;
    const project = ctx._data.project;
    await project.removeAllRecords();
    await ctx.redirect(`/projects/${projectId}/records`);
  };

  projectParams(ctx) {
    ctx._data.projectParams = params(ctx, ["name", "desc"]);
  };

  async setProject(ctx) {
    const projectId = ctx.params.projectId;
    const project = await Project.findById(projectId).exec();
    ctx._data.project = project;
  };
}

export default new ProjectController();
