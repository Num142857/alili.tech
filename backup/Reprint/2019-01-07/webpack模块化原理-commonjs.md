---
title: 'webpack模块化原理-commonjs' 
date: 2019-01-07 2:30:11
hidden: true
slug: 27myrgw826f
categories: [reprint]
---

{{< raw >}}

                    
<p>我们都知道，webpack作为一个构建工具，解决了前端代码缺少模块化能力的问题。我们写的代码，经过webpack构建和包装之后，能够在浏览器以模块化的方式运行。这些能力，都是因为webpack对我们的代码进行了一层包装，本文就以webpack生成的代码入手，分析webpack是如何实现模块化的。</p>
<p>PS: webpack的模块不仅指js，包括css、图片等资源都可以以模块看待，但本文只关注js。</p>
<h3 id="articleHeader0">准备</h3>
<p>首先我们创建一个简单入口模块index.js和一个依赖模块bar.js：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//index.js
'use strict';
var bar = require('./bar');
function foo() {
    return bar();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//index.js</span>
<span class="hljs-meta">'use strict'</span>;
<span class="hljs-keyword">var</span> bar = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./bar'</span>);
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> bar();
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//bar.js
'use strict';
exports.bar = function () {
    return 1;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//bar.js</span>
<span class="hljs-meta">'use strict'</span>;
exports.bar = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
}</code></pre>
<p>webpack配置如下：</p>
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
<p>这是一个最简单的配置，只指定了模块入口和输出路径，但已经满足了我们的要求。</p>
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
/************************************************************************/
([
/* 0 */
(function(module, exports, __webpack_require__) {

&quot;use strict&quot;;

var bar = __webpack_require__(1);
bar();

}),
/* 1 */
(function(module, exports, __webpack_require__) {

&quot;use strict&quot;;

exports.bar = function () {
    return 1;
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
<span class="hljs-comment">/************************************************************************/</span>
([
<span class="hljs-comment">/* 0 */</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, exports, __webpack_require__</span>) </span>{
<span class="hljs-meta">
"use strict"</span>;

<span class="hljs-keyword">var</span> bar = __webpack_require__(<span class="hljs-number">1</span>);
bar();

}),
<span class="hljs-comment">/* 1 */</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, exports, __webpack_require__</span>) </span>{
<span class="hljs-meta">
"use strict"</span>;

exports.bar = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
}

})
]);</code></pre>
<h3 id="articleHeader1">分析</h3>
<p>上面webpack打包的代码，整体可以简化成下面的结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function (modules) {/* 省略函数内容 */})
([
function (module, exports, __webpack_require__) {
    /* 模块index.js的代码 */
},
function (module, exports, __webpack_require__) {
    /* 模块bar.js的代码 */
}
]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>(<span class="hljs-name">function</span> (<span class="hljs-name">modules</span>) {/* 省略函数内容 */})
([
function (<span class="hljs-name">module</span>, exports, __webpack_require__) {
    /* 模块index.js的代码 */
},
function (<span class="hljs-name">module</span>, exports, __webpack_require__) {
    /* 模块bar.js的代码 */
}
])<span class="hljs-comment">;</span></code></pre>
<p>可以看到，整个打包生成的代码是一个IIFE(立即执行函数)，函数内容我们待会看，我们先来分析函数的参数。</p>
<p>函数参数是我们写的各个模块组成的数组，只不过我们的代码，被webpack包装在了一个函数的内部，也就是说我们的模块，在这里就是一个函数。为什么要这样做，是因为浏览器本身不支持模块化，那么webpack就用函数作用域来hack模块化的效果。</p>
<p>如果你debug过node代码，你会发现一样的hack方式，node中的模块也是函数，跟模块相关的参数<code>exports</code>、<code>require</code>，或者其他参数<code>__filename</code>和<code>__dirname</code>等都是通过函数传值作为模块中的变量，模块与外部模块的访问就是通过这些参数进行的，当然这对开发者来说是透明的。</p>
<p>同样的方式，webpack也控制了模块的<code>module</code>、<code>exports</code>和<code>require</code>，那么我们就看看webpack是如何实现这些功能的。</p>
<p>下面是摘取的函数内容，并添加了一些注释：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 1、模块缓存对象
var installedModules = {};
// 2、webpack实现的require
function __webpack_require__(moduleId) {
    // 3、判断是否已缓存模块
    if(installedModules[moduleId]) {
        return installedModules[moduleId].exports;
    }
    // 4、缓存模块
    var module = installedModules[moduleId] = {
        i: moduleId,
        l: false,
        exports: {}
    };
    // 5、调用模块函数
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    // 6、标记模块为已加载
    module.l = true;
    // 7、返回module.exports
    return module.exports;
}
// 8、require第一个模块
return __webpack_require__(__webpack_require__.s = 0);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-comment">// 1、模块缓存对象</span>
var installedModules = {};
<span class="hljs-comment">// 2、webpack实现的require</span>
<span class="hljs-function">function <span class="hljs-title">__webpack_require__</span><span class="hljs-params">(moduleId)</span> </span>{
    <span class="hljs-comment">// 3、判断是否已缓存模块</span>
    <span class="hljs-keyword">if</span>(installedModules[moduleId]) {
        <span class="hljs-keyword">return</span> installedModules[moduleId].<span class="hljs-keyword">exports</span>;
    }
    <span class="hljs-comment">// 4、缓存模块</span>
    var <span class="hljs-keyword">module</span> = installedModules[moduleId] = {
        i: moduleId,
        l: <span class="hljs-keyword">false</span>,
        <span class="hljs-keyword">exports</span>: {}
    };
    <span class="hljs-comment">// 5、调用模块函数</span>
    modules[moduleId].call(<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span>, <span class="hljs-keyword">module</span>, <span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span>, __webpack_require__);
    <span class="hljs-comment">// 6、标记模块为已加载</span>
    <span class="hljs-keyword">module</span>.l = <span class="hljs-keyword">true</span>;
    <span class="hljs-comment">// 7、返回module.exports</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span>;
}
<span class="hljs-comment">// 8、require第一个模块</span>
<span class="hljs-keyword">return</span> __webpack_require__(__webpack_require__.s = <span class="hljs-number">0</span>);</code></pre>
<p>模块数组作为参数传入IIFE函数后，IIFE做了一些初始化工作：</p>
<ol>
<li>IIFE首先定义了<code>installedModules </code>，这个变量被用来缓存已加载的模块。</li>
<li>定义了<code>__webpack_require__ </code>这个函数，函数参数为模块的id。这个函数用来实现模块的require。</li>
<li>
<code>__webpack_require__ </code>函数首先会检查是否缓存了已加载的模块，如果有则直接返回缓存模块的<code>exports</code>。</li>
<li>如果没有缓存，也就是第一次加载，则首先初始化模块，并将模块进行缓存。</li>
<li>然后调用模块函数，也就是前面webpack对我们的模块的包装函数，将<code>module</code>、<code>module.exports</code>和<code>__webpack_require__</code>作为参数传入。注意这里做了一个动态绑定，将模块函数的调用对象绑定为<code>module.exports</code>，这是为了保证在模块中的this指向当前模块。</li>
<li>调用完成后，模块标记为已加载。</li>
<li>返回模块<code>exports</code>的内容。</li>
<li>利用前面定义的<code>__webpack_require__ </code>函数，require第0个模块，也就是入口模块。</li>
</ol>
<p>require入口模块时，入口模块会收到收到三个参数，下面是入口模块代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function(module, exports, __webpack_require__) {
    &quot;use strict&quot;;
    var bar = __webpack_require__(1);
    bar();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, exports, __webpack_require__</span>) </span>{
<span class="hljs-meta">    "use strict"</span>;
    <span class="hljs-keyword">var</span> bar = __webpack_require__(<span class="hljs-number">1</span>);
    bar();
}</code></pre>
<p>webpack传入的第一个参数<code>module</code>是当前缓存的模块，包含当前模块的信息和<code>exports</code>；第二个参数<code>exports</code>是<code>module.exports</code>的引用，这也符合commonjs的规范；第三个<code>__webpack_require__ </code>则是<code>require</code>的实现。</p>
<p>在我们的模块中，就可以对外使用<code>module.exports</code>或<code>exports</code>进行导出，使用<code>__webpack_require__</code>导入需要的模块，代码跟commonjs完全一样。</p>
<p>这样，就完成了对第一个模块的require，然后第一个模块会根据自己对其他模块的require，依次加载其他模块，最终形成一个依赖网状结构。webpack管理着这些模块的缓存，如果一个模块被require多次，那么只会有一次加载过程，而返回的是缓存的内容，这也是commonjs的规范。</p>
<h3 id="articleHeader2">结论</h3>
<p>到这里，webpack就hack了commonjs代码。</p>
<p>原理还是很简单的，其实就是实现<code>exports</code>和<code>require</code>，然后自动加载入口模块，控制缓存模块，that's all。</p>
<p>细心的你一定会发现，文章到这里只介绍了webpack对commonjs的实现，那么ES6 module是如何实现的呢？<br>欢迎阅读本系列第二篇<a href="https://segmentfault.com/a/1190000010955254">《webpack模块化原理-ES6 module》</a>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack模块化原理-commonjs

## 原文链接
[https://segmentfault.com/a/1190000010349749](https://segmentfault.com/a/1190000010349749)

