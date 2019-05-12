---
title: 'JavaScript模块化编程之AMD' 
date: 2019-02-15 2:30:44
hidden: true
slug: 4cjvcc2zap4
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>简单的说一下AMD是"Asynchronous Module Definition"的缩写，意思就是"异步模块定义"。它采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。</blockquote>
<p>require.js作用</p>
<ul>
<li>实现js文件的异步加载，避免网页失去响应；</li>
<li>管理模块之间的依赖性，便于代码的编写和维护。</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016913755" src="https://static.alili.tech/img/remote/1460000016913755" alt="JavaScript模块化编程之AMD" title="JavaScript模块化编程之AMD" style="cursor: pointer; display: inline;"></span></p>
<p>首先引入requireJS文件，并在script标签上指定入口文件(主模块)：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<head>
 <meta charset=&quot;UTF-8&quot;>
 <title>javascript模块化编程</title>
</head>
<body>
<script type=&quot;text/javascript&quot; src=&quot;https://cdn.bootcss.com/require.js/2.3.5/require.js&quot; defer async data-main=&quot;js/main.js&quot;></script>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>javascript模块化编程<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/require.js/2.3.5/require.js"</span> <span class="hljs-attr">defer</span> <span class="hljs-attr">async</span> <span class="hljs-attr">data-main</span>=<span class="hljs-string">"js/main.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p>接下来需要对main.js进行一些配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 模块加载的配置
require.config({
 // 基目录 如果每个模块不在一个基目录
 // 不使用baseUrl直接在paths中具体指定
 baseUrl: &quot;lib&quot;,
 paths: {
 'jquery': 'jquery',
 'vue': 'vue.min',
 'pagination': 'my-pager'
 },
 // shim属性 专门用来配置不兼容的模块 每个模块要定义:
 // (1) exports值（输出的变量名）表明这个模块外部调用时的名称
 // (2) deps数组 表明该模块的依赖性
 // 比如jq的插件可以这样定义
 shim: {
 'jquery.scroll': {
 deps: ['jquery'],
 exports: 'jQuery.fn.scroll'
 }
 }
 // requireJS还有一系列插件 不再赘述
 // [Plugins](https://github.com/requirejs/requirejs/wiki/Plugins)
});
// 主模块依赖于其它模块，这时就需要使用AMD规范定义的require()函数
// require([modules], function (modules) { });
require(['jquery', 'vue', 'pagination'], function ($, Vue, pagination) {
 console.log($);
 console.log(Vue);
 console.log(pagination);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">// 模块加载的配置</span>
<span class="hljs-selector-tag">require</span><span class="hljs-selector-class">.config</span>({
 <span class="hljs-comment">// 基目录 如果每个模块不在一个基目录</span>
 <span class="hljs-comment">// 不使用baseUrl直接在paths中具体指定</span>
 <span class="hljs-attribute">baseUrl</span>: <span class="hljs-string">"lib"</span>,
 <span class="hljs-attribute">paths</span>: {
 <span class="hljs-string">'jquery'</span>: <span class="hljs-string">'jquery'</span>,
 <span class="hljs-string">'vue'</span>: <span class="hljs-string">'vue.min'</span>,
 <span class="hljs-string">'pagination'</span>: <span class="hljs-string">'my-pager'</span>
 },
 <span class="hljs-comment">// shim属性 专门用来配置不兼容的模块 每个模块要定义:</span>
 <span class="hljs-comment">// (1) exports值（输出的变量名）表明这个模块外部调用时的名称</span>
 <span class="hljs-comment">// (2) deps数组 表明该模块的依赖性</span>
 <span class="hljs-comment">// 比如jq的插件可以这样定义</span>
 <span class="hljs-attribute">shim</span>: {
 <span class="hljs-string">'jquery.scroll'</span>: {
 <span class="hljs-attribute">deps</span>: [<span class="hljs-string">'jquery'</span>],
 <span class="hljs-attribute">exports</span>: <span class="hljs-string">'jQuery.fn.scroll'</span>
 }
 }
 <span class="hljs-comment">// requireJS还有一系列插件 不再赘述</span>
 <span class="hljs-comment">// [Plugins](https://github.com/requirejs/requirejs/wiki/Plugins)</span>
});
<span class="hljs-comment">// 主模块依赖于其它模块，这时就需要使用AMD规范定义的require()函数</span>
<span class="hljs-comment">// require([modules], function (modules) { });</span>
<span class="hljs-selector-tag">require</span>([<span class="hljs-string">'jquery'</span>, <span class="hljs-string">'vue'</span>, <span class="hljs-string">'pagination'</span>], function ($, Vue, pagination) {
 <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>($);
 <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(Vue);
 <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(pagination);
});</code></pre>
<p>关于自己定义符合AMD规范的模块，比如上面例子中的pagination:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function (factory) {
 if (typeof exports === 'object') {
 // Node/CommonJS
 factory(require('document'), require('window'));
 } else if (typeof define === 'function' &amp;&amp; define.amd) {
 // AMD
 define(factory(document, window));
 } else {
 // Browser globals
 factory(document, window);
 }
}(function (document, window) {
 var Test = {
 a: 1
 }
 if (typeof module != 'undefined' &amp;&amp; module.exports) {
 module.exports = Test;
 } else if (typeof define == 'function' &amp;&amp; define.amd) {
 define(function () { return Test; });
 } else {
 window.Test = Test;
 }
}));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs hy"><code>(<span class="hljs-name">function</span> (<span class="hljs-name">factory</span>) {
 if (<span class="hljs-name">typeof</span> exports === 'object') {
 // Node/CommonJS
 factory(<span class="hljs-name"><span class="hljs-builtin-name">require</span></span>(<span class="hljs-name">'document'</span>), require(<span class="hljs-name">'window'</span>))<span class="hljs-comment">;</span>
 } else if (<span class="hljs-name">typeof</span> define === 'function' &amp;&amp; define.amd) {
 // AMD
 define(<span class="hljs-name">factory</span>(<span class="hljs-name">document</span>, window))<span class="hljs-comment">;</span>
 } else {
 // Browser globals
 factory(<span class="hljs-name">document</span>, window)<span class="hljs-comment">;</span>
 }
}(<span class="hljs-name">function</span> (<span class="hljs-name">document</span>, window) {
 var Test = {
 a: <span class="hljs-number">1</span>
 }
 if (<span class="hljs-name">typeof</span> module != 'undefined' &amp;&amp; module.exports) {
 module.exports = Test;
 } else if (<span class="hljs-name">typeof</span> define == 'function' &amp;&amp; define.amd) {
 define(<span class="hljs-name">function</span> () { return Test; })<span class="hljs-comment">;</span>
 } else {
 window.Test = Test;
 }
}))<span class="hljs-comment">;</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript模块化编程之AMD

## 原文链接
[https://segmentfault.com/a/1190000016913752](https://segmentfault.com/a/1190000016913752)

