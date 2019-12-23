import { c } from 'erte'

/**
 * Compression Middleware For Goa Apps.
 * @param {!_compress.Config} [config] Options for the program.
 * @param {boolean} [config.shouldRun=true] A boolean option. Default `true`.
 * @param {string} [config.text] A text to return.
 */
export default async function compress(config = {}) {
  const {
    shouldRun = true,
    text = '',
  } = config
  if (!shouldRun) return
  console.log('@goa/compress called with %s', c(text, 'yellow'))
  return text
}

/**
 * @typedef {import('..').Config} _compress.Config
 */
