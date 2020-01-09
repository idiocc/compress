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
- [Usage Events](#usage-events)
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

<strong><a name="type-compressconfig">`CompressConfig`</a> extends <a href="https://nodejs.org/api/zlib.html#zlib_class_options" title="Each zlib-based class takes an options object. All options are optional.">`zlib.ZlibOptions`</a></strong>


|   Name    |                Type                 |                                                          Description                                                          | Default |
| --------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------- |
| threshold | <em>number</em>                     | Minimum response size in bytes to compress.                                                                                   | `1024`  |
| filter    | <em>(type?: string) => boolean</em> | An optional function that checks the response content type to decide whether to compress. By default, it uses `compressible`. | -       |

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
  date: 'Thu, 09 Jan 2020 14:35:12 GMT',
  connection: 'close',
  'transfer-encoding': 'chunked' }
```

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/2.svg?sanitize=true">
</a></p>

## Usage Events

This middleware integrates with [_Idio_](https://github.com/idiocc/idio) that collects middleware usage statistics to reward package maintainers. It will emit certain events to bill its usage:

1. `stream`: When the compression is applied to stream.
1. `data`: When non-stream body is compressed.

The usage is recorded via the `ctx.neoluddite` context property set by a server such as _Idio_. In future, more fine-grained usage events might appear.

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/3.svg?sanitize=true">
</a></p>

## Copyright & License

GNU Affero General Public License v3.0

Affero GPL means that you're not allowed to use this middleware on the web unless you release the source code for your application. This is a restrictive license which has the purpose of defending Open Source work and its creators.

Please refer to the [Idio license agreement](https://github.com/idiocc/idio#copyright--license) for more info on dual-licensing. You're allowed to use this middleware without disclosing the source code if you sign up on [neoluddite.dev](https://neoluddite.dev) package reward scheme.

[Original work](https://github.com/koajs/compress) by _Jonathan Ong_ under MIT license found in [COPYING](COPYING).

<table>
  <tr>
    <th>
      <a href="https://artd.eco">
        <img width="100" src="https://raw.githubusercontent.com/wrote/wrote/master/images/artdeco.png"
          alt="Art Deco">
      </a>
    </th>
    <th>© <a href="https://artd.eco">Art Deco</a> for <a href="https://idio.cc">Idio</a> 2020</th>
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