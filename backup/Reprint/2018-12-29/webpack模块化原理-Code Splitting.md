---
title: 'webpack模块化原理-Code Splitting' 
date: 2018-12-29 2:30:10
hidden: true
slug: 5ffa085a76
categories: [reprint]
---

{{< raw >}}

                    
<p>webpack的模块化不仅支持commonjs和es module，还能通过code splitting实现模块的动态加载。根据<a href="https://webpack.js.org/guides/code-splitting/#src/components/Sidebar/Sidebar.jsx" rel="nofollow noreferrer" target="_blank">wepack官方文档</a>，实现动态加载的方式有两种：<code>import</code>和<code>require.ensure</code>。</p>
<p>那么，这篇文档就来分析一下，webpack是如何实现code splitting的。</p>
<p>PS：如果你对webpack如何实现commonjs和es module感兴趣，可以查看我的前两篇文章：<a href="https://segmentfault.com/a/1190000010349749">webpack模块化原理-commonjs</a>和<a href="https://segmentfault.com/a/1190000010955254" target="_blank">webpack模块化原理-ES module</a>。</p>
<h3 id="articleHeader0">准备</h3>
<p>首先我们依然创建一个简单入口模块<code>index.js</code>和两个依赖模块<code>foo.js</code>和<code>bar.js</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// index.js
'use strict';
import(/* webpackChunkName: &quot;foo&quot; */ './foo').then(foo => {
    console.log(foo());
})
import(/* webpackChunkName: &quot;bar&quot; */ './bar').then(bar => {
    console.log(bar());
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// index.js</span>
<span class="hljs-meta">'use strict'</span>;
<span class="hljs-keyword">import</span>(<span class="hljs-comment">/* webpackChunkName: "foo" */</span> <span class="hljs-string">'./foo'</span>).then(<span class="hljs-function"><span class="hljs-params">foo</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(foo());
})
<span class="hljs-keyword">import</span>(<span class="hljs-comment">/* webpackChunkName: "bar" */</span> <span class="hljs-string">'./bar'</span>).then(<span class="hljs-function"><span class="hljs-params">bar</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(bar());
})</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// foo.js
'use strict';
exports.foo = function () {
    return 2;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// foo.js</span>
<span class="hljs-meta">'use strict'</span>;
exports.foo = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-number">2</span>;
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bar.js
'use strict';
exports.bar = function () {
    return 1;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// bar.js</span>
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
        filename: 'index.js',
        chunkFilename: '[name].bundle.js'
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
        filename: <span class="hljs-string">'index.js'</span>,
        chunkFilename: <span class="hljs-string">'[name].bundle.js'</span>
    },
};
</code></pre>
<p>这是一个最简单的配置，指定了模块入口和打包文件输出路径，值得注意的是，这次还指定了分离模块的文件名<code>[name].bundle.js</code>（不指定会有默认文件名）。</p>
<p>在根目录下执行<code>webpack</code>，得到经过webpack打包的代码如下（去掉了不必要的注释）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(modules) { // webpackBootstrap
    // install a JSONP callback for chunk loading
    var parentJsonpFunction = window[&quot;webpackJsonp&quot;];
    window[&quot;webpackJsonp&quot;] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
        // add &quot;moreModules&quot; to the modules object,
        // then flag all &quot;chunkIds&quot; as loaded and fire callback
        var moduleId, chunkId, i = 0, resolves = [], result;
        for(;i < chunkIds.length; i++) {
            chunkId = chunkIds[i];
            if(installedChunks[chunkId]) {
                resolves.push(installedChunks[chunkId][0]);
            }
            installedChunks[chunkId] = 0;
        }
        for(moduleId in moreModules) {
            if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
                modules[moduleId] = moreModules[moduleId];
            }
        }
        if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
        while(resolves.length) {
            resolves.shift()();
        }
    };
    // The module cache
    var installedModules = {};
    // objects to store loaded and loading chunks
    var installedChunks = {
        2: 0
    };
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
    // This file contains only the entry chunk.
    // The chunk loading function for additional chunks
    __webpack_require__.e = function requireEnsure(chunkId) {
        var installedChunkData = installedChunks[chunkId];
        if(installedChunkData === 0) {
            return new Promise(function(resolve) { resolve(); });
        }
        // a Promise means &quot;currently loading&quot;.
        if(installedChunkData) {
            return installedChunkData[2];
        }
        // setup Promise in chunk cache
        var promise = new Promise(function(resolve, reject) {
            installedChunkData = installedChunks[chunkId] = [resolve, reject];
        });
        installedChunkData[2] = promise;
        // start chunk loading
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.charset = 'utf-8';
        script.async = true;
        script.timeout = 120000;
        if (__webpack_require__.nc) {
            script.setAttribute(&quot;nonce&quot;, __webpack_require__.nc);
        }
        script.src = __webpack_require__.p + &quot;&quot; + ({&quot;0&quot;:&quot;foo&quot;,&quot;1&quot;:&quot;bar&quot;}[chunkId]||chunkId) + &quot;.bundle.js&quot;;
        var timeout = setTimeout(onScriptComplete, 120000);
        script.onerror = script.onload = onScriptComplete;
        function onScriptComplete() {
            // avoid mem leaks in IE.
            script.onerror = script.onload = null;
            clearTimeout(timeout);
            var chunk = installedChunks[chunkId];
            if(chunk !== 0) {
                if(chunk) {
                    chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'));
                }
                installedChunks[chunkId] = undefined;
            }
        };
        head.appendChild(script);
        return promise;
    };
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
    // on error function for async loading
    __webpack_require__.oe = function(err) { console.error(err); throw err; };
    // Load entry module and return exports
    return __webpack_require__(__webpack_require__.s = 0);
})
([
(function(module, exports, __webpack_require__) {
    &quot;use strict&quot;;
    __webpack_require__.e/* import() */(0).then(__webpack_require__.bind(null, 1)).then(foo => {
        console.log(foo());
    })
    __webpack_require__.e/* import() */(1).then(__webpack_require__.bind(null, 2)).then(bar => {
        console.log(bar());
    })
})
]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>(<span class="hljs-name">function</span>(<span class="hljs-name">modules</span>) { // webpackBootstrap
    // install a JSONP callback for chunk loading
    var parentJsonpFunction = window[<span class="hljs-string">"webpackJsonp"</span>]<span class="hljs-comment">;</span>
    window[<span class="hljs-string">"webpackJsonp"</span>] = function webpackJsonpCallback(<span class="hljs-name">chunkIds</span>, moreModules, executeModules) {
        // add <span class="hljs-string">"moreModules"</span> to the modules object,
        // then flag all <span class="hljs-string">"chunkIds"</span> as loaded and fire callback
        var moduleId, chunkId, i = <span class="hljs-number">0</span>, resolves = [], result;
        for(<span class="hljs-comment">;i &lt; chunkIds.length; i++) {</span>
            chunkId = chunkIds[i]<span class="hljs-comment">;</span>
            if(<span class="hljs-name">installedChunks</span>[chunkId]) {
                resolves.push(<span class="hljs-name">installedChunks</span>[chunkId][<span class="hljs-number">0</span>])<span class="hljs-comment">;</span>
            }
            installedChunks[chunkId] = <span class="hljs-number">0</span><span class="hljs-comment">;</span>
        }
        for(<span class="hljs-name">moduleId</span> in moreModules) {
            if(<span class="hljs-name">Object.prototype.hasOwnProperty.call</span>(<span class="hljs-name">moreModules</span>, moduleId)) {
                modules[moduleId] = moreModules[moduleId]<span class="hljs-comment">;</span>
            }
        }
        if(<span class="hljs-name">parentJsonpFunction</span>) parentJsonpFunction(<span class="hljs-name">chunkIds</span>, moreModules, executeModules)<span class="hljs-comment">;</span>
        while(<span class="hljs-name">resolves.length</span>) {
            resolves.shift()()<span class="hljs-comment">;</span>
        }
    }<span class="hljs-comment">;</span>
    // The module cache
    var installedModules = {}<span class="hljs-comment">;</span>
    // objects to store loaded and loading chunks
    var installedChunks = {
        <span class="hljs-number">2</span>: <span class="hljs-number">0</span>
    }<span class="hljs-comment">;</span>
    // The require function
    function __webpack_require__(<span class="hljs-name">moduleId</span>) {
        // Check if module is in cache
        if(<span class="hljs-name">installedModules</span>[moduleId]) {
            return installedModules[moduleId].exports;
        }
        // Create a new module (<span class="hljs-name"><span class="hljs-builtin-name">and</span></span> put it into the cache)
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: <span class="hljs-literal">false</span>,
            exports: {}
        }<span class="hljs-comment">;</span>
        // Execute the module function
        modules[moduleId].call(<span class="hljs-name">module.exports</span>, module, module.exports, __webpack_require__)<span class="hljs-comment">;</span>
        // Flag the module as loaded
        module.l = <span class="hljs-literal">true</span><span class="hljs-comment">;</span>
        // Return the exports of the module
        return module.exports;
    }
    // This file contains only the entry chunk.
    // The chunk loading function for additional chunks
    __webpack_require__.e = function requireEnsure(<span class="hljs-name">chunkId</span>) {
        var installedChunkData = installedChunks[chunkId]<span class="hljs-comment">;</span>
        if(<span class="hljs-name">installedChunkData</span> === <span class="hljs-number">0</span>) {
            return new Promise(<span class="hljs-name">function</span>(<span class="hljs-name"><span class="hljs-builtin-name">resolve</span></span>) { resolve()<span class="hljs-comment">; });</span>
        }
        // a Promise means <span class="hljs-string">"currently loading"</span>.
        if(<span class="hljs-name">installedChunkData</span>) {
            return installedChunkData[<span class="hljs-number">2</span>]<span class="hljs-comment">;</span>
        }
        // setup Promise in chunk cache
        var promise = new Promise(<span class="hljs-name">function</span>(<span class="hljs-name"><span class="hljs-builtin-name">resolve</span></span>, reject) {
            installedChunkData = installedChunks[chunkId] = [resolve, reject]<span class="hljs-comment">;</span>
        })<span class="hljs-comment">;</span>
        installedChunkData[<span class="hljs-number">2</span>] = promise;
        // start chunk loading
        var head = document.getElementsByTagName(<span class="hljs-name">'head'</span>)[<span class="hljs-number">0</span>]<span class="hljs-comment">;</span>
        var script = document.createElement(<span class="hljs-name">'script'</span>)<span class="hljs-comment">;</span>
        script.type = 'text/javascript';
        script.charset = 'utf-8';
        script.async = <span class="hljs-literal">true</span><span class="hljs-comment">;</span>
        script.timeout = <span class="hljs-number">120000</span><span class="hljs-comment">;</span>
        if (<span class="hljs-name">__webpack_require__.nc</span>) {
            script.setAttribute(<span class="hljs-string">"nonce"</span>, __webpack_require__.nc)<span class="hljs-comment">;</span>
        }
        script.src = __webpack_require__.p + <span class="hljs-string">""</span> + ({<span class="hljs-string">"0"</span>:<span class="hljs-string">"foo"</span>,<span class="hljs-string">"1"</span>:<span class="hljs-string">"bar"</span>}[chunkId]||chunkId) + <span class="hljs-string">".bundle.js"</span><span class="hljs-comment">;</span>
        var timeout = setTimeout(<span class="hljs-name">onScriptComplete</span>, <span class="hljs-number">120000</span>)<span class="hljs-comment">;</span>
        script.onerror = script.onload = onScriptComplete;
        function onScriptComplete() {
            // avoid mem leaks in IE.
            script.onerror = script.onload = null;
            clearTimeout(<span class="hljs-name">timeout</span>)<span class="hljs-comment">;</span>
            var chunk = installedChunks[chunkId]<span class="hljs-comment">;</span>
            if(<span class="hljs-name"><span class="hljs-builtin-name">chunk</span></span> !== <span class="hljs-number">0</span>) {
                if(<span class="hljs-name"><span class="hljs-builtin-name">chunk</span></span>) {
                    chunk[<span class="hljs-number">1</span>](<span class="hljs-name"><span class="hljs-builtin-name">new</span></span> Error(<span class="hljs-name">'Loading</span> chunk ' + chunkId + ' failed.'))<span class="hljs-comment">;</span>
                }
                installedChunks[chunkId] = undefined;
            }
        }<span class="hljs-comment">;</span>
        head.appendChild(<span class="hljs-name">script</span>)<span class="hljs-comment">;</span>
        return promise;
    }<span class="hljs-comment">;</span>
    // expose the modules object (<span class="hljs-name">__webpack_modules__</span>)
    __webpack_require__.m = modules;
    // expose the module cache
    __webpack_require__.c = installedModules;
    // define getter function for harmony exports
    __webpack_require__.d = function(<span class="hljs-name">exports</span>, name, getter) {
        if(<span class="hljs-name">!__webpack_require__.o</span>(<span class="hljs-name">exports</span>, name)) {
            Object.defineProperty(<span class="hljs-name">exports</span>, name, {
                configurable: <span class="hljs-literal">false</span>,
                enumerable: <span class="hljs-literal">true</span>,
                get: getter
            })<span class="hljs-comment">;</span>
        }
    }<span class="hljs-comment">;</span>
    // getDefaultExport function for compatibility with non-harmony modules
    __webpack_require__.n = function(<span class="hljs-name">module</span>) {
        var getter = module &amp;&amp; module.__esModule ?
            function getDefault() { return module['default']<span class="hljs-comment">; } :</span>
            function getModuleExports() { return module; }<span class="hljs-comment">;</span>
        __webpack_require__.d(<span class="hljs-name">getter</span>, 'a', getter)<span class="hljs-comment">;</span>
        return getter;
    }<span class="hljs-comment">;</span>
    // Object.prototype.hasOwnProperty.call
    __webpack_require__.o = function(<span class="hljs-name">object</span>, property) { return Object.prototype.hasOwnProperty.call(<span class="hljs-name">object</span>, property)<span class="hljs-comment">; };</span>
    // __webpack_public_path__
    __webpack_require__.p = <span class="hljs-string">""</span><span class="hljs-comment">;</span>
    // on error function for async loading
    __webpack_require__.oe = function(<span class="hljs-name">err</span>) { console.error(<span class="hljs-name">err</span>)<span class="hljs-comment">; throw err; };</span>
    // Load entry module and return exports
    return __webpack_require__(<span class="hljs-name">__webpack_require__.s</span> = <span class="hljs-number">0</span>)<span class="hljs-comment">;</span>
})
([
(<span class="hljs-name">function</span>(<span class="hljs-name">module</span>, exports, __webpack_require__) {
    <span class="hljs-string">"use strict"</span><span class="hljs-comment">;</span>
    __webpack_require__.e/* import() */(<span class="hljs-number">0</span>).then(<span class="hljs-name">__webpack_require__.bind</span>(<span class="hljs-name">null</span>, <span class="hljs-number">1</span>)).then(<span class="hljs-name">foo</span> =&gt; {
        console.log(<span class="hljs-name">foo</span>())<span class="hljs-comment">;</span>
    })
    __webpack_require__.e/* import() */(<span class="hljs-number">1</span>).then(<span class="hljs-name">__webpack_require__.bind</span>(<span class="hljs-name">null</span>, <span class="hljs-number">2</span>)).then(<span class="hljs-name">bar</span> =&gt; {
        console.log(<span class="hljs-name">bar</span>())<span class="hljs-comment">;</span>
    })
})
])<span class="hljs-comment">;</span></code></pre>
<h3 id="articleHeader1">分析</h3>
<p>编译后的代码，整体跟前两篇文章中使用commonjs和es6 module编写的代码编译后的结构差别不大，都是通过IFFE的方式启动代码，然后使用webpack实现的<code>require</code>和<code>exports</code>实现的模块化。</p>
<p>而对于code splitting的支持，区别在于这里使用<code>__webpack_require__.e</code>实现动态加载模块和实现基于promise的模块导入。</p>
<p>所以首先分析<code>__webpack_require__.e</code>函数的定义，这个函数实现了动态加载：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="__webpack_require__.e = function requireEnsure(chunkId) {
    // 1、缓存查找
    var installedChunkData = installedChunks[chunkId];
    if(installedChunkData === 0) {
        return new Promise(function(resolve) { resolve(); });
    }
    if(installedChunkData) {
        return installedChunkData[2];
    }
    // 2、缓存模块
    var promise = new Promise(function(resolve, reject) {
        installedChunkData = installedChunks[chunkId] = [resolve, reject];
    });
    installedChunkData[2] = promise;
    // 3、加载模块
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.async = true;
    script.timeout = 120000;
    if (__webpack_require__.nc) {
        script.setAttribute(&quot;nonce&quot;, __webpack_require__.nc);
    }
    script.src = __webpack_require__.p + &quot;&quot; + ({&quot;0&quot;:&quot;foo&quot;}[chunkId]||chunkId) + &quot;.bundle.js&quot;;
    // 4、异常处理
    var timeout = setTimeout(onScriptComplete, 120000);
    script.onerror = script.onload = onScriptComplete;
    function onScriptComplete() {
        // avoid mem leaks in IE.
        script.onerror = script.onload = null;
        clearTimeout(timeout);
        var chunk = installedChunks[chunkId];
        if(chunk !== 0) {
            if(chunk) {
                chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'));
            }
            installedChunks[chunkId] = undefined;
        }
    };
    head.appendChild(script);
    // 5、返回promise
    return promise;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>__webpack_require__.e = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">requireEnsure</span>(<span class="hljs-params">chunkId</span>) </span>{
    <span class="hljs-comment">// 1、缓存查找</span>
    <span class="hljs-keyword">var</span> installedChunkData = installedChunks[chunkId];
    <span class="hljs-keyword">if</span>(installedChunkData === <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{ resolve(); });
    }
    <span class="hljs-keyword">if</span>(installedChunkData) {
        <span class="hljs-keyword">return</span> installedChunkData[<span class="hljs-number">2</span>];
    }
    <span class="hljs-comment">// 2、缓存模块</span>
    <span class="hljs-keyword">var</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
        installedChunkData = installedChunks[chunkId] = [resolve, reject];
    });
    installedChunkData[<span class="hljs-number">2</span>] = promise;
    <span class="hljs-comment">// 3、加载模块</span>
    <span class="hljs-keyword">var</span> head = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'head'</span>)[<span class="hljs-number">0</span>];
    <span class="hljs-keyword">var</span> script = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'script'</span>);
    script.type = <span class="hljs-string">'text/javascript'</span>;
    script.charset = <span class="hljs-string">'utf-8'</span>;
    script.async = <span class="hljs-literal">true</span>;
    script.timeout = <span class="hljs-number">120000</span>;
    <span class="hljs-keyword">if</span> (__webpack_require__.nc) {
        script.setAttribute(<span class="hljs-string">"nonce"</span>, __webpack_require__.nc);
    }
    script.src = __webpack_require__.p + <span class="hljs-string">""</span> + ({<span class="hljs-string">"0"</span>:<span class="hljs-string">"foo"</span>}[chunkId]||chunkId) + <span class="hljs-string">".bundle.js"</span>;
    <span class="hljs-comment">// 4、异常处理</span>
    <span class="hljs-keyword">var</span> timeout = setTimeout(onScriptComplete, <span class="hljs-number">120000</span>);
    script.onerror = script.onload = onScriptComplete;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onScriptComplete</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// avoid mem leaks in IE.</span>
        script.onerror = script.onload = <span class="hljs-literal">null</span>;
        clearTimeout(timeout);
        <span class="hljs-keyword">var</span> chunk = installedChunks[chunkId];
        <span class="hljs-keyword">if</span>(chunk !== <span class="hljs-number">0</span>) {
            <span class="hljs-keyword">if</span>(chunk) {
                chunk[<span class="hljs-number">1</span>](<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Loading chunk '</span> + chunkId + <span class="hljs-string">' failed.'</span>));
            }
            installedChunks[chunkId] = <span class="hljs-literal">undefined</span>;
        }
    };
    head.appendChild(script);
    <span class="hljs-comment">// 5、返回promise</span>
    <span class="hljs-keyword">return</span> promise;
};</code></pre>
<p>代码大致逻辑如下：</p>
<ol>
<li>缓存查找：从缓存<code>installedChunks</code>中查找是否有缓存模块，如果缓存标识为0，则表示模块已加载过，直接返回<code>promise</code>；如果缓存为数组，表示缓存正在加载中，则返回缓存的<code>promise</code>对象</li>
<li>如果没有缓存，则创建一个<code>promise</code>，并将<code>promise</code>和<code>resolve</code>、<code>reject</code>缓存在<code>installedChunks</code>中</li>
<li>构建一个script标签，append到head标签中，src指向加载的模块脚本资源，实现动态加载js脚本</li>
<li>添加script标签onload、onerror 事件，如果超时或者模块加载失败，则会调用reject返回模块加载失败异常</li>
<li>如果模块加载成功，则返回当前模块<code>promise</code>，对应于<code>import()</code>
</li>
</ol>
<p>以上便是模块加载的过程，当资源加载完成，模块代码开始执行，那么我们来看一下模块代码的结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {
&quot;use strict&quot;;
exports.foo = function () {
    return 2;
}
/***/ })
]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>webpackJsonp([<span class="hljs-number">0</span>],[
<span class="hljs-comment">/* 0 */</span>,
<span class="hljs-comment">/* 1 */</span>
<span class="hljs-comment">/***/</span> (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, exports, __webpack_require__</span>) </span>{
<span class="hljs-meta">"use strict"</span>;
exports.foo = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-number">2</span>;
}
<span class="hljs-comment">/***/</span> })
]);</code></pre>
<p>可以看到，模块代码不仅被包在一个函数中（用来模拟模块作用域），外层还被当做参数传入<code>webpackJsonp</code>中。那么这个<code>webpackJsonp</code>函数的作用是什么呢？</p>
<p>其实这里的<code>webpackJsonp</code>类似于jsonp中的callback，作用是作为模块加载和执行完成的回调，从而触发<code>import</code>的<code>resolve</code>。</p>
<p>具体细看<code>webpackJsonp</code>代码来分析：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window[&quot;webpackJsonp&quot;] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
    var moduleId, chunkId, i = 0, resolves = [], result;
    // 1、收集模块resolve
    for(;i < chunkIds.length; i++) {
        chunkId = chunkIds[i];
        if(installedChunks[chunkId]) {
            resolves.push(installedChunks[chunkId][0]);
        }
        installedChunks[chunkId] = 0;
    }
    // 2、copy模块到modules
    for(moduleId in moreModules) {
        if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
            modules[moduleId] = moreModules[moduleId];
        }
    }
    if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
    // 3、resolve import
    while(resolves.length) {
        resolves.shift()();
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">window</span>[<span class="hljs-string">"webpackJsonp"</span>] = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">webpackJsonpCallback</span>(<span class="hljs-params">chunkIds, moreModules, executeModules</span>) </span>{
    <span class="hljs-keyword">var</span> moduleId, chunkId, i = <span class="hljs-number">0</span>, resolves = [], result;
    <span class="hljs-comment">// 1、收集模块resolve</span>
    <span class="hljs-keyword">for</span>(;i &lt; chunkIds.length; i++) {
        chunkId = chunkIds[i];
        <span class="hljs-keyword">if</span>(installedChunks[chunkId]) {
            resolves.push(installedChunks[chunkId][<span class="hljs-number">0</span>]);
        }
        installedChunks[chunkId] = <span class="hljs-number">0</span>;
    }
    <span class="hljs-comment">// 2、copy模块到modules</span>
    <span class="hljs-keyword">for</span>(moduleId <span class="hljs-keyword">in</span> moreModules) {
        <span class="hljs-keyword">if</span>(<span class="hljs-built_in">Object</span>.prototype.hasOwnProperty.call(moreModules, moduleId)) {
            modules[moduleId] = moreModules[moduleId];
        }
    }
    <span class="hljs-keyword">if</span>(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
    <span class="hljs-comment">// 3、resolve import</span>
    <span class="hljs-keyword">while</span>(resolves.length) {
        resolves.shift()();
    }
};</code></pre>
<p>代码大致逻辑如下：</p>
<ol>
<li>根据<code>chunkIds</code>收集对应模块的<code>resolve</code>，这里的<code>chunkIds</code>为数组是因为<code>require.ensure</code>是可以实现异步加载多个模块的，所以需要兼容</li>
<li>把动态模块添加到IFFE的<code>modules</code>中，提供其他CMD方案使用模块</li>
<li>直接调用<code>resolve</code>，完成整个异步加载</li>
</ol>
<h3 id="articleHeader2">总结</h3>
<p>webpack通过<code>__webpack_require__.e</code>函数实现了动态加载，再通过<code>webpackJsonp</code>函数实现异步加载回调，把模块内容以promise的方式暴露给调用方，从而实现了对code splitting的支持。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack模块化原理-Code Splitting

## 原文链接
[https://segmentfault.com/a/1190000011435407](https://segmentfault.com/a/1190000011435407)

