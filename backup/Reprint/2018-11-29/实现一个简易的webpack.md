---
title: '实现一个简易的webpack' 
date: 2018-11-29 2:30:09
hidden: true
slug: f5i18v6pzu6
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x80CC;&#x666F;</h2><p>&#x968F;&#x7740;&#x524D;&#x7AEF;&#x590D;&#x6742;&#x5EA6;&#x7684;&#x4E0D;&#x65AD;&#x63D0;&#x5347;&#xFF0C;&#x8BDE;&#x751F;&#x51FA;&#x5F88;&#x591A;&#x6253;&#x5305;&#x5DE5;&#x5177;&#xFF0C;&#x6BD4;&#x5982;&#x6700;&#x5148;&#x7684;<code>grunt</code>&#xFF0C;<code>gulp</code>&#x3002;&#x5230;&#x540E;&#x6765;&#x7684;<code>webpack</code>&#x548C;<code>Parcel</code>&#x3002;&#x4F46;&#x662F;&#x76EE;&#x524D;&#x5F88;&#x591A;&#x811A;&#x624B;&#x67B6;&#x5DE5;&#x5177;&#xFF0C;&#x6BD4;&#x5982;<code>vue-cli</code>&#x5DF2;&#x7ECF;&#x5E2E;&#x6211;&#x4EEC;&#x96C6;&#x6210;&#x4E86;&#x4E00;&#x4E9B;&#x6784;&#x5EFA;&#x5DE5;&#x5177;&#x7684;&#x4F7F;&#x7528;&#x3002;&#x6709;&#x7684;&#x65F6;&#x5019;&#x6211;&#x4EEC;&#x53EF;&#x80FD;&#x5E76;&#x4E0D;&#x77E5;&#x9053;&#x5176;&#x5185;&#x90E8;&#x7684;&#x5B9E;&#x73B0;&#x539F;&#x7406;&#x3002;&#x5176;&#x5B9E;&#x4E86;&#x89E3;&#x8FD9;&#x4E9B;&#x5DE5;&#x5177;&#x7684;&#x5DE5;&#x4F5C;&#x65B9;&#x5F0F;&#x53EF;&#x4EE5;&#x5E2E;&#x52A9;&#x6211;&#x4EEC;&#x66F4;&#x597D;&#x7406;&#x89E3;&#x548C;&#x4F7F;&#x7528;&#x8FD9;&#x4E9B;&#x5DE5;&#x5177;&#xFF0C;&#x4E5F;&#x65B9;&#x4FBF;&#x6211;&#x4EEC;&#x5728;&#x9879;&#x76EE;&#x5F00;&#x53D1;&#x4E2D;&#x5E94;&#x7528;&#x3002;</p><h2 id="articleHeader1">&#x4E00;&#x4E9B;&#x77E5;&#x8BC6;&#x70B9;</h2><p>&#x5728;&#x6211;&#x4EEC;&#x5F00;&#x59CB;&#x9020;&#x8F6E;&#x5B50;&#x524D;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5BF9;&#x4E00;&#x4E9B;&#x77E5;&#x8BC6;&#x70B9;&#x505A;&#x4E00;&#x4E9B;&#x50A8;&#x5907;&#x5DE5;&#x4F5C;&#x3002;</p><h4>&#x6A21;&#x5757;&#x5316;&#x77E5;&#x8BC6;</h4><p>&#x9996;&#x5148;&#x662F;&#x6A21;&#x5757;&#x7684;&#x76F8;&#x5173;&#x77E5;&#x8BC6;&#xFF0C;&#x4E3B;&#x8981;&#x7684;&#x662F; <code>es6 modules</code> &#x548C; <code>commonJS</code>&#x6A21;&#x5757;&#x5316;&#x7684;&#x89C4;&#x8303;&#x3002;&#x66F4;&#x8BE6;&#x7EC6;&#x7684;&#x4ECB;&#x7ECD;&#x53EF;&#x4EE5;&#x53C2;&#x8003;&#x8FD9;&#x91CC; <a href="https://github.com/muwoo/blogs/issues/28" rel="nofollow noreferrer" target="_blank">CommonJS&#x3001;AMD/CMD&#x3001;ES6 Modules &#x4EE5;&#x53CA; webpack &#x539F;&#x7406;&#x6D45;&#x6790;</a>&#x3002;&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x53EA;&#x9700;&#x8981;&#x4E86;&#x89E3;&#xFF1A;</p><ol><li><code>es6 modules</code> &#x662F;&#x4E00;&#x4E2A;&#x7F16;&#x8BD1;&#x65F6;&#x5C31;&#x4F1A;&#x786E;&#x5B9A;&#x6A21;&#x5757;&#x4F9D;&#x8D56;&#x5173;&#x7CFB;&#x7684;&#x65B9;&#x5F0F;&#x3002;</li><li><code>CommonJS</code>&#x7684;&#x6A21;&#x5757;&#x89C4;&#x8303;&#x4E2D;&#xFF0C;Node &#x5728;&#x5BF9; JS &#x6587;&#x4EF6;&#x8FDB;&#x884C;&#x7F16;&#x8BD1;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x4F1A;&#x5BF9;&#x6587;&#x4EF6;&#x4E2D;&#x7684;&#x5185;&#x5BB9;&#x8FDB;&#x884C;&#x5934;&#x5C3E;&#x5305;&#x88C5;&#xFF0C;&#x5728;&#x5934;&#x90E8;&#x6DFB;&#x52A0;<code>(function (export, require, modules, __filename, __dirname){\n</code> &#x5728;&#x5C3E;&#x90E8;&#x6DFB;&#x52A0;&#x4E86;<code>\n};</code>&#x3002;&#x8FD9;&#x6837;&#x6211;&#x4EEC;&#x5728;&#x5355;&#x4E2A;JS&#x6587;&#x4EF6;&#x5185;&#x90E8;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x8FD9;&#x4E9B;&#x53C2;&#x6570;&#x3002;</li></ol><h4>AST &#x57FA;&#x7840;&#x77E5;&#x8BC6;</h4><p>&#x4EC0;&#x4E48;&#x662F;&#x62BD;&#x8C61;&#x8BED;&#x6CD5;&#x6811;&#xFF1F;</p><blockquote>&#x5728;&#x8BA1;&#x7B97;&#x673A;&#x79D1;&#x5B66;&#x4E2D;&#xFF0C;&#x62BD;&#x8C61;&#x8BED;&#x6CD5;&#x6811;&#xFF08;abstract syntax tree &#x6216;&#x8005;&#x7F29;&#x5199;&#x4E3A; AST&#xFF09;&#xFF0C;&#x6216;&#x8005;&#x8BED;&#x6CD5;&#x6811;&#xFF08;syntax tree&#xFF09;&#xFF0C;&#x662F;&#x6E90;&#x4EE3;&#x7801;&#x7684;&#x62BD;&#x8C61;&#x8BED;&#x6CD5;&#x7ED3;&#x6784;&#x7684;&#x6811;&#x72B6;&#x8868;&#x73B0;&#x5F62;&#x5F0F;&#xFF0C;&#x8FD9;&#x91CC;&#x7279;&#x6307;&#x7F16;&#x7A0B;&#x8BED;&#x8A00;&#x7684;&#x6E90;&#x4EE3;&#x7801;&#x3002;&#x6811;&#x4E0A;&#x7684;&#x6BCF;&#x4E2A;&#x8282;&#x70B9;&#x90FD;&#x8868;&#x793A;&#x6E90;&#x4EE3;&#x7801;&#x4E2D;&#x7684;&#x4E00;&#x79CD;&#x7ED3;&#x6784;&#x3002;&#x4E4B;&#x6240;&#x4EE5;&#x8BF4;&#x8BED;&#x6CD5;&#x662F;&#x300C;&#x62BD;&#x8C61;&#x300D;&#x7684;&#xFF0C;&#x662F;&#x56E0;&#x4E3A;&#x8FD9;&#x91CC;&#x7684;&#x8BED;&#x6CD5;&#x5E76;&#x4E0D;&#x4F1A;&#x8868;&#x793A;&#x51FA;&#x771F;&#x5B9E;&#x8BED;&#x6CD5;&#x4E2D;&#x51FA;&#x73B0;&#x7684;&#x6BCF;&#x4E2A;&#x7EC6;&#x8282;&#x3002;</blockquote><p><span class="img-wrap"><img data-src="/img/remote/1460000015225753?w=678&amp;h=363" src="https://static.alili.tech/img/remote/1460000015225753?w=678&amp;h=363" alt="image" title="image" style="cursor:pointer;display:inline"></span></p><p>&#x5927;&#x5BB6;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;<a href="http://esprima.org/demo/parse.html#" rel="nofollow noreferrer" target="_blank">Esprima</a> &#x8FD9;&#x4E2A;&#x7F51;&#x7AD9;&#x6765;&#x5C06;&#x4EE3;&#x7801;&#x8F6C;&#x5316;&#x6210; <code>ast</code>&#x3002;&#x9996;&#x5148;&#x4E00;&#x6BB5;&#x4EE3;&#x7801;&#x8F6C;&#x5316;&#x6210;&#x7684;&#x62BD;&#x8C61;&#x8BED;&#x6CD5;&#x6811;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x8BE5;&#x5BF9;&#x8C61;&#x4F1A;&#x6709;&#x4E00;&#x4E2A;&#x9876;&#x7EA7;&#x7684;<code>type</code>&#x5C5E;&#x6027;<code>Program</code>,&#x7B2C;&#x4E8C;&#x4E2A;&#x5C5E;&#x6027;&#x662F;<code>body</code>&#x662F;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x3002;body&#x6570;&#x7EC4;&#x4E2D;&#x5B58;&#x653E;&#x7684;&#x6BCF;&#x4E00;&#x9879;&#x90FD;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x91CC;&#x9762;&#x5305;&#x542B;&#x4E86;&#x6240;&#x6709;&#x7684;&#x5BF9;&#x4E8E;&#x8BE5;&#x8BED;&#x53E5;&#x7684;&#x63CF;&#x8FF0;&#x4FE1;&#x606F;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="type:&#x63CF;&#x8FF0;&#x8BE5;&#x8BED;&#x53E5;&#x7684;&#x7C7B;&#x578B; --&#x53D8;&#x91CF;&#x58F0;&#x660E;&#x8BED;&#x53E5;
kind&#xFF1A;&#x53D8;&#x91CF;&#x58F0;&#x660E;&#x7684;&#x5173;&#x952E;&#x5B57; -- var
declaration: &#x58F0;&#x660E;&#x7684;&#x5185;&#x5BB9;&#x6570;&#x7EC4;&#xFF0C;&#x91CC;&#x9762;&#x7684;&#x6BCF;&#x4E00;&#x9879;&#x4E5F;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;
    type: &#x63CF;&#x8FF0;&#x8BE5;&#x8BED;&#x53E5;&#x7684;&#x7C7B;&#x578B; 
    id: &#x63CF;&#x8FF0;&#x53D8;&#x91CF;&#x540D;&#x79F0;&#x7684;&#x5BF9;&#x8C61;
        type&#xFF1A;&#x5B9A;&#x4E49;
        name: &#x662F;&#x53D8;&#x91CF;&#x7684;&#x540D;&#x5B57;
        init: &#x521D;&#x59CB;&#x5316;&#x53D8;&#x91CF;&#x503C;&#x5F97;&#x5BF9;&#x8C61;
        type: &#x7C7B;&#x578B;
        value: &#x503C; &quot;is tree&quot; &#x4E0D;&#x5E26;&#x5F15;&#x53F7;
        row: &quot;\&quot;is tree&quot;\&quot; &#x5E26;&#x5F15;&#x53F7;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs elm"><code><span class="hljs-keyword">type</span>:&#x63CF;&#x8FF0;&#x8BE5;&#x8BED;&#x53E5;&#x7684;&#x7C7B;&#x578B; <span class="hljs-comment">--&#x53D8;&#x91CF;&#x58F0;&#x660E;&#x8BED;&#x53E5;</span>
<span class="hljs-title">kind</span>&#xFF1A;&#x53D8;&#x91CF;&#x58F0;&#x660E;&#x7684;&#x5173;&#x952E;&#x5B57; <span class="hljs-comment">-- var</span>
<span class="hljs-title">declaration</span>: &#x58F0;&#x660E;&#x7684;&#x5185;&#x5BB9;&#x6570;&#x7EC4;&#xFF0C;&#x91CC;&#x9762;&#x7684;&#x6BCF;&#x4E00;&#x9879;&#x4E5F;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;
    <span class="hljs-keyword">type</span>: &#x63CF;&#x8FF0;&#x8BE5;&#x8BED;&#x53E5;&#x7684;&#x7C7B;&#x578B; 
    id: &#x63CF;&#x8FF0;&#x53D8;&#x91CF;&#x540D;&#x79F0;&#x7684;&#x5BF9;&#x8C61;
        <span class="hljs-keyword">type</span>&#xFF1A;&#x5B9A;&#x4E49;
        name: &#x662F;&#x53D8;&#x91CF;&#x7684;&#x540D;&#x5B57;
        init: &#x521D;&#x59CB;&#x5316;&#x53D8;&#x91CF;&#x503C;&#x5F97;&#x5BF9;&#x8C61;
        <span class="hljs-keyword">type</span>: &#x7C7B;&#x578B;
        value: &#x503C; <span class="hljs-string">&quot;is tree&quot;</span> &#x4E0D;&#x5E26;&#x5F15;&#x53F7;
        row: <span class="hljs-string">&quot;\&quot;is tree&quot;</span>\<span class="hljs-string">&quot; &#x5E26;&#x5F15;&#x53F7;</span></code></pre><h2 id="articleHeader2">&#x8FDB;&#x5165;&#x6B63;&#x9898;</h2><h4>webpack &#x7B80;&#x6613;&#x6253;&#x5305;</h4><p>&#x6709;&#x4E86;&#x4E0A;&#x9762;&#x8FD9;&#x4E9B;&#x57FA;&#x7840;&#x7684;&#x77E5;&#x8BC6;&#xFF0C;&#x6211;&#x4EEC;&#x5148;&#x6765;&#x770B;&#x4E00;&#x4E0B;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;<code>webpack</code>&#x6253;&#x5305;&#x7684;&#x8FC7;&#x7A0B;&#xFF0C;&#x9996;&#x5148;&#x6211;&#x4EEC;&#x5B9A;&#x4E49;3&#x4E2A;&#x6587;&#x4EF6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// index.js
import a from &apos;./test&apos;

console.log(a)

// test.js
import b from &apos;./message&apos;

const a = &apos;hello&apos; + b

export default a

// message.js
const b = &apos;world&apos;

export default b" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// index.js</span>
<span class="hljs-keyword">import</span> a <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./test&apos;</span>

<span class="hljs-built_in">console</span>.log(a)

<span class="hljs-comment">// test.js</span>
<span class="hljs-keyword">import</span> b <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./message&apos;</span>

<span class="hljs-keyword">const</span> a = <span class="hljs-string">&apos;hello&apos;</span> + b

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> a

<span class="hljs-comment">// message.js</span>
<span class="hljs-keyword">const</span> b = <span class="hljs-string">&apos;world&apos;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> b</code></pre><p>&#x65B9;&#x5F0F;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x5B9A;&#x4E49;&#x4E86;&#x4E00;&#x4E2A;<code>index.js</code>&#x5F15;&#x7528;<code>test.js</code>&#xFF1B;<code>test.js</code>&#x5185;&#x90E8;&#x5F15;&#x7528;<code>message.js</code>&#x3002;&#x770B;&#x4E00;&#x4E0B;&#x6253;&#x5305;&#x540E;&#x7684;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function (modules) {
  var installedModules = {};

  function __webpack_require__(moduleId) {
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }

    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    };

    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    // Flag the module as loaded
    module.l = true;
    // Return the exports of the module
    return module.exports;
  }

  // expose the modules object (__webpack_modules__)
  __webpack_require__.m = modules;
  // expose the module cache
  __webpack_require__.c = installedModules;
  // define getter function for harmony exports
  __webpack_require__.d = function (exports, name, getter) {
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, {enumerable: true, get: getter});
    }
  };
  // define __esModule on exports
  __webpack_require__.r = function (exports) {
    if (typeof Symbol !== &apos;undefined&apos; &amp;&amp; Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, {value: &apos;Module&apos;});
    }
    Object.defineProperty(exports, &apos;__esModule&apos;, {value: true});
  };
  // create a fake namespace object
  // mode &amp; 1: value is a module id, require it
  // mode &amp; 2: merge all properties of value into the ns
  // mode &amp; 4: return value when already ns object
  // mode &amp; 8|1: behave like require
  __webpack_require__.t = function (value, mode) {
    /******/
    if (mode &amp; 1) value = __webpack_require__(value);
    if (mode &amp; 8) return value;
    if ((mode &amp; 4) &amp;&amp; typeof value === &apos;object&apos; &amp;&amp; value &amp;&amp; value.__esModule) return value;
    var ns = Object.create(null);
    __webpack_require__.r(ns);
    Object.defineProperty(ns, &apos;default&apos;, {enumerable: true, value: value});
    if (mode &amp; 2 &amp;&amp; typeof value != &apos;string&apos;) for (var key in value) __webpack_require__.d(ns, key, function (key) {
      return value[key];
    }.bind(null, key));
    return ns;
  };
  // getDefaultExport function for compatibility with non-harmony modules
  __webpack_require__.n = function (module) {
    var getter = module &amp;&amp; module.__esModule ?
      function getDefault() {
        return module[&apos;default&apos;];
      } :
      function getModuleExports() {
        return module;
      };
    __webpack_require__.d(getter, &apos;a&apos;, getter);
    return getter;
  };
  // Object.prototype.hasOwnProperty.call
  __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  // __webpack_public_path__
  __webpack_require__.p = &quot;&quot;;
  // Load entry module and return exports
  return __webpack_require__(__webpack_require__.s = &quot;./src/index.js&quot;);
})({
  &quot;./src/index.js&quot;: (function (module, __webpack_exports__, __webpack_require__) {

    &quot;use strict&quot;;
    eval(&quot;__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _test__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./test */ \&quot;./src/test.js\&quot;);\n\n\nconsole.log(_test__WEBPACK_IMPORTED_MODULE_0__[\&quot;default\&quot;])\n\n\n//# sourceURL=webpack:///./src/index.js?&quot;);

  }),
  &quot;./src/message.js&quot;: (function (module, __webpack_exports__, __webpack_require__) {
    // ...
  }),
  &quot;./src/test.js&quot;: (function (module, __webpack_exports__, __webpack_require__) {
    // ...
  })
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">modules</span>) </span>{
  <span class="hljs-keyword">var</span> installedModules = {};

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">__webpack_require__</span>(<span class="hljs-params">moduleId</span>) </span>{
    <span class="hljs-keyword">if</span> (installedModules[moduleId]) {
      <span class="hljs-keyword">return</span> installedModules[moduleId].exports;
    }

    <span class="hljs-keyword">var</span> <span class="hljs-built_in">module</span> = installedModules[moduleId] = {
      <span class="hljs-attr">i</span>: moduleId,
      <span class="hljs-attr">l</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">exports</span>: {}
    };

    modules[moduleId].call(<span class="hljs-built_in">module</span>.exports, <span class="hljs-built_in">module</span>, <span class="hljs-built_in">module</span>.exports, __webpack_require__);
    <span class="hljs-comment">// Flag the module as loaded</span>
    <span class="hljs-built_in">module</span>.l = <span class="hljs-literal">true</span>;
    <span class="hljs-comment">// Return the exports of the module</span>
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">module</span>.exports;
  }

  <span class="hljs-comment">// expose the modules object (__webpack_modules__)</span>
  __webpack_require__.m = modules;
  <span class="hljs-comment">// expose the module cache</span>
  __webpack_require__.c = installedModules;
  <span class="hljs-comment">// define getter function for harmony exports</span>
  __webpack_require__.d = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">exports, name, getter</span>) </span>{
    <span class="hljs-keyword">if</span> (!__webpack_require__.o(exports, name)) {
      <span class="hljs-built_in">Object</span>.defineProperty(exports, name, {<span class="hljs-attr">enumerable</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">get</span>: getter});
    }
  };
  <span class="hljs-comment">// define __esModule on exports</span>
  __webpack_require__.r = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">exports</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Symbol</span> !== <span class="hljs-string">&apos;undefined&apos;</span> &amp;&amp; <span class="hljs-built_in">Symbol</span>.toStringTag) {
      <span class="hljs-built_in">Object</span>.defineProperty(exports, <span class="hljs-built_in">Symbol</span>.toStringTag, {<span class="hljs-attr">value</span>: <span class="hljs-string">&apos;Module&apos;</span>});
    }
    <span class="hljs-built_in">Object</span>.defineProperty(exports, <span class="hljs-string">&apos;__esModule&apos;</span>, {<span class="hljs-attr">value</span>: <span class="hljs-literal">true</span>});
  };
  <span class="hljs-comment">// create a fake namespace object</span>
  <span class="hljs-comment">// mode &amp; 1: value is a module id, require it</span>
  <span class="hljs-comment">// mode &amp; 2: merge all properties of value into the ns</span>
  <span class="hljs-comment">// mode &amp; 4: return value when already ns object</span>
  <span class="hljs-comment">// mode &amp; 8|1: behave like require</span>
  __webpack_require__.t = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value, mode</span>) </span>{
    <span class="hljs-comment">/******/</span>
    <span class="hljs-keyword">if</span> (mode &amp; <span class="hljs-number">1</span>) value = __webpack_require__(value);
    <span class="hljs-keyword">if</span> (mode &amp; <span class="hljs-number">8</span>) <span class="hljs-keyword">return</span> value;
    <span class="hljs-keyword">if</span> ((mode &amp; <span class="hljs-number">4</span>) &amp;&amp; <span class="hljs-keyword">typeof</span> value === <span class="hljs-string">&apos;object&apos;</span> &amp;&amp; value &amp;&amp; value.__esModule) <span class="hljs-keyword">return</span> value;
    <span class="hljs-keyword">var</span> ns = <span class="hljs-built_in">Object</span>.create(<span class="hljs-literal">null</span>);
    __webpack_require__.r(ns);
    <span class="hljs-built_in">Object</span>.defineProperty(ns, <span class="hljs-string">&apos;default&apos;</span>, {<span class="hljs-attr">enumerable</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">value</span>: value});
    <span class="hljs-keyword">if</span> (mode &amp; <span class="hljs-number">2</span> &amp;&amp; <span class="hljs-keyword">typeof</span> value != <span class="hljs-string">&apos;string&apos;</span>) <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> value) __webpack_require__.d(ns, key, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">key</span>) </span>{
      <span class="hljs-keyword">return</span> value[key];
    }.bind(<span class="hljs-literal">null</span>, key));
    <span class="hljs-keyword">return</span> ns;
  };
  <span class="hljs-comment">// getDefaultExport function for compatibility with non-harmony modules</span>
  __webpack_require__.n = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">module</span>) </span>{
    <span class="hljs-keyword">var</span> getter = <span class="hljs-built_in">module</span> &amp;&amp; <span class="hljs-built_in">module</span>.__esModule ?
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getDefault</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">module</span>[<span class="hljs-string">&apos;default&apos;</span>];
      } :
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getModuleExports</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">module</span>;
      };
    __webpack_require__.d(getter, <span class="hljs-string">&apos;a&apos;</span>, getter);
    <span class="hljs-keyword">return</span> getter;
  };
  <span class="hljs-comment">// Object.prototype.hasOwnProperty.call</span>
  __webpack_require__.o = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">object, property</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.hasOwnProperty.call(object, property);
  };
  <span class="hljs-comment">// __webpack_public_path__</span>
  __webpack_require__.p = <span class="hljs-string">&quot;&quot;</span>;
  <span class="hljs-comment">// Load entry module and return exports</span>
  <span class="hljs-keyword">return</span> __webpack_require__(__webpack_require__.s = <span class="hljs-string">&quot;./src/index.js&quot;</span>);
})({
  <span class="hljs-string">&quot;./src/index.js&quot;</span>: (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">module, __webpack_exports__, __webpack_require__</span>) </span>{
<span class="hljs-meta">
    &quot;use strict&quot;</span>;
    <span class="hljs-built_in">eval</span>(<span class="hljs-string">&quot;__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _test__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./test */ \&quot;./src/test.js\&quot;);\n\n\nconsole.log(_test__WEBPACK_IMPORTED_MODULE_0__[\&quot;default\&quot;])\n\n\n//# sourceURL=webpack:///./src/index.js?&quot;</span>);

  }),
  <span class="hljs-string">&quot;./src/message.js&quot;</span>: (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">module, __webpack_exports__, __webpack_require__</span>) </span>{
    <span class="hljs-comment">// ...</span>
  }),
  <span class="hljs-string">&quot;./src/test.js&quot;</span>: (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">module, __webpack_exports__, __webpack_require__</span>) </span>{
    <span class="hljs-comment">// ...</span>
  })
});</code></pre><p>&#x770B;&#x8D77;&#x6765;&#x5F88;&#x4E71;&#xFF1F;&#x6CA1;&#x5173;&#x7CFB;&#xFF0C;&#x6211;&#x4EEC;&#x6765;&#x5C61;&#x4E00;&#x4E0B;&#x3002;&#x4E00;&#x773C;&#x770B;&#x8FC7;&#x53BB;&#x6211;&#x4EEC;&#x770B;&#x5230;&#x7684;&#x662F;&#x8FD9;&#x6837;&#x7684;&#x5F62;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(modules) {
  // ...
})({
 // ...
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">modules</span>) </span>{
  <span class="hljs-comment">// ...</span>
})({
 <span class="hljs-comment">// ...</span>
})</code></pre><p>&#x8FD9;&#x6837;&#x597D;&#x7406;&#x89E3;&#x4E86;&#x5427;&#xFF0C;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x81EA;&#x6267;&#x884C;&#x51FD;&#x6570;&#xFF0C;&#x4F20;&#x5165;&#x4E86;&#x4E00;&#x4E2A;<code>modules</code>&#x5BF9;&#x8C61;&#xFF0C;modules &#x5BF9;&#x8C61;&#x662F;&#x4EC0;&#x4E48;&#x6837;&#x7684;&#x683C;&#x5F0F;&#x5462;&#xFF1F;&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x5DF2;&#x7ECF;&#x7ED9;&#x4E86;&#x6211;&#x4EEC;&#x7B54;&#x6848;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;./src/index.js&quot;: (function (module, __webpack_exports__, __webpack_require__) {
    // ...
  }),
  &quot;./src/message.js&quot;: (function (module, __webpack_exports__, __webpack_require__) {
    // ...
  }),
  &quot;./src/test.js&quot;: (function (module, __webpack_exports__, __webpack_require__) {
    // ...
  })
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-string">&quot;./src/index.js&quot;</span>: (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">module, __webpack_exports__, __webpack_require__</span>) </span>{
    <span class="hljs-comment">// ...</span>
  }),
  <span class="hljs-string">&quot;./src/message.js&quot;</span>: (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">module, __webpack_exports__, __webpack_require__</span>) </span>{
    <span class="hljs-comment">// ...</span>
  }),
  <span class="hljs-string">&quot;./src/test.js&quot;</span>: (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">module, __webpack_exports__, __webpack_require__</span>) </span>{
    <span class="hljs-comment">// ...</span>
  })
}</code></pre><p>&#x662F;&#x8FD9;&#x6837;&#x7684;&#x4E00;&#x4E2A; <code>&#x8DEF;&#x5F84; --&gt; &#x51FD;&#x6570;</code> &#x8FD9;&#x6837;&#x7684; key,value &#x952E;&#x503C;&#x5BF9;&#x3002;&#x800C;&#x51FD;&#x6570;&#x5185;&#x90E8;&#x662F;&#x6211;&#x4EEC;&#x5B9A;&#x4E49;&#x7684;&#x6587;&#x4EF6;&#x8F6C;&#x79FB;&#x6210; ES5 &#x4E4B;&#x540E;&#x7684;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;use strict&quot;;
eval(&quot;__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _test__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./test */ \&quot;./src/test.js\&quot;);\n\n\nconsole.log(_test__WEBPACK_IMPORTED_MODULE_0__[\&quot;default\&quot;])\n\n\n//# sourceURL=webpack:///./src/index.js?&quot;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-meta">&quot;use strict&quot;</span>;
<span class="hljs-built_in">eval</span>(<span class="hljs-string">&quot;__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _test__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./test */ \&quot;./src/test.js\&quot;);\n\n\nconsole.log(_test__WEBPACK_IMPORTED_MODULE_0__[\&quot;default\&quot;])\n\n\n//# sourceURL=webpack:///./src/index.js?&quot;</span>);</code></pre><p>&#x5230;&#x8FD9;&#x91CC;&#x57FA;&#x672C;&#x4E0A;&#x7ED3;&#x6784;&#x662F;&#x5206;&#x6790;&#x5B8C;&#x4E86;&#xFF0C;&#x63A5;&#x7740;&#x6211;&#x4EEC;&#x770B;&#x770B;&#x4ED6;&#x7684;&#x6267;&#x884C;&#xFF0C;&#x81EA;&#x6267;&#x884C;&#x51FD;&#x6570;&#x4E00;&#x5F00;&#x59CB;&#x6267;&#x884C;&#x7684;&#x4EE3;&#x7801;&#x662F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="__webpack_require__(__webpack_require__.s = &quot;./src/index.js&quot;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial">__webpack_require__(__webpack_require__.s = <span class="hljs-string">&quot;./src/index.js&quot;</span>);</code></pre><p>&#x8C03;&#x7528;&#x4E86;<code>__webpack_require_</code>&#x51FD;&#x6570;&#xFF0C;&#x5E76;&#x4F20;&#x5165;&#x4E86;&#x4E00;&#x4E2A;<code>moduleId</code>&#x53C2;&#x6570;&#x662F;<code>&quot;./src/index.js&quot;</code>&#x3002;&#x518D;&#x770B;&#x770B;&#x51FD;&#x6570;&#x5185;&#x90E8;&#x7684;&#x4E3B;&#x8981;&#x5B9E;&#x73B0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5B9A;&#x4E49; module &#x683C;&#x5F0F;   
var module = installedModules[moduleId] = {
      i: moduleId, // moduleId
      l: false, // &#x662F;&#x5426;&#x5DF2;&#x7ECF;&#x7F13;&#x5B58;
      exports: {} // &#x5BFC;&#x51FA;&#x5BF9;&#x8C61;&#xFF0C;&#x63D0;&#x4F9B;&#x6302;&#x8F7D;
};

modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x5B9A;&#x4E49; module &#x683C;&#x5F0F;   </span>
<span class="hljs-keyword">var</span> <span class="hljs-built_in">module</span> = installedModules[moduleId] = {
      <span class="hljs-attr">i</span>: moduleId, <span class="hljs-comment">// moduleId</span>
      l: <span class="hljs-literal">false</span>, <span class="hljs-comment">// &#x662F;&#x5426;&#x5DF2;&#x7ECF;&#x7F13;&#x5B58;</span>
      exports: {} <span class="hljs-comment">// &#x5BFC;&#x51FA;&#x5BF9;&#x8C61;&#xFF0C;&#x63D0;&#x4F9B;&#x6302;&#x8F7D;</span>
};

modules[moduleId].call(<span class="hljs-built_in">module</span>.exports, <span class="hljs-built_in">module</span>, <span class="hljs-built_in">module</span>.exports, __webpack_require__);</code></pre><p>&#x8FD9;&#x91CC;&#x8C03;&#x7528;&#x4E86;&#x6211;&#x4EEC;<code>modules</code>&#x4E2D;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x5E76;&#x4F20;&#x5165;&#x4E86;<code>__webpack_require__</code>&#x51FD;&#x6570;&#x4F5C;&#x4E3A;&#x51FD;&#x6570;&#x5185;&#x90E8;&#x7684;&#x8C03;&#x7528;&#x3002;<code>module.exports</code>&#x53C2;&#x6570;&#x4F5C;&#x4E3A;&#x51FD;&#x6570;&#x5185;&#x90E8;&#x7684;&#x5BFC;&#x51FA;&#x3002;&#x56E0;&#x4E3A;<code>index.js</code>&#x91CC;&#x9762;&#x5F15;&#x7528;&#x4E86;<code>test.js</code>&#xFF0C;&#x6240;&#x4EE5;&#x53C8;&#x4F1A;&#x901A;&#x8FC7;<code>__webpack_require__</code>&#x6765;&#x6267;&#x884C;&#x5BF9;<code>test.js</code>&#x7684;&#x52A0;&#x8F7D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var _test__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(&quot;./src/test.js&quot;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">var</span> _test__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(<span class="hljs-string">&quot;./src/test.js&quot;</span>);</code></pre><p><code>test.js</code>&#x5185;&#x53C8;&#x4F7F;&#x7528;&#x4E86;<code>message.js</code>&#x6240;&#x4EE5;&#xFF0C;<code>test.js</code>&#x5185;&#x90E8;&#x53C8;&#x4F1A;&#x6267;&#x884C;&#x5BF9;<code>message.js</code>&#x7684;&#x52A0;&#x8F7D;&#x3002;<code>message.js</code>&#x6267;&#x884C;&#x5B8C;&#x6210;&#x4E4B;&#x540E;&#xFF0C;&#x56E0;&#x4E3A;&#x6CA1;&#x6709;&#x4F9D;&#x8D56;&#x9879;&#xFF0C;&#x6240;&#x4EE5;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x4E86;&#x7ED3;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var b = &apos;world&apos;
__webpack_exports__[&quot;default&quot;] = (b)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> b = <span class="hljs-string">&apos;world&apos;</span>
__webpack_exports__[<span class="hljs-string">&quot;default&quot;</span>] = (b)</code></pre><p>&#x6267;&#x884C;&#x5B8C;&#x6210;&#x4E4B;&#x540E;&#xFF0C;&#x518D;&#x4E00;&#x7EA7;&#x4E00;&#x7EA7;&#x8FD4;&#x56DE;&#x5230;&#x6839;&#x6587;&#x4EF6;<code>index.js</code>&#x3002;&#x6700;&#x7EC8;&#x5B8C;&#x6210;&#x6574;&#x4E2A;&#x6587;&#x4EF6;&#x4F9D;&#x8D56;&#x7684;&#x5904;&#x7406;&#x3002;<br>&#x6574;&#x4E2A;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x50CF;&#x662F;&#x901A;&#x8FC7;&#x4E00;&#x4E2A;&#x4F9D;&#x8D56;&#x5173;&#x7CFB;&#x6811;&#x7684;&#x5F62;&#x5F0F;&#xFF0C;&#x4E0D;&#x65AD;&#x5730;&#x5411;&#x6570;&#x7684;&#x5185;&#x90E8;&#x8FDB;&#x5165;&#xFF0C;&#x7B49;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;&#xFF0C;&#x53C8;&#x5F00;&#x59CB;&#x56DE;&#x6EAF;&#x5230;&#x6839;&#x3002;</p><h4>&#x5F00;&#x53D1;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684; tinypack</h4><p>&#x901A;&#x8FC7;&#x4E0A;&#x9762;&#x7684;&#x8FD9;&#x4E9B;&#x8C03;&#x7814;&#xFF0C;&#x6211;&#x4EEC;&#x5148;&#x8003;&#x8651;&#x4E00;&#x4E0B;&#x4E00;&#x4E2A;&#x57FA;&#x7840;&#x7684;&#x6253;&#x5305;&#x7F16;&#x8BD1;&#x5DE5;&#x5177;&#x53EF;&#x4EE5;&#x505A;&#x4EC0;&#x4E48;&#xFF1F;</p><ol><li>&#x8F6C;&#x6362;ES6&#x8BED;&#x6CD5;&#x6210;ES5</li><li>&#x5904;&#x7406;&#x6A21;&#x5757;&#x52A0;&#x8F7D;&#x4F9D;&#x8D56;</li><li>&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x53EF;&#x4EE5;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x52A0;&#x8F7D;&#x6267;&#x884C;&#x7684; js &#x6587;&#x4EF6;</li></ol><p>&#x7B2C;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x8F6C;&#x6362;&#x8BED;&#x6CD5;&#xFF0C;&#x5176;&#x5B9E;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;<code>babel</code>&#x6765;&#x505A;&#x3002;&#x6838;&#x5FC3;&#x6B65;&#x9AA4;&#x4E5F;&#x5C31;&#x662F;&#xFF1A;</p><ul><li>&#x901A;&#x8FC7;<code>babylon</code>&#x751F;&#x6210;AST</li><li>&#x901A;&#x8FC7;<code>babel-core</code>&#x5C06;AST&#x91CD;&#x65B0;&#x751F;&#x6210;&#x6E90;&#x7801;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * &#x83B7;&#x53D6;&#x6587;&#x4EF6;&#xFF0C;&#x89E3;&#x6790;&#x6210;ast&#x8BED;&#x6CD5;
 * @param filename // &#x5165;&#x53E3;&#x6587;&#x4EF6;
 * @returns {*}
 */
function getAst (filename) {
  const content = fs.readFileSync(filename, &apos;utf-8&apos;)

  return babylon.parse(content, {
    sourceType: &apos;module&apos;,
  });
}

/**
 * &#x7F16;&#x8BD1;
 * @param ast
 * @returns {*}
 */
function getTranslateCode(ast) {
  const {code} = transformFromAst(ast, null, {
    presets: [&apos;env&apos;]
  });
  return code
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * &#x83B7;&#x53D6;&#x6587;&#x4EF6;&#xFF0C;&#x89E3;&#x6790;&#x6210;ast&#x8BED;&#x6CD5;
 * @param filename // &#x5165;&#x53E3;&#x6587;&#x4EF6;
 * @returns {*}
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getAst</span> (<span class="hljs-params">filename</span>) </span>{
  <span class="hljs-keyword">const</span> content = fs.readFileSync(filename, <span class="hljs-string">&apos;utf-8&apos;</span>)

  <span class="hljs-keyword">return</span> babylon.parse(content, {
    <span class="hljs-attr">sourceType</span>: <span class="hljs-string">&apos;module&apos;</span>,
  });
}

<span class="hljs-comment">/**
 * &#x7F16;&#x8BD1;
 * @param ast
 * @returns {*}
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getTranslateCode</span>(<span class="hljs-params">ast</span>) </span>{
  <span class="hljs-keyword">const</span> {code} = transformFromAst(ast, <span class="hljs-literal">null</span>, {
    <span class="hljs-attr">presets</span>: [<span class="hljs-string">&apos;env&apos;</span>]
  });
  <span class="hljs-keyword">return</span> code
}</code></pre><p>&#x63A5;&#x7740;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5904;&#x7406;&#x6A21;&#x5757;&#x4F9D;&#x8D56;&#x7684;&#x5173;&#x7CFB;&#xFF0C;&#x90A3;&#x5C31;&#x9700;&#x8981;&#x5F97;&#x5230;&#x4E00;&#x4E2A;&#x4F9D;&#x8D56;&#x5173;&#x7CFB;&#x89C6;&#x56FE;&#x3002;&#x597D;&#x5728;<code>babel-traverse</code>&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x4E2A;&#x53EF;&#x4EE5;&#x904D;&#x5386;<code>AST</code>&#x89C6;&#x56FE;&#x5E76;&#x505A;&#x5904;&#x7406;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x901A;&#x8FC7; <code>ImportDeclaration</code> &#x53EF;&#x4EE5;&#x5F97;&#x5230;&#x4F9D;&#x8D56;&#x5C5E;&#x6027;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getDependence (ast) {
  let dependencies = []
  traverse(ast, {
    ImportDeclaration: ({node}) =&gt; {
      dependencies.push(node.source.value);
    },
  })
  return dependencies
}

/**
 * &#x751F;&#x6210;&#x5B8C;&#x6574;&#x7684;&#x6587;&#x4EF6;&#x4F9D;&#x8D56;&#x5173;&#x7CFB;&#x6620;&#x5C04;
 * @param fileName
 * @param entry
 * @returns "{{"fileName: *, dependence, code: *"}}"
 */
function parse(fileName, entry) {
  let filePath = fileName.indexOf(&apos;.js&apos;) === -1 ? fileName + &apos;.js&apos; : fileName
  let dirName = entry ? &apos;&apos; : path.dirname(config.entry)
  let absolutePath = path.join(dirName, filePath)
  const ast = getAst(absolutePath)
  return {
    fileName,
    dependence: getDependence(ast),
    code: getTranslateCode(ast),
  };
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getDependence</span> (<span class="hljs-params">ast</span>) </span>{
  <span class="hljs-keyword">let</span> dependencies = []
  traverse(ast, {
    <span class="hljs-attr">ImportDeclaration</span>: <span class="hljs-function">(<span class="hljs-params">{node}</span>) =&gt;</span> {
      dependencies.push(node.source.value);
    },
  })
  <span class="hljs-keyword">return</span> dependencies
}

<span class="hljs-comment">/**
 * &#x751F;&#x6210;&#x5B8C;&#x6574;&#x7684;&#x6587;&#x4EF6;&#x4F9D;&#x8D56;&#x5173;&#x7CFB;&#x6620;&#x5C04;
 * @param fileName
 * @param entry
 * @returns "{{"fileName: *, dependence, code: *"}}"
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">parse</span>(<span class="hljs-params">fileName, entry</span>) </span>{
  <span class="hljs-keyword">let</span> filePath = fileName.indexOf(<span class="hljs-string">&apos;.js&apos;</span>) === <span class="hljs-number">-1</span> ? fileName + <span class="hljs-string">&apos;.js&apos;</span> : fileName
  <span class="hljs-keyword">let</span> dirName = entry ? <span class="hljs-string">&apos;&apos;</span> : path.dirname(config.entry)
  <span class="hljs-keyword">let</span> absolutePath = path.join(dirName, filePath)
  <span class="hljs-keyword">const</span> ast = getAst(absolutePath)
  <span class="hljs-keyword">return</span> {
    fileName,
    <span class="hljs-attr">dependence</span>: getDependence(ast),
    <span class="hljs-attr">code</span>: getTranslateCode(ast),
  };
}</code></pre><p>&#x5230;&#x76EE;&#x524D;&#x4E3A;&#x6B62;&#xFF0C;&#x6211;&#x4EEC;&#x4E5F;&#x53EA;&#x662F;&#x5F97;&#x5230;&#x6839;&#x6587;&#x4EF6;&#x7684;&#x4F9D;&#x8D56;&#x5173;&#x7CFB;&#x548C;&#x7F16;&#x8BD1;&#x540E;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x6BD4;&#x5982;&#x6211;&#x4EEC;&#x7684;<code>index.js</code>&#x4F9D;&#x8D56;&#x4E86;<code>test.js</code>&#x4F46;&#x662F;&#x6211;&#x4EEC;&#x5E76;&#x4E0D;&#x77E5;&#x9053;<code>test.js</code>&#x8FD8;&#x9700;&#x8981;&#x4F9D;&#x8D56;<code>message.js</code>&#xFF0C;&#x4ED6;&#x4EEC;&#x7684;&#x6E90;&#x7801;&#x4E5F;&#x662F;&#x6CA1;&#x6709;&#x7F16;&#x8BD1;&#x8FC7;&#x3002;&#x6240;&#x4EE5;&#x6B64;&#x65F6;&#x6211;&#x4EEC;&#x8FD8;&#x9700;&#x8981;&#x505A;&#x6DF1;&#x5EA6;&#x904D;&#x5386;&#xFF0C;&#x5F97;&#x5230;&#x5B8C;&#x6210;&#x7684;&#x6DF1;&#x5EA6;&#x4F9D;&#x8D56;&#x5173;&#x7CFB;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * &#x83B7;&#x53D6;&#x6DF1;&#x5EA6;&#x961F;&#x5217;&#x4F9D;&#x8D56;&#x5173;&#x7CFB;
 * @param main
 * @returns {*[]}
 */
function getQueue(main) {
  let queue = [main]
  for (let asset of queue) {
    asset.dependence.forEach(function (dep) {
      let child = parse(dep)
      queue.push(child)
    })
  }
  return queue
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * &#x83B7;&#x53D6;&#x6DF1;&#x5EA6;&#x961F;&#x5217;&#x4F9D;&#x8D56;&#x5173;&#x7CFB;
 * @param main
 * @returns {*[]}
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getQueue</span>(<span class="hljs-params">main</span>) </span>{
  <span class="hljs-keyword">let</span> queue = [main]
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> asset <span class="hljs-keyword">of</span> queue) {
    asset.dependence.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">dep</span>) </span>{
      <span class="hljs-keyword">let</span> child = parse(dep)
      queue.push(child)
    })
  }
  <span class="hljs-keyword">return</span> queue
}</code></pre><p>&#x90A3;&#x4E48;&#x8FDB;&#x884C;&#x5230;&#x8FD9;&#x4E00;&#x6B65;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x5B8C;&#x6210;&#x4E86;&#x6240;&#x6709;&#x6587;&#x4EF6;&#x7684;&#x7F16;&#x8BD1;&#x89E3;&#x6790;&#x3002;&#x6700;&#x540E;&#x4E00;&#x6B65;&#xFF0C;&#x5C31;&#x662F;&#x9700;&#x8981;&#x6211;&#x4EEC;&#x6309;&#x7167;<code>webpack</code>&#x7684;&#x601D;&#x60F3;&#x5BF9;&#x6E90;&#x7801;&#x8FDB;&#x884C;&#x4E00;&#x4E9B;&#x5305;&#x88C5;&#x3002;&#x7B2C;&#x4E00;&#x6B65;&#xFF0C;&#x5148;&#x662F;&#x8981;&#x751F;&#x6210;&#x4E00;&#x4E2A;<code>modules</code>&#x5BF9;&#x8C61;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function bundle(queue) {
  let modules = &apos;&apos;
  queue.forEach(function (mod) {
    modules += `&apos;${mod.fileName}&apos;: function (require, module, exports) { ${mod.code} },`
  })
  // ...
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bundle</span>(<span class="hljs-params">queue</span>) </span>{
  <span class="hljs-keyword">let</span> modules = <span class="hljs-string">&apos;&apos;</span>
  queue.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">mod</span>) </span>{
    modules += <span class="hljs-string">`&apos;<span class="hljs-subst">${mod.fileName}</span>&apos;: function (require, module, exports) { <span class="hljs-subst">${mod.code}</span> },`</span>
  })
  <span class="hljs-comment">// ...</span>
}</code></pre><p>&#x5F97;&#x5230; <code>modules</code> &#x5BF9;&#x8C61;&#x540E;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x4FBF;&#x662F;&#x5BF9;&#x6574;&#x4F53;&#x6587;&#x4EF6;&#x7684;&#x5916;&#x90E8;&#x5305;&#x88C5;&#xFF0C;&#x6CE8;&#x518C;<code>require</code>&#xFF0C;<code>module.exports</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(modules) {
      function require(fileName) {
          // ...
      }
     require(&apos;${config.entry}&apos;);
 })({${modules"}}")" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">modules</span>) </span>{
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">require</span>(<span class="hljs-params">fileName</span>) </span>{
          <span class="hljs-comment">// ...</span>
      }
     <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;${config.entry}&apos;</span>);
 })({${modules"}}")</code></pre><p>&#x800C;&#x51FD;&#x6570;&#x5185;&#x90E8;&#xFF0C;&#x4E5F;&#x53EA;&#x662F;&#x5FAA;&#x73AF;&#x6267;&#x884C;&#x6BCF;&#x4E2A;&#x4F9D;&#x8D56;&#x6587;&#x4EF6;&#x7684; JS &#x4EE3;&#x7801;&#x800C;&#x5DF2;&#xFF0C;&#x5B8C;&#x6210;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function bundle(queue) {
  let modules = &apos;&apos;
  queue.forEach(function (mod) {
    modules += `&apos;${mod.fileName}&apos;: function (require, module, exports) { ${mod.code} },`
  })

  const result = `
    (function(modules) {
      function require(fileName) {
        const fn = modules[fileName];

        const module = { exports : {} };

        fn(require, module, module.exports);

        return module.exports;
      }

      require(&apos;${config.entry}&apos;);
    })({${modules"}}")
  `;

  // We simply return the result, hurray! :)
  return result;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bundle</span>(<span class="hljs-params">queue</span>) </span>{
  <span class="hljs-keyword">let</span> modules = <span class="hljs-string">&apos;&apos;</span>
  queue.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">mod</span>) </span>{
    modules += <span class="hljs-string">`&apos;<span class="hljs-subst">${mod.fileName}</span>&apos;: function (require, module, exports) { <span class="hljs-subst">${mod.code}</span> },`</span>
  })

  <span class="hljs-keyword">const</span> result = <span class="hljs-string">`
    (function(modules) {
      function require(fileName) {
        const fn = modules[fileName];

        const module = { exports : {} };

        fn(require, module, module.exports);

        return module.exports;
      }

      require(&apos;<span class="hljs-subst">${config.entry}</span>&apos;);
    })({<span class="hljs-subst">${modules}</span>})
  `</span>;

  <span class="hljs-comment">// We simply return the result, hurray! :)</span>
  <span class="hljs-keyword">return</span> result;
}</code></pre><p>&#x5230;&#x8FD9;&#x91CC;&#x57FA;&#x672C;&#x4E0A;&#x4E5F;&#x5C31;&#x4ECB;&#x7ECD;&#x5B8C;&#x4E86;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x5C31;&#x662F;&#x8F93;&#x51FA;&#x7F16;&#x8BD1;&#x597D;&#x7684;&#x6587;&#x4EF6;&#x4E86;&#xFF0C;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x4E3A;&#x4E86;&#x53EF;&#x4EE5;&#x5168;&#x5C40;&#x4F7F;&#x7528;<code>tinypack</code>&#x5305;&#xFF0C;&#x6211;&#x4EEC;&#x8FD8;&#x9700;&#x8981;&#x4E3A;&#x5176;&#x6DFB;&#x52A0;&#x5230;&#x5168;&#x5C40;&#x547D;&#x4EE4;&#xFF08;&#x8FD9;&#x91CC;&#x76F4;&#x63A5;&#x53C2;&#x8003;&#x6211;&#x7684;&#x6E90;&#x7801;&#x5427;&#xFF0C;&#x4E0D;&#x518D;&#x8D58;&#x8FF0;&#x4E86;&#xFF09;&#x3002;&#x6211;&#x4EEC;&#x6765;&#x6D4B;&#x8BD5;&#x4E00;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i tinypack_demo@1.0.7 -g

cd examples

tinypack" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash">npm i tinypack_demo@1.0.7 -g

<span class="hljs-built_in">cd</span> examples

tinypack</code></pre><p>&#x770B;&#x4E00;&#x4E0B;&#x8F93;&#x51FA;&#x7684;&#x6587;&#x4EF6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function (modules) {
  function require(fileName) {
    const fn = modules[fileName];

    const module = {exports: {"}}";

    fn(require, module, module.exports);

    return module.exports;
  }

  require(&apos;./src/index.js&apos;);
})({
  &apos;./src/index.js&apos;: function (require, module, exports) {
    &quot;use strict&quot;;

    var _test = require(&quot;./test&quot;);

    var _test2 = _interopRequireDefault(_test);

    function _interopRequireDefault(obj) {
      return obj &amp;&amp; obj.__esModule ? obj : {default: obj};
    }

    console.log(_test2.default);
  }, &apos;./test&apos;: function (require, module, exports) {
    &quot;use strict&quot;;

    Object.defineProperty(exports, &quot;__esModule&quot;, {
      value: true
    });

    var _message = require(&quot;./message&quot;);

    var _message2 = _interopRequireDefault(_message);

    function _interopRequireDefault(obj) {
      return obj &amp;&amp; obj.__esModule ? obj : {default: obj};
    }

    var a = &apos;hello&apos; + _message2.default;
    exports.default = a;
  }, &apos;./message&apos;: function (require, module, exports) {
    &quot;use strict&quot;;

    Object.defineProperty(exports, &quot;__esModule&quot;, {
      value: true
    });
    var b = &apos;world&apos;;

    exports.default = b;
  },
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">modules</span>) </span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">require</span>(<span class="hljs-params">fileName</span>) </span>{
    <span class="hljs-keyword">const</span> fn = modules[fileName];

    <span class="hljs-keyword">const</span> <span class="hljs-built_in">module</span> = {<span class="hljs-attr">exports</span>: {"}}";

    fn(<span class="hljs-built_in">require</span>, <span class="hljs-built_in">module</span>, <span class="hljs-built_in">module</span>.exports);

    <span class="hljs-keyword">return</span> <span class="hljs-built_in">module</span>.exports;
  }

  <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./src/index.js&apos;</span>);
})({
  <span class="hljs-string">&apos;./src/index.js&apos;</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">require, module, exports</span>) </span>{
<span class="hljs-meta">    &quot;use strict&quot;</span>;

    <span class="hljs-keyword">var</span> _test = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;./test&quot;</span>);

    <span class="hljs-keyword">var</span> _test2 = _interopRequireDefault(_test);

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_interopRequireDefault</span>(<span class="hljs-params">obj</span>) </span>{
      <span class="hljs-keyword">return</span> obj &amp;&amp; obj.__esModule ? obj : {<span class="hljs-attr">default</span>: obj};
    }

    <span class="hljs-built_in">console</span>.log(_test2.default);
  }, <span class="hljs-string">&apos;./test&apos;</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">require, module, exports</span>) </span>{
<span class="hljs-meta">    &quot;use strict&quot;</span>;

    <span class="hljs-built_in">Object</span>.defineProperty(exports, <span class="hljs-string">&quot;__esModule&quot;</span>, {
      <span class="hljs-attr">value</span>: <span class="hljs-literal">true</span>
    });

    <span class="hljs-keyword">var</span> _message = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;./message&quot;</span>);

    <span class="hljs-keyword">var</span> _message2 = _interopRequireDefault(_message);

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_interopRequireDefault</span>(<span class="hljs-params">obj</span>) </span>{
      <span class="hljs-keyword">return</span> obj &amp;&amp; obj.__esModule ? obj : {<span class="hljs-attr">default</span>: obj};
    }

    <span class="hljs-keyword">var</span> a = <span class="hljs-string">&apos;hello&apos;</span> + _message2.default;
    exports.default = a;
  }, <span class="hljs-string">&apos;./message&apos;</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">require, module, exports</span>) </span>{
<span class="hljs-meta">    &quot;use strict&quot;</span>;

    <span class="hljs-built_in">Object</span>.defineProperty(exports, <span class="hljs-string">&quot;__esModule&quot;</span>, {
      <span class="hljs-attr">value</span>: <span class="hljs-literal">true</span>
    });
    <span class="hljs-keyword">var</span> b = <span class="hljs-string">&apos;world&apos;</span>;

    exports.default = b;
  },
})</code></pre><p>&#x518D;&#x6D4B;&#x8BD5;&#x4E00;&#x4E0B;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/remote/1460000015225754" src="https://static.alili.tech/img/remote/1460000015225754" alt="image" title="image" style="cursor:pointer;display:inline"></span></p><p>&#x6069;&#xFF0C;&#x57FA;&#x672C;&#x4E0A;&#x5DF2;&#x7ECF;&#x5B8C;&#x6210;&#x4E00;&#x4E2A;&#x5EFA;&#x8BAE;&#x7684; <code>tinypack</code>&#x3002;</p><h2 id="articleHeader3">&#x53C2;&#x8003;&#x6587;&#x7AE0;</h2><p><a href="https://juejin.im/post/5ab83f67f265da237e09b2f6" rel="nofollow noreferrer" target="_blank">&#x62BD;&#x8C61;&#x8BED;&#x6CD5;&#x6811; Abstract syntax tree</a></p><p><a href="https://juejin.im/post/5a2bf2dd6fb9a044fd11b0d2" rel="nofollow noreferrer" target="_blank">&#x4E00;&#x770B;&#x5C31;&#x61C2;&#x7684;JS&#x62BD;&#x8C61;&#x8BED;&#x6CD5;&#x6811;</a></p><h2 id="articleHeader4">&#x6E90;&#x7801;</h2><p>tinypack &#x6240;&#x6709;&#x7684;&#x6E90;&#x7801;&#x5DF2;&#x7ECF;&#x4E0A;&#x4F20; <a href="https://github.com/muwoo/blogs/tree/master/src/tinypack" rel="nofollow noreferrer" target="_blank">github</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
实现一个简易的webpack

## 原文链接
[https://segmentfault.com/a/1190000015225750](https://segmentfault.com/a/1190000015225750)

