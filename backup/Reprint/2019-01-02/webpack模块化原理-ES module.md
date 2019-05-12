---
title: 'webpack模块化原理-ES module' 
date: 2019-01-02 2:30:09
hidden: true
slug: 3rjbwt1z6z7
categories: [reprint]
---

{{< raw >}}

                    
<p>上一篇文章介绍了<a href="https://segmentfault.com/a/1190000010349749">webpack对commonjs模块的支持</a>（如果你还没读过，建议你先阅读），这篇文章来探究一下，webpack是如何支持es模块的。</p>
<h3 id="articleHeader0">准备</h3>
<p>我们依然写两个文件，m.js文件用es模块的方式<code>export</code>一个<code>default</code>函数和一个<code>foo</code>函数，index.js <code>import</code>该模块，具体代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// m.js
'use strict';
export default function bar () {
    return 1;
};
export function foo () {
    return 2;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// m.js</span>
<span class="hljs-meta">'use strict'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
};
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-number">2</span>;
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// index.js
'use strict';
import bar, {foo} from './m';
bar();
foo();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// index.js</span>
<span class="hljs-meta">'use strict'</span>;
<span class="hljs-keyword">import</span> bar, {foo} <span class="hljs-keyword">from</span> <span class="hljs-string">'./m'</span>;
bar();
foo();</code></pre>
<p>webpack配置没有变化，依然以index.js作为入口：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require(&quot;path&quot;);
module.exports = {
    entry: path.join(__dirname, 'index.js'),
    output: {
        path: path.join(__dirname, 'outs'),
        filename: 'index.js'
    },
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-built_in">var</span> path = <span class="hljs-keyword">require</span>(<span class="hljs-string">"path"</span>);
module.exports = {
    entry: path.<span class="hljs-keyword">join</span>(__dirname, <span class="hljs-string">'index.js'</span>),
    output: {
        path: path.<span class="hljs-keyword">join</span>(__dirname, <span class="hljs-string">'outs'</span>),
        filename: <span class="hljs-string">'index.js'</span>
    },
};
</code></pre>
<p>在根目录下执行<code>webpack</code>，得到经过webpack打包的代码如下（去掉了不必要的注释）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(modules) { // webpackBootstrap
    // The module cache
    var installedModules = {};
    // The require function
    function __webpack_require__(moduleId) {
        // Check if module is in cache
        if(installedModules[moduleId]) {
            return installedModules[moduleId].exports;
        }
        // Create a new module (and put it into the cache)
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        };
        // Execute the module function
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
    __webpack_require__.d = function(exports, name, getter) {
        if(!__webpack_require__.o(exports, name)) {
            Object.defineProperty(exports, name, {
                configurable: false,
                enumerable: true,
                get: getter
            });
        }
    };
    // getDefaultExport function for compatibility with non-harmony modules
    __webpack_require__.n = function(module) {
        var getter = module &amp;&amp; module.__esModule ?
            function getDefault() { return module['default']; } :
            function getModuleExports() { return module; };
        __webpack_require__.d(getter, 'a', getter);
        return getter;
    };
    // Object.prototype.hasOwnProperty.call
    __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
    // __webpack_public_path__
    __webpack_require__.p = &quot;&quot;;
    // Load entry module and return exports
    return __webpack_require__(__webpack_require__.s = 0);
})
([
(function(module, __webpack_exports__, __webpack_require__) {

    &quot;use strict&quot;;
    Object.defineProperty(__webpack_exports__, &quot;__esModule&quot;, { value: true });
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__m__ = __webpack_require__(1);

    Object(__WEBPACK_IMPORTED_MODULE_0__m__[&quot;a&quot; /* default */])();
    Object(__WEBPACK_IMPORTED_MODULE_0__m__[&quot;b&quot; /* foo */])();

}),
(function(module, __webpack_exports__, __webpack_require__) {

    &quot;use strict&quot;;
    /* harmony export (immutable) */
    __webpack_exports__[&quot;a&quot;] = bar;
    /* harmony export (immutable) */
    __webpack_exports__[&quot;b&quot;] = foo;

    function bar () {
        return 1;
    };
    function foo () {
        return 2;
    }

})
]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">modules</span>) </span>{ <span class="hljs-comment">// webpackBootstrap</span>
    <span class="hljs-comment">// The module cache</span>
    <span class="hljs-keyword">var</span> installedModules = {};
    <span class="hljs-comment">// The require function</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">__webpack_require__</span>(<span class="hljs-params">moduleId</span>) </span>{
        <span class="hljs-comment">// Check if module is in cache</span>
        <span class="hljs-keyword">if</span>(installedModules[moduleId]) {
            <span class="hljs-keyword">return</span> installedModules[moduleId].exports;
        }
        <span class="hljs-comment">// Create a new module (and put it into the cache)</span>
        <span class="hljs-keyword">var</span> <span class="hljs-built_in">module</span> = installedModules[moduleId] = {
            <span class="hljs-attr">i</span>: moduleId,
            <span class="hljs-attr">l</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-attr">exports</span>: {}
        };
        <span class="hljs-comment">// Execute the module function</span>
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
    __webpack_require__.d = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">exports, name, getter</span>) </span>{
        <span class="hljs-keyword">if</span>(!__webpack_require__.o(exports, name)) {
            <span class="hljs-built_in">Object</span>.defineProperty(exports, name, {
                <span class="hljs-attr">configurable</span>: <span class="hljs-literal">false</span>,
                <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">true</span>,
                <span class="hljs-attr">get</span>: getter
            });
        }
    };
    <span class="hljs-comment">// getDefaultExport function for compatibility with non-harmony modules</span>
    __webpack_require__.n = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module</span>) </span>{
        <span class="hljs-keyword">var</span> getter = <span class="hljs-built_in">module</span> &amp;&amp; <span class="hljs-built_in">module</span>.__esModule ?
            <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getDefault</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-built_in">module</span>[<span class="hljs-string">'default'</span>]; } :
            <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getModuleExports</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-built_in">module</span>; };
        __webpack_require__.d(getter, <span class="hljs-string">'a'</span>, getter);
        <span class="hljs-keyword">return</span> getter;
    };
    <span class="hljs-comment">// Object.prototype.hasOwnProperty.call</span>
    __webpack_require__.o = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">object, property</span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.hasOwnProperty.call(object, property); };
    <span class="hljs-comment">// __webpack_public_path__</span>
    __webpack_require__.p = <span class="hljs-string">""</span>;
    <span class="hljs-comment">// Load entry module and return exports</span>
    <span class="hljs-keyword">return</span> __webpack_require__(__webpack_require__.s = <span class="hljs-number">0</span>);
})
([
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, __webpack_exports__, __webpack_require__</span>) </span>{
<span class="hljs-meta">
    "use strict"</span>;
    <span class="hljs-built_in">Object</span>.defineProperty(__webpack_exports__, <span class="hljs-string">"__esModule"</span>, { <span class="hljs-attr">value</span>: <span class="hljs-literal">true</span> });
    <span class="hljs-comment">/* harmony import */</span>
    <span class="hljs-keyword">var</span> __WEBPACK_IMPORTED_MODULE_0__m__ = __webpack_require__(<span class="hljs-number">1</span>);

    <span class="hljs-built_in">Object</span>(__WEBPACK_IMPORTED_MODULE_0__m__[<span class="hljs-string">"a"</span> <span class="hljs-comment">/* default */</span>])();
    <span class="hljs-built_in">Object</span>(__WEBPACK_IMPORTED_MODULE_0__m__[<span class="hljs-string">"b"</span> <span class="hljs-comment">/* foo */</span>])();

}),
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, __webpack_exports__, __webpack_require__</span>) </span>{
<span class="hljs-meta">
    "use strict"</span>;
    <span class="hljs-comment">/* harmony export (immutable) */</span>
    __webpack_exports__[<span class="hljs-string">"a"</span>] = bar;
    <span class="hljs-comment">/* harmony export (immutable) */</span>
    __webpack_exports__[<span class="hljs-string">"b"</span>] = foo;

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
    };
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-number">2</span>;
    }

})
]);</code></pre>
<h3 id="articleHeader1">分析</h3>
<p>上一篇文章已经分析过了，webpack生成的代码是一个IIFE，这个IIFE完成一系列初始化工作后，就会通过<code>__webpack_require__(0)</code>启动入口模块。</p>
<p>我们首先来看m.js模块是如何实现es的<code>export</code>的，被webpack转换后的m.js代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="__webpack_exports__[&quot;a&quot;] = bar;
__webpack_exports__[&quot;b&quot;] = foo;

function bar () {
    return 1;
};
function foo () {
    return 2;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>__webpack_exports__[<span class="hljs-string">"a"</span>] = bar;
__webpack_exports__[<span class="hljs-string">"b"</span>] = foo;

<span class="hljs-keyword">function</span> <span class="hljs-title">bar</span> () {
    <span class="hljs-keyword">return</span> <span class="hljs-type">1</span>;
};
<span class="hljs-keyword">function</span> <span class="hljs-title">foo</span> () {
    <span class="hljs-keyword">return</span> <span class="hljs-type">2</span>;
}</code></pre>
<p>其实一眼就能看出来，export default和export都被转换成了类似于commonjs的<code>exports.xxx</code>，这里也已经不区分是不是default export了，所有的export对象都是<code>__webpack_exports__</code>的属性。</p>
<p>我们继续来看看入口模块，被webpack转换后的index.js代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.defineProperty(__webpack_exports__, &quot;__esModule&quot;, { value: true });
var __WEBPACK_IMPORTED_MODULE_0__module__ = __webpack_require__(1);

Object(__WEBPACK_IMPORTED_MODULE_0__m__[&quot;a&quot; /* default */])();
Object(__WEBPACK_IMPORTED_MODULE_0__m__[&quot;b&quot; /* foo */])();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>Object.defineProperty(<span class="hljs-variable">__webpack_exports__</span>, <span class="hljs-string">"__esModule"</span>, { value: <span class="hljs-literal">true</span> });
var <span class="hljs-variable">__WEBPACK_IMPORTED_MODULE_0__module__</span> = <span class="hljs-variable">__webpack_require__</span>(<span class="hljs-number">1</span>);

Object(<span class="hljs-variable">__WEBPACK_IMPORTED_MODULE_0__m__</span>[<span class="hljs-string">"a"</span> <span class="hljs-comment">/* default */</span>])();
Object(<span class="hljs-variable">__WEBPACK_IMPORTED_MODULE_0__m__</span>[<span class="hljs-string">"b"</span> <span class="hljs-comment">/* foo */</span>])();</code></pre>
<p>index模块首先通过<code>Object.defineProperty</code>在<code>__webpack_exports__</code>上添加属性<code>__esModule </code>，值为<code>true</code>，表明这是一个es模块。在目前的代码下，这个标记是没有作用的，至于在什么情况下需要判断模块是否es模块，后面会分析。</p>
<p>然后就是通过<code>__webpack_require__(1)</code>导入m.js模块，再然后通过<code>module.xxx</code>获取m.js中export的对应属性。注意这里有一个重要的点，就是所有引入的模块属性都会用Object()包装成对象，这是为了保证像Boolean、String、Number这些基本数据类型转换成相应的类型对象。</p>
<h3 id="articleHeader2">commonjs与es6 module混用</h3>
<p>我们前面分析的都是commonjs模块对commonjs模块的导入，或者es模块对es模块的导入，那么如果是es模块对commonjs模块的导入会是什么情况呢，反过来又会如何呢？</p>
<p>其实我们前面说到的<code>__webpack_exports__. __esModule = true</code>就是针对这种情况的解决方法。</p>
<p>下面用具体代码来解释一下，首先修改m.js和index.js代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// m.js
'use strict';
exports.foo = function () {
    return 1;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// m.js</span>
<span class="hljs-meta">'use strict'</span>;
exports.foo = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// index.js
'use strict';
import m from './m';
m.foo();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// index.js</span>
<span class="hljs-meta">'use strict'</span>;
<span class="hljs-keyword">import</span> m <span class="hljs-keyword">from</span> <span class="hljs-string">'./m'</span>;
m.foo();</code></pre>
<p>重新执行webpack后生成的代码如下（只截取IIFE的参数部分）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
/* 0 */
(function(module, __webpack_exports__, __webpack_require__) {

    &quot;use strict&quot;;
    Object.defineProperty(__webpack_exports__, &quot;__esModule&quot;, { value: true });
    /* harmony import */ 
    var __WEBPACK_IMPORTED_MODULE_0__m__ = __webpack_require__(1);
    /* harmony import */ 
    var __WEBPACK_IMPORTED_MODULE_0__m___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__m__);

    __WEBPACK_IMPORTED_MODULE_0__m___default.a.foo();

}),
/* 1 */
(function(module, exports, __webpack_require__) {

    &quot;use strict&quot;;
    exports.foo = function () {
        return 1;
    }

})
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>[
<span class="hljs-comment">/* 0 */</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, __webpack_exports__, __webpack_require__</span>) </span>{
<span class="hljs-meta">
    "use strict"</span>;
    <span class="hljs-built_in">Object</span>.defineProperty(__webpack_exports__, <span class="hljs-string">"__esModule"</span>, { <span class="hljs-attr">value</span>: <span class="hljs-literal">true</span> });
    <span class="hljs-comment">/* harmony import */</span> 
    <span class="hljs-keyword">var</span> __WEBPACK_IMPORTED_MODULE_0__m__ = __webpack_require__(<span class="hljs-number">1</span>);
    <span class="hljs-comment">/* harmony import */</span> 
    <span class="hljs-keyword">var</span> __WEBPACK_IMPORTED_MODULE_0__m___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__m__);

    __WEBPACK_IMPORTED_MODULE_0__m___default.a.foo();

}),
<span class="hljs-comment">/* 1 */</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, exports, __webpack_require__</span>) </span>{
<span class="hljs-meta">
    "use strict"</span>;
    exports.foo = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
    }

})
]</code></pre>
<p>m.js转换后的代码跟转换前的代码基本没有变化，都是用webpack提供的<code>exports</code>进行模块导出。但是index.js有一点不同，主要是多了一行代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var __WEBPACK_IMPORTED_MODULE_0__m___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__m__);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code style="word-break: break-word; white-space: initial;">var <span class="hljs-strong">__WEBPACK_IMPORTED_MODULE_0__</span>m<span class="hljs-strong">___default = __</span>webpack<span class="hljs-emphasis">_require_</span><span class="hljs-emphasis">_.n(_</span><span class="hljs-emphasis">_WEBPACK_</span>IMPORTED<span class="hljs-emphasis">_MODULE_</span>0<span class="hljs-strong">__m__</span>);</code></pre>
<p>这段代码作用是什么呢，看一下<code>__webpack_require__.n</code>的定义就知道了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// getDefaultExport function for compatibility with non-harmony modules
__webpack_require__.n = function(module) {
    var getter = module &amp;&amp; module.__esModule ?
        function getDefault() { return module['default']; } :
        function getModuleExports() { return module; };
    __webpack_require__.d(getter, 'a', getter);
    return getter;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// getDefaultExport function for compatibility with non-harmony modules</span>
__webpack_require__.n = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module</span>) </span>{
    <span class="hljs-keyword">var</span> getter = <span class="hljs-built_in">module</span> &amp;&amp; <span class="hljs-built_in">module</span>.__esModule ?
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getDefault</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-built_in">module</span>[<span class="hljs-string">'default'</span>]; } :
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getModuleExports</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-built_in">module</span>; };
    __webpack_require__.d(getter, <span class="hljs-string">'a'</span>, getter);
    <span class="hljs-keyword">return</span> getter;
};</code></pre>
<p><code>__webpack_require__.n</code>会判断module是否为es模块，当<code>__esModule</code>为true的时候，标识module为es模块，那么<code>module.a</code>默认返回<code>module.default</code>，否则返回<code>module</code>。</p>
<p>具体实现则是通过<code> __webpack_require__.d</code>将具体操作绑定到属性<code>a</code>的getter方法上的。</p>
<p>那么，当通过es模块的方式去<code>import</code>一个commonjs规范的模块时，就会把require得到的module进行一层包装，从而兼容两种情况。</p>
<p>至于通过commonjs去<code>require</code>一个es模块的情况，原理相同，就不过多解释了。</p>
<h3 id="articleHeader3">结论</h3>
<p>webpack对于es模块的实现，也是基于自己实现的<code>__webpack_require__ </code>和<code>__webpack_exports__ </code>，装换成类似于commonjs的形式。对于es模块和commonjs混用的情况，则需要通过<code>__webpack_require__.n</code>的形式做一层包装来实现。</p>
<p>下一篇<a href="https://segmentfault.com/a/1190000011435407" target="_blank">webpack模块化原理-Code Splitting</a>，会继续来分析webpack是如何通过动态<code>import</code>和<code>module.ensure</code>实现Code Splitting的。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack模块化原理-ES module

## 原文链接
[https://segmentfault.com/a/1190000010955254](https://segmentfault.com/a/1190000010955254)

