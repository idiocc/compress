const { _compress } = require('./compress')

/**
 * Compression Middleware For Goa Apps.
 * @param {!_goa.CompressConfig} config
 * @param {number} [config.threshold=1024] Minimum response size in bytes to compress. Default `1024`.
 * @param {number} [config.flush] Default: `zlib.constants.Z_NO_FLUSH`.
 * @param {number} [config.finishFlush] Default: `zlib.constants.Z_FINISH`.
 * @param {number} [config.chunkSize] Default: `16*1024`.
 * @param {number} [config.windowBits] Support extend types.
 * @param {number} [config.level] Compression only.
 * @param {number} [config.memLevel] Compression only.
 * @param {number} [config.strategy] Compression only.
 * @param {*} [config.dictionary] Deflate/inflate only, empty dictionary by default.
 * @param {(type?: string) => boolean} [config.filter] An optional function that checks the response content type to decide whether to compress. By default, it uses `compressible`.
 * @return {!_goa.Middleware}
 */
function compress(config) {
  return _compress(config)
}

module.exports = compress

/* typal types/index.xml namespace */
/**
 * @typedef {_goa.CompressConfig} CompressConfig `＠record`
 * @typedef {Object} _goa.CompressConfig `＠record`
 * @prop {number} [threshold=1024] Minimum response size in bytes to compress. Default `1024`.
 * @prop {number} [flush] Default: `zlib.constants.Z_NO_FLUSH`.
 * @prop {number} [finishFlush] Default: `zlib.constants.Z_FINISH`.
 * @prop {number} [chunkSize] Default: `16*1024`.
 * @prop {number} [windowBits] Support extend types.
 * @prop {number} [level] Compression only.
 * @prop {number} [memLevel] Compression only.
 * @prop {number} [strategy] Compression only.
 * @prop {*} [dictionary] Deflate/inflate only, empty dictionary by default.
 * @prop {(type?: string) => boolean} [filter] An optional function that checks the response content type to decide whether to compress. By default, it uses `compressible`.
 */

/* typal types/api.xml namespace */
/**
 * @typedef {import('@typedefs/goa').Middleware} _goa.Middleware
 * @typedef {_goa.compress} compress Compression Middleware For Goa Apps.
 * @typedef {(config: !_goa.CompressConfig) => !_goa.Middleware} _goa.compress Compression Middleware For Goa Apps.
 */
