const Router = require('koa-router')
const userRouter = new Router({
  prefix: '/user'
})

userRouter.post('/login', async ctx => {
  const user = ctx.request.body
  if (user.username === 'achilles' && user.password === "achilles123456") {
    ctx.session.user = {
      username: 'achilles'
    }

    ctx.body = {
      success: true,
      data: {
        username: 'achilles'
      }
    }
  } else {
    ctx.status = 300
    ctx.body = {
      success: false,
      message: 'username or password error'
    }
  }
})

module.exports = userRouter;
