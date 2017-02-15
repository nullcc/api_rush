const _ = require('underscore');

class BaseController {

  constructor() {
    this.controller = this.constructor.name;
  };

  // GET /{resources}
  async index(ctx) {

  };

  // GET /{resources}/new
  async new(ctx) {

  };

  // POST /{resources}
  async create(ctx) {

  };

  // GET /{resources}/{:id}
  async show(ctx) {

  };

  // GET /{resources}/{:id}/edit
  async edit(ctx) {

  };

  // PUT /{resources}/{:id}
  async update(ctx) {

  };

  // DELETE /{resources}/{:id}
  async destroy(ctx) {

  };

  // params(ctx, requiredParamNames) {
  //   let params = {};
  //   for (let i = 0; i < requiredParamNames.length; i++) {
  //     let paramName = requiredParamNames[i];
  //     if (!ctx.request.body.hasOwnProperty(paramName) && _.isEmpty(ctx.request.body[paramName])) {
  //       return {};
  //     }
  //     params[paramName] = ctx.request.body[paramName];
  //   }
  //   return params;
  // }

  beforeAction(action, methodNames) {
    if (!_.isFunction(action)) {
      return;
    }
    for (let i = 0; i < methodNames.length; i++) {
      let methodName = methodNames[i];
      let method = this[methodName];
      if (!method || !_.isFunction(method)) {
        continue;
      }
      this[methodName] = (function(){
        return async function (ctx) {
          await action(ctx);
          await method(ctx);
        };
      })();
    }
  }

  afterAction(action, methodNames) {
    if (!_.isFunction(action)) {
      return;
    }
    for (let i = 0; i < methodNames.length; i++) {
      let methodName = methodNames[i];
      let method = this[methodName];
      if (!method || !_.isFunction(method)) {
        continue;
      }
      this[methodName] = (function(){
        return async function (ctx) {
          await method(ctx);
          await action(ctx);
        };
      })();
    }
  }

}

export default BaseController;
