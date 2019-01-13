---
title: 'JS进阶篇--RequireJS模块化编程详解' 
date: 2019-01-14 2:30:07
hidden: true
slug: ij6s8h3r95f
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1.模块的写法</h2>
<p>模块化编程一般都有这么几个过渡过程，如下描述。</p>
<h3 id="articleHeader1">原始方法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function m1(){
　　//...
}
function m2(){
　　//...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">m1</span><span class="hljs-params">()</span></span>{
　　<span class="hljs-comment">//...</span>
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">m2</span><span class="hljs-params">()</span></span>{
　　<span class="hljs-comment">//...</span>
}</code></pre>
<p>上面的函数m1()和m2()，组成一个模块。使用的时候，直接调用就行了。</p>
<p>这种做法的缺点很明显："污染"了全局变量，无法保证不与其他模块发生变量名冲突，而且模块成员之间看不出直接关系。</p>
<h3 id="articleHeader2">对象写法</h3>
<p>为了解决上面的缺点，可以把模块写成一个对象，所有的模块成员都放到这个对象里面。</p>
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
　　});
" title="" data-original-title="复制"></span>
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
　　});
</code></pre>
<p>上面的函数m1()和m2(），都封装在module1对象里。使用的时候，就是调用这个对象的属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module1.m1();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code style="word-break: break-word; white-space: initial;">module<span class="hljs-number">1.</span><span class="hljs-name">m1</span><span class="hljs-comment">()</span>;</code></pre>
<p>但是，这样的写法会暴露所有模块成员，内部状态可以被外部改写。比如，外部代码可以直接改变内部计数器的值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module1._count = 5;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>module1._<span class="hljs-built_in">count</span> = <span class="hljs-number">5</span><span class="hljs-comment">;</span>
</code></pre>
<h3 id="articleHeader3">立即执行函数写法</h3>
<p>使用"立即执行函数"（Immediately-Invoked Function Expression，IIFE），可以达到不暴露私有成员的目的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var module1 = (function(){
　　　　var _count = 0;
　　　　var m1 = function(){
　　　　　　//...
　　　　};
　　　　var m2 = function(){
　　　　　　//...
　　　　};
　　　　return {
　　　　　　m1 : m1,
　　　　　　m2 : m2
　　　　};
　　})();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> module1 = (<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
　　　　<span class="hljs-keyword">var</span> _count = <span class="hljs-number">0</span>;
　　　　<span class="hljs-keyword">var</span> m1 = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
　　　　　　<span class="hljs-comment">//...</span>
　　　　};
　　　　<span class="hljs-keyword">var</span> m2 = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
　　　　　　<span class="hljs-comment">//...</span>
　　　　};
　　　　<span class="hljs-keyword">return</span> {
　　　　　　m1 : m1,
　　　　　　m2 : m2
　　　　};
　　})();
</code></pre>
<p>使用上面的写法，外部代码无法读取内部的_count变量。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.info(module1._count); //undefined
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code>console.info(<span class="hljs-keyword">module</span><span class="hljs-number">1._</span>count); <span class="hljs-comment">//undefined</span>
</code></pre>
<p>module1就是Javascript模块的基本写法。下面，再对这种写法进行加工。</p>
<h3 id="articleHeader4">放大模式</h3>
<p>如果一个模块很大，必须分成几个部分，或者一个模块需要继承另一个模块，这时就有必要采用"放大模式"（augmentation）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var module1 = (function (mod){
　　　　mod.m3 = function () {
　　　　　　//...
　　　　};
　　　　return mod;
　　})(module1);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> module1 = (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(mod)</span></span>{
　　　　mod.m3 = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
　　　　　　<span class="hljs-comment">//...</span>
　　　　};
　　　　<span class="hljs-keyword">return</span> mod;
　　})(module1);
</code></pre>
<p>上面的代码为module1模块添加了一个新方法m3()，然后返回新的module1模块。</p>
<h3 id="articleHeader5">宽放大模式（Loose augmentation）</h3>
<p>在浏览器环境中，模块的各个部分通常都是从网上获取的，有时无法知道哪个部分会先加载。如果采用上一节的写法，第一个执行的部分有可能加载一个不存在空对象，这时就要采用"宽放大模式"。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var module1 = ( function (mod){
　　　　//...
　　　　return mod;
　　})(window.module1 || {});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> module1 = ( <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">mod</span>)</span>{
　　　　<span class="hljs-comment">//...</span>
　　　　<span class="hljs-keyword">return</span> mod;
　　})(<span class="hljs-built_in">window</span>.module1 || {});</code></pre>
<p>与"放大模式"相比，＂宽放大模式＂就是"立即执行函数"的参数可以是空对象。</p>
<h3 id="articleHeader6">输入全局变量</h3>
<p>独立性是模块的重要特点，模块内部最好不与程序的其他部分直接交互。</p>
<p>为了在模块内部调用全局变量，必须显式地将其他变量输入模块。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var module1 = (function ($, YAHOO) {
　　　　//...
　　})(jQuery, YAHOO);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> module1 = (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">($, YAHOO)</span> </span>{
　　　　<span class="hljs-comment">//...</span>
　　})(jQuery, YAHOO);
</code></pre>
<p>上面的module1模块需要使用jQuery库和YUI库，就把这两个库（其实是两个模块）当作参数输入module1。这样做除了保证模块的独立性，还使得模块之间的依赖关系变得明显。</p>
<h2 id="articleHeader7">2.AMD规范</h2>
<p>2009年，美国程序员Ryan Dahl创造了node.js项目，将javascript语言用于服务器端编程。</p>
<p>这标志"Javascript模块化编程"正式诞生。因为老实说，在浏览器环境下，没有模块也不是特别大的问题，毕竟网页程序的复杂性有限；但是在服务器端，一定要有模块，与操作系统和其他应用程序互动，否则根本没法编程。</p>
<p>node.js的模块系统，就是参照CommonJS规范实现的。在CommonJS中，有一个全局性方法require()，用于加载模块。假定有一个数学模块math.js，就可以像下面这样加载。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var math = require('math');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">var math</span> = require(<span class="hljs-string">'math'</span>);</code></pre>
<p>然后，就可以调用模块提供的方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var math = require('math');
　　math.add(2,3); // 5
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-keyword">var</span> math = require(<span class="hljs-string">'math'</span>);
　　math.<span class="hljs-keyword">add</span>(<span class="hljs-number">2</span>,<span class="hljs-number">3</span>); <span class="hljs-comment">// 5</span>
</code></pre>
<p>因为这个系列主要针对浏览器编程，不涉及node.js，所以对CommonJS就不多做介绍了。我们在这里只要知道，require()用于加载模块就行了。</p>
<p>有了服务器端模块以后，很自然地，大家就想要客户端模块。而且最好两者能够兼容，一个模块不用修改，在服务器和浏览器都可以运行。</p>
<p>但是，由于一个重大的局限，使得CommonJS规范不适用于浏览器环境。还是上一节的代码，如果在浏览器中运行，会有一个很大的问题，你能看出来吗？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var math = require('math');
　　math.add(2, 3);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs moonscript"><code>var <span class="hljs-built_in">math</span> = <span class="hljs-built_in">require</span>(<span class="hljs-string">'math'</span>);
　　<span class="hljs-built_in">math</span>.add(<span class="hljs-number">2</span>, <span class="hljs-number">3</span>);</code></pre>
<p>第二行math.add(2, 3)，在第一行require('math')之后运行，因此必须等math.js加载完成。也就是说，如果加载时间很长，整个应用就会停在那里等。</p>
<p>这对服务器端不是一个问题，因为所有的模块都存放在本地硬盘，可以同步加载完成，等待时间就是硬盘的读取时间。但是，对于浏览器，这却是一个大问题，因为模块都放在服务器端，等待时间取决于网速的快慢，可能要等很长时间，浏览器处于"假死"状态。</p>
<p>因此，浏览器端的模块，不能采用"同步加载"（synchronous），只能采用"异步加载"（asynchronous）。这就是AMD规范诞生的背景。</p>
<p>AMD是"Asynchronous Module Definition"的缩写，意思就是"异步模块定义"。它采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。</p>
<p>AMD也采用require()语句加载模块，但是不同于CommonJS，它要求两个参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require([module], callback);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code><span class="hljs-keyword">require</span>([<span class="hljs-class"><span class="hljs-keyword">module</span>], <span class="hljs-title">callback</span>);</span>
</code></pre>
<p>第一个参数[module]，是一个数组，里面的成员就是要加载的模块；第二个参数callback，则是加载成功之后的回调函数。如果将前面的代码改写成AMD形式，就是下面这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(['math'], function (math) {
　　　　math.add(2, 3);
　　});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">require</span>([<span class="hljs-string">'math'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">math</span>) </span>{
　　　　math.add(<span class="hljs-number">2</span>, <span class="hljs-number">3</span>);
　　});
</code></pre>
<p>math.add()与math模块加载不是同步的，浏览器不会发生假死。所以很显然，AMD比较适合浏览器环境。</p>
<h2 id="articleHeader8">3.require.js的加载</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;js/require.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/require.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>有人可能会想到，加载这个文件，也可能造成网页失去响应。解决办法有两个，一个是把它放在网页底部加载，另一个是写成下面这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;js/require.js&quot; defer async=&quot;true&quot; ></script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/require.js"</span> <span class="hljs-attr">defer</span> <span class="hljs-attr">async</span>=<span class="hljs-string">"true"</span> &gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>async属性表明这个文件需要异步加载，避免网页失去响应。IE不支持这个属性，只支持defer，所以把defer也写上。</p>
<p>加载require.js以后，下一步就要加载我们自己的代码了。假定我们自己的代码文件是main.js，也放在js目录下面。那么，只需要写成下面这样就行了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;js/require.js&quot; data-main=&quot;js/main&quot;></script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/require.js"</span> <span class="hljs-attr">data-main</span>=<span class="hljs-string">"js/main"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>data-main属性的作用是，指定网页程序的主模块。在上例中，就是js目录下面的main.js，这个文件会第一个被require.js加载。由于require.js默认的文件后缀名是js，所以可以把main.js简写成main。</p>
<h3 id="articleHeader9">require.config()的配置</h3>
<p>使用require.config()方法，我们可以对模块的加载行为进行自定义。require.config()就写在主模块（main.js）的头部。参数就是一个对象，这个对象的paths属性指定各个模块的加载路径。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require.config({
　　　　baseUrl: &quot;js/lib&quot;,
　　　　paths: {
　　　　　　&quot;jquery&quot;: &quot;jquery.min&quot;,
　　　　　　&quot;underscore&quot;: &quot;underscore.min&quot;,
　　　　　　&quot;backbone&quot;: &quot;backbone.min&quot;
　　　　}
　　});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">require</span><span class="hljs-selector-class">.config</span>({
　　　　<span class="hljs-attribute">baseUrl</span>: <span class="hljs-string">"js/lib"</span>,
　　　　paths: {
　　　　　　<span class="hljs-string">"jquery"</span>: <span class="hljs-string">"jquery.min"</span>,
　　　　　　<span class="hljs-string">"underscore"</span>: <span class="hljs-string">"underscore.min"</span>,
　　　　　　<span class="hljs-string">"backbone"</span>: <span class="hljs-string">"backbone.min"</span>
　　　　}
　　});
</code></pre>
<h3 id="articleHeader10">AMD模块的写法</h3>
<p>模块必须采用特定的define()函数来定义。如果一个模块不依赖其他模块，那么可以直接定义在define()函数之中。</p>
<p>假定现在有一个math.js文件，它定义了一个math模块。那么，math.js就要这样写：</p>
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
　　});
" title="" data-original-title="复制"></span>
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
　　});
</code></pre>
<p>加载方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// main.js
　　require(['math'], function (math){
　　　　alert(math.add(1,1));
　　});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// main.js</span>
　　<span class="hljs-built_in">require</span>([<span class="hljs-string">'math'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">math</span>)</span>{
　　　　alert(math.add(<span class="hljs-number">1</span>,<span class="hljs-number">1</span>));
　　});
</code></pre>
<p>如果这个模块还依赖其他模块，那么define()函数的第一个参数，必须是一个数组，指明该模块的依赖性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="define(['myLib'], function(myLib){
　　　　function foo(){
　　　　　　myLib.doSomething();
　　　　}
　　　　return {
　　　　　　foo : foo
　　　　};
　　});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>define([<span class="hljs-string">'myLib'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(myLib)</span></span>{
　　　　<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span><span class="hljs-params">()</span></span>{
　　　　　　myLib.doSomething();
　　　　}
　　　　<span class="hljs-keyword">return</span> {
　　　　　　foo : foo
　　　　};
　　});</code></pre>
<p>当require()函数加载上面这个模块的时候，就会先加载myLib.js文件。</p>
<p><strong>define()的完整定义：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="define('sample3' ,['sample','sample1'],function (sample,sample1) {
    var sample4 = require('sample4');
    return function(){
        alert(sample.name+':'+sample.sayhell());
    }
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>define(<span class="hljs-string">'sample3'</span> ,[<span class="hljs-string">'sample'</span>,<span class="hljs-string">'sample1'</span>],<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">sample,sample1</span>) </span>{
    <span class="hljs-keyword">var</span> sample4 = <span class="hljs-built_in">require</span>(<span class="hljs-string">'sample4'</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        alert(sample.name+<span class="hljs-string">':'</span>+sample.sayhell());
    }
});
</code></pre>
<p><strong>关于define函数的name和require函数的依赖名称之间的关系</strong><br>1）define(name，[] , callback); 这个name可以省掉，默认是文件名称；当然也可以自定义，一旦我们定义了name，根据源代码我们可以发现define函数内部其实就是把这个name以及依赖模块、回调函数作为一个对象存储在全局的数组当中，也就是 defQueue.push([name,deps,callback])；那么这个name就是这个组件注册的的ID！</p>
<p>2）require（[name , name2],callback）; 系统首先会在全文检索path中是否对应的路径，如果没有自然把他作为路径拼接在baseUrl上去异步加载这个js文件，加载时从源代码中可以看到 ,var data = getScriptData(evt)；返回的 data.id 其实就是name，然后执行contex.completeLoad(node.id)，其内部就很清楚了，把define中注册的name和这里得到的name进行比较如果相等就执行，所以道理就是：require 和 define 的 name 必须保证一致！</p>
<p>标签加载完成之后，获取标签的唯一标识name</p>
<h3 id="articleHeader11">加载非规范的模块</h3>
<p>举例来说，underscore和backbone这两个库，都没有采用AMD规范编写。如果要加载它们的话，必须先定义它们的特征。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require.config({
　　　　shim: {

　　　　　　'underscore':{
　　　　　　　　exports: '_'
　　　　　　},
　　　　　　'backbone': {
　　　　　　　　deps: ['underscore', 'jquery'],
　　　　　　　　exports: 'Backbone'
　　　　　　}
　　　　}
　　});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>require.config({
　　　　shim: {

　　　　　　<span class="hljs-string">'underscore'</span>:{
　　　　　　　　exports: <span class="hljs-string">'_'</span>
　　　　　　},
　　　　　　<span class="hljs-string">'backbone'</span>: {
　　　　　　　　deps: [<span class="hljs-string">'underscore'</span>, <span class="hljs-string">'jquery'</span>],
　　　　　　　　exports: <span class="hljs-string">'Backbone'</span>
　　　　　　}
　　　　}
　　});
</code></pre>
<p>require.config()接受一个配置对象，这个对象除了有前面说过的paths属性之外，还有一个shim属性，专门用来配置不兼容的模块。具体来说，每个模块要定义（1）exports值（输出的变量名），表明这个模块外部调用时的名称；（2）deps数组，表明该模块的依赖性。</p>
<p>比如，jQuery的插件可以这样定义：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="shim: {
　　　　'jquery.scroll': {
　　　　　　deps: ['jquery'],
　　　　　　exports: 'jQuery.fn.scroll'
　　　　}
　　}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">shim</span>: {
　　　　<span class="hljs-string">'jquery.scroll'</span>: {
　　　　　　<span class="hljs-attribute">deps</span>: [<span class="hljs-string">'jquery'</span>],
　　　　　　<span class="hljs-attribute">exports</span>: <span class="hljs-string">'jQuery.fn.scroll'</span>
　　　　}
　　}
</code></pre>
<h3 id="articleHeader12">require.js插件</h3>
<p>require.js还提供一系列插件，实现一些特定的功能。</p>
<p>domready插件，可以让回调函数在页面DOM结构加载完成后再运行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(['domready!'], function (doc){
　　　　// called once the DOM is ready
　　});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">require</span>([<span class="hljs-string">'domready!'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">doc</span>)</span>{
　　　　<span class="hljs-comment">// called once the DOM is ready</span>
　　});</code></pre>
<p>text和image插件，则是允许require.js加载文本和图片文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="define([
　　　　'text!review.txt',
　　　　'image!cat.jpg'
　　　　],

　　　　function(review,cat){
　　　　　　console.log(review);
　　　　　　document.body.appendChild(cat);
　　　　}
　　);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>define([
　　　　'text!review.txt',
　　　　'image!cat.jpg'
　　　　],

　　　　function(<span class="hljs-name">review</span>,cat){
　　　　　　console.log(<span class="hljs-name">review</span>)<span class="hljs-comment">;</span>
　　　　　　document.body.appendChild(<span class="hljs-name">cat</span>)<span class="hljs-comment">;</span>
　　　　}
　　)<span class="hljs-comment">;</span></code></pre>
<p>类似的插件还有json和mdown，用于加载json文件和markdown文件。</p>
<p><strong>参考地址：</strong><br><a href="http://www.ruanyifeng.com/blog/2012/10/javascript_module.html" rel="nofollow noreferrer" target="_blank">Javascript模块化编程（一）：模块的写法</a><br><a href="http://www.ruanyifeng.com/blog/2012/10/asynchronous_module_definition.html" rel="nofollow noreferrer" target="_blank">Javascript模块化编程（二）：AMD规范</a><br><a href="http://www.ruanyifeng.com/blog/2012/11/require_js.html" rel="nofollow noreferrer" target="_blank">Javascript模块化编程（三）：require.js的用法</a><br><a href="https://my.oschina.net/heweipo/blog/509554" rel="nofollow noreferrer" target="_blank">RequireJS define 详细介绍</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS进阶篇--RequireJS模块化编程详解

## 原文链接
[https://segmentfault.com/a/1190000009446236](https://segmentfault.com/a/1190000009446236)

