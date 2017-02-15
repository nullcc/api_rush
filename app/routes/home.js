import koaRouter from 'koa-router';
import homeController from '../controllers/home';

const router = koaRouter({
  prefix: '/'
});

router.get('/', homeController.index);  // 首页
router.get('test', homeController.test);

module.exports = router;
