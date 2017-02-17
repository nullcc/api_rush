import path from 'path';
import Koa from 'koa';
import convert from 'koa-convert';
import bodyParser from 'koa-bodyparser';
import koaStatic from 'koa-static';
import proxy from 'koa-proxy';
import nunjucks from 'koa-nunjucks-2';
import koaLogger from 'koa-logger';
import koaRedis from 'koa-redis';
import session from 'koa-generic-session';
import CSRF from 'koa-csrf';
import router from './routes';
import config from '../config/config';
import middlewares from './middlewares';
// import Task from './tasks';

process.setMaxListeners(10);

const app = new Koa();
app.proxy = true;
app.keys = [config.secretKey];

// logger middleware
app.use(koaLogger());

if (process.env.NODE_ENV === "development") {
  app.use(convert(proxy({
    host: 'http://localhost:8000/',
    match: /(^\/assets\/)|(hot-update)/
  })));
}

// session middleware
app.use(middlewares.session({
  redis: {
    url: config.redisSessionUrl
  },
  prefix: 'api_rush_session:',
  expire: 3600
}));


const redisSessionStore = koaRedis({
  url: config.redisSessionUrl
});

app.use(convert(session({
  store: redisSessionStore,
  prefix: 'api_rush_session:',
  key: 'api_rush_session_id'
})));

// add body parsing
app.use(bodyParser());

// overwrites this.method with '_method' if provided
app.use(middlewares.overwrite());

// csrf middleware
app.use(new CSRF({
  invalidSessionSecretMessage: 'Invalid session secret',
  invalidSessionSecretStatusCode: 403,
  invalidTokenMessage: 'Invalid CSRF token',
  invalidTokenStatusCode: 403,
  excludedMethods: ['GET', 'HEAD', 'OPTIONS'],
  disableQuery: false
}));

// add some useful value to ctx
app.use(middlewares.common());

// catch error middleware
app.use(middlewares.error());

// views
app.use(nunjucks({
  ext: '',
  path: path.join(__dirname, 'views'),
  nunjucksConfig: {
    autoescape: true,
    noCache: true
  }
}));

app.use(router.routes(), router.allowedMethods());

app.listen(config.port);
console.log(`listeing on: ${config.port}`);

// // jobs
// const task = new Task();
// task.launch();
// app.task = task;

export default app;
