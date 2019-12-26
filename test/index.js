import alamode from 'alamode'
alamode({
  matcher(path) {
    if (/koa-is-json/.test(path)) return true
    if (/@goa\/goa/.test(path)) return true
    if (/node_modules/.test(path)) return false
    return true
  },
  ignoreNodeModules: false,
})