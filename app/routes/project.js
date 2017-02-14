import koaRouter from 'koa-router';
import * as projects from '../controllers/projects';

const router = koaRouter({
  prefix: '/projects'
});

router.get('/', projects.index);  // 项目列表
router.get('/new', projects.new);  // 新建项目页面
router.post('/', projects.create);  // 新建项目
router.get('/:projectId', projects.show);  // 项目详情
router.delete('/:projectId', projects.delete);  // 删除项目

module.exports = router;
