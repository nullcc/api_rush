import koaRouter from 'koa-router';
import projectsController from '../controllers/projects';

const router = koaRouter({
  prefix: '/projects'
});

router.get('/', projectsController.index);                // 项目列表
router.get('/new', projectsController.new);               // 新建项目页面
router.post('/', projectsController.create);              // 新建项目
router.get('/:projectId', projectsController.show);       // 项目详情
router.get('/:projectId/edit', projectsController.edit);  // 编辑项目页面
router.put('/:projectId', projectsController.update);     // 更新项目
router.delete('/:projectId', projectsController.destroy); // 删除项目
router.post('/:projectId/run', projectsController.run); // 请求项目所有api
router.delete('/:projectId/records', projectsController.deleteAllRecord);

module.exports = router;
