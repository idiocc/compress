const { _compress } = require('./compress')

/**
 * Compression Middleware For Goa Apps.
 * @param {!_goa.CompressConfig} config
 * @param {number} [config.threshold=1024] Minimum response size in bytes to compress. Default `1024`.
 * @param {(type?: string) => boolean} [config.filter] An optional function that checks the response content type to decide whether to compress. By default, it uses `compressible`.
 * @return {!_goa.Middleware}
 */
function compress(config) {
  return _compress(config)
}

module.exports = compress

/* typal types/index.xml namespace */
/**
 * @typedef {import('zlib').ZlibOptions} zlib.ZlibOptions
 * @typedef {_goa.CompressConfig} CompressConfig `＠record`
 * @typedef {zlib.ZlibOptions & _goa.$CompressConfig} _goa.CompressConfig `＠record`
 * @typedef {Object} _goa.$CompressConfig `＠record`
 * @prop {number} [threshold=1024] Minimum response size in bytes to compress. Default `1024`.
 * @prop {(type?: string) => boolean} [filter] An optional function that checks the response content type to decide whether to compress. By default, it uses `compressible`.
 */

/* typal types/api.xml namespace */
/**
 * @typedef {import('@typedefs/goa').Middleware} _goa.Middleware
 * @typedef {_goa.compress} compress Compression Middleware For Goa Apps.
 * @typedef {(config: !_goa.CompressConfig) => !_goa.Middleware} _goa.compress Compression Middleware For Goa Apps.
 */
