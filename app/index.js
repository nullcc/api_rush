import path from 'path';
import Koa from 'koa';
import convert from 'koa-convert';
import koaBody from 'koa-body';
import koaStatic from 'koa-static';
import proxy from 'koa-proxy';
import nunjucks from 'koa-nunjucks-2';
import koaLogger from 'koa-logger';
import koaRedis from 'koa-redis';
import session from 'koa-generic-session';
// import CSRF from 'koa-csrf';
import router from './routes';
import middleware from './middlewares';
import config from '../config/config';
// import Task from './tasks';
// import db from './lib/db';

// db.init();

process.setMaxListeners(10);

const app = new Koa();
app.proxy = true;
// app.keys = [config.secretKeyBase];

// logger middleware
app.use(koaLogger());

if (process.env.NODE_ENV === "development") {
  app.use(convert(proxy({
    host: 'http://localhost:8000/',
    match: /(^\/assets\/)|(hot-update)/
  })));
}

// catch error middleware
app.use(middleware.catchError);

app.use(middleware.addHelper);

// views
app.use(nunjucks({
  ext: '',
  path: path.join(__dirname, 'views'),
  nunjucksConfig: {
    autoescape: true,
    noCache: true
  }
}));

app.use(convert(koaBody({
  multipart: true
})));

app.use(router.routes(), router.allowedMethods());

app.listen(config.port);
console.log(`listeing on: ${config.port}`);

export default app;
