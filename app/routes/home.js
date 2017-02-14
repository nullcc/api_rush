import koaRouter from 'koa-router';
import * as home from '../controllers/home';

const router = koaRouter({
  prefix: '/'
});

router.get('/', home.index);  // 首页

module.exports = router;
