import compressible from './compressible'
import isJSON from '@goa/goa/modules/koa-is-json'
import { empty } from '@goa/statuses'
import Stream, { Readable, Transform } from 'stream'
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
    if (threshold) {
      if (ctx.body instanceof Readable) {
        const st = /** @type {!stream.Readable} */ (ctx.body)
        let totalLength = 0
        let resolved = false
        let error
        const { newStream, callback } = await new Promise((re, j) => {
          const r = new Transform(/** @type {!stream.TransformOptions} */({
            transform(data, enc, cb) {
              this.push(data)
              if (resolved) {
                cb()
                return
              }
              totalLength += data.length
              if (totalLength > threshold) {
                resolved = true
                re({ newStream: this, callback: cb })
              } else cb()
            },
          }))
          r.once('finish', () => re({ newStream: r }))
          st.once('error', (err) => {
            error = err
            re({})
          })
          r.once('error', j)
          st.pipe(r)
          r.pause()
        })

        if (error) return // handled by Koa
        body = newStream
        body.resume()
        if (!callback) {
          ctx.body = body
          return
        }
        callback()
      } else if (ctx.response.length < threshold) return
    }

    ctx.set('Content-Encoding', encoding)
    ctx.res.removeHeader('Content-Length')

    const compression = ctx.body = encodingMethods[encoding](options)

    if (body instanceof Stream) {
      body.pipe(compression)
    } else {
      compression.end(body)
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
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('stream').Readable} stream.Readable
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('stream').TransformOptions} stream.TransformOptions
 */