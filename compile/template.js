const { _compress } = require('./compress')

/**
 * @methodType {_goa.compress}
 */
function compress(config) {
  return _compress(config)
}

module.exports = compress

/* typal types/index.xml namespace */

/* typal types/api.xml namespace */
