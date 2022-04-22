import Router from 'koa-router'
import axios from 'axios'
import { createHmac } from 'crypto'

export const router = new Router()

axios.defaults.baseURL = process.env.SUMSUB_API_ROOT || 'https://api.sumsub.com'

const SUMSUB_APP_TOKEN = process.env.SUMSUB_APP_TOKEN
const SUMSUB_APP_SECRET_KEY = process.env.SUMSUB_APP_SECRET_KEY


router.get('/api/kyc/access_token/:levelName/:userId', async (ctx, next) => {
  const { userId, levelName } = ctx.params
  const url = `/resources/accessTokens?userId=${
    encodeURIComponent(userId)}&levelName=${
    encodeURIComponent(levelName)}&ttlInSecs=600`
  const timestamp = '' + Math.floor((Date.now() / 1000))
  const secret = SUMSUB_APP_SECRET_KEY
  const signatureSource = timestamp + 'POST' + url
  const signature = createHmac('sha256', secret).update(signatureSource).digest('hex')
  const headers = {
    'X-App-Token': SUMSUB_APP_TOKEN,
    'X-App-Access-Sig': signature,
    'X-App-Access-Ts': timestamp
  }
  return axios.post(url, null, { headers }).then(response => {
    ctx.body = JSON.stringify(response.data)
  }).catch((err) => {
    ctx.body = JSON.stringify(err.response.data)
  })
})

export default router
