import {Project} from '../models';

// 项目列表
exports.index = async(ctx) => {
  const projects = await Project.find({}).exec();
  await ctx.render('project/index.njk', {projects});
};

// 新建项目页面
exports.new = async(ctx) => {
  await ctx.render('project/new.njk', {});
};

// 新建项目
exports.create = async(ctx) => {
  const {name, desc} = tx.request.body;
  const project = new Project({name, desc});
  await project.save();
  await ctx.redirect('/projects');
};

// 项目详情
exports.show = async(ctx) => {
  const projectId = ctx.params.projectId;
  const project = await Project.findById(projectId).exec();
  await ctx.render('project/show.njk', {project});
};

// 删除项目
exports.delete = async(ctx) => {
  const projectId = ctx.params.projectId;
  await Project.findByIdAndRemove(projectId).exec();
  await ctx.redirect('/projects');
};
