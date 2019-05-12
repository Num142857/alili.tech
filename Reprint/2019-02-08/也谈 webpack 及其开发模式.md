---
title: '也谈 webpack 及其开发模式' 
date: 2019-02-08 2:30:41
hidden: true
slug: 3ow27vnjtul
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">从模块化谈起</h2>
<p>近年来，js开发涌现出了诸多模块化解决方案，例如以在浏览器环境之外（服务端）构建 <code>JavaScript</code> 生态系统为目标而产生的<code>CommonJS</code>规范，从<code>CommonJS</code>社区中独立出来的<code>AMD</code>规范（异步模块定义），还有国人制定的<code>CMD</code>规范等。随着遵循<code>AMD</code>规范的<code>RequireJS</code>的流行，<code>AMD</code>规范在前端界已被广泛认同。后来，随着npm社区的逐渐壮大，<code>CommonJS</code>也越来越受欢迎，于是产生了统一这两种规范的需求，即希望提供一个前后端跨平台的解决方案，也因此产生了<code>UMD</code>（通用模块定义）规范。</p>
<p><code>CommonJS</code>定义的是模块的同步加载，主要用于Node端；而遵循AMD规范的<code>RequireJS</code>则是异步加载，适用于浏览器端。<code>requirejs</code>是一种在线”编译” 模块的方案，相当于在页面上加载一个AMD 解释器，以便于览器能够识别<code> define、exports、module</code>，而这些东西就是用于模块化的关键。</p>
<p><strong>1. <code>CommonJS</code> 同步式的<code>require</code></strong></p>
<p>Node端的模块加载遵循 <code>CommonJS</code>规范，该规范的核心思想是允许模块通过 <code>require</code> 方法来加载。</p>
<p>该规范首先加载所要依赖的其他模块，然后通过 <code>exports</code> 或 <code>module.exports</code> 来导出需要暴露的接口。但它的缺点也是显而易见的，即一个文件一个文件的加载很容易发生阻塞。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(&quot;module&quot;);//find from node_modules
require(&quot;../file.js&quot;);
exports.something = function() {};
module.exports = something;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">require</span>(<span class="hljs-string">"module"</span>);<span class="hljs-comment">//find from node_modules</span>
<span class="hljs-built_in">require</span>(<span class="hljs-string">"../file.js"</span>);
exports.something = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{};
<span class="hljs-built_in">module</span>.exports = something;</code></pre>
<p><strong>2. 使你的模块兼容AMD规范</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//web.js
(function (root, factory) {
        //判断define是否存在
    if (typeof define === 'function' &amp;&amp; define.amd) {
        // 存在则使用AMD方式加载模块
        define(['b'], factory);
    } else {
        // 不存在则使用浏览器全局变量暴露模块 
        root.web = factory(root.b);
    }
}(this, function (b) {
    //use b in some fashion.

    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
    return {};
}));
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//web.js</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(root, factory)</span> </span>{
        <span class="hljs-comment">//判断define是否存在</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> define === <span class="hljs-string">'function'</span> &amp;&amp; define.amd) {
        <span class="hljs-comment">// 存在则使用AMD方式加载模块</span>
        define([<span class="hljs-string">'b'</span>], factory);
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// 不存在则使用浏览器全局变量暴露模块 </span>
        root.web = factory(root.b);
    }
}(<span class="hljs-keyword">this</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(b)</span> </span>{
    <span class="hljs-comment">//use b in some fashion.</span>

    <span class="hljs-comment">// Just return a value to define the module export.</span>
    <span class="hljs-comment">// This example returns an object, but the module</span>
    <span class="hljs-comment">// can return a function as the exported value.</span>
    <span class="hljs-keyword">return</span> {};
}));
</code></pre>
<p>定义一个叫<code>web.js</code>的模块，依赖于另一个叫<code>b</code>的模块。如果你不想支持浏览器全局路径，那么你可以移除<code>root</code>并传递<code>this</code>参数在函数顶部。</p>
<p><strong>3. <code>define.amd</code>属性</strong></p>
<p>为了清晰的标识全局函数（为浏览器加载script必须的）遵从AMD编程接口，任何全局函数应该有一个"amd"的属性，它的值为一个对象。</p>
<p>关于RequireJS的使用不在本文范围之内，因此不展开讲解，有兴趣的请移步我的另一篇文章：</p>
<blockquote><p>详解JavaScript模块化开发：<a href="https://segmentfault.com/a/1190000000733959#articleHeader15">https://segmentfault.com/a/1190000000733959#articleHeader15</a></p></blockquote>
<h3 id="articleHeader1">AMD与异步加载</h3>
<p>因为<code>CommonJS</code>阻塞式的缺点，所以并不适合前端。于是有了AMD异步加载模块的规范。</p>
<p><code>Asynchronous Module Definition</code> 规范其实只有一个主要接口 <code>define(id?, dependencies?, factory)</code>，它要在声明模块的时候指定所有的依赖 <code>dependencies</code>，并且还要当做形参传到 <code>factory</code> 中，对于依赖的模块提前执行，依赖前置。</p>
<p>因为浏览器端的需求和同步require的问题，所以社区引进了异步模块加载的规范，即AMD规范。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="define(&quot;module&quot;, [&quot;dep1&quot;, &quot;dep2&quot;], function(d1, d2) {
  return someExportedValue;
});
require([&quot;module&quot;, &quot;../file&quot;], function(module, file) { /* ... */ });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">define(<span class="hljs-string">"module"</span>, [<span class="hljs-string">"dep1"</span>, <span class="hljs-string">"dep2"</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">d1, d2</span>) </span>{
  <span class="hljs-keyword">return</span> someExportedValue;
});
<span class="hljs-built_in">require</span>([<span class="hljs-string">"module"</span>, <span class="hljs-string">"../file"</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, file</span>) </span>{ <span class="hljs-comment">/* ... */</span> });</code></pre>
<p>使你的模块兼容于UMD规范：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//UMD，兼容AMD和CommonJS规范
(function (root, factory) {
  if (typeof exports === 'object') {
    // CommonJS
    module.exports = factory(require('b'));
  } else if (typeof define === 'function' &amp;&amp; define.amd) {
    // AMD
    define(['b'], function (b) {
      return (root.returnExportsGlobal = factory(b));
    });
  } else {
    // 浏览器全局变量，root即window
    root.returnExportsGlobal = factory(root.b);
  }
}(this, function (b) {
  // 你的实际模块
  return {};
}));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//UMD，兼容AMD和CommonJS规范</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">root, factory</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> exports === <span class="hljs-string">'object'</span>) {
    <span class="hljs-comment">// CommonJS</span>
    <span class="hljs-built_in">module</span>.exports = factory(<span class="hljs-built_in">require</span>(<span class="hljs-string">'b'</span>));
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> define === <span class="hljs-string">'function'</span> &amp;&amp; define.amd) {
    <span class="hljs-comment">// AMD</span>
    define([<span class="hljs-string">'b'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">b</span>) </span>{
      <span class="hljs-keyword">return</span> (root.returnExportsGlobal = factory(b));
    });
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// 浏览器全局变量，root即window</span>
    root.returnExportsGlobal = factory(root.b);
  }
}(<span class="hljs-keyword">this</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">b</span>) </span>{
  <span class="hljs-comment">// 你的实际模块</span>
  <span class="hljs-keyword">return</span> {};
}));</code></pre>
<p>UMD规范实现的思路：</p>
<ul>
<li><p>首先判断是否支持<code>Node.js</code>模块格式，即<code>exports</code>对象是否存在。</p></li>
<li><p>然后判断是否支持AMD格式（require是否存在），存在则使用<code>AMD</code>方式加载</p></li>
<li><p>若前两个都不存在，则将模块暴露到全局，<code>Node</code>即<code>global</code>，浏览器即window。</p></li>
</ul>
<p>例如，创建一个兼容UMD规范的jQuery插件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Uses CommonJS, AMD or browser globals to create a jQuery plugin.

(function (factory) {
    if (typeof define === 'function' &amp;&amp; define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' &amp;&amp; module.exports) {
        // Node/CommonJS
        module.exports = function( root, jQuery ) {
            if ( jQuery === undefined ) {
                // require('jQuery') returns a factory that requires window to
                // build a jQuery instance, we normalize how we use modules
                // that require this pattern but the window provided is a noop
                // if it's defined (how jquery works)
                if ( typeof window !== 'undefined' ) {
                    jQuery = require('jquery');
                }
                else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    $.fn.jqueryPlugin = function () { return true; };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// Uses CommonJS, AMD or browser globals to create a jQuery plugin.</span>

(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">factory</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> define === <span class="hljs-string">'function'</span> &amp;&amp; define.amd) {
        <span class="hljs-comment">// AMD. Register as an anonymous module.</span>
        define([<span class="hljs-string">'jquery'</span>], factory);
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">module</span> === <span class="hljs-string">'object'</span> &amp;&amp; <span class="hljs-built_in">module</span>.exports) {
        <span class="hljs-comment">// Node/CommonJS</span>
        <span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> root, jQuery </span>) </span>{
            <span class="hljs-keyword">if</span> ( jQuery === <span class="hljs-literal">undefined</span> ) {
                <span class="hljs-comment">// require('jQuery') returns a factory that requires window to</span>
                <span class="hljs-comment">// build a jQuery instance, we normalize how we use modules</span>
                <span class="hljs-comment">// that require this pattern but the window provided is a noop</span>
                <span class="hljs-comment">// if it's defined (how jquery works)</span>
                <span class="hljs-keyword">if</span> ( <span class="hljs-keyword">typeof</span> <span class="hljs-built_in">window</span> !== <span class="hljs-string">'undefined'</span> ) {
                    jQuery = <span class="hljs-built_in">require</span>(<span class="hljs-string">'jquery'</span>);
                }
                <span class="hljs-keyword">else</span> {
                    jQuery = <span class="hljs-built_in">require</span>(<span class="hljs-string">'jquery'</span>)(root);
                }
            }
            factory(jQuery);
            <span class="hljs-keyword">return</span> jQuery;
        };
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// Browser globals</span>
        factory(jQuery);
    }
}(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">$</span>) </span>{
    $.fn.jqueryPlugin = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>; };</code></pre>
<h3 id="articleHeader2">CMD</h3>
<p><code>Common Module Definition</code> 规范和 AMD 很相似，尽量保持简单，并与 <code>CommonJS</code> 和 <code>Node.js</code> 的 <code>Modules</code> 规范保持了很大的兼容性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="define(function(require, exports, module) {
  var $ = require('jquery');
  var Spinning = require('./spinning');
  exports.doSomething = ...
  module.exports = ...
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">define(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require, exports, module</span>) </span>{
  <span class="hljs-keyword">var</span> $ = <span class="hljs-built_in">require</span>(<span class="hljs-string">'jquery'</span>);
  <span class="hljs-keyword">var</span> Spinning = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./spinning'</span>);
  exports.doSomething = ...
  module.exports = ...
})</code></pre>
<p>CMD规范地址：<a href="https://github.com/seajs/seajs/issues/242" rel="nofollow noreferrer" target="_blank">https://github.com/seajs/seajs/issues/242</a></p>
<h3 id="articleHeader3"><code>ES6 module</code></h3>
<p><code>ECMAScript6</code> 內建的用法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import &quot;jquery&quot;;
export function doStuff() {}
module &quot;localModule&quot; {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> <span class="hljs-string">"jquery"</span>;
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doStuff</span>(<span class="hljs-params"></span>) </span>{}
<span class="hljs-built_in">module</span> <span class="hljs-string">"localModule"</span> {}</code></pre>
<h3 id="articleHeader4">为什么只载入<code>JavaScript</code>文件？</h3>
<p>为什么模块化系统只帮助开发者处理<code>JavaScript</code>？然而还有其他静态资源需要被处理，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="stylesheets
images
webfonts
html for templating
其他.." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>stylesheets
images
webfonts
<span class="hljs-selector-tag">html</span> <span class="hljs-keyword">for</span> templating
其他..</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="coffeescript ➞ javascript
less stylesheet ➞ css
jade ➞ html
i18n ➞ something
require(&quot;./style.css&quot;);
require(&quot;./style.less&quot;);
require(&quot;./template.jade&quot;);
require(&quot;./image.png&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">coffeescript ➞ javascript
less stylesheet ➞ css
jade ➞ html
i18n ➞ something
<span class="hljs-built_in">require</span>(<span class="hljs-string">"./style.css"</span>);
<span class="hljs-built_in">require</span>(<span class="hljs-string">"./style.less"</span>);
<span class="hljs-built_in">require</span>(<span class="hljs-string">"./template.jade"</span>);
<span class="hljs-built_in">require</span>(<span class="hljs-string">"./image.png"</span>);</code></pre>
<p>因为上面这些动机，所以有了<code>webpack</code>。</p>
<h2 id="articleHeader5">webpack</h2>
<p><code>webpack</code>是一款模块封装工具(module bundler，是打包工具，也是模块加载工具，各种资源都可以当成模块来处理)，<code>webpack</code> 会将模块与其他相关联的模块，函数库，其他需要预编译的文件等整合，编译输出此模块的静态资源文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js `like=>`  gulpfile.js/gruntfile.js

module.exports = {
    entry: &quot;./entry.js&quot;,
    output: {
        path: __dirname,
        filename: &quot;bundle.js&quot;
    },
    //module 对象用于添加loaders
    module: {
        //一个用于加载loader的数组
        loaders: [
            { test: /\.css$/, loader: &quot;style!css&quot; }
        ]
    }
}; " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-comment">// webpack.config.js `like=&gt;`  gulpfile.js/gruntfile.js</span>

module.exports = {
<span class="hljs-symbol">    entry:</span> <span class="hljs-string">"./entry.js"</span>,
<span class="hljs-symbol">    output:</span> {
<span class="hljs-symbol">        path:</span> __dirname,
<span class="hljs-symbol">        filename:</span> <span class="hljs-string">"bundle.js"</span>
    },
    <span class="hljs-comment">//module 对象用于添加loaders</span>
<span class="hljs-symbol">    module:</span> {
        <span class="hljs-comment">//一个用于加载loader的数组</span>
<span class="hljs-symbol">        loaders:</span> [
            { test: /\.css$/, loader: <span class="hljs-string">"style!css"</span> }
        ]
    }
}; </code></pre>
<p>module具有如下属性：</p>
<ul>
<li><p>test: 需要满足的条件A condition that must be met</p></li>
<li><p>exclude: 不需要满足的条件A condition that must not be met</p></li>
<li><p>include: 需要满足的条件A condition that must be met</p></li>
<li><p>loader: <code>!</code>用于分隔loaders</p></li>
<li><p>loaders: 一个loaders数组An array of loaders as string</p></li>
</ul>
<p>"include" 通常被用于匹配目录：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  include: [
    path.resolve(__dirname, &quot;app/src&quot;),
    path.resolve(__dirname, &quot;app/test&quot;)
  ]," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>  <span class="hljs-built_in">include</span>: [
    path.<span class="hljs-built_in">resolve</span>(__dirname, <span class="hljs-string">"app/src"</span>),
    path.<span class="hljs-built_in">resolve</span>(__dirname, <span class="hljs-string">"app/test"</span>)
  ],</code></pre>
<p>简单的说，webpack会把我们常用的 <code>.less</code>, <code>.scss</code>, <code>.jade</code>, <code>.jsx</code> 等等文件编译成纯 <code>js + 图片</code>(图片有时也可以被编译成 <code>base64</code> 格式的 <code>dataUrl</code>)。</p>
<p>webpack的优势和特点：</p>
<ul>
<li><p>将依赖项分块，按需加载</p></li>
<li><p>尽可能减少初始化载入的时间</p></li>
<li><p>使每一个静态资源都能够作为组件使用</p></li>
<li><p>有能力整合其他第三方函数库为模块</p></li>
<li><p>高度可配置化</p></li>
<li><p>适合大型项目</p></li>
</ul>
<p>webpack拥有更聪明的解析工具可以处理几乎所有的第三方函数库。甚至允许在相依性设定上使用表达式，例如: <code>require("./templates/" + name + ".jade")</code>，这几乎能处理大部分的模块化标准(CommonJS, AMD)。</p>
<h3 id="articleHeader6">webpack常用命令</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack 最基本的启动webpack命令
webpack -w 提供watch方法，实时进行打包更新
webpack -p 对打包后的文件进行压缩
webpack -d 提供SourceMaps，方便调试
webpack --colors 输出结果带彩色，比如：会用红色显示耗时较长的步骤
webpack --profile 输出性能数据，可以看到每一步的耗时
webpack --display-modules 默认情况下 node_modules 下的模块会被隐藏，加上这个参数可以显示这些被隐藏的模块
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>webpack 最基本的启动webpack命令
webpack -w 提供watch方法，实时进行打包更新
webpack -p 对打包后的文件进行压缩
webpack -d 提供SourceMaps，方便调试
webpack <span class="hljs-comment">--colors 输出结果带彩色，比如：会用红色显示耗时较长的步骤</span>
webpack <span class="hljs-comment">--profile 输出性能数据，可以看到每一步的耗时</span>
webpack <span class="hljs-comment">--display-modules 默认情况下 node_modules 下的模块会被隐藏，加上这个参数可以显示这些被隐藏的模块</span>
</code></pre>
<h3 id="articleHeader7">在项目中使用<code>webpack</code>
</h3>
<p>首先在项目根目录新建一个<code>package.json</code>或者通过<code>$ npm init</code>指令来产生：</p>
<p>接着通过<code>npm</code>指令安装<code>webpack</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install webpack --save-dev

or => $ cnpm i webpack -g" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-variable">$ </span>npm install webpack --save-dev

<span class="hljs-keyword">or</span> =&gt; <span class="hljs-variable">$ </span>cnpm i webpack -g</code></pre>
<p>单纯的编译指令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack <entry> <output>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;">$ webpack <span class="hljs-tag">&lt;<span class="hljs-name">entry</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">output</span>&gt;</span></code></pre>
<h3 id="articleHeader8">配置对象内容</h3>
<p>context：用来指明entry选项的基础目录（绝对路径）。默认值为<code>process.cmd()</code>，即<code>webpack.config.js</code>文件所在路径</p>
<p><strong>对象<code>entry</code></strong></p>
<p>定义了打包后的入口文件，可以是数组（所有文件打包生成一个filename文件），对象或者字符串</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    entry: {
        page1: &quot;./page1&quot;,
        page2: [&quot;./entry1&quot;, &quot;./entry2&quot;]
    },
    output: {
        // 在 output.filename 中使用 [name]或者[id]，当使用多个entry points时
        filename: &quot;[name].bundle.js&quot;,
        path: &quot;dist/js/page&quot;,
        chunkFilename: &quot;[id].bundle.js&quot; //chunkFilename是非主入口的文件名
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>{
<span class="hljs-symbol">    entry:</span> {
<span class="hljs-symbol">        page1:</span> <span class="hljs-string">"./page1"</span>,
<span class="hljs-symbol">        page2:</span> [<span class="hljs-string">"./entry1"</span>, <span class="hljs-string">"./entry2"</span>]
    },
<span class="hljs-symbol">    output:</span> {
        <span class="hljs-comment">// 在 output.filename 中使用 [name]或者[id]，当使用多个entry points时</span>
<span class="hljs-symbol">        filename:</span> <span class="hljs-string">"[name].bundle.js"</span>,
<span class="hljs-symbol">        path:</span> <span class="hljs-string">"dist/js/page"</span>,
<span class="hljs-symbol">        chunkFilename:</span> <span class="hljs-string">"[id].bundle.js"</span> <span class="hljs-comment">//chunkFilename是非主入口的文件名</span>
    }
}</code></pre>
<p>该段代码最终会生成一个<code>page1.bundle.js</code> 和 <code>page2.bundle.js</code>，并存放到 <code>./dist/js/page</code> 文件夹下</p>
<p><code>chunkFilename</code>是非主入口的文件名，当按需异步加载模块的时候，这时生成的文件名是以<code>chunkname</code>配置的</p>
<ul>
<li><p><code>output</code>：该参数是个对象，定义了输出文件的位置及名字：</p></li>
<li><p><code>path</code>: 打包文件存放的绝对路径</p></li>
<li><p><code>publicPath</code>: 网站运行时的访问路径URL</p></li>
<li><p><code>filename</code>:打包后的文件名</p></li>
</ul>
<p>你可以使用<code>&lt;name&gt;=&lt;filename&gt;</code> 的格式来替代 <code>entry point</code> 建立一个別名：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
module.exports = {
  output: {
    filename: &quot;[name].bundle.js&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-comment">// webpack.config.js</span>
module.exports = {
<span class="hljs-symbol">  output:</span> {
<span class="hljs-symbol">    filename:</span> <span class="hljs-string">"[name].bundle.js"</span>
  }
}</code></pre>
<p>接着执行如下命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack index=./entry.js
>> Output a file that is named index.bundle.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>$ webpack index=./entry<span class="hljs-selector-class">.js</span>
&gt;&gt; Output <span class="hljs-selector-tag">a</span> file that is named index<span class="hljs-selector-class">.bundle</span><span class="hljs-selector-class">.js</span></code></pre>
<p><strong>对象<code>output</code></strong></p>
<p>表示欲输出的路径，其会被映射到设定档中的 <code>output.path</code> 以及 <code>output.filename</code></p>
<ul>
<li><p><code>output.filename</code>：指定每一个在磁盘上输出的文件名，不允许指定绝对路径</p></li>
<li><p><code>output.path</code>：输出绝对路径目录（必须）</p></li>
<li><p><code>output.publicPath</code>：指定在浏览器端引用的文件公开URL地址</p></li>
</ul>
<p><strong>对象<code>resolve</code></strong></p>
<p>webpack在构建包的时候会按目录进行文件的查找，<code>resolve</code>属性中的<code>extensions</code>数组可用于配置程序可以自行补全哪些文件后缀。<code>extensions</code> 第一个是空字符串，对应不需要后缀的情况。比如，为了查找<code>CoffeeScript</code>文件，你的数组应当包含字符串<code>".coffee"</code>。使用<code>extensions</code>，在引入模块的时候就不需要写后缀，会自动补全</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="resolve: {
        extensions: ['', '.js', '.jsx','.es6','css','scss','png','jpg']
    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">resolve</span>: {
        <span class="hljs-attribute">extensions</span>: [<span class="hljs-string">''</span>, <span class="hljs-string">'.js'</span>, <span class="hljs-string">'.jsx'</span>,<span class="hljs-string">'.es6'</span>,<span class="hljs-string">'css'</span>,<span class="hljs-string">'scss'</span>,<span class="hljs-string">'png'</span>,<span class="hljs-string">'jpg'</span>]
    },</code></pre>
<p><code>resolve.alias</code> 定义别名</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="alias:{
       'react-dom':path.join(nodeModulesPath,'/dist/react-dom'),
        'redux': path.join(nodeModulesPath,'dist/redux')
    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-keyword">alias</span>:{
       <span class="hljs-string">'react-dom'</span>:path.<span class="hljs-keyword">join</span>(nodeModulesPath,<span class="hljs-string">'/dist/react-dom'</span>),
        <span class="hljs-string">'redux'</span>: path.<span class="hljs-keyword">join</span>(nodeModulesPath,<span class="hljs-string">'dist/redux'</span>)
    },</code></pre>
<p><strong>对象<code>externals</code></strong></p>
<p>当我们想在项目中<code>require</code>一些其他的类库或者<code>API</code>，而又不想让这些类库的源码被构建到运行时文件中，<br>这在实际开发中很有必要。此时我们就可以通过配置<code>externals</code>参数来解决这个问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" externals: {
     &quot;jquery&quot;: &quot;jQuery&quot;
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-symbol"> externals:</span> {
     <span class="hljs-string">"jquery"</span>: <span class="hljs-string">"jQuery"</span>
 }</code></pre>
<p>这样我们就可以放心的在项目中使用这些API了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var $ = require(“jquery”);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ruby"><code style="word-break: break-word; white-space: initial;">var $ = <span class="hljs-keyword">require</span>(“jquery”);</code></pre>
<p>配置项详情：<a href="https://webpack.github.io/docs/configuration.html" rel="nofollow noreferrer" target="_blank">https://webpack.github.io/docs/configuration.html</a></p>
<h3 id="articleHeader9">css样式和图片的加载</h3>
<p>你可以在你的js文件里引入css文件和图片，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require('./bootstrap.css');
require('./style.less');
require('../../main.scss');

var img = document.createElement('img');
img.src = require('./myImg.png');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">require</span>(<span class="hljs-string">'./bootstrap.css'</span>);
<span class="hljs-built_in">require</span>(<span class="hljs-string">'./style.less'</span>);
<span class="hljs-built_in">require</span>(<span class="hljs-string">'../../main.scss'</span>);

<span class="hljs-keyword">var</span> img = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'img'</span>);
img.src = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./myImg.png'</span>);</code></pre>
<p>当你<code>require</code>了CSS（less或者其他）文件，<code>webpack</code>会在页面中插入一个内联的<code>&lt;style&gt;</code>标签去引入样式。当你<code>require</code>图片的时候，bundle文件会包含图片的<code>url</code>，并通过<code>require()</code>返回图片的<code>url</code>。</p>
<p>当然，你需要在<code>webpack.config.js</code>里做相应的配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
module.exports = {
  entry: './entry.js',//入口文件
  output: {
    path: './build', // 输出js和图片的目录
    publicPath: 'http://mycdn.com/', // 用来生成图片的地址
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }, // 用!去链式调用loader
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.scss$/,loaders: [&quot;style&quot;, &quot;css&quot;, &quot;sass&quot;]}
      {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'} // 内联的base64的图片地址，图片要小于8k，直接的url的地址则不解析
    ]
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-comment">// webpack.config.js</span>
module.exports = {
<span class="hljs-symbol">  entry:</span> <span class="hljs-string">'./entry.js'</span>,<span class="hljs-comment">//入口文件</span>
<span class="hljs-symbol">  output:</span> {
<span class="hljs-symbol">    path:</span> <span class="hljs-string">'./build'</span>, <span class="hljs-comment">// 输出js和图片的目录</span>
<span class="hljs-symbol">    publicPath:</span> <span class="hljs-string">'http://mycdn.com/'</span>, <span class="hljs-comment">// 用来生成图片的地址</span>
<span class="hljs-symbol">    filename:</span> <span class="hljs-string">'bundle.js'</span>
  },
<span class="hljs-symbol">  module:</span> {
<span class="hljs-symbol">    loaders:</span> [
      { <span class="hljs-string">test:</span> <span class="hljs-regexp">/\.less$/</span>, <span class="hljs-string">loader:</span> <span class="hljs-string">'style-loader!css-loader!less-loader'</span> }, <span class="hljs-comment">// 用!去链式调用loader</span>
      { <span class="hljs-string">test:</span> <span class="hljs-regexp">/\.css$/</span>, <span class="hljs-string">loader:</span> <span class="hljs-string">'style-loader!css-loader'</span> },
      { <span class="hljs-string">test:</span> <span class="hljs-regexp">/\.scss$/</span>,<span class="hljs-string">loaders:</span> [<span class="hljs-string">"style"</span>, <span class="hljs-string">"css"</span>, <span class="hljs-string">"sass"</span>]}
      {<span class="hljs-string">test:</span> <span class="hljs-regexp">/\.(png|jpg)$/</span>, <span class="hljs-string">loader:</span> <span class="hljs-string">'url-loader?limit=8192'</span>} <span class="hljs-comment">// 内联的base64的图片地址，图片要小于8k，直接的url的地址则不解析</span>
    ]
  }
};</code></pre>
<p>当然，你需要先通过npm包来安装这些loader，<code>webpack</code>会通过<code>test</code>查找匹配文件，然后加载相应的<code>loader</code>。比如通过npm安装<code>sass loader</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install sass-loader node-sass webpack --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;">$ npm install sass-loader <span class="hljs-keyword">node</span><span class="hljs-title">-sass</span> webpack --save-dev</code></pre>
<h3 id="articleHeader10">实例一</h3>
<p>新建一个<code>content.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// content.js
module.exports = &quot;It works from content.js&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-comment">// content.js</span>
<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = <span class="hljs-string">"It works from content.js"</span>;</code></pre>
<p>然后编辑 <code>entry.js</code> 加入 <code>require</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// File: entry.js
document.write(require(&quot;./content.js&quot;));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// File: entry.js</span>
<span class="hljs-built_in">document</span>.write(<span class="hljs-built_in">require</span>(<span class="hljs-string">"./content.js"</span>));</code></pre>
<p>打开浏览器，看到屏幕输出：<code>"It works from content.js";</code></p>
<p>Webpack 会给每个模块一个唯一的 <code>ID</code> 然后通过 <code>ID</code> 存取这些模块，这些模块都会被整合到 <code>bundle.js</code> 里面。</p>
<h2 id="articleHeader11">webpack插件和使用方法介绍</h2>
<p><strong>1. <code>CommonsChunkPlugin</code>合并公共代码</strong></p>
<p>它用于提取多个入口文件的公共脚本部分，然后生成一个 公共文件来方便多页面之间进行复用。以下是该插件的使用方法和webpack的具体用法介绍：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var webpack = require('webpack');
var path = require('path');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

var config = {
    //Webpack 本身内置了一些常用的插件，还可以通过 npm 安装第三方插件。
    plugins: [commonsPlugin],
    //页面入口文件配置
    entry: {
        index : './index.js'
    },
    //入口文件输出配置
    output: {
        path: 'dist/js/page',
        filename: '[name].js'
    },
    //module 的作用是添加loaders
    module: {
        //加载器配置
        loaders: [
            //.css 文件使用 style-loader 和 css-loader 来处理
            { test: /\.css$/, loader: 'style-loader!css-loader' },//test属性匹配css文件
            //.js 文件使用 jsx-loader 来编译处理
            { test: /\.js$/, loader: 'jsx-loader?harmony' },
            //.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
            {//处理字体
              test: /\.(woff2?|otf|eot|svg|ttf)$/i,
            },
            loader: 'style!css'//加载style和css loader
        ]
    },
    //其它解决方案配置
    resolve: {
        root: '/Users/trigkit4/webpack', //绝对路径
        extensions: ['', '.js', '.json', '.scss'],//文件扩展名
        //模块别名定义，方便后续直接引用别名
        alias: {
            a : './assets/a.js',  // require(“a”)即可引用该模块
            b : './assets/b.js',
            c : './assets/c.js'
        }
    }
};

module.exports = config;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>var webpack = require(<span class="hljs-string">'webpack'</span>);
var path = require(<span class="hljs-string">'path'</span>);
var commonsPlugin = <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin(<span class="hljs-string">'common.js'</span>);

var config = {
    <span class="hljs-comment">//Webpack 本身内置了一些常用的插件，还可以通过 npm 安装第三方插件。</span>
<span class="hljs-symbol">    plugins:</span> [commonsPlugin],
    <span class="hljs-comment">//页面入口文件配置</span>
<span class="hljs-symbol">    entry:</span> {
        <span class="hljs-string">index :</span> <span class="hljs-string">'./index.js'</span>
    },
    <span class="hljs-comment">//入口文件输出配置</span>
<span class="hljs-symbol">    output:</span> {
<span class="hljs-symbol">        path:</span> <span class="hljs-string">'dist/js/page'</span>,
<span class="hljs-symbol">        filename:</span> <span class="hljs-string">'[name].js'</span>
    },
    <span class="hljs-comment">//module 的作用是添加loaders</span>
<span class="hljs-symbol">    module:</span> {
        <span class="hljs-comment">//加载器配置</span>
<span class="hljs-symbol">        loaders:</span> [
            <span class="hljs-comment">//.css 文件使用 style-loader 和 css-loader 来处理</span>
            { <span class="hljs-string">test:</span> <span class="hljs-regexp">/\.css$/</span>, <span class="hljs-string">loader:</span> <span class="hljs-string">'style-loader!css-loader'</span> },<span class="hljs-comment">//test属性匹配css文件</span>
            <span class="hljs-comment">//.js 文件使用 jsx-loader 来编译处理</span>
            { <span class="hljs-string">test:</span> <span class="hljs-regexp">/\.js$/</span>, <span class="hljs-string">loader:</span> <span class="hljs-string">'jsx-loader?harmony'</span> },
            <span class="hljs-comment">//.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理</span>
            { <span class="hljs-string">test:</span> <span class="hljs-regexp">/\.scss$/</span>, <span class="hljs-string">loader:</span> <span class="hljs-string">'style!css!sass?sourceMap'</span>},
            <span class="hljs-comment">//图片文件使用 url-loader 来处理，小于8kb的直接转为base64</span>
            { <span class="hljs-string">test:</span> <span class="hljs-regexp">/\.(png|jpg)$/</span>, <span class="hljs-string">loader:</span> <span class="hljs-string">'url-loader?limit=8192'</span>},
            {<span class="hljs-comment">//处理字体</span>
<span class="hljs-symbol">              test:</span> <span class="hljs-regexp">/\.(woff2?|otf|eot|svg|ttf)$/</span>i,
            },
<span class="hljs-symbol">            loader:</span> <span class="hljs-string">'style!css'</span><span class="hljs-comment">//加载style和css loader</span>
        ]
    },
    <span class="hljs-comment">//其它解决方案配置</span>
<span class="hljs-symbol">    resolve:</span> {
<span class="hljs-symbol">        root:</span> <span class="hljs-string">'/Users/trigkit4/webpack'</span>, <span class="hljs-comment">//绝对路径</span>
<span class="hljs-symbol">        extensions:</span> [<span class="hljs-string">''</span>, <span class="hljs-string">'.js'</span>, <span class="hljs-string">'.json'</span>, <span class="hljs-string">'.scss'</span>],<span class="hljs-comment">//文件扩展名</span>
        <span class="hljs-comment">//模块别名定义，方便后续直接引用别名</span>
<span class="hljs-symbol">        alias:</span> {
            <span class="hljs-string">a :</span> <span class="hljs-string">'./assets/a.js'</span>,  <span class="hljs-comment">// require(“a”)即可引用该模块</span>
            <span class="hljs-string">b :</span> <span class="hljs-string">'./assets/b.js'</span>,
            <span class="hljs-string">c :</span> <span class="hljs-string">'./assets/c.js'</span>
        }
    }
};

module.exports = config;</code></pre>
<p><code>Webpack</code>中将打包后的文件都称之为<code>Chunk</code>。这个插件可以将多个打包后的资源中的公共部分打包成单独的文件。这里指定公共文件输出为<code>common.js</code></p>
<p><code>Webpack</code> 本身只能处理 <code>JavaScript</code> 模块，如果要处理其他类型的文件，就需要使用<code>loader</code>进行转换。 <br>不同模块的加载是通过模块加载器（<code>webpack-loader</code>）来统一管理的。</p>
<p><code>！</code>用来定义<code>loader</code>的串联关系，<code>”-loader”</code>是可以省略不写的，多个<code>loader</code>之间用<code>“!”</code>连接起来，但所有的加载器都需要通过<code>npm</code>来加载。</p>
<p><strong>2. <code>UglifyJsPlugin</code>压缩js文件</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//webpack.config.js

//...other webpack settings

plugins: [
    new Webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    })
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-comment">//webpack.config.js</span>

<span class="hljs-comment">//...other webpack settings</span>
<span class="hljs-symbol">
plugins:</span> [
    new Webpack.optimize.UglifyJsPlugin({
<span class="hljs-symbol">        compress:</span> {
<span class="hljs-symbol">            warnings:</span> false
        }
    })
]</code></pre>
<p><strong>3. <code>Extract Text Plugin</code></strong></p>
<p>大家都知道在<code> webpack </code>中 <code>CSS</code> 是可以被 <code>require()</code> 的，<code>webpack</code> 会自动生成一个 <code>&lt;style&gt;</code> 标签并加入到 <code>html</code> 的 <code>&lt;head&gt;</code>标签 中。但是在发布时，我们可能只希望有一个被打包过后 css 文件。这时 <code>Extract Text Plugin</code> 就能帮助我们完成这项任务。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//webpack.config.js
var ExtractTextPlugin = require(&quot;extract-text-webpack-plugin&quot;);
module.exports = {
    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract(&quot;style-loader&quot;, &quot;css-loader&quot;) }
        ]
    },
    plugins: [
        new ExtractTextPlugin(&quot;app.bundle.css&quot;)
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">//webpack.config.js</span>
<span class="hljs-keyword">var</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">"extract-text-webpack-plugin"</span>);
<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-keyword">module</span>: {
        loaders: [
            { test: <span class="hljs-regexp">/\.css$/</span>, loader: ExtractTextPlugin.extract(<span class="hljs-string">"style-loader"</span>, <span class="hljs-string">"css-loader"</span>) }
        ]
    },
    plugins: [
        <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">"app.bundle.css"</span>)
    ]
}</code></pre>
<p>以上设置会输出一个 <code>app.bundle.css</code> 的文件。</p>
<p><strong>4. <code>html-webpack-plugin</code></strong></p>
<p>webpack中生成HTML的插件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpackConfig = {
  entry: 'index.js',
  output: {
    path: 'dist',
    filename: 'index_bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
            favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
            filename: './view/about.html', //生成的html存放路径，相对于path
            template: './src/view/about.html', //html模板路径
            inject: true, //js插入的位置，true/'head'/'body'/false
            hash: true, //为静态资源生成hash值
            chunks: ['vendors', 'about'],//需要引入的chunk，不配置就会引入所有页面的资源
            minify: { //压缩HTML文件    
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        }),
  ]      
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>)
<span class="hljs-keyword">var</span> webpackConfig = {
  <span class="hljs-attr">entry</span>: <span class="hljs-string">'index.js'</span>,
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: <span class="hljs-string">'dist'</span>,
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'index_bundle.js'</span>
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({ <span class="hljs-comment">//根据模板插入css/js等生成最终HTML</span>
            favicon: <span class="hljs-string">'./src/img/favicon.ico'</span>, <span class="hljs-comment">//favicon路径，通过webpack引入同时可以生成hash值</span>
            filename: <span class="hljs-string">'./view/about.html'</span>, <span class="hljs-comment">//生成的html存放路径，相对于path</span>
            template: <span class="hljs-string">'./src/view/about.html'</span>, <span class="hljs-comment">//html模板路径</span>
            inject: <span class="hljs-literal">true</span>, <span class="hljs-comment">//js插入的位置，true/'head'/'body'/false</span>
            hash: <span class="hljs-literal">true</span>, <span class="hljs-comment">//为静态资源生成hash值</span>
            chunks: [<span class="hljs-string">'vendors'</span>, <span class="hljs-string">'about'</span>],<span class="hljs-comment">//需要引入的chunk，不配置就会引入所有页面的资源</span>
            minify: { <span class="hljs-comment">//压缩HTML文件    </span>
                removeComments: <span class="hljs-literal">true</span>, <span class="hljs-comment">//移除HTML中的注释</span>
                collapseWhitespace: <span class="hljs-literal">false</span> <span class="hljs-comment">//删除空白符与换行符</span>
            }
        }),
  ]      
}</code></pre>
<p>详情：<a href="https://www.npmjs.com/package/html-webpack-plugin" rel="nofollow noreferrer" target="_blank">https://www.npmjs.com/package/html-webpack-plugin</a></p>
<p><strong>5. <code>ProvidePlugin</code></strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins: [
      
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom'
        })
    ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">plugins</span>: [
      
        new webpack.ProvidePlugin({
            <span class="hljs-attribute">React</span>: <span class="hljs-string">'react'</span>,
            <span class="hljs-attribute">ReactDOM</span>: <span class="hljs-string">'react-dom'</span>
        })
    ]</code></pre>
<p><code>ProvidePlugin</code> 插件可以定义一个共用的插件入口，以后的文件就不需要<code>require('react')</code>也能使用React了。</p>
<p><strong>6. <code>babel loader</code></strong></p>
<p><code>Babel-loader</code>能够将<code>JSX/ES6</code> 文件转为js文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install babel-loader babel-core babel-preset-es2015 babel-preset-react --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code style="word-break: break-word; white-space: initial;">$ npm <span class="hljs-keyword">install </span><span class="hljs-keyword">babel-loader </span><span class="hljs-keyword">babel-core </span><span class="hljs-keyword">babel-preset-es2015 </span><span class="hljs-keyword">babel-preset-react </span>--save-dev</code></pre>
<p>配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    entry: {}, //文件入口
    output: { }, //输出出口
    module: {
        loaders: [ 
            {
                test:/\.js[x]?$/,
                loader: 'babel-loader',
                exclude:/node_modules/,
                query:{presets: ['es2015','react']}
            },
        ]
    },
    plugins: [ ],//编译的时候所执行的插件数组
    devtool : &quot;source-map&quot; //调试模式
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-built_in">module</span>.exports = {
    entry: {}, <span class="hljs-comment">//文件入口</span>
    output: { }, <span class="hljs-comment">//输出出口</span>
    <span class="hljs-keyword">module</span>: {
        loaders: [ 
            {
                test:<span class="hljs-regexp">/\.js[x]?$/</span>,
                loader: <span class="hljs-string">'babel-loader'</span>,
                exclude:<span class="hljs-regexp">/node_modules/</span>,
                query:{presets: [<span class="hljs-string">'es2015'</span>,<span class="hljs-string">'react'</span>]}
            },
        ]
    },
    plugins: [ ],<span class="hljs-comment">//编译的时候所执行的插件数组</span>
    devtool : <span class="hljs-string">"source-map"</span> <span class="hljs-comment">//调试模式</span>
};</code></pre>
<p>插件列表：<a href="http://webpack.github.io/docs/list-of-plugins.html" rel="nofollow noreferrer" target="_blank">http://webpack.github.io/docs/list-of-plugins.html</a></p>
<h3 id="articleHeader12">开发服务器安装</h3>
<p><code>Webpack</code>开发服务器需要单独安装，同样是通过<code>npm</code>进行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ sudo npm install -g webpack-dev-server" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">$ sudo npm <span class="hljs-keyword">install</span> -g webpack-dev-<span class="hljs-keyword">server</span></code></pre>
<p>可以使用<code>webpack-dev-server</code>直接启动，也可以增加参数来获取更多的功能， </p>
<p>具体配置可以参见官方文档。在终端输入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack-dev-server
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code>$ webpack-dev-<span class="hljs-keyword">server</span>
</code></pre>
<p>然后打开：<a href="http://localhost:8080/webpack-dev-server/index.html" rel="nofollow noreferrer" target="_blank">http://localhost:8080/webpack-dev-server/index.html</a></p>
<p>在<code>webpack.config.js</code>里配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//使用webpack-dev-server，提高开发效率

module.exports={
    devServer: {
        contentBase: './',
        host: 'localhost',
        port: 9090, //默认8080
        inline: true, //可以监控js变化
        hot: true, //热启动
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-comment">//使用webpack-dev-server，提高开发效率</span>

<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span>={
    devServer: {
        contentBase: <span class="hljs-string">'./'</span>,
        host: <span class="hljs-string">'localhost'</span>,
        port: <span class="hljs-number">9090</span>, <span class="hljs-comment">//默认8080</span>
        inline: <span class="hljs-keyword">true</span>, <span class="hljs-comment">//可以监控js变化</span>
        hot: <span class="hljs-keyword">true</span>, <span class="hljs-comment">//热启动</span>
    }
}</code></pre>
<p>详情：<a href="https://webpack.github.io/docs/webpack-dev-server.html" rel="nofollow noreferrer" target="_blank">https://webpack.github.io/docs/webpack-dev-server.html</a></p>
<h3 id="articleHeader13">使用<code>browser-sync</code>实时刷新页面</h3>
<p>如果每次更改代码都要重新执行<code>webpack</code>命令不免太过麻烦，所以这里推荐使用<code>browser-sync-webpack-plugin</code>，可以监听代码变化，实时刷新页面。</p>
<p>安装<code>browser-sync-webpack-plugin</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install --save-dev browser-sync-webpack-plugin
$ webpack --watch" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>$ npm <span class="hljs-keyword">install</span> <span class="hljs-comment">--save-dev browser-sync-webpack-plugin</span>
$ webpack <span class="hljs-comment">--watch</span></code></pre>
<p><code>webpack.config.js</code>配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
 
module.exports = {
  // ... 
  plugins: [
    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development, 
      // ./public directory is being served 
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['public'] } //根目录就填'./'
    })
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> BrowserSyncPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'browser-sync-webpack-plugin'</span>);
 
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-comment">// ... </span>
  plugins: [
    <span class="hljs-keyword">new</span> BrowserSyncPlugin({
      <span class="hljs-comment">// browse to http://localhost:3000/ during development, </span>
      <span class="hljs-comment">// ./public directory is being served </span>
      host: <span class="hljs-string">'localhost'</span>,
      <span class="hljs-attr">port</span>: <span class="hljs-number">3000</span>,
      <span class="hljs-attr">server</span>: { <span class="hljs-attr">baseDir</span>: [<span class="hljs-string">'public'</span>] } <span class="hljs-comment">//根目录就填'./'</span>
    })
  ]
}</code></pre>
<h3 id="articleHeader14">实例二：<code>react+webpack+es6</code>开发模式</h3>
<ul>
<li><p>具体项目地址请移步：<a href="https://github.com/hawx1993/react-webpack-demos" rel="nofollow noreferrer" target="_blank">https://github.com/hawx1993/react-webpack-demos</a></p></li>
<li><p>在线DEMO：<a href="http://hawx1993.github.io/react-webpack-es6-demos" rel="nofollow noreferrer" target="_blank">http://hawx1993.github.io/react-webpack-es6-demos</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
也谈 webpack 及其开发模式

## 原文链接
[https://segmentfault.com/a/1190000005768185](https://segmentfault.com/a/1190000005768185)

