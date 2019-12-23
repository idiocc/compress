import compress from '../src'

(async () => {
  const res = await compress({
    text: 'example',
  })
  console.log(res)
})()