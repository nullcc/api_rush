import koaRouter from 'koa-router';
import apisController from '../controllers/apis';

const router = koaRouter({
  prefix: '/projects'
});

router.get('/:projectId/apis', apisController.index);
router.get('/:projectId/apis/new', apisController.new);
router.post('/:projectId/apis', apisController.create);
router.get('/:projectId/apis/:apiId', apisController.show);
router.get('/:projectId/apis/:apiId/edit', apisController.edit);
router.put('/:projectId/apis/:apiId', apisController.update);
router.delete('/:projectId/apis/:apiId', apisController.destroy);
router.post('/:projectId/apis/:apiId', apisController.run);

module.exports = router;
