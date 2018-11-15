const ejs = require('ejs');

module.exports = async (ctx, renderer, template) => {
  console.log('into...')
  ctx.headers['Content-Type'] = 'text/html'

  const context = { url: ctx.path, user: ctx.session.user };
  console.log('heheh', '--------------0')
  try {
    const appString = await renderer.renderToString(context);
    console.log('_________ 4');

    if (context.router.currentRoute.fullPath !== ctx.path) {
      return ctx.redirect(context.router.currentRoute.fullPath);
    }

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
