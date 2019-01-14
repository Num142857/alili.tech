---
title: 'cordova研习笔记(二) —— cordova 6.X 源码解读（上）' 
date: 2019-01-15 2:30:12
hidden: true
slug: 5cu03holh
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>cordova(PhoneGap) 是一个优秀的经典的中间件框架，网上对其源代码解读的文章确实不多，本系列文章试着解读一下，以便对cordova 框架的原理理解得更深入。本文源码为cordova android版本<code>6.1.2</code>。</p>
<h2 id="articleHeader1">源码结构</h2>
<p>我们使用IDE的代码折叠功能先从整体上把握代码结构。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
* 版权申明及注释部分
*/
;(function() {
  ...
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/*
* 版权申明及注释部分
*/</span>
;(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  ...
})();</code></pre>
<p><code>;</code>是保证导入的其它js脚本，使用工具压缩js文件时不出错。一个自执行匿名函数包裹，防止内部变量污染到外部命名空间。阅读过jQuery源码的人都知道，jQuery的也是相同的结构，只是jQuery定义的匿名函数多了两个参数window和undefined，然后调用的时候只传入window，这样，window可以在jQuery内部安全使用，而undefined也的确表示未定义（有些浏览器实现允许重定义undefined）。</p>
<p>继续展开代码，可以看到如下的结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=";(function() {
var PLATFORM_VERSION_BUILD_LABEL = '6.1.2';

// 模块化系统
/* ------------------------------------------------------------- */
var require, // 加载使用module
    define;  // 定义注册module

// require|define 的逻辑
(function () {
  ...
})();

// Export for use in node
if (typeof module === &quot;object&quot; &amp;&amp; typeof require === &quot;function&quot;) {
    module.exports.require = require;
    module.exports.define = define;
}
/* ------------------------------------------------------------- */

// 事件的处理和回调，外部访问cordova.js的入口
define(&quot;cordova&quot;, function(require, exports, module) { ... }

// JS->Native的具体交互形式
define(&quot;cordova/android/nativeapiprovider&quot;, function(require, exports, module) { ... }

// 通过prompt()和Native交互
define(&quot;cordova/android/promptbasednativeapi&quot;, function(require, exports, module)  { ... }

// 用于plugin中校验参数，比如argscheck.checkArgs('fFO', 'Camera.getPicture', arguments); 参数应该是2个函数1个对象
define(&quot;cordova/argscheck&quot;, function(require, exports, module) { ... }

// JS->Native交互时对ArrayBuffer进行uint8ToBase64（WebSockets二进制流）
define(&quot;cordova/base64&quot;, function(require, exports, module) { ... }

// 对象属性操作，比如把一个对象的属性Merge到另外一个对象
define(&quot;cordova/builder&quot;, function(require, exports, module) { ... }

// 事件通道
define(&quot;cordova/channel&quot;, function(require, exports, module) { ... }

// 执行JS->Native交互
define(&quot;cordova/exec&quot;, function(require, exports, module) { ... }

// 用于Plugin中往已经有的模块上添加方法
define(&quot;cordova/exec/proxy&quot;, function(require, exports, module) { ... }

// 初始化处理
define(&quot;cordova/init&quot;, function(require, exports, module) { ... }
define(&quot;cordova/init_b&quot;, function(require, exports, module) { ... }

// 把定义的模块clobber到一个对象，在初始化的时候会赋给window
define(&quot;cordova/modulemapper&quot;, function(require, exports, module) { ... }
define(&quot;cordova/modulemapper_b&quot;, function(require, exports, module) { ... }

// 平台启动处理
define(&quot;cordova/platform&quot;, function(require, exports, module) { ... }

// 清缓存、loadUrl、退出程序等
define(&quot;cordova/plugin/android/app&quot;, function(require, exports, module) { ... }

// 载所有cordova_plugins.js中定义的模块，执行完成后会触发
define(&quot;cordova/pluginloader&quot;, function(require, exports, module) { ... }
define(&quot;cordova/pluginloader_b&quot;, function(require, exports, module) { ... }

// 获取绝对URL，InAppBrowser中会用到
define(&quot;cordova/urlutil&quot;, function(require, exports, module) { ... }

// 工具类
define(&quot;cordova/utils&quot;, function(require, exports, module) { ... }

// 所有模块注册完之后，导入cordova至全局环境中
window.cordova = require('cordova');

// 初始化启动
require('cordova/init');

})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">;(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
<span class="hljs-keyword">var</span> PLATFORM_VERSION_BUILD_LABEL = <span class="hljs-string">'6.1.2'</span>;

<span class="hljs-comment">// 模块化系统</span>
<span class="hljs-comment">/* ------------------------------------------------------------- */</span>
<span class="hljs-keyword">var</span> <span class="hljs-built_in">require</span>, <span class="hljs-comment">// 加载使用module</span>
    define;  <span class="hljs-comment">// 定义注册module</span>

<span class="hljs-comment">// require|define 的逻辑</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  ...
})();

<span class="hljs-comment">// Export for use in node</span>
<span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">module</span> === <span class="hljs-string">"object"</span> &amp;&amp; <span class="hljs-keyword">typeof</span> <span class="hljs-built_in">require</span> === <span class="hljs-string">"function"</span>) {
    <span class="hljs-built_in">module</span>.exports.require = <span class="hljs-built_in">require</span>;
    <span class="hljs-built_in">module</span>.exports.define = define;
}
<span class="hljs-comment">/* ------------------------------------------------------------- */</span>

<span class="hljs-comment">// 事件的处理和回调，外部访问cordova.js的入口</span>
define(<span class="hljs-string">"cordova"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require, exports, module</span>) </span>{ ... }

<span class="hljs-comment">// JS-&gt;Native的具体交互形式</span>
define(<span class="hljs-string">"cordova/android/nativeapiprovider"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require, exports, module</span>) </span>{ ... }

<span class="hljs-comment">// 通过prompt()和Native交互</span>
define(<span class="hljs-string">"cordova/android/promptbasednativeapi"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require, exports, module</span>)  </span>{ ... }

<span class="hljs-comment">// 用于plugin中校验参数，比如argscheck.checkArgs('fFO', 'Camera.getPicture', arguments); 参数应该是2个函数1个对象</span>
define(<span class="hljs-string">"cordova/argscheck"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require, exports, module</span>) </span>{ ... }

<span class="hljs-comment">// JS-&gt;Native交互时对ArrayBuffer进行uint8ToBase64（WebSockets二进制流）</span>
define(<span class="hljs-string">"cordova/base64"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require, exports, module</span>) </span>{ ... }

<span class="hljs-comment">// 对象属性操作，比如把一个对象的属性Merge到另外一个对象</span>
define(<span class="hljs-string">"cordova/builder"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require, exports, module</span>) </span>{ ... }

<span class="hljs-comment">// 事件通道</span>
define(<span class="hljs-string">"cordova/channel"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require, exports, module</span>) </span>{ ... }

<span class="hljs-comment">// 执行JS-&gt;Native交互</span>
define(<span class="hljs-string">"cordova/exec"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require, exports, module</span>) </span>{ ... }

<span class="hljs-comment">// 用于Plugin中往已经有的模块上添加方法</span>
define(<span class="hljs-string">"cordova/exec/proxy"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require, exports, module</span>) </span>{ ... }

<span class="hljs-comment">// 初始化处理</span>
define(<span class="hljs-string">"cordova/init"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require, exports, module</span>) </span>{ ... }
define(<span class="hljs-string">"cordova/init_b"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require, exports, module</span>) </span>{ ... }

<span class="hljs-comment">// 把定义的模块clobber到一个对象，在初始化的时候会赋给window</span>
define(<span class="hljs-string">"cordova/modulemapper"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require, exports, module</span>) </span>{ ... }
define(<span class="hljs-string">"cordova/modulemapper_b"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require, exports, module</span>) </span>{ ... }

<span class="hljs-comment">// 平台启动处理</span>
define(<span class="hljs-string">"cordova/platform"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require, exports, module</span>) </span>{ ... }

<span class="hljs-comment">// 清缓存、loadUrl、退出程序等</span>
define(<span class="hljs-string">"cordova/plugin/android/app"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require, exports, module</span>) </span>{ ... }

<span class="hljs-comment">// 载所有cordova_plugins.js中定义的模块，执行完成后会触发</span>
define(<span class="hljs-string">"cordova/pluginloader"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require, exports, module</span>) </span>{ ... }
define(<span class="hljs-string">"cordova/pluginloader_b"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require, exports, module</span>) </span>{ ... }

<span class="hljs-comment">// 获取绝对URL，InAppBrowser中会用到</span>
define(<span class="hljs-string">"cordova/urlutil"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require, exports, module</span>) </span>{ ... }

<span class="hljs-comment">// 工具类</span>
define(<span class="hljs-string">"cordova/utils"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require, exports, module</span>) </span>{ ... }

<span class="hljs-comment">// 所有模块注册完之后，导入cordova至全局环境中</span>
<span class="hljs-built_in">window</span>.cordova = <span class="hljs-built_in">require</span>(<span class="hljs-string">'cordova'</span>);

<span class="hljs-comment">// 初始化启动</span>
<span class="hljs-built_in">require</span>(<span class="hljs-string">'cordova/init'</span>);

})();</code></pre>
<p>从上可以清晰的看出，在cordova内部，首先是定义了两个公共的require和define函数，然后是使用define注册所有模块，再通过window.cordova=require('cordova')导入库文件至全局执行环境中。</p>
<h2 id="articleHeader2">模块机制</h2>
<p>类似于Java的package/import，在JavaScript中也有类似的define/require，它用来异步加载module化的js，从而提高运行效率。模块化加载的必要性，起源于nodejs的出现。但是JavaScript并没有内置模块系统，所以就出现了很多规范。&nbsp;主要有2种：<a href="http://wiki.commonjs.org/wiki/Modules/1.1" rel="nofollow noreferrer" target="_blank">CommonJS</a> 和 <a href="http://en.wikipedia.org/wiki/Asynchronous_module_definition" rel="nofollow noreferrer" target="_blank">AMD（Asynchronous Module Definition）</a>。还有国内兴起的<a href="https://github.com/cmdjs/specification/blob/master/draft/module.md" rel="nofollow noreferrer" target="_blank">CMD（Common Module Definition）</a>&nbsp;。CommonJS主要面对的是服务器，代表是<a href="http://nodejs.org/" rel="nofollow noreferrer" target="_blank">Node.js</a>；AMD针对浏览器进行了优化，主要实现<a href="http://www.requirejs.org/" rel="nofollow noreferrer" target="_blank">require.js</a>；CMD是<a href="http://seajs.org/docs/" rel="nofollow noreferrer" target="_blank">seajs</a>。&nbsp;</p>
<p>cordova-js最开始采用的是require.js作者写的<a href="http://github.com/jrburke/almond" rel="nofollow noreferrer" target="_blank">almond.js</a>（兼容AMD和CommonJS），但之后由于特殊需求（比如模块不存在的时候要throw异常），最终从almond.js fork过来实现了一个简易CommonJS风格的模块系统，同时提供了和nodejs之间很好的交互。在cordova.js中可以直接使用define()和require()，在其他文件可以通过cordova.define()和cordova.require()来调用。所以src/scripts/require.js中定义的就是一个精简的JavaScript模块系统。&nbsp;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// cordova.js内部使用的全局函数require/define
var require,
    define;

(function () {
    // 初始化一个空对象，缓存所有的模块
    var modules = {},
    // 正在build中的模块ID的栈
        requireStack = [],
    // 标示正在build中模块ID的Map
        inProgressModules = {},
        SEPARATOR = &quot;.&quot;;

    // 模块build
    function build(module) {
        // 备份工厂方法
        var factory = module.factory,
        // 对require对象进行特殊处理 
            localRequire = function (id) {
                var resultantId = id;
                //Its a relative path, so lop off the last portion and add the id (minus &quot;./&quot;)
                if (id.charAt(0) === &quot;.&quot;) {
                    resultantId = module.id.slice(0, module.id.lastIndexOf(SEPARATOR)) + SEPARATOR + id.slice(2);
                }
                return require(resultantId);
            };
        // 给模块定义一个空的exports对象，防止工厂类方法中的空引用
        module.exports = {};
        // 删除工厂方法
        delete module.factory;
        // 调用备份的工厂方法（参数必须是require,exports,module）  
        factory(localRequire, module.exports, module);
        // 返回工厂方法中实现的module.exports对象
        return module.exports;
    }
    
    // 加载使用模块
    require = function (id) {
        // 如果模块不存在抛出异常 
        if (!modules[id]) {
            throw &quot;module &quot; + id + &quot; not found&quot;;
        // 如果模块正在build中抛出异常
        } else if (id in inProgressModules) {
            var cycle = requireStack.slice(inProgressModules[id]).join('->') + '->' + id;
            throw &quot;Cycle in require graph: &quot; + cycle;
        }
        // 如果模块存在工厂方法说明还未进行build（require嵌套）
        if (modules[id].factory) {
            try {
                // 标示该模块正在build
                inProgressModules[id] = requireStack.length;
                // 将该模块压入请求栈
                requireStack.push(id);
                // 模块build，成功后返回module.exports
                return build(modules[id]);
            } finally {
                // build完成后删除当前请求
                delete inProgressModules[id];
                requireStack.pop();
            }
        }
        // build完的模块直接返回module.exports  
        return modules[id].exports;
    };
    
    // 定义注册模块
    define = function (id, factory) {
        // 如果已经存在抛出异常
        if (modules[id]) {
            throw &quot;module &quot; + id + &quot; already defined&quot;;
        }
        // 模块以ID为索引包含ID和工厂方法
        modules[id] = {
            id: id,
            factory: factory
        };
    };
    
    // 移除模块
    define.remove = function (id) {
        delete modules[id];
    };
    
    // 返回所有模块
    define.moduleMap = modules;
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// cordova.js内部使用的全局函数require/define</span>
<span class="hljs-keyword">var</span> <span class="hljs-built_in">require</span>,
    define;

(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 初始化一个空对象，缓存所有的模块</span>
    <span class="hljs-keyword">var</span> modules = {},
    <span class="hljs-comment">// 正在build中的模块ID的栈</span>
        requireStack = [],
    <span class="hljs-comment">// 标示正在build中模块ID的Map</span>
        inProgressModules = {},
        SEPARATOR = <span class="hljs-string">"."</span>;

    <span class="hljs-comment">// 模块build</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">build</span>(<span class="hljs-params">module</span>) </span>{
        <span class="hljs-comment">// 备份工厂方法</span>
        <span class="hljs-keyword">var</span> factory = <span class="hljs-built_in">module</span>.factory,
        <span class="hljs-comment">// 对require对象进行特殊处理 </span>
            localRequire = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">id</span>) </span>{
                <span class="hljs-keyword">var</span> resultantId = id;
                <span class="hljs-comment">//Its a relative path, so lop off the last portion and add the id (minus "./")</span>
                <span class="hljs-keyword">if</span> (id.charAt(<span class="hljs-number">0</span>) === <span class="hljs-string">"."</span>) {
                    resultantId = <span class="hljs-built_in">module</span>.id.slice(<span class="hljs-number">0</span>, <span class="hljs-built_in">module</span>.id.lastIndexOf(SEPARATOR)) + SEPARATOR + id.slice(<span class="hljs-number">2</span>);
                }
                <span class="hljs-keyword">return</span> <span class="hljs-built_in">require</span>(resultantId);
            };
        <span class="hljs-comment">// 给模块定义一个空的exports对象，防止工厂类方法中的空引用</span>
        <span class="hljs-built_in">module</span>.exports = {};
        <span class="hljs-comment">// 删除工厂方法</span>
        <span class="hljs-keyword">delete</span> <span class="hljs-built_in">module</span>.factory;
        <span class="hljs-comment">// 调用备份的工厂方法（参数必须是require,exports,module）  </span>
        factory(localRequire, <span class="hljs-built_in">module</span>.exports, <span class="hljs-built_in">module</span>);
        <span class="hljs-comment">// 返回工厂方法中实现的module.exports对象</span>
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">module</span>.exports;
    }
    
    <span class="hljs-comment">// 加载使用模块</span>
    <span class="hljs-built_in">require</span> = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">id</span>) </span>{
        <span class="hljs-comment">// 如果模块不存在抛出异常 </span>
        <span class="hljs-keyword">if</span> (!modules[id]) {
            <span class="hljs-keyword">throw</span> <span class="hljs-string">"module "</span> + id + <span class="hljs-string">" not found"</span>;
        <span class="hljs-comment">// 如果模块正在build中抛出异常</span>
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (id <span class="hljs-keyword">in</span> inProgressModules) {
            <span class="hljs-keyword">var</span> cycle = requireStack.slice(inProgressModules[id]).join(<span class="hljs-string">'-&gt;'</span>) + <span class="hljs-string">'-&gt;'</span> + id;
            <span class="hljs-keyword">throw</span> <span class="hljs-string">"Cycle in require graph: "</span> + cycle;
        }
        <span class="hljs-comment">// 如果模块存在工厂方法说明还未进行build（require嵌套）</span>
        <span class="hljs-keyword">if</span> (modules[id].factory) {
            <span class="hljs-keyword">try</span> {
                <span class="hljs-comment">// 标示该模块正在build</span>
                inProgressModules[id] = requireStack.length;
                <span class="hljs-comment">// 将该模块压入请求栈</span>
                requireStack.push(id);
                <span class="hljs-comment">// 模块build，成功后返回module.exports</span>
                <span class="hljs-keyword">return</span> build(modules[id]);
            } <span class="hljs-keyword">finally</span> {
                <span class="hljs-comment">// build完成后删除当前请求</span>
                <span class="hljs-keyword">delete</span> inProgressModules[id];
                requireStack.pop();
            }
        }
        <span class="hljs-comment">// build完的模块直接返回module.exports  </span>
        <span class="hljs-keyword">return</span> modules[id].exports;
    };
    
    <span class="hljs-comment">// 定义注册模块</span>
    define = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">id, factory</span>) </span>{
        <span class="hljs-comment">// 如果已经存在抛出异常</span>
        <span class="hljs-keyword">if</span> (modules[id]) {
            <span class="hljs-keyword">throw</span> <span class="hljs-string">"module "</span> + id + <span class="hljs-string">" already defined"</span>;
        }
        <span class="hljs-comment">// 模块以ID为索引包含ID和工厂方法</span>
        modules[id] = {
            <span class="hljs-attr">id</span>: id,
            <span class="hljs-attr">factory</span>: factory
        };
    };
    
    <span class="hljs-comment">// 移除模块</span>
    define.remove = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">id</span>) </span>{
        <span class="hljs-keyword">delete</span> modules[id];
    };
    
    <span class="hljs-comment">// 返回所有模块</span>
    define.moduleMap = modules;
})();</code></pre>
<p>首先在外部cordova环境中定义require和define两个变量，用来存储实现导入功能的函数和实现注册功能的函数。然后用一个立即调用的匿名函数来实例化这两个变量，在这个匿名函数内部，缓存了所有的功能模块。注册模块时，如果已经注册了，就直接抛出异常，防止无意中重定义，如确实需要重定义，可先调用define.remove。</p>
<p>从内部私有函数build中，可以看出，调用工厂函数时， <code>factory(localRequire, module.exports, module); </code>第一个参数<code>localRequire</code>实质还是调用全局的<code>require()</code>函数，只是把ID稍微加工了一下支持相对路径。cordova.js没有用到相对路径的require，但在一些Plugin的js中有，比如<code>Contact.js</code> 中 <code>ContactError = require('./ContactError'); </code></p>
<p>这里我们写个测试用例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;module.js&quot;></script>
<script type=&quot;text/javascript&quot;>
    define('plugin.first', function (require, exports, module) {
        module.exports = {
            name: 'first plugin',
            show: function () {
                console.log(&quot;call &quot;+this.name);
            }
        }
    });

    define('plugin.second', function (require, exports, module) {
        var first = require(&quot;plugin.first&quot;);
        first.show();
    });

    require(&quot;plugin.second&quot;); 
    // call first plugin
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;script src=<span class="hljs-string">"module.js"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
&lt;script type=<span class="hljs-string">"text/javascript"</span>&gt;
    define(<span class="hljs-string">'plugin.first'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">require, exports, module</span>) </span>{
        <span class="hljs-built_in">module</span>.exports = {
            <span class="hljs-attr">name</span>: <span class="hljs-string">'first plugin'</span>,
            <span class="hljs-attr">show</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"call "</span>+<span class="hljs-keyword">this</span>.name);
            }
        }
    });

    define(<span class="hljs-string">'plugin.second'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">require, exports, module</span>) </span>{
        <span class="hljs-keyword">var</span> first = <span class="hljs-built_in">require</span>(<span class="hljs-string">"plugin.first"</span>);
        first.show();
    });

    <span class="hljs-built_in">require</span>(<span class="hljs-string">"plugin.second"</span>); 
    <span class="hljs-comment">// call first plugin</span>
&lt;<span class="hljs-regexp">/script&gt;</span></code></pre>
<p>注：module.js为上述cordova的模块代码。</p>
<p>上面例子中我们定义了两个模块，这里是写在同一个页面下，在实际中我们自然希望写在两个不同的文件中，然后按需加载。我们上一篇文章中说明了cordova的插件使用方法，我们会发现<code>cordova_plugins.js</code>中定义了cordova插件的id、路径等变量，并且该文件定义了一个id为<code>cordova/plugin_list</code>的模块，我们在cordova.js中可以看到有这个模块的引用。</p>
<p>定义了require和define并赋值后，是将cordova所有模块一一注册，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="define(&quot;cordova&quot;,function(require,exports,module){
  // 工厂函数内部实现代码
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">define(<span class="hljs-string">"cordova"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require,exports,module</span>)</span>{
  <span class="hljs-comment">// 工厂函数内部实现代码</span>
});</code></pre>
<p>这里需要注意的是，<strong>define只是注册模块，不会调用其factory。</strong>factory函数在这个时候并没有实际执行，而只是定义，并作为一个参数传递给define函数。所有模块注册完之后，通过：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.cordova = require('cordova');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">window</span>.cordova = <span class="hljs-built_in">require</span>(<span class="hljs-string">'cordova'</span>);</code></pre>
<p>导入至全局环境。</p>
<p>因为是注册后第一次导入，所以在执行<code>require('cordova')</code>时，<code>modules['cordova'].factory</code>的值是注册时的工厂函数，转变为boolean值时为true，从而在这里会通过build调用这个工厂函数，并将这个工厂函数从注册缓存里面删除，接下来的就是去执行cordova的这个factory函数了。</p>
<h2 id="articleHeader3">事件通道</h2>
<p>作为观察者模式(Observer)的一种变形，很多MV*框架（比如：Vue.js、Backbone.js）中都提供发布/订阅模型来对代码进行解耦。cordova.js中也提供了一个自定义的pub-sub模型，基于该模型提供了一些事件通道，用来控制通道中的事件什么时候以什么样的顺序被调用，以及各个事件通道的调用。</p>
<p>src/common/channel.js的代码结构也是一个很经典的定义结构（构造函数、实例、修改函数原型共享实例方法），它提供事件通道上事件的订阅（subscribe）、撤消订阅（unsubscribe）、调用（fire）。pub-sub模型用于定义和控制对cordova初始化的事件的触发以及此后的自定义事件。</p>
<p>页面加载和Cordova启动期间的事件顺序如下：</p>
<ul>
<li>
<strong>onDOMContentLoaded</strong> ——（内部事件通道）页面加载后DOM解析完成</li>
<li>
<strong>onNativeReady</strong> ——（内部事件通道）Cordova的native准备完成</li>
<li>
<strong>onCordovaReady</strong> ——（内部事件通道）所有Cordova的JavaScript对象被创建完成可以开始加载插件</li>
<li>
<strong>onDeviceReady</strong> —— Cordova全部准备完成</li>
<li>
<strong>onResume</strong> —— 应用重新返回前台</li>
<li>
<strong>onPause</strong> —— 应用暂停退到后台</li>
</ul>
<p>可以通过下面的事件进行监听：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.addEventListener(&quot;deviceready&quot;, myDeviceReadyListener, false);
document.addEventListener(&quot;resume&quot;, myResumeListener, false);
document.addEventListener(&quot;pause&quot;, myPauseListener, false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">"deviceready"</span>, myDeviceReadyListener, <span class="hljs-literal">false</span>);
<span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">"resume"</span>, myResumeListener, <span class="hljs-literal">false</span>);
<span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">"pause"</span>, myPauseListener, <span class="hljs-literal">false</span>);</code></pre>
<p>DOM生命周期事件应用于保存和恢复状态：</p>
<ul>
<li>window.onload</li>
<li>window.onunload</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="define(&quot;cordova/channel&quot;, function(require, exports, module) {

    var utils = require('cordova/utils'),
        nextGuid = 1;

    // 事件通道的构造函数
    var Channel = function(type, sticky) {
        // 通道名称
        this.type = type;
        // 通道上的所有事件处理函数Map（索引为guid）
        this.handlers = {};
        // 通道的状态（0：非sticky, 1:sticky但未调用, 2:sticky已调用）  
        this.state = sticky ? 1 : 0;
        // 对于sticky事件通道备份传给fire()的参数 
        this.fireArgs = null;
        // 当前通道上的事件处理函数的个数
        this.numHandlers = 0;
        // 订阅第一个事件或者取消订阅最后一个事件时调用自定义的处理
        this.onHasSubscribersChange = null;
    },
    // 事件通道外部接口
    channel = {
        // 把指定的函数h订阅到c的各个通道上，保证h在每个通道的最后被执行  
        join: function(h, c) {
            var len = c.length,
                i = len,
                f = function() {
                    if (!(--i)) h();
                };
            for (var j=0; j<len; j++) {
                if (c[j].state === 0) {
                    throw Error('Can only use join with sticky channels.');
                }
                c[j].subscribe(f);
            }
            if (!len) h();
        },
        // 创建事件通道
        create: function(type) {
            return channel[type] = new Channel(type, false);
        },
        // 创建sticky事件通道
        createSticky: function(type) {
            return channel[type] = new Channel(type, true);
        },
    
        // 保存deviceready事件之前要调用的事件
        deviceReadyChannelsArray: [],
        deviceReadyChannelsMap: {},
    
        // 设置deviceready事件之前必须要完成的事件
        waitForInitialization: function(feature) {
            if (feature) {
                var c = channel[feature] || this.createSticky(feature);
                this.deviceReadyChannelsMap[feature] = c;
                this.deviceReadyChannelsArray.push(c);
            }
        },
    
        // 初始化代码已经完成
        initializationComplete: function(feature) {
            var c = this.deviceReadyChannelsMap[feature];
            if (c) {
                c.fire();
            }
        }
    };

    // 校验事件处理函数
    function checkSubscriptionArgument(argument) {
        if (typeof argument !== &quot;function&quot; &amp;&amp; typeof argument.handleEvent !== &quot;function&quot;) {
            throw new Error(
                &quot;Must provide a function or an EventListener object &quot; +
                &quot;implementing the handleEvent interface.&quot;
            );
        }
    }

    /**
     * 向事件通道订阅事件处理函数(subscribe部分）  
     * f:事件处理函数 c:事件的上下文
     */
    Channel.prototype.subscribe = function(eventListenerOrFunction, eventListener) {
        // 校验事件处理函数
        checkSubscriptionArgument(eventListenerOrFunction);
        
        var handleEvent, guid;
    
        if (eventListenerOrFunction &amp;&amp; typeof eventListenerOrFunction === &quot;object&quot;) {
            // 接收到一个实现handleEvent接口的EventListener对象
            handleEvent = eventListenerOrFunction.handleEvent;
            eventListener = eventListenerOrFunction;
        } else {
            // 接收到处理事件的回调函数
            handleEvent = eventListenerOrFunction;
        }
        
        // 如果是被订阅过的sticky事件，就直接调用
        if (this.state == 2) {
            handleEvent.apply(eventListener || this, this.fireArgs);
            return;
        }
    
        guid = eventListenerOrFunction.observer_guid;
        // 如果事件有上下文，要先把事件函数包装一下带上上下文
        if (typeof eventListener === &quot;object&quot;) {
            handleEvent = utils.close(eventListener, handleEvent);
        }
        
        // 自增长的ID
        if (!guid) {
            guid = '' + nextGuid++;
        }
        // 把自增长的ID反向设置给函数，以后撤消订阅或内部查找用
        handleEvent.observer_guid = guid;
        eventListenerOrFunction.observer_guid = guid;
    
        // 判断该guid索引的事件处理函数是否存在（保证订阅一次）
        if (!this.handlers[guid]) {
            // 订阅到该通道上（索引为guid）
            this.handlers[guid] = handleEvent;
            // 通道上的事件处理函数的个数增1 
            this.numHandlers++;
            if (this.numHandlers == 1) {
                // 订阅第一个事件时调用自定义的处理（比如：第一次按下返回按钮提示“再按一次...”） 
                this.onHasSubscribersChange &amp;&amp; this.onHasSubscribersChange();
            }
        }
    };

    /**
     * 撤消订阅通道上的某个函数（guid）
     */
    Channel.prototype.unsubscribe = function(eventListenerOrFunction) {
         // 事件处理函数校验
        checkSubscriptionArgument(eventListenerOrFunction);

        var handleEvent, guid, handler;
    
        if (eventListenerOrFunction &amp;&amp; typeof eventListenerOrFunction === &quot;object&quot;) {
            // 接收到一个实现handleEvent接口的EventListener对象
            handleEvent = eventListenerOrFunction.handleEvent;
        } else {
            // 接收到处理事件的回调函数
            handleEvent = eventListenerOrFunction;
        }

        // 事件处理函数的guid索引
        guid = handleEvent.observer_guid;
        // 事件处理函数
        handler = this.handlers[guid];
        if (handler) {
            // 从该通道上撤消订阅（索引为guid）
            delete this.handlers[guid];
            // 通道上的事件处理函数的个数减1
            this.numHandlers--;
            if (this.numHandlers === 0) {
                // 撤消订阅最后一个事件时调用自定义的处理
                this.onHasSubscribersChange &amp;&amp; this.onHasSubscribersChange();
            }
        }
    };

    /**
     * 调用所有被发布到该通道上的函数
     */
    Channel.prototype.fire = function(e) {
        var fail = false,
            fireArgs = Array.prototype.slice.call(arguments);

        // sticky事件被调用时，标示为已经调用过
        if (this.state == 1) {
            this.state = 2;
            this.fireArgs = fireArgs;
        }
        if (this.numHandlers) {
            // 把该通道上的所有事件处理函数拿出来放到一个数组中
            var toCall = [];
            for (var item in this.handlers) {
                toCall.push(this.handlers[item]);
            }
            // 依次调用通道上的所有事件处理函数
            for (var i = 0; i < toCall.length; ++i) {
                toCall[i].apply(this, fireArgs);
            }
            // sticky事件是一次性全部被调用的，调用完成后就清空
            if (this.state == 2 &amp;&amp; this.numHandlers) {
                this.numHandlers = 0;
                this.handlers = {};
                this.onHasSubscribersChange &amp;&amp; this.onHasSubscribersChange();
            }
        }
    };

    /**
     * 创建事件通道（publish部分）
     */
    //（内部事件通道）页面加载后DOM解析完成
    channel.createSticky('onDOMContentLoaded');
    
    //（内部事件通道）Cordova的native准备完成
    channel.createSticky('onNativeReady');
    
    //（内部事件通道）所有Cordova的JavaScript对象被创建完成可以开始加载插件  
    channel.createSticky('onCordovaReady');
    
    //（内部事件通道）所有自动load的插件js已经被加载完成（待删除）
    channel.createSticky('onPluginsReady');
    
    // Cordova全部准备完成
    channel.createSticky('onDeviceReady');
    
    // 应用重新返回前台
    channel.create('onResume');
    
    // 应用暂停退到后台
    channel.create('onPause');
    
    // 设置deviceready事件之前必须要完成的事件
    channel.waitForInitialization('onCordovaReady');
    channel.waitForInitialization('onDOMContentLoaded');
    
    module.exports = channel;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">define(<span class="hljs-string">"cordova/channel"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require, exports, module</span>) </span>{

    <span class="hljs-keyword">var</span> utils = <span class="hljs-built_in">require</span>(<span class="hljs-string">'cordova/utils'</span>),
        nextGuid = <span class="hljs-number">1</span>;

    <span class="hljs-comment">// 事件通道的构造函数</span>
    <span class="hljs-keyword">var</span> Channel = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">type, sticky</span>) </span>{
        <span class="hljs-comment">// 通道名称</span>
        <span class="hljs-keyword">this</span>.type = type;
        <span class="hljs-comment">// 通道上的所有事件处理函数Map（索引为guid）</span>
        <span class="hljs-keyword">this</span>.handlers = {};
        <span class="hljs-comment">// 通道的状态（0：非sticky, 1:sticky但未调用, 2:sticky已调用）  </span>
        <span class="hljs-keyword">this</span>.state = sticky ? <span class="hljs-number">1</span> : <span class="hljs-number">0</span>;
        <span class="hljs-comment">// 对于sticky事件通道备份传给fire()的参数 </span>
        <span class="hljs-keyword">this</span>.fireArgs = <span class="hljs-literal">null</span>;
        <span class="hljs-comment">// 当前通道上的事件处理函数的个数</span>
        <span class="hljs-keyword">this</span>.numHandlers = <span class="hljs-number">0</span>;
        <span class="hljs-comment">// 订阅第一个事件或者取消订阅最后一个事件时调用自定义的处理</span>
        <span class="hljs-keyword">this</span>.onHasSubscribersChange = <span class="hljs-literal">null</span>;
    },
    <span class="hljs-comment">// 事件通道外部接口</span>
    channel = {
        <span class="hljs-comment">// 把指定的函数h订阅到c的各个通道上，保证h在每个通道的最后被执行  </span>
        join: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">h, c</span>) </span>{
            <span class="hljs-keyword">var</span> len = c.length,
                i = len,
                f = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                    <span class="hljs-keyword">if</span> (!(--i)) h();
                };
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j=<span class="hljs-number">0</span>; j&lt;len; j++) {
                <span class="hljs-keyword">if</span> (c[j].state === <span class="hljs-number">0</span>) {
                    <span class="hljs-keyword">throw</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Can only use join with sticky channels.'</span>);
                }
                c[j].subscribe(f);
            }
            <span class="hljs-keyword">if</span> (!len) h();
        },
        <span class="hljs-comment">// 创建事件通道</span>
        create: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">type</span>) </span>{
            <span class="hljs-keyword">return</span> channel[type] = <span class="hljs-keyword">new</span> Channel(type, <span class="hljs-literal">false</span>);
        },
        <span class="hljs-comment">// 创建sticky事件通道</span>
        createSticky: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">type</span>) </span>{
            <span class="hljs-keyword">return</span> channel[type] = <span class="hljs-keyword">new</span> Channel(type, <span class="hljs-literal">true</span>);
        },
    
        <span class="hljs-comment">// 保存deviceready事件之前要调用的事件</span>
        deviceReadyChannelsArray: [],
        <span class="hljs-attr">deviceReadyChannelsMap</span>: {},
    
        <span class="hljs-comment">// 设置deviceready事件之前必须要完成的事件</span>
        waitForInitialization: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">feature</span>) </span>{
            <span class="hljs-keyword">if</span> (feature) {
                <span class="hljs-keyword">var</span> c = channel[feature] || <span class="hljs-keyword">this</span>.createSticky(feature);
                <span class="hljs-keyword">this</span>.deviceReadyChannelsMap[feature] = c;
                <span class="hljs-keyword">this</span>.deviceReadyChannelsArray.push(c);
            }
        },
    
        <span class="hljs-comment">// 初始化代码已经完成</span>
        initializationComplete: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">feature</span>) </span>{
            <span class="hljs-keyword">var</span> c = <span class="hljs-keyword">this</span>.deviceReadyChannelsMap[feature];
            <span class="hljs-keyword">if</span> (c) {
                c.fire();
            }
        }
    };

    <span class="hljs-comment">// 校验事件处理函数</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkSubscriptionArgument</span>(<span class="hljs-params">argument</span>) </span>{
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> argument !== <span class="hljs-string">"function"</span> &amp;&amp; <span class="hljs-keyword">typeof</span> argument.handleEvent !== <span class="hljs-string">"function"</span>) {
            <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(
                <span class="hljs-string">"Must provide a function or an EventListener object "</span> +
                <span class="hljs-string">"implementing the handleEvent interface."</span>
            );
        }
    }

    <span class="hljs-comment">/**
     * 向事件通道订阅事件处理函数(subscribe部分）  
     * f:事件处理函数 c:事件的上下文
     */</span>
    Channel.prototype.subscribe = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">eventListenerOrFunction, eventListener</span>) </span>{
        <span class="hljs-comment">// 校验事件处理函数</span>
        checkSubscriptionArgument(eventListenerOrFunction);
        
        <span class="hljs-keyword">var</span> handleEvent, guid;
    
        <span class="hljs-keyword">if</span> (eventListenerOrFunction &amp;&amp; <span class="hljs-keyword">typeof</span> eventListenerOrFunction === <span class="hljs-string">"object"</span>) {
            <span class="hljs-comment">// 接收到一个实现handleEvent接口的EventListener对象</span>
            handleEvent = eventListenerOrFunction.handleEvent;
            eventListener = eventListenerOrFunction;
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">// 接收到处理事件的回调函数</span>
            handleEvent = eventListenerOrFunction;
        }
        
        <span class="hljs-comment">// 如果是被订阅过的sticky事件，就直接调用</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.state == <span class="hljs-number">2</span>) {
            handleEvent.apply(eventListener || <span class="hljs-keyword">this</span>, <span class="hljs-keyword">this</span>.fireArgs);
            <span class="hljs-keyword">return</span>;
        }
    
        guid = eventListenerOrFunction.observer_guid;
        <span class="hljs-comment">// 如果事件有上下文，要先把事件函数包装一下带上上下文</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> eventListener === <span class="hljs-string">"object"</span>) {
            handleEvent = utils.close(eventListener, handleEvent);
        }
        
        <span class="hljs-comment">// 自增长的ID</span>
        <span class="hljs-keyword">if</span> (!guid) {
            guid = <span class="hljs-string">''</span> + nextGuid++;
        }
        <span class="hljs-comment">// 把自增长的ID反向设置给函数，以后撤消订阅或内部查找用</span>
        handleEvent.observer_guid = guid;
        eventListenerOrFunction.observer_guid = guid;
    
        <span class="hljs-comment">// 判断该guid索引的事件处理函数是否存在（保证订阅一次）</span>
        <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.handlers[guid]) {
            <span class="hljs-comment">// 订阅到该通道上（索引为guid）</span>
            <span class="hljs-keyword">this</span>.handlers[guid] = handleEvent;
            <span class="hljs-comment">// 通道上的事件处理函数的个数增1 </span>
            <span class="hljs-keyword">this</span>.numHandlers++;
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.numHandlers == <span class="hljs-number">1</span>) {
                <span class="hljs-comment">// 订阅第一个事件时调用自定义的处理（比如：第一次按下返回按钮提示“再按一次...”） </span>
                <span class="hljs-keyword">this</span>.onHasSubscribersChange &amp;&amp; <span class="hljs-keyword">this</span>.onHasSubscribersChange();
            }
        }
    };

    <span class="hljs-comment">/**
     * 撤消订阅通道上的某个函数（guid）
     */</span>
    Channel.prototype.unsubscribe = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">eventListenerOrFunction</span>) </span>{
         <span class="hljs-comment">// 事件处理函数校验</span>
        checkSubscriptionArgument(eventListenerOrFunction);

        <span class="hljs-keyword">var</span> handleEvent, guid, handler;
    
        <span class="hljs-keyword">if</span> (eventListenerOrFunction &amp;&amp; <span class="hljs-keyword">typeof</span> eventListenerOrFunction === <span class="hljs-string">"object"</span>) {
            <span class="hljs-comment">// 接收到一个实现handleEvent接口的EventListener对象</span>
            handleEvent = eventListenerOrFunction.handleEvent;
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">// 接收到处理事件的回调函数</span>
            handleEvent = eventListenerOrFunction;
        }

        <span class="hljs-comment">// 事件处理函数的guid索引</span>
        guid = handleEvent.observer_guid;
        <span class="hljs-comment">// 事件处理函数</span>
        handler = <span class="hljs-keyword">this</span>.handlers[guid];
        <span class="hljs-keyword">if</span> (handler) {
            <span class="hljs-comment">// 从该通道上撤消订阅（索引为guid）</span>
            <span class="hljs-keyword">delete</span> <span class="hljs-keyword">this</span>.handlers[guid];
            <span class="hljs-comment">// 通道上的事件处理函数的个数减1</span>
            <span class="hljs-keyword">this</span>.numHandlers--;
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.numHandlers === <span class="hljs-number">0</span>) {
                <span class="hljs-comment">// 撤消订阅最后一个事件时调用自定义的处理</span>
                <span class="hljs-keyword">this</span>.onHasSubscribersChange &amp;&amp; <span class="hljs-keyword">this</span>.onHasSubscribersChange();
            }
        }
    };

    <span class="hljs-comment">/**
     * 调用所有被发布到该通道上的函数
     */</span>
    Channel.prototype.fire = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
        <span class="hljs-keyword">var</span> fail = <span class="hljs-literal">false</span>,
            fireArgs = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>);

        <span class="hljs-comment">// sticky事件被调用时，标示为已经调用过</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.state == <span class="hljs-number">1</span>) {
            <span class="hljs-keyword">this</span>.state = <span class="hljs-number">2</span>;
            <span class="hljs-keyword">this</span>.fireArgs = fireArgs;
        }
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.numHandlers) {
            <span class="hljs-comment">// 把该通道上的所有事件处理函数拿出来放到一个数组中</span>
            <span class="hljs-keyword">var</span> toCall = [];
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> item <span class="hljs-keyword">in</span> <span class="hljs-keyword">this</span>.handlers) {
                toCall.push(<span class="hljs-keyword">this</span>.handlers[item]);
            }
            <span class="hljs-comment">// 依次调用通道上的所有事件处理函数</span>
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; toCall.length; ++i) {
                toCall[i].apply(<span class="hljs-keyword">this</span>, fireArgs);
            }
            <span class="hljs-comment">// sticky事件是一次性全部被调用的，调用完成后就清空</span>
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.state == <span class="hljs-number">2</span> &amp;&amp; <span class="hljs-keyword">this</span>.numHandlers) {
                <span class="hljs-keyword">this</span>.numHandlers = <span class="hljs-number">0</span>;
                <span class="hljs-keyword">this</span>.handlers = {};
                <span class="hljs-keyword">this</span>.onHasSubscribersChange &amp;&amp; <span class="hljs-keyword">this</span>.onHasSubscribersChange();
            }
        }
    };

    <span class="hljs-comment">/**
     * 创建事件通道（publish部分）
     */</span>
    <span class="hljs-comment">//（内部事件通道）页面加载后DOM解析完成</span>
    channel.createSticky(<span class="hljs-string">'onDOMContentLoaded'</span>);
    
    <span class="hljs-comment">//（内部事件通道）Cordova的native准备完成</span>
    channel.createSticky(<span class="hljs-string">'onNativeReady'</span>);
    
    <span class="hljs-comment">//（内部事件通道）所有Cordova的JavaScript对象被创建完成可以开始加载插件  </span>
    channel.createSticky(<span class="hljs-string">'onCordovaReady'</span>);
    
    <span class="hljs-comment">//（内部事件通道）所有自动load的插件js已经被加载完成（待删除）</span>
    channel.createSticky(<span class="hljs-string">'onPluginsReady'</span>);
    
    <span class="hljs-comment">// Cordova全部准备完成</span>
    channel.createSticky(<span class="hljs-string">'onDeviceReady'</span>);
    
    <span class="hljs-comment">// 应用重新返回前台</span>
    channel.create(<span class="hljs-string">'onResume'</span>);
    
    <span class="hljs-comment">// 应用暂停退到后台</span>
    channel.create(<span class="hljs-string">'onPause'</span>);
    
    <span class="hljs-comment">// 设置deviceready事件之前必须要完成的事件</span>
    channel.waitForInitialization(<span class="hljs-string">'onCordovaReady'</span>);
    channel.waitForInitialization(<span class="hljs-string">'onDOMContentLoaded'</span>);
    
    <span class="hljs-built_in">module</span>.exports = channel;
});</code></pre>
<p>我们可以写一个测试用例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;channel.js&quot;></script>
<script type=&quot;text/javascript&quot;>
    var test = channel.create('onTest');
    // 订阅事件（此处test = channel.onTest）
    test.subscribe(function () {
        console.log('test fire');
    });
    // 触发事件（此处test = channel.onTest）
    test.fire();
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;script src=<span class="hljs-string">"channel.js"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
&lt;script type=<span class="hljs-string">"text/javascript"</span>&gt;
    <span class="hljs-keyword">var</span> test = channel.create(<span class="hljs-string">'onTest'</span>);
    <span class="hljs-comment">// 订阅事件（此处test = channel.onTest）</span>
    test.subscribe(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'test fire'</span>);
    });
    <span class="hljs-comment">// 触发事件（此处test = channel.onTest）</span>
    test.fire();
<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>但是很多时候我们希望能够传递参数，通过阅读上面的源码可以得知：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (eventListenerOrFunction &amp;&amp; typeof eventListenerOrFunction === &quot;object&quot;) {
    // 接收到一个实现handleEvent接口的EventListener对象
    handleEvent = eventListenerOrFunction.handleEvent;
   eventListener = eventListenerOrFunction;
} else {
   // 接收到处理事件的回调函数
   handleEvent = eventListenerOrFunction;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (eventListenerOrFunction &amp;&amp; <span class="hljs-keyword">typeof</span> eventListenerOrFunction === <span class="hljs-string">"object"</span>) {
    <span class="hljs-comment">// 接收到一个实现handleEvent接口的EventListener对象</span>
    handleEvent = eventListenerOrFunction.handleEvent;
   eventListener = eventListenerOrFunction;
} <span class="hljs-keyword">else</span> {
   <span class="hljs-comment">// 接收到处理事件的回调函数</span>
   handleEvent = eventListenerOrFunction;
}</code></pre>
<p>我们上面的例子中我们传递的是一个方法，这里我们也可以传递一个EventListener对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 创建事件通道
channel.create('onTest');

// 订阅事件
channel.onTest.subscribe(function (event) {
  console.log(event);
  console.log(event.data.name+' fire');
});

// 创建 Event 对象
var event = document.createEvent('Events');
// 初始化事件
event.initEvent('onTest', false, false);
// 绑定数据
event.data = {name: 'test'};
// 触发事件
channel.onTest.fire(event);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 创建事件通道</span>
channel.create(<span class="hljs-string">'onTest'</span>);

<span class="hljs-comment">// 订阅事件</span>
channel.onTest.subscribe(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
  <span class="hljs-built_in">console</span>.log(event);
  <span class="hljs-built_in">console</span>.log(event.data.name+<span class="hljs-string">' fire'</span>);
});

<span class="hljs-comment">// 创建 Event 对象</span>
<span class="hljs-keyword">var</span> event = <span class="hljs-built_in">document</span>.createEvent(<span class="hljs-string">'Events'</span>);
<span class="hljs-comment">// 初始化事件</span>
event.initEvent(<span class="hljs-string">'onTest'</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>);
<span class="hljs-comment">// 绑定数据</span>
event.data = {<span class="hljs-attr">name</span>: <span class="hljs-string">'test'</span>};
<span class="hljs-comment">// 触发事件</span>
channel.onTest.fire(event);</code></pre>
<h2 id="articleHeader4">工具模块</h2>
<p>我们在写插件的时候如果熟悉cordova自带的工具函数，可以更加方便的拓展自己的插件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="define(&quot;cordova/utils&quot;, function(require, exports, module) {
    var utils = exports;
    // 定义对象属性（或方法）的setter/getter
    utils.defineGetterSetter = function(obj, key, getFunc, opt_setFunc) {...}
    // 定义对象属性（或方法）的getter
    utils.defineGetter = utils.defineGetterSetter;
    // Array IndexOf 方法
    utils.arrayIndexOf = function(a, item) {...}
    // Array remove 方法
    utils.arrayRemove = function(a, item) {...}
    // 类型判断
    utils.typeName = function(val) {...}
    // 数组判断
    utils.isArray = Array.isArray ||
        function(a) {return utils.typeName(a) == 'Array';};
    // Date判断
    utils.isDate = function(d) {...}
    // 深度拷贝
    utils.clone = function(obj) {...}
    // 函数包装调用
    utils.close = function(context, func, params) {...}
    // 内部私有函数，产生随机数
    function UUIDcreatePart(length) {...}
    // 创建 UUID (通用唯一识别码)
    utils.createUUID = function() {...}
    // 继承
    utils.extend = function() {...}
    // 调试
    utils.alert = function(msg) {...}
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">define(<span class="hljs-string">"cordova/utils"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require, exports, module</span>) </span>{
    <span class="hljs-keyword">var</span> utils = exports;
    <span class="hljs-comment">// 定义对象属性（或方法）的setter/getter</span>
    utils.defineGetterSetter = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj, key, getFunc, opt_setFunc</span>) </span>{...}
    <span class="hljs-comment">// 定义对象属性（或方法）的getter</span>
    utils.defineGetter = utils.defineGetterSetter;
    <span class="hljs-comment">// Array IndexOf 方法</span>
    utils.arrayIndexOf = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a, item</span>) </span>{...}
    <span class="hljs-comment">// Array remove 方法</span>
    utils.arrayRemove = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a, item</span>) </span>{...}
    <span class="hljs-comment">// 类型判断</span>
    utils.typeName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">val</span>) </span>{...}
    <span class="hljs-comment">// 数组判断</span>
    utils.isArray = <span class="hljs-built_in">Array</span>.isArray ||
        <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a</span>) </span>{<span class="hljs-keyword">return</span> utils.typeName(a) == <span class="hljs-string">'Array'</span>;};
    <span class="hljs-comment">// Date判断</span>
    utils.isDate = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">d</span>) </span>{...}
    <span class="hljs-comment">// 深度拷贝</span>
    utils.clone = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>) </span>{...}
    <span class="hljs-comment">// 函数包装调用</span>
    utils.close = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">context, func, params</span>) </span>{...}
    <span class="hljs-comment">// 内部私有函数，产生随机数</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">UUIDcreatePart</span>(<span class="hljs-params">length</span>) </span>{...}
    <span class="hljs-comment">// 创建 UUID (通用唯一识别码)</span>
    utils.createUUID = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{...}
    <span class="hljs-comment">// 继承</span>
    utils.extend = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{...}
    <span class="hljs-comment">// 调试</span>
    utils.alert = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg</span>) </span>{...}
});</code></pre>
<ul>
<li>UUIDcreatePart函数用来随机产生一个16进制的号码，接受一个表示号码长度的参数（实际上是最终号码长度的一半），一般用途是做为元素的唯一ID。</li>
<li>utils.isArray 在这里不使用instanceof来判断是不是Array类型，主要是考虑到跨域或者多个frame的情况，多个frame时每个frame都会有自己的Array构造函数，从而得出不正确的结论。使用'[object Array]'来判断是根据ECMA标准中的返回值来进行的，事实上，这里不需要类型转换，而可以用全等“===”来判断。</li>
<li>utils.close函数，封装函数的调用，将执行环境作为一个参数，调用的函数为第二个参数，调用函数本身的参数为后续参数。</li>
</ul>
<p><strong>原型继承实现详解</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="utils.extend = (function() {
    // proxy used to establish prototype chain
    var F = function() {};
    // extend Child from Parent
    return function(Child, Parent) {
        F.prototype = Parent.prototype;
        Child.prototype = new F();
        Child.__super__ = Parent.prototype;
        Child.prototype.constructor = Child;
    };
}());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">utils.extend = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// proxy used to establish prototype chain</span>
    <span class="hljs-keyword">var</span> F = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{};
    <span class="hljs-comment">// extend Child from Parent</span>
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">Child, Parent</span>) </span>{
        F.prototype = Parent.prototype;
        Child.prototype = <span class="hljs-keyword">new</span> F();
        Child.__super__ = Parent.prototype;
        Child.prototype.constructor = Child;
    };
}());</code></pre>
<p>这里的继承是通过原型链的方式实现，我们可以通过下述方式调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Parent = function () {
    this.name = 'Parent';
}
Parent.prototype.getName = function () {
    return this.name;
}
var Child = function () {
    this.name = 'Child';
}

utils.extend(Child, Parent);

var child = new Child();
console.log(child.getName())" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> Parent = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">'Parent'</span>;
}
Parent.prototype.getName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
}
<span class="hljs-keyword">var</span> Child = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">'Child'</span>;
}

utils.extend(Child, Parent);

<span class="hljs-keyword">var</span> child = <span class="hljs-keyword">new</span> Child();
<span class="hljs-built_in">console</span>.log(child.getName())</code></pre>
<p>ES5中有一个<a href="https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/create" rel="nofollow noreferrer" target="_blank">Object.create</a>方法，我们可以使用这个函数实现继承：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 创建一个新的对象
Object.create = Object.create || function (proto) {
    var F = function () {};
    F.prototype = proto;
    return new F();
}

// 实现继承
var extend = function(Child, Parent) {
    // 拷贝Parent原型对象
    Child.prototype = Object.create(Parent.prototype);
    // 将Child构造函数赋值给Child的原型对象
    Child.prototype.constructor = Child;
}

// 实例
var Parent = function () {
    this.name = 'Parent';
}
Parent.prototype.getName = function () {
    return this.name;
}
var Child = function () {
    this.name = 'Child';
}
extend(Child, Parent);
var child = new Child();
console.log(child.getName())" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 创建一个新的对象</span>
<span class="hljs-built_in">Object</span>.create = <span class="hljs-built_in">Object</span>.create || <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">proto</span>) </span>{
    <span class="hljs-keyword">var</span> F = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{};
    F.prototype = proto;
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> F();
}

<span class="hljs-comment">// 实现继承</span>
<span class="hljs-keyword">var</span> extend = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">Child, Parent</span>) </span>{
    <span class="hljs-comment">// 拷贝Parent原型对象</span>
    Child.prototype = <span class="hljs-built_in">Object</span>.create(Parent.prototype);
    <span class="hljs-comment">// 将Child构造函数赋值给Child的原型对象</span>
    Child.prototype.constructor = Child;
}

<span class="hljs-comment">// 实例</span>
<span class="hljs-keyword">var</span> Parent = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">'Parent'</span>;
}
Parent.prototype.getName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
}
<span class="hljs-keyword">var</span> Child = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">'Child'</span>;
}
extend(Child, Parent);
<span class="hljs-keyword">var</span> child = <span class="hljs-keyword">new</span> Child();
<span class="hljs-built_in">console</span>.log(child.getName())</code></pre>
<p>原型链的概念对于初学者而言可能有点绕，但是我们把握<strong>构造函数</strong>、<strong>实例化对象</strong>、<strong>原型对象</strong>三者的关系就很简单了。我们以此为例说明：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 构造函数
var Child = function () {
    this.name = 'Child';
}
// 原型对象Child.prototype
Child.prototype.getName = function () {
    return this.name;
}
// 实例化对象
var child = new Child();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 构造函数</span>
<span class="hljs-keyword">var</span> Child = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">'Child'</span>;
}
<span class="hljs-comment">// 原型对象Child.prototype</span>
Child.prototype.getName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
}
<span class="hljs-comment">// 实例化对象</span>
<span class="hljs-keyword">var</span> child = <span class="hljs-keyword">new</span> Child();</code></pre>
<ul>
<li>原型对象是构造函数的prototype属性，是所有实例化对象共享属性和方法的原型对象。</li>
<li>实例化对象通过new构造函数得到，都继承了原型对象的属性和方法。</li>
<li>如何访（qiu）问（jie）原型对象？若已知构造函数Child，则可以通过<code>Child.prototype</code>得到；若已知实例化对象child，则可以通过<code>child.__proto__</code>或者<code>Object.getPrototypeOf(child)</code>得到，也通过Object.setPrototypeOf方法来重写对象的原型。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Child.prototype === child.__proto__  // true
child.__proto__ === Object.getPrototypeOf(child) // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Child.prototype === child.__proto__  <span class="hljs-comment">// true</span>
child.__proto__ === <span class="hljs-built_in">Object</span>.getPrototypeOf(child) <span class="hljs-comment">// true</span></code></pre>
<ul>
<li>原型对象中有个隐式的constructor，指向了构造函数本身，也就是我们可以通过<code>Child.prototype.constructor</code>（虽然看似多此一举，但是经常需要重新设置构造函数）或<code>child.__proto__.constructor</code>或者<code>Object.getPrototypeOf(child).constructor</code>得到构造函数。</li>
<li>instanceof和Object.isPrototypeOf()可以判断两个对象是否是继承关系</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="child instanceof Child  // true
Child.prototype.isPrototypeOf(child) // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">child <span class="hljs-keyword">instanceof</span> Child  <span class="hljs-comment">// true</span>
Child.prototype.isPrototypeOf(child) <span class="hljs-comment">// true</span></code></pre>
<p>至此<strong>构造函数</strong>、<strong>实例化对象</strong>、<strong>原型对象</strong>三者的关系我们已经很清除了，再回过头看看上面继承的实现就很简单了。</p>
<p>我们可以通过<code>instanceof</code>来检验是否满足继承关系：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="child instanceof Child &amp;&amp; child instanceof Parent  // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">child <span class="hljs-keyword">instanceof</span> Child &amp;&amp; child <span class="hljs-keyword">instanceof</span> Parent  <span class="hljs-comment">// true</span></code></pre>
<p>其实上述继承的思路很简单：<br>1.首先获得父类原型对象的方法，这里的F对象作为中间变量引用拷贝Parent.prototype对象（即和Parent.prototype共享同一内存空间）；例如我们修改上述的Object.create为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.create = function (proto) {
    var F = function () {};
    F.prototype = proto;
    F.prototype.setName = function(name){
        this.name = name;
    }
    return new F();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">Object</span>.create = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">proto</span>) </span>{
    <span class="hljs-keyword">var</span> F = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{};
    F.prototype = proto;
    F.prototype.setName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name</span>)</span>{
        <span class="hljs-keyword">this</span>.name = name;
    }
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> F();
}</code></pre>
<p>此时Parent.prototype、Child.prototype、child都拥有的setName方法，但是我们应当避免这样做，这也是为什么我们不直接通过<code>Child.prototype = Parent.prototype</code>获得；通过实例化中间对象F间接得到Parent.prototype的方法，此时通过Object.create方法获得的对象和Parent.prototype不再是共享内存空间。Child通过<code>extend(Child, Parent)</code>从Parent.prototype对象获得一份新的拷贝。实质是因为我们通过new一个构造函数获得的实例化对象是获得了一个新的内存空间，子对象互不影响；<br>2.对子类进行修正，我们通过拷贝获得了父类的一个备份，此时子类原型对象下的constructor属性依然是父类的构造函数，显然不符合我们的要求，我们需要重置，同时有时候我们希望保留对父类的引用，如cordova这里用一个<code>__super__</code>属性保存。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Child.__super__ = Parent.prototype;
Child.prototype.constructor = Child;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Child.__super__ = Parent.prototype;
Child.prototype.constructor = Child;</code></pre>
<p>其实继承的本质我们是希望能实现以下功能：</p>
<ul>
<li>父类有的我都有，我也能重载，但不至于影响到父类的属性和方法</li>
<li>除了继承之外，我也能添加自己的方法和属性</li>
</ul>
<p>我们可以利用es6新特性实现同样的效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Parent {
    constructor () {
        this.name = 'Parent';
    }
    getName () {
        return this.name;
    }
}

class Child extends Parent {
    constructor () {
        super();
        this.name = 'Child';
    }
}

var child = new Child();
console.log(child.getName())" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Parent</span> </span>{
    <span class="hljs-keyword">constructor</span> () {
        <span class="hljs-keyword">this</span>.name = <span class="hljs-string">'Parent'</span>;
    }
    getName () {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
    }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Child</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Parent</span> </span>{
    <span class="hljs-keyword">constructor</span> () {
        <span class="hljs-keyword">super</span>();
        <span class="hljs-keyword">this</span>.name = <span class="hljs-string">'Child'</span>;
    }
}

<span class="hljs-keyword">var</span> child = <span class="hljs-keyword">new</span> Child();
<span class="hljs-built_in">console</span>.log(child.getName())</code></pre>
<p>super关键字在这里表示父类的构造函数，用来新建父类的this对象。在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错。这是因为子类实例的构建，是基于对父类实例加工，只有super方法才能返回父类实例。</p>
<h2 id="articleHeader5">cordova 模块</h2>
<p>本文最后一部分我们来看看cordova模块，cordova模块是事件的处理和回调，外部访问cordova.js的入口。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="define(&quot;cordova&quot;, function(require, exports, module) {
  if (window.cordova &amp;&amp; !(window.cordova instanceof HTMLElement)) {
    throw new Error(&quot;cordova already defined&quot;);
  }
  // 导入事件通道模块
  var channel = require('cordova/channel');
  // 导入平台模块
  var platform = require('cordova/platform');
  // 保存addEventListener、removeEventListener的原生实现
  var m_document_addEventListener = document.addEventListener;
  var m_document_removeEventListener = document.removeEventListener;
  var m_window_addEventListener = window.addEventListener;
  var m_window_removeEventListener = window.removeEventListener;

  // 缓存所有的事件处理函数
  var documentEventHandlers = {},
      windowEventHandlers = {};
  
  // 重新定义addEventListener、removeEventListener，方便后面注册添加pause、resume、deviceReady等事件
  document.addEventListener = function(evt, handler, capture) {...}
  window.addEventListener = function(evt, handler, capture) {...}
  document.removeEventListener = function(evt, handler, capture) {...}
  window.removeEventListener = function(evt, handler, capture) {...}
  function createEvent(type, data) {...}

  var cordova = {
    define: define,
    require: require,
    version: PLATFORM_VERSION_BUILD_LABEL,
    platformVersion: PLATFORM_VERSION_BUILD_LABEL,
    platformId: platform.id,
    addWindowEventHandler: function(event) {...},
    addStickyDocumentEventHandler: function(event) {...},
    addDocumentEventHandler: function(event) {...},
    removeWindowEventHandler: function(event) {...},
    removeDocumentEventHandler: function(event) {...},
    getOriginalHandlers: function() {...},
    fireDocumentEvent: function(type, data, bNoDetach) {...},
    fireWindowEvent: function(type, data) {...},
    callbackId: Math.floor(Math.random() * 2000000000),
    callbacks: {},
    callbackStatus: {},
    callbackSuccess: function(callbackId, args) {...},
    callbackError: function(callbackId, args) {...},
    callbackFromNative: function(callbackId, isSuccess, status, args, keepCallback) {...},
    addConstructor: function(func) {...}
  }
  // 暴露cordova对象给外部
  module.exports = cordova;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">define(<span class="hljs-string">"cordova"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require, exports, module</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.cordova &amp;&amp; !(<span class="hljs-built_in">window</span>.cordova <span class="hljs-keyword">instanceof</span> HTMLElement)) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">"cordova already defined"</span>);
  }
  <span class="hljs-comment">// 导入事件通道模块</span>
  <span class="hljs-keyword">var</span> channel = <span class="hljs-built_in">require</span>(<span class="hljs-string">'cordova/channel'</span>);
  <span class="hljs-comment">// 导入平台模块</span>
  <span class="hljs-keyword">var</span> platform = <span class="hljs-built_in">require</span>(<span class="hljs-string">'cordova/platform'</span>);
  <span class="hljs-comment">// 保存addEventListener、removeEventListener的原生实现</span>
  <span class="hljs-keyword">var</span> m_document_addEventListener = <span class="hljs-built_in">document</span>.addEventListener;
  <span class="hljs-keyword">var</span> m_document_removeEventListener = <span class="hljs-built_in">document</span>.removeEventListener;
  <span class="hljs-keyword">var</span> m_window_addEventListener = <span class="hljs-built_in">window</span>.addEventListener;
  <span class="hljs-keyword">var</span> m_window_removeEventListener = <span class="hljs-built_in">window</span>.removeEventListener;

  <span class="hljs-comment">// 缓存所有的事件处理函数</span>
  <span class="hljs-keyword">var</span> documentEventHandlers = {},
      windowEventHandlers = {};
  
  <span class="hljs-comment">// 重新定义addEventListener、removeEventListener，方便后面注册添加pause、resume、deviceReady等事件</span>
  <span class="hljs-built_in">document</span>.addEventListener = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">evt, handler, capture</span>) </span>{...}
  <span class="hljs-built_in">window</span>.addEventListener = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">evt, handler, capture</span>) </span>{...}
  <span class="hljs-built_in">document</span>.removeEventListener = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">evt, handler, capture</span>) </span>{...}
  <span class="hljs-built_in">window</span>.removeEventListener = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">evt, handler, capture</span>) </span>{...}
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createEvent</span>(<span class="hljs-params">type, data</span>) </span>{...}

  <span class="hljs-keyword">var</span> cordova = {
    <span class="hljs-attr">define</span>: define,
    <span class="hljs-attr">require</span>: <span class="hljs-built_in">require</span>,
    <span class="hljs-attr">version</span>: PLATFORM_VERSION_BUILD_LABEL,
    <span class="hljs-attr">platformVersion</span>: PLATFORM_VERSION_BUILD_LABEL,
    <span class="hljs-attr">platformId</span>: platform.id,
    <span class="hljs-attr">addWindowEventHandler</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{...},
    <span class="hljs-attr">addStickyDocumentEventHandler</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{...},
    <span class="hljs-attr">addDocumentEventHandler</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{...},
    <span class="hljs-attr">removeWindowEventHandler</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{...},
    <span class="hljs-attr">removeDocumentEventHandler</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{...},
    <span class="hljs-attr">getOriginalHandlers</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{...},
    <span class="hljs-attr">fireDocumentEvent</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">type, data, bNoDetach</span>) </span>{...},
    <span class="hljs-attr">fireWindowEvent</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">type, data</span>) </span>{...},
    <span class="hljs-attr">callbackId</span>: <span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">2000000000</span>),
    <span class="hljs-attr">callbacks</span>: {},
    <span class="hljs-attr">callbackStatus</span>: {},
    <span class="hljs-attr">callbackSuccess</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">callbackId, args</span>) </span>{...},
    <span class="hljs-attr">callbackError</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">callbackId, args</span>) </span>{...},
    <span class="hljs-attr">callbackFromNative</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">callbackId, isSuccess, status, args, keepCallback</span>) </span>{...},
    <span class="hljs-attr">addConstructor</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">func</span>) </span>{...}
  }
  <span class="hljs-comment">// 暴露cordova对象给外部</span>
  <span class="hljs-built_in">module</span>.exports = cordova;
});</code></pre>
<p>这里我们以document Event为例说明一下cordova模块中关于事件的处理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 保存addEventListener、removeEventListener的原生实现
var m_document_addEventListener = document.addEventListener;
var m_document_removeEventListener = document.removeEventListener;
// 缓存事件处理函数
var documentEventHandlers = {};
// 重新定义addEventListener
document.addEventListener = function(evt, handler, capture) {
    var e = evt.toLowerCase();
    if (typeof documentEventHandlers[e] != 'undefined') {
        documentEventHandlers[e].subscribe(handler);
    } else {
        m_document_addEventListener.call(document, evt, handler, capture);
    }
};
// 重新定义removeEventListener
document.removeEventListener = function(evt, handler, capture) {
    var e = evt.toLowerCase();
    // If unsubscribing from an event that is handled by a plugin
    if (typeof documentEventHandlers[e] != &quot;undefined&quot;) {
        documentEventHandlers[e].unsubscribe(handler);
    } else {
        m_document_removeEventListener.call(document, evt, handler, capture);
    }
};
// 创建 Event 对象
function createEvent(type, data) {
    var event = document.createEvent('Events');
    event.initEvent(type, false, false);
    if (data) {
        for (var i in data) {
            if (data.hasOwnProperty(i)) {
                event[i] = data[i];
            }
        }
    }
    return event;
}
var codova = {
    ...
    // 创建事件通道
    addStickyDocumentEventHandler:function(event) {
        return (documentEventHandlers[event] = channel.createSticky(event));
    },
    addDocumentEventHandler:function(event) {
        return (documentEventHandlers[event] = channel.create(event));
    },
    // 取消事件通道
    removeDocumentEventHandler:function(event) {
        delete documentEventHandlers[event];
    },
    // 发布事件消息
    fireDocumentEvent: function(type, data, bNoDetach) {
        var evt = createEvent(type, data);
        if (typeof documentEventHandlers[type] != 'undefined') {
            if( bNoDetach ) {
                documentEventHandlers[type].fire(evt);
            }
            else {
                setTimeout(function() {
                    // Fire deviceready on listeners that were registered before cordova.js was loaded.
                    if (type == 'deviceready') {
                        document.dispatchEvent(evt);
                    }
                    documentEventHandlers[type].fire(evt);
                }, 0);
            }
        } else {
            document.dispatchEvent(evt);
        }
    },
    ...
}
module.exports = cordova;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 保存addEventListener、removeEventListener的原生实现</span>
<span class="hljs-keyword">var</span> m_document_addEventListener = <span class="hljs-built_in">document</span>.addEventListener;
<span class="hljs-keyword">var</span> m_document_removeEventListener = <span class="hljs-built_in">document</span>.removeEventListener;
<span class="hljs-comment">// 缓存事件处理函数</span>
<span class="hljs-keyword">var</span> documentEventHandlers = {};
<span class="hljs-comment">// 重新定义addEventListener</span>
<span class="hljs-built_in">document</span>.addEventListener = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">evt, handler, capture</span>) </span>{
    <span class="hljs-keyword">var</span> e = evt.toLowerCase();
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> documentEventHandlers[e] != <span class="hljs-string">'undefined'</span>) {
        documentEventHandlers[e].subscribe(handler);
    } <span class="hljs-keyword">else</span> {
        m_document_addEventListener.call(<span class="hljs-built_in">document</span>, evt, handler, capture);
    }
};
<span class="hljs-comment">// 重新定义removeEventListener</span>
<span class="hljs-built_in">document</span>.removeEventListener = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">evt, handler, capture</span>) </span>{
    <span class="hljs-keyword">var</span> e = evt.toLowerCase();
    <span class="hljs-comment">// If unsubscribing from an event that is handled by a plugin</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> documentEventHandlers[e] != <span class="hljs-string">"undefined"</span>) {
        documentEventHandlers[e].unsubscribe(handler);
    } <span class="hljs-keyword">else</span> {
        m_document_removeEventListener.call(<span class="hljs-built_in">document</span>, evt, handler, capture);
    }
};
<span class="hljs-comment">// 创建 Event 对象</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createEvent</span>(<span class="hljs-params">type, data</span>) </span>{
    <span class="hljs-keyword">var</span> event = <span class="hljs-built_in">document</span>.createEvent(<span class="hljs-string">'Events'</span>);
    event.initEvent(type, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>);
    <span class="hljs-keyword">if</span> (data) {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> data) {
            <span class="hljs-keyword">if</span> (data.hasOwnProperty(i)) {
                event[i] = data[i];
            }
        }
    }
    <span class="hljs-keyword">return</span> event;
}
<span class="hljs-keyword">var</span> codova = {
    ...
    <span class="hljs-comment">// 创建事件通道</span>
    addStickyDocumentEventHandler:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
        <span class="hljs-keyword">return</span> (documentEventHandlers[event] = channel.createSticky(event));
    },
    <span class="hljs-attr">addDocumentEventHandler</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
        <span class="hljs-keyword">return</span> (documentEventHandlers[event] = channel.create(event));
    },
    <span class="hljs-comment">// 取消事件通道</span>
    removeDocumentEventHandler:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
        <span class="hljs-keyword">delete</span> documentEventHandlers[event];
    },
    <span class="hljs-comment">// 发布事件消息</span>
    fireDocumentEvent: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">type, data, bNoDetach</span>) </span>{
        <span class="hljs-keyword">var</span> evt = createEvent(type, data);
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> documentEventHandlers[type] != <span class="hljs-string">'undefined'</span>) {
            <span class="hljs-keyword">if</span>( bNoDetach ) {
                documentEventHandlers[type].fire(evt);
            }
            <span class="hljs-keyword">else</span> {
                setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                    <span class="hljs-comment">// Fire deviceready on listeners that were registered before cordova.js was loaded.</span>
                    <span class="hljs-keyword">if</span> (type == <span class="hljs-string">'deviceready'</span>) {
                        <span class="hljs-built_in">document</span>.dispatchEvent(evt);
                    }
                    documentEventHandlers[type].fire(evt);
                }, <span class="hljs-number">0</span>);
            }
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-built_in">document</span>.dispatchEvent(evt);
        }
    },
    ...
}
<span class="hljs-built_in">module</span>.exports = cordova;</code></pre>
<p>在初始化启动模块<code>cordova/init</code>中有这样的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 注册pause、resume、deviceReady事件
channel.onPause = cordova.addDocumentEventHandler('pause');
channel.onResume = cordova.addDocumentEventHandler('resume');
channel.onActivated = cordova.addDocumentEventHandler('activated');
channel.onDeviceReady = cordova.addStickyDocumentEventHandler('deviceready');

// 监听DOMContentLoaded事件并发布事件消息
if (document.readyState == 'complete' || document.readyState == 'interactive') {
    channel.onDOMContentLoaded.fire();
} else {
    document.addEventListener('DOMContentLoaded', function() {
        channel.onDOMContentLoaded.fire();
    }, false);
}

// 原生层加载完成事件
if (window._nativeReady) {
    channel.onNativeReady.fire();
}

// 加载完成发布时间事件消息
channel.join(function() {
    modulemapper.mapModules(window);
    platform.initialize &amp;&amp; platform.initialize();
    channel.onCordovaReady.fire();
    channel.join(function() {
        require('cordova').fireDocumentEvent('deviceready');
    }, channel.deviceReadyChannelsArray);
}, platformInitChannelsArray);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 注册pause、resume、deviceReady事件</span>
channel.onPause = cordova.addDocumentEventHandler(<span class="hljs-string">'pause'</span>);
channel.onResume = cordova.addDocumentEventHandler(<span class="hljs-string">'resume'</span>);
channel.onActivated = cordova.addDocumentEventHandler(<span class="hljs-string">'activated'</span>);
channel.onDeviceReady = cordova.addStickyDocumentEventHandler(<span class="hljs-string">'deviceready'</span>);

<span class="hljs-comment">// 监听DOMContentLoaded事件并发布事件消息</span>
<span class="hljs-keyword">if</span> (<span class="hljs-built_in">document</span>.readyState == <span class="hljs-string">'complete'</span> || <span class="hljs-built_in">document</span>.readyState == <span class="hljs-string">'interactive'</span>) {
    channel.onDOMContentLoaded.fire();
} <span class="hljs-keyword">else</span> {
    <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'DOMContentLoaded'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        channel.onDOMContentLoaded.fire();
    }, <span class="hljs-literal">false</span>);
}

<span class="hljs-comment">// 原生层加载完成事件</span>
<span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>._nativeReady) {
    channel.onNativeReady.fire();
}

<span class="hljs-comment">// 加载完成发布时间事件消息</span>
channel.join(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    modulemapper.mapModules(<span class="hljs-built_in">window</span>);
    platform.initialize &amp;&amp; platform.initialize();
    channel.onCordovaReady.fire();
    channel.join(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">require</span>(<span class="hljs-string">'cordova'</span>).fireDocumentEvent(<span class="hljs-string">'deviceready'</span>);
    }, channel.deviceReadyChannelsArray);
}, platformInitChannelsArray);</code></pre>
<p>这里通过addDocumentEventHandler及addStickyDocumentEventHandler创建了事件通道，并通过fireDocumentEvent或者fire发布事件消息，这样我们就可以通过document.addEventListener订阅监听事件了。</p>
<p>如果我们要创建一个自定义事件Test,我们可以这样做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 创建事件通道
cordova.addWindowEventHandler('Test');

// 发布事件消息
cordova.fireWindowEvent('Test', {
    name: 'test',
    data: {
        time: new Date()
    }
})

// 订阅事件消息
window.addEventListener('Test', function (evt) {
     console.log(evt);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 创建事件通道</span>
cordova.addWindowEventHandler(<span class="hljs-string">'Test'</span>);

<span class="hljs-comment">// 发布事件消息</span>
cordova.fireWindowEvent(<span class="hljs-string">'Test'</span>, {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'test'</span>,
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">time</span>: <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()
    }
})

<span class="hljs-comment">// 订阅事件消息</span>
<span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'Test'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">evt</span>) </span>{
     <span class="hljs-built_in">console</span>.log(evt);
});</code></pre>
<h2 id="articleHeader6">参考</h2>
<p><a href="http://rensanning.iteye.com/blog/2163892" rel="nofollow noreferrer" target="_blank">Cordova 3.x 入门 - 目录</a><br><a href="http://www.cnblogs.com/linjisong/archive/2012/08/16/2642233.html" rel="nofollow noreferrer" target="_blank">PhoneGap源码分析</a></p>
<h2 id="articleHeader7">写在后面</h2>
<p>本文至此已经说完了cordova的模块机制和事件机制，已经cordova的工具模块，了解这些后写起插件来才能得心应手，对于原理实现部分不属于本文的范畴，下一篇会详细讲解cordova原理实现。敬请关注，不过近来在写毕设，估计一时半会儿也不会写完，本文前前后后已是拖了半个月。如果觉得本文对您有帮助，不妨打赏支持以此鼓励。</p>
<p><span class="img-wrap"><img data-src="/img/bVMMoV?w=612&amp;h=384" src="https://static.alili.tech/img/bVMMoV?w=612&amp;h=384" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>转载需标注本文原始地址：<a href="https://zhaomenghuan.github.io/" rel="nofollow noreferrer" target="_blank">https://zhaomenghuan.github.io/</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
cordova研习笔记(二) —— cordova 6.X 源码解读（上）

## 原文链接
[https://segmentfault.com/a/1190000009331330](https://segmentfault.com/a/1190000009331330)

