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
- [`compress(config): !_goa.Middleware`](#compressconfig-_goacompressconfig-_goamiddleware)
  * [`_goa.CompressConfig`](#type-_goacompressconfig)
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

## <code><ins>compress</ins>(</code><sub><br/>&nbsp;&nbsp;`config: !_goa.CompressConfig,`<br/></sub><code>): <i>!_goa.Middleware</i></code>
Compression Middleware For Goa Apps.

 - <kbd><strong>config*</strong></kbd> <em><code>[!_goa.CompressConfig](#type-_goacompressconfig)</code></em>: The config.

<strong><a name="type-_goacompressconfig">`_goa.CompressConfig`</a></strong>


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
import compress from '@goa/compress'

(async () => {
  const res = await compress({
    text: 'example',
  })
  console.log(res)
})()
```
```

```

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/2.svg?sanitize=true">
</a></p>

## Copyright & License

GNU Affero General Public License v3.0

[Original work](https://github.com/koajs/compress) by _Jonathan Ong_ under MIT license found in [COPYING](COPYING).

<table>
  <tr>
    <td><img src="https://avatars3.githubusercontent.com/u/38815725?v=4&amp;s=100" alt="idiocc"></td>
    <td>© <a href="https://www.idio.cc">Idio™</a> 2019</td>
  </tr>
</table>

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/-1.svg?sanitize=true">
</a></p>