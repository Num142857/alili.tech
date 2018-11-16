---
title: '前端进阶（6） - webpack 之外的另一种选择：rollup' 
date: 2018-11-15 2:30:08
hidden: true
categories: [reprint]
---

{{< raw >}}
<h1>webpack &#x4E4B;&#x5916;&#x7684;&#x53E6;&#x4E00;&#x79CD;&#x9009;&#x62E9;&#xFF1A;rollup</h1><p><a href="https://webpack.js.org/" rel="nofollow noreferrer">webpack</a> &#x5BF9;&#x524D;&#x7AEF;&#x6765;&#x8BF4;&#x662F;&#x518D;&#x719F;&#x6089;&#x4E0D;&#x8FC7;&#x7684;&#x5DE5;&#x5177;&#x4E86;&#xFF0C;&#x5B83;&#x63D0;&#x4F9B;&#x4E86;&#x5F3A;&#x5927;&#x7684;&#x529F;&#x80FD;&#x6765;&#x6784;&#x5EFA;&#x524D;&#x7AEF;&#x7684;&#x8D44;&#x6E90;&#xFF0C;&#x5305;&#x62EC; <code>html/js/ts/css/less/scss ...</code> &#x7B49;&#x8BED;&#x8A00;&#x811A;&#x672C;&#xFF0C;&#x4E5F;&#x5305;&#x62EC; <code>images/fonts ...</code> &#x7B49;&#x4E8C;&#x8FDB;&#x5236;&#x6587;&#x4EF6;&#x3002;</p><p>&#x5176;&#x5B9E;&#xFF0C;webpack &#x53D1;&#x8D77;&#x4E4B;&#x521D;&#x4E3B;&#x8981;&#x662F;&#x4E3A;&#x4E86;&#x89E3;&#x51B3;&#x4EE5;&#x4E0B;&#x4E24;&#x4E2A;&#x95EE;&#x9898;&#xFF1A;</p><ol><li>&#x4EE3;&#x7801;&#x62C6;&#x5206;&#xFF08;Code Splitting&#xFF09;: &#x53EF;&#x4EE5;&#x5C06;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x5206;&#x89E3;&#x6210;&#x53EF;&#x7BA1;&#x7406;&#x7684;&#x4EE3;&#x7801;&#x5757;&#xFF0C;&#x53EF;&#x4EE5;&#x6309;&#x9700;&#x52A0;&#x8F7D;&#xFF0C;&#x8FD9;&#x6837;&#x7528;&#x6237;&#x4FBF;&#x53EF;&#x5FEB;&#x901F;&#x4E0E;&#x5E94;&#x7528;&#x4EA4;&#x4E92;&#xFF0C;&#x800C;&#x4E0D;&#x5FC5;&#x7B49;&#x5230;&#x6574;&#x4E2A;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x4E0B;&#x8F7D;&#x548C;&#x89E3;&#x6790;&#x5B8C;&#x6210;&#x624D;&#x80FD;&#x4F7F;&#x7528;&#xFF0C;&#x4EE5;&#x6B64;&#x6784;&#x5EFA;&#x590D;&#x6742;&#x7684;&#x5355;&#x9875;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#xFF08;SPA&#xFF09;&#xFF1B;</li><li>&#x9759;&#x6001;&#x8D44;&#x6E90;&#xFF08;Static Assets&#xFF09;: &#x53EF;&#x4EE5;&#x5C06;&#x6240;&#x6709;&#x7684;&#x9759;&#x6001;&#x8D44;&#x6E90;&#xFF0C;&#x5982; js&#x3001;css&#x3001;&#x56FE;&#x7247;&#x3001;&#x5B57;&#x4F53;&#x7B49;&#xFF0C;&#x5BFC;&#x5165;&#x5230;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x4E2D;&#xFF0C;&#x7136;&#x540E;&#x7531; webpack &#x4F7F;&#x7528; hash &#x91CD;&#x547D;&#x540D;&#x9700;&#x8981;&#x7684;&#x8D44;&#x6E90;&#x6587;&#x4EF6;&#xFF0C;&#x800C;&#x65E0;&#x9700;&#x4E3A;&#x6587;&#x4EF6; URL &#x589E;&#x6DFB; hash &#x800C;&#x4F7F;&#x7528; hack &#x811A;&#x672C;&#xFF0C;&#x5E76;&#x4E14;&#x4E00;&#x4E2A;&#x8D44;&#x6E90;&#x8FD8;&#x80FD;&#x4F9D;&#x8D56;&#x5176;&#x4ED6;&#x8D44;&#x6E90;&#x3002;</li></ol><p>&#x6B63;&#x662F;&#x56E0;&#x4E3A; webpack &#x62E5;&#x6709;&#x5982;&#x6B64;&#x5F3A;&#x5927;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x6240;&#x4EE5; webpack &#x5728;&#x8FDB;&#x884C;&#x8D44;&#x6E90;&#x6253;&#x5305;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5C31;&#x4F1A;&#x4EA7;&#x751F;&#x5F88;&#x591A;&#x5197;&#x4F59;&#x7684;&#x4EE3;&#x7801;&#xFF08;&#x5982;&#x679C;&#x4F60;&#x6709;&#x67E5;&#x770B;&#x8FC7; webpack &#x7684; bundle &#x6587;&#x4EF6;&#xFF0C;&#x4FBF;&#x4F1A;&#x53D1;&#x73B0;&#xFF09;&#x3002;</p><p>&#x6BD4;&#x5982;&#xFF0C;&#x628A; <code>export default str =&gt; str;</code> &#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#x7528; webpack &#x6253;&#x5305;&#x5C31;&#x4F1A;&#x5F97;&#x5230;&#x4E0B;&#x9762;&#x7684;&#x7ED3;&#x679C;&#xFF1A;</p><pre><code>/******/ (function(modules) { // webpackBootstrap
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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

&quot;use strict&quot;;
Object.defineProperty(__webpack_exports__, &quot;__esModule&quot;, { value: true });

/* harmony default export */ __webpack_exports__[&quot;default&quot;] = (str =&gt; str);


/***/ })
/******/ ]);</code></pre><p>&#x8FD9;&#x5728;&#x4EE5;&#x4E0B;&#x7684;&#x4E00;&#x4E9B;&#x60C5;&#x5883;&#x4E2D;&#x5C31;&#x4E0D;&#x592A;&#x9AD8;&#x6548;&#xFF0C;&#x9700;&#x8981;&#x5BFB;&#x6C42;&#x66F4;&#x597D;&#x7684;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#xFF1A;</p><ol><li>&#x9700;&#x8981; js &#x9AD8;&#x6548;&#x8FD0;&#x884C;&#x3002;&#x56E0;&#x4E3A; webpack &#x5BF9;&#x5B50;&#x6A21;&#x5757;&#x5B9A;&#x4E49;&#x548C;&#x8FD0;&#x884C;&#x65F6;&#x7684;&#x4F9D;&#x8D56;&#x5904;&#x7406;&#xFF08;<code>__webpack_require__</code>&#xFF09;&#xFF0C;&#x4E0D;&#x4EC5;&#x5BFC;&#x81F4;&#x6587;&#x4EF6;&#x4F53;&#x79EF;&#x589E;&#x5927;&#xFF0C;&#x8FD8;&#x4F1A;&#x5927;&#x5E45;&#x62C9;&#x4F4E;&#x6027;&#x80FD;&#xFF1B;</li><li>&#x9879;&#x76EE;&#xFF08;&#x7279;&#x522B;&#x662F;&#x7C7B;&#x5E93;&#xFF09;&#x53EA;&#x6709; js&#xFF0C;&#x800C;&#x6CA1;&#x6709;&#x5176;&#x4ED6;&#x7684;&#x9759;&#x6001;&#x8D44;&#x6E90;&#x6587;&#x4EF6;&#xFF0C;&#x4F7F;&#x7528; webpack &#x5C31;&#x6709;&#x70B9;&#x5927;&#x624D;&#x5C0F;&#x7528;&#x4E86;&#xFF0C;&#x56E0;&#x4E3A; webpack bundle &#x6587;&#x4EF6;&#x7684;&#x4F53;&#x79EF;&#x7565;&#x5927;&#xFF0C;&#x8FD0;&#x884C;&#x7565;&#x6162;&#xFF0C;&#x53EF;&#x8BFB;&#x6027;&#x7565;&#x4F4E;&#x3002;</li></ol><p>&#x5728;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x5C31;&#x60F3;&#x8981;&#x5BFB;&#x6C42;&#x4E00;&#x79CD;&#x66F4;&#x597D;&#x7684;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#xFF0C;&#x8FD9;&#x4FBF;&#x662F; <a href="https://github.com/rollup/rollup" rel="nofollow noreferrer">rollup</a>.</p><p>&#x73B0;&#x5728;&#x5DF2;&#x7ECF;&#x6709;&#x5F88;&#x591A;&#x7C7B;&#x5E93;&#x90FD;&#x5728;&#x4F7F;&#x7528; <a href="https://github.com/rollup/rollup" rel="nofollow noreferrer">rollup</a> &#x8FDB;&#x884C;&#x6253;&#x5305;&#x4E86;&#xFF0C;&#x6BD4;&#x5982;&#xFF1A;<a href="https://github.com/facebook/react" rel="nofollow noreferrer">react</a>, <a href="https://github.com/vuejs/vue" rel="nofollow noreferrer">vue</a>, <a href="https://github.com/developit/preact" rel="nofollow noreferrer">preact</a>, <a href="https://github.com/mrdoob/three.js" rel="nofollow noreferrer">three.js</a>, <a href="https://github.com/moment/moment" rel="nofollow noreferrer">moment</a>, <a href="https://github.com/d3/d3" rel="nofollow noreferrer">d3</a> &#x7B49;&#x3002;</p><h2>1. &#x5DE5;&#x5177;</h2><p>&#x5B89;&#x88C5;</p><pre><code>npm i -g rollup          # &#x5168;&#x5C40;&#x5B89;&#x88C5;

npm i -D rollup          # &#x672C;&#x5730;&#x5B89;&#x88C5;</code></pre><p>&#x4F7F;&#x7528;</p><pre><code>rollup -c                # &#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#xFF0C;&#x8FDB;&#x884C;&#x6253;&#x5305;&#x64CD;&#x4F5C;</code></pre><p>&#x66F4;&#x591A;&#x8BE6;&#x7EC6;&#x7684;&#x7528;&#x6CD5;&#xFF0C;&#x53C2;&#x8003; <a href="https://rollupjs.org/guide/en#command-line-flags" rel="nofollow noreferrer">rollup.js - command-line-flags</a>.</p><h2>2. &#x914D;&#x7F6E;</h2><p><a href="https://github.com/rollup/rollup" rel="nofollow noreferrer">rollup</a> &#x7684;&#x914D;&#x7F6E;&#x4E0E; <a href="https://webpack.js.org/" rel="nofollow noreferrer">webpack</a> &#x7684;&#x914D;&#x7F6E;&#x7C7B;&#x4F3C;&#xFF0C;&#x5B9A;&#x4E49;&#x5728; <code>rollup.config.js</code> &#x6587;&#x4EF6;&#x4E2D;&#xFF0C;&#x6BD4;&#x5982;&#xFF1A;</p><pre><code>// rollup.config.js
export default {
  input: &apos;src/index.js&apos;,
  output: {
    file: &apos;bundle.js&apos;,
    // amd, cjs, esm, iife, umd, system
    format: &apos;cjs&apos;
  }
};</code></pre><p>&#x5E38;&#x7528;&#x7684;&#x51E0;&#x4E2A;&#x914D;&#x7F6E;&#x9879;&#xFF1A;</p><ol><li><code>input</code>: &#x6E90;&#x7801;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#xFF0C;&#x4E00;&#x822C;&#x662F;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#xFF0C;&#x5982; <code>src/index.js</code>&#x3002;</li><li><code>output</code>: &#x5B9A;&#x4E49;&#x8F93;&#x51FA;&#xFF0C;&#x5982;&#x6587;&#x4EF6;&#x540D;&#xFF0C;&#x76EE;&#x6807;&#x76EE;&#x5F55;&#xFF0C;&#x8F93;&#x51FA;&#x6A21;&#x5757;&#x8303;&#x5F0F;&#xFF08;<code>es6</code>, <code>commonjs</code>, <code>amd</code>, <code>umd</code>, <code>iife</code> &#x7B49;&#xFF09;&#xFF0C;&#x6A21;&#x5757;&#x5BFC;&#x51FA;&#x540D;&#x79F0;&#xFF0C;&#x5916;&#x90E8;&#x5E93;&#x58F0;&#x660E;&#xFF0C;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x7B49;&#x3002;</li><li><code>plugins</code>: &#x63D2;&#x4EF6;&#xFF0C;&#x6BD4;&#x5982; <a href="https://github.com/rollup/rollup-plugin-json" rel="nofollow noreferrer">rollup-plugin-json</a> &#x53EF;&#x4EE5;&#x8BA9; rollup &#x4ECE; <code>.json</code> &#x6587;&#x4EF6;&#x4E2D;&#x5BFC;&#x5165; json &#x6570;&#x636E;&#x3002;</li></ol><p>&#x66F4;&#x591A;&#x8BE6;&#x7EC6;&#x7684;&#x914D;&#x7F6E;&#xFF0C;&#x53C2;&#x8003; <a href="https://rollupjs.org/guide/en#configuration-files" rel="nofollow noreferrer">rollup.js - configuration-files</a>.</p><h2>3. rollup &#x4E0E; webpack &#x5BF9;&#x6BD4;</h2><p>&#x5148;&#x62FF;&#x6BB5;&#x4EE3;&#x7801;&#x6765;&#x6765;&#x770B;&#x770B;&#x4ED6;&#x4EEC;&#x6253;&#x5305;&#x4E4B;&#x540E;&#x5404;&#x81EA;&#x662F;&#x4EC0;&#x4E48;&#x6548;&#x679C;&#x3002;</p><p>&#x6E90;&#x4EE3;&#x7801;</p><pre><code># &#x76EE;&#x5F55;
|-- src/
    |-- index.js
    |-- prefix.js
    |-- suffix.js

    
# prefix.js
const prefix = &apos;prefix&apos;;

export default str =&gt; `${prefix} | ${str}`;
    
    
# suffix.js
const suffix = &apos;suffix&apos;;

export default str =&gt; `${str} | ${suffix}`;


# index.js
import prefix from &apos;./prefix&apos;;
import suffix from &apos;./suffix&apos;;

export default str =&gt; suffix(prefix(str)); </code></pre><p>&#x914D;&#x7F6E;</p><pre><code># webpack.config.js
module.exports = {
  entry: &apos;./src/index.js&apos;,
  output: {
    filename: &apos;dist/webpack.bundle.js&apos;,
    library: &apos;demo&apos;,
    libraryTarget: &apos;umd&apos;
  }
};


# rollup.config.js
export default {
  input: &apos;src/index.js&apos;,
  output: {
    file: &apos;dist/rollup.bundle.js&apos;,
    name: &apos;demo&apos;,
    format: &apos;umd&apos;
  }
};</code></pre><p>&#x8FD0;&#x884C;</p><pre><code># webpack &#x6253;&#x5305;
webpack


# rollup &#x6253;&#x5305;
rollup -c</code></pre><p>webpack.bundle.js</p><pre><code>(function webpackUniversalModuleDefinition(root, factory) {
    if(typeof exports === &apos;object&apos; &amp;&amp; typeof module === &apos;object&apos;)
        module.exports = factory();
    else if(typeof define === &apos;function&apos; &amp;&amp; define.amd)
        define([], factory);
    else if(typeof exports === &apos;object&apos;)
        exports[&quot;demo&quot;] = factory();
    else
        root[&quot;demo&quot;] = factory();
})(typeof self !== &apos;undefined&apos; ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

&quot;use strict&quot;;
Object.defineProperty(__webpack_exports__, &quot;__esModule&quot;, { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__prefix__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__suffix__ = __webpack_require__(2);



/* harmony default export */ __webpack_exports__[&quot;default&quot;] = (str =&gt; Object(__WEBPACK_IMPORTED_MODULE_1__suffix__[&quot;a&quot; /* default */])(Object(__WEBPACK_IMPORTED_MODULE_0__prefix__[&quot;a&quot; /* default */])(str)));


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

&quot;use strict&quot;;
const prefix = &apos;prefix&apos;;

/* harmony default export */ __webpack_exports__[&quot;a&quot;] = (str =&gt; `${prefix} | ${str}`);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

&quot;use strict&quot;;
const suffix = &apos;suffix&apos;;

/* harmony default export */ __webpack_exports__[&quot;a&quot;] = (str =&gt; `${str} | ${suffix}`);


/***/ })
/******/ ]);
});</code></pre><p>rollup.bundle.js</p><pre><code>(function (global, factory) {
    typeof exports === &apos;object&apos; &amp;&amp; typeof module !== &apos;undefined&apos; ? module.exports = factory() :
    typeof define === &apos;function&apos; &amp;&amp; define.amd ? define(factory) :
    (global.demo = factory());
}(this, (function () { &apos;use strict&apos;;

    const prefix = &apos;prefix&apos;;

    var prefix$1 = str =&gt; `${prefix} | ${str}`;

    const suffix = &apos;suffix&apos;;

    var suffix$1 = str =&gt; `${str} | ${suffix}`;

    var index = str =&gt; suffix$1(prefix$1(str));

    return index;

})));</code></pre><p>&#x5176;&#x5B9E;&#xFF0C;&#x4F60;&#x4E5F;&#x57FA;&#x672C;&#x4E0A;&#x770B;&#x51FA;&#x6765;&#x4E86;&#xFF0C;&#x5728;&#x8FD9;&#x79CD;&#x573A;&#x666F;&#x4E0B;&#xFF0C;rollup &#x7684;&#x4F18;&#x52BF;&#x5728;&#x54EA;&#x91CC;&#xFF1A;</p><ol><li>&#x6587;&#x4EF6;&#x5F88;&#x5C0F;&#xFF0C;&#x51E0;&#x4E4E;&#x6CA1;&#x4EC0;&#x4E48;&#x591A;&#x4F59;&#x4EE3;&#x7801;&#xFF0C;&#x9664;&#x4E86;&#x5FC5;&#x8981;&#x7684; <code>cjs</code>, <code>umd</code> &#x5934;&#x5916;&#xFF0C;bundle &#x4EE3;&#x7801;&#x57FA;&#x672C;&#x548C;&#x6E90;&#x7801;&#x5DEE;&#x4E0D;&#x591A;&#xFF0C;&#x4E5F;&#x6CA1;&#x6709;&#x5947;&#x602A;&#x7684; <code>__webpack_require__</code>, <code>Object.defineProperty</code> &#x4E4B;&#x7C7B;&#x7684;&#x4E1C;&#x897F;&#xFF1B;</li><li>&#x6267;&#x884C;&#x5F88;&#x5FEB;&#xFF0C;&#x56E0;&#x4E3A;&#x6CA1;&#x6709; webpack bundle &#x4E2D;&#x7684; <code>__webpack_require__</code>, <code>Object.defineProperty</code> &#x4E4B;&#x7C7B;&#x7684;&#x5197;&#x4F59;&#x4EE3;&#x7801;&#xFF1B;</li><li>&#x53E6;&#x5916;&#xFF0C;rollup &#x4E5F;&#x5BF9; es &#x6A21;&#x5757;&#x8F93;&#x51FA;&#x53CA; iife &#x683C;&#x5F0F;&#x6253;&#x5305;&#x6709;&#x5F88;&#x597D;&#x7684;&#x652F;&#x6301;&#x3002;</li></ol><h2>4. &#x7ED3;&#x8BBA;</h2><p>rollup &#x76F8;&#x5BF9; webpack &#x800C;&#x8A00;&#xFF0C;&#x8981;&#x5C0F;&#x5DE7;&#x3001;&#x5E72;&#x51C0;&#x5229;&#x843D;&#x4E00;&#x4E9B;&#xFF0C;&#x4F46;&#x4E0D;&#x5177;&#x5907; webpack &#x7684;&#x4E00;&#x4E9B;&#x5F3A;&#x5927;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x5982;&#x70ED;&#x66F4;&#x65B0;&#xFF0C;&#x4EE3;&#x7801;&#x5206;&#x5272;&#xFF0C;&#x516C;&#x5171;&#x4F9D;&#x8D56;&#x63D0;&#x53D6;&#x7B49;&#x3002;</p><p>&#x6240;&#x4EE5;&#xFF0C;&#x4E00;&#x4E2A;&#x4E0D;&#x9519;&#x7684;&#x9009;&#x62E9;&#x662F;&#xFF0C;&#x5E94;&#x7528;&#x4F7F;&#x7528; webpack&#xFF0C;&#x7C7B;&#x5E93;&#x4F7F;&#x7528; rollup&#x3002;</p><h2>5. &#x540E;&#x7EED;</h2><p>&#x66F4;&#x591A;&#x535A;&#x5BA2;&#xFF0C;&#x67E5;&#x770B; <a href="https://github.com/senntyou/blogs" rel="nofollow noreferrer">https://github.com/senntyou/blogs</a></p><p>&#x4F5C;&#x8005;&#xFF1A;<a href="https://github.com/senntyou" rel="nofollow noreferrer">&#x6DF1;&#x4E88;&#x4E4B; (@senntyou)</a></p><p>&#x7248;&#x6743;&#x58F0;&#x660E;&#xFF1A;&#x81EA;&#x7531;&#x8F6C;&#x8F7D;-&#x975E;&#x5546;&#x7528;-&#x975E;&#x884D;&#x751F;-&#x4FDD;&#x6301;&#x7F72;&#x540D;&#xFF08;<a href="https://creativecommons.org/licenses/by-nc-nd/3.0/deed.zh" rel="nofollow noreferrer">&#x521B;&#x610F;&#x5171;&#x4EAB;3.0&#x8BB8;&#x53EF;&#x8BC1;</a>&#xFF09;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端进阶（6） - webpack 之外的另一种选择：rollup

## 原文链接
[https://segmentfault.com/a/1190000016132385](https://segmentfault.com/a/1190000016132385)

