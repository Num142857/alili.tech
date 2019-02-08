---
title: '关于JavaScript调试的十来个小Tips' 
date: 2019-02-09 2:30:59
hidden: true
slug: yy1gv5h9tn
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><a href="https://github.com/wxyyxc1992/web-frontend-practice-handbook/blob/master/dom/testrelease/debug/debug-javascript-with-these-14-tips.md" rel="nofollow noreferrer" target="_blank">系列文章的Github Repo</a><br>人懒事多，最近翻多写少啊。原文地址<a href="https://raygun.com/blog/2016/05/debug-javascript/#comments" rel="nofollow noreferrer" target="_blank">这里</a></p></blockquote>
<h1 id="articleHeader0">‘debugger;’</h1>
<p>除了<code>console.log</code>，<code>debugger</code>就是另一个我很喜欢的快速调试的工具，将debugger加入代码之后，Chrome会自动在插入它的地方停止，很像C或者Java里面打断点。你也可以在一些条件控制中插入该调试语句，譬如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
if (thisThing) {
    debugger;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>
<span class="hljs-keyword">if</span> (thisThing) {
    <span class="hljs-keyword">debugger</span>;
}</code></pre>
<h1 id="articleHeader1">将Objects以表格形式展示</h1>
<p>有时候我们需要看一些复杂的对象的详细信息，最简单的方法就是用<code>console.log</code>然后展示成一个列表状，上下滚动进行浏览。不过似乎用<code>console.table</code>展示成列表会更好呦，大概是介个样子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var animals = [
    { animal: 'Horse', name: 'Henry', age: 43 },
    { animal: 'Dog', name: 'Fred', age: 13 },
    { animal: 'Cat', name: 'Frodo', age: 18 }
];
 
console.table(animals);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>
var animals = [
    { <span class="hljs-string">animal:</span> <span class="hljs-string">'Horse'</span>, <span class="hljs-string">name:</span> <span class="hljs-string">'Henry'</span>, <span class="hljs-string">age:</span> <span class="hljs-number">43</span> },
    { <span class="hljs-string">animal:</span> <span class="hljs-string">'Dog'</span>, <span class="hljs-string">name:</span> <span class="hljs-string">'Fred'</span>, <span class="hljs-string">age:</span> <span class="hljs-number">13</span> },
    { <span class="hljs-string">animal:</span> <span class="hljs-string">'Cat'</span>, <span class="hljs-string">name:</span> <span class="hljs-string">'Frodo'</span>, <span class="hljs-string">age:</span> <span class="hljs-number">18</span> }
];
 
console.table(animals);</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006772811" src="https://static.alili.tech/img/remote/1460000006772811" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader2">多屏幕尺寸测试</h1>
<p>Chrome有一个非常诱人的功能就是能够模拟不同设备的尺寸，在Chrome的Inspector中点击<code>toggle device mode</code>按钮，然后就可以在不同的设备屏幕尺寸下进行调试咯：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005624737" src="https://static.alili.tech/img/remote/1460000005624737" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader3">在Console快速选定DOM元素</h1>
<p>在Elements选择面板中选择某个DOM元素然后在Console中使用该元素也是非常常见的一个操作，Chrome Inspector会缓存最后5个DOM元素在它的历史记录中，你可以用类似于Shell中的<code>$0</code>等方式来快速关联到元素。譬如下图的列表中有‘item-4′, ‘item-3’, ‘item-2’, ‘item-1’, ‘item-0’这几个元素，你可以这么使用：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005624731" src="https://static.alili.tech/img/remote/1460000005624731" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader4">获取某个函数的调用追踪记录</h1>
<p>JavaScript框架极大方便了我们的开发，但是也会带来大量的预定义的函数，譬如创建View的、绑定事件的等等，这样我们就不容易追踪我们自定义函数的调用过程了。虽然JavaScript不是一个非常严谨的语言，有时候很难搞清楚到底发生了啥，特别是当你需要审阅其他人的代码的时候。这时候<code>console.trace</code>就要起作用咯，它可以帮你进行函数调用的追踪。譬如下面的代码中我们要追踪出car对象中对于funcZ的调用过程：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var car;
 
var func1 = function() {
func2();
}
 
var func2 = function() {
func4();
}
  
var func3 = function() {
 
}
  
var func4 = function() {
car = new Car();
car.funcX();
}
  
var Car = function() {
this.brand = ‘volvo’;
this.color = ‘red’;
 
this.funcX = function() {
this.funcY();
}
 
this.funcY = function() {
this.funcZ();
}
 
this.funcZ = function() {
console.trace(‘trace car’)
}
}
 
func1();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
<span class="hljs-keyword">var</span> car;
 
<span class="hljs-keyword">var</span> func1 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
func2();
}
 
<span class="hljs-keyword">var</span> func2 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
func4();
}
  
<span class="hljs-keyword">var</span> func3 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
 
}
  
<span class="hljs-keyword">var</span> func4 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
car = <span class="hljs-keyword">new</span> Car();
car.funcX();
}
  
<span class="hljs-keyword">var</span> Car = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
<span class="hljs-keyword">this</span>.brand = ‘volvo’;
<span class="hljs-keyword">this</span>.color = ‘red’;
 
<span class="hljs-keyword">this</span>.funcX = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
<span class="hljs-keyword">this</span>.funcY();
}
 
<span class="hljs-keyword">this</span>.funcY = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
<span class="hljs-keyword">this</span>.funcZ();
}
 
<span class="hljs-keyword">this</span>.funcZ = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
<span class="hljs-built_in">console</span>.trace(‘trace car’)
}
}
 
func1();</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005624733" src="https://static.alili.tech/img/remote/1460000005624733" alt="" title="" style="cursor: pointer;"></span></p>
<p>这边就可以清晰地看出func1调用了func2，然后调用了func4，func4创建了Car的实例然后调用了car.funcX。</p>
<h1 id="articleHeader5">格式化被压缩的代码</h1>
<p>有时候在生产环境下我们发现了一些莫名奇妙的问题，然后忘了把sourcemaps放到这台服务器上，或者在看别人家的网站的源代码的时候，结果就看到了一坨不知道讲什么的代码，就像下图。Chrome为我们提供了一个很人性化的反压缩工具来增强代码的可读性，大概这么用：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005624734" src="https://static.alili.tech/img/remote/1460000005624734" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader6">快速定位调试函数</h1>
<p>当我们想在函数里加个断点的时候，一般会选择这么做：</p>
<ul>
<li><p>在Inspector中找到指定行，然后添加一个断点</p></li>
<li><p>在脚本中添加一个debugger调用</p></li>
</ul>
<p>不过这两种方法都存在一个小问题就是都要到对应的脚本文件中然后再找到对应的行，这样会比较麻烦。这边介绍一个相对快捷点的方法，就是在console中使用<code>debug(funcName)</code>然后脚本会在指定到对应函数的地方自动停止。这种方法有个缺陷就是无法在私有函数或者匿名函数处停止，所以还是要因时而异：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var func1 = function() {
func2();
};
 
var Car = function() {
this.funcX = function() {
this.funcY();
}
 
this.funcY = function() {
this.funcZ();
}
}
 
var car = new Car();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>
<span class="hljs-keyword">var</span> func1 = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
func2();
};
 
<span class="hljs-keyword">var</span> Car = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
<span class="hljs-keyword">this</span>.funcX = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
<span class="hljs-keyword">this</span>.funcY();
}
 
<span class="hljs-keyword">this</span>.funcY = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
<span class="hljs-keyword">this</span>.funcZ();
}
}
 
<span class="hljs-keyword">var</span> car = <span class="hljs-keyword">new</span> Car();</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005624739" src="https://static.alili.tech/img/remote/1460000005624739" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader7">禁止不相关的脚本运行</h1>
<p>当我们开发现代网页的时候都会用一些第三方的框架或者库，它们几乎都是经过测试并且相对而言Bug较少的。不过当我们调试我们自己的脚本的时候也会一不小心跳到这些文件中，引发额外的调试任务。解决方案呢就是禁止这部分不需要调试的脚本运行，详情可见这篇文章：<a href="https://raygun.com/blog/2015/05/javascript-debugging-with-black-box/" rel="nofollow noreferrer" target="_blank">: javascript-debugging-with-black-box</a>。</p>
<h1 id="articleHeader8">在较复杂的调试情况下发现关键元素</h1>
<p>在一些复杂的调试环境下我们可能要输出很多行的内容，这时候我们习惯性的会用console.log, console.debug, console.warn, console.info, console.error这些来进行区分，然后就可以在Inspector中进行过滤。不过有时候我们还是希望能够自定义显示样式，你可以用CSS来定义个性化的信息样式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
console.todo = function(msg) {
console.log(‘ % c % s % s % s‘, ‘color: yellow; background - color: black;’, ‘–‘, msg, ‘–‘);
}
 
console.important = function(msg) {
console.log(‘ % c % s % s % s’, ‘color: brown; font - weight: bold; text - decoration: underline;’, ‘–‘, msg, ‘–‘);
}
 
console.todo(“This is something that’ s need to be fixed”);
console.important(‘This is an important message’);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code>
<span class="hljs-built_in">console</span>.todo = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg</span>) </span>{
<span class="hljs-built_in">console</span>.log(‘ % c % s % s % s‘, ‘<span class="hljs-attribute">color</span>: yellow; background - <span class="hljs-attribute">color</span>: black;’, ‘–‘, msg, ‘–‘);
}
 
<span class="hljs-built_in">console</span>.important = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg</span>) </span>{
<span class="hljs-built_in">console</span>.log(‘ % c % s % s % s’, ‘<span class="hljs-attribute">color</span>: brown; <span class="hljs-built_in">font</span> - <span class="hljs-attribute">weight</span>: bold; text - <span class="hljs-attribute">decoration</span>: underline;’, ‘–‘, msg, ‘–‘);
}
 
<span class="hljs-built_in">console</span>.todo(“This is something that’ s need to be fixed”);
<span class="hljs-built_in">console</span>.important(‘This is an important message’);</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005624741" src="https://static.alili.tech/img/remote/1460000005624741" alt="" title="" style="cursor: pointer;"></span></p>
<p>在<code>console.log()</code>中你可以使用<code>%s</code>来代表一个字符串 , <code>%i</code> 来代表数字， 以及 <code>%c</code> 来代表自定义的样式。</p>
<h1 id="articleHeader9">监测指定函数的调用与参数</h1>
<p>在Chrome中可以监测指定函数的调用情况以及参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var func1 = function(x, y, z) {
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>
<span class="hljs-keyword">var</span> func1 = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(x, y, z)</span> </span>{
};</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006772812" src="https://static.alili.tech/img/remote/1460000006772812" alt="" title="" style="cursor: pointer;"></span></p>
<p>这种方式能够让你实时监控到底啥参数被传入到了指定函数中。</p>
<h1 id="articleHeader10">Console中使用$进行元素查询</h1>
<p>在Console中也可以使用<span class="MathJax_Preview"></span><span class="MathJax" id="MathJax-Element-1-Frame" tabindex="0" style=""><nobr><span class="math" id="MathJax-Span-1" role="math" style="width: 25.95em; display: inline-block;"><span style="display: inline-block; position: relative; width: 21.433em; height: 0px; font-size: 121%;"><span style="position: absolute; clip: rect(1.514em, 1021.43em, 2.854em, -1000em); top: -2.479em; left: 0em;"><span class="mrow" id="MathJax-Span-2"><span class="texatom" id="MathJax-Span-3"><span class="mrow" id="MathJax-Span-4"><span class="mo" id="MathJax-Span-5"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">来</span></span></span></span><span class="texatom" id="MathJax-Span-6"><span class="mrow" id="MathJax-Span-7"><span class="mo" id="MathJax-Span-8"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">进</span></span></span></span><span class="texatom" id="MathJax-Span-9"><span class="mrow" id="MathJax-Span-10"><span class="mo" id="MathJax-Span-11"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">行</span></span></span></span><span class="texatom" id="MathJax-Span-12"><span class="mrow" id="MathJax-Span-13"><span class="mo" id="MathJax-Span-14"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">类</span></span></span></span><span class="texatom" id="MathJax-Span-15"><span class="mrow" id="MathJax-Span-16"><span class="mo" id="MathJax-Span-17"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">似</span></span></span></span><span class="texatom" id="MathJax-Span-18"><span class="mrow" id="MathJax-Span-19"><span class="mo" id="MathJax-Span-20"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">于</span></span></span></span><span class="mi" id="MathJax-Span-21" style="font-family: STIXGeneral-Italic;">q</span><span class="mi" id="MathJax-Span-22" style="font-family: STIXGeneral-Italic;">u</span><span class="mi" id="MathJax-Span-23" style="font-family: STIXGeneral-Italic;">e</span><span class="mi" id="MathJax-Span-24" style="font-family: STIXGeneral-Italic;">r<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.023em;"></span></span><span class="mi" id="MathJax-Span-25" style="font-family: STIXGeneral-Italic;">y</span><span class="mi" id="MathJax-Span-26" style="font-family: STIXGeneral-Italic;">S<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.008em;"></span></span><span class="mi" id="MathJax-Span-27" style="font-family: STIXGeneral-Italic;">e</span><span class="mi" id="MathJax-Span-28" style="font-family: STIXGeneral-Italic;">l<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.001em;"></span></span><span class="mi" id="MathJax-Span-29" style="font-family: STIXGeneral-Italic;">e</span><span class="mi" id="MathJax-Span-30" style="font-family: STIXGeneral-Italic;">c</span><span class="mi" id="MathJax-Span-31" style="font-family: STIXGeneral-Italic;">t<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.018em;"></span></span><span class="mi" id="MathJax-Span-32" style="font-family: STIXGeneral-Italic;">o</span><span class="mi" id="MathJax-Span-33" style="font-family: STIXGeneral-Italic;">r<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.023em;"></span></span><span class="texatom" id="MathJax-Span-34"><span class="mrow" id="MathJax-Span-35"><span class="mo" id="MathJax-Span-36"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">那</span></span></span></span><span class="texatom" id="MathJax-Span-37"><span class="mrow" id="MathJax-Span-38"><span class="mo" id="MathJax-Span-39"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">样</span></span></span></span><span class="texatom" id="MathJax-Span-40"><span class="mrow" id="MathJax-Span-41"><span class="mo" id="MathJax-Span-42"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">基</span></span></span></span><span class="texatom" id="MathJax-Span-43"><span class="mrow" id="MathJax-Span-44"><span class="mo" id="MathJax-Span-45"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">于</span></span></span></span><span class="mi" id="MathJax-Span-46" style="font-family: STIXGeneral-Italic;">C<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.022em;"></span></span><span class="mi" id="MathJax-Span-47" style="font-family: STIXGeneral-Italic;">S<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.008em;"></span></span><span class="mi" id="MathJax-Span-48" style="font-family: STIXGeneral-Italic;">S<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.008em;"></span></span><span class="texatom" id="MathJax-Span-49"><span class="mrow" id="MathJax-Span-50"><span class="mo" id="MathJax-Span-51"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">选</span></span></span></span><span class="texatom" id="MathJax-Span-52"><span class="mrow" id="MathJax-Span-53"><span class="mo" id="MathJax-Span-54"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">择</span></span></span></span><span class="texatom" id="MathJax-Span-55"><span class="mrow" id="MathJax-Span-56"><span class="mo" id="MathJax-Span-57"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">器</span></span></span></span><span class="texatom" id="MathJax-Span-58"><span class="mrow" id="MathJax-Span-59"><span class="mo" id="MathJax-Span-60"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">的</span></span></span></span><span class="texatom" id="MathJax-Span-61"><span class="mrow" id="MathJax-Span-62"><span class="mo" id="MathJax-Span-63"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">查</span></span></span></span><span class="texatom" id="MathJax-Span-64"><span class="mrow" id="MathJax-Span-65"><span class="mo" id="MathJax-Span-66"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">询</span></span></span></span><span class="texatom" id="MathJax-Span-67"><span class="mrow" id="MathJax-Span-68"><span class="mo" id="MathJax-Span-69"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">，</span></span></span></span></span><span style="display: inline-block; width: 0px; height: 2.479em;"></span></span></span><span style="display: inline-block; overflow: hidden; vertical-align: -0.32em; border-left: 0px solid; width: 0px; height: 1.354em;"></span></span></nobr></span><script type="math/tex" id="MathJax-Element-1">来进行类似于querySelector那样基于CSS选择器的查询，</script>(‘css-selector’) 会返回满足匹配的第一个元素，而$$(‘css-selector’) 会返回全部匹配元素。注意，如果你会多次使用到元素，那么别忘了将它们存入变量中。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005624826" src="https://static.alili.tech/img/remote/1460000005624826" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader11">Postman</h1>
<p>很多人习惯用Postman进行API调试或者发起Ajax请求，不过别忘了你浏览器自带的也能做这个，并且你也不需要担心啥认证啊这些，因为Cookie都是自带帮你传送的，这些只要在network这个tab里就能进行，大概这样子：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005624828" src="https://static.alili.tech/img/remote/1460000005624828" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader12">DOM变化检测</h1>
<p>DOM有时候还是很操蛋的，有时候压根不知道啥时候就变了，不过Chrome提供了一个小的功能就是当DOM发生变化的时候它会提醒你，你可以监测属性变化等等：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005624830" src="https://static.alili.tech/img/remote/1460000005624830" alt="a" title="a" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader13">Further Reading</h1>
<ul>
<li><p><a href="https://raygun.com/blog/2015/03/speed-up-your-markup-with-zen-coding-emmet/" rel="nofollow noreferrer" target="_blank">Speed up your markup with zen coding emmet</a></p></li>
<li><p><a href="https://raygun.com/blog/2015/04/emmet-and-css-the-forgotten-part/" rel="nofollow noreferrer" target="_blank">Emmet and css the forgotten part</a></p></li>
<li><p><a href="https://developer.chrome.com/devtools/docs/commandline-api" rel="nofollow noreferrer" target="_blank">Chrome command line api</a></p></li>
<li><p><a href="https://developer.chrome.com/devtools/docs/tips-and-tricks" rel="nofollow noreferrer" target="_blank">Chrome developer tools tips and tricks</a></p></li>
<li><p><a href="https://developer.mozilla.org/en-US/docs/Tools/Network_Monitor#Edit_and_Resend" rel="nofollow noreferrer" target="_blank">Firefox edit and resend a request</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
关于JavaScript调试的十来个小Tips

## 原文链接
[https://segmentfault.com/a/1190000005624728](https://segmentfault.com/a/1190000005624728)

