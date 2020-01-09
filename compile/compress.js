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
const f=require("mime-db"),k=/^text\/|\+(?:json|text|xml)$/i,p=/^\s*([^;\s]*)(?:;|\s|$)/;function w(a){if(!a||"string"!=typeof a)return!1;a=(a=p.exec(a))&&a[1].toLowerCase();const c=f[a];return c&&"compressible"in c?c.compressible:k.test(a)||null};/*
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
y();const z={[204]:!0,[205]:!0,[304]:!0};function y(){var a=A;const c=[];Object.keys(x).forEach(d=>{const b=x[d];d=Number(d);a[d]=b;a[b]=d;a[b.toLowerCase()]=d;c.push(d)})}
function A(a){if("number"==typeof a){if(!A[a])throw Error("invalid status code: "+a);return a}if("string"!=typeof a)throw new TypeError("code must be a number or string");var c=parseInt(a,10);if(!isNaN(c)){if(!A[c])throw Error("invalid status code: "+c);return c}c=A[a.toLowerCase()];if(!c)throw Error('invalid status message: "'+a+'"');return c};var B=stream;const C=stream.Readable,D=stream.Transform;/*
 bytes
 Copyright(c) 2012-2014 TJ Holowaychuk
 Copyright(c) 2015 Jed Watson
 MIT Licensed
*/
const E=/(?:\.0*|(\.[^0]+)0+)$/,F={i:1,c:1024,f:1048576,b:1073741824,h:Math.pow(1024,4),g:Math.pow(1024,5)};var G=/^((-|\+)?(\d+(?:\.\d+)?)) *(kb|mb|gb|tb|pb)$/i;
function H(a){if("string"==typeof a){if("number"!==typeof a||isNaN(a))if("string"!==typeof a)a=null;else{var c=G.exec(a);c?(a=parseFloat(c[1]),c=c[4].toLowerCase()):(a=parseInt(a,10),c="b");a=Math.floor(F[c]*a)}}else if("number"==typeof a)if(Number.isFinite(a)){var d=Math.abs(a);c="",c=d>=F.g?"PB":d>=F.h?"TB":d>=F.b?"GB":d>=F.f?"MB":d>=F.c?"KB":"B";a=(a/F[c.toLowerCase()]).toFixed(2);a=a.replace(E,"$1");a+=c}else a=null;else a=null;return a};const I={gzip:zlib.createGzip,deflate:zlib.createDeflate};module.exports={_compress:function(a={}){let {filter:c=w,threshold:d=1024}=a;"string"==typeof d&&(d=H(d));return async function(b,e){b.vary("Accept-Encoding");await e();({body:e}=b);if(e&&!b.res.headersSent&&b.writable&&!1!==b.compress&&"HEAD"!=b.request.method&&!z[b.response.status]&&!b.response.get("Content-Encoding")&&(!0===b.compress||c(b.response.type))){var g=b.acceptsEncodings("gzip","deflate","identity");g||b.throw(406,"supported encodings: gzip, deflate, identity");if("identity"!=g){e&&"string"!=
typeof e&&"function"!=typeof e.pipe&&!Buffer.isBuffer(e)&&(e=b.body=JSON.stringify(e));if(d)if(b.body instanceof C){const q=b.body;let r=0,t=!1,u;const {a:J,callback:v}=await new Promise((m,K)=>{const h=new D({transform(l,L,n){this.push(l);t?n():(r+=l.length,r>d?(t=!0,m({a:this,callback:n})):n())}});h.once("finish",()=>m({a:h}));q.once("error",l=>{u=l;m({})});h.once("error",K);q.pipe(h);h.pause()});if(u)return;e=J;e.resume();if(!v){b.body=e;return}v()}else if(b.response.length<d)return;b.set("Content-Encoding",
g);b.res.removeHeader("Content-Length");g=b.body=I[g](a);e instanceof B?(b.neoluddite&&b.neoluddite("@goa/compress","stream"),e.pipe(g)):(b.neoluddite&&b.neoluddite("@goa/compress","data"),g.end(e))}}}}};

//# sourceMappingURL=compress.js.map