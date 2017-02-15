import BaseController from './base';
// import { classWithPrivateMethods, privateMethod } from 'class-private-method-decorator';

// @classWithPrivateMethods
class HomeController extends BaseController {

  constructor() {
    super();
    this.beforeAction(this.before, ["test"]);
    this.afterAction(this.after, ["test"]);
  };

  // 首页
  async index(ctx) {
    await ctx.render('home/index.njk');
  };

  async test(ctx) {
    // this.homeParams(ctx);
    console.log('in test');
    ctx.body = {data: 1};
  };

  async before() {
    console.log('before action');
  };

  async after() {
    console.log('after action');
  };

  // @privateMethod
  // async homeParams(ctx) {
  //   console.log('hello, ' + this.controller);
  // };

}

export default new HomeController();
