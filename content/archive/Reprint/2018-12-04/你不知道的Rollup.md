---
title: '你不知道的Rollup' 
date: 2018-12-04 2:30:05
hidden: true
slug: obdcyjnos49
categories: [reprint]
---

{{< raw >}}

                    
<h2>Rollup</h2>
<p>下一代打包工具，这是rollup对自己的定位。如今的前端领域，构建工具并不缺少，每个前端工程师都用过或者听过webpack。可以看到的是像React、Vue等框架的构建工具使用的都是rollup。既然如此，这些框架为什么会选择rollup？它的特性是什么？面对不同场景，我们要怎么选择构建工具？本文将一一为你呈现。</p>
<h3>Tree Shaking</h3>
<p>tree shaking是rollup提出的，这也是rollup一个非常重要的feature，那什么是tree shaking，rollup的解释是在构建代码时，在使用ES6模块化的代码中，会对你的代码进行静态分析，只打包使用到的代码。这样的好处是减少代码的体积。</p>
<p>可以看到它的实现依赖于静态分析，为什么必须使用ES6 modules呢？我们来复习一下ES6 modules的几个特性：</p>
<ul>
<li>
<code>import</code> 的模块名只能是字符串常量</li>
<li>import binding 是 immutable 的，类似 <code>const</code>
</li>
<li>只能作为模块顶层的语句出现，不能出现在 <code>function</code> 里面或是 <code>if </code>里面等块级作用域中</li>
<li>import hoisted，不管 <code>import </code>的语句出现的位置在哪里，在模块初始化的时候所有的<code>import</code> 都必须已经导入完成。</li>
</ul>
<p>以上特性使得ES6 Modules缺少了一定的灵活性，但使得所有的依赖都是确定的，能够对代码进行静态分析。不需要依靠运行时去确定依赖关系。<br>举个栗子:<br>maths.js</p>
<pre><code class="javascript">// maths.js
export function square ( x ) {
    return x * x;
}
export function cube ( x ) {
    return x * x * x;
}</code></pre>
<p>main.js</p>
<pre><code class="javascript">import { cube } from './maths.js';
console.log( cube( 5 ) ); </code></pre>
<p>执行下面的命令后</p>
<pre><code class="bash">$ rollup main.js --o bundle.js --f iife</code></pre>
<p>输出bundle.js</p>
<pre><code class="javascript">(function () {
'use strict';

// maths.js

function cube(x) {
    return x * x * x;
}

console.log(cube(5));

}());</code></pre>
<p>可以看到，maths.js中<code>square</code>方法没有使用到，没有打包到构建结果中。在构建的时候，加了个参数<code>f</code>,值为<code>iife</code>的选项，构建的后代码的组织形式被一个立即执行函数包裹。</p>
<h3>代码构建后输出格式</h3>
<p>上面在构建的时候指定了参数<code>f</code>,值为<code>iife</code>的选项，输出了立即执行风格的构建代码，rollup还支持下面几种输出格式：</p>
<ul>
<li>amd - AMD</li>
<li>cjs -CommonJS</li>
<li>es - ES6 modules</li>
<li>umd - UMD</li>
<li>system - SystemJS loader</li>
</ul>
<p>在构建代码的时候，可以根据代码运行环境选择不同的输出格式，如果你的代码是运行在node中那么<code>cjs</code>就可以，如果你的代码运行在浏览器环境中，那么<code>iife</code>就很好，如果两者兼具，那么选择<code>umd</code>。<br>在<a href="https://segmentfault.com/a/1190000014143541">webpack的编译&amp;构建</a>中，提到webpack构建输出的代码其实有三种。</p>
<ul>
<li>你的业务逻辑代码</li>
<li>Runtime - 代码执行的引导</li>
<li>Manifest - 模块依赖关系的记录</li>
</ul>
<p>如果我们对main.js执行下面的命令构建后</p>
<pre><code class="bash">webpack main.js dist.js</code></pre>
<p>输出dist.js</p>
<pre><code class="javascript">/******/ (function(modules) { // webpackBootstrap
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
/******/             function getDefault() { return module['default']; } :
/******/             function getModuleExports() { return module; };
/******/         __webpack_require__.d(getter, 'a', getter);
/******/         return getter;
/******/     };
/******/
/******/     // Object.prototype.hasOwnProperty.call
/******/     __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/     // __webpack_public_path__
/******/     __webpack_require__.p = "";
/******/
/******/     // Load entry module and return exports
/******/     return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__maths_js__ = __webpack_require__(1);

console.log(Object(__WEBPACK_IMPORTED_MODULE_0__maths_js__["a" /* cube */])(5));

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export square */
/* harmony export (immutable) */ __webpack_exports__["a"] = cube;
// maths.js
function square(x) {
    return x * x;
}
function cube(x) {
    return x * x * x;
}

/***/ })
/******/ ]);</code></pre>
<ul>
<li>可以看到构建结果中的业务逻辑代码，Runtime和Manifest</li>
<li>在Manifest中记录中依赖关系，通过<code>__webpack_require__</code>加载</li>
<li>构建结果中包含了没有使用到的<code>square</code>
</li>
<li>构建体积明显比rollup中<code>iife</code>格式大</li>
<li>代码执行的时候，rollup中<code>iife</code>输出格式，代码执行的速度更快，webpack构建出来的还有依赖查找，而且每个模块通过一个函数包裹形式，执行的时候，就形成了一个个的闭包，占用了内存，当然可以在webpack3使用<code>ConcatenationPlugin</code>插件优化这样的输出格式，打包到一个依赖中</li>
</ul>
<p>对于性能方面<a href="https://nolanlawson.com/2016/08/15/the-cost-of-small-modules/" rel="nofollow noreferrer">the-cost-of-small-modules</a>做了很好的测评，可以了解一下。</p>
<h3>没有银弹</h3>
<p>webpack诞生的时候，为了解决css、图片等静态文件的构建和使得代码能够按需加载实现了code-splitting，在我们日常线上业务代码开发中，或多或少有一些静态资源需要打包，此时rollup显得不太适用。所以我们可以看到，在构建一些lib的时候可以选择rollup,而在构建一些应用的时候，选择webpack.</p>
<h3>最后</h3>
<p>腾讯IVWEB团队的工程化解决方案feflow已经开源：Github主页：<a href="https://github.com/feflow/feflow" rel="nofollow noreferrer">https://github.com/feflow/feflow</a></p>
<p>如果对您的团队或者项目有帮助，请给个Star支持一下哈～</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
你不知道的Rollup

## 原文链接
[https://segmentfault.com/a/1190000014520339](https://segmentfault.com/a/1190000014520339)

