import fs from 'fs';
import path from 'path';

const catchError = async (ctx, next) => {
  try {
    await next();
    if (ctx.status === 404) {
      ctx.throw(404);
    }
  } catch (err) {
    console.error(err.stack);
    const status = err.status || 500;
    ctx.status = status;
    if (status === 404) {
      await ctx.render("errors/404.njk");
    } else if (status === 500) {
      await ctx.render("errors/500.njk");
    }
  }
};

let manifest = null;
const manifestPath = path.resolve(__dirname, '../../public/assets/webpack_manifest.json');

if (fs.existsSync(manifestPath)) {
  manifest = require(manifestPath); // eslint-disable-line global-require
}

const assetsPath = (name) => {
  if (!name) {
    return null;
  }
  let assetsName = name;
  if (process.env.NODE_ENV !== "development" && manifest) {
    assetsName = manifest[name];
    if (!assetsName) {
      return `${config.staticHost}/${name}`;
    }
    return `${config.assetHost}/assets/${assetsName}`;
  } else if (assetsName.match(/\.css$/)) {
    return null;
  }
  if (/uploads\//.test(name)) {
    return `${config.staticHost}${name}`;
  }
  if (/jquery/.test(name)) {
    return `/${name}`;
  }
  return `/assets/${assetsName}`;
};

const isMobile = (ctx) => {
  const ua = ctx.request.header['user-agent'] || '';
  const mobileEx = /Mobile|webOS/i;
  return mobileEx.test(ua);
};

const addHelper = async (ctx, next) => {
  ctx._data = {};
  ctx.state.assetsPath = assetsPath;
  ctx.state.isMobile = isMobile(ctx);
  ctx.state.header = ctx.header;
  ctx.state.csrf = ctx.csrf;
  ctx.state.context = { // 一些上下文信息
    protocol: ctx.protocol,       // e.g. http
    host: ctx.host,               // e.g. www.tshe.com
    url: ctx.url,                 // e.g. /stories?page=2&key=abc
    path: ctx.path,               // e.g. /stories
    query: ctx.query,             // e.g. {page: 2, key: 'abc'}
    querystring: ctx.querystring, // e.g. page=2&key=abc
    originalUrl: ctx.originalUrl, // e.g. /stories?page=2&key=abc
    completedUrl: `${ctx.protocol}://${ctx.host}${ctx.originalUrl}` // 完整url
  };
  ctx.state.isDevEnv = process.env.NODE_ENV === 'development'; // 是否是开发环境
  await next();
};

export default {
  catchError,
  addHelper
};
