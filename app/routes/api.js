import koaRouter from 'koa-router';
import * as apis from '../controllers/apis';

const router = koaRouter({
  prefix: '/projects'
});

router.get('/:projectId/apis', apis.index);  // 项目api列表
router.get('/:projectId/apis/new', apis.new);
router.post('/:projectId/apis', apis.create);

module.exports = router;
