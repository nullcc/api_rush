import koaRouter from 'koa-router';
import projectsController from '../controllers/projects';

const router = koaRouter({
  prefix: '/projects'
});

router.get('/', projectsController.index);  // 项目列表
router.get('/new', projectsController.new);  // 新建项目页面
router.post('/', projectsController.create);  // 新建项目
router.get('/:projectId', projectsController.show);  // 项目详情
router.delete('/:projectId', projectsController.destroy);  // 删除项目

module.exports = router;
