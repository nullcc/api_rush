var methods = require('methods');

// 检测请求body中的_method字段，如果存在且合法，则把当前请求method替换成_method
module.exports = function(options) {
  return async (ctx, next) => {
    var body = ctx.request.body;
    var method = ctx.request.method;
    if (body && body._method) {
      method = body._method.toUpperCase();
    }
    if (!~methods.indexOf(method.toLowerCase())) {
      ctx.throw('Invalid method overwrite.', 400);
    }
    ctx.request.method = method;
    await next();
  }
};
