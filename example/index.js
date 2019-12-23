import { aqt } from 'rqt'
import Goa from '@goa/koa'
import compress from '../compile'
import packageJson from '../package'

const goa = new Goa()
goa.use(compress())
goa.use(ctx => {
  ctx.body = packageJson
})

goa.listen(async function() {
  const url = 'http://localhost:' + this.address().port
  const { headers } = await aqt(url)
  console.log(headers)
  this.close()
})