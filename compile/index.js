const { _compress } = require('./compress')

/**
 * Compression Middleware For Goa Apps.
 * @param {!_compress.Config} config Options for the program.
 * @param {boolean} [config.shouldRun=true] A boolean option. Default `true`.
 * @param {string} [config.text] A text to return.
 * @return {Promise<string>}
 */
function compress(config) {
  return _compress(config)
}

module.exports = compress

/* typal types/index.xml namespace */
/**
 * @typedef {_compress.Config} Config `＠record` Options for the program.
 * @typedef {Object} _compress.Config `＠record` Options for the program.
 * @prop {boolean} [shouldRun=true] A boolean option. Default `true`.
 * @prop {string} [text] A text to return.
 */
