---
title: '简要分析webpack打包后代码' 
date: 2019-02-04 2:30:58
hidden: true
slug: fxzpke13576
categories: [reprint]
---

{{< raw >}}

                    
<p>开门见山</p>
<h3 id="articleHeader0">1.打包单一模块</h3>
<p>webpack.config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    entry:&quot;./chunk1.js&quot;,
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
    entry:<span class="hljs-string">"./chunk1.js"</span>,
    output: {
        path: __dirname + <span class="hljs-string">'/dist'</span>,
        filename: <span class="hljs-string">'[name].js'</span>
    },
};</code></pre>
<p>chunk1.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var chunk1=1;
exports.chunk1=chunk1;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code>var chu<span class="hljs-symbol">nk1</span>=<span class="hljs-number">1</span>;
exports.chu<span class="hljs-symbol">nk1</span>=chu<span class="hljs-symbol">nk1</span>;</code></pre>
<p>打包后，main.js(webpack生成的一些注释已经去掉)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" (function(modules) { // webpackBootstrap
     // The module cache
     var installedModules = {};
     // The require function
     function __webpack_require__(moduleId) {
         // Check if module is in cache
         if(installedModules[moduleId])
             return installedModules[moduleId].exports;
         // Create a new module (and put it into the cache)
         var module = installedModules[moduleId] = {
             exports: {},
             id: moduleId,
             loaded: false
         };
         // Execute the module function
         modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
         // Flag the module as loaded
         module.loaded = true;
         // Return the exports of the module
         return module.exports;
     }


     // expose the modules object (__webpack_modules__)
     __webpack_require__.m = modules;
     // expose the module cache
     __webpack_require__.c = installedModules;
     // __webpack_public_path__
     __webpack_require__.p = &quot;&quot;;
     // Load entry module and return exports
     return __webpack_require__(0);
 })([function(module, exports) {
    var chunk1=1;
    exports.chunk1=chunk1;
}]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code> (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">modules</span>) </span>{ <span class="hljs-comment">// webpackBootstrap</span>
     <span class="hljs-comment">// The module cache</span>
     <span class="hljs-built_in">var</span> installedModules = {};
     <span class="hljs-comment">// The require function</span>
     <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">__webpack_require__</span>(<span class="hljs-params">moduleId</span>) </span>{
         <span class="hljs-comment">// Check if module is in cache</span>
         <span class="hljs-keyword">if</span>(installedModules[moduleId])
             <span class="hljs-keyword">return</span> installedModules[moduleId].exports;
         <span class="hljs-comment">// Create a new module (and put it into the cache)</span>
         <span class="hljs-built_in">var</span> <span class="hljs-built_in">module</span> = installedModules[moduleId] = {
             <span class="hljs-attribute">exports</span>: {},
             <span class="hljs-attribute">id:</span><span class="hljs-string"> moduleId</span>,
             <span class="hljs-attribute">loaded</span>: <span class="hljs-literal">false</span>
         };
         <span class="hljs-comment">// Execute the module function</span>
         modules[moduleId].call(<span class="hljs-built_in">module</span>.exports, <span class="hljs-built_in">module</span>, <span class="hljs-built_in">module</span>.exports, __webpack_require__);
         <span class="hljs-comment">// Flag the module as loaded</span>
         <span class="hljs-built_in">module</span>.loaded = <span class="hljs-literal">true</span>;
         <span class="hljs-comment">// Return the exports of the module</span>
         <span class="hljs-keyword">return</span> <span class="hljs-built_in">module</span>.exports;
     }


     <span class="hljs-comment">// expose the modules object (__webpack_modules__)</span>
     __webpack_require__.m = modules;
     <span class="hljs-comment">// expose the module cache</span>
     __webpack_require__.c = installedModules;
     <span class="hljs-comment">// __webpack_public_path__</span>
     __webpack_require__.p = <span class="hljs-string">""</span>;
     <span class="hljs-comment">// Load entry module and return exports</span>
     <span class="hljs-keyword">return</span> __webpack_require__(<span class="hljs-number">0</span>);
 })([<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, exports</span>) </span>{
    <span class="hljs-built_in">var</span> chunk1=<span class="hljs-number">1</span>;
    exports.chunk1=chunk1;
}]);</code></pre>
<p>这其实就是一个立即执行函数，简化一下就是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(module){})([function(){},function(){}]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code style="word-break: break-word; white-space: initial;">(<span class="hljs-name">function</span>(<span class="hljs-name">module</span>){})([function(){},function(){}])<span class="hljs-comment">;</span></code></pre>
<p>OK,看一下自运行的匿名函数里面干了什么：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function(modules) { // webpackBootstrap
     // modules就是一个数组，元素就是一个个函数体，就是我们声明的模块
     var installedModules = {};
     // The require function
     function __webpack_require__(moduleId) {
         ...
     }
     // expose the modules object (__webpack_modules__)
     __webpack_require__.m = modules;
     // expose the module cache
     __webpack_require__.c = installedModules;
     // __webpack_public_path__
     __webpack_require__.p = &quot;&quot;;
     // Load entry module and return exports
     return __webpack_require__(0);
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">modules</span>) </span>{ <span class="hljs-comment">// webpackBootstrap</span>
     <span class="hljs-comment">// modules就是一个数组，元素就是一个个函数体，就是我们声明的模块</span>
     <span class="hljs-keyword">var</span> installedModules = {};
     <span class="hljs-comment">// The require function</span>
     <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">__webpack_require__</span>(<span class="hljs-params">moduleId</span>) </span>{
         ...
     }
     <span class="hljs-comment">// expose the modules object (__webpack_modules__)</span>
     __webpack_require__.m = modules;
     <span class="hljs-comment">// expose the module cache</span>
     __webpack_require__.c = installedModules;
     <span class="hljs-comment">// __webpack_public_path__</span>
     __webpack_require__.p = <span class="hljs-string">""</span>;
     <span class="hljs-comment">// Load entry module and return exports</span>
     <span class="hljs-keyword">return</span> __webpack_require__(<span class="hljs-number">0</span>);
 }</code></pre>
<p>整个函数里就声明了一个变量installedModules 和函数__webpack_require__，并在函数上添加了一个m,c,p属性，m属性保存的是传入的模块数组，c属性保存的是installedModules变量，P是一个空字符串。最后执行__webpack_require__函数，参数为零，并将其执行结果返回。下面看一下__webpack_require__干了什么：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function __webpack_require__(moduleId) {
        //moduleId就是调用是传入的0
         // installedModules[0]是undefined,继续往下
         if(installedModules[moduleId])
             return installedModules[moduleId].exports;
         // module就是{exports: {},id: 0,loaded: false}
         var module = installedModules[moduleId] = {
             exports: {},
             id: moduleId,
             loaded: false
         };
         // 下面接着分析这个
         modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
         // 表明模块已经载入
         module.loaded = true;
         // 返回module.exports(注意modules[moduleId].call的时候module.exports会被修改)
         return module.exports;
     }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-function">function <span class="hljs-title">__webpack_require__</span><span class="hljs-params">(moduleId)</span> </span>{
        <span class="hljs-comment">//moduleId就是调用是传入的0</span>
         <span class="hljs-comment">// installedModules[0]是undefined,继续往下</span>
         <span class="hljs-keyword">if</span>(installedModules[moduleId])
             <span class="hljs-keyword">return</span> installedModules[moduleId].<span class="hljs-keyword">exports</span>;
         <span class="hljs-comment">// module就是{exports: {},id: 0,loaded: false}</span>
         var <span class="hljs-keyword">module</span> = installedModules[moduleId] = {
             <span class="hljs-keyword">exports</span>: {},
             id: moduleId,
             loaded: <span class="hljs-keyword">false</span>
         };
         <span class="hljs-comment">// 下面接着分析这个</span>
         modules[moduleId].call(<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span>, <span class="hljs-keyword">module</span>, <span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span>, __webpack_require__);
         <span class="hljs-comment">// 表明模块已经载入</span>
         <span class="hljs-keyword">module</span>.loaded = <span class="hljs-keyword">true</span>;
         <span class="hljs-comment">// 返回module.exports(注意modules[moduleId].call的时候module.exports会被修改)</span>
         <span class="hljs-keyword">return</span> <span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span>;
     }</code></pre>
<p>接着看一下modules[moduleId].call(module.exports, module, module.exports, __webpack_require__)，其实就是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="modules[moduleId].call({}, module, module.exports, __webpack_require__)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">modules</span><span class="hljs-selector-attr">[moduleId]</span><span class="hljs-selector-class">.call</span>({}, <span class="hljs-selector-tag">module</span>, <span class="hljs-selector-tag">module</span><span class="hljs-selector-class">.exports</span>, __<span class="hljs-selector-tag">webpack_require__</span>)</code></pre>
<p>对call不了解当然也可以认为是这样(但是并不是等价，call能确保当模块中使用this的时候，this是指向module.exports的)：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function  a(module, exports) {
    var chunk1=1;
    exports.chunk1=chunk1;
}
a(module, exports,__webpack_require__);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-function"><span class="hljs-keyword">function</span>  <span class="hljs-title">a</span><span class="hljs-params">(module, <span class="hljs-keyword">exports</span>)</span> <span class="hljs-comment">{
    var chunk1=1;
    exports.chunk1=chunk1;
}</span>
<span class="hljs-title">a</span><span class="hljs-params">(module, <span class="hljs-keyword">exports</span>,__webpack_require__)</span>;</span></code></pre>
<p>传入的module就是{exports: {},id: 0,loaded: false}，exports就是{}，__webpack_require__就是声明的__webpack_require__函数(传入这个函数有什么用呢，第二节将会介绍)；<br>运行后module.exports就是{chunk1:1}。所以当我们使用chunk1这个模块的时候（比如var chunk1=require("chunk1"),得到的就是一个对象{chunk1:1}）。如果模块里没有exports.chunk1=chunk1或者module.exports=chunk1得到的就是一个空对象{}</p>
<h3 id="articleHeader1">2.使用模块</h3>
<p>上面我们已经分析了webpack是怎么打包一个模块的（入口文件就是一个模块），现在我们来看一下使用一个模块，然后使用模块的文件作为入口文件<br>webpack.config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    entry:&quot;./main.js&quot;,
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
    entry:<span class="hljs-string">"./main.js"</span>,
    output: {
        path: __dirname + <span class="hljs-string">'/dist'</span>,
        filename: <span class="hljs-string">'[name].js'</span>
    }
};</code></pre>
<p>main.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var chunk1=require(&quot;./chunk1&quot;);
console.log(chunk1);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> chunk1=<span class="hljs-built_in">require</span>(<span class="hljs-string">"./chunk1"</span>);
<span class="hljs-built_in">console</span>.log(chunk1);</code></pre>
<p>打包后</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function (modules) { // webpackBootstrap
    // The module cache
    var installedModules = {};
    // The require function
    function __webpack_require__(moduleId) {
        // Check if module is in cache
        if (installedModules[moduleId])
            return installedModules[moduleId].exports;
        // Create a new module (and put it into the cache)
        var module = installedModules[moduleId] = {
            exports: {},
            id: moduleId,
            loaded: false
        };
        // Execute the module function
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        // Flag the module as loaded
        module.loaded = true;
        // Return the exports of the module
        return module.exports;
    }
    // expose the modules object (__webpack_modules__)
    __webpack_require__.m = modules;
    // expose the module cache
    __webpack_require__.c = installedModules;
    // __webpack_public_path__
    __webpack_require__.p = &quot;&quot;;
    // Load entry module and return exports
    return __webpack_require__(0);
})([function (module, exports, __webpack_require__) {
    var chunk1=__webpack_require__(1);
    console.log(chunk1);
}, function (module, exports) {
    var chunk1 = 1;
    exports.chunk1 = chunk1;
}]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">modules</span>) </span>{ <span class="hljs-comment">// webpackBootstrap</span>
    <span class="hljs-comment">// The module cache</span>
    <span class="hljs-built_in">var</span> installedModules = {};
    <span class="hljs-comment">// The require function</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">__webpack_require__</span>(<span class="hljs-params">moduleId</span>) </span>{
        <span class="hljs-comment">// Check if module is in cache</span>
        <span class="hljs-keyword">if</span> (installedModules[moduleId])
            <span class="hljs-keyword">return</span> installedModules[moduleId].exports;
        <span class="hljs-comment">// Create a new module (and put it into the cache)</span>
        <span class="hljs-built_in">var</span> <span class="hljs-built_in">module</span> = installedModules[moduleId] = {
            <span class="hljs-attribute">exports</span>: {},
            <span class="hljs-attribute">id:</span><span class="hljs-string"> moduleId</span>,
            <span class="hljs-attribute">loaded</span>: <span class="hljs-literal">false</span>
        };
        <span class="hljs-comment">// Execute the module function</span>
        modules[moduleId].call(<span class="hljs-built_in">module</span>.exports, <span class="hljs-built_in">module</span>, <span class="hljs-built_in">module</span>.exports, __webpack_require__);
        <span class="hljs-comment">// Flag the module as loaded</span>
        <span class="hljs-built_in">module</span>.loaded = <span class="hljs-literal">true</span>;
        <span class="hljs-comment">// Return the exports of the module</span>
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">module</span>.exports;
    }
    <span class="hljs-comment">// expose the modules object (__webpack_modules__)</span>
    __webpack_require__.m = modules;
    <span class="hljs-comment">// expose the module cache</span>
    __webpack_require__.c = installedModules;
    <span class="hljs-comment">// __webpack_public_path__</span>
    __webpack_require__.p = <span class="hljs-string">""</span>;
    <span class="hljs-comment">// Load entry module and return exports</span>
    <span class="hljs-keyword">return</span> __webpack_require__(<span class="hljs-number">0</span>);
})([<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">module, exports, __webpack_require__</span>) </span>{
    <span class="hljs-built_in">var</span> chunk1=__webpack_require__(<span class="hljs-number">1</span>);
    <span class="hljs-built_in">console</span>.log(chunk1);
}, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">module, exports</span>) </span>{
    <span class="hljs-built_in">var</span> chunk1 = <span class="hljs-number">1</span>;
    exports.chunk1 = chunk1;
}]);</code></pre>
<p>不一样的地方就是自执行函数的参数由</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[function(module, exports) { var chunk1=1; exports.chunk1=chunk1;}]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code style="word-break: break-word; white-space: initial;">[<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(module, exports)</span> </span>{ <span class="hljs-keyword">var</span> chunk1=<span class="hljs-number">1</span>; exports.chunk1=chunk1;}]</code></pre>
<p>变为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[function (module, exports, __webpack_require__) {
    var chunk1=__webpack_require__(1);
    console.log(chunk1);
}, function (module, exports) {
    var chunk1 = 1;
    exports.chunk1 = chunk1;
}]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>[function (<span class="hljs-name">module</span>, exports, __webpack_require__) {
    var chunk1=__webpack_require__(<span class="hljs-number">1</span>)<span class="hljs-comment">;</span>
    console.log(<span class="hljs-name">chunk1</span>)<span class="hljs-comment">;</span>
}, function (<span class="hljs-name">module</span>, exports) {
    var chunk1 = <span class="hljs-number">1</span><span class="hljs-comment">;</span>
    exports.chunk1 = chunk1;
}]</code></pre>
<p>其实就是多了一个main模块，不过这个模块没有导出项，而且这个模块依赖于chunk1模块。所以当运行__webpack_require__(0)的时候，main模块缓存到installedModules[0]上，modules[0].call(也就是调用main模块)的时候，chunk1被缓存到installedModules[1]上，并且导出对象{chunk1：1}给模块main使用</p>
<h3 id="articleHeader2">3.重复使用模块</h3>
<p>webpack.config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    entry:&quot;./main.js&quot;,
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
    entry:<span class="hljs-string">"./main.js"</span>,
    output: {
        path: __dirname + <span class="hljs-string">'/dist'</span>,
        filename: <span class="hljs-string">'[name].js'</span>
    }
};</code></pre>
<p>main.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var chunk1=require(&quot;./chunk1&quot;);
var chunk2=require(&quot;.chunlk2&quot;);
console.log(chunk1);
console.log(chunk2);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> chunk1=<span class="hljs-built_in">require</span>(<span class="hljs-string">"./chunk1"</span>);
<span class="hljs-keyword">var</span> chunk2=<span class="hljs-built_in">require</span>(<span class="hljs-string">".chunlk2"</span>);
<span class="hljs-built_in">console</span>.log(chunk1);
<span class="hljs-built_in">console</span>.log(chunk2);</code></pre>
<p>chunk1.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var chunk2=require(&quot;./chunk2&quot;);
var chunk1=1;
exports.chunk1=chunk1;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code>var chu<span class="hljs-symbol">nk2</span>=require<span class="hljs-comment">("./chunk2")</span>;
var chu<span class="hljs-symbol">nk1</span>=<span class="hljs-number">1</span>;
exports.chu<span class="hljs-symbol">nk1</span>=chu<span class="hljs-symbol">nk1</span>;</code></pre>
<p>chunk2.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var chunk2=1;
exports.chunk2=chunk2;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code>var chu<span class="hljs-symbol">nk2</span>=<span class="hljs-number">1</span>;
exports.chu<span class="hljs-symbol">nk2</span>=chu<span class="hljs-symbol">nk2</span>;</code></pre>
<p>打包后</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function (modules) { // webpackBootstrap
    // The module cache
    var installedModules = {};
    // The require function
    function __webpack_require__(moduleId) {
        // Check if module is in cache
        if (installedModules[moduleId])
            return installedModules[moduleId].exports;
        // Create a new module (and put it into the cache)
        var module = installedModules[moduleId] = {
            exports: {},
            id: moduleId,
            loaded: false
        };
        // Execute the module function
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        // Flag the module as loaded
        module.loaded = true;
        // Return the exports of the module
        return module.exports;
    }
    // expose the modules object (__webpack_modules__)
    __webpack_require__.m = modules;
    // expose the module cache
    __webpack_require__.c = installedModules;
    // __webpack_public_path__
    __webpack_require__.p = &quot;&quot;;
    // Load entry module and return exports
    return __webpack_require__(0);
})([function (module, exports, __webpack_require__) {

    var chunk1 = __webpack_require__(1);
    var chunk2 = __webpack_require__(2);
    console.log(chunk1);
    console.log(chunk2);
}, function (module, exports, __webpack_require__) {

    __webpack_require__(2);
    var chunk1 = 1;
    exports.chunk1 = chunk1;
}, function (module, exports) {

    var chunk2 = 1;
    exports.chunk2 = chunk2;
}]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">modules</span>) </span>{ <span class="hljs-comment">// webpackBootstrap</span>
    <span class="hljs-comment">// The module cache</span>
    <span class="hljs-built_in">var</span> installedModules = {};
    <span class="hljs-comment">// The require function</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">__webpack_require__</span>(<span class="hljs-params">moduleId</span>) </span>{
        <span class="hljs-comment">// Check if module is in cache</span>
        <span class="hljs-keyword">if</span> (installedModules[moduleId])
            <span class="hljs-keyword">return</span> installedModules[moduleId].exports;
        <span class="hljs-comment">// Create a new module (and put it into the cache)</span>
        <span class="hljs-built_in">var</span> <span class="hljs-built_in">module</span> = installedModules[moduleId] = {
            <span class="hljs-attribute">exports</span>: {},
            <span class="hljs-attribute">id:</span><span class="hljs-string"> moduleId</span>,
            <span class="hljs-attribute">loaded</span>: <span class="hljs-literal">false</span>
        };
        <span class="hljs-comment">// Execute the module function</span>
        modules[moduleId].call(<span class="hljs-built_in">module</span>.exports, <span class="hljs-built_in">module</span>, <span class="hljs-built_in">module</span>.exports, __webpack_require__);
        <span class="hljs-comment">// Flag the module as loaded</span>
        <span class="hljs-built_in">module</span>.loaded = <span class="hljs-literal">true</span>;
        <span class="hljs-comment">// Return the exports of the module</span>
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">module</span>.exports;
    }
    <span class="hljs-comment">// expose the modules object (__webpack_modules__)</span>
    __webpack_require__.m = modules;
    <span class="hljs-comment">// expose the module cache</span>
    __webpack_require__.c = installedModules;
    <span class="hljs-comment">// __webpack_public_path__</span>
    __webpack_require__.p = <span class="hljs-string">""</span>;
    <span class="hljs-comment">// Load entry module and return exports</span>
    <span class="hljs-keyword">return</span> __webpack_require__(<span class="hljs-number">0</span>);
})([<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">module, exports, __webpack_require__</span>) </span>{

    <span class="hljs-built_in">var</span> chunk1 = __webpack_require__(<span class="hljs-number">1</span>);
    <span class="hljs-built_in">var</span> chunk2 = __webpack_require__(<span class="hljs-number">2</span>);
    <span class="hljs-built_in">console</span>.log(chunk1);
    <span class="hljs-built_in">console</span>.log(chunk2);
}, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">module, exports, __webpack_require__</span>) </span>{

    __webpack_require__(<span class="hljs-number">2</span>);
    <span class="hljs-built_in">var</span> chunk1 = <span class="hljs-number">1</span>;
    exports.chunk1 = chunk1;
}, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">module, exports</span>) </span>{

    <span class="hljs-built_in">var</span> chunk2 = <span class="hljs-number">1</span>;
    exports.chunk2 = chunk2;
}]);</code></pre>
<p>不难发现，当需要重复使用模块的时候，缓存变量installedModules 就起作用了</p>
<h3 id="articleHeader3">4.多个打包入口</h3>
<p>不管是单一模块还是重复模块，和以上两种一样</p>
<h3 id="articleHeader4">5.入口参数为数组</h3>
<p>webpack.config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    entry:['./main.js','./main1.js'],
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
    entry:[<span class="hljs-string">'./main.js'</span>,<span class="hljs-string">'./main1.js'</span>],
    output: {
        path: __dirname + <span class="hljs-string">'/dist'</span>,
        filename: <span class="hljs-string">'[name].js'</span>
    }
};</code></pre>
<p>打包后</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
/* 0 */
/***/ function(module, exports, __webpack_require__) {
    __webpack_require__(1);
    module.exports = __webpack_require__(3);
/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {
    var chunk1=__webpack_require__(2);
    console.log(chunk1);
/***/ },
/* 2 */
/***/ function(module, exports) {
    var chunk1=1;
    exports.chunk1=chunk1;
/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {
    var chunk1=__webpack_require__(2);
/***/ }
/******/ ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>[
<span class="hljs-comment">/* 0 */</span>
<span class="hljs-comment">/***/</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, exports, __webpack_require__</span>) </span>{
    __webpack_require__(<span class="hljs-number">1</span>);
    <span class="hljs-built_in">module</span>.exports = __webpack_require__(<span class="hljs-number">3</span>);
<span class="hljs-comment">/***/</span> },
<span class="hljs-comment">/* 1 */</span>
<span class="hljs-comment">/***/</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, exports, __webpack_require__</span>) </span>{
    <span class="hljs-keyword">var</span> chunk1=__webpack_require__(<span class="hljs-number">2</span>);
    <span class="hljs-built_in">console</span>.log(chunk1);
<span class="hljs-comment">/***/</span> },
<span class="hljs-comment">/* 2 */</span>
<span class="hljs-comment">/***/</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, exports</span>) </span>{
    <span class="hljs-keyword">var</span> chunk1=<span class="hljs-number">1</span>;
    exports.chunk1=chunk1;
<span class="hljs-comment">/***/</span> },
<span class="hljs-comment">/* 3 */</span>
<span class="hljs-comment">/***/</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, exports, __webpack_require__</span>) </span>{
    <span class="hljs-keyword">var</span> chunk1=__webpack_require__(<span class="hljs-number">2</span>);
<span class="hljs-comment">/***/</span> }
<span class="hljs-comment">/******/</span> ]</code></pre>
<p>这里只截取自执行匿名函数的参数，因为其他代码与之前一样。可以看到1就是main默模块，2就是chunk1模块，3就是mian1模块，0的作用就是运行模块mian,mian1,然后将main1模块导出（main1中没有导出项，所以到导出{}），总结一下：入口参数是字符串不管是多入口还是单入口，最后都会将入口模块的导出项导出,没有导出项就导出{}，而入口参数是数组，就会将最后一个模块导出（webpackg官网有说明）</p>
<h3 id="articleHeader5">6.使用CommonsChunkPlugin插件</h3>
<p>webpack.config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var CommonsChunkPlugin = require(&quot;webpack/lib/optimize/CommonsChunkPlugin&quot;);
module.exports = {
    entry: {
        main: './main.js',
        main1: './main1.js',
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    plugins: [
        new CommonsChunkPlugin({
        name: &quot;common&quot;
        })
    ]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> CommonsChunkPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">"webpack/lib/optimize/CommonsChunkPlugin"</span>);
<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">entry</span>: {
        <span class="hljs-attr">main</span>: <span class="hljs-string">'./main.js'</span>,
        <span class="hljs-attr">main1</span>: <span class="hljs-string">'./main1.js'</span>,
    },
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">path</span>: __dirname + <span class="hljs-string">'/dist'</span>,
        <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].js'</span>
    },
    <span class="hljs-attr">plugins</span>: [
        <span class="hljs-keyword">new</span> CommonsChunkPlugin({
        <span class="hljs-attr">name</span>: <span class="hljs-string">"common"</span>
        })
    ]
};</code></pre>
<p>main mian1中都require了chunk1,所以chunk1会被打包到common。<br>打包后，common.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function (modules) { // webpackBootstrap
    // install a JSONP callback for chunk loading
    var parentJsonpFunction = window[&quot;webpackJsonp&quot;];
    window[&quot;webpackJsonp&quot;] = function webpackJsonpCallback(chunkIds, moreModules) {
        // add &quot;moreModules&quot; to the modules object,
        // then flag all &quot;chunkIds&quot; as loaded and fire callback
        var moduleId, chunkId, i = 0, callbacks = [];
        for (; i < chunkIds.length; i++) {
            chunkId = chunkIds[i];
            if (installedChunks[chunkId])
                callbacks.push.apply(callbacks, installedChunks[chunkId]);
            installedChunks[chunkId] = 0;
        }
        for (moduleId in moreModules) {
            modules[moduleId] = moreModules[moduleId];
        }
        if (parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
        while (callbacks.length)
            callbacks.shift().call(null, __webpack_require__);
        if (moreModules[0]) {
            installedModules[0] = 0;
            return __webpack_require__(0);
        }
    };
    // The module cache
    var installedModules = {};
    // object to store loaded and loading chunks
    // &quot;0&quot; means &quot;already loaded&quot;
    // Array means &quot;loading&quot;, array contains callbacks
    var installedChunks = {
        2: 0
    };
    // The require function
    function __webpack_require__(moduleId) {
        // Check if module is in cache
        if (installedModules[moduleId])
            return installedModules[moduleId].exports;
        // Create a new module (and put it into the cache)
        var module = installedModules[moduleId] = {
            exports: {},
            id: moduleId,
            loaded: false
        };
        // Execute the module function
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        // Flag the module as loaded
        module.loaded = true;
        // Return the exports of the module
        return module.exports;
    }
    // This file contains only the entry chunk.
    // The chunk loading function for additional chunks
    __webpack_require__.e = function requireEnsure(chunkId, callback) {
        // &quot;0&quot; is the signal for &quot;already loaded&quot;
        if (installedChunks[chunkId] === 0)
            return callback.call(null, __webpack_require__);
        // an array means &quot;currently loading&quot;.
        if (installedChunks[chunkId] !== undefined) {
            installedChunks[chunkId].push(callback);
        } else {
            // start chunk loading
            installedChunks[chunkId] = [callback];
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.charset = 'utf-8';
            script.async = true;
            script.src = __webpack_require__.p + &quot;&quot; + chunkId + &quot;.&quot; + ({ &quot;0&quot;: &quot;main&quot;, &quot;1&quot;: &quot;main1&quot; }[chunkId] || chunkId) + &quot;.js&quot;;
            head.appendChild(script);
        }
    };
    // expose the modules object (__webpack_modules__)
    __webpack_require__.m = modules;
    // expose the module cache
    __webpack_require__.c = installedModules;
    // __webpack_public_path__
    __webpack_require__.p = &quot;&quot;;
})([, function (module, exports) {

    var chunk1 = 1;
    exports.chunk1 = chunk1;

}]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scheme"><code>(<span class="hljs-name">function</span> (<span class="hljs-name">modules</span>) { // webpackBootstrap
    // install a JSONP callback for chunk loading
    var parentJsonpFunction = window[<span class="hljs-string">"webpackJsonp"</span>]<span class="hljs-comment">;</span>
    window[<span class="hljs-string">"webpackJsonp"</span>] = function webpackJsonpCallback(<span class="hljs-name">chunkIds</span>, moreModules) {
        // add <span class="hljs-string">"moreModules"</span> to the modules object,
        // then flag all <span class="hljs-string">"chunkIds"</span> as loaded and fire callback
        var moduleId, chunkId, i = <span class="hljs-number">0</span>, callbacks = []<span class="hljs-comment">;</span>
        for (<span class="hljs-comment">; i &lt; chunkIds.length; i++) {</span>
            chunkId = chunkIds[<span class="hljs-name">i</span>]<span class="hljs-comment">;</span>
            if (<span class="hljs-name">installedChunks</span>[<span class="hljs-name">chunkId</span>])
                callbacks.push.apply(<span class="hljs-name">callbacks</span>, installedChunks[<span class="hljs-name">chunkId</span>])<span class="hljs-comment">;</span>
            installedChunks[<span class="hljs-name">chunkId</span>] = <span class="hljs-number">0</span><span class="hljs-comment">;</span>
        }
        for (<span class="hljs-name">moduleId</span> in moreModules) {
            modules[<span class="hljs-name">moduleId</span>] = moreModules[<span class="hljs-name">moduleId</span>]<span class="hljs-comment">;</span>
        }
        if (<span class="hljs-name">parentJsonpFunction</span>) parentJsonpFunction(<span class="hljs-name">chunkIds</span>, moreModules)<span class="hljs-comment">;</span>
        while (<span class="hljs-name">callbacks.length</span>)
            callbacks.shift().call(<span class="hljs-name">null</span>, __webpack_require__)<span class="hljs-comment">;</span>
        if (<span class="hljs-name">moreModules</span>[<span class="hljs-name">0</span>]) {
            installedModules[<span class="hljs-name">0</span>] = <span class="hljs-number">0</span><span class="hljs-comment">;</span>
            return __webpack_require__(<span class="hljs-name">0</span>)<span class="hljs-comment">;</span>
        }
    }<span class="hljs-comment">;</span>
    // The module cache
    var installedModules = {}<span class="hljs-comment">;</span>
    // object to store loaded and loading chunks
    // <span class="hljs-string">"0"</span> means <span class="hljs-string">"already loaded"</span>
    // Array means <span class="hljs-string">"loading"</span>, array contains callbacks
    var installedChunks = {
        <span class="hljs-number">2</span>: <span class="hljs-number">0</span>
    }<span class="hljs-comment">;</span>
    // The require function
    function __webpack_require__(<span class="hljs-name">moduleId</span>) {
        // Check if module is in cache
        if (<span class="hljs-name">installedModules</span>[<span class="hljs-name">moduleId</span>])
            return installedModules[<span class="hljs-name">moduleId</span>].exports<span class="hljs-comment">;</span>
        // Create a new module (<span class="hljs-name"><span class="hljs-builtin-name">and</span></span> put it into the cache)
        var module = installedModules[<span class="hljs-name">moduleId</span>] = {
            exports: {},
            id: moduleId,
            loaded: false
        }<span class="hljs-comment">;</span>
        // Execute the module function
        modules[<span class="hljs-name">moduleId</span>].call(<span class="hljs-name">module.exports</span>, module, module.exports, __webpack_require__)<span class="hljs-comment">;</span>
        // Flag the module as loaded
        module.loaded = true<span class="hljs-comment">;</span>
        // Return the exports of the module
        return module.exports<span class="hljs-comment">;</span>
    }
    // This file contains only the entry chunk.
    // The chunk loading function for additional chunks
    __webpack_require__.e = function requireEnsure(<span class="hljs-name">chunkId</span>, callback) {
        // <span class="hljs-string">"0"</span> is the signal for <span class="hljs-string">"already loaded"</span>
        if (<span class="hljs-name">installedChunks</span>[<span class="hljs-name">chunkId</span>] === <span class="hljs-number">0</span>)
            return callback.call(<span class="hljs-name">null</span>, __webpack_require__)<span class="hljs-comment">;</span>
        // an array means <span class="hljs-string">"currently loading"</span>.
        if (<span class="hljs-name">installedChunks</span>[<span class="hljs-name">chunkId</span>] !== undefined) {
            installedChunks[<span class="hljs-name">chunkId</span>].push(<span class="hljs-name">callback</span>)<span class="hljs-comment">;</span>
        } else {
            // start chunk loading
            installedChunks[<span class="hljs-name">chunkId</span>] = [<span class="hljs-name">callback</span>]<span class="hljs-comment">;</span>
            var head = document.getElementsByTagName(<span class="hljs-symbol">'head</span>')[<span class="hljs-name">0</span>]<span class="hljs-comment">;</span>
            var script = document.createElement(<span class="hljs-symbol">'script</span>')<span class="hljs-comment">;</span>
            script.type = <span class="hljs-symbol">'text/javascript</span>'<span class="hljs-comment">;</span>
            script.charset = <span class="hljs-symbol">'utf-8</span>'<span class="hljs-comment">;</span>
            script.async = true<span class="hljs-comment">;</span>
            script.src = __webpack_require__.p + <span class="hljs-string">""</span> + chunkId + <span class="hljs-string">"."</span> + ({ <span class="hljs-string">"0"</span>: <span class="hljs-string">"main"</span>, <span class="hljs-string">"1"</span>: <span class="hljs-string">"main1"</span> }[<span class="hljs-name">chunkId</span>] || chunkId) + <span class="hljs-string">".js"</span><span class="hljs-comment">;</span>
            head.appendChild(<span class="hljs-name">script</span>)<span class="hljs-comment">;</span>
        }
    }<span class="hljs-comment">;</span>
    // expose the modules object (<span class="hljs-name">__webpack_modules__</span>)
    __webpack_require__.m = modules<span class="hljs-comment">;</span>
    // expose the module cache
    __webpack_require__.c = installedModules<span class="hljs-comment">;</span>
    // __webpack_public_path__
    __webpack_require__.p = <span class="hljs-string">""</span><span class="hljs-comment">;</span>
})([, function (<span class="hljs-name">module</span>, exports) {

    var chunk1 = <span class="hljs-number">1</span><span class="hljs-comment">;</span>
    exports.chunk1 = chunk1<span class="hljs-comment">;</span>

}])<span class="hljs-comment">;</span></code></pre>
<p>main.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpackJsonp([0],[function(module, exports, __webpack_require__) {

    var chunk1=__webpack_require__(1);
    console.log(chunk1);
 }]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>webpackJsonp([<span class="hljs-number">0</span>],[function(<span class="hljs-name">module</span>, exports, __webpack_require__) {

    var chunk1=__webpack_require__(<span class="hljs-number">1</span>)<span class="hljs-comment">;</span>
    console.log(<span class="hljs-name">chunk1</span>)<span class="hljs-comment">;</span>
 }])<span class="hljs-comment">;</span></code></pre>
<p>main1.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpackJsonp([1],[function(module, exports, __webpack_require__) {
    var chunk1=__webpack_require__(1);
    console.log(chunk1);
}]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>webpackJsonp([<span class="hljs-number">1</span>],[function(<span class="hljs-name">module</span>, exports, __webpack_require__) {
    var chunk1=__webpack_require__(<span class="hljs-number">1</span>)<span class="hljs-comment">;</span>
    console.log(<span class="hljs-name">chunk1</span>)<span class="hljs-comment">;</span>
}])<span class="hljs-comment">;</span></code></pre>
<p>与之前相比，多了webpackJsonp函数，立即执行的匿名函数没有立即调用__webpack_require__(0)。看一下webpackJsonp：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var parentJsonpFunction = window[&quot;webpackJsonp&quot;];
    window[&quot;webpackJsonp&quot;] = function webpackJsonpCallback(chunkIds, moreModules) {
        //moreModules为独立chunk代码，chunkIds标记独立chunk唯一性避免按需加载时重复加载
        //以main.js中代码为例，chunkIds为[0],moreModules为
        //[function(module, exports, __webpack_require__) {
        //    var chunk1=__webpack_require__(1);
        //    console.log(chunk1);
        //}]
        var moduleId, chunkId, i = 0, callbacks = [];
        for (; i < chunkIds.length; i++) {
            chunkId = chunkIds[i];//chunkId=0
            if (installedChunks[chunkId])
                callbacks.push.apply(callbacks,installedChunks[chunkId]);//0 push入callbacks(使用requireEnsure不再是0)
            //赋值为0表明chunk已经loaded
            installedChunks[chunkId] = 0;
        }
        for (moduleId in moreModules) {
            //modules[0]会被覆盖
            modules[moduleId] = moreModules[moduleId];
        }
        //按当前情况parentJsonpFunction一直未undefined
        if (parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
        //按当前情况callbacks=[]
        while (callbacks.length)
            callbacks.shift().call(null, __webpack_require__);
        if (moreModules[0]) {
            installedModules[0] = 0;
            return __webpack_require__(0);
        }
    };
    // 缓存模块，通过闭包引用(window[&quot;webpackJsonp&quot;]可以访问到)
    var installedModules = {};
    //2为公共chunck唯一ID，0表示已经loaded
    var installedChunks = {
        2: 0
    };
    // The require function
    function __webpack_require__(moduleId) {
        // Check if module is in cache
        if (installedModules[moduleId])
            return installedModules[moduleId].exports;
        // Create a new module (and put it into the cache)
        var module = installedModules[moduleId] = {
            exports: {},
            id: moduleId,
            loaded: false
        };
        // Execute the module function
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        // Flag the module as loaded
        module.loaded = true;
        // Return the exports of the module
        return module.exports;
    }
    //按需加载
    __webpack_require__.e = function requireEnsure(chunkId, callback) {
        // &quot;0&quot; is the signal for &quot;already loaded&quot;
        if (installedChunks[chunkId] === 0)
            return callback.call(null, __webpack_require__);
        // an array means &quot;currently loading&quot;.
        if (installedChunks[chunkId] !== undefined) {
            installedChunks[chunkId].push(callback);
        } else {
            // start chunk loading
            installedChunks[chunkId] = [callback];
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.charset = 'utf-8';
            script.async = true;
            script.src = __webpack_require__.p + &quot;&quot; + chunkId + &quot;.&quot; + ({ &quot;0&quot;: &quot;main&quot;, &quot;1&quot;: &quot;main1&quot; }[chunkId] || chunkId) + &quot;.js&quot;;
            head.appendChild(script);
        }
    };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-built_in">var</span> parentJsonpFunction = <span class="hljs-built_in">window</span>[<span class="hljs-string">"webpackJsonp"</span>];
    <span class="hljs-built_in">window</span>[<span class="hljs-string">"webpackJsonp"</span>] = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">webpackJsonpCallback</span>(<span class="hljs-params">chunkIds, moreModules</span>) </span>{
        <span class="hljs-comment">//moreModules为独立chunk代码，chunkIds标记独立chunk唯一性避免按需加载时重复加载</span>
        <span class="hljs-comment">//以main.js中代码为例，chunkIds为[0],moreModules为</span>
        <span class="hljs-comment">//[function(module, exports, __webpack_require__) {</span>
        <span class="hljs-comment">//    var chunk1=__webpack_require__(1);</span>
        <span class="hljs-comment">//    console.log(chunk1);</span>
        <span class="hljs-comment">//}]</span>
        <span class="hljs-built_in">var</span> moduleId, chunkId, i = <span class="hljs-number">0</span>, callbacks = [];
        <span class="hljs-keyword">for</span> (; i &lt; chunkIds.length; i++) {
            chunkId = chunkIds[i];<span class="hljs-comment">//chunkId=0</span>
            <span class="hljs-keyword">if</span> (installedChunks[chunkId])
                callbacks.push.apply(callbacks,installedChunks[chunkId]);<span class="hljs-comment">//0 push入callbacks(使用requireEnsure不再是0)</span>
            <span class="hljs-comment">//赋值为0表明chunk已经loaded</span>
            installedChunks[chunkId] = <span class="hljs-number">0</span>;
        }
        <span class="hljs-keyword">for</span> (moduleId <span class="hljs-keyword">in</span> moreModules) {
            <span class="hljs-comment">//modules[0]会被覆盖</span>
            modules[moduleId] = moreModules[moduleId];
        }
        <span class="hljs-comment">//按当前情况parentJsonpFunction一直未undefined</span>
        <span class="hljs-keyword">if</span> (parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
        <span class="hljs-comment">//按当前情况callbacks=[]</span>
        <span class="hljs-keyword">while</span> (callbacks.length)
            callbacks.shift().call(<span class="hljs-literal">null</span>, __webpack_require__);
        <span class="hljs-keyword">if</span> (moreModules[<span class="hljs-number">0</span>]) {
            installedModules[<span class="hljs-number">0</span>] = <span class="hljs-number">0</span>;
            <span class="hljs-keyword">return</span> __webpack_require__(<span class="hljs-number">0</span>);
        }
    };
    <span class="hljs-comment">// 缓存模块，通过闭包引用(window["webpackJsonp"]可以访问到)</span>
    <span class="hljs-built_in">var</span> installedModules = {};
    <span class="hljs-comment">//2为公共chunck唯一ID，0表示已经loaded</span>
    <span class="hljs-built_in">var</span> installedChunks = {
        <span class="hljs-number">2</span>: <span class="hljs-number">0</span>
    };
    <span class="hljs-comment">// The require function</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">__webpack_require__</span>(<span class="hljs-params">moduleId</span>) </span>{
        <span class="hljs-comment">// Check if module is in cache</span>
        <span class="hljs-keyword">if</span> (installedModules[moduleId])
            <span class="hljs-keyword">return</span> installedModules[moduleId].exports;
        <span class="hljs-comment">// Create a new module (and put it into the cache)</span>
        <span class="hljs-built_in">var</span> <span class="hljs-built_in">module</span> = installedModules[moduleId] = {
            <span class="hljs-attribute">exports</span>: {},
            <span class="hljs-attribute">id:</span><span class="hljs-string"> moduleId</span>,
            <span class="hljs-attribute">loaded</span>: <span class="hljs-literal">false</span>
        };
        <span class="hljs-comment">// Execute the module function</span>
        modules[moduleId].call(<span class="hljs-built_in">module</span>.exports, <span class="hljs-built_in">module</span>, <span class="hljs-built_in">module</span>.exports, __webpack_require__);
        <span class="hljs-comment">// Flag the module as loaded</span>
        <span class="hljs-built_in">module</span>.loaded = <span class="hljs-literal">true</span>;
        <span class="hljs-comment">// Return the exports of the module</span>
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">module</span>.exports;
    }
    <span class="hljs-comment">//按需加载</span>
    __webpack_require__.e = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">requireEnsure</span>(<span class="hljs-params">chunkId, callback</span>) </span>{
        <span class="hljs-comment">// "0" is the signal for "already loaded"</span>
        <span class="hljs-keyword">if</span> (installedChunks[chunkId] === <span class="hljs-number">0</span>)
            <span class="hljs-keyword">return</span> callback.call(<span class="hljs-literal">null</span>, __webpack_require__);
        <span class="hljs-comment">// an array means "currently loading".</span>
        <span class="hljs-keyword">if</span> (installedChunks[chunkId] !== <span class="hljs-literal">undefined</span>) {
            installedChunks[chunkId].push(callback);
        } <span class="hljs-title">else</span> {
            <span class="hljs-comment">// start chunk loading</span>
            installedChunks[chunkId] = [callback];
            <span class="hljs-built_in">var</span> head = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'head'</span>)[<span class="hljs-number">0</span>];
            <span class="hljs-built_in">var</span> script = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'script'</span>);
            script.type = <span class="hljs-string">'text/javascript'</span>;
            script.charset = <span class="hljs-string">'utf-8'</span>;
            script.async = <span class="hljs-literal">true</span>;
            script.src = __webpack_require__.p + <span class="hljs-string">""</span> + chunkId + <span class="hljs-string">"."</span> + ({ <span class="hljs-string">"0"</span>: <span class="hljs-string">"main"</span>, <span class="hljs-string">"1"</span>: <span class="hljs-string">"main1"</span> }[chunkId] || chunkId) + <span class="hljs-string">".js"</span>;
            head.appendChild(script);
        }
    };</code></pre>
<p>好像看不出什么。。。，修改一下<br>webpack.config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var CommonsChunkPlugin = require(&quot;webpack/lib/optimize/CommonsChunkPlugin&quot;);
module.exports = {
    entry: {
        main: './main.js',
        main1: './main1.js',
        chunk1:[&quot;./chunk1&quot;]
    },
    output: {
        path: __dirname + '/dist2',
        filename: '[name].js'
    },
    plugins: [
        new CommonsChunkPlugin({
        name: [&quot;chunk1&quot;],
        filename:&quot;common.js&quot;,
        minChunks:3,
        })
    ]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> CommonsChunkPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">"webpack/lib/optimize/CommonsChunkPlugin"</span>);
<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">entry</span>: {
        <span class="hljs-attr">main</span>: <span class="hljs-string">'./main.js'</span>,
        <span class="hljs-attr">main1</span>: <span class="hljs-string">'./main1.js'</span>,
        <span class="hljs-attr">chunk1</span>:[<span class="hljs-string">"./chunk1"</span>]
    },
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">path</span>: __dirname + <span class="hljs-string">'/dist2'</span>,
        <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].js'</span>
    },
    <span class="hljs-attr">plugins</span>: [
        <span class="hljs-keyword">new</span> CommonsChunkPlugin({
        <span class="hljs-attr">name</span>: [<span class="hljs-string">"chunk1"</span>],
        <span class="hljs-attr">filename</span>:<span class="hljs-string">"common.js"</span>,
        <span class="hljs-attr">minChunks</span>:<span class="hljs-number">3</span>,
        })
    ]
};</code></pre>
<p>main,main1都分别require chunk1,chunk2,然后将chunk1打包到公共模块（minChunks:3，chunk2不会被打包到公共模块）。自运行匿名函数最后多了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   return __webpack_require__(0);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code style="word-break: break-word; white-space: initial;">   <span class="hljs-function"><span class="hljs-keyword">return</span> <span class="hljs-title">__webpack_require__</span><span class="hljs-params">(<span class="hljs-number">0</span>)</span></span>;</code></pre>
<p>则installedModules[0]为已经loaded,看common.js，installedModules[1]也会loaded。<br>main.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpackJsonp([1], [function (module, exports, __webpack_require__) {

    var chunk1 = __webpack_require__(1);
    var chunk2 = __webpack_require__(2);
    exports.a = 1;
    console.log(chunk1);
}, , function (module, exports) {
    var chunk2 = 1;
    exports.chunk2 = chunk2;

}
]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>webpackJsonp([<span class="hljs-number">1</span>], [<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">module, exports, __webpack_require__</span>) </span>{

    <span class="hljs-keyword">var</span> chunk1 = __webpack_require__(<span class="hljs-number">1</span>);
    <span class="hljs-keyword">var</span> chunk2 = __webpack_require__(<span class="hljs-number">2</span>);
    exports.a = <span class="hljs-number">1</span>;
    <span class="hljs-built_in">console</span>.log(chunk1);
}, , <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">module, exports</span>) </span>{
    <span class="hljs-keyword">var</span> chunk2 = <span class="hljs-number">1</span>;
    exports.chunk2 = chunk2;

}
]);</code></pre>
<p>main1.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpackJsonp([2], [function (module, exports, __webpack_require__) {

    var chunk1 = __webpack_require__(1);
    var chunk2 = __webpack_require__(2);
    exports.a = 1;
    console.log(chunk1);
}, , function (module, exports) {
    var chunk2 = 1;
    exports.chunk2 = chunk2;
}
]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>webpackJsonp([<span class="hljs-number">2</span>], [<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">module, exports, __webpack_require__</span>) </span>{

    <span class="hljs-keyword">var</span> chunk1 = __webpack_require__(<span class="hljs-number">1</span>);
    <span class="hljs-keyword">var</span> chunk2 = __webpack_require__(<span class="hljs-number">2</span>);
    exports.a = <span class="hljs-number">1</span>;
    <span class="hljs-built_in">console</span>.log(chunk1);
}, , <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">module, exports</span>) </span>{
    <span class="hljs-keyword">var</span> chunk2 = <span class="hljs-number">1</span>;
    exports.chunk2 = chunk2;
}
]);</code></pre>
<p>common.js  modules：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[function (module, exports, __webpack_require__) {

    module.exports = __webpack_require__(1);
}, function (module, exports) {

    var chunk1 = 1;
    exports.chunk1 = chunk1;
}]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>[function (<span class="hljs-name">module</span>, exports, __webpack_require__) {

    module.exports = __webpack_require__(<span class="hljs-number">1</span>)<span class="hljs-comment">;</span>
}, function (<span class="hljs-name">module</span>, exports) {

    var chunk1 = <span class="hljs-number">1</span><span class="hljs-comment">;</span>
    exports.chunk1 = chunk1;
}]
</code></pre>
<p>以main.js的代码为例，调用webpackJsonp，传入的参数chunkIds为[1],moreModules为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[function (module, exports, __webpack_require__) {

    var chunk1 = __webpack_require__(1);
    var chunk2 = __webpack_require__(2);
    exports.a = 1;
    console.log(chunk1);
}, , function (module, exports) {
    var chunk2 = 1;
    exports.chunk2 = chunk2;

}]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scheme"><code>[<span class="hljs-name">function</span> (<span class="hljs-name">module</span>, exports, __webpack_require__) {

    var chunk1 = __webpack_require__(<span class="hljs-name">1</span>)<span class="hljs-comment">;</span>
    var chunk2 = __webpack_require__(<span class="hljs-name">2</span>)<span class="hljs-comment">;</span>
    exports.a = <span class="hljs-number">1</span><span class="hljs-comment">;</span>
    console.log(<span class="hljs-name">chunk1</span>)<span class="hljs-comment">;</span>
}, , function (<span class="hljs-name">module</span>, exports) {
    var chunk2 = <span class="hljs-number">1</span><span class="hljs-comment">;</span>
    exports.chunk2 = chunk2<span class="hljs-comment">;</span>

}]</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var moduleId, chunkId, i = 0, callbacks = [];
        for (; i < chunkIds.length; i++) {
            chunkId = chunkIds[i];//1
            //false,赋值为0后还是false
            if (installedChunks[chunkId])
                callbacks.push.apply(callbacks, installedChunks[chunkId]);
            installedChunks[chunkId] = 0;
        }
        //三个模块
        for (moduleId in moreModules) {
            //moduleId:0,1,2  moreModules[1]为空模块，自执行函数的参数(公共模块)会被覆盖，但是参数中的相应模块已经loaded并且缓存
            modules[moduleId] = moreModules[moduleId];
        }
        if (parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
        while (callbacks.length)
            callbacks.shift().call(null, __webpack_require__);
        if (moreModules[0]) {
            //installedModules[0]会重新load,但是load的是moreModules[0]，因为modules[0]已经被覆盖，moreModules[0]依赖于
            //modules[1]、modules[2],modules[1]已经loaded
            installedModules[0] = 0;
            return __webpack_require__(0);
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs accesslog"><code>var moduleId, chunkId, i = <span class="hljs-number">0</span>, callbacks = <span class="hljs-string">[]</span>;
        for (; i &lt; chunkIds.length; i++) {
            chunkId = chunkIds<span class="hljs-string">[i]</span>;//<span class="hljs-number">1</span>
            //false,赋值为<span class="hljs-number">0</span>后还是false
            if (installedChunks<span class="hljs-string">[chunkId]</span>)
                callbacks.push.apply(callbacks, installedChunks<span class="hljs-string">[chunkId]</span>);
            installedChunks<span class="hljs-string">[chunkId]</span> = <span class="hljs-number">0</span>;
        }
        //三个模块
        for (moduleId in moreModules) {
            //moduleId:<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>  moreModules<span class="hljs-string">[1]</span>为空模块，自执行函数的参数(公共模块)会被覆盖，但是参数中的相应模块已经loaded并且缓存
            modules<span class="hljs-string">[moduleId]</span> = moreModules<span class="hljs-string">[moduleId]</span>;
        }
        if (parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
        while (callbacks.length)
            callbacks.shift().call(null, __webpack_require__);
        if (moreModules<span class="hljs-string">[0]</span>) {
            //installedModules<span class="hljs-string">[0]</span>会重新load,但是load的是moreModules<span class="hljs-string">[0]</span>，因为modules<span class="hljs-string">[0]</span>已经被覆盖，moreModules<span class="hljs-string">[0]</span>依赖于
            //modules<span class="hljs-string">[1]</span>、modules<span class="hljs-string">[2]</span>,modules<span class="hljs-string">[1]</span>已经loaded
            installedModules<span class="hljs-string">[0]</span> = <span class="hljs-number">0</span>;
            return __webpack_require__(<span class="hljs-number">0</span>);
        }</code></pre>
<p>再看下面的情况：<br>common.js 自执行函数参数（公共模块）（没有return __webpack_require__(0)）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[,function(module, exports, __webpack_require__) {

    var chunk1=1;
    var chunk2=__webpack_require__(2);
    exports.chunk1=chunk1;
},function(module, exports) {

    var chunk2=1;
    exports.chunk2=chunk2;
}]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>[,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(module, exports, __webpack_require__)</span> </span>{

    <span class="hljs-keyword">var</span> chunk1=<span class="hljs-number">1</span>;
    <span class="hljs-keyword">var</span> chunk2=__webpack_require__(<span class="hljs-number">2</span>);
    exports.chunk1=chunk1;
},<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(module, exports)</span> </span>{

    <span class="hljs-keyword">var</span> chunk2=<span class="hljs-number">1</span>;
    exports.chunk2=chunk2;
}]</code></pre>
<p>main.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

    var chunk1=__webpack_require__(1);
    var chunk2=__webpack_require__(2);
    exports.a=1;
    console.log(chunk1);
    //main
/***/ }
]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>webpackJsonp([<span class="hljs-number">0</span>],[
<span class="hljs-comment">/* 0 */</span>
<span class="hljs-comment">/***/</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, exports, __webpack_require__</span>) </span>{

    <span class="hljs-keyword">var</span> chunk1=__webpack_require__(<span class="hljs-number">1</span>);
    <span class="hljs-keyword">var</span> chunk2=__webpack_require__(<span class="hljs-number">2</span>);
    exports.a=<span class="hljs-number">1</span>;
    <span class="hljs-built_in">console</span>.log(chunk1);
    <span class="hljs-comment">//main</span>
<span class="hljs-comment">/***/</span> }
]);</code></pre>
<p>以main调用分析</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="         var moduleId, chunkId, i = 0, callbacks = [];
         for(;i < chunkIds.length; i++) {
             chunkId = chunkIds[i];//0
             if(installedChunks[chunkId])
                 callbacks.push.apply(callbacks, installedChunks[chunkId]);
             installedChunks[chunkId] = 0;//表明唯一索引为0的chunk已经loaded
         }
         for(moduleId in moreModules) {
            //moreModules只有一个元素，所以modules[1]、modules[2]不会被覆盖
             modules[moduleId] = moreModules[moduleId];
         }
         if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
         while(callbacks.length)
             callbacks.shift().call(null, __webpack_require__);
         if(moreModules[0]) {
             installedModules[0] = 0;
            //moreModules[0]即modules[0]依赖modules[1]、即modules[2](没有被覆盖很关键)
             return __webpack_require__(0);
         }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs accesslog"><code>         var moduleId, chunkId, i = <span class="hljs-number">0</span>, callbacks = <span class="hljs-string">[]</span>;
         for(;i &lt; chunkIds.length; i++) {
             chunkId = chunkIds<span class="hljs-string">[i]</span>;//<span class="hljs-number">0</span>
             if(installedChunks<span class="hljs-string">[chunkId]</span>)
                 callbacks.push.apply(callbacks, installedChunks<span class="hljs-string">[chunkId]</span>);
             installedChunks<span class="hljs-string">[chunkId]</span> = <span class="hljs-number">0</span>;//表明唯一索引为<span class="hljs-number">0</span>的chunk已经loaded
         }
         for(moduleId in moreModules) {
            //moreModules只有一个元素，所以modules<span class="hljs-string">[1]</span>、modules<span class="hljs-string">[2]</span>不会被覆盖
             modules<span class="hljs-string">[moduleId]</span> = moreModules<span class="hljs-string">[moduleId]</span>;
         }
         if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
         while(callbacks.length)
             callbacks.shift().call(null, __webpack_require__);
         if(moreModules<span class="hljs-string">[0]</span>) {
             installedModules<span class="hljs-string">[0]</span> = <span class="hljs-number">0</span>;
            //moreModules<span class="hljs-string">[0]</span>即modules<span class="hljs-string">[0]</span>依赖modules<span class="hljs-string">[1]</span>、即modules<span class="hljs-string">[2]</span>(没有被覆盖很关键)
             return __webpack_require__(<span class="hljs-number">0</span>);
         }</code></pre>
<p>还有这种打包情况：<br>common.js不包含公共模块，即自执行函数参数为[]。<br>main.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpackJsonp([0,1],[
function(module, exports, __webpack_require__) {

    var chunk1=__webpack_require__(1);
    var chunk2=__webpack_require__(2);
    exports.a=1;
    console.log(chunk1);
},function(module, exports) {
    var chunk1=1;
    exports.chunk1=chunk1;
},function(module, exports) {
    var chunk2=1;
    exports.chunk2=chunk2;
}]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>webpackJsonp([<span class="hljs-number">0</span>,<span class="hljs-number">1</span>],[
<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, exports, __webpack_require__</span>) </span>{

    <span class="hljs-keyword">var</span> chunk1=__webpack_require__(<span class="hljs-number">1</span>);
    <span class="hljs-keyword">var</span> chunk2=__webpack_require__(<span class="hljs-number">2</span>);
    exports.a=<span class="hljs-number">1</span>;
    <span class="hljs-built_in">console</span>.log(chunk1);
},<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, exports</span>) </span>{
    <span class="hljs-keyword">var</span> chunk1=<span class="hljs-number">1</span>;
    exports.chunk1=chunk1;
},<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, exports</span>) </span>{
    <span class="hljs-keyword">var</span> chunk2=<span class="hljs-number">1</span>;
    exports.chunk2=chunk2;
}]);</code></pre>
<p>以main调用分析</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     var moduleId, chunkId, i = 0, callbacks = [];
         for(;i < chunkIds.length; i++) {
             chunkId = chunkIds[i];//0,1
             if(installedChunks[chunkId])
                 callbacks.push.apply(callbacks, installedChunks[chunkId]);
             installedChunks[chunkId] = 0;
         }
         for(moduleId in moreModules) {
            //moreModules全部转移到modules
             modules[moduleId] = moreModules[moduleId];
         }
         if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
         while(callbacks.length)
             callbacks.shift().call(null, __webpack_require__);
         if(moreModules[0]) {
            //modules[0]是chunk文件运行代码
             installedModules[0] = 0;
             return __webpack_require__(0);
         }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>     <span class="hljs-keyword">var</span> moduleId, chunkId, i = <span class="hljs-number">0</span>, callbacks = [];
         <span class="hljs-keyword">for</span>(;i &lt; chunkIds.length; i++) {
             chunkId = chunkIds[i];<span class="hljs-comment">//0,1</span>
             <span class="hljs-keyword">if</span>(installedChunks[chunkId])
                 callbacks.push.apply(callbacks, installedChunks[chunkId]);
             installedChunks[chunkId] = <span class="hljs-number">0</span>;
         }
         <span class="hljs-keyword">for</span>(moduleId <span class="hljs-keyword">in</span> moreModules) {
            <span class="hljs-comment">//moreModules全部转移到modules</span>
             modules[moduleId] = moreModules[moduleId];
         }
         <span class="hljs-keyword">if</span>(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
         <span class="hljs-keyword">while</span>(callbacks.length)
             callbacks.shift().call(<span class="hljs-literal">null</span>, __webpack_require__);
         <span class="hljs-keyword">if</span>(moreModules[<span class="hljs-number">0</span>]) {
            <span class="hljs-comment">//modules[0]是chunk文件运行代码</span>
             installedModules[<span class="hljs-number">0</span>] = <span class="hljs-number">0</span>;
             <span class="hljs-keyword">return</span> __webpack_require__(<span class="hljs-number">0</span>);
         }</code></pre>
<h3 id="articleHeader6">7.按需加载</h3>
<p>webpack.config.json</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  entry: <span class="hljs-string">'./main.js'</span>,
  output: {
    filename: <span class="hljs-string">'bundle.js'</span>
  }
};</code></pre>
<p>main.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require.ensure(['./a'], function(require) {
  var content = require('./a');
  document.open();
  document.write('<h1>' + content + '</h1>');
  document.close();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">require</span>.ensure([<span class="hljs-string">'./a'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require</span>) </span>{
  <span class="hljs-keyword">var</span> content = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./a'</span>);
  <span class="hljs-built_in">document</span>.open();
  <span class="hljs-built_in">document</span>.write(<span class="hljs-string">'&lt;h1&gt;'</span> + content + <span class="hljs-string">'&lt;/h1&gt;'</span>);
  <span class="hljs-built_in">document</span>.close();
});</code></pre>
<p>a.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = 'Hello World';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = <span class="hljs-string">'Hello World'</span>;</code></pre>
<p>打包后</p>
<p><span class="img-wrap"><img data-src="/img/bVEHy5?w=193&amp;h=136" src="https://static.alili.tech/img/bVEHy5?w=193&amp;h=136" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>bundle.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/******/ (function(modules) { // webpackBootstrap
/******/     // install a JSONP callback for chunk loading
/******/     var parentJsonpFunction = window[&quot;webpackJsonp&quot;];
/******/     window[&quot;webpackJsonp&quot;] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/         // add &quot;moreModules&quot; to the modules object,
/******/         // then flag all &quot;chunkIds&quot; as loaded and fire callback
/******/         var moduleId, chunkId, i = 0, callbacks = [];
/******/         for(;i < chunkIds.length; i++) {
/******/             chunkId = chunkIds[i];
/******/             if(installedChunks[chunkId])
/******/                 callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/             installedChunks[chunkId] = 0;
/******/         }
/******/         for(moduleId in moreModules) {
/******/             modules[moduleId] = moreModules[moduleId];
/******/         }
/******/         if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/         while(callbacks.length)
/******/             callbacks.shift().call(null, __webpack_require__);

/******/     };

/******/     // The module cache
/******/     var installedModules = {};

/******/     // object to store loaded and loading chunks
/******/     // &quot;0&quot; means &quot;already loaded&quot;
/******/     // Array means &quot;loading&quot;, array contains callbacks
/******/     var installedChunks = {
/******/         0:0
/******/     };

/******/     // The require function
/******/     function __webpack_require__(moduleId) {

/******/         // Check if module is in cache
/******/         if(installedModules[moduleId])
/******/             return installedModules[moduleId].exports;

/******/         // Create a new module (and put it into the cache)
/******/         var module = installedModules[moduleId] = {
/******/             exports: {},
/******/             id: moduleId,
/******/             loaded: false
/******/         };

/******/         // Execute the module function
/******/         modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/         // Flag the module as loaded
/******/         module.loaded = true;

/******/         // Return the exports of the module
/******/         return module.exports;
/******/     }

/******/     // This file contains only the entry chunk.
/******/     // The chunk loading function for additional chunks
/******/     __webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/         // &quot;0&quot; is the signal for &quot;already loaded&quot;
/******/         if(installedChunks[chunkId] === 0)
/******/             return callback.call(null, __webpack_require__);

/******/         // an array means &quot;currently loading&quot;.
/******/         if(installedChunks[chunkId] !== undefined) {
/******/             installedChunks[chunkId].push(callback);
/******/         } else {
/******/             // start chunk loading
/******/             installedChunks[chunkId] = [callback];
/******/             var head = document.getElementsByTagName('head')[0];
/******/             var script = document.createElement('script');
/******/             script.type = 'text/javascript';
/******/             script.charset = 'utf-8';
/******/             script.async = true;

/******/             script.src = __webpack_require__.p + &quot;&quot; + chunkId + &quot;.bundle.js&quot;;
/******/             head.appendChild(script);
/******/         }
/******/     };

/******/     // expose the modules object (__webpack_modules__)
/******/     __webpack_require__.m = modules;

/******/     // expose the module cache
/******/     __webpack_require__.c = installedModules;

/******/     // __webpack_public_path__
/******/     __webpack_require__.p = &quot;&quot;;

/******/     // Load entry module and return exports
/******/     return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

    __webpack_require__.e/* nsure */(1, function(require) {
      var content = __webpack_require__(1);
      document.open();
      document.write('<h1>' + content + '</h1>');
      document.close();
    });


/***/ }
/******/ ]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span> (function(modules) { <span class="hljs-comment">// webpackBootstrap</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-comment">// install a JSONP callback for chunk loading</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-keyword">var</span> parentJsonpFunction = <span class="hljs-built_in">window</span>[<span class="hljs-string">"webpackJsonp"</span>];
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-built_in">window</span>[<span class="hljs-string">"webpackJsonp"</span>] = function webpackJsonpCallback(chunkIds, moreModules) {
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-comment">// add "moreModules" to the modules object,</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-comment">// then flag all "chunkIds" as loaded and fire callback</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-keyword">var</span> moduleId, chunkId, i = <span class="hljs-number">0</span>, callbacks = [];
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-keyword">for</span>(;i &lt; chunkIds.length; i++) {
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             chunkId = chunkIds[i];
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             <span class="hljs-keyword">if</span>(installedChunks[chunkId])
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>                 callbacks.push.apply(callbacks, installedChunks[chunkId]);
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             installedChunks[chunkId] = <span class="hljs-number">0</span>;
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         }
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-keyword">for</span>(moduleId <span class="hljs-keyword">in</span> moreModules) {
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             modules[moduleId] = moreModules[moduleId];
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         }
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-keyword">if</span>(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-keyword">while</span>(callbacks.length)
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             callbacks.shift().call(<span class="hljs-keyword">null</span>, __webpack_require__);

<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     };

<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-comment">// The module cache</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-keyword">var</span> installedModules = {};

<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-comment">// object to store loaded and loading chunks</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-comment">// "0" means "already loaded"</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-comment">// Array means "loading", array contains callbacks</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-keyword">var</span> installedChunks = {
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-number">0</span>:<span class="hljs-number">0</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     };

<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-comment">// The require function</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     function __webpack_require__(moduleId) {

<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-comment">// Check if module is in cache</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-keyword">if</span>(installedModules[moduleId])
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             <span class="hljs-keyword">return</span> installedModules[moduleId].exports;

<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-comment">// Create a new module (and put it into the cache)</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-keyword">var</span> module = installedModules[moduleId] = {
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             exports: {},
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             id: moduleId,
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             loaded: <span class="hljs-keyword">false</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         };

<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-comment">// Execute the module function</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-comment">// Flag the module as loaded</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         module.loaded = <span class="hljs-keyword">true</span>;

<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-comment">// Return the exports of the module</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-keyword">return</span> module.exports;
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     }

<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-comment">// This file contains only the entry chunk.</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-comment">// The chunk loading function for additional chunks</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     __webpack_require__.e = function requireEnsure(chunkId, callback) {
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-comment">// "0" is the signal for "already loaded"</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-keyword">if</span>(installedChunks[chunkId] === <span class="hljs-number">0</span>)
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             <span class="hljs-keyword">return</span> callback.call(<span class="hljs-keyword">null</span>, __webpack_require__);

<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-comment">// an array means "currently loading".</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-keyword">if</span>(installedChunks[chunkId] !== undefined) {
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             installedChunks[chunkId].push(callback);
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         } <span class="hljs-keyword">else</span> {
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             <span class="hljs-comment">// start chunk loading</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             installedChunks[chunkId] = [callback];
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             <span class="hljs-keyword">var</span> head = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'head'</span>)[<span class="hljs-number">0</span>];
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             <span class="hljs-keyword">var</span> script = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'script'</span>);
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             script.type = <span class="hljs-string">'text/javascript'</span>;
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             script.charset = <span class="hljs-string">'utf-8'</span>;
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             script.<span class="hljs-keyword">async</span> = <span class="hljs-keyword">true</span>;

<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             script.src = __webpack_require__.p + <span class="hljs-string">""</span> + chunkId + <span class="hljs-string">".bundle.js"</span>;
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             head.appendChild(script);
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         }
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     };

<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-comment">// expose the modules object (__webpack_modules__)</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     __webpack_require__.m = modules;

<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-comment">// expose the module cache</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     __webpack_require__.c = installedModules;

<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-comment">// __webpack_public_path__</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     __webpack_require__.p = <span class="hljs-string">""</span>;

<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-comment">// Load entry module and return exports</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-keyword">return</span> __webpack_require__(<span class="hljs-number">0</span>);
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span> })
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span>**/</span></span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span> ([
<span class="hljs-comment">/* 0 */</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-emphasis">***</span>/</span></span> function(module, exports, __webpack_require__) {

    __webpack_require__.e<span class="hljs-comment">/* nsure */</span>(<span class="hljs-number">1</span>, function(require) {
      <span class="hljs-keyword">var</span> content = __webpack_require__(<span class="hljs-number">1</span>);
      <span class="hljs-built_in">document</span>.open();
      <span class="hljs-built_in">document</span>.write(<span class="hljs-string">'&lt;h1&gt;'</span> + content + <span class="hljs-string">'&lt;/h1&gt;'</span>);
      <span class="hljs-built_in">document</span>.close();
    });


<span class="hljs-comment"><span class="markdown">/<span class="hljs-emphasis">***</span>/</span></span> }
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span> ]);</code></pre>
<p>1.bundle.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpackJsonp([1],[
/* 0 */,
/* 1 */
/***/ function(module, exports) {

    module.exports = 'Hello World';


/***/ }
]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>webpackJsonp([<span class="hljs-number">1</span>],[
<span class="hljs-comment">/* 0 */</span>,
<span class="hljs-comment">/* 1 */</span>
<span class="hljs-comment">/***/</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, exports</span>) </span>{

    <span class="hljs-built_in">module</span>.exports = <span class="hljs-string">'Hello World'</span>;


<span class="hljs-comment">/***/</span> }
]);</code></pre>
<p>和使用CommonsChunkPlugin打包的差异在于</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/******/     // This file contains only the entry chunk.
/******/     // The chunk loading function for additional chunks
/******/     __webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/         // &quot;0&quot; is the signal for &quot;already loaded&quot;
/******/         if(installedChunks[chunkId] === 0)
/******/             return callback.call(null, __webpack_require__);

/******/         // an array means &quot;currently loading&quot;.
/******/         if(installedChunks[chunkId] !== undefined) {
/******/             installedChunks[chunkId].push(callback);
/******/         } else {
/******/             // start chunk loading
/******/             installedChunks[chunkId] = [callback];
/******/             var head = document.getElementsByTagName('head')[0];
/******/             var script = document.createElement('script');
/******/             script.type = 'text/javascript';
/******/             script.charset = 'utf-8';
/******/             script.async = true;

/******/             script.src = __webpack_require__.p + &quot;&quot; + chunkId + &quot;.bundle.js&quot;;
/******/             head.appendChild(script);
/******/         }
/******/     };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-comment">// This file contains only the entry chunk.</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-comment">// The chunk loading function for additional chunks</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     __webpack_require__.e = function requireEnsure(chunkId, callback) {
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-comment">// "0" is the signal for "already loaded"</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-keyword">if</span>(installedChunks[chunkId] === <span class="hljs-number">0</span>)
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             <span class="hljs-keyword">return</span> callback.call(<span class="hljs-keyword">null</span>, __webpack_require__);

<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-comment">// an array means "currently loading".</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-keyword">if</span>(installedChunks[chunkId] !== undefined) {
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             installedChunks[chunkId].push(callback);
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         } <span class="hljs-keyword">else</span> {
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             <span class="hljs-comment">// start chunk loading</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             installedChunks[chunkId] = [callback];
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             <span class="hljs-keyword">var</span> head = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'head'</span>)[<span class="hljs-number">0</span>];
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             <span class="hljs-keyword">var</span> script = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'script'</span>);
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             script.type = <span class="hljs-string">'text/javascript'</span>;
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             script.charset = <span class="hljs-string">'utf-8'</span>;
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             script.<span class="hljs-keyword">async</span> = <span class="hljs-keyword">true</span>;

<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             script.src = __webpack_require__.p + <span class="hljs-string">""</span> + chunkId + <span class="hljs-string">".bundle.js"</span>;
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             head.appendChild(script);
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         }
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     };</code></pre>
<p>模块main的id为0，模块a的id为1。return __webpack_require__(0)，则加载main模块，<br>modules[0].call(module.exports, module, module.exports, __webpack_require__)则调用函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function(module, exports, __webpack_require__) {

    __webpack_require__.e/* nsure */(1, function(require) {
      var content = __webpack_require__(1);
      document.open();
      document.write('<h1>' + content + '</h1>');
      document.close();
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, exports, __webpack_require__</span>) </span>{

    __webpack_require__.e<span class="hljs-comment">/* nsure */</span>(<span class="hljs-number">1</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require</span>) </span>{
      <span class="hljs-keyword">var</span> content = __webpack_require__(<span class="hljs-number">1</span>);
      <span class="hljs-built_in">document</span>.open();
      <span class="hljs-built_in">document</span>.write(<span class="hljs-string">'&lt;h1&gt;'</span> + content + <span class="hljs-string">'&lt;/h1&gt;'</span>);
      <span class="hljs-built_in">document</span>.close();
    }</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/******/     // This file contains only the entry chunk.
/******/     // The chunk loading function for additional chunks
/******/     __webpack_require__.e = function requireEnsure(chunkId, callback) {
                //installedChunks[1]为undefined
/******/         // &quot;0&quot; is the signal for &quot;already loaded&quot;
/******/         if(installedChunks[chunkId] === 0)
/******/             return callback.call(null, __webpack_require__);

/******/         // an array means &quot;currently loading&quot;.
/******/         if(installedChunks[chunkId] !== undefined) {
/******/             installedChunks[chunkId].push(callback);
/******/         } else {
/******/             // start chunk loading
/******/             installedChunks[chunkId] = [callback];//installedChunks[1]为数组，表明currently loading
/******/             var head = document.getElementsByTagName('head')[0];
/******/             var script = document.createElement('script');
/******/             script.type = 'text/javascript';
/******/             script.charset = 'utf-8';
/******/             script.async = true;

/******/             script.src = __webpack_require__.p + &quot;&quot; + chunkId + &quot;.bundle.js&quot;;
/******/             head.appendChild(script);
                    //加载完后直接调用
                    /******/webpackJsonp([1],[
                    /******//* 0 */,
                    /******//* 1 */
                    /******//***/ function(module, exports) {
                    /******/
                    /******/    module.exports = 'Hello World';
                    /******/
                    /******/
                    /******//***/ }
                    /******/]);
                    /******/         }
                    /******/     };
                    //installedChunks[1]在webpackJsonp得到调用" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-comment">// This file contains only the entry chunk.</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-comment">// The chunk loading function for additional chunks</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     __webpack_require__.e = function requireEnsure(chunkId, callback) {
                <span class="hljs-comment">//installedChunks[1]为undefined</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-comment">// "0" is the signal for "already loaded"</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-keyword">if</span>(installedChunks[chunkId] === <span class="hljs-number">0</span>)
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             <span class="hljs-keyword">return</span> callback.call(<span class="hljs-keyword">null</span>, __webpack_require__);

<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-comment">// an array means "currently loading".</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-keyword">if</span>(installedChunks[chunkId] !== undefined) {
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             installedChunks[chunkId].push(callback);
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         } <span class="hljs-keyword">else</span> {
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             <span class="hljs-comment">// start chunk loading</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             installedChunks[chunkId] = [callback];<span class="hljs-comment">//installedChunks[1]为数组，表明currently loading</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             <span class="hljs-keyword">var</span> head = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'head'</span>)[<span class="hljs-number">0</span>];
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             <span class="hljs-keyword">var</span> script = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'script'</span>);
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             script.type = <span class="hljs-string">'text/javascript'</span>;
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             script.charset = <span class="hljs-string">'utf-8'</span>;
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             script.<span class="hljs-keyword">async</span> = <span class="hljs-keyword">true</span>;

<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             script.src = __webpack_require__.p + <span class="hljs-string">""</span> + chunkId + <span class="hljs-string">".bundle.js"</span>;
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             head.appendChild(script);
                    <span class="hljs-comment">//加载完后直接调用</span>
                    <span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>webpackJsonp([<span class="hljs-number">1</span>],[
                    <span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span><span class="hljs-comment">/* 0 */</span>,
                    <span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span><span class="hljs-comment">/* 1 */</span>
                    <span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span><span class="hljs-comment"><span class="markdown">/<span class="hljs-emphasis">***</span>/</span></span> function(module, exports) {
                    <span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>
                    <span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>    module.exports = <span class="hljs-string">'Hello World'</span>;
                    <span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>
                    <span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>
                    <span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span><span class="hljs-comment"><span class="markdown">/<span class="hljs-emphasis">***</span>/</span></span> }
                    <span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>]);
                    <span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         }
                    <span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     };
                    <span class="hljs-comment">//installedChunks[1]在webpackJsonp得到调用</span></code></pre>
<p>installedChunks[1]为数组，元素为main模块的执行代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/******/     window[&quot;webpackJsonp&quot;] = function webpackJsonpCallback(chunkIds, moreModules) {
                //moreModules为模块a的代码
/******/         // add &quot;moreModules&quot; to the modules object,
/******/         // then flag all &quot;chunkIds&quot; as loaded and fire callback
/******/         var moduleId, chunkId, i = 0, callbacks = [];
/******/         for(;i < chunkIds.length; i++) {
/******/             chunkId = chunkIds[i];
/******/             if(installedChunks[chunkId])//installedChunks[0]==0,installedChunks[1]为数组
/******/                 callbacks.push.apply(callbacks, installedChunks[chunkId]);//callbacks为模块main执行代码，不为数组
/******/             installedChunks[chunkId] = 0;//installedChunks[1]不为数组，表明已经加载
/******/         }
/******/         for(moduleId in moreModules) {
/******/             modules[moduleId] = moreModules[moduleId];
/******/         }
/******/         if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/         while(callbacks.length)
/******/             callbacks.shift().call(null, __webpack_require__);

/******/     };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-built_in">window</span>[<span class="hljs-string">"webpackJsonp"</span>] = function webpackJsonpCallback(chunkIds, moreModules) {
                <span class="hljs-comment">//moreModules为模块a的代码</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-comment">// add "moreModules" to the modules object,</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-comment">// then flag all "chunkIds" as loaded and fire callback</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-keyword">var</span> moduleId, chunkId, i = <span class="hljs-number">0</span>, callbacks = [];
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-keyword">for</span>(;i &lt; chunkIds.length; i++) {
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             chunkId = chunkIds[i];
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             <span class="hljs-keyword">if</span>(installedChunks[chunkId])<span class="hljs-comment">//installedChunks[0]==0,installedChunks[1]为数组</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>                 callbacks.push.apply(callbacks, installedChunks[chunkId]);<span class="hljs-comment">//callbacks为模块main执行代码，不为数组</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             installedChunks[chunkId] = <span class="hljs-number">0</span>;<span class="hljs-comment">//installedChunks[1]不为数组，表明已经加载</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         }
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-keyword">for</span>(moduleId <span class="hljs-keyword">in</span> moreModules) {
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             modules[moduleId] = moreModules[moduleId];
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         }
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-keyword">if</span>(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-keyword">while</span>(callbacks.length)
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             callbacks.shift().call(<span class="hljs-keyword">null</span>, __webpack_require__);

<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     };</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
简要分析webpack打包后代码

## 原文链接
[https://segmentfault.com/a/1190000006814420](https://segmentfault.com/a/1190000006814420)

