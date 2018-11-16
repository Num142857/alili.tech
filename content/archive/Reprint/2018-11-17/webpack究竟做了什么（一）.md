---
title: 'webpack究竟做了什么（一）' 
date: 2018-11-17 2:30:13
hidden: true
slug: jpar2xwxqk
categories: reprint
---

{{< raw >}}
<p>&#x4ECA;&#x65F6;&#x4ECA;&#x65E5;&#xFF0C;&#x505A;&#x524D;&#x7AEF;&#x4E0D;&#x7528;&#x4E2A;webpack&#x597D;&#x50CF;&#x90FD;&#x88AB;&#x65F6;&#x4EE3;&#x629B;&#x5F03;&#x4E86;&#x4E00;&#x6837;&#xFF0C;&#x6BCF;&#x5929;&#x5F00;&#x53D1;&#x7684;&#x65F6;&#x5019;npm run dev&#xFF0C;&#x8BE5;&#x4E0A;&#x7EBF;&#x4E86;npm run build&#xFF0C;&#x53CD;&#x6B63;&#x6267;&#x884C;&#x4E2A;&#x547D;&#x4EE4;&#x5237;&#x5237;&#x5730;&#x5C31;&#x6253;&#x5305;&#x597D;&#x4E86;&#xFF0C;&#x4F60;&#x6839;&#x672C;&#x65E0;&#x9700;&#x77E5;&#x9053;&#x6267;&#x884C;&#x547D;&#x4EE4;&#x4E4B;&#x540E;&#x6574;&#x4E2A;&#x8FC7;&#x7A0B;&#x7A76;&#x7ADF;&#x5E72;&#x4E86;&#x4EC0;&#x4E48;&#x3002;webpack&#x5C31;&#x50CF;&#x4E2A;&#x9ED1;&#x76D2;&#xFF0C;&#x4F60;&#x5F97;&#x5C0F;&#x5FC3;&#x7FFC;&#x7FFC;&#x9075;&#x5FAA;&#x5B83;&#x7684;&#x914D;&#x7F6E;&#x884C;&#x4E8B;&#xFF0C;&#x914D;&#x597D;&#x4E86;&#x5C31;&#x4E07;&#x5E78;&#x3002;&#x8FD9;&#x4F7F;&#x5F97;&#x6211;&#x5F88;&#x957F;&#x4E00;&#x6BB5;&#x65F6;&#x95F4;&#x4EE5;&#x6765;&#xFF0C;&#x90FD;&#x5BF9;webpack&#x6BD5;&#x606D;&#x6BD5;&#x656C;&#xFF0C;&#x80FD;&#x8DD1;&#x8D77;&#x6765;&#x7684;&#x4EE3;&#x7801;&#x5C31;&#x662F;&#x6700;&#x597D;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x5343;&#x4E07;&#x522B;&#x4E71;&#x52A8;&#x914D;&#x7F6E;&#x3002;<br>&#x7EC8;&#x4E8E;&#x6709;&#x4E00;&#x5929;&#xFF0C;&#x6211;&#x5FCD;&#x4E0D;&#x4F4F;&#x8981;&#x641E;&#x6E05;&#x695A;webpack&#x7A76;&#x7ADF;&#x505A;&#x4E86;&#x4EC0;&#x4E48;&#x3002;</p><h2 id="articleHeader0">&#x6211;&#x4EEC;&#x4E3A;&#x4EC0;&#x4E48;&#x9700;&#x8981;webpack</h2><p>&#x53BB;&#x641E;&#x6E05;&#x695A;webpack&#x505A;&#x4E86;&#x4EC0;&#x4E48;&#x4E4B;&#x524D;&#xFF0C;&#x6211;&#x89C9;&#x5F97;&#x9996;&#x5148;&#x8981;&#x601D;&#x8003;&#x4E00;&#x4E0B;&#x6211;&#x4EEC;&#x4E3A;&#x4EC0;&#x4E48;&#x9700;&#x8981;webpack&#xFF0C;&#x5B83;&#x7A76;&#x7ADF;&#x89E3;&#x51B3;&#x4E86;&#x4EC0;&#x4E48;&#x75DB;&#x70B9;&#x3002;&#x60F3;&#x60F3;&#x6211;&#x4EEC;&#x65E5;&#x5E38;&#x642C;&#x7816;&#x7684;&#x573A;&#x666F;&#xFF1A;<br>1.&#x5F00;&#x53D1;&#x7684;&#x65F6;&#x5019;&#x9700;&#x8981;&#x4E00;&#x4E2A;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#xFF0C;&#x8981;&#x662F;&#x6211;&#x4EEC;&#x4FEE;&#x6539;&#x4E00;&#x4E0B;&#x4EE3;&#x7801;&#x4FDD;&#x5B58;&#x4E4B;&#x540E;&#x6D4F;&#x89C8;&#x5668;&#x5C31;&#x81EA;&#x52A8;&#x5C55;&#x73B0;&#x6700;&#x65B0;&#x7684;&#x4EE3;&#x7801;&#x90A3;&#x5C31;&#x597D;&#x4E86;&#xFF08;&#x70ED;&#x66F4;&#x65B0;&#x670D;&#x52A1;&#xFF09;<br>2.&#x672C;&#x5730;&#x5199;&#x4EE3;&#x7801;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x8981;&#x662F;&#x8C03;&#x540E;&#x7AEF;&#x7684;&#x63A5;&#x53E3;&#x4E0D;&#x8DE8;&#x57DF;&#x5C31;&#x597D;&#x4E86;&#xFF08;&#x4EE3;&#x7406;&#x670D;&#x52A1;&#xFF09;<br>3.&#x4E3A;&#x4E86;&#x8DDF;&#x4E0A;&#x65F6;&#x4EE3;&#xFF0C;&#x8981;&#x662F;&#x80FD;&#x7528;&#x4E0A;&#x4EC0;&#x4E48;ES678N&#x7B49;&#x7B49;&#x65B0;&#x4E1C;&#x897F;&#x5C31;&#x597D;&#x4E86;&#xFF08;&#x7FFB;&#x8BD1;&#x670D;&#x52A1;&#xFF09;<br>4.&#x9879;&#x76EE;&#x8981;&#x4E0A;&#x7EBF;&#x4E86;&#xFF0C;&#x8981;&#x662F;&#x80FD;&#x4E00;&#x952E;&#x538B;&#x7F29;&#x4EE3;&#x7801;&#x554A;&#x56FE;&#x7247;&#x4EC0;&#x4E48;&#x7684;&#x5C31;&#x597D;&#x4E86;&#xFF08;&#x538B;&#x7F29;&#x6253;&#x5305;&#x670D;&#x52A1;&#xFF09;<br>5.&#x6211;&#x4EEC;&#x5E73;&#x65F6;&#x7684;&#x9759;&#x6001;&#x8D44;&#x6E90;&#x90FD;&#x662F;&#x653E;&#x5230;CDN&#x4E0A;&#x7684;&#xFF0C;&#x8981;&#x662F;&#x80FD;&#x81EA;&#x52A8;&#x5E2E;&#x6211;&#x628A;&#x8FD9;&#x4E9B;&#x641E;&#x597D;&#x7684;&#x9759;&#x6001;&#x8D44;&#x6E90;&#x603C;&#x5230;CDN&#x53BB;&#x5C31;&#x597D;&#x4E86;&#xFF08;&#x81EA;&#x52A8;&#x4E0A;&#x4F20;&#x670D;&#x52A1;&#xFF09;<br>&#x5DF4;&#x62C9;&#x5DF4;&#x62C9;&#x7B49;&#x7B49;&#x670D;&#x52A1;&#xFF0C;&#x90A3;&#x4E48;&#x591A;&#x4F60;&#x9700;&#x8981;&#x7684;&#x670D;&#x52A1;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x6253;&#x4E00;&#x4E2A;&#x54CD;&#x6307;&#xFF0C;&#x8FD9;&#x4E9B;&#x670D;&#x52A1;&#x90FD;&#x6709;&#x6761;&#x4E0D;&#x7D0A;&#x5730;&#x6267;&#x884C;&#x597D;&#xFF0C;&#x5C82;&#x4E0D;&#x662F;&#x7F8E;&#x6ECB;&#x6ECB;&#xFF01;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x9700;&#x8981;webpack&#x5E2E;&#x6211;&#x4EEC;&#x53BB;&#x6574;&#x5408;&#x90A3;&#x4E48;&#x591A;&#x670D;&#x52A1;&#xFF0C;&#x800C;node&#x7684;&#x51FA;&#x73B0;&#xFF0C;&#x8D4B;&#x4E88;&#x4E86;&#x6211;&#x4EEC;&#x53BB;&#x64CD;&#x4F5C;&#x7CFB;&#x7EDF;&#x7684;&#x80FD;&#x529B;&#xFF0C;&#x8FD9;&#x624D;&#x6709;&#x4E86;&#x6211;&#x4EEC;&#x4ECA;&#x5929;&#x7684;&#x5E78;&#x798F;&#xFF08;kubi&#xFF09;&#x751F;&#x6D3B;(manong)&#x3002;<br>&#x6240;&#x4EE5;&#x6211;&#x89C9;&#x5F97;&#x8981;&#x6839;&#x636E;&#x81EA;&#x5DF1;&#x7684;&#x9700;&#x6C42;&#x6765;&#x4F7F;&#x7528;webpack&#xFF0C;&#x77E5;&#x9053;&#x81EA;&#x5DF1;&#x9700;&#x8981;&#x4EC0;&#x4E48;&#x6837;&#x7684;&#x670D;&#x52A1;&#xFF0C;webpack&#x80FD;&#x4E0D;&#x80FD;&#x63D0;&#x4F9B;&#x8FD9;&#x6837;&#x7684;&#x670D;&#x52A1;&#xFF0C;&#x5982;&#x679C;&#x53EF;&#x4EE5;&#xFF0C;&#x90A3;&#x4E48;&#x8FD9;&#x4E2A;&#x670D;&#x52A1;&#x5E94;&#x8BE5;&#x5728;&#x6784;&#x5EFA;&#x4E2D;&#x7684;&#x54EA;&#x4E2A;&#x73AF;&#x8282;&#x88AB;&#x5904;&#x7406;&#x3002;</p><ul><li>&#x5982;&#x679C;&#x4E0E;&#x8F93;&#x5165;&#x76F8;&#x5173;&#x7684;&#x9700;&#x6C42;&#xFF0C;&#x627E;entry&#xFF08;&#x6BD4;&#x5982;&#x591A;&#x9875;&#x9762;&#x5C31;&#x6709;&#x591A;&#x4E2A;&#x5165;&#x53E3;&#xFF09;</li><li>&#x5982;&#x679C;&#x4E0E;&#x8F93;&#x51FA;&#x76F8;&#x5173;&#x7684;&#x9700;&#x6C42;&#xFF0C;&#x627E;output&#xFF08;&#x6BD4;&#x5982;&#x4F60;&#x9700;&#x8981;&#x5B9A;&#x4E49;&#x8F93;&#x51FA;&#x6587;&#x4EF6;&#x7684;&#x8DEF;&#x5F84;&#x3001;&#x540D;&#x5B57;&#x7B49;&#x7B49;&#xFF09;</li><li>&#x5982;&#x679C;&#x4E0E;&#x6A21;&#x5757;&#x5BFB;&#x5740;&#x76F8;&#x5173;&#x7684;&#x9700;&#x6C42;&#xFF0C;&#x627E;resolve&#xFF08;&#x6BD4;&#x5982;&#x5B9A;&#x4E49;&#x522B;&#x540D;alias&#xFF09;</li><li>&#x5982;&#x679C;&#x4E0E;&#x8F6C;&#x8BD1;&#x76F8;&#x5173;&#x7684;&#x9700;&#x6C42;&#xFF0C;&#x627E;loader&#xFF08;&#x6BD4;&#x5982;&#x5904;&#x7406;sass&#x5904;&#x7406;es678N&#xFF09;</li><li>&#x5982;&#x679C;&#x4E0E;&#x6784;&#x5EFA;&#x6D41;&#x7A0B;&#x76F8;&#x5173;&#x7684;&#x9700;&#x6C42;&#xFF0C;&#x627E;plugin&#xFF08;&#x6BD4;&#x5982;&#x6211;&#x9700;&#x8981;&#x5728;&#x6253;&#x5305;&#x5B8C;&#x6210;&#x540E;&#xFF0C;&#x5C06;&#x6253;&#x5305;&#x597D;&#x7684;&#x6587;&#x4EF6;&#x590D;&#x5236;&#x5230;&#x67D0;&#x4E2A;&#x76EE;&#x5F55;&#xFF0C;&#x7136;&#x540E;&#x63D0;&#x4EA4;&#x5230;git&#x4E0A;&#xFF09;</li></ul><p>&#x62BD;&#x4E1D;&#x5265;&#x8327;&#x4E4B;&#x540E;&#xFF0C;&#x53BB;&#x7406;&#x89E3;&#x8FD9;&#x4E9B;&#x7684;&#x6D41;&#x7A0B;&#xFF0C;&#x4F60;&#x5C31;&#x80FD;&#x4ECE;webpack&#x90A3;&#x4E00;&#x5768;&#x5768;&#x7684;&#x914D;&#x7F6E;&#x4E2D;&#xFF0C;&#x5B9A;&#x4F4D;&#x5230;&#x4F60;&#x9700;&#x6C42;&#x88AB;webpack&#x5904;&#x7406;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x6700;&#x540E;&#x52A0;&#x4E0A;&#x76F8;&#x5E94;&#x7684;&#x914D;&#x7F6E;&#x5373;&#x53EF;&#x3002;</p><h2 id="articleHeader1">webpack&#x6253;&#x5305;&#x51FA;&#x6765;&#x7684;&#x4EC0;&#x4E48;</h2><p>webpack&#x641E;&#x4E86;&#x5F88;&#x591A;&#x4E1C;&#x897F;&#xFF0C;&#x4F46;&#x6700;&#x7EC8;&#x4EA7;&#x51FA;&#x7684;&#x65E0;&#x975E;&#x5C31;&#x662F;&#x7ECF;&#x8FC7;&#x91CD;&#x91CD;&#x670D;&#x52A1;&#x5904;&#x7406;&#x8FC7;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x90A3;&#x4E48;&#x8FD9;&#x4E9B;&#x4EE3;&#x7801;&#x662F;&#x600E;&#x6837;&#x7684;&#x5462;&#xFF1F;<br>&#x9996;&#x5148;&#x6211;&#x4EEC;&#x5148;&#x6765;&#x770B;&#x770B;&#x5165;&#x53E3;&#x6587;&#x4EF6;index.js&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(&apos;index&apos;)
const one = require(&apos;./module/one.js&apos;)
const two = require(&apos;./module/two.js&apos;)
one()
two()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs livecodeserver"><code>console.<span class="hljs-built_in">log</span>(<span class="hljs-string">&apos;index&apos;</span>)
const <span class="hljs-literal">one</span> = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./module/one.js&apos;</span>)
const <span class="hljs-literal">two</span> = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./module/two.js&apos;</span>)
<span class="hljs-literal">one</span>()
<span class="hljs-literal">two</span>()</code></pre><p>&#x55EF;&#xFF0C;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x6CA1;&#x4EC0;&#x4E48;&#x7279;&#x522B;&#xFF0C;&#x5F15;&#x5165;&#x4E86;&#x4E24;&#x4E2A;&#x6A21;&#x5757;&#xFF0C;&#x6700;&#x540E;&#x6267;&#x884C;&#x4E86;&#x5B83;&#x4EEC;&#x4E00;&#x4E0B;&#x3002;&#x5176;&#x4E2D;one.js&#x548C;two.js&#x7684;&#x4EE3;&#x7801;&#x4E5F;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x5C31;&#x662F;&#x5BFC;&#x51FA;&#x4E86;&#x4E2A;&#x51FD;&#x6570;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// one.js
module.exports = function () {
  console.log(&apos;one&apos;)
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// one.js</span>
<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;one&apos;</span>)
}</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// two.js
module.exports = function () {
  console.log(&apos;two&apos;)
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// two.js</span>
<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;two&apos;</span>)
}</code></pre><p>&#x597D;&#x4E86;&#xFF0C;&#x5C31;&#x662F;&#x8FD9;&#x4E48;&#x7B80;&#x5355;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x653E;&#x5230;webpack&#x6253;&#x5305;&#x51FA;&#x6765;&#x7684;&#x662F;&#x4EC0;&#x4E48;&#x5462;&#xFF1F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/******/ (function(modules) { // webpackBootstrap
/******/     // The module cache
/******/     var installedModules = {};
/******/
/******/     // The require function
/******/     function __webpack_require__(moduleId) {
/******/
/******/         // Check if module is in cache
/******/         if(installedModules[moduleId]) {
/******/             return installedModules[moduleId].exports;
/******/         }
/******/         // Create a new module (and put it into the cache)
/******/         var module = installedModules[moduleId] = {
/******/             i: moduleId,
/******/             l: false,
/******/             exports: {}
/******/         };
/******/
/******/         // Execute the module function
/******/         modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/         // Flag the module as loaded
/******/         module.l = true;
/******/
/******/         // Return the exports of the module
/******/         return module.exports;
/******/     }
/******/
/******/
/******/     // expose the modules object (__webpack_modules__)
/******/     __webpack_require__.m = modules;
/******/
/******/     // expose the module cache
/******/     __webpack_require__.c = installedModules;
/******/
/******/     // define getter function for harmony exports
/******/     __webpack_require__.d = function(exports, name, getter) {
/******/         if(!__webpack_require__.o(exports, name)) {
/******/             Object.defineProperty(exports, name, {
/******/                 configurable: false,
/******/                 enumerable: true,
/******/                 get: getter
/******/             });
/******/         }
/******/     };
/******/
/******/     // getDefaultExport function for compatibility with non-harmony modules
/******/     __webpack_require__.n = function(module) {
/******/         var getter = module &amp;&amp; module.__esModule ?
/******/             function getDefault() { return module[&apos;default&apos;]; } :
/******/             function getModuleExports() { return module; };
/******/         __webpack_require__.d(getter, &apos;a&apos;, getter);
/******/         return getter;
/******/     };
/******/
/******/     // Object.prototype.hasOwnProperty.call
/******/     __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/     // __webpack_public_path__
/******/     __webpack_require__.p = &quot;&quot;;
/******/
/******/     // Load entry module and return exports
/******/     return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

console.log(&apos;index&apos;)
const one = __webpack_require__(1)
const two = __webpack_require__(2)
one()
two()


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = function () {
  console.log(&apos;one&apos;)
}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function () {
  console.log(&apos;two&apos;)
}

/***/ })
/******/ ]);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dart"><code><span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span> (function(modules) { <span class="hljs-comment">// webpackBootstrap</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-comment">// The module cache</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-keyword">var</span> installedModules = {};
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-comment">// The require function</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     function __webpack_require__(moduleId) {
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-comment">// Check if module is in cache</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-keyword">if</span>(installedModules[moduleId]) {
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             <span class="hljs-keyword">return</span> installedModules[moduleId].exports;
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         }
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-comment">// Create a new module (and put it into the cache)</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-keyword">var</span> module = installedModules[moduleId] = {
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             i: moduleId,
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             l: <span class="hljs-keyword">false</span>,
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             exports: {}
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         };
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-comment">// Execute the module function</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-comment">// Flag the module as loaded</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         module.l = <span class="hljs-keyword">true</span>;
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-comment">// Return the exports of the module</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-keyword">return</span> module.exports;
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     }
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-comment">// expose the modules object (__webpack_modules__)</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     __webpack_require__.m = modules;
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-comment">// expose the module cache</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     __webpack_require__.c = installedModules;
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-comment">// define getter function for harmony exports</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     __webpack_require__.d = function(exports, name, getter) {
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-keyword">if</span>(!__webpack_require__.o(exports, name)) {
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             <span class="hljs-built_in">Object</span>.defineProperty(exports, name, {
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>                 configurable: <span class="hljs-keyword">false</span>,
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>                 enumerable: <span class="hljs-keyword">true</span>,
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>                 <span class="hljs-keyword">get</span>: getter
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             });
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         }
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     };
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-comment">// getDefaultExport function for compatibility with non-harmony modules</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     __webpack_require__.n = function(module) {
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-keyword">var</span> getter = module &amp;&amp; module.__esModule ?
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             function getDefault() { <span class="hljs-keyword">return</span> module[<span class="hljs-string">&apos;default&apos;</span>]; } :
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             function getModuleExports() { <span class="hljs-keyword">return</span> module; };
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         __webpack_require__.d(getter, <span class="hljs-string">&apos;a&apos;</span>, getter);
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-keyword">return</span> getter;
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     };
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-comment">// Object.prototype.hasOwnProperty.call</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     __webpack_require__.o = function(object, property) { <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.hasOwnProperty.call(object, property); };
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-comment">// __webpack_public_path__</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     __webpack_require__.p = <span class="hljs-string">&quot;&quot;</span>;
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-comment">// Load entry module and return exports</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-keyword">return</span> __webpack_require__(__webpack_require__.s = <span class="hljs-number">0</span>);
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span> })
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span>**/</span></span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span> ([
<span class="hljs-comment">/* 0 */</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-emphasis">***</span>/</span></span> (function(module, exports, __webpack_require__) {

console.log(<span class="hljs-string">&apos;index&apos;</span>)
<span class="hljs-keyword">const</span> one = __webpack_require__(<span class="hljs-number">1</span>)
<span class="hljs-keyword">const</span> two = __webpack_require__(<span class="hljs-number">2</span>)
one()
two()


<span class="hljs-comment"><span class="markdown">/<span class="hljs-emphasis">***</span>/</span></span> }),
<span class="hljs-comment">/* 1 */</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-emphasis">***</span>/</span></span> (function(module, exports) {

module.exports = function () {
  console.log(<span class="hljs-string">&apos;one&apos;</span>)
}

<span class="hljs-comment"><span class="markdown">/<span class="hljs-emphasis">***</span>/</span></span> }),
<span class="hljs-comment">/* 2 */</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-emphasis">***</span>/</span></span> (function(module, exports) {

module.exports = function () {
  console.log(<span class="hljs-string">&apos;two&apos;</span>)
}

<span class="hljs-comment"><span class="markdown">/<span class="hljs-emphasis">***</span>/</span></span> })
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span> ]);</code></pre><p>&#x771F;&#x662F;&#x4E0D;&#x5FCD;&#x76F4;&#x89C6;&#x2026;&#x2026;&#x6211;&#x5199;&#x5F97;&#x8FD9;&#x4E48;&#x7B80;&#x6D01;&#x4F18;&#x96C5;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x7ECF;&#x8FC7;webpack&#x7684;&#x5904;&#x7406;&#x540E;&#x5982;&#x6B64;&#x4E0D;&#x582A;&#x5165;&#x76EE;&#xFF01;&#x4F46;&#x4E3A;&#x4E86;&#x641E;&#x6E05;&#x695A;&#x8FD9;&#x5768;&#x4E1C;&#x897F;&#x7A76;&#x7ADF;&#x505A;&#x4E86;&#x4EC0;&#x4E48;&#xFF0C;&#x6211;&#x4E0D;&#x5F97;&#x4E0D;&#x5FCD;&#x4E11;&#x53BB;&#x5C06;&#x5B83;&#x7B80;&#x5316;&#x4E86;&#x4E00;&#x4E0B;&#x3002;</p><h2 id="articleHeader2">&#x7B80;&#x5316;webpack&#x6253;&#x5305;&#x51FA;&#x6765;&#x7684;&#x4EE3;&#x7801;</h2><p>&#x5176;&#x5B9E;&#x8FDB;&#x8FC7;&#x7B80;&#x5316;&#x540E;&#x5C31;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x8FD9;&#x4E9B;&#x4EE3;&#x7801;&#x610F;&#x56FE;&#x5341;&#x5206;&#x660E;&#x663E;&#xFF0C;&#x4E5F;&#x662F;&#x6211;&#x4EEC;&#x5341;&#x5206;&#x719F;&#x6089;&#x7684;&#x5957;&#x8DEF;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function (modules) {
    const require = function (moduleId) {
      const module = {}
      module.exports = null
      modules[moduleId].call(module, module, require)
      return module.exports
    }
    require(0)
})([
function (module, require) {
    console.log(&apos;index&apos;)
    const one = require(1)
    const two = require(2)
    one()
    two()
},
function (module, require) {
    module.exports = function () {
        console.log(&apos;one&apos;)
    }
},
function (module, require) {
    module.exports = function () {
        console.log(&apos;two&apos;)
    }
}])" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">modules</span>) </span>{
    <span class="hljs-keyword">const</span> <span class="hljs-built_in">require</span> = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">moduleId</span>) </span>{
      <span class="hljs-keyword">const</span> <span class="hljs-built_in">module</span> = {}
      <span class="hljs-built_in">module</span>.exports = <span class="hljs-literal">null</span>
      modules[moduleId].call(<span class="hljs-built_in">module</span>, <span class="hljs-built_in">module</span>, <span class="hljs-built_in">require</span>)
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">module</span>.exports
    }
    <span class="hljs-built_in">require</span>(<span class="hljs-number">0</span>)
})([
<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">module, require</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;index&apos;</span>)
    <span class="hljs-keyword">const</span> one = <span class="hljs-built_in">require</span>(<span class="hljs-number">1</span>)
    <span class="hljs-keyword">const</span> two = <span class="hljs-built_in">require</span>(<span class="hljs-number">2</span>)
    one()
    two()
},
<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">module, require</span>) </span>{
    <span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;one&apos;</span>)
    }
},
<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">module, require</span>) </span>{
    <span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;two&apos;</span>)
    }
}])</code></pre><p>&#x8FD9;&#x6837;&#x770B;&#x53EF;&#x80FD;&#x4F1A;&#x76F4;&#x89C2;&#x4E00;&#x70B9;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbfbwm?w=1047&amp;h=863" src="https://static.alili.tech/img/bVbfbwm?w=1047&amp;h=863" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span><br>&#x4F60;&#x4F1A;&#x770B;&#x5230;&#x8FD9;&#x4E0D;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x6302;&#x5728;&#x5634;&#x8FB9;&#x7684;&#x81EA;&#x6267;&#x884C;&#x51FD;&#x6570;&#x5417;&#xFF1F;&#x7136;&#x540E;&#x53C2;&#x6570;&#x662F;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x8FD9;&#x4E2A;&#x6570;&#x7EC4;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x7684;&#x6A21;&#x5757;&#xFF0C;&#x5F53;require(0)&#x7684;&#x65F6;&#x5019;&#x5C31;&#x4F1A;&#x6267;&#x884C;&#x8FD9;&#x4E2A;&#x6570;&#x7EC4;&#x7D22;&#x5F15;&#x4E3A;0&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x4EE5;&#x6B64;&#x7C7B;&#x63A8;&#x800C;&#x8FBE;&#x5230;&#x6A21;&#x5757;&#x5316;&#x7684;&#x6548;&#x679C;&#x3002;&#x8FD9;&#x91CC;&#x6709;&#x4E2A;&#x5173;&#x952E;&#x70B9;&#xFF0C;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x660E;&#x660E;&#x5199;&#x7684;&#x65F6;&#x5019;&#x662F;require(&apos;./module/one.js&apos;)&#xFF0C;&#x600E;&#x4E48;&#x6700;&#x540E;&#x51FA;&#x6765;&#x53EF;&#x4EE5;&#x53D8;&#x6210;require(1)&#x5462;&#xFF1F;</p><h2 id="articleHeader3">&#x8BA9;&#x6211;&#x4EEC;&#x81EA;&#x5DF1;&#x6765;&#x64B8;&#x4E00;&#x4E2A;</h2><p>&#x6CA1;&#x6709;&#x4EC0;&#x4E48;&#x6BD4;&#x81EA;&#x5DF1;&#x64B8;&#x4E00;&#x4E2A;&#x7406;&#x89E3;&#x5F97;&#x66F4;&#x900F;&#x5F7B;&#x4E86;&#x3002;&#x6211;&#x4EEC;&#x6839;&#x636E;&#x4E0A;&#x9762;&#x7684;&#x6700;&#x7EC8;&#x6253;&#x5305;&#x7684;&#x7ED3;&#x679C;&#x6765;&#x634B;&#x4E00;&#x634B;&#x8981;&#x505A;&#x4E00;&#x4E9B;&#x4EC0;&#x4E48;&#x4E8B;&#x60C5;&#x3002;<br>1.&#x89C2;&#x5BDF;&#x4E00;&#x4E0B;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x4E00;&#x4E2A;&#x81EA;&#x6267;&#x884C;&#x51FD;&#x6570;&#xFF0C;&#x8FD9;&#x91CC;&#x9762;&#x9700;&#x8981;&#x63A7;&#x5236;&#x7684;&#x662F;&#x8FD9;&#x4E2A;&#x81EA;&#x6267;&#x884C;&#x51FD;&#x6570;&#x7684;&#x4F20;&#x53C2;&#xFF0C;&#x5C31;&#x662F;&#x90A3;&#x4E2A;&#x6570;&#x7EC4;<br>2.&#x8FD9;&#x4E2A;&#x6570;&#x7EC4;&#x662F;&#x6BCB;&#x5BB9;&#x7F6E;&#x7591;&#x662F;&#x6839;&#x636E;&#x4F9D;&#x8D56;&#x5173;&#x7CFB;&#x6765;&#x5F62;&#x6210;&#x7684;<br>3.&#x6211;&#x4EEC;&#x8981;&#x627E;&#x5230;&#x6240;&#x6709;&#x7684;require&#x7136;&#x540E;&#x5C06;require&#x7684;&#x8DEF;&#x5F84;&#x66FF;&#x6362;&#x6210;&#x5BF9;&#x5E94;&#x6570;&#x7EC4;&#x7684;&#x7D22;&#x5F15;<br>4.&#x5C06;&#x8FD9;&#x4E2A;&#x5904;&#x7406;&#x597D;&#x7684;&#x6587;&#x4EF6;&#x8F93;&#x51FA;&#x51FA;&#x6765;<br>ok&#xFF0C;&#x4E0A;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fs = require(&apos;fs&apos;)
const path = require(&apos;path&apos;)
const esprima = require(&apos;esprima&apos;)
const estraverse = require(&apos;estraverse&apos;)
// &#x5B9A;&#x4E49;&#x4E0A;&#x4E0B;&#x6587; &#x5373;&#x6240;&#x6709;&#x7684;&#x5BFB;&#x5740;&#x90FD;&#x6309;&#x7167;&#x8FD9;&#x4E2A;&#x57FA;&#x51C6;&#x8FDB;&#x884C;
const context = path.resolve(__dirname, &apos;../&apos;)
// &#x5904;&#x7406;&#x8DEF;&#x5F84;
const pathResolve = (data) =&gt; path.resolve(context, data)
// &#x5B9A;&#x4E49;&#x5168;&#x5C40;&#x6570;&#x636E;&#x683C;&#x5F0F;
const dataInfo = {
    // &#x5165;&#x53E3;&#x6587;&#x4EF6;&#x6E90;&#x7801;
    source: &apos;&apos;,
    // &#x5206;&#x6790;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x6E90;&#x7801;&#x5F97;&#x51FA;&#x7684;&#x4F9D;&#x8D56;&#x4FE1;&#x606F;
    requireInfo: null,
    // &#x6839;&#x636E;&#x4F9D;&#x8D56;&#x4FE1;&#x606F;&#x5F97;&#x51FA;&#x7684;&#x5404;&#x4E2A;&#x6A21;&#x5757;
    modules: null
}
/**
 * &#x8BFB;&#x53D6;&#x6587;&#x4EF6;
 * @param {String} path 
 */
const readFile = (path) =&gt; {
    return new Promise((resolve, reject) =&gt; {
        fs.readFile(path, function (err, data) {
            if (err) {
                console.log(err)
                reject(err)
                return
            }
            resolve(data)
        })
    })
}
/**
 * &#x5206;&#x6790;&#x5165;&#x53E3;&#x6E90;&#x7801;
 */
const getRequireInfo = () =&gt; {
    // &#x5404;&#x4E2A;&#x4F9D;&#x8D56;&#x7684;id &#x4ECE;1&#x5F00;&#x59CB;&#x662F;&#x56E0;&#x4E3A;0&#x662F;&#x5165;&#x53E3;&#x6587;&#x4EF6;
    let id = 1
    const ret = []
    // &#x4F7F;&#x7528;esprima&#x5C06;&#x5165;&#x53E3;&#x6E90;&#x7801;&#x89E3;&#x6790;&#x6210;ast
    const ast = esprima.parse(dataInfo.source, {range: true})
    // &#x4F7F;&#x7528;estraverse&#x904D;&#x5386;ast
    estraverse.traverse(ast, {
        enter (node) {
            // &#x7B5B;&#x9009;&#x51FA;require&#x8282;&#x70B9;
            if (node.type === &apos;CallExpression&apos; &amp;&amp; node.callee.name === &apos;require&apos; &amp;&amp; node.callee.type === &apos;Identifier&apos;) {
                // require&#x8DEF;&#x5F84;&#xFF0C;&#x5982;require(&apos;./index.js&apos;)&#xFF0C;&#x5219;requirePath = &apos;./index.js&apos;
                const requirePath = node.arguments[0]
                // &#x5C06;require&#x8DEF;&#x5F84;&#x8F6C;&#x4E3A;&#x7EDD;&#x5BF9;&#x8DEF;&#x5F84;
                const requirePathValue = pathResolve(requirePath.value)
                // &#x5982;require(&apos;./index.js&apos;)&#x4E2D;&apos;./index.js&apos;&#x5728;&#x6E90;&#x7801;&#x7684;&#x4F4D;&#x7F6E;
                const requirePathRange = requirePath.range
                ret.push({requirePathValue, requirePathRange, id})
                id++
            } 
        }
    })
    return ret
}
/**
 * &#x6A21;&#x5757;&#x6A21;&#x677F;
 * @param {String} content 
 */
const moduleTemplate = (content) =&gt; `function (module, require) {\n${content}\n},`
/**
 * &#x83B7;&#x53D6;&#x6A21;&#x5757;&#x4FE1;&#x606F;
 */
const getModules = async () =&gt; {
    const requireInfo = dataInfo.requireInfo
    const modules = []
    for (let i = 0, len = requireInfo.length; i &lt; len; i++) {
        const file = await readFile(requireInfo[i].requirePathValue)
        const content = moduleTemplate(file.toString())
        modules.push(content)
    }
    return modules
}
/**
 * &#x5C06;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x5982;require(&apos;./module/one.js&apos;)&#x7B49;&#x5BF9;&#x5E94;&#x6210;require(1)&#x6A21;&#x5757;id
 */
const replace = () =&gt; {
    const requireInfo = dataInfo.requireInfo
    // &#x9700;&#x8981;&#x5012;&#x5E8F;&#x5904;&#x7406;&#xFF0C;&#x56E0;&#x4E3A;&#x6BD4;&#x5982;&#x7B2C;&#x4E00;&#x4E2A;require(&apos;./module/one.js&apos;)&#x4E2D;&#x7684;&#x8DEF;&#x5F84;&#x662F;&#x5728;&#x6E90;&#x7801;&#x5B57;&#x7B26;&#x4E32;42-59&#x8FD9;&#x4E2A;&#x533A;&#x95F4;
    // &#x800C;&#x7B2C;&#x4E8C;&#x4E2A;require(&apos;./module/two.js&apos;)&#x4E2D;&#x7684;&#x8DEF;&#x5F84;&#x662F;&#x5728;&#x6E90;&#x7801;&#x5B57;&#x7B26;&#x4E32;82-99&#x8FD9;&#x4E2A;&#x533A;&#x95F4;&#xFF0C;&#x90A3;&#x4E48;&#x5982;&#x679C;&#x5148;&#x66FF;&#x6362;&#x4F4D;&#x7F6E;&#x8F83;&#x524D;&#x7684;&#x4EE3;&#x7801;
    // &#x5219;&#x6B64;&#x65F6;&#x6E90;&#x7801;&#x5B57;&#x7B26;&#x4E32;&#x5DF2;&#x7ECF;&#x5C11;&#x4E86;&#x4E00;&#x622A;&#xFF08;&#x4ECE;&apos;./module/one.js&apos;&#x53D8;&#x6210;1&#xFF09;&#xFF0C;&#x90A3;&#x7B2C;&#x4E8C;&#x4E2A;require&#x7684;&#x4F4D;&#x7F6E;&#x5C31;&#x4E0D;&#x5BF9;&#x4E86;
    const sortRequireInfo = requireInfo.sort((item1, item2) =&gt; item1.requirePathRange[0] &lt; item2.requirePathRange[0])
    sortRequireInfo.forEach(({requirePathRange, id}) =&gt; {
        const start = requirePathRange[0]
        const end = requirePathRange[1]
        const headerS = dataInfo.source.substr(0, start)
        const endS = dataInfo.source.substr(end)
        dataInfo.source = `${headerS}${id}${endS}`
    })
}
/**
 * &#x8F93;&#x51FA;&#x6253;&#x5305;&#x597D;&#x7684;&#x6587;&#x4EF6;
 */
const output = async () =&gt; {
    const data = await readFile(pathResolve(&apos;./template/indexTemplate.js&apos;))
    const indexModule = moduleTemplate(dataInfo.source)
    const allModules = [indexModule, ...dataInfo.modules].join(&apos;&apos;)
    const result = `${data.toString()}([\n${allModules}\n])`
    fs.writeFile(pathResolve(&apos;./build/output.js&apos;), result, function (err) {
        if (err) {
            throw err;
        }
    })
}
const main = async () =&gt; {
    // &#x8BFB;&#x53D6;&#x5165;&#x53E3;&#x6587;&#x4EF6;
    const data = await readFile(pathResolve(&apos;./index.js&apos;))
    dataInfo.source = data.toString()
    // &#x83B7;&#x53D6;&#x4F9D;&#x8D56;&#x4FE1;&#x606F;
    dataInfo.requireInfo = getRequireInfo()
    // &#x83B7;&#x53D6;&#x6A21;&#x5757;&#x4FE1;&#x606F;
    dataInfo.modules = await getModules()                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
    // &#x5C06;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x5982;require(&apos;./module/one.js&apos;)&#x7B49;&#x5BF9;&#x5E94;&#x6210;require(1)&#x6A21;&#x5757;id
    replace()
    // &#x8F93;&#x51FA;&#x6253;&#x5305;&#x597D;&#x7684;&#x6587;&#x4EF6;
    output()
    console.log(JSON.stringify(dataInfo))
}
main()
 " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;fs&apos;</span>)
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>)
<span class="hljs-keyword">const</span> esprima = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;esprima&apos;</span>)
<span class="hljs-keyword">const</span> estraverse = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;estraverse&apos;</span>)
<span class="hljs-comment">// &#x5B9A;&#x4E49;&#x4E0A;&#x4E0B;&#x6587; &#x5373;&#x6240;&#x6709;&#x7684;&#x5BFB;&#x5740;&#x90FD;&#x6309;&#x7167;&#x8FD9;&#x4E2A;&#x57FA;&#x51C6;&#x8FDB;&#x884C;</span>
<span class="hljs-keyword">const</span> context = path.resolve(__dirname, <span class="hljs-string">&apos;../&apos;</span>)
<span class="hljs-comment">// &#x5904;&#x7406;&#x8DEF;&#x5F84;</span>
<span class="hljs-keyword">const</span> pathResolve = <span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> path.resolve(context, data)
<span class="hljs-comment">// &#x5B9A;&#x4E49;&#x5168;&#x5C40;&#x6570;&#x636E;&#x683C;&#x5F0F;</span>
<span class="hljs-keyword">const</span> dataInfo = {
    <span class="hljs-comment">// &#x5165;&#x53E3;&#x6587;&#x4EF6;&#x6E90;&#x7801;</span>
    source: <span class="hljs-string">&apos;&apos;</span>,
    <span class="hljs-comment">// &#x5206;&#x6790;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x6E90;&#x7801;&#x5F97;&#x51FA;&#x7684;&#x4F9D;&#x8D56;&#x4FE1;&#x606F;</span>
    requireInfo: <span class="hljs-literal">null</span>,
    <span class="hljs-comment">// &#x6839;&#x636E;&#x4F9D;&#x8D56;&#x4FE1;&#x606F;&#x5F97;&#x51FA;&#x7684;&#x5404;&#x4E2A;&#x6A21;&#x5757;</span>
    modules: <span class="hljs-literal">null</span>
}
<span class="hljs-comment">/**
 * &#x8BFB;&#x53D6;&#x6587;&#x4EF6;
 * @param {String} path 
 */</span>
<span class="hljs-keyword">const</span> readFile = <span class="hljs-function">(<span class="hljs-params">path</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        fs.readFile(path, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, data</span>) </span>{
            <span class="hljs-keyword">if</span> (err) {
                <span class="hljs-built_in">console</span>.log(err)
                reject(err)
                <span class="hljs-keyword">return</span>
            }
            resolve(data)
        })
    })
}
<span class="hljs-comment">/**
 * &#x5206;&#x6790;&#x5165;&#x53E3;&#x6E90;&#x7801;
 */</span>
<span class="hljs-keyword">const</span> getRequireInfo = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-comment">// &#x5404;&#x4E2A;&#x4F9D;&#x8D56;&#x7684;id &#x4ECE;1&#x5F00;&#x59CB;&#x662F;&#x56E0;&#x4E3A;0&#x662F;&#x5165;&#x53E3;&#x6587;&#x4EF6;</span>
    <span class="hljs-keyword">let</span> id = <span class="hljs-number">1</span>
    <span class="hljs-keyword">const</span> ret = []
    <span class="hljs-comment">// &#x4F7F;&#x7528;esprima&#x5C06;&#x5165;&#x53E3;&#x6E90;&#x7801;&#x89E3;&#x6790;&#x6210;ast</span>
    <span class="hljs-keyword">const</span> ast = esprima.parse(dataInfo.source, {<span class="hljs-attr">range</span>: <span class="hljs-literal">true</span>})
    <span class="hljs-comment">// &#x4F7F;&#x7528;estraverse&#x904D;&#x5386;ast</span>
    estraverse.traverse(ast, {
        enter (node) {
            <span class="hljs-comment">// &#x7B5B;&#x9009;&#x51FA;require&#x8282;&#x70B9;</span>
            <span class="hljs-keyword">if</span> (node.type === <span class="hljs-string">&apos;CallExpression&apos;</span> &amp;&amp; node.callee.name === <span class="hljs-string">&apos;require&apos;</span> &amp;&amp; node.callee.type === <span class="hljs-string">&apos;Identifier&apos;</span>) {
                <span class="hljs-comment">// require&#x8DEF;&#x5F84;&#xFF0C;&#x5982;require(&apos;./index.js&apos;)&#xFF0C;&#x5219;requirePath = &apos;./index.js&apos;</span>
                <span class="hljs-keyword">const</span> requirePath = node.arguments[<span class="hljs-number">0</span>]
                <span class="hljs-comment">// &#x5C06;require&#x8DEF;&#x5F84;&#x8F6C;&#x4E3A;&#x7EDD;&#x5BF9;&#x8DEF;&#x5F84;</span>
                <span class="hljs-keyword">const</span> requirePathValue = pathResolve(requirePath.value)
                <span class="hljs-comment">// &#x5982;require(&apos;./index.js&apos;)&#x4E2D;&apos;./index.js&apos;&#x5728;&#x6E90;&#x7801;&#x7684;&#x4F4D;&#x7F6E;</span>
                <span class="hljs-keyword">const</span> requirePathRange = requirePath.range
                ret.push({requirePathValue, requirePathRange, id})
                id++
            } 
        }
    })
    <span class="hljs-keyword">return</span> ret
}
<span class="hljs-comment">/**
 * &#x6A21;&#x5757;&#x6A21;&#x677F;
 * @param {String} content 
 */</span>
<span class="hljs-keyword">const</span> moduleTemplate = <span class="hljs-function">(<span class="hljs-params">content</span>) =&gt;</span> <span class="hljs-string">`function (module, require) {\n<span class="hljs-subst">${content}</span>\n},`</span>
<span class="hljs-comment">/**
 * &#x83B7;&#x53D6;&#x6A21;&#x5757;&#x4FE1;&#x606F;
 */</span>
<span class="hljs-keyword">const</span> getModules = <span class="hljs-keyword">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> requireInfo = dataInfo.requireInfo
    <span class="hljs-keyword">const</span> modules = []
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>, len = requireInfo.length; i &lt; len; i++) {
        <span class="hljs-keyword">const</span> file = <span class="hljs-keyword">await</span> readFile(requireInfo[i].requirePathValue)
        <span class="hljs-keyword">const</span> content = moduleTemplate(file.toString())
        modules.push(content)
    }
    <span class="hljs-keyword">return</span> modules
}
<span class="hljs-comment">/**
 * &#x5C06;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x5982;require(&apos;./module/one.js&apos;)&#x7B49;&#x5BF9;&#x5E94;&#x6210;require(1)&#x6A21;&#x5757;id
 */</span>
<span class="hljs-keyword">const</span> replace = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> requireInfo = dataInfo.requireInfo
    <span class="hljs-comment">// &#x9700;&#x8981;&#x5012;&#x5E8F;&#x5904;&#x7406;&#xFF0C;&#x56E0;&#x4E3A;&#x6BD4;&#x5982;&#x7B2C;&#x4E00;&#x4E2A;require(&apos;./module/one.js&apos;)&#x4E2D;&#x7684;&#x8DEF;&#x5F84;&#x662F;&#x5728;&#x6E90;&#x7801;&#x5B57;&#x7B26;&#x4E32;42-59&#x8FD9;&#x4E2A;&#x533A;&#x95F4;</span>
    <span class="hljs-comment">// &#x800C;&#x7B2C;&#x4E8C;&#x4E2A;require(&apos;./module/two.js&apos;)&#x4E2D;&#x7684;&#x8DEF;&#x5F84;&#x662F;&#x5728;&#x6E90;&#x7801;&#x5B57;&#x7B26;&#x4E32;82-99&#x8FD9;&#x4E2A;&#x533A;&#x95F4;&#xFF0C;&#x90A3;&#x4E48;&#x5982;&#x679C;&#x5148;&#x66FF;&#x6362;&#x4F4D;&#x7F6E;&#x8F83;&#x524D;&#x7684;&#x4EE3;&#x7801;</span>
    <span class="hljs-comment">// &#x5219;&#x6B64;&#x65F6;&#x6E90;&#x7801;&#x5B57;&#x7B26;&#x4E32;&#x5DF2;&#x7ECF;&#x5C11;&#x4E86;&#x4E00;&#x622A;&#xFF08;&#x4ECE;&apos;./module/one.js&apos;&#x53D8;&#x6210;1&#xFF09;&#xFF0C;&#x90A3;&#x7B2C;&#x4E8C;&#x4E2A;require&#x7684;&#x4F4D;&#x7F6E;&#x5C31;&#x4E0D;&#x5BF9;&#x4E86;</span>
    <span class="hljs-keyword">const</span> sortRequireInfo = requireInfo.sort(<span class="hljs-function">(<span class="hljs-params">item1, item2</span>) =&gt;</span> item1.requirePathRange[<span class="hljs-number">0</span>] &lt; item2.requirePathRange[<span class="hljs-number">0</span>])
    sortRequireInfo.forEach(<span class="hljs-function">(<span class="hljs-params">{requirePathRange, id}</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> start = requirePathRange[<span class="hljs-number">0</span>]
        <span class="hljs-keyword">const</span> end = requirePathRange[<span class="hljs-number">1</span>]
        <span class="hljs-keyword">const</span> headerS = dataInfo.source.substr(<span class="hljs-number">0</span>, start)
        <span class="hljs-keyword">const</span> endS = dataInfo.source.substr(end)
        dataInfo.source = <span class="hljs-string">`<span class="hljs-subst">${headerS}</span><span class="hljs-subst">${id}</span><span class="hljs-subst">${endS}</span>`</span>
    })
}
<span class="hljs-comment">/**
 * &#x8F93;&#x51FA;&#x6253;&#x5305;&#x597D;&#x7684;&#x6587;&#x4EF6;
 */</span>
<span class="hljs-keyword">const</span> output = <span class="hljs-keyword">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> readFile(pathResolve(<span class="hljs-string">&apos;./template/indexTemplate.js&apos;</span>))
    <span class="hljs-keyword">const</span> indexModule = moduleTemplate(dataInfo.source)
    <span class="hljs-keyword">const</span> allModules = [indexModule, ...dataInfo.modules].join(<span class="hljs-string">&apos;&apos;</span>)
    <span class="hljs-keyword">const</span> result = <span class="hljs-string">`<span class="hljs-subst">${data.toString()}</span>([\n<span class="hljs-subst">${allModules}</span>\n])`</span>
    fs.writeFile(pathResolve(<span class="hljs-string">&apos;./build/output.js&apos;</span>), result, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
        <span class="hljs-keyword">if</span> (err) {
            <span class="hljs-keyword">throw</span> err;
        }
    })
}
<span class="hljs-keyword">const</span> main = <span class="hljs-keyword">async</span> () =&gt; {
    <span class="hljs-comment">// &#x8BFB;&#x53D6;&#x5165;&#x53E3;&#x6587;&#x4EF6;</span>
    <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> readFile(pathResolve(<span class="hljs-string">&apos;./index.js&apos;</span>))
    dataInfo.source = data.toString()
    <span class="hljs-comment">// &#x83B7;&#x53D6;&#x4F9D;&#x8D56;&#x4FE1;&#x606F;</span>
    dataInfo.requireInfo = getRequireInfo()
    <span class="hljs-comment">// &#x83B7;&#x53D6;&#x6A21;&#x5757;&#x4FE1;&#x606F;</span>
    dataInfo.modules = <span class="hljs-keyword">await</span> getModules()                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
    <span class="hljs-comment">// &#x5C06;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x5982;require(&apos;./module/one.js&apos;)&#x7B49;&#x5BF9;&#x5E94;&#x6210;require(1)&#x6A21;&#x5757;id</span>
    replace()
    <span class="hljs-comment">// &#x8F93;&#x51FA;&#x6253;&#x5305;&#x597D;&#x7684;&#x6587;&#x4EF6;</span>
    output()
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">JSON</span>.stringify(dataInfo))
}
main()
 </code></pre><p>&#x8FD9;&#x91CC;&#x7684;&#x5173;&#x952E;&#x662F;&#x5C06;&#x5165;&#x53E3;&#x6E90;&#x7801;&#x8F6C;&#x6210;ast&#x4ECE;&#x800C;&#x5206;&#x6790;&#x51FA;require&#x7684;&#x8DEF;&#x5F84;&#x5728;&#x6E90;&#x7801;&#x5B57;&#x7B26;&#x4E32;&#x4E2D;&#x6240;&#x5728;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x6211;&#x4EEC;&#x8FD9;&#x91CC;&#x7528;&#x5230;&#x4E86;esprima&#x53BB;&#x5C06;&#x6E90;&#x7801;&#x8F6C;&#x6210;ast&#xFF0C;&#x7136;&#x540E;&#x7528;estraverse&#x53BB;&#x904D;&#x5386;ast&#x4ECE;&#x800C;&#x7B5B;&#x9009;&#x51FA;&#x6211;&#x4EEC;&#x611F;&#x5174;&#x8DA3;&#x7684;&#x8282;&#x70B9;&#xFF0C;&#x8FD9;&#x65F6;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x5BF9;&#x8F6C;&#x5316;&#x6210;ast&#x7684;&#x4EE3;&#x7801;&#x4E3A;&#x6240;&#x6B32;&#x4E3A;&#x4E86;&#xFF0C;babel&#x5C31;&#x662F;&#x8FD9;&#x6837;&#x7684;&#x539F;&#x7406;&#x4E3A;&#x6211;&#x4EEC;&#x8F6C;&#x5316;&#x4EE3;&#x7801;&#x7684;&#x3002;</p><h2 id="articleHeader4">&#x6700;&#x540E;</h2><p>&#x5230;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x77E5;&#x9053;&#xFF0C;&#x9664;&#x53BB;&#x5176;&#x4ED6;&#x6742;&#x4E03;&#x6742;&#x516B;&#x7684;&#x670D;&#x52A1;&#xFF0C;webpack&#x672C;&#x8D28;&#x4E0A;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x5C06;&#x6211;&#x4EEC;&#x5E73;&#x65F6;&#x5199;&#x7684;&#x6A21;&#x5757;&#x5316;&#x4EE3;&#x7801;&#x8F6C;&#x6210;&#x73B0;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x6267;&#x884C;&#x7684;&#x4EE3;&#x7801;&#x3002;&#x5F53;&#x7136;&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x662F;&#x975E;&#x5E38;&#x7B80;&#x964B;&#x7684;&#xFF0C;&#x6211;&#x4EEC;&#x6CA1;&#x6709;&#x53BB;&#x9012;&#x5F52;&#x5904;&#x7406;&#x4F9D;&#x8D56;&#xFF0C;&#x6CA1;&#x6709;&#x53BB;&#x5904;&#x7406;require&#x7684;&#x5BFB;&#x5740;&#xFF08;&#x6BD4;&#x5982;require(&apos;vue&apos;)&#x662F;&#x600E;&#x6837;&#x627E;&#x5230;vue&#x5728;&#x54EA;&#x91CC;&#x7684;&#xFF09;&#x7B49;&#x7B49;&#x7684;&#x7EC6;&#x8282;&#x5904;&#x7406;&#xFF0C;&#x53EA;&#x4E3A;&#x8FD8;&#x539F;&#x4E00;&#x4E2A;&#x6700;&#x7B80;&#x5355;&#x6613;&#x61C2;&#x7684;&#x7ED3;&#x6784;&#x3002;&#x4E0A;&#x9762;&#x7684;&#x6E90;&#x7801;&#x53EF;&#x4EE5;&#x5728;<a href="https://github.com/febugcoder/learn-webpack" rel="nofollow noreferrer" target="_blank">&#x8FD9;&#x91CC;&#x627E;&#x5230;</a>&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack究竟做了什么（一）

## 原文链接
[https://segmentfault.com/a/1190000015973544](https://segmentfault.com/a/1190000015973544)

