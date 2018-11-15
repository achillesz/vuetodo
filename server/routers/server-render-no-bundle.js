const ejs = require('ejs');

module.exports = async (ctx, renderer, template, bundle) => {
  console.log('into...')
  ctx.headers['Content-Type'] = 'text/html'

  const context = { url: ctx.path, user: ctx.session.user };
  console.log(ctx.session.user, '--------------0')
  try {
    const app = await bundle(context);

    // 有路径变化 比如请求数据的时候检查检测到前端路由已经重定向 那么后端
    if (context.router.currentRoute.fullPath !== ctx.path) {
      return ctx.redirect(context.router.currentRoute.fullPath);
    }

    const appString = await renderer.renderToString(app, context);
    // const appString = await renderer.renderToString(context);
    console.log('_________ 4');

    const { title } = context.meta.inject();

    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      scripts: context.renderScripts(),
      title: title.text(),
      initalState: context.renderState()
    });

    ctx.body = html;
  } catch (err) {
    console.log('render error', err);
    throw err;
  }
}
