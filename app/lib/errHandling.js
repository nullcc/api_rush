export default function errHandling (target, key, descriptor) {
  const func = descriptor.value;
  descriptor.value = async function decorator (...args) {
    if (args.length === 5 && args[4] === true) { // 该请求的错误会被忽略
      const response = await func.call(this, ...args);
      return response;
    }
    try {
      const response = await func.call(this, ...args);
      return response;
    } catch (e) {
      console.error(e.stack);
      throw new Error(e);
    }
  };
  return descriptor;
}
