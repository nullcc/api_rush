import redis from '../lib/redis';

module.exports = function sessionMiddle(options) {
  const session = redis(options);
  return async (ctx, next) => {
    ctx.session = session;
    await next();
  };
}
