import fs from 'fs';
import path from 'path';
import koaRouter from 'koa-router';

const basename = path.basename(module.filename);
const router = koaRouter();

fs
  .readdirSync(__dirname)
  .filter((file) =>
    (file.indexOf('.') !== 0) && (file !== basename) && (file.split('.').slice(-1)[0] === 'js')
  )
  .forEach((file) => {
    const route = require(path.join(__dirname, file)); // eslint-disable-line global-require
    router.use(route.routes(), route.allowedMethods());
  });

export default router;
