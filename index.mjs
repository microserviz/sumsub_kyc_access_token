import Koa from 'koa'
import router from './src/routes.mjs'
import cors from '@koa/cors'


const app = new Koa()

if (process.env.CORS_ORIGIN) {
  app.use(cors({ origin: process.env.CORS_ORIGIN }))
} else {
  app.use(cors())
}

if (process.env.LOG) {
  app.use(async (ctx, next) => {
    await next()
    const rt = ctx.response.get('X-Response-Time')
    console.log(`${ctx.method} ${ctx.url} - ${rt}`)
  })


  // x-response-time
  app.use(async (ctx, next) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    ctx.set('X-Response-Time', `${ms}ms`)
  })
}

// routes
app.use(router.routes())
  .use(router.allowedMethods())

// app start
app.listen(process.env.PORT || 3000)
