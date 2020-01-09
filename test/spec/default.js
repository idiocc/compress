import { equal } from '@zoroaster/assert'
import pckg from '../../package'
import Context from '../context'
import compress from '../../src'
import { Readable } from 'stream'

/** @type {TestSuite} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof compress, 'function')
  },
  async 'calls package without error'() {
    await compress()
  },
  async 'doesnt compress below threshold'({ startPlain, app }) {
    app.use(compress())
    app.use((ctx) => {
      ctx.body = 'ok google'
    })
    await startPlain(app.callback())
      .get('/')
      .assert(200, 'ok google')
      .assert('content-encoding', null)
  },
  async 'does not compresses a buffer'({ startPlain, app }) {
    app.use(compress())
    app.use((ctx) => {
      ctx.body = new Buffer(JSON.stringify(pckg))
    })
    await startPlain(app.callback())
      .get('/')
      .assert('content-encoding', null)
  },
  async 'compresses JSON'({ startPlain, app }) {
    app.use(compress())
    app.use((ctx) => {
      ctx.body = pckg
    })
    await startPlain(app.callback())
      .get('/')
      .assert(200)
      .assert('content-encoding', 'gzip')
  },
}

/** @type {TestSuite} */
export const stream = {
  context: Context,
  async 'compresses a stream with threshold'({ startPlain, app }) {
    app.use(compress())
    app.use((ctx) => {
      ctx.type = 'application/json'
      const r = new Readable({
        read() {
          this.push(JSON.stringify(pckg))
          this.push(null)
        },
      })
      ctx.body = r
    })
    await startPlain(app.callback())
      .get('/')
      .assert(200, { ...pckg })
      .assert('content-encoding', 'gzip')
  },
  async 'compresses an async stream with threshold'({ startPlain, app }) {
    app.use(compress())
    app.use((ctx) => {
      ctx.type = 'application/json'
      const data = Buffer.from(JSON.stringify(pckg))
      let read = 0
      const r = new Readable({
        async read() {
          await new Promise(re => setTimeout(re, 1))
          const after = read + 100
          const d = data.slice(read, after)
          this.push(d)
          read = after
          if (after > data.length)
            this.push(null)
        },
      })
      ctx.body = r
    })
    await startPlain(app.callback())
      .get('/')
      .assert(200, { ...pckg })
      .assert('content-encoding', 'gzip')
  },
  errors: {
    async 'before sync threshold'({ startPlain, app }) {
      app.use(compress())
      app.use((ctx) => {
        ctx.type = 'application/json'
        const data = Buffer.from(JSON.stringify(pckg))
        let read = 0
        let destroying = false
        const r = new Readable({
          read() {
            if (destroying) return
            const after = read + 100
            const d = data.slice(read, after)
            this.push(d)
            read = after
            if (after > 500) {
              destroying = true
              this.destroy(new Error('stream error'))
            }
          },
        })
        ctx.body = r
      })
      await startPlain(app.callback())
        .get('/')
        .assert(500)
    },
    async 'after threshold on sync'({ text, startPlain, app }) {
      app.use(compress({
        threshold: 200,
      }))
      app.use((ctx) => {
        ctx.type = 'html'
        const data = Buffer.from(text)
        let read = 0
        let destroying = false
        const r = new Readable({
          read() {
            if (destroying) return
            const after = read + 50
            const d = data.slice(read, after)
            this.push(d)
            read = after
            if (after > 250) {
              destroying = true
              this.destroy(new Error('stream error'))
            }
          },
        })
        ctx.body = r
      })
      await startPlain(app.callback())
        .get('/')
        .assert(500)
    },
    async 'before threshold on async'({ text, startPlain, app }) {
      app.use(compress({
        threshold: 200,
      }))
      app.use((ctx) => {
        ctx.type = 'html'
        const data = Buffer.from(text)
        let read = 0
        let destroying = false
        const r = new Readable({
          async read() {
            await new Promise(re => setTimeout(re, 1))
            if (destroying) return
            const after = read + 50
            const d = data.slice(read, after)
            this.push(d)
            read = after
            if (after > 50) {
              destroying = true
              this.destroy(new Error('stream error'))
            }
          },
        })
        ctx.body = r
      })
      await startPlain(app.callback())
        .get('/')
        .assert(500)
    },
  },
  async 'sends data before async stream error after threshold'({ text, startPlain, app }) {
    app.use(compress({
      threshold: 200,
    }))
    app.use((ctx) => {
      ctx.type = 'html'
      const data = Buffer.from(text)
      let read = 0
      let destroying = false
      const r = new Readable({
        async read() {
          await new Promise(re => setTimeout(re, 1))
          if (destroying) return
          const after = read + 50
          const d = data.slice(read, after)
          this.push(d)
          read = after
          if (after > 250) {
            destroying = true
            this.destroy(new Error('stream error'))
          }
        },
      })
      ctx.body = r
    })
    await startPlain(app.callback())
      .get('/')
      .assert(200, `I stood in silence where I was, for I did not know what to do. Of bell or knocker there was no sign. Through these frowning walls and dark window openings it was not likely that my voice could penetrate. The time I waited seemed endless, and I felt doubts and fears crowding upon me. What sort of pla`)
  },
  async 'does not compress a stream with lower threshold'({ startPlain, app }) {
    app.use(compress())
    app.use((ctx) => {
      ctx.type = 'html'
      const r = new Readable({
        read() {
          this.push('test')
          this.push(null)
        },
      })
      ctx.body = r
    })
    await startPlain(app.callback())
      .get('/')
      .assert(200, 'test')
      .assert('content-encoding', null)
  },
  async 'does not compress an async stream with lower threshold'({ text, startPlain, app }) {
    app.use(compress({
      threshold: text.length + 1,
    }))
    app.use((ctx) => {
      ctx.type = 'html'
      const data = Buffer.from(text)
      let read = 0
      let destroying = false
      const r = new Readable({
        async read() {
          await new Promise(re => setTimeout(re, 1))
          if (destroying) return
          const after = read + 50
          const d = data.slice(read, after)
          this.push(d)
          read = after
          if (after > text.length) {
            this.push(null)
          }
        },
      })
      ctx.body = r
    })
    await startPlain(app.callback())
      .get('/')
      .assert(200, text)
      .assert('content-encoding', null)
  },
}

/** @type {TestSuite} */
export const events = {
  async 'emits use event on streams'({ startPlain, app }) {
    const p = new Promise((r) => {
      app.on('use', (pck, item) => {
        r({ package: pck, item })
      })
    })
    app.use(compress())
    app.use((ctx) => {
      ctx.type = 'application/json'
      const data = Buffer.from(JSON.stringify(pckg))
      let read = 0
      const r = new Readable({
        async read() {
          await new Promise(re => setTimeout(re, 1))
          const after = read + 100
          const d = data.slice(read, after)
          this.push(d)
          read = after
          if (after > data.length)
            this.push(null)
        },
      })
      ctx.body = r
    })
    await startPlain(app.callback())
      .get('/')
      .assert(200, { ...pckg })
      .assert('content-encoding', 'gzip')
    return await p
  },
  async 'emits use event on buffer'({ startPlain, app }) {
    const p = new Promise((r) => {
      app.on('use', (pck, item) => {
        r({ package: pck, item })
      })
    })
    app.use(compress())
    app.use((ctx) => {
      ctx.type = 'application/json'
      ctx.body = pckg
    })
    await startPlain(app.callback())
      .get('/')
      .assert(200, pckg)
      .assert('content-encoding', 'gzip')
    return await p
  },
}

/**
 * @typedef {import('../context').TestSuite} TestSuite
 */

export default T