import koaRouter from 'koa-router';
import apisController from '../controllers/apis';

const router = koaRouter({
  prefix: '/projects'
});

router.get('/:projectId/apis', apisController.index);  // 项目api列表
router.get('/:projectId/apis/new', apisController.new);
router.post('/:projectId/apis', apisController.create);
router.get('/:projectId/apis/:apiId', apisController.show);
router.post('/:projectId/apis/:apiId', apisController.run);

module.exports = router;
