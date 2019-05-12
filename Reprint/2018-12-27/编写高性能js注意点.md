---
title: '编写高性能js注意点' 
date: 2018-12-27 2:30:13
hidden: true
slug: 2ze2p5g1daq
categories: [reprint]
---

{{< raw >}}

                    
<h5>该文章以收录： <a href="http://webxiaoma.com/blogs/2017/09/16/js-log" rel="nofollow noreferrer" target="_blank">《JavaScript深入探索之路》</a>
</h5>
<hr>
<h2 id="articleHeader0">前言</h2>
<p>本文的一些注意的是我以前看书籍总结的，我们一般人写项目时，对我们的影响并不是很大，有时完全可以忽略，但是我们知道这些总不是什么坏处。</p>
<p>js这个大众语言我想，很多人多知道，它入门和简单，可是想要深入了解还是要有一定的水平、 的，同样的效果虽然都可以写出来，但还是性能和可维护性却有很大差别。下来我们就来总结一下书写高质量js代码的一些注意点。</p>
<p>代码维护是高成本的，如果我们在开发代码时，不注重代码的规范，可读性和可维护性，那么将来带给我们的将是更大的开支。如果说你是给公司干活，自己写完就不用管了，这样的思想很危险。不但对他人读取你代码时带来困扰，同时也是限制自己发展的一个障碍。代码终究是要给人去阅读的。我们整个团队在书写代码时应该劲量做到：</p>
<ul>
<li>可读的</li>
<li>一致的</li>
<li>可预测的</li>
<li>看上去就像是同一个人写的</li>
<li>已记录</li>
</ul>
<h2 id="articleHeader1">执行与加载</h2>
<p>管理浏览器中的脚本 JavaScript 代码是个棘手的问题，因为代码执行过程会阻塞浏览器的其他进程，比如用户界面绘制，每次遇到<code>&lt;script&gt;</code>标签，页面都必须停下来等待代码下载(如果是外链文件)并执行，然后继续处理其他部分，尽管如此，还是有几种方法能减少<code>javascript </code>对性能的影响。</p>
<ol>
<li>&lt;/body&gt;闭合标签之前，将所有的<code>&lt;script&gt;</code>标签放到页面底部，这确保在脚本执行前页面已加载完成了渲染。</li>
<li>合并脚本，页面中的<code>&lt;script&gt;</code> 标签越少，加载也就也快，响应也更迅速。无论外链文件还是内嵌脚本都是如此</li>
<li>有多种无阻塞下载JavaScript方法：</li>
</ol>
<ul><li>使用<code>&lt;script&gt;</code>标签的defer属性（H5提供一个新属性async）</li></ul>
<p>defer和async的相同点是采用并行下载，在下载过程中不会产生阻塞。区别在于执行时机，async是加载完成后自动执行，而defer需要等待页面完成后执行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot; defer></script>
<script type=&quot;text/javascript&quot; async></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">defer</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">async</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<ul><li>使用动态创建<code>&lt;script&gt;</code>元素来下载并执行代码<br>   使用动态创建<code>&lt;script&gt;</code>元素不会阻塞页面的其他进程，这样我们可以将动态创建的<code>&lt;script&gt;</code>放到页面的 <code>&lt;head&gt;</code>区域。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function(url){
    var script = document.creatElement('script');
    script.type = &quot;text/javascript&quot;;
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">url</span>)</span>{
    <span class="hljs-built_in">var</span> script = <span class="hljs-built_in">document</span>.creatElement(<span class="hljs-string">'script'</span>);
    script.type = <span class="hljs-string">"text/javascript"</span>;
    script.src = <span class="hljs-built_in">url</span>;
    <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'head'</span>)[<span class="hljs-number">0</span>].appendChild(script);
}
</code></pre>
<p>我们什么时候知道脚本已经加载完成呢？Firefox，Opera,Chrome和safari3为我们提供了一个<code>onload</code>事件来监听，而IE 为我们提供了<code>onreadystatechange</code> 事件并根据<code>readyState属性来进行判断</code>。</p>
<p>通过上面的方法，我们可以极大提高那些需要使用大量的<code>JavaScript</code> 的 web应用的实际性能</p>
<h2 id="articleHeader2">变量处理</h2>
<p>我们都知道，JavaScript通过函数管理作用域。在函数内部声明的变量只在这个函数内部，函数外面不可用。另一方面，全局变量就是在任何函数外面声明的或是未声明直接简单使用的。我们应该尽量的减少全局变量，这样避免全局变量过多而造成变量命名冲突，同时又占用内存。</p>
<p>声明变量是我们尽量用<code>var</code>去声明</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fun(){
    a = 1; // 这样是不推荐的，因为a是隐式的全局变量
    var b = 2; // 这样是推荐的
    var c = d = 5 // 这样也是不推荐的，因为d是隐式的全局变量
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>function <span class="hljs-function"><span class="hljs-title">fun</span><span class="hljs-params">()</span></span>{
    a = <span class="hljs-number">1</span>; <span class="hljs-comment">// 这样是不推荐的，因为a是隐式的全局变量</span>
    <span class="hljs-keyword">var</span> b = <span class="hljs-number">2</span>; <span class="hljs-comment">// 这样是推荐的</span>
    <span class="hljs-keyword">var</span> c = d = <span class="hljs-number">5</span> <span class="hljs-comment">// 这样也是不推荐的，因为d是隐式的全局变量</span>
}</code></pre>
<p>减少全局变量我们还可以使用立即执行函数，下来我们也会有章节去详细的讲解</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(){
    var a = 3;
    var b = 4;
})()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">var</span> a = <span class="hljs-number">3</span>;
    <span class="hljs-keyword">var</span> b = <span class="hljs-number">4</span>;
})()</code></pre>
<p>另外我们应该知道变量提升原则，这个在后面的章节中我们还会详细的讲解我们在写一些变量时，可以这样去写。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function(){
    var a,
        b,
        c;

    a = 1;
    b = 2;
    c = 3;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>function(){
    var a,
        <span class="hljs-keyword">b,
</span>        c<span class="hljs-comment">;</span>

    a = <span class="hljs-number">1</span><span class="hljs-comment">;</span>
    <span class="hljs-keyword">b </span>= <span class="hljs-number">2</span><span class="hljs-comment">;</span>
    c = <span class="hljs-number">3</span><span class="hljs-comment">;</span>
}</code></pre>
<p>我们把常用的变量写到最上面，可以进行注释，这样更有利于维护我们的代码,同时防止变量在定义之前使用的逻辑错误。</p>
<h4>DOM操作的注意点</h4>
<p>脚本进行DOM的操作的代价是很昂贵的。它是富Web应用中最常见的性能瓶颈。浏览器中通常会把DOM 和 JavaScript（ECMAScript） 独立实现。我们每一次用js去操作DOM都会产生性能消耗，所以我们尽可能小的去处理DOM，这也是现在MVVM和MVC框架流行的一部分原因。我们在处理DOM时尽可能这样做。</p>
<p>1.最小化DOM访问次数，尽可能在JavaScript端处理</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var ul = document.getElementById(&quot;ul&quot;);
 var a = &quot;&quot;;
 for(var i=0;i<10;i++){
    a += &quot;<li>i</li>&quot;;
 }
 ul.innerHTML = a;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code> <span class="hljs-keyword">var</span> ul = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"ul"</span>);
 <span class="hljs-keyword">var</span> a = <span class="hljs-string">""</span>;
 <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;<span class="hljs-number">10</span>;i++){
    a += <span class="hljs-string">"&lt;li&gt;i&lt;/li&gt;"</span>;
 }
 ul.innerHTML = a;</code></pre>
<p>将要添加的标签存储在变量a中，一次性加入ul中，这样只访问一次dom,降低了性能消耗。</p>
<p>2.如果需要多次访问某个DOM节点，请使用局部变量存储它的引用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var doc = document; // 存储document
doc.getElementById(&quot;div&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code>var <span class="hljs-meta">doc</span> = document; <span class="hljs-comment">// 存储document</span>
<span class="hljs-meta">doc</span>.getElementById(<span class="hljs-string">"div"</span>);</code></pre>
<p>3.小心处理HTML集合，因为它实时连系着底层文档，把集合的长度缓存到一个变量中，并在迭代中使用它。如果需要经常操作集合，建议把它拷贝到一个数组中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var divList = document.getElementsByTagName(&quot;div&quot;);

for(var i = 0,len = divList.length; i < len; i++){
    
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs go"><code><span class="hljs-keyword">var</span> divList = document.getElementsByTagName(<span class="hljs-string">"div"</span>);

<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>,<span class="hljs-built_in">len</span> = divList.length; i &lt; <span class="hljs-built_in">len</span>; i++){
    
}</code></pre>
<p>这里我们将<code>divList</code>的长度去存储在变量 len中，而不像下面这样每次循环都要读取一遍长度。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 避免使用的例子
var divList = document.getElementsByTagName(&quot;div&quot;);

for(var i = 0; i < divList.length; i++){
    
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-comment">// 避免使用的例子</span>
<span class="hljs-keyword">var</span> divList = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">"div"</span>);

<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; divList.length; i++){
    
}</code></pre>
<p>4.如果可能的话，使用速度更快的API，比如<code>querySelectorAll()</code> 和 <code>firstElementChild</code></p>
<p>5.要留意重绘和重排；批量修改样式时，'离线'操作DOM树，使用缓存、并减少访问布局信息的次数<br>浏览器下载完页面中的所有组件之后会解析并生成两个内部数据结构</p>
<p><strong>DOM树：</strong> 表示页面结构</p>
<p><strong>渲染树：</strong> 表示DOM节点如何显示</p>
<p>当DOM的变化影响了元素的几何属性时(宽高)—— 比如改变框宽度或给段落增加文字，导致行数增加，浏览器需要重新计算元素的几何属性，同样其他元素的几何属性和位置也会因此受到影响，浏览器会是渲染树中受到影响的部分失效，并重新构造渲染树。这一过程称为 “重排(reflow)”。完成重排后，浏览器会重新绘制影响的部分到屏幕中，该过程称为 “重绘”。</p>
<p>那么我们该怎么减少重排和重绘</p>
<ul><li>样式统一处理<br>  我们在改变一个元素样式时，可以统一处理</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" //这种写法不推荐
  var el = document.getElementById(&quot;div&quot;);
  el.style.width = '100px';
  el.style.height = '100px';
  el.style.padding = '10px';

 //这种写法推荐
  var el = document.getElementById(&quot;div&quot;);
  el.style.cssText = &quot;width:100px;height:100px;padding:5px;&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code> <span class="hljs-comment">//这种写法不推荐</span>
  <span class="hljs-keyword">var</span> el = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"div"</span>);
  el.style.width = <span class="hljs-string">'100px'</span>;
  el.style.height = <span class="hljs-string">'100px'</span>;
  el.style.padding = <span class="hljs-string">'10px'</span>;

 <span class="hljs-comment">//这种写法推荐</span>
  <span class="hljs-keyword">var</span> el = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"div"</span>);
  el.style.cssText = <span class="hljs-string">"width:100px;height:100px;padding:5px;"</span>;</code></pre>
<p>下边的方法很明显只进行了一次重排，而上边的重排了三次。使用<code>cssText</code>时会覆盖前边的style样式，我们可以这样做</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" el.style.cssText += &quot;width:100px;height:100px;padding:5px;&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code style="word-break: break-word; white-space: initial;"> el.<span class="hljs-built_in">style</span>.cssText += <span class="hljs-string">"width:100px;height:100px;padding:5px;"</span>;</code></pre>
<p>另外我们还可以将改变的样式写在css样式表中，通过修改class来改变其样式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  var el = document.getElementById(&quot;div&quot;);
  el.className = &quot;active&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code>  var el = document.getElementById(<span class="hljs-string">"div"</span>)<span class="hljs-comment">;</span>
  el.className = <span class="hljs-string">"active"</span><span class="hljs-comment">;</span></code></pre>
<ul><li>脱离文档流修改DOM</li></ul>
<p>脱离文档修改DOM的步骤就是</p>
<p>使元素脱离文档流<br>  对其应用多重改变<br>  把元素带回文档中</p>
<p>这里我有三种方法：</p>
<p>(1) 第一种：隐藏元素，应用修改，重新显示</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  var el = document.getElementById(&quot;div&quot;);
  el.style.display = &quot;none&quot;;
  el.style.width = '100px';
  el.style.height = '100px';
  el.style.padding = '10px';
  el.style.display = &quot;block&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>  <span class="hljs-built_in">var</span> el = document.getElementById(<span class="hljs-string">"div"</span>);
  el.<span class="hljs-built_in">style</span>.<span class="hljs-built_in">display</span> = <span class="hljs-string">"none"</span>;
  el.<span class="hljs-built_in">style</span>.<span class="hljs-built_in">width</span> = '100px';
  el.<span class="hljs-built_in">style</span>.<span class="hljs-built_in">height</span> = '100px';
  el.<span class="hljs-built_in">style</span>.padding = '10px';
  el.<span class="hljs-built_in">style</span>.<span class="hljs-built_in">display</span> = <span class="hljs-string">"block"</span>;</code></pre>
<p>(2) 第二种：使用文档片段在当前DOM之外构建一个子树，在把它拷贝回文档</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  var el = document.getElementById(&quot;ul&quot;);
  var fragment = document.createDocumentFragment();
  for(var i = 0; i < 50000; i++){
    fragment.appendChild(document.createElement(&quot;li&quot;));
  }
  el.appenChild(fragment);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code>  <span class="hljs-keyword">var</span> el = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"ul"</span>);
  <span class="hljs-keyword">var</span> fragment = <span class="hljs-built_in">document</span>.createDocumentFragment();
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">50000</span>; i++){
    fragment.appendChild(<span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"li"</span>));
  }
  el.appenChild(fragment);</code></pre>
<p>推荐使用这种方式。</p>
<p>(3) 第三种：将原始元素拷贝到一个脱离文档的节点中，修改副本，完成后在提货原始元素</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var el = document.getElementById(&quot;div&quot;);
 var cloneDiv = el.choleNode(true);
 cloneDiv.appendChild = li;
 el.parentNode.replaceChild(clone,el); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code> var el = document.getElementById(<span class="hljs-string">"div"</span>)<span class="hljs-comment">;</span>
 var <span class="hljs-keyword">cloneDiv </span>= el.choleNode(true)<span class="hljs-comment">;</span>
 <span class="hljs-keyword">cloneDiv.appendChild </span>= li<span class="hljs-comment">;</span>
 el.parentNode.replaceChild(<span class="hljs-keyword">clone,el); </span></code></pre>
<p>以上脱离文档流修改DOM的方法推荐第二种方法。</p>
<ul><li>减少渲染变化的排队与刷新</li></ul>
<p>由于每次重排都会产生计算消耗，大多数浏览器通过列队化修改并批量执行来优化重排过程。而我们不知不觉中就使用了一些强制刷新队列并要求计划任务立刻执行的方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 1. offsetTop、offsetLeft、offsetWidth、offsetHeight
 2. scrollTop、scrollLeft、scrollWidth、scrollHeight
 3. clientTop、clientLeft、clientWidht、clientHeight
 4. getComputedStyle() // currentStyle IE中" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code> <span class="hljs-number">1.</span> offsetTop、offsetLeft、offsetWidth、offsetHeight
 <span class="hljs-number">2.</span> scrollTop、scrollLeft、scrollWidth、scrollHeight
 <span class="hljs-number">3.</span> clientTop、clientLeft、clientWidht、clientHeight
 <span class="hljs-number">4.</span> getComputedStyle() <span class="hljs-comment">// currentStyle IE中</span></code></pre>
<p>我们在使用上面方法时要注意，浏览器为了返回最新值，会刷新队列应用所用变更，我们应该减少他们的使用，如果使用他们我们最好缓存布局信息<br>例如我们将滚轮滚动到页面顶部：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var scroll = document.body.scrollTop; // 这里直接缓存scrollTop
var set = setInterval(function(){
     scroll--; // 这里不使用window.scrollTop--
     document.body.scrollTop = scroll;
     if(scroll < 0) {
        clearInterval(set);
     }
},100)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">var</span> scroll = <span class="hljs-built_in">document</span>.body.scrollTop; <span class="hljs-comment">// 这里直接缓存scrollTop</span>
<span class="hljs-keyword">var</span> <span class="hljs-keyword">set</span> = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
     scroll--; <span class="hljs-comment">// 这里不使用window.scrollTop--</span>
     <span class="hljs-built_in">document</span>.body.scrollTop = scroll;
     <span class="hljs-keyword">if</span>(scroll &lt; <span class="hljs-number">0</span>) {
        clearInterval(<span class="hljs-keyword">set</span>);
     }
},<span class="hljs-number">100</span>)
</code></pre>
<p>6.动画中使用绝对定位。</p>
<p>对于用展开/折叠的效果，我们使用绝对定位，将其脱离文档流，会是重绘更少些。</p>
<p>7.使用事件委托来减少事件处理器的数量。</p>
<p>如果你还不知道事件委托事什么，请访问：<br><a href="http://blog.csdn.net/webxiaoma/article/details/53501616" rel="nofollow noreferrer" target="_blank">http://blog.csdn.net/webxiaoma/article/details/53501616</a></p>
<h2 id="articleHeader3">算法和流程控制</h2>
<p>这里我们讨论的是循环和判断，我们直接写推荐的书写方法</p>
<p>1.循环体<br> 循环包括 <code>for</code>循环、<code>while</code>循环、<code>do-while</code>循环、<code>for-in</code>循环。<br> 其中<code>for-in</code>循环的性能明显比其他性能差些，另外ES6对于属性循环有出了<code>for-of</code>循环，比起<code>for-in</code>循环性能要好一些。<br> 我们前面也说了，循环时，我们最好存储判断的长度，另外递减循环要比递加循环速度相当要快。</p>
<p>2.判断<br> 判断有：<code>if</code> 和 <code>switch</code>;<br> 当我们做判断时，最好是吧最有可能出现的放到前面，另外<code>if-else-if</code>很多的话，推荐使用<code>switch</code>去判断，这样更有利于减少性能的消耗。有时候我们选择嵌套if也不使用很多<code>if-else-if</code>连用的方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 推荐
if(){
  if(){
    if(){

    }
  }
}

// 尽量少用
if(){

} else if(){

} else if(){

} else if(){

} else if(){

} else if(){

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>// 推荐
<span class="hljs-keyword">if</span>(){
  if(){
    if(){

    }
  }
}

// 尽量少用
<span class="hljs-keyword">if</span>(){

} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(){

} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(){

} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(){

} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(){

} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(){

}</code></pre>
<h2 id="articleHeader4">对象和作用域</h2>
<p>对象的注意点是：</p>
<p>1.尽量不扩展内置原型(如给Object.prototype添加自己的方法)，除非你确定不会对你的团队造成影响</p>
<p>2.访问的作用域和对象越深，越消耗性能，我们 尽量减少，不过这并不是硬性的要求，我们尽量减少那些不必要的深入访问。</p>
<h2 id="articleHeader5">其他注意点</h2>
<ol><li>避免隐士类型转换(有时候判断需要考虑用全等号还是双等号)</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 0;
if(a === false){
    //不执行
}

if(a == false){
    //执行了
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code>var a = <span class="hljs-number">0</span>;
<span class="hljs-keyword">if</span><span class="hljs-comment">(a === false)</span>{
    <span class="hljs-comment">//不执行</span>
}

<span class="hljs-keyword">if</span><span class="hljs-comment">(a == false)</span>{
    <span class="hljs-comment">//执行了</span>
}</code></pre>
<p>2.尽量少的使用<code>eval()</code></p>
<p>3.项目发布时的代码压缩，js文件整合，图片整合等等优化。</p>
<p>4.整个团队的代码书写风格，要确定。</p>
<h2 id="articleHeader6">结束</h2>
<p>文章基本就写到这里，项目书写的注意点不单单只有这些，其实对代码的优化还有很多，还有你的经验。不断积累一定会写成很优雅的代码。</p>
<p>参考文献：《高性能JavaScript》</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
编写高性能js注意点

## 原文链接
[https://segmentfault.com/a/1190000011735788](https://segmentfault.com/a/1190000011735788)

