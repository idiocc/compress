# @goa/compress

[![npm version](https://badge.fury.io/js/%40goa%2Fcompress.svg)](https://www.npmjs.com/package/@goa/compress)

`@goa/compress` is Compression Middleware For Goa Apps.

```sh
yarn add @goa/compress
npm install @goa/compress
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
- [`compress(config): !Middleware`](#compressconfig-compressconfig-middleware)
  * [`CompressConfig`](#type-compressconfig)
- [Copyright & License](#copyright--license)

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/0.svg?sanitize=true">
</a></p>

## API

The package is available by importing its default function:

```js
import compress from '@goa/compress'
```

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/1.svg?sanitize=true">
</a></p>

## <code><ins>compress</ins>(</code><sub><br/>&nbsp;&nbsp;`config: !CompressConfig,`<br/></sub><code>): <i>!Middleware</i></code>
Compression Middleware For Goa Apps.

 - <kbd><strong>config*</strong></kbd> <em><code>[!CompressConfig](#type-compressconfig)</code></em>: The config.

__<a name="type-compressconfig">`CompressConfig`</a>__


|    Name     |                Type                 |                                                          Description                                                          | Default |
| ----------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------- |
| threshold   | <em>number</em>                     | Minimum response size in bytes to compress.                                                                                   | `1024`  |
| flush       | <em>number</em>                     | Default: `zlib.constants.Z_NO_FLUSH`.                                                                                         | -       |
| finishFlush | <em>number</em>                     | Default: `zlib.constants.Z_FINISH`.                                                                                           | -       |
| chunkSize   | <em>number</em>                     | Default: `16*1024`.                                                                                                           | -       |
| windowBits  | <em>number</em>                     | Support extend types.                                                                                                         | -       |
| level       | <em>number</em>                     | Compression only.                                                                                                             | -       |
| memLevel    | <em>number</em>                     | Compression only.                                                                                                             | -       |
| strategy    | <em>number</em>                     | Compression only.                                                                                                             | -       |
| dictionary  | <em>*</em>                          | Deflate/inflate only, empty dictionary by default.                                                                            | -       |
| filter      | <em>(type?: string) => boolean</em> | An optional function that checks the response content type to decide whether to compress. By default, it uses `compressible`. | -       |

```js
import { aqt } from 'rqt'
import Goa from '@goa/koa'
import compress from '../compile'
import packageJson from '../package'

const goa = new Goa()
goa.use(compress())
goa.use(ctx => {
  ctx.body = packageJson
})

goa.listen(async function() {
  const url = 'http://localhost:' + this.address().port
  const { headers } = await aqt(url)
  console.log(headers)
  this.close()
})
```
```js
{ vary: 'Accept-Encoding',
  'content-type': 'application/json; charset=utf-8',
  'content-encoding': 'gzip',
  date: 'Mon, 23 Dec 2019 05:51:02 GMT',
  connection: 'close',
  'transfer-encoding': 'chunked' }
```

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/2.svg?sanitize=true">
</a></p>

## Copyright & License

GNU Affero General Public License v3.0

[Original work](https://github.com/koajs/compress) by _Jonathan Ong_ under MIT license found in [COPYING](COPYING).

<table>
  <tr>
    <th>
      <a href="https://artd.eco">
        <img width="100" src="https://raw.githubusercontent.com/wrote/wrote/master/images/artdeco.png"
          alt="Art Deco">
      </a>
    </th>
    <th>© <a href="https://artd.eco">Art Deco</a> for <a href="https://idio.cc">Idio</a> 2019</th>
    <th>
      <a href="https://idio.cc">
        <img src="https://avatars3.githubusercontent.com/u/40834161?s=100" width="100" alt="Idio">
      </a>
    </th>
    <th>
      <a href="https://www.technation.sucks" title="Tech Nation Visa">
        <img width="100" src="https://raw.githubusercontent.com/idiocc/cookies/master/wiki/arch4.jpg"
          alt="Tech Nation Visa">
      </a>
    </th>
    <th><a href="https://www.technation.sucks">Tech Nation Visa Sucks</a></th>
  </tr>
</table>

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/-1.svg?sanitize=true">
</a></p>