const _ = require('underscore');
const lodash = require('lodash');

class BaseController {

  constructor() {
    this.controller = this.constructor.name;
    const methods = Object.getOwnPropertyNames(this.__proto__).filter((method) => {
      return _.indexOf(["constructor", "beforeAction", "afterAction", "aroundAction", "overrideRender"], method) === -1;
    });
    this.beforeAction(this.overrideRender, methods);
  };

  // GET /{resources}
  // 资源列表
  async index(ctx) {

  };

  // GET /{resources}/new
  // 新建资源页面
  async new(ctx) {

  };

  // POST /{resources}
  // 新建资源
  async create(ctx) {

  };

  // GET /{resources}/{:id}
  // 显示某个资源
  async show(ctx) {

  };

  // GET /{resources}/{:id}/edit
  // 编辑某个资源表页面
  async edit(ctx) {

  };

  // PUT /{resources}/{:id}
  // 更新某个资源
  async update(ctx) {

  };

  // DELETE /{resources}/{:id}
  // 删除某个资源
  async destroy(ctx) {

  };

  // 控制器方法的前置方法
  // 例 this.beforeAction(this.setProject, ["show", "destroy"]);
  // this.setProject会在show和destroy两个方法调用前被调用。
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

  // 控制器方法的后置方法
  // 例 this.afterAction(this.log, ["create"]);
  // this.log会在create方法调用后被调用。
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

  // 控制器方法的环绕方法
  // e.g. this.aroundAction(this.projectParams, this.log, ["create"]);
  // this.projectParams会在方法create被调用前被调用，而this.log会在方法create被调用后被调用。
  aroundAction(beforeAction, afterAction, methodNames) {
    if (!_.isFunction(beforeAction) || !_.isFunction(afterAction)) {
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
          await beforeAction(ctx);
          await method(ctx);
          await afterAction(ctx);
        };
      })();
    }
  }

  // 包装ctx.render,统一为前端js注入_data变量给window._data
  overrideRender(ctx) {
    const render = ctx.render;
    ctx.render = async (tpl, data) => {
      const obj = {
        _data: JSON.stringify(data)
      };
      return render(tpl, lodash.merge(data, obj));
    };
  }
}

export default BaseController;
