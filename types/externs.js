/**
 * @fileoverview
 * @externs
 */

/* typal types/index.xml externs */
/** @const */
var _goa = {}
/**
 * @record
 */
_goa.CompressConfig
/**
 * Minimum response size in bytes to compress. Default `1024`.
 * @type {number|undefined}
 */
_goa.CompressConfig.prototype.threshold
/**
 * Default: `zlib.constants.Z_NO_FLUSH`.
 * @type {number|undefined}
 */
_goa.CompressConfig.prototype.flush
/**
 * Default: `zlib.constants.Z_FINISH`.
 * @type {number|undefined}
 */
_goa.CompressConfig.prototype.finishFlush
/**
 * Default: `16*1024`.
 * @type {number|undefined}
 */
_goa.CompressConfig.prototype.chunkSize
/**
 * Support extend types.
 * @type {number|undefined}
 */
_goa.CompressConfig.prototype.windowBits
/**
 * Compression only.
 * @type {number|undefined}
 */
_goa.CompressConfig.prototype.level
/**
 * Compression only.
 * @type {number|undefined}
 */
_goa.CompressConfig.prototype.memLevel
/**
 * Compression only.
 * @type {number|undefined}
 */
_goa.CompressConfig.prototype.strategy
/**
 * Deflate/inflate only, empty dictionary by default.
 * @type {(*)|undefined}
 */
_goa.CompressConfig.prototype.dictionary
/**
 * An optional function that checks the response content type to decide whether to compress. By default, it uses `compressible`.
 * @type {(function(string=): boolean)|undefined}
 */
_goa.CompressConfig.prototype.filter = function(type) {}

/* typal types/api.xml externs */
/**
 * Compression Middleware For Goa Apps.
 * @typedef {function(!_goa.CompressConfig): !_goa.Middleware}
 */
_goa.compress
