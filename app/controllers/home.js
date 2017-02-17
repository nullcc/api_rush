import BaseController from './base';

class HomeController extends BaseController {

  constructor() {
    super();
    // this.beforeAction(this.before, ["test"]);
    // this.afterAction(this.after, ["test"]);
    // this.aroundAction(this.before, this.after, ["test"]);
  };

  // 首页
  async index(ctx) {
    await ctx.render('home/index.njk');
  };

  async test(ctx) {
    console.log('in test');
    ctx.body = {data: 1};
  };

  async before() {
    console.log('before action');
  };

  async after() {
    console.log('after action');
  };

}

export default new HomeController();
