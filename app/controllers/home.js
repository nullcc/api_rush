// 首页
exports.index = async(ctx) => {
  await ctx.render('home/index.njk');
};
