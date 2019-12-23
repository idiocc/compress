import compressible from './compressible'
import isJSON from '@goa/goa/modules/koa-is-json'
import { empty } from '@goa/statuses'
import Stream from 'stream'
import { createGzip, createDeflate } from 'zlib'
import bytes from './bytes'

/**
 * Encoding methods supported.
 */
const encodingMethods = {
  gzip: createGzip,
  deflate: createDeflate,
}

/**
 * @type {_goa.compress}
 */
function Compress(options = {}) {
  let { filter = compressible, threshold = 1024 } = options
  if (typeof threshold == 'string') threshold = bytes(threshold)

  /**
   * @type {!_idio.Middleware}
   */
  async function middleware(ctx, next) {
    ctx.vary('Accept-Encoding')

    await next()

    let { body } = ctx
    if (!body) return
    if (ctx.res.headersSent || !ctx.writable) return
    if (ctx.compress === false) return
    if (ctx.request.method == 'HEAD') return
    if (empty[ctx.response.status]) return
    if (ctx.response.get('Content-Encoding')) return

    // forced compression or implied
    if (!(ctx.compress === true || filter(ctx.response.type))) return

    // identity
    const encoding = /** @type {string} */ (ctx.acceptsEncodings('gzip', 'deflate', 'identity'))
    if (!encoding) ctx.throw(406, 'supported encodings: gzip, deflate, identity')
    if (encoding == 'identity') return

    // json
    if (isJSON(body)) body = ctx.body = JSON.stringify(body)

    // threshold
    if (threshold && ctx.response.length < threshold) return

    ctx.set('Content-Encoding', encoding)
    ctx.res.removeHeader('Content-Length')

    const stream = ctx.body = encodingMethods[encoding](options)

    if (body instanceof Stream) {
      body.pipe(stream)
    } else {
      stream.end(body)
    }
  }
  return /** @type {!_goa.Middleware} */ (middleware)
}

export default Compress

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('@typedefs/idio').Middleware} _idio.Middleware
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('..').CompressConfig} _goa.CompressConfig
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('..').compress} _goa.compress
 */