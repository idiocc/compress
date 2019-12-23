const { _compress } = require('./compress')

/**
 * @methodType {_compress.compress}
 */
function compress(config) {
  return _compress(config)
}

module.exports = compress

/* typal types/index.xml namespace */
