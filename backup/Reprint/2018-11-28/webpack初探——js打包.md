---
title: 'webpack初探——js打包' 
date: 2018-11-28 2:30:10
hidden: true
slug: e6j9eqt3e9
categories: [reprint]
---

{{< raw >}}
<blockquote>webpack&#x5DF2;&#x7ECF;&#x6210;&#x4E3A;&#x7F16;&#x8BD1;&#x6784;&#x5EFA;&#x524D;&#x7AEF;&#x9879;&#x76EE;&#x7684;&#x5FC5;&#x5907;&#x5DE5;&#x5177;&#x3002;&#x4ECA;&#x5929;&#x5C31;&#x6765;&#x4E86;&#x89E3;&#x4E00;&#x4E0B;webpack&#x7684;&#x6253;&#x5305;&#x673A;&#x5236;&#xFF0C;&#x5148;&#x4ECE;&#x6700;&#x7B80;&#x5355;&#x7684;js&#x7F16;&#x8BD1;&#x6253;&#x5305;&#x5F00;&#x59CB;&#x3002;</blockquote><h2 id="articleHeader0">webpack&#x6253;&#x5305;&#x540E;&#x7684;&#x6587;&#x4EF6;</h2><p>&#x5148;&#x6765;&#x770B;&#x4E0B;webpack&#x6253;&#x5305;&#x4E4B;&#x540E;&#x7684;&#x6587;&#x4EF6;&#x662F;&#x4EC0;&#x4E48;&#x6837;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x53CD;&#x63A8;&#x5B83;&#x7684;&#x6253;&#x5305;&#x673A;&#x5236;&#x3002;&#x8865;&#x5145;&#x8BF4;&#x660E;&#xFF1A;&#x672C;&#x6587;&#x4F7F;&#x7528;&#x7684;&#x662F;webpack 4.x&#x7684;&#x7248;&#x672C;&#x3002;</p><p>&#x4EE3;&#x7801;&#x793A;&#x4F8B;&#xFF1A;</p><p>&#x5165;&#x53E3;&#x6587;&#x4EF6;index.js&#xFF0C;&#x4F9D;&#x8D56;a.js&#x548C;b.js&#xFF0C;&#x800C;a.js&#x548C;b.js&#x90FD;&#x4F9D;&#x8D56;c.js</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015296947?w=507&amp;h=224" src="https://static.alili.tech/img/remote/1460000015296947?w=507&amp;h=224" alt="img" title="img" style="cursor:pointer;display:inline"></span></p><p>&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// index.js
import {getDate} from &quot;./a&quot;;
import {getDay} from &quot;./b&quot;;
console.log(getDate() + &apos; &apos; + getDay());


// a.js
import now from &apos;./c&apos;;
export function getDate() {
  var date = now();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = month &gt; 9 ? month : `0${month}`;
  var day = date.getDate();
  day = day &gt; 9 ? day : `0${day}`;
  return `${year}-${month}-${day}`;
}

// b.js
import now from &apos;./c&apos;;
export function getDay() {
  var date = now();
  var arr = [&apos;&#x65E5;&apos;, &apos;&#x4E00;&apos;, &apos;&#x4E8C;&apos;, &apos;&#x4E09;&apos;, &apos;&#x56DB;&apos;, &apos;&#x4E94;&apos;, &apos;&#x516D;&apos;];
  return `&#x5468;${arr[date.getDay()]}`;
}

// c.js
export default function now() {
  var date = new Date();
  return date;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// index.js</span>
<span class="hljs-keyword">import</span> {getDate} <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./a&quot;</span>;
<span class="hljs-keyword">import</span> {getDay} <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./b&quot;</span>;
<span class="hljs-built_in">console</span>.log(getDate() + <span class="hljs-string">&apos; &apos;</span> + getDay());


<span class="hljs-comment">// a.js</span>
<span class="hljs-keyword">import</span> now <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./c&apos;</span>;
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getDate</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> date = now();
  <span class="hljs-keyword">var</span> year = date.getFullYear();
  <span class="hljs-keyword">var</span> month = date.getMonth() + <span class="hljs-number">1</span>;
  month = month &gt; <span class="hljs-number">9</span> ? month : <span class="hljs-string">`0<span class="hljs-subst">${month}</span>`</span>;
  <span class="hljs-keyword">var</span> day = date.getDate();
  day = day &gt; <span class="hljs-number">9</span> ? day : <span class="hljs-string">`0<span class="hljs-subst">${day}</span>`</span>;
  <span class="hljs-keyword">return</span> <span class="hljs-string">`<span class="hljs-subst">${year}</span>-<span class="hljs-subst">${month}</span>-<span class="hljs-subst">${day}</span>`</span>;
}

<span class="hljs-comment">// b.js</span>
<span class="hljs-keyword">import</span> now <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./c&apos;</span>;
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getDay</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> date = now();
  <span class="hljs-keyword">var</span> arr = [<span class="hljs-string">&apos;&#x65E5;&apos;</span>, <span class="hljs-string">&apos;&#x4E00;&apos;</span>, <span class="hljs-string">&apos;&#x4E8C;&apos;</span>, <span class="hljs-string">&apos;&#x4E09;&apos;</span>, <span class="hljs-string">&apos;&#x56DB;&apos;</span>, <span class="hljs-string">&apos;&#x4E94;&apos;</span>, <span class="hljs-string">&apos;&#x516D;&apos;</span>];
  <span class="hljs-keyword">return</span> <span class="hljs-string">`&#x5468;<span class="hljs-subst">${arr[date.getDay()]}</span>`</span>;
}

<span class="hljs-comment">// c.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">now</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> date = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
  <span class="hljs-keyword">return</span> date;
}
</code></pre><p>webpack&#x6253;&#x5305;&#x540E;&#x7684;bundle.js&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/******/ (function(modules) { // webpackBootstrap
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
/******/             Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/         }
/******/     };
/******/
/******/     // define __esModule on exports
/******/     __webpack_require__.r = function(exports) {
/******/         if(typeof Symbol !== &apos;undefined&apos; &amp;&amp; Symbol.toStringTag) {
/******/             Object.defineProperty(exports, Symbol.toStringTag, { value: &apos;Module&apos; });
/******/         }
/******/         Object.defineProperty(exports, &apos;__esModule&apos;, { value: true });
/******/     };
/******/
/******/     // create a fake namespace object
/******/     // mode &amp; 1: value is a module id, require it
/******/     // mode &amp; 2: merge all properties of value into the ns
/******/     // mode &amp; 4: return value when already ns object
/******/     // mode &amp; 8|1: behave like require
/******/     __webpack_require__.t = function(value, mode) {
/******/         if(mode &amp; 1) value = __webpack_require__(value);
/******/         if(mode &amp; 8) return value;
/******/         if((mode &amp; 4) &amp;&amp; typeof value === &apos;object&apos; &amp;&amp; value &amp;&amp; value.__esModule) return value;
/******/         var ns = Object.create(null);
/******/         __webpack_require__.r(ns);
/******/         Object.defineProperty(ns, &apos;default&apos;, { enumerable: true, value: value });
/******/         if(mode &amp; 2 &amp;&amp; typeof value != &apos;string&apos;) for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/         return ns;
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
/******/
/******/     // Load entry module and return exports
/******/     return __webpack_require__(__webpack_require__.s = &quot;./example/src/index.js&quot;);
/******/ })
/************************************************************************/
/******/ ({

/***/ &quot;./example/src/a.js&quot;:
/*!**************************!*\
  !*** ./example/src/a.js ***!
  \**************************/
/*! exports provided: getDate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

&quot;use strict&quot;;
eval(&quot;__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \&quot;getDate\&quot;, function() { return getDate; });\n/* harmony import */ var _c__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./c */ \&quot;./example/src/c.js\&quot;);\n\nfunction getDate() {\n  var date = Object(_c__WEBPACK_IMPORTED_MODULE_0__[\&quot;default\&quot;])();\n  var year = date.getFullYear();\n  var month = date.getMonth() + 1;\n  month = month &gt; 9 ? month : `0${month}`;\n  var day = date.getDate();\n  day = day &gt; 9 ? day : `0${day}`;\n  return `${year}-${month}-${day}`;\n}\n\n\n//# sourceURL=webpack:///./example/src/a.js?&quot;);

/***/ }),

/***/ &quot;./example/src/b.js&quot;:
/*!**************************!*\
  !*** ./example/src/b.js ***!
  \**************************/
/*! exports provided: getDay */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

&quot;use strict&quot;;
eval(&quot;__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \&quot;getDay\&quot;, function() { return getDay; });\n/* harmony import */ var _c__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./c */ \&quot;./example/src/c.js\&quot;);\n\nfunction getDay() {\n  var date = Object(_c__WEBPACK_IMPORTED_MODULE_0__[\&quot;default\&quot;])();\n  var arr = [&apos;&#x65E5;&apos;, &apos;&#x4E00;&apos;, &apos;&#x4E8C;&apos;, &apos;&#x4E09;&apos;, &apos;&#x56DB;&apos;, &apos;&#x4E94;&apos;, &apos;&#x516D;&apos;];\n  return `&#x5468;${arr[date.getDay()]}`;\n}\n\n\n//# sourceURL=webpack:///./example/src/b.js?&quot;);

/***/ }),

/***/ &quot;./example/src/c.js&quot;:
/*!**************************!*\
  !*** ./example/src/c.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

&quot;use strict&quot;;
eval(&quot;__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \&quot;default\&quot;, function() { return now; });\nfunction now() {\n  var date = new Date();\n  return date;\n}\n\n\n//# sourceURL=webpack:///./example/src/c.js?&quot;);

/***/ }),

/***/ &quot;./example/src/index.js&quot;:
/*!******************************!*\
  !*** ./example/src/index.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

&quot;use strict&quot;;
eval(&quot;__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./a */ \&quot;./example/src/a.js\&quot;);\n/* harmony import */ var _b__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./b */ \&quot;./example/src/b.js\&quot;);\n\n\nconsole.log(Object(_a__WEBPACK_IMPORTED_MODULE_0__[\&quot;getDate\&quot;])() + &apos; &apos; + Object(_b__WEBPACK_IMPORTED_MODULE_1__[\&quot;getDay\&quot;])());\n\n\n//# sourceURL=webpack:///./example/src/index.js?&quot;);

/***/ })

/******/ });" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/******/</span> (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">modules</span>) </span>{ <span class="hljs-comment">// webpackBootstrap</span>
<span class="hljs-comment">/******/</span>     <span class="hljs-comment">// The module cache</span>
<span class="hljs-comment">/******/</span>     <span class="hljs-keyword">var</span> installedModules = {};
<span class="hljs-comment">/******/</span>
<span class="hljs-comment">/******/</span>     <span class="hljs-comment">// The require function</span>
<span class="hljs-comment">/******/</span>     <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">__webpack_require__</span>(<span class="hljs-params">moduleId</span>) </span>{
<span class="hljs-comment">/******/</span>
<span class="hljs-comment">/******/</span>         <span class="hljs-comment">// Check if module is in cache</span>
<span class="hljs-comment">/******/</span>         <span class="hljs-keyword">if</span>(installedModules[moduleId]) {
<span class="hljs-comment">/******/</span>             <span class="hljs-keyword">return</span> installedModules[moduleId].exports;
<span class="hljs-comment">/******/</span>         }
<span class="hljs-comment">/******/</span>         <span class="hljs-comment">// Create a new module (and put it into the cache)</span>
<span class="hljs-comment">/******/</span>         <span class="hljs-keyword">var</span> <span class="hljs-built_in">module</span> = installedModules[moduleId] = {
<span class="hljs-comment">/******/</span>             i: moduleId,
<span class="hljs-comment">/******/</span>             l: <span class="hljs-literal">false</span>,
<span class="hljs-comment">/******/</span>             exports: {}
<span class="hljs-comment">/******/</span>         };
<span class="hljs-comment">/******/</span>
<span class="hljs-comment">/******/</span>         <span class="hljs-comment">// Execute the module function</span>
<span class="hljs-comment">/******/</span>         modules[moduleId].call(<span class="hljs-built_in">module</span>.exports, <span class="hljs-built_in">module</span>, <span class="hljs-built_in">module</span>.exports, __webpack_require__);
<span class="hljs-comment">/******/</span>
<span class="hljs-comment">/******/</span>         <span class="hljs-comment">// Flag the module as loaded</span>
<span class="hljs-comment">/******/</span>         <span class="hljs-built_in">module</span>.l = <span class="hljs-literal">true</span>;
<span class="hljs-comment">/******/</span>
<span class="hljs-comment">/******/</span>         <span class="hljs-comment">// Return the exports of the module</span>
<span class="hljs-comment">/******/</span>         <span class="hljs-keyword">return</span> <span class="hljs-built_in">module</span>.exports;
<span class="hljs-comment">/******/</span>     }
<span class="hljs-comment">/******/</span>
<span class="hljs-comment">/******/</span>
<span class="hljs-comment">/******/</span>     <span class="hljs-comment">// expose the modules object (__webpack_modules__)</span>
<span class="hljs-comment">/******/</span>     __webpack_require__.m = modules;
<span class="hljs-comment">/******/</span>
<span class="hljs-comment">/******/</span>     <span class="hljs-comment">// expose the module cache</span>
<span class="hljs-comment">/******/</span>     __webpack_require__.c = installedModules;
<span class="hljs-comment">/******/</span>
<span class="hljs-comment">/******/</span>     <span class="hljs-comment">// define getter function for harmony exports</span>
<span class="hljs-comment">/******/</span>     __webpack_require__.d = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">exports, name, getter</span>) </span>{
<span class="hljs-comment">/******/</span>         <span class="hljs-keyword">if</span>(!__webpack_require__.o(exports, name)) {
<span class="hljs-comment">/******/</span>             <span class="hljs-built_in">Object</span>.defineProperty(exports, name, { <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">get</span>: getter });
<span class="hljs-comment">/******/</span>         }
<span class="hljs-comment">/******/</span>     };
<span class="hljs-comment">/******/</span>
<span class="hljs-comment">/******/</span>     <span class="hljs-comment">// define __esModule on exports</span>
<span class="hljs-comment">/******/</span>     __webpack_require__.r = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">exports</span>) </span>{
<span class="hljs-comment">/******/</span>         <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Symbol</span> !== <span class="hljs-string">&apos;undefined&apos;</span> &amp;&amp; <span class="hljs-built_in">Symbol</span>.toStringTag) {
<span class="hljs-comment">/******/</span>             <span class="hljs-built_in">Object</span>.defineProperty(exports, <span class="hljs-built_in">Symbol</span>.toStringTag, { <span class="hljs-attr">value</span>: <span class="hljs-string">&apos;Module&apos;</span> });
<span class="hljs-comment">/******/</span>         }
<span class="hljs-comment">/******/</span>         <span class="hljs-built_in">Object</span>.defineProperty(exports, <span class="hljs-string">&apos;__esModule&apos;</span>, { <span class="hljs-attr">value</span>: <span class="hljs-literal">true</span> });
<span class="hljs-comment">/******/</span>     };
<span class="hljs-comment">/******/</span>
<span class="hljs-comment">/******/</span>     <span class="hljs-comment">// create a fake namespace object</span>
<span class="hljs-comment">/******/</span>     <span class="hljs-comment">// mode &amp; 1: value is a module id, require it</span>
<span class="hljs-comment">/******/</span>     <span class="hljs-comment">// mode &amp; 2: merge all properties of value into the ns</span>
<span class="hljs-comment">/******/</span>     <span class="hljs-comment">// mode &amp; 4: return value when already ns object</span>
<span class="hljs-comment">/******/</span>     <span class="hljs-comment">// mode &amp; 8|1: behave like require</span>
<span class="hljs-comment">/******/</span>     __webpack_require__.t = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value, mode</span>) </span>{
<span class="hljs-comment">/******/</span>         <span class="hljs-keyword">if</span>(mode &amp; <span class="hljs-number">1</span>) value = __webpack_require__(value);
<span class="hljs-comment">/******/</span>         <span class="hljs-keyword">if</span>(mode &amp; <span class="hljs-number">8</span>) <span class="hljs-keyword">return</span> value;
<span class="hljs-comment">/******/</span>         <span class="hljs-keyword">if</span>((mode &amp; <span class="hljs-number">4</span>) &amp;&amp; <span class="hljs-keyword">typeof</span> value === <span class="hljs-string">&apos;object&apos;</span> &amp;&amp; value &amp;&amp; value.__esModule) <span class="hljs-keyword">return</span> value;
<span class="hljs-comment">/******/</span>         <span class="hljs-keyword">var</span> ns = <span class="hljs-built_in">Object</span>.create(<span class="hljs-literal">null</span>);
<span class="hljs-comment">/******/</span>         __webpack_require__.r(ns);
<span class="hljs-comment">/******/</span>         <span class="hljs-built_in">Object</span>.defineProperty(ns, <span class="hljs-string">&apos;default&apos;</span>, { <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">value</span>: value });
<span class="hljs-comment">/******/</span>         <span class="hljs-keyword">if</span>(mode &amp; <span class="hljs-number">2</span> &amp;&amp; <span class="hljs-keyword">typeof</span> value != <span class="hljs-string">&apos;string&apos;</span>) <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> value) __webpack_require__.d(ns, key, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">key</span>) </span>{ <span class="hljs-keyword">return</span> value[key]; }.bind(<span class="hljs-literal">null</span>, key));
<span class="hljs-comment">/******/</span>         <span class="hljs-keyword">return</span> ns;
<span class="hljs-comment">/******/</span>     };
<span class="hljs-comment">/******/</span>
<span class="hljs-comment">/******/</span>     <span class="hljs-comment">// getDefaultExport function for compatibility with non-harmony modules</span>
<span class="hljs-comment">/******/</span>     __webpack_require__.n = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module</span>) </span>{
<span class="hljs-comment">/******/</span>         <span class="hljs-keyword">var</span> getter = <span class="hljs-built_in">module</span> &amp;&amp; <span class="hljs-built_in">module</span>.__esModule ?
<span class="hljs-comment">/******/</span>             <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getDefault</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-built_in">module</span>[<span class="hljs-string">&apos;default&apos;</span>]; } :
<span class="hljs-comment">/******/</span>             <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getModuleExports</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-built_in">module</span>; };
<span class="hljs-comment">/******/</span>         __webpack_require__.d(getter, <span class="hljs-string">&apos;a&apos;</span>, getter);
<span class="hljs-comment">/******/</span>         <span class="hljs-keyword">return</span> getter;
<span class="hljs-comment">/******/</span>     };
<span class="hljs-comment">/******/</span>
<span class="hljs-comment">/******/</span>     <span class="hljs-comment">// Object.prototype.hasOwnProperty.call</span>
<span class="hljs-comment">/******/</span>     __webpack_require__.o = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">object, property</span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.hasOwnProperty.call(object, property); };
<span class="hljs-comment">/******/</span>
<span class="hljs-comment">/******/</span>     <span class="hljs-comment">// __webpack_public_path__</span>
<span class="hljs-comment">/******/</span>     __webpack_require__.p = <span class="hljs-string">&quot;&quot;</span>;
<span class="hljs-comment">/******/</span>
<span class="hljs-comment">/******/</span>
<span class="hljs-comment">/******/</span>     <span class="hljs-comment">// Load entry module and return exports</span>
<span class="hljs-comment">/******/</span>     <span class="hljs-keyword">return</span> __webpack_require__(__webpack_require__.s = <span class="hljs-string">&quot;./example/src/index.js&quot;</span>);
<span class="hljs-comment">/******/</span> })
<span class="hljs-comment">/************************************************************************/</span>
<span class="hljs-comment">/******/</span> ({

<span class="hljs-comment">/***/</span> <span class="hljs-string">&quot;./example/src/a.js&quot;</span>:
<span class="hljs-comment">/*!**************************!*\
  !*** ./example/src/a.js ***!
  \**************************/</span>
<span class="hljs-comment">/*! exports provided: getDate */</span>
<span class="hljs-comment">/***/</span> (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, __webpack_exports__, __webpack_require__</span>) </span>{
<span class="hljs-meta">
&quot;use strict&quot;</span>;
<span class="hljs-built_in">eval</span>(<span class="hljs-string">&quot;__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \&quot;getDate\&quot;, function() { return getDate; });\n/* harmony import */ var _c__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./c */ \&quot;./example/src/c.js\&quot;);\n\nfunction getDate() {\n  var date = Object(_c__WEBPACK_IMPORTED_MODULE_0__[\&quot;default\&quot;])();\n  var year = date.getFullYear();\n  var month = date.getMonth() + 1;\n  month = month &gt; 9 ? month : `0${month}`;\n  var day = date.getDate();\n  day = day &gt; 9 ? day : `0${day}`;\n  return `${year}-${month}-${day}`;\n}\n\n\n//# sourceURL=webpack:///./example/src/a.js?&quot;</span>);

<span class="hljs-comment">/***/</span> }),

<span class="hljs-comment">/***/</span> <span class="hljs-string">&quot;./example/src/b.js&quot;</span>:
<span class="hljs-comment">/*!**************************!*\
  !*** ./example/src/b.js ***!
  \**************************/</span>
<span class="hljs-comment">/*! exports provided: getDay */</span>
<span class="hljs-comment">/***/</span> (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, __webpack_exports__, __webpack_require__</span>) </span>{
<span class="hljs-meta">
&quot;use strict&quot;</span>;
<span class="hljs-built_in">eval</span>(<span class="hljs-string">&quot;__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \&quot;getDay\&quot;, function() { return getDay; });\n/* harmony import */ var _c__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./c */ \&quot;./example/src/c.js\&quot;);\n\nfunction getDay() {\n  var date = Object(_c__WEBPACK_IMPORTED_MODULE_0__[\&quot;default\&quot;])();\n  var arr = [&apos;&#x65E5;&apos;, &apos;&#x4E00;&apos;, &apos;&#x4E8C;&apos;, &apos;&#x4E09;&apos;, &apos;&#x56DB;&apos;, &apos;&#x4E94;&apos;, &apos;&#x516D;&apos;];\n  return `&#x5468;${arr[date.getDay()]}`;\n}\n\n\n//# sourceURL=webpack:///./example/src/b.js?&quot;</span>);

<span class="hljs-comment">/***/</span> }),

<span class="hljs-comment">/***/</span> <span class="hljs-string">&quot;./example/src/c.js&quot;</span>:
<span class="hljs-comment">/*!**************************!*\
  !*** ./example/src/c.js ***!
  \**************************/</span>
<span class="hljs-comment">/*! exports provided: default */</span>
<span class="hljs-comment">/***/</span> (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, __webpack_exports__, __webpack_require__</span>) </span>{
<span class="hljs-meta">
&quot;use strict&quot;</span>;
<span class="hljs-built_in">eval</span>(<span class="hljs-string">&quot;__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \&quot;default\&quot;, function() { return now; });\nfunction now() {\n  var date = new Date();\n  return date;\n}\n\n\n//# sourceURL=webpack:///./example/src/c.js?&quot;</span>);

<span class="hljs-comment">/***/</span> }),

<span class="hljs-comment">/***/</span> <span class="hljs-string">&quot;./example/src/index.js&quot;</span>:
<span class="hljs-comment">/*!******************************!*\
  !*** ./example/src/index.js ***!
  \******************************/</span>
<span class="hljs-comment">/*! no exports provided */</span>
<span class="hljs-comment">/***/</span> (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, __webpack_exports__, __webpack_require__</span>) </span>{
<span class="hljs-meta">
&quot;use strict&quot;</span>;
<span class="hljs-built_in">eval</span>(<span class="hljs-string">&quot;__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./a */ \&quot;./example/src/a.js\&quot;);\n/* harmony import */ var _b__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./b */ \&quot;./example/src/b.js\&quot;);\n\n\nconsole.log(Object(_a__WEBPACK_IMPORTED_MODULE_0__[\&quot;getDate\&quot;])() + &apos; &apos; + Object(_b__WEBPACK_IMPORTED_MODULE_1__[\&quot;getDay\&quot;])());\n\n\n//# sourceURL=webpack:///./example/src/index.js?&quot;</span>);

<span class="hljs-comment">/***/</span> })

<span class="hljs-comment">/******/</span> });</code></pre><p>&#x7B80;&#x5355;&#x70B9;&#xFF0C;&#x6253;&#x5305;&#x540E;&#x7684;&#x5F62;&#x5F0F;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(modules) {
  // ...
})({
  // ...
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">modules</span>) </span>{
  <span class="hljs-comment">// ...</span>
})({
  <span class="hljs-comment">// ...</span>
})</code></pre><p>&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x81EA;&#x6267;&#x884C;&#x51FD;&#x6570;&#xFF0C;&#x4F20;&#x5165;&#x7684;moduels&#x5BF9;&#x8C61;&#x662F;&#x4E0B;&#x9762;&#x7684;&#x5F62;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;./example/src/a.js&quot;: (function(module, __webpack_exports__, __webpack_require__) {
    // &#x6A21;&#x5757;&#x4EE3;&#x7801;
  }),
  &quot;./example/src/b.js&quot;: (function(module, __webpack_exports__, __webpack_require__) {
    // &#x6A21;&#x5757;&#x4EE3;&#x7801;
  }),
  &quot;./example/src/c.js&quot;: (function(module, __webpack_exports__, __webpack_require__) {
    // &#x6A21;&#x5757;&#x4EE3;&#x7801;
  }),
  &quot;./example/src/index.js&quot;: (function(module, __webpack_exports__, __webpack_require__) {
    // &#x6A21;&#x5757;&#x4EE3;&#x7801;
  })
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-string">&quot;./example/src/a.js&quot;</span>: (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, __webpack_exports__, __webpack_require__</span>) </span>{
    <span class="hljs-comment">// &#x6A21;&#x5757;&#x4EE3;&#x7801;</span>
  }),
  <span class="hljs-string">&quot;./example/src/b.js&quot;</span>: (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, __webpack_exports__, __webpack_require__</span>) </span>{
    <span class="hljs-comment">// &#x6A21;&#x5757;&#x4EE3;&#x7801;</span>
  }),
  <span class="hljs-string">&quot;./example/src/c.js&quot;</span>: (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, __webpack_exports__, __webpack_require__</span>) </span>{
    <span class="hljs-comment">// &#x6A21;&#x5757;&#x4EE3;&#x7801;</span>
  }),
  <span class="hljs-string">&quot;./example/src/index.js&quot;</span>: (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, __webpack_exports__, __webpack_require__</span>) </span>{
    <span class="hljs-comment">// &#x6A21;&#x5757;&#x4EE3;&#x7801;</span>
  })
}</code></pre><p>&#x6A21;&#x5757;&#x4EE3;&#x7801;&#x88AB;&#x7F16;&#x8BD1;&#x6210;es5&#x683C;&#x5F0F;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x5728;&#x6267;&#x884C;&#x65F6;&#xFF0C;&#x81EA;&#x6267;&#x884C;&#x51FD;&#x6570;&#x4ECE;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x5F00;&#x59CB;&#x6267;&#x884C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="__webpack_require__(__webpack_require__.s = &quot;./example/src/index.js&quot;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial">__webpack_require__(__webpack_require__.s = <span class="hljs-string">&quot;./example/src/index.js&quot;</span>);</code></pre><p>&#x518D;&#x6765;&#x770B;&#x770B;<code>__webpack_require__</code>&#x51FD;&#x6570;&#x7684;&#x5B9A;&#x4E49;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function __webpack_require__(moduleId) {
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
/******/     }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">__webpack_require__</span>(<span class="hljs-params">moduleId</span>) </span>{
<span class="hljs-comment">/******/</span>
<span class="hljs-comment">/******/</span>         <span class="hljs-comment">// Check if module is in cache</span>
<span class="hljs-comment">/******/</span>         <span class="hljs-keyword">if</span>(installedModules[moduleId]) {
<span class="hljs-comment">/******/</span>             <span class="hljs-keyword">return</span> installedModules[moduleId].exports;
<span class="hljs-comment">/******/</span>         }
<span class="hljs-comment">/******/</span>         <span class="hljs-comment">// Create a new module (and put it into the cache)</span>
<span class="hljs-comment">/******/</span>         <span class="hljs-keyword">var</span> <span class="hljs-built_in">module</span> = installedModules[moduleId] = {
<span class="hljs-comment">/******/</span>             i: moduleId,
<span class="hljs-comment">/******/</span>             l: <span class="hljs-literal">false</span>,
<span class="hljs-comment">/******/</span>             exports: {}
<span class="hljs-comment">/******/</span>         };
<span class="hljs-comment">/******/</span>
<span class="hljs-comment">/******/</span>         <span class="hljs-comment">// Execute the module function</span>
<span class="hljs-comment">/******/</span>         modules[moduleId].call(<span class="hljs-built_in">module</span>.exports, <span class="hljs-built_in">module</span>, <span class="hljs-built_in">module</span>.exports, __webpack_require__);
<span class="hljs-comment">/******/</span>
<span class="hljs-comment">/******/</span>         <span class="hljs-comment">// Flag the module as loaded</span>
<span class="hljs-comment">/******/</span>         <span class="hljs-built_in">module</span>.l = <span class="hljs-literal">true</span>;
<span class="hljs-comment">/******/</span>
<span class="hljs-comment">/******/</span>         <span class="hljs-comment">// Return the exports of the module</span>
<span class="hljs-comment">/******/</span>         <span class="hljs-keyword">return</span> <span class="hljs-built_in">module</span>.exports;
<span class="hljs-comment">/******/</span>     }</code></pre><p>&#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x7684;&#x662F;<code>module.exports</code>&#xFF0C;&#x5BF9;&#x4E8E;&#x5DF2;&#x7ECF;&#x5B58;&#x5728;&#x4E8E;<code>installedModules</code>&#x4E2D;&#x7684;&#x6A21;&#x5757;&#xFF0C;&#x518D;&#x6B21;<code>require</code>&#x65F6;&#xFF0C;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;<code>module.exports</code>&#xFF0C;&#x800C;&#x4E0D;&#x4F1A;&#x6267;&#x884C;&#x3002;</p><p>&#x6839;&#x636E;webpack&#x6253;&#x5305;&#x540E;&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x53EF;&#x4EE5;&#x5F97;&#x51FA;&#x6253;&#x5305;&#x7684;&#x601D;&#x8DEF;&#xFF1A;</p><ol><li>&#x5B9A;&#x4E49;require&#x51FD;&#x6570;</li><li>&#x5206;&#x6790;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x7684;&#x4F9D;&#x8D56;&#xFF0C;&#x6253;&#x5305;&#x6210;moduels&#x5F62;&#x5F0F;&#x7684;&#x4EE3;&#x7801;</li><li>&#x751F;&#x6210;&#x81EA;&#x6267;&#x884C;&#x7684;bundle.js&#xFF0C;&#x4ECE;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x5F00;&#x59CB;&#x6267;&#x884C;</li></ol><h2 id="articleHeader1">&#x5F00;&#x53D1;&#x7B80;&#x5355;&#x7684;&#x6253;&#x5305;&#x7A0B;&#x5E8F;</h2><h3 id="articleHeader2">&#x5C06;es6&#x8BED;&#x6CD5;&#x8F6C;&#x6362;&#x6210;es5</h3><p>&#x8FD9;&#x4E00;&#x6B65;&#x901A;&#x8FC7;babel&#x6765;&#x8F6C;&#x6362;</p><ul><li>&#x901A;&#x8FC7;<code>babylon</code>&#x751F;&#x6210;AST</li><li>&#x901A;&#x8FC7;<code>babel-core</code>&#x5C06;AST&#x91CD;&#x65B0;&#x751F;&#x6210;&#x6E90;&#x7801;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * &#x83B7;&#x53D6;&#x6587;&#x4EF6;&#xFF0C;&#x751F;&#x6210;AST
 * @param filename
 */
function getAst(filename) {
  const content = fs.readFileSync(filename, &apos;utf-8&apos;);
  return babylon.parse(content, {
    sourceType: &apos;module&apos;
  });
}

/**
 * &#x7F16;&#x8BD1;
 * @param ast
 */
function getTranslateCode(ast) {
  const { code } = babel.transformFromAst(ast, null, {
    presets: [&apos;env&apos;]
  });
  return code;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * &#x83B7;&#x53D6;&#x6587;&#x4EF6;&#xFF0C;&#x751F;&#x6210;AST
 * @param filename
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getAst</span>(<span class="hljs-params">filename</span>) </span>{
  <span class="hljs-keyword">const</span> content = fs.readFileSync(filename, <span class="hljs-string">&apos;utf-8&apos;</span>);
  <span class="hljs-keyword">return</span> babylon.parse(content, {
    <span class="hljs-attr">sourceType</span>: <span class="hljs-string">&apos;module&apos;</span>
  });
}

<span class="hljs-comment">/**
 * &#x7F16;&#x8BD1;
 * @param ast
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getTranslateCode</span>(<span class="hljs-params">ast</span>) </span>{
  <span class="hljs-keyword">const</span> { code } = babel.transformFromAst(ast, <span class="hljs-literal">null</span>, {
    <span class="hljs-attr">presets</span>: [<span class="hljs-string">&apos;env&apos;</span>]
  });
  <span class="hljs-keyword">return</span> code;
}</code></pre><h3 id="articleHeader3">&#x5904;&#x7406;&#x6A21;&#x5757;&#x7684;&#x4F9D;&#x8D56;&#x5173;&#x7CFB;</h3><p>&#x901A;&#x8FC7;babel-traverse&#x904D;&#x5386;AST&#xFF0C;&#x627E;&#x5230;&#x6A21;&#x5757;&#x7684;&#x4F9D;&#x8D56;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getDependencies(ast) {
  let dependencies = [];
  traverse(ast, {
    ImportDeclaration: ({node}) =&gt; {
      dependencies.push(node.source.value);
    }
  });
  return dependencies;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getDependencies</span>(<span class="hljs-params">ast</span>) </span>{
  <span class="hljs-keyword">let</span> dependencies = [];
  traverse(ast, {
    <span class="hljs-attr">ImportDeclaration</span>: <span class="hljs-function">(<span class="hljs-params">{node}</span>) =&gt;</span> {
      dependencies.push(node.source.value);
    }
  });
  <span class="hljs-keyword">return</span> dependencies;
}</code></pre><h3 id="articleHeader4">&#x89E3;&#x6790;&#x6A21;&#x5757;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function parse(filename, entry) {
  let absolutePath = path.join(entry, filename + &apos;.js&apos;);
  const ast = getAst(absolutePath);
  return {
    filename,
    dependence: getDependencies(ast), // &#x89E3;&#x6790;&#x4F9D;&#x8D56;
    code: getTranslateCode(ast) // &#x7F16;&#x8BD1;&#x6210;es5
  };
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">parse</span>(<span class="hljs-params">filename, entry</span>) </span>{
  <span class="hljs-keyword">let</span> absolutePath = path.join(entry, filename + <span class="hljs-string">&apos;.js&apos;</span>);
  <span class="hljs-keyword">const</span> ast = getAst(absolutePath);
  <span class="hljs-keyword">return</span> {
    filename,
    <span class="hljs-attr">dependence</span>: getDependencies(ast), <span class="hljs-comment">// &#x89E3;&#x6790;&#x4F9D;&#x8D56;</span>
    code: getTranslateCode(ast) <span class="hljs-comment">// &#x7F16;&#x8BD1;&#x6210;es5</span>
  };
}</code></pre><h3 id="articleHeader5">&#x89E3;&#x6790;&#x6DF1;&#x5EA6;&#x4F9D;&#x8D56;</h3><p>&#x6B64;&#x65F6;&#x7684;getDependencies&#x8FD8;&#x53EA;&#x662F;&#x89E3;&#x6790;&#x4E00;&#x4E2A;&#x6A21;&#x5757;&#x7684;&#x4F9D;&#x8D56;&#xFF0C;&#x4F46;&#x4F9D;&#x8D56;&#x7684;&#x4F9D;&#x8D56;&#x6CA1;&#x6709;&#x89E3;&#x6790;&#xFF0C;&#x6240;&#x4EE5;&#x9700;&#x8981;&#x6DF1;&#x5EA6;&#x904D;&#x5386;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const modules = {};
/**
 * &#x6DF1;&#x5EA6;&#x961F;&#x5217;&#x4F9D;&#x8D56;
 * @param main
 */
function getQueue(main) {
  if (modules[main.filename]) {
    return;
  }
  modules[main.filename] = main;
  main.dependence.forEach(dep =&gt; {
    let child = parse(dep, &apos;example/src&apos;);
    getQueue(child);
  });
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> modules = {};
<span class="hljs-comment">/**
 * &#x6DF1;&#x5EA6;&#x961F;&#x5217;&#x4F9D;&#x8D56;
 * @param main
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getQueue</span>(<span class="hljs-params">main</span>) </span>{
  <span class="hljs-keyword">if</span> (modules[main.filename]) {
    <span class="hljs-keyword">return</span>;
  }
  modules[main.filename] = main;
  main.dependence.forEach(<span class="hljs-function"><span class="hljs-params">dep</span> =&gt;</span> {
    <span class="hljs-keyword">let</span> child = parse(dep, <span class="hljs-string">&apos;example/src&apos;</span>);
    getQueue(child);
  });
}</code></pre><h3 id="articleHeader6">bundle&#x51FD;&#x6570;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function bundle(queue) {
  let modules = &apos;&apos;;
  queue.forEach(mod =&gt; {

    modules += `&apos;${mod.filename}&apos;: function(require, module, exports) {${mod.code"}}",`
  });
  const result = `
  (function(modules){
    var installedModules = {};
    function require(moduleId){
      if (installedModules[moduleId]) {
        return installedModules[moduleId].exports;
      }
      var fn = modules[moduleId];
      var module = installedModules[moduleId] = {exports: {"}}";
      fn(require, module, module.exports);
      return module.exports;
    }
    require(&apos;index&apos;);
  })({${modules"}}")
  `;
  return result;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bundle</span>(<span class="hljs-params">queue</span>) </span>{
  <span class="hljs-keyword">let</span> modules = <span class="hljs-string">&apos;&apos;</span>;
  queue.forEach(<span class="hljs-function"><span class="hljs-params">mod</span> =&gt;</span> {

    modules += <span class="hljs-string">`&apos;<span class="hljs-subst">${mod.filename}</span>&apos;: function(require, module, exports) {<span class="hljs-subst">${mod.code}</span>},`</span>
  });
  <span class="hljs-keyword">const</span> result = <span class="hljs-string">`
  (function(modules){
    var installedModules = {};
    function require(moduleId){
      if (installedModules[moduleId]) {
        return installedModules[moduleId].exports;
      }
      var fn = modules[moduleId];
      var module = installedModules[moduleId] = {exports: {"}}";
      fn(require, module, module.exports);
      return module.exports;
    }
    require(&apos;index&apos;);
  })({<span class="hljs-subst">${modules}</span>})
  `</span>;
  <span class="hljs-keyword">return</span> result;
}</code></pre><h3 id="articleHeader7">&#x6267;&#x884C;bundle&#x540E;&#x7684;&#x8F93;&#x51FA;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function (modules) {
  var installedModules = {};

  function require(moduleId) {
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    var fn = modules[moduleId];
    var module = installedModules[moduleId] = {exports: {"}}";
    fn(require, module, module.exports);
    return module.exports;
  }

  require(&apos;index&apos;);
})({
  &apos;index&apos;: function (require, module, exports) {
    &quot;use strict&quot;;

    var _a = require(&quot;./a&quot;);

    var _b = require(&quot;./b&quot;);

    console.log((0, _a.getDate)() + &apos; &apos; + (0, _b.getDay)());
  }, &apos;./a&apos;: function (require, module, exports) {
    &quot;use strict&quot;;

    Object.defineProperty(exports, &quot;__esModule&quot;, {
      value: true
    });
    exports.getDate = getDate;

    var _c = require(&quot;./c&quot;);

    var _c2 = _interopRequireDefault(_c);

    function _interopRequireDefault(obj) {
      return obj &amp;&amp; obj.__esModule ? obj : {default: obj};
    }

    function getDate() {
      var date = (0, _c2.default)();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      month = month &gt; 9 ? month : &quot;0&quot; + month;
      var day = date.getDate();
      day = day &gt; 9 ? day : &quot;0&quot; + day;
      return year + &quot;-&quot; + month + &quot;-&quot; + day;
    }
  }, &apos;./c&apos;: function (require, module, exports) {
    &quot;use strict&quot;;

    Object.defineProperty(exports, &quot;__esModule&quot;, {
      value: true
    });
    exports.default = now;

    function now() {
      var date = new Date();
      return date;
    }
  }, &apos;./b&apos;: function (require, module, exports) {
    &quot;use strict&quot;;

    Object.defineProperty(exports, &quot;__esModule&quot;, {
      value: true
    });
    exports.getDay = getDay;

    var _c = require(&quot;./c&quot;);

    var _c2 = _interopRequireDefault(_c);

    function _interopRequireDefault(obj) {
      return obj &amp;&amp; obj.__esModule ? obj : {default: obj};
    }

    function getDay() {
      var date = (0, _c2.default)();
      var arr = [&apos;&#x65E5;&apos;, &apos;&#x4E00;&apos;, &apos;&#x4E8C;&apos;, &apos;&#x4E09;&apos;, &apos;&#x56DB;&apos;, &apos;&#x4E94;&apos;, &apos;&#x516D;&apos;];
      return &quot;\u5468&quot; + arr[date.getDay()];
    }
  }
})
  " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">modules</span>) </span>{
  <span class="hljs-keyword">var</span> installedModules = {};

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">require</span>(<span class="hljs-params">moduleId</span>) </span>{
    <span class="hljs-keyword">if</span> (installedModules[moduleId]) {
      <span class="hljs-keyword">return</span> installedModules[moduleId].exports;
    }
    <span class="hljs-keyword">var</span> fn = modules[moduleId];
    <span class="hljs-keyword">var</span> <span class="hljs-built_in">module</span> = installedModules[moduleId] = {<span class="hljs-attr">exports</span>: {"}}";
    fn(<span class="hljs-built_in">require</span>, <span class="hljs-built_in">module</span>, <span class="hljs-built_in">module</span>.exports);
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">module</span>.exports;
  }

  <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;index&apos;</span>);
})({
  <span class="hljs-string">&apos;index&apos;</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">require, module, exports</span>) </span>{
<span class="hljs-meta">    &quot;use strict&quot;</span>;

    <span class="hljs-keyword">var</span> _a = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;./a&quot;</span>);

    <span class="hljs-keyword">var</span> _b = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;./b&quot;</span>);

    <span class="hljs-built_in">console</span>.log((<span class="hljs-number">0</span>, _a.getDate)() + <span class="hljs-string">&apos; &apos;</span> + (<span class="hljs-number">0</span>, _b.getDay)());
  }, <span class="hljs-string">&apos;./a&apos;</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">require, module, exports</span>) </span>{
<span class="hljs-meta">    &quot;use strict&quot;</span>;

    <span class="hljs-built_in">Object</span>.defineProperty(exports, <span class="hljs-string">&quot;__esModule&quot;</span>, {
      <span class="hljs-attr">value</span>: <span class="hljs-literal">true</span>
    });
    exports.getDate = getDate;

    <span class="hljs-keyword">var</span> _c = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;./c&quot;</span>);

    <span class="hljs-keyword">var</span> _c2 = _interopRequireDefault(_c);

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_interopRequireDefault</span>(<span class="hljs-params">obj</span>) </span>{
      <span class="hljs-keyword">return</span> obj &amp;&amp; obj.__esModule ? obj : {<span class="hljs-attr">default</span>: obj};
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getDate</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">var</span> date = (<span class="hljs-number">0</span>, _c2.default)();
      <span class="hljs-keyword">var</span> year = date.getFullYear();
      <span class="hljs-keyword">var</span> month = date.getMonth() + <span class="hljs-number">1</span>;
      month = month &gt; <span class="hljs-number">9</span> ? month : <span class="hljs-string">&quot;0&quot;</span> + month;
      <span class="hljs-keyword">var</span> day = date.getDate();
      day = day &gt; <span class="hljs-number">9</span> ? day : <span class="hljs-string">&quot;0&quot;</span> + day;
      <span class="hljs-keyword">return</span> year + <span class="hljs-string">&quot;-&quot;</span> + month + <span class="hljs-string">&quot;-&quot;</span> + day;
    }
  }, <span class="hljs-string">&apos;./c&apos;</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">require, module, exports</span>) </span>{
<span class="hljs-meta">    &quot;use strict&quot;</span>;

    <span class="hljs-built_in">Object</span>.defineProperty(exports, <span class="hljs-string">&quot;__esModule&quot;</span>, {
      <span class="hljs-attr">value</span>: <span class="hljs-literal">true</span>
    });
    exports.default = now;

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">now</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">var</span> date = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
      <span class="hljs-keyword">return</span> date;
    }
  }, <span class="hljs-string">&apos;./b&apos;</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">require, module, exports</span>) </span>{
<span class="hljs-meta">    &quot;use strict&quot;</span>;

    <span class="hljs-built_in">Object</span>.defineProperty(exports, <span class="hljs-string">&quot;__esModule&quot;</span>, {
      <span class="hljs-attr">value</span>: <span class="hljs-literal">true</span>
    });
    exports.getDay = getDay;

    <span class="hljs-keyword">var</span> _c = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;./c&quot;</span>);

    <span class="hljs-keyword">var</span> _c2 = _interopRequireDefault(_c);

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_interopRequireDefault</span>(<span class="hljs-params">obj</span>) </span>{
      <span class="hljs-keyword">return</span> obj &amp;&amp; obj.__esModule ? obj : {<span class="hljs-attr">default</span>: obj};
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getDay</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">var</span> date = (<span class="hljs-number">0</span>, _c2.default)();
      <span class="hljs-keyword">var</span> arr = [<span class="hljs-string">&apos;&#x65E5;&apos;</span>, <span class="hljs-string">&apos;&#x4E00;&apos;</span>, <span class="hljs-string">&apos;&#x4E8C;&apos;</span>, <span class="hljs-string">&apos;&#x4E09;&apos;</span>, <span class="hljs-string">&apos;&#x56DB;&apos;</span>, <span class="hljs-string">&apos;&#x4E94;&apos;</span>, <span class="hljs-string">&apos;&#x516D;&apos;</span>];
      <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;\u5468&quot;</span> + arr[date.getDay()];
    }
  }
})
  </code></pre><h2 id="articleHeader8">&#x603B;&#x7ED3;</h2><p>&#x8FD9;&#x6837;&#xFF0C;&#x57FA;&#x672C;&#x4E0A;&#x5904;&#x7406;js&#x4F9D;&#x8D56;&#x548C;&#x7F16;&#x8BD1;&#x7684;&#x5DE5;&#x4F5C;&#x7B97;&#x662F;&#x5B8C;&#x6210;&#x4E86;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack初探——js打包

## 原文链接
[https://segmentfault.com/a/1190000015296944](https://segmentfault.com/a/1190000015296944)

