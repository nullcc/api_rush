import koaRouter from 'koa-router';
import recordsController from '../controllers/records';

const router = koaRouter({
  prefix: '/'
});

router.get('projects/:projectId/records', recordsController.index);
router.get('projects/:projectId/records/:recordId', recordsController.show);

module.exports = router;
