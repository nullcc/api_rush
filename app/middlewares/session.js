import redis from '../lib/redis';

function sessionMiddle(options) {
  const session = redis(options);
  return async (ctx, next) => {
    ctx.session = session;
    await next();
  };
}

module.exports = sessionMiddle;
