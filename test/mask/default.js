import makeTestSuite from '@zoroaster/mask'
import Context from '../context'
import compress from '../../src'

// export default
makeTestSuite('test/result/default', {
  async getResults() {
    const res = await compress({
      text: this.input,
    })
    return res
  },
  context: Context,
})