---
title: '[面试专题]JS中模块AMD,CMD,import' 
date: 2019-01-02 2:30:09
hidden: true
slug: d1lc61nypnr
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">js中的require、import和export</h1>
<hr>
<h2 id="articleHeader1">require时代</h2>
<p>Javascript社区做了很多努力，在现有的运行环境中，实现"模块"的效果。</p>
<h3 id="articleHeader2">对象写法</h3>
<p>把模块写成一个对象，所有的模块成员都放到这个对象里面</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var module1 = new Object({
  _count : 0,
　m1 : function (){
　　//...
　},
　m2 : function (){
　　//...
　}
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> module1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>({
  <span class="hljs-attr">_count</span> : <span class="hljs-number">0</span>,
　<span class="hljs-attr">m1</span> : <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{
　　<span class="hljs-comment">//...</span>
　},
　<span class="hljs-attr">m2</span> : <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{
　　<span class="hljs-comment">//...</span>
　}
});</code></pre>
<p>上面的函数m1()和m2(），都封装在module1对象里。使用的时候，就是调用这个对象的属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module1.m1();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code style="word-break: break-word; white-space: initial;">module<span class="hljs-number">1.</span><span class="hljs-name">m1</span><span class="hljs-comment">()</span>;</code></pre>
<p>这样的写法会暴露所有模块成员，内部状态可以被外部改写。比如，外部代码可以直接改变内部计数器的值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module._count = 1;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code style="word-break: break-word; white-space: initial;">module._<span class="hljs-built_in">count</span> = <span class="hljs-number">1</span><span class="hljs-comment">;</span></code></pre>
<h3 id="articleHeader3">立即执行函数写法</h3>
<p>使用"立即执行函数"（Immediately-Invoked Function Expression，IIFE），可以达到不暴露私有成员的目的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var module = (function() {
    var _count = 0;
    var m1 = function() {
        alert(_count)
    }
    var m2 = function() {
        alert(_count + 1)
    }

    return {
        m1: m1,
        m2: m2
    }
})()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> <span class="hljs-built_in">module</span> = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> _count = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">var</span> m1 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        alert(_count)
    }
    <span class="hljs-keyword">var</span> m2 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        alert(_count + <span class="hljs-number">1</span>)
    }

    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">m1</span>: m1,
        <span class="hljs-attr">m2</span>: m2
    }
})()</code></pre>
<p>module就是Javascript模块的基本写法。</p>
<h2 id="articleHeader4">主流模块规范</h2>
<p>在es6以前，还没有提出一套官方的规范,从社区和框架推广程度而言,目前通行的javascript模块规范有两种：CommonJS 和 AMD</p>
<h3 id="articleHeader5">CommonJS规范</h3>
<p>node编程中最重要的思想之一就是模块，而正是这个思想，让JavaScript的大规模工程成为可能。服务端使用CommonJS模块规范。</p>
<p>在CommonJS中，有一个全局性方法require()，用于加载模块。假定有一个数学模块math.js，就可以像下面这样加载。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="　var math = require('math');
　math.add(2,3); // 5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>　<span class="hljs-keyword">var</span> math = require(<span class="hljs-string">'math'</span>);
　math.<span class="hljs-keyword">add</span>(<span class="hljs-number">2</span>,<span class="hljs-number">3</span>); <span class="hljs-comment">// 5</span></code></pre>
<p>正是由于CommonJS 使用的require方式的推动，才有了后面的AMD、CMD 也采用的require方式来引用模块的风格</p>
<h3 id="articleHeader6">AMD规范</h3>
<p>Common.js起源于node,因此在服务端广泛使用.对服务端，所有的模块都存放在本地硬盘，可以同步加载完成，等待时间就是硬盘的读取时间。但是，对于浏览器，这却是一个大问题，因为模块都放在服务器端，等待时间取决于网速的快慢，可能要等很长时间，浏览器处于"假死"状态。<br>因此，浏览器端的模块，不能采用"同步加载"（synchronous），只能采用"异步加载"（asynchronous）。这就是AMD规范诞生的背景。</p>
<p>AMD是"Asynchronous Module Definition"的缩写，意思就是"异步模块定义"。它采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。</p>
<p>模块必须采用特定的define()函数来定义。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="define(id?, dependencies?, factory)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs puppet"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">define</span>(<span class="hljs-section">id</span>?, dependencies?, factory)</code></pre>
<ul>
<li><p>id:字符串，模块名称(可选)</p></li>
<li><p>dependencies: 是我们要载入的依赖模块(可选)，使用相对路径。,注意是数组格式</p></li>
<li><p>factory: 工厂方法，返回一个模块函数</p></li>
</ul>
<p>如果一个模块不依赖其他模块，那么可以直接定义在define()函数之中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// math.js
　　define(function (){
　　　　var add = function (x,y){
　　　　　　return x+y;
　　　　};
　　　　return {
　　　　　　add: add
　　　　};
　　});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// math.js</span>
　　define(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span></span>{
　　　　<span class="hljs-keyword">var</span> add = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(x,y)</span></span>{
　　　　　　<span class="hljs-keyword">return</span> x+y;
　　　　};
　　　　<span class="hljs-keyword">return</span> {
　　　　　　add: add
　　　　};
　　});</code></pre>
<p>如果这个模块还依赖其他模块，那么define()函数的第一个参数，必须是一个数组，指明该模块的依赖性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="define(['Lib'], function(Lib){
　　　　function foo(){
　　　　　　Lib.doSomething();
　　　　}
　　　　return {
　　　　　　foo : foo
　　　　};
　　});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>define([<span class="hljs-string">'Lib'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(Lib)</span></span>{
　　　　<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span><span class="hljs-params">()</span></span>{
　　　　　　Lib.doSomething();
　　　　}
　　　　<span class="hljs-keyword">return</span> {
　　　　　　foo : foo
　　　　};
　　});</code></pre>
<p>当require()函数加载上面这个模块的时候，就会先加载Lib.js文件。</p>
<p>AMD也采用require()语句加载模块，但是不同于CommonJS，它要求两个参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require([module], callback);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">require</span>([<span class="hljs-class"><span class="hljs-keyword">module</span>], <span class="hljs-title">callback</span>);</span></code></pre>
<p>第一个参数[module]，是一个数组，里面的成员就是要加载的模块；第二个参数callback，则是加载成功之后的回调函数。如果将前面的代码改写成AMD形式，就是下面这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(['math'], function (math) {
　math.add(2, 3);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">require</span>([<span class="hljs-string">'math'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">math</span>) </span>{
　math.add(<span class="hljs-number">2</span>, <span class="hljs-number">3</span>);
});</code></pre>
<p>math.add()与math模块加载不是同步的，浏览器不会发生假死。所以很显然，AMD比较适合浏览器环境。</p>
<p>目前，主要有两个Javascript库实现了AMD规范：<a href="http://requirejs.org/" rel="nofollow noreferrer" target="_blank">require.js</a>和<a href="http://cujojs.com/" rel="nofollow noreferrer" target="_blank">curl.js</a>。</p>
<h3 id="articleHeader7">CMD规范</h3>
<p>CMD (Common Module Definition), 是seajs推崇的规范，CMD则是依赖就近，用的时候再require。它写起来是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="define(function(require, exports, module) {
   var clock = require('clock');
   clock.start();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>define(<span class="hljs-name">function</span>(<span class="hljs-name">require</span>, exports, module) {
   var clock = require('clock')<span class="hljs-comment">;</span>
   clock.start()<span class="hljs-comment">;</span>
})<span class="hljs-comment">;</span></code></pre>
<p>CMD与AMD一样，也是采用特定的define()函数来定义,用require方式来引用模块</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="define(id?, dependencies?, factory)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs puppet"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">define</span>(<span class="hljs-section">id</span>?, dependencies?, factory)</code></pre>
<ul>
<li><p>id:字符串，模块名称(可选)</p></li>
<li><p>dependencies: 是我们要载入的依赖模块(可选)，使用相对路径。,注意是数组格式</p></li>
<li><p>factory: 工厂方法，返回一个模块函数</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="define('hello', ['jquery'], function(require, exports, module) {

  // 模块代码

});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code>define(<span class="hljs-string">'hello'</span>, [<span class="hljs-string">'jquery'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(<span class="hljs-keyword">require</span>, exports, <span class="hljs-keyword">module</span>)</span> <span class="hljs-comment">{

  // 模块代码

}</span>);</span></code></pre>
<p>如果一个模块不依赖其他模块，那么可以直接定义在define()函数之中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="define(function(require, exports, module) {
  // 模块代码
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code>define(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(<span class="hljs-keyword">require</span>, exports, <span class="hljs-keyword">module</span>)</span> <span class="hljs-comment">{
  // 模块代码
}</span>);</span></code></pre>
<blockquote><p>注意：带 id 和 dependencies 参数的 define 用法不属于 CMD 规范，而属于 Modules/Transport 规范。</p></blockquote>
<h2 id="articleHeader8">CMD与AMD区别</h2>
<p>AMD和CMD最大的区别是对依赖模块的执行时机处理不同，而不是加载的时机或者方式不同，二者皆为异步加载模块。</p>
<p>AMD依赖前置，js可以方便知道依赖模块是谁，立即加载；</p>
<p>而CMD依赖就近，需要使用把模块变为字符串解析一遍才知道依赖了那些模块，这也是很多人诟病CMD的一点，牺牲性能来带来开发的便利性，实际上解析模块用的时间短到可以忽略。</p>
<h2 id="articleHeader9">现阶段的标准</h2>
<p>ES6标准发布后，module成为标准，标准使用是以export指令导出接口，以import引入模块，但是在我们一贯的node模块中，我们依然采用的是CommonJS规范，使用require引入模块，使用module.exports导出接口。</p>
<h2 id="articleHeader10">import引入模块</h2>
<p>import语法声明用于从已导出的模块、脚本中导入函数、对象、指定文件（或模块）的原始值。</p>
<p>import模块导入与export模块导出功能相对应，也存在两种模块导入方式：命名式导入（名称导入）和默认导入（定义式导入）。</p>
<p>注意:import必须放在文件的最开始.import命令是编译阶段执行的，在代码运行之前,表达式和变量只有在运行时才能得到结果的语法结构。import命令会被 JavaScript 引擎静态分析，先于模块内的其他模块执行（叫做”连接“更合适）所以import中不能含有表达式或者变量,因此无法实现动态加载.<br>因此，import和export命令只能在模块的顶层，不能在代码块之中（比如，在if代码块之中，或在函数之中）。<br>这样的设计，有利于编译器提高效率，但也导致无法在运行时加载模块。在语法上，条件加载就不可能实现。如果import命令要取代 Node 的require方法，这就形成了一个障碍。因为require是运行时加载模块，import命令无法取代require的动态加载功能。</p>
<h2 id="articleHeader11">ES6 模块与 CommonJS 模块的差异</h2>
<p>来自阮一峰ES6教程</p>
<blockquote><p>CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。<br>CommonJS 模块是运行时加载，ES6 模块是编译时输出接口<br>ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令import，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。换句话说，ES6 的import有点像 Unix 系统的“符号连接”，原始值变了，import加载的值也会跟着变。因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[面试专题]JS中模块AMD,CMD,import

## 原文链接
[https://segmentfault.com/a/1190000010913832](https://segmentfault.com/a/1190000010913832)

