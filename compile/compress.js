#!/usr/bin/env node
'use strict';
const stream = require('stream');
const zlib = require('zlib');             /*
 compressible
 Copyright(c) 2013 Jonathan Ong
 Copyright(c) 2014 Jeremiah Senkpiel
 Copyright(c) 2015 Douglas Christopher Wilson
 MIT Licensed
*/
const f=require("mime-db"),k=/^text\/|\+(?:json|text|xml)$/i,p=/^\s*([^;\s]*)(?:;|\s|$)/;function w(a){if(!a||"string"!=typeof a)return!1;a=(a=p.exec(a))&&a[1].toLowerCase();const b=f[a];return b&&"compressible"in b?b.compressible:k.test(a)||null};/*
 MIT
 Jonathan Ong
 https://npmjs.org/koa-is-json
*/
var x={[100]:"Continue",[101]:"Switching Protocols",[102]:"Processing",[103]:"Early Hints",[200]:"OK",[201]:"Created",[202]:"Accepted",[203]:"Non-Authoritative Information",[204]:"No Content",[205]:"Reset Content",[206]:"Partial Content",[207]:"Multi-Status",[208]:"Already Reported",[226]:"IM Used",[300]:"Multiple Choices",[301]:"Moved Permanently",[302]:"Found",[303]:"See Other",[304]:"Not Modified",[305]:"Use Proxy",[306]:"(Unused)",[307]:"Temporary Redirect",[308]:"Permanent Redirect",[400]:"Bad Request",
[401]:"Unauthorized",[402]:"Payment Required",[403]:"Forbidden",[404]:"Not Found",[405]:"Method Not Allowed",[406]:"Not Acceptable",[407]:"Proxy Authentication Required",[408]:"Request Timeout",[409]:"Conflict",[410]:"Gone",[411]:"Length Required",[412]:"Precondition Failed",[413]:"Payload Too Large",[414]:"URI Too Long",[415]:"Unsupported Media Type",[416]:"Range Not Satisfiable",[417]:"Expectation Failed",[418]:"I'm a teapot",[421]:"Misdirected Request",[422]:"Unprocessable Entity",[423]:"Locked",
[424]:"Failed Dependency",[425]:"Unordered Collection",[426]:"Upgrade Required",[428]:"Precondition Required",[429]:"Too Many Requests",[431]:"Request Header Fields Too Large",[451]:"Unavailable For Legal Reasons",[500]:"Internal Server Error",[501]:"Not Implemented",[502]:"Bad Gateway",[503]:"Service Unavailable",[504]:"Gateway Timeout",[505]:"HTTP Version Not Supported",[506]:"Variant Also Negotiates",[507]:"Insufficient Storage",[508]:"Loop Detected",[509]:"Bandwidth Limit Exceeded",[510]:"Not Extended",
[511]:"Network Authentication Required"};/*
 statuses
 Copyright(c) 2014 Jonathan Ong
 Copyright(c) 2016 Douglas Christopher Wilson
 MIT Licensed
*/
y();const z={[204]:!0,[205]:!0,[304]:!0};function y(){var a=A;const b=[];Object.keys(x).forEach(d=>{const c=x[d];d=Number(d);a[d]=c;a[c]=d;a[c.toLowerCase()]=d;b.push(d)})}
function A(a){if("number"==typeof a){if(!A[a])throw Error("invalid status code: "+a);return a}if("string"!=typeof a)throw new TypeError("code must be a number or string");var b=parseInt(a,10);if(!isNaN(b)){if(!A[b])throw Error("invalid status code: "+b);return b}b=A[a.toLowerCase()];if(!b)throw Error('invalid status message: "'+a+'"');return b};var B=stream;const C=stream.Readable,D=stream.Transform;/*
 bytes
 Copyright(c) 2012-2014 TJ Holowaychuk
 Copyright(c) 2015 Jed Watson
 MIT Licensed
*/
const E=/(?:\.0*|(\.[^0]+)0+)$/,F={i:1,c:1024,f:1048576,b:1073741824,h:Math.pow(1024,4),g:Math.pow(1024,5)};var G=/^((-|\+)?(\d+(?:\.\d+)?)) *(kb|mb|gb|tb|pb)$/i;
function H(a){if("string"==typeof a){if("number"!==typeof a||isNaN(a))if("string"!==typeof a)a=null;else{var b=G.exec(a);b?(a=parseFloat(b[1]),b=b[4].toLowerCase()):(a=parseInt(a,10),b="b");a=Math.floor(F[b]*a)}}else if("number"==typeof a)if(Number.isFinite(a)){var d=Math.abs(a);b="",b=d>=F.g?"PB":d>=F.h?"TB":d>=F.b?"GB":d>=F.f?"MB":d>=F.c?"KB":"B";a=(a/F[b.toLowerCase()]).toFixed(2);a=a.replace(E,"$1");a+=b}else a=null;else a=null;return a};const I={gzip:zlib.createGzip,deflate:zlib.createDeflate};module.exports={_compress:function(a={}){let {filter:b=w,threshold:d=1024}=a;"string"==typeof d&&(d=H(d));return async function(c,e){c.vary("Accept-Encoding");await e();({body:e}=c);if(e&&!c.res.headersSent&&c.writable&&!1!==c.compress&&"HEAD"!=c.request.method&&!z[c.response.status]&&!c.response.get("Content-Encoding")&&(!0===c.compress||b(c.response.type))){var g=c.acceptsEncodings("gzip","deflate","identity");g||c.throw(406,"supported encodings: gzip, deflate, identity");if("identity"!=g){e&&"string"!=
typeof e&&"function"!=typeof e.pipe&&!Buffer.isBuffer(e)&&(e=c.body=JSON.stringify(e));if(d)if(c.body instanceof C){const q=c.body;let r=0,t=!1,u;const {a:J,callback:v}=await new Promise((m,K)=>{const h=new D({transform(l,L,n){this.push(l);t?n():(r+=l.length,r>d?(t=!0,m({a:this,callback:n})):n())}});h.once("finish",()=>m({a:h}));q.once("error",l=>{u=l;m({})});h.once("error",K);q.pipe(h);h.pause()});if(u)return;e=J;e.resume();if(!v){c.body=e;return}v()}else if(c.response.length<d)return;c.set("Content-Encoding",
g);c.res.removeHeader("Content-Length");g=c.body=I[g](a);e instanceof B?(c.app.emit("use","@goa/compress","stream"),e.pipe(g)):(c.app.emit("use","@goa/compress","data"),g.end(e))}}}}};

//# sourceMappingURL=compress.js.map