/**
 * @fileoverview
 * @externs
 */

/* typal types/index.xml externs */
/** @const */
var _goa = {}
/**
 * @extends {zlib.ZlibOptions}
 * @record
 */
_goa.CompressConfig
/**
 * Minimum response size in bytes to compress. Default `1024`.
 * @type {number|undefined}
 */
_goa.CompressConfig.prototype.threshold
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
